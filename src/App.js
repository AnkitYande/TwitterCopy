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
import Modal from './components/Modal';

class App extends Component {

  state = {
    user: null,
    open: false,
  };

  updateUser = (uid) => {
    this.setState({ user: uid });
    console.log("Logged in as: " + uid);
  }

  toggleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <br></br>
          <div className="App-Body" style={{ fontSize: "1.75em", fontWeight: "bold" }}> TwitterClone </div>

            <Modal
              open={this.state.open}
              onClose={ () => {this.setState({ open: false})}}
              user={this.state.user}
            >
              Popup
            </Modal>
           
          <div className="container">

            <Navbar toggleOpen={this.toggleOpen} user={this.state.user} />


            <Route path="/" exact
              render={(props) => (<MainPage user={this.state.user} updateUser={this.updateUser} />
              )} />
            <Route path="/profile" exact
              render={(props) => (<Profile user={this.state.user} updateUser={this.updateUser} />
              )} />
            <Route path="/liked" exact
              render={(props) => (<Liked user={this.state.user} updateUser={this.updateUser} />
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
            {/* <Route path='/Modal'
              render={(props) => (<Modal updateUser={this.updateUser} />)}
            /> */}
          </div>

        </div>
      </Router>
    );
  }

}

export default App;
