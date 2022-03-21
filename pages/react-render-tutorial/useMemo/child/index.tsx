import React from 'react';

function Child({ name }: { name: string }) {
  console.log('render from child');
  return (
    <div>
      Child re-render only when name chaged <br />
      {name}
    </div>
  );
}

export default Child;

export const MemorizedChild = React.memo(Child);
