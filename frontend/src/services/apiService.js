import config from '../config';

export const getUserData = async () => {
  const response = await fetch(`${config.userServiceUrl}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

export const authenticateUser = async (credentials) => {
  const response = await fetch(`${config.credentialServiceUrl}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Failed to authenticate user');
  }
  return response.json();
};

// Add more API calls as needed
