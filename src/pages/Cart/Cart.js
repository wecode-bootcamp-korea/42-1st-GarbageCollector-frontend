import { useState, useEffect } from 'react';
import React from 'react';
import CartItems from './CartItems';
import './Cart.scss';

// const expectedProductList = [
//   {
//     id: 1,
//     itemImg: '/images/Boracay1.jpeg',
//     itemName: '보라카이 가서 한잔',
//     itemPrice: 15000,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     itemImg: '/images/Boracay1.jpeg',
//     itemName: '보라카이 가서 두잔',
//     itemPrice: 5000,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     itemImg: '/images/Boracay1.jpeg',
//     itemName: '보라카이 가서 세잔',
//     itemPrice: 100000,
//     quantity: 1,
//   },
// ];

const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState([]);

  const deleteProduct = id => {
    const nextProduct = productList.filter(product => product.id !== id);
    alert('상품이 삭제됩니다');
    setProductList(nextProduct);
  };
  //
  //
  const increaseQuantity = id => {
    const nextProductList = productList.map(product => {
      if (product.id === id)
        return { ...product, quantity: product.quantity + 1 };
      else return product;
    });
    setProductList(nextProductList);
  };
  //
  //
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
  //
  //
  const totalAmount = productList.reduce(
    (acc, curr) => acc + curr.quantity * curr.itemPrice,
    0
  );
  const isDisabled = productList.length === 0 ? true : false;
  //
  //
  useEffect(() => {
    fetch('/data/cart.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setProductList(data));
  }, []);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setIsAllCheck(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setIsAllCheck(isAllCheck.filter(el => el !== id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 productList 상태 업데이트
      const idArray = [];
      productList.forEach(el => idArray.push(el.id));
      setIsAllCheck(idArray);
    } else {
      // 전체 선택 해제 시 productList 를 빈 배열로 상태 업데이트
      setIsAllCheck([]);
    }
  };

  const handleDeleteSelected = () => {};

  return (
    <div className="cart">
      <main>
        <div className="cartTitle">
          <h1>장바구니</h1>
        </div>

        <div className="cartCenter">
          <div className="mainLeft">
            <div className="checkAll">
              <input
                type="checkBox"
                name="select-all"
                onChange={e => handleAllCheck(e.target.checked)}
                checked={
                  productList.length === isAllCheck.length ? true : false
                }
              />
              <span>Select All</span>
              <button onClick={handleDeleteSelected}>선택삭제</button>
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
              //
              productList.map(product => (
                <CartItems
                  key={product.id}
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
