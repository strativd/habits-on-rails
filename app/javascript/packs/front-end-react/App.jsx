import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client'

import { client } from './client'
import Frame from './Frame';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Frame />
    </ApolloProvider>
   );
};

render(<App />, document.getElementById('root'));
