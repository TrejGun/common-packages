import { useContext, useEffect, useState, PropsWithChildren, ReactElement } from "react";
import { useNavigate } from "react-router";

import { ApiError, IJwt, useApi } from "@gemunion/provider-api";

import { UserContext, IUser, IUserContext, ILoginDto } from "./context";

const STORAGE_NAME = "auth";

interface IUserProviderProps<T> {
  profile?: T | null;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, children } = props;

  const [profile, setProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_NAME);
    setProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

  const save = (key: string, profile: T | null): void => {
    const json = JSON.stringify(profile);
    localStorage.setItem(key, json);
  };

  const setProfileHandle = (profile: T | null) => {
    setProfile(profile);
    save(STORAGE_NAME, profile);
  };

  const updateProfile = async (values: Partial<T>): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/profile",
        method: "PUT",
        data: {
          ...values,
        },
      })
      .then((json: T): void => {
        setProfileHandle(json);
      })
      .catch((e: ApiError) => {
        console.error(e);

        return e;
      });
  };

  const logOut = async (): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/auth/logout",
        method: "POST",
        data: {
          refreshToken: api.getToken()?.refreshToken,
        },
      })
      .then(() => {
        setProfile(null);
        save(STORAGE_NAME, null);
        api.setToken(null);
      })
      .catch((e: ApiError) => {
        console.error(e);

        return e;
      });
  };

  const sync = async (url?: string): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/profile",
      })
      .then((json: T) => {
        setProfileHandle(json);
        if (json) {
          if (url) {
            navigate(url);
          }
        } else {
          navigate("/login");
        }
      })
      .catch((e: ApiError) => {
        console.error(e);

        return e;
      });
  };

  const logIn = async (data: ILoginDto, successLoginUrl = "/"): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        if (json) {
          api.setToken(json);
        }

        return sync(successLoginUrl);
      })
      .catch((e: ApiError) => {
        console.error(e);

        return e;
      });
  };

  const isAuthenticated = (): boolean => {
    return profile !== null;
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        logIn,
        logOut,
        sync,
        updateProfile,
        isAuthenticated,
        setProfile: setProfileHandle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser<T>() {
  return useContext<IUserContext<T>>(UserContext);
}
