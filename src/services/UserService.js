import axios from "axios";
import { processUsersResponse } from "../utilities/UsersUtility";
import { func } from "prop-types";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const getUsers = (setUsers) => {
  axios
    .get(API_URL)
    .then((res) => {
      const r1 = res.data.sort(function (a, b) {
        if (a.id < b.id) {
          return -1; // a should come before b
        } else if (a.name > b.name) {
          return 1; // a should come after b
        } else {
          return 0; // a and b are equal
        }
      });
      setUsers(processUsersResponse(r1));
    })
    .catch((err) => getLocalUsers(setUsers));
};

const getLocalUsers = (setUsers) => {
  axios
    .get("./members.json")
    .then((res) => {
      setUsers(processUsersResponse(res.data));
    })
    .catch((error) => console.error(error));
};
export { getUsers };
