


import React, { useState } from 'react'
import Axios from "axios";
const AppContext = React.createContext(true)

export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer


// const [stats, setStats] = useState({})
// const getStats = async () => {
//     try {
//         let t = await Axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=923BBAE53C4DE51C7648E2CB3CB464EA&steamid=76561198105482243`)
//             .then(res => setStats(res.data.playerstats.stats))
//         // .then(res => console.log(res.data.playerstats.stats))
//         return t
//     } catch (error) {

//     }

// }
export default AppContext