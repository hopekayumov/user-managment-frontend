import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useAuthContext } from "../../contexts";
import usersTable from "./UsersTable";

const UserToolbar = ({ ...props }) => {
  const [userTable, setUserTable] = useContext(UserContext);

  const { token, setToken } = useAuthContext();

  const getCheckedUsersList = () => {
    const checkedUsers = [];
    userTable.forEach((item) => {
      if (item.isChecked) checkedUsers.push(item._id);
    });
    return checkedUsers;
  };

  async function updateAdminTable(event, type) {
    event.preventDefault();
    let users = getCheckedUsersList();
    const response = await fetch(
      "https://usermanagment1.herokuapp.com/api/admin/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          users,
          type,
        }),
      }
    );
    const data = await response.json();
    document.querySelector("#checkboxNoLabel2").checked = false;
    if (data.status === "ok") {
      toggleBlock(type);
    } else {
      alert(data.error);
      props.setUserName("");
      setToken(null);
      localStorage.removeItem("name");
    }
  }

  async function deleteFromAdminTable(event) {
    event.preventDefault();
    let users = getCheckedUsersList();
    const response = await fetch(
      "https://usermanagment1.herokuapp.com/api/admin/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          users,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      let users = getCheckedUsersList();
      setUserTable(userTable?.filter((item) => !users.includes(item._id)));
    } else {
      alert(data.error);
      props.setUserName("");
      setToken(null);
      localStorage.removeItem("name");
    }
    document.querySelector("#checkboxNoLabel2").checked = false;
  }

  const toggleBlock = (type) => {
    setUserTable((prev) =>
      prev.map((item) => {
        if (item.isChecked) {
          return type === "block"
            ? { ...item, isBlocked: true, isChecked: false }
            : { ...item, isBlocked: false, isChecked: false };
        }
        return item;
      })
    );
  };

  return (
    <div className="container mb-12 mt-4">
      <button
        onClick={(event) => updateAdminTable(event, "block")}
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 mb-2"
      >
        Block
      </button>
      <button
        onClick={(event) => updateAdminTable(event, "unBlock")}
        type="button"
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 mb-2"
      >
        UnBlock
      </button>
      <button
        onClick={(event) => deleteFromAdminTable(event)}
        type="button"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 mb-2"
      >
        Delete
      </button>
    </div>
  );
};

export default UserToolbar;
