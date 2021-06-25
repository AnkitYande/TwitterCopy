import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export class TweetCell extends Component {

    likeTweet = async () => {
        if (!this.props.user) {
            alert("You must login to like tweets");
            return;
        }

        if (!this.props.liked) {
            console.log(this.props.user + " liked " + this.props.id)
            const like = {
                username: this.props.user,
                tweetID: this.props.id,
            }
            await axios.put('http://localhost:5000/users/like', like)
            // .then(res => console.log(res.data));
        } else {
            console.log(this.props.user + " unliked " + this.props.id)
            const like = {
                username: this.props.user,
                tweetID: this.props.id,
            }
            console.log(like)
            await axios.put('http://localhost:5000/users/unlike', like)
            // .then(res => console.log(res.data));
        }

        this.update();

    }

    deleteTweet = async () => {
        await axios.delete('http://localhost:5000/tweets/' + this.props.id)
        this.update();
    }

    update = () => {
        // this.props.updateUser(this.props.user);
        this.props.updateTweets();
        this.forceUpdate();
    }

    render() {
        return (
            <div className="tweet-cell">
                <div className="tweet-cell-flex">
                    <p><b>{this.props.username}</b> {this.props.date.substring(0, 10)} </p>
                    {this.props.username === this.props.user ?
                        <FontAwesomeIcon className="like-btn" style={{ cursor: "pointer", fontSize: "1rem", marginRight: 10 }} icon={faTrash} onClick={this.deleteTweet} />
                        :
                        <></>
                    }
                </div>
                <p>{this.props.message}</p>
                {!this.props.liked ?
                    <FontAwesomeIcon className="like-btn" style={{ cursor: "pointer", fontSize: "1rem", marginRight: 10 }} icon={faHeart} onClick={this.likeTweet} />
                    :
                    <FontAwesomeIcon className="like-btn" style={{ cursor: "pointer", fontSize: "1rem", marginRight: 10, color: "rgb(224, 36, 94)" }} icon={faHeart} onClick={this.likeTweet} />
                }
            </div>
        )
    }
}

export default TweetCell
