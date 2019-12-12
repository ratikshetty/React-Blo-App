import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




class login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            link: "create new user",
            btnTxt: "Login"
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


    render() {
        return (
            <Modal show={this.props.showModal} size="md" >
                <Modal.Header >
                    <Modal.Title >LOGIN</Modal.Title>

                </Modal.Header>

                <Modal.Body>


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
                            <input id='username' type='password' />
                        </div>
                    </div>
                    <div className="row pb-2">
                        <div className="col-md-4 text-right">
                            <p><a onClick={this.changeLink.bind(this)} style={{color: 'blue', cursor: 'pointer'}}>{this.state.link}</a></p>
                        </div>
                    </div>



                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>

                    <Button variant="primary" disabled={false}  >{this.state.btnTxt}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default login;