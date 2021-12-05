import { Input, Button, Box, Spinner } from '@chakra-ui/react';

function ToDoForm({ handleChange, handleSubmit, todoInput, loading }: any) {
  return (
    <Box>
      <form>
        <Box d="flex">
          <Input
            onChange={handleChange}
            value={todoInput}
            placeholder="What do you want to do next?"
          />
          <Button colorScheme="teal" onClick={handleSubmit} type="submit">
            {loading ? <Spinner /> : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ToDoForm;
