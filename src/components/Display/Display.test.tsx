import { render, screen } from '@testing-library/react';
import { Display, DisplayProps } from './Display';

const defaultProps: DisplayProps = {
  currentCalc: {
    currentNum: '',
    previousNum: '',
    operation: undefined,
    result: '',
  },
};

describe('Display', () => {
  it('should render correctly in default state', async () => {
    const { container } = render(<Display {...defaultProps} />);

    expect(container).toMatchSnapshot();
    expect(await screen.findByText('0')).toBeInTheDocument();
  });

  it('should render correctly when only currentNum is available', async () => {
    render(<Display currentCalc={{ ...defaultProps.currentCalc, currentNum: '2' }} />);

    expect(await screen.findByText('2')).toBeInTheDocument();
  });

  it('should render correctly when both currentNum and previousNum are available', async () => {
    render(<Display currentCalc={{ ...defaultProps.currentCalc, currentNum: '3', previousNum: '2' }} />);

    expect(await screen.findByText('3')).toBeInTheDocument();
  });

  it('should render correctly when both result is available', async () => {
    render(<Display currentCalc={{ ...defaultProps.currentCalc, currentNum: '3', previousNum: '2', result: '5' }} />);

    expect(await screen.findByText('5')).toBeInTheDocument();
  });
});
