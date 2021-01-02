import React, {
  FC,
  useState,
  createContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import BigNumber from 'bignumber.js';
import { apiGetData } from '../../api';
import { State, createInitialState, Dispatcher } from './state';
import { FETCH_DATA_INTERVAL } from '../../constants';
import { getCirculatingBasSupply, getNumFromBNEthers } from '../../utils';
import { ethers, Contract, BigNumber as BNEthers } from 'ethers';
import { tokens } from '../../constants';
import ERC20 from '../../constants/ERC20_abi.json';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

type Props = {
  children: React.ReactNode;
};

export const DashboardDispatch = createContext<Dispatcher>({} as Dispatcher);
export const DashboardState = createContext<State>({} as State);

const DashboardProvider: FC<Props> = (props) => {
  const [state, updateState] = useState<State>(createInitialState());
  const [provider, setProvider] = useState<Web3Provider>();
  const [signer, setSigner] = useState<JsonRpcSigner>();

  /* This hook is used to fetch data on mount & on an interval */
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, FETCH_DATA_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  /* This hook is used to fetch balance data for the current web3 account */
  useEffect(() => {
    if (provider && signer) {
      getTokenBalances(provider);
    }
  }, [provider, signer]);

  const fetchData = async () => {
    const data = await apiGetData();

    if (data) {
      updateState((previousState: State) => ({
        ...previousState,
        data: {
          prices: {
            bacSpot: data.bac_spot,
            bacTwap: data.bac_twap,
            basSpot: data.bas_spot,
            babSpot: data.bab_spot,
          },
          tokenSupply: {
            bac: data.bac_total_supply,
            basCirculating: getCirculatingBasSupply(
              data.bas_total_supply,
              data.daibas_stakingpool_bas,
              data.daibac_stakingpool_bas,
            ),
            basTotalSupply: data.bas_total_supply,
            bab: data.bab_supply,
          },
          staking: {
            basBoardroom: data.boardroom_bas,
            daibacStakingpoolBas: data.daibac_stakingpool_bas,
            daibasStakingpoolBas: data.daibas_stakingpool_bas,
            daibasUniswapBas: data.daibas_uniswap_bas,
            daibasUniswapDai: data.daibas_uniswap_dai,
            daibacUniswapBac: data.daibac_uniswap_bac,
            daibacUniswapDai: data.daibac_uniswap_dai,
          },
          epoch: {
            nextEpochTimestamp: data.next_seignorage_epoch,
          },
          rewards: {
            daibacRewardRatePerSec: new BigNumber(data.daibac_reward_rate_per_sec),
            daibasRewardRatePerSec: new BigNumber(data.daibas_reward_rate_per_sec),
          },
        },
      }));
    }
  };

  const connectToWallet = useCallback(async () => {
    if ((window as any).ethereum !== undefined && !provider && !signer) {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      setProvider(provider);
      setSigner(signer);
    }
  }, [provider, signer]);

  const getTokenBalances = async (provider: Web3Provider) => {
    const accounts = await provider.listAccounts();

    const contractBac = new Contract(tokens.bac.contractAddress, ERC20, provider);
    const contractBas = new Contract(tokens.bas.contractAddress, ERC20, provider);
    const contractDai = new Contract(tokens.dai.contractAddress, ERC20, provider);

    const balanceBac: BNEthers = await contractBac.balanceOf(accounts[0]);
    const balanceBas: BNEthers = await contractBas.balanceOf(accounts[0]);
    const balanceDai: BNEthers = await contractDai.balanceOf(accounts[0]);

    const balanceBacNum: number = getNumFromBNEthers(balanceBac);
    const balanceBasNum: number = getNumFromBNEthers(balanceBas);
    const balanceDaiNum: number = getNumFromBNEthers(balanceDai);

    updateState((previousState: State) => ({
      ...previousState,
      balances: {
        bac: balanceBacNum,
        bas: balanceBasNum,
        dai: balanceDaiNum,
        bab: 0,
      },
    }));
  };

  const dispatcher = useMemo<Dispatcher>(() => {
    return {
      updateState,
      connectToWallet,
    };
  }, [connectToWallet]);

  return (
    <DashboardDispatch.Provider value={dispatcher}>
      <DashboardState.Provider value={state}>{props.children}</DashboardState.Provider>
    </DashboardDispatch.Provider>
  );
};

export default DashboardProvider;
