import React, { Component } from 'react'
import TweetCell from './TweetCell'

export class TweetList extends Component {
  
  render() {
      return this.props.tweets.slice(0).reverse().map((tweet) => (
        <TweetCell username = {tweet.username} message = {tweet.message} />
      ));
  }
  
}

export default TweetList
