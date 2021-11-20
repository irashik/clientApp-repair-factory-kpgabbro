import React from 'react';

import SearchList  from './searchListUnitEquipment';

       


describe("<SearchList/>", () => {
    test('should render correctly empty list', () => {

        const component = shallow(<SearchList />)
        expect(component).toMatchSnapshot();
    });



    



});



