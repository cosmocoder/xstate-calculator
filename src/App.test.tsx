import { render, screen } from '@testing-library/react';
import { App } from './App';
import userEvent from '@testing-library/user-event';

describe('Calculator app', () => {
  it('should render correctly', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });

  it('should handle addition of two numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '1' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '=' }));

    expect(await screen.findByRole('region')).toHaveTextContent('3');
  });

  it('should handle subtraction of two numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '-' }));
    await user.click(await screen.findByRole('button', { name: '1' }));
    await user.click(await screen.findByRole('button', { name: '=' }));

    expect(await screen.findByRole('region')).toHaveTextContent('1');
  });

  it('should handle multiplication of two numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: 'x' }));
    await user.click(await screen.findByRole('button', { name: '3' }));
    await user.click(await screen.findByRole('button', { name: '=' }));

    expect(await screen.findByRole('region')).toHaveTextContent('6');
  });

  it('should handle division of two numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '1' }));
    await user.click(await screen.findByRole('button', { name: '÷' }));
    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '=' }));

    expect(await screen.findByRole('region')).toHaveTextContent('0.5');
  });

  it('should handle chaining of multiple math operations', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '3' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: '4' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: '5' }));
    await user.click(await screen.findByRole('button', { name: '-' }));
    await user.click(await screen.findByRole('button', { name: '6' }));
    await user.click(await screen.findByRole('button', { name: '÷' }));
    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '=' }));

    expect(await screen.findByRole('region')).toHaveTextContent('3');
  });

  it('should handle clearing of inputs', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole('button', { name: 'AC' })).toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: '3' }));
    expect(await screen.findByRole('button', { name: 'C' })).toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: 'C' }));

    expect(await screen.findByRole('region')).toHaveTextContent('0');

    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: 'C' }));
    await user.click(await screen.findByRole('button', { name: '-' }));
    await user.click(await screen.findByRole('button', { name: '1' }));
    await user.click(await screen.findByRole('button', { name: '=' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: 'C' }));
    await user.click(await screen.findByRole('button', { name: 'C' }));

    expect(await screen.findByRole('button', { name: 'AC' })).toBeInTheDocument();
    expect(await screen.findByRole('region')).toHaveTextContent('0');
  });

  it('should show decimal point correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '3' }));
    await user.click(await screen.findByRole('button', { name: '.' }));
    expect(await screen.findByRole('region')).toHaveTextContent('3.');
    await user.click(await screen.findByRole('button', { name: '2' }));
    expect(await screen.findByRole('region')).toHaveTextContent('3.2');

    await user.click(await screen.findByRole('button', { name: 'C' }));
    await user.click(await screen.findByRole('button', { name: '.' }));
    await user.click(await screen.findByRole('button', { name: '1' }));
    expect(await screen.findByRole('region')).toHaveTextContent('0.1');
  });

  it('should calculate percentage correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '%' }));
    expect(await screen.findByRole('region')).toHaveTextContent('0.02');

    await user.click(await screen.findByRole('button', { name: 'C' }));
    expect(await screen.findByRole('region')).toHaveTextContent('0');

    await user.click(await screen.findByRole('button', { name: '3' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '=' }));
    await user.click(await screen.findByRole('button', { name: '%' }));
    expect(await screen.findByRole('region')).toHaveTextContent('0.05');
  });

  it('should handle negation of numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '+/-' }));
    expect(await screen.findByRole('region')).toHaveTextContent('-2');

    await user.click(await screen.findByRole('button', { name: 'C' }));
    await user.click(await screen.findByRole('button', { name: '2' }));
    await user.click(await screen.findByRole('button', { name: '+' }));
    await user.click(await screen.findByRole('button', { name: '3' }));
    await user.click(await screen.findByRole('button', { name: '+/-' }));
    await user.click(await screen.findByRole('button', { name: '=' }));
    expect(await screen.findByRole('region')).toHaveTextContent('-1');

    await user.click(await screen.findByRole('button', { name: '%' }));
    await user.click(await screen.findByRole('button', { name: '+/-' }));
    expect(await screen.findByRole('region')).toHaveTextContent('0.01');
  });
});
