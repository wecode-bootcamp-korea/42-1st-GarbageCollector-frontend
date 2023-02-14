const CartItems = props => {
  const { product, deleteProduct, increaseQuantity, decreaseQuantity } = props;

  return (
    <div className="CartItems">
      <div className="cartItemContainer">
        <input className="checkBox" type="checkbox" />
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
              x
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
