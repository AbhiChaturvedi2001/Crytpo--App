import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex justify-between px-5 min-h-[10vh] bg-black text-white items-center">
        <div>
          <Link className="uppercase tracking-widest text-xl" to={"/"}>
            Crypto App
          </Link>
        </div>
        <div className="flex justify-around w-[20%] cursor-pointer max-md:flex max-md:justify-around max-md:w-[35%] max-sm:flex max-sm:justify-around max-sm:w-[45%]">
          <Link to={"/"}>Home</Link>
          <Link to={"/coins"}>Coins</Link>
          <Link to={"/exchanges"}>Exchanges</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
