async function setTreeData(loginUrl, refreshUrl, restUrlBase, tree_id) {
    var restUrl = restUrlBase + tree_id;
    var credential_data = await getMemberSpaceCredentials();

    try {
        const treeData = await getRestDataWrapper(loginUrl, credential_data, refreshUrl, restUrl);

        // Find the container element
        const container = document.getElementById('tree-content');
        
        // Append the fetched data to the container
        container.innerHTML = treeData; 

        runTreeCode();
    } catch (error) {
        //console.error('Error:', error);
        throw error;
    }
}
