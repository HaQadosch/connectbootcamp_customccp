import React from 'react';
import './AgentConsole.css';

interface IAgentConsoleProps {}

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  return (
    <div className='agentConsole' data-testid='agentConsole'>
      AgentConsole
    </div>
  );
};
