class ApiClient {
    async login(loginUrl, credential_data) {
        const loginResponse = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credential_data), 
            credentials: 'include'
        });

        if (!loginResponse.ok) {
            throw loginResponse;
        }
    }

    async logout(logoutUrl) {
        const logoutResponse = await fetch(logoutUrl, {
            method: 'POST',
            credentials: 'include'
        });

        if (!logoutResponse.ok) {
            throw logoutResponse;
        }
    }

    async refreshToken(refreshUrl) {
        const csrfToken = this.getCookie('csrf_refresh_token');

        const refreshResponse = await fetch(refreshUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN-REFRESH': csrfToken
            }
        });

        if (!refreshResponse.ok) {
            throw refreshResponse;
        }
    }

    async getRestData(restUrl) {
        const response = await fetch(restUrl, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw response;
        }

        const data = await response.text();
        return data;
    }

    async getGraphQLData(graphqlUrl, query) {
        const csrfToken = this.getCookie('csrf_access_token'); 

        const response = await fetch(graphqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN-ACCESS': csrfToken
            },
            body: JSON.stringify({ query }),
            credentials: 'include' 
        });

        if (!response.ok) {
            throw response;
        }

        const data = await response.json();
        return data
    }
    
    // Helper function to get a cookie by name
     getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}