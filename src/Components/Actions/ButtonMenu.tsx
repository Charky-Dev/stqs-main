import { Dispatch, SetStateAction } from "react"

interface PropTypes {
    currentView: string; 
    setCurrentView: Dispatch<SetStateAction<string>>;
}

export default function ButtonMenu({currentView, setCurrentView}:PropTypes){
// Menu bar comprised of several buttons to show different functions

    //Map of required buttons to avoid duplication
    const buttonMap = ['Mission Dashboard', "Fleet Management", "Nothing 1", "Nothing 2"]

return(
    <>
    {/* map the list to individual menu buttons */}
    {buttonMap.map((button) => <input key={button} type="button" className={currentView == String({button}) ? "ActiveMenuButton" : "MenuButton"} value={button} onClick={() => setCurrentView(button)}/>)}
    </>
)
}