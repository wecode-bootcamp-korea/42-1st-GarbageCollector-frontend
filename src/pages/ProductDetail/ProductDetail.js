import React, { useState, useEffect } from 'react';
import ProductDetailModal from './ProductDetailModal';
import ProductOrderModal from './ProductOrderModal';
import ProductDes from './ProductDes';
import ProductInfoTab from './ProductInfoTab';
import ProductReview from './ProductReview';
import ProductBasicInfo from './ProductBasicInfo';
import ProductRec from './ProductRec';
import './ProductDetail.scss';

const ProductDetail = () => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [optionDetail, setOptionDetail] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productDetailPic, setProductDetailPic] = useState([]);

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

  useEffect(() => {
    fetch('/data/productInfo.json')
      .then(response => response.json())
      .then(data => setProductDetailPic(data));
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
            {SHIPPING_GUIDE.map(shipping => {
              return (
                <dl key={shipping.id} className="shipping-guide">
                  <dt>{shipping.topic}</dt>
                  <dd>
                    {shipping.text}
                    <br />
                    {shipping.text2}
                  </dd>
                </dl>
              );
            })}

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
                          onSelect={onSelect}
                        />
                      );
                    })}
                </div>
              </div>
            </div>

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
          <div className="detail-tab-wrap">
            <ul className="detail-tab">
              <ProductDes />
            </ul>
          </div>
          <section className="detail-body">
            <ul>
              {productDetailPic.map(info => {
                return <ProductInfoTab key={info.id} info={info} />;
              })}
            </ul>
            <ProductBasicInfo />
            <ProductReview />
          </section>
        </div>
      </div>
      <div>
        <ProductRec />
      </div>
    </div>
  );
};

export default ProductDetail;

const SHIPPING_GUIDE = [
  {
    id: 1,
    topic: '배송정보',
    text: '3,000원 (30,000원 이상 구매 시 무료)',
    text2: '오후 1시 당일배송마감',
  },
];
