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
        console.log(container.toJSON().children[3].children[2].props)
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });

    it('should dispatch after add button clicked', done => {
        renderer.act( () => {
            container.toJSON().children[3].children[2].props.onClick()
        });
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            {type:'HEROES_LOADED'}
        )
        done();
    })

})