import Link from "next/link"
// import logo from "./../../Assets/logo.png"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
          <header className="bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#00E5FF]/20 shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-2xl font-bold text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors duration-300 font-['SF_Pro_Display']"
                >
              <img 
  src="/logo.png" 
  alt="Logo" 
  style={{ 
    height: '70px', 
    width: '70px',
    objectFit: 'contain' // preserves aspect ratio
  }} 
/>

                </Link>

                <div className="flex space-x-6">
                  <Link href="/about" className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors duration-300">
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors duration-300"
                  >
                    Services
                  </Link>
                  <Link
                    href="/portfolio"
                    className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors duration-300"
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="bg-[#0D0D0D]/80 backdrop-blur-md border-t border-[#00E5FF]/20 text-[#F5F5F5] py-8">
            <div className="container mx-auto px-6 text-center">
              <p className="text-[#F5F5F5]/80">© {new Date().getFullYear()} MySite</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
