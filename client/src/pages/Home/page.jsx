import { AnimatePresence, motion } from "framer-motion";
import Hero from "../../components/Hero/Hero";
import HomeCards from "../../components/Cards/HomeCards";

function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto w-[90%] pb-[50vh] space-y-10">
          <Hero />
          <HomeCards />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
