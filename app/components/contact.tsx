import Typewriter from "typewriter-effect";
import localFont from "next/font/local";
import React from "react";
const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
});

export default function Contact() {
  const [contactInfo, setContactInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(contactInfo);
  };

  return (
    <>
      {" "}
      <h2
        className={`pt-10 text-xl ${bebasNeue.className} select-none opacity-50`}
      >
        GET IN TOUCH
      </h2>
      <h1
        className={`pt-2 text-5xl font-bold ${bebasNeue.className} select-none`}
      >
        <span className="inline-block hover:animate-gelatine">C</span>
        <span className="inline-block hover:animate-gelatine">O</span>
        <span className="inline-block hover:animate-gelatine">N</span>
        <span className="inline-block hover:animate-gelatine">T</span>
        <span className="inline-block hover:animate-gelatine">A</span>
        <span className="inline-block hover:animate-gelatine">C</span>
        <span className="inline-block hover:animate-gelatine">T</span>
      </h1>
      <div className="flex justify-center">
        <div className="w-2/3">
          <div className="flex justify-center pt-5">
            <div className="flex justify-center items-center bg-gray-100 text-2xl text-black rounded-t-lg w-full h-20">
              <Typewriter
                options={{
                  strings: [`~/tmyridis/contact `],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 1000,
                  delay: 100,
                }}
              />
            </div>
          </div>
          <div className="">
            <div className=" bg-background py-10 text-2xl rounded-b-lg">
              <form onSubmit={sendEmail} className="space-y-8">
                <div className="">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="bg-zinc-500 text-sm rounded-lg w-2/3 p-2.5"
                    placeholder="Enter your first Name"
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="bg-zinc-500 text-sm rounded-lg w-2/3 p-2.5"
                    placeholder="Enter your last Name"
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-zinc-500 text-sm rounded-lg w-2/3 p-2.5"
                    placeholder="Enter your E-mail"
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="bg-zinc-500 text-sm rounded-lg w-2/3 p-2.5"
                    placeholder="Enter your message..."
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
