import { useState, useEffect } from 'react';
import React from 'react';
import CartItems from './CartItems';
import './Cart.scss';

const Cart = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('/data/cart.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setProductList(data));
  }, []);

  const deleteProduct = id => {
    const nextProduct = productList.filter(product => product.id !== id);
    alert('상품이 삭제됩니다');
    setProductList(nextProduct);
  };

  const increaseQuantity = id => {
    const nextProductList = productList.map(product => {
      if (product.id === id)
        return { ...product, quantity: product.quantity + 1 };
      else return product;
    });
    setProductList(nextProductList);
  };

  const decreaseQuantity = id => {
    const nextProductList = productList.map(product => {
      if (product.id === id)
        return {
          ...product,
          quantity: product.quantity && product.quantity - 1,
        };
      else return product;
    });
    setProductList(nextProductList);
  };

  const totalAmount = productList.reduce(
    (acc, curr) => acc + curr.quantity * curr.itemPrice,
    0
  );
  const isDisabled = productList.length === 0 ? true : false;

  return (
    <div className="cart">
      <main>
        <div className="cartTitle">
          <h1>장바구니</h1>
        </div>

        <div className="cartCenter">
          <div className="mainLeft">
            <div className="checkAll">
              <input type="checkBox" className="checkAllBox" />
              <span className="selectAll">전체선택</span>
            </div>
            {productList.length === 0 ? (
              <div className="emptyCart">
                <img
                  className="emptyImg"
                  alt="empty"
                  src="images/emptyImg.jpg"
                />
              </div>
            ) : (
              productList.map(product => (
                <CartItems
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))
            )}
          </div>

          <div className="mainRight">
            <div className="purchase">
              <div className="priceBox">
                <div className="totalPrice">
                  <p>총 상품금액</p>
                  <p> {totalAmount.toLocaleString()} 원</p>
                </div>
                <div className="deliveryFee">
                  <p>배송비</p>
                  <p>원</p>
                </div>
              </div>

              <div className="estimatedAmount">
                <p>결제예상금액</p>
                <p>{totalAmount.toLocaleString()} 원</p>
              </div>
              <button
                type="button"
                className="purchaseBtn"
                disabled={isDisabled}
              >
                주문하기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
