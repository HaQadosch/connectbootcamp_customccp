import React from 'react';
import { AgentConsole } from './AgentConsole';
import './App.css';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className='App' data-testid='App'>
        <header className='App-header'>
          <AgentConsole></AgentConsole>
        </header>
      </div>
    </React.StrictMode>
  );
};

export default App;
