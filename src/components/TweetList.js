import React, { Component } from 'react'
import axios from 'axios' 
import TweetCell from './TweetCell'

export class TweetList extends Component {

    state = {
        likedTweets: []
    }

    componentDidMount() {
        if(!this.props.user) return;

        console.log('http://localhost:5000/users/get/'+this.props.user);
        axios.get('http://localhost:5000/users/get/'+this.props.user)
            .then(res => {
                console.log( "here", res.data.likedTweets);
                this.setState({likedTweets : res.data.likedTweets})
            })
        return true;
    }

    getLiked = (id) => {
        if(this.state.likedTweets)
            if (this.state.likedTweets.includes(id)){
                console.log("Matches!!")
                return true;
            }
        return false;
    }

    render() {

        return this.props.tweets.slice(0).reverse().map((tweet) => ( 
            (this.props.onlyLike && !this.getLiked(tweet._id)) ? 
            <div></div>
            :
            <TweetCell 
                username = { tweet.username }
                message = { tweet.message }
                id = { tweet._id }
                date = { tweet.updatedAt }
                user = { this.props.user }
                liked = { this.getLiked(tweet._id) }
            />
        ));

    }

}

export default TweetList