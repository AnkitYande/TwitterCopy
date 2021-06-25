import React, { Component } from 'react'
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';
import axios from 'axios';

export class MainPage extends Component {

    state = {
        tweets: []
    };

    getTweets = async () => {
        console.log('Getting Tweets');
        await axios.get('http://localhost:5000/tweets/')
            .then(response => {
                this.setState({ tweets: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    componentDidMount() {
        this.getTweets();
    }

    render() {
        return (
            <div className="App-Body">
                <div className="Tweet-List">
                    <CreateTweet user={this.props.user} updateTweets={this.getTweets} />
                    {this.state.tweets.length === 0 ? (
                        <h1>Loading Tweets...</h1>
                    ) : (
                        <TweetList
                            tweets={this.state.tweets}
                            user={this.props.user}
                            updateTweets={this.getTweets}
                            updateUser={this.props.updateUser}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default MainPage
