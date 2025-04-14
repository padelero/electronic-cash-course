
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-bitcoin to-bitcoincash flex items-center justify-center text-white font-bold text-sm">
                CL
              </div>
              <span className="ml-2 font-montserrat font-bold text-xl">CryptoLearn</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-bitcoin hover:text-foreground transition"
              >
                Courses
              </Link>
              <Link
                to="/rewards"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-bitcoincash hover:text-foreground transition"
              >
                Rewards
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 hover:text-foreground transition"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wallet">Wallet</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bitcoin"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/courses"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-bitcoin transition"
            >
              Courses
            </Link>
            <Link
              to="/rewards"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-bitcoincash transition"
            >
              Rewards
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-gray-300 transition"
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-base font-medium hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/wallet"
                    className="block px-4 py-2 text-base font-medium hover:bg-gray-100"
                  >
                    Wallet
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-base font-medium hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1 px-4">
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="w-full justify-center bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
