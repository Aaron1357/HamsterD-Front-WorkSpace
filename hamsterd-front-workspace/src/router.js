import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import StudyGroup from "./pages/studygroup/StudyGroup";
import GroupPage from "./pages/studygroup/GroupPage";
import Social from "./pages/social/Social";
import Schedule from "./pages/studygroup/Schedule";
import ScheduleMain from "./pages/studygroup/ScheduleMain";
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
        path: "/grouppage",
        element: <GroupPage />,
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
        path: "/scheduleMain",
        element: <ScheduleMain />,
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
