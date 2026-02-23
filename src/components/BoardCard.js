import { useNavigate } from "react-router-dom";

export default function BoardCard({ board }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/board/${board.id}`)}
      className="
        bg-gray-200
        hover:bg-gray-300
        text-gray-800
        p-6
        rounded-lg
        cursor-pointer
        transition
        shadow-sm
        hover:shadow-md
        font-semibold
      "
    >
      {board.name}
    </div>
  );
}