import { Box, Heading, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { TodoProps } from '@/interfaces/common';
import ToDoForm from './ToDoForm';
import ToDoResult from './ToDoResult';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

function ToDoList({ todos }: { todos: TodoProps[] }) {
  const [todoInput, setTodoInput] = useState('');
  const [lists, setLists] = useState<any>(todos);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }
  function handleSubmit(e: any) {
    e.preventDefault();

    if (todoInput.trim() !== '') {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: todoInput,
        }),
      })
        .then((response) => {
          toast({
            title: 'Success',
            description: 'Task submitted',
            status: 'success',
            duration: 8000,
            isClosable: true,
          });
          setLoading(false);
          return response.json();
        })
        .then((addedData) => {
          setLists([...lists, addedData]);
        });
    }
    setTodoInput('');
  }

  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        toast({
          title: 'Success',
          description: 'Task Deleted',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        return response.json();
      })
      .then(() => {
        const newTodos = lists.filter((_todo: any) => _todo.id !== id);
        setLists(newTodos);
      });
  }

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setLists(data);
    }
  }, [data]);

  if (!data && !lists) return <div>loading...</div>;

  return (
    <Box mt="20px" className="container">
      <Heading as="h2" textAlign="center" fontSize="18px" mb="10px">
        All Tasks
      </Heading>

      <ToDoForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        todoInput={todoInput}
        loading={loading}
      />

      <ToDoResult lists={lists} handleDelete={handleDelete} />
    </Box>
  );
}

export default ToDoList;
