import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from './comment'
import Tag from './tags'
import NewCreateModal from './newCreateModal'



class articleModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showUpdateModal: false,
            updateDisabled: true,
            editDisable: false,

        };
    }

    update(obj){
        
       this.props.update(this.props.element.title, obj.content)
       this.closeUpdateModal()
    }

    showUpdateModal(){

        document.getElementById('myModal').style.display = "none"
        this.setState({
            
            showUpdateModal: true
        })
    }

    closeUpdateModal(){
        this.setState({
            showUpdateModal: false
        })
        document.getElementById('myModal').style.display = "block"
    }

    

    render() {

        
        return (
            <Modal show={this.props.showModal} size="lg" id='myModal'>
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
                     <hr className='p-0 m-0 pb-3' style={{height:`1px`}}></hr>

                     <Tag title={this.props.element.title}/>

                    <Comment title={this.props.element.title}/>

                    <NewCreateModal
                        showModal={this.state.showUpdateModal}
                        exit={this.closeUpdateModal.bind(this)}
                        create={this.update.bind(this)}
                        comp={['content']}
                        title="Content"
                        btnText = 'Update'
                        value = {this.props.element.content}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.exit}>Close</Button>
                    {/* <Button variant="primary" disabled={this.state.updateDisabled}  onClick={() => {
                        this.props.update(this.props.element.title, document.getElementById('content').value)
                        this.update()
                    }}>update</Button> */}
                    <Button variant="primary" disabled={this.state.editDisable}  onClick={this.showUpdateModal.bind(this)}>edit</Button>
                    <Button variant="danger" onClick={() => {
                        this.props.delete(this.props.element.title)}}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default articleModal;