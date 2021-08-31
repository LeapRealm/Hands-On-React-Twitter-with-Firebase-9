import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
  const db = getFirestore();

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      console.log(tweetObj.id);
      const data = await deleteDoc(doc(db, `tweets/${tweetObj.id}`));
      console.log(data);
    }
  };

  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
