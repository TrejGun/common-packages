import { FC, ReactNode } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";

export interface INetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: FC<INetworkProviderProps> = props => {
  const { children } = props;

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new ethers.providers.Web3Provider(provider);
  };

  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};
