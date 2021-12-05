import React from 'react';
import { render, screen } from '@testing-library/react';
import Basic from '@/pages/basic';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Basic', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  test('Object assignment', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });

  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];

  test('shopping list to contain milk', () => {
    expect(shoppingList).toContain('milk');
  });

  test('should show Basic Component', async () => {
    render(<Basic />);
    const input = await screen.findByText(/Basic page/i);
    expect(input).toBeInTheDocument();
  });

  test('should show incomplete tasks', async () => {
    render(<Basic numberOfIncompleteTasks={5} />);
    const paragraphElement = await screen.findByText(/5 tasks left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should show incomplete "task" when 1 task left', async () => {
    render(<Basic numberOfIncompleteTasks={1} />);
    const paragraphElement = await screen.findByText(/1 task left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should show "no task left" when there is no task', async () => {
    render(<Basic numberOfIncompleteTasks={0} />);
    const paragraphElement = await screen.findByText(/No task left/i);
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
    const paragraphElement = await screen.findByText(/hello/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should render error message when fetch fail', async () => {
    fetch.mockReject(() => Promise.reject(new Error('API is down')));
    render(<Basic numberOfIncompleteTasks={0} />);
    const paragraphElement = await screen.findByText(/API is down/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
