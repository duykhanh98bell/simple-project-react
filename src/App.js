import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import axios from 'axios';
import Login from './components/auth/Login';
import Change from './components/auth/Change';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(0);
  const postLogin = (user) => {
    localStorage.setItem('username', user.username);
    axios
      .post('/auth/login', user)
      .then((res) => {
        if (res.status === 201 && res.data.first === true) {
          localStorage.setItem('token', res.data.access_token);
          setIsLogin(1);
        } else if (res.status === 201 && res.data.first === false) {
          localStorage.setItem('token', res.data.access_token);
          setIsLogin(2);
        }
      })
      .catch((err) => err);
  };
  const postChange = (payload) => {
    axios
      .put('/auth/change', payload, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) setIsLogin(0);
      })
      .catch((err) => err);
  };

  const checkPage = () => {
    if (isLogin === 0) {
      return <Login dataLogin={postLogin} />;
    } else if (isLogin === 1) {
      return <Home outLogin={() => setIsLogin(0)} />;
    } else {
      return <Change changePass={postChange} />;
    }
  };

  return (
    <Router>
      <Switch>
        <Route path='/'>{checkPage()}</Route>
      </Switch>
    </Router>
  );
}
export default App;
