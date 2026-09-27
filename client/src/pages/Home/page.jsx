import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";

function Home() {
  return (
    <div className="mx-auto w-[90%] pb-[50vh] space-y-10">
      <Hero />
      <Cards />
    </div>
  );
}

export default Home;
