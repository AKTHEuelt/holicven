"use client";

import styled from "styled-components";
import Toolbar from "../../components/Toolbar";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

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
  gap: 2rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: #ffffff;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CartContainer = styled.div`
  background-color: #ffffff;
  opacity: 0.95;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #A2D5AB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: #000000;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

const ItemDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const ItemPrice = styled.p`
  color: #333;
  font-size: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #000;
  background: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const Quantity = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const ItemTotal = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  min-width: 120px;
  text-align: right;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;

  &:hover {
    color: #dc2626;
  }
`;

const Summary = styled.div`
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  width: 100%;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 2px solid #000;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: #000000;
  color: #A2D5AB;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: #A2D5AB;
  color: #000;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  text-transform: uppercase;
  margin-top: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #8bc49a;
  }
`;

const FormContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #ddd;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #A2D5AB;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #A2D5AB;
  }
`;

const SuccessMessage = styled.div`
  background-color: #A2D5AB;
  color: #000;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const EmptyCart = styled.div`
  background-color: #ffffff;
  opacity: 0.95;
  border-radius: 12px;
  padding: 4rem;
  text-align: center;
  width: 100%;
`;

const EmptyText = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
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

export default function CartPage() {
  const { cart, removeFromCart, getTotal, getTotalItems, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: ''
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setFormData({ customer_name: '', customer_email: '', customer_phone: '', address: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
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
          <Title>Handlekurv</Title>

          {cart.length === 0 ? (
            <EmptyCart>
              <EmptyText>Din handlekurv er tom</EmptyText>
              <SecondaryButton href="/butikk">Tilbake til butikken</SecondaryButton>
            </EmptyCart>
          ) : (
            <>
              <CartContainer>
                {cart.map((item) => (
                  <CartItem key={item.product.id}>
                    <ItemInfo>
                      <ItemImage>{getCategoryEmoji(item.product.category)}</ItemImage>
                      <ItemDetails>
                        <ItemName>{item.product.name}</ItemName>
                        <ItemDescription>{item.product.description}</ItemDescription>
                        <ItemPrice>{item.product.price} kr per stk</ItemPrice>
                        <RemoveButton onClick={() => removeFromCart(item.product.id)}>
                          Fjern
                        </RemoveButton>
                      </ItemDetails>
                    </ItemInfo>
                    <QuantityControls>
                      <ItemTotal>{item.product.price * item.quantity} kr</ItemTotal>
                    </QuantityControls>
                  </CartItem>
                ))}

                <Summary>
                  <SummaryRow>
                    <span>Antall varer:</span>
                    <span>{getTotalItems()}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Totalt:</span>
                    <span>{getTotal()} kr</span>
                  </SummaryRow>
                </Summary>
              </CartContainer>

              {!showCheckout ? (
                <Button onClick={() => setShowCheckout(true)}>
                  Til betaling
                </Button>
              ) : (
                <CartContainer>
                  <FormContainer>
                    <FormTitle>Leveringsinformasjon</FormTitle>
                    <FormInput
                      type="text"
                      placeholder="Navn *"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    />
                    <FormInput
                      type="email"
                      placeholder="E-post *"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    />
                    <FormInput
                      type="tel"
                      placeholder="Telefon *"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    />
                    <FormTextarea
                      placeholder="Leveringsadresse ( gate, postnummer, sted )"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <Button onClick={submitOrder} disabled={loading}>
                      {loading ? 'Sender bestilling...' : 'Bestill nå!'}
                    </Button>
                    <Button onClick={() => setShowCheckout(false)} style={{ backgroundColor: '#666' }}>
                      Tilbake til handlekurv
                    </Button>
                  </FormContainer>
                </CartContainer>
              )}

              {success && (
                <SuccessMessage>
                  ✅ Bestillingen er mottatt! Vi tar kontakt snart for bekreftelse.
                </SuccessMessage>
              )}
            </>
          )}
        </SectionContainer>
      </MainContent>
      <Footer>Kontakt oss: 91773008 | Høl i CV´en - Kaffe, Fellesskap og Recovery</Footer>
    </PageContainer>
  );
}
