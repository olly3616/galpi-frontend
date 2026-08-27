import { Redirect } from 'expo-router';

// WF-01 app entry. During the markup phase this always lands on login; once auth is wired,
// this becomes conditional on a stored token (valid token → /home, otherwise → /login).
export default function Index() {
  return <Redirect href="/login" />;
}
