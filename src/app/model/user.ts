/**
 * User API model to store the response provided per registration or login.
 */
export class User {
  id: string;
  username: string;
  password: string;
  accessToken: string;
  message: string;
  email: string;
}
