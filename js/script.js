const overview = document.querySelector(".overview");
const username = "mikeab95"
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

    
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

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        githubRepoInfo(repoName);
    }
});

const githubRepoInfo = async function (repoName) {
    const result = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await result.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
};

const repoInfoDisplay = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = repoData.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.}</h3>
    <p>Description: ${repoInfo.}</p>
    <p>Default Branch: ${repoInfo.}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.add("show");
    repoSection.classList.remove("show");
};



