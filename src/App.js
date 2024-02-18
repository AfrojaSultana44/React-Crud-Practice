import "./App.css";
import UserList from "./components/UserList.jsx";
import CreateUser from "./components/CreateUser.jsx";
import { useState } from "react";

function App() {
  const [userFormState, setUserFormState] = useState({
    name: "",
    job: "",
  });

  console.log("userFormState:", userFormState )

  const [userId, setUserId] = useState(null);

  return (
    <div className="container">
      <UserList setUserFormState={setUserFormState} setUserId={setUserId} />
      <CreateUser
        userFormState={userFormState}
        setUserFormState={setUserFormState}
        userId={userId}
      />
    </div>
  );
}

export default App;
