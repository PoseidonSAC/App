import "./App.css";
import { AuthProvider } from "./auth/context";
import { AppTheme } from "./core/components/app-theme";
import { AppRouter } from "./core/router";
export function App() {
  return (
    <AppTheme>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppTheme>
  );
}
