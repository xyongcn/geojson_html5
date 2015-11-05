# geojson_html5 - map client for geojson and tiles in html5

## 浏览器及配置
浏览器支持：Google chrome
浏览器配置：cmd run: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" --allow-file-access-from-files

## geojson_html5文件架构说明
geojson_html5结构图及相应功能介绍
###目录
####|- index.html 地图首页
####|- Tiles 地图数据:包括矢量数据GeoJSON和栅格数据png
####|- javascript JS脚步：包括jquery和地图操作
#### ||- jquery.js jquery框架
#### ||- maps.js 地图操作脚本
####|- stylesheets 地图样式及渲染规则文件夹
#### ||- maps.css 地图样式
#### ||- highway.js 道路渲染规则
#### ||- railway.js 地铁铁路渲染规则
#### ||- water.js 河流湖泊渲染规则
#### ||- building.js 建筑渲染规则