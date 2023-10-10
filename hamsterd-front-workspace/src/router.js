import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import StudyGroup from "./pages/studygroup/StudyGroup";
import Social from "./pages/social/Social";
import Schedule from "./pages/studygroup/Schedule";
import GroupEval from "./pages/studygroup/GroupEval";
import SignUp from "./pages/member/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
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
    ],
  },
]);

export default router;
