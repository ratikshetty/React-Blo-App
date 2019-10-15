import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

let tagBaseURL = 'http://127.0.0.1:5300'

class tags extends Component {



    constructor(props) {
        super(props);

        this.state = {
          data: [],
          isLoaded: false
        };
    }

    componentDidMount() {

       
        fetch(`${tagBaseURL}/searchTag/${this.props.title}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json,
                    isLoaded: true
                })

            })
            .catch(err => {
                console.log(err)
                this.setState({
                    data: [],
                    isLoaded: false
                })
            });
    }

    addTag() {
        return (
            <div>
                

                <div className="row pb-2 pt-4">
                    <div className="col-md-3">
                        <strong>New Tags:</strong>
                    </div>
                    <div className="col-md-6">
                        <input type="text" id="tag" style={{ width: 100 + '%' }}></input>
                    </div>
                    <div className="col-md-3">
                        <Button style={{ color: 'black' }} className="btn-success btn-block" key="delCommentBtn"
                            onClick={() => {
                                this.addTagBtnHandler()
                            }}>Add</Button>
                    </div>
                </div>


            </div>
        )
    }

    addTagBtnHandler(){
        fetch(`${tagBaseURL}/new`, {
            method: 'POST',
            body: JSON.stringify({
                "article_title": this.props.title,
                "tag": document.getElementById('tag').value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            document.getElementById('tag').value = ""
            this.componentDidMount()

            
        }).catch(err => err);
    }


    deleteTagBtnHandler(tag) {

        fetch(`${tagBaseURL}/removeTag`, {
            method: 'DELETE',
            body: JSON.stringify({
                "article_title": this.props.title,
                "tag": tag
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {
            this.componentDidMount()

        }).catch(err => err);

    }

    render(){

        if(this.state.isLoaded){

        return (
            <div className="">
                <hr className='p-0 m-0'></hr>
                <div className='row pt-3'>
                    <div className='col-md-3'>
                        <p><strong>Tags:</strong></p>
                    </div>
                    <div className='col-md-9 '>
                        <div className='row'>
                        {this.state.data.map(ele =>
                            <div className='m-1 p-2 col-md-3' style={{background:'#004d80', borderRadius:`10px`}}>
                            
                            <div className='row'>
                                <div className='col-md-8 pl-3' style={{wordBreak:'break-word', color:'goldenrod'}}>
                                {ele.tag}
                                </div>
                                <div className='col-md-3 text-left' style={{}}>
                                <a style={{ color: 'rgb(187, 0, 0)', cursor:'pointer', fontSize:'small' }} className=" " key="delCommentBtn"
                                            onClick={() => {
                                                this.deleteTagBtnHandler(ele.tag)
                                            }}><FontAwesomeIcon icon={faBan} /></a>
                                    </div>
                            </div>
                            </div>)}
                    </div></div>
                </div>
                {this.addTag()}
                
                
            </div>
        )
        }
        else{
            return(
                this.addTag()
            )
        }

    }

}

export default tags;