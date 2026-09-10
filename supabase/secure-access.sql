-- Spusťte jednou v Supabase SQL Editoru až po vytvoření alespoň jednoho
-- uživatele v Authentication > Users. Skript je možné spustit opakovaně.

begin;

alter table public.matches enable row level security;
alter table public.goals enable row level security;
alter table public.penalties enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.club_roster enable row level security;
alter table public.settings enable row level security;

revoke all on table public.matches from anon;
revoke all on table public.goals from anon;
revoke all on table public.penalties from anon;
revoke all on table public.teams from anon;
revoke all on table public.players from anon;
revoke all on table public.club_roster from anon;
revoke all on table public.settings from anon;

grant select on table public.matches to anon;
grant select on table public.goals to anon;
grant select on table public.penalties to anon;
grant select on table public.teams to anon;

grant select, insert, update, delete on table public.matches to authenticated;
grant select, insert, update, delete on table public.goals to authenticated;
grant select, insert, update, delete on table public.penalties to authenticated;
grant select, insert, update, delete on table public.teams to authenticated;
grant select, insert, update, delete on table public.players to authenticated;
grant select, insert, update, delete on table public.club_roster to authenticated;
grant select, insert, update, delete on table public.settings to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Odstraní dřívější volné politiky. Jinak by se nová omezení s existujícími
-- politikami skládala pomocí OR a anonymní zápis by mohl zůstat povolený.
do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'matches', 'goals', 'penalties', 'teams',
        'players', 'club_roster', 'settings'
      )
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      existing_policy.policyname,
      existing_policy.schemaname,
      existing_policy.tablename
    );
  end loop;
end
$$;

drop policy if exists axono_public_read_matches on public.matches;
drop policy if exists axono_public_read_goals on public.goals;
drop policy if exists axono_public_read_penalties on public.penalties;
drop policy if exists axono_public_read_teams on public.teams;

create policy axono_public_read_matches
on public.matches for select to anon
using (true);

create policy axono_public_read_goals
on public.goals for select to anon
using (true);

create policy axono_public_read_penalties
on public.penalties for select to anon
using (true);

create policy axono_public_read_teams
on public.teams for select to anon
using (true);

drop policy if exists axono_operator_matches on public.matches;
drop policy if exists axono_operator_goals on public.goals;
drop policy if exists axono_operator_penalties on public.penalties;
drop policy if exists axono_operator_teams on public.teams;
drop policy if exists axono_operator_players on public.players;
drop policy if exists axono_operator_club_roster on public.club_roster;
drop policy if exists axono_operator_settings on public.settings;

create policy axono_operator_matches
on public.matches for all to authenticated
using (true) with check (true);

create policy axono_operator_goals
on public.goals for all to authenticated
using (true) with check (true);

create policy axono_operator_penalties
on public.penalties for all to authenticated
using (true) with check (true);

create policy axono_operator_teams
on public.teams for all to authenticated
using (true) with check (true);

create policy axono_operator_players
on public.players for all to authenticated
using (true) with check (true);

create policy axono_operator_club_roster
on public.club_roster for all to authenticated
using (true) with check (true);

create policy axono_operator_settings
on public.settings for all to authenticated
using (true) with check (true);

commit;
