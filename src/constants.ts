export const colors = {
  white: '#FFFFFF',
  white_dark: '#dbdbdb',
  black: '#2c3e50',
  kin: '#6f41e8',
  kin_light: 'rgb(104, 85, 151)',
  kin_dark: '#4927a0',
  background: '#efedf5',
  red: 'red',
  green: 'green',
};

export const breakpoints = {
  mobileBreakpoint: '770px',
  smallScreenBreakpoint: '1440px',
};

export const kinLinks = {
  docs: [
    {
      name: 'Docs',
      link: 'https://developer.kin.org/docs/developers',
    },
    {
      name: 'Discord',
      link: 'https://discord.com/invite/kdRyUNmHDn',
    },
  ],

  serverSDKTutorials: [
    {
      name: 'TypeScript',
      link: 'https://developer.kin.org/docs/developers/typescript',
    },
    {
      name: 'Python',
      link: 'https://developer.kin.org/docs/developers/python',
    },
  ],
  webSDK: [
    {
      name: 'TypeScript SDK Tutorial',
      link: 'https://developer.kin.org/docs/developers/typescript',
    },
  ],
  SDKless: [
    {
      name: 'Blog - Introducing Kin SDK-Less Transactions',
      link: 'https://kin.org/introducing-kin-sdk-less-transactions/',
    },
  ],

  webhooks: [
    {
      name: 'TypeScript Webhooks',
      link: 'https://developer.kin.org/docs/developers/typescript#webhooks',
    },
    {
      name: 'Python Webhooks',
      link: 'https://developer.kin.org/docs/developers/python#webhooks',
    },
  ],
  custodialWallets: [
    {
      name: 'Non-Custodial vs Custodial Wallets',
      link:
        'https://developer.kin.org/docs/best-practices/#non-custodial-vs-custodial-wallets-and-private-key-storage',
    },
  ],
  KRE: [
    {
      name: 'Kin Rewards Engine Explained',
      link: 'https://developer.kin.org/docs/essentials/kin-rewards-engine',
    },
    {
      name: 'KRE Checklist',
      link: 'https://developer.kin.org/docs/essentials/kre-checklist',
    },
  ],
  walletAdapter: [
    {
      name: '@solana/wallet-adapter',
      link: 'https://github.com/solana-labs/wallet-adapter',
    },
    {
      name: 'Implementation in this project',
      link:
        'https://github.com/kin-labs/kin-dapp-demo/blob/master/src/SolanaWallets.tsx',
    },
  ],
  devPortal: [
    { name: 'Kin Developer Portal', link: 'https://portal.kin.org/' },
    {
      name: 'How to Register Your App',
      link: 'https://developer.kin.org/docs/essentials/kre-app-registration',
    },
  ],
  solanaRent: [
    {
      name: 'What is Rent?',
      link: 'https://docs.solana.com/implemented-proposals/rent',
    },
  ],
  demoServers: [
    {
      name: 'TypeScript',
      link: 'https://github.com/kin-starters/kinetic-demo-node-sdk',
    },
    {
      name: 'Python',
      link: 'https://github.com/kin-starters/kinetic-demo-python-sdk',
    },
  ],
  serverCodeSamples: {
    title: 'See the Code: ',
    methods: {
      setUpKinClient: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#instantiate-the-kinetic-client',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#instantiate-the-kinetic-client',
        },
      ],
      createAccount: [
        {
          name: 'TypeScript',
          sdk: 'https://github.com/kinecosystem/kin-node',
          link:
            'https://developer.kin.org/docs/developers/typescript#create-account',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#create-account',
        },
      ],
      getBalance: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#check-balance',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#check-balance',
        },
      ],
      requestAirdrop: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#airdrop-funds-devnet',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#airdrop-funds-devnet',
        },
      ],
      getTransaction: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#get-transaction-details',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#get-transaction-details',
        },
      ],
      getHistory: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#get-account-history',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#get-account-history',
        },
      ],
      submitPayment: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#transfer-kin',
        },
        {
          name: 'Python',
          link: 'https://developer.kin.org/docs/developers/python#transfer-kin',
        },
      ],
      submitBatch: [
        {
          name: 'TypeScript',
          link:
            'https://developer.kin.org/docs/developers/typescript#transfer-kin-batch',
        },
        {
          name: 'Python',
          link:
            'https://developer.kin.org/docs/developers/python#transfer-kin-batch',
        },
      ],
    },
  },
  clientCodeSamples: {
    methods: {
      setUpKinClient: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#instantiate-the-kinetic-client',
        },
      ],
      createAccount: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#create-account',
        },
      ],
      getBalance: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#check-balance',
        },
      ],
      requestAirdrop: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#airdrop-funds-devnet',
        },
      ],
      submitPayment: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#transfer-kin',
        },
      ],
      getTransactionDetails: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#get-transaction-details',
        },
      ],
      getAccountHistory: [
        {
          name: 'See the Code',
          link:
            'https://developer.kin.org/docs/developers/typescript#get-account-history',
        },
      ],
    },
  },
  SDKlessCodeSamples: {
    methods: {
      createAccount: [
        {
          name: 'See the Code',
          link:
            'https://github.com/kin-labs/kin-dapp-demo/blob/master/src/helpers/SDKless/handleCreateTokenAccount.ts',
        },
      ],
      getBalance: [
        {
          name: 'See the Code',
          link:
            'https://github.com/kin-labs/kin-dapp-demo/blob/master/src/helpers/SDKless/handleGetKinBalances.ts',
        },
      ],
      submitPayment: [
        {
          name: 'See the Code',
          link:
            'https://github.com/kin-labs/kin-dapp-demo/blob/master/src/helpers/SDKless/handleSendKin.ts',
        },
      ],
      closeEmptyTokenAccount: [
        {
          name: 'See the Code',
          link:
            'https://github.com/kin-labs/kin-dapp-demo/blob/master/src/helpers/SDKless/handleCloseEmptyTokenAccount.ts',
        },
      ],
    },
  },
};

export type TransactionTypeName = 'Earn' | 'Spend' | 'P2P' | 'None';
export const transactionTypeNames: TransactionTypeName[] = [
  'Earn',
  'Spend',
  'P2P',
  'None',
];
export type SolanaNetwork = 'Mainnet' | 'Devnet';
export const solanaNetworks: SolanaNetwork[] = ['Mainnet', 'Devnet'];

export const solanaAddresses = {
  Mainnet: {
    kinMint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
  },
  Devnet: {
    kinMint: '',
  },
};
