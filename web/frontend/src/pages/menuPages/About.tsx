import Navbar from "../../components/navbar/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <header className="bg-gray-600 text-white w-full py-6 text-center">
          <h1 className="text-4xl font-bold">About Siftly</h1>
        </header>

        <main className="flex flex-col items-center text-gray-800 px-6 py-12 w-full sm:w-4/5 lg:w-3/4">
          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Siftly is a prize comparison engine designed to simplify
              decision-making. We aggregate and compare product details like
              price, availability, and offers from top platforms, helping users
              find the best prizes with ease. Whether it's Adidas, Nike, Puma,
              or others, we provide transparent, unbiased comparisons so users
              can make informed choices based on their preferences.
            </p>
          </section>

          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-4">Problem Domain</h2>
            <p className="text-lg leading-relaxed">
              The complexity in prize evaluation, lack of transparency, diverse
              user preferences, information overload, and fluctuation in prizes
              all make decision-making challenging for users. Siftly aims to
              solve these problems by aggregating data, providing transparent
              comparisons, personalizing results based on user preferences,
              simplifying decision-making, and offering insights into prize
              fluctuations over time.
            </p>
          </section>

          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-4">Siftly's Solutions</h2>
            <ul className="list-disc list-inside text-lg leading-relaxed">
              <li>
                Aggregates prize information from multiple sources, providing a
                clear overview.
              </li>
              <li>
                Ensures transparency by showing clear, unbiased comparisons for
                better decision-making.
              </li>
              <li>
                Personalizes results based on user preferences such as price
                sensitivity and quality.
              </li>
              <li>
                Reduces information overload by narrowing down choices and
                presenting concise options.
              </li>
              <li>
                Displays prize history graphs, helping users track price
                fluctuations over time.
              </li>
            </ul>
          </section>

          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Siftly?</h2>
            <p className="text-lg leading-relaxed">
              With Siftly, users can quickly compare and decide on the best
              prizes across different platforms. Our goal is to make prize
              selection simple and stress-free, offering insights that lead to
              smarter purchases. By combining the latest data, personalized
              filtering, and price trend analysis, we ensure that every user can
              make the best decision with confidence.
            </p>
          </section>
        </main>

        <footer className="bg-gray-600 text-white w-full py-6 text-center">
          <p className="text-lg">&copy; 2024 Siftly. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
