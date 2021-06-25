import React, { Component } from 'react'
import axios from 'axios' 
import { Redirect, Link } from "react-router-dom";

export class SignUp extends Component {
    
    state = {
        username: '',
        password: '',
        valid: false
    }

    onChangeU = (e) => this.setState({username: e.target.value});
    onChangeP = (e) => this.setState({password: e.target.value});

    onSubmit = (e) =>{
        e.preventDefault();
        this.checkUser();
    }

    checkUser = async () => {
        if(this.state.username.length < 3) alert("Username too Short!");
        else if(this.state.password.length < 5) alert("Password too Short!");
        else{
            await axios.get('http://localhost:5000/users/get/'+this.state.username)
            .then(response => {
                if(response.data != null) alert("Username Taken!");
                else this.addUser();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    addUser = async () => {
        const newUser = {
            username : this.state.username,
            password : this.state.password,
            role: 'user'
        }
        
        await axios.post('http://localhost:5000/users/add', newUser)
          .then(response => {
            this.setState({user: response.data },this.verifyUser)
            console.log(this.state.user)
          })
          .catch((error) => {
            console.log(error);
          })
          this.props.updateUser(this.state.username);
          setTimeout(5000);
          this.setState({valid: true})
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
                    value = "Sign Up" 
                    className = "btn"
                />
            </form>
            <br></br>
            <Link to="/Login">Login</Link>
            </div> 
        )
    }
}

export default SignUp
