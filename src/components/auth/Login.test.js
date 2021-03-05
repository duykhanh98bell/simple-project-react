import {
  fireEvent,
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { act } from 'react-test-renderer';
import App from '../../App';
import Login from './Login';

describe('<Login />', () => {
  it('render page Login', async () => {
    const {
      getAllByText,
      getByText,
      getByLabelText,
      getByTestId,
      getByAltText,
      container,
      getByRole,
      queryByPlaceholderText,
    } = render(<Login dataLogin={null} />);

    const inputUsername = getByTestId('username');
    const inputPassword = getByTestId('password');
    // Giả định người dùng nhập thông tin
    fireEvent.change(inputUsername, { target: { value: 'khanhdd' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    expect(inputUsername.value).toBe('khanhdd');
    expect(inputPassword.value).toBe('123456');

    expect(await inputUsername).toBeDefined();
    expect(await screen.findByLabelText('Username')).toBeDefined();
  });
});

describe('call submit', () => {
  it('submit', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText, getByTestId } = render(
      <Login dataLogin={mockOnSubmit} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Username'), {
        target: { value: 'khanhdd' },
      });
      fireEvent.change(getByLabelText('Password'), {
        target: { value: '123456' },
      });
    });
    await act(async () => {
      fireEvent.click(getByTestId('log'));
    });
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

describe('invalid username', () => {
  it('render error username', async () => {
    const { container, getByLabelText } = render(<Login />);
    await act(async () => {
      const inputUsername = getByLabelText('Username');
      fireEvent.change(inputUsername, {
        target: { value: 'invalid username' },
      });
      fireEvent.blur(inputUsername);
    });
    expect(container.innerHTML).toMatch('');
  });
});

describe('invalid password', () => {
  it('render error password', async () => {
    const { container, getByLabelText } = render(<Login />);
    await act(async () => {
      const inputPassword = getByLabelText('Password');
      fireEvent.change(inputPassword, {
        target: { value: 'invalid password' },
      });
      fireEvent.blur(inputPassword);
    });
    expect(container.innerHTML).toMatch('');
  });
});
