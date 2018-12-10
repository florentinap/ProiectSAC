import React, { Component } from 'react';
import './AllBooks.css';
import {getAllBooks, getJson, post} from "../data/DataUtils";
import Button from 'react-bootstrap/lib/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Book from  './Book.js';
// import react router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class AllBooks extends Component {
 constructor(props) {
    super(props);

    this.state = {
        allBooks: [],
        idBook: 0
    };
    this.buttonFormatter = this.buttonFormatter.bind(this);
  }

   componentDidMount() {
         getJson("allBooks" ).then(response => {
                this.setState({
                          allBooks: response,
                })
          })
   }

  buttonFormatter(cell, row){
      console.log("row= ", row.id);
      var path = "/book/" + row.id;
      return    <Button
                    onClick={() => this.props.history.push('/book/' + row.id)}
                >Details Book</Button>
  }


  render() {
  console.log("::::::: ", this.state.allBooks);
 // this.state.allBooks =  getJson("/allBooks");
//  var allBooks = [
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id1", "title": "t1", "author": "a1"},
//    {"id": "id2", "title": "t2", "author": "a2"}
//  ];

    return (
      <div className="App">
            <h1> Books </h1>
            <div  className="container">
                <BootstrapTable data={this.state.allBooks} striped={true} hover={true}  search pagination>
                      <TableHeaderColumn width="123" dataField="title" isKey={true} dataAlign="center" dataSort={true}>Title</TableHeaderColumn>
                      <TableHeaderColumn width="123" dataField="author" dataSort={true}>Author</TableHeaderColumn>
                      <TableHeaderColumn width="123" dataField="button" dataFormat={this.buttonFormatter}>Details</TableHeaderColumn>
                </BootstrapTable>
            </div>
      </div>
    );
  }
}

export default AllBooks;
