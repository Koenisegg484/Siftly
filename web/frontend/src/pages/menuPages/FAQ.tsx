import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  const faqs = [
    {
      question: "What is Siftly?",
      answer:
        "Siftly is a prize comparison engine that helps you find the best deals across various platforms by aggregating product prices, availability, and offers. It simplifies the decision-making process and ensures that you make informed choices.",
    },
    {
      question: "How does Siftly work?",
      answer:
        "Siftly gathers product and prize information from multiple sources like Adidas, Nike, Puma, and others. It then compares these prizes transparently, offering insights into the best deals available based on your preferences and criteria.",
    },
    {
      question: "Is there a cost to use Siftly?",
      answer:
        "No, Siftly is completely free to use! You can explore and compare prizes without any charges.",
    },
    {
      question: "How accurate is the prize comparison?",
      answer:
        "Siftly uses the most up-to-date data from various trusted platforms. However, since offers and prices can change frequently, we recommend double-checking on the respective website before making a purchase.",
    },
    {
      question: "How does Siftly track price history?",
      answer:
        "Siftly tracks and records price data over time, which is then presented in graph format to help users visualize fluctuations in price and decide when to buy.",
    },
    {
      question: "Is my data safe with Siftly?",
      answer:
        "Yes, Siftly is committed to your privacy and data security. We do not store any personal information.",
    },
    {
      question: "Do I need an account to use Siftly?",
      answer:
        "No, you can use Siftly without creating an account. However, signing up will allow you to save your preferences and get personalized results.",
    },
    {
      question: "How can I reset my password?",
      answer:
        'If you have an account, you can reset your password by clicking the "Forgot Password" link on the login page.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <header className="bg-gray-600 text-white w-full py-6 text-center">
          <h1 className="text-4xl font-bold">
            Frequently Asked Questions (FAQ)
          </h1>
        </header>

        <main className="flex flex-col items-center text-gray-800 px-6 py-12 w-full sm:w-4/5 lg:w-3/4">
          <section className="w-full mb-10">
            <h2 className="text-2xl font-semibold text-center mb-6">
              General Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b">
                  <button
                    className="w-full text-left py-4 px-6 font-semibold text-lg bg-gray-200 hover:bg-blue-200 focus:outline-none"
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 text-lg text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-gray-600 text-white w-full py-6 text-center">
          <p className="text-lg">&copy; 2024 Siftly. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default FAQ;
