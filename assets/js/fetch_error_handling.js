const JWT_MISSING = "Missing cookie \"access_token_cookie\"";
const JWT_EXPIRED = "Token has expired";
const JWT_SIG_FAILURE = "Signature verification failed";

class FetchErrorHandler {
    constructor(loginUrl, refreshUrl, logoutUrl, tokenName, redirectPage, apiClient) {
        this.loginUrl = loginUrl;
        this.logoutUrl = logoutUrl;
        this.refreshUrl = refreshUrl;
        this.memberspace_tokenName = tokenName;
        this.redirectPage = redirectPage;
        this.apiClient = apiClient;
    }

    async handleGraphQLError(error, graphQLUrl, query) {
        try {
            if (this.isUnauthorizedError(error)) {
                //console.log("handleGraphQLError");
                await this.handleUnauthorizedError(error);
                return await this.apiClient.getGraphQLData(graphQLUrl, query);
            } else {
                if (this.isSigFailure(error)) {
                    console.log("Signature failure error");
                }
                await this.handleLogout();
                throw error;
            }
        } catch(error) {
            //console.log(error);
            throw error;
        }
    }

    async handleRestError(error, restUrl) {
        try {
            if (this.isUnauthorizedError(error)) {
                //console.log("handleRestError");
                await this.handleUnauthorizedError(error);
                return await this.apiClient.getRestData(restUrl);
            } else {
                if (this.isSigFailure(error)) {
                    console.log("Signature failure error");
                }
                await this.handleLogout();
                throw error;
            }
        } catch(error) {
            //console.log(error);
            throw error;
        }
    }

    async handleUnauthorizedError(error) {
        const errorBody = await error.json();
        if (errorBody.msg === JWT_EXPIRED) {
            await this.handleRefresh();
        } else if (errorBody.msg === JWT_MISSING) {
            const credentialData = await getMemberSpaceCredentials();
            await this.apiClient.login(this.loginUrl, credentialData);
        } else {
            throw error;
        }
    }

    async handleRefresh() {
        try {
            await this.apiClient.refreshToken(this.refreshUrl);
        } catch(error) {
            this.handleLogout();
            throw error;
        }
    }

    async handleLogout() {
        localStorage.removeItem(this.memberspace_tokenName);
        await this.apiClient.logout(this.logoutUrl);
        window.location.href = this.redirectPage;
    }

    isUnauthorizedError(error) {
        return error instanceof Response && error.status === 401;
    }

    isSigFailure(error) {
        return error instanceof Response && error.status === 422;
    }
}