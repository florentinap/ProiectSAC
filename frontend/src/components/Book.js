/* Copyright (C) Maria-Ramona Raducu - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Maria-Ramona Raducu <raducu.ramona95@gmail.com>, December 2018
*/

import React, { Component } from 'react';
import './Book.css';
import Button from 'react-bootstrap/lib/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getJson, post} from "../data/DataUtils";

const display = {
  display: 'block',
  width: '800px',
  height: '800px',
  left: '19%',
  top: '30%'


};
const hide = {
  display: 'none'
};

class Book extends Component {

 constructor(props) {
    super(props);

    this.state = {
        idBook: this.props.match.params.idBook,
        detailsBook: [],
        similarBooks: [],
        toggle: false,
        OK:'',
        error:''
    };
        this.toggle = this.toggle.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
  }

 toggle() {

     this.setState(prevState => ({
       toggle: !prevState.toggle
     }));

     post("favorite", {"idUser": 1,
                      "idBook": this.state.idBook}).then(response => {
                      this.setState({OK: response.OK,
                                    error: response.error
                      })
     });
 }


 componentDidMount() {

      var obj = {
          "idBook": this.state.idBook
         };
      console.log("OBJ::: ", obj);

      post("bookById", obj).then(response => {
         this.setState({
                      detailsBook: response,
         })
      });
   post("similarBooks", obj).then(response => {
        this.setState({
                     similarBooks: response,
        })
   });

  }

 handleClick(id) {
        post("bookById", {'idBook': id}).then(response => {
            this.setState({detailsBook: response,
            show: false
            })
        });
        post("similarBooks", {'idBook': id}).then(response => {
            this.setState({similarBooks: response})
        });
 }


  buttonFormatter(cell, row){
        console.log("row= ", row.id);
        var path = "/book/" + row.id;
      return  <Button onClick={() => this.handleClick(row.id)}>Details Book
              </Button>
  }

  render() {
  var modal = [];
  var text;
  if(this.state.OK == 'ok') {
    text = "You have successfully added the book to your favorites list";
   }
  else {
    text = "Cannot set favorite book";
  }

    modal.push(
      <div className="modal"   style={this.state.toggle ? display : hide}>
      <div className="modal-content">
        <h4>Add favorite book</h4>
        <p>{text}</p>
        <div className="modal-footer">
            <a className="btn" onClick={this.toggle}>Agree</a>
        </div>
      </div>
    </div>
    );


    return (
      <div>
       {modal}
        <h1>{this.state.detailsBook.title}</h1>
        <div id="container">
            <div  id="first">
                <span style={{ "text-align": "justify"}}>
                    <div>
                         <button type="button" class="btn btn-light"  onClick={this.toggle}>Add favorite</button>
                    </div>
                       &nbsp;
                    <div>
                        <b> Author: </b> {this.state.detailsBook.author}
                    </div>
                       &nbsp;
                    <div>
                        <b> Description: </b> {this.state.detailsBook.description}
                    </div>
                        &nbsp;
                    <div>
                        <b> Price: </b> {this.state.detailsBook.price} Ron
                    </div>
                       &nbsp;
                    <div>
                        <b> Pages: </b> {this.state.detailsBook.pages}
                    </div>
                       &nbsp;
                    <div>
                        <b> Publisher: </b> {this.state.detailsBook.publisher}
                    </div>
                       &nbsp;
                    <div>
                        <b> Language: </b> {this.state.detailsBook.language}
                    </div>
                       &nbsp;

                    <div>
                    <b> Customer Reviews: </b> {this.state.detailsBook.customer_reviews}
                    </div>
                       &nbsp;
                    <div>
                    <b> Stars: </b> {this.state.detailsBook.stars}
                    </div>
                </span>
            </div>
             <div  id="space">
             </div>
            <div  id="second" >
                            <BootstrapTable data={this.state.similarBooks} striped={true} hover={true}  search pagination>
                                  <TableHeaderColumn width="123" dataField="title" isKey={true} dataAlign="center" dataSort={true}>Title</TableHeaderColumn>
                                  <TableHeaderColumn width="123" dataField="author" dataAlign="center"  dataSort={true}>Author</TableHeaderColumn>
                                  <TableHeaderColumn width="123" dataField="rating" dataAlign="center" dataSort={true}>Rating</TableHeaderColumn>
                                  <TableHeaderColumn width="123" dataField="button" dataAlign="center" dataFormat={this.buttonFormatter}>Details</TableHeaderColumn>
                            </BootstrapTable>
            </div>
        </div>
      </div>
    );
  }
}

export default Book;
