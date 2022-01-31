import React from 'react';
import { shallow, render } from 'enzyme';
import { InputDataSection } from './inputDataSection';




describe('<InputDataSection />', () => {

    test('snapShot correctly', () => {
        const component = shallow(<InputDataSection />);
        expect(component).toMatchSnapshot();

    });

});

