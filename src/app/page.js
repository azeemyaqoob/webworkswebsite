"use client"

import { useEffect, useRef, useState } from "react"
import Layout from "./../app/components/Layout"

export default function Home() {
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }))
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

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00E5FF]/5"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div
          ref={addToRefs}
          data-section="hero"
          className={`container mx-auto px-4 sm:px-6 text-center relative z-10 transition-all duration-1000 ${
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-[#F5F5F5] font-sans leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#00E5FF]/70 bg-clip-text text-transparent">
              MySite
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-[#F5F5F5]/90 leading-relaxed">
            We create amazing digital experiences that drive results and transform your business vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="group relative px-8 py-4 bg-[#00E5FF]/20 backdrop-blur-md border border-[#00E5FF]/30 rounded-full text-[#F5F5F5] font-semibold hover:bg-[#00E5FF]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00E5FF]/20"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 to-[#00E5FF]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/portfolio"
              className="px-8 py-4 border-2 border-[#00E5FF]/50 text-[#00E5FF] rounded-full font-semibold hover:bg-[#00E5FF]/10 transition-all duration-300 transform hover:scale-105"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[#0D0D0D] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div
            ref={addToRefs}
            data-section="features-title"
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible["features-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4 font-sans">Our Features</h2>
            <p className="text-lg sm:text-xl text-[#F5F5F5]/70 max-w-2xl mx-auto">
              Discover what makes us different and why clients choose us for their digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Innovative Solutions",
                description: "We deliver cutting-edge solutions tailored to your unique business needs and goals.",
                icon: "💡",
                delay: 0,
              },
              {
                title: "Expert Team",
                description: "Our team of seasoned professionals ensures top-quality results and exceptional service.",
                icon: "👥",
                delay: 200,
              },
              {
                title: "Customer Focus",
                description: "Your satisfaction and success are our top priorities in every project we undertake.",
                icon: "❤️",
                delay: 400,
              },
            ].map((feature, index) => (
              <div
                key={index}
                ref={addToRefs}
                data-section={`feature-${index}`}
                className={`group transition-all duration-1000 ${
                  isVisible[`feature-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="h-full p-6 sm:p-8 bg-[#1A1A1A]/40 backdrop-blur-md border border-[#00E5FF]/20 rounded-2xl hover:bg-[#1A1A1A]/60 hover:border-[#00E5FF]/40 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-[#00E5FF]/10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3 sm:mb-4 font-sans">
                    {feature.title}
                  </h3>
                  <p className="text-[#F5F5F5]/80 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[#0D0D0D] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/5 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div
            ref={addToRefs}
            data-section="cta"
            className={`transition-all duration-1000 ${
              isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-6 sm:mb-8 font-sans">
              Ready to get started?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#F5F5F5]/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact us today to discuss how we can help transform your project into a digital success story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <a
                href="/contact"
                className="group relative px-8 py-4 bg-[#00E5FF]/20 backdrop-blur-md border border-[#00E5FF]/30 rounded-full text-[#F5F5F5] font-semibold hover:bg-[#00E5FF]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00E5FF]/20 w-full sm:w-auto"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 to-[#00E5FF]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="tel:+1234567890"
                className="px-8 py-4 border-2 border-[#00E5FF]/50 text-[#00E5FF] rounded-full font-semibold hover:bg-[#00E5FF]/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
