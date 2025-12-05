import {
  IconRulerMeasure, IconRulerMeasure2, IconWeight, IconMapPin, IconStar, IconDroplet, IconNumber,
} from '@tabler/icons-react'

const JoineryIconMap = ({ iconName, size = 16 }) => {
  const icons = {
    location: IconMapPin,
    number: IconNumber,
    rulerVertical: IconRulerMeasure2,
    rulerHorizontal: IconRulerMeasure,
    star: IconStar,
    water: IconDroplet,
    weight: IconWeight
  };

  const IconComponent = icons[iconName];

  return IconComponent ? <IconComponent size={size} /> : null;
}

export default JoineryIconMap;