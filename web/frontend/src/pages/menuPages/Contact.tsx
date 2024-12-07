import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating form submission
    setFormStatus("Sending...");

    // Here you would normally send the form data to an API or server.
    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 2000); // Simulating network delay
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white w-full py-6 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </header>

        <main className="flex flex-col items-center text-gray-800 px-6 py-12 w-full sm:w-4/5 lg:w-3/4">
          <section className="w-full mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              We'd Love to Hear From You!
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-8 space-y-6 w-full sm:w-2/3"
            >
              <div>
                <label
                  className="block text-lg font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-lg font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-lg font-medium text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  rows={6}
                  required
                />
              </div>

              {formStatus && (
                <div className="mt-4 text-center">
                  <p
                    className={
                      formStatus === "Message sent successfully!"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {formStatus}
                  </p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="py-3 px-6 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>

          <section className="w-full sm:w-2/3 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Contact Information
            </h3>
            <p className="text-lg text-gray-700 mb-2">
              Email: <span className="font-semibold">support@siftly.com</span>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Address:{" "}
              <span className="font-semibold">
                1234 Siftly St., Example City, 56789
              </span>
            </p>
          </section>
        </main>

        <footer className="bg-blue-600 text-white w-full py-6 text-center">
          <p className="text-lg">&copy; 2024 Siftly. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
