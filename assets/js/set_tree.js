async function setTreeData(loginUrl, refreshUrl, restUrlBase, tree_id) {
    var restUrl = restUrlBase + tree_id;

    try {
        const treeData = await getRestDataWrapper(restUrl);

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
