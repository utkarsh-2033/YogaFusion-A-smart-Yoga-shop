import HeroSection from '@/components/Login/HeroSection';
import LoginForm from '@/components/Login/LoginForm';

const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="h-1/6 md:h-auto w-full md:w-1/2">
        <HeroSection title="YogaFusion" text="Join us today and explore the world of YogaFusion." />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <LoginForm type="signup" />
      </div>
    </div>
  );
};

export default Signup;
