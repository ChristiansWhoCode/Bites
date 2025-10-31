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
          className="header-nav-item header-nav-item--desktop"
          href="https://giving.myamplify.io/App/Form/c06cb37f-73d3-4f90-8c4d-22b762d3cfe9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Give
        </a>
        <style>{`
          @media (max-width: 1023px) {
            .header-nav-item--desktop {
              display: none !important;
            }
          }
        `}</style>
        <div className="header-dropdown">
          <button
            className="header-dropdown-toggle"
            aria-label="Open menu"
            onClick={() => {
              const menu = document.getElementById("header-dropdown-menu");
              if (menu) menu.classList.toggle("open");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginLeft: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="4"
                y="11"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="4"
                y="16"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
          </button>
          <div
            id="header-dropdown-menu"
            className="header-dropdown-menu"
            onClick={(e) => {
              (e.target as HTMLElement)
                .closest(".header-dropdown-menu")
                ?.classList.remove("open");
            }}
          >
            <a
              className="header-nav-item"
              href="https://giving.myamplify.io/App/Form/c06cb37f-73d3-4f90-8c4d-22b762d3cfe9"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", padding: "0.75rem 1rem" }}
            >
              Give
            </a>
            {/* <a
              className="header-nav-item"
              href="/book"
              style={{ display: "block", padding: "0.75rem 1rem" }}
            >
              Book
            </a> */}
          </div>
          <style>{`
            .header-dropdown {
              position: relative;
              display: inline-block;
            }
            .header-dropdown-menu.open {
              display: block !important;
            }
          `}</style>
        </div>
        {/* <a className="header-nav-item" href="/contact">
          Contact
        </a> */}
      </nav>
    </header>
  );
}
