import { useState } from 'react';
import { Button } from '@mantine/core';

const JoineryStepForm = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepConfig = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      currentStepConfig.onNext?.();
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div>{currentStepConfig.component}</div>
      <div>
        {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}
        {!currentStepConfig.hideNext && <Button onClick={nextStep} disabled={currentStepConfig.isNextDisabled}>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>}
      </div>
    </div>
  );
}

export default JoineryStepForm;