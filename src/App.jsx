import Seo from "./components/Seo.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Visit from "./components/Visit.jsx";
import Footer from "./components/Footer.jsx";
import MobileCta from "./components/MobileCta.jsx";
import { salon } from "./config.js";

export default function App() {
  return (
    <>
      <Seo />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />

      <main id="main">
        <div id="top" />
        <Hero />
        <Services />
        <Gallery />
        <Reviews />

        <section id="book" className="book-section">
          <div className="container book-grid">
            <div className="book-intro">
              <span className="section-label">Request an appointment</span>
              <h2 className="section-title">Tell us about your pet</h2>
              <p>
                Fill this out and we’ll open a text message with your details, ready
                to send. We’ll reply to confirm your time and price.
              </p>
              <a href={`tel:${salon.phone}`} className="book-intro__phone">
                {salon.phoneDisplay}
              </a>
            </div>
            <BookingForm />
          </div>
        </section>

        <Visit />
      </main>

      <Footer />
      <MobileCta />
    </>
  );
}
