import React, { Component } from 'react'
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';
import axios from 'axios';

export class Liked extends Component {
    state = {
        tweets:[]
    };

    getTweets = async () => {
        console.log('Getting Tweets');
        await axios.get('http://localhost:5000/tweets/')
            .then(response => {
                this.setState({tweets: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    componentDidMount() {
        this.getTweets();
    }   
   
   
    // state = {
    //     tweet_ID_List: [],
    //     tweets: []
    // };

    // getTweets = () => {
    //     axios.get('http://localhost:5000/users/get/' + this.props.user)
    //         .then(response => {
    //             this.setState({ tweet_ID_List: response.data.likedTweets }, this.getMessages)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // };

    // getMessages = () => {
    //     this.state.tweet_ID_List.forEach(tweet => {
    //         console.log("Searching For: " + tweet)
    //         axios.get('http://localhost:5000/tweets/' + tweet)
    //             .then(response => {
    //                 this.setState({ tweets: [...this.state.tweets, response.data] })
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 return
    //             })
    //     });
    // }

    // componentDidMount() {
    //     this.getTweets();
    // }

    // refresh = () => {
    //     this.getTweets();
    //     this.getTweets();
    // }

    render() {
        return (
            !this.props.user ?
                <div className="App-Body"> You haven’t liked any Tweets yet</div>
                :
                <div className="App-Body">
                    <div className="Tweet-List">
                    <CreateTweet user = {this.props.user} updateTweets = {this.getTweets}/> 
                        <TweetList 
                            tweets = {this.state.tweets} 
                            user = {this.props.user} 
                            updateTweets = {this.getTweets}
                            updateUser = {this.props.updateUser}
                            onlyLike = {true}
                        />
                    </div>
                </div>
        )
    }
}

export default Liked
