import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() });


global.Raven = {
    setUserContext: jest.fn(),
    captureException: jest.fn()
};

// Mapbox gets written to the window, so we need to stub stuff out
global.L = {
    latLng: jest.fn(),
    mapbox: {
        map: jest.fn(() => {
            return {
                setView: jest.fn(),
                invalidateSize: jest.fn()
            };
        }),
        marker: {
            icon: jest.fn()
        }
    },
    marker: jest.fn(() => {
        return {
            addTo: jest.fn(),
            setLatLng: jest.fn(),
            icon: jest.fn()
        };
    })
};

import { shallow, render, mount} from 'enzyme';

global.shallow = shallow;
global.render = render;
global.mount = mount;

// console.error = message => {
//     throw new Error(message);
// };
