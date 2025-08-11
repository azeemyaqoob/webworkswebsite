"use client"

import Layout from "../components/Layout"
import { useEffect, useRef, useState } from "react"

export default function About() {
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

    return (
        <Layout>
            {/* Section 1: Image left, content right */}
            <section className="py-12 sm:py-20 bg-[#0D0D0D] overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        {/* Left side - Image with glassmorphism overlay */}
                        <div
                            ref={addToRefs}
                            data-section="hero-image"
                            className={`w-full lg:w-1/2 transform transition-all duration-1000 ${visibleSections.has("hero-image") ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                                }`}
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                                <img
                                    src="/professional-team-collaboration.png"
                                    alt="Our Team"
                                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-transparent backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                                    <span className="inline-block px-3 py-2 sm:px-4 sm:py-2 bg-[#00E5FF]/90 text-[#0D0D0D] font-bold text-sm sm:text-base rounded-full backdrop-blur-md border border-white/20 shadow-lg transform hover:scale-105 transition-all duration-300">
                                        Since 2023
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 w-3 h-3 bg-[#00E5FF]/60 rounded-full animate-pulse"></div>
                                <div
                                    className="absolute top-12 right-8 w-2 h-2 bg-[#00E5FF]/40 rounded-full animate-pulse"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div
                            ref={addToRefs}
                            data-section="hero-content"
                            className={`w-full lg:w-1/2 transform transition-all duration-1000 delay-300 ${visibleSections.has("hero-content") ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                                }`}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 font-sans leading-tight">
                                About{" "}
                                <span className="text-[#00E5FF] relative">
                                    Our Company
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
                                </span>
                            </h2>
                            <p className="text-[#F5F5F5]/90 mb-6 sm:mb-8 font-sans leading-relaxed text-base sm:text-lg">
                                Founded in 2023, we are a team of passionate professionals dedicated to delivering exceptional digital
                                solutions. Our mission is to help businesses thrive in the digital world through innovative technology
                                and creative strategies.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Award-winning digital agency with 5+ years of experience",
                                    "100+ successful projects delivered worldwide",
                                ].map((text, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start transform transition-all duration-700 ${visibleSections.has("hero-content") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${600 + index * 200}ms` }}
                                    >
                                        <div className="flex-shrink-0 mt-1 mr-4 text-[#00E5FF] transform hover:scale-110 transition-transform duration-300">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-[#F5F5F5] font-sans text-sm sm:text-base">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="group bg-[#00E5FF]/90 hover:bg-[#00E5FF] text-[#0D0D0D] font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20 relative overflow-hidden">
                                <span className="relative z-10">Our Services →</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Content left, image right */}
            <section className="py-12 sm:py-20 bg-[#0D0D0D]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
                        {/* Right side - Image with glassmorphism */}
                        <div
                            ref={addToRefs}
                            data-section="approach-image"
                            className={`w-full lg:w-1/2 transform transition-all duration-1000 ${visibleSections.has("approach-image") ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                                }`}
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                                <img
                                    src="/modern-office-tech.png"
                                    alt="Our Approach"
                                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 via-transparent to-[#0D0D0D]/60 backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>

                        {/* Left side - Content */}
                        <div
                            ref={addToRefs}
                            data-section="approach-content"
                            className={`w-full lg:w-1/2 transform transition-all duration-1000 delay-300 ${visibleSections.has("approach-content") ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                                }`}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 font-sans leading-tight">
                                Our{" "}
                                <span className="text-[#00E5FF] relative">
                                    Approach
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
                                </span>
                            </h2>
                            <p className="text-[#F5F5F5]/90 mb-6 sm:mb-8 font-sans leading-relaxed text-base sm:text-lg">
                                We combine cutting-edge technology with creative thinking to deliver solutions that not only meet but
                                exceed expectations. Our process is collaborative, transparent, and focused on delivering measurable
                                results.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { title: "Innovation", desc: "Pushing boundaries with new ideas" },
                                    { title: "Quality", desc: "Never compromising on excellence" },
                                    { title: "Transparency", desc: "Clear communication always" },
                                    { title: "Results", desc: "Driven by measurable success" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`bg-[#1A1A1A]/40 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-[#00E5FF]/20 border-l-4 border-l-[#00E5FF] hover:border-[#00E5FF]/40 transition-all duration-500 hover:transform hover:scale-105 group transform ${visibleSections.has("approach-content") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${600 + index * 150}ms` }}
                                    >
                                        <h4 className="font-bold text-[#F5F5F5] mb-2 font-sans text-sm sm:text-base group-hover:text-[#00E5FF] transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                        <p className="text-[#F5F5F5]/80 text-xs sm:text-sm font-sans">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 sm:py-20 bg-[#0D0D0D]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div
                        ref={addToRefs}
                        data-section="team-header"
                        className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has("team-header") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                            }`}
                    >
                        <span className="inline-block px-4 py-2 bg-[#00E5FF]/20 backdrop-blur-md text-[#00E5FF] font-bold rounded-full mb-4 border border-[#00E5FF]/30 shadow-lg hover:scale-105 transition-transform duration-300">
                            Our Team
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] font-sans leading-tight">
                            Meet{" "}
                            <span className="text-[#00E5FF] relative">
                                The Experts
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            { name: "John Doe", role: "CEO & Founder", delay: "0ms" },
                            { name: "Jane Smith", role: "Creative Director", delay: "200ms" },
                            { name: "Mike Johnson", role: "Lead Developer", delay: "400ms" },
                        ].map((member, index) => (
                            <div
                                key={index}
                                ref={addToRefs}
                                data-section={`team-${index}`}
                                className={`bg-[#1A1A1A]/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 group transform ${visibleSections.has(`team-${index}`)
                                    ? "translate-y-0 opacity-100 scale-100"
                                    : "translate-y-20 opacity-0 scale-95"
                                    }`}
                                style={{ transitionDelay: member.delay }}
                            >
                                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                                    <img
                                        src={`/professional-headshot.png?height=320&width=280&query=professional headshot ${member.name}`}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-[#00E5FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-4 sm:p-6 text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-1 font-sans group-hover:text-[#00E5FF] transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#00E5FF]/80 mb-4 font-sans text-sm sm:text-base">{member.role}</p>
                                    <div className="flex justify-center space-x-4">
                                        {[0, 1].map((i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className="text-[#F5F5F5]/60 hover:text-[#00E5FF] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
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
