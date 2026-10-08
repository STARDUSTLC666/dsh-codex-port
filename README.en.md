# dsh-codex-port

[中文](README.md)

![dsh-codex-port whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/assets/cover-whale-girl.png)

Convert locally installed Codex skills into DSH-compatible skills.

[![npm](https://img.shields.io/npm/v/dsh-codex-port)](https://www.npmjs.com/package/dsh-codex-port) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port)

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

Ask the assistant to list available local skills, then import the ones you select.

## Requirements and configuration

Requires a local Codex skills directory. Imported skills may still need their original tools, services or credentials.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-codex-port/issues)

## License

[MIT](LICENSE)
