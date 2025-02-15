import { Dispatch, SetStateAction } from "react"

interface PropTypes {
    currentView: string; 
    setCurrentView: Dispatch<SetStateAction<string>>;
}

export default function ButtonMenu({currentView, setCurrentView}:PropTypes){
// Menu bar comprised of several buttons to show different functions

    const buttonMap = ['Mission Dashboard', "Fleet Management", "Nothing 1", "Nothing 2"]

return(
    <>
    {buttonMap.map((button) => <input key={button} type="button" className={currentView == String({button}) ? "ActiveMenuButton" : "MenuButton"} value={button} onClick={() => setCurrentView(button)}/>)}
    </>
)
}