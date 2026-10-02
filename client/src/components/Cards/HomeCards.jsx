import Card from "./HomeCard";
export default function Cards() {
  return (
    <section className="max-w-3xl xs:max-w-xl lg:max-w-5xl h-auto mx-auto grid gap-7 grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))]">
      <h2 className="text-3xl font-bold text-dark-primary text-center col-span-full">
        Features
      </h2>
      <Card
        title="Planning"
        description={"Plan your entire trip in the best way you could."}
      />
      <Card
        title="Sharing"
        description={
          "Share your planning with your friends, and Work together to create the perfect trip."
        }
      />
      <Card
        title="Organize"
        description={
          "Store the necessary tickets, files and forms for your trip."
        }
      />
      <Card
        title="Connect"
        description={"Reach other people, see their plans, take inspiration."}
      />
    </section>
  );
}
