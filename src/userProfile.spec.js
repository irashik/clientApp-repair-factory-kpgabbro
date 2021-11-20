import React from 'react';

import ProfileUserComponent  from './userProfile';

       


describe("<ProfileUserComponent/>", () => {
    test('should render correctly empty list', () => {

        const component = shallow(<ProfileUserComponent />)
        expect(component).toMatchSnapshot();
    });



    test.skip('should render correctly full list', () => {


        // добавь данные ...

        const component = shallow(<ReadModuleList />)
        expect(component).toMatchSnapshot();
    });




});



