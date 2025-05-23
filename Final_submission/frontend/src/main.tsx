import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BasketProvider } from './context/basketContext.tsx';
import { AuthProvider } from './context/authContext';
import './styles.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; //icon support

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BasketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BasketProvider>
    </BrowserRouter>
  </StrictMode>
);
