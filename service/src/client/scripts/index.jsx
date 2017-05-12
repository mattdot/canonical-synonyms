import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import synonymApp from './reducers/index';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { App } from './components/app.jsx';
import Browse from './components/browse.jsx';
import { Improve } from './components/improve.jsx';
import { Configure } from './components/configure.jsx';


let store = createStore(synonymApp, {
    canonicals : [
        { entity : "status", canonical: "unpaid", synonyms : ["due", "not paid"]},
        { entity : "status", canonical: "paid", synonyms : ["settled", "completed"]},
        { entity : "status", canonical: "scheduled", synonyms : ["pending"]}
    ]
});

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Browse}/>
                <Route path="improve" component={Improve}/>
                <Route path="configure" component={Configure}/>
            </Route>
        </Router>
    </Provider>
, document.getElementById('app')); 