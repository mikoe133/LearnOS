import React from 'react';
import { NotFound } from '@monorepo/ui-components';
import {add} from '@monorepo/utils';

const App = () => {
  return (
    <div className="App">
        123
      <NotFound />
      <h1>{add(1, 2)}</h1>
    </div>
  );
};

export default App;
