console.log("Before");
// callback based approach
// getUser(1, user => {
//   getRepositories(user.githubUsername, repo => {
//     getCommits(repos[0], (commits) => {
//       console.log("Commits", commits)
//     })
//   });
// });
console.log("after");

// Promise-based Approach
// getUser(1)
//   .then(user => getRepositories(user.githubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('commits', commits))
//   .catch(err => console.log("Error", err.message));

// Async Await approach

async function displayCommit() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.githubUsername);
    const commit = await getCommits(repos[0]);
    console.log(commit)
  } catch (error) {
    console.log(error.message)
  }
}
displayCommit()

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading data from database...");
      resolve({ id: id, githubUsername: "saad" });
    }, 2000);
  })
}
function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Repos from database...");
      reject(new Error('because something failed...'));
    }, 2000);

  })
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading commits from database...");
      resolve(['commit'])
    }, 2000);
  })
}
