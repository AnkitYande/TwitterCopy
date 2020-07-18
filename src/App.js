import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import Liked from './components/Liked';
import Following from './components/Following';
import Search from './components/Search';

class App extends Component {

  state = {
    user: null,
  };

  updateUser = (uid) => {
    console.log("Logged in as: " + uid);
    this.setState({ user: uid });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <br></br>
          <div style={{ "fontWeight": "bold", "fontSize": "calc(10px + 3vmin)" }} > TwitterClone </div>
          <div className="container">
            <Navbar user={this.state.user} />

            <Route path="/" exact
              render={(props) => (<MainPage user={this.state.user} />
              )} />
            <Route path="/profile" exact
              render={(props) => (<Profile user={this.state.user} />
              )} />
            <Route path="/liked" exact
              render={(props) => (<Liked user={this.state.user} />
              )} />
            <Route path="/following" exact
              render={(props) => (<Following user={this.state.user} />
              )} />
            <Route path="/search" exact
              render={(props) => (<Search user={this.state.user} />
              )} />
            <Route path="/login"
              render={(props) => (<Login updateUser={this.updateUser} />)}
            />
            <Route path='/SignUp'
              render={(props) => (<SignUp updateUser={this.updateUser} />)}
            />
          </div>
          
        </div>
      </Router>
    );
  }

}

export default App;
