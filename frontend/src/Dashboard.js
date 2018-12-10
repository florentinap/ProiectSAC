import React, { Component } from 'react';
import './Dashboard.css';
// import react router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Book from './components/Book'
import AllBooks from './components/AllBooks.js'
import Button from 'react-bootstrap/lib/Button';

class Dashboard extends Component {
 constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className="App">
            <Router>
                       <div>
                            <Link to="/allBooks"><Button  style={{float:'left'}}>All Books</Button></Link>
                       <Switch>
                          <Route exact path='/allBooks' component={AllBooks} />
                          <Route path="/book/:idBook" component={Book}/>
                       </Switch>
                    </div>
            </Router>


      </div>
    );
  }
}

export default Dashboard;
