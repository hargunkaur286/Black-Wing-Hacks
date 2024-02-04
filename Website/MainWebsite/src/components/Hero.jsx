import styles from "../style";
import GetStarted from "./GetStarted";
import heroimg from '../assets/heroimg.png'

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Empowering Education, <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Unleashing Potential</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        2
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Welcome to an innovative learning hub where organization meets collaboration. Elevate your academic journey with seamless note-taking, smart scheduling, and interactive content conversion. Join us as we revolutionize the way you learn and teach, bringing education to the forefront of the digital age.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={heroimg} alt="billing" className="w-[500px] h-[500px] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
