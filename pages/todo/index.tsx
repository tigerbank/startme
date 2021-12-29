import React from 'react';
import { Box } from '@chakra-ui/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ToDoList from '@/components/ToDoList';
import { getGlobalData, getTodosData } from '@/util/api';
import { TodoProps } from '@/interfaces/common';

function Todo({ todos }: { todos: TodoProps[] }) {
  return (
    <Box>
      <ToDoList todos={todos} />
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const todos = await getTodosData();
  const global = await getGlobalData(locale);

  if (!todos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      todos,
      global,
    },
    revalidate: 10,
  };
}

export default Todo;
