import { Link } from "react-router-dom";

const hobbies = [
  { id: 1, name: "Cycling", img: "https://picsum.photos/200" },
  { id: 2, name: "Photography", img: "https://picsum.photos/200" },
  { id: 3, name: "Gardening", img: "https://picsum.photos/200" },
  { id: 4, name: "Cooking", img: "https://picsum.photos/200" },
];

const Hobbies = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-center mb-6">My Hobbies</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {hobbies.map((hobby) => (
        <div
          key={hobby.id}
          className="border rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
        >
          <img
            src={hobby.img}
            alt={hobby.name}
            className="rounded-lg mb-3 w-full h-40 object-cover"
          />
          <h3 className="text-xl font-semibold">{hobby.name}</h3>
          <Link
            to={`/hobbies/${hobby.id}`}
            className="text-blue-600 hover:text-blue-400 mt-2 inline-block"
          >
            Learn More →
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Hobbies;
