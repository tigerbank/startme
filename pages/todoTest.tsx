import React, { useState } from 'react';
import { getHeroDetail } from '@/util/heroApi';

function TodoTest() {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await getHeroDetail(text);
    setData(response);
    setLoading(false);
  };
  return (
    <div>
      <h1>For test todo</h1>

      <label htmlFor="todo">Todo</label>
      <input
        id="todo"
        type="text"
        placeholder="Type todo"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleSubmit}>Add</button>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <img src={data.avatar} alt={`Avatar of ${data.name}`} />
          <p>{data.name}</p>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
}

export default TodoTest;
