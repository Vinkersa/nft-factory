import { Box, Checkbox, TextField, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ICreateContract from "@models/ICreateContract";
import { yupResolver } from "@hookform/resolvers/yup";
import createContractSchema from "@models/createContractSchema";
import { FC, ReactNode } from "react";
import theme from "@styles/theme";
import HelpIcon from "@mui/icons-material/Help";

const classes = {
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    rowGap: 1,
    columnGap: 2,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  textFieldContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  checkBoxContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  btnContainer: {
    width: "100%",
    gridColumn: "2 span",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "auto",
    },
  },
  textField: {},
  checkBox: {},
  text: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: 1,
  },
};

const titles: Record<
  keyof ICreateContract,
  { title: string; tooltip: string }
> = {
  price: {
    title: "NFT price",
    tooltip: "Price of NFT in ETH",
  },
  name: {
    title: "Collection name",
    tooltip: "Collection name",
  },
  maxMintCount: {
    title: "Max mint count",
    tooltip: "Max quantity of NFT tokens that can be minted in one transaction",
  },
  preMint: {
    title: "Pre mint",
    tooltip: "Quantity of tokens that minting to owner address on deploying",
  },
  symbol: {
    title: "NFT symbol",
    tooltip: "NFT symbol",
  },
  isPaused: {
    title: "Is paused",
    tooltip: "Disable mint after deploying contract (can be modified after)",
  },
  maxNFTSupply: {
    title: "Max NFT quantity",
    tooltip: "Max quantity of NFT tokens that can be minted",
  },
};

type Props = {
  submitBtn: ReactNode;
  onSubmit: (formData: ICreateContract) => void;
};

const DashboardDeployForm: FC<Props> = ({ submitBtn, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ICreateContract>({
    resolver: yupResolver(createContractSchema),
    defaultValues: createContractSchema.getDefault(),
  });

  return (
    <Box component={"form"} sx={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(createContractSchema.fields).map((item) => {
        const key = item[0] as keyof ICreateContract;
        const type = item[1].describe().type;
        if (type === "boolean") {
          return (
            <Box sx={classes.checkBoxContainer} key={key}>
              <Checkbox
                sx={classes.checkBox}
                {...register<keyof ICreateContract>(key)}
              />
              <Typography
                sx={classes.text}
                variant={"subtitle2"}
                fontWeight={700}
              >
                {titles[key].title}
                <Tooltip
                  title={
                    <Typography variant={"body2"}>
                      {titles[key].tooltip}
                    </Typography>
                  }
                >
                  <HelpIcon />
                </Tooltip>
              </Typography>
            </Box>
          );
        }
        return (
          <Box sx={classes.textFieldContainer} key={key}>
            <Typography
              sx={classes.text}
              variant={"subtitle2"}
              fontWeight={700}
            >
              {titles[key].title}
              <Tooltip
                title={
                  <Typography variant={"body2"}>
                    {titles[key].tooltip}
                  </Typography>
                }
              >
                <HelpIcon />
              </Tooltip>
            </Typography>
            <TextField
              sx={classes.textField}
              placeholder={titles[key].title}
              {...register<keyof ICreateContract>(key)}
              error={!!touchedFields[key] && !!errors[key]}
              helperText={touchedFields[key] && errors[key]?.message}
            />
          </Box>
        );
      })}

      <Box sx={classes.btnContainer}>{submitBtn}</Box>
    </Box>
  );
};

export default DashboardDeployForm;
