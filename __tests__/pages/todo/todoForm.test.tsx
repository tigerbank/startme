import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoForm from '@/components/ToDoList/ToDoForm';

const mockedHandleSubmit = jest
  .fn()
  .mockImplementation((e) => e.preventDefault());

describe('ToDoForm', () => {
  beforeEach(() => {
    render(
      <ToDoForm
        handleChange={() => {
          // do nothing
        }}
        handleSubmit={mockedHandleSubmit}
      />,
    );
  });

  it('should render todo form', async () => {
    const inputElement = screen.getByPlaceholderText(
      'What do you want to do next?',
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type input', async () => {
    const inputElement = screen.getByPlaceholderText(
      'What do you want to do next?',
    );
    userEvent.type(inputElement, 'good');
    expect(inputElement).toHaveValue('good');
  });
});
