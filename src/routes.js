'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var Routes = (
    <Route name="app" path="/" handler={require('./components/app.js')}>
        <DefaultRoute handler={require('./components/homePage.js')} />
        <Route name="authors" handler={require('./components/authors/authorPage.js')} />
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage.js')} />
        <Route name="about" handler={require('./components/about/aboutPage.js')} />
        <Redirect from="about-us" to="about" />   
        <NotFoundRoute handler={require('./components/notFoundPage.js')} />       
    </Route>
);

module.exports = Routes;