'use strict';
var React = require('react');
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
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;