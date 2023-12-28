import { enqueueSnackbar } from "notistack";

const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    enqueueSnackbar("Address was successfully copied", {
      variant: "success",
      autoHideDuration: 2000,
    });
  } catch {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }
};

export default copyTextToClipboard;
