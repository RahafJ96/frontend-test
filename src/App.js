import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import Home from './Home';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FavDrinks from './FavDrinks';
import Profile from './Profile';

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {this.props.auth0.isAuthenticated && <Home/>}
                {!this.props.auth0.isAuthenticated && <Login/>}

              </Route>
              <Route exact path="/fav">
              {this.props.auth0.isAuthenticated && <FavDrinks/>}
              </Route>
              <Route exact path="/profile">
              {this.props.auth0.isAuthenticated && <Profile/>}

              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
