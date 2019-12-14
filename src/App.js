import React from 'react';
import './App.css';
import Article from './comp/article'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="">
      
      {/* <div style={{ padding: '50px', paddingTop: '100px' }}> */}
        <div className="container-fluid">

          <Article />
        </div>

      </div>
    // </div>
  );
}

export default App;
