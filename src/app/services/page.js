"use client"

import Layout from "../components/Layout"
import { useEffect, useRef, useState } from "react"

export default function Services() {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      icon: "🌐",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that enhance user experience and drive engagement.",
      icon: "🎨",
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android with native performance.",
      icon: "📱",
    },
    {
      title: "SEO Optimization",
      description: "Improve your search rankings and online visibility with proven strategies.",
      icon: "🔍",
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive strategies to grow your online presence and reach your audience.",
      icon: "📈",
    },
    {
      title: "Consulting",
      description: "Expert advice to guide your digital transformation and business growth.",
      icon: "💡",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00E5FF]/5"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#00E5FF]/40 rounded-full animate-pulse"></div>
        <div
          className="absolute top-32 right-16 w-3 h-3 bg-[#00E5FF]/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-1 h-1 bg-[#00E5FF]/50 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          ref={addToRefs}
          data-section="hero"
          className={`container mx-auto px-4 sm:px-6 text-center relative z-10 transform transition-all duration-1000 ${
            visibleSections.has("hero") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-[#F5F5F5] font-sans leading-tight">
            Our{" "}
            <span className="text-[#00E5FF] relative">
              Services
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-[#F5F5F5]/90 leading-relaxed">
            We offer a comprehensive range of services to meet your digital needs and drive your business forward.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={addToRefs}
                data-section={`service-${index}`}
                className={`group p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-[#1A1A1A]/30 border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 hover:bg-[#1A1A1A]/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl transform ${
                  visibleSections.has(`service-${index}`) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00E5FF]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#00E5FF]/30 transition-colors duration-300">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#00E5FF] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3 sm:mb-4 font-sans group-hover:text-[#00E5FF] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#F5F5F5]/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                <button className="text-[#00E5FF] font-semibold hover:text-[#00E5FF]/80 transition-all duration-300 flex items-center group-hover:translate-x-2 transform text-sm sm:text-base">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Glassmorphism hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/5 via-transparent to-[#00E5FF]/5"></div>
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#00E5FF]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-xl"></div>

        <div
          ref={addToRefs}
          data-section="cta"
          className={`container mx-auto px-4 sm:px-6 text-center relative z-10 transform transition-all duration-1000 ${
            visibleSections.has("cta") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 rounded-3xl backdrop-blur-md bg-[#1A1A1A]/30 border border-[#00E5FF]/30 shadow-2xl hover:border-[#00E5FF]/50 transition-all duration-500 group">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 font-sans leading-tight">
              Ready to{" "}
              <span className="text-[#00E5FF] relative">
                get started?
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#F5F5F5]/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us today to discuss how we can help transform your digital presence and achieve your business
              goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-[#00E5FF]/90 hover:bg-[#00E5FF] text-[#0D0D0D] font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-sans relative overflow-hidden group">
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <button className="w-full sm:w-auto border-2 border-[#00E5FF]/50 hover:border-[#00E5FF] text-[#00E5FF] hover:text-[#0D0D0D] hover:bg-[#00E5FF] font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-all duration-300 font-sans">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </Layout>
  )
}
