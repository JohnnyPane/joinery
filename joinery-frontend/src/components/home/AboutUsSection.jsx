import { Grid, Image, Title, Text } from "@mantine/core";
import { getBucketImageUrl } from "../../utils/imageConfigs.js";


const AboutUs = () => {
  return (
    <div className="about-us-section margin-b-80 margin-t-40">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }} md={6} className="pad-20">
          <Image src={getBucketImageUrl("ryan_water.jpg")} alt="Ryan working with wood" h={300} fit="cover" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} md={6} className="pad-20 flex column justify-center">
          <div className="flex column to-center full-height">
            <Title className="center-text" order={2}>About The Joinery</Title>

            <Text>
              We’re a small wood supply company based in Minnesota, passionate about sourcing and crafting quality materials for builders, makers, and dreamers. Every piece of wood we sell carries the story of where it came from — and the potential for what it can become.
            </Text>
          </div>
        </Grid.Col>
      </Grid>
    </div>

  )
}

export default AboutUs;