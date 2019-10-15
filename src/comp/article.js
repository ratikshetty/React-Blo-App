import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleModal from './articleModal';
import NewArticleModal from './newCreateModal';
import ToastComp from './toast';



class article extends Component {



    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false,
            modalEle: [],
            showModal: false,
            showNewArticleModal: false,
            showToast: false,
            toastMsg: null,
        };
    }

    



    componentDidMount() {
        fetch('http://127.0.0.1:5100/meta/100')
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

    clickedAddArticleBtnHandler() {
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

    closeToast(){
        this.setState({
            showToast: false,
        })
    }


    updateBlogPost(title, content) {

        fetch('http://127.0.0.1:5100/edit', {
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
                modalEle: temp,
                showToast: true,
                toastMsg: "Article Updated!!!"
            })

            // alert('Updated!!!')

        }).catch(err => err);

    }

    createArticlePost(obj) {

        fetch('http://127.0.0.1:5100/new', {
            method: 'POST',
            body: JSON.stringify({
                "title": obj.title,
                "content": obj.content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            this.setState({
                showToast: true,
                toastMsg: "Article Created!!!"
            })
            //alert('Article created!!!')
            this.close()
        }).catch(err => err);

    }

    deleteBlogPost(title) {

        fetch('http://127.0.0.1:5100/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                "title": title,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        ).then(res => {

            this.setState({
                showToast: true,
                toastMsg: "Article Deleted!!!"
            })
            // alert('Article Deleted!!!')
            this.close()
        }).catch(err => err);

    }

    render() {



        var { data, isLoaded } = this.state;


        if (isLoaded) {
            return (



                <div className="row">

                    <ToastComp  show={this.state.showToast} close={this.closeToast.bind(this)} msg={this.state.toastMsg}/>
                   


                    {/* Update Blog MOdal */}
                    <ArticleModal
                        showModal={this.state.showModal}
                        element={this.state.modalEle}
                        exit={this.close.bind(this)}
                        update={this.updateBlogPost.bind(this)}
                        delete={this.deleteBlogPost.bind(this)}
                    />

                    {/* Create New Blog Modal */}
                    <NewArticleModal
                        showModal={this.state.showNewArticleModal}
                        exit={this.close.bind(this)}
                        create={this.createArticlePost.bind(this)}
                        comp = {['title', 'content']}
                        title = "New Article"
                    />

                    {
                        this.state.data.map(ele =>
                            <div className="col-md-6 mb-4" key={ele.articleId} >
                                <div className="col-md-12 p-1 text-center" onClick={() => this.clickedArticleHandler(ele)}
                                    style={{ borderRadius: 10 + 'px', background: 'grey', color: 'black', cursor: 'pointer', boxShadow:'10px 10px 8px lightgrey' }}>
                                    <h3 className="pt-2">
                                        {ele.title}

                                    </h3>
                                    <hr style={{borderColor:'goldenrod'}}></hr>
                                    <p className="p-1"> {ele.content}</p>




                                </div>

                            </div>

                        )
                    }


                    <div className="col-md-12 p-1 mt-5">
                        <div className="row" >
                            <div className="col-md-3 mx-auto">
                                <Button style={{color:'black'}} className="btn-success btn-block btn-lg" key="addArticleBtn"
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