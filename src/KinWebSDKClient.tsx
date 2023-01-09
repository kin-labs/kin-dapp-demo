import { useState, useEffect } from 'react';
import { KineticSdk } from '@kin-kinetic/sdk';

import { KinAction } from './KinAction';
import { Links } from './Links';

import { kinLinks } from './constants';

import {
  MakeToast,
  openExplorer,
  getKeypairs,
  getKeypair,
  getTransactions,
  getPublicKey,
} from './helpers';

import { handleSetUpKinClient } from './helpers/webSDK/handleSetUpKinClient';
import { handleCreateAccount } from './helpers/webSDK/handleCreateAccount';
import { handleGetBalance } from './helpers/webSDK/handleGetBalance';
import { handleRequestAirdrop } from './helpers/webSDK/handleRequestAirdrop';
import { handleSendKin, HandleSendKin } from './helpers/webSDK/handleSendKin';

import './Kin.scss';
import { handleGetTransactionData } from './helpers/webSDK/handleGetTransactionData';
import { handleGetHistory } from './helpers/webSDK/handleGetHistory';
import { handleGetAccountInfo } from './helpers/webSDK/handleGetAccountInfo';
import { handleGetTokenAccounts } from './helpers/webSDK/handleGetTokenAccounts';
import { handleCloseAccount } from './helpers/webSDK/handleCloseAccount';

