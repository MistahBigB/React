import React, { Component } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

import { Provider } from './context';

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
      <Provider>
      <Router>
        <React.Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/lyrics/track/:id' component={Lyrics} />
          </Switch>
        </div>
      </React.Fragment>
      </Router>
      </Provider>
    )
  }
}

export default App;
