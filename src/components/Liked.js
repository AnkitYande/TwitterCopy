import React, { Component } from 'react'
import TweetList from './TweetList';
import axios from 'axios';

export class Liked extends Component {


    state = {
        tweet_ID_List: [],
        tweets: []
    };

    getTweetIDs = () => {
        axios.get('http://localhost:5000/users/get/' + this.props.user)
            .then(response => {
                this.setState({ tweet_ID_List: response.data.likedTweets }, this.getTweets)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    getTweets = () => {
        this.state.tweet_ID_List.forEach(tweet => {
            console.log("Searching For: " + tweet)
            axios.get('http://localhost:5000/tweets/' + tweet)
                .then(response => {
                    this.setState({ tweets: [...this.state.tweets, response.data] })
                })
                .catch((error) => {
                    console.log(error);
                    return
                })
        });
    }

    componentDidMount() {
        this.getTweetIDs();
    }

    render() {
        return (

            <div className="App-Body">
                {!this.props.user || this.state.tweets.length === 0 ?
                    <div> You haven’t liked any Tweets yet</div>
                    :
                    <div className="Tweet-List">
                        <TweetList
                            tweets={this.state.tweets}
                            user={this.props.user}
                            updateTweets={this.getTweetIDs}
                            updateUser={this.props.updateUser}
                        />
                    </div>}
            </div>
        )
    }
}

export default Liked
