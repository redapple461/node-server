import React from 'react';
import {MainPage} from '../pages/MainPage'
import { mount,shallow } from 'enzyme';
import renderer from 'react-test-renderer'
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
                    <MainPage/>
                </Route>
              </Router>
            </Provider>    
        );
    })

    it('should render with given state from Redux store', done => {
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });

    it('should contain header', done => {
        expect(container.toJSON().children[0]).toBeDefined();
        expect(container.toJSON().children[0].children[0].children[0].trim()).toBe('Tours of heroes');
        done();
    });

    it('should contain link to heroes ', done => {
        expect(container.toJSON().children[1].children[0].type).toBe('a');
        expect(container.toJSON().children[1].children[0].props.href).toBe('/heroes');
        done();
    });

    it('should call to API on start', done => {
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(
            actions.getData({ID:1})
        );
        
        done();
    });
    
    it('should contain 3 radio buttons', done => {
        expect(container.toJSON().children[1].children[1].children.length).toBe(3);
        done();
    });


    it('should call dispatch after change radio btn', done => {
        renderer.act( () => {
            container.toJSON().children[1].children[1].children[0].children[0].props.onChange()
        });
    
        expect(store.dispatch).toHaveBeenCalledTimes(4);
        expect(store.dispatch).toHaveBeenCalledWith(
            actions.setMarvel({type: 'SET_MARVEL'})
        );
        done();
    });

    it('should call dispatch after change radio btn', done => {
        renderer.act( () => {
            container.toJSON().children[1].children[1].children[1].children[0].props.onChange();
        });
        expect(store.dispatch).toHaveBeenCalledTimes(4);
        expect(store.dispatch).toHaveBeenCalledWith(
            actions.setDC({type: 'SET_DC'})
        );
        done();
    });

    it('should call dispatch after change radio btn', done => {
        renderer.act( () => {
            container.toJSON().children[1].children[1].children[2].children[0].props.onChange()
        });
        expect(store.dispatch).toHaveBeenCalledTimes(4);
        expect(store.dispatch).toHaveBeenCalledWith(
            actions.setBoth({type: 'SET_BOTH'})
        );
        done();
    });



   
});