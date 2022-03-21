import React from 'react';

function Child() {
  console.log('child render');
  return <div>Child will only render at initial load only</div>;
}

export default Child;
