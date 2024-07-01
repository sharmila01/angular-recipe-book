export interface IAuthResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  kind: string;
  localId: string;
  email: string;
  registered?: boolean
}
