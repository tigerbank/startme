import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoForm from '@/components/ToDoList/ToDoForm';

const mockedHandleSubmit = jest
  .fn()
  .mockImplementation((e) => e.preventDefault());

describe('ToDoForm', () => {
  it('should render todo form', async () => {
    render(
      <ToDoForm
        todoInput="test"
        handleChange={() => {}}
        handleSubmit={mockedHandleSubmit}
      />,
    );
    const inputElement = screen.getByPlaceholderText(
      'What do you want to do next?',
    );

    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type input', async () => {
    render(
      <ToDoForm
        todoInput="test"
        handleChange={() => {}}
        handleSubmit={mockedHandleSubmit}
      />,
    );
    const inputElement = screen.getByPlaceholderText(
      'What do you want to do next?',
    );
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement.value).toBe('test');
  });

  it('should have empty input when add button', async () => {
    render(
      <ToDoForm
        todoInput="test"
        handleChange={() => {}}
        handleSubmit={mockedHandleSubmit}
      />,
    );
    const inputElement = screen.getByPlaceholderText(
      'What do you want to do next?',
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(buttonElement);
    expect(buttonElement.value).toBe('');
  });
});
