import React, { useEffect, useState } from 'react';

function Basic({
  numberOfIncompleteTasks,
}: {
  numberOfIncompleteTasks: number;
}) {
  const [todo, setTodo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos/2')
      .then((res) => {
        if (res.status !== 200) {
          setIsLoading(false);
          throw new Error('Failed to fetch todos.');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTodo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div>
      Basic page
      {numberOfIncompleteTasks >= 1 && (
        <p>
          {numberOfIncompleteTasks}
          {numberOfIncompleteTasks > 1 ? ' tasks' : ' task'} left
        </p>
      )}
      <div>
        {numberOfIncompleteTasks < 1 && <p>No task left</p>}
        {isLoading && <p>Loading...</p>}
        {errorMessage !== null && (
          <p data-testid="errorMessage">{errorMessage}</p>
        )}
        <span>{todo && todo.title}</span>
      </div>
    </div>
  );
}

export default Basic;
