import React from 'react';
import {NotFound} from '../pages/notFound'
import { shallow } from 'enzyme';



describe('<NotFound/> page test', () => {
    it('renders without crashing', (done) => {
        const container = shallow(<NotFound/>);
        expect(container.find('h1').text().trim()).toBe('Page not found 404 :(');
        done();
      });
});