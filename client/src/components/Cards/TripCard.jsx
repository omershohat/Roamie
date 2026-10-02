import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TripCard({ trip, link = "#" }) {
  const navigate = useNavigate();

  const startDateFr = trip.startDate
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(trip.startDate))
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className=" flex flex-col grow-1 shrink-0 basis-[200px] w-full max-w-[200px] overflow-hidden bg-white  rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)] space-y-1
    hover:-translate-y-[0.2rem] 
    hover:shadow-[0_4px_18px_rgba(0,0,0,0.4)]
    active:translate-y-[0.1rem]
    transition-all duration-[200ms] ease-in-out"
      onClick={() => navigate(`/trips/${trip.id}`)}
    >
      <img
        src={`https://flagcdn.com/w1280/${trip.countryCode}.png`}
        alt={trip.destination}
        className="grow-1 shrink-0 basis-62.5 bg-cover bg-no-repeat bg-center w-full h-62.5 object-cover rounded-t-lg"
      />
      <div className="flex flex-col h-full p-4">
        <h3 className="text-sky-800 text-xl font-bold">{trip.destination}</h3>
        <div className="flex space-x-2 items-center">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-400 font-light">{startDateFr}</span>
        </div>
      </div>
    </motion.div>
  );
}
