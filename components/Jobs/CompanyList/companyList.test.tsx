import React from 'react';
import { render, screen } from '@testing-library/react';
import MockCompanies from '../../../mocks/data/companies.json';
import CompanyList from '@/components/Jobs/CompanyList';

describe('CompanyList component', () => {
  beforeEach(() => {
    render(<CompanyList companies={MockCompanies} />);
  });

  it('render company option correctly', () => {
    let options = screen.getAllByTestId('select-option');
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toHaveValue('Amazon');
  });
});
