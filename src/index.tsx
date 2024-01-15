import ReactDOM from "react-dom/client";
import App from "@src/App";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@styles/theme";
import { SnackbarProvider } from "notistack";
import { WagmiConfig } from "wagmi";
import wagmiConfig from "@configs/wagmiConfig";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
  >
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </SnackbarProvider>,
);
