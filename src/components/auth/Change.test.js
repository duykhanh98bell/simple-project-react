import {
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Change from './Change';

describe('<Change />', () => {
  it('render change password first login', () => {
    const { getByTestId, getByLabelText } = render(
      <Change changePass={null} />
    );
    const inputPassword = getByLabelText('Password');
    const inputNewPassword = getByLabelText('New Password');
    const inputRePassword = getByLabelText('Re Password');

    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.change(inputNewPassword, { target: { value: '111111' } });
    fireEvent.change(inputRePassword, { target: { value: '111111' } });

    expect(inputPassword.value).toBe('123456');
    expect(inputNewPassword.value).toBe('111111');
    expect(inputRePassword.value).toBe('111111');
  });
});

describe('submit change pass', () => {
  it('submit', async () => {
    const mock = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <Change changePass={mock} />
    );
    await act(async () => {
      fireEvent.change(getByLabelText('Password'), {
        target: { value: '123456' },
      });
      fireEvent.change(getByLabelText('New Password'), {
        target: { value: '123465' },
      });
      fireEvent.change(getByLabelText('Re Password'), {
        target: { value: '123456' },
      });
    });
    await act(async () => {
      fireEvent.click(getByTestId('change'));
    });
    expect(mock).toHaveBeenCalled();
  });
});
