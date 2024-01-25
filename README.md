
https://github.com/kacaleksandra/szalone_bloczki/assets/49205215/ff016902-f1ad-4705-8fa7-51793eb56d7a

# SzaloneBloczki

Celem projektu jest stworzenie aplikacji mobilnej o nazwie „SzaloneBloczki”, która będzie pełniła funkcję edukacyjną poprzez pomoc w zrozumieniu działaniu algorytmów oraz schematów blokowych.

## Cel Projektu

"SzaloneBloczki" mają dostarczyć użytkownikom narzędzia do eksploracji, nauki i eksperymentowania z algorytmami w sposób intuicyjny i interaktywny. Aplikacja ma być użytecznym narzędziem zarówno dla początkujących, jak i zaawansowanych programistów oraz studentów nauk informatycznych i matematycznych.

## Funkcje Aplikacji Mobilnej

Aplikacja mobilna powinna zawierać następujące podstawowe funkcjonalności:

- Możliwość tworzenia własnych schematów blokowych.

- Wizualizację algorytmów na podstawie utworzonych schematów blokowych.

- Pracę krokową i ciągłą – użytkownik może wybrać tryb pracy krokowej lub tryb ciągły.

- Możliwość eksportu schematu blokowego do formatu PDF.

- Odczyt i zapis utworzonych schematów blokowych.

- Eksport algorytmu do Python.


## Uruchamianie Projektu

Aby uruchomić projekt "SzaloneBloczki", wykonaj poniższe kroki:

### Instalacja zależności i uruchomienie projektu

Upewnij się, że masz zainstalowanego [Yarn](https://yarnpkg.com/) oraz [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) na swoim systemie.

Następnie, przejdź do katalogu projektu w terminalu i zainstaluj zależności, wpisując następującą komendę:

    yarn install

Koniecznym krokiem jest też stworzenie pliku `.env` i zawarcie w nim linku do API:

    BASE_URL=<link_do_api>

Po zainstalowaniu zależności i utworzeniu pliku, uruchom projekt za pomocą komendy:

    yarn expo start

Po uruchomieniu, aplikacja będzie dostępna pod adresem [Expo Go](https://expo.dev/client) na Twoim urządzeniu mobilnym. Alternatywnie, możesz skorzystać z emulatorów dostępnych w środowisku Expo.
