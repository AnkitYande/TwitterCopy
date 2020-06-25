import React, { Component } from 'react'

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

    render() {
        return (
            <div style={this.getStyle()}>
                <p><b>{this.props.username}:</b> {this.props.message}</p>
                <a href="#">Like</a> <a href="#">Follow</a>
            </div>
        )
    }
}

export default TweetCell
