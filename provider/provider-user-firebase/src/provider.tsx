import { PropsWithChildren, ReactElement, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";

import firebase from "@gemunion/firebase";
import { useApi } from "@gemunion/provider-api";
import { ILoginDto, IUser, UserProvider, save } from "@gemunion/provider-user";

interface IUserProviderFirebaseProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProviderFirebase = <T extends IUser>(
  props: PropsWithChildren<IUserProviderFirebaseProps<T>>,
): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setUserProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();

  const api = useApi();

  const setProfileHandle = (profile: T | null) => {
    setUserProfile(profile);
    save(storageName, profile);
  };

  const getProfile = async (url?: string): Promise<T> => {
    return api
      .fetchJson({
        url: "/profile",
      })
      .then((json: T) => {
        setProfileHandle(json);
        if (url) {
          navigate(url, { replace: true });
        }
        return json;
      });
  };

  const logIn = async (_data?: ILoginDto, url?: string) => {
    const auth = getAuth(firebase);

    return auth.currentUser
      ?.getIdToken(true)
      .then(async accessToken => {
        const now = Date.now();
        api.setToken({
          accessToken,
          accessTokenExpiresAt: now + 1000 * 60 * 60,
          refreshToken: "",
          refreshTokenExpiresAt: now + 1000 * 60 * 60,
        });
        return getProfile(url || "/dashboard");
      })
      .catch(console.error);
  };

  const logOut = async (url?: string): Promise<void> => {
    await signOut(getAuth());
    api.setToken(null);
    setProfileHandle(null);

    if (url) {
      navigate(url);
    }
  };

  const customSignUp = async (_data: any, _url?: string) => {};

  return (
    <UserProvider
      profile={profile}
      setUserProfile={setUserProfile}
      customLogIn={logIn}
      customLogOut={logOut}
      customSignUp={customSignUp}
      storageName={storageName}
    >
      {children}
    </UserProvider>
  );
};
