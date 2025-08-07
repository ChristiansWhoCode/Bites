import { useState } from "react";
import "./ContactForm.scss";
import Button from "../Button/Button";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    // TODO: Send form data to backend API
    setSubmitted(true);
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
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>
      <Button type="submit" variant="primary">
        Send
      </Button>
    </form>
  );
}
