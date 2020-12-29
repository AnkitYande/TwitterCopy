import React, { Component } from 'react'
import TweetList from './TweetList';
import axios from 'axios';

export class Liked extends Component {
    state = {
        tweetsList:[],
        tweets:[]
    };

    getTweets = () => {
        axios.get('http://192.168.1.235:5000/users/get/'+this.props.user)
            .then(response => {
                this.setState({tweetsList: response.data.likedTweets},this.getTweets2)
            })
            .catch((error) => {
                console.log(error);
            })
    };
    
    getTweets2 = () => {
        this.state.tweetsList.forEach(tweet => {
            console.log("Searching For: " + tweet) 
            axios.get('http://192.168.1.235:5000/tweets/'+tweet)
            .then(response => {
                this.setState({tweets: [...this.state.tweets,response.data]})
            })
            .catch((error) => {
                console.log(error);
                return
            })
        });
    }

    componentDidMount() {
        this.getTweets();
    }

    refresh = () =>{
        this.getTweets();
        this.getTweets();
    }

    render() {
        return (
            this.state.tweets.length === 0 ? <div className="App-Body"> You haven’t liked any Tweets yet</div> :
            <div className="App-Body">
                <div className="Tweet-List">
                <TweetList tweets = {this.state.tweets}/>
                </div>
            </div>
        )
    }
}

export default Liked
