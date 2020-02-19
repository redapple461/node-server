import React from 'react';
import HeroList from '../pages/heroList';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import * as actions from '../actions';
import 'babel-polyfill'

describe('<HeroList/> test', () => {
	let store;
	let container;
	const mockStore = configureStore([]);

	beforeEach(() => {
		store = mockStore({
			searchUniverse: '',
			heroes: [],
			oldName: '',
			addHero: {name: '', universe: '', skills: []},
			detailHero: null,
			isLoad: true,
			noHeroes: true
		});
		// fetch = jest.fn(() => {body: 'ok'});
		store.dispatch = jest.fn();
		container = renderer.create(
			<Provider store={store}>
			  <Router>
				<Route>
					<HeroList history={{goBack : jest.fn()}}/>
				</Route>
			  </Router>
			</Provider>
		);
	});

	it('should render with given state from Redux store', done => {
		expect(container.toJSON()).toMatchSnapshot();
		done();
	});

	it('should contain header with title', done => {
		expect(container.toJSON()[0].children[0].trim()).toBe('Heroes List');
		done();
	});

	it('should contain link to dashboard', done => {
		expect(container.toJSON()[1].props.href.trim()).toBe('/main');
		done();
	});

	it('should contain no heroes without fetch', done => {
		expect(container.toJSON()[2].children[0].trim()).toBe('No heroes :(');
		done();
	});

	it('should contain add new hero div', done => {
		
		expect(container.toJSON()[3].type).toBe('div');
		expect(container.toJSON()[3].children[0].trim()).toBe('Add new hero');
		done();
	});

	it('should dispatch after input ', done => {
		renderer.act(() => {
			container.toJSON()[3].children[1].props.onChange({target: {value: 'test'}, persist: jest.fn()});
		});
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith(
			{
				type: 'CLEAR_ADD_HERO',
				type: 'CLEAR_DETAIL_HERO',
			},
		);
		done();
	});

	it('should dispatch after radio btn (marvel) ', done => {
		renderer.act(() => {
			container.toJSON()[3].children[3].children[1].children[0].props.onChange();
		});
		expect(store.dispatch).toHaveBeenCalledWith(
			actions.updateAddHeroUniverse('Marvel')
		);
		done();
	});

	it('should dispatch after radio btn (dc) ', done => {
		renderer.act(() => {
			container.toJSON()[3].children[3].children[2].children[0].props.onChange();
		});
		expect(store.dispatch).toHaveBeenCalledWith(
			actions.updateAddHeroUniverse('DC')
		);
		done();
	});
});
