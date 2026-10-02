import { motion, AnimatePresence } from "framer-motion";
import Win from "../../components/Win/Win.jsx";
import { useState, useEffect } from "react";
import TripCard from "../../components/Cards/TripCard.jsx";
import { Plus } from "lucide-react";

export default function MyTrips() {
  const today = new Date().toISOString().split("T")[0];
  const defaultForm = {
    destination: "",
    startDate: "",
    endDate: "",
  };
  // Pulling the user state we passed from signin/signup (if exist)
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(!trips.length);

  const [formData, setFormData] = useState(defaultForm);
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching the user's trips
  useEffect(() => {
    async function fetchUserTrips() {
      try {
        // No user passed: fetching via token
        const token = localStorage.getItem("token");

        // No token: user not connected
        if (!token) {
          setLoading(false);
          return;
        }

        // Token exists: fetching trips and user first name
        const res = await fetch("http://localhost:3000/trips", {
          headers: { authorization: token },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setTrips(data.trips);
        console.log(`[User signed: ${data.userFirstName}, token: ${token}]`);
      } catch (err) {
        console.error("Failed to load trips: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserTrips();
  }, []);

  // Loading countries into a list (for the new trip form)
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch("https://flagcdn.com/en/codes.json");
        const data = await res.json();

        const list = Object.entries(data)
          .map(([code, name]) => ({ code, name }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      } catch (err) {
        console.log("Failed to load countries:", err);
      }
    }

    loadCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();

    const { destination, startDate, endDate } = formData;
    if (!destination || !startDate) return;

    const matchedCountry = countries.find((c) => c.name === destination);
    const countryCode = matchedCountry ? matchedCountry.code : "";

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      // Creating the new trip in database
      const res = await fetch("http://localhost:3000/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          destination,
          countryCode,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to create trip");

      const createdTrip = await res.json();

      // Updating the current trips list with the new one created
      setTrips((prevTrips) => [...prevTrips, createdTrip.trip || createdTrip]);

      setIsModalOpen(false);

      // Reset form after success
      setFormData(defaultForm);
    } catch (err) {
      console.error("Error creating trip:", err);
      alert("Failed to create trip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" min-h-screen w-[90%] mx-auto max-w-4xl xs:max-w-xl lg:max-w-6xl">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center pt-24 space-y-3"
          >
            <h1 className="text-2xl">Getting your profile ready...</h1>
          </motion.div>
        ) : trips.length ? (
          <motion.div
            key="trips-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-4xl text-center font-bold text-mid-dark-primary  mb-8 ml-3">
              My Trips
            </h1>
            <section>
              <Win>
                {/* New Trip button */}
                <div className="flex justify-center sm:justify-end sm:mr-7 mb-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 my-2 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <Plus size={15} strokeWidth={3.5} />
                    <span> New Trip</span>
                  </button>
                </div>
                <section className="my-4 grid gap-[2rem] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                  {trips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      link="http://localhost:5137/home"
                    />
                  ))}
                </section>
              </Win>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="no-trips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-gray-500 mb-4">
              No trips found. Start planning one!
            </p>
            {/* New Trip button */}
            <div className="flex justify-center mb-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 my-2 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Plus size={15} strokeWidth={3.5} />
                <span> New Trip</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Trip Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pb-20 bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Add New Trip</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="space-y-4">
              {/* Country */}
              <div className="relative w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <select
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="" disabled>
                    Select a country...
                  </option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {/* select country down arrow */}
                <div className="pointer-events-none absolute inset-y-11 right-0 flex items-center pr-4 text-gray-800">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  min={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Cancel */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Save Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
