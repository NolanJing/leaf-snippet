### 🍧🍦 提供 Leaf 项目常用页面的模板代码。例如列表页、弹窗页面🍦🍧

![demo](https://raw.githubusercontent.com/NolanJing/leaf-i18n/master/leaf_snippet_demo.gif)

> ## 1. 在\*.vue 文件中，输入预置的指令 leaf / leafList 即可补全代码。

> ## 2. 提供自定义模板代码的能力。模板放在 src/template 目录下，方便扩展

![template](https://raw.githubusercontent.com/NolanJing/leaf-i18n/master/leaf-snippet-dir.png)

```bash
# 从template目录下的文件到snippet配置文件
npm run build

# 重新打包插件，即可生成新的 .vsix 插件
npm run pkg
```

> ## 3. 复杂模板，支持多处定位，输入Tab键换行
 ![demo](https://raw.githubusercontent.com/NolanJing/leaf-i18n/master/leaf_snippet_demo2.gif)
