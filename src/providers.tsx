import { AuthProvider } from "@app/auth";
import { theme } from "@app/theme";
import { ToastContainer } from "@app/ui/toast";
import { GlobalQueryClientProvider } from "@lib/query-utils";
import { CircularProgress, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export const RoutesWrapper = () => {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        removeDefaultsFromUrl: true,
      }}
    >
      <ToastContainer />
      <Outlet />
    </QueryParamProvider>
  );
};

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ErrorBoundary fallback={<CircularProgress />}>
      <Suspense fallback={<CircularProgress />}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <HelmetProvider>
              <Helmet defaultTitle="DB Tables" titleTemplate="%s · DB Tables" />
              {/* // TODO */}
              <GlobalQueryClientProvider>
                <AuthProvider>{children}</AuthProvider>
              </GlobalQueryClientProvider>
            </HelmetProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
