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

// FAB for cart
const CartFAB = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #000000;
  color: #A2D5AB;
  border: 3px solid #A2D5AB;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Modal overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: #000;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  font-weight: bold;
  color: #000;
`;

const CartItemPrice = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const CartItemTotal = styled.p`
  font-weight: bold;
  color: #000;
  font-size: 1.1rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: bold;
  color: #000;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #000;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #A2D5AB;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #A2D5AB;
  }
`;

const SuccessMessage = styled.div`
  background-color: #A2D5AB;
  color: #000;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
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
  const { cart, addToCart, removeFromCart, getTotal, getTotalItems, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: ''
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
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

  async function submitOrder() {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      for (const item of cart) {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: formData.customer_name,
            customer_email: formData.customer_email,
            customer_phone: formData.customer_phone,
            product_name: item.product.name,
            product_price: item.product.price,
            quantity: item.quantity
          })
        });
      }
      setSuccess(true);
      clearCart();
      setShowCheckout(false);
      setShowCart(false);
      setFormData({ customer_name: '', customer_email: '', customer_phone: '', address: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          <Title>Butikk</Title>

          {loadingProducts ? (
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

      {/* FAB - Show cart */}
      {cart.length > 0 && !showCart && (
        <CartFAB onClick={() => setShowCart(true)}>
          🛒 Handlekurv ({getTotalItems()})
        </CartFAB>
      )}

      {/* Cart Modal */}
      {showCart && (
        <ModalOverlay onClick={() => setShowCart(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Din Handlekurv</ModalTitle>
              <CloseButton onClick={() => setShowCart(false)}>×</CloseButton>
            </ModalHeader>

            {cart.map((item) => (
              <CartItemRow key={item.product.id}>
                <CartItemInfo>
                  <CartItemName>{item.product.name}</CartItemName>
                  <CartItemPrice>{item.product.price} kr × {item.quantity}</CartItemPrice>
                </CartItemInfo>
                <CartItemTotal>{item.product.price * item.quantity} kr</CartItemTotal>
                <RemoveButton onClick={() => removeFromCart(item.product.id)}>Fjern</RemoveButton>
              </CartItemRow>
            ))}

            <TotalRow>
              <span>Totalt:</span>
              <span>{getTotal()} kr</span>
            </TotalRow>

            {!showCheckout ? (
              <>
                <Button onClick={() => setShowCart(false)} style={{ width: '100%', marginTop: '1.5rem', backgroundColor: '#666' }}>
                  Lukk
                </Button>
                <Button as="a" href="/cart" style={{ width: '100%', marginTop: '0.5rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  Til bestilling
                </Button>
              </>
            ) : (
              <Button onClick={() => setShowCheckout(false)} style={{ width: '100%', marginTop: '0.5rem', backgroundColor: '#666' }}>
                Tilbake
              </Button>
            )}

            {success && (
              <SuccessMessage>
                ✅ Bestilling mottatt! Vi tar kontakt snart.
              </SuccessMessage>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

      <Footer>Kontakt oss: 91773008 | Høl i CV´en - Kaffe, Fellesskap og Recovery</Footer>
    </PageContainer>
  );
}
