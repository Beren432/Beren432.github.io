const url = "http://localhost:3000";
const indexpathname = "/index.html";

/* FÜGGVÉNYEK LISTÁJA:
udvozletmegjelenito()
userBeleptetese(event)
bejelentkezoAblak(event)
regisztracio(event)
ablakBezarasa(mod)
kosarTorlese(mod)
 */

function udvozletMegjelenito() {
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
            if (aktUser.felhasznaloId == 0) {
                if (location.pathname == indexpathname) {
                    document.getElementById("udvozlet").innerHTML = "<p>Még nem vagy belépve. Javaslom, jelentkezz be, vagy ha még nem vagy regisztrálva, akkor regisztrálj!</p>"
                }

                document.getElementById("regisztracio").href = "regisztracio.html"
                document.getElementById("regisztracio").classList.remove("rejtett");
                document.getElementById("kijelentkezes").parentElement.style.display = "none";
                document.getElementById("bejelentkezes").parentElement.style.display = "block";

                document.getElementById("kosar").href = ""
                document.getElementById("kosar").classList.add("rejtett");
                document.getElementById("admin").href = ""
                document.getElementById("admin").classList.add("rejtett");
            }
            else { //user be van lépve
                if (location.pathname == indexpathname) {
                    document.getElementById("udvozlet").innerHTML = "<p>Be vagy lépve, mint <b>" + aktUser.felhasznaloNev + "</b>. Kellemes nézelődést!</p>";
                }

                document.getElementById("bejelentkezes").parentElement.style.display = "none";
                document.getElementById("kijelentkezes").parentElement.style.display = "block";

                document.getElementById("regisztracio").href = ""
                document.getElementById("regisztracio").classList.add("rejtett");
                document.getElementById("kosar").href = "kosar.html"
                document.getElementById("kosar").classList.remove("rejtett");
                document.getElementById("admin").href = "admin.html"
                document.getElementById("admin").classList.remove("rejtett");
            }
        }
    )
}

function userBeleptetese(event) {
    event.preventDefault();

    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    };

    fetch(`${url}/felhasznalok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        felhasznalok => {
            for (let i = 0; i < felhasznalok.length; i++) {
                if (felhasznalok[i].nev == event.target.elements.userneve.value) {
                    if (felhasznalok[i].password == event.target.elements.userjelszava.value) {
                        let user = {
                            id: 1,
                            felhasznaloId: felhasznalok[i].id,
                            felhasznaloNev: felhasznalok[i].nev,
                            kosar: [],
                            kereses: []
                        };

                        fetchInit = {
                            method: "PUT",
                            headers: { "Content-type": "application/json" },
                            mode: "cors",
                            cache: "default",
                            body: JSON.stringify(user)
                        };

                        fetch(`${url}/aktualisUser/1`, fetchInit).then(
                            data => data.json(),
                            err => console.error(err)
                        )
                        ablakBezarasa(0);
                        return;
                    }
                    else {
                        alert("Helytelen jelszó!");
                        return;
                    }
                }
            }
            alert("Még nem vagy beregisztrálva!")
            return;
        }
    )
}

function bejelentkezoAblak(event) {
    event.preventDefault();
    document.getElementById("bejelentkezo-oldal-hatter").style.display = "block";
    document.getElementById("bejelentkezo-oldal-hatter").innerHTML = `
    <div id="bejelentkezo-oldal">
            <h3>BEJELENTKEZÉS</h3><br>
            <form onsubmit="userBeleptetese(event)">
            <label for="felhnev">Felhasználó neved:</label><br> 
            <input type="text" id="felhnev" name="userneve" required pattern="[A-Za-z0-9]{3,12}"><br>
            <label for="felhjelszo1">Jelszavad:</label><br> 
            <input type="password" id="felhjelszo1" name="userjelszava" required pattern="[A-Za-z0-9]{5,12}"><br><br>
            <button onclick="ablakBezarasa(0)">Vissza</button>
            <input type="submit" style="background-color:dodgerblue" value="Bejelentkezem">
            </form>
        </div>
        `
}

function regisztracio(event) {
    event.preventDefault();

    let felhneve = event.target.elements.felhnev.value;
    let felhjelszo1 = event.target.elements.felhjelszo1.value;
    let felhjelszo2 = event.target.elements.felhjelszo2.value;
    let felhneme = (event.target.elements.felhneme.value == "true");
    let felhkora = event.target.elements.felhkora.value;
    let felhtapasztalata = event.target.elements.felhtapasztalata.value;

    if (felhjelszo1 != felhjelszo2) {
        alert("Nem egyezik a két beírt jelszó! Ellenőrizd újra!")
        return;
    }

    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    };

    fetch(`${url}/felhasznalok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        felhasznalok => {
            let legnagyobbid = 0;
            for (let i = 0; i < felhasznalok.length; i++) {
                legnagyobbid = felhasznalok[i].id;
                if (felhneve == felhasznalok[i].nev) {
                    if (felhjelszo1 == felhasznalok[i].password) {
                        alert("Már be vagy regisztrálva! Jelentkezz be!")
                        return;
                    }
                    else {
                        alert("Már létezik ilyen nevű felhasználó! Válassz másik nevet!")
                        return;
                    }
                }

                if (felhjelszo1 == felhasznalok[i].password) {
                    alert("Ez a jelszó már foglalt! Válassz másikat!")
                    return;
                }
            }

            let user = {
                nev: felhneve,
                password: felhjelszo1,
                ferfi: felhneme,
                kor: felhkora,
                hanyeve: felhtapasztalata,
                kedvencek: []
            };

            fetchInit = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                mode: "cors",
                cache: "default",
                body: JSON.stringify(user)
            };

            fetch(`${url}/felhasznalok`, fetchInit).then(
                data => data.json(),
                err => console.error(err)
            ).then(() => {
                alert("Sikeres regisztráció!");

                user = {
                    id: 1,
                    felhasznaloId: legnagyobbid + 1,
                    felhasznaloNev: felhneve,
                    kosar: [],
                    kereses: []
                };

                fetchInit = {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    mode: "cors",
                    cache: "default",
                    body: JSON.stringify(user)
                };

                fetch(`${url}/aktualisUser/1`, fetchInit).then(
                    data => data.json(),
                    err => console.error(err)
                )
            }
            )
        }
    )
}

