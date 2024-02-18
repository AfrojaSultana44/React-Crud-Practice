import React, { useState } from "react";
import useUserList from "../hooks/useUserList";
import axios from "axios";

const UserList = ({ setUserFormState, setUserId }) => {
  const { isLoading, error, data } = useUserList();

  const [getUser, setGetUser] = useState({
    isUserLoading: false,
    userData: null,
    userError: null,
  });

  const [deleteUser, setDeleteUser] = useState({
    isDeleteLoading: false,
    deleteError: null,
    isDeleteSuccess: false,
  });

  const getUserHandler = (id) => {
    setUserId(id);

    const url = `https://reqres.in/api/users/${id}`;

    setGetUser((prev) => {
      return {
        ...prev,
        isUserLoading: true,
        userData: null,
        userError: null,
      };
    });

    axios
      .get(url)
      .then((res) => {
        setGetUser((prev) => {
          return {
            ...prev,
            isUserLoading: false,
            userData: res.data,
          };
        });

        setUserFormState({
          name: res.data?.data?.first_name,
          job: res.data?.data?.email,
        });
      })
      .catch((err) => {
        setGetUser((prev) => {
          return {
            ...prev,
            userError: err,
            isUserLoading: false,
          };
        });
      });
  };

  const deleteHandler = (id) => {
    const url = `https://reqres.in/api/users/${id}`;

    setDeleteUser((prev) => {
      return {
        ...prev,
        isDeleteLoading: true,
        deleteError: null,
        isDeleteSuccess: false,
      };
    });
    axios
      .delete(url)
      .then((res) => {
        setDeleteUser((prev) => {
          return {
            ...prev,
            isDeleteLoading: false,
            isDeleteSuccess: true,
          };
        });
      })
      .catch((err) => {
        setDeleteUser((prev) => {
          return {
            ...prev,
            deleteError: err,
            isDeleteLoading: false,
          };
        });
      });
  };

  return (
    <div
      style={{
        background: "salmon",
        padding: "10px",
      }}
    >
      <h2>UserList</h2>
      {isLoading && <h4>Loading...</h4>}
      {!isLoading && error && <h4>Error</h4>}
      {!isLoading &&
        !error &&
        data.data &&
        data.data.map((item, index) => {
          return (
            <div key={index}>
              <h3>
                Name: {item.first_name} {item.last_name}
              </h3>
              <h3>Email: {item.email}</h3>
              <div>
                <button onClick={() => getUserHandler(item.id)}>
                  Update Me
                </button>
                <button onClick={() => deleteHandler(item.id)}>
                  Delete Me
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
