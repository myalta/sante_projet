class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Une erreur s'est produite</h1>
            <p className="text-gray-600 mb-4">Veuillez recharger la page pour continuer.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mx-auto"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [lang, setLang] = React.useState('fr');
  const [route, setRoute] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);

  // Simple router
  const renderPage = () => {
    switch(route) {
      case 'home':
        return <Home lang={lang} navigate={setRoute} />;
      case 'ai':
        return <Diagnostic lang={lang} navigate={setRoute} />;
      case 'doctors':
        return <Doctors lang={lang} navigate={setRoute} />;
      case 'hospitals':
        return <Hospitals lang={lang} navigate={setRoute} />;
      case 'admin-dashboard':
        return <AdminDashboard lang={lang} navigate={setRoute} currentUser={currentUser} />;
      case 'patient-dashboard':
        return <PatientDashboard lang={lang} navigate={setRoute} currentUser={currentUser} />;
      case 'login':
      case 'register':
        return <Auth lang={lang} navigate={setRoute} setCurrentUser={setCurrentUser} initialMode={route === 'login' ? 'login' : 'register'} />;
      default:
        return <Home lang={lang} navigate={setRoute} />;
    }
  };

  try {
    return (
      <div className="flex flex-col min-h-screen" data-name="app" data-file="app.js">
        <Header lang={lang} setLang={setLang} currentRoute={route} navigate={setRoute} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main className="flex-grow">
            {renderPage()}
        </main>
        <Footer lang={lang} />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);