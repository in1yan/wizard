
export interface SignInData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  password: string;
}

export const signIn = async (data: SignInData) => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const response = await fetch('http://localhost:8000/token', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const result = await response.json();
  return result;
};

export const signUp = async (data: SignUpData) => {
  const response = await fetch('http://localhost:8000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};
