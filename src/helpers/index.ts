import SecureLS from 'secure-ls';
import { Keypair } from '@kin-kinetic/keypair';

export interface MakeToast {
  text: string;
  happy: boolean;
}

// https://github.com/softvar/secure-ls
export const secureLocalStorage = new SecureLS();
console.log('🚀 ~ secureLocalStorage', secureLocalStorage);

// We are just saving into localStorage. Make sure your app uses a secure solution.
export function saveKeypair(keypair: Keypair, kinNetwork: string) {
  const keypairs = secureLocalStorage.get(`keypairs${kinNetwork}`) || [];

  if (keypair.publicKey)
    secureLocalStorage.set(`keypairs${kinNetwork}`, [...keypairs, keypair]);
}

export function getKeypairs(kinNetwork: string): string[] {
  try {
    const keypairs = secureLocalStorage.get(`keypairs${kinNetwork}`) || [];
    return keypairs.map((keypair: Keypair) => keypair.publicKey);
  } catch (error) {
    return [];
  }
}

export function getKeypair(user: string, kinNetwork: string): Keypair | null {
  const keypairs = secureLocalStorage.get(`keypairs${kinNetwork}`) || [];
  const userKeypair = keypairs.find(
    (keypair: Keypair) => keypair.publicKey === user
  );

  return userKeypair || null;
}

export function getPrivateKey(
  user: string,
  kinNetwork: string
): Keypair | null {
  const keypair = getKeypair(user, kinNetwork);
  return keypair || null;
}

export function getPublicKey(user: string, kinNetwork: string): string {
  const keypair = getKeypair(user, kinNetwork);
  return keypair?.publicKey || '';
}

interface Transaction {
  id: string;
  network: string;
}

export function saveTransaction(transaction: string, network: string) {
  const transactions = secureLocalStorage.get('transactions') || [];
  secureLocalStorage.set('transactions', [
    ...transactions,
    { id: transaction, network },
  ]);
}

export function getTransactions(network: string) {
  try {
    const transactions = secureLocalStorage.get('transactions') || [];
    return transactions
      .filter((trn: Transaction) => trn.network === network)
      .map((trn: Transaction) => trn.id);
  } catch (error) {
    console.log('🚀 ~ error', error);
    return [];
  }
}

interface OpenExplorer {
  transaction?: string;
  address?: string;
  kinNetwork?: string;
  solanaNetwork?: string;
}
export function openExplorer({
  transaction,
  address,
  kinNetwork,
  solanaNetwork,
}: OpenExplorer) {
  console.log('🚀 ~ openExplorer');
  console.log('🚀 ~ transaction', transaction);
  console.log('🚀 ~ kinNetwork', kinNetwork);
  console.log('🚀 ~ solanaNetwork', solanaNetwork);
  if (transaction) {
    window.open(
      `https://explorer.solana.com/tx/${transaction}${(() => {
        if (kinNetwork === 'Test') {
          return '?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev%2F';
        }
        if (solanaNetwork && solanaNetwork !== 'Mainnet') {
          return `?cluster=${solanaNetwork.toLowerCase()}`;
        }
        if (kinNetwork && kinNetwork === 'Devnet') {
          return `?cluster=${kinNetwork.toLowerCase()}`;
        }
        return '';
      })()}`
    );
  } else if (address) {
    window.open(
      `https://explorer.solana.com/address/${address}${(() => {
        if (kinNetwork === 'Test') {
          return '?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev%2F';
        }
        if (solanaNetwork && solanaNetwork !== 'Mainnet') {
          return `?cluster=${solanaNetwork.toLowerCase()}`;
        }
        return '';
      })()}`
    );
  }
}
