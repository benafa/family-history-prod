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

async function setTreeData(loginUrl, refreshUrl, restUrlBase, tree_id) {
    var restUrl = restUrlBase + tree_id;
    var isLoggedIn = true;
    // Define the credentials
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

    try {
        const treeData = await getRestDataWrapper(loginUrl, credential_data, refreshUrl, restUrl)

        // Find the container element
        const container = document.getElementById('tree-content');
        
        // Append the fetched data to the container
        container.innerHTML = treeData; 

        runTreeCode();
    } catch (error) {
        console.error('Error:', error);
    }
}
