import Cookies from 'js-cookie';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthCookieManager {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';

  // Store tokens with secure options
  static setTokens(tokens: AuthTokens) {
    Cookies.set(this.ACCESS_TOKEN_KEY, tokens.accessToken, {
      expires: 1/24, // 1 hour
      secure: true,   // Only send over HTTPS
      sameSite: 'strict' // Prevent CSRF
    });

    Cookies.set(this.REFRESH_TOKEN_KEY, tokens.refreshToken, {
      expires: 7, // 7 days
      secure: true,
      httpOnly: true, // Recommended for refresh token
      sameSite: 'strict'
    });
  }

  // Retrieve tokens
  static getAccessToken(): string | undefined {
    return Cookies.get(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(this.REFRESH_TOKEN_KEY);
  }

  // Clear tokens on logout
  static clearTokens() {
    Cookies.remove(this.ACCESS_TOKEN_KEY);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export default AuthCookieManager;