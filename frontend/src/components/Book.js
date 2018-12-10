import React, { Component } from 'react';
import './Book.css';
import Button from 'react-bootstrap/lib/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getJson, post} from "../data/DataUtils";


class Book extends Component {
 constructor(props) {
    super(props);

    this.state = {
        idBook: this.props.match.params.idBook,
        detailsBook: [],
        similarBooks: []
    };
        this.buttonFormatter = this.buttonFormatter.bind(this);
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


  buttonFormatter(cell, row){
        console.log("row= ", row.id);
        var path = "/book/" + row.id;
      return  <Button
                  onClick={() => this.props.history.push('/book/' + row.id)}
              >Details Book
              </Button>
  }

  render() {
//    var similarBooks = [
//      {"id": "id1S", "title": "t1", "author": "a1"},
//      {"id": "id2S", "title": "t2", "author": "a2"}
//    ];
//    var detailsBook = {
//            	"id": 1,
//            	"url": "http:example.com",
//            	"title": "TiTLU CARTE",
//            	"author": "xyz",
//            	"price": 20.45,
//            	"pages": 458,
//            	"description": "qwerty",
//            	"publisher": "mno",
//            	"language": "lang",
//            	"customer_reviews": 45,
//            	"stars": 10
//            }
//            console.log("detailsBook", detailsBook);

    return (
      <div>
            <h1>{this.state.detailsBook.title}</h1>
        <div id="container">
            <div  id="first">
                <span style={{ "text-align": "justify"}}>
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
            <div  id="second" >
                            <BootstrapTable data={this.state.similarBooks} striped={true} hover={true}  search pagination>
                                  <TableHeaderColumn width="123" dataField="title" isKey={true} dataAlign="center" dataSort={true}>Title</TableHeaderColumn>
                                  <TableHeaderColumn width="123" dataField="author" dataSort={true}>Author</TableHeaderColumn>
                                  <TableHeaderColumn width="123" dataField="button" dataFormat={this.buttonFormatter}>Details</TableHeaderColumn>
                            </BootstrapTable>
            </div>
        </div>
      </div>
    );
  }
}

export default Book;
