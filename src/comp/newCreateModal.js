import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextareaAutosize from 'react-autosize-textarea';




class newCreateModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    create(){
        let obj = {}

        this.props.comp.forEach(ele => {
            obj[ele] = document.getElementById(ele).value
        })

        this.props.create(obj)
    }


    render(){
        return(
        <Modal show={this.props.showModal} size="lg" >
                <Modal.Header >
                    <Modal.Title >{`CREATE ${this.props.title.toUpperCase()}`}</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {this.props.comp.map(ele =>
                  <div className="row pb-2">
                      <div className="col-md-3 text-right">
                            {ele.toUpperCase()}:
                      </div>
                      <div className="col-md-8">
                          <TextareaAutosize type="text" 
                            id={ele} async
                            defaultValue={this.props.value}
                             style={{width: 100+'%'}} ></TextareaAutosize>
                      </div>
                  </div>

                  )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                  
                    <Button variant="primary" disabled={false}  onClick={this.create.bind(this)}>{this.props.btnText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default newCreateModal;