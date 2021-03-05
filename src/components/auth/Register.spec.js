import {
  fireEvent,
  getByLabelText,
  getByRole,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Register from './Register';

describe('<Register />', () => {
  it('render register', () => {
    const { getByLabelText } = render(<Register />);

    const inputUsername = getByLabelText('Username');
    const inputEmail = getByLabelText('Email');
    const inputRole = getByLabelText('Role');

    fireEvent.change(inputUsername, { target: { value: 'duykhanh9' } });
    fireEvent.change(inputEmail, { target: { value: 'duykhanh9@gmail.com' } });
    fireEvent.change(inputRole, { target: { value: 'PM' } });

    expect(inputUsername.value).toBe('duykhanh9');
    expect(inputEmail.value).toBe('duykhanh9@gmail.com');
    expect(inputRole.value).toBe('PM');
  });
});

// describe('submit register', () => {
//   it('submit', async () => {
//     const mockOnSubmit = jest.fn();

//     const { getByLabelText, getByRole } = render(<Register />);

//     await act(async () => {
//       fireEvent.change(getByLabelText('Username'), {
//         target: { value: 'duykhanh9' },
//       });
//       fireEvent.change(getByLabelText('Email'), {
//         target: { value: 'duykhanh9@gmail.com' },
//       });
//       fireEvent.change(getByLabelText('Role'), { target: { value: 'admin' } });
//     });

//     await act(async () => {
//       fireEvent.click(getByRole('button'));
//     });

//     expect(mockOnSubmit).toHaveBeenCalled();
//   });
// });
