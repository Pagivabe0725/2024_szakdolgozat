Dokumentum száma: **kp-login-signup**

## A Tervet készítette:

- Kovács Patrik

## Verziótörténet

| Verzió | Kiadási dátum | Leírás                     |
| ------ | ------------- | -------------------------- |
| 1.0    | 2025.03.18    | A dokumentum első verziója |


## A tesztelési feladat kontextusa

Jelen dokumentum a 2024/2025 2. félévében készül a kötelező 320 órás gyakorlat teljesítése érdekében. A dokumentum tartalmazza a **Zenész** projekt *bejelentkezésért* és a *regisztrációért* felelős modul teszttervét. 

A modul felelős a bejelentkezési/regisztrációs adatok számonkéréséért, ellenőrzéséért és azok kezeléséért. Több komponens (component) és szolgáltatás (service) tartozik ehhez a modulhoz. A komponensekben meglévő logika felel az űrlapok és a hozzájuk tartozó információs szöveg megjelenítéséért, az űrlapok adatainak ellenőrzéséért, a felhasználó figyelmének felhívásáért a hibás formátumu adatokra.

A **Komponensek** tartalmazzák a böngészőkben megjelenítendő *(html/css)* fájlokat, valamint a komponensek mögötti logikákat tartalmazó *typeScript* és azok tesztelésére szolgáló *spec.ts* fájlokat. Jelen modulban szereplő komponensek a következőek:
 - **left-side**:
   A böngésző bal oldalán elhelyezkedő, a regisztráció és bejelentkezés menetéről információt tároló rész.

 - **login**:
   A bejelentkezési űrlapot tartalmazó komponens.

 - **sign-up**:
   A regisztrációs űrlapot tartalmazó komponens.

 - **public**:
   Az ezt megelőző komponenseket összefoglaló komponens.

A **Szolgáltatások** tartalmazzák a a projekt során többször felhasznált _komponensfüggetlen_ kódrészleteket. Ez a modul a következő szolgáltatásokat használják:

 - **userService**:
 A felhasználók be/ki jelentkeztetéséért és adataik lekéréséért felelős szolgáltatás.

 - **navigationService**:
 A különböző url műveleteket tartalmazó szolgáltatás.

 - **popupSercice**:
 A különböző felhasználói műveleteket követő felugró ablakot működtető szolgáltatás.

A tesztelés fő célja, a modul által magában foglalt elemek funkcióinak tesztelése, unit tesztek írása, az esetlegesen felmerülő hibák korrigálása és a modul stabil futásának biztosítása.

**Statikus** tesztek során megtörténik a forráskód elemzése, mely magában foglalja a kódminőség ellenőrzését és javítását. Valamint a szemmel látható kódhibák javítását. A **használhatósági** tesztelés során a modul komponenseinek kezelőfelületét és felhasználói élményét vizsgáljuk és javítjuk az esetlegesen felmerülő hibákat. Uolsó lépésben pedig **egységtesztek**kel látjuk el a komponensek funkcióit.

## Kommunikáció 

A tesztelés során email-ben történik a gyakorlatvezetővel való kommunikáció. Illetve előre egyeztetett személyes megbeszélésekre is sor kerülhet.

## Kockázatmenedzment



