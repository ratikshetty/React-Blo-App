import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleModal from './articleModal';
import NewArticleModal from './newCreateModal';
import ToastComp from './toast';
import Login from './login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            showLoginModal: false,
            addArticle: false
        };
    }





    componentDidMount() {
        toast.configure()

        fetch('http://localhost:3000/articles')
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

        if (!localStorage.username) {
            this.setState({
                showLoginModal: true,
                addArticle: true
            })
        } else {
            this.setState({
                showNewArticleModal: true,
                addArticle: false
            })
        }

    }

    close(verified = false) {
        this.setState({
            showModal: false,
            modalEle: [],
            showNewArticleModal: false,
            showLoginModal: false
        })

        this.componentDidMount()

        if (verified && this.state.addArticle) {
            this.clickedAddArticleBtnHandler()
        }else{
            this.setState({
                addArticle: false
            })
        }
    }

    closeToast() {
        this.setState({
            showToast: false,
        })
    }


    updateBlogPost(title, content) {

        fetch('http://localhost:3000/articles', {
            method: 'PUT',
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

    logout(){
        localStorage.removeItem('username')
        localStorage.removeItem('authToken')

        this.componentDidMount()
        toast.warn("Successfully Logged Out!!!")
    }

    Login(){
        this.setState({
            showLoginModal: true
        })
    }

    createArticlePost(obj) {

        fetch('http://localhost:3000/articles', {
            method: 'POST',
            body: JSON.stringify({
                "title": obj.title,
                "content": obj.content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('authToken')}`

            },

        }

        ).then(res => {

            this.setState({
                showToast: true,
                toastMsg: "Article Created!!!"
            })
            toast.info('Article created!!')
            //alert('Article created!!!')
            this.close()
        }).catch(err => err);

    }

    deleteBlogPost(title) {

        fetch('http://localhost:3000/articles', {
            method: 'DELETE',
            body: JSON.stringify({
                "title": title,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('authToken')}`
            },
        }
        ).then(res => {

            this.setState({
                showToast: true,
                toastMsg: "Article Deleted!!!"
            })
            // alert('Article Deleted!!!')
            toast.info('Article Deleted!!!')
            this.close()
        }).catch(err => err);

    }

    menuBar() {
        // Return Menu bar JSX
        let loginTxt;
        if(localStorage.username){
            loginTxt= (<div onClick={this.logout.bind(this)} style={{cursor: 'pointer'}}>Logout</div>)
        }
        else{
            loginTxt= (<div onClick={this.Login.bind(this)} style={{ cursor: 'pointer'}}>Login</div>)
        }

        return (
            <div className="col-md-12">
                <div id='test' className='row mb-5 container-fluid' style={{position:'fixed', zIndex:'1', background: '#004d80', color: 'goldenrod', maxWidth: `100%` }}>
                    <div className='col-md-1 text-right pt-1 pb-1 pl-4'>
                        <h3><FontAwesomeIcon icon={faBlog} /></h3>
                    </div>
                    <div className='col-md-6 pt-1 pb-1 pl-4 m-auto text-left'>
                        <h3>React-Blog!!!</h3>

                    </div>
                    <div className='col-md-2  text-right pt-2' style={{ color: 'white', borderRight: 'solid', borderWidth:'1px' }}>
                        <p>My Articles</p>
                    </div>
                    <div className='col-md-1  text-center pt-2' style={{ color: 'white', borderRight: 'solid', borderWidth:'1px'}}>
                      {loginTxt}
                       
                    </div>
                    <div className='col-md-2 pr-4 text-center pt-2' style={{ color: 'white' }}>
                        <p><span className='pr-2'><FontAwesomeIcon icon={faUser} /></span>{localStorage.username}</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {



        var { data, isLoaded } = this.state;


        if (isLoaded) {
            return (



                <div className="row">

                    {/* Menu bar */}
                    {this.menuBar()}

                    <div className="col-md-12" style={{ padding: '50px', paddingTop: '100px' }}>
                        <div className='row'>
                            {/* <ToastComp show={this.state.showToast} close={this.closeToast.bind(this)} msg={this.state.toastMsg} /> */}

                            {/* Login modal */}
                            <Login
                                showModal={this.state.showLoginModal}
                                exit={this.close.bind(this)}
                            />

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
                                comp={['title', 'content']}
                                title="New Article"
                                btnText='Create'
                            />

                            {
                                this.state.data.map(ele =>
                                    <div className="col-md-6 mb-4" key={ele.articleId} >
                                        <div className="col-md-12 p-1 text-center" onClick={() => this.clickedArticleHandler(ele)}
                                            style={{ borderRadius: 10 + 'px', background: 'grey', color: 'black', cursor: 'pointer', boxShadow: '10px 10px 8px lightgrey' }}>
                                            <h3 className="pt-2">
                                                {ele.title}

                                            </h3>
                                            <hr style={{ borderColor: 'goldenrod' }}></hr>
                                            <p className="p-1"> {ele.content}</p>
                                        </div>

                                    </div>

                                )
                            }


                            <div className="col-md-12 p-1 mt-5">
                                <div className="row" >
                                    <div className="col-md-3 mx-auto">
                                        <Button style={{ color: 'black' }} className="btn-success btn-block btn-lg" key="addArticleBtn"
                                            onClick={this.clickedAddArticleBtnHandler.bind(this)}>Add Arcticle</Button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else {
            return (
                <div className='row'>
                    {this.menuBar()}
                    <div className='col-md-12' style={{ padding: '50px', paddingTop: '100px' }}>
                        <h1>fetching...</h1>
                    </div>
                </div>
            );
        }


    }
}

export default article;