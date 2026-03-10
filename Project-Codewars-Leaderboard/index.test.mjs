import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { fetchUsers, fetchedUsers } from "./components/get-users-input.mjs";

test.beforeEach(() => {
  fetchedUsers.length = 0;
  nock.cleanAll();
});

test("mock API codewards, return users", async () => {
  nock("https://www.codewars.com")
    .get("/api/v1/users/test_user")
    .reply(200, { username: "test_user", honor: 1234, clan: "The Clan" });

  const users = await fetchUsers(["test_user"]);

  assert.equal(users.length, 1);
  assert.equal(users[0].username, "test_user");
  assert.equal(users[0].honor, 1234);
});