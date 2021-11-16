import React, { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';

function ToDoForm({ handleChange, handleSubmit, todoInput }: any) {
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
