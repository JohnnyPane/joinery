import { Grid } from "@mantine/core";
import JoineryFormFields from "./JoineryFormFields.jsx";

const shouldShowField = (form, fieldConfig, nestedFieldType) => {
  const dependencyValue = nestedFieldType ? form.values[nestedFieldType][fieldConfig?.show?.field] : form.values[fieldConfig?.show?.field];
  return fieldConfig.show ? fieldConfig.show?.values?.includes(dependencyValue) : true;
}

const FormGridInputs = ({ form, formInputs, nestedFieldType = null }) => {
  return (
    <Grid>
      {
        formInputs.map((input) => {
          if (!shouldShowField(form, input, nestedFieldType)) {
            return null;
          }

          return (
            <Grid.Col key={input.name} span={{ base: 12, sm: input.gridSize || 12 }}>
              <JoineryFormFields form={form} fieldConfig={input} nestedFieldType={nestedFieldType} />
            </Grid.Col>
          )
        })
      }
    </Grid>
  );
}

export default FormGridInputs;