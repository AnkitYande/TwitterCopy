import React, { Component } from 'react'
import TweetList from './TweetList';
import axios from 'axios';

export class Profile extends Component {
    state = {
        tweets: [],
        numLikes: 0
    };

    getTweets = async () => {
        await axios.get('http://localhost:5000/tweets/get/' + this.props.user)
            .then(response => {
                this.setState({ tweets: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    getUser = async () => {
        await axios.get('http://localhost:5000/users/get/' + this.props.user)
            .then(response => {
                this.setState({ numLikes: response.data.likedTweets.length })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    componentDidMount() {
        this.getTweets();
        this.getUser();
    }

    refresh = () => {
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
                        <div className="Tweet-List">
                            <div className="bio">
                                <h1>@{this.props.user}</h1>
                                <h4 style={{ opacity: '0.7' }}> Tweets: {this.state.tweets.length} </h4>
                                <h4 style={{ opacity: '0.7' }}> Likes: {this.state.numLikes} </h4>
                                <button className="btn" style={{ margin: 0 }} onClick={this.logout}>Sign Out</button>
                            </div>
                            <TweetList
                                tweets={this.state.tweets}
                                user={this.props.user}
                                updateTweets={this.getTweets}
                                updateUser={this.props.updateUser}
                            />
                        </div>
                    </div>
                ) : (
                    <div>Logged Out</div>
                )}
            </div>
        )
    }
}

export default Profile
