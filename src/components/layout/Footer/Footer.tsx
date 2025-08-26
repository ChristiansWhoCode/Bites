import React from "react";
import "./Footer.scss";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => (
  <footer className={`footer ${className}`.trim()}>
    <div className="footer__content">
      <span>Bite-Sized Bible &copy; {new Date().getFullYear()}</span>
      <span>
        <a href="/privacy">Privacy Policy</a> &nbsp;|&nbsp;
        <a href="/contact">Contact</a>
      </span>
    </div>
  </footer>
);

export default Footer;