interface KinClientAppProps {
  makeToast: (arg: MakeToast) => void;
  setLoading: (arg: boolean) => void;
  kineticClient: KineticSdk | null;
  setKinClient: (client: KineticSdk) => void;
  kineticClientNetwork: string;
  setKinClientNetwork: (network: string) => void;
}
export function KinClientApp({
  makeToast,
  setLoading,
  kineticClient,
  setKinClient,
  kineticClientNetwork,
  setKinClientNetwork,
}: KinClientAppProps) {
  const [userAccounts, setUserAccounts] = useState<string[]>(
    getKeypairs(kineticClientNetwork)
  );
  const [transactions, setTransactions] = useState<string[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  useEffect(() => {
    if (shouldUpdate) {
      // Get data from secure local storage
      setUserAccounts(getKeypairs(kineticClientNetwork));
      setTransactions(getTransactions(kineticClientNetwork));

      setShouldUpdate(false);
    }
  }, [shouldUpdate]);
  const [kinNetwork, setKinNetwork] = useState('Devnet');

  const [newUserName, setNewUserName] = useState('');

  const [closeAccountUser, setCloseAccountUser] = useState('');

  const [balanceUser, setBalanceUser] = useState('');
  const [displayBalance, setDisplayBalance] = useState('');

  const [airdropUser, setAirdropUser] = useState('');
  const [airdropAmount, setAirdropAmount] = useState('');

  const [payFromUserP2P, setPayFromUserP2P] = useState('');
  const [payToUserP2P, setPayToUserP2P] = useState('');
  const [payAmountP2P, setPayAmountP2P] = useState('');

  const [inputTransaction, setInputTransaction] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [transactionData, setTransactionData] = useState('');

  const [historyUser, setHistoryUser] = useState('');
  const [historyData, setHistoryData] = useState('');

  const [accountInfoUser, setAccountInfoUser] = useState('');
  const [accountInfoData, setAccountInfoData] = useState('');

  const [tokenAccountsUser, setTokenAccountsUser] = useState('');
  const [tokenAccountsData, setTokenAccountsData] = useState('');

  const [seeWallet, setSeeWallet] = useState('');

  const [seeWalletDetails, setSeeWalletDetails] = useState('');

  return (
    <div className="Kin">
      <div className="Kin-explanation">
        <span className="bold">{`Perfect for building Kin web experiences`}</span>

        <br />
        <br />
        {`Create and send transactions via the Kin TypeScript SDK directly from the browser.`}
        <br />
        <Links links={kinLinks.webSDK} />
        <br />
        <br />

        {`Private keys are generated on a non-custodial basis and stored in the user's browser.`}
        <br />
        <br />

        {`Transactions will be eligible for reward via the Kin Rewards Engine`}
        <br />
        <Links links={kinLinks.KRE} />
      </div>

      <div
        className={`Kin-status ${kineticClient ? 'hasAppIndex' : 'noAppIndex'}`}
      >
        {kineticClient ? (
          <span>
            {`Client Initialised`}
            <br />
            {`App Index ${process.env.REACT_APP_APP_INDEX} on ${kineticClientNetwork}`}
          </span>
        ) : (
          <span>
            {`Client Not Initialised`}
            <br />
            {`Click Setup Below`}
          </span>
        )}
      </div>

      <KinAction
        open
        title="Initialise Your Kin Client with your App Index"
        subTitle="Make sure you've registered your App on the Kin Developer Portal | Remember to add your environment variable for your App Index"
        subTitleLinks={kinLinks.devPortal}
        links={[kinLinks.codeSamples.methods.setUpKinClient[0]]}
        disabled={!process.env.REACT_APP_APP_INDEX}
        actions={[
          {
            name: 'Setup',
            onClick: () => {
              handleSetUpKinClient({
                kinNetwork,
                onSuccess: ({ client }) => {
                  setKinClient(client);
                  setKinClientNetwork(kinNetwork);
                  setShouldUpdate(true);
                  makeToast({
                    text: 'Client Initialisation Successful!',
                    happy: true,
                  });
                },
                onFailure: () => {
                  makeToast({
                    text: 'Client Initialisation Failed!',
                    happy: false,
                  });
                },
              });
            },
          },
        ]}
        inputs={[
          {
            name: 'Network',
            value: kinNetwork,
            options: ['Devnet', 'Mainnet'],
            onChange: setKinNetwork,
          },
        ]}
      />

      {kineticClient ? (
        <>
          <br />
          <br />
          <h3 className="Kin-section">{`Manage Kin Accounts`}</h3>
          <KinAction
            title="Create a Kin Account for a User"
            subTitle="If you've turned on the 'verify' webhook in Kinetic, make sure your server is running so that it can validate this transaction."
            subTitleLinks={kinLinks.webhooks}
            links={[kinLinks.codeSamples.methods.createAccount[0]]}
            actions={[
              {
                name: 'Create',
                onClick: () => {
                  const exists = userAccounts.includes(newUserName);
                  if (exists) {
                    makeToast({
                      text: 'Account already exists',
                      happy: false,
                    });
                  } else {
                    setLoading(true);
                    handleCreateAccount({
                      kineticClient,
                      name: newUserName,
                      kinNetwork: kineticClientNetwork,
                      onSuccess: () => {
                        setLoading(false);
                        makeToast({
                          text: 'Account Creation Successful!',
                          happy: true,
                        });
                        setShouldUpdate(true);
                        setNewUserName('');
                      },
                      onFailure: () => {
                        setLoading(false);
                        makeToast({
                          text: 'Account Creation Failed!',
                          happy: false,
                        });
                      },
                    });
                  }
                },
              },
            ]}
          />{' '}
          <KinAction
            title="Close an Empty Account"
            links={[kinLinks.codeSamples.methods.getBalance[0]]}
            disabled={!userAccounts.length}
            actions={[
              {
                name: 'Close Account',
                onClick: () => {
                  setLoading(true);
                  handleCloseAccount({
                    kineticClient,
                    user: closeAccountUser || userAccounts[0],
                    kinNetwork: kineticClientNetwork,
                    onSuccess: () => {
                      setShouldUpdate(true);
                      setLoading(false);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't close Account!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'See in Explorer',
                onClick: () => {
                  const address = getPublicKey(
                    closeAccountUser || userAccounts[0],
                    kineticClientNetwork
                  );
                  if (!address) {
                    makeToast({
                      text: "Couldn't find user's address",
                      happy: false,
                    });
                  } else {
                    openExplorer({
                      address,
                      kinNetwork,
                    });
                  }
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: closeAccountUser,
                options: userAccounts,
                onChange: (user) => {
                  setCloseAccountUser(user);
                },
              },
            ]}
          />
          <KinAction
            title="Get an Account Balance"
            links={[kinLinks.codeSamples.methods.getBalance[0]]}
            disabled={!userAccounts.length}
            actions={[
              {
                name: 'Get Balance',
                onClick: () => {
                  setLoading(true);
                  handleGetBalance({
                    kineticClient,
                    user: balanceUser || userAccounts[0],
                    kinNetwork: kineticClientNetwork,
                    onSuccess: (balance) => {
                      setLoading(false);
                      setDisplayBalance(balance);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't get Balance!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'See in Explorer',
                onClick: () => {
                  const address = getPublicKey(
                    balanceUser || userAccounts[0],
                    kineticClientNetwork
                  );
                  if (!address) {
                    makeToast({
                      text: "Couldn't find user's address",
                      happy: false,
                    });
                  } else {
                    openExplorer({
                      address,
                      kinNetwork,
                    });
                  }
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: balanceUser,
                options: userAccounts,
                onChange: (user) => {
                  setBalanceUser(user);
                  setDisplayBalance('');
                },
              },
            ]}
            displayValue={
              displayBalance
                ? `${balanceUser || userAccounts[0]} has ${displayBalance} Kin`
                : ''
            }
          />
          <br />
          <br />
          <h3 className="Kin-section">{`Make payments and earn Kin via the KRE`}</h3>
          {(() => {
            if (!userAccounts || userAccounts.length < 2) {
              return <h4>Why not add some users?</h4>;
            }

            return null;
          })()}
          {kinNetwork === 'Devnet' ? (
            <KinAction
              title="Request Airdrop (Devnet Only)"
              subTitle="Get some kin so you can start testing your transaction code"
              links={[kinLinks.codeSamples.methods.requestAirdrop[0]]}
              disabled={!userAccounts.length || !airdropAmount}
              actions={[
                {
                  name: 'Request',
                  onClick: () => {
                    setLoading(true);
                    handleRequestAirdrop({
                      to: airdropUser || userAccounts[0],
                      amount: airdropAmount,
                      kineticClient,
                      kinNetwork: kineticClientNetwork,
                      onSuccess: () => {
                        setLoading(false);
                        makeToast({ text: 'Airdrop Successful!', happy: true });
                        setShouldUpdate(true);
                        setAirdropAmount('');
                      },
                      onFailure: () => {
                        setLoading(false);
                        makeToast({ text: 'Airdrop Failed!', happy: false });
                      },
                    });
                  },
                },
              ]}
              inputs={[
                {
                  name: 'User',
                  value: airdropUser,
                  options: userAccounts,
                  disabledInput: !userAccounts[0],
                  onChange: (user) => {
                    setAirdropUser(user);
                  },
                },
                {
                  name: 'Requested Amount',
                  value: airdropAmount,
                  type: 'number',
                  disabledInput: !userAccounts[0],
                  onChange: setAirdropAmount,
                },
              ]}
            />
          ) : null}
          <KinAction
            title="Send Kin from User to User -  P2P Transaction"
            links={[kinLinks.codeSamples.methods.submitPayment[0]]}
            subTitle="If you've turned on the 'verify' webhook in Kinetic, make sure your server is running so that it can validate this transaction."
            subTitleLinks={kinLinks.webhooks}
            actions={[
              {
                name: 'Send',
                onClick: () => {
                  setLoading(true);

                  const sendKinOptions: HandleSendKin = {
                    kineticClient,
                    kinNetwork: kineticClientNetwork,
                    from: payFromUserP2P || userAccounts[0],
                    to: payToUserP2P || userAccounts[1],
                    amount: payAmountP2P,
                    type: 'P2P',
                    onSuccess: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Successful!', happy: true });
                      setPayAmountP2P('');
                      setShouldUpdate(true);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Failed!', happy: false });
                    },
                  };

                  if (
                    sendKinOptions.from &&
                    sendKinOptions.to &&
                    sendKinOptions.from !== sendKinOptions.to &&
                    payAmountP2P
                  ) {
                    handleSendKin(sendKinOptions);
                  } else {
                    makeToast({ text: 'Send Failed!', happy: false });
                    setLoading(false);
                  }
                },
              },
            ]}
            inputs={[
              {
                name: 'From',
                value: payFromUserP2P || userAccounts[0],
                options: userAccounts,
                disabledInput: !userAccounts[0],
                onChange: (user) => {
                  setPayFromUserP2P(user);
                },
              },
              {
                name: 'To',
                value: payToUserP2P || userAccounts[1],
                options: userAccounts,
                disabledInput: !userAccounts[1],
                onChange: (user) => {
                  setPayToUserP2P(user);
                },
              },
              {
                name: 'Address to Send To',
                value: payToUserP2P,
                type: 'string',
                onChange: setPayToUserP2P,
              },
              {
                name: 'Amount to Send',
                value: payAmountP2P,
                type: 'number',
                disabledInput: !userAccounts[0],
                onChange: setPayAmountP2P,
              },
            ]}
            disabled={!payAmountP2P || (!userAccounts[1] && !payToUserP2P)}
          />
          <br />
          <br />
          <h3 className="Kin-section">{`Get Account / Transaction Data`}</h3>
          <KinAction
            title="View Transaction"
            links={[kinLinks.codeSamples.methods.getTransaction[0]]}
            subTitle="See the details of your transactions"
            disabled={!transactions.length && !inputTransaction}
            actions={[
              {
                name: 'Get',
                onClick: () => {
                  setLoading(true);
                  setTransactionData('');
                  const signature =
                    inputTransaction || selectedTransaction || transactions[0];
                  handleGetTransactionData({
                    kineticClient,
                    signature,
                    onSuccess: (data) => {
                      setLoading(false);
                      setTransactionData(data);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Failed!', happy: false });
                    },
                  });
                },
              },
              {
                name: 'View on Solana Explorer',
                onClick: () => {
                  const transaction =
                    inputTransaction || selectedTransaction || transactions[0];
                  openExplorer({ transaction, solanaNetwork: kinNetwork });
                },
              },
            ]}
            inputs={[
              {
                name: 'Transaction Id',
                value: inputTransaction,
                onChange: (transaction) => {
                  setInputTransaction(transaction);
                },
              },
              {
                name: 'Transaction',
                value: selectedTransaction || transactions[0],
                options: [...transactions],
                onChange: (transaction) => {
                  setSelectedTransaction(transaction);
                  setInputTransaction('');
                },
                disabledInput:
                  !transactions.length || !!inputTransaction.length,
              },
            ]}
            displayOutput={transactionData ? transactionData : null}
          />
          <KinAction
            title="Get Account History"
            subTitle="See the list of transactions associated with this Account"
            links={[kinLinks.codeSamples.methods.getHistory[0]]}
            disabled={!userAccounts.length}
            actions={[
              {
                name: 'Get History',
                onClick: () => {
                  setLoading(true);
                  handleGetHistory({
                    kineticClient,
                    user: historyUser || userAccounts[0],
                    kinNetwork: kineticClientNetwork,
                    onSuccess: (history) => {
                      setLoading(false);
                      setHistoryData(history);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't get History!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'View on Solana Explorer',
                onClick: () => {
                  const address = historyUser;
                  openExplorer({ address, solanaNetwork: kinNetwork });
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: historyUser,
                options: userAccounts,
                onChange: (user) => {
                  setHistoryUser(user);
                  setHistoryData('');
                },
              },
            ]}
            displayOutput={historyData ? historyData : null}
          />
          <KinAction
            title="Get Account Info"
            subTitle="See the details of this Account"
            links={[kinLinks.codeSamples.methods.getAccountInfo[0]]}
            disabled={!userAccounts.length}
            actions={[
              {
                name: 'Get Account Info',
                onClick: () => {
                  setLoading(true);
                  handleGetAccountInfo({
                    kineticClient,
                    user: accountInfoUser || userAccounts[0],
                    kinNetwork: kineticClientNetwork,
                    onSuccess: (accountInfo) => {
                      setLoading(false);
                      setAccountInfoData(accountInfo);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't get Account Info!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'View on Solana Explorer',
                onClick: () => {
                  const address = accountInfoUser;
                  openExplorer({ address, solanaNetwork: kinNetwork });
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: accountInfoUser,
                options: userAccounts,
                onChange: (user) => {
                  setAccountInfoUser(user);
                  setAccountInfoData('');
                },
              },
            ]}
            displayOutput={accountInfoData ? accountInfoData : null}
          />
          <KinAction
            title="Get Token Accounts"
            subTitle="Get a list of Token Accounts for this Solana Account"
            links={[kinLinks.codeSamples.methods.getTokenAccounts[0]]}
            disabled={!userAccounts.length}
            actions={[
              {
                name: 'Get Token Accounts',
                onClick: () => {
                  setLoading(true);
                  handleGetTokenAccounts({
                    kineticClient,
                    user: tokenAccountsUser || userAccounts[0],
                    kinNetwork: kineticClientNetwork,
                    onSuccess: (tokenAccounts: string) => {
                      setLoading(false);
                      setTokenAccountsData(tokenAccounts);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't get Token Accounts!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'View on Solana Explorer',
                onClick: () => {
                  const address = tokenAccountsUser;
                  openExplorer({ address, solanaNetwork: kinNetwork });
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: tokenAccountsUser,
                options: userAccounts,
                onChange: (user) => {
                  setTokenAccountsUser(user);
                  setTokenAccountsData('');
                },
              },
            ]}
            displayOutput={tokenAccountsData ? tokenAccountsData : null}
          />
          <br />
          <br />
          <h3 className="Kin-section">{`Additional actions not using Kin SDK`}</h3>
          <KinAction
            title="View User Keys"
            subTitle="Users will need a safe way to access their secret so they don't lose access to their Kin"
            disabled={!userAccounts[0]}
            actions={[
              {
                name: 'View',
                onClick: () => {
                  const keypair = getKeypair(
                    seeWallet || userAccounts[0],
                    kineticClientNetwork
                  );
                  console.log('🚀 ~ keypair', keypair);

                  if (keypair?.publicKey) {
                    setSeeWalletDetails(
                      JSON.stringify({
                        publicKey: keypair?.publicKey,
                        mnemonic: keypair.mnemonic,
                      })
                    );
                  }
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: seeWallet || userAccounts[0],
                options: [...userAccounts],
                onChange: (user) => {
                  setSeeWallet(user);
                  setSeeWalletDetails('');
                },
                disabledInput: !userAccounts.length,
              },
            ]}
            displayOutput={seeWalletDetails ? seeWalletDetails : null}
          />
          <br />
          <br />
        </>
      ) : null}
    </div>
  );
}
