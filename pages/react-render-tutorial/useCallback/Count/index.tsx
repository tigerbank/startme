import React from 'react';

function Count({ name, value }: { name: string; value: number }) {
  console.log('render Count ' + name);
  return (
    <div>
      {name}: {value}
    </div>
  );
}

export default React.memo(Count);
