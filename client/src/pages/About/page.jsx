import { AnimatePresence, motion } from "framer-motion";

function About() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-270 max-w-225 m-auto w-[90%]">
          <section className="text-primary   mx-auto min-h-70 mb-8">
            <div className="w-[90%] mx-auto">
              <h2 className="text-[2.5rem] mb-6">About Roamie</h2>

              <div className="text-[1.2rem] space-y-6">
                <p>
                  We built this platform to replace the clutter of endless group
                  chats and lost confirmations with a seamless, shared command
                  center.
                </p>

                <p>
                  Acting as your crew’s dynamic digital trip binder, it
                  centralizes every flight ticket, event pass, and essential
                  document in one universally accessible space.
                </p>

                <p>
                  From building dynamic day-by-day itineraries and assigning
                  shared packing checklists to brainstorming local spots, we
                  make collaborating with friends effortless.
                </p>

                <p>
                  By keeping logistics perfectly organized and everyone actively
                  involved, we take the friction out of planning so your group
                  can focus entirely on enjoying the journey together.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary   h-auto m-auto my-6 pb-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <div className="text-white w-[90%] max-w-225 mx-auto min-h-70">
              <h2 className="text-[2.5rem] mb-6">About Us</h2>
              <div className="text-[1.2rem] space-y-6">
                <p>
                  We built this platform to replace the clutter of endless group
                  chats and lost confirmations with a seamless, shared command
                  center.
                </p>

                <p>
                  Acting as your crew’s dynamic digital trip binder, it
                  centralizes every flight ticket, event pass, and essential
                  document in one universally accessible space.
                </p>

                <p>
                  From building dynamic day-by-day itineraries and assigning
                  shared packing checklists to brainstorming local spots, we
                  make collaborating with friends effortless.
                </p>

                <p>
                  By keeping logistics perfectly organized and everyone actively
                  involved, we take the friction out of planning so your group
                  can focus entirely on enjoying the journey together.
                </p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default About;
