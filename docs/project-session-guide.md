# Working on a project with Grok Bot — session guide (Paul & Mark)

Applies to Euro Plus, Secure Land, Havelock Place, Urban Move and Cube Developments. Each project has its own assistant and its own GitHub repo with two shared files:
- `AGENTS.md` — the rules every assistant and Cursor session follows.
- `docs/CHANGELOG.md` — a dated log of every change, newest first.

Only one of you works on a project at a time.

## 1. Start the session
1. Open Grok Bot and pick the project's assistant from the sidebar (e.g. **Euro Plus**).
2. Ask: "Read the changelog and tell me what's changed since my last session." The assistant reads `docs/CHANGELOG.md` on `dev` and summarises the other person's work.
3. If anything is unclear, ask before starting — don't undo the other person's work without talking to them.

## 2. Ask for the work
4. Describe what you want in plain words (content change, fix, research, drafts).
5. The assistant works on the `dev` branch only. Small edits it can make directly; anything bigger it does with a cloud coding agent, and **it asks your OK first** (composer-2.5 only, no subagents, browser helpers or Cursor Automations).
6. Emails are only ever drafted — you press Send yourself. Passwords go through secure forms, never in chat.
7. Redundant files are never deleted: they are listed for approval, then moved into `DeleteMe<MonYY>/` (named two months ahead, e.g. `DeleteMeDec26/`).

## 3. Review
8. The assistant reports what changed (commit or pull request link). Check the result.
9. Every change gets a changelog entry: `## YYYY-MM-DD — Name (via assistant)` plus a bullet on what changed and why. Check the entry is there and carries your name.

## 4. Release (only when you ask)
10. Say "merge dev to main". The assistant merges `dev` into `main` with a merge commit. It may raise an approval card in the chat — approve it.
11. A push to `main` starts the GitHub Actions deploy, which builds the site and uploads only the website folder (`dist/`) to the live server by FTP. `docs/`, `project/`, `media/` and archive folders never go live.
12. Ask the assistant to confirm the deploy run succeeded, then check the live site in your browser.
13. The assistant syncs `main` back into `dev` with a pull request so both branches match.
14. The changelog entry should note the release (date, what went live).

## 5. End the session
15. Ask: "Anything left open?" The assistant lists unfinished items and records them in the changelog, so the next person — Paul or Mark — picks up from there.

## Good to know
- Paul and Mark both work through the same gragnola repos with the same GitHub access; changes are identified in the changelog by name.
- GitHub is the single source of truth; cloud agents always start from the live repo, so there is nothing to sync by hand.
- Each assistant keeps its own chat memory, which isn't shared between Paul's and Mark's copies — the changelog is what keeps you both in step.
