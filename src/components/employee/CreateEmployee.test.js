import {
  fireEvent,
  render,
  screen,
  wait,
  waitFor,
} from '@testing-library/react';
import { act, Simulate } from 'react-dom/test-utils';
import CreateEmployee from './CreateEmployee';

describe('<CreateEmployee />', () => {
  it('render create employee', async () => {
    const option = [
      { _id: '60093413a7e4d542880ce98f', name: 'Develop' },
      { _id: '60098421dfa2805754b93eb2', name: 'HR' },
      { _id: '602dd6c4c5772235dc33fe95', name: 'BA' },
    ];
    const { getByLabelText, container, getByAltText, getByText } = render(
      <CreateEmployee
        listDepartment={option}
        dataEmployee={null}
        offTask={(c) => c}
      />
    );
    const inputName = screen.getByLabelText('Name');
    const inputJobtitle = screen.getByLabelText('jobtitle');
    const inputCellphone = screen.getByLabelText('cellphone');
    const inputEmail = screen.getByLabelText('email');
    const inputPhoto = screen.getByLabelText('photo');
    const selectSingle = screen.getByLabelText('Department');

    fireEvent.change(inputName, { target: { value: 'Dinh Duy Khanh' } });
    fireEvent.change(inputJobtitle, { target: { value: 'Nodejs, PHP' } });
    fireEvent.change(inputCellphone, { target: { value: '0336378689' } });
    fireEvent.change(inputEmail, {
      target: { value: 'duykhanh98bell@gmail.com' },
    });
    // fireEvent.change(inputPhoto, {
    //   target: {
    //     files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
    //   },
    // });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    Object.defineProperty(inputPhoto, 'files', {
      value: [file],
    });
    fireEvent.change(inputPhoto);
    await waitFor(() => getByText('chucknorris.png'));
    expect(getByText('chucknorris.png')).toBeDefined();

    expect(selectSingle).toHaveDisplayValue(['Select one']);
    expect(inputName.value).toBe('Dinh Duy Khanh');
    expect(inputJobtitle.value).toBe('Nodejs, PHP');
    expect(inputCellphone.value).toBe('0336378689');
    expect(inputEmail.value).toBe('duykhanh98bell@gmail.com');
    // expect(inputPhoto.files).toBe('chucknorris.png');
  });
});

describe('sumit create employee', () => {
  it('submit', async () => {
    const option = [
      { _id: '60093413a7e4d542880ce98f', name: 'Develop' },
      { _id: '60098421dfa2805754b93eb2', name: 'HR' },
      { _id: '602dd6c4c5772235dc33fe95', name: 'BA' },
    ];
    const mockUpload = jest.fn((base64) => {
      return new Promise((resolve) => resolve(base64));
    });
    const { getByLabelText, getByRole, getByText } = render(
      <CreateEmployee
        listDepartment={option}
        dataEmployee={mockUpload}
        offTask={(c) => c}
      />
    );
    const inputDepartment = getByLabelText('Department');
    await act(async () => {
      fireEvent.change(getByLabelText('Name'), {
        target: { value: 'adsfasdfad' },
      });
      fireEvent.change(getByLabelText('jobtitle'), {
        target: { value: 'afsdfasfds' },
      });
      fireEvent.change(getByLabelText('cellphone'), {
        target: { value: '456794551132' },
      });
      fireEvent.change(getByLabelText('email'), {
        target: { value: 'dadfsd@gmail.com' },
      });

      fireEvent.keyDown(inputDepartment.lastChild, {
        key: 'ArrowDown',
      });
      // await waitFor(() => getByText('HR'));
      // fireEvent.click(getByText('BA'));

      const upload = getByLabelText('photo');
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });

      // Source: https://github.com/testing-library/react-testing-library/issues/93#issuecomment-403887769
      Object.defineProperty(upload, 'files', {
        value: [file],
      });

      fireEvent.change(upload);
    });
    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(mockUpload).toBeCalled();
    expect('602dd6c4c5772235dc33fe95').toEqual(inputDepartment.lastChild.value);
  });
});
