import { credentials } from '../api/auth';

export async function getLoggedInUserId() {
  const token = sessionStorage.getItem('token');
  if (!token) return false; //safety in case there's no token

  const userObject = await credentials(token);
  console.log('user object:', userObject);
  return userObject;
}
