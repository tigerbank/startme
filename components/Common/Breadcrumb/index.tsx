import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { BreadcrumbsProps } from '@/interfaces/common';

function Breadcrumbs({ lists }: { lists: BreadcrumbsProps[] }) {
  return (
    <Breadcrumb fontSize="sm" color="grey" mb="10px">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>

      {lists.map((list: BreadcrumbsProps, index: number) => (
        <BreadcrumbItem key="index">
          <BreadcrumbLink href={list.link}>{list.name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
