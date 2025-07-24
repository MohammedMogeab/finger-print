const fs = require('fs')
const path = require('path')

// Path to the JSON file
const DB_PATH = path.join(__dirname, 'users.json')

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Retrieve a user object from the USERS array by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to find.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */

/*******  1f80d462-521f-49bc-b930-1521ef44b440  *******/// Load existing users from file
let USERS = []
try {
  USERS = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
} catch (err) {
  USERS = []
}

// Save updated users to the file
function saveUsers() {
  fs.writeFileSync(DB_PATH, JSON.stringify(USERS, null, 2))
}

function getUserByEmail(email) {
  return USERS.find(user => user.email === email)
}

function getUserById(id) {
  return USERS.find(user => user.id === id)
}

function createUser(id, email, passKey) {
  USERS.push({ id, email, passKey })
  saveUsers()
}

function updateUserCounter(id, counter) {
  const user = USERS.find(user => user.id === id)
  if (user) {
    user.passKey.counter = counter
    saveUsers()
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserCounter,
}
