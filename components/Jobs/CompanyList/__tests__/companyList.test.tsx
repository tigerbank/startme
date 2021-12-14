import React from 'react';
import { render, screen } from '@testing-library/react';
import CompanyList from '@/components/Jobs/CompanyList';

const companies = [
  {
    id: 1,
    name: 'Company 1',
    locale: 'th',
    logo: 'test',
  },
  {
    id: 2,
    name: 'Company 2',
    locale: 'th',
    logo: 'test',
  },
];

describe('CompanyList component', () => {
  beforeEach(() => {
    render(<CompanyList companies={companies} />);
  });

  it('render company option correctly', () => {
    let options = screen.getAllByTestId('select-option');
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toHaveValue('Company 1');
  });
});
