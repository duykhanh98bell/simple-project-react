import { create, act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import Home from './components/Home';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('home', () => {
  it('render home', () => {
    const { getAllByText, getByText, getByTestId, container } = render(<App />);
    screen.debug();
  });
});
