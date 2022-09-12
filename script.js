class MapMaker {
    constructor(mapnumber, maplist) {
        this.mapnumber = mapNumber
        this.maplist = maplist
    }
    
    dataGrab() {
        mapNumber = document.getElementById("p2").value
        type = document.getElementById("p3").value
        if (mapNumber >= 100) {
            window.alert("Please choose a lower map count")
            return false
        }

        if (Number.isInteger(mapNumber) || mapNumber <= 0) {
            window.alert("Please choose a real number of maps")
            return false
        }
    }

    clr(mapnumber) {
        mode = undefined
        mapNumber = undefined
        map = undefined
        maps = []
        modes = []
        maplist = []
        models = undefined
        rem = undefined
        count = undefined
        check = undefined
        mapPool = undefined
        this.maplistTextElement = ''
    }

    generateMaps(mapnumber) {
        for (let i = 0; i < mapnumber; i++) {
            mapmaker.pushMap(map, i, mapnumber, mapPool)
        }
    }

    checkMap (mapnumber, map, modeList, i) {
        if (mapnumber >= modeList.length) {
            check = modeList.length
        }

        else if (mapnumber < modeList.length) {
            check = mapnumber
        }

        for (let ar = 0; ar < check; ar++) {
            if (modeList[map] == maps[i - ar]) {
                return true
            }
        }

        return false
    }

    pushMap(map, i, mapnumber, mapOption) {
        map = undefined
        if (mapOption == "selected") {
            var SZPool = SZUpdate
            var TCPool = TCUpdate
            var RMPool = RMUpdate
            var CBPool = CBUpdate

        }
        else {
            var SZPool = defSZMaps
            var TCPool = defTCMaps
            var RMPool = defRMMaps
            var CBPool = defCBMaps
        }
        if (modes[i] == "SZ") {
            map = Math.floor(Math.random() * SZPool.length)
            
            while (mapmaker.checkMap (mapnumber, map, SZPool, i)) {
                map = Math.floor(Math.random() * SZPool.length)
            }
            maps.push(SZPool[map])
        }
        if (modes[i] == "TC") {
            map = Math.floor(Math.random() * TCPool.length)

            while (mapmaker.checkMap (mapnumber, map, TCPool, i)) {
                map = Math.floor(Math.random() * TCPool.length)
            }
            maps.push(TCPool[map])
        }
        if (modes[i] == "RM") {
            map = Math.floor(Math.random() * RMPool.length)
            
            while (mapmaker.checkMap (mapnumber, map, RMPool, i)) {
                map = Math.floor(Math.random() * RMPool.length)
            }
            maps.push(RMPool[map])
        }
        if (modes[i] == "CB") {
            map = Math.floor(Math.random() * CBPool.length)
            
            while (mapmaker.checkMap (mapnumber, map, CBPool, i)) {
                map = Math.floor(Math.random() * CBPool.length)
            }
            maps.push(CBPool[map])
        }
    }

    generateModes(mapnumber) {
        if (type == 1) {
            mapmaker.genModeGroup(mapNumber)
        }
        if (type == 0) {
            mapmaker.genModeNormal(mapNumber)
        }
    }

    genModeNormal (mapnumber) {
        mode = Math.floor(Math.random() * 4)
        for (let t = 0; t < mapnumber; t++) {
            modes.push(gameModes[mode])
            
            if (mode == 3) {
                mode = 0
            }
            else {
                mode = mode + 1
            }
        }
    }

    genModeGroup (mapnumber) {
        mode = Math.floor(Math.random() * 4)
        rem = mapnumber % 4
        count = Math.floor(mapnumber / 4)
        models = mapnumber / count
        /* use remainder to control how many times a loop is run with the mapnumber/models + 1
        This is to make the extra maps generated next to their mode*/
        for (let t = 0; t < rem; t++) {
            for (let e = 0; e < count + 1; e++) {
                modes.push(gameModes[mode])
            }

            if (mode == 3) {
                mode = 0
            }
            else {
                mode = mode + 1
            }
        }
        for (let i = 0; i < models; i++) { 
            for (let e = 0; e < count; e++) {
                modes.push(gameModes[mode])
            }
            
            if (mode == 3) {
                mode = 0
            }
            else {
                mode = mode + 1
            }
        }
    }


    combine(mapnumber) {
        for (let i = 0; i < mapnumber; i++) { 
            maplist.push((i+1) + ") " + modes[i] + " on " + maps[i] + "<br>")
        }
        this.maplistTextElement = maplist.join('')
        console.log(this.maplistTextElement)
    }

    updateDisplay(mapnumber) {
        document.getElementById("p1").innerHTML = this.maplistTextElement
    }

    copy() {
        navigator.clipboard.writeText(document.getElementById("p1").innerText)
        window.alert("Copied!")
    }

    mapsChoice(updated) {
        dateTime = new Date()
        console.log(updated)
        if (updated == null) {
            return "default"
        }
        if (updated[0] == dateTime.getUTCDay() && updated[1] + 2 >= dateTime.getUTCHours() && updated[2] + 30 >= dateTime.getUTCMinutes() && updated != null) {
            return "selected"
        }
        else {
            return "default"
        }
    }

    processImport(data) {
        UpSZ = data.slice(0,12)
        UpTC = data.slice(12,24)
        UpRM = data.slice(24,36)
        UpCB = data.slice(36,48)

        console.log(UpTC)

        SZUpdate = mapmaker.evaluateImport(UpSZ)
        console.log(SZUpdate)
        TCUpdate = mapmaker.evaluateImport(UpTC)
        RMUpdate = mapmaker.evaluateImport(UpRM)
        CBUpdate = mapmaker.evaluateImport(UpCB)
    }

    evaluateImport(data) {
        processed = []
        for (let i = 0; i <= data.length; i++) {
            if (data[i] == true) {
                processed.push(GameMaps[i])
            }
        }
        return processed
    }

    checkData() {

    }
}

