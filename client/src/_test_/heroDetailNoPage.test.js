import React from 'react';
import {HeroDetailPage} from '../pages/heroDetailPage'
import { mount,shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Switch,Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import * as actions from '../actions'
import "babel-polyfill"
import jest from 'jest-mock';


describe('<HeroList/> test', () => {
    let store;
    let container;
    const mockStore = configureStore([]);

    // fetch = jest.fn(() => Promise.resolve());

    beforeEach(() => {
        store = mockStore({
            searchUniverse: "",
            heroes: [],
            oldName: "",
            addHero: {name: "", universe: ""},
            detailHero: null,
            isLoad: false,
            noHeroes: true
        });
        store.dispatch = jest.fn();
        
        container = renderer.create(
            <Provider store={store}>
              <Router>
                <Route>
                    <HeroDetailPage match={{params: 'no_hero'}}/>
                </Route>
              </Router>
            </Provider>    
        );

        
    });
        
    

    it('should render with given state from Redux store', done => {
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });


})