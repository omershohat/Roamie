import logoname from "../../assets/logoname.png";
import Nav from "./Navbar/Nav";

export default function Header() {
  return (
    <header className="mx-auto mb-10 flex max-h-28 max-w-7xl items-center justify-between">
      <img className="h-28" src={logoname} alt="logo" />
      <Nav />
    </header>
  );
}
