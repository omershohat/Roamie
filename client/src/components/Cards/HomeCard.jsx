export default function Card({ title, description, link = "#" }) {
  return (
    <div className="bg-linear-to-bl from-emerald-100 to-orange-200 space-y-2 p-3 rounded-md">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
      <a
        href={link}
        className="font-bold text-primary hover:text-white transition-colors"
      >
        Read More
      </a>
    </div>
  );
}
