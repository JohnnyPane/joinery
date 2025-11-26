import { useState, useEffect } from 'react';
import { Button, Stepper, Card } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import './JoineryStepForm.scss';

const JoineryStepForm = ({ steps, onComplete, nextStepFlag = false, setNextFlag }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepConfig = steps[currentStep];

  useEffect(() => {
    if (nextStepFlag) {
      nextStep();
      setNextFlag(false);
    }
  }, [nextStepFlag]);

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      try {
        await currentStepConfig.onNext?.();
        setCurrentStep(currentStep + 1);
      } catch (error) {
        notifications.show({
          message: "Failed to complete step, please review the form",
          position: "top-right",
          color: "red"
        })
      }
    } else {
      try {
        await onComplete();
      } catch (error) {
        console.error("Final form completion failed:", error);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="stepper-container">
        <Stepper active={currentStep} onStepClick={setCurrentStep} color="teal" allowNextStepsSelect={false} mb="xl">
          {steps.map((step, index) => (
            <Stepper.Step key={index} label={step.title || `Step ${index + 1}`} />
          ))}
        </Stepper>
      </div>

      <div className="product-form-container flex to-center">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="product-form">

          <div className="double-margin-bottom">{currentStepConfig.component}</div>

          <div className="flex space-between full-width double-margin-top">
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="action-button"
            >
              Previous
            </Button>

            {!currentStepConfig.hideNext && <Button onClick={nextStep} disabled={currentStepConfig.isNextDisabled} color="teal" className="action-button">
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>}
          </div>
        </Card>
      </div>

      {/*<div>{currentStepConfig.component}</div>*/}
      {/*<div>*/}
      {/*  {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}*/}
      {/*  {!currentStepConfig.hideNext && <Button onClick={nextStep} disabled={currentStepConfig.isNextDisabled}>*/}
      {/*    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
      {/*  </Button>}*/}
      {/*</div>*/}
    </>
  );
}

export default JoineryStepForm;