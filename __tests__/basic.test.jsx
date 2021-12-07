import React from 'react';
import { render, screen } from '@testing-library/react';
import Basic from '@/pages/basic';

describe('Basic', () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  test('should show Basic Component', () => {
    render(<Basic />);
    expect(screen.getByText(/Basic page/i)).toBeInTheDocument();
  });

  test('should show incomplete tasks', () => {
    render(<Basic numberOfIncompleteTasks={5} />);
    expect(screen.getByText(/5 tasks left/i)).toBeInTheDocument();
  });

  test('should show "no task left" when there is no task', () => {
    render(<Basic numberOfIncompleteTasks={0} />);
    const paragraphElement = screen.getByText(/No task left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should render text when success fetch', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        userId: 1,
        id: 2,
        title: 'hello',
        completed: false,
      }),
    );
    render(<Basic numberOfIncompleteTasks={0} />);
    expect(await screen.findByText(/hello/i)).toBeInTheDocument();
  });

  test('should render error message when fetch fail', async () => {
    fetch.mockReject(() => Promise.reject(new Error('API is down')));
    render(<Basic numberOfIncompleteTasks={0} />);

    const paragraphElement = await screen.findByText(/API is down/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
