import React from 'react';
import { AgentConsole } from './AgentConsole';
import './App.css';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className='App' data-testid='App'>
        <main>
          <AgentConsole />
        </main>
      </div>
    </React.StrictMode>
  );
};

export default App;
