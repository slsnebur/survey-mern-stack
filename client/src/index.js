// Router
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import {Zap} from '@styled-icons/octicons';

// import routes
import Login from './routes/Login';
import Forms from './routes/Forms';
import Start from './routes/Start';
import Users from './routes/Users';
import Register from './routes/Register';


// route components
const  LoginRoute = function() {
  return (
      <Login/>
  );
};

const  RegisterRoute = function() {
  return (
      <Register/>
  );
};

const  FormsRoute = function() {
  return (
      <Forms/>
  );
};

const  UsersRoute = function() {
  return (
      <Users/>
  );
};

const  StartRoute = function() {
  return (
      <Start/>
  );
};

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Route path={"/start"} component={StartRoute}/>
        <Route path={"/login"} component={LoginRoute}/>
        <Route path={"/users"} component={UsersRoute}/>
        <Route path={"/forms"} component={FormsRoute}/>
        <Route path={"/register"} component={RegisterRoute}/>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
