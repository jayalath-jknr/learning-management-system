import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import './index.css';

const  clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.render(
  <ClerkProvider publishableKey={ clerkPublishableKey}>
    <Router>
      <App />
    </Router>
  </ClerkProvider>,
  document.getElementById('root')
);
