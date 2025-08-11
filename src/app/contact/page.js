"use client"

import Layout from "../components/Layout"
import { useEffect, useRef, useState } from "react"

export default function Contact() {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState({ type: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any existing status when user starts typing
    if (formStatus.message) {
      setFormStatus({ type: "", message: "" })
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email"
    if (!formData.subject.trim()) return "Subject is required"
    if (!formData.message.trim()) return "Message is required"
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validateForm()
    if (error) {
      setFormStatus({ type: "error", message: error })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormStatus({ type: "success", message: "Thank you! Your message has been sent successfully." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setFormStatus({ type: "error", message: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      content: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      content: "info@mysite.com",
      href: "mailto:info@mysite.com",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      content: "123 Business Ave, Suite 456\nSan Francisco, CA 94107",
      href: "https://maps.google.com/?q=123+Business+Ave+San+Francisco+CA",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00E5FF]/5"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#00E5FF]/40 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-16 w-3 h-3 bg-[#00E5FF]/30 rounded-full animate-pulse"
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
            Contact{" "}
            <span className="text-[#00E5FF] relative">
              Us
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-[#F5F5F5]/90 leading-relaxed">
            We'd love to hear from you. Get in touch with our team today and let's discuss your next project.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Contact Info */}
            <div
              ref={addToRefs}
              data-section="contact-info"
              className={`w-full lg:w-2/5 transform transition-all duration-1000 ${
                visibleSections.has("contact-info") ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-sans mb-4 sm:mb-6">Get in Touch</h2>
              <p className="text-[#F5F5F5]/90 mb-6 sm:mb-8 leading-relaxed">
                Have a project in mind or want to learn more about our services? We're here to help you bring your ideas
                to life.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`group transform transition-all duration-700 ${
                      visibleSections.has("contact-info") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    <a
                      href={item.href}
                      className="flex items-start p-4 rounded-xl bg-[#1A1A1A]/30 backdrop-blur-md border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 hover:bg-[#1A1A1A]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="flex-shrink-0 bg-[#00E5FF]/20 backdrop-blur-sm p-3 rounded-full text-[#00E5FF] border border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/30 group-hover:scale-110 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#F5F5F5] font-sans group-hover:text-[#00E5FF] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-[#F5F5F5]/80 whitespace-pre-line text-sm sm:text-base">{item.content}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Quick Response Time */}
              <div className="mt-8 p-4 rounded-xl bg-[#00E5FF]/10 backdrop-blur-md border border-[#00E5FF]/30">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#00E5FF] rounded-full animate-pulse mr-3"></div>
                  <span className="text-[#00E5FF] font-semibold text-sm">We typically respond within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              ref={addToRefs}
              data-section="contact-form"
              className={`w-full lg:w-3/5 transform transition-all duration-1000 delay-300 ${
                visibleSections.has("contact-form") ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              }`}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-[#1A1A1A]/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#00E5FF]/20 shadow-2xl hover:border-[#00E5FF]/30 transition-all duration-500"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[#F5F5F5] font-medium mb-2 font-sans text-sm sm:text-base"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D]/50 backdrop-blur-sm border border-[#00E5FF]/20 text-[#F5F5F5] placeholder-[#F5F5F5]/60 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all duration-300 hover:border-[#00E5FF]/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[#F5F5F5] font-medium mb-2 font-sans text-sm sm:text-base"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D]/50 backdrop-blur-sm border border-[#00E5FF]/20 text-[#F5F5F5] placeholder-[#F5F5F5]/60 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all duration-300 hover:border-[#00E5FF]/40"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-[#F5F5F5] font-medium mb-2 font-sans text-sm sm:text-base"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D]/50 backdrop-blur-sm border border-[#00E5FF]/20 text-[#F5F5F5] placeholder-[#F5F5F5]/60 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all duration-300 hover:border-[#00E5FF]/40"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-[#F5F5F5] font-medium mb-2 font-sans text-sm sm:text-base"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D]/50 backdrop-blur-sm border border-[#00E5FF]/20 text-[#F5F5F5] placeholder-[#F5F5F5]/60 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all duration-300 resize-none hover:border-[#00E5FF]/40"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                {/* Status Message */}
                {formStatus.message && (
                  <div
                    className={`mb-6 p-4 rounded-xl backdrop-blur-md border ${
                      formStatus.type === "success"
                        ? "bg-green-500/20 border-green-500/30 text-green-400"
                        : "bg-red-500/20 border-red-500/30 text-red-400"
                    } animate-fade-in`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00E5FF]/90 hover:bg-[#00E5FF] disabled:bg-[#00E5FF]/50 text-[#0D0D0D] font-bold py-3 sm:py-4 px-4 rounded-xl shadow-lg transform hover:scale-105 disabled:scale-100 transition-all duration-300 font-sans relative overflow-hidden group disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-8 sm:py-12 bg-[#0D0D0D] border-t border-[#00E5FF]/20">
        <div
          ref={addToRefs}
          data-section="social"
          className={`container mx-auto px-4 sm:px-6 transform transition-all duration-1000 ${
            visibleSections.has("social") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] font-sans text-center sm:text-left">
              Follow us on social media
            </h2>
            <div className="flex space-x-4 sm:space-x-6">
              {[
                {
                  name: "Facebook",
                  href: "#",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  href: "#",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "#",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "#",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 bg-[#1A1A1A]/30 backdrop-blur-md border border-[#00E5FF]/20 rounded-full flex items-center justify-center text-[#F5F5F5]/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-[#1A1A1A]/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 transform ${
                    visibleSections.has("social") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
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
