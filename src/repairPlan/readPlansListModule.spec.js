import React from 'react';
import { shallow, render } from 'enzyme';

import ReadPlansListModule from './readPlansListModule';

jest.mock('./inputPlanRepairForm');



describe('ReadPlanListModule', () => {

    test('snapShot correctly', () => {

        const component = shallow(<ReadPlansListModule />);
        expect(component).toMatchSnapshot();

    });

    test.skip("", () => {

    });

});