import { Box } from "@mui/material";
import DashboardDeployForm from "@components/DashboardDeploy/DashboardDeployForm";
import { useCallback } from "react";
import ICreateContract from "@models/ICreateContract";
import {
  useNftFactoryFee,
  useNftFactoryCreateErc721,
} from "@services/contracts/NFTFactory";
import { useSnackbar } from "notistack";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@constants/AppRoutes";
import strPriceToBigInt from "@utils/strPriceToBigInt";

const DashboardDeployPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { chain } = useNetwork();
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
      if (deployFee && chain) {
        deployCollection({
          args: [
            formData.name,
            formData.symbol,
            BigInt(formData.maxNFTSupply),
            BigInt(formData.maxMintCount),
            BigInt(
              strPriceToBigInt(formData.price, chain.nativeCurrency.decimals),
            ),
            BigInt(formData.preMint),
            formData.isPaused,
          ],
          value: deployFee,
        });
      }
    },
    [deployFee, deployCollection, chain],
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
