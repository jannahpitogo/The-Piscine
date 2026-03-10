import * as userData from "./components/get-users-input.mjs";
import * as display from "./components/display.mjs";

let userArray = JSON.parse(sessionStorage.getItem("users")) ?? []; //RETRIEVE USERS FROM INDEX
let fetchedUsers = JSON.parse(sessionStorage.getItem("fetchedUsers")) ?? [];

//BACK-BUTTON AND ADD MORE USERS BUTTON (LEADERBOARD PAGE)
display.addMoreButton();

//CATEGORY NAVIGATION
display.categoryDisplay();
display.tableDisplay();
display.addLanguageDropdown(fetchedUsers);
let activeCategory = "overall";
let selectedLanguage = "";
display.buildTableUsers(fetchedUsers, activeCategory, selectedLanguage);
display.modalAddingUser();

//BUTTON FOR ADDING MORE USERS (EVENTLISTENER)
const addUserButton = document.getElementById("add-another_user");
addUserButton.addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.show();
});

//EVENT LISTENER CATEGORY
document.querySelectorAll(".category-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    activeCategory = e.currentTarget.dataset.action ?? "overall";
    display.buildTableUsers(fetchedUsers, activeCategory, selectedLanguage);
  });

  function bindLanguageSelectEvent() {
  const languageSelect = document.getElementById("language-select");
  if (!languageSelect) return;

  languageSelect.addEventListener("change", (e) => {
    selectedLanguage = e.target.value;
    activeCategory = "ranks";
    display.buildTableUsers(fetchedUsers, activeCategory, selectedLanguage);
  });
  }

  bindLanguageSelectEvent();
});

//FUNCTION FOR SUBMIT BUTTON FOR ADD MORE USERS
const addMoreUser = document.getElementById("submit-more-users");
addMoreUser.addEventListener("click", async () => {
  const newUsers = userData.gettingInput(
    "more-users",
    userArray,
    "",
    [],
    "more-user-container",
  );

  if (newUsers.length > 0) {
    const newlyFetchedUsers = await userData.fetchUsers(newUsers);

    const mergedUsers = [...fetchedUsers, ...newlyFetchedUsers];
    const uniqueByUsername = [];
    const seen = new Set();
    for (const user of mergedUsers) {
      if (!user?.username || seen.has(user.username)) continue;
      seen.add(user.username);
      uniqueByUsername.push(user);
    }

    fetchedUsers = uniqueByUsername;
    sessionStorage.setItem("users", JSON.stringify(userArray));
    sessionStorage.setItem("fetchedUsers", JSON.stringify(fetchedUsers));
    display.addLanguageDropdown(fetchedUsers);
    bindLanguageSelectEvent();
    display.buildTableUsers(fetchedUsers, activeCategory, selectedLanguage);
    console.log("[Local] Added users:", newUsers);
  }
});
