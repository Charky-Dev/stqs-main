import { useContext } from "react"
import { PageViewContext } from "../../Utils/GlobalContext";
import { Views } from "../../Utils/ViewChoices";

// Menu bar comprised of several buttons to show different functions
export default function ButtonMenu() {

    const [currentView, setCurrentView] = useContext(PageViewContext); // import page state from context

    //Map of required buttons to avoid duplication
    return (
        <div id="buttonMenu">
            {/* map the list to individual menu buttons */}
            {Object.values(Views).map((button) => <input key={button} type="button" className={currentView === button ? "activeMenuButton" : "menuButton"} value={button} onClick={() => setCurrentView(button)} />)}
        </div>
    )
}