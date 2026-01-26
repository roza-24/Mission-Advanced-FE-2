export function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(
    (u) => u.email === userData.email || u.username === userData.username
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
}

export function loginUser(identifier, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(
    (u) =>
      (u.username === identifier || u.email === identifier) &&
      u.password === password
  );

  if (!found) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      email: found.email,
      token: "mock-token-string-for-testing-purposes",
    })
  );
}

export function logoutUser() {
  localStorage.removeItem("user");
}

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}
