import ReactDOM from "react-dom/client";
import App from "@src/App";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@styles/theme";
import { SnackbarProvider } from "notistack";
import { WagmiConfig } from "wagmi";
import wagmiConfig from "@configs/wagmiConfig";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <SnackbarProvider>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </SnackbarProvider>,
);
