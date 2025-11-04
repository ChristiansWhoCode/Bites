import { useState } from "react";
import "./ContactForm.scss";
import Button from "../Button/Button";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send message.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      let message = "Failed to send message.";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div className="contact-success">Thank you for your message!</div>;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      {error && <div className="contact-error">{error}</div>}
      <label>
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Send Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
