# EKANBAN - 工业看板系统

一个基于 Electron + React + Tailwind CSS 的工业实时看板系统，专为 IGBT 自动化封装生产线设计。

## 功能特性

- 📊 **实时生产数据展示**：产量、效率、稼动率等关键指标
- 🛡️ **安全管理**：安全生产天数、安全等级、安全记录
- 🏆 **成果展示**：历年精益改善成果和获奖情况
- 🎯 **未来规划**：2026年数字化转型目标
- 🖥️ **全屏显示**：支持 1920x1080 全屏显示，适合大屏展示
- 🔄 **自动轮播**：支持多页面自动轮播，可配置播放间隔

## 技术栈

- **Electron 40.6** - 跨平台桌面应用框架
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Vite** - 构建工具

## 快速开始

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动 Electron 开发模式（会自动打开开发窗口）
npm run electron:dev
```

### 构建生产版本

```bash
# 构建 Web 版本
npm run build

# 构建 Windows 可执行程序
npm run electron:build
```

生成的可执行程序位于 `dist_electron/` 目录。

## 项目结构

```
EKANBAN/
├── electron/           # Electron 主进程代码
│   ├── main.cjs       # 主进程入口
│   └── preload.js     # 预加载脚本
├── src/               # React 源代码
│   ├── App.tsx        # 主应用组件
│   ├── main.tsx       # React 入口
│   └── index.css      # 全局样式
├── dist/              # Web 构建输出
├── dist_electron/     # Electron 构建输出
└── package.json       # 项目配置
```

## 使用说明

1. **启动应用**：双击 `EKANBAN.exe` 运行
2. **全屏显示**：应用默认以全屏模式启动
3. **手动控制**：
   - 鼠标悬停在页面底部可呼出控制栏
   - 点击箭头按钮切换页面
   - 点击播放/暂停按钮控制自动轮播
   - 调整滑块改变轮播间隔时间

## 数据配置

所有展示数据都在 `src/App.tsx` 的 `DATA` 常量中定义，可根据实际需求修改。

## GitHub Actions 自动构建

本项目配置了 GitHub Actions，每次推送到 `master/main` 分支或打标签时，会自动构建 Windows 可执行程序并上传 Artifacts。

打标签格式：`v1.0.0`，会自动创建 Release。

## 许可证

ISC
