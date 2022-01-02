import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ToDoList from '@/components/ToDoList';
import { getGlobalData, getTodosData } from '@/util/api';
import { TodoProps } from '@/interfaces/common';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

function Todo({ todos }: { todos: TodoProps[] }) {
  return (
    <DefaultTemplate title="todo" description="description">
      <ToDoList todos={todos} />
    </DefaultTemplate>
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
