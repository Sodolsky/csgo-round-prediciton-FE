import { type NextPage } from "next";
import Head from "next/head";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
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
  const [model, setModel] = useState<tf.LayersModel | null>(null);
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
  const predictModel = () => {
    if (model) {
      const RandomInputCT: InputData = {
        bomb_planted: false,
        ct_health: 500,
        ct_armor: 500,
        t_armor: 0,
        ct_helmets: 5,
        t_helmets: 0,
        ct_defuse_kits: 5,
        ct_players_alive: 5,
        ct_weapon_ak47: 0,
        t_weapon_ak47: 1,
        ct_weapon_awp: 0,
        ct_weapon_m4a4: 5,
        ct_weapon_sg553: 0,
        t_weapon_sg553: 0,
        ct_weapon_usps: 0,
        ct_grenade_hegrenade: 0,
        ct_grenade_flashbang: 0,
        t_grenade_flashbang: 0,
        ct_grenade_smokegrenade: 0,
        ct_grenade_incendiarygrenade: 0,
      };
      const RandomInputT: InputData = {
        bomb_planted: true,
        ct_health: 1,
        ct_armor: 1,
        t_armor: 0,
        ct_helmets: 0,
        t_helmets: 0,
        ct_defuse_kits: 0,
        ct_players_alive: 1,
        ct_weapon_ak47: 0,
        t_weapon_ak47: 5,
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
      const Input = createRoundDataArray(RandomInputT);
      const data = tf.tensor(Input as any).reshape([1, 20]);
      const prediction = model.predict(data) as any;
      console.log(Array.from(prediction.dataSync()));
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
        <div className="animatedBg p-8 rounded-lg w-2/4">
          <form>
            <div className="grid grid-cols-3 gap-4">
              {/* <select name="" id=""></select> */}
              {numberInputs.map((x) => (
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
                className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
