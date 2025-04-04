// src/app/page.js
"use client";

import styled, { keyframes, css } from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Toolbar from "../components/Toolbar";

// Spinning animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components
const PageContainer = styled.div`
  background-color: #f5e3a9; /* Match the toolbar's light yellow */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

// Container to wrap all sections for consistent alignment
const SectionContainer = styled.div`
  width: 100%;
  max-width: 1000px; /* Match the max-width of KeywordsContainer for alignment */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Ensure all sections align to the left */
`;

// Hero section (centered)
const HeroSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0; /* Match FestivalWordsSection padding */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center all children */
  justify-content: center;
  width: 100%;
`;

// Other sections (left-aligned)
const Section = styled.section`
  min-height: 60vh;
  padding: 2rem 0; /* Match FestivalWordsSection padding */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align all children to the left */
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #f5e3a9;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h2`
  color: #f5e3a9;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const VinylImage = styled(Image).withConfig({
  shouldForwardProp: (prop) => prop !== "isSpinning",
})<{ isSpinning: boolean }>`
  width: 350px;
  height: 350px;
  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ isSpinning }) =>
    isSpinning &&
    css`
      animation: ${spin} 2s linear infinite;
    `}

  /* Responsive image size */
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

// Content container styled like KeywordsContainer
const ContentContainer = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
`;

// Content word styled like Keyword
interface ContentWordProps {
  style?: {
    fontSize: string;
  };
}

const ContentWord = styled.span<ContentWordProps>`
  color: #000000;
  line-height: 1.4;
  display: inline-block;
  transition: color 0.3s ease;
  font-size: 2.5rem; /* Match Keyword font size */

  &:hover {
    color: #f5e3a9;
  }

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Festival Words section
const FestivalWordsSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FestivalWordsTitle = styled.h2`
  color: #f5e3a9;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const KeywordsContainer = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
`;

interface KeywordProps {
  style: {
    fontSize: string;
  };
}

const Keyword = styled.span<KeywordProps>`
  color: #000000;
  line-height: 1.4;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: #f5e3a9;
  }

  /* Responsive font size based on the item's size */
  @media (max-width: 768px) {
    font-size: ${({ style }) => `calc(${style.fontSize} * 0.8)`};
  }
  @media (max-width: 480px) {
    font-size: ${({ style }) => `calc(${style.fontSize} * 0.6)`};
  }
`;

const Footer = styled.footer`
  background-color: #f5e3a9;
  padding: 1rem;
  color: #000000;
  font-size: 2rem;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Define the type for word objects
