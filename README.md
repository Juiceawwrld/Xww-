# Morrow One

Morrow One 是一个纯静态的高端耳机概念产品官网，使用原生 HTML、CSS 和 JavaScript 构建。项目不依赖框架或第三方运行时，适合直接放进 GitHub 进行版本管理和静态部署。

## 项目结构

```text
.
├─ .github/workflows/       # GitHub Actions：构建与语法检查
├─ public/assets/           # 产品图片等静态资源
├─ src/
│  ├─ index.html            # 页面结构与可访问性标记
│  ├─ styles/main.css       # 视觉系统、布局、响应式样式
│  └─ scripts/main.js       # 导航、配色选择、弹窗、交互状态
├─ scripts/build.mjs        # 将 src/ 和 public/ 生成到 dist/
├─ dist/                    # 本地预览/部署产物（自动生成）
├─ server.js                # 零依赖本地静态服务器
└─ package.json             # 项目脚本入口
```

## 本地开发

安装 Node.js 后，在项目根目录运行：

```powershell
node scripts/build.mjs
node server.js
```

浏览器打开 <http://localhost:4173>。也可以运行 `npm start`，它会先构建再启动本地服务。修改 `src/` 或 `public/` 后重新执行构建即可。

## GitHub 工作流

仓库的提交只需要关注 `src/`、`public/`、`scripts/`、`server.js` 和配置文件；`dist/` 是生成目录，已经在 `.gitignore` 中排除。推送或创建 Pull Request 时，`.github/workflows/quality.yml` 会自动构建站点并检查 JavaScript 语法。

## 内容说明

页面中的 Morrow One、续航参数和耳机产品图属于原创概念展示。图片使用本地资源，页面内没有支付、登录或数据收集流程。
