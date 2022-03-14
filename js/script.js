const overview = document.querySelector(".overview");
const username = "mikeab95"
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
   
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
    filterInput.classList.remove("hide");
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
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    repoInfoDisplay(repoInfo, languages);
};

const repoInfoDisplay = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = 
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
};

backButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const inputText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLower = inputText.toLowerCase();
    for (const repo of repos) {
       const repoLower = repo.innerText.toLowerCase();
       if (repoLower.includes(searchLower)) {
           repo.classList.remove("hide");
       } else {
           repo.classList.add("hide");
       }
    }
});





