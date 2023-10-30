class User {
    constructor(data) {
        this.username = data.login;
        this.avatar_url = data.avatar_url;
        this.company = data.company;
        this.blog = data.blog;
        this.location = data.location;
        this.created_at = data.created_at;
        this.public_repos = data.public_repos;
        this.public_gists = data.public_gists;
        this.followers = data.followers;
        this.following = data.following;
    }
    reposList(repos) {
        this.repos = repos;
    }
}

const searchBar = document.querySelector('#username');

let user;

searchBar.addEventListener('blur', renderEvent);
searchBar.addEventListener('change', renderEvent);

function renderEvent() {
    find(this.value)
        .then(() => renderProfile(user))
        .catch(console.error);

    findRepos(this.value)
        .then((data) => {user.reposList(data)})
        .then(() => renderRepos(user.repos))
}

async function find(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    user = new User(data);
}

async function findRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    console.log(data);
    return data;
}

function renderProfile(user) {
    console.log(user);

    const profileContainer = document.querySelector('.profile-container');
    while(profileContainer.hasChildNodes()){
        profileContainer.removeChild(profileContainer.firstChild);
    }

    const profileImg = document.createElement('div');
    profileImg.className = 'profile-img';
    const image = document.createElement('img');
    image.src = user.avatar_url;
    image.alt = user.username;
    profileContainer.append(profileImg);
    profileImg.append(image);

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View Profile';
    viewBtn.id = 'view-btn';
    viewBtn.addEventListener('click', () => {
        window.location.href = `https://github.com/${user.username}`;
    });
    profileImg.append(viewBtn);

    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    profileContainer.append(profileInfo);
    const countInfo = document.createElement('div');
    countInfo.className = 'count-info';
    profileInfo.append(countInfo);


    const company = document.createElement('div');
    company.textContent = `Company: ${user.company}`;
    const blog = document.createElement('div');
    blog.textContent = `Blog: ${user.blog}`;
    const location = document.createElement('div');
    location.textContent = `Location: ${user.location}`;
    const createdAt = document.createElement('div');
    createdAt.textContent = `Member Since: ${user.created_at}`;

    console.log(createdAt);

    profileInfo.append(company);
    profileInfo.append(blog);
    profileInfo.append(location);
    profileInfo.append(createdAt);

    const publicRepos = document.createElement('div');
    const publicGists = document.createElement('div');
    const followers = document.createElement('div');
    const following = document.createElement('div');

    publicRepos.className = 'blue';
    publicGists.className = 'gray';
    followers.className = 'green';
    following.className = 'seagreen';
    publicRepos.textContent = `Public Repos: ${user.public_repos}`;
    publicGists.textContent = `Public Gists: ${user.public_gists}`;
    followers.textContent = `Followers: ${user.followers}`;
    following.textContent = `Following: ${user.following}`;

    countInfo.append(publicRepos);
    countInfo.append(publicGists);
    countInfo.append(followers);
    countInfo.append(following);
}

function renderRepos(repos) {
     const reposContainer = document.querySelector('.repos-container');
     while(reposContainer.hasChildNodes()){
         reposContainer.removeChild(reposContainer.firstChild);
     }
     const title = document.createElement('h2');
     title.textContent = 'Latest Repos';

     reposContainer.append(title);
 
     for(let repo of repos){
        const reposDetails = document.createElement('div');
        reposDetails.className ='repos-details';

        const repoURL = document.createElement('a');
        repoURL.href = repo.html_url;
        repoURL.textContent = repo.name;

        const repoStar = document.createElement('span');
        repoStar.textContent = `Stars: ${repo.stargazers_count}`;
        repoStar.className = 'blue';

        const repoWatch = document.createElement('span');
        repoWatch.textContent = `Watchers: ${repo.watchers_count}`;
        repoWatch.className = 'gray';

        const repoFork = document.createElement('span');
        repoFork.textContent = `Forks: ${repo.forks_count}`;
        repoFork.className = 'green';

        reposDetails.append(repoURL);
        reposDetails.append(repoFork);
        reposDetails.append(repoWatch);
        reposDetails.append(repoStar);
        
        

        reposContainer.append(reposDetails);
        
     }
 
     
}
