**简体中文** · [English](README.en.md)

# Codex Port

**把常用 Codex 技能带到 DSH。**

[![npm](https://img.shields.io/npm/v/dsh-codex-port)](https://www.npmjs.com/package/dsh-codex-port) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-total-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/docs/assets/intro/workflow-zh-light.svg" alt="把常用 Codex 技能带到 DSH。 · 流程示意" width="100%">
</picture>

## 功能

- 查看可移植技能、依赖与许可。
- 先看目标目录和重名处理，再决定导入。
- 只导入需要的技能，并查看迁移结果。

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-codex-port`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-codex-port
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.1-rc.3` 为准。

## 开始使用

1. 在目标 DSH 工作区开始会话，指出本地 Codex 技能所在位置。
2. 先让助手列出可移植技能、依赖和许可说明，不要直接全部复制。
3. 选择需要的技能，核对导入预览、目标目录与重名冲突后再执行导入。
4. 在 DSH 中调用一个导入技能验证效果；原技能保持不变，后续按需要重新检查或更新。

可以这样说：

> 先列出本机可移植的技能，预览目标目录和重名冲突，暂不导入。

## 开始前要知道

技能需要的运行环境与第三方依赖仍需单独准备。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-codex-port/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-codex-port/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-codex-port/blob/master/LICENSE)

<a id="依赖与配置"></a>
