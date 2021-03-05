import {
  fireEvent,
  render,
  waitFor,
  cleanup,
  screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import selectEvent from 'react-select-event';
import EditEmployee from './EditEmployee';
afterEach(cleanup);
describe('<EditEmployee />', () => {
  it('render Edit employee', async () => {
    const option = [
      { _id: '60093413a7e4d542880ce98f', name: 'Develop' },
      { _id: '60098421dfa2805754b93eb2', name: 'HR' },
      { _id: '602dd6c4c5772235dc33fe95', name: 'BA' },
    ];

    const mockUpload = jest.fn((base64) => {
      return new Promise((resolve) => resolve(base64));
    });
    const { getByLabelText, getByText } = render(
      <EditEmployee
        listDepartment={option}
        sendOneEm={null}
        dataEditEmployee={mockUpload}
        offTask={(c) => c}
      />
    );

    const inputName = getByLabelText('Name');
    const inputJobtitle = getByLabelText('jobtitle');
    const inputCellphone = getByLabelText('cellphone');
    const inputEmail = getByLabelText('email');
    const inputDepartment = getByLabelText('Department');

    fireEvent.change(inputName, { target: { value: 'Dinh Duy Khanh' } });
    fireEvent.change(inputJobtitle, { target: { value: 'Nodejs, PHP' } });
    fireEvent.change(inputCellphone, { target: { value: '0336378689' } });
    fireEvent.change(inputEmail, {
      target: { value: 'duykhanh98bell@gmail.com' },
    });

    expect(inputName.value).toBe('Dinh Duy Khanh');
    expect(inputJobtitle.value).toBe('Nodejs, PHP');
    expect(inputCellphone.value).toBe('0336378689');
    expect(inputEmail.value).toBe('duykhanh98bell@gmail.com');
    expect(inputDepartment).toBeDefined();
    expect(inputDepartment).not.toBeNull();

    fireEvent.keyDown(inputDepartment.firstChild, { key: 'ArrowDown' });
    // await waitFor(() => getByText('BA'));
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

    fireEvent.click(getByText('Save'));

    expect(mockUpload).toBeCalled();
    expect('60093413a7e4d542880ce98f').toEqual(
      inputDepartment.firstChild.value
    );
  });
});
