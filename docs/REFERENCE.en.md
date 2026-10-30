> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-codex-port

[中文](../README.md)

![dsh-codex-port whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/assets/cover-whale-girl.png)

Preview and import locally installed Codex skills into DSH. Preserves invocation policy, metadata and license declarations, while checking name conflicts and keeping existing skills by default.

[![npm](https://img.shields.io/npm/v/dsh-codex-port)](https://www.npmjs.com/package/dsh-codex-port) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-total-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-codex-port/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-codex-port/pulls).

## What it does

- Discover local Codex skills, including a custom CODEX_HOME.
- Convert frontmatter and normalize skill names.
- Import selected skills, skip duplicates and report results.

## Install

In DSH Desktop, install `dsh-codex-port` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-codex-port
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Start in the destination DSH workspace and identify the local Codex skill location.
2. Ask for a list of portable skills, dependencies and license information before copying anything.
3. Select skills and review the import plan, destination and name conflicts before importing.
4. Invoke an imported skill in DSH to verify it. Keep the original and review later updates when needed.

## Requirements and configuration

Requires a local Codex skills directory. Imported skills may still need their original tools, services or credentials.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-codex-port/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
