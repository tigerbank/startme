import React from 'react';
import { CompanyProps } from '@/interfaces/common';

function CompanyList({ companies }: { companies: CompanyProps[] }) {
  return (
    <>
      <option data-testid="select-option">All</option>
      {companies.map((company: CompanyProps) => (
        <option
          data-testid="select-option"
          key={company.name}
          value={company.name}
        >
          {company.name}
        </option>
      ))}
    </>
  );
}

export default CompanyList;
