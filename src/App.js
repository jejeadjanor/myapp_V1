import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './components/LoginForm';
import SubmitButton from './components/SubmitButton';
import './App.css';
import Signup from './components/Signup';

class App extends React.Component{

  // API CALL TO CHECK IF THE USER IS LOGGED IN OR NOT WHEN THE COMPONENT IS MOUNTED WITH AN ERROR HANDLER AS WELL
  async componentDidMount(){
    try {
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });     
      let result = await res.json();     
      if (result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  // API CODES TO LOGOUT ON THE CLICK OF THE LOGOUT BUTTON
  async doLogout(){
    try {
      let res = await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();
      
      if (result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.email = '';
      }
    }
    catch(e) {
      console.log(e)
    }
  } 
  render(){

    if (UserStore.loading){
      return(
        <div className = "app">
          <div className = 'containerr'>
            Loading, please wait...
          </div>
        </div>
      );
    }
    else {
      if (UserStore.isLoggedIn){
        return(
          <div className = "app">
            <div className = 'containerr'>
              Welcome {UserStore.email}
            {/*LOG OUT BUTTON */}
              <SubmitButton
                text = {'Log out'}
                disabled = {false}
                onClick = { () => this.doLogout()}
              />
            </div>
          </div>
        );
      }
      return(
        <Router>
        <div>
          <h2 className='header'>Welcome To GloryEvents Homepage</h2> 
          <nav>
          <ul>
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            {/* <li><Link to={'/signup'} className="nav-link">Contact</Link></li> */}
            <li><Link to={'/login'} className="nav-link">Login</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Signup} />
              {/* <Route path='/' component={Signup} /> */}
              <Route path='/login' component={LoginForm} />
          </Switch>
        </div>
      </Router>
      );
    }
  }
}
export default observer(App);
