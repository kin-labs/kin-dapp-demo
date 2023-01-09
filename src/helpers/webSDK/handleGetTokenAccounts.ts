import { KineticSdk } from '@kin-kinetic/sdk';

import { getPublicKey } from '..';

interface HandleGetTokenAccounts {
  kineticClient: KineticSdk;
  user: string;
  kinNetwork: string;
  onSuccess: (arg: string) => void;
  onFailure: () => void;
}

export async function handleGetTokenAccounts({
  onSuccess,
  onFailure,
  user,
  kineticClient,
  kinNetwork,
}: HandleGetTokenAccounts) {
  console.log('🚀 ~ handleGetTokenAccounts', user);
  try {
    const publicKey = getPublicKey(user, kinNetwork);

    const history = await kineticClient.getTokenAccounts({
      account: publicKey,
    });

    onSuccess(JSON.stringify(history));
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
