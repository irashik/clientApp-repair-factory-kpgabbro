import React from 'react';

import ReadModuleList  from './readModuleList';

       


describe("<ReadModuleList/>", () => {
    test('should render correctly empty list', () => {

        const component = shallow(<ReadModuleList />)
        expect(component).toMatchSnapshot();
    });



    test('should render correctly full list', () => {


        // добавь данные ...

        const component = shallow(<ReadModuleList />)

        expect(component).toMatchSnapshot();


    });




});



