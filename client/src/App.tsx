import React from 'react';
import { routes } from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import SimpleGetResponse from './components/SimpleGetResponse';
import { Provider } from 'use-http';
import SimplerGetResponse from './components/simplerGetResponse';

const App: React.FC = () => {
  return (
    <Provider url={'http://localhost:3001/api'}>
      <Routes>
        <Route path="/" element={<Navigate to={routes.SimpleGetResponse} />} />
        <Route path={routes.SimpleGetResponse} element={<SimpleGetResponse number={32}/>} />
        <Route path={routes.SimplerGetResponse} element={<SimplerGetResponse/>} />
      </Routes>
    </Provider>
  );
};

export default App;
