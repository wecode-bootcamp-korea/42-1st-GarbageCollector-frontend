import React, { useState, useEffect } from 'react';
import CheckoutList from './CheckoutList';
import './Checkout.scss';

const Checkout = () => {
  const [productList, setProductList] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState([]);

  useEffect(() => {
    fetch('/data/checkout.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setProductList(data));
  }, []);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      productList.forEach(el => idArray.push(el.cartId));
      setIsAllCheck(idArray);
    } else {
      setIsAllCheck([]);
    }
  };

  const totalAmount = productList.reduce(
    (acc, curr) => acc + curr.quantity * curr.productTotalPrice,
    0
  );

  const totalCost =
    productList[0] && typeof productList[0].deliverFee === 'number'
      ? (
          productList[0].deliverFee +
          totalAmount -
          productList[0].discountPrice
        ).toLocaleString()
      : '0';

  //
  // 멘토님께 물어봐야 함
  const discountPrice =
    productList[0] && typeof productList[0].discountPrice === 'number'
      ? (
          productList[0].discountPrice + productList[1].discountPrice
        ).toLocaleString()
      : '0';

  //
  //

  return (
    <div className="cart">
      <main>
        <div className="cart-title">
          <h3>주문서</h3>
        </div>

        <div className="cart-center">
          <div className="main-left">
            <div className="ship-title">배송지</div>
            <div className="shipping">
              <button className="ship-address">배송지 등록하기</button>
            </div>
            <div className="check-all">주문상품</div>

            <div>
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
                  <CheckoutList key={product.cartId} product={product} />
                ))
              )}
            </div>
            <div className="payment-method">
              <span>결제수단</span>
            </div>

            <div className="user-point">
              <input type="checkbox" />
              <span className="use-point">포인트 사용</span>
              <span> : ({productList[0]?.userPoint} point) </span>
            </div>

            <div className="agree-term">
              <span>약관동의</span>
            </div>

            <div className="check-agree">
              <input
                type="checkbox"
                name={productList[0]?.cartId}
                onChange={e => handleAllCheck(e.target.checked)}
                checked={productList.length === isAllCheck.length}
              />
              <span>
                (필수) 구매할 상품의 결제정보(상품명,상품가격)를 확인 하였으며,
                구매진행에 동의합니다.
              </span>
            </div>
            <div className="checkout-end">
              <button className="checkout-end-btn">
                {totalCost}원 결제하기
              </button>
            </div>
          </div>

          <div className="main-right">
            <div className="purchase">
              <div className="price-box">
                <div className="total-price">
                  <p>주문금액</p>
                  <p> {totalAmount.toLocaleString()} 원</p>
                </div>
                <div className="discout-price">
                  <p>┗ 상품할인</p>
                  <p>{discountPrice} 원</p>
                </div>
                <div className="delivery-fee">
                  <p>배송비</p>
                  <p>+{productList[0]?.deliverFee} 원</p>
                </div>
              </div>

              <div className="estimated-amount">
                <p className="total-price-word">총 결제 금액</p>
                <p className="total-price-num">{totalCost}원</p>
              </div>
              <div className="consent">
                <input
                  type="checkbox"
                  className="consent-chkbx"
                  onChange={e => handleAllCheck(e.target.checked)}
                  checked={productList.length === isAllCheck.length}
                />
                <span className="purchase-consent">
                  (필수) 구매할 상품의 결제정보(상품명,상품가격)를 확인
                  하였으며, 구매진행에 동의합니다.
                </span>
              </div>
              <button type="button" className="purchase-btn">
                {totalCost}원 결제하기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
