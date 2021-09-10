import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Tweet from "components/Tweet";

const Profile = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const db = getFirestore();
  const auth = getAuth();
  const history = useHistory();

  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
    // <Redirect from="*" to="/" />
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName && newDisplayName.length !== 0) {
      await updateProfile(userObj, { displayName: newDisplayName });
      window.location.reload();
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(newArray);
    });
  }, [db, userObj.uid]);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div style={{ marginTop: 50 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
