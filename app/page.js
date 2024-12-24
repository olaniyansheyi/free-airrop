"use client";

import { useState, useEffect } from "react";
import ConnectButton from "@/lib/wallet-modal";

export default function HomePage() {
  const [targetTime, setTargetTime] = useState(() => {
    // Set the initial target time (5 days from now)
    const now = new Date();
    return new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft(targetTime);
      if (remaining.total <= 0) {
        resetCountdown();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  function calculateTimeLeft(target) {
    const now = new Date();
    const total = target - now;

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function resetCountdown() {
    const now = new Date();
    const newTarget = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    setTargetTime(newTarget);
    setTimeLeft(calculateTimeLeft(newTarget));
  }

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of this airdrop?",
      answer:
        "This airdrop is our way of rewarding our community members for their support and engagement. It’s also a means to distribute tokens fairly and encourage participation in our ecosystem.",
    },
    {
      question: "Is this airdrop safe?",
      answer:
        "Absolutely. We prioritize your security and privacy, We do not request your private keys or sensitive wallet information.",
    },
    {
      question: " Who is eligible to claim the airdrop?",
      answer:
        "To qualify for the airdrop, you must meet one of the following criteria: 1.Be a token holder or 2.Follow our social media accounts and provide proof of engagement.",
    },
    {
      question: " Is there a deadline for claiming the airdrop?",
      answer:
        "Yes, the airdrop is available for a limited time. Make sure to claim your tokens before the above timer to avoid missing out",
    },

    {
      question: "How do I prove my social media engagement?",
      answer:
        "Sharing a screenshot of your interaction with our posts (likes, comments, shares) to the Admin.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full py-20 flex justify-center items-center  px-4 flex-col tracking-wider ">
      <h6 className="font-semibold tracking-wider text-accent mb-5 text-center sm:text-2xl text-xl ">
        Claim your crypto airdrop!
      </h6>
      <div className="bg-gradient-to-t from-[#1F2126] to-[#33363D] drop-shadow-2xl rounded-xl px-6 w-full sm:w-[95%] lg:w-[65%] flex justify-between gap-y-12 items-center flex-wrap sm:py-20 sm:px-10 py-14">
        <div className="flex flex-col gap-y-2 justify-start items-start">
          <p className="text-accent font-semibold">Free Pool Earn</p>
          <h6 className="font-semibold tracking-wider text-white mb-2 text-center sm:text-2xl text-xl">
            Claim Crypto Bonus
          </h6>
          <p className="text-[#d8cece] font-semibold text-sm">
            Are you a holder of tesla token?
          </p>
        </div>
        <div className="px-12 py-4 rounded-xl flex items-center justify-center flex-col bg-[#1D1F23]">
          <p className="text-white font-semibold text-sm">
            Free airdrop available
          </p>
          <h1 className="font-semibold text-2xl lg:text-4xl mt-4 text-accent">
            {`${timeLeft.days}d: ${timeLeft.hours}h: ${timeLeft.minutes}m: ${timeLeft.seconds}s`}
          </h1>
        </div>
      </div>
      <p className="text-accent font-semibold  text-center my-6">
        Follow us on all socials and send proof to the admin before claiming!
      </p>

      <ConnectButton />

      <p className="text-white text-2xl mt-10 font-semibold  text-center my-6">
        Our Socials
      </p>
      <div className="flex justify-center items-center gap-x-4">
        <img
          className="w-[50px] h-[50px] rounded-lg"
          src="https://seeklogo.com/images/T/telegram-logo-2A32756393-seeklogo.com.png"
          alt=""
        />
        <img
          className="w-[50px] h-[50px] rounded-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5pkwoMSoDkFY-cLO6i_wOaBGUv5xmsHnYg&s"
          alt=""
        />
        <img
          className="w-[50px] h-[50px] rounded-lg"
          src="https://img.freepik.com/premium-vector/instagram-logo-vector_768467-330.jpg?semt=ais_hybrid"
          alt=""
        />
      </div>

      <p className="text-white text-2xl mt-14 font-semibold  text-center my-6">
        F.A.Q
      </p>

      <div className="my-10 mx-auto bg-gradient-to-t from-[#1F2126] to-[#33363D] drop-shadow-2xl rounded-xl w-[90%] sm:w-[75%] p-6">
        <div className="w-[90%] flex flex-col gap-y-5 mx-auto cursor-pointer">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="flex justify-center items-center border-b-2 border-gray-500 py-3 flex-wrap"
            >
              <div className="flex justify-between items-center w-full text-accent font-semibold ">
                <h1 className="text-secondary font-semibold text-lg">
                  {faq.question}
                </h1>
                <div className="w-[20px] cursor-pointer">
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div className="text-[#d8cece]  w-full py-5">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
