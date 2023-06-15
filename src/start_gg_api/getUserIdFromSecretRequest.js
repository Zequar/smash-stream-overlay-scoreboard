const getUserIdFromSecretRequest = () => {
    return {
        query: `query getUserIdByUsername { currentUser { id, slug } }`
    }
}

module.exports = { getUserIdFromSecretRequest };
