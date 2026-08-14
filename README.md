[English](README.en.md)

# dsh-codex-port

> **Codex 全家桶，一条命令进 DSH**：实测 186 插件、583 技能、移植 577 个 0 失败。

![npm version](https://img.shields.io/npm/v/dsh-codex-port?label=npm&color=blue) ![npm downloads](https://img.shields.io/npm/dm/dsh-codex-port) ![license](https://img.shields.io/npm/l/dsh-codex-port) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-codex-port?style=social)


把 **Codex 官方插件全家桶**一键搬进 DSH：扫描 `~/.codex` 里的解包插件与插件缓存，把它们的技能批量移植为 DSH 技能（frontmatter 自动转换、codex 专属文件剔除、名称清洗、幂等跳过）。

> 本机实测：186 个 Codex 官方插件、583 个技能，一次移植 577 个成功、0 失败。

## 安装

```bash
dsh plugin --profile web add dsh-codex-port
```

需要本机装有 Codex CLI（`~/.codex` 目录存在即可）。

## 配置

全部可选，默认即可用：

```yaml
- id: codex-port
  name: 'dsh-codex-port'
  config:
    # codexHome: C:\Users\you\.codex       # Codex 家目录（默认 ~/.codex）
    # targetDir: C:\Users\you\.dsh\skills  # 目标技能目录（默认 <DSH_HOME>/skills）
    # overwrite: true                         # 覆盖同名技能（默认跳过）
```

## 工具一览

| 工具 | 作用 | 关键参数 |
| :-- | :-- | :-- |
| `codex_list` | 列出发现的 Codex 插件与技能 | `plugin`/`skill` 过滤，`limit` 1-200 |
| `codex_port` | 批量移植为 DSH 技能 | `plugins`/`skills` 过滤，`targetDir`，`overwrite` |
| `codex_status` | 对比源与目标：已移植/未移植统计 | 无 |

### 示例

```text
codex_list {}                          # 看看 Codex 里有什么
codex_list { plugin: remotion }        # 只看某个插件
codex_port {}                          # 全部移植（同名自动跳过）
codex_port { plugins: [remotion, hyperframes] }
codex_port { skills: [video-best], overwrite: true }
codex_status {}                        # 还有多少没移植
```

移植后 DSH 技能目录立即可用，agent 按技能描述自动触发。

## 跨平台使用

`targetDir` 不限于 DSH：指向任何支持 Agent Skills（SKILL.md）格式的 agent 技能目录，即可把 Codex 全家桶移植给它们：

| Agent | 建议 targetDir |
| :-- | :-- |
| DSH | `~/.dsh/skills`（默认）|
| Claude Code | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` |
| Gemini CLI | `~/.gemini/skills/` |

```text
codex_port { targetDir: ~/.claude/skills }
```


## 移植规则

- **frontmatter 转换**：Codex 的 `name/description/metadata` → DSH 的 `name/description/compatibility/allowed-tools`，多行描述完整保留
- **剔除 codex 专属文件**：`agents/*.yaml` 等子代理描述不带走
- **名称清洗**：非法字符替换为下划线，`..` 路径穿越直接拒绝
- **幂等**：同名技能默认跳过，`overwrite=true` 才覆盖
- **安全**：纯文件系统操作，零运行时依赖（仅 yaml 解析）

## 开发

```bash
pnpm install
pnpm test       # 构建 + 33 个测试
```

## License

MIT


