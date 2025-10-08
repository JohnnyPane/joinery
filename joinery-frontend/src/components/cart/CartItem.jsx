import { Link } from "react-router-dom";
import { Image, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { moneyDisplay } from "../../utils/humanizeText.js";

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const CartItem = ({ cartItem, closeModal }) => {
  const { data } = cartItem;
  const item = data.attributes
  const product = item.product.data.attributes

  const imageUrl = product.images.length > 0 ? rootURL + product.images[0].image_url : "";
  const name = product.name || "Product Image";

  return (
    <div className="flex row space-between padding-right">
      <Link to={`/products/${item.product.data.id}`} className="link-label flex row align-left" onClick={closeModal} >
        <div>
          <Image src={imageUrl} alt={product.name} h={100} style={{ width: "100px"}} fit="contain" className="double-margin-right" />
        </div>

        <div className="margin-left flex column space-between full-height">
          <div className="flex column full-width">
            <span>{product.name}</span>
            <span className="italic label-large">{product.productable_type}</span>
          </div>

          <div>
            <Text color="dimmed" size="sm">Qty. {item.quantity}</Text>
          </div>
        </div>
      </Link>


      <div className="flex column full-height space-between align-right">
        <span className="bold label">{moneyDisplay(product.price_in_cents)}</span>
        {/*{displayOnly && <IconTrash onClick={handleRemove} size={20} className=" clickable" color="red"/>}*/}
      </div>
    </div>
  );
}

export default CartItem;