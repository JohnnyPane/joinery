import { Grid } from "@mantine/core";
import JoineryFormFields from "./JoineryFormFields.jsx";

const FormGridInputs = ({ form, formInputs, nestedFieldType = null }) => {
  return (
    <Grid>
      {
        formInputs.map((input) => {
          return (
            <Grid.Col key={name} span={{ base: 12, sm: input.gridSize || 12 }}>
              <JoineryFormFields form={form} fieldConfig={input} nestedFieldType={nestedFieldType} />
            </Grid.Col>
          )
        })
      }
    </Grid>
  );
}

export default FormGridInputs;