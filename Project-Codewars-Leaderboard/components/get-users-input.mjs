export let getUser = [];
export let tempInput = "";
export let inserteduser = []; 
export const fetchedUsers = [];

//GETTING THE USERS INPUT
//idName = inputForm
//storage = MainStorage
//tempStorage = Input Value temporary Storage
//inserted = array Storage that will be pushed to main storage
//display = where to display the value
export function gettingInput(idName, storage, tempStorage, inserted, display) {
  const inputElement = document.getElementById(idName);
  if (!inputElement) return [];

  tempStorage = inputElement.value.trim();
  if (!tempStorage) return [];

  inserted = tempStorage
    .split(/[,\s]+/)
    .map((username) => username.trim())
    .filter(Boolean);

  if (inserted.length === 0) return [];

  const newUsers = inserted.filter((username) => !storage.includes(username));
  storage.push(...newUsers);
  displayUser(storage, display);
  inputElement.value = "";

  return newUsers;
}

// module.exports = gettingInput;

//THIS FUNCTION IS GETTING THE USERS FROM INPUT AND PUSHING TO ARRAY AS WELL AS DISPLAY IT
export function displayUser(array, displayContainer) {
  const showUsers = document.getElementById(displayContainer); //p users container
  if (!showUsers) return;
  showUsers.textContent = array.join(", ");
}

export async function fetchUsers(users) {
  const endpoint = "https://www.codewars.com/api/v1/users/";
  const usernames = [...new Set(users.map((user) => user.trim()).filter(Boolean))];
 

  if (usernames.length === 0) {
    alert("No usernames to fetch.");
    return [];
  }
  
  for (const user of usernames) {
    try {
      const res = await fetch(`${endpoint}${user}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      fetchedUsers.push(data);
    } catch(error) {
      alert(`Failed to fetch: ${user}`);
    }
  }
  return fetchedUsers;
}
