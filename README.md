# SzaloneBloczki

Celem projektu jest stworzenie aplikacji mobilnej o nazwie „SzaloneBloczki”, która będzie pełniła funkcję edukacyjną poprzez pomoc w zrozumieniu działaniu algorytmów oraz schematów blokowych.

## Cel Projektu

"SzaloneBloczki" mają dostarczyć użytkownikom narzędzia do eksploracji, nauki i eksperymentowania z algorytmami w sposób intuicyjny i interaktywny. Aplikacja ma być użytecznym narzędziem zarówno dla początkujących, jak i zaawansowanych programistów oraz studentów nauk informatycznych i matematycznych.

## Funkcje Aplikacji Mobilnej

Aplikacja mobilna powinna zawierać następujące podstawowe funkcjonalności:

- Możliwość tworzenia własnych schematów blokowych.

- Wizualizację algorytmów na podstawie utworzonych schematów blokowych – obsługa przynajmniej podstawowych algorytmów sortowania.

- Możliwość eksportu schematu blokowego do formatu PDF.

- Podgląd zmiennych w czasie wizualizacji algorytmu.

- Pracę krokową i ciągłą – użytkownik może wybrać tryb pracy krokowej lub tryb ciągły.

- Odczyt i zapis utworzonych schematów blokowych.

- Eksport algorytmu do wybranego języka programowania.

## Funkcjonalność Dodatkowa

Jako funkcjonalność dodatkową, zapewniającą „efekt wow” jest obsługa większej ilości algorytmów, a nie tylko podstawowych sortowań.

## Technologie Front-end

Do realizacji projektu "SzaloneBloczki" wykorzystamy następujące technologie po stronie front-endowej:

1.  **React Native:** Główną platformą do tworzenia aplikacji mobilnej jest React Native. Umożliwia on tworzenie aplikacji na platformy Android i iOS, używając języka JavaScript i biblioteki React.

2.  **Zustand:** Do zarządzania globalnym stanem aplikacji wykorzystamy bibliotekę Zustand. Jest to minimalistyczna i wydajna biblioteka zarządzania stanem, idealnie integrująca się z React.

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
