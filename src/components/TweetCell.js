import React, { Component } from 'react'
import axios from 'axios';

export class TweetCell extends Component {

    getStyle = () => {
        return {
          "border": "2px #323e47 solid",
          "paddingLeft": "20px",
          "paddingRight": "20px",
          "paddingBottom": "10px",
          "color": "#fff"
        };
    };

    likeTweet = () => {
        console.log(this.props.user + " liked " + this.props.id)
        const like = {
            username : this.props.user,
            tweetID : this.props.id
        }
        axios.put('http://192.168.1.235:5000/users/like', like)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <p><b>{this.props.username}:</b> {this.props.message}</p>
                <button type="button" onClick={this.likeTweet}>Like</button>
            </div>
        )
    }
}

export default TweetCell
