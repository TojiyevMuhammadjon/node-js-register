const Io = require("../Io/Io");
const users = new Io("./database/users.json");
const signIn = require("../models/users.models");

const register = async (req, res) => {
  const { username, password } = req.body;

  const allUsers = await users.read();
  const user = allUsers.find((user) => user.username === username);

  if (!user) {
    const id = (allUsers[allUsers.length - 1]?.id || 0) + 1;
    const newUser = new signIn(id, username, password);
    const data = allUsers.length ? [...allUsers, newUser] : [newUser];
    await users.write(data);

    res.status(201).json({ message: "success" });
  } else {
    res.status(409).json({ message: "this user is already registered" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const allUsers = await users.read();
  const user = allUsers.find(
    (user) => user.username === username && user.password === password
  );
  
  if (user) {
    res.status(200).json({ message: "you are successfully logged in" });
  } else {
    res.status(401).json({ message: "invalid username or password" });
  }
};

module.exports = {
  register,
  login,
};
