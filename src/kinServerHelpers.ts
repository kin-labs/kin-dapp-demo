import axios from 'axios';

interface Response {
  data: string;
  status: number;
}

export interface User {
  publicKey: string;
  name: string;
}
interface StatusResponse {
  data: {
    appIndex: number;
    env: number;
    users: User[];
    transactions: string[];
  };
  status: number;
}
interface BalanceResponse {
  data: number;
  status: number;
}
interface TransactionResponse {
  data: Transaction;
  status: number;
}

interface CheckServerRunning {
  onSuccess: (arg: StatusResponse) => void;
  onFailure: (arg: any) => void;
}
export async function checkServerRunning({
  onSuccess,
  onFailure,
}: CheckServerRunning) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const url = `${baseUrl}/status`;
    const response: StatusResponse = await axios.get(url);
    onSuccess(response);
  } catch (error) {
    onFailure(error);
  }
}
interface HandleSetupKinClient {
  onSuccess: () => void;
  onFailure: (arg: any) => void;
  kinEnvironment: string;
}
export async function handleSetupKinClient({
  onSuccess,
  onFailure,
  kinEnvironment,
}: HandleSetupKinClient) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const url = `${baseUrl}/setup?env=${kinEnvironment}`;
    const response: Response = await axios.post(url);

    if (response.status === 201) {
      onSuccess();
    } else {
      throw new Error('No appIndex');
    }
  } catch (error) {
    onFailure(error);
  }
}

interface HandleCreateAccount {
  name: string;
  onSuccess: () => void;
  onFailure: (arg: any) => void;
}

export async function handleCreateAccount({
  onSuccess,
  onFailure,
  name,
}: HandleCreateAccount) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const url = `${baseUrl}/account?name=${name}`;
    await axios.post(url);
    onSuccess();
  } catch (error) {
    onFailure(error);
  }
}
interface HandleGetBalance {
  user: string;
  onSuccess: (arg: number) => void;
  onFailure: (arg: any) => void;
}

export async function handleGetBalance({
  onSuccess,
  onFailure,
  user,
}: HandleGetBalance) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const url = `${baseUrl}/balance?user=${user}`;
    const response: BalanceResponse = await axios.get(url);
    onSuccess(response.data);
  } catch (error) {
    onFailure(error);
  }
}
interface HandleRequestAirdrop {
  to: string;
  amount: string;
  onSuccess: () => void;
  onFailure: (arg: any) => void;
}

export async function handleRequestAirdrop({
  onSuccess,
  onFailure,
  to,
  amount,
}: HandleRequestAirdrop) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const url = `${baseUrl}/airdrop?to=${to}&amount=${amount}`;
    await axios.post(url);
    onSuccess();
  } catch (error) {
    onFailure(error);
  }
}

export interface HandleSendKin {
  from: string;
  to: string;
  amount: string;
  type: string;
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
}: HandleSendKin) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');

    const data: {
      from: string;
      to: string;
      amount: string;
      type: string;
    } = {
      from,
      to,
      amount,
      type,
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = `${baseUrl}/send`;
    await axios.post(url, data, options);
    onSuccess();
  } catch (error) {
    onFailure(error);
  }
}

interface Payment {
  kin: string;
  type: number;
  sender: string;
  destination: string;
}
export interface Transaction {
  txState: number;
  payments: Payment[];
}
interface HandleGetTransaction {
  transaction: string;
  onSuccess: (transaction: Transaction) => void;
  onFailure: (arg: any) => void;
}

export async function handleGetTransaction({
  transaction,
  onSuccess,
  onFailure,
}: HandleGetTransaction) {
  try {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    if (!baseUrl) throw new Error('No URL');
    console.log('🚀 ~ handleGetTransaction', transaction);

    const url = `${baseUrl}/transaction?transaction=${encodeURIComponent(
      transaction
    )}`;
    const { data }: TransactionResponse = await axios.get(url);
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
}
