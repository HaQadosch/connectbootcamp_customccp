import React, { useEffect, useRef } from 'react';
import './AgentConsole.css';

interface IAgentConsoleProps {}

declare global {
  interface Window {
    connect: {
      core: {
        initCCP: (container: React.MutableRefObject<HTMLElement> | HTMLElement | null, init: unknown) => void;
      };
      contact: (arg: ContactedT) => void;
    };
  }
}

type ContactedT = {
  onConnecting: (arg: OnConnectedT) => void;
};

type OnConnectedT = {
  contactId: string;
};

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
  const onConnectingCB = (onConnected: OnConnectedT): void => {
    const { contactId, ...rest } = onConnected;
    console.log('onConnecting', { contactId, rest });
  };
  const contactCB = (contacted: ContactedT): void => {
    console.log('contact', { contacted });
    contacted.onConnecting(onConnectingCB);
  };
  const foo = (onConnected: OnConnectedT) => {
    const { contactId, ...rest } = onConnected;
    console.log({ contactId, rest });
  };
  // window.connect.contact(contactCB)
  // window.connect.contact(contacted => {
  // console.log('contact', { contacted })
  // contacted.onConnecting(onConnected => {
  //   console.log('onConnecting', { onConnected })
  // })
  // })
};

export const AgentConsole: React.FC<IAgentConsoleProps> = props => {
  const ccpContainerRef = useRef(null);
  // const ccpDom = window.document.getElementById('ccpContainer')

  useEffect(() => {
    console.log('useEffect', { connect: window.connect });
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
