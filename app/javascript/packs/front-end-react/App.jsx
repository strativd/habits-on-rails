import React, { useState } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from "@apollo/client"

import { client } from "./client"
import Frame from './Frame';

import 'antd/dist/antd.css';
import 'antd/dist/antd.dark.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Frame />
    </ApolloProvider>
   );
};

render(<App />, document.getElementById('root'));
