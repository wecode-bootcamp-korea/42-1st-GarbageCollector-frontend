import React, { useState, useEffect } from 'react';
import ProductDetailModal from './ProductDetailModal';
import ProductOrderModal from './ProductOrderModal';
import './ProductDetail.scss';

const ProductDetail = () => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [optionDetail, setOptionDetail] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const showOption = () => {
    setOptionOpen(!optionOpen);
  };

  const onSelect = option => {
    setSelectedOptions(prevState => {
      const set = new Set([...prevState, option]);
      return [...set];
    });
    setOptionOpen(false);
  };

  const removeOrder = id => {
    const updatedSelectedOptions = selectedOptions.filter(
      option => option.id !== id
    );
    setSelectedOptions(updatedSelectedOptions);
  };

  useEffect(() => {
    fetch('/data/optionModal.json')
      .then(response => response.json())
      .then(data => setOptionDetail(data));
  }, []);

  return (
    <div className="detail-container">
      <div className="detail-wrap">
        <div className="detail-header">
          <header className="detail-product-info">
            <span className="product-discount-badge">할인율% SALE</span>
            <h3 className="product-name">
              보라카이 가서 투명한 바다볼사람. 보기만하는거임
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
                      <button className="option-btn" onClick={showOption}>
                        옵션
                      </button>
                      <div className="option-box">
                        {optionOpen &&
                          optionDetail.map(option => {
                            return (
                              <ProductDetailModal
                                key={option.id}
                                option={option}
                                // optionOpen={optionOpen}
                                onSelect={onSelect}
                                // showOption={showOption}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <ul className="buy-list-box">
              {selectedOptions.map(option => {
                return (
                  <ProductOrderModal
                    key={option.id}
                    option={option}
                    removeOrder={removeOrder}
                    selectedOptions={selectedOptions}
                  />
                );
              })}
            </ul>

            {/* <ul className="buy-list-box">
              {optionDetail.map(option => {
                return option.id === orderListIndex ? (
                  <ProductOrderModal
                    key={option.id}
                    option={optionDetail[orderListIndex]}
                    // removeOrder={removeOrder}
                    // handleOption={handleOption}
                  />
                ) : null;
              })}
            </ul> */}
            <div className="total-price-box">
              <dl className="total-price">
                <dt>총 금액</dt>
                <dd>
                  <span>총금액 데이터올 자리(OO원)</span>
                </dd>
              </dl>
              <footer className="buy-footer">
                <button className="list-cart-btn" />
                <button className="list-purchase-btn">바로 구매하기</button>
              </footer>
            </div>
          </div>
        </div>
        <div className="detail-des">
          <div className="datail-tab-wrap">
            <ul className="detail-tab">
              <li>상품정보</li>
              <li>기본정보</li>
              <li>상품후기</li>
            </ul>
          </div>
          <article className="detail-body">
            <h1>상세정보 올 자리</h1>
          </article>
        </div>
      </div>
      <div className="how-about-this">
        <h3>이건어때요 올 자리</h3>
      </div>
    </div>
  );
};

export default ProductDetail;
