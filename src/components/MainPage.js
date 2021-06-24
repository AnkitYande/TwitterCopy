import React, { Component } from 'react'
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';
import axios from 'axios';

export class MainPage extends Component {
    
    state = {
        tweets:[]
    };

    getTweets = () => {
        console.log('Getting Tweets');
        axios.get('http://localhost:5000/tweets/')
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
            this.state.tweets.length === 0 ? (
                <div className="App-Body">
                    <div className="Tweet-List">
                        <CreateTweet user = {this.props.user} updateTweets = {this.getTweets}/> 
                        <h1>Loading Tweets...</h1>
                    </div>
                </div>
            ) : (
                <div className="App-Body">
                    <div className="Tweet-List">
                        <CreateTweet user = {this.props.user} updateTweets = {this.getTweets}/> 
                        <TweetList tweets = {this.state.tweets} user = {this.props.user} onlyLike = {false}/>
                    </div>
                </div>
            )
        )
    }
}

export default MainPage
