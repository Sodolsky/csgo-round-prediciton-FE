// @ts-nocheck
import { type NextPage } from "next";
import Head from "next/head";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import { createRoundDataArray, InputData } from "utils/interfaces";
import { Josefin_Sans } from "next/font/google";
import { NumberInput, NumberInputProps } from "~/NumberInput";
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});
const emptyInputData: InputData = {
  bomb_planted: false,
  ct_health: 0,
  ct_armor: 0,
  t_armor: 0,
  ct_helmets: 0,
  t_helmets: 0,
  ct_defuse_kits: 0,
  ct_players_alive: 0,
  ct_weapon_ak47: 0,
  t_weapon_ak47: 0,
  ct_weapon_awp: 0,
  ct_weapon_m4a4: 0,
  ct_weapon_sg553: 0,
  t_weapon_sg553: 0,
  ct_weapon_usps: 0,
  ct_grenade_hegrenade: 0,
  ct_grenade_flashbang: 0,
  t_grenade_flashbang: 0,
  ct_grenade_smokegrenade: 0,
  ct_grenade_incendiarygrenade: 0,
};

const Home: NextPage = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
      bomb_planted: Boolean(value),
    }));
  };
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [inputData, setInputData] = useState<InputData>(emptyInputData);
  const numberInputs: NumberInputProps[] = Object.entries(emptyInputData)
    .map(([name, value]) => ({
      name,
      value,
      maxValue: 5,
      handleChange,
    }))
    .filter((x) => x.name !== "bomb_planted");
  useEffect(() => {
    const fetchModel = async () => {
      const model = await tf.loadLayersModel("./jsmodel/model.json");
      setModel(model);
    };
    fetchModel();
  }, []);
  const predictModel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (model) {
      const inputShape = model.inputs ? model.inputs[0]?.shape : null;
      console.log(inputShape);
      const inputArray = createRoundDataArray(inputData);
      let data = tf.tensor(inputArray as any).reshape([1, 20]);
      data = tf.cast(data, "float32");
      const prediction = model.predict(data) as any;
      const tChances = Array.from(prediction.dataSync())[0] as number;
      setPrediction(tChances);
    }
  };
  return (
    <>
      <Head>
        <title>CSGO Round Winner Prediction</title>
        <meta name="description" content="CSGO Round Winner Predictor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center flex-col bg-gray-800">
        <h1
          className={`text-4xl text-red-400 mt-2 text-center font-bold ${josefinSans.className}`}
        >
          CS GO Round Prediction
        </h1>
        <div className="flex flex-col justify-center items-center gap-2 my-6 text-white text-xl">
          {prediction && (
            <>
              <span className="">Prediction Rate: {prediction.toFixed(2)}</span>
              <span className="">
                Will Terrorists win: {prediction > 0.5 ? "Yes" : "No"}
              </span>
            </>
          )}
        </div>
        <div className="animatedBg p-8 rounded-lg w-2/4">
          <form>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex justify-center items-center flex-col ">
                <label htmlFor="bombSelect">bomb_planted</label>
                <select
                  name="bombSelect"
                  id=""
                  onChange={handleSelect}
                  className="rounded-lg text-lg"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              {numberInputs
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((x) => (
                  <NumberInput
                    name={x.name}
                    value={inputData[x.name as keyof InputData] as number}
                    handleChange={(e) => handleChange(e)}
                    maxValue={x.maxValue}
                    key={x.name}
                  />
                ))}

              <button
                type="submit"
                onClick={(e) => predictModel(e)}
                className=" text-gray-800 font-bold py-2 px-4 rounded-lg bg-orange-500 shadow-xl hover:brightness-125 transition-all hover:translate-y-3"
              >
                Predict The Winner
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
