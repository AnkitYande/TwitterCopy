import React, { Component } from 'react'
import axios from 'axios'
import TweetCell from './TweetCell'

export class TweetList extends Component {

    state = {
        likedTweets: []
    }

    componentDidMount() {
        this.getTweets();
    }

    getTweets = async () => {

        if (!this.props.user) return;

        // console.log('http://localhost:5000/users/get/'+this.props.user);
        await axios.get('http://localhost:5000/users/get/' + this.props.user)
            .then(res => {
                this.setState({ likedTweets: res.data.likedTweets })
            })
        return true;
    }

    getLiked = (id) => {
        if (this.state.likedTweets)
            if (this.state.likedTweets.includes(id)) {
                return true;
            }
        return false;
    }

    updateTweets = async () => {
        this.props.updateUser(this.props.user)
        this.props.updateTweets();
        console.log("updating tweets")
        this.getTweets();
    }

    render() {

        return this.props.tweets.slice(0).reverse().map((tweet) => (
            tweet ?
                <TweetCell
                    username={tweet.username}
                    message={tweet.message}
                    id={tweet._id}
                    date={tweet.updatedAt}
                    user={this.props.user}
                    liked={this.getLiked(tweet._id)}
                    updateUser={this.props.updateUser}
                    updateTweets={this.updateTweets}
                />
                :
                <></>
        ));

    }

}

export default TweetList