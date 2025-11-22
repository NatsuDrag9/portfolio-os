import { useAuth, useBootStatus } from '@store/store';
import './LoginScreen.scss';

function LoginScreen() {
  const { updateAuthState } = useAuth();
  const { updateBootStatus } = useBootStatus();

  const handleLogin = () => {
    const enteredUsername = 'GUEST'; // or from input state
    updateAuthState(enteredUsername);
    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', enteredUsername);
  };
  return (
    <div className="login-screen">
      <h4 className="login-screen__title">Login</h4>

      <button
        type="button"
        onClick={handleLogin}
        className="login-screen__button"
      >
        Login
      </button>
    </div>
  );
}

export default LoginScreen;
