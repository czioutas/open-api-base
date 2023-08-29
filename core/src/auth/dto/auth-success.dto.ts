/**
 * This class is a wrapper dto that is sent after authentication.
 * The idToken is used to get an accessToken
 */
export class AuthSuccessDto {
  idToken: string;
  refreshToken: string;
  userId: string;
}
