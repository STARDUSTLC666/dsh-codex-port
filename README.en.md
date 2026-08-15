[中文](README.md)

# dsh-codex-port

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

Move the whole **official Codex plugin family** into DSH: scan `~/.codex` unpacked plugins and plugin caches, then batch-port their skills into DSH skills (automatic frontmatter conversion, codex-only files stripped, name sanitization, idempotent skips).

> Measured on a real machine: 186 official Codex plugins, 583 skills — one port run moved 577 successfully, 0 failures.

## Installation

```bash
dsh plugin --profile web add dsh-codex-port
```

Requires the Codex CLI to be installed (the `~/.codex` directory must exist).

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
- **Idempotent**: same-name skills are skipped by default; `overwrite=true` to replace
- **Safe**: pure filesystem operations, zero runtime dependencies (yaml parsing only)

## Development

```bash
pnpm install
pnpm test       # build + 33 tests
```

## License

MIT
