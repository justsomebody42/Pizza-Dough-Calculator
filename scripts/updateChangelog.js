#!/usr/bin/env node
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = resolve(repoRoot, "CHANGELOG.md");

const run = (command) => execSync(command, { cwd: repoRoot, encoding: "utf8" }).trim();

const commitSubjects = (range) => {
  const output = run(`git log --format=%s ${range}`);
  return output === "" ? [] : output.split("\n");
};

const formatSection = (title, subjects) => {
  if (subjects.length === 0) {
    return "";
  }

  const items = subjects.map((subject) => `- ${subject}`).join("\n");
  return `## ${title}\n\n${items}\n\n`;
};

const tags = run("git for-each-ref --sort=-creatordate --format=\"%(refname:short)\" refs/tags")
  .split("\n")
  .filter(Boolean);

let markdown = "# Changelog\n\n";

const unreleasedRange = tags.length > 0 ? `${tags[0]}..HEAD` : "HEAD";
markdown += formatSection("Unreleased", commitSubjects(unreleasedRange));

tags.forEach((tag, index) => {
  const previousTag = tags[index + 1];
  const range = previousTag === undefined ? tag : `${previousTag}..${tag}`;
  markdown += formatSection(tag, commitSubjects(range));
});

writeFileSync(changelogPath, `${markdown.trimEnd()}\n`, "utf8");

console.log(`Changelog written to ${changelogPath}`);
