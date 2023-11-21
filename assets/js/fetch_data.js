const urlBase = 'https://api.colombochetty.com/'
//const urlBase = 'http://localhost:5000/'


const loginUrl = urlBase + 'api/authenticate';
const refreshUrl = urlBase + 'auth/refresh_token';
const graphQLUrl = urlBase + 'graphql';
const restUrlBase = urlBase + 'api/tree/';

async function login(loginUrl, credential_data) {
    const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential_data), 
        credentials: 'include' 
    });

    if (!loginResponse.ok) {
        throw loginResponse;
    }
}

async function refreshToken(refreshUrl) {
    const csrfToken = getCookie('csrf_refresh_token'); 

    const refreshResponse = await fetch(refreshUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN-REFRESH': csrfToken
        }
    });

    if (!refreshResponse.ok) {
        throw refreshResponse;
    }
}

async function getRestData(restUrl) {
    const response = await fetch(restUrl, {
        method: 'GET',
        credentials: 'include' 
    });

    if (!response.ok) {
        throw response;
    }

    // Get the response text
    const data = await response.text();
    return data
}

async function getRestDataWrapper(loginUrl, credential_data, refreshUrl, restUrl) {
    try {
        return await getRestData(restUrl);
    } catch (error) {
        return await handleRestError(error, loginUrl, credential_data, refreshUrl, restUrl);
    }
}

async function getGraphQLData(graphqlUrl, query) {
    const csrfToken = getCookie('csrf_access_token'); 

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN-ACCESS': csrfToken
      },
      body: JSON.stringify({ query }),
      credentials: 'include' 
    });

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return data
}

async function getGraphQLDataWrapper(loginUrl, credential_data, refreshUrl, graphQLUrl, query) {
    try {
        return await getGraphQLData(graphQLUrl, query);
    } catch (error) {
        return await handleGraphQLError(error, loginUrl, credential_data, refreshUrl, graphQLUrl, query,);
    }
}

// Helper function to get a cookie by name
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}