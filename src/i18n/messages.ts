export const messages = {
  de: {
    "app.title": "Pizza Teig Rechner",
    "config.mehlart.label": "Mehlart",
    "config.gehzeit.label": "Gehzeit",
    "config.pizzen.label": "Anzahl Pizzen",
    "config.bakeAt.label": "🍕 Pizza time!",
    "config.mehlart.weizen": "Weizen (Tipo 00)",
    "config.mehlart.dinkel": "Dinkel (630 / 812)",
    "config.mehlart.glutenfrei": "Glutenfrei",
    "config.gehzeit.express": "2 - 3 Stunden",
    "config.gehzeit.24h": "~24 Stunden",
    "config.gehzeit.72h": "~72 Stunden",
    "stats.mehl": "Mehl",
    "stats.wasser": "Wasser",
    "stats.salz": "Salz",
    "stats.oel": "Olivenöl",
    "stats.hefe": "Frische Hefe",
    "stats.unit.gram": "{value} g",
    "tips.heading": "Empfohlene Mehlsorten:",
    "tips.item": "• {tip}",
    "tips.infoLabel": "Empfohlene Mehlsorten anzeigen",
    "tips.close": "Schließen",
    "error.unavailable": "{reason}",
    "error.crashBody": "Etwas ist schiefgelaufen. Bitte lade die Seite neu.",
    "error.reload": "Seite neu laden",
    "footer.version": "⭐ v{version}",
    "footer.versionWithCommit": "⭐ v{version} ({commit})",
    "progress.start": "Timer starten",
    "progress.remainingWithSeconds":
      "Noch {hours} Std. {minutes} Min. {seconds} Sek.",
    "progress.readyAt": "Fertig: {time}",
    "progress.ready": "Fertig!",
    "progress.completedAt": "✓ erledigt um {time}",
    "progress.agoMinutes":
      "vor {minutes, plural, one {1 Minute} other {{minutes} Minuten}}",
    "progress.agoHours":
      "vor {hours, plural, one {1 Stunde} other {{hours} Stunden}}",
    "progress.agoDays": "vor {days, plural, one {1 Tag} other {{days} Tagen}}",
    "progress.agoDaysHours":
      "vor {days, plural, one {1 Tag} other {{days} Tagen}} und {hours, plural, one {1 Stunde} other {{hours} Stunden}}",
    "progress.bakeAt": "Pizza backen um …",
    "progress.bakeAtSetWeekday": "{weekday} den {date}",
    "progress.bakeAtSetTime": "um {time} Uhr",
    "progress.bakeAtConfirm": "Übernehmen",
    "progress.bakeAtTooSoon":
      "Dafür reicht die Zeit nicht - wähle einen späteren Zeitpunkt.",
    "progress.clearBakeAt": "Backzeitpunkt entfernen",
    "progress.clearBakeAtTitle": "Backzeitpunkt entfernen?",
    "progress.clearBakeAtBody":
      "Der geplante Backzeitpunkt und der zugehörige Timer werden entfernt.",
    "progress.clearBakeAtConfirm": "Entfernen",
    "progress.addToCalendar": "Zum Kalender hinzufügen",
    "progress.calendarEventTitle": "Pizzateig ansetzen",
    "progress.calendarEventDescription":
      "Teig für {mehlart} ({gehzeit}) jetzt ansetzen, damit er pünktlich um {time} Uhr am {weekday} den {date} fertig zum Backen ist.",
    "progress.totalDurationOnly":
      "Der Teig braucht insgesamt {days} Tg. {hours} Std. {minutes} Min.",
    "progress.totalDurationStart":
      "Der Teig braucht insgesamt {days} Tg. {hours} Std. {minutes} Min. Du musst ihn am <highlightStart>{startWeekday}, den {startDate} um {startTime} Uhr</highlightStart> starten, damit er am <highlightReady>{readyWeekday}, den {readyDate} um {readyTime} Uhr</highlightReady> fertig zum Backen ist.",
    "progress.totalDurationStartNow":
      "Der Teig braucht insgesamt {days} Tg. {hours} Std. {minutes} Min. Du musst ihn jetzt starten, damit er am <highlightReady>{readyWeekday}, den {readyDate} um {readyTime} Uhr</highlightReady> fertig zum Backen ist.",
    "progress.stepStartAt": "Start: {time}",
    "progress.projectedReadyAt": "Voraussichtlich fertig: {time}",
    "progress.resetWaitMinutes": "Auf empfohlene Dauer zurücksetzen",
    "progress.newDough": "Neuen Teig starten",
    "progress.resetTitle": "Neuen Teig starten?",
    "progress.resetBody":
      "Der gesamte Fortschritt für dieses Rezept wird zurückgesetzt.",
    "progress.resetConfirm": "Zurücksetzen",
    "progress.stop": "Timer anhalten",
    "progress.stopTitle": "Timer anhalten?",
    "progress.stopBody":
      "Der Timer für diesen Schritt wird angehalten, damit du die Dauer wieder anpassen kannst.",
    "progress.stopConfirm": "Anhalten",
    "progress.cancel": "Abbrechen",
    "progress.notificationTitle": "Teig-Rechner",
    "progress.notificationBody": "{stepTitle} ist fertig!",
    "language.switchToDe": "Auf Deutsch wechseln",
    "language.switchToEn": "Auf Englisch wechseln",
    "theme.switchToLight": "Zum hellen Modus wechseln",
    "theme.switchToDark": "Zum dunklen Modus wechseln",
    "duration.minutes": "{minutes} Minuten",
    "duration.hours":
      "{hours, plural, one {{hoursLabel} Stunde} other {{hoursLabel} Stunden}}",
    "steps.weizen.express.0.title": "Hefe aktivieren",
    "steps.weizen.express.0.text":
      "{waterAmount} Wasser (lauwarm, ~25°C) und {saltAmount} Salz verrühren. 3 EL Mehl und {yeastAmount} Hefe darin auflösen und {duration} warten, bis die Hefe arbeitet und kleine Bläschen entstehen.",
    "steps.weizen.express.1.title": "Teig mischen",
    "steps.weizen.express.1.text":
      "Rest Mehl + {oilAmount} Öl zugeben. Mit Knethaken 1-2 Min. auf niedrigster Stufe mischen.",
    "steps.weizen.express.2.title": "Autolyse & Falten",
    "steps.weizen.express.2.text":
      "Teig {duration} abgedeckt bei Raumtemperatur entspannen lassen. Danach mit feuchten Händen von 4 Seiten in die Mitte falten, bis er glatt wird.",
    "steps.weizen.express.3.title": "Stockgare",
    "steps.weizen.express.3.text":
      "Den Teig im Ganzen abgedeckt für {duration} bei Raumtemperatur gehen lassen.",
    "steps.weizen.express.4.title": "Stückgare am Backtag",
    "steps.weizen.express.4.text":
      "Teig in Ballen teilen, rundschleifen und abgedeckt weitere {duration} bei Raumtemperatur gehen lassen. Danach direkt im Ofen backen. Bei nur 1,5 Stunden Stockgare die Stückgare auf 3 Stunden verlängern, bei 3 Stunden Stockgare auf 1,5 Stunden verkürzen (Übergare-Gefahr).",
    "steps.weizen.24h.0.title": "Hefe auflösen",
    "steps.weizen.24h.0.text":
      "{waterAmount} kaltes Wasser und {saltAmount} Salz verrühren. 3 EL Mehl und {yeastAmount} Hefe darin auflösen und {duration} ruhen lassen.",
    "steps.weizen.24h.1.title": "Teig mischen",
    "steps.weizen.24h.1.text":
      "Rest Mehl + {oilAmount} Öl zugeben. Mit Knethaken 1-2 Min. auf niedrigster Stufe mischen.",
    "steps.weizen.24h.2.title": "Autolyse & Falten",
    "steps.weizen.24h.2.text":
      "{duration} abgedeckt bei Raumtemperatur entspannen lassen. Danach mit feuchten Händen von 4 Seiten in die Mitte falten.",
    "steps.weizen.24h.3.title": "Kalte Stockgare",
    "steps.weizen.24h.3.text":
      "Als ganzen Klumpen luftdicht für {duration} in den Kühlschrank stellen.",
    "steps.weizen.24h.4.title": "Stückgare am Backtag",
    "steps.weizen.24h.4.text":
      "{duration} vor dem Backen aus dem Kühlschrank holen. In Ballen teilen, rundschleifen und bei Raumtemperatur gehen lassen. Bei nur 16 Stunden Stockgare die Stückgare auf ca. 4,5 Stunden ausreizen, damit der Kern warm wird. Bei 48 Stunden Stockgare auf maximal 3 Stunden reduzieren.",
    "steps.weizen.72h.0.title": "Hefe auflösen",
    "steps.weizen.72h.0.text":
      "{waterAmount} kaltes Wasser, {saltAmount} Salz, etwas Mehl und {yeastAmount} Hefe verrühren.",
    "steps.weizen.72h.1.title": "Teig mischen",
    "steps.weizen.72h.1.text":
      "Rest Mehl + {oilAmount} Öl dazu. Nur 1-2 Minuten auf niedrigster Stufe mischen.",
    "steps.weizen.72h.2.title": "Autolyse & Falten",
    "steps.weizen.72h.2.text":
      "{duration} bei Raumtemperatur ruhen lassen -> einmal falten.",
    "steps.weizen.72h.3.title": "Zweites Falten",
    "steps.weizen.72h.3.text":
      "Weitere {duration} warten -> ein zweites Mal falten.",
    "steps.weizen.72h.4.title": "Kalte Stockgare",
    "steps.weizen.72h.4.text":
      "Den Teig luftdicht verpackt für {duration} im Kühlschrank ruhen lassen.",
    "steps.weizen.72h.5.title": "Stückgare am Backtag",
    "steps.weizen.72h.5.text":
      "{duration} vor dem Backen aus dem Kühlschrank holen. In Ballen teilen, rundschleifen und bei Raumtemperatur aufgehen lassen. Bei diesem starken Mehl bleibt die Stückgare meist bei rund 4 Stunden, unabhängig von der Stockgare-Dauer.",
    "steps.dinkel.express.0.title": "Teig Mischen",
    "steps.dinkel.express.0.text":
      "Maximal 1 Minute auf niedrigster Stufe mischen. Dinkel-Gluten ist empfindlich gegen mechanischen Stress!",
    "steps.dinkel.express.1.title": "Sanftes Dehnen & Falten",
    "steps.dinkel.express.1.text":
      "{duration} ruhen lassen. Danach sehr behutsam falten, um das empfindliche Gerüst nicht zu zerreißen.",
    "steps.dinkel.express.2.title": "Stockgare & Formen",
    "steps.dinkel.express.2.text":
      "Den Teig abgedeckt {duration} bei Raumtemperatur gehen lassen, dabei weiterhin schonend behandeln. Anschließend vorsichtig in Ballen teilen, rundschleifen und direkt im Ofen backen. Sehr sensibel: Die Gehzeit möglichst exakt einhalten, sonst reißt das instabile Dinkel-Gluten.",
    "steps.dinkel.24h.0.title": "Teig mischen",
    "steps.dinkel.24h.0.text":
      "{waterAmount} kaltes Wasser, {saltAmount} Salz, {yeastAmount} Hefe, {flourAmount} Mehl und {oilAmount} Öl in die Schüssel geben. Exakt 1 Minute auf niedrigster Stufe mischen.",
    "steps.dinkel.24h.1.title": "Sanftes Dehnen & Falten",
    "steps.dinkel.24h.1.text": "{duration} ruhen lassen -> falten.",
    "steps.dinkel.24h.2.title": "Zweites Falten",
    "steps.dinkel.24h.2.text":
      "Weitere {duration} warten -> ein zweites Mal falten.",
    "steps.dinkel.24h.3.title": "Stockgare & Backtag",
    "steps.dinkel.24h.3.text":
      "Für {duration} in den Kühlschrank stellen. Am Backtag 3 Stunden vorher Ballen formen. 24 Stunden Stockgare sind das Maximum. Die Stückgare am Backtag strikt auf 3 Stunden begrenzen, sonst läuft der Teig flach wie Suppe.",
    "steps.glutenfrei.express.0.title": "Teig kneten",
    "steps.glutenfrei.express.0.text":
      "{flourAmount} Mehl, {waterAmount} Wasser, {saltAmount} Salz, {oilAmount} Öl und {yeastAmount} Hefe kräftig zu einer homogenen, pastösen Masse verrühren. Kein Gluten = keine Struktur zerstörbar.",
    "steps.glutenfrei.express.1.title": "Direkte Stückgare",
    "steps.glutenfrei.express.1.text":
      "Mit geölten Händen Teiglinge direkt auf Backpapier formen und {duration} ruhen lassen. Danach direkt in den Ofen. Im Bereich von 1 bis 1,5 Stunden bleiben - mehr oder weniger verschlechtert die Konsistenz.",
    "steps.glutenfrei.24h.0.title": "Teig mischen",
    "steps.glutenfrei.24h.0.text":
      "{flourAmount} Mehl und {saltAmount} Salz vermischen, {yeastAmount} Hefe und eine Prise Zucker in {waterAmount} Wasser auflösen und unterrühren. Mit den Händen ca. 5 Minuten kneten, {oilAmount} Öl einarbeiten und weitere 5 Minuten kneten - der Teig ist klebrig, Hände dabei leicht befeuchten.",
    "steps.glutenfrei.24h.1.title": "Stockgare & Portionieren",
    "steps.glutenfrei.24h.1.text":
      "Teig zu einer Kugel formen und {duration} ruhen lassen. Danach in Stücke teilen und vorsichtig zu Kugeln formen - ohne Glutengerüst reißt der Teig leicht.",
    "steps.glutenfrei.24h.2.title": "Kalte Stückgare & Backtag",
    "steps.glutenfrei.24h.2.text":
      "Teiglinge abgedeckt für {duration} in den Kühlschrank stellen. Am Backtag 3 Stunden vorher herausnehmen und auf Raumtemperatur kommen lassen. Wichtig: Den Teig eiskalt verarbeiten, da er warm sofort die Bindung verliert; nach dem Kühlschrank maximal 30 bis 45 Minuten akklimatisieren lassen.",
    "steps.glutenfrei.24h.3.title": "Formen",
    "steps.glutenfrei.24h.3.text":
      "Teigling auf reichlich glutenfreiem Mehl wenden und mit den Fingerspitzen von der Mitte zum Rand drücken, dabei einen Rand stehen lassen. Teig um 180° drehen (nicht wenden) und wiederholen, bis die gewünschte Größe erreicht ist.",
  },
  en: {
    "app.title": "Pizza Dough Calculator",
    "config.mehlart.label": "Flour type",
    "config.gehzeit.label": "Rise time",
    "config.pizzen.label": "Number of pizzas",
    "config.bakeAt.label": "🍕 Pizza time!",
    "config.mehlart.weizen": "Wheat (Tipo 00)",
    "config.mehlart.dinkel": "Spelt (630 / 812)",
    "config.mehlart.glutenfrei": "Gluten-free",
    "config.gehzeit.express": "2 - 3 hours",
    "config.gehzeit.24h": "~24 hours",
    "config.gehzeit.72h": "~72 hours",
    "stats.mehl": "Flour",
    "stats.wasser": "Water",
    "stats.salz": "Salt",
    "stats.oel": "Olive oil",
    "stats.hefe": "Fresh yeast",
    "stats.unit.gram": "{value} g",
    "tips.heading": "Recommended flour types:",
    "tips.item": "• {tip}",
    "tips.infoLabel": "Show recommended flour types",
    "tips.close": "Close",
    "error.unavailable": "{reason}",
    "error.crashBody": "Something went wrong. Please reload the page.",
    "error.reload": "Reload page",
    "footer.version": "⭐ v{version}",
    "footer.versionWithCommit": "⭐ v{version} ({commit})",
    "progress.start": "Start timer",
    "progress.remainingWithSeconds": "{hours}h {minutes}m {seconds}s left",
    "progress.readyAt": "Ready: {time}",
    "progress.ready": "Ready!",
    "progress.completedAt": "✓ done at {time}",
    "progress.agoMinutes":
      "{minutes, plural, one {1 minute} other {{minutes} minutes}} ago",
    "progress.agoHours":
      "{hours, plural, one {1 hour} other {{hours} hours}} ago",
    "progress.agoDays": "{days, plural, one {1 day} other {{days} days}} ago",
    "progress.agoDaysHours":
      "{days, plural, one {1 day} other {{days} days}} and {hours, plural, one {1 hour} other {{hours} hours}} ago",
    "progress.bakeAt": "Bake pizza at …",
    "progress.bakeAtSetWeekday": "{weekday}, {date}",
    "progress.bakeAtSetTime": "at {time}",
    "progress.bakeAtConfirm": "Set",
    "progress.bakeAtTooSoon":
      "Not enough time for this dough - choose a later time.",
    "progress.clearBakeAt": "Clear bake time",
    "progress.clearBakeAtTitle": "Clear the bake time?",
    "progress.clearBakeAtBody":
      "This will remove the scheduled bake time and its timer.",
    "progress.clearBakeAtConfirm": "Clear",
    "progress.addToCalendar": "Add to calendar",
    "progress.calendarEventTitle": "Start the pizza dough",
    "progress.calendarEventDescription":
      "Start the {mehlart} dough ({gehzeit}) now so it's ready to bake by {time} on {weekday}, {date}.",
    "progress.totalDurationOnly":
      "The dough will take {days}d {hours}h {minutes}m in total.",
    "progress.totalDurationStart":
      "The dough will take {days}d {hours}h {minutes}m in total. You need to start it on <highlightStart>{startWeekday}, {startDate} at {startTime}</highlightStart> so that it's ready to bake on <highlightReady>{readyWeekday}, {readyDate} at {readyTime}</highlightReady>.",
    "progress.totalDurationStartNow":
      "The dough will take {days}d {hours}h {minutes}m in total. You need to start it now so that it's ready to bake on <highlightReady>{readyWeekday}, {readyDate} at {readyTime}</highlightReady>.",
    "progress.stepStartAt": "Start: {time}",
    "progress.projectedReadyAt": "Likely ready: {time}",
    "progress.resetWaitMinutes": "Reset to recommended duration",
    "progress.newDough": "Start new dough",
    "progress.resetTitle": "Start a new dough?",
    "progress.resetBody": "This will reset all progress for this recipe.",
    "progress.resetConfirm": "Reset",
    "progress.stop": "Stop timer",
    "progress.stopTitle": "Stop the timer?",
    "progress.stopBody":
      "This will stop the timer for this step so you can adjust its duration again.",
    "progress.stopConfirm": "Stop",
    "progress.cancel": "Cancel",
    "progress.notificationTitle": "Dough calculator",
    "progress.notificationBody": "{stepTitle} is ready!",
    "language.switchToDe": "Switch to German",
    "language.switchToEn": "Switch to English",
    "theme.switchToLight": "Switch to light mode",
    "theme.switchToDark": "Switch to dark mode",
    "duration.minutes": "{minutes} minutes",
    "duration.hours":
      "{hours, plural, one {{hoursLabel} hour} other {{hoursLabel} hours}}",
    "steps.weizen.express.0.title": "Activate the yeast",
    "steps.weizen.express.0.text":
      "Stir {waterAmount} water (lukewarm, ~25°C) with {saltAmount} salt. Dissolve {yeastAmount} yeast in it along with 3 tbsp of flour, then wait {duration} until the yeast starts working and small bubbles appear.",
    "steps.weizen.express.1.title": "Mix the dough",
    "steps.weizen.express.1.text":
      "Add the rest of the flour plus {oilAmount} oil. Mix with a dough hook on the lowest setting for 1-2 minutes.",
    "steps.weizen.express.2.title": "Autolysis & folding",
    "steps.weizen.express.2.text":
      "Let the dough rest, covered, at room temperature for {duration}. Then, with wet hands, fold it from all 4 sides into the middle until smooth.",
    "steps.weizen.express.3.title": "Bulk fermentation",
    "steps.weizen.express.3.text":
      "Let the whole dough rise, covered, at room temperature for {duration}.",
    "steps.weizen.express.4.title": "Final proof on baking day",
    "steps.weizen.express.4.text":
      "Divide the dough into balls, shape them round, and let them rise, covered, for another {duration} at room temperature. Then bake immediately. If bulk fermentation was only 1.5 hours, extend this proof to 3 hours; if it was 3 hours, shorten it to 1.5 hours (risk of over-proofing).",
    "steps.weizen.24h.0.title": "Dissolve the yeast",
    "steps.weizen.24h.0.text":
      "Stir {waterAmount} cold water with {saltAmount} salt. Dissolve {yeastAmount} yeast in it along with 3 tbsp of flour and let it sit for {duration}.",
    "steps.weizen.24h.1.title": "Mix the dough",
    "steps.weizen.24h.1.text":
      "Add the rest of the flour plus {oilAmount} oil. Mix with a dough hook on the lowest setting for 1-2 minutes.",
    "steps.weizen.24h.2.title": "Autolysis & folding",
    "steps.weizen.24h.2.text":
      "Let it rest, covered, at room temperature for {duration}. Then, with wet hands, fold it from all 4 sides into the middle.",
    "steps.weizen.24h.3.title": "Cold bulk fermentation",
    "steps.weizen.24h.3.text":
      "Place the dough as a whole lump, airtight, in the fridge for {duration}.",
    "steps.weizen.24h.4.title": "Final proof on baking day",
    "steps.weizen.24h.4.text":
      "Take it out of the fridge {duration} before baking. Divide into balls, shape them round, and let rise at room temperature. If bulk fermentation was only 16 hours, stretch this proof to about 4.5 hours so the core warms through; if it was 48 hours, reduce it to a maximum of 3 hours.",
    "steps.weizen.72h.0.title": "Dissolve the yeast",
    "steps.weizen.72h.0.text":
      "Stir {waterAmount} cold water, {saltAmount} salt, a bit of flour and {yeastAmount} yeast together.",
    "steps.weizen.72h.1.title": "Mix the dough",
    "steps.weizen.72h.1.text":
      "Add the rest of the flour plus {oilAmount} oil. Mix on the lowest setting for only 1-2 minutes.",
    "steps.weizen.72h.2.title": "Autolysis & folding",
    "steps.weizen.72h.2.text":
      "Rest for {duration} at room temperature -> fold once.",
    "steps.weizen.72h.3.title": "Second fold",
    "steps.weizen.72h.3.text": "Wait another {duration} -> fold a second time.",
    "steps.weizen.72h.4.title": "Cold bulk fermentation",
    "steps.weizen.72h.4.text":
      "Wrap the dough airtight and let it rest in the fridge for {duration}.",
    "steps.weizen.72h.5.title": "Final proof on baking day",
    "steps.weizen.72h.5.text":
      "Take it out of the fridge {duration} before baking. Divide into balls, shape them round, and let rise at room temperature. With this strong flour, the final proof generally stays around 4 hours regardless of the bulk fermentation time.",
    "steps.dinkel.express.0.title": "Mix the dough",
    "steps.dinkel.express.0.text":
      "Mix for no more than 1 minute on the lowest setting. Spelt gluten is sensitive to mechanical stress!",
    "steps.dinkel.express.1.title": "Gentle stretch & fold",
    "steps.dinkel.express.1.text":
      "Let rest for {duration}. Then fold very gently so as not to tear the delicate gluten structure.",
    "steps.dinkel.express.2.title": "Bulk rise & shaping",
    "steps.dinkel.express.2.text":
      "Let the dough rise, covered, at room temperature for {duration}, continuing to handle it gently. Then carefully divide it into balls, shape them round, and bake immediately. Very sensitive: stick to this time as closely as possible, or the delicate spelt gluten will tear.",
    "steps.dinkel.24h.0.title": "Mix the dough",
    "steps.dinkel.24h.0.text":
      "Put {waterAmount} cold water, {saltAmount} salt, {yeastAmount} yeast, {flourAmount} flour and {oilAmount} oil into the bowl. Mix on the lowest setting for 1 minute.",
    "steps.dinkel.24h.1.title": "Gentle stretch & fold",
    "steps.dinkel.24h.1.text": "Rest for {duration} -> fold.",
    "steps.dinkel.24h.2.title": "Second fold",
    "steps.dinkel.24h.2.text": "Wait another {duration} -> fold a second time.",
    "steps.dinkel.24h.3.title": "Bulk fermentation & baking day",
    "steps.dinkel.24h.3.text":
      "Refrigerate for {duration}. On baking day, shape into balls 3 hours beforehand. 24 hours of bulk fermentation is the absolute maximum. Strictly limit the final proof on baking day to 3 hours, or the dough will spread out flat like soup.",
    "steps.glutenfrei.express.0.title": "Knead the dough",
    "steps.glutenfrei.express.0.text":
      "Vigorously stir {flourAmount} flour, {waterAmount} water, {saltAmount} salt, {oilAmount} oil and {yeastAmount} yeast into a smooth, paste-like mass. No gluten means no structure to destroy.",
    "steps.glutenfrei.express.1.title": "Direct final proof",
    "steps.glutenfrei.express.1.text":
      "With oiled hands, shape the dough balls directly on baking paper and let rest for {duration}. Then straight into the oven. Stay within 1 to 1.5 hours — more or less will hurt the texture.",
    "steps.glutenfrei.24h.0.title": "Mix the dough",
    "steps.glutenfrei.24h.0.text":
      "Mix {flourAmount} flour with {saltAmount} salt, dissolve {yeastAmount} yeast and a pinch of sugar in the {waterAmount} water, and stir it in. Knead by hand for about 5 minutes, work in the {oilAmount} oil and knead for another 5 minutes — the dough is sticky, so keep your hands lightly dampened.",
    "steps.glutenfrei.24h.1.title": "Bulk rise & dividing",
    "steps.glutenfrei.24h.1.text":
      "Shape into one ball and let it rest for {duration}. Then divide into pieces and shape them gently into balls — without gluten, the dough tears easily.",
    "steps.glutenfrei.24h.2.title": "Cold final proof & baking day",
    "steps.glutenfrei.24h.2.text":
      "Refrigerate the dough balls, covered, for {duration}. On baking day, take them out 3 hours beforehand and let them come to room temperature. Important: keep the dough ice-cold while handling it, since it loses its binding as soon as it warms up; let it acclimate for no more than 30 to 45 minutes after the fridge.",
    "steps.glutenfrei.24h.3.title": "Shaping",
    "steps.glutenfrei.24h.3.text":
      "Turn the dough ball out onto plenty of gluten-free flour and press from the center outward with your fingertips, leaving a border. Rotate it 180° (don't flip it) and repeat until it reaches the size you want.",
  },
} as const;

export type Locale = keyof typeof messages;
export type MessageKey = keyof (typeof messages)["de"];
