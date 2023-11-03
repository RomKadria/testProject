import React from 'react';
import { routes } from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import SimpleGetResponse from './components/SimpleGetResponse';
import { Provider } from 'use-http';

const App: React.FC = () => {
  return (
    <Provider url={'http://localhost:3001'}>
      <Routes>
        <Route path="/" element={<Navigate to={routes.home} />} />
        <Route path={routes.SimpleGetResponse} element={<SimpleGetResponse number={32}/>} />
      </Routes>
    </Provider>
  );
};

export default App;
