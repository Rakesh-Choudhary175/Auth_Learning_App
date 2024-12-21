import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLogin(true);
    try {
      const token = await login(email, password);
      authCtx.login(token);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Authentication Failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsLogin(false);
    }
  }

  if (isLogin) return <LoadingOverlay message="Logging in ..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
