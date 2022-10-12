import { KineticSdk, KineticSdkConfig } from '@kin-kinetic/sdk';
interface HandleSetupKinClient {
  kinNetwork: string;
  onSuccess: ({ client }: { client: KineticSdk }) => void;
  onFailure: () => void;
}

export async function handleSetUpKinClient({
  kinNetwork,
  onSuccess,
  onFailure,
}: HandleSetupKinClient) {
  try {
    const index = Number(process.env.REACT_APP_APP_INDEX);
    const environment = kinNetwork === 'Mainnet' ? 'mainnet' : 'devnet';
    const endpoint =
      kinNetwork === 'Mainnet'
        ? process.env.KINETIC_ENDPOINT
        : process.env.KINETIC_ENDPOINT || 'https://sandbox.kinetic.host/';

    if (index > 0 && endpoint) {
      const config: KineticSdkConfig = {
        environment,
        endpoint,
        index,
      };

      const client = await KineticSdk.setup(config);

      onSuccess({ client });
    } else {
      throw new Error("Can't set up the Kin Client");
    }
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
