import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NewArticleModal from './newCreateModal'

let commentBaseURL = 'http://127.0.0.1:5200'

class comment extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: [],
            title: this.props.title,
            showModal: false
        };
    }

    componentDidMount() {

        let title = this.state.title.split(' ').join('%20')
        fetch(`${commentBaseURL}/retrieve/${title}/1000`)
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
                    data: []
                })
            });
    }

    deleteCommentBtnHandler(id) {

        fetch(`${commentBaseURL}/delete`, {
            method: 'DELETE',
            body: JSON.stringify({
                "id": id,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            // this.setState({
            //     //showToast: true,
            //     //toastMsg: "Article Deleted!!!"
            // })
            this.componentDidMount()

        }).catch(err => err);

    }

    addCommentBtnHandler(obj) {

        fetch(`${commentBaseURL}/new`, {
            method: 'POST',
            body: JSON.stringify({
                "title": this.props.title,
                "comment": obj.comment
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            document.getElementById('comment').value = ""
            this.componentDidMount()

            this.closeCommentModal()
        }).catch(err => err);
    }

    showCommentModal(){
        document.getElementById('myModal').style.display = "none"
        this.setState({
            showModal: true
        })
    }

    closeCommentModal(){

        this.setState({
            showModal: false,
        })
        document.getElementById('myModal').style.display = "block"
        this.componentDidMount()
    }

    addComment() {
        return (
            // <div>
            //     <hr className="p-0 m-0" style={{ height: 1 }}></hr>
            //     <h5 className="pt-3 pb-3"><strong>Comments:</strong></h5>

            //     <div className="row pb-2">
            //         <div className="col-md-3">
            //             <strong>New Comment:</strong>
            //         </div>
            //         <div className="col-md-6">
            //             <input type="text" id="comment" style={{ width: 100 + '%' }}></input>
            //         </div>
            //         <div className="col-md-3">
            //             <Button style={{ color: 'black' }} className="btn-success btn-block" key="delCommentBtn"
            //                 onClick={() => {
            //                     this.addCommentBtnHandler()
            //                 }}>Add</Button>
            //         </div>
            //     </div>


            // </div>

            <div className='row'>
                <div className='col-md-4'>
                <h5 className="pt-3 pb-3"><strong>Comments:</strong></h5>
                </div>
                <div className='col-md-8'>
                <Button style={{color:'black'}} className="btn-success " key="addArticleBtn"
                                    onClick={this.showCommentModal.bind(this)}>Add Comment</Button>
                </div>
            </div>

             
        )
    }

    render() {

        var { data, isLoaded } = this.state;

        if (isLoaded) {
            return (

                <div>

                    {this.addComment()}
                    {/* Create New Blog Modal */}
                    <NewArticleModal
                        showModal={this.state.showModal}
                        exit={this.closeCommentModal.bind(this)}
                        create={this.addCommentBtnHandler.bind(this)}
                        comp = {['comment']}
                        title = "New Comment"
                    />
                    <div className="Row">

                        {data.map(ele =>
                            <div className="col-md-12 pt-3 pb-3 mt-2" style={{ background: 'grey', borderRadius: 10 + 'px', color: 'white', boxShadow: '10px 5px 5px lightgrey' }}>
                                <div className="row">
                                    <div className='col-md-11 pb-2'>
                                        <p className="p-0 m-0">{ele.comment}</p>
                                    </div>
                                    <div className='col-md-1 text-right'>
                                        <a style={{ color: 'rgb(187, 0, 0)', cursor:'pointer' }} className=" " key="delCommentBtn"
                                            onClick={() => {
                                                this.deleteCommentBtnHandler(ele.commentId)
                                            }}><FontAwesomeIcon icon={faTrash} /></a>
                                    </div>
                                </div>

                                <p className="p-0 m-0" style={{color:'black'}}>- {ele.author}</p>


                            </div>
                        )}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {this.addComment()}
                {/* Create New Blog Modal */}
                <NewArticleModal
                       showModal={this.state.showModal}
                       exit={this.closeCommentModal.bind(this)}
                       create={this.addCommentBtnHandler.bind(this)}
                       comp = {['comment']}
                       title = "New comment"
                    />
            </div>

        )

    }
}

export default comment;