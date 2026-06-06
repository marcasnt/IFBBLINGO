import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'var(--color-danger)', backgroundColor: 'var(--color-bg)', height: '100vh', overflow: 'auto' }}>
          <h1>Algo salió mal.</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '12px', color: 'var(--color-text)' }}>
            <summary>Ver detalles del error</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Recargar aplicación
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
