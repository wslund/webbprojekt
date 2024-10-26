import Contact from "./Pages/Contact";
import About from "./Pages/About";

const RoutingObject = [
  { path: "/Om", name: "Om", component: <About /> },
  { path: "/kontakt", name: "Kontakt", component: <Contact /> },
];

export default RoutingObject;
