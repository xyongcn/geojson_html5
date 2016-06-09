# VIMAP-Vector And Image Map
Client map for geojson and tiles in html5

## 获取代码
* github项目主页：https://github.com/xyongcn/geojson_html5

## 客户端
* 浏览器支持：Google chrome
*  浏览器配置：cmd run: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" --allow-file-access-from-files

## 数据接口
* 矢量地图瓦片：http://166.111.68.197:11193/geoserver/v/15/26978/12417
* 栅格地图瓦片：http://166.111.68.197:11193/geoserver/i/15/26978/12417
*  矢量路况瓦片（分时）：http://166.111.68.197:11193/geoserver/t/15/26978/12417/10

## geojson_html5文件架构说明
geojson_html5结构图及相应功能介绍
###目录
* |- index.html VIMAP地图首页
* |- README.md 使用说明
* |- nodejs 服务器端-数据转换模块：OSM2GeoJSON
* |- geojson_html5-master 客户端模块
 * ||- BITmap 简单GeoJSON矢量地图
 * ||- javascript JS脚本
     * |||- jquery.js jquery框架
     * |||- storage.js 缓存模块
     * |||- vimaps.js 地图操作 渲染引擎 缓存更新 混合显示
     * |||- wgs2mars.js WGS-84 to GCJ-02 转换模块
 * ||- stylesheets 地图样式及渲染规则文件夹
     * |||- maps.css 地图样式
     * |||- landcover.js 陆地覆盖物渲染规则
     * |||- ways.js 道路渲染规则
     * |||- railway.js 地铁铁路渲染规则
     * |||- water.js 河流渲染规则
     * |||- waterway.js 水域渲染规则
     * |||- building.js 建筑渲染规则
 * ||- tile2bbox Google XYZ瓦片编号到经纬度范围bbox转换
 * ||- topojson 简单topojson矢量地图