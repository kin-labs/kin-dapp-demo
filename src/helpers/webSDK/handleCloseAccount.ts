import { KineticSdk } from '@kin-kinetic/sdk';

import { getPublicKey, deleteKeypair, saveTransaction } from '..';

interface HandleCloseAccount {
  kineticClient: KineticSdk;
  user: string;
  kinNetwork: string;
  onSuccess: () => void;
  onFailure: () => void;
}

export async function handleCloseAccount({
  onSuccess,
  onFailure,
  user,
  kineticClient,
  kinNetwork,
}: HandleCloseAccount) {
  console.log('🚀 ~ handleCloseAccount', user);
  try {
    const publicKey = getPublicKey(user, kinNetwork);

    const transaction = await kineticClient.closeAccount({
      account: publicKey,
    });

    if (transaction?.signature) {
      saveTransaction(transaction.signature, kinNetwork);
    }

    deleteKeypair(publicKey, kinNetwork);

    onSuccess();
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
