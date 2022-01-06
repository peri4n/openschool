import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { useEffect, useState } from "react";

export const HomePage = () => {

  const { keycloak } = useKeycloak()

  const [name, setName] = useState<string>()

  useEffect(() => {
    keycloak.loadUserProfile().then((res) => {
      setName(res.username)
    })
  }, [])

  return (
    <div>
      Welcome {name}
    </div>
  );
};
