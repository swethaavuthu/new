import { useParams } from "react-router-dom";
import Board from "../components/Board";

export default function BoardPage() {

  const { id } = useParams();

  return <Board boardId={id} />;
}