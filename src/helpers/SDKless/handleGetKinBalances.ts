import { PublicKey, Connection } from '@solana/web3.js';
import { solanaAddresses } from '../../constants';

export interface Balance {
  [tokenAccountId: string]: string;
}

interface HandleGetKinBalances {
  connection: Connection;
  address: string;
  solanaNetwork: string;
  onSuccess?: (balances: Balance[]) => void;
  onFailure?: (arg: any) => void;
}

export async function handleGetKinBalances({
  connection,
  address,
  solanaNetwork,
  onSuccess,
  onFailure,
}: HandleGetKinBalances) {
  console.log('🚀 ~ handleGetKinBalances', address);
  try {
    if (solanaNetwork === 'Mainnet' || solanaNetwork === 'Devnet') {
      const mintPublicKey = new PublicKey(
        solanaAddresses[solanaNetwork].kinMint
      );
      const publicKey = new PublicKey(address);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          mint: mintPublicKey,
        }
      );

      const balances = await Promise.all(
        tokenAccounts.value.map(async (tokenAccount) => {
          const tokenAmount = await connection.getTokenAccountBalance(
            tokenAccount.pubkey
          );

          return {
            [tokenAccount.pubkey.toBase58()]: tokenAmount.value.amount,
          };
        })
      );
      console.log('🚀 ~ balances', balances);

      if (onSuccess) onSuccess(balances);
      return balances;
    }
  } catch (error) {
    console.log('🚀 ~ error', error);
    if (onFailure) onFailure(error);
    return [];
  }
}
