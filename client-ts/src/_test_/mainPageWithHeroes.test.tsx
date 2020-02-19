import React from 'react';
import {MainPage} from '../pages/MainPage'
import { mount,shallow } from 'enzyme';
import renderer, { act } from 'react-test-renderer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Switch,Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import * as actions from '../actions'
import "babel-polyfill"
import 'jest-fetch-mock'

describe('<MainPage/> test ', () => {
    let store;
    let container;
    const mockStore = configureStore([]);
    beforeEach(() => {
        store = mockStore({
            searchUniverse: "",
            heroes: [
                {id:0, name:'Mock_1', universe:'Mock_U'},
                {id:1, name:'Mock_2', universe: 'Mock_U'}
            ],
            oldName: "",
            addHero: {name: "", universe: ""},
            detailHero: null,
            isLoad: true,
            noHeroes: false
        });
    
        store.dispatch = jest.fn();
    
        container = renderer.create(
            <Provider store={store}>
              <Router>
                <Route>
                    <MainPage />
                </Route>
              </Router>
            </Provider>    
        );
    });

  

    it('should render with given state from Redux store', done => {
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });
   
});