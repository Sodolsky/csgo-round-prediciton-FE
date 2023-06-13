import { type NextPage } from "next";
import Head from "next/head";
import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from "react";
import { createRoundDataArray, InputData } from "utils/interfaces";
const Home: NextPage = () => {
  const [model, setModel] = useState< tf.LayersModel | null>(null);
  useEffect(() => {
    const fetchModel = async () => {
      const model = await tf.loadLayersModel("./jsmodel/model.json");
      setModel(model);
    }
    fetchModel();
  }, []);
    const predictModel = () =>{
      if(model){
        const RandomInput:InputData = {
          bomb_planted: false,
          ct_health: 500,
          ct_armor: 500,
          t_armor: 0,
          ct_helmets: 0,
          t_helmets: 0,
          ct_defuse_kits: 5,
          ct_players_alive: 5,
          ct_weapon_ak47: 5,
          t_weapon_ak47: 1,
          ct_weapon_awp: 0,
          ct_weapon_m4a4: 0,
          ct_weapon_sg553: 0,
          t_weapon_sg553: 0,
          ct_weapon_usps: 5,
          ct_grenade_hegrenade: 5,
          ct_grenade_flashbang: 5,
          t_grenade_flashbang: 2,
          ct_grenade_smokegrenade: 1,
          ct_grenade_incendiarygrenade:2
        }
        const Input = createRoundDataArray(RandomInput)
        const data = tf.tensor(Input as any).reshape([1,20])
        const prediction = model.predict(data) as any;
        console.log(Array.from(prediction.dataSync()))
      }
    }
  return (
    <>
      <Head>
        <title>CSGO Round Winner Prediction</title>
        <meta name="description" content="CSGO Round Winner Predictor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={predictModel}>Predict</button>
      </main>
    </>
  );
};

export default Home;
