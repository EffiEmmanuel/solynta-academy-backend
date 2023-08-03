const bcrypt = require("bcrypt")

const passwordHash = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

const passwordCompare = async(password, hash) => {
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
}

module.exports = { passwordCompare, passwordHash}