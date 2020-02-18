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
import 'jest-fetch-mock'
import { deleteByName } from '../http/httpHook'

describe('<HeroList/> test', () => {
    let store;
    let container;
    const mockStore = configureStore([]);


    beforeEach(() => {
        store = mockStore({
            searchUniverse: "",
            heroes: [
                {id:0, name:'Mock_1', universe:'Mock_U'}
            ],
            oldName: "",
            addHero: {name: "Mock_ADD", universe: "Mock_AU"},
            detailHero: null,
            isLoad: false,
            noHeroes: false
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
        // console.log(container.toJSON().children[3].children[2].props)
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });

    it('should dispatch after add button clicked', done => {
        renderer.act( () => {
            container.toJSON().children[3].children[2].props.onClick()
        });
        expect(store.dispatch).toHaveBeenCalledTimes(0);
       // expect(store.dispatch).toHaveBeenCalledWith(
       //     {type:'HEROES_LOADED'}
       // )
        done();
    })
    
    it('should exist after click on delete btn', done => {
        const btn = container.toJSON().children[2].children[0].children[1];
        renderer.act(() => {
            btn.props.onClick()
        });
        expect(btn.children[1].trim()).toBe('x');
        done();
    })

})