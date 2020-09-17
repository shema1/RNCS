import Axios from "axios";
import React, { useContext, useEffect, useState, } from "react"

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';
import AppContext from "../context/AppContext";
import Weapons from "./Weapons";


const MainScreen = (props, context) => {
     

    // console.log('context,', context)

    const test = useContext(AppContext)
    console.log("test: ", test)
    const [stats, setStats] = useState(null)
    const [weaponsStats, setWeaponsStats] = useState([])
    const [totalKils, setTotalKils] = useState({})

    const getStats = () => {
        try {
            Axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=923BBAE53C4DE51C7648E2CB3CB464EA&steamid=76561198105482243`)
                .then(res => setStats(res.data.playerstats.stats))
            // .then(res => console.log(res.data.playerstats.stats))
        } catch (error) {

        }
    }

    const getTotalKils = () => {
        let res = stats.find(elem => elem.name === "total_kills")
        setTotalKils(res)
    }

    const getWeaponStats = () => {
        let weapons = stats.filter(elem => elem.name.includes("total_hits_")).map(elem => elem.name.replace(/total_hits_/, ""))

        let weaponsStats = weapons.map(wepName => {
            let res = stats
                .filter(elem => elem.name.includes(wepName))
                .slice().sort((a, b) => {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                })

            return res
        })


        setWeaponsStats(weaponsStats)
        console.log(weaponsStats)
    }

    useEffect(() => {
        getStats()
    }, [])

    useEffect(() => {
        if (stats !== null) {
            getWeaponStats()
            getTotalKils()
        }
    }, [stats])

    return (
        <ScrollView style={{
            // flex: 1,
            backgroundColor: "#262626",
            paddingHorizontal: 15
        }}>
            {weaponsStats.map(elem =>

                <View style={styles.card} >

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../assets/weapon/pistol.png')} />
                        <Text style={{ textAlign: "center", color: "#fff" }}>{elem[1].name.replace(/total_kills_/, "")}</Text>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>Kills</Text>
                            <Text style={styles.paramSubTitle}>{elem[1].value}</Text>
                        </View>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>Shots</Text>
                            <Text style={styles.paramSubTitle}>{elem[2].value}</Text>
                        </View>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>Hits</Text>
                            <Text style={styles.paramSubTitle}>{elem[0].value}</Text>
                        </View>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>Accuracy</Text>
                            <Text style={styles.paramSubTitle}>{(elem[0].value * 100 / elem[2].value).toFixed(2) + " %"}</Text>
                        </View>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>Lethality</Text>
                            <Text style={styles.paramSubTitle}>{(elem[1].value * 100 / elem[0].value).toFixed(2) + " %"}</Text>
                        </View>
                        <View style={styles.param}>
                            <Text style={styles.paramTitle}>% of all kills</Text>
                            <Text style={styles.paramSubTitle}>{(elem[1].value * 100 / totalKils.value).toFixed(2) + " %"}</Text>
                        </View>

                    </View>
                </View>
            )}

        </ScrollView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    param: {
        // marginRight: 15,
        width: '30%',
        backgroundColor: "#546677",
        marginVertical: 15,
        paddingVertical: 5,
        borderRadius: 8
    },
    card: {
        flexDirection: "row",
        height: 215,
        backgroundColor: "#001e2e",
        marginBottom: 15,
        flexDirection: "column",
        color: "#fff",
        borderRadius: 15,
        paddingHorizontal: 10
    },
    paramTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 5,
        textAlign: "center"
    },
    paramSubTitle: {
        color: "#fff",
        textAlign: "center"
    }
})