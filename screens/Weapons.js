import React, { useEffect, useState } from "react"

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

const Weapons = ({ weaponsStats }) => {
    // const [weaponStats, setWeaponStats] = useState([])
    // const [totalKills, setTotalKils] = useState([])
    // const [totalShots, setTotalShots] = useState([])
    // const [totalHits, setTotalHits] = useEffect([])

    // const getWeaponStats = () => {
    //     let res = stats.filter(elem => elem.name.includes("total_kills_" ))
    //         console.log(res)
    //     // setWeaponStats(res)
    // }

    // const getTotalKills = () => {
    //     let res = weaponStats.filter(elem => elem.name.includes("total_kills_"))
    // }

    // useEffect(()=>{
    //     getWeaponStats()
    // },[])
    return (
        <>
            <Text>Weapons stats</Text>
            <ScrollView style={{
                flex: 1,
                backgroundColor: "red",
                paddingHorizontal: 15
            }}>
                {weaponsStats.length && weaponsStats.map(elem => {
                    <View >
                        <View>
                            <Text>{elem[0].name}</Text>
                            <Text>{elem[0].value}</Text>
                        </View>
                    </View>
                })
                }
            </ScrollView>
        </>
    )

}

export default Weapons