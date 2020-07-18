import React, { Component } from 'react'
import axios from 'axios';

export class TweetCell extends Component {

    likeTweet = () => {
        console.log(this.props.user + " liked " + this.props.id)
        const like = {
            username : this.props.user,
            tweetID : this.props.id,
        }
        axios.put('http://192.168.1.235:5000/users/like', like)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div className="tweet-cell">
                <p><b>{this.props.username}</b> {this.props.date.substring(0,10)} </p>
                <p>{this.props.message}</p>
                <button type="button" onClick={this.likeTweet}>Like</button>
            </div>
        )
    }
}

export default TweetCell
