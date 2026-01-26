export function isStrongPassword(password) {
  const length = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  return length && hasUpper && hasNumber && hasSymbol;
}
