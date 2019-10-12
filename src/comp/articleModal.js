import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from './comment'



class articleModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            ele: {'title': 'test'},
            updateDisabled: true,
            editDisable: false,

        };
    }

    update(){
        this.setState({
            showEdit: !this.state.showEdit,
            updateDisabled: !this.state.updateDisabled,
            editDisable: !this.state.editDisable,
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
                    <hr ></hr>

                    <div className="row p-1">
                        <div className="col-md-6 text-left">
                            <p><strong>Author:</strong> {this.props.element.author}</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p><strong>Last Modified:</strong> {this.props.element.modifiedDate}</p>
                        </div>

                    </div>
                    {this.state.showEdit ?
                    <div className="row p-1" >
                        <div className="col-md-2">
                        <p> <strong>Content:</strong></p>
                        </div>
                        <div className="col-md-8">
                           
                          <input type="text" id="content" ></input>
                        </div>

                    </div>
                    

                     : null }

                    <Comment title={this.props.element.title}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                    <Button variant="primary" disabled={this.state.updateDisabled}  onClick={() => {
                        this.props.update(this.props.element.title, document.getElementById('content').value)
                        this.update()
                    }}>update</Button>
                    <Button variant="primary" disabled={this.state.editDisable}  onClick={this.update.bind(this)}>edit</Button>
                    <Button variant="danger" onClick={() => {
                        this.props.delete(this.props.element.title)}}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default articleModal;