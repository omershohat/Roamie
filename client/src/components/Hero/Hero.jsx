import HeroText from "./HeroText/HeroText";
import heroimg from "../../assets/abroad.jpg";

function Hero() {
  return (
    <section className="max-w-3xl xs:max-w-xl lg:max-w-5xl h-auto mx-auto min-h-70 grid gap-7 md:grid-cols-2 items-center">
      <img
        className="w-full rounded-[22px] object-cover z-0 shadow-[0_4px_12px_rgba(0,0,0,0.2)] md:order-2 "
        width="5472"
        height="3648"
        src={heroimg}
        alt="abroad"
      />

      <div className="items-center text-center pt-4 space-y-7 w-full flex flex-col z-2">
        <HeroText />
        <a
          href="/SignUp"
          className="w-auto h-auto py-[1em] px-[2em] inline-block text-sm md:text-base lg:text-lg  whitespace-nowrap bg-primary backdrop-blur-[10px] text-white border-none rounded-xl z-2 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.75 hover:scale-[1.03] hover:shadow-[0_5px_24px_rgba(0,0,0,0.28)] hover:bg-light-primary hover:cursor-default active:-translate-y-px active:scale-[0.98] active:shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
