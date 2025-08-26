import "./AdminPage.scss";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import ConnectYouTube from "./ConnectYouTube";
import { LogOut, Newspaper, NotebookPen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="container admin">
      <h2>Admin Dashboard</h2>
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <h3 className="admin-heading">
            Welcome, {user?.name || user?.email}!
          </h3>
        </div>

        <ul className="admin-links">
          <li>
            <ConnectYouTube />
          </li>
          <li>
            <Button
              variant="admin"
              onClick={() => (window.location.href = "/admin/blog")}
            >
              <Newspaper className="mr-xs" size={18} />
              <span>Manage Blogs</span>
            </Button>
          </li>
          <li>
            <Button
              variant="admin"
              onClick={() => (window.location.href = "/admin/blog/add")}
            >
              <NotebookPen className="mr-xs" size={18} />
              <span>Add Blog Post</span>
            </Button>
          </li>
          <li>
            <Button variant="admin" onClick={handleLogout}>
              <LogOut className="mr-xs" size={18} />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </Card>
    </div>
  );
}
