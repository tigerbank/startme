import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoTest from '@/pages/todoTest';
import { getHeroDetail } from '@/util/heroApi';

jest.mock('@/util/heroApi');

const SUPERMAN = {
  id: 1,
  name: 'Superman',
  avatar:
    'https://cdn.theatlantic.com/thumbor/xuePShEYRyEQec_THgWcYFhYLnw=/540x0:2340x1800/500x500/media/img/mt/2016/01/superman/original.jpg',
  description:
    'Superman is a fictional superhero. The character was created by writer Jerry Siegel and artist Joe Shuster, and first appeared in the comic book Action Comics #1 (cover-dated June 1938 and published April 18, 1938).[1] The character regularly appears in comic books published by DC Comics, and has been adapted to a number of radio serials, movies, and television shows.',
};

getHeroDetail.mockResolvedValue(SUPERMAN);

const renderTodoTest = () => {
  render(<TodoTest />);
  const inputElement = screen.getByLabelText('Todo');
  const buttonElement = screen.getByRole('button', { name: 'Add' });
  return {
    inputElement,
    buttonElement,
    runSearchJourney: async (name, pendingCallback) => {
      userEvent.type(inputElement, name);
      userEvent.click(buttonElement);
      if (pendingCallback) {
        pendingCallback();
      }
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    },
  };
};

describe('TodoTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should show text', () => {
    renderTodoTest();
    const textElement = screen.getByText('For test todo');
    expect(textElement).toBeInTheDocument();
  });

  it('should display input and submit button', () => {
    const { inputElement, buttonElement } = renderTodoTest();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call todo when todo submitted', async () => {
    const { runSearchJourney } = renderTodoTest();
    await runSearchJourney('superman');
    expect(getHeroDetail).toHaveBeenCalledWith('superman');
  });

  //it.only ใช้เพื่อทำให้ test นี้เท่านั้น
  it('should loading while call api', async () => {
    const { runSearchJourney } = renderTodoTest();
    await runSearchJourney('superman', () => {
      screen.getByText('Loading...');
    });
    expect(getHeroDetail).toHaveBeenCalledWith('superman');
  });

  it('should show avartar, name, description from response', async () => {
    const { runSearchJourney } = renderTodoTest();

    await runSearchJourney('superman');
    expect(getHeroDetail).toHaveBeenCalledWith('superman');
    screen.getByText(SUPERMAN.name);
    screen.getByText(SUPERMAN.description);
    screen.getByAltText(`Avatar of ${SUPERMAN.name}`);
  });
});
