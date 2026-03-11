# 羽毛球记分板（Badminton Scoreboard）

一个纯前端的羽毛球记分小工具，支持单打和双打。

无需安装依赖，直接在浏览器打开即可使用。

## 功能特性

- 支持 `单打` / `双打` 两种比赛模式
- 赛前录入球员姓名
- 点击比分按钮即可加分
- 自动判断胜负（21 分制，需领先 2 分；30 分封顶）
- 根据发球方和奇偶分自动切换站位/发接发标识

## 快速开始

1. 在浏览器中打开 [index.html](/D:/misc/badminton-scoreboard/index.html)
2. 选择比赛类型（单打或双打）
3. 输入球员姓名
4. 点击“开始比赛”
5. 在比赛页点击左右比分按钮进行记分

## 使用说明

### 1) 准备页

- 页面文件： [index.html](/D:/misc/badminton-scoreboard/index.html)
- 逻辑脚本： [preparation.js](/D:/misc/badminton-scoreboard/preparation.js)
- 样式文件： [preparation.css](/D:/misc/badminton-scoreboard/preparation.css)

说明：
- 默认显示单打输入框，双打输入框默认隐藏
- 切换“单打/双打”会动态切换对应输入区域
- 提交时会校验姓名是否为空
- 参数通过 URL 查询串传入比赛页

### 2) 比赛页

- 页面文件： [match.html](/D:/misc/badminton-scoreboard/match.html)
- 逻辑脚本： [match.js](/D:/misc/badminton-scoreboard/match.js)
- 样式文件： [match.css](/D:/misc/badminton-scoreboard/match.css)

说明：
- 左右比分按钮分别对应两队得分
- 达到胜利条件后弹窗提示获胜方并返回上一页
- 页面中会显示当前站位与发接发标识

## 计分规则（当前实现）

- 每次点击某队比分，该队 +1
- 胜利条件：
  - 分数 `>= 21` 且领先 `>= 2`
  - 或先到 `30` 分直接获胜

## 项目结构

```text
badminton-scoreboard/
├─ index.html          # 准备页（比赛类型/姓名输入）
├─ preparation.js      # 准备页交互逻辑
├─ preparation.css     # 准备页样式
├─ match.html          # 比赛页（站位与比分）
├─ match.js            # 比赛页计分与站位逻辑
├─ match.css           # 比赛页样式
├─ serve.svg           # 发球标识图
└─ receive.svg         # 接发球标识图
```

## 技术栈

- HTML
- CSS
- 原生 JavaScript（无框架、无构建）

## 兼容性建议

- 推荐使用现代浏览器（Chrome / Edge / Firefox / Safari 最新版）
- 依赖 `URLSearchParams` 与 `replaceChildren` 等现代 API

## 可改进方向

- 增加“撤销上一步”与“重置比分”
- 增加多局（BO3/BO5）支持
- 增加本地存档（LocalStorage）
- 增加键盘快捷键与触屏优化
- 增加英文界面切换
