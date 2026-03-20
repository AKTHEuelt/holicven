// src/app/butikk/page.tsx
"use client";

import styled from "styled-components";
import Toolbar from "../../components/Toolbar";
import Image from "next/image";

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("/newspaper.png");
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
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: #ffffff;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  opacity: 0.95;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: #A2D5AB;
  border-radius: 50%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

const ProductName = styled.h3`
  color: #000000;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const ProductDescription = styled.p`
  color: #333333;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ProductPrice = styled.p`
  color: #A2D5AB;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 6px;
`;

const ComingSoonText = styled.p`
  color: #000000;
  font-size: 2rem;
  text-align: center;
  padding: 3rem;
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 8px;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #A2D5AB;
  padding: 1rem;
  color: #000000;
  font-size: 2rem;
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default function Butikk() {
  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          <Title>Butikk</Title>
          
          <ProductGrid>
            <ProductCard>
              <ProductImage>☕</ProductImage>
              <ProductName>Etiopia Yirgacheffe</ProductName>
              <ProductDescription>
                Lysrosta kaffe med blomsteraktige toner av jasmin og sitrus. Fra høylandet i Etiopia.
              </ProductDescription>
              <ProductPrice>149 kr / 250g</ProductPrice>
            </ProductCard>

            <ProductCard>
              <ProductImage>☕</ProductImage>
              <ProductName>Colombia Huila</ProductName>
              <ProductDescription>
                Middelsrosta kaffe med balansert smak av karamell, sjokolade og nøtter.
              </ProductDescription>
              <ProductPrice>139 kr / 250g</ProductPrice>
            </ProductCard>

            <ProductCard>
              <ProductImage>☕</ProductImage>
              <ProductName>Guatemala Antigua</ProductName>
              <ProductDescription>
                Mørkrosta kaffe med fyldig smak av mørk sjokolade og en hint av krydder.
              </ProductDescription>
              <ProductPrice>149 kr / 250g</ProductPrice>
            </ProductCard>

            <ProductCard>
              <ProductImage>🫘</ProductImage>
              <ProductName>Bønne-pakke</ProductName>
              <ProductDescription>
                Utvalgte bønner fra våre favorittbønder. Perfekt for hjemmebrygging.
              </ProductDescription>
              <ProductPrice>299 kr / 500g</ProductPrice>
            </ProductCard>

            <ProductCard>
              <ProductImage>🎁</ProductImage>
              <ProductName>Gaveeske</ProductName>
              <ProductDescription>
                Elegant gaveeske med 3 ulike kaffesorter. Perfekt gave til kaffelskeren.
              </ProductDescription>
              <ProductPrice>399 kr</ProductPrice>
            </ProductCard>

            <ProductCard>
              <ProductImage>📦</ProductImage>
              <ProductName>Månedens Kaffe</ProductName>
              <ProductDescription>
                Abonnement på vår månedlige spesialkaffe. Leveres direkte til døren.
              </ProductDescription>
              <ProductPrice>199 kr / mnd</ProductPrice>
            </ProductCard>
          </ProductGrid>

          <ComingSoonText style={{ marginTop: "2rem" }}>
            Flere produkter kommer snart! Hold deg oppdatert. ☕
          </ComingSoonText>
        </SectionContainer>
      </MainContent>
      <Footer>Kontakt oss: 91773008 | Høl i CV´en - Kaffe, Fellesskap og Recovery</Footer>
    </PageContainer>
  );
}
