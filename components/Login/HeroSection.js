import Image from "next/image";
const HeroSection = ({ title, text }) => {
  return (
    <div className="relative w-full h-screen md:h-full">
      <Image
        src="/assets/hero.png"
        alt="Hero Section"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};

export default HeroSection;
