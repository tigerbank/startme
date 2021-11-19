import React, { useEffect, useState } from 'react';

function Basic({
  numberOfIncompleteTasks,
}: {
  numberOfIncompleteTasks: number;
}) {
  return (
    <div>
      Basic page
      {numberOfIncompleteTasks >= 1 && (
        <p>
          {numberOfIncompleteTasks}
          {numberOfIncompleteTasks > 1 ? ' tasks' : ' task'} left
        </p>
      )}
      {numberOfIncompleteTasks < 1 && <p>No task left</p>}
    </div>
  );
}

export default Basic;
