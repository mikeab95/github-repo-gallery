    //profile info div
const overview = document.querySelector(".overview");
    //github username
const username = "mikeab95"
    //repo unordered list div
const repoList = document.querySelector(".repo-list");
    
const githubProfile = async function () {
    const result = await fetch(`https://api.github.com/users/${username}`);
    const profile = await result.json();
    profileDisplay(profile);
};

githubProfile();

const profileDisplay = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div> 
        `;
    overview.append(div);
    githubRepos();
};


const githubRepos = async function () {
    const result = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await result.json();
    repoDisplay(repos);
};

const repoDisplay = function (repos) {
    for (const repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};


