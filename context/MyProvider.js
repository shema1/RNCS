import React from "react"




const MyProvider = (props) => {

    const AppContex = React.createContext()

    return (
        <AppContex.Provider value="test 2">
            {props.children}
        </AppContex.Provider>
    )

}

export default MyProvider