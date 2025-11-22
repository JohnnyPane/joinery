import { IconRulerMeasure, IconRulerMeasure2, IconWeight, IconMapPin, IconStar } from '@tabler/icons-react'

const JoineryIconMap = ({ iconName, size = 16 }) => {
  const icons = {
    rulerHeight: IconRulerMeasure,
    rulerWidth: IconRulerMeasure2,
    weight: IconWeight,
    location: IconMapPin,
    star: IconStar
  };

  const IconComponent = icons[iconName];

  return IconComponent ? <IconComponent size={size} /> : null;
}

export default JoineryIconMap;