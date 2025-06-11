import Hero from "@/types/Hero";
import styled from 'styled-components';

export default function HeroSection({ heading, tagline, backgroundImage }: Hero) {
  return (
    <section
      className="flex items-center justify-center bg-gray-200 hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="mx-auto px-10 py-16 text-center">
        <h2 className="hero-subheading">{tagline}</h2>
        <h1 className="hero-heading">{heading}</h1>
      </div>
    </section>
  );
}
