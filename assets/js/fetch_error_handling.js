const JWT_MISSING = "Missing cookie \"access_token_cookie\"";
const JWT_EXPIRED = "Token has expired";
const JWT_SIG_FAILURE = "Signature verification failed";

async function handleGraphQLError(error, loginUrl, credential_data, refreshUrl, graphQLUrl, query) {
    if (isUnauthorizedError(error)) {
        await handleUnauthorizedError(error, loginUrl, credential_data, refreshUrl);
        return await getGraphQLData(graphQLUrl, query);
    } else if (isSigFailure(error)) {
        await handleSigFailure(error, loginUrl, credential_data)
        return await getGraphQLData(graphQLUrl, query);
    } else {
        console.error('Error fetching protected resource:', error);
        throw error; 
    }
}

async function handleRestError(error, loginUrl, credential_data, refreshUrl, restUrl) {
    if (isUnauthorizedError(error)) {
        await handleUnauthorizedError(error, loginUrl, credential_data, refreshUrl);
        return await getRestData(restUrl);
    } else if (isSigFailure(error)) {
        await handleSigFailure(error, loginUrl, credential_data)
        return await getRestData(restUrl);
    } else {
        console.error('Error fetching protected resource:', error);
        throw error; 
    }
}

async function handleUnauthorizedError(error, loginUrl, credential_data, refreshUrl) {
    const errorBody = await error.json();
    if (errorBody.msg === JWT_EXPIRED) {
        await handleRefresh(refreshUrl,  loginUrl, credential_data);
    } else if (errorBody.msg === JWT_MISSING) {
        await login(loginUrl, credential_data);
    } else {
        throw error; 
    }
}

async function handleRefresh(refreshUrl, loginUrl, credential_data) {
    try {
        await refreshToken(refreshUrl);
    } catch(error) {
        // NOTE
        // Ideally we logout the user if refresh token expired
        // Unfortunately, memberspace doesn't have an API to log out user
        // So for user experience, we will re-authenticate the user for now
        await login(loginUrl, credential_data);
    }
}

async function handleSigFailure(error, loginUrl, credential_data) {
    // NOTE
    // Ideally log out user if sig failure
    // Similar to above, memberspace doesn't have an API to log out user
    // So for user experience, we will re-authenticate the user for now
    const errorBody = await error.json();
    if (errorBody.msg === JWT_SIG_FAILURE) {
        await login(loginUrl, credential_data);
    } else {
        throw error; 
    }
}

function isUnauthorizedError(error) {
    return error instanceof Response && error.status === 401;
}

function isSigFailure(error) {
    return error instanceof Response && error.status === 422;
}