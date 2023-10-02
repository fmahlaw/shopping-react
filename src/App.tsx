import React, { useState, useEffect } from 'react';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 15 },
  { id: 4, name: 'Product 4', price: 10 },
  { id: 5, name: 'Product 5', price: 5 },
  { id: 6, name: 'Product 6', price: 4 },
  { id: 7, name: 'Product 7', price: 30 },
  { id: 8, name: 'Product 8', price: 2 },


];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const existingCartItem = cart.find(item => item.product.id === product.id);

    if (existingCartItem) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== product.id));
  };

  const incrementQuantity = (product: Product) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (product: Product) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <div >
        <div className='title-prd'>
          <h2>Product List</h2></div>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}</div>
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.product.id} className="cart-item">
                <div className="cart-item-details">
                  <span style={{marginRight:"10px"}} className="cart-item-name">{item.product.name}</span>
                  <span  style={{marginRight:"10px"}} className="cart-item-price">${item.product.price.toFixed(2)}</span>
                  <span  style={{marginRight:"10px"}} className="cart-item-quantity">Quantity: {item.quantity}</span>
              
              
                  <button onClick={() => incrementQuantity(item.product)}>+</button>
                  <button onClick={() => decrementQuantity(item.product)}>-</button>
                  <button onClick={() => removeFromCart(item.product)}>Remove</button>
                 </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="total-cost">Total: ${getTotalCost().toFixed(2)}</p>
        </div>
      </div>
    </div>

  );
};

export default App;
