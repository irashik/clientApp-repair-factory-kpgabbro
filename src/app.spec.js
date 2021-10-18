import React from 'react';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import App  from './app';

jest.mock('./inputDataSection/inputDataSection.js');



describe("<App/>", () => {
    test('should render correctly', () => {

        const component = renderer.create(<App />)
        .toJSON();

        expect(component).toMatchSnapshot();


        
    });
});