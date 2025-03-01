export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('admin'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