interface WordItem {
  word: string;
  size: string;
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);

  // Festival-related words for each section with varying font sizes
  const festivalWords: WordItem[] = [
    { word: "festival", size: "2.5rem" },
    { word: "musikk", size: "1.8rem" },
    { word: "vinyl", size: "2.2rem" },
    { word: "platemesse", size: "2.0rem" },
    { word: "sandvika", size: "2.3rem" },
    { word: "konsert", size: "1.6rem" },
    { word: "artister", size: "2.4rem" },
    { word: "matboder", size: "1.9rem" },
    { word: "kultur", size: "2.1rem" },
    { word: "retro", size: "1.7rem" },
    { word: "samler", size: "2.2rem" },
    { word: "plater", size: "2.5rem" },
    { word: "afterparty", size: "1.8rem" },
    { word: "folkebadet", size: "1.6rem" },
    { word: "hyggelig", size: "2.3rem" },
    { word: "lokal", size: "1.9rem" },
    { word: "te", size: "1.7rem" },
    { word: "kunst", size: "2.0rem" },
    { word: "samfunn", size: "2.2rem" },
    { word: "arrangement", size: "1.8rem" },
    { word: "kadettangen", size: "2.5rem" },
    { word: "gratis", size: "1.6rem" },
    { word: "mai", size: "2.0rem" },
    { word: "høl i cv'en", size: "2.3rem" },
    { word: "k18", size: "1.9rem" },
    { word: "spinning", size: "1.7rem" },
    { word: "nostalgi", size: "2.2rem" },
    { word: "samling", size: "1.8rem" },
    { word: "entusiast", size: "2.5rem" },
    { word: "opplevelse", size: "2.0rem" },
    { word: "vintage", size: "1.9rem" },
    { word: "atmosfære", size: "2.2rem" },
    { word: "lidenskap", size: "1.7rem" },
    { word: "sjeldne", size: "2.3rem" },
    { word: "møte", size: "1.8rem" },
    { word: "flott", size: "1.6rem" },
    { word: "talentfulle", size: "2.5rem" },
    { word: "lokale", size: "2.0rem" },
    { word: "sosiale medier", size: "1.9rem" },
    { word: "oppdateringer", size: "2.2rem" },
    { word: "sniktitter", size: "1.7rem" },
    { word: "feiring", size: "2.3rem" },
    { word: "utforske", size: "1.8rem" },
    { word: "samleobjekter", size: "2.5rem" },
    { word: "kafé", size: "1.6rem" },
    { word: "stemning", size: "2.0rem" },
    { word: "tradisjon", size: "2.2rem" },
    { word: "glede", size: "1.9rem" },
  ].sort((a, b) => a.word.localeCompare(b.word, "no"));

  // Words for the Home section with varying font sizes
  const homeWords: WordItem[] = [
    { word: "vintage", size: "2.5rem" },
    { word: "platemesse", size: "2.0rem" },
    { word: "10. og 11. mai", size: "1.8rem" },
    { word: "kl. 11:00–16:00", size: "1.6rem" },
    { word: "høl i cv'en", size: "2.2rem" },
    { word: "k18", size: "1.7rem" },
    { word: "gratis inngang", size: "2.3rem" },
  ];

  // Words for the About section with varying font sizes
  const aboutWords: WordItem[] = [
    { word: "sandvika platemesse", size: "2.5rem" },
    { word: "feiring", size: "1.8rem" },
    { word: "vintage musikk", size: "2.0rem" },
    { word: "kultur", size: "1.6rem" },
    { word: "sjeldne vinylplater", size: "2.3rem" },
    { word: "lidenskapelige samlere", size: "2.2rem" },
    { word: "hyggelig atmosfære", size: "1.9rem" },
    { word: "flott musikk", size: "1.7rem" },
    { word: "lokal mat", size: "2.1rem" },
  ];

  // Words for the Events section with varying font sizes
  const eventsWords: WordItem[] = [
    { word: "10. og 11. mai", size: "2.5rem" },
    { word: "kl. 11:00 til 16:00", size: "1.8rem" },
    { word: "høl i cv'en", size: "2.2rem" },
    { word: "k18", size: "1.6rem" },
    { word: "hyggelig atmosfære", size: "2.3rem" },
    { word: "talentfulle artister", size: "2.0rem" },
    { word: "lokale matboder", size: "1.9rem" },
    { word: "afterparty", size: "1.7rem" },
    { word: "vinylspinning", size: "2.1rem" },
    { word: "folkebadet", size: "1.8rem" },
  ];

  // Words for the Contact section with varying font sizes
  const contactWords: WordItem[] = [
    { word: "informasjon", size: "2.5rem" },
    { word: "meld deg på", size: "1.8rem" },
    { word: "91773008", size: "2.0rem" },
    { word: "sosiale medier", size: "1.6rem" },
    { word: "oppdateringer", size: "2.2rem" },
    { word: "sniktitter", size: "1.7rem" },
    { word: "arrangementet", size: "2.3rem" },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          {/* Home Section (Hero) */}
          <HeroSection id="home">
            <Title>Sandvika Platemesse</Title>
            <ContentContainer>
              {homeWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
            <VinylImage
              src="/image/vinyl.png"
              alt="Vinylplate"
              width={200}
              height={200}
              isSpinning={isSpinning}
              onClick={() => setIsSpinning(!isSpinning)}
              onMouseEnter={() => setIsSpinning(true)}
              onMouseLeave={() => setIsSpinning(false)}
            />
          </HeroSection>

          {/* About Section */}
          <Section id="about">
            <SubTitle>Om Oss</SubTitle>
            <ContentContainer>
              {aboutWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* Events Section */}
          <Section id="events">
            <SubTitle>Arrangementer</SubTitle>
            <ContentContainer>
              {eventsWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* Contact Section */}
          <Section id="contact">
            <SubTitle>Kontakt</SubTitle>
            <ContentContainer>
              {contactWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* Festival Words Section */}
          <FestivalWordsSection id="festival-words">
            <FestivalWordsTitle>Festivalord</FestivalWordsTitle>
            <KeywordsContainer>
              {festivalWords.map((item, index) => (
                <Keyword key={index} style={{ fontSize: item.size }}>
                  {item.word}
                </Keyword>
              ))}
            </KeywordsContainer>
          </FestivalWordsSection>
        </SectionContainer>
      </MainContent>
      <Footer>Meld deg på: 91773008 | Drevet av Sandvika</Footer>
    </PageContainer>
  );
}