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
        //axios.get('http://localhost:5000/users/login/'+this.state.username)
        this.getUser();
    }

    verifyUser = () => {
        console.log(this.state.user.password);
        console.log(this.state.password);

        if(this.state.user == null || this.state.user.password!==this.state.password){
            alert("Incorrect Username or Password")
            window.location = '/login';
        }else{
            this.props.updateUser(this.state.user.username)
            setTimeout(5000)
            this.setState({valid: true})
        }
    }

    getUser = () => {
        //console.log('http://localhost:5000/users/authorize/'+this.state.username);
        axios.get('http://localhost:5000/users/get/'+this.state.username)
          .then(response => {
            this.setState({user: response.data },this.verifyUser)
            console.log(this.state.user)
          })
          .catch((error) => {
            console.log(error);
          })
      };

    render() {
        if (this.state.valid) {
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
