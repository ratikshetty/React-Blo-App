import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleModal from './articleModal';
import NewArticleModal from './newArticleModal';


class article extends Component {


    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false,
            modalEle: [],
            showModal: false,
            showNewArticleModal: false,
        };
    }



    componentDidMount() {
        fetch('http://127.0.0.1:5000/meta/100')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json,
                    isLoaded: true
                })

            });
    }

    clickedArticleHandler(element) {
        this.setState({
            showModal: true,
            modalEle: element,
        })
    }

    clickedAddArticleBtnHandler(){
        this.setState({
            showNewArticleModal: true,
        })
    }

    close() {
        this.setState({
            showModal: false,
            modalEle: [],
            showNewArticleModal: false,
        })

        this.componentDidMount()
    }


    updateBlogPost(title, content) {

        fetch('http://127.0.0.1:5000/edit', {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "content": content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {
            let temp = this.state.modalEle
            temp.content = content
            this.setState({
                modalEle: temp
            })

            alert('Updated!!!')
        }).catch(err => err);

    }

    createArticlePost(title, content) {

        fetch('http://127.0.0.1:5000/new', {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "content": content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {
            

            alert('Article created!!!')
            this.close()
        }).catch(err => err);
        
    }

    render() {



        var { data, isLoaded } = this.state;


        if (isLoaded) {
            return (



                <div className="row">

                    {/* Update Blog MOdal */}
                    <ArticleModal
                        showModal={this.state.showModal}
                        element={this.state.modalEle}
                        exit={this.close.bind(this)}
                        update={this.updateBlogPost.bind(this)}
                    />

                    {/* Create New Blog Modal */}
                    <NewArticleModal
                        showModal={this.state.showNewArticleModal}
                        exit = {this.close.bind(this)}
                        create = {this.createArticlePost.bind(this)}
                    />

                    {
                        this.state.data.map(ele =>
                            <div className="col-md-6 mb-4" key={ele.articleId} >
                                <div className="col-md-12 p-1 text-center" onClick={() => this.clickedArticleHandler(ele)}
                                    style={{ borderRadius: 10 + 'px', background: 'white', color: 'black', cursor: 'pointer' }}>
                                    <h3 className="">
                                        {ele.title}

                                    </h3>
                                    <hr></hr>
                                    <p className="p-1"> {ele.content}</p>




                                </div>

                            </div>

                        )
                    }


                    <div className="col-md-12 p-1 mt-5">
                        <div className="row">
                            <div className="col-md-3 mx-auto">
                            <Button className="btn-success btn-block btn-lg" key="addArticleBtn" 
                            onClick={this.clickedAddArticleBtnHandler.bind(this)}>Add Arcticle</Button>
                            </div>
                        </div>

                       
                    </div>
                </div>
            );
        }

        else {
            return (
                <h1>fetching...</h1>);
        }


    }
}

export default article;