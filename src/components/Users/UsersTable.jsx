import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts";
import { UserContext } from "../../contexts/UserContext";
import UsersTableItem from "./UsersTableItem";
import UserToolbar from "./UserToolbar";

const UsersTable = ({ ...props }) => {
  const [users, setUsers] = useState([]);
  const [userTable, setUserTable] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const { token } = useAuthContext();

  const toggleSelectAll = (event) => {
    setUserTable((prev) =>
      prev.map((item) => {
        return { ...item, isChecked: event.target.checked };
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((data) => {
        if (data.data.status === "ok") {
          setUserTable(
            data.data.table.map((item) => ({ ...item, isChecked: false }))
          );
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const onToggleCheck = (id) => {
    setUserTable((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-[130px] overflow-x-auto relative shadow-md sm:rounded-lg">
      <UserToolbar {...props} />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  onChange={(e) => toggleSelectAll(e)}
                  id="checkboxNoLabel2"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              username
            </th>
            <th scope="col" className="py-3 px-6">
              email
            </th>
            <th scope="col" className="py-3 px-6">
              Last login time
            </th>
            <th scope="col" className="py-3 px-6">
              Registration time
            </th>
            <th scope="col" className="py-3 px-6">
              status
            </th>
            <th scope="col" className="py-3 px-6">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {userTable &&
            userTable.map((item) => (
              <UsersTableItem
                key={item._id}
                id={item._id}
                name={item.name}
                email={item.email}
                lastLoginTime={item.lastLoginTime}
                registrationTime={item.registrationTime}
                isBlocked={item.isBlocked}
                isChecked={item.isChecked}
                onToggleCheck={() => onToggleCheck(item._id)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
