# dsh-codex-port

[English](README.en.md)

![dsh-codex-port 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/assets/cover-whale-girl.png)

把本机 Codex 技能转换为 DSH 可使用的技能。

[![npm](https://img.shields.io/npm/v/dsh-codex-port)](https://www.npmjs.com/package/dsh-codex-port) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port)

## 功能

- 发现本机 Codex 技能，支持自定义 CODEX_HOME。
- 转换 frontmatter，清洗技能名称。
- 支持选择性移植、重复跳过和迁移报告。

## 安装

桌面版可在「插件」面板按包名 `dsh-codex-port` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-codex-port
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

先让助手列出可移植技能，再说：“把这些选中的技能移植到 DSH。”

## 依赖与配置

需要本机已有 Codex 技能目录。移植结果仍可能需要原技能要求的服务、工具或账号。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-codex-port/issues)

## License

[MIT](LICENSE)
