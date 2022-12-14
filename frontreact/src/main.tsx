import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/reset.css'
import './css/index.css'
import { AuthProvider } from './contexts/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
