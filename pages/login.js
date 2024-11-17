import HeroSection from '@/components/Login/HeroSection';
import LoginForm from '@/components/Login/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="h-1/6 md:h-auto w-full md:w-1/2">
        <HeroSection title="YogaFusion" text="Welcome back! Please login to continue." />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <LoginForm type="login" />
      </div>
    </div>
  );
};

export default Login;
