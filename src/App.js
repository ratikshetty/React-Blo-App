import React from 'react';
import './App.css';
import Article from './comp/article'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="">
      <div className='row container-fluid p-0 m-0 mb-5' style={{ position: 'fixed', zIndex: '1', background: '#004d80', color: 'goldenrod' }}>
        <div className='col-md-1 text-right pt-1 pb-1 pl-4'>
          <h1><FontAwesomeIcon icon={faBlog} /></h1>
        </div>
        <div className='col-md-11 pt-1 pb-1 pl-4 m-auto text-left'>
          <h2>React-Blog!!!</h2>
        </div>
      </div>
      <div style={{ padding: '50px', paddingTop: '100px' }}>
        <div className="container-fluid">

          <Article />
        </div>

      </div>
    </div>
  );
}

export default App;
