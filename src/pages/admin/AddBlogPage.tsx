import { useState } from "react";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content_markdown: content }),
      });

      if (res.status === 401) {
        throw new Error("Authentication required - please log in again");
      }

      if (!res.ok) throw new Error("Failed to add blog post");

      setSuccess(true);
      setTitle("");
      setContent("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container">
      <h2>Add Blog Post</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mb-md"
            />
          </div>
          <div>
            <label>Content (Markdown)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
              className="mb-md"
            />
          </div>
          <Button type="submit">Add Blog Post</Button>
          {success && (
            <div style={{ color: "green", marginTop: 8 }}>Blog post added!</div>
          )}
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
      </Card>
    </div>
  );
}
