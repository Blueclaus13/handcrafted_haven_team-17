import LoginForm from "../ui/login/login-form";
import style  from "../ui/componentStyles/loginPage.module.css";

 
export default function LoginPage() {
  return (

      <div>
        <h1 className={style.title}>Login</h1>
        <hr/>
        <LoginForm />
      </div>
  );
}