function ablakBezarasa(mod) {
    //mod= 0: bejelentkezőablak, 1: társasjáték adatai ablak, 2: társasjáték admin ablak
    switch (mod) {
        case 0:
            document.getElementById("bejelentkezo-oldal-hatter").style.display = "none";
            document.getElementById("bejelentkezo-oldal-hatter").innerHTML = "";
            break;
        case 1:
            document.getElementById("tartalom").style.width = "90%";
            document.getElementById("tarsasadatok").style.width = "0";
            document.getElementById("tarsasadatok").style.padding = "0";
            break;
        case 2:
            document.getElementById("tarsasadat-hatter").style.display = "none";
            break;
    }
}

function kosarTorlese(event, mod) {
    //mod: 0 Kosár törlése, 1: Kijelentkezés
    event.preventDefault();

    if (mod == 1 && confirm("Biztosan kijelentkezel? Ha van valami a kosaradban, akkor az törlésre kerül!") == false) {
        return;
    }

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

            fetchInit = {
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
                    for (let i = 0; i < aktUser.kosar.length; i = i + 2) {

                        fetchInit = {
                            method: "PATCH",
                            headers: { "Content-type": "application/json" },
                            mode: "cors",
                            cache: "default",
                            body: JSON.stringify({ raktaron: tarsasok[(aktUser.kosar[i]) - 1].raktaron + aktUser.kosar[i + 1] })
                        };
                        
                        fetch(`${url}/tarsasok/${aktUser.kosar[i]}`, fetchInit).then(
                            data => data.json(),
                            err => console.error(err)
                        )
                    }

                    if (mod == 1) {
                        let user = {
                            id: 1,
                            felhasznaloId: 0,
                            felhasznaloNev: "",
                            kosar: [],
                            kereses: []
                        };

                        fetchInit = {
                            method: "PUT",
                            headers: { "Content-type": "application/json" },
                            mode: "cors",
                            cache: "default",
                            body: JSON.stringify(user)
                        };

                        fetch(`${url}/aktualisUser/1`, fetchInit).then(
                            data => data.json(),
                            err => console.error(err)
                        ).then(
                            alert("Sikeresen kijelentkeztél! Várunk vissza!")
                        )
                    }
                    else {
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
                        )
                    }
                })
        }
    )
}

udvozletMegjelenito();