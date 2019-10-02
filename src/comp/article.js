import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleModal from './articleModal';



class article extends Component {


    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false,
            modalEle: [],
            showModal: false,
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

    close() {
        this.setState({
             showModal: false,
            modalEle: [],
        })

        this.componentDidMount()
     }


    updateBlogPost(title, content) {
    
        fetch('http://127.0.0.1:5000/edit',{
            method: 'POST',
            body: JSON.stringify({"title": title,
        "content": content}),
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

    render() {

                

        var { data, isLoaded } = this.state;


        if (isLoaded) {
            return (



                <div className="row">
                    <ArticleModal
                        showModal={this.state.showModal}
                        element={this.state.modalEle}
                        exit={this.close.bind(this)}
                        update = {this.updateBlogPost.bind(this)}
                    />

                    {
                        this.state.data.map(ele =>
                            <div className="col-md-6" key={ele.articleId} >
                                <div className="col-md-12 p-1 text-center" onClick={() =>this.clickedArticleHandler(ele) }
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