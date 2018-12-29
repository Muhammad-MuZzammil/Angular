console.log("Before");
getUser(1, user => {
  console.log("User", user);
  getRepositories(user.githubUsername, displayRepo);
});
console.log("after");

function displayRepo(repo){
    console.log("Repos", repo);

}
// function displayUser(user){
//   console.log("User", user);
// }
function getUser(id, callback) {
  setTimeout(() => {
    console.log("reading ....");
    callback({ id: id, githubUsername: "saad" });
  }, 4000);
}
function getRepositories(username, callback) {
  setTimeout(() => {
    callback( ["repo1", "repo2", "repo3"] );
  }, 2000);
}
