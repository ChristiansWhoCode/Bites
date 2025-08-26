import Card from "../components/ui/Card/Card";
import ContactForm from "../components/ui/ContactForm/ContactForm";
import EpisodeCard from "../components/ui/EpisodeCard/EpisodeCard";
import Hero from "../components/ui/hero/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="page">
        <Card className="hero-card ui-card__lifted">
          <div className="hero__video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/_Rid5Cc9TEU?si=HoPhQYr_lTg-_kpG"
              title="Bite-Sized Bible Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="hero__cta-buttons">
              <a href="/watch" className="btn btn-secondary">
                📖 Start Here
              </a>
              <a href="/giving" className="btn btn-tertiary">
                Partner With Us
              </a>
            </div>
          </div>
        </Card>
        <Card title="Wait, what did I just read?" className="ui-card--solid">
          Whether you&apos;ve never cracked open a Bible or get lost five verses
          in, we&apos;ve got you. Short, simple chunks you&apos;ll actually
          get—and maybe even enjoy. No guilt. No thee&apos;s or thou&apos;s.
          Just one bite at a time.
        </Card>
        <Card
          backgroundColor="#F2D7B5"
          className="ui-card--solid two-thirds horizontal"
        >
          <img src="./Brian-Neutral.png" className="cartoon" />
          <div className="about-text">
            <h2>About Bite Sized Bible</h2>
            <p>
              Hi, I’m Brian Nelson. For over 20 years, I’ve been helping people
              see how the Bible’s big story connects to everyday life.
              Bite-Sized Bible is my way of making Scripture clear, engaging,
              and accessible for everyone.
            </p>
          </div>
        </Card>
        <Card className="ui-card--tv">
          <iframe
            src="https://www.youtube.com/watch?v=_Rid5Cc9TEU&feature=youtu.be"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </Card>
        <Card title="Featured Episodes" className="featured-episodes-card">
          <div className="episodes-list">
            <EpisodeCard
              title="When God Speaks, Life Begins"
              thumbnail="/thumbnails/episode1.jpg"
              link="/watch/episode1"
            />
            <EpisodeCard
              title="You Were Made for More"
              thumbnail="/thumbnails/episode2.jpg"
              link="/watch/episode2"
            />
            <EpisodeCard
              title="The Rest We Were Made For"
              thumbnail="/thumbnails/episode3.jpg"
              link="/watch/episode3"
            />
          </div>
        </Card>
        <Card title="Connect & Follow" className="connect-card">
          <ContactForm />
          <div className="social-links">
            <a
              href="https://youtube.com/@bitesizedbible"
              target="_blank"
              rel="noopener"
            >
              YouTube
            </a>
            <a
              href="https://facebook.com/bitesizedbible"
              target="_blank"
              rel="noopener"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/bitesizedbible"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@bitesizedbible"
              target="_blank"
              rel="noopener"
            >
              TikTok
            </a>
          </div>
        </Card>
        <Card title="Support the Mission" className="support-card">
          <p>
            Bite-Sized Bible is possible thanks to the generosity of people like
            you. Your support helps create free, high-quality Bible teaching for
            people everywhere.
          </p>
          <a href="/giving" className="btn btn-primary">
            Partner With Us
          </a>
        </Card>
      </div>
    </div>
  );
}
