# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

## 0.3.0 (2026-10-05)

- 增加 dryRun 预览，先验证并显示安装、替换、跳过清单，不创建目标目录；完整解析 YAML 多行描述，相对目标按会话工作区解析，取消前不写入。

## 0.2.4 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 0.2.3 (2026-09-27)

Codex 目录按显式 codexHome、CODEX_HOME、默认 ~/.codex 的顺序解析，修复自定义或隔离目录无法发现插件技能的问题。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-codex-port/commits/master)。
