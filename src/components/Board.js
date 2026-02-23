import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

import List from "./List";
import Navbar from "./Navbar";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useBoard } from "../context/BoardContext";

export default function Board({ boardId }) {

  const { lists, setLists } = useBoard();
  const [title, setTitle] = useState("");


  useEffect(() => {

    if (!boardId) return;

    const unsub = onSnapshot(
      collection(db, "boards", boardId, "lists"),
      snap => {

        const data = snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          cards: d.data().cards || []
        }));

        setLists(data);
      }
    );

    return () => unsub();

  }, [boardId, setLists]);



  const addList = async () => {

    if (!title.trim()) return;

    await addDoc(
      collection(db, "boards", boardId, "lists"),
      { title, cards: [] }
    );

    setTitle("");
  };



  const syncFirestore = async updatedLists => {

    await Promise.all(
      updatedLists.map(list =>
        updateDoc(
          doc(db, "boards", boardId, "lists", list.id),
          {
            title: list.title,
            cards: list.cards
          }
        )
      )
    );
  };



  const handleDragEnd = ({ active, over }) => {

    if (!over) return;

    const sourceList = lists.find(l =>
      l.cards.some(c => c.id === active.id)
    );

    const destList =
      lists.find(l =>
        l.cards.some(c => c.id === over.id)
      ) || lists.find(l => l.id === over.id);

    if (!sourceList || !destList) return;

    const activeIndex =
      sourceList.cards.findIndex(c => c.id === active.id);

    const overIndex =
      destList.cards.findIndex(c => c.id === over.id);

    const updated = lists.map(list => {

      if (list.id === sourceList.id &&
          list.id === destList.id) {

        const cards = [...list.cards];
        const [moved] = cards.splice(activeIndex, 1);
        cards.splice(overIndex, 0, moved);

        return { ...list, cards };
      }

      if (list.id === sourceList.id) {
        return {
          ...list,
          cards: list.cards.filter(c => c.id !== active.id)
        };
      }

      if (list.id === destList.id) {

        const cards = [...list.cards];

        cards.splice(
          overIndex < 0 ? cards.length : overIndex,
          0,
          sourceList.cards[activeIndex]
        );

        return { ...list, cards };
      }

      return list;
    });

    setLists(updated);
    syncFirestore(updated);
  };



  return (
    <>
      <Navbar />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

           <div className="
flex gap-6 p-8 overflow-x-auto
min-h-screen
bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-200
items-start
">
          {lists.map(list => (
            <List
              key={list.id}
              list={list}
              syncFirestore={syncFirestore}
            />
          ))}

          <div className="bg-white/80 backdrop-blur rounded-lg p-3 w-[280px] shadow">

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="w-full border rounded p-2 mb-2"
            />

            <button
              onClick={addList}
              className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            >
              Add List
            </button>

          </div>

        </div>

      </DndContext>
    </>
  );
}