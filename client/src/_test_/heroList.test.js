import React from 'react';
import HeroList from '../pages/heroList'
import { mount,shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Switch,Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import * as actions from '../actions'
import "babel-polyfill"

describe('<HeroList/> test', () => {
    let store;
    let container;
    const mockStore = configureStore([]);


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
        //fetch = jest.fn(() => {body: 'ok'});
         store.dispatch = jest.fn();
        container = renderer.create(
            <Provider store={store}>
              <Router>
                <Route>
                    <HeroList/>
                </Route>
              </Router>
            </Provider>    
        );
    })

    it('should render with given state from Redux store', done => {
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });

    it('should contain header with title', done => {
        expect(container.toJSON().children[0].children[0].trim()).toBe('Heroes List');
        done();
    });

    it('should contain link to dashboard', done => {
        expect(container.toJSON().children[1].props.href.trim()).toBe('/main');
        done();
    });

    it('should contain heroes without fetch', done => {
        expect(container.toJSON().children[2].children[0].children[0].trim()).toBe('No heroes :(');
        done();
    });
    
    it('should contain add new hero div', done => {
        expect(container.toJSON().children[3].type).toBe('div');
        expect(container.toJSON().children[3].children[0].trim()).toBe('Add new hero');
        done();
    });

    it('should call dispatch once at start', done => {
        expect(store.dispatch).toHaveBeenCalledTimes(0);
        done();
    });
})