import React, { Component } from 'react';
import { Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class toast extends Component {


    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

    

            return (
                <div className="col-md-11 p-2" style={{position:"fixed", top:0, zIndex:99, color:"white"}}>
                    <Toast  show={this.props.show} onClose={this.props.close} style={{maxWidth:100+'%'}} delay={3000} autohide>
                        <Toast.Header style={{backgroundColor:"green", color:"white"}}>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Blog Alert</strong>
                            <small>Now</small>
                        </Toast.Header>
                        <Toast.Body style={{backgroundColor:"green"}}>{this.props.msg}</Toast.Body>
                    </Toast>



                </div>
            )
        }
        
    }



export default toast;