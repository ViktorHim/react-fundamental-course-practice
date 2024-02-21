import { useContext } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { AuthContext } from "../context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const login = event => {
    event.preventDefault();
    localStorage.setItem('auth', 'true');
    setIsAuth(true);
  };

  return (
    <div>
        <h1>Вход</h1>
        <form onSubmit={login}>
            <MyInput type="text" placeholder="login"/>
            <MyInput type="password" placeholder="password"/>
            <MyButton>Войти</MyButton>
        </form>
    </div>
  )
}

export default Login;