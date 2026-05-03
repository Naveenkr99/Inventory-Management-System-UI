import AppRoutes from './routes/AppRoutes';
import AppLayout from './components/Layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
