import React, { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';

function ToDoForm() {
  const [todoInput, setTodoInput] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (todoInput.trim() !== '') {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: todoInput,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodoInput('');
        });
    }
  }
  return (
    <Box>
      <form>
        <Box d="flex">
          <Input
            onChange={handleChange}
            value={todoInput}
            placeholder="What do you want to do next?"
          />
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ToDoForm;
