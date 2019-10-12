import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class newArticleModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    createArticle(){
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;

        this.props.create(title, content)
    }

    render(){
        return(
        <Modal show={this.props.showModal} size="lg">
                <Modal.Header >
                    <Modal.Title >Create New Article</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                  <div className="row">
                      <div className="col-md-5 text-right">
                          Title:
                      </div>
                      <div className="col-md-6">
                          <input type="text" id="title"></input>
                      </div>
                  </div>

                  <div className="row pt-3">
                      <div className="col-md-5 text-right">
                          Content:
                      </div>
                      <div className="col-md-6">
                          <input type="text" id="content"></input>
                      </div>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                  
                    <Button variant="primary" disabled={false}  onClick={this.createArticle.bind(this)}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default newArticleModal;