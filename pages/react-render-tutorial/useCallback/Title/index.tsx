import React from 'react';

function Title() {
  console.log('render title');
  return <div>Use callback to optimise the performance</div>;
}

export default React.memo(Title);
