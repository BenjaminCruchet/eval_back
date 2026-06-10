function logout(session) {
    session.destroy();
}

module.exports = {
    logout
};