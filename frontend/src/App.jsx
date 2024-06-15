import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import CourseList from './components/CourseList';
import SignInStudent from './components/SignInStudent';
import SignInAdmin from './components/SignInAdmin';
import Dashboard from './components/Dashboard';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/sign-in-student" element={<SignInStudent />} />
        <Route path="/sign-in-admin" element={<SignInAdmin />} />
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;



