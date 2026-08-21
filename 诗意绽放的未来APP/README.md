# 诗意绽放的未来 · 钻石激励

莫兰迪低饱和治愈风打卡激励系统。纯 HTML+原生 CSS+JS，无后端、无服务器、无第三方插件。支持 PWA（浏览器「添加到主屏幕」即可全屏当 APP 用），并通过 Capacitor 打包为真正的安卓 APK / iOS IPA。

## 项目结构

```
诗意绽放的未来APP/
├── capacitor.config.json   # Capacitor 配置（appId、应用名、webDir）
├── package.json            # Capacitor 依赖与脚本
├── README.md               # 本文件
├── resources/
│   └── icon.jpg            # APP 图标源图（1024×1024，用于生成各尺寸图标）
└── www/                    # Web 资源根目录（Capacitor webDir）
    ├── index.html          # 主应用（全部功能、莫兰迪 UI、番茄计时、宝箱节点、数据加固）
    ├── manifest.json       # PWA 清单（独立模式、竖屏、图标、快捷方式）
    ├── sw.js               # Service Worker（离线缓存）
    └── icons/
        ├── icon.svg            # 矢量主图标（任意缩放）
        ├── icon-512.jpg        # 512 图标
        ├── icon-192.jpg        # 192 图标
        ├── maskable-512.jpg    # maskable 512
        ├── maskable-192.jpg    # maskable 192
        └── apple-touch-icon.jpg  # iOS 主屏图标
```

> 全部资源使用相对路径（`./`），便于 Capacitor 打包后同源加载，也可直接用浏览器打开 `www/index.html` 预览。

## 功能清单

### 视觉风格
- 莫兰迪低饱和色系（裸粉 / 豆沙烟粉 / 奶白 / 浅灰紫），柔光弱阴影、大圆角、半透明卡片
- 云朵 / 星点 / 蝴蝶结暗纹装饰，圆润水晶宝石钻石图标，全站控件统一软萌圆角

### 核心固定功能（全部保留）
1. 虚拟货币「钻石」+ 三大 Tab 板块：每日任务 / 成就系统 / 激励商城
2. 任务强制绑定自定义番茄时长，必须完整走完倒计时才算完成；禁止手动完成、禁止改系统时间作弊（delta 累计法 + 时间倒退检测）；中途退出页面再次打开可接续剩余计时；计时结束带铃声提醒
3. 任务完成自动发放活跃度，自定义多档活跃度宝箱（所需活跃度 + 钻石奖励），达标即可领取

### 活跃度宝箱沿进度条节点布局（本次新增）
- 宝箱图标按所需活跃度比例，直接分布在头部进度条对应节点位置
- 进度达到对应数值，宝箱自动亮起（金色光晕动画）、可点击领取
- 未达标宝箱置灰锁定；已领取宝箱变灰
- 节点下方标注所需活跃度与奖励钻石
- 进度条右侧 `+` 按钮进入宝箱档位管理（添加 / 编辑 / 删除）

### 番茄计时背景自定义
- 上传手机本地图片一键设为计时页背景；内置背景轮换库可保存多张
- 可删除已保存背景图，随时清空恢复默认莫兰迪纯色背景
- 自定义背景跟随 localStorage 永久保存；图片自动做淡化磨砂处理，保证倒计时文字清晰
- 番茄时钟全面美化：居中大号圆润数字、莫兰迪粉圆形表盘、柔和外发光；计时按钮统一风格，点击有缩放动效，计时中禁用状态柔和灰化

### 成就系统改版（无手动解锁）
- 彻底删除手动达成按钮；新建成就可绑定指定任务、设置该任务累计完成次数门槛
- 程序自动统计同类任务完成次数，达标自动弹窗、自动发放钻石；未达标卡片置灰锁定
- 支持编辑、删除成就

### 激励商城升级
- 可自定义上架商品：商品名称、消耗钻石、商品说明、自定义库存
- 购买自动扣钻石、自动减少库存，库存归零商品置灰无法购买
- 完整留存全部购买时间、商品名称的兑换记录

### 数据加固（本次新增）
- 每次保存计算数据签名（djb2 变体 + 盐值），加载时校验，外部直接改 localStorage 会导致签名不匹配，自动重置为出厂状态
- 记录上次 tick 时间戳，检测系统时间倒退超过 1 分钟自动清除计时（防改时间作弊）
- delta 累计法：单次 tick 间隔仅在合理区间内（500ms ~ 5s）扣减，防止系统时间快进

### 适配
- OPPO / ColorOS / 安卓通用全屏竖屏 meta 标签（`full-screen`、`x5-fullscreen`、`screen-orientation` 等）
- iPhone 安全区 `env(safe-area-inset-*)` 全适配（刘海 / 灵动岛 / 底部 Home 条）
- 添加到主屏幕后全屏运行（`apple-mobile-web-app-capable`、`display:standalone`）
- PWA 安装横幅（`beforeinstallprompt`），引导用户一键安装

## 使用方式