const maplistTextElement = document.querySelectorAll('[data-maplist]')
var maplist = []
var copyText
const generate = document.querySelectorAll('[data-generate-button]')
const copy = document.querySelectorAll('[data-copy]')
const normal = document.querySelectorAll('[data-normal]')
const grouped = document.querySelectorAll('[data-grouped]')
//const mapNumber = document.querySelectorAll('data-map-number')
const updated = JSON.parse(localStorage.getItem("Updated"))
const importData = JSON.parse(localStorage.getItem("Export"))
var SZUpdate
var TCUpdate
var RMUpdate
var CBUpdate
var UpSZ
var UpTC
var UpRM
var UpCB
var mapNumber
var models
var rem
var count
var type = 0
var check
var mapPool
var processed = []
var dateTime = new Date()
const gameModes = ["SZ", "TC", "CB", "RM"]
const defSZMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Musuem d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
const defTCMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Musuem d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
const defRMMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Musuem d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
const defCBMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Musuem d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
const GameMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Musuem d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
var maps = [""]
var modes = [""] 
var map = 0
var mode = 0


const mapmaker = new MapMaker(mapNumber, maplistTextElement)



generate.forEach(button => {
    button.addEventListener('click', () => {
        mapmaker.clr(mapNumber)
        document.getElementById("p1").innerHTML = ""
        mapmaker.dataGrab()
        mapPool = mapmaker.mapsChoice(updated)
        if (mapPool == "selected") {
            mapmaker.processImport(importData)
        }
        mapmaker.generateModes(mapNumber)
        mapmaker.generateMaps(mapNumber)
        mapmaker.combine(mapNumber)
        mapmaker.updateDisplay(mapNumber)
    })
})


copy.forEach(button => {
    button.addEventListener('click', () => {
        mapmaker.copy()
    })
})
