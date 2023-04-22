import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "react-loading-components";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [exchangesData, setExchangesData] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchangesData(data);
      setLoading(false);
    };
    fetchExchanges();
  }, []);
  return (
    <>
      {loading ? (
        <div className=" bg-slate-600 w-[100%] h-[100vh] flex justify-center items-center ">
          <Loading type="three_dots" width={50} height={100} fill="#ffff" />
        </div>
      ) : (
        <div className="grid grid-cols-5 text-center gap-x-[50px] w-[75%] gap-y-[50px] justify-center mx-auto my-10 max-md:grid  max-md:grid-cols-4 max-md:w-[70%] max-sm:grid max-sm:grid-cols-3 max-sm:justify-center max-sm:w-[70%] max-sm:m-auto max-sm:mt-5 max-sm:gap-x-[100px]">
          {exchangesData.map((data) => {
            return (
              <>
                <Link key={data.id} target="_blank" to={data.url}>
                  <div className="w-[6rem] shadow-sm shadow-indigo-500/40 px-3 py-3 transition hover:duration-300 cursor-pointer hover:-translate-y-3 hover:ease-in-out ">
                    <img className="w-[100%] m-auto" src={data.image} alt="" />
                    <div>
                      <div>{data.name}</div>
                      <div className="mt-3">{data.trust_score_rank}</div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Exchanges;
