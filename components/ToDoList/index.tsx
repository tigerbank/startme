import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import React, { useRef } from 'react';
import { Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TodoProps } from 'interfaces/common';

function ToDoList({ todos }: { todos: TodoProps[] }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const todoInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const addedTodo = todoInputRef.current?.value;
    if (addedTodo) {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: addedTodo,
        }),
      })
        .then((response) => response.json())
        .then((data) => refreshData());
    }
  }

  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => refreshData());
  }

  return (
    <Box mt="20px">
      <Heading as="h2" textAlign="center">
        ToDo
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          ref={todoInputRef}
          mt="20px"
          placeholder="What do you want to do next?"
        />
        <Button type="submit">Submit</Button>
      </form>

      {todos &&
        todos.map((todo: TodoProps) => (
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

export default ToDoList;
