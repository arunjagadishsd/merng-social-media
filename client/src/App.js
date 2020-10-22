import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/authContext';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={HomePage} />
          <AuthRoute exact path="/login" component={LoginPage} />
          <AuthRoute exact path="/register" component={RegisterPage} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
