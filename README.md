# dsh-codex-port

[English](README.en.md)

![dsh-codex-port 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-codex-port/master/assets/cover-whale-girl.png)

把本机 Codex 技能移植到 DSH，先预览再选择导入。保留技能调用策略、元数据与许可声明，默认检查重名并保留已有技能。

[![npm](https://img.shields.io/npm/v/dsh-codex-port)](https://www.npmjs.com/package/dsh-codex-port) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-codex-port-downloads.svg)](https://www.npmjs.com/package/dsh-codex-port)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-codex-port/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-codex-port/pulls)。

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

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
