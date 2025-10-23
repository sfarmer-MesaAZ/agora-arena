import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Webinars from "./pages/Webinars";
import Conference from "./pages/Conference";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";

interface StaticRoute extends Omit<RouteObject, 'element'> {
  element: () => JSX.Element;
  outputPath: string;
}

export const routes: StaticRoute[] = [
  {
    path: "/",
    element: Home,
    outputPath: "index.html"
  },
  {
    path: "/forum",
    element: Forum,
    outputPath: "forum/index.html"
  },
  {
    path: "/webinars",
    element: Webinars,
    outputPath: "webinars/index.html"
  },
  {
    path: "/conference",
    element: Conference,
    outputPath: "conference/index.html"
  },
  {
    path: "/members",
    element: Members,
    outputPath: "members/index.html"
  },
  {
    path: "*",
    element: NotFound,
    outputPath: "404.html"
  }
];