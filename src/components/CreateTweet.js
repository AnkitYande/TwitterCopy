import React, { Component } from 'react'
import axios from 'axios';

export class CreateTweet extends Component {

    state = {
        tweet: '',
    }

    onChange = (e) => this.setState({ tweet: e.target.value });

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.props.user == null)
            alert("You Must Log In")
        else {
            console.log(this.state.tweet);
            const newTweet = {
                username: this.props.user,
                message: this.state.tweet
            }
            await axios.post('http://localhost:5000/tweets/add', newTweet)
                .then(res => console.log(res.data));

            this.setState({ tweet: '' });
            this.props.updateTweets();
        }
    }

    render() {
        return (
            <form id="tweet-box" className="tweet-box" onSubmit={this.onSubmit}>
                <textarea
                    type="textarea"
                    name="tweet"
                    autoComplete="off"
                    placeholder="What's Happening?"
                    value={this.state.tweet}
                    onChange={this.onChange}
                    form="tweet-box"
                    className="textArea"
                >
                </textarea>
                <input
                    type="submit"
                    value="Tweet"
                    className="btn"
                />
            </form>
        )
    }
}


export default CreateTweet
