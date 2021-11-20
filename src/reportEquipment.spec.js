import React from 'react';

import ReportEquipment  from './reportEquipment';

       


describe("<ReportEquipment/>", () => {
    test('should render correctly empty list', () => {

        const component = shallow(<ReportEquipment />)
        expect(component).toMatchSnapshot();
    });



    test.skip('should render correctly full list', () => {


        // добавь данные ...

        const component = shallow(<ReadModuleList />)

        expect(component).toMatchSnapshot();


    });




});



