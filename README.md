# AXONO Sync

Webová časomíra pro hokejbal se sdíleným živým stavem přes Supabase.

## Obrazovky

- `/` nebo `/sync` – ovládání zápasu
- `/live` – veřejná výsledková obrazovka
- `/admin` – správa zápasů, týmů a hráčů

Pro lokální spuštění naservírujte kořen repozitáře statickým HTTP serverem. Stránky používají společnou konfiguraci v `axono-config.js` a lokální kopii klienta Supabase v `supabase.min.js`.

## Aktuální architektura

- `axono-sync.html` – časomíra, skóre, góly, tresty a soupisky
- `axono-display.html` – read-only LIVE pohled
- `axono-admin.html` – administrace
- `axono-config.js` – společná veřejná konfigurace Supabase
- `vercel.json` – veřejné routy a bezpečnostní HTTP hlavičky

Anon klíč Supabase je z principu veřejný. Bezpečnost dat proto musí zajišťovat Row Level Security a serverové ověření oprávnění, nikoli utajení tohoto klíče.

## Další plánované kroky

1. Nahradit klientské ověření admin PINu skutečným přihlášením a RLS pravidly.
2. Oddělit sdílené styly a JavaScript z velkých HTML souborů.
3. Doplnit spolehlivou synchronizaci trestů a ochranu proti souběžným zápisům.
4. Upravit ovládací obrazovku pro rychlé použití během zápasu a doplnit PWA/offline režim.
