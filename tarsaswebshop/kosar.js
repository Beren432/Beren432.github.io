/* az "url" változó értéke a main.js-ben van definiálva

FÜGGVÉNYEK LISTÁJA:
kosarmegjelenites()
fizetes(event)
*/

function kosarmegjelenites() {
    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    }
    fetch(`${url}/aktualisUser/1`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        aktUser => {

            if (aktUser.kosar.length == 0) {    //nincs rendelt játék
                document.getElementById("rendelestablazat").style.display = "none";
                document.getElementById("rendelesszoveg").innerHTML = "A kosarad még üres, nincs rendelésed."
                return;
            }
            document.getElementById("rendelesszoveg").innerHTML = "A következő játékokat rendelted meg:<br><br>"

            let osszesrendeles = 0;
            for (let i = 0; i < aktUser.kosar.length; i = i + 2) {

                let ujsor = document.createElement("tr");
                let ujcella = [];

                fetchInit = {
                    method: "GET",
                    headers: new Headers(),
                    mode: "cors",
                    cache: "default"
                }
                fetch(`${url}/tarsasok/${aktUser.kosar[i]}`, fetchInit).then(
                    data => data.json(),
                    err => console.error(err)
                ).then(
                    rendeltTarsas => {

                        for (let j = 0; j < 3; j++) {
                            ujcella[j] = document.createElement("td");

                            switch (j) {
                                case 0: ujcella[j].innerHTML = rendeltTarsas.nev;
                                    break;
                                case 1: ujcella[j].innerHTML = rendeltTarsas.ar;
                                    break;
                                case 2: ujcella[j].innerHTML = aktUser.kosar[i + 1];
                                    break;
                            }
                            ujsor.appendChild(ujcella[j]);
                        }
                        document.getElementById("rendelestablazat").appendChild(ujsor);
                        osszesrendeles += rendeltTarsas.ar * aktUser.kosar[i + 1];

                        document.getElementById("rendelesosszege").innerHTML = `
                        <br><b>Rendelésed teljes összege: ${osszesrendeles} Ft</b><br><br>
                        <button onclick="fizetes(event)" style="background-color: dodgerblue">Fizetés</button>
                        <button onclick="kosarTorlese(event,0)" style="background-color: dodgerblue">Kosár törlése</button>
                        `
                    }
                )
            }
        }
    )
}

function fizetes(event) {
    event.preventDefault();

    fetchInit = {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        mode: "cors",
        cache: "default",
        body: JSON.stringify({ kosar: [] })
    };

    fetch(`${url}/aktualisUser/1`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        alert("Sikeres fizetés. Köszönjük a vásárlást!")
    )
}

kosarmegjelenites();