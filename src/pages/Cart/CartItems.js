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
    <div className="Cart-items">
      <div className="cart-item-container">
        <input
          type="checkbox"
          onChange={e => handleSingleCheck(e.target.checked, product.id)}
          checked={isAllCheck.includes(product.id) ? true : false}
          name={product.id}
        />

        <div className="product-info">
          <span className="item-name">
            <img className="product-img " src={product.itemImg} alt="boracay" />
            <span className="product-name">{product.itemName}</span>
          </span>
          <div className="product-btn">
            <button
              className="count-btn"
              onClick={() => decreaseQuantity(product.id)}
            >
              -
            </button>
            <input className="count-box" value={product.quantity} />
            <button
              className="count-btn"
              onClick={() => increaseQuantity(product.id)}
            >
              +
            </button>
          </div>
          <span className="price-and-delete">
            {product.itemPrice}원
            <button
              className="delete-btn"
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
