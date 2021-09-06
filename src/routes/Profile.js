import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Tweet from "components/Tweet";

const Profile = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  const db = getFirestore();
  const auth = getAuth();
  const history = useHistory();

  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
    // <Redirect from="*" to="/" />
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
    <>
      <button onClick={onLogOutClick}>Log Out</button>

      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
