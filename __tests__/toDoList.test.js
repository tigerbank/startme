import React from 'react';
import { render, screen } from '@testing-library/react';
import ToDoList from '@/components/ToDoList';

describe('toDoList', () => {
  beforeEach(() => {
    render(
      <ToDoList
        todos={[
          {
            id: 80,
            item: 'ทดสอบ Todo list',
          },
          {
            id: 81,
            item: 'ทดสอบ Todo list',
          },
        ]}
      />,
    );
  });

  it('render "All tasks" text', async () => {
    const textElement = await screen.findByText(/All Tasks/i);
    expect(textElement).toBeInTheDocument();
  });

  it('render show should empty list if there is no task', async () => {
    render(<ToDoList todos={[]} />);
    const textElement = await screen.findByText(/There is no task yet./i);
    expect(textElement).toBeInTheDocument();
  });
});
