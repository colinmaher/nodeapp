import React from "react";
import { create } from "react-test-renderer";
import App from '../App'
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App component", () => {
  test("Matches the snapshot", () => {
    const app = create(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });
});
