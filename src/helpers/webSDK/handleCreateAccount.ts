import { KineticSdk } from '@kin-kinetic/sdk';
import { Keypair } from '@kin-kinetic/keypair';

import { saveKeypair, saveTransaction } from '..';

interface HandleCreateAccount {
  kineticClient: KineticSdk;
  name: string;
  kinNetwork: string;

  onSuccess: () => void;
  onFailure: () => void;
}

(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;

export async function handleCreateAccount({
  onSuccess,
  onFailure,
  name,
  kinNetwork,
  kineticClient,
}: HandleCreateAccount) {
  console.log('🚀 ~ handleCreateAccount', name);
  try {
    const mnemonic = Keypair.generateMnemonic();
    console.log('🚀 ~ mnemonic', mnemonic);
    const keypair = Keypair.fromSecret(mnemonic);
    console.log('🚀 ~ keypair', keypair);

    const account = await kineticClient.createAccount({
      owner: keypair,
    });

    const { errors } = account;
    if (errors?.length) {
      throw new Error(errors[0]?.message);
    }

    if (account?.signature) {
      saveTransaction(account.signature, kinNetwork);
    }

    console.log('🚀 ~ account', account);
    saveKeypair(keypair, kinNetwork);
    onSuccess();

    // confirm account creation
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
