import { FC, PropsWithChildren } from "react";

import { ns } from "@gemunion/constants";

import { ApiContext } from "./context";
import { fetchFile, fetchJson } from "./fetch";
import {
  getToken,
  isAccessTokenExpired,
  isRefreshTokenExpired,
  prepare,
  setBaseUrl,
  setStorageName,
  setToken,
} from "./utils";

export interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export interface IApiProviderBaseProps extends IApiProviderProps {
  refreshToken?: () => Promise<any>;
  getAuthToken?: () => Promise<string>;
  customIsAccessTokenExpired?: () => boolean;
  customIsRefreshTokenExpired?: () => boolean;
}

export const ApiProvider: FC<PropsWithChildren<IApiProviderBaseProps>> = props => {
  const {
    baseUrl,
    customIsAccessTokenExpired,
    customIsRefreshTokenExpired,
    getAuthToken = () => Promise.resolve(""),
    refreshToken = () => Promise.resolve(),
    storageName = ns,
    children,
  } = props;

  const initializeProvider = (): void => {
    setBaseUrl(baseUrl);
    storageName && setStorageName(`jwt_${storageName}`);
  };
  initializeProvider();

  return (
    <ApiContext.Provider
      value={{
        fetchJson: prepare({ fetch: fetchJson, getAuthToken }),
        fetchFile: prepare({ fetch: fetchFile, getAuthToken }),
        getToken,
        setToken,
        isAccessTokenExpired: customIsAccessTokenExpired || isAccessTokenExpired,
        isRefreshTokenExpired: customIsRefreshTokenExpired || isRefreshTokenExpired,
        refreshToken,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
