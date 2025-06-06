import Contact from "./Pages/Contact";
import About from "./Cards/CardAbout";
import Horses from "./Pages/Horses";
import News from "./Pages/News";
import Admin from "./Pages/Admin";
import ManageNews from "./Pages/ManageNews";
import Login from "./Pages/Login";
import ManageHorses from "./Pages/ManageHorses";
import AddUser from "./Pages/AddUser";
import ChangePassword from "./Pages/Change_password";

export interface RouteItem {
  path: string;
  name: string;
  element: JSX.Element;
  hidden?: boolean;
  protected?: boolean;
}

const getRoutingObject = (): RouteItem[] => [
  { path: "/Om", name: "Om oss", element: <About /> },
  { path: "/Nyheter", name: "Nyheter", element: <News /> },
  { path: "/kontakt", name: "Kontakt", element: <Contact /> },
  { path: "/Hästar", name: "Hästar i stallet", element: <Horses /> },
  {
    path: "/OpenSesame/login",
    name: "Login",
    element: <Login />,
    hidden: true,
  },
  {
    path: "/OpenSesame/admin",
    name: "Admin",
    element: <Admin />,
    hidden: true,
    protected: true,
  },
  {
    path: "/OpenSesame/admin/news",
    name: "Hantera nyheter",
    element: <ManageNews />,
    hidden: true,
    protected: true,
  },
  {
    path: "/OpenSesame/admin/horses",
    name: "Hantera hästar",
    element: <ManageHorses />,
    hidden: true,
    protected: true,
  },
  {
    path: "/OpenSesame/change-password",
    name: "Ändra lösenord",
    element: <ChangePassword />,
    hidden: true,
    protected: true,
  },
  {
    path: "/OpenSesame/admin/add-user",
    name: "Lägg till användare",
    element: <AddUser />,
    hidden: true,
    protected: true,
  },
];

export default getRoutingObject;
