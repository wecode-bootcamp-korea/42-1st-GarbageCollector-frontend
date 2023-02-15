import React, { useState, useEffect } from 'react';
import ProductDetailModal from './ProductDetailModal';
import ProductOrderModal from './ProductOrderModal';
import ProductDes from './ProductDes';
import ProductInfoTab from './ProductInfoTab';
import ProductReview from './ProductReview';
import ProductBasicInfo from './ProductBasicInfo';
import ProductRec from './ProductRec';
import { GET_PRODUCT_DETAIL } from '../../config';
import './ProductDetail.scss';

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [optionOpen, setOptionOpen] = useState(false);
  const [optionDetail, setOptionDetail] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productDetailPic, setProductDetailPic] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const { price, discountPrice, productName, productOptions } = optionDetail;

  const discount = Math.floor(Number((price - discountPrice) / price) * 100);

  const getNumber = str => {
    return Number(str);
  };

  const addOptionPrice = amount => {
    if (amount === 0) return;
    if (typeof totalPrice === 'string') {
      setTotalPrice(
        getNumber(
          Number(totalPrice.replace(',', '')) + Number(amount.replace(',', ''))
        )
      );
    } else {
      setTotalPrice(
        getNumber(Number(totalPrice) + Number(amount.replace(',', '')))
      );
    }
  };

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
      option => option.productOptionId !== id
    );
    setSelectedOptions(updatedSelectedOptions);
  };
  useEffect(() => {
    fetch(`${GET_PRODUCT_DETAIL}/products/13`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(({ data }) => {
        setOptionDetail(data[0]);
        setIsLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`${GET_PRODUCT_DETAIL}/products/12`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setProductDetailPic(data[0]);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch('/data/productInfo.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setProductDetailPic(data);
  //     });
  // }, []);

  const convertAmount = amount => {
    return Math.floor(amount).toLocaleString();
  };

  if (isLoading) return null;

  return (
    <div className="detail-container">
      <div className="detail-wrap">
        <div className="detail-header">
          <header className="detail-product-info">
            <span className="product-discount-badge">{discount} % SALE</span>
            <h3 className="product-name">{productName}</h3>
            <p className="product-price">
              <del>{convertAmount(price)}원</del>
              {convertAmount(discountPrice)}원
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
                    productOptions.map(option => {
                      return (
                        <ProductDetailModal
                          key={option.productOptionId}
                          option={option}
                          onSelect={onSelect}
                          showOption={showOption}
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
                    key={option.productOptionId}
                    option={option}
                    removeOrder={removeOrder}
                    selectedOptions={selectedOptions}
                    price={price}
                    convertAmount={convertAmount}
                    discountPrice={discountPrice}
                    addOptionPrice={addOptionPrice}
                  />
                );
              })}
            </ul>

            <div className="total-price-box">
              <dl className="total-price">
                <dt>총 금액</dt>
                <dd>
                  <span>{totalPrice}</span>
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
