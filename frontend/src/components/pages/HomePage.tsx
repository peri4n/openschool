import * as React from "react";
import { useAppSelector } from "../../store";

export const HomePage = () => {

  const state = useAppSelector(state => state.userInfo);

  return (
    <div>
      <p>
        Welcome {state.firstName} {state.lastName}
      </p>

      <p>
        Your token is {state.token}
      </p>
    </div>
  );
};
