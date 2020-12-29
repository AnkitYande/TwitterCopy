import React, { Component } from 'react'
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';
import axios from 'axios';

export class Profile extends Component {
    state = {
        tweets:[]
    };

    getTweets = () => {
        axios.get('http://localhost:5000/tweets/get/'+this.props.user)
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

    render() {
        return (
            <div className="App-Body">
                <div className="Tweet-List">
                <CreateTweet user = {this.props.user} updateTweets = {this.refresh}/> 
                <TweetList tweets = {this.state.tweets}/>
                </div>
            </div>
        )
    }
}

export default Profile
