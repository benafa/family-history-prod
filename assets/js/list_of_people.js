
async function getPeopleList(loginUrl, refreshUrl, graphQLUrl) {
    // Define the credentials
    var isLoggedIn = true;
    var credential_data = {
        email: 'email',
        user_id: 'user_id'
    };

    try {
        const data = MemberSpace.getMemberInfo();
        isLoggedIn = data.isLoggedIn;
        if (isLoggedIn) {
            credential_data.email = data.memberInfo.email;
            credential_data.user_id = data.memberInfo.id;
        }
    } catch(error) {
        console.log(`Error with MemberSpace: ${error}`)
    }

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
        const peopleData = await getGraphQLDataWrapper(loginUrl, credential_data, refreshUrl, graphQLUrl, query)
        return peopleData
    } catch (error) {
        console.error('Error:', error);
    }
}