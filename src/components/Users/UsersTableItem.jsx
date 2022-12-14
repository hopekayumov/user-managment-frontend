import React, {useContext} from "react";
import axios from "axios";
import {useAuthContext} from "../../contexts";
import {UserContext} from "../../contexts/UserContext";

const UsersTableItem = ({
  id,
  name,
  email,
  lastLoginTime,
  registrationTime,
  isBlocked,
  isChecked,
  onToggleCheck,
}) => {
  const formatDate = (date) => new Date(date).toUTCString().substr(5, 20);

  const [userTable, setUserTable] = useContext(UserContext)

  const {token, setToken} = useAuthContext();

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: "https://usermanagment1.herokuapp.com/api/admin/",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      data: {
        users: id
      }
    }).then(data => {
      if (data.data.status === "ok") {
        setUserTable(userTable?.filter((item) => item._id !== id));
      } else {
        setToken(null);
        localStorage.removeItem("name");
      }
      document.querySelector("#checkboxNoLabel2").checked = false;
    })
  }

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      onClick={onToggleCheck}
    >
      <td className="p-4 w-4">
        <div className="flex items-center">
          <input
            readOnly
            id="checkbox-table-search-1"
            checked={isChecked}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="py-4 px-6">{email}</td>
      <td className="py-4 px-6">{formatDate(lastLoginTime)}</td>
      <td className="py-4 px-6">{formatDate(registrationTime)}</td>
      {isBlocked ? (
        <td className="py-4 px-6 text-red-700 font-bold">blocked</td>
      ) : (
        <td className="py-4 px-6 text-emerald-600 font-bold">active</td>
      )}
      <td className="flex items-center py-4 px-6 space-x-3">
        <button
          onClick={() => handleDelete(id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default UsersTableItem;
