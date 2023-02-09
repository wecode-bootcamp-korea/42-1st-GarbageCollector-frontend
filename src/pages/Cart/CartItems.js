const CartItems = props => {
  const {
    product,
    deleteProduct,
    increaseQuantity,
    decreaseQuantity,
    handleSingleCheck,
    isAllCheck,
  } = props;

  return (
    <div className="CartItems">
      <div className="cartItemContainer">
        <input
          type="checkbox"
          onChange={e => handleSingleCheck(e.target.checked, product.id)}
          checked={isAllCheck.includes(product.id) ? true : false}
          name={product.id}
        />
        <div className="productInfo">
          <span className="itemName">
            <img className="productImg " src={product.itemImg} alt="boracay" />
            <span className="productName">{product.itemName}</span>
          </span>
          <div className="productBtn">
            <button
              className="countBtn"
              onClick={() => decreaseQuantity(product.id)}
            >
              -
            </button>
            <input className="countBox" value={product.quantity} />
            <button
              className="countBtn"
              onClick={() => increaseQuantity(product.id)}
            >
              +
            </button>
          </div>
          <span className="priceAndDelete">
            {product.itemPrice}원
            <button
              className="deleteBtn"
              onClick={() => deleteProduct(product.id)}
            >
              X
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
