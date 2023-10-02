
const fetchButton = document.getElementById('fetch-button');
const usernameInput = document.getElementById('username');
const profileDiv = document.getElementById('profile');

fetchButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (username === '') {
        alert('Please enter a GitHub username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Not Found') {
                alert('User not found');
            } else {
                const profileHTML = `
                    <h2>${data.login}</h2>
                    <img src="${data.avatar_url}" alt="Avatar" width="100">
                    <p>Name: ${data.name || 'N/A'}</p>
                    <p>Followers: ${data.followers}</p>
                    <p>Following: ${data.following}</p>
                    <p>Public Repos: ${data.public_repos}</p>
                `;
                profileDiv.innerHTML = profileHTML;
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});
