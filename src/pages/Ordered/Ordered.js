import { useState, useEffect } from 'react';
import React from 'react';
import './Ordered.scss';

const Ordered = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('/data/ordered.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setProductList(data));
  }, []);

  const [firstProduct] = productList;

  return (
    <div className="ordered">
      <main>
        <div className="ordered-title">
          <div>
            <span className="complete-order"> ✔ </span>
          </div>

          <div className="comp-order-msg">
            <h3>주문이 완료되었습니다.</h3>
          </div>

          <div>
            <div className="order-number">
              주문번호 : {firstProduct?.orderNumber}
            </div>
          </div>
          <button className="go-main-btn">홈으로 가기</button>
        </div>

        <div className="ordered-center">
          <div className="ordered-main">
            <div className="check-all">주문정보</div>
            <div className="order-info">
              <div className="ordered-product">
                주문상품 :
                <span className="ordered-pr">{firstProduct?.productName}</span>
              </div>

              <div className="ordered-price">
                결제금액 :
                <span className="ordered-pr">
                  {firstProduct?.productTotalPrice} 원
                </span>
              </div>

              <div className="ordered-user">
                배송지 :
                <span className="ordered-name">{firstProduct?.receiver}</span>
                <div className="ordered-address">{firstProduct?.address}</div>
              </div>

              <div className="agree-term">
                <p>﹒주문 취소는 주문내역 상세페이지에서 가능합니다.</p>
                <p>
                  ﹒주문/배송 문의사항이 있을 경우, 1:1 문의 또는 고객센터에
                  남겨주시면 신속히 해결해드리겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ordered;
