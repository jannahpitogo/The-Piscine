import * as getUsersInput from "./components/get-users-input.mjs";
import * as display from "./components/display.mjs";

//DISPLAYING FOR MAIN PAGE
display.displayInputForm();

//BUTTON FOR ADDING USER IN MAIN HTML
const addUserButton = document.getElementById("adding-user");
addUserButton.addEventListener("click", () => {
  getUsersInput.gettingInput(
    "user-input",
    getUsersInput.getUser,
    getUsersInput.tempInput,
    getUsersInput.inserteduser,
    "showing-users",
  );

  if (getUsersInput.getUser.length > 0) {
    const submitButton = document.getElementById("submit-button");
    submitButton.hidden = false;
  }
});

//EVENT LISTENER FOR SUBMIT BUTTON
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async () => {
  if (getUsersInput.getUser.length === 0) return;

  sessionStorage.setItem("users", JSON.stringify(getUsersInput.getUser));
  submitButton.disabled = true;
  submitButton.textContent = "Fetching...";

  const fetchedUsers = await getUsersInput.fetchUsers(getUsersInput.getUser); //calling of fetching from get-users-input
  sessionStorage.setItem("fetchedUsers", JSON.stringify(fetchedUsers));

  window.location.href = "leaderboard.html"; //forwarding
});

const userInput = document.getElementById("user-input");
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addUserButton.click();
  }
});


