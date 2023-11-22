//const urlBase = 'https://api.colombochetty.com/'
const urlBase = 'http://localhost:5000/'
const loginUrl = urlBase + 'api/authenticate';
const logoutUrl = urlBase + 'auth/logout';
const refreshUrl = urlBase + 'auth/refresh_token';
const graphQLUrl = urlBase + 'graphql';
const restUrlBase = urlBase + 'api/tree/';

const MEMBERSPACE_TOKEN = "MemberSpaceWidget.token"
const ACCOUNT_PAGE = "/account"

DEFAULT_EMAIL = ''
DEFAULT_ID =''


const apiClient = new ApiClient();
const errorHandler = new FetchErrorHandler(loginUrl, refreshUrl, logoutUrl, MEMBERSPACE_TOKEN, ACCOUNT_PAGE, apiClient);

async function getRestDataWrapper(restUrl) {
    try {
        return await apiClient.getRestData(restUrl);
    } catch (error) {
        //console.log("Error in REST");
        //console.log(restUrl);
        return await errorHandler.handleRestError(error, restUrl);
    }
}

async function getGraphQLDataWrapper(graphQLUrl, query) {
    try {
        return await apiClient.getGraphQLData(graphQLUrl, query);
    } catch (error) {
        //console.log("Error in GraphQL");
        //console.log(graphQLUrl);
        return await errorHandler.handleGraphQLError(error, graphQLUrl, query);
    }
}
