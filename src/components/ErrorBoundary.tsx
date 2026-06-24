import { Component, type ReactNode } from "react";

type ErrorBoundaryState = { readonly error: Error | undefined };

// React has no hook for catching render errors, so this is the one component
// in the codebase that has to be a class.
export class ErrorBoundary extends Component<
  { readonly fallback: (error: Error) => ReactNode; readonly children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): ReactNode {
    return this.state.error ? this.props.fallback(this.state.error) : this.props.children;
  }
}
