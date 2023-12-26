import { Box, Button } from "@mui/material";
import DashboardDeployForm from "@components/DashboardDeploy/DashboardDeployForm";
import { useMemo } from "react";
import ICreateContract from "@models/ICreateContract";

const classes = {
  btn: {
    width: "50%",
  },
};

const DashboardDeployPage = () => {
  const submitBtn = useMemo(
    () => (
      <Button sx={classes.btn} variant={"contained"} type={"submit"}>
        Submit
      </Button>
    ),
    [],
  );

  const onSubmit = (formData: ICreateContract) => {
    console.log(formData);
  };

  return (
    <Box>
      <DashboardDeployForm onSubmit={onSubmit} submitBtn={submitBtn} />
    </Box>
  );
};

export default DashboardDeployPage;
