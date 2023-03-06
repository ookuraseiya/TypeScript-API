// 全ユーザーを取得するカスタムフック
import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

export const useAllUser = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const setUser = () => {
    setLoading(true); //ローディング
    setError(false); //エラー

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfile(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
};
