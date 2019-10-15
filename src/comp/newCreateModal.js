import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



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
                      <div className="col-md-5 text-right">
                            {ele.toUpperCase()}:
                      </div>
                      <div className="col-md-6">
                          <input type="text" id={ele}></input>
                      </div>
                  </div>

                  )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                  
                    <Button variant="primary" disabled={false}  onClick={this.create.bind(this)}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default newCreateModal;