### 方式一：浏览器 / PWA（最简单，无需任何工具）
1. 用手机或电脑浏览器打开 `www/index.html`
2. **iPhone**：Safari 打开 → 分享按钮 →「添加到主屏幕」→ 全屏当 APP 用
3. **安卓**：Chrome / Edge 打开 → 菜单 →「添加到主屏幕」或页面底部「安装」横幅
4. 数据全部存 localStorage，关闭页面 / 重启手机 / 清后台均不丢失

### 方式二：打包成安卓 APK（真正原生 APP）

**环境准备（首次）**
- 安装 [Node.js 18+ LTS](https://nodejs.org/)
- 安装 [Android Studio](https://developer.android.com/studio)（含 Android SDK）
- 配置环境变量 `ANDROID_HOME` 指向 SDK 目录，`JAVA_HOME` 指向 JDK 17

**打包步骤**
```bash
# 1. 进入项目目录
cd "D:\Trae软件创作\诗意绽放的未来APP"

# 2. 安装依赖
npm install

# 3. 添加安卓平台（首次）
npx cap add android

# 4. 生成 APP 图标（从 resources/icon.jpg 自动生成各尺寸 PNG）
#    若已安装 @capacitor/assets：
npx @capacitor/assets generate --android

# 5. 同步 Web 资源到原生工程
npx cap sync android

# 6. 用 Android Studio 打开安卓工程
npx cap open android

# 7. 在 Android Studio 内：
#    - 等待 Gradle 同步完成
#    - 菜单 Build → Build Bundle(s) / APK(s) → Build APK(s)
#    - 生成的 APK 路径：android/app/build/outputs/apk/debug/app-debug.apk
#    - 安装到手机：数据线连接 → Android Studio 绿色三角按钮运行，或 adb install app-debug.apk
```

**发布 Release 签名包**
```bash
# 生成签名密钥（首次，按提示填写信息）
keytool -genkey -v -keystore poetic-bloom.keystore -alias poetic-bloom -keyalg RSA -keysize 2048 -validity 36500

# 在 Android Studio：Build → Generate Signed Bundle / APK → APK → 选密钥 → Release → Finish
# 输出：android/app/build/outputs/apk/release/app-release.apk
```

### 方式三：打包成 iOS IPA（需 Mac）
```bash
# 仅在 macOS 上可行
npm install
npx cap add ios
npx cap sync ios
npx cap open ios    # 用 Xcode 打开
# 在 Xcode 内配置签名团队 → Product → Archive → Distribute App
```

## 自定义配置

### 改配色
打开 `www/index.html`，搜索 `:root`，修改 CSS 变量：
```css
:root {
  --cream-bg:#F5EFE9;        /* 主背景 */
  --smoke-rose:#D4A5A5;      /* 主色：豆沙烟粉 */
  --smoke-rose-deep:#A8857F; /* 深色 */
  --lavender-mist:#C9BED9;  /* 浅灰紫点缀 */
  /* ... 其他变量同理 */
}
```

### 改数值参数
搜索 `const CONFIG`，修改默认值：
```js
const CONFIG = {
  defaultTaskMinutes:25,        // 默认番茄分钟数
  defaultTaskActivity:10,       // 默认任务活跃度
  defaultChestReq:[20,40,60,80],   // 默认宝箱所需活跃度档位
  defaultChestReward:[10,20,30,50],// 默认宝箱钻石奖励
  defaultShopCost:50,           // 默认商品消耗钻石
  defaultShopStock:10,          // 默认商品库存
  defaultAchCount:5,            // 默认成就完成次数门槛
  ringCount:5, ringFreq:880,    // 铃声次数与频率
  bgMaxWidth:900, bgQuality:0.65,// 背景图压缩参数
};
```

### 改 APP 名 / 包名
- 应用名：`capacitor.config.json` 的 `appName`、`www/manifest.json` 的 `name` / `short_name`、`www/index.html` 的 `<title>` 与 `<meta name="apple-mobile-web-app-title">`
- 包名：`capacitor.config.json` 的 `appId`（建议倒序域名，如 `com.yourname.bloom`）

### 改 APP 图标
替换 `resources/icon.jpg` 为你的新图标（建议 1024×1024 PNG/JPG），再运行 `npx @capacitor/assets generate --android` 重新生成各尺寸。

## 数据备份与迁移

- **导出**：APP 内 右上角 ⚙️ → 「导出数据备份」→ JSON 复制到剪贴板
- **导入**：APP 内 ⚙️ → 「导入数据备份」→ 粘贴 JSON → 恢复
- **清空**：⚙️ → 「清空全部数据」（二次确认）

## 常见问题

- **APK 闪退**：确认 `npx cap sync android` 已执行，Android Studio Gradle 同步完成
- **图标没更新**：删除 `android/app/src/main/res/mipmap-*` 后重新 `npx @capacitor/assets generate --android`
- **状态栏遮挡**：`capacitor.config.json` 已设 `contentInset:always`，安卓通过 `themeColor` 适配
- **计时被清**：检测到系统时间倒退或数据签名不匹配会自动重置，属正常防作弊机制

## 技术约束
- 纯 HTML + 原生 CSS + 原生 JS，无第三方运行时依赖
- 数据全部 localStorage 本地永久存储
- 全部资源相对路径，无外链、无广告、无付费弹窗
