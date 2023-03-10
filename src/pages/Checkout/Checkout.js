import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import CheckoutList from './CheckoutList';
import UserInfo from './UserInfo';
import './Checkout.scss';

const Checkout = () => {
  const [productList, setProductList] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isAllCheck, setIsAllCheck] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [getPayment, setGetPayment] = useState([]);
  const [inputs, setInputs] = useState({
    userName: '',
    userPw: '',
    userAddress: '',
    userComment: '',
  });
  const [receiveData, setReceiveData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  // const { state } = location.state;
  // console.log(location.state);
  useEffect(() => {
    fetch(`${BASE_URL}:3000/orders/orderform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnYXJiYWdlQ29sbGVjdG9Pd25lciIsInN1YiI6ImdhcmJhZ2VXb3JsZCIsImlhdCI6MTY3NjYwNDE0NCwiZXhwIjoxNjc2NjkwNTQ0LCJ1c2VySWQiOjE1fQ.vsFvb3X8akL_FSQw4gPsLFkBhAslBTAWvoIUpLorHiM',
      },
      body: JSON.stringify([
        {
          cartId: location.state[0][0].cartId,
          productOptionId: location.state[0][0].productOptionId,
          quantity: location.state[0][0].quantity,
        },
        {
          cartId: location.state[0][1].cartId,
          productOptionId: location.state[0][1].productOptionId,
          quantity: location.state[0][1].quantity,
        },
      ]),
    })
      .then(res => res.json())
      .then(({ data }) => {
        setProductList(data.productOptions);
        setGetPayment(data);
      });
  }, [location.state]);

  const onChangeInput = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onClickBtnPay = () => {
    navigate('/ordered', { state: inputs });
  };

  const onClickSubmitInfo = () => {
    setUserInfo([...userInfo, inputs]);
    setInputs({ userName: '', userPw: '', userAddress: '', userComment: '' });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  const userPoint = Number(getPayment.userPoint).toLocaleString();
  const cartId = productList.cartId;
  const totalAmount = productList.reduce(
    (acc, curr) => acc + curr.quantity * curr.productPriceBeforeDiscount,
    0
  );
  const totalDiscount = productList.reduce((accur, current) => {
    return accur + current.discountPrice;
  }, 0);

  // const totalCost =
  //   typeof deliveryFee === 'number'
  //     ? (deliveryFee + totalAmount - totalDiscount).toLocaleString()
  //     : '0';
  const totalCost = getPayment.checkTotalPrice;

  const discountPrice = getPayment.discount;
  // productList && typeof productList.discountPrice === 'number'
  //   ? (productList.discountPrice + productList.discountPrice).toLocaleString()
  //   : '0';

  return (
    <div className="checkout">
      <main>
        <div className="checkout-title">
          <h3>?????????</h3>
        </div>

        <div className="checkout-center">
          <div className="checkout-left">
            <div className="ship-title">?????????</div>
            <div className="shipping">
              <div className="info-of-user">
                {userInfo.map(
                  ({ userName, userPw, userAddress, userComment }) => (
                    <div key={userAddress}>
                      <p className="user-name">{userName}</p>
                      <p calssName="user-pw">{userPw}</p>
                      <p calssName="user-address">{userAddress}</p>
                      <p calssName="user-comment">[{userComment}]</p>
                    </div>
                  )
                )}
              </div>
              <div>
                <div
                  style={{ display: userInfo.length > 0 ? 'none' : 'block' }}
                >
                  <button className="ship-address" onClick={handleOpenModal}>
                    ????????? ????????????
                  </button>
                </div>

                <div className={isModalOpen ? 'modal open' : 'modal'}>
                  <UserInfo
                    inputs={inputs}
                    onChangeInput={onChangeInput}
                    onClickSubmitInfo={onClickSubmitInfo}
                    onCloseModal={handleCloseModal}
                  />
                </div>
              </div>
            </div>
            <div className="order-product">????????????</div>

            <div>
              {productList.length === 0 ? (
                <div className="empty-product" />
              ) : (
                productList.map(product => (
                  <CheckoutList key={product.cartId} product={product} />
                ))
              )}
            </div>

            <div className="payment-method">
              <span>????????????</span>
            </div>

            <div className="user-point">
              <input type="checkbox" />
              <span className="use-point">????????? ??????</span>
              <span> : ({userPoint} point) </span>
            </div>

            <div className="agree-term">
              <span>????????????</span>
            </div>

            <div className="check-agree">
              <input
                type="checkbox"
                name={cartId}
                onChange={e => handleAllCheck(e.target.checked)}
                checked={productList.length === isAllCheck.length}
              />
              <span>
                (??????) ????????? ????????? ????????????(?????????,????????????)??? ?????? ????????????,
                ??????????????? ???????????????.
              </span>
            </div>
            <div className="checkout-end">
              <button className="checkout-end-btn">
                {totalCost}??? ????????????
              </button>
            </div>
          </div>

          <div className="checkout-right">
            <div className="purchase">
              <div className="price-box">
                <div className="total-price">
                  <p>????????????</p>
                  <p> {totalAmount.toLocaleString()} ???</p>
                </div>
                <div className="discout-price">
                  <p>??? ????????????</p>
                  <p>{discountPrice} ???</p>
                </div>
                <div className="delivery-fee">
                  <p>?????????</p>
                  <p>+{deliveryFee} ???</p>
                </div>
              </div>

              <div className="estimated-amount">
                <p className="total-price-word">??? ?????? ??????</p>
                <p className="total-price-num">{totalCost}???</p>
              </div>
              <div className="consent">
                <input
                  type="checkbox"
                  className="consent-chkbx"
                  onChange={e => handleAllCheck(e.target.checked)}
                  checked={productList.length === isAllCheck.length}
                />
                <span className="purchase-consent">
                  (??????) ????????? ????????? ????????????(?????????,????????????)??? ??????
                  ????????????, ??????????????? ???????????????.
                </span>
              </div>
              <button
                type="button"
                onClick={onClickBtnPay}
                className="purchase-btn"
              >
                {totalCost}??? ????????????
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
