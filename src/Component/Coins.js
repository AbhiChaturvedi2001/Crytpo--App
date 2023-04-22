import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "react-loading-components";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  // trying the try catch condition
  const [Error, setError] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : " €";

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      setCoinsData(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency, page]);

  // for pagination
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btn = new Array(132).fill(1);
  return (
    <>
      {loading ? (
        <div className=" bg-slate-600 w-[100%] h-[100vh] flex justify-center items-center ">
          <Loading type="three_dots" width={50} height={100} fill="#ffff" />
        </div>
      ) : (
        <>
          <div className="flex justify-around m-[auto] w-[10%] items-center h-[10vh]">
            <div>
              INR :{" "}
              <input
                name="myRadio"
                value="inr"
                defaultChecked
                onChange={(e) => setCurrency(e.currentTarget.value)}
                type="radio"
              />
            </div>
            <div>
              USD :{" "}
              <input
                name="myRadio"
                defaultChecked={currency === "usd"}
                value="usd"
                onChange={(e) => setCurrency(e.currentTarget.value)}
                type="radio"
              />
            </div>
            <div>
              EUR :{" "}
              <input
                name="myRadio"
                defaultChecked={currency === "eur"}
                value="eur"
                onChange={(e) => setCurrency(e.currentTarget.value)}
                type="radio"
              />
            </div>
          </div>
          <div className="grid grid-cols-5 text-center gap-x-[50px] w-[75%] gap-y-[50px] justify-evenly mx-auto my-10 max-md:grid  max-md:grid-cols-4 max-md:w-[70%] max-sm:grid max-sm:grid-cols-3 max-sm:justify-center max-sm:w-[70%] max-sm:m-auto max-sm:mt-5 max-sm:gap-x-[100px]">
            {coinsData.map((data) => {
              const price = data.current_price;
              return (
                <>
                  <Link to={`/coin/${data.id}`}>
                    <div
                      key={data.id}
                      className="w-[8rem] shadow-sm shadow-indigo-500/40 px-3 py-3 transition hover:duration-300 cursor-pointer hover:-translate-y-3 hover:ease-in-out "
                    >
                      <img
                        className="w-[100%] m-auto"
                        src={data.image}
                        alt=""
                      />
                      <div>
                        <div>{data.name}</div>
                        <div className="mt-3">
                          {price ? `${currencySymbol} ${price}` : "NA"}
                        </div>
                        <div className="mt-3">{data.symbol}</div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <div className="flex m-auto w-[70%] overflow-x-auto ">
            {btn.map((x, index) => {
              return (
                <>
                  <button
                    key={index}
                    className="bg-black text-white px-3 py-1 cursor-pointer mb-3"
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Coins;
