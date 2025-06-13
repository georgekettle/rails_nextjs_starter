import { apiClient } from './client';

export const authApi = {
  /**
   * Sign up a new user
   * @param {Object} data - User signup data
   * @param {string} data.email - User's email
   * @param {string} data.password - User's password
   * @param {string} data.password_confirmation - Password confirmation
   * @param {string} [data.name] - User's name (optional)
   * @returns {Promise<Object>} Response data containing user and token
   */
  signup: (data) => {
    return apiClient.post('/signup', { user: data });
  },

  /**
   * Log in an existing user
   * @param {Object} data - Login credentials
   * @param {string} data.email - User's email
   * @param {string} data.password - User's password
   * @returns {Promise<Object>} Response data containing user and token
   */
  login: (data) => {
    return apiClient.post('/login', data);
  },

  /**
   * Get the current user's information
   * @returns {Promise<Object>} Response data containing user information
   */
  getCurrentUser: () => {
    return apiClient.get('/me');
  },

  /**
   * Update the current user's profile
   * @param {Object} data - User profile data to update
   * @param {string} [data.name] - User's name
   * @returns {Promise<Object>} Response data containing updated user information
   */
  updateUser: (data) => {
    return apiClient.put('/user', data);
  },

  /**
   * Log out the current user
   * @returns {Promise<Object>} Response data confirming logout
   */
  logout: () => {
    return apiClient.delete('/logout');
  },

  /**
   * Request a password reset
   * @param {Object} data - Password reset request data
   * @param {string} data.email - User's email
   * @returns {Promise<Object>} Response data confirming the request
   */
  requestPasswordReset: (data) => {
    return apiClient.post('/password/forgot', data);
  },

  /**
   * Reset password with token
   * @param {Object} data - Password reset data
   * @param {string} data.token - Reset token from email
   * @param {string} data.password - New password
   * @returns {Promise<Object>} Response data confirming the reset
   */
  resetPassword: (data) => {
    return apiClient.post('/password/reset', data);
  },

  /**
   * Delete the current user's account
   * @param {Object} data - Delete account data
   * @param {string} data.password - User's current password
   * @returns {Promise<Object>} Response data confirming account deletion
   */
  deleteUser: (data) => {
    return apiClient.delete('/user', data);
  },

  /**
   * Update the current user's email
   * @param {Object} data - Email update data
   * @param {string} data.email - New email address
   * @param {string} data.password - Current password for verification
   * @returns {Promise<Object>} Response data confirming email update
   */
  updateEmail: (data) => {
    return apiClient.patch('/user/email', data);
  },

  /**
   * Update the current user's password
   * @param {Object} data - Password update data
   * @param {string} data.current_password - Current password for verification
   * @param {string} data.password - New password
   * @param {string} data.password_confirmation - Password confirmation
   * @returns {Promise<Object>} Response data confirming password update
   */
  updatePassword: (data) => {
    return apiClient.patch('/user/password', data);
  },
}; 