import { useState, useEffect } from 'react';

import { KinAction } from './KinAction';
import { Links } from './Links';

import { kinLinks } from './constants';

import { MakeToast, openExplorer } from './helpers';
import {
  getServerStatus,
  handleSetUpKinClient,
  handleCreateAccount,
  handleGetBalance,
  handleRequestAirdrop,
  handleSendKin,
  getSanitisedBatch,
  handleSendBatch,
  handleGetTransaction,
  handleGetHistory,
  handleGetTokenAccounts,
  Transaction,
  User,
  BatchPayment,
  HandleSendKin,
  HandleSendBatch,
  handleCloseAccount,
  handleGetAccountInfo,
} from './helpers/serverSDK';

import './Kin.scss';

interface KinServerAppProps {
  makeToast: (arg: MakeToast) => void;
  setLoading: (arg: boolean) => void;
}
export function KinServerApp({ makeToast, setLoading }: KinServerAppProps) {
  const [serverRunning, setServerRunning] = useState(false);
  const [serverAppIndex, setServerAppIndex] = useState(0);
  const [kinNetwork, setKinNetwork] = useState('Test');
  const [serverKinNetwork, setServerKinNetwork] = useState<string | null>(null);

  const [userAccounts, setUserAccounts] = useState<User[]>([]);
  const userAccountNames = userAccounts
    .map((userAccount) => userAccount.name)
    .filter((userName) => userName !== 'App');

  const [transactions, setTransactions] = useState<string[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    if (shouldUpdate) {
      setLoading(true);
      getServerStatus({
        onSuccess: ({ status, data }) => {
          console.log('🚀 ~ data', data);
          if (data?.env === 'devnet') {
            setServerKinNetwork('Devnet');
            setKinNetwork('Devnet');
          }
          if (data?.env === 'mainnet') {
            setServerKinNetwork('Mainnet');
            setKinNetwork('Mainnet');
          }

          setServerAppIndex(data.appIndex);
          setUserAccounts(data.users);
          setTransactions(data.transactions);
          if (!serverRunning)
            makeToast({
              text: `Server Running!`,
              happy: true,
            });

          setServerRunning(status === 200);
          setLoading(false);
          setShouldUpdate(false);
        },
        onFailure: () => {
          setServerRunning(false);
          setShouldUpdate(false);
          setServerAppIndex(0);
          setServerKinNetwork(null);
          setLoading(false);
          makeToast({
            text: `Can't find Server!`,
            happy: false,
          });
        },
      });
    }

    return () => {};
  }, [shouldUpdate]);

  const [newUserName, setNewUserName] = useState('');

  const [closeAccountUser, setCloseAccountUser] = useState('App');

  const [balanceUser, setBalanceUser] = useState('App');
  const [displayBalance, setDisplayBalance] = useState('');

  const [accountInfoUser, setAccountInfoUser] = useState('App');
  const [gotAccountInfo, setGotAccountInfo] = useState('');

  const [historyUser, setHistoryUser] = useState('App');
  const [gotHistory, setGotHistory] = useState('');

  const [tokenAccountsUser, setTokenAccountsUser] = useState('App');
  const [gotTokenAccounts, setGotTokenAccounts] = useState('');

  const [airdropUser, setAirdropUser] = useState('App');
  const [airdropAmount, setAirdropAmount] = useState('');

  const [inputTransaction, setInputTransaction] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [gotTransaction, setGotTransaction] = useState<Transaction | null>(
    null
  );

  const [payFromUserP2P, setPayFromUserP2P] = useState(
    userAccountNames[0] || ''
  );
  const [payToUserP2P, setPayToUserP2P] = useState(userAccountNames[1] || '');
  const [payAmountP2P, setPayAmountP2P] = useState('');

  const [batchPayments, setBatchPayments] = useState<BatchPayment[]>([
    { to: '', amount: '' },
  ]);

  const [payFromUserSpend, setPayFromUserSpend] = useState('');
  const [payAmountSpend, setPayAmountSpend] = useState('');

  const [payToUserEarn, setPayToUserEarn] = useState('');
  const [payAmountEarn, setPayAmountEarn] = useState('');

  return (
    <div className="Kin">
      <h4 className="Kin-explanation">
        <span className="bold">{`Great for mobile and consumer apps`}</span>
        <br />
        <br />
        {`Kin Server SDKs allow apps to create and submit transactions from their backend server (for example, to send Kin to their users). `}
        {`Additionally, they allow developers to make use of webhooks, which assist with transaction monitoring and validation`}
        <br />
        <br />
        {`Private keys created by Server SDKs are generated on a custodial basis`}
        <br />
        {`Make sure you understand the implications of this - `}
        <Links links={kinLinks.custodialWallets} />
        <br />
        {`A common use case would be to use a Client SDK (Web / Mobile) for non-custodial private key creation, and the Server SDK to provide additional functionality, e.g. payouts to users, etc`}
        <br />
        <br />

        {`Transactions will be eligible for reward via the Kin Rewards Engine`}
        <br />
        <Links links={kinLinks.KRE} />
        <br />
        <br />
        <span>
          <Links
            links={kinLinks.serverSDKTutorials}
            linksTitle="Server SDK Tutorials: "
          />
          <br />
          <Links links={kinLinks.demoServers} linksTitle="Demo Servers: " />
        </span>
      </h4>
      <div
        className={`Kin-status ${
          serverRunning && serverAppIndex ? 'up' : 'down'
        }`}
      >
        {serverRunning && serverAppIndex ? (
          <span>
            Server Running{' '}
            {serverAppIndex ? (
              <>
                <br />
                App Index {serverAppIndex} on {serverKinNetwork}
              </>
            ) : (
              <>
                <br />
                <span>
                  {`Register on the Kin Developer Portal to get your App Index`}
                </span>
              </>
            )}
          </span>
        ) : (
          <span>
            {!serverRunning
              ? `Can't connect to server`
              : `Server running but Kin Client not initialised`}
            <br />

            {!serverRunning ? (
              <span>
                <br />
                {`Make sure you're running your server on the port you set in your .env file`}
                <br />
                {`Checkout the README for details`}
              </span>
            ) : (
              ''
            )}
          </span>
        )}
      </div>

      <KinAction
        open
        title="Server Check"
        subTitle="Check again if your server is running"
        actions={[
          {
            name: 'Check',
            onClick: () => {
              setServerRunning(false);
              setServerAppIndex(0);
              setServerKinNetwork(null);
              setLoading(true);
              setTimeout(() => {
                setShouldUpdate(true);
              }, 1000);
            },
          },
        ]}
      />

      {serverRunning ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <KinAction
            open
            title="Initialise your Kin Client on the Server"
            subTitle="Choose your environment"
            subTitleLinks={kinLinks.devPortal}
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.setUpKinClient}
            actions={[
              {
                name: 'Setup',
                onClick: () => {
                  setLoading(true);
                  handleSetUpKinClient({
                    onSuccess: () => {
                      setLoading(false);
                      setShouldUpdate(true);
                      makeToast({
                        text: `Kin Client initialised!`,
                        happy: true,
                      });
                    },
                    onFailure: () => {
                      setLoading(false);
                      setShouldUpdate(true);
                      makeToast({
                        text: `Couldn't initialise Kin Client`,
                        happy: false,
                      });
                    },
                    kinNetwork,
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
        </>
      ) : null}
      {serverAppIndex && serverKinNetwork ? (
        <>
          <br />
          <br />
          <h3 className="Kin-section">{`Manage Kin Accounts`}</h3>

          <KinAction
            title="Create a Kin Account for a User"
            subTitle="Requires 'verify' Webhook if you've added it on in Kinetic"
            subTitleLinks={kinLinks.webhooks}
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.createAccount}
            actions={[
              {
                name: 'Create',
                onClick: () => {
                  const exists = userAccountNames.includes(newUserName);
                  if (exists) {
                    makeToast({
                      text: 'Username already exists',
                      happy: false,
                    });
                  } else {
                    setLoading(true);
                    handleCreateAccount({
                      name: newUserName,
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
            inputs={[
              {
                name: 'Username',
                value: newUserName,
                onChange: setNewUserName,
              },
            ]}
          />

          <KinAction
            title="Close An Empty Account"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.closeAccount}
            actions={[
              {
                name: 'Close Account',
                onClick: () => {
                  setLoading(true);
                  handleCloseAccount({
                    user: closeAccountUser,
                    onSuccess: () => {
                      setLoading(false);
                      makeToast({
                        text: 'Account Closed Successfully!',
                        happy: true,
                      });
                      setShouldUpdate(true);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({
                        text: "Couldn't close account!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'See in Explorer',
                onClick: async () => {
                  const user = userAccounts.find(
                    (account) => account.name === closeAccountUser
                  );

                  const address = user?.publicKey;
                  openExplorer({
                    address,
                    kinNetwork,
                  });
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: closeAccountUser,
                options: ['App', ...userAccountNames],
                onChange: (user) => {
                  setCloseAccountUser(user);
                  setDisplayBalance('');
                },
              },
            ]}
          />

          <KinAction
            title="Get an Account Balance"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.getBalance}
            actions={[
              {
                name: 'Get Balance',
                onClick: () => {
                  setLoading(true);
                  handleGetBalance({
                    user: balanceUser,
                    onSuccess: (balance) => {
                      setLoading(false);
                      setDisplayBalance(balance.toString());
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
                onClick: async () => {
                  const user = userAccounts.find(
                    (account) => account.name === balanceUser
                  );

                  const address = user?.publicKey;
                  openExplorer({
                    address,
                    kinNetwork,
                  });
                },
              },
            ]}
            inputs={[
              {
                name: 'User',
                value: balanceUser,
                options: ['App', ...userAccountNames],
                onChange: (user) => {
                  setBalanceUser(user);
                  setDisplayBalance('');
                },
              },
            ]}
            displayValue={
              displayBalance
                ? `${
                    balanceUser || userAccountNames[0]
                  } has ${displayBalance} Kin`
                : ''
            }
          />

          <br />
          <br />

          <h3 className="Kin-section">{`Make payments and earn Kin via the KRE`}</h3>

          {(() => {
            if (!userAccountNames.length) {
              return <h4>Why not add some users?</h4>;
            }

            return null;
          })()}

          {kinNetwork === 'Test' || kinNetwork === 'Devnet' ? (
            <KinAction
              title="Request Airdrop (Test Network Only)"
              subTitle="Get some kin so you can start testing your transaction code"
              linksTitle={kinLinks.codeSamples.title}
              links={kinLinks.codeSamples.methods.requestAirdrop}
              disabled={!airdropAmount}
              actions={[
                {
                  name: 'Request',
                  onClick: () => {
                    setLoading(true);
                    handleRequestAirdrop({
                      to: airdropUser,
                      amount: airdropAmount,
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
                  options: ['App', ...userAccountNames],
                  onChange: (user) => {
                    setAirdropUser(user);
                  },
                },
                {
                  name: 'Requested Amount',
                  value: airdropAmount,
                  type: 'number',
                  onChange: setAirdropAmount,
                },
              ]}
            />
          ) : null}

          <KinAction
            title="Pay Kin from App To User - Earn Transaction"
            subTitle="Requires 'verify' Webhook if you've added it on in Kinetic"
            subTitleLinks={kinLinks.webhooks}
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.submitPayment}
            actions={[
              {
                name: 'Pay',
                onClick: () => {
                  setLoading(true);

                  const sendKinOptions: HandleSendKin = {
                    from: 'App',
                    to: payToUserEarn || userAccountNames[0],
                    amount: payAmountEarn,

                    type: 'Earn',
                    onSuccess: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Successful!', happy: true });
                      setPayAmountEarn('');

                      setShouldUpdate(true);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Failed!', happy: false });
                    },
                  };

                  handleSendKin(sendKinOptions);
                },
              },
            ]}
            inputs={[
              {
                name: 'To',
                value: payToUserEarn || userAccountNames[0],
                options: userAccountNames,
                onChange: (user) => {
                  setPayToUserEarn(user);
                },
              },
              {
                name: 'Amount to Pay',
                value: payAmountEarn,
                type: 'number',
                onChange: setPayAmountEarn,
              },
            ]}
            disabled={!serverAppIndex || userAccountNames.length < 1}
          />
          <KinAction
            title="Send Batch of Earn Transactions"
            subTitle="Requires 'verify' Webhook if you've added it on in Kinetic"
            subTitleLinks={kinLinks.webhooks}
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.submitBatch}
            actions={[
              {
                name: 'Pay',
                onClick: () => {
                  setLoading(true);

                  const sendKinBatchOptions: HandleSendBatch = {
                    from: 'App',
                    batch: getSanitisedBatch(
                      batchPayments,
                      userAccountNames[0]
                    ),
                    onSuccess: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Successful!', happy: true });
                      setPayAmountEarn('');

                      setShouldUpdate(true);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Failed!', happy: false });
                    },
                  };

                  handleSendBatch(sendKinBatchOptions);
                },
              },
            ]}
            inputs={[
              {
                name: 'Batch Earns',
                inputs: batchPayments
                  .map((_, index) => {
                    return [
                      {
                        name: 'To',
                        value: batchPayments[index].to || userAccountNames[0],
                        options: userAccountNames,
                        index,
                        onChange: (user: string) => {
                          const updatedBatchPayments = [...batchPayments];
                          updatedBatchPayments[index].to = user;
                          setBatchPayments(updatedBatchPayments);
                        },
                      },
                      {
                        name: 'Amount to Pay',
                        value: batchPayments[index].amount,
                        type: 'number',
                        index,
                        onChange: (amount: string) => {
                          const updatedBatchPayments = [...batchPayments];
                          updatedBatchPayments[index].amount = amount;
                          setBatchPayments(updatedBatchPayments);
                        },
                      },
                    ];
                  })
                  .flat(),
              },
            ]}
            addInput={() => {
              const blankPayment: BatchPayment = { to: '', amount: '' };
              setBatchPayments([...batchPayments, blankPayment]);
            }}
            disabled={!serverAppIndex || userAccountNames.length < 1}
          />
          <KinAction
            title="Pay Kin from User To App - Spend Transaction"
            subTitle="Requires 'verify' Webhook if you've added it on in Kinetic"
            subTitleLinks={kinLinks.webhooks}
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.submitPayment}
            actions={[
              {
                name: 'Pay',
                onClick: () => {
                  setLoading(true);

                  const sendKinOptions: HandleSendKin = {
                    from: payFromUserSpend || userAccountNames[0],
                    to: 'App',
                    amount: payAmountSpend,
                    type: 'Spend',
                    onSuccess: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Successful!', happy: true });
                      setPayAmountSpend('');
                      setShouldUpdate(true);
                    },
                    onFailure: () => {
                      setLoading(false);
                      makeToast({ text: 'Send Failed!', happy: false });
                    },
                  };

                  handleSendKin(sendKinOptions);
                },
              },
            ]}
            inputs={[
              {
                name: 'From',
                value: payFromUserSpend || userAccountNames[0],
                options: userAccountNames,
                onChange: (user) => {
                  setPayFromUserSpend(user);
                },
              },
              {
                name: 'Amount to Pay',
                value: payAmountSpend,
                type: 'number',
                onChange: setPayAmountSpend,
              },
            ]}
            disabled={!serverAppIndex || userAccountNames.length < 1}
          />
          <KinAction
            title="Send Kin from User to User -  P2P Transaction"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.submitPayment}
            subTitle="Requires 'verify' Webhook if you've added it on in Kinetic"
            subTitleLinks={kinLinks.webhooks}
            actions={[
              {
                name: 'Send',
                onClick: () => {
                  setLoading(true);

                  const sendKinOptions: HandleSendKin = {
                    from: payFromUserP2P || userAccountNames[0],
                    to: payToUserP2P || userAccountNames[1],
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
                    sendKinOptions.from !== sendKinOptions.to
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
                value: payFromUserP2P || userAccountNames[0],
                options: userAccountNames,
                onChange: (user) => {
                  setPayFromUserP2P(user);
                },
              },
              {
                name: 'To',
                value: payToUserP2P || userAccountNames[1],
                options: userAccountNames,
                onChange: (user) => {
                  setPayToUserP2P(user);
                },
              },
              {
                name: 'Amount to Send',
                value: payAmountP2P,
                type: 'number',
                onChange: setPayAmountP2P,
              },
            ]}
            disabled={!serverAppIndex || userAccountNames.length < 2}
          />

          <br />
          <br />
          <h3 className="Kin-section">{`Get Account / Transaction Data`}</h3>

          <KinAction
            title="Get Transaction Details"
            subTitle="Transactions may take a little time to appear"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.getTransaction}
            actions={[
              {
                name: 'Get Transaction',
                onClick: () => {
                  setLoading(true);
                  handleGetTransaction({
                    transaction:
                      inputTransaction ||
                      selectedTransaction ||
                      transactions[0],
                    onSuccess: (transaction) => {
                      setLoading(false);
                      makeToast({ text: 'Got Transaction Data!', happy: true });
                      setGotTransaction(transaction);
                    },
                    onFailure: () => {
                      setLoading(false);
                      setGotTransaction(null);
                      makeToast({
                        text: "Couldn't get Transaction data!",
                        happy: false,
                      });
                    },
                  });
                },
              },
              {
                name: 'See in Explorer',
                onClick: () => {
                  const transaction =
                    inputTransaction || selectedTransaction || transactions[0];
                  openExplorer({ transaction, kinNetwork });
                },
              },
            ]}
            inputs={[
              {
                name: 'Transaction Id',
                value: inputTransaction,
                onChange: (transaction) => {
                  setInputTransaction(transaction);
                  setGotTransaction(null);
                },
              },
              {
                name: 'Transaction',
                value: selectedTransaction || transactions[0],
                options: [...transactions],
                onChange: (transaction) => {
                  setSelectedTransaction(transaction);
                  setInputTransaction('');
                  setGotTransaction(null);
                },
                disabledInput:
                  !transactions.length || !!inputTransaction.length,
              },
            ]}
            displayOutput={gotTransaction ? gotTransaction : null}
          />

          <KinAction
            title="Get an Account History"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.getHistory}
            actions={[
              {
                name: 'Get History',
                onClick: () => {
                  setLoading(true);
                  handleGetHistory({
                    user: historyUser,
                    onSuccess: (history) => {
                      setLoading(false);
                      setGotHistory(history);
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
            ]}
            inputs={[
              {
                name: 'User',
                value: historyUser,
                options: ['App', ...userAccountNames],
                onChange: (user) => {
                  setHistoryUser(user);
                  setGotHistory('');
                },
              },
            ]}
            displayOutput={gotHistory ? gotHistory : null}
          />

          <KinAction
            title="Get Account Information"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.getAccountInfo}
            actions={[
              {
                name: 'Get Account Info',
                onClick: () => {
                  setLoading(true);
                  handleGetAccountInfo({
                    user: accountInfoUser,
                    onSuccess: (accountInfo) => {
                      setLoading(false);
                      setGotAccountInfo(accountInfo);
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
            ]}
            inputs={[
              {
                name: 'User',
                value: accountInfoUser,
                options: ['App', ...userAccountNames],
                onChange: (user) => {
                  setAccountInfoUser(user);
                  setGotAccountInfo('');
                },
              },
            ]}
            displayOutput={gotAccountInfo ? gotAccountInfo : null}
          />

          <KinAction
            title="Get Token Accounts"
            linksTitle={kinLinks.codeSamples.title}
            links={kinLinks.codeSamples.methods.getTokenAccounts}
            actions={[
              {
                name: 'Get Token Accounts',
                onClick: () => {
                  setLoading(true);
                  handleGetTokenAccounts({
                    user: historyUser,
                    onSuccess: (tokenAccounts) => {
                      setLoading(false);
                      setGotTokenAccounts(tokenAccounts);
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
            ]}
            inputs={[
              {
                name: 'User',
                value: tokenAccountsUser,
                options: ['App', ...userAccountNames],
                onChange: (user) => {
                  setTokenAccountsUser(user);
                  setGotTokenAccounts('');
                },
              },
            ]}
            displayOutput={gotTokenAccounts ? gotTokenAccounts : null}
          />
          <br />
          <br />
        </>
      ) : null}
    </div>
  );
}
