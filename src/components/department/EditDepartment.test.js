import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import EditDepartment from './EditDepartment';

describe('<EditDepartment />', () => {
  it('render edit department', () => {
    const { getByLabelText } = render(
      <EditDepartment
        offTask={null}
        close={null}
        oneDepart={null}
        postUpdateDepartment={null}
      />
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

describe('submit edit department', () => {
  it('submit', async () => {
    const mockOnSubmit = jest.fn();
    const oneDepart = {
      id: '60093345d43ea92e7496d375',
      name: 'Sale',
      officephone: '0123456789',
      manager: 'Hungtd',
    };
    const xx = (c) => {};
    const { getByLabelText, getByText, getByTestId, getByRole } = render(
      <EditDepartment
        postUpdateDepartment={mockOnSubmit}
        oneDepart={oneDepart}
        offTask={xx}
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
      fireEvent.change(getByTestId('hiddenId'), {
        target: { value: oneDepart.id },
      });
    });
    await act(async () => {
      fireEvent.click(getByRole('button'));
    });
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
