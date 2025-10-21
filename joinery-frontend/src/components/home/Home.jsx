import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {Button, Divider, Image} from "@mantine/core";
import { IconArrowNarrowRight } from '@tabler/icons-react';

import { useMe } from "../../hooks/useMe.js";
import ShopNowSection from "./ShopNowSection.jsx";
import AboutUs from "./AboutUs.jsx";
import './Home.scss';
import { getBucketImageUrl  } from "../../utils/imageConfigs.js";

const Home = () => {
  const { data: user } = useMe();
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);


  return (
    <>
      <div className="home-grid flex row">
        <div className="home-left padding">
            <div className="home-left-content flex column space-between">
              <h1 className="home-left-text margin-none">Crafted by Nature.</h1>
              <div className="flex to-right">
                <p className="home-left-text">Discover raw materials and handcrafted goods from makers who are passionate about what they do.</p>
              </div>

              <div>
                <Button component={Link} to="/products" variant="transparent" color="black" size="md" >
                  <div className="animated-link flex align-center">Shop Now <IconArrowNarrowRight className="margin-left" /></div>
                </Button>
              </div>
            </div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={leftLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="left-image-container"
          >
            <Image
              src={getBucketImageUrl("joinery-forest.jpeg")}
              className={`home-image home-image-left ${leftLoaded ? "loaded" : ""}`}
              onLoad={() => setLeftLoaded(true)}
              alt="Wood"
              height="100%"
              fit="cover"
            />
          </motion.div>
        </div>

        <motion.div
          className="home-right padding"
          initial={{ opacity: 0, y: 200 }}
          animate={rightLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <Image
            src={getBucketImageUrl("joinery-artisan.jpeg")}
            className={`home-image home-image-right ${rightLoaded ? "loaded" : ""}`}
            onLoad={() => setRightLoaded(true)}
            alt="Craftsman"
            height="100%"
            fit="cover"
          />
        </motion.div>
      </div>

      <ShopNowSection />

      <Divider className="double-margin" />

      <AboutUs />
    </>
  );
}

export default Home;