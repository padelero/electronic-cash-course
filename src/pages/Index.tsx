import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockCourses } from "@/data/mockData";
import { WaitlistForm } from "@/components/WaitlistForm";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1A1F2C] to-[#2C2F3B] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Master <span className="text-bitcoin">Bitcoin</span> and <span className="text-bitcoincash">Bitcoin Cash</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-300">
                  Learn blockchain technology, earn cryptocurrency rewards, and become part of the financial future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-bitcoin hover:bg-bitcoin/90 text-white font-medium px-6 py-3 rounded-md text-lg"
                    onClick={() => navigate('/courses')}
                  >
                    Browse Courses
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-bitcoincash text-bitcoincash hover:bg-bitcoincash/10 font-medium px-6 py-3 rounded-md text-lg"
                    onClick={() => navigate('/rewards')}
                  >
                    View Rewards
                  </Button>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-400 border-2 border-[#1A1F2C]"></div>
                    ))}
                  </div>
                  <p className="ml-4 text-sm text-gray-300">
                    Join <span className="font-bold">1,240+</span> students mastering crypto
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                    alt="Bitcoin learning"
                    className="w-full h-auto"
                  />
                </div>
                {/* Bitcoin and Bitcoin Cash logos floating elements for decoration */}
                <div className="absolute -top-5 -left-5 bg-white p-3 rounded-full shadow-lg z-10 hidden md:block">
                  <div className="h-10 w-10 rounded-full bg-[#F7931A] flex items-center justify-center">
                    <span className="text-white font-bold">₿</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-full shadow-lg z-10 hidden md:block">
                  <div className="h-10 w-10 rounded-full bg-[#0AC18E] flex items-center justify-center">
                    <span className="text-white font-bold">₿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <WaitlistForm />
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold">Featured Courses</h2>
              <Button variant="link" onClick={() => navigate('/courses')}>
                View All Courses
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={() => navigate(`/courses/${course.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-center mb-12">How CryptoLearn Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-bitcoin/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoin"><path d="M12 2v1"></path><path d="M12 21v1"></path><path d="m4.9 4.9 0.7 0.7"></path><path d="m18.4 18.4 0.7 0.7"></path><path d="M2 12h1"></path><path d="M21 12h1"></path><path d="m4.9 19.1 0.7-0.7"></path><path d="m18.4 5.6 0.7-0.7"></path><circle cx="12" cy="12" r="4"></circle></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn</h3>
                <p className="text-muted-foreground">
                  Access comprehensive courses on Bitcoin, Bitcoin Cash, and blockchain technology taught by experts.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-bitcoin/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoin"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete</h3>
                <p className="text-muted-foreground">
                  Pass quizzes and practical assignments to demonstrate your knowledge and track your progress.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-bitcoincash/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoincash"><circle cx="12" cy="12" r="8"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="14.5" y1="12" y2="14.5"></line><path d="M16.2 16.2c-1.2 1.2-2.8 1.8-4.4 1.8s-3.2-.6-4.4-1.8-1.8-2.8-1.8-4.4.6-3.2 1.8-4.4 2.8-1.8 4.4-1.8 3.2.6 4.4 1.8 1.8 2.8 1.8 4.4"></path><path d="M12 20v-2"></path><path d="M12 6V4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn</h3>
                <p className="text-muted-foreground">
                  Get rewarded with Bitcoin Cash based on your performance and course completion.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-bitcoin/10 to-bitcoincash/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community of learners and start earning while you master blockchain technology.
            </p>
            <Button 
              className="bg-gradient-to-r from-bitcoin to-bitcoincash hover:opacity-90 text-white font-medium px-8 py-3 rounded-md text-lg"
              onClick={() => navigate(isAuthenticated ? '/courses' : '/register')}
            >
              {isAuthenticated ? 'Explore Courses' : 'Get Started for Free'}
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#1A1F2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-bitcoin to-bitcoincash flex items-center justify-center text-white font-bold text-sm">
                  CL
                </div>
                <span className="ml-2 font-montserrat font-bold text-xl">CryptoLearn</span>
              </div>
              <p className="text-gray-400">
                Learn blockchain technology, earn cryptocurrency rewards, and become part of the financial future.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Courses</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Bitcoin Basics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bitcoin Cash</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blockchain Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Trading Fundamentals</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Telegram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} CryptoLearn. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
