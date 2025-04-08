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

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("/image/newspaper.png");
  background-size: 100%;
  background-position: center;
  background-repeat: repeat;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    z-index: 2;
  }

  > * {
    position: relative;
    z-index: 3;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeroSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Section = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #ffffff;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h2`
  color: #ffffff;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HØLICVEN = styled(Image).withConfig({
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

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  opacity: 0.9;
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
`;

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
  font-size: 2.5rem;

  &:hover {
    color: #A2D5AB;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FestivalWordsSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FestivalWordsTitle = styled.h2`
  color: #ffffff;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

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
    color: #A2D5AB;
  }

  @media (max-width: 768px) {
    font-size: ${({ style }) => `calc(${style.fontSize} * 0.8)`};
  }
  @media (max-width: 480px) {
    font-size: ${({ style }) => `calc(${style.fontSize} * 0.6)`};
  }
`;

const Footer = styled.footer`
  background-color: #A2D5AB;
  padding: 1rem;
  color: #000000;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

interface WordItem {
  word: string;
  size: string;
}

// Updated festival-related words to reflect Høl i CV’en’s broader activities
const festivalWords: WordItem[] = [
  { word: "høl i cv'en", size: "2.5rem" },
  { word: "sandvika", size: "2.0rem" },
  { word: "kaffe", size: "1.8rem" },
  { word: "matvogn", size: "1.6rem" },
  { word: "kafe", size: "2.3rem" },
  { word: "samfunn", size: "1.9rem" },
  { word: "arbeidstrening", size: "2.2rem" },
  { word: "fellesskap", size: "2.0rem" },
  { word: "recovery", size: "2.4rem" },
  { word: "bærum kommune", size: "1.9rem" },
  { word: "mental helse", size: "1.7rem" },
  { word: "rusmestring", size: "2.1rem" },
  { word: "kvalitet", size: "1.8rem" },
  { word: "etiopiske bønner", size: "1.6rem" },
  { word: "den gyldne bønne", size: "2.2rem" },
  { word: "platemesse", size: "1.9rem" },
  { word: "musikk", size: "2.3rem" },
  { word: "kultur", size: "2.0rem" },
  { word: "lokal støtte", size: "1.8rem" },
  { word: "bærekraft", size: "1.7rem" },
  { word: "inkludering", size: "2.2rem" },
  { word: "sosialt arbeid", size: "2.5rem" },
  { word: "nettverk", size: "1.9rem" },
  { word: "håp", size: "2.0rem" },
  { word: "tilhørighet", size: "2.2rem" },
  { word: "arrangement", size: "1.8rem" },
  { word: "sandvika platemesse", size: "2.2rem" },
  { word: "entusiast", size: "2.5rem" },
  { word: "opplevelse", size: "2.0rem" },
  { word: "kaffekultur", size: "1.9rem" },
  { word: "atmosfære", size: "2.2rem" },
  { word: "lidenskap", size: "1.7rem" },
  { word: "mestring", size: "2.5rem" },
  { word: "lokale", size: "2.0rem" },
  { word: "samhold", size: "2.3rem" },
  { word: "kvalitetskaffe", size: "2.5rem" },
  { word: "stemning", size: "2.0rem" },
  { word: "tradisjon", size: "2.2rem" },
  { word: "glede", size: "1.9rem" },
].sort((a, b) => a.word.localeCompare(b.word, "no"));

// Updated Home section words to introduce Høl i CV’en
const homeWords: WordItem[] = [
  { word: "høl i cv'en", size: "2.5rem" },
  { word: "kaffe og fellesskap", size: "2.0rem" },
  { word: "sandvika", size: "1.8rem" },
  { word: "arbeidstrening", size: "2.2rem" },
  { word: "recovery", size: "1.7rem" },
  { word: "bærum kommune", size: "2.3rem" },
];

// Updated About section words to describe Høl i CV’en’s mission in more detail
const aboutWords: WordItem[] = [
  { word: "høl i cv'en", size: "2.5rem" },
  { word: "støtte og mestring", size: "2.0rem" },
  { word: "kaffe av kvalitet", size: "1.9rem" },
  { word: "matvogn og kafe", size: "2.3rem" },
  { word: "mental helse", size: "1.8rem" },
  { word: "rusmestring", size: "1.7rem" },
  { word: "fellesskap", size: "2.2rem" },
  { word: "inkludering", size: "2.0rem" },
  { word: "lokal støtte", size: "1.9rem" },
  { word: "arbeidstrening", size: "2.1rem" },
  { word: "recovery", size: "1.8rem" },
  { word: "sandvika", size: "2.0rem" },
  { word: "bærum kommune", size: "1.9rem" },
  { word: "sosialt arbeid", size: "2.2rem" },
  { word: "kaffekultur", size: "1.7rem" },
  { word: "etiopiske bønner", size: "1.8rem" },
  { word: "den gyldne bønne", size: "2.0rem" },
  { word: "bærekraft", size: "1.9rem" },
  { word: "samhold", size: "2.1rem" },
  { word: "mestring", size: "1.8rem" },
  { word: "tilhørighet", size: "2.0rem" },
  { word: "kvalitetssikring", size: "1.9rem" },
  { word: "lokale partnerskap", size: "2.2rem" },
  { word: "håp og glede", size: "1.7rem" },
  { word: "sosial inkludering", size: "2.1rem" },
  { word: "kaffeopplæring", size: "1.8rem" },
  { word: "samfunnsbygging", size: "2.0rem" },
];

// Updated Events section words to highlight Høl i CV’en’s events
const eventsWords: WordItem[] = [
  { word: "sandvika platemesse", size: "2.5rem" },
  { word: "10. og 11. mai", size: "1.8rem" },
  { word: "høl i cv'en", size: "2.2rem" },
  { word: "k18", size: "1.6rem" },
  { word: "kulturelle arrangementer", size: "2.3rem" },
  { word: "musikk og vinyl", size: "2.0rem" },
  { word: "kaffeservering", size: "1.9rem" },
  { word: "kadettangen 18", size: "2.1rem" },
  { word: "kl. 11-16.00", size: "1.8rem" },
  { word: "samfunn og glede", size: "1.7rem" },
];

// Updated Contact section words for Høl i CV’en’s contact info
const contactWords: WordItem[] = [
  { word: "kontakt oss", size: "2.5rem" },
  { word: "91773008", size: "2.0rem" },
  { word: "høl i cv'en", size: "2.2rem" },
  { word: "sandvika kafe", size: "2.3rem" },
  { word: "bærum kommune", size: "1.9rem" },
  { word: "bli med", size: "1.8rem" },
];

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          {/* Home Section (Hero) */}
          <HeroSection id="home">
            <Title>Høl i CV´en</Title>
            <ContentContainer>
              {homeWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
            <HØLICVEN
              src="/image/HØLICVEN.png"
              alt="HØL I CVEN"
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
            <FestivalWordsTitle>Våre Verdier</FestivalWordsTitle>
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
      <Footer>Kontakt oss: 91773008 | Høl i CV´en - Kaffe, Fellesskap og Recovery</Footer>
    </PageContainer>
  );
}