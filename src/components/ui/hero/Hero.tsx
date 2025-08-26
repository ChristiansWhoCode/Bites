import { useState, useEffect } from "react";
import "./Hero.scss";

const backgrounds = [{ label: "Day-6", src: "/backgrounds/day-6.png" }];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const currentBg = backgrounds[bgIndex];

  // Automatically rotate backgrounds every 5 seconds with fade effect
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setIsFading(true);
  //       setTimeout(() => {
  //         setBgIndex((prev) => (prev + 1) % backgrounds.length);
  //         setIsFading(false);
  //       }, 800); // match transition duration in SCSS
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <div
      className={`hero${isFading ? " is-fading" : ""}`}
      style={{
        backgroundColor: "var(--color-foreground)",
        ["--hero-bg-image"]: `url(${currentBg.src})`,
      }}
    >
      <div className="hero__desk" />
      <img src="/backgrounds/bible.png" alt="Bible" className="hero__bible" />
      <img
        src="/backgrounds/bible.png"
        alt="Bible"
        className="hero__bible-mirror hero__bible--mirror"
      />
      <div className="hero__content">
        <h1 className="hero__headline">
          Making the Bible Come Alive — One Bite-Sized Video at a Time
        </h1>
      </div>
    </div>
  );
}
