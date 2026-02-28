# GlowCure Wiki — iGEM 2026

智能水凝胶痘痘贴 **GlowCure** 的 iGEM Wiki 首页。

## 技术栈

- **React 18** + **Vite**
- **Tailwind CSS**（配色：Healing Teal `#4FD1C5`、Soft Cyan `#E6FFFA`）
- **Lucide React** 图标
- **Framer Motion** 动画与进入效果

## 本地运行

```bash
cd glowcure-wiki
npm install
npm run dev
```

浏览器打开终端显示的本地地址（通常为 `http://localhost:5173`）。

## 构建

```bash
npm run build
```

产物在 `dist/`，可部署到任意静态托管或 iGEM Wiki。

## 页面结构

1. **Navigation** — 毛玻璃导航，Project / Lab / Human Practices / Team 下拉，Wiki Tools 按钮  
2. **Hero** — 主标题、副标题、右侧浮动水凝胶贴片卡片  
3. **The Problem** — 三个痛点：Inaccuracy、Irritation、Passive Treatment  
4. **How It Works** — “The Biological Loop”：Sense → Process → Release 三阶段可点击高亮  
5. **Key Innovation** — Bento 布局：Biocompatible Hydrogel、Genetic Circuit、Safe Biocontainment  
6. **Footer** — Team Logo 占位、2026 iGEM 免责声明  

整体为响应式布局，支持移动端。
