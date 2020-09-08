import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import UserStore    from '../stores/UserStore';

// EMAIL VALIDATION
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            buttonDisabled: false
        }
    }
// THE CODE BELLOW CHECKS FOR EMAIL VALIDATION
hannpdleTouchTap = () => {
    if(this.state.email === '' || this.state.email == null){
        this.setState({
        emailError: "Email text field cannot be empty"
        //document.getElementByid('emailError').innerHTML ="Email text field cannot be empty";
    });
    }
    else if (!emailPattern.test(this.state.email) && this.state.email.length > 0) {
        this.setState({
        emailError: "Enter a valid email"
        });
    }
} 

// PROPERTY HERE REFERS TO THE 'Email/USERNAME' AND 'PASSWORD'
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
                <div className='log'> Sign in to your account </div >

                {/* THE INPUT FIELD FOR EMAIL ADDRESS */}
                    <InputField
                        type = 'text'
                        placeholder = 'Email'
                        value = { this.state.email ? this.state.email: ''}
                        onChange = { (val) => this.setInputValue('email', val)}

                />
                {/* THE INPUT FIELD FOR PASSWORD */}
        
                    <InputField
                        type = 'password'
                        placeholder = 'Password'
                        value = { this.state.password ? this.state.password: ''}
                        onChange = { (val) => this.setInputValue('password', val)}
                    />
                {/* THE LOG IN BUTTON */}
                    <SubmitButton
                        text = 'Sign in to your account'
                        disabled = { this.state.buttonDisabled}
                        onClick = { () => this.hannpdleTouchTap()}
                        />

                            {/* <center><p id='emailError'>HELLO</p></center> */}
  
                {/* THE CODE BELLOW CREATES A HORIZONTAL LINE */}
                    <hr></hr>
                        
                        <div className= 'sign'>
                            Don't have an account? 
                            <a href = {'reset.html'}> Sign Up!</a>
                        </div>
                </div>
           
        );
    }
}

export default LoginForm;