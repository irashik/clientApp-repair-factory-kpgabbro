


import React from 'react';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';

import { ReadPlansListModule } from './readPlansListModule';



describe('correctly run module', () => {
    test('run module', () => {

        const component = renderer.create(<ReadPlansListModule />).toJSON();

        expect(component).toMatchSnapshot();

    });
});