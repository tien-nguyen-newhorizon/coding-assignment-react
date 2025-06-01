import { Component } from 'react';
import get from 'lodash/get';

import ErrorsPage from '@client/pages/ErrorPage';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    // logErrorToMyService(error, errorInfo);
    console.warn(error, errorInfo);
  }

  override render() {
    if (get(this.state, 'hasError')) {
      return <ErrorsPage />;
    }

    return get(this.props, 'children') ?? null;
  }
}

export default ErrorBoundary;
