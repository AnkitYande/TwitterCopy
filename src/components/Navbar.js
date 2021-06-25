import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSignInAlt, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

export class Navbar extends Component {

    render() {
        return (
            <div className="sidenav">
                <Link to="/">
                    <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: 10 }} icon={faHome} onClick={this.likeTweet} />
                    Home
                </Link>
                {this.props.user == null ?
                    <Link to="/login">
                        <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: 10 }} icon={faSignInAlt} onClick={this.likeTweet} />
                        Login
                    </Link>
                    :
                    <Link to="/profile">
                        <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: 10 }} icon={faUser} onClick={this.likeTweet} />
                        Profile
                    </Link>
                }

                <Link to="/Liked">
                    <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: 10 }} icon={faHeart} onClick={this.likeTweet} />
                    Likes
                </Link>
                {/* <Link to="/Following">Following</Link> */}
                {/* <Link to="/Search">Search</Link> */}
                
                <a onClick={() => {this.props.toggleOpen()}}>
                    <button className="btn" style={{ margin: 0 }}>Tweet</button>
                </a>

            </div>
        )
    }
}

export default Navbar
