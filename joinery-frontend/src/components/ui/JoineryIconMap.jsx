import { IconRulerMeasure, IconRulerMeasure2 } from '@tabler/icons-react'

const JoineryIconMap = ({ iconName, size = 16 }) => {
  const icons = {
    rulerHeight: IconRulerMeasure,
    rulerWidth: IconRulerMeasure2,
  };

  const IconComponent = icons[iconName];

  return IconComponent ? <IconComponent size={size} /> : null;
}

export default JoineryIconMap;