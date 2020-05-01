import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     track: []
  //   }
  // }

  // componentDidMount(){
  //   var config = { 
  //   headers: {'Access-Control-Allow-Origin': '*'}
  //   }
  //   axios({
  //     get('https://api.deezer.com/search/artist?q=eminem')
  //   .then(json => console.log(json))
  // }

  render() {
    return (
      <Router>
        <React.Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Index} />
          </Switch>
        </div>
      </React.Fragment>
      </Router>
    )
  }
}

export default App;
