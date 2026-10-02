import { motion, AnimatePresence } from "framer-motion";
import { Flag } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TripHub() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrip() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/trips/${tripId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          throw new Error("You are not authorized to access this trip");
        }

        if (!res.ok) {
          throw new Error("Failed to load trip");
        }

        const data = await res.json();
        console.log(data.trip);
        setTrip(data.trip);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  const calculateDaysRemain = (startDateStr) => {
    if (!startDateStr) return 0;
    const start = new Date(startDateStr);
    console.log(`start: ${start}`);
    const now = new Date();
    console.log(`now: ${now}`);
    const diffTime = start - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center pt-24 space-y-3"
        >
          <h1>Loading Trip...</h1>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">error: {error}</div>;
  }

  if (!trip) {
    return <div className="p-8">Trip not found</div>;
  }

  const daysRemain = calculateDaysRemain(trip.startDate);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen w-[90%] mx-auto max-w-4xl xs:max-w-xl lg:max-w-6xl"
      >
        <div className="flex items-center justify-center my-10">
          <h1 className="text-3xl font-bold">{trip.destination}</h1>
          {trip.countryCode && (
            <img
              src={`https://flagcdn.com/56x42/${trip.countryCode}.png`}
              alt={`${trip.destination} flag`}
              className="ml-2 w-7 h-5 "
            />
          )}
        </div>
        <div className="grid grid-cols-2 grid-cols-[max-content_1fr] gap-7">
          <div className="w-30 h-30 bg-black/50 backdrop-blur-xl rounded-4xl items-center justify-center">
            <div className="w-[60%] mx-auto mt-5">
              <Flag size={18} className="text-gray-700 fill-emerald-400" />
              <div className="flex items-end text-white space-x-1">
                <h1 className="text-3xl">{daysRemain}</h1>
                <p>d</p>
              </div>
              <p className="text-gray-200">remain</p>
            </div>
          </div>
          <p className="text-gray-600 leading-[1.8]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            eligendi odio fugit dolorum itaque voluptatem vero obcaecati facere.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
