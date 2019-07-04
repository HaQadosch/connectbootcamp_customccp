import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';

import { render } from '@testing-library/react';
import 'jest-dom/extend-expect';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('loads and display <App />', () => {
    const { getByTestId } = render(<App />);
    const app = getByTestId('App');
    expect(app).toBeInTheDocument();
  });
});
