import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/Navbar";
import LoadingIndicator from "./components/common/LoadingIndicator";

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Home"));
const ShowDetails = React.lazy(() => import("./pages/ShowDetails"));
const Favorites = React.lazy(() => import("./pages/Favorites"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const SignUp = React.lazy(() => import("./pages/auth/SignUp"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <nav className="bg-gradient-to-r from-gray-500 to-gray-800 text-white p-4 shadow-md">
                <NavBar />
              </nav>
              <main className="py-8">
                <Suspense fallback={<LoadingIndicator />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/show/:id" element={<ShowDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
