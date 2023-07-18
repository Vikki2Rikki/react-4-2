//import React, { useState } from 'react';
import Alert from './Alert';
import AlertContext from './Context/AlertContext';
import Main from './Main';

const App = () => {
  return (
    <AlertContext>
      <div className="container pt-2">
        <Alert />
        <Main />
      </div>
    </AlertContext>
  );
};

export default App;
