import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import StudyGroup from "./pages/studygroup/StudyGroup";
import Social from "./pages/social/Social";
import Schedule from "./pages/studygroup/Schedule";
import GroupEval from "./pages/studygroup/GroupEval";
import BoardList from "./pages/board/BoardList";
import Board from "./pages/board/Board";
import SignUp from "./pages/member/SignUp";

const router = createBrowserRouter([
  {
    //
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/studygroup",
        element: <StudyGroup />,
      },
      {
        path: "/social",
        element: <Social />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/groupeval",
        element: <GroupEval />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/boardList",
        element: <BoardList />,
      },
      {
        path: "/board",
        element: <Board />,
      },
    ],
  },
]);

export default router;
