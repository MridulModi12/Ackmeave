import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function Hero() {
  const buttonStyles = "block w-full sm:w-auto rounded-lg text-sm px-12 py-3.5 shadow-lg focus:outline-none transition-all";
  const primaryButtonStyles = "bg-yellow-400 text-indigo-900 font-semibold hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500";
  const secondaryButtonStyles = "bg-indigo-700 text-white border border-indigo-400 font-medium hover:bg-indigo-600 focus:ring";

  return (
    <section className="bg-gradient-to-r from-indigo-900 to-purple-800 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold sm:text-6xl mb-6">
            <span className="text-white">Collaborative Canvas</span>
            <strong className="font-extrabold text-yellow-300 sm:block mt-2">
              for seamless teamwork
            </strong>
          </h1>

          <p className="mt-6 text-xl text-gray-100">
            Empower your team with a real-time collaborative canvas designed to streamline your workflow and enhance productivity.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <RegisterLink className={`${buttonStyles} ${primaryButtonStyles}`}>
              Get Started Free
            </RegisterLink>

            <a
              href="https://github.com/SpriteLabs/Ackmeave"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles} ${secondaryButtonStyles}`}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero