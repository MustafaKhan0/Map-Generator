class MapSelect {
    constructor(maps) {
        this.maps = maps
    }

    clearAll() {
        selectMap = undefined;
        SZSelect = []
        TCSelect = []
        RMSelect = []
        CBSelect = []
        exportData = []
    }

    getSelectedMaps() {
        for (let i = 1; i < 24; i++) { 
            selectMap = document.getElementById("S" + i)
            exportData.push(selectMap.checked)
        }

        for (let i = 1; i < 24; i++) { 
            selectMap = document.getElementById("T" + i)
            exportData.push(selectMap.checked)
        }

        for (let i = 1; i < 24; i++) { 
            selectMap = document.getElementById("R" + i)
            exportData.push(selectMap.checked)
        }

        for (let i = 1; i < 24; i++) { 
            selectMap = document.getElementById("C" + i)
            exportData.push(selectMap.checked)
            
        }
    }

    returnMaps() {
        /*localStorage.setItem("SZSelect", JSON.stringify(SZSelect))
        localStorage.setItem("TCSelect", JSON.stringify(TCSelect))
        localStorage.setItem("RMSelect", JSON.stringify(RMSelect))
        localStorage.setItem("CBSelect", JSON.stringify(CBSelect))*/
        dateCheck = new Date()
        updatedStatus[0] = dateCheck.getUTCDay()
        updatedStatus[1] = dateCheck.getUTCHours()
        updatedStatus[2] = dateCheck.getUTCMinutes()
        localStorage.setItem("Updated", JSON.stringify(updatedStatus))
        localStorage.setItem("Export", JSON.stringify(exportData))
    }

}



const update = document.querySelectorAll('[data-update]')
var selectMap
var SZSelect
var TCSelect
var RMSelect
var CBSelect
var exportData
var updatedStatus = []
var dateCheck = new Date()
localStorage.setItem("Updated", JSON.stringify(updatedStatus))
const GameMaps = ["The Reef", "Musselforge Fitness", "Starfish Mainstage", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Moray Towers", "Port Mackerel", "Manta Maria", "Kelp Dome", "Snapper Canal", "Blackbelly Skatepark", "Makomart", "Walleye Warehouse", "Shellendorf Institute", "Arrowana Mall", "Goby Arena", "Piranha Pit", "Camp Triggerfish", "Wahoo World", "New Albacore Hotel", "Ancho-V Games", "Skipper Pavilion"]


const mapselect = new MapSelect("placeholder")

update.forEach(button => {
    button.addEventListener('click', () => {
        mapselect.clearAll()
        mapselect.getSelectedMaps()
        mapselect.returnMaps()
    })
})
