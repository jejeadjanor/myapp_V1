import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from "../constants";

export default class Signup extends Component {
    state =  {
        fname: "",
        lname: "", 
        username: "",
        email: "",
        password: "",
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signUp = e => {
        e.preventDefault();
        axios.post(API_URL, this.state)
        .then(() => {
            console.log(this.state)
            this.setState({
                first_name: "",
                last_name: "", 
                username: "",
                email: "",
                password: "",
            })
        })
    }
    render() {
        return (
            // Registration form 
            <div className="container"> 
                    <p className="register">Registration</p>
                        <form onSubmit={this.signUp} className="grid-container">
                            <div>
                                <input type="text" name="fname" 
                                value={this.state.fname} 
                                onChange={this.onChange}
                                placeholder="First Name *" required/>
                                <input type="text" name="lname" 
                                value={this.state.lname} 
                                onChange={this.onChange}
                                placeholder="Last Name *" required/>
                                 <input type="text" name="username"
                                value={this.state.username} 
                                onChange={this.onChange}
                                placeholder="Username *" required/>
                                <input type="text" name="email"
                                value={this.state.email} 
                                onChange={this.onChange}
                                placeholder="Email *" required/>
                                <input type="text" name="password"
                                value={this.state.password}
                                onChange={this.onChange} 
                                placeholder="Password" required/>
                                <button className="bttn">Create Account</button>
                            </div>
                        </form>
            </div>  
        )
    }
}
