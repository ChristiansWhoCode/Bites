import Card from "../components/ui/Card/Card";
import ContactForm from "../components/ui/ContactForm/ContactForm";

export default function HomePage() {
  return (
    <div className="page">
      <Card className="ui-card--tv">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_Rid5Cc9TEU?si=HoPhQYr_lTg-_kpG"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Card>
      <Card title="Wait, what did I just read?" className="ui-card--solid">
        Whether you&apos;ve never cracked open a Bible or get lost five verses
        in, we&apos;ve got you. Short, simple chunks you&apos;ll actually
        get—and maybe even enjoy. No guilt. No thee&apos;s or thou&apos;s. Just
        one bite at a time.
      </Card>
      <Card backgroundColor="#F2D7B5" className="ui-card--solid two-thirds">
        <img src="./Brian-Neutral.png" className="cartoon" />
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
      <Card className="full">
        <ContactForm />
      </Card>
    </div>
  );
}
