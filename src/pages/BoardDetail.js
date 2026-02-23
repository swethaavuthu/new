import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function BoardsPage() {

  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "boards"),
      snap =>
        setBoards(
          snap.docs.map(d => ({
            id: d.id,
            ...d.data()
          }))
        )
    );
    return unsub;
  }, []);

  const createBoard = async () => {
    if (!name.trim()) return;

    await addDoc(collection(db, "boards"), { name });
    setName("");
  };

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-2xl font-bold">Boards</h1>

        <div className="my-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 mr-2"
            placeholder="New board"
          />
          <button
            onClick={createBoard}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Create
          </button>
        </div>

        {boards.length === 0 && (
          <p className="text-gray-500">
            No boards yet. Create one!
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {boards.map(board => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              className="bg-gray-200 p-6 rounded hover:bg-gray-300"
            >
              {board.name}
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}