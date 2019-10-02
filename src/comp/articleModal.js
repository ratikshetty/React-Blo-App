import React, { Component } from 'react';
import { Row, Col, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class articleModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            ele: {'title': 'test'},

        };
    }

    update(){
        this.setState({
            showEdit: true,
        })

        // if(document.getElementById('content') !== null){
        //     let temp = document.getElementById('content').value
        //     alert(temp)
        // }
       
    }

    

    render() {

        
        return (
            <Modal show={this.props.showModal} size="lg">
                <Modal.Header >
                    <Modal.Title >{this.props.element.title}</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <p className="text-center">{this.props.element.content}</p>
                    <hr></hr>

                    <div className="row p-1">
                        <div className="col-md-6 text-left">
                            <p>Author: {this.props.element.author}</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p>Last Modified: {this.props.element.modifiedDate}</p>
                        </div>

                    </div>
                    {this.state.showEdit ?
                    <div className="row p-1" >
                        
                        <div className="col-md-8">
                          <input type="text" id="content" value={this.props.content}></input>
                        </div>

                    </div> : null }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                    <Button variant="primary"  onClick={() => {
                        this.props.update(this.props.element.title, document.getElementById('content').value)
                    }}>update</Button>
                    <Button variant="primary" onClick={this.update.bind(this)}>edit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default articleModal;