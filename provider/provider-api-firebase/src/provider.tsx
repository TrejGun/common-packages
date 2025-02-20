import { FC, PropsWithChildren } from "react";
import { getAuth } from "firebase/auth";

import firebase from "@ethberry/firebase";
import { history } from "@ethberry/history";
import { ApiProvider, getToken, IApiProviderProps, isAccessTokenExpired, setToken } from "@ethberry/provider-api";
import { IJwt } from "@ethberry/types-jwt";

import { useInterval } from "./hook";

export const ApiProviderFirebase: FC<PropsWithChildren<IApiProviderProps>> = props => {
  const { baseUrl, storageName, children } = props;
  const auth = getAuth(firebase);

  const refreshToken = async () => {
    const jwt = getToken();

    if (!jwt) {
      history.push("/login");
      setToken(null);
    }

    return auth.currentUser
      ? auth.currentUser
          .getIdToken(true)
          .then((accessToken: string) => {
            const now = Date.now();

            const jwt: IJwt = {
              accessToken,
              accessTokenExpiresAt: now + 1000 * 60 * 60,
              refreshToken: "",
              refreshTokenExpiresAt: now + 1000 * 60 * 60,
            };

            setToken(jwt);
            return jwt;
          })
          .catch((e: any) => {
            setToken(null);
            console.error(e);
            return null;
          })
      : Promise.resolve(null);
  };

  const getAuthToken = async (): Promise<string> => {
    let jwt = getToken();

    if (jwt) {
      if (isAccessTokenExpired()) {
        jwt = await refreshToken();
      }
    }

    return jwt ? jwt.accessToken : "";
  };

  const isRefreshTokenExpired = (): boolean => {
    return false;
  };

  // refreshToken every 4 minutes
  useInterval(() => void refreshToken(), 240000);

  return (
    <ApiProvider
      baseUrl={baseUrl}
      storageName={storageName}
      refreshToken={refreshToken}
      getAuthToken={getAuthToken}
      customIsRefreshTokenExpired={isRefreshTokenExpired}
    >
      {children}
    </ApiProvider>
  );
};
