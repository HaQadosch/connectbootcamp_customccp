import React, { useEffect, useRef } from 'react';
import './AgentConsole.css';
import { connect } from 'amazon-connect-streams';
interface IAgentConsoleProps {}

declare global {
  interface Window {
    connect: {
      core: connect.Core;
    };
  }
}

const initCCP: (
  init: unknown,
) => (container: React.MutableRefObject<HTMLElement> | HTMLElement | null) => void = initConf => anchorTag =>
  window.connect.core.initCCP(anchorTag, initConf);
const initConf = {
  ccpURL: 'https://ecscc-demo.awsapps.com/connect/ccp#/',
  softphone: {
    allowFramedSoftphone: true,
    disabledRingtone: false,
  },
};

const listenToContact = () => {
  console.log('listenToContact');
  window.connect.contact(1);
};

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  const ccpContainerRef = useRef(null);
  // const ccpDom = window.document.getElementById('ccpContainer')

  useEffect(() => {
    try {
      if (window.connect && ccpContainerRef) {
        initCCP(initConf)(ccpContainerRef.current);
        listenToContact();
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
