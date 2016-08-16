/*eslint-disable strict */ //disabling check because we can't run strict mode. Need global vars
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header.js');
$ = jQuery = require('jquery'); //need global variable for jquery. which is needed for bootstrap

var App = React.createClass({
        render: function() {
            return (
                <div>
                    <Header />
                    <div className="container-fluid">
                        <RouteHandler />
                    </div>
                </div>
            );
        }
    });

    module.exports = App;