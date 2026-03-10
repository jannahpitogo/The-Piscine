import * as userData from "./get-users-input.mjs";

export function displayInputForm() {
  const inputContainer = document.getElementById("input-form"); //div

  const addUserButton = document.createElement("button"); //adduser button
  addUserButton.id = "adding-user";
  addUserButton.type = "button";
  addUserButton.textContent = "Add User";
  addUserButton.setAttribute("aria-label", "Add usernames from the input field");

  const showUsers = document.createElement("p"); //p (paragraph for user)
  showUsers.id = "showing-users";
  showUsers.setAttribute("aria-live", "polite");

  const userContainer = document.createElement("div"); //div p container
  userContainer.id = "users-container";

  const submitButton = document.createElement("button"); //submit Button
  submitButton.id = "submit-button";
  submitButton.type = "button";
  submitButton.textContent = "Submit Users";
  submitButton.hidden = true;

  inputContainer.appendChild(addUserButton);
  userContainer.append(showUsers, submitButton);
  const body = document.querySelector("body");
  body.appendChild(userContainer);
}

export function categoryDisplay() {
  const overall = document.createElement("button");
  overall.id = "overall";
  overall.classList = "category-button";
  overall.type = "button";
  overall.textContent = "Overall";
  overall.dataset.action = "overall";

  const completedKatas = document.createElement("button");
  completedKatas.id = "completed-katas";
  completedKatas.type = "button";
  completedKatas.classList = "category-button";
  completedKatas.textContent = "Completed Katas";
  completedKatas.dataset.action = "completedKatas";

  const authoredKatas = document.createElement("button");
  authoredKatas.id = "authored-katas";
  authoredKatas.type = "button";
  authoredKatas.classList = "category-button";
  authoredKatas.textContent = "Authored Katas";
  authoredKatas.dataset.action = "authoredKatas";

  const ranks = document.createElement("button");
  ranks.id = "ranks";
  ranks.type = "button";
  ranks.classList = "category-button";
  ranks.textContent = "Ranks";
  ranks.dataset.action = "ranks";

  const categoryContainer = document.getElementById("category-nav");
  categoryContainer.append(overall, completedKatas, authoredKatas, ranks);
}

export function tableDisplay() {
  const table = document.createElement("table");
  table.id = "table-leaderboards";
  table.setAttribute("aria-label", "Codewars leaderboard table");

  
  const column = document.createElement("tr"); //row of the head

  const headPosition = document.createElement("th");
  headPosition.scope = "col";
  headPosition.textContent = "POSITION";

  const headUser = document.createElement("th");
  headUser.scope = "col";
  headUser.textContent = "USER";

  const headClan = document.createElement("th");
  headClan.scope = "col";
  headClan.textContent = "CLAN";

  const headHonor = document.createElement("th");
  headHonor.scope = "col";
  headHonor.textContent = "HONOR";
  headHonor.id = "score";

  const tableContainer = document.getElementById("table-container");

  column.append(headPosition, headUser, headClan, headHonor);
  table.appendChild(column);
  tableContainer.appendChild(table);
}

//

export function modalAddingUser() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal", "fade");
  modalContainer.id = "myModal";
  modalContainer.tabIndex = -1;
  modalContainer.setAttribute("aria-labelledby", "myModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");
  modalContainer.innerHTML = `<div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">ADD MORE USERS</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
        <label for="more-users">Type usernames</label>
        <input type="text" placeholder="user1, user2, user3" id="more-users" />
        <p id="more-user-container"></p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="submit-more-users">Submit Users</button>
        </div>

      </div>
    </div>`;
  document.body.appendChild(modalContainer);
  const modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.hide();
}

export function addMoreButton() {
  const buttonsContainer = document.getElementById("button-container");

  const backButton = document.createElement("a");
  backButton.id = "back-button";
  backButton.href = "index.html";
  backButton.textContent = "Back to Arena";
  backButton.setAttribute("aria-label", "Back to user input page");

  const addAnotherUserButton = document.createElement("button");
  addAnotherUserButton.type = "button";
  addAnotherUserButton.classList = "btn btn-primary";
  addAnotherUserButton.id = "add-another_user";
  addAnotherUserButton.textContent = "Add Another User";

  buttonsContainer.append(backButton, addAnotherUserButton);
}

export function addLanguageDropdown(data) {
  const languageContainer = document.getElementById("category-lang");

  languageContainer.textContent = "";

  const label = document.createElement("label");
  label.htmlFor = "language-select";
  label.textContent = "Language";

  const select = document.createElement("select");
  select.id = "language-select";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select Language";
  select.appendChild(defaultOption);

  const safeUsers = Array.isArray(data) ? data : [];
  const languages = new Set();

  safeUsers.forEach((user) => {
    const userLanguages = user?.ranks?.languages ?? {};
    Object.keys(userLanguages).forEach((language) => languages.add(language));
  });

  [...languages].sort().forEach((language) => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    select.appendChild(option);
  });

  languageContainer.append(label, select);
}


export function buildTableUsers(data, category = "overall", selectedLanguage = "") {
  const table = document.getElementById("table-leaderboards");
  if (!table) return;

  const scoreHeader = document.getElementById("score");

  // Keep the existing header row and remove previously rendered user rows.
  const existingRows = table.querySelectorAll("tr");
  existingRows.forEach((row, index) => {
    if (index > 0) row.remove();
  });

  const safeUsers = Array.isArray(data) ? data : [];
  let rankedUsers = [...safeUsers];
  let scoreAccessor = (user) => user?.honor ?? 0;

  switch (category) {
    case "completedKatas":
      document.getElementById("category-lang").hidden = true;
      scoreAccessor = (user) => user?.codeChallenges?.totalCompleted ?? 0;
      rankedUsers.sort((a, b) => scoreAccessor(b) - scoreAccessor(a));
      if (scoreHeader) scoreHeader.textContent = "COMPLETED";
      break;
    case "authoredKatas":
      document.getElementById("category-lang").hidden = true;
      scoreAccessor = (user) => user?.codeChallenges?.totalAuthored ?? 0;
      rankedUsers.sort((a, b) => scoreAccessor(b) - scoreAccessor(a));
      if (scoreHeader) scoreHeader.textContent = "AUTHORED";
      break;
    case "ranks":
      document.getElementById("category-lang").hidden = false;
      if (selectedLanguage) {
        scoreAccessor = (user) =>
          user?.ranks?.languages?.[selectedLanguage]?.score ?? 0;
        rankedUsers = rankedUsers.filter(
          (user) => user?.ranks?.languages?.[selectedLanguage],
        );
        rankedUsers.sort((a, b) => scoreAccessor(b) - scoreAccessor(a));
        if (scoreHeader) scoreHeader.textContent = "SCORE";
      } else {
        rankedUsers.sort((a, b) => (b?.honor ?? 0) - (a?.honor ?? 0));
        if (scoreHeader) scoreHeader.textContent = "HONOR";
      }
      break;
    case "overall":
    default:
      rankedUsers.sort((a, b) => (b?.honor ?? 0) - (a?.honor ?? 0));
      if (scoreHeader) scoreHeader.textContent = "HONOR";
      break;
  }

  rankedUsers.forEach((user, index) => {
    const row = document.createElement("tr");

    const positionCell = document.createElement("td");
    positionCell.textContent = String(index + 1); //since array always start at 0

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;

    const clanCell = document.createElement("td");
    clanCell.textContent = user?.clan ?? "-";

    const honorCell = document.createElement("td");
    honorCell.textContent = String(scoreAccessor(user));

    row.append(positionCell, usernameCell, clanCell, honorCell);
    table.appendChild(row);
  });
}
