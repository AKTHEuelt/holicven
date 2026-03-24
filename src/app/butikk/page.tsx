// src/app/butikk/page.tsx
"use client";

import styled from "styled-components";
import Toolbar from "../../components/Toolbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

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
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #000000;
  color: #A2D5AB;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
  }
`;

const CartLink = styled(Link)`
  display: inline-block;
  background-color: #A2D5AB;
  color: #000000;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #8bc49a;
    transform: translateY(-2px);
  }
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function Butikk() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, getTotalItems } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  function getCategoryEmoji(category: string) {
    switch (category) {
      case 'kaffe': return '☕';
      case 'bønner': return '🫘';
      case 'tilbehør': return '🛍️';
      case 'abonnement': return '📦';
      case 'gave': return '🎁';
      default: return '☕';
    }
  }

  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          <Title>Butikk</Title>

          {loading ? (
            <p style={{ color: '#000', fontSize: '1.5rem' }}>Laster produkter...</p>
          ) : (
            <>
              <ProductGrid>
                {products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage>{getCategoryEmoji(product.category)}</ProductImage>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductPrice>{product.price} kr</ProductPrice>
                    <Button onClick={() => addToCart(product)}>
                      Legg i handlekurv
                    </Button>
                  </ProductCard>
                ))}
              </ProductGrid>

              {products.length === 0 && (
                <p style={{ color: '#333', fontSize: '1.5rem', textAlign: 'center', padding: '3rem' }}>
                  Ingen produkter tilgjengelig for øyeblikket. Sjekk tilbake snart! ☕
                </p>
              )}
            </>
          )}
        </SectionContainer>
      </MainContent>

      <Footer>Kontakt oss: 91773008 | Høl i CV´en - Kaffe, Fellesskap og Recovery</Footer>
    </PageContainer>
  );
}
