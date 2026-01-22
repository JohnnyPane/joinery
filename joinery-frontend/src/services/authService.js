import joineryClient from "./joineryClient.js";

export const authService = {
  async login(email, password) {
    try {
      const response = await joineryClient.post('/login', {
        user: { email, password }
      });

      const authToken = response.headers.authorization?.split(' ')[1];

      if (authToken) {
        storeAuthTokenAndUser(authToken, response.data.data);
      } else {
        throw new Error('Authorization token not found');
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  async signup(firstName, lastName, email, password, password_confirmation) {
    try {
      const response = await joineryClient.post('/signup', {
        user: { first_name: firstName, last_name: lastName, email, password, password_confirmation }
      });

      const authToken = response.headers.authorization?.split(' ')[1];
      if (authToken) {
        storeAuthTokenAndUser(authToken, response.data.data);
      } else {
        throw new Error('Authorization token not found');
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Signup failed');
    }
  },

  // MAJOR TODO: Revisit this, should never be an auth token in the response
  async fetchMe() {
    try {
      const response = await joineryClient.get('/users/me');
      const authToken = response.headers.authorization?.split(' ')[1];

      if (authToken) {
        storeAuthTokenAndUser(authToken, response.data.data);
      }
      return response.data;
    } catch (error) {
      //   Handle error if needed
    }
  },

  async logout() {
    try {
      await joineryClient.delete('/logout');
    } catch (error) {
      // Handle error if needed
    } finally {
      clearAuthTokenAndUser();
    }
  },

  async requestPasswordReset(email) {
    try {
      await joineryClient.post('/password/reset', {
        email
      });
    } catch (error) {
      throw new Error('Password reset request failed');
    }
  },

  async resetPassword(token, password, password_confirmation) {
    try {
      const response = await joineryClient.put('/password/reset', {
        reset_password_token: token,
        password,
        password_confirmation
      });

      await this.login(response.data.email, password);
    } catch (error) {
      throw new Error('Password reset failed');
    }
  },

  getAuthToken() {
    return localStorage.getItem('authToken');
  },

  getGuestToken() {
    return localStorage.getItem('guestToken');
  },

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  hasCredentials() {
    const token = this.getAuthToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }
}

const storeUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
}

const clearAuthTokenAndUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cartId');
}

const storeAuthTokenAndUser = (token, user) => {
  storeAuthToken(token);
  storeUser(user);
  localStorage.removeItem('guestToken');
}
