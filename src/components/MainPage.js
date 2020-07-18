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
        axios.get('http://192.168.1.235:5000/tweets/')
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
                    <TweetList tweets = {this.state.tweets} user = {this.props.user}/>
                </div>
            </div>
        )
    }
}

export default MainPage
