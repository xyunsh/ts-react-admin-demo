// use localStorage to store the authority info, which might be sent from server in actual project.
const TOKEN_KEY = 'TOKEN_DEMO'

export function getAuthority() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthority(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}
