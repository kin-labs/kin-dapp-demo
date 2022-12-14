import { KineticSdk } from '@kin-kinetic/sdk';

import { getPublicKey } from '..';

interface HandleGetAccountInfo {
  kineticClient: KineticSdk;
  user: string;
  kinNetwork: string;
  onSuccess: (arg: string) => void;
  onFailure: () => void;
}

export async function handleGetAccountInfo({
  onSuccess,
  onFailure,
  user,
  kineticClient,
  kinNetwork,
}: HandleGetAccountInfo) {
  console.log('🚀 ~ handleGetAccountInfo', user);
  try {
    const publicKey = getPublicKey(user, kinNetwork);

    const history = await kineticClient.getAccountInfo({
      account: publicKey,
    });

    onSuccess(JSON.stringify(history));
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
