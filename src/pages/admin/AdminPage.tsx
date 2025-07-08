import "./AdminPage.scss";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import ConnectYouTube from "./ConnectYouTube";
import { NotebookPen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="container admin-page">
      <h2>Admin Dashboard</h2>
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <p>Welcome, {user?.name || user?.email}!</p>
          <Button variant="default" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <ul className="admin-links">
          <li>
            <ConnectYouTube />
          </li>
          <li>
            <Button
              variant="default"
              onClick={() => (window.location.href = "/admin/blog")}
            >
              <NotebookPen className="mr-xs" size={18} />
              <span className="mt-xs">Manage Blog</span>
            </Button>
          </li>
          <li>
            <Button
              variant="default"
              onClick={() => (window.location.href = "/admin/blog/add")}
            >
              Add Blog Post
            </Button>
          </li>
        </ul>
      </Card>
    </div>
  );
}
