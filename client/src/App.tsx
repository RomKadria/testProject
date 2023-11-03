import React from 'react';
import { routes } from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import SimpleGetResponse from './components/SimpleGetResponse';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} />} />
      <Route path={routes.SimpleGetResponse} element={<SimpleGetResponse number={32}/>} />
    </Routes>
  );
};

export default App;
