import React, { useRef } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function ToDoForm() {
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
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box d="flex">
          <Input
            ref={todoInputRef}
            placeholder="What do you want to do next?"
          />
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
}

export default ToDoForm;
