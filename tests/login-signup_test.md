Dokumentum száma: **kp-main**

## A Tervet készítette:

- Kovács Patrik

## Verziótörténet

| Verzió | Kiadási dátum | Leírás                     |
| ------ | ------------- | -------------------------- |
| 1.0    | 2025.03.26    | A dokumentum első verziója |

## A tesztelési feladat kontextusa
Jelen dokumentum a 2024/2025 2. félévében készül a kötelező 320 órás gyakorlat teljesítése érdekében. A dokumentum tartalmazza a **Zenész** projekt **main** részét. Ez magában foglalja a kövekező komponenseket:
- **page**
- **main**
- **infoboard-in-main**


Ez a modul felelős a bejelentkezés utáni elösszőr betöltött oldalért. A **page** kompones arra szolgál, hogy a menüsáv kivételével, egy teljes oldal nagyságát kitöltő `<div>` elemet adjunk az oldalhoz, ami igény szerint bontható kettő, illetve 3 egységes oszlopra.

Az **infoboard-in-main** komponens a főoldalon megjelenő infókártyákért felelős

A **main** kompones magában foglalja az elöző két komponenst.

Ezek a komponensek **nem tartalmaznak szolgáltatásokat** 

## Kommunikáció 

A tesztelés során email-ben történik a gyakorlatvezetővel való kommunikáció. Illetve előre egyeztetett személyes megbeszélésekre is sor kerülhet.

## Kockázatmenedzment

![kockazat](uploads/a63b95c90fed39377639bbe3a79d7905/kockazat.png)

## Kockázatcsökkentési lehetőségek:
 - gyakori commitok
 - biztonsági mentések
 - hétvégi munkavégzés szükség esetén
 - feladatra fordítandó idő felülbecslése

## Tesztmegközelítés

### Teszttechnikák

- **Funkcionális tesztelés:** A funkcionális tesztelés során leellenőrizzük, hogy a mainben definiált elemek megjelennek-e a böngészőben és hogy a különböző események helyesen futnak-e le?

- **Statikus tesztelés:** Statikus tesztelés során a forráskódot speciális eszközökkel elemezzük annak érdekében, hogy azonosítsuk a kódban rejlő potenciális hibákat, stílusbeli problémákat, vagy rossz gyakorlatokat. Ezek az eszközök figyelmeztetnek a kód hibáira anélkül, hogy azt futtatnánk, és segítenek felderíteni a lehetséges hiányosságokat. Ezáltal javítható a kód minősége és biztonsága. Egy ilyen eszköz például az _ESLint_, amely typescript kódok elemzésére szolgál.

- **Usability tesztelés:** A Usability tesztelés esetében használati eset alapú teszteket alkalmazunk, és különböző szcenáriókat definiálunk.

- **Egységtesztelés:** Az Angular cli megfelelő _Karma_ és _Jasmine_ verzióival valósítható meg. A Jasmine nyújtja nekünk a tesztelési környezetet. Itt definiáljuk a különböző eseteket és megnézzük, hogy futnak le az adott metódust használva. A Karma egy böngészői felületen keresztül visszacsatolást ad majd a tesztjeink eredményeiről.

### Belépési feltételek

- **Funkcionális tesztelés:**
  - A tesztterv elfogadása. 

- **Statikus tesztelés:** 
  - A tesztterv jóváhagyása.
  - Az ESlint megfelelő verziójának megléte.
  - Valamely text editor (pl. integrált GitLab editor, Visual Studio Code markdown pluginokkal stb.) rendelkezésre állása

- **Használhatósági tesztelés:** 
  - A tesztterv jóváhagyása.
  - Szcenáriók elkészülte.
  - Google form elkészítése(jelenleg készülőben)

- **Egységtesztelés:** 
  - A tesztterv jóváhagyása.
  - Megfelelő Karma/Jasmine verziók.
  - 
### Kilépési feltételek

- **Funkcionális tesztelés:**
  - Az esetleges hibák kijavítása 

- **Statikus tesztelés:** 
  - Review riport elkészítése

- **Használhatósági tesztelés:** 
  - A felvázolt szenáriók ellenőrzése.
  - A googleform-ra való visszajelzések ellenőrzése és a hibák esetleges javítása

- **Egységtesztelés:** 
  - Legalább 80%-os lefedetségi szint.


### Tesztkörnyezet
- Minden teszt egy **Lenovo Legion 5**-ös laptopon fog lefutni. Viszont nincs specifikus hardverkövetelmény.
- A statikus teszteléshez szükséges az : **ESlint** `npm init @eslint/config@latest`
- Az egységtesztekhez a megfelelő **Karma/Jasmine** verziók (Ezek előzetesen telepítve lettek)

## Ütemterv
A modul tesztelésére a teszterv elfogadásától kezdve maximum 2 munkanap áll rendelkezésre. A különböző tesztek előrelátható eloszlása a következő:

| Funkcionális tesztelés | Statikus elemzés | Usability tesztelés | Egységtesztelés |
|------------------------|------------------|---------------------|-----------------|
| 10%                   | 10%              | 20%                 | 60%             |

Mivel a jelenlegi komponensekben leginkább a DOM ellenőrizhető és az ehhez való tudást még nem sajátítottam el, ezért az **egységtesztek**re szánt idő jóval nagyobb arányban szerepel az ütemtervben. 

## Felelősségek kiosztása

| Név | Felelősség |
| ----------- | ------ |
|Kovács Patrik|Tesztelő/Fejlesztő|