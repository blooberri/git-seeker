// the things where we will fill
let userProfileImg = document.querySelector('.profileImg img');
let userRealName = document.querySelector('.realname h2');
let userUserName = document.querySelector('.username h2');
let userUserBio = document.querySelector('.userBio');
let userUserRepo = document.querySelector('.userRepo b');
let userUserFollowing = document.querySelector('.userFollowing b');
let userUserFollowers = document.querySelector('.userFollowers b');
//the main listeners on search box, the input and the button
let userSearchBtn = document.querySelector('.searchIdBtn');
let userSearchTxt = document.querySelector('.searchIdTxt');
let backToHomeBtn = document.querySelector('.backToHomeBtn');
let homeContainer = document.querySelector('.homeContainer');
let profilePage = document.querySelector('.profilePage');
//adding EventListeners
userSearchBtn.addEventListener('click', () => {
    const username = userSearchTxt.value;
    if (username) {
        fetchGitHubData(username)
    } else {
        alert('Please enter the username');
    }
});
function fetchGitHubData(username) {
    const url = `https://api.github.com/users/${username}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new error('User not found!');
            }
            return response.json();
        })
        .then(data => {
            userProfileImg.src = data.avatar_url;
            userRealName.innerText = data.name || "No name";
            userUserName.innerText = data.login;
            userUserBio.innerText = data.bio || 'This user has no bio!';
            userUserRepo.innerText = data.public_repos;
            userUserFollowing.innerText = data.following;
            userUserFollowers.innerText = data.followers;
            homeContainer.classList.add("hidden");
            profilePage.classList.remove("hidden");
        })
        .catch(error => {
            alert("User not found!");
            console.log(error);
        });
}//func ended
backToHomeBtn.addEventListener('click', () => {
    profilePage.classList.add('hidden');
    homeContainer.classList.remove('hidden');
    userSearchTxt.value = '';
});
