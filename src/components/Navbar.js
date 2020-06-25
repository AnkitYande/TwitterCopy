import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class Navbar extends Component {

    render() {
        return (
            <div class="sidenav">
                <Link to="/">Home</Link>
                {this.props.user == null ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>}
                <Link to="/Liked">Liked</Link>
                <Link to="/Following">Following</Link>
                <Link to="/Search">Search</Link>
            </div>
        )
    }
}

export default Navbar
