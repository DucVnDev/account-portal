// Dummy user database
const users = [
  { username: "admin", password: "admin123", role: "ADMIN" },
  { username: "user", password: "user123", role: "USER" },
];

function generateToken({ username, role }) {
  // Generate dummy JWT-like string
  const payload = btoa(JSON.stringify({ username, role }));
  return `dummy.${payload}.token`;
}

const authService = {
  login: async (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) return generateToken(found);
    return null;
  },
  register: async (username, password) => {
    if (users.find(u => u.username === username)) return false;
    users.push({ username, password, role: "USER" });
    return true;
  },
};

export default authService;s