import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import VideosPage from "./pages/VideosPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/SupportPage";
import AdminPage from "./pages/admin/AdminPage";
import AddBlogPage from "./pages/admin/AddBlogPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function AppRouter({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<PostPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute message="Please log in to access the admin dashboard">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/add"
          element={
            <ProtectedRoute message="Please log in to add blog posts">
              <AddBlogPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
