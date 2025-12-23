import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar a UI alternativa
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Aqui você pode logar o erro em algum serviço externo (Sentry, LogRocket, etc.)
    console.error("ErrorBoundary capturou um erro:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800 p-10">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-4">
              ⚠️ Oops! Algo deu errado.
            </h1>
            <p className="mb-6">
              Um erro inesperado ocorreu. Nossa equipe já está ciente e você
              pode tentar novamente.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
