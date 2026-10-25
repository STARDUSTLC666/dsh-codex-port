# 0.3.1 验证记录

日期：2026-10-26。官方 Windows 宿主：DSH 0.2.1-rc.3。

## 行为变化

移植保留 Codex 仅显式调用策略、技能自身许可证与 DSH 调用限制；预览说明保留的策略。检查平铺文件、别名目录和宿主其他根目录的同名技能，默认避免遮蔽。

## 验证与限制

- Windows 本地：61 项，61 通过、0 跳过；没有把跳过计为通过。
- 官方 RC.3 实际预览并安装合成技能，保留已有平铺文件；新建 Agent 后，官方技能目录将移植结果解释为 modelInvocable=false、userInvocable=true。未调用远程模型。
- GitHub 的跨平台 CI 和 npm 发布完整性以该版本工作流及 registry 为准；本记录不把本地测试等同于已发布。

## English

Porting preserves explicit-only invocation, skill-level licenses and existing DSH invocation restrictions. Preview explains preserved policies; collision checks include flat files, alias directories and the host skill registry.

Runtime/account limits are listed above. Synthetic peers and model adapters do not establish live account delivery or model quality.
