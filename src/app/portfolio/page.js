"use client"

import Layout from "../components/Layout"
import { useEffect, useRef, useState } from "react"

export default function Portfolio() {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)
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

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured online store with payment integration, inventory management, and analytics dashboard.",
      category: "Web Development",
      image: "/ecommerce-platform.png",
      tech: ["React", "Node.js", "MongoDB"],
      year: "2024",
    },
    {
      title: "Mobile Banking App",
      description:
        "Secure banking application for iOS and Android with biometric authentication and real-time transactions.",
      category: "Mobile App",
      image: "/banking-app.png",
      tech: ["React Native", "Firebase", "Stripe"],
      year: "2024",
    },
    {
      title: "Corporate Website",
      description: "Modern website for a financial services company with interactive animations and responsive design.",
      category: "Web Design",
      image: "/corporate-website.png",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      year: "2023",
    },
    {
      title: "Health & Fitness App",
      description:
        "Track your workouts and nutrition with this comprehensive mobile app featuring AI-powered recommendations.",
      category: "Mobile App",
      image: "/fitness-app.png",
      tech: ["Flutter", "Python", "TensorFlow"],
      year: "2024",
    },
    {
      title: "Restaurant Booking System",
      description: "Online reservation platform for restaurants with real-time availability and customer management.",
      category: "Web Development",
      image: "/restaurant-booking.png",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      year: "2023",
    },
    {
      title: "Travel Blog",
      description: "Beautifully designed travel blog with interactive maps, photo galleries, and social sharing.",
      category: "Web Design",
      image: "/travel-blog.png",
      tech: ["Gatsby", "Contentful", "Mapbox"],
      year: "2023",
    },
  ]

  const categories = ["All", "Web Development", "Mobile App", "Web Design"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00E5FF]/5"></div>
        <div className="absolute top-10 right-10 w-2 h-2 bg-[#00E5FF]/40 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-16 w-3 h-3 bg-[#00E5FF]/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
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
              Portfolio
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-[#F5F5F5]/90 leading-relaxed">
            Explore our recent projects and see what we can create for your business.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter Buttons */}
          <div
            ref={addToRefs}
            data-section="filters"
            className={`flex justify-center mb-8 sm:mb-12 transform transition-all duration-1000 ${
              visibleSections.has("filters") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl backdrop-blur-md bg-[#1A1A1A]/30 border border-[#00E5FF]/20 p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-[#00E5FF] text-[#0D0D0D] shadow-lg scale-105"
                      : "text-[#F5F5F5] hover:bg-[#00E5FF]/20 hover:text-[#00E5FF]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.title}-${activeFilter}`}
                ref={addToRefs}
                data-section={`project-${index}`}
                className={`group rounded-2xl overflow-hidden backdrop-blur-md bg-[#1A1A1A]/30 border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 hover:bg-[#1A1A1A]/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer transform ${
                  visibleSections.has(`project-${index}`) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={
                      project.image || `/placeholder.svg?height=224&width=400&query=${project.title} project screenshot`
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-[#00E5FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Hover overlay with tech stack */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-[#00E5FF]/20 text-[#00E5FF] rounded-full backdrop-blur-sm border border-[#00E5FF]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-[#F5F5F5] text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#00E5FF]/90 text-[#0D0D0D] text-xs font-bold rounded-full backdrop-blur-sm">
                    {project.year}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#00E5FF] bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-full mb-3 group-hover:bg-[#00E5FF]/30 transition-colors duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] mb-3 sm:mb-4 font-sans group-hover:text-[#00E5FF] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <button className="text-[#00E5FF] font-semibold hover:text-[#F5F5F5] transition-all duration-300 flex items-center group-hover:translate-x-2 transform text-sm sm:text-base">
                    View Project
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1A1A1A]/80 backdrop-blur-xl rounded-3xl border border-[#00E5FF]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="relative">
              <img
                src={
                  selectedProject.image ||
                  `/placeholder.svg?height=300&width=600&query=${selectedProject.title} detailed view`
                }
                alt={selectedProject.title}
                className="w-full h-64 sm:h-80 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#0D0D0D]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#F5F5F5] hover:text-[#00E5FF] hover:bg-[#0D0D0D] transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-[#00E5FF]/20 text-[#00E5FF] rounded-full text-sm font-semibold border border-[#00E5FF]/30">
                  {selectedProject.category}
                </span>
                <span className="px-4 py-2 bg-[#00E5FF]/90 text-[#0D0D0D] rounded-full text-sm font-bold">
                  {selectedProject.year}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4 font-sans">{selectedProject.title}</h3>

              <p className="text-[#F5F5F5]/90 mb-6 leading-relaxed">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#F5F5F5] mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-[#00E5FF]/20 text-[#00E5FF] rounded-lg text-sm border border-[#00E5FF]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#00E5FF]/90 hover:bg-[#00E5FF] text-[#0D0D0D] font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
                  View Live Site
                </button>
                <button className="flex-1 border-2 border-[#00E5FF]/50 hover:border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0D0D0D] font-bold py-3 px-6 rounded-full transition-all duration-300">
                  View Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
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
