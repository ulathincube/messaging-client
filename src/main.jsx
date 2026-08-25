import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>,
);
