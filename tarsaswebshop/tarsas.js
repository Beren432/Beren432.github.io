/* az "url" változó értéke a main.js-ben van definiálva

FÜGGVÉNYEK LISTÁJA:
tarsasMegjelenito(event)
tarsasAdatai(tarsas)
mennyisegValtozas(event, raktaronVan, aktualisanRendelve)
rendeles(rendeltJatek)
 */

function tarsasMegjelenito(event) {

    if (event !== undefined) {
        event.preventDefault();
    }

    let keresettNev = document.getElementById("kernev").value;
    let keresettEvmin = Number(document.getElementById("kerkiadevmin").value);
    let keresettEvmax = Number(document.getElementById("kerkiadevmax").value);
    let keresettJatSzammin = Number(document.getElementById("kerjatmin").value);
    let keresettJatSzammax = Number(document.getElementById("kerjatmax").value);
    let keresettIdomin = Number(document.getElementById("keridomin").value);
    let keresettIdomax = Number(document.getElementById("keridomax").value);
    let keresettJatKormin = Number(document.getElementById("kerjatkormin").value);
    let keresettJatKormax = Number(document.getElementById("kerjatkormax").value);
    let keresettNehmin = Number(document.getElementById("kernehmin").value);
    let keresettNehmax = Number(document.getElementById("kernehmax").value);
    let keresettTemaTipus = document.querySelectorAll("input[type=checkbox]");
    let keresettTT = [];

    for (let n = 0; n < keresettTemaTipus.length; n++) {
        if (keresettTemaTipus[n].checked == true) {
            keresettTT.push(keresettTemaTipus[n].value)
        }
    }

    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    }
    fetch(`${url}/tarsasok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        tarsasok => {

            let keresettTarsasok = [];

            for (let k = 0; k < tarsasok.length; k++) {

                if (tarsasok[k].nev.toLowerCase().includes(keresettNev.toLowerCase()) &&
                    tarsasok[k].kiadaseve >= keresettEvmin && tarsasok[k].kiadaseve <= keresettEvmax &&
                    tarsasok[k].maxjatekosszam >= keresettJatSzammin && tarsasok[k].maxjatekosszam <= keresettJatSzammax &&
                    tarsasok[k].minjatekido >= keresettIdomin && tarsasok[k].minjatekido <= keresettIdomax &&
                    tarsasok[k].minjatekoskor >= keresettJatKormin && tarsasok[k].minjatekoskor <= keresettJatKormax &&
                    tarsasok[k].nehezseg >= keresettNehmin && tarsasok[k].nehezseg <= keresettNehmax) {

                    let temamegvan = false;
                    let tipusmegvan = false;
                    for (let m = 0; m < keresettTT.length; m++) {
                        if (tarsasok[k].tema == keresettTT[m]) {
                            temamegvan = true;
                        }
                        else if (tarsasok[k].tipus == keresettTT[m]) {
                            tipusmegvan = true;
                        }
                    }
                    if (temamegvan == true && tipusmegvan == true) {
                        keresettTarsasok.push(tarsasok[k]);
                    }
                }
            }

            if (keresettTarsasok.length == 0) {
                document.getElementById("tarsasoklistaja").innerHTML = "A keresési feltételeknek megfelelő játék nem található az adatbázisban.";
                return;
            }

            let rendezesiElv = document.getElementsByTagName("option");
            for (let l = 0; l < rendezesiElv.length; l++) {
                if (rendezesiElv[l].selected) {

                    switch (rendezesiElv[l].value) {
                        case "abcsorrend":
                            keresettTarsasok.sort(function (a, b) {
                                if (a.nev < b.nev) {
                                    return -1;
                                }
                                if (a.nev > b.nev) {
                                    return 1;
                                }
                                return 0
                            });
                            break;
                        case "arszerint":
                            keresettTarsasok.sort(function (a, b) {
                                if (a.ar < b.ar) {
                                    return -1;
                                }
                                if (a.ar > b.ar) {
                                    return 1;
                                }
                                return 0
                            });
                            break;
                        case "evszerint":
                            keresettTarsasok.sort(function (a, b) {
                                if (a.kiadaseve > b.kiadaseve) {
                                    return -1;
                                }
                                if (a.kiadaseve < b.kiadaseve) {
                                    return 1;
                                }
                                return 0
                            });
                            break;
                    }
                }
            }

            let megjelenitendoElem = [];

            fetchInit = {
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

                    for (let i = 0; i < keresettTarsasok.length; i++) {
                        let rendelvevan = 0;
                        for (let j = 0; j < aktUser.kosar.length; j = j + 2) {
                            if (aktUser.kosar[j] == keresettTarsasok[i].id) {     //rendelve van
                                rendelvevan = aktUser.kosar[j + 1]
                            }
                        }

                        megjelenitendoElem += `
                        <div class="tarsasElem ${rendelvevan > 0 ? "rendelve" : ""}" onclick="tarsasAdatai(${keresettTarsasok[i].id})">
                          <img src = "https://cf.geekdo-images.com/${keresettTarsasok[i].bggkep}">
                          <div><b>${keresettTarsasok[i].nev}</b></div>
                          <div>${keresettTarsasok[i].ar} Ft</div>`;

                        if (rendelvevan > 0) {
                            megjelenitendoElem += `<div style="font-size:13px; color:dodgerblue">Rendelve: ${rendelvevan} db</div>`
                        }
                        megjelenitendoElem += `</div>`
                        document.getElementById("tarsasoklistaja").innerHTML = megjelenitendoElem;
                    }
                }
            )
        }
    )
}

function tarsasAdatai(tarsas) {
    document.getElementById("tartalom").style.width = "67%";
    document.getElementById("tarsasadatok").style.width = "23%";
    document.getElementById("tarsasadatok").style.padding = "30px";

    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    }
    fetch(`${url}/tarsasok/${tarsas}`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        tarsasAdatai => {

            fetchInit = {
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

                    document.getElementById("tarsasadatok").innerHTML = `
                    <div id="tarsasadatmegjelenites">
                        <img src = "https://cf.geekdo-images.com/${tarsasAdatai.bggkep}"><br>
                        <div><h3>${tarsasAdatai.nev}</h3></div>
                        <div>${tarsasAdatai.tema}, ${tarsasAdatai.tipus}</div><br>
                        <div>Kiadás éve: ${tarsasAdatai.kiadaseve}</div>
                        <div>Tervező: ${tarsasAdatai.tervezo}</div>
                        <div>Max. játékosszám: ${tarsasAdatai.maxjatekosszam}</div>
                        <div>Játékidő: ${tarsasAdatai.minjatekido}-${tarsasAdatai.minjatekido * 2} perc</div>
                        <div>Nehézség: ${tarsasAdatai.nehezseg}/5</div>
                        <div>${tarsasAdatai.minjatekoskor} éves kortól</div><br>
                        <div><a href="http://boardgamegeek.com/boardgame/${tarsasAdatai.bggid}" target="_blank"><b>BoardGameGeek link</b></a></div><br>
                        <div><b>${tarsasAdatai.ar} Ft</b></div>
                        <div id="raktaronvan">Raktáron van még: ${tarsasAdatai.raktaron} db</div><br>`;

                    if (aktUser.felhasznaloNev != "") {     //user be van lépve

                        let rendeltmennyiseg = 0;
                        for (let i = 0; i < aktUser.kosar.length; i = i + 2) {
                            if (aktUser.kosar[i] == tarsasAdatai.id) {
                                rendeltmennyiseg = aktUser.kosar[i + 1];
                            }
                        }

                        document.getElementById("tarsasadatok").innerHTML +=
                            `<label for="rendeltmenyiseg" style="color:dodgerblue">Aktuális rendelés:</label>
                            <input onchange="mennyisegValtozas(event,${tarsasAdatai.raktaron},${rendeltmennyiseg})" type="number" id="rendeltmennyiseg" name="rendeltmennyiseg" required value=${rendeltmennyiseg} min="0" max=${tarsasAdatai.raktaron + rendeltmennyiseg}>                           
                            <button onclick="rendeles(${tarsasAdatai.id})" style="background-color:dodgerblue">Rendelés</button>`
                    };
                    document.getElementById("tarsasadatok").innerHTML += `<button onclick="ablakBezarasa(1)">Bezárás</button>
                    </div>`
                }
            )
        }
    )
}

function mennyisegValtozas(event, raktaronVan, aktualisanRendelve) {
    event.preventDefault();

    let mennyiseg = Number(document.getElementById("rendeltmennyiseg").value);
    document.getElementById("raktaronvan").innerHTML = `Raktáron van még: ${(raktaronVan + aktualisanRendelve) - mennyiseg} db`;
}

function rendeles(rendeltJatek) {
    let mennyiseg = Number(document.getElementById("rendeltmennyiseg").value);

    let kosartartalma = [];

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
        userAdatai => {

            kosartartalma = userAdatai.kosar;
            let rendelvevan = false;
            let eddigirendeles = 0;
            for (let i = 0; i < userAdatai.kosar.length; i = i + 2) {
                if (userAdatai.kosar[i] == rendeltJatek) {      //ebből a játékból már rendelt
                    eddigirendeles = userAdatai.kosar[i + 1];
                    userAdatai.kosar[i + 1] = mennyiseg;
                    mennyiseg -= eddigirendeles;

                    if (userAdatai.kosar[i + 1] <= 0) {
                        kosartartalma.splice(i, 2);
                    }
                    rendelvevan = true;
                }
            }
            if (!rendelvevan) {
                kosartartalma.push(rendeltJatek);
                kosartartalma.push(mennyiseg);
            }

            fetchInit = {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                mode: "cors",
                cache: "default",
                body: JSON.stringify({ kosar: kosartartalma })
            };

            fetch(`${url}/aktualisUser/1`, fetchInit).then(
                data => data.json(),
                err => console.error(err)
            ).then(
                userAdatai => {

                    fetchInit = {
                        method: "GET",
                        headers: new Headers(),
                        mode: "cors",
                        cache: "default"
                    }
                    fetch(`${url}/tarsasok/${rendeltJatek}`, fetchInit).then(
                        data => data.json(),
                        err => console.error(err)
                    ).then(
                        tarsasAdatai => {

                            fetchInit = {
                                method: "PATCH",
                                headers: { "Content-type": "application/json" },
                                mode: "cors",
                                cache: "default",
                                body: JSON.stringify({ raktaron: tarsasAdatai.raktaron - mennyiseg })
                            };

                            fetch(`${url}/tarsasok/${rendeltJatek}`, fetchInit).then(
                                data => data.json(),
                                err => console.error(err)
                            )
                        }
                    )
                }
            )
        }
    )
}


tarsasMegjelenito();