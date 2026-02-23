import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, provider);
    navigate("/boards");
  };

  return (
    <div className="
      h-screen
      flex
      justify-center
      items-center
      bg-gradient-to-br
      from-slate-100
      via-slate-200
      to-slate-300
    ">

      {/* LOGIN CARD */}
      <div className="
        bg-white/80
        backdrop-blur-lg
        p-12
        rounded-2xl
        shadow-2xl
        text-center
        border border-white/40
        w-[350px]
      ">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Trello Clone
        </h1>

        <button
          onClick={login}
          className="
            w-full
            bg-slate-800
            text-white
            py-3
            rounded-lg
            font-medium
            hover:bg-slate-900
            transition
            duration-200
          "
        >
          Sign in with Google
        </button>

      </div>

    </div>
  );
}