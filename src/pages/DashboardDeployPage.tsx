import { Box } from "@mui/material";
import DashboardDeployForm from "@components/DashboardDeploy/DashboardDeployForm";
import { useCallback } from "react";
import ICreateContract from "@models/ICreateContract";
import {
  useNftFactoryFee,
  useNftFactoryCreateErc721,
} from "@services/contracts/NFTFactory";
import { useSnackbar } from "notistack";
import { useWaitForTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@constants/AppRoutes";
import { parseEther } from "viem";

const DashboardDeployPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data: deployFee = BigInt(0), isLoading: isLoadingFee } =
    useNftFactoryFee();
  const {
    write: deployCollection,
    data: deployCollectionData,
    isLoading: isLoadingDeployContract,
  } = useNftFactoryCreateErc721({
    onError: (error) => enqueueSnackbar(error.name, { variant: "error" }),
  });
  const { isLoading: isLoadingDeployContractConfirmations } =
    useWaitForTransaction({
      hash: deployCollectionData?.hash,
      onSuccess: () => {
        enqueueSnackbar("The contract was successfully deployed", {
          variant: "success",
        });
        navigate(AppRoutes.collections);
      },
    });

  const onSubmit = useCallback(
    (formData: ICreateContract) => {
      if (deployFee) {
        deployCollection({
          args: [
            formData.name,
            formData.symbol,
            BigInt(formData.maxNFTSupply),
            BigInt(formData.maxMintCount),
            parseEther(formData.price),
            BigInt(formData.preMint),
            formData.isPaused,
          ],
          value: deployFee,
        });
      }
    },
    [deployFee, deployCollection],
  );

  return (
    <Box>
      <DashboardDeployForm
        onSubmit={onSubmit}
        isLoading={
          isLoadingFee ||
          isLoadingDeployContract ||
          isLoadingDeployContractConfirmations
        }
      />
    </Box>
  );
};

export default DashboardDeployPage;
