import { KineticSdk, MakeTransferOptions } from '@kin-kinetic/sdk';
import { TransactionType } from '@kin-tools/kin-memo';
import { Commitment } from '@kin-kinetic/solana';
import { saveTransaction, getPublicKey, getPrivateKey } from '..';

export interface HandleSendKin {
  kineticClient: KineticSdk;
  from: string;
  to: string;
  amount: string;
  type: string;
  kinNetwork: string;
  onSuccess: () => void;
  onFailure: (arg: any) => void;
}

export async function handleSendKin({
  onSuccess,
  onFailure,
  from,
  to,
  amount,
  type,
  kineticClient,
  kinNetwork,
}: HandleSendKin) {
  console.log('🚀 ~ handleSendKin', type, from, to, amount);
  try {
    const owner = getPrivateKey(from, kinNetwork);
    const destination = getPublicKey(to, kinNetwork);

    let transactionType = TransactionType.None;
    if (type === 'Earn') transactionType = TransactionType.Earn;
    if (type === 'Spend') transactionType = TransactionType.Spend;
    if (type === 'P2P') transactionType = TransactionType.P2P;

    if (owner && destination) {
      const transactionOptions: MakeTransferOptions = {
        amount,
        destination,
        owner,
        type: transactionType,
        commitment: Commitment.Finalized,
      };
      console.log('🚀 ~ transactionOptions', transactionOptions);

      const transfer = await kineticClient.makeTransfer(transactionOptions);
      console.log('🚀 ~ transfer', transfer);

      if (transfer?.signature) {
        saveTransaction(transfer.signature, kinNetwork);
        onSuccess();
      }
    }
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure(error);
  }
}
