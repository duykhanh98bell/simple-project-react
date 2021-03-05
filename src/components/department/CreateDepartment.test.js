import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CreateDepartment from './CreateDepartment';

describe('<CreateDepartment />', () => {
  it('render create department', () => {
    const xx = (c) => {};
    const { getByLabelText } = render(
      <CreateDepartment offTask={xx} close={null} postDepartment={null} />
    );

    const inputName = getByLabelText('Name');
    const inputOfficePhone = getByLabelText('officephone');
    const inputManager = getByLabelText('manager');

    fireEvent.change(inputName, { target: { value: 'PM' } });
    fireEvent.change(inputOfficePhone, { target: { value: '0123456789' } });
    fireEvent.change(inputManager, { target: { value: 'trungnt' } });

    expect(inputName.value).toBe('PM');
    expect(inputOfficePhone.value).toBe('0123456789');
    expect(inputManager.value).toBe('trungnt');
  });
});

describe('submit create department', () => {
  it('submit', async () => {
    const mockOnSubmit = jest.fn();
    const xx = (c) => {};
    const { getByLabelText, getByRole } = render(
      <CreateDepartment
        offTask={xx}
        close={null}
        postDepartment={mockOnSubmit}
      />
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Name'), {
        target: { value: 'afdasdfds' },
      });
      fireEvent.change(getByLabelText('officephone'), {
        target: { value: '5466546164' },
      });
      fireEvent.change(getByLabelText('manager'), {
        target: { value: 'fadfadfaf' },
      });
    });
    await act(async () => {
      fireEvent.click(getByRole('button'));
    });
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
