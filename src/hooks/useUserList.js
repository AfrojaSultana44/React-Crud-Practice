import axios from "axios";
import React, { useEffect, useState } from "react";

const useUserList = () => {
  const [users, setUsers] = useState({
    isLoading: false,
    error: null,
    data: [],
  });

  useEffect(() => {
    const url = "https://reqres.in/api/users?page=2";

    setUsers((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    axios
      .get(url)
      .then((res) => {
        setUsers((prev) => {
          return {
            ...prev,
            data: res.data,
            isLoading: false,
          };
        });
      })
      .catch((err) => {
        setUsers((prev) => {
          return {
            ...prev,
            data: [],
            error: err,
            isLoading: false,
          };
        });
      });
  }, []);

  return users;
};

export default useUserList;
