import { KineticSdk, MakeTransferOptions } from '@kin-kinetic/sdk';
import { TransactionType } from '@kin-tools/kin-memo';
import { Commitment } from '@kin-kinetic/solana';
import { saveTransaction, getKeypair } from '..';
import { Keypair } from '@kin-kinetic/keypair';

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
    const keypair = getKeypair(from, kinNetwork);
    const owner = keypair?.mnemonic && Keypair.fromMnemonic(keypair.mnemonic);
    console.log('🚀 ~ owner', owner);
    const destination = to;
    console.log('🚀 ~ destination', destination);

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

      console.log(
        '🚀 ~ kineticClient.makeTransfer',
        kineticClient.makeTransfer
      );
      const transfer = await kineticClient.makeTransfer(transactionOptions);
      console.log('🚀 ~ transfer', transfer);

      if (transfer?.signature) {
        saveTransaction(transfer.signature, kinNetwork);
      }
    }
    onSuccess();
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure(error);
  }
}
