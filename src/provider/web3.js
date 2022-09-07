import { createContext, useEffect, useState } from 'react';
import Web3 from 'web3/dist/web3.min';
import { notification, message } from 'antd';
import { switchNetwork } from '../utils/web3';

const web3 = new Web3();

const web3Context = createContext({
  web3,
  provider: null,
  setProvider: () => {},
  account: '',
  chainId: '',
  connect: async () => {}
});

function Web3Provider(props) {
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState();
  const [account, setAccount] = useState();
  const _setProvider = (_provider) => {
    web3.setProvider(_provider);
    setProvider(_provider);
    return _provider;
  };

  const fetchSetAccount = async () => {
    const res = await web3.eth.getAccounts();
    setAccount(res[0]);
    await fetchSetChain();
  };

  const fetchSetChain = async () => {
    const res = await web3.eth.getChainId();
    setChainId(res);
  };

  const connect = async () => {
    try {
      if (!window.ethereum) {
        notification.open({
          message: 'Please install the MetaMask plugin.',
          description: 'Website: https://metamask.io/'
        });

        window.open('https://metamask.io/', 'install metamsk', '');
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await switchNetwork(window.ethereum);
      setAccount(accounts[0]);
      _setProvider(window.ethereum);
      message.success('Successfully connect wallet!');
      return window.ethereum;
    } catch (error) {
      if (error.code === 4001) {
        message.error('Please connect to MetaMask.');
      } else {
        message.error(error?.message || 'Connect wallet failed.');
      }
      throw error;
    }
  };

  useEffect(() => {
    const addListener = () => {
      console.log('add listener');
      provider.on('connect', () => {});
      provider.on('accountsChanged', () => {
        fetchSetAccount();
      });
      provider.on('disconnect', () => {
        setChainId('');
        setAccount('');
        setProvider(null);
      });
      provider.on('chainChanged', () => {
        fetchSetAccount();
      });
    };
    if (provider) {
      fetchSetAccount();
      addListener();
    }
    return () => {
      try {
        provider.removeListener('connect');
        provider.removeListener('accountsChanged');
        provider.removeListener('disconnect');
        provider.removeListener('chainChanged');
      } catch (error) {}
    };
  }, [provider]);

  return (
    <web3Context.Provider
      value={{
        web3,
        provider,
        chainId,
        account,
        setProvider: _setProvider,
        connect
      }}
    >
      {props.children}
    </web3Context.Provider>
  );
}

export default Web3Provider;
export { web3Context };
