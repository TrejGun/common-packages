export interface IJwt {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

export interface IJwks {
  email: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  picture: string;
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  at_hash: string;
  name: string;
  locale: string;
  iat: number;
  exp: number;
}

export interface IFirebase {
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: false;
  firebase: {
    identities: {
      email: Array<string>;
    };
    sign_in_provider: string;
  };
  uid: string;
}

export interface IMetamaskDto {
  nonce: string;
  signature: string;
  wallet: string;
}

export interface PubKey {
  readonly type: string;
  readonly value: string;
}

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}

export interface IKeplrDto {
  chainPrefix: string;
  nonce: string;
  signature: StdSignature;
  wallet: string;
}
