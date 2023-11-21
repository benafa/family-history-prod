async function setTreeData(loginUrl, refreshUrl, restUrlBase, tree_id) {
    var restUrl = restUrlBase + tree_id;
    var isLoggedIn = true;
    // Define the credentials
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
