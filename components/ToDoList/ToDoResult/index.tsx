import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TodoProps } from 'interfaces/common';
import { getTodosData } from 'util/api';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

function ToDoResult() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos`,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        return;
      });
  }

  return (
    <Box>
      {data.map((todo: TodoProps) => (
        <Box
          borderBottom="solid 1px #cecece"
          key={todo.id}
          padding="20px"
          d="flex"
          justifyContent="space-between"
        >
          <Text>{todo.item}</Text>
          <Text cursor="pointer" onClick={handleDelete.bind(null, todo.id)}>
            X
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default ToDoResult;
