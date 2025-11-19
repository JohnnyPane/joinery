import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Divider, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowNarrowRight } from '@tabler/icons-react';

import { useMe } from "../../hooks/useMe.js";
import { getBucketImageUrl  } from "../../utils/imageConfigs.js";
import ShopNowSection from "./ShopNowSection.jsx";
import AboutUsSection from "./AboutUsSection.jsx";
import Footer from "./Footer.jsx";
import './Home.scss';

const DesktopHeader = () => {
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);

  return (
    <div className="home-grid flex row">
      <div className="home-left padding">
        <div className="home-left-content flex column space-between">
          <h1 className="home-left-text margin-none">Crafted by Nature.</h1>
          <div className="flex to-right">
            <p className="home-right-text">Discover raw materials and handcrafted goods from makers who are passionate about what they do.</p>
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
  )
}

const MobileHeader = () => {
  return (
    <div className="mobile-hero">
      <Image
        src={getBucketImageUrl("joinery-forest.jpeg")}
        className="mobile-hero-image"
        alt="Wood"
      />

      <div className="mobile-hero-overlay top">
        <h1 className="mobile-hero-title">Crafted by Nature.</h1>

        <div className="flex to-right">
          <p className="mobile-hero-text">
            Discover raw materials and handcrafted goods from makers who are passionate about what they do.
          </p>
        </div>

        <Button component={Link} to="/products" variant="transparent" color="white" size="md" className="margin-top mobile-link-dark" >
          <div className="flex align-center">Shop Now <IconArrowNarrowRight className="margin-left" /></div>
        </Button>

      </div>
    </div>
  )
}

const Home = () => {
  const { data: user } = useMe();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}

      <ShopNowSection />

      <Divider className="double-margin" />

      <AboutUsSection />

      <Footer />
    </>
  );
}

export default Home;