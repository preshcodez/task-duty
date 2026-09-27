import { Link } from "react-router-dom";
import heroImage from "../assets/Component 1.svg";

const CoverPage = () => {
  return (
    <div className="flex justify-between items-center px-42.5 mb-[205.8px] pt-16.25 max-md:flex-col-reverse max-md:px-5 max-md:pt-10 max-md:mb-10 max-md:gap-10">
      <div className="w-133.75 flex flex-col gap-5.25 max-md:w-full">
        <h1 className="font-signika font-medium text-[50px] text-[#292929] leading-[100%] pt-3 max-md:text-[36px]">
          Manage your Tasks on <br />
          <span className="text-[#974FD0] leading-[100%]">TaskDuty</span>
        </h1>

        <p className="font-signika text-[24px] text-[#737171] font-normal text-left max-md:text-[18px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
          sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
          tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
          semper porttitor. Nec accumsan.
        </p>

        <Link
          to="/my-tasks"
          className="w-50.25 py-2.5 bg-[#974FD0] hover:bg-[#843DBD] transition-colors duration-300 rounded-lg font-signika font-medium text-[24px] text-[#FAF9FB] text-center max-md:w-full max-md:text-[20px]"
        >
          Go to My Tasks
        </Link>
      </div>

      <img
        src={heroImage}
        alt="heroImage"
        className="max-md:w-full max-md:max-w-105"
      />
    </div>
  );
};

export default CoverPage;
