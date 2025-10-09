import { Modal, Text } from "@mantine/core";

const ShippingInfoModal = ({ opened, close }) => {
  return (
    <Modal opened={opened} onClose={close} title="Shipping Information" size="xl">
      <section className="shipping-options-explainer" aria-labelledby="shipping-options-title">
        <Text size="lg" className="bold">Shipping Options</Text>

        <Text size="sm">
          Because every maker and product is a little different, we offer a few flexible ways to get your order where it needs to go.
          Each vendor chooses the shipping methods that work best for their craft and materials.
        </Text>

        <ul className="shipping-methods" aria-describedby="shipping-methods-desc">
          <li className="margin-bottom">
            <Text size="md" className="bold margin-bottom">Quote Shipping</Text>
            <Text size="sm">
              For handmade, delicate, or oversized pieces that require special care, shipping costs are calculated individually.
              After you place your order, the maker will follow up with a personalized quote before anything ships.
            </Text>
          </li>

          <li className="margin-bottom">
            <Text size="md" className="bold margin-bottom">Flat Rate Shipping</Text>
            <Text size="sm">
              A simple, all-inclusive shipping fee that covers packaging and delivery for standard-sized items — reliable and predictable.
            </Text>
          </li>

          <li>
            <Text size="md" className="bold margin-bottom">Free Pickup</Text>
            <Text size="sm">
              Some makers welcome you to pick up your order directly from their studio or shop — no shipping fees, and a chance to connect in person.
            </Text>
          </li>
        </ul>

        <Text size="lg" className="margin-bottom bold">Why choose a shipping option for each item?</Text>

        <Text size="sm">
          Every item on Joinery is crafted and shipped by an independent maker. Because shipping preferences and logistics can vary by vendor and by item,
          we ask that you select a shipping option for each product in your cart. This helps us ensure:
        </Text>

        <ul className="benefits-list">
          <li><Text size="sm"><strong>Fair pricing</strong> — each maker covers the true cost to package and ship their work.</Text></li>
          <li><Text size="sm"><strong>Careful handling</strong> — options match the item’s size, fragility, and special handling needs.</Text></li>
          <li><Text size="sm"><strong>Clear expectations</strong> — you’ll see exact shipping costs and timelines up front, with no surprises.</Text></li>
        </ul>

        <Text size="sm">
          If you prefer, select “Free Pickup” where available to collect directly from the maker — and if an item needs a custom shipping quote,
          the maker will be in touch shortly after you place your order.
        </Text>
      </section>
    </Modal>
  );
}

export default ShippingInfoModal;