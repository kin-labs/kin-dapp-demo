import { useState } from 'react';
import { KineticSdk } from '@kin-kinetic/sdk';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { colors, kinLinks, SolanaNetwork } from './constants';
import { MakeToast } from './helpers';

// import logo from './kin-white.svg';
import { Toggle } from './Toggle';
import { KinServerApp } from './KinServer';
import { KinClientApp } from './KinWebSDKClient';
import { KinSDKlessAppWithWallet } from './KinSDKlessClient';

import { Links } from './Links';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const makeToast = ({ text, happy }: MakeToast) => {
  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  return happy ? toast.success(text, options) : toast.error(text, options);
};

function App() {
  const [loading, setLoading] = useState(false);

  const appTypes = [
    'DApp - Kin SDK',
    'Backend Server - Kin SDK',
    'DApp - SDK-less',
  ];
  const [selectedAppType, setSelectedAppType] = useState(appTypes[0]);

  const [kineticClient, setKinClient] = useState<KineticSdk | null>(null);
  const [kineticClientNetwork, setKinClientNetwork] = useState('Test');
  const [solanaNetwork, setSolanaNetwork] = useState<SolanaNetwork>('Devnet');

  return (
    <div className="App">
      <ToastContainer />
      {loading ? (
        <div className="LoaderFullScreen">
          <Loader
            type="Audio"
            color={colors.kin_light}
            height={100}
            width={100}
          />
        </div>
      ) : null}

      <nav className="App-nav">
        <div className="App-nav-container">
          <div className="App-logo-container">
            <img
              src={
                'https://developer.kin.org/branding/kin-logo-white-sideicon.svg'
              }
              className="App-logo"
              alt="logo"
            />
          </div>

          <span>DApp Playground</span>
          <Links links={kinLinks.docs} />
          <span className="explanation">
            Play with Kin using our SDKs in the browser or connected to a
            server. Or try it out SDK-less and transact on Solana directly
          </span>
        </div>
        <div className="App-nav-hero-container">
          <img
            src="https://developer.kin.org/images/kin-cube.png"
            className="Hero-image"
            alt="Kin"
          />
        </div>
      </nav>
      <main className="App-body">
        <div className="App-body-container">
          <Toggle
            title="I'm making a ..."
            options={appTypes}
            selected={selectedAppType}
            onChange={setSelectedAppType}
          />

          {(() => {
            if (selectedAppType === appTypes[1]) {
              return (
                <KinServerApp makeToast={makeToast} setLoading={setLoading} />
              );
            }
            if (selectedAppType === appTypes[0]) {
              return (
                <KinClientApp
                  makeToast={makeToast}
                  setLoading={setLoading}
                  kineticClient={kineticClient}
                  setKinClient={setKinClient}
                  kineticClientNetwork={kineticClientNetwork}
                  setKinClientNetwork={setKinClientNetwork}
                />
              );
            }
            if (selectedAppType === appTypes[2]) {
              return (
                <KinSDKlessAppWithWallet
                  makeToast={makeToast}
                  setLoading={setLoading}
                  solanaNetwork={solanaNetwork}
                  setSolanaNetwork={setSolanaNetwork}
                />
              );
            }

            return null;
          })()}
        </div>
      </main>
    </div>
  );
}

export default App;
