import "./Header.scss";

export default function Header() {
  const isHome =
    typeof window !== "undefined" && window.location.pathname === "/";
  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">
          <img
            src="/bsb_logo.png"
            alt="Bite Size Bible Logo"
            className="header-logo-image"
          />
        </a>
        <h2>Bite Size Bible</h2>
      </div>
      <nav className="header-nav">
        {!isHome && (
          <a className="header-nav-item" href="/">
            Home
          </a>
        )}
        {/* <a className="header-nav-item" href="/blog">
          Blog
        </a> */}
        <a
          className="header-nav-item"
          href="https://giving.myamplify.io/App/Form/c06cb37f-73d3-4f90-8c4d-22b762d3cfe9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Give
        </a>
        {/* <a className="header-nav-item" href="/contact">
          Contact
        </a> */}
      </nav>
    </header>
  );
}
