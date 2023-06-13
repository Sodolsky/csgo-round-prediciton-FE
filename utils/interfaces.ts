export interface InputData {
    bomb_planted: boolean;
    ct_health: number;
    ct_armor: number;
    t_armor: number;
    ct_helmets: number;
    t_helmets: number;
    ct_defuse_kits: number;
    ct_players_alive: number;
    ct_weapon_ak47: number;
    t_weapon_ak47: number;
    ct_weapon_awp: number;
    ct_weapon_m4a4: number;
    ct_weapon_sg553: number;
    t_weapon_sg553: number;
    ct_weapon_usps: number;
    ct_grenade_hegrenade: number;
    ct_grenade_flashbang: number;
    t_grenade_flashbang: number;
    ct_grenade_smokegrenade: number;
    ct_grenade_incendiarygrenade: number;
  }
  type RoundDataArray = [
    boolean,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  
export function createRoundDataArray(data: InputData): RoundDataArray {
    const dataArray: RoundDataArray = [
      data.bomb_planted,
      data.ct_health,
      data.ct_armor,
      data.t_armor,
      data.ct_helmets,
      data.t_helmets,
      data.ct_defuse_kits,
      data.ct_players_alive,
      data.ct_weapon_ak47,
      data.t_weapon_ak47,
      data.ct_weapon_awp,
      data.ct_weapon_m4a4,
      data.ct_weapon_sg553,
      data.t_weapon_sg553,
      data.ct_weapon_usps,
      data.ct_grenade_hegrenade,
      data.ct_grenade_flashbang,
      data.t_grenade_flashbang,
      data.ct_grenade_smokegrenade,
      data.ct_grenade_incendiarygrenade
    ];
  
    // Check if all properties are provided
    if (dataArray.some(value => value === undefined)) {
      throw new Error('Missing properties in the input data');
    }
  
    return dataArray;
  }
  