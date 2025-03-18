import React from 'react'

function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-purple-800 min-h-screen">
        <div className='flex items-baseline justify-center pt-20'>
          <h2 className='text-white border px-4 py-2 rounded-full text-center border-white bg-opacity-20 bg-white backdrop-blur-sm'>
            New Feature | <span className='text-yellow-300 font-medium'>AI-Powered Diagrams</span>
          </h2>
        </div>
        
        <div className="mx-auto h-screen max-w-screen-xl px-4 py-16 lg:flex items-center">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold sm:text-6xl mb-6">
              <span className="text-white">Intelligent Diagrams</span>
              <strong className="font-extrabold text-yellow-300 sm:block mt-2"> 
                for modern engineering teams 
              </strong>
            </h1>

            <p className="mt-6 text-xl text-gray-100">
              Transform your workflow with our AI-powered markdown editor, 
              collaborative diagramming canvas, and code-to-diagram generator
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <a
                className="block w-full rounded-lg bg-yellow-400 text-indigo-900 px-12 py-3.5 text-sm font-semibold shadow-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-auto transition-all"
                href="#"
              >
                Get Started Free
              </a>

              <a
                className="block w-full rounded-lg bg-indigo-700 text-white border border-indigo-400 px-12 py-3.5 text-sm font-medium shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring sm:w-auto transition-all"
                href="#"
              >
                Watch Demo
              </a>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Hero