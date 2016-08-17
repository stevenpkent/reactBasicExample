//entry point for the application
'use strict';
var React = require('react');
var Router = require('react-router');
var Routes = require('./routes');

Router.run(Routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});
