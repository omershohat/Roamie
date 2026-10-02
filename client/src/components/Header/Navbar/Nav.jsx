import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isSigned = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/SignIn");
  };

  const mainNav = [
    { label: "Home", path: "/" },
    { label: "About", path: "/About" },
    { label: "Sign In", path: "/SignIn" },
    { label: "Sign Up", path: "/SignUp" },
  ];

  const profNav = [
    { label: "Home", path: "/" },
    { label: "About", path: "/About" },
    { label: "My Trips", path: "/MyTrips" },
  ];

  const currentNav = isSigned ? profNav : mainNav;

  const SignOutButton = ({ isMobile }) => (
    <button
      onClick={handleSignOut}
      className={
        isMobile
          ? "text-xl font-medium text-red-600 p-4 transition-all hover:font-bold cursor-pointer w-full text-center"
          : "px-4 py-1.5 rounded-lg border border-red-400 text-red-600 hover:bg-red-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
      }
    >
      Sign Out
    </button>
  );

  return (
    <nav>
      {/* Desktop Menu */}
      <ul className="hidden md:flex list-none m-0 p-0 items-center">
        {currentNav.map((item) => (
          <li
            key={item.label}
            className="px-7 font-normal transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:font-medium active:-translate-y-2 active:scale-[0.98]"
          >
            <Link
              to={item.path}
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-primary no-underline"
            >
              {item.label}
            </Link>
          </li>
        ))}

        {/* Sing Out button in regular nav */}

        {isSigned && (
          <li className="px-4">
            <SignOutButton isMobile={false} />
          </li>
        )}
      </ul>

      {/* Burger / Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 block p-4 text-mid-dark-primary focus:outline-none md:hidden"
      >
        <svg
          className="h-8 w-8 stroke-2 transition-all duration-200 hover:stroke-[3px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Dropdown with Linear Blurred Mask */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}>
          <ul
            className={`fixed inset-x-0 top-0 z-40 flex flex-col items-center pt-28 pb-10 shadow-xl md:hidden list-none m-0 p-0 space-y-6 bg-white/30 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {currentNav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-xl font-medium text-mid-dark-primary p-7 transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:font-bold no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Sign Out button in mobile nav */}
            {isSigned && (
              <li>
                <SignOutButton isMobile={true} />
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
