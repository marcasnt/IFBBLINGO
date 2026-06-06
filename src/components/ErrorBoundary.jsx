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
        <div style={{ padding: '20px', color: 'red', backgroundColor: '#fff', height: '100vh', overflow: 'auto' }}>
          <h2>Algo salió mal (Error interno):</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '12px' }}>
            <summary>Ver detalles del error</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button 
            style={{ marginTop: '20px', padding: '10px', background: '#58cc02', color: 'white', border: 'none', borderRadius: '8px' }}
            onClick={() => window.location.reload()}
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
