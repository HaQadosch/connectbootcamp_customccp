import React from 'react';
import './AgentConsole.css';

interface IAgentConsoleProps {}

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  return (
    <div className='agentConsole' data-testid='agentConsole'>
      <h1>welcome to amazon connect agent console</h1>
      <section id='ccpContainer'></section>
      <section id='section-main'></section>
    </div>
  );
};
