import React, { useEffect, useRef } from 'react';
import './AgentConsole.css';

interface IAgentConsoleProps {}

const initCCP: (init: connect.InitCCPOptions) => (container: HTMLElement) => void = initConf => anchorTag =>
  connect.core.initCCP(anchorTag, initConf);

const initConf = {
  ccpUrl: 'https://ecscc-demo.awsapps.com/connect/ccp#/',
  softphone: {
    allowFramedSoftphone: true,
    disabledRingtone: false,
  },
};

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  const ccpContainerRef = useRef(window.document.getElementById('ccpContainer') as HTMLElement);
  // const ccpDom = window.document.getElementById('ccpContainer')

  useEffect(() => {
    try {
      if (connect && ccpContainerRef) {
        console.log({ connect, ccpContainerRef });
        initCCP(initConf)(ccpContainerRef.current);
      }
    } catch (error) {
      console.error({ error, ccpContainerRef });
    }
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
