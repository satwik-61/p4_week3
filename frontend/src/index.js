import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing the main CSS file for styling
import App from './App'; // Importing the main App component
import ShopContextProvider from './Context/ShopContext'; // Importing the context provider for state management

// Creating a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application
root.render(
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
);