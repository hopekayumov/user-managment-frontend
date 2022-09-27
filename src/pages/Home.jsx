import React, {useState} from "react";
import UsersTable from "../components/Users/UsersTable";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  const [userName, setUserName] = useState(localStorage.getItem("name"));
    let props = {
        userName: userName,
        setUserName: setUserName,
    }

  return (
    <>
      <Navbar userName={userName} />
      <UsersTable {...props} />
    </>
  );
};

export default Home
