import { Link } from "react-router-dom";
import { Image, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { moneyDisplay } from "../../utils/humanizeText.js";
import './CartItem.scss'

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const CartItem = ({ cartItem, onItemClick }) => {
  const { product } = cartItem;

  const imageUrl = product.images.length > 0 ? rootURL + product.images[0].image_url : "";

  return (
    <div className="flex row space-between padding-right cart-item">
      <Link to={`/products/${product.id}`} className="link-label flex row align-left" onClick={onItemClick} >
        <div>
          <Image src={imageUrl} alt={product.name} h={100} style={{ width: "100px"}} fit="contain" className="double-margin-right" />
        </div>

        <div className="margin-left flex column space-between full-height">
          <div className="flex column full-width">
            <span>{product.name}</span>
            <span className="italic label-large">{product.productable_type}</span>
          </div>

          <div>
            <Text color="dimmed" size="sm">Qty. {cartItem.quantity}</Text>
          </div>
        </div>
      </Link>


      <div className="flex column full-height space-between align-right">
        <span className="bold label">{moneyDisplay(cartItem.unit_price_in_cents)}</span>
        {cartItem.shipping_price_in_cents > 0 && <Text color="dimmed" className="label">Shipping: {moneyDisplay(cartItem.shipping_price_in_cents)}</Text>}
        {/*{displayOnly && <IconTrash onClick={handleRemove} size={20} className=" clickable" color="red"/>}*/}
      </div>
    </div>
  );
}

export default CartItem;