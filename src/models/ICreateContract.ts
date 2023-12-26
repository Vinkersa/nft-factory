import * as yup from "yup";
import createContractSchema from "@models/createContractSchema";

interface ICreateContract extends yup.InferType<typeof createContractSchema> {}

export default ICreateContract;
