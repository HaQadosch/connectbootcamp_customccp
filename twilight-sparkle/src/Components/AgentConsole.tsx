import React, { useEffect, useRef } from 'react';
import './AgentConsole.css';

interface IAgentConsoleProps {}

declare global {
  interface Window {
    connect: {
      core: {
        initCCP: (container: React.MutableRefObject<HTMLElement> | null, init: unknown) => void;
      };
    };
  }
}

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  const ccpContainerRef = useRef(null);

  useEffect(() => {
    console.log('useEffect', { connect: window.connect });
    window.connect.core.initCCP(ccpContainerRef.current, {});
  }, []);

  return (
    <div className='agentConsole' data-testid='agentConsole'>
      <h1>welcome to amazon connect agent console</h1>
      <section id='ccpContainer' ref={ccpContainerRef}></section>
      <section id='section-main'>
        <header>
          <h1>amazon connect CCP integration details</h1>
        </header>
        <fieldset>
          <legend>contact details</legend>
          <div id='details'></div>
        </fieldset>
      </section>
    </div>
  );
};
