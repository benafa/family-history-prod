var getMsReadyPromise = () =>
  new Promise(resolve => {
    if (MemberSpace.ready) {
      // Ready event is already fired, so let's not wait for it, it will not be fired again
      resolve(window.MemberSpace.getMemberInfo());
    } else {
      // MS widget is not yet ready, let's subscribe for the event
      const handleReady = ({ detail }) => {
        resolve(detail);
        // Unsubscribe ourselves, this allows GC to collect all related memory
        document.removeEventListener('MemberSpace.ready', handleReady);
      };

      // Listen to ready event
      document.addEventListener('MemberSpace.ready', handleReady);
    }
  });

async function getPeopleList(loginUrl, refreshUrl, graphQLUrl) {
    // Define the credentials
    var isLoggedIn = true;
    var credential_data = {
        email: 'email',
        user_id: 'user_id'
    };

    try {
        const { data } = await getMsReadyPromise();
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