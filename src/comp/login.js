import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NONAME } from 'dns';
import { toast } from 'react-toastify';




class login extends Component {


    constructor(props) {
        super(props);

        toast.configure()

        this.state = {
            link: "create new user",
            btnTxt: "Login",
            invalid: 'none'
        };
    }

    changeLink(){

        if(this.state.btnTxt === 'Login'){
            this.setState({
                btnTxt: 'Create User',
                link: 'Existing User'
            })
        }
        else{
            this.setState({
                link: "create new user",
                btnTxt: "Login"
            })
        }
        
       
    }

    login(){

        
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        fetch('http://localhost:3000/user',{
            method: 'GET',
            headers: {
               
                username: username,
                password: password
            },
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            localStorage.setItem('authToken', res.token)
            localStorage.setItem('username', username)
            this.props.exit(true)
        })
        .catch(err =>{
            console.log(err);
            localStorage.removeItem('authToken');
            localStorage.removeItem('username')
            this.setState({
                invalid: 'block'
            })
            
        })
    }

    exit(){

        this.setState({
            invalid: 'none',
            link: "create new user",
            btnTxt: "Login"
        })

        this.props.exit()
    }

    emailModule(){

        if(this.state.btnTxt === 'Create User'){
            return(
                <div className="row pb-2">
                        <div className="col-md-3 text-right">
                            Email Id:
                      </div>
                        <div className="col-md-8">
                            <input id='email' type='email' />
                        </div>
                    </div>
            )
        }
        return (null)
    }

    createUser(){
        
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        let email = document.getElementById('email').value

        fetch('http://localhost:3000/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        }

        ).then(res => {

          
            toast.info('User Created!!!', {
                hideProgressBar: true
            })
        
            this.login()
            this.close()
        }).catch(err => err);

    }

    render() {
        return (
            <Modal show={this.props.showModal} size="md" >
                <Modal.Header >
                    <Modal.Title >LOGIN</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                <div className="row pb-2" style={{display: this.state.invalid}}>
                    <p style={{color: 'red'}}>Invalid Credentials!!!</p>
                    
                </div>

                    <div className="row pb-2">
                        <div className="col-md-3 text-right">
                            Username:
                      </div>
                        <div className="col-md-8">
                            <input id='username' />
                        </div>
                    </div>
                    <div className="row pb-2">
                        <div className="col-md-3 text-right">
                            Password:
                      </div>
                        <div className="col-md-8">
                            <input id='password' type='password' />
                        </div>
                    </div>

                    {this.emailModule()}
                    
                    <div className="row pb-2">
                        <div className="col-md-4 text-right">
                            <p><a onClick={this.changeLink.bind(this)} href style={{color: 'blue', cursor: 'pointer'}}>{this.state.link}</a></p>
                        </div>
                    </div>



                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.exit.bind(this)}>Close</Button>

                    <Button variant="primary" disabled={false} 
                    onClick={this.state.btnTxt !== 'Create User' ? this.login.bind(this) : this.createUser.bind(this)} >{this.state.btnTxt}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default login;