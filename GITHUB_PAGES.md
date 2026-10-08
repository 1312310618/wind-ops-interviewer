# 发布到 GitHub Pages

以下步骤会把 `wind-ops-interviewer` 目录里的静态文件发布为网站。需要 GitHub 账号和本机 Git。

## 方式一：GitHub 网页上传

1. 登录 GitHub，点击 **New repository**，创建仓库，例如 `wind-ops-interviewer`。公开仓库可直接使用 Pages；私有仓库的 Pages 权限依账号方案而定。
2. 进入仓库，选择 **Add file → Upload files**。
3. 上传本目录的全部内容（`index.html`、`styles.css`、`app.js`、Markdown 文档和 `start.bat`），让 `index.html` 位于仓库根目录。
4. 在 **Commit changes** 提交到 `main` 分支。
5. 打开仓库 **Settings → Pages**，在 **Build and deployment** 下将 **Source** 设为 **Deploy from a branch**。
6. 分支选 `main`，目录选 `/(root)`，点击 **Save**。
7. 等待 Actions/Pages 部署完成。网址会显示在 Pages 设置页，通常为 `https://你的用户名.github.io/wind-ops-interviewer/`。

## 方式二：命令行推送

在 PowerShell 中进入本目录，并把下面的地址替换成你刚创建的仓库 HTTPS 地址：

```powershell
cd "C:\Users\Administrator\Desktop\新建文件夹\wind-ops-interviewer"
git init
git add index.html styles.css app.js README.md PRD.md GITHUB_PAGES.md start.bat
git commit -m "Create wind operations interview simulator"
git branch -M main
git remote add origin https://github.com/你的用户名/wind-ops-interviewer.git
git push -u origin main
```

随后按方式一第 5–7 步启用 Pages。以后更新网页时运行 `git add .`、`git commit -m "更新说明"` 和 `git push`，Pages 会自动重新部署。

## 发布检查

- 确认仓库根目录可以直接看到 `index.html`。
- Pages 设置选择 `main` 和 `/(root)`；本项目没有打包或构建命令。
- 等待部署成功后打开给出的链接，检查首页、三档选择、完整面试和报告下载。
- 如果项目仓库名不是 `<用户名>.github.io`，链接会包含仓库名路径；本项目使用相对资源路径，可在该路径下工作。
