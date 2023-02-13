import { useState, useEffect } from 'react';
import React from 'react';
import CartItems from './CartItems';
import './Cart.scss';

const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState([]);

  useEffect(() => {
    fetch('/data/cart.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setProductList(data));
  }, []);

  const deleteProduct = cartId => {
    const nextProduct = productList.filter(
      product => product.cartId !== cartId
    );
    alert('상품이 삭제됩니다');
    setProductList(nextProduct);
  };

  const increaseQuantity = cartId => {
    const nextProductList = productList.map(product => {
      if (product.cartId === cartId)
        return { ...product, quantity: product.quantity + 1 };
      else return product;
    });
    setProductList(nextProductList);
  };

  const decreaseQuantity = cartId => {
    const nextProductList = productList.map(product => {
      if (product.cartId === cartId)
        return {
          ...product,
          quantity: product.quantity && product.quantity - 1,
        };
      else return product;
    });
    setProductList(nextProductList);
  };

  const totalAmount = productList.reduce(
    (acc, curr) => acc + curr.quantity * curr.productTotalPrice,
    0
  );
  const isDisabled = productList.length === 0 ? true : false;

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setIsAllCheck(prev => [...prev, id]);
    } else {
      setIsAllCheck(isAllCheck.filter(el => el !== id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      productList.forEach(el => idArray.push(el.cartId));
      setIsAllCheck(idArray);
    } else {
      setIsAllCheck([]);
    }
  };

  const handleDeleteSelected = () => {
    const selectedProductIds = isAllCheck;
    const nextProductList = productList.filter(
      product => !selectedProductIds.includes(product.cartId)
    );
    setProductList(nextProductList);
    setIsAllCheck([]);
    alert('선택한 상품이 삭제되었습니다.');
  };

  const isDisplayNone =
    productList.length === 0 ? 'check-all-display-none' : 'check-all';

  const totalCost =
    productList[0] && typeof productList[0].deliverFee === 'number'
      ? (productList[0].deliverFee + totalAmount).toLocaleString()
      : '0';

  return (
    <div className="cart">
      <main>
        <div className="cart-title">
          <h1>장바구니</h1>
        </div>

        <div className="cart-center">
          <div className="main-left">
            <div className={isDisplayNone}>
              <div>
                <input
                  id="chkbox"
                  type="checkbox"
                  name="select-all"
                  onChange={e => handleAllCheck(e.target.checked)}
                  checked={
                    productList.length === isAllCheck.length ? true : false
                  }
                />

                <span for="chkbox" className="all-select-list">
                  전체 선택
                </span>
              </div>
              <button className="select-delete" onClick={handleDeleteSelected}>
                선택삭제
              </button>
            </div>

            {productList.length === 0 ? (
              <div className="empty-cart">
                <img
                  className="empty-img"
                  alt="empty"
                  src="images/emptyImg.jpg"
                />
              </div>
            ) : (
              productList.map(product => (
                <CartItems
                  key={product.cartId}
                  product={product}
                  deleteProduct={deleteProduct}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  handleSingleCheck={handleSingleCheck}
                  isAllCheck={isAllCheck}
                />
              ))
            )}
          </div>

          <div className="main-right">
            <div className="purchase">
              <div className="price-box">
                <div className="total-price">
                  <p>총 상품금액</p>
                  <p> {totalAmount.toLocaleString()} 원</p>
                </div>
                <div className="delivery-fee">
                  <p>배송비</p>
                  <p>+{productList[0]?.deliverFee} 원</p>
                </div>
              </div>

              <div className="estimated-amount">
                <p>결제예상금액</p>
                <p>{totalCost}원</p>
              </div>
              <button
                type="button"
                className="purchase-btn"
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
