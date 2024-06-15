import React from 'react';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Online Learning Platform
          </Typography>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/courses">Courses</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to the Online Learning Platform
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Join us today and start learning from the best courses available online.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" component={Link} to="/register" style={{ margin: '0 10px' }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/courses" style={{ margin: '0 10px' }}>
            View Courses
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="secondary" component={Link} to="/sign-in-student" style={{ margin: '0 10px' }}>
            Sign In as Student
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/sign-in-admin" style={{ margin: '0 10px' }}>
            Sign In as Admin
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
