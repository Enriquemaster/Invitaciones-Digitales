import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import storage from './pages/storage/storage';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);