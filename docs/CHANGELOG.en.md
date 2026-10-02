# Historical release notes

[Current changelog](../CHANGELOG.md) · [Overview](../README.en.md)

These English notes preserve the earlier translations. The main changelog contains the consolidated version history.

## 0.2.3 (2026-09-27)

Resolves the Codex directory from explicit codexHome, then CODEX_HOME, then ~/.codex. Custom and isolated homes can now discover plugin skills.

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 53 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 4 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.
