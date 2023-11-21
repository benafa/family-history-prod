async function getPeopleList(loginUrl, refreshUrl, graphQLUrl) {
    var credential_data = await getMemberSpaceCredentials();

    const query = `
      {
      individuals {
        id
        GIVN
        SURN
      }
    }
    `;

    try {
        const peopleData = await getGraphQLDataWrapper(loginUrl, credential_data, refreshUrl, graphQLUrl, query);
        return peopleData;
    } catch (error) {
        // console.error('Error:', error);
        throw error;
    }
}