import React from 'react';
import { withTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Production apps can forward this to observability tools.
    console.error('Unhandled render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2>{this.props.t('errorBoundary.title')}</h2>
          <p>{this.props.t('errorBoundary.message')}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
