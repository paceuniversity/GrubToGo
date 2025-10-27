const Home = () => (
  <div className="text-center mt-10">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome Home!</h1>

    {/* Main picture */}
    <img
      src="https://picsum.photos/600/300"
      alt="Welcome"
      className="rounded-lg shadow-lg mx-auto border border-gray-200"
    />

    <p className="mt-6 text-gray-700 text-lg max-w-xl mx-auto">
      This is the home page of my React Router hobbies project.  
      Browse through the different pages to explore my favorite hobbies,  
      learn more about me, and see how React Router and Tailwind CSS work together!
    </p>

    {/* Optional personal picture or additional image */}
    <div className="mt-8">
      <img
        src="https://picsum.photos/200/200?grayscale"
        alt="Profile"
        className="rounded-full shadow-md mx-auto border border-gray-300"
      />
      <p className="mt-2 text-gray-600 italic">Enjoy your visit!</p>
    </div>
  </div>
);

export default Home;
