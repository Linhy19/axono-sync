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
- `axono-client.js` – společný Supabase klient a přihlášení
- `axono-logic.js` – čistá logika časomíry a trestů sdílená ovládáním a LIVE pohledem
- `vercel.json` – veřejné routy a bezpečnostní HTTP hlavičky

## Kontroly před nasazením

```bash
node tests/logic.test.js
node tests/static.test.js
git diff --check
```

Anon klíč Supabase je z principu veřejný. Bezpečnost dat proto musí zajišťovat Row Level Security a serverové ověření oprávnění, nikoli utajení tohoto klíče.

## Zapnutí zabezpečeného přístupu

1. V Supabase otevřete **Authentication → Users** a vytvořte alespoň jeden účet obsluhy.
2. V **SQL Editoru** spusťte celý soubor `supabase/secure-access.sql`.
3. Ovládací stránka a administrace následně vyžadují e-mail a heslo. LIVE stránka zůstává veřejná pouze pro čtení.

SQL pravidla nezapínejte před vytvořením účtu, jinak se do ovládání nedostanete. Registrace nových uživatelů není z aplikace dostupná; další obsluhu přidává správce přímo v Supabase.

## Další plánované kroky

1. Dále oddělit aplikační JavaScript z velkých HTML souborů.
2. Doplnit integrační testy proti samostatnému testovacímu projektu Supabase.
3. Doplnit PWA/offline režim pro výpadek připojení během zápasu.
