import * as yup from "yup";

const createContractSchema = yup.object({
  name: yup.string().min(3).max(60).default("My NFT").required(),
  symbol: yup.string().min(2).max(10).default("NFT").uppercase().required(),
  maxNFTSupply: yup
    .number()
    .positive()
    .integer()
    .default(1)
    .max(1000000)
    .required(),
  maxMintCount: yup
    .number()
    .positive()
    .integer()
    .default(1)
    .max(1000000)
    .test(
      "is less then maxNFTSupply",
      "maxMintCount must be less then maxNFTSupply",
      (value, context) => value <= context.parent.maxNFTSupply,
    )
    .required(),
  preMint: yup
    .number()
    .min(0)
    .integer()
    .default(0)
    .max(1000000)
    .test(
      "is less then maxNFTSupply",
      "pre-mint must be less then maxNFTSupply",
      (value, context) => value <= context.parent.maxNFTSupply,
    )
    .required(),
  price: yup
    .string()
    .default("0")
    .test("is valid price", "not valid price", (value) => !isNaN(+value))
    .test(
      "is positive value",
      "price can't be less than 0",
      (value) => +value >= 0,
    )
    .required(),
  isPaused: yup.boolean().default(false).required(),
});

export default createContractSchema;
