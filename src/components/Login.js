import React, { Component } from 'react'
import axios from 'axios' 
import { Redirect, Link } from "react-router-dom";

export class Login extends Component {
    state = {
        username: '',
        password: '',
        user: null,
        valid: false
    }

    onChangeU = (e) => this.setState({username: e.target.value});
    onChangeP = (e) => this.setState({password: e.target.value});

    onSubmit = (e) =>{
        e.preventDefault();
        // axios.get('http://localhost:5000/users/login/'+this.state.username)
        this.verifyUser();
    }

    verifyUser = async () => {
        const pkg = {
            "username" : this.state.username,
            "password" : this.state.password,
        }
        console.log(pkg);
        await axios.post('http://localhost:5000/users/verify', pkg)
            .then(res => {
                if(typeof(res.data) == "string")
                    alert(res.data);
                else{
                    this.setState({user: res.data});
                    this.props.updateUser(this.state.username);
                    this.setState({valid: true})
                }
            }
        );
    }

    render() {
        if (this.state.user) {
            this.setState({valid: false})
            return <Redirect to={'/'} />
        }
        return ( 
            <div className = 'App-Body'>
            <form onSubmit = {this.onSubmit}>
                <input 
                    type = "text" 
                    name = "Username"
                    placeholder = "Username"
                    value = {this.state.username}
                    onChange = {this.onChangeU}
                    className = "textfield"

                />
                <br></br>
                <input 
                    type = "password" 
                    name = "Password"
                    placeholder = "Password"
                    value = {this.state.password}
                    onChange = {this.onChangeP}
                    className = "textfield"

                />
                <br></br>
                <input 
                    type = "submit" 
                    value = "Login" 
                    className = "btn"
                />
            </form>
            <br></br>
            <Link to="/SignUp">Sign Up</Link>
            </div> 
            
        );
    }
}

export default Login
