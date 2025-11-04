import { useState } from "react";
import Card from "../components/ui/Card/Card";
import ContactForm from "../components/ui/ContactForm/ContactForm";
import YouTubePlaylists from "../components/layout/YouTubePlaylist/YouTubePlaylist";

export default function HomePage() {
  return (
    <div>
      <div className="page">
        <div className="hero">
          <h1>Making the Bible Come Alive.</h1>
          <h3>One short, simple video at a time.</h3>
        </div>

        <Card className="ui-card ui-card__video w-full">
          <div className="hero__video">
            {/* lazy-load the YouTube iframe only after user interaction to avoid loading player scripts */}
            <YouTubeHero />
            <div className="cta-buttons">
              <a
                className="btn btn__primary btn__left"
                href="https://www.youtube.com/@BrianNelson-BSB"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Here
              </a>
              <a
                className="btn btn__right"
                href="https://giving.myamplify.io/App/Form/c06cb37f-73d3-4f90-8c4d-22b762d3cfe9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </Card>
        <Card className="ui-card--solid">
          <h2>Real Truth for Real Life</h2>

          <p>Life moves fast. Your faith shouldn’t get left behind.</p>
          <p>
            Bite-Sized Bible gives you short, clear, Scripture-rooted messages —
            built to meet you in real time. Morning, lunch break, late night —
            whenever you need truth that sticks.
          </p>
          <p>
            One message at a time. Always rooted in Jesus. Never watered down.
          </p>
        </Card>
        <Card className="ui-card--solid two-thirds horizontal stack-on-mobile about-card">
          <img src="./Brian-Neutral.png" className="cartoon" />
          <div className="about-text">
            <h2>About Bite-Sized Bible</h2>
            <p>
              Bible teaching that fits your life — without watering it down.
            </p>
            <p>
              I&apos;m Brian Nelson. I&apos;ve spent 20+ years helping people
              see that the Bible isn&apos;t boring, confusing, or outdated —
              it&apos;s alive, practical, and built for everyday life.
            </p>
            <p>
              Bite-Sized Bible gives you clear, powerful Scripture teaching in
              short videos you can actually keep up with — no pressure, no
              fluff, just real truth that sticks.
            </p>
            <p>
              I created Bite-Sized Bible after hearing the same thing over and
              over: “I want to read the Bible more — I just don&apos;t know
              where to start.” This is my answer to that.
            </p>
          </div>
        </Card>

        {/*! add a component for a single playlist here  */}

        <Card
          title="Featured Series"
          description="Dive deeper into key themes through short, story-driven series that trace the Bible's big story."
          className="one-third"
        >
          <YouTubePlaylists />
        </Card>
        <Card className="connect-card half">
          <ContactForm />
          <h2 className="mt-md">Connect & Follow</h2>
          <div className="social-links">
            <a
              href="https://www.youtube.com/@BrianNelson-BSB"
              target="_blank"
              rel="noopener"
            >
              YouTube
            </a>
            <a
              href="https://www.facebook.com/briannelsonspeaking/"
              target="_blank"
              rel="noopener"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bdnelson63/"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@bite_size_bible"
              target="_blank"
              rel="noopener"
            >
              TikTok
            </a>
          </div>
          <div className="mt-lg">
            Email:{" "}
            <a href="mailto:info@bitesizebile.org">info@bitesizebile.org</a>
          </div>
        </Card>
        <Card title="Support the Mission" className="support-card full-width">
          <p>
            Bite-Sized Bible is possible thanks to the generosity of people like
            you. Your support helps create free, high-quality Bible teaching for
            people everywhere.
          </p>
          <a
            className="btn btn-primary"
            href="https://giving.myamplify.io/App/Form/c06cb37f-73d3-4f90-8c4d-22b762d3cfe9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Partner With Us
          </a>
        </Card>
      </div>
    </div>
  );
}

function YouTubeHero() {
  const [showPlayer, setShowPlayer] = useState(false);
  const videoId = "_Rid5Cc9TEU";
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (showPlayer) {
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Bite-Sized Bible Intro"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <button
      className="yt-thumb-button"
      onClick={() => setShowPlayer(true)}
      aria-label="Play intro video"
      style={{
        border: "none",
        padding: 0,
        background: "none",
        cursor: "pointer",
      }}
    >
      <img
        src={thumb}
        alt="Play intro video"
        style={{ width: "100%", display: "block", borderRadius: 6 }}
      />
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
