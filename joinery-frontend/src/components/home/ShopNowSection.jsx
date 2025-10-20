import { Link } from "react-router-dom";
import { Button, Image, Title, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import "./Home.scss";
import {getBucketImageUrl} from "../../utils/imageConfigs.js";

const sections = [
  {
    title: "Raw Materials",
    description: "High-quality raw materials for your next creation.",
    imageUrl: getBucketImageUrl("raw-materials.jpeg"),
    slug: "raw_materials",
  },
  {
    title: "Slabs & Lumber",
    description: "Shaped by nature, ready for the workshop.",
    imageUrl: getBucketImageUrl("slabs-lumber.jpeg"),
    slug: "lumber",
  },
  {
    title: "Finished Goods",
    description: "Handcrafted furniture and decor, ready to enhance your space.",
    imageUrl: getBucketImageUrl("finished-goods.jpeg"),
    slug: "finished_goods",
  },
];

const ShopNowSection = () => {
  return (
    <section className="shop-now-section padding">
      <h2 className="section-title">Shop by Category</h2>

      <motion.div
        className="shop-now-grid"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {sections.map((section) => (
          <div key={section.title} className="shop-card">
            <div className="shop-card-image-wrapper">
              <Image src={section.imageUrl} alt={section.title} className="shop-card-image" />
              <div className="shop-card-overlay">
                <div className="shop-card-text">
                  <Title order={2}>{section.title}</Title>
                  <Text size="md" color="white">{section.description}</Text>
                  <Button
                    component={Link}
                    to={"/products/categories/" + section.slug}
                    variant="transparent"
                    color="white"
                    size="md"
                  >
                    <div className="animated-link flex align-center">Shop {section.title} <IconArrowNarrowRight className="margin-left" /></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ShopNowSection;
