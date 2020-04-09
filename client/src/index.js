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



// import routes
import Login from './routes/Login';
import Forms from './routes/Forms';
import Start from './routes/Start';
import Users from './routes/Users';


// import classes
const  LoginRoute = function() {
  return (
      <Login/>
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
        <Route path={"/"} component={StartRoute}></Route>
        <Route path={"/login"} component={LoginRoute}></Route>
        <Route path={"/users"} component={UsersRoute}></Route>
        <Route path={"/forms"} component={FormsRoute}></Route>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
