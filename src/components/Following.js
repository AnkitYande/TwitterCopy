import React, { Component } from 'react'

export class Following extends Component {
    state = {
        tweetsList:[],
        tweets:[]
    };
    render() {
        return (
            this.state.tweets.length === 0 ? <div className="App-Body"> You aren't Following anyone yet</div> :
            <div className="App-Body">
                Following Page
            </div>
        )
    }
}

export default Following
