import axios from "axios";
import React, { useState } from "react";

const CreateUser = ({ userFormState, setUserFormState, userId }) => {
  const [createUser, setCreateUser] = useState({
    isLoading: false,
    error: null,
    isSuccess: false,
  });
 console.log("testing");
  const [updateUser, setUpdateUser] = useState({
    isUpdateLoading: false,
    updateError: null,
    isUpdateSuccess: false,
  });

  const submitHandler = () => {
    setCreateUser((prev) => {
      return {
        ...prev,
        isLoading: true,
        error: null,
        isSuccess: false,
      };
    });

    const url = "https://reqres.in/api/users";

    axios
      .post(url, { data: userFormState })
      .then((res) => {
        console.log("res:", res);
        setCreateUser((prev) => {
          return {
            ...prev,
            isLoading: false,
            isSuccess: true,
          };
        });
      })
      .catch((err) => {
        setCreateUser((prev) => {
          return {
            ...prev,
            error: err,
            isLoading: false,
          };
        });
      });
  };

  const updateHandler = () => {
    setUpdateUser((prev) => {
      return {
        ...prev,
        isUpdateLoading: true,
        updateError: null,
        isUpdateSuccess: false,
      };
    });

    const url = `https://reqres.in/api/users/${userId}`;

    axios
      .put(url, { data: userFormState })
      .then((res) => {
        setUpdateUser((prev) => {
          return {
            ...prev,
            isUpdateLoading: false,
            isUpdateSuccess: true,
          };
        });
      })
      .catch((err) => {
        setUpdateUser((prev) => {
          return {
            ...prev,
            updateError: err,
            isUpdateLoading: false,
          };
        });
      });
  };

  const inputChangeHandler = (e) => {
    setUserFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (userId) {
            updateHandler();
          } else {
            submitHandler();
          }
        }}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userFormState.name}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label>Job</label>
          <input
            type="text"
            name="job"
            value={userFormState.job}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
