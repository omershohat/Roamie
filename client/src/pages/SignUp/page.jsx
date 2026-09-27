import Win from "../../components/Win/Win";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Navigate init
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { firstName, lastName, email, password, confirmPassword } =
      Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Sending request to the server
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to sign up");

      // Authentication
      if (!data.token) {
        throw new Error(
          "Authentication failed: No token received from server.",
        );
      }
      localStorage.setItem("token", data.token);

      setSuccessMessage(data.message || "Account created succesfully!");
      form.reset();

      const token = data.token;

      localStorage.setItem("token", token);

      const userFound = await fetch("http://localhost:3000/prof", {
        headers: { Authorization: token },
      });

      const user = await userFound.json();

      console.log(`User first name: ${user.firstName}`);

      navigate("/MyTrips", { state: { user } });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-[90%] mx-auto">
      <section className="max-w-xl min-h-80 max-h-200 mx-auto">
        <Win>
          <h1 className="text-primary text-3xl font-semibold text-center pt-5">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit}
            className="py-5 space-y-4 w-[90%] mx-auto"
          >
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 text-center">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200 text-center">
                {successMessage}
              </div>
            )}
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Alex"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-light-primary transition-all"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Smith"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-light-primary transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none  focus:border-light-primary transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-light-primary transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-light-primary transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-primary shadow-[0_4px_12px_rgba(45,80,68,0.25)] hover:bg-light-primary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </Win>
      </section>
    </div>
  );
}

export default Signup;
