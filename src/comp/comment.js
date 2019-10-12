import React, { Component } from 'react';
import { Row, Col, Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let commentBaseURL = 'http://127.0.0.1:5200'

class comment extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: [],
            title:this.props.title
        };
    }

    componentDidMount() {

        let title = this.state.title.split(' ').join('%20')
        fetch(`http://127.0.0.1:5200/retrieve/${title}/1000`)
            .then(response =>  response.json())
            .then(json => {
                this.setState({
                    data: json,
                    isLoaded: true
                })

            })
            .catch(err => console.log(err));
    }

    render(){

        var { data, isLoaded } = this.state;

        if(isLoaded){
            return(
                
                    <div>
                        <hr className="p-0 m-0" style={{height:1}}></hr>
                        <h5 className="pt-3 pb-3"><strong>Comments:</strong></h5>
                        <div className="Row">
                           
                            {data.map(ele => 
                            <div className="col-md-12 pt-3 pb-3 mt-2" style={{background:'grey', borderRadius:10+'px', color:'white', boxShadow:'10px 5px 5px lightgrey'}}>
                                <p className="p-0 m-0">{ele.comment}</p>
                                <p style={{textAlign:'right'}} className="p-0 m-0">- {ele.author}</p>
                            </div>
                            )}
                        </div>
                    </div>
            )
        }
        return(
            null

        )

}
}

export default comment;