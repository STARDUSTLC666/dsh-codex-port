# dsh-codex-port usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Invocation policy and duplicate names

agents/openai.yaml allow_implicit_invocation:false maps to disable-model-invocation:true. Existing same-name skills in flat files, directories or other host roots are kept by default. dryRun explains skips and preserved policies; a skill-level license takes precedence over the plugin license.

## Current improvements

Run codex_port with dryRun=true and targetDir="skills-import" first, then remove dryRun to install. An overwrite preview creates no backups or replacements; actual overwrites retain previous / recovery.json.

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
- **Safe**: pure filesystem operations, with a YAML parser as the only runtime dependency

## Development

```bash
pnpm install
pnpm test       # build + offline tests; fixtures stay under workspace .harness-validation/codex-port-tests
```

## Troubleshooting

Run `codex_health` first: it checks the Codex home, the plugin directory, whether the target skills directory is writable, and how many skills are discoverable (without porting anything).

| Symptom | Usual cause | What to do |
| :-- | :-- | :-- |
| `Codex 家目录不存在` | Codex CLI not installed, or a custom location | Install Codex, or set `codexHome` in the config |
| `codex_list` returns 0 plugins | No official plugins installed in Codex yet | Install plugins in Codex, then re-run `codex_list` |
| Target skills directory is not writable | Permission issue, or the path is occupied | Pick a writable directory via `targetDir` or the plugin config |
| Result shows "skipped N" | Same-named skills already exist | Re-run with `overwrite: true`; `previous/` and `recovery.json` are kept |
| Failure says the sanitized name is invalid | Name becomes empty or illegal after sanitizing | Check the source skill name (pure CJK or dangerous characters are rejected) |
| Want to preview the changes first | — | Run `codex_port { dryRun: true }`: read-only, nothing is written |

## License

MIT
