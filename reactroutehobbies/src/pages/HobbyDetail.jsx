import { useParams, Link } from "react-router-dom";

const hobbyDetails = {
  1: {
    name: "Cycling",
    desc: "Cycling helps you stay fit while exploring nature and the city.",
  },
  2: {
    name: "Photography",
    desc: "Capture the beauty of life through your lens and creativity.",
  },
  3: {
    name: "Gardening",
    desc: "Gardening brings peace and joy through caring for living plants.",
  },
  4: {
    name: "Cooking",
    desc: "Experiment with flavors, spices, and create delicious dishes.",
  },
};

const HobbyDetail = () => {
  const { id } = useParams();
  const hobby = hobbyDetails[id];

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">{hobby.name}</h2>
      <img
        src={`https://picsum.photos/500/300?${id}`}
        alt={hobby.name}
        className="rounded-lg shadow-md mx-auto"
      />
      <p className="mt-4 text-gray-700 text-lg">{hobby.desc}</p>
      <Link
        to="/hobbies"
        className="inline-block mt-6 text-blue-600 hover:text-blue-400"
      >
        ← Back to Hobbies
      </Link>
    </div>
  );
};

export default HobbyDetail;
