import { KineticSdk } from '@kin-kinetic/sdk';

import { getPublicKey } from '..';

interface HandleGetHistory {
  kineticClient: KineticSdk;
  user: string;
  kinNetwork: string;
  onSuccess: (arg: string) => void;
  onFailure: () => void;
}

export async function handleGetHistory({
  onSuccess,
  onFailure,
  user,
  kineticClient,
  kinNetwork,
}: HandleGetHistory) {
  console.log('🚀 ~ handleGetHistory', user);
  try {
    const publicKey = getPublicKey(user, kinNetwork);

    const history = await kineticClient.getHistory({
      account: publicKey,
    });

    onSuccess(JSON.stringify(history));
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
