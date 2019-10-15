import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import NewArticleModal from './newCreateModal'

let tagBaseURL = 'http://127.0.0.1:5300'

class tags extends Component {



    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false,
            showTagModal: false,
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

            <div className='col-md-3'>
                <h5><strong>Tags: <a style={{ color: 'green', cursor:'pointer' }}  key="delCommentBtn"
                    onClick={() => {
                        this.tagModal()
                    }}>
                        <FontAwesomeIcon icon={faPlus}/>
                        </a></strong></h5>
            </div>




        )
    }

    addTagBtnHandler(obj) {
        fetch(`${tagBaseURL}/new`, {
            method: 'POST',
            body: JSON.stringify({
                "article_title": this.props.title,
                "tag": obj.tag
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            // document.getElementById('tag').value = ""
            this.closeTagModal()


        }).catch(err => err);
    }

    tagModal() {

        document.getElementById('myModal').style.display = "none"
        this.setState({
            showTagModal: true
        })
    }

    closeTagModal() {
        this.setState({
            showTagModal: false
        })
        document.getElementById('myModal').style.display = "block"
        this.componentDidMount()
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
    closeCommentModal
    render() {

        if (this.state.isLoaded) {

            return (
                <div className="">
                    
                    <div className='row '>
                    {this.addTag()}
                        <div className='col-md-9 '>
                            <div className='row'>
                                {this.state.data.map(ele =>
                                    <div className='m-1 p-2 col-md-3' style={{ background: '#004d80', borderRadius: `10px` }}>

                                        <div className='row'>
                                            <div className='col-md-8 pl-3' style={{ wordBreak: 'break-word', color: 'goldenrod' }}>
                                                {ele.tag}
                                            </div>
                                            <div className='col-md-3 text-left' style={{}}>
                                                <a style={{ color: 'rgb(187, 0, 0)', cursor: 'pointer', fontSize: 'small' }} className=" " key="delCommentBtn"
                                                    onClick={() => {
                                                        this.deleteTagBtnHandler(ele.tag)
                                                    }}><FontAwesomeIcon icon={faBan} /></a>
                                            </div>
                                        </div>
                                    </div>)}
                            </div></div>
                    </div>
                    
                    <NewArticleModal
                        showModal={this.state.showTagModal}
                        exit={this.closeTagModal.bind(this)}
                        create={this.addTagBtnHandler.bind(this)}
                        comp={['tag']}
                        title="New Tag"
                        btnText = 'Create'
                    />


                </div>
            )
        }
        else {
            return (
                <div className='row'>
                   
                    {this.addTag()}


                    <NewArticleModal
                        showModal={this.state.showTagModal}
                        exit={this.closeTagModal.bind(this)}
                        create={this.addTagBtnHandler.bind(this)}
                        comp={['tag']}
                        title="New Tag"
                        btnText = 'Create'
                    />
                </div>
            )
        }

    }

}

export default tags;