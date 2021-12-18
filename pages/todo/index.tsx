import React from 'react';
import ToDoList from '@/components/ToDoList';
import { Box } from '@chakra-ui/layout';
import { getGlobalData, getTodosData } from '@/util/api';
import { TodoProps } from '@/interfaces/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
