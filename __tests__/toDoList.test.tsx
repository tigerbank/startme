import React from 'react';
import { render, screen } from '@testing-library/react';
import ToDoList from '../components/ToDoList';
import userEvent from '@testing-library/user-event';

describe('toDoList', () => {
  test('render "original" text', () => {
    //arrnge
    render(<ToDoList />);

    //Act

    //Assert
    const textElement = screen.getByText('ToDo', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });

  // test('render "text changed"', () => {
  //   //arrnge
  //   render(<ToDoList />);

  //   //Act
  //   userEvent.click(screen.getByText('Button'));

  //   //Assert
  //   const textElement = screen.getByText('Text changed!', {
  //     exact: false,
  //   });
  //   expect(textElement).toBeInTheDocument();
  // });

  // test('original text does not render when button is clicked', () => {
  //   //arrnge
  //   render(<ToDoList />);

  //   //Act
  //   userEvent.click(screen.getByText('Button'));

  //   //Assert
  //   const textElement = screen.queryByText('This is to do list', {
  //     exact: false,
  //   });
  //   expect(textElement).toBeNull();
  // });
});
