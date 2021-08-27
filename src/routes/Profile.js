import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";

const Profile = () => {
  const auth = getAuth();
  const history = useHistory();

  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
    // <Redirect from="*" to="/" />
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
