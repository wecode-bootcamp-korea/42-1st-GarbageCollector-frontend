import React from 'react';
import './ProductDetail.scss';

const ProductDetail = () => {
  return (
    <div className="detail-container">
      <div className="detail-wrap">
        <div className="detail-header">
          <header className="detail-product-info">
            <span className="product-discount-badge">할인율% SALE</span>
            <h3 className="product-name">
              상품이름 올 자리 일부러 길게해봄 룰룰루
            </h3>
            <p className="product-price">
              <del>900,000원</del>750,000원
            </p>
          </header>

          <div className="detail-images">
            <img
              className="detail-product-img"
              src="/images/Summer.jpeg"
              alt="여름"
            />
          </div>

          <div className="detail-for-order">
            <dl className="shipping-guide">
              <dt>배송정보</dt>
              <dd>
                3,000원 (30,000원 이상 구매 시 무료)
                <br />
                오후 1시 당일배송마감
              </dd>
            </dl>
            <section className="product-buy-section">
              <div className="product-buy-content">
                <div className="product-buy-wrap">
                  <div className="buy-list-box">
                    <div className="buy-list-option">
                      <button className="option-btn">옵션</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="buy-list">
              <p>옵션을 추가한 후 선택한 list 나올 자리</p>
            </div>
            <div className="total-price-box">
              <dl className="total-price">
                <dt>총 금액</dt>
                <dd>
                  <span>총금액 데이터올 자리(OO원)</span>
                </dd>
              </dl>
              <footer className="buy-footer">
                <button className="list-cart-btn">
                  <img
                    className="cart-icon"
                    src="/images/cartIcon.png"
                    alt="장바구니"
                  />
                </button>
                <button className="list-purchase-btn">바로 구매하기</button>
              </footer>
            </div>
          </div>
        </div>

        <ul className="detail-tab">
          <li>상품정보</li>
          <li>기본정보</li>
          <li>상품후기</li>
        </ul>
        <article className="detail-body">
          <h1>상세정보 올 자리</h1>
        </article>
      </div>
      <div className="how-about-this">
        <h3>이건어때요 올 자리</h3>
      </div>
    </div>
  );
};

export default ProductDetail;
