import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-500 text-white pt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center flex-wrap px-3">
        <div className="flex flex-col w-full justify-center items-start md:w-2/5 text-center md:text-left">
          <p className="capitalize tracking-wide w-full">
            Explore insights, tutorials and stories for curious minds like yours
          </p>
          <h2 className="my-5 text-5xl font-bold leading-tight">
            Welcome To Haint Blog
          </h2>
          <p className="capitalize leading-normal text-xl">
            Join a community that learning and growing together
          </p>
        </div>
        <div className="w-full flex justify-center text-center py-7 md:w-3/5">
          <Image
            width={500}
            height={500}
            src="/hero.png"
            alt="hero section"
            className="w-full md:w-4/5 z-30"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero