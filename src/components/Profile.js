import React, { Component } from 'react'
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';
import axios from 'axios';

export class Profile extends Component {
    state = {
        tweets:[]
    };

    getTweets = async () => {
        await axios.get('http://localhost:5000/tweets/get/'+this.props.user)
            .then(response => {
                this.setState({tweets: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    componentDidMount() {
        this.getTweets();
    }

    refresh = () =>{
        this.getTweets();
        this.getTweets();
    }

    logout = () => {
        console.log("logging out");
        axios.get('http://localhost:5000/users/logout');
        this.props.updateUser(null);
    }

    render() {
        return (
            <div className="App-Body">
                {this.props.user ? (
                    <div>
                    <h2>Welcome {this.props.user}!</h2>
                    <h3 style={{ cursor: "pointer", textDecoration: "underline"}} onClick={this.logout}>Sign Out</h3>
                    <div className="Tweet-List">
                    <CreateTweet user = {this.props.user} updateTweets = {this.refresh}/> 
                    <TweetList tweets = {this.state.tweets}/>
                    </div>
                    </div>
                ):(                 
                    <div>Logged Out</div>
                )}
            </div>
        )
    }
}

export default Profile
