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
        freq_matrix = []
        htmlMatrixOut = []
    }

    getSelectedMaps() {
        for (let i = 1; i < 13; i++) { 
            selectMap = document.getElementById("S" + i)
            mapselect.selectFreqGen(selectMap)
        }
        for (let i = 1; i < 13; i++) { 
            selectMap = document.getElementById("T" + i)
            mapselect.selectFreqGen(selectMap)
        }

        for (let i = 1; i < 13; i++) { 
            selectMap = document.getElementById("R" + i)
            mapselect.selectFreqGen(selectMap)
        }

        for (let i = 1; i < 13; i++) { 
            selectMap = document.getElementById("C" + i)
            mapselect.selectFreqGen(selectMap)
        }
    }



    selectFreqGen(map) {
        if (map.checked == true) {
            exportData.push(1)
        }

        else {
            exportData.push(0)
        }
    }

    returnMaps() {
        mapselect.updateStatus("Updated")
        localStorage.setItem("Export", JSON.stringify(exportData))
    }

    updateStatus(localSpot) {
        dateCheck = new Date()
        updatedStatus[0] = dateCheck.getUTCDay()
        updatedStatus[1] = dateCheck.getUTCHours()
        updatedStatus[2] = dateCheck.getUTCMinutes()
        localStorage.setItem(localSpot, JSON.stringify(updatedStatus))
    }

    /* genFreqMatrixHtml() {
        htmlMatrixOut[0] = "<table>"
        for (let i = 0; i < freq_matrix.length; i++) {
            htmlMatrixOut.push("<tr>")
            for (let j=0; i < freq_matrix[i].length; i++) {
                htmlMatrixOut.push("<td>")
                htmlMatrixOut.push(freq_matrix[i][j])
                htmlMatrixOut.push("</td>")
            }
            htmlMatrixOut.push("</tr>")
        }
        htmlMatrixOut.push("</table>")


        htmlMatrixOut = htmlMatrixOut.join('')
        //document.getElementById("output").innerHTML = htmlMatrixOut;
        var test = document.getElementById("output").innerHTML
        console.log(test)
    } */

    exportFreqMatrix() {
        mapselect.updateStatus("freq_update")
        localStorage.setItem("Freq_Matrix", JSON.stringify(freq_matrix))
    }
}



const update = document.querySelectorAll('[data-update]')
const matrix = document.querySelectorAll('[data-matrix')
var selectMap
var SZSelect
var TCSelect
var RMSelect
var CBSelect
var exportData
var updatedStatus = []
var htmlMatrixOut = []
var dateCheck = new Date()
localStorage.setItem("Updated", JSON.stringify(updatedStatus))
const GameMaps = ["Scorch Gorge", "Eeltail Alley", "Hagglefish Market", "Undertow Spillway", "Mincemeat Metalworks", "Hammerhead Bridge", "Meseum d'Alfonsino", "Mahi-Mahi Resort", "Inkblot Art Academy", "Sturgeon Shipyard", "MakoMart", "Wahoo World"]
let freq_matrix = [
    ['X','Splat Zones', 'Tower Control', 'Rainmaker', 'Clam Blitz']
]


const mapselect = new MapSelect("placeholder")

update.forEach(button => {
    button.addEventListener('click', () => {
        mapselect.clearAll()
        mapselect.getSelectedMaps()
        mapselect.returnMaps()
    })
})

/*matrix.forEach(button => {
    button.addEventListener('click', () => {
        mapselect.genFreqMatrix()
        console.table(freq_matrix)
        mapselect.genFreqMatrixHtml()
        mapselect.exportFreqMatrix()
    })
})*/
