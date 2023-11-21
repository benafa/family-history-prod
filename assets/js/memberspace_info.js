// Function to wait until MemberSpace is defined
function waitForMemberSpace() {
    return new Promise((resolve, reject) => {
        const maxWaitTime = 10000; // Maximum wait time in milliseconds
        const intervalTime = 100;  // Interval time to check in milliseconds
        let elapsedTime = 0;

        const interval = setInterval(() => {
            if (typeof MemberSpace !== 'undefined') {
                clearInterval(interval);
                resolve();
            } else {
                elapsedTime += intervalTime;
                if (elapsedTime >= maxWaitTime) {
                    clearInterval(interval);
                    reject('MemberSpace did not become available within the maximum wait time.');
                }
            }
        }, intervalTime);
    });
}

// Function to get MemberSpace information
var getMsReadyPromise = () => new Promise((resolve, reject) => {
    // Check if MemberSpace is ready
    if (MemberSpace.ready) {
        try {
            resolve(window.MemberSpace.getMemberInfo());
        } catch (error) {
            reject('Error fetching MemberSpace member info: ' + error);
        }
    } else {
        const handleReady = ({ detail }) => {
            try {
                resolve(detail);
            } catch (error) {
                reject('Error in MemberSpace.ready event: ' + error);
            }
            document.removeEventListener('MemberSpace.ready', handleReady);
        };

        document.addEventListener('MemberSpace.ready', handleReady);
    }
});

async function getMemberSpaceCredentials() {
    var isLoggedIn = false;
    var credential_data = {
        email: '',
        user_id: ''
    };

    try {
        // Wait for MemberSpace to become available
        await waitForMemberSpace();
        //console.log("MemberSpace is ready")

        const data = await getMsReadyPromise();

        //console.log("MemberSpace data is ready")

        isLoggedIn = data && data.isLoggedIn;
        if (isLoggedIn) {
            credential_data.email = data.memberInfo.email;
            credential_data.user_id = data.memberInfo.id;
        }
    } catch(error) {
        console.log(`Error with MemberSpace: ${error}`);
    }

    //console.log("Return creds");
    return credential_data;
}