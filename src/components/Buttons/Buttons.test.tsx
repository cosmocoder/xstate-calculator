import type { ButtonProps } from './Buttons';
import { Buttons } from './Buttons';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps: ButtonProps = {
  handleClick: vi.fn(),
  buttonData: {
    operation: undefined,
    clearOption: 'AC',
  },
};

describe('Buttons', () => {
  it('should render correctly', () => {
    const { container } = render(<Buttons {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should highlight button for active operation', async () => {
    const { container } = render(<Buttons {...defaultProps} buttonData={{ operation: '+', clearOption: 'AC' }} />);

    expect(await screen.findByRole('button', { name: '+' })).toHaveClass('highlight');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.getElementsByClassName('highlight').length).toBe(1);
  });

  it('should call handleClick correctly', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Buttons {...defaultProps} handleClick={spy} />);

    const targetButton = await screen.findByRole('button', { name: '2' });
    await user.click(targetButton);

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ target: targetButton }));
  });
});
