class MapMaker {
    constructor(mapnumber, maplist) {
        this.mapnumber = mapNumber
        this.maplist = maplist
    }
    
    dataGrab() {
        mapNumber = document.getElementById("p2").value
        type = document.getElementById("p3").value
        if (mapNumber >= 200) {
            window.alert("Please choose a smaller value")
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
        this.maplistTextElement = ''
    }

    generateMaps(mapnumber) {
        for (let i = 0; i < mapnumber; i++) {
            mapmaker.pushMap(map, i, mapnumber)
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

    pushMap(map, i, mapnumber) {
        map = undefined
        if (modes[i] == "SZ") {
            map = Math.floor(Math.random() * SZMaps.length)
            
            while (mapmaker.checkMap (mapnumber, map, SZMaps, i)) {
                map = Math.floor(Math.random() * SZMaps.length)
            }
            maps.push(SZMaps[map])
        }
        if (modes[i] == "TC") {
            map = Math.floor(Math.random() * TCMaps.length)

            while (mapmaker.checkMap (mapnumber, map, TCMaps, i)) {
                map = Math.floor(Math.random() * TCMaps.length)
            }
            maps.push(TCMaps[map])
        }
        if (modes[i] == "RM") {
            map = Math.floor(Math.random() * RMMaps.length)
            
            while (mapmaker.checkMap (mapnumber, map, RMMaps, i)) {
                map = Math.floor(Math.random() * RMMaps.length)
            }
            maps.push(RMMaps[map])
        }
        if (modes[i] == "CB") {
            map = Math.floor(Math.random() * CBMaps.length)
            
            while (mapmaker.checkMap (mapnumber, map, CBMaps, i)) {
                map = Math.floor(Math.random() * CBMaps.length)
            }
            maps.push(CBMaps[map])
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
    }

    updateDisplay(mapnumber) {
        document.getElementById("p1").innerHTML = this.maplistTextElement
    }

    copy() {
        navigator.clipboard.writeText(document.getElementById("p1").innerText)
        window.alert("Copied!")
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
var mapNumber
var models
var rem
var count
var type = 0
var check
const gameModes = ["SZ", "TC", "CB", "RM"]
const SZMaps = ["The Reef", "Mussleforge Fitness", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Manta Maria", "Snapper Canal", "MakoMart", "Shellendorf Institute", "Piranha Pit", "Wahoo World", "New Albacore Hotel", "Ancho-V Games", "Skipper Pavilion"]
const TCMaps = ["The Reef", "Starfish Mainstage", "Inkblot Art Academy", "Sturgeon Shipyard", "Manta Maria", "MakoMart", "Ancho-V Games"]
const RMMaps = ["The Reef", "Mussleforge Fitness", "Starfish Mainstage", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Manta Maria", "Snapper Canal", "Blackbelly Skatepark", "MakoMart", "Ancho-V Games"]
const CBMaps = ["The Reef", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Snapper Canal", "MakoMart", "Piranha Pit", "Ancho-V Games"]
const maps = ["The Reef", "Musselforge Fitness", "Starfish Mainstage", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Moray Towers", "Port Mackerel", "Manta Maria", "Kelp Dome", "Snapper Canal", "Blackbelly Skatepark", "Makomart", "Piranha Pit", ]
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
