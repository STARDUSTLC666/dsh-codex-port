[中文](README.md)

![npm](https://img.shields.io/npm/v/dsh-codex-port) ![downloads](https://img.shields.io/npm/dm/dsh-codex-port) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-codex-port) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-codex-port?style=social)

# dsh-codex-port

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

Move the whole **official Codex plugin family** into DSH: scan `~/.codex` unpacked plugins and plugin caches, then batch-port their skills into DSH skills (automatic frontmatter conversion, codex-only files stripped, name sanitization, idempotent skips).

> Measured on a real machine: 186 official Codex plugins, 583 skills — one port run moved 577 successfully, 0 failures.

## Compatibility

Verified against `@deepseek-ai/dsh@0.1.2-alpha.2` on 2026-08-31. Built for the cordis patch-bundle plugin model (`cordis.patch.yml` + `dsh.bundle.patch`). No runtime imports of `@deepseek-ai/*` internals.

## Installation

```bash
dsh plugin --profile web add dsh-codex-port
```

Requires the Codex CLI to be installed (the `~/.codex` directory must exist).

## Uninstall

```bash
dsh plugin --profile web remove dsh-codex-port
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.


## Configuration

Everything is optional; defaults just work:

```yaml
- id: codex-port
  name: 'dsh-codex-port'
  config:
    # codexHome: C:\Users\you\.codex       # Codex home (default ~/.codex)
    # targetDir: C:\Users\you\.dsh\skills  # target skills dir (default <DSH_HOME>/skills)
    # overwrite: true                         # overwrite same-name skills (default skip)
```

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `codex_list` | List discovered Codex plugins and skills | `plugin`/`skill` filters, `limit` 1-200 |
| `codex_port` | Batch-port skills into DSH | `plugins`/`skills` filters, `targetDir`, `overwrite` |
| `codex_status` | Compare source vs target: ported/missing counts | none |

### Examples

```text
codex_list {}                          # what does Codex have?
codex_list { plugin: remotion }        # one plugin only
codex_port {}                          # port everything (same names auto-skip)
codex_port { plugins: [remotion, hyperframes] }
codex_port { skills: [video-best], overwrite: true }
codex_status {}                        # how many are left?
```

Ported skills are immediately usable from the DSH skills directory; the agent triggers them by their descriptions.

## Porting rules

- **Frontmatter conversion**: Codex `name/description/metadata` → DSH `name/description/compatibility/allowed-tools`, multi-line descriptions preserved
- **Codex-only files stripped**: `agents/*.yaml` and friends stay behind
- **Name sanitization**: invalid characters become underscores; `..` traversal rejected outright
- **Host loadability checks**: before replacement, the converted name must follow DSH's lowercase kebab-case grammar, exactly match its target directory, and have a nonempty description. Names with uppercase letters, underscores, dots, or a different sanitized directory name cannot replace an existing skill.
- **Idempotent**: same-name skills are skipped by default; `overwrite=true` to replace
- **Recoverable replacement**: copying, conversion, and read-back validation finish inside a unique `.dsh-port-<skill>-*` directory under the target root before the old skill moves to `previous/` and the new skill takes its place. Copy/conversion failures leave the old skill untouched. A failed switch attempts rollback; if rollback also fails, both copies remain and the error includes their recovery location. Content created by another writer is never deleted.
- **Backups and path checks**: successful replacements retain `previous/` and `recovery.json`, using additional disk space; archive them manually when recovery is no longer needed. No `SKILL.md` sits at the transaction directory's top level, so current DSH one-level skill discovery does not register backups. Overlapping source/target paths, target symlinks/junctions, paths outside the target root, and Windows device names are rejected. Multiple renames are not one atomic Windows transaction; after process or system interruption, inspect `recovery.json` to restore the appropriate directory.
- **Safe**: pure filesystem operations, zero runtime dependencies (yaml parsing only)

## Development

```bash
pnpm install
pnpm test       # build + offline tests; fixtures stay under workspace .harness-validation/codex-port-tests
```

## License

MIT
