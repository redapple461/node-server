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
            detailHero: {id:0,name:'Mock',universe:'Mock_U'},
            isLoad: false,
            noHeroes: true
        });
        store.dispatch = jest.fn();
        
        container = renderer.create(
            <Provider store={store}>
              <Router>
                <Route>
                    <HeroDetailPage/>
                </Route>
              </Router>
            </Provider>    
        );

        
    })
        
    

    

    it('should render with given state from Redux store', done => {
        console.log(container.toJSON());
        expect(container.toJSON()).toMatchSnapshot();
        done();
    });

    it('shouldnt call dispatch at start', done => {
        expect(store.dispatch).toHaveBeenCalledTimes(0);
        done();
    });

    it('should call dispatch on input change', done => {
        renderer.act( () => {
            container.toJSON().children[1].children[1].props.onChange({ target: { value: 'Mock_2' } })
        });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
                type: "UPDATE_NAME",
                newName: "Mock_2"
            }
        );
        done();
    });


    it('should call dispatch on save btn click', done => {
        renderer.act( () => {
            container.toJSON().children[3].props.onClick()
        });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        done();
    });

})