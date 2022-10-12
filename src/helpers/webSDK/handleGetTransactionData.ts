import { KineticSdk } from '@kin-kinetic/sdk';

interface HandleGetTransactionData {
  kineticClient: KineticSdk;
  signature: string;
  onSuccess: (arg: string) => void;
  onFailure: () => void;
}

export async function handleGetTransactionData({
  onSuccess,
  onFailure,
  kineticClient,
  signature,
}: HandleGetTransactionData) {
  console.log('🚀 ~ hangleGetTransactionData', signature);
  try {
    const data = await kineticClient.getTransaction({
      signature: signature,
    });
    console.log('🚀 ~ data', data);

    onSuccess(JSON.stringify(data));
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
