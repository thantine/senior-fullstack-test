import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import Header from "../components/Header";
import Posts from "../components/Posts";

export default function HomePage() {
  return (
    <>
      <Header />
      <Posts />
    </>
  );
}
