'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList.js');

var AuthorPage = React.createClass({
    getInitialState: function() { //lifecycle hook
        return {
            authors: []
        };
    },
    componentDidMount: function() { //lifecycle hook
        if (this.isMounted()) {
            this.setState({ authors: AuthorApi.getAllAuthors() }); //use setter to set state
        }
    },
    render: function() {
        return (
            <div>
                <h1>Authors</h1> 
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>         
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;