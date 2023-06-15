const getUserIdFromSecretRequest = () => {
    return {
        query: `query getUserIdByUsername { currentUser { id, slug } }`
    }
}

const {getTournamentListRequest} = require("./getTournamentListRequest");

module.exports = { getUserIdFromSecretRequest };
