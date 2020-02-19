import React from 'react';
import {HeroDetailPage} from '../pages/heroDetailPage';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import * as actions from '../actions';
import 'babel-polyfill'
import jest from 'jest-mock';

describe('<HeroList/> test', () => {
	let store;
	let container;
	const mockStore = configureStore([]);

	// fetch = jest.fn(() => Promise.resolve());

	beforeEach(() => {
		store = mockStore({
			searchUniverse: '',
			heroes: [],
			oldName: '',
			addHero: {name: '', universe: '', skills: []},
			detailHero: {id: 0, name: 'Ironman', universe: 'DC', skills: ['Heal']},
			isLoad: false,
			noHeroes: true
		});
		store.dispatch = jest.fn();

		container = renderer.create(
			<Provider store={store}>
				<Router>
				<Route>
					<HeroDetailPage history={{goBack : jest.fn()}} match={{params: 'no_hero'}} />
				</Route>
				</Router>
			</Provider>
		);

	});

	it('should render with given state from Redux store', done => {
		expect(container.toJSON()).toMatchSnapshot();
		done();
	});

	it('shouldnt call dispatch at start', done => {
		expect(store.dispatch).toHaveBeenCalledTimes(0);
		done();
	});

	it('should call dispatch on input change', done => {
		renderer.act(() => {
			container.toJSON()[8].children[1].props.onChange({ target: { value: 'Mock_2' } });
		});
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith({
				type: 'UPDATE_NAME',
				newName: 'Mock_2'
			}
		);
		done();
	});

	it('should call dispatch on radio btn change (Marvel)', done => {
		renderer.act(() => {
			container.toJSON()[8].children[2].children[0].children[0].props.onChange();
		});
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith(
			actions.updateUniverse('Marvel')
		);
		done();
	});

	it('should call dispatch on radio btn change (DC)', done => {
		renderer.act(() => {
			container.toJSON()[8].children[2].children[1].children[0].props.onChange();
		});
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith(
			actions.updateUniverse('DC')
		);
		done();
	});

	it('should call dispatch on save btn click', done => {
		renderer.act(() => {
			container.toJSON()[10].props.onClick();
		});
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		done();
	});

});