import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoList from '@/components/ToDoList';

describe('toDoList', () => {
  it('render "All tasks" text', async () => {
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
    const textElement = await screen.findByText('All Tasks', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });

  it('render show should empty list if there is no task', async () => {
    render(<ToDoList todos={[]} />);
    const textElement = await screen.findByText('There is no task yet.', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });
});
