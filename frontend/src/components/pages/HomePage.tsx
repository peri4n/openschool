import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { getFirstName } from "../../store/userInfo";

interface HomePageProps {
  firstName: string,
  lastName: string,
  token: string,
}

const HomePage = ({
  firstName,
  lastName,
  token
}: HomePageProps) => {

  return (
    <div>
      <h1>
        Welcome {firstName} {lastName}
      </h1>

      <p>
        Your token is {token}
      </p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  firstName: getFirstName(state),
  lastName: state.userInfo.lastName,
  token: state.userInfo.accessToken,
})

export default connect(mapStateToProps)(HomePage)

