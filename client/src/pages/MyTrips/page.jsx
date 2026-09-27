import { useLocation, useNavigate } from "react-router-dom";
import Win from "../../components/Win/Win.jsx";
import { useState, useEffect } from "react";

export default function Profile() {
  // Pulling the user state we passed from signin/signup (if exist)
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    // User passed: No need to address the server
    if (user) return;

    // No user passed: fetching via token
    const token = localStorage.getItem("token");

    // No token: user not connected
    if (!token) {
      setLoading(false);
      return;
    }

    // Token exists: fetching user
    async function fetchUserProfile() {
      try {
        const res = await fetch("http://localhost:3000/prof", {
          headers: { authorization: token },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile: ", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, []);

  return (
    <div className="h-screen w-[90%] mx-auto max-w-3xl xs:max-w-xl lg:max-w-5xl">
      {loading ? (
        <h1 className="text-2xl">Getting your profile ready...</h1>
      ) : user ? (
        <div>
          <h1 className="text-4xl text-mid-dark-primary font-medium my-4">
            Welcome {user.firstName}
          </h1>
          <section className="">
            <Win>
              <h1 className="text-4xl text-dark-primary font-medium pl-4 pt-4">
                Bla Bla Bla
              </h1>
            </Win>
          </section>
        </div>
      ) : (
        navigate("/SignIn")
      )}
    </div>
  );
}
