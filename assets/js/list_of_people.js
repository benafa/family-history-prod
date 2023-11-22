async function getPeopleList(loginUrl, refreshUrl, graphQLUrl) {
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
        const peopleData = await getGraphQLDataWrapper(graphQLUrl, query);
        return peopleData;
    } catch (error) {
        // console.error('Error:', error);
        throw error;
    }
}