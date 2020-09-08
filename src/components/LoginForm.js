import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import UserStore    from '../stores/UserStore';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false
        }
    } 
// PROPERTY HERE REFERS TO THE 'EMAIL' AND 'PASSWORD'
    setInputValue(property, val) {
        val = val.trim();
        if(val.length < 0){
            return;
        }
        this.setState({
            [property]: val
        })
    }
    resetForm() {
        this.setState({
            email: '',
            password: '',
            buttonDisabled: false
        })
    }
    // API CALL FOR THE LOGIN BUTTON
    async doLogin() {
        if (!this.state.email){
            return;
        }
        if (!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
           
            let res = await fetch('http://127.0.0.1:8000/login/users/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
            }

            else if (result && result.success === false) {
                this.resetForm();
                alert (result.msg);
            }
        }

        catch(e) {
            console.log(e);
            this.resetForm();

        }
    }
    render(){  
    // USER INTERFACE FOR THE LOGIN FORM
        return(
            
            <div className="LoginForm">
                <div className='log'> Sign into your account </div >

                {/* THE INPUT FIELD FOR EMAIL ADDRESS */}
                    <InputField
                        type = 'email'
                        placeholder = 'Email *'
                        required = 'True' 
                        value = { this.state.email ? this.state.email: ''}
                        onChange = { (val) => this.setInputValue('email', val)}
                />
                {/* THE INPUT FIELD FOR PASSWORD */}
        
                    <InputField
                        type = 'password'
                        placeholder = 'Password *' 
                        required = 'True' 
                        value = { this.state.password ? this.state.password: ''}
                        onChange = { (val) => this.setInputValue('password', val)}
                    />
                {/* THE LOG IN BUTTON */}
                    <SubmitButton
                        text = 'Sign in to your account'
                        disabled = { this.state.buttonDisabled}
                        onClick = { () => this.doLogin()}
                        />
                {/* THE CODE BELLOW CREATES A HORIZONTAL LINE */}
                    <hr className='line'></hr>
                        
                        <div className= 'sign'>
                            Don't have an account? 
                            <Link to = {'/'}> Sign Up!</Link>
                        </div>
            </div>
            
        );
    }
}

export default LoginForm;