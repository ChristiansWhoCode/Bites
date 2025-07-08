import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img
          src="/bsb_logo.png"
          alt="Bite Size Bible Logo"
          className="header-logo"
        />
      </a>
      <nav className="header-nav">
        <a className="header-nav-item" href="/">
          Home
        </a>
        <a className="header-nav-item" href="/blog">
          Blog
        </a>
        <a className="header-nav-item" href="/support">
          Support
        </a>
        <a className="header-nav-item" href="/contact">
          Contact
        </a>
      </nav>
    </header>
  );
}
