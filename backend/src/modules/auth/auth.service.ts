export const demoLogin = (username: string, password: string) => {
  if (!username || !password) throw new Error('Invalid credentials');
  return { token: `demo-token-${username}`, user: { id: 'demo-user', username } };
};
