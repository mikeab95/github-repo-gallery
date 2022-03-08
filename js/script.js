    //profile info div
const overview = document.querySelector(".overview");
    //github username
const username = "mikeab95"
    
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
};
