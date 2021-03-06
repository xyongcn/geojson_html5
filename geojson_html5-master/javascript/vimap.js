  var $ = jQuery; //jquery框架
/*
Map主函数
参数：[div id="map"] [,zoom] [,x] [,y] 即地图中心切片位置：zoom/x/y
功能：地图初始化；地图操作-事件函数（鼠标滚动、缩放、移动）
*/
  function lon2tile(lon,zoom) { //经度转切片坐标x函数
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
  };
  function lat2tile(lat,zoom) { //纬度转切片坐标y函数 
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
  };
  var Map = function(div,zoom,x,y) {  //Map主函数功能
    this.$div = $(div);

    this.scale = 256;

    this.data = null;

    this.streets = new Array();

    // 增加画布 canvas
    this.$canvas = $("<canvas id='map-canvas'></canvas>");
    this.$canvas[0].width = this.$div.width();
    this.$canvas[0].height = this.$div.height();

    this.$div.append(this.$canvas);

    // 注册事件函数 events
    var _this = this;
//PC浏览器点击事件
    document.getElementById('road map').onclick = function() {
      //flag=1;
      road_flag=1;
      roadCondition_flag=1;
      if(countFlag==0) changeCenter=1;
      countFlag++;
      var selectHour= document.getElementById("select hour");
      var hourValue=selectHour.value;
      var selectMinute= document.getElementById("select minute");
      var minuteValue=selectMinute.value;
      var tempCondition = roadConditionTime;
      roadConditionTime = parseInt(hourValue)*4 + parseInt(minuteValue) +1;
      if(roadConditionTime != tempCondition) {changeCenter=1;roadConditionStorageFlag=0;}
      _this.draw_Image(zoom,x,y);

    }
/*    document.getElementById('Beijing map').onclick = function() {
    zoom = 11;
    x = lon2tile(116.3912,zoom); //中心切片的x值
    y = lat2tile(39.9059,zoom); //中心切片的y值
    flag =1;  //地图数据源的信号函数 初始化为0；
    road_flag=0; //路网触发信号
    changeCenter=1; //中心位置切片修正触发信号
    roadCondition_flag=0;//路况触发信号
    countFlag=0;   
    //鼠标事件位移量初始化
    eventX=0; 
    eventY=0;
    roadConditionStorageFlag=0;   
    right=0;
    left=0;
    up=0;
    down=0;
    _this.scale = 256;
    _this.draw_Image(zoom,x,y);

    } 
    */  
    document.getElementById('img map').onclick = function() {
      flag=0;
      road_flag=0;
      roadCondition_flag=0;
      //eventX=0;eventY=0;
      var imageSource= document.getElementById("image source");
      imageURL=imageSource.value;
      if(imageURL=="http://a.tile.openstreetmap.org/") selectImageFlag=0;
      if(imageURL=="http://tile.opencyclemap.org/cycle/") selectImageFlag=1;
      if(imageURL=="http://p3.map.gtimg.com/maptilesv2/") selectImageFlag=2;
      if(imageURL=="http://mt2.google.cn/vt/lyrs=m@258000000") selectImageFlag=3;
      _this.draw_Image(zoom,x,y);
      
    }
    document.getElementById('vector map').onclick = function() {
      flag=1;
      road_flag=0;
      roadCondition_flag=0;
      countFlag=0;
      changeCenter=1;
      selectImageFlag=0;
      _this.draw_Image(zoom,x,y);
    }


    document.getElementById('zoom-in').onclick = function() {
      if(zoom<19){
          zoom=zoom+1;
        x=2*x;
        y=2*y;
        eventX=0; 
        eventY=0;       
        changeCenter=1;
        roadConditionStorageFlag=0;
        _this.scale = 256;
        _this.draw_Image(zoom,x,y); 
      }
    };

    document.getElementById('zoom-out').onclick = function() {
      if(zoom>3){
          zoom=zoom-1;
        x=Math.round(x/2);
        y=Math.round(y/2);
        eventX=0; 
        eventY=0;
        changeCenter=1;
        roadConditionStorageFlag=0;
        _this.scale = 256;
        if(zoom<12) flag=0; 
        _this.draw_Image(zoom,x,y);     
      }

    };
//PC端点击事件-END
//移动端点击事件
//移动端点击事件-END

    

    $(window).on('resize', function() { //屏幕大小发生变化
      clearTimeout(_this.resizeTimeout);
      _this.resizeTimeout = setTimeout(function() {
        //_this.draw();
        _this.draw_Image(zoom,x,y);
      }, 500);
    });
/*
    this.$canvas.on('mousewheel', function(event) {
    _this.scale = Math.max(100, _this.scale - event.originalEvent.deltaY / 2);
    _this.draw_Image(zoom,x,y);
  });
*/  
    this.$canvas.on('mousewheel', function(event) { //鼠标滚动实现缩放功能
      //_this.scale = Math.max(100, _this.scale - event.originalEvent.deltaY / 2);
      if(event.originalEvent.deltaY>0 && zoom>3){ //向下滚动-缩小一个等级
        _this.scale = Math.max(180, _this.scale - event.originalEvent.deltaY / 3);
        eventX = eventX + (_this.scale - (_this.scale - event.originalEvent.deltaY / 3));
        eventY = eventY + eventX;
        if(_this.scale<=180){
        if(zoom>3){
            zoom=zoom-1;
          x=Math.round(x/2);
          y=Math.round(y/2);
          eventX=0; 
          eventY=0;
          changeCenter=1;
          roadConditionStorageFlag=0;
          if(zoom<12) flag=0; 
          _this.scale=256;    
        }
          
        }
        _this.draw_Image(zoom,x,y); 


      }
      if(event.originalEvent.deltaY<0 && zoom<19){ //向上滚动-放大一个等级
        _this.scale = Math.max(256, _this.scale - event.originalEvent.deltaY / 2);
        eventX = eventX + (_this.scale - (_this.scale - event.originalEvent.deltaY / 2));
        eventY = eventY + eventX;       
        if(_this.scale>=456){
          if(zoom<19){
              zoom=zoom+1;
            x=2*x;
            y=2*y;
            eventX=0; 
            eventY=0;       
            changeCenter=1;
            roadConditionStorageFlag=0;
            _this.scale=256;
          }

      }
      _this.draw_Image(zoom,x,y); 

      }
    });
  
//mobile touch events
    this.$canvas.on('touchstart', function(event) { //鼠标点拖动-实现地图拖拽功能
      _this.last_position = { //鼠标点击的位置
        x: event.originalEvent.touches[0].clientX,
        y: event.originalEvent.touches[0].clientY
      };

      $(this).bind('touchmove', function(event) {
        event.preventDefault();
        var addX = 0;
        var addY = 0;
        var delta = { //位移长度
          x: _this.last_position.x - event.originalEvent.touches[0].clientX,
          y: _this.last_position.y - event.originalEvent.touches[0].clientY
        };

         eventX -=delta.x*1.5; //位移后的新位置
         eventY -=delta.y*1.5; //位移后的新位置

         _this.last_position = { //当前位置初始化
          x: event.originalEvent.touches[0].clientX,
          y: event.originalEvent.touches[0].clientY
         }; 
         
         //向右水平位移超过_this.scale（一个切片的宽度）浏览器左栏向服务器请求切片
         if(eventX>=_this.scale*2 && eventY<_this.scale && eventY>-_this.scale) {

          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;//变换中心
          right=1;
          
         }
         if(eventX<=-_this.scale*2 && eventY<_this.scale && eventY>-_this.scale){
          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;//变换中心
          left=1;
         }


         //向下水平位移超过_this.scale（一个切片的高度）浏览器上部向服务器请求切片
         if(eventY>=_this.scale*2 && eventX<_this.scale && eventX>-_this.scale) {

          addY = parseInt(eventY/_this.scale);
          y=y-addY;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;
          down=1;
         }

         if(eventY<=-_this.scale*2 && eventX<_this.scale && eventX>-_this.scale){
          addY = parseInt(eventY/_this.scale);
          y=y-addY;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;
          up=1;
         }
         //向对角四个方向位移超过_this.scale
         if((eventY>=_this.scale*2 && eventX>=_this.scale*2)) {

          addY = parseInt(eventY/_this.scale);
          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=1;
          down=1;
          left=0;
          up=0;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY<=-_this.scale*2 && eventX<=-_this.scale*2)) {

          addY = parseInt(eventY/_this.scale);
          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=0;
          down=0;
          left=1;
          up=1;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY>=_this.scale*2 && eventX<=-_this.scale*2)) {

          addY = parseInt(eventY/_this.scale);
          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=0;
          down=1;
          left=1;
          up=0;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY<=-_this.scale*2 && eventX>=_this.scale*2)) {

          addY = parseInt(eventY/_this.scale);
          addX = parseInt(eventX/_this.scale);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=1;
          down=0;
          left=0;
          up=1;
          //_this.draw_Image(zoom,x,y);
         }
         //超出北京市的范围用图像瓦片
  
        if(x>=0 && x<Math.pow(2, zoom) && y>=0 && y<Math.pow(2, zoom)){
          _this.draw_Image(zoom,x,y);       
        }
         
        });
    });

    this.$canvas.on('touchend', function(event) { //鼠标拖动结束事件函数
      $(this).unbind('touchmove');
    })

//desktop browser
    this.$canvas.on('mousedown', function(event) { //鼠标点拖动-实现地图拖拽功能
      _this.last_position = { //鼠标点击的位置
        x: event.clientX,
        y: event.clientY
      };

      $(this).bind('mousemove', function(event) {
        var addX = 0;
        var addY = 0;
        var delta = { //位移长度
          x: _this.last_position.x - event.clientX,
          y: _this.last_position.y - event.clientY
        };

         eventX -=delta.x; //位移后的新位置
         eventY -=delta.y; //位移后的新位置

         _this.last_position = { //当前位置初始化
          x: event.clientX,
          y: event.clientY
         }; 
         
         //向右水平位移超过256（一个切片的宽度）浏览器左栏向服务器请求切片
         if(eventX>=256*2 && eventY<256 && eventY>-256) {

          addX = parseInt(eventX/256);
          x=x-addX;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;//变换中心
          right=1;
          
         }
         if(eventX<=-256*2 && eventY<256 && eventY>-256){
          addX = parseInt(eventX/256);
          x=x-addX;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;//变换中心
          left=1;
         }


         //向下水平位移超过256（一个切片的高度）浏览器上部向服务器请求切片
         if(eventY>=256*2 && eventX<256 && eventX>-256) {

          addY = parseInt(eventY/256);
          y=y-addY;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;
          down=1;
         }

         if(eventY<=-256*2 && eventX<256 && eventX>-256){
          addY = parseInt(eventY/256);
          y=y-addY;
          //_this.draw_Image(zoom,x,y);
          changeCenter=1;
          up=1;
         }
         //向对角四个方向位移超过256
         if((eventY>=256*2 && eventX>=256*2)) {

          addY = parseInt(eventY/256);
          addX = parseInt(eventX/256);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=1;
          down=1;
          left=0;
          up=0;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY<=-256*2 && eventX<=-256*2)) {

          addY = parseInt(eventY/256);
          addX = parseInt(eventX/256);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=0;
          down=0;
          left=1;
          up=1;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY>=256*2 && eventX<=-256*2)) {

          addY = parseInt(eventY/256);
          addX = parseInt(eventX/256);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=0;
          down=1;
          left=1;
          up=0;
          //_this.draw_Image(zoom,x,y);
         }

         if((eventY<=-256*2 && eventX>=256*2)) {

          addY = parseInt(eventY/256);
          addX = parseInt(eventX/256);
          x=x-addX;
          y=y-addY;
          changeCenter=1;
          right=1;
          down=0;
          left=0;
          up=1;
          //_this.draw_Image(zoom,x,y);
         }
        //if(eventX>50 || eventY>50 || eventX<-50 || eventY<-50) 
        //超出北京市的范围用图像瓦片
        //console.log(zoom+'/'+x+'/'+y);
      
        if(x>=0 && x<Math.pow(2, zoom) && y>=0 && y<Math.pow(2, zoom)){
          _this.draw_Image(zoom,x,y);       
        }

         
        });
    });

    this.$canvas.on('mouseup', function(event) { //鼠标拖动结束事件函数
      $(this).unbind('mousemove');

    })

    return this;
    }; // Map div function -地图操

/*
Map主函数的原型方法-加载GeoJSON数据

load()-加载json数据-同步加载（即数据加载完成后再执行它之后的程序）
loadAsync()-加载json数据-异步加载（即数据加载同时可以先执行它之后的程序，加载完成进行回调）
*/
    Map.prototype.load = function(jsonTile) { 
      var _this = this;
      $.ajaxSettings.async = false; //ajax同步
      $.getJSON(jsonTile, function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
        if(textStatus=="success")
        {
          _this.data = data;
          $(_this).trigger('data_updated');
          
        }       
      });
    };

    Map.prototype.loadAsync = function(jsonTile) {
      var _this = this;
      $.ajaxSettings.async = true; //ajax异步
      $.getJSON(jsonTile, function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
        if(textStatus=="success")
        {
          _this.data = data;
          $(_this).trigger('data_updated');
          
        }
      });
    };

/*
Map主函数的原型方法-渲染GeoJSON数据
参数：[ct]canvas元素，[jsonTile]GeoJSON切片数据 [zoom] [,x] [,y]zoom/x/y [moveX] [,moveY]canvas中的位置
功能：根据渲染规则读GeoJSON数据并进行渲染
*/
    Map.prototype.draw_json = function(ct,TileNum,zoom,x,y,moveX,moveY) {
      var ctx = ct;

      //坐标缩放权值
      var xmult = this.scale / (bbox[2] - bbox[0]);
      var ymult = this.scale / (bbox[3] - bbox[1]);


      
      //geojson数据对象格式（'LineString'、'MultiLineString'、'Polygon'、'MultiPolygon'）-对应格式： 一维数组 二维数组
      var coordinates = new Array; 

      function tile2lon(zoom, x) { //地理坐标-经度转换函数
      return (x / Math.pow(2, zoom) * 360 - 180);
      }

      function tile2lat(zoom, y) { //地理坐标-纬度转换函数
        var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
        return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
      }

      //var bbox = new Array; 切片的边框的经纬度信息
      bbox[0]= tile2lon(zoom, x);
      bbox[3]= tile2lat(zoom, y);
      bbox[2]= tile2lon(zoom, x+1);
      bbox[1]= tile2lat(zoom, y+1);

      var m = new Array; //道路填充位置x
      var n = new Array; //道路填充位置y
      var way_name = new Array; //道路名字 数组

      /*
      后期可以帮道路名字栅格化，进行图层叠加
      道路名字栅格化填充函数
      ...add

      */

      var num = 0; //道路名字出行次数
      //geojson数据对象格式（'LineString'、'MultiLineString'、'Polygon'、'MultiPolygon'）-对应格式： 一维数组 二维数组      
       $.each(store[TileNum].get('features'), function(indx, obj) { 
       //解析json对象的jquery each()方法

        if (obj.geometry.type == 'LineString' ){
          coordinates=obj.geometry.coordinates;
        }
        if (obj.geometry.type == 'MultiLineString' || obj.geometry.type == 'Polygon' ){
          coordinates=obj.geometry.coordinates[0];
        }
        if (obj.geometry.type == 'MultiPolygon' ){
          coordinates=obj.geometry.coordinates[0][0];
        }
        //var nameX;
        //var nameY;


        //矢量绘制初始化
        ctx.beginPath();

        //var hasInRange = false;
        var hasInRange = true;
        var RoadInRange = false;
        $.each(coordinates, function(nindx, node) {
          if ((node[0]>= Math.min(bbox[0], bbox[2]) && node[0] <= Math.max(bbox[0], bbox[2]))&&(node[1] >= Math.min(bbox[1], bbox[3]) && node[1] <= Math.max(bbox[1], bbox[3]))) { RoadInRange = true };
          //判断该点是否在切片范围内
          //if(!RoadInRange) return;
          if(hasInRange) { //如果该点在切片范围内
            var x_ = (node[0] - bbox[0]) * xmult + moveX; //投影至画布上的x轴坐标
            var y_ = (bbox[3] - node[1]) * ymult + moveY; //投影至画布上的y轴坐标

            if (nindx === 0) { //矢量对象的起点
              ctx.moveTo(x_, y_); //canvas函数 绘制线条
              //if(obj.properties.name != undefined) {  //全部对象的名字
/*
              
*/
                //ctx.fillText=(obj.properties.name,m,n);

              }
            else {
              ctx.lineTo(x_, y_);

              if(nindx==12){
                //nameX=x_;
                //nameY=y_; 
                if(obj.properties.name != undefined && obj.properties.highway != undefined && obj.properties.highway != null){ 
                    if(((obj.properties.highway == 'motorway' || obj.properties.highway == 'trunk' || obj.properties.highway == 'primary' || obj.properties.highway == 'secondary') && zoom>=13) || ((obj.properties.highway == 'tertiary' || obj.properties.highway == 'tertiary_link' || obj.properties.highway == 'construction') && zoom>=14 ) || ((obj.properties.highway == 'residential' || obj.properties.highway == 'unclassified' || obj.properties.highway == 'road') && zoom >= 15) || ((obj.properties.highway == 'raceway' || obj.properties.highway == 'service') && zoom >= 16) || ((obj.properties.highway == 'living_street' || obj.properties.highway == 'pedestrian') && zoom >= 15) ){
                      if(RoadInRange){
                        m[num]=x_;
                      n[num]=y_;
                      way_name[num]=obj.properties.name; //道路名字
                      //console.log(way_name[num],x_,y_);
                      num += 1;

                      }
                    
                  }
                  
                }               
              }
              

            } //canvas函数-绘制线条
          }
          
          //ctx.fillText(way_name[num],m[num],n[num]); 

        });

        if (!hasInRange) { return; };



/*              
              if(obj.properties.railway != null) {
          //根据道路渲染规则"stylesheets/ways.js" 初始化道路对象
          var railway = new waysCss('railway',obj.properties,zoom);         

          ctx.strokeStyle = railway[0];
                ctx.lineWidth = railway[2];
                ctx.lineJoin="round";
                ctx.strokeDasharray = 8,8;
                ctx.stroke();

        }

              if(obj.properties.aeroway != null) {
          //根据道路渲染规则"stylesheets/ways.js" 初始化道路对象
          var roads = new waysCss('aeroway',obj.properties,zoom);

          ctx.lineJoin="round";
          ctx.strokeStyle = roads[0]; //线条颜色
          ctx.lineWidth = roads[2];   //线条宽度
          //ctx.strokeDasharray = 5,10;
          ctx.stroke();  

        }       
*/
//if(road_flag==0){
           //building water area
              if(obj.properties["building"] != null) {
                //根据建筑渲染规则"stylesheets/building.js" 初始化建筑对象
                var building = new buildingCss('building',obj.properties.building,zoom);
          if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = building[1]; 
              ctx.globalAlpha = 0.9; 
              ctx.fill();
          }             
                ctx.strokeStyle = building[0];
                ctx.lineWidth = building[2];
                ctx.stroke();
              }
          //type_11 :  'leisure' 'wetland' 'tourism' 'landuse' 'amenity' 'military' 'natural' 'power' 'aeroway'=='apron'||'aerodrome' 'highway'=='services'||'rest_area' 'railway'=='station'   
          //ctx.fillStyle = 'pink';  
              if(obj.properties.railway == 'station') {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('railway',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
                //if(zoom>=12){
                //  ctx.strokeStyle = landcover[0];
                //  ctx.lineWidth = landcover[2];
                //  ctx.stroke();
                //}
              }             
              if(obj.properties.highway == 'services' || obj.properties.highway == 'rest_area') {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('highway',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.aeroway == 'apron' || obj.properties.aeroway == 'aerodrome') {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('aeroway',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.power!= null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('power',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.natural!= null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('natural',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.military != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('military',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }

              if(obj.properties.amenity != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('amenity',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }

              if(obj.properties.landuse != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('landuse',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.tourism != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('tourism',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.wetland != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('wetland',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }
              if(obj.properties.leisure != null) {
                //根据水域渲染规则"stylesheets/landcover.js" 初始化水域对象
                var landcover = new landcoverCss('leisure',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
              ctx.fillStyle = landcover[1];
              ctx.globalAlpha = 0.8; 
                  ctx.fill();
          } 
              }



              if(obj.properties.natural != null ) {
                //根据水域渲染规则"stylesheets/water.js" 初始化水域对象
                //type == 'natural' || type == 'waterway' || type == 'landuse'
                var water = new waterCss('natural',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
                  ctx.fillStyle = water[1];
                  ctx.globalAlpha = 0.8; 
                  ctx.fill();
          }

              }

              if(obj.properties.landuse != null) {            
                
                var water = new waterCss('landuse',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
                  ctx.fillStyle = water[1];
                  ctx.globalAlpha = 0.8; 
                  ctx.fill(); 
          }               

              }

              if(obj.properties.waterway != null && (obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon')) {

                var water = new waterCss('waterway',obj.properties,zoom);
                if(obj.geometry.type=='Polygon' || obj.geometry.type == 'MultiPolygon'){
                  ctx.fillStyle = water[1];
                  ctx.globalAlpha = 0.8; 
                  ctx.fill(); 
          }
   
              }
              ctx.globalAlpha = 0.9; 
              ctx.fillStyle = '#C1FFC1'; 



              if(obj.properties.waterway !=null && obj.geometry.type!='Polygon' && obj.geometry.type != 'MultiPolygon'){
                //根据河流渲染规则"stylesheets/waterway.js" 初始化河流对象
                var waterway = new waterlineCss('waterway',obj.properties,zoom);
                ctx.strokeStyle = waterway[0];
                ctx.lineWidth = waterway[2];
                ctx.stroke();
              }
/*      
              if(obj.properties.railway !=null){
                //根据水域渲染规则"stylesheets/subway.js" 初始化地铁对象
                var railway = new railwayCss('subway',obj.properties,zoom);
                if(railway[6]==0) //非虚线
                {
                  ctx.strokeStyle = railway[0];
                  ctx.lineWidth = railway[1];
                  ctx.stroke();

                  ctx.strokeStyle = railway[2];
                  ctx.lineWidth = railway[3];
                  ctx.stroke();
                  
                  ctx.strokeStyle = railway[4];
                  ctx.lineWidth = railway[5];
                  ctx.stroke();
                }
                if(railway[6]==1) //画虚线
                {
                  ctx.strokeStyle = railway[0];
                  ctx.lineWidth = railway[1];
                  ctx.stroke();
                }
                
              }

*/
              //ctx.fillStyle = 'black';
        //ctx.fillText(num,m[num-1],n[num-1]);

//  }//road_flag==0;

        if(zoom>=5 && (obj.properties.highway != undefined && obj.properties.highway != null)) {
          //根据道路渲染规则"stylesheets/ways.js" 初始化道路对象
          var roads = new waysCss('highway',obj.properties,zoom);


          ctx.lineJoin="round";
          ctx.strokeStyle = roads[0]; //线条颜色
          ctx.lineWidth = roads[2];   //线条宽度
          //ctx.strokeDasharray = 5,10;
          ctx.stroke();               //绘制线条1（道路外围线）
        
          ctx.lineJoin="round";
          ctx.strokeStyle = roads[1]; //线条颜色
          ctx.lineWidth = roads[3];   //线条宽度
          ctx.stroke();               //绘制线条2 （道路主线-内）
/*
          ctx.lineJoin="round";
          ctx.strokeStyle = '#777'; //线条颜色
          ctx.lineWidth = 1;   //线条宽度
          ctx.stroke();               //绘制线条2 （道路主线-内）

*/
/*    if(obj.properties.name != undefined && obj.properties.highway != undefined && obj.properties.highway != null){ 
      if(((obj.properties.highway == 'motorway' || obj.properties.highway == 'trunk' || obj.properties.highway == 'primary' || obj.properties.highway == 'secondary') && zoom >= 13) || ((obj.properties.highway == 'tertiary' || obj.properties.highway == 'tertiary_link' || obj.properties.highway == 'construction') && zoom>=14 ) || ((obj.properties.highway == 'residential' || obj.properties.highway == 'unclassified' || obj.properties.highway == 'road') && zoom >= 15) || ((obj.properties.highway == 'raceway' || obj.properties.highway == 'service') && zoom >= 16) || ((obj.properties.highway == 'living_street' || obj.properties.highway == 'pedestrian') && zoom >= 15) ){
        if(RoadInRange){
          ctx.font=roads[6]+"px Arial";
          ctx.textBaseline="middle";
          ctx.textAlign = "center";
          ctx.fillStyle = roads[7];
          ctx.fillText(obj.properties.name,nameX,nameY);
          ctx.fillStyle = '#FFDAB9';
        }
      }
    }
    */
        };//if type==way end
      
        if(zoom<5) {
          //根据道路渲染规则"stylesheets/highway.js" 初始化道路对象
          if(obj.properties.highway =='motorway' || obj.properties.highway =='motorway_link'){
            ctx.lineJoin="round";
            ctx.strokeStyle = '#506077'; //线条颜色
            ctx.lineWidth = 3.5;   //线条宽度
            //ctx.strokeDasharray = 5,10;
            ctx.stroke();               //绘制线条1（道路外围线）

            ctx.lineJoin="round";
            ctx.strokeStyle = '#89a4cb'; //线条颜色
            ctx.lineWidth = 2.5;   //线条宽度
            ctx.stroke();               //绘制线条2 （道路主线-内）
          }

          if(obj.properties.highway =='trunk'){
            ctx.lineJoin="round";
            ctx.strokeStyle = '#477147'; //线条颜色
            ctx.lineWidth = 3.5;   //线条宽度
            //ctx.strokeDasharray = 5,10;
            ctx.stroke();               //绘制线条1（道路外围线）

            ctx.lineJoin="round";
            ctx.strokeStyle = '#94d494'; //线条颜色
            ctx.lineWidth = 3;   //线条宽度
            ctx.stroke();               //绘制线条2 （道路主线-内）
          }

            if(obj.properties.highway =='tertiary'){
            ctx.lineJoin="round";
            ctx.strokeStyle = '#ddd'; //线条颜色
            ctx.lineWidth = 1.5;   //线条宽度
            //ctx.strokeDasharray = 5,10;
            ctx.stroke();               //绘制线条1（道路外围线）

          }
          
          
        };//if type==way end
  }); // .each(this.data.features, function(indx, way)
    
      /*
      后期可以帮道路名字栅格化，进行图层叠加
      道路名字栅格化填充函数
      ...add

      */
      //填充道路名字
      for (var i = 0; i < way_name.length; i++) {
      
        //相同路名只显示一次
        j=i;
        while(way_name[i]==way_name[j+1] && i<way_name.length){
          j++;
        }
        i=j;
        ctx.globalAlpha = 0.6; 
          ctx.font="10px Arial";
          ctx.textBaseline="middle";
          ctx.textAlign = "center";
          ctx.fillStyle = 'black';
          ctx.strokeStyle = 'black';
          ctx.fillText(way_name[i],m[i],n[i]);


      }; 
      //console.log(way_name);  
      ctx.fillStyle = '#FFDAB9';
      way_name=[];
      num=0;

    }
/*
Map主函数渲染路况信息的原型方法
*/
    Map.prototype.draw_roadJson = function(ct,TileNum,zoom,x,y,moveX,moveY) {
      var ctx = ct;

      //坐标缩放权值
      var xmult = this.scale / (bbox[2] - bbox[0]);
      var ymult = this.scale / (bbox[3] - bbox[1]);


      
      //geojson数据对象格式（'LineString'、'MultiLineString'、'Polygon'、'MultiPolygon'）-对应格式： 一维数组 二维数组
      var coordinates = new Array; 

      function tile2lon(zoom, x) { //地理坐标-经度转换函数
      return (x / Math.pow(2, zoom) * 360 - 180);
      }

      function tile2lat(zoom, y) { //地理坐标-纬度转换函数
        var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
        return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
      }

      //var bbox = new Array; 切片的边框的经纬度信息
      bbox[0]= tile2lon(zoom, x);
      bbox[3]= tile2lat(zoom, y);
      bbox[2]= tile2lon(zoom, x+1);
      bbox[1]= tile2lat(zoom, y+1);


      /*
      后期可以帮道路名字栅格化，进行图层叠加
      道路名字栅格化填充函数
      ...add

      */




    if(roadCondition_flag==1 && zoom>13)
    {
       $.each(roadCondition[TileNum].get('features'), function(indx, obj) { 
       //解析json对象的jquery each()方法

        if (obj.geometry.type == 'LineString' ){
          coordinates=obj.geometry.coordinates;
        }
        if (obj.geometry.type == 'MultiLineString' || obj.geometry.type == 'Polygon' ){
          coordinates=obj.geometry.coordinates[0];
        }
        if (obj.geometry.type == 'MultiPolygon' ){
          coordinates=obj.geometry.coordinates[0][0];
        }

        //矢量绘制初始化
        ctx.beginPath();

        var hasInRange = true;

        $.each(coordinates, function(nindx, node) {

          if(selectImageFlag==2||selectImageFlag==3) { //如果该点在切片范围内
            var gcjloc = transformFromWGSToGCJ(node[0],node[1]);//gcjloc.lng,gcjloc.lat
            var x_ = (gcjloc.lng - bbox[0]) * xmult + moveX; //投影至画布上的x轴坐标
            var y_ = (bbox[3] - gcjloc.lat) * ymult + moveY; //投影至画布上的y轴坐标

            if (nindx === 0) { //矢量对象的起点
              ctx.moveTo(x_, y_); //canvas函数 绘制线条
            }
            else ctx.lineTo(x_, y_);

             //canvas函数-绘制线条
          }
          if(selectImageFlag==0||selectImageFlag==1) { //如果该点在切片范围内
        
            var x_ = (node[0] - bbox[0]) * xmult + moveX; //投影至画布上的x轴坐标
            var y_ = (bbox[3] - node[1]) * ymult + moveY; //投影至画布上的y轴坐标

            if (nindx === 0) { //矢量对象的起点
              ctx.moveTo(x_, y_); //canvas函数 绘制线条
            }
            else ctx.lineTo(x_, y_);

             //canvas函数-绘制线条
          }         

        });

        if(zoom>=5 && (obj.properties.highway != undefined && obj.properties.highway != null)) {
          //根据道路渲染规则"stylesheets/ways.js" 初始化道路对象
          var roads = new waysCss('highway',obj.properties,zoom);
          ctx.lineJoin="round";
          ctx.strokeStyle = roads[0]; //线条颜色
          ctx.lineWidth = roads[2];   //线条宽度
          ctx.globalAlpha = 0.7; 
          ctx.stroke();               //绘制线条1（道路外围线）
        
          ctx.lineJoin="round";
          
          if(obj.properties.average_speed<10){
            ctx.strokeStyle = '#EE0000'; //线条颜色 拥堵
          }
          if(obj.properties.average_speed>=10 && obj.properties.average_speed<20){
            ctx.strokeStyle = '#EEAD0E'; //线条颜色 缓行
          }
          if(obj.properties.average_speed>=20){
            ctx.strokeStyle = '#7FFF00'; //线条颜色 顺畅
          }
          if(obj.properties.average_speed==null || obj.properties.average_speed==undefined){
            ctx.strokeStyle = '#DCDCDC'; //线条颜色 顺畅
          }

          
          ctx.lineWidth = roads[2]-0.5;   //线条宽度
          ctx.globalAlpha = 0.7; 
          ctx.stroke();               //绘制线条2 （道路主线-内）
          
        };//if type==way end
      

      }); // 路况叠加
    }

  }
/*
Map主函数的原型方法-地图混合渲染函数
参数：[zoom] [,x] [,y]zoom/x/y 切片块位置（命名：缩放等级/x/y）
功能：根据渲染规则读GeoJSON数据并进行渲染
*/

    // render MAP
    Map.prototype.draw_Image = function(zoom,x,y){
      //初始化工作
      var _this = this;
      var ctx = this.$canvas[0].getContext('2d');

      this.$canvas[0].width = this.$div.width();
      this.$canvas[0].height = this.$div.height();
      ctx.width = this.$div.width();
      ctx.height = this.$div.height();

      var pngTile = new Array();  //图片切片
      var jsonTile = new Array(); //矢量切片
      var jsonT = new Array(); //矢量切片
      var roadTile = new Array(); //路况切片

      var TencentTile = new Array();  //Tencent切片
      var OSMTile = new Array();  //OSM&OCM切片
      var GTile = new Array();  //Google切片

      var pngTileAddZoom = new Array();  //下级切片
      var pngTileSubZoom = new Array();  //上级切片
      // Create or get an existing store

      //超出北京市范围的矢量瓦片用图像瓦片替换
      /*
12.3368.1547.json
12.3376.1554.json
13.6736.3095.json
13.6752.3109.json
14.13472.6190.json
14.13505.6219.json
15.26945.12380.json
15.27010.12438.json
16.53891.24760.json
16.54020.24876.json
17.107783.49520.json
17.108041.49753.json
18.215566.99041.json
18.216082.99507.json
19.431133.198083.json
19.432165.199015.json
      */
      if(zoom<12) flag=0;
      if(zoom==12 && (x-3<=3368 || x+3>=3376 || y-3<=1547 || y+3>=1554)) {flag=0;roadCondition_flag=0;}
      if(zoom==13 && (x-3<=6736 || x+3>=6752 || y-3<=3095 || y+3>=3109)) {flag=0;roadCondition_flag=0;}
      if(zoom==14 && (x-3<=13472 || x+3>=13505 || y-3<=6190 || y+3>=6219)) {flag=0;roadCondition_flag=0;}
      if(zoom==15 && (x-3<=26945 || x+3>=27010 || y-3<=12380 || y+3>=12438)) {flag=0;roadCondition_flag=0;}
      if(zoom==16 && (x-3<=53891 || x+3>=54020 || y-3<=24760 || y+3>=24876)) {flag=0;roadCondition_flag=0;}
      if(zoom==17 && (x-3<=107783 || x+3>=108041 || y-3<=49520 || y+3>=49753)) {flag=0;roadCondition_flag=0;}
      if(zoom==18 && (x-3<=215566 || x+3>=216082 || y-3<=99041 || y+3>=99507)) {flag=0;roadCondition_flag=0;}
      if(zoom==19 && (x-3<=431133 || x+3>=432165 || y-3<=198083 || y+3>=199015)) {flag=0;roadCondition_flag=0;}

    /*
      for(var i = 0; i < 35 ; i++){
        pngTile[i] = new Image();
        pngTile[i].addEventListener('load',eventImageLoad,false);
      }
    */
      var move_x = new Array(); //切片的7个横坐标位置
      var move_y = new Array(); //切片的5个纵坐标位置


      for (var i = 0; i < 7; i++) {
        move_y[i] = _this.scale*(i-1); //切片的5个纵坐标位置初始化
      };  

      for (var i = 0; i < 7; i++) {
        move_x[i] = _this.scale*(i-1); ////切片的7个横坐标位置初始化
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          pngTile[7*i+j] = zoom+'/'+(x-3+i)+'/'+(y-3+j); 
          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };
      //zoom in: pngTileAddZoom
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          pngTileAddZoom[7*i+j] = (zoom+1)+'/'+(2*x-3+i)+'/'+(2*y-3+j); 

          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };
      //zoom out: pngTileSubZoom
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          pngTileSubZoom[7*i+j] = (zoom-1)+'/'+(Math.round(x/2)-3+i)+'/'+(Math.round(y/2)-3+j); 
          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };
      //Tencent Tiles:TencentTile
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          TencentTile[7*i+j] = zoom+'/'+(Math.floor((x-3+i)/16.0))+'/'+(Math.floor((Math.pow(2,zoom)-1-(y-3+j))/16.0))+'/'+(x-3+i)+'_'+(Math.pow(2,zoom)-1-(y-3+j))+'.png'; 

          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };
      //OSM&OCM Tiles:OSMTile
      for (var i = 0; i < 7; i++) {
        move_x[i] = _this.scale*(i-1); ////切片的7个横坐标位置初始化
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          OSMTile[7*i+j] = zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.png'; 
          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };

      //Google Tiles:GTile
      for (var i = 0; i < 7; i++) {
        move_x[i] = _this.scale*(i-1); ////切片的7个横坐标位置初始化
        for (var j = 0; j < 7 ; j++) {
          //图像切片命名 - 文件路径
          GTile[7*i+j] = '&hl=zh-CN&gl=CN&src=app&x=' + (x-3+i) + '&y=' + (y-3+j) + '&z=' + zoom + '&s=Ga';

          //本地矢量切片命名 - 文件路径
          //jsonTile[7*i+j] =''+'Tiles'+'/'+zoom+'/'+(x-3+i)+'/'+(y-3+j)+'.'+'json'; 
        };
      };
      //x=13478&y=6218&z=14&s=Ga
/*
      function eventImageLoad(){
        drawScreen();
      }
*/
      //function drawScreen(){
             
             //切片位置视图
      //   0   1  2   3   4   5    6
      //0 [0   5  10  15  20  25   30]
      //1 [1  [6  11  16  21  26]  31]
      //2 [2  [7  12  17  22  27]  32]
      //3 [3  [8  13  18  23  28]  33]
      //4 [4   9  14  19  24  29   34]


           //切片位置视图
      //   0   1  2   3   4   5    6
      //0 [0   7  14  21  28  35   42]
      //1 [1  [8  15  22  29  36]  43]
      //2 [2  [9  16  23  30  37]  44]
      //3 [3  [10 17  24  31  38]  45]
      //4 [4  [11 18  25  32  39]  46]
      //5 [5  [12 19  26  33  40]  47]
      //6 [6   13 20  27  34  41   48]


      if(changeCenter==1) { //触发中心点位置修正
        move_x[3]=move_x[3]+eventX;
        move_y[2]=move_y[2]+eventY;
        eventX=0;
        eventY=0;
        if(flag==1){

          if(right==0&&left==0&&up==0&&down==0&&countFlag!=1){
            for(var i=0;i<49;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);
              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { 
              //用jquery的getJSON()方法获取GeoJSON数据
                //在数据传输完成前先进行其他流程
          
                
          
                if(textStatus=="success")
                {
                  /*
                  if(store[i].name == 'QuotaExceededError'){
                    store[i].clear();
                    store[i].set('features',data.features);
                  }
                  */
                  //异步无法提供缓存解决方案--只能同步获取json再存储
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
              
            }

            /*if(zoom>=10&&zoom<=18){
              
              //预取上一级zoom和下一级zoom
              if(zoom<15){
                for(var i=0;i<49;i++){
                  var SubZoomURL=url1+'v/'+pngTileSubZoom[i];
                  $.ajaxSettings.async = true; //ajax同步

                  $.getJSON(SubZoomURL, function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                    //在数据传输完成前先进行其他流程
                
                    //Tilefunction0(i);
                    //TilefunctionSub(i);
                    if(textStatus=="success")
                    {
                      $(_this).trigger('data_updated');
                    } 
                  });               
                }
              }
              if(zoom>15){
                for(var i=0;i<49;i++){
                  var AddZoomURL=url1+'v/'+pngTileAddZoom[i];
                  $.ajaxSettings.async = true; //ajax同步

                  $.getJSON(AddZoomURL, function(data,textStatus) { 
                    //在数据传输完成前先进行其他流程
                
                    //Tilefunction0(i);
                    //TilefunctionAdd(i);
                    if(textStatus=="success")
                    {
                      $(_this).trigger('data_updated');
                    } 
                  }); 
                }               
              }             
            }*/
                        
          }

          if(right==0&&left==1&&up==1&&down==0){//向左上拖动
            for(var i=0;i<=4;i++){
              for(var j=4;j>=0;j--){
                store[i*7+j]=store[(i+2)*7+(j+2)];
              }             
            }
            for(var i=35;i<49;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              jsonTile[i*7+5]=url1+'v/'+pngTile[i*7+5];
              var str='store['+(i*7+5)+']';
              store[i*7+5] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+5], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+5].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              jsonTile[i*7+6]=url1+'v/'+pngTile[i*7+6];
              var str='store['+(i*7+6)+']';
              store[i*7+6] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+6], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+6].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }

          if(right==0&&left==1&&up==0&&down==1){//向左下拖动
          
            for(var i=0;i<=4;i++){
              for(var j=2;j<=6;j++){
                store[i*7+j]=store[(i+2)*7+(j-2)];
              }             
            }
            for(var i=35;i<49;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              jsonTile[i*7]=url1+'v/'+pngTile[i*7];
              var str='store['+(i*7)+']';
              store[i*7] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              jsonTile[i*7+1]=url1+'v/'+pngTile[i*7+1];
              var str='store['+(i*7+1)+']';
              store[i*7+1] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+1], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+1].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }


          if(right==1&&left==0&&up==0&&down==1){//向右下拖动
          
            for(var i=6;i>=2;i--){
              for(var j=6;j>=2;j--){
                store[i*7+j]=store[(i-2)*7+(j-2)];
              }             
            }
            for(var i=0;i<14;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              jsonTile[i*7]=url1+'v/'+pngTile[i*7];
              var str='store['+(i*7)+']';
              store[i*7] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              jsonTile[i*7+1]=url1+'v/'+pngTile[i*7+1];
              var str='store['+(i*7+1)+']';
              store[i*7+1] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+1], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+1].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }


          if(right==1&&left==0&&up==1&&down==0){//向右上拖动
            for(var i=6;i>=2;i--){
              for(var j=0;j<=4;j++){
                store[i*7+j]=store[(i-2)*7+(j+2)];
              }             
            }
            for(var i=0;i<14;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              jsonTile[i*7+5]=url1+'v/'+pngTile[i*7+5];
              var str='store['+(i*7+5)+']';
              store[i*7+5] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+5], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+5].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              jsonTile[i*7+6]=url1+'v/'+pngTile[i*7+6];
              var str='store['+(i*7+6)+']';
              store[i*7+6] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i*7+6], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  store[i*7+6].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }

          if(right==0&&left==0&&up==0&&down==1){//向下拖动
            for(var i=0;i<7;i++){
              for(var j=6;j>=2;j--){
                store[i*7+j]=store[i*7+j-2];
              }             
            }
            for(var i=0;i<7;i++){
              for(var j=0;j<2;j++){
                //store[i*7+j]
                jsonTile[i*7+j]=url1+'v/'+pngTile[i*7+j];
                var str='store['+(i*7+j)+']';
                store[i*7+j] = Storage(str);
                //map.load(jsonTile[i]);              
                $.ajaxSettings.async = false; //ajax同步
                $.getJSON(jsonTile[i*7+j], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                  if(textStatus=="success")
                  {
                    store[i*7+j].set('features',data.features);
                    $(_this).trigger('data_updated');
                  } 
                });               
              }             
            }                       
          }

          if(right==0&&left==0&&up==1&&down==0){//向上拖动
            for(var i=0;i<7;i++){
              for(var j=0;j<5;j++){
                store[i*7+j]=store[i*7+j+2];
              }             
            }
            for(var i=0;i<7;i++){
              for(var j=5;j<7;j++){
                //store[i*7+j]
                jsonTile[i*7+j]=url1+'v/'+pngTile[i*7+j];
                var str='store['+(i*7+j)+']';
                store[i*7+j] = Storage(str);
                //map.load(jsonTile[i]);              
                $.ajaxSettings.async = false; //ajax同步
                $.getJSON(jsonTile[i*7+j], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                  if(textStatus=="success")
                  {
                    store[i*7+j].set('features',data.features);
                    $(_this).trigger('data_updated');
                  } 
                });               
              }             
            }                       
          }

          if(right==0&&left==1&&up==0&&down==0){//向左拖动
            for(var i=0;i<35;i++){
              //var str='store['+i+']';
              //store[i] = Storage(str);
              store[i]=store[i+14];
            }

            for(var i=35;i<49;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  /*
                  if(store[i].name == 'QuotaExceededError'){
                    store[i].clear();
                    store[i].set('features',data.features);
                  }
                  */
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
            }                       
          }

          if(right==1&&left==0&&up==0&&down==0){//向右拖动
            for(var i=48;i>=14;i--){
              //var str='store['+i+']';
              //store[i] = Storage(str);
              store[i]=store[i-14];
            }
            for(var i=0;i<14;i++){
              jsonTile[i]=url1+'v/'+pngTile[i];
              var str='store['+i+']';
              store[i] = Storage(str);
              //map.load(jsonTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(jsonTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  /*
                  if(store[i].name == 'QuotaExceededError'){
                    store[i].clear();
                    store[i].set('features',data.features);
                  }
                  */
                  store[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
            }
          }

        }
//路况切片的加载和缓存
        if(roadCondition_flag==1 && zoom>13){

          if(right==0&&left==0&&up==0&&down==0&&roadConditionStorageFlag==0){
            for(var i=0;i<49;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
            }
            roadConditionStorageFlag=1;                       
          }

          if(right==0&&left==1&&up==1&&down==0){//向左上拖动
            for(var i=0;i<=4;i++){
              for(var j=4;j>=0;j--){
                roadCondition[i*7+j]=roadCondition[(i+2)*7+(j+2)];
              }             
            }
            for(var i=35;i<49;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              roadTile[i*7+5]=url1+'v/'+pngTile[i*7+5];
              var str='roadCondition['+(i*7+5)+']';
              roadCondition[i*7+5] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+5], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+5].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              roadTile[i*7+6]=url1+'v/'+pngTile[i*7+6];
              var str='roadCondition['+(i*7+6)+']';
              roadCondition[i*7+6] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+6], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+6].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }

          if(right==0&&left==1&&up==0&&down==1){//向左下拖动
          
            for(var i=0;i<=4;i++){
              for(var j=2;j<=6;j++){
                roadCondition[i*7+j]=roadCondition[(i+2)*7+(j-2)];
              }             
            }
            for(var i=35;i<49;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              roadTile[i*7]=url1+'v/'+pngTile[i*7];
              var str='roadCondition['+(i*7)+']';
              roadCondition[i*7] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=0;i<=4;i++){
              roadTile[i*7+1]=url1+'v/'+pngTile[i*7+1];
              var str='roadCondition['+(i*7+1)+']';
              roadCondition[i*7+1] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+1], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+1].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }


          if(right==1&&left==0&&up==0&&down==1){//向右下拖动
          
            for(var i=6;i>=2;i--){
              for(var j=6;j>=2;j--){
                roadCondition[i*7+j]=roadCondition[(i-2)*7+(j-2)];
              }             
            }
            for(var i=0;i<14;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              roadTile[i*7]=url1+'v/'+pngTile[i*7];
              var str='roadCondition['+(i*7)+']';
              roadCondition[i*7] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              roadTile[i*7+1]=url1+'v/'+pngTile[i*7+1];
              var str='roadCondition['+(i*7+1)+']';
              roadCondition[i*7+1] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+1], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+1].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }


          if(right==1&&left==0&&up==1&&down==0){//向右上拖动
            for(var i=6;i>=2;i--){
              for(var j=0;j<=4;j++){
                roadCondition[i*7+j]=roadCondition[(i-2)*7+(j+2)];
              }             
            }
            for(var i=0;i<14;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              roadTile[i*7+5]=url1+'v/'+pngTile[i*7+5];
              var str='roadCondition['+(i*7+5)+']';
              roadCondition[i*7+5] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+5], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+5].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }
            for(var i=2;i<=6;i++){
              roadTile[i*7+6]=url1+'v/'+pngTile[i*7+6];
              var str='roadCondition['+(i*7+6)+']';
              roadCondition[i*7+6] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i*7+6], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i*7+6].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });                             
            }                     
          }

          if(right==0&&left==0&&up==0&&down==1){//向下拖动
            for(var i=0;i<7;i++){
              for(var j=6;j>=2;j--){
                roadCondition[i*7+j]=roadCondition[i*7+j-2];
              }             
            }
            for(var i=0;i<7;i++){
              for(var j=0;j<2;j++){
                //roadCondition[i*7+j]
                roadTile[i*7+j]=url1+'v/'+pngTile[i*7+j];
                var str='roadCondition['+(i*7+j)+']';
                roadCondition[i*7+j] = Storage(str);
                //map.load(roadTile[i]);              
                $.ajaxSettings.async = false; //ajax同步
                $.getJSON(roadTile[i*7+j], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                  if(textStatus=="success")
                  {
                    roadCondition[i*7+j].set('features',data.features);
                    $(_this).trigger('data_updated');
                  } 
                });               
              }             
            }                       
          }

          if(right==0&&left==0&&up==1&&down==0){//向上拖动
            for(var i=0;i<7;i++){
              for(var j=0;j<5;j++){
                roadCondition[i*7+j]=roadCondition[i*7+j+2];
              }             
            }
            for(var i=0;i<7;i++){
              for(var j=5;j<7;j++){
                //roadCondition[i*7+j]
                roadTile[i*7+j]=url1+'v/'+pngTile[i*7+j];
                var str='roadCondition['+(i*7+j)+']';
                roadCondition[i*7+j] = Storage(str);
                //map.load(roadTile[i]);              
                $.ajaxSettings.async = false; //ajax同步
                $.getJSON(roadTile[i*7+j], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                  if(textStatus=="success")
                  {
                    roadCondition[i*7+j].set('features',data.features);
                    $(_this).trigger('data_updated');
                  } 
                });               
              }             
            }                       
          }

          if(right==0&&left==1&&up==0&&down==0){//向左拖动
            for(var i=0;i<35;i++){
              //var str='roadCondition['+i+']';
              //roadCondition[i] = Storage(str);
              roadCondition[i]=roadCondition[i+14];
            }

            for(var i=35;i<49;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
            }                       
          }

          if(right==1&&left==0&&up==0&&down==0){//向右拖动
            for(var i=48;i>=14;i--){
              //var str='roadCondition['+i+']';
              //roadCondition[i] = Storage(str);
              roadCondition[i]=roadCondition[i-14];
            }
            for(var i=0;i<14;i++){
              roadTile[i]=url1+'t/'+pngTile[i]+'/'+roadConditionTime;
              var str='roadCondition['+i+']';
              roadCondition[i] = Storage(str);
              //map.load(roadTile[i]);              
              $.ajaxSettings.async = false; //ajax同步
              $.getJSON(roadTile[i], function(data,textStatus) { //用jquery的getJSON()方法获取GeoJSON数据
                if(textStatus=="success")
                {
                  roadCondition[i].set('features',data.features);
                  $(_this).trigger('data_updated');
                } 
              });
            }
          }





        }       
        //$.ajaxSettings.async = true; //ajax异步
        changeCenter=0;
        right=0;
        down=0;
        left=0;
        up=0;

      }
      //var img49= new Array();
      function Tilefunction0(TileNum)
      { //图片瓦片预取
        //if(flag==0) {

          var img = new Image();
          //img49[TileNum].src=url3+pngTile[TileNum]+'.png';
          if(selectImageFlag==0){
            img.src=url2+pngTile[TileNum];  
          }
          if(selectImageFlag==1){
            img.src=imageURL+OSMTile[TileNum];  
          }
          if(selectImageFlag==2){
            img.src=imageURL+TencentTile[TileNum];  
          }
          if(selectImageFlag==3){
            img.src=imageURL+GTile[TileNum];  
          }

          
          //img.src=imageURL+pngTile[TileNum];  //注意源来自geoserver还是osm/ocm外部源
          //ctx.drawImage(img49[TileNum],canvasX+eventX,canvasY+eventY);
        //};
      }
      function TilefunctionAdd(TileNum)
      { //图片瓦片预取
        //if(flag==0) {
          var img = new Image();
          //img49[TileNum].src=url1+'i/'+pngTile[TileNum];
          //img49[TileNum].src=url3+pngTileAddZoom[TileNum]+'.png';
          img.src=imageURL+pngTileAddZoom[TileNum]+'.png';

          //ctx.drawImage(img49[TileNum],canvasX+eventX,canvasY+eventY);
        //};
      }
      function TilefunctionSub(TileNum)
      { //图片瓦片预取
        //if(flag==0) {
          var img = new Image();
          //img49[TileNum].src=url1+'i/'+pngTile[TileNum];
          //img49[TileNum].src=url3+pngTileSubZoom[TileNum]+'.png';
          img.src=imageURL+pngTileSubZoom[TileNum]+'.png';  

          //ctx.drawImage(img49[TileNum],canvasX+eventX,canvasY+eventY);
        //};
      }

      function Tilefunction1(TileNum,zz,xx,yy,canvasX,canvasY)
      {
        //if(flag==1) {
          map.draw_json(ctx,TileNum,zz,xx,yy,canvasX+eventX,canvasY+eventY);
        //};
      }
      function Tilefunction2(TileNum,zz,xx,yy,canvasX,canvasY)
      {
        //if(flag==1) {
          map.draw_roadJson(ctx,TileNum,zz,xx,yy,canvasX+eventX,canvasY+eventY);
        //};
      }
      /*
      if(zoom<=12){
        var countTile=0
        for (var i = 0; i < 7; i++) {
          for(var j = 0; j < 7; j++){
            Tilefunction0(countTile);
            TilefunctionSub(countTile);
            //TilefunctionAdd(countTile);
            countTile++;
          }       
        };          
      }

      if(zoom>12){
        var countTile=0
        for (var i = 0; i < 7; i++) {
          for(var j = 0; j < 7; j++){
            Tilefunction0(countTile);
            //TilefunctionSub(countTile);
            TilefunctionAdd(countTile);
            countTile++;
          }       
        };          
      }
      */
      function preImage(url,callback){  
           var img = new Image(); //创建一个Image对象，实现图片的预下载  
           img.src = url;  
          
          if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
               callback.call(img);  
              return; // 直接返回，不用再处理onload事件  
           }
           
           img.onload = function () { //图片下载完毕时异步调用callback函数。  
               callback.call(img);//将回调函数的this替换为Image对象 
           };   
           
      }
/*
      if(flag ==0){ //图片地图
        var countTile=0;
        for (var i = 0; i < 7; i++) {
          for(var j = 0; j < 7; j++){
            //Tilefunction0(countTile);
            //preImage(url2+pngTile[countTile],function(){  
              //    ctx.drawImage(this,move_x[i]+eventX,move_y[j]+eventY);  
              // });
              //countTile++;

              var img = new Image();
              img.onload = function(){
                ctx.drawImage(img,move_x[i]+eventX,move_y[j]+eventY); 
              };
              img.src = url2+pngTile[countTile];
              if(img.complete) ctx.drawImage(img,move_x[i]+eventX,move_y[j]+eventY);
              countTile++;


          }       
        };        
      }
*/
      function imageMap(){ //图片地图
        var countTile = 0;
        var img = new Array();
        if(selectImageFlag==0){
          //pngTile[]

          //一环瓦片
            img[16] = new Image();
            img[16].onload = function(){
              ctx.drawImage(img[16],move_x[2]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[16].src = url2+pngTile[16];

            img[17] = new Image();
            img[17].onload = function(){
              ctx.drawImage(img[17],move_x[2]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[17].src = url2+pngTile[17];

            img[18] = new Image();
            img[18].onload = function(){
              ctx.drawImage(img[18],move_x[2]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[18].src = url2+pngTile[18];

            img[23] = new Image();
            img[23].onload = function(){
              ctx.drawImage(img[23],move_x[3]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[23].src = url2+pngTile[23];

            img[24] = new Image();
            img[24].onload = function(){
              ctx.drawImage(img[24],move_x[3]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[24].src = url2+pngTile[24];

            img[25] = new Image();
            img[25].onload = function(){
              ctx.drawImage(img[25],move_x[3]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[25].src = url2+pngTile[25];

            img[30] = new Image();
            img[30].onload = function(){
              ctx.drawImage(img[30],move_x[4]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[30].src = url2+pngTile[30];

            img[31] = new Image();
            img[31].onload = function(){
              ctx.drawImage(img[31],move_x[4]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[31].src = url2+pngTile[31];

            img[32] = new Image();
            img[32].onload = function(){
              ctx.drawImage(img[32],move_x[4]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[32].src = url2+pngTile[32];
  //二环瓦片
            img[15] = new Image();
            img[15].onload = function(){
              ctx.drawImage(img[15],move_x[2]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[15].src = url2+pngTile[15];

            img[22] = new Image();
            img[22].onload = function(){
              ctx.drawImage(img[22],move_x[3]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[22].src = url2+pngTile[22];

            img[29] = new Image();
            img[29].onload = function(){
              ctx.drawImage(img[29],move_x[4]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[29].src = url2+pngTile[29];



            img[19] = new Image();
            img[19].onload = function(){
              ctx.drawImage(img[19],move_x[2]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[19].src = url2+pngTile[19];

            img[26] = new Image();
            img[26].onload = function(){
              ctx.drawImage(img[26],move_x[3]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[26].src = url2+pngTile[26];

            img[33] = new Image();
            img[33].onload = function(){
              ctx.drawImage(img[33],move_x[4]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[33].src = url2+pngTile[33];

            img[8] = new Image();
            img[8].onload = function(){
              ctx.drawImage(img[8],move_x[1]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[8].src = url2+pngTile[8];

            img[9] = new Image();
            img[9].onload = function(){
              ctx.drawImage(img[9],move_x[1]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[9].src = url2+pngTile[9];

            img[10] = new Image();
            img[10].onload = function(){
              ctx.drawImage(img[10],move_x[1]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[10].src = url2+pngTile[10];
            img[11] = new Image();
            img[11].onload = function(){
              ctx.drawImage(img[11],move_x[1]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[11].src = url2+pngTile[11];

            img[12] = new Image();
            img[12].onload = function(){
              ctx.drawImage(img[12],move_x[1]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[12].src = url2+pngTile[12];



            img[36] = new Image();
            img[36].onload = function(){
              ctx.drawImage(img[36],move_x[5]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[36].src = url2+pngTile[36];

            img[37] = new Image();
            img[37].onload = function(){
              ctx.drawImage(img[37],move_x[5]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[37].src = url2+pngTile[37];

            img[38] = new Image();
            img[38].onload = function(){
              ctx.drawImage(img[38],move_x[5]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[38].src = url2+pngTile[38];
            img[39] = new Image();
            img[39].onload = function(){
              ctx.drawImage(img[39],move_x[5]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[39].src = url2+pngTile[39];

            img[40] = new Image();
            img[40].onload = function(){
              ctx.drawImage(img[40],move_x[5]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[40].src = url2+pngTile[40];         
  //三环瓦片
            img[0] = new Image();
            img[0].onload = function(){
              ctx.drawImage(img[0],move_x[0]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[0].src = url2+pngTile[0];

            img[1] = new Image();
            img[1].onload = function(){
              ctx.drawImage(img[1],move_x[0]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[1].src = url2+pngTile[1];

            img[2] = new Image();
            img[2].onload = function(){
              ctx.drawImage(img[2],move_x[0]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[2].src = url2+pngTile[2];

            img[3] = new Image();
            img[3].onload = function(){
              ctx.drawImage(img[3],move_x[0]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[3].src = url2+pngTile[3];
            img[4] = new Image();
            img[4].onload = function(){
              ctx.drawImage(img[4],move_x[0]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[4].src = url2+pngTile[4];

            img[5] = new Image();
            img[5].onload = function(){
              ctx.drawImage(img[5],move_x[0]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[5].src = url2+pngTile[5];

            img[6] = new Image();
            img[6].onload = function(){
              ctx.drawImage(img[6],move_x[0]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[6].src = url2+pngTile[6];

            img[42] = new Image();
            img[42].onload = function(){
              ctx.drawImage(img[42],move_x[6]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[42].src = url2+pngTile[42];

            img[43] = new Image();
            img[43].onload = function(){
              ctx.drawImage(img[43],move_x[6]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[43].src = url2+pngTile[43];

            img[44] = new Image();
            img[44].onload = function(){
              ctx.drawImage(img[44],move_x[6]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[44].src = url2+pngTile[44];

            img[45] = new Image();
            img[45].onload = function(){
              ctx.drawImage(img[45],move_x[6]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[45].src = url2+pngTile[45];
            img[46] = new Image();
            img[46].onload = function(){
              ctx.drawImage(img[46],move_x[6]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[46].src = url2+pngTile[46];

            img[47] = new Image();
            img[47].onload = function(){
              ctx.drawImage(img[47],move_x[6]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[47].src = url2+pngTile[47];

            img[48] = new Image();
            img[48].onload = function(){
              ctx.drawImage(img[48],move_x[6]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[48].src = url2+pngTile[48];

            img[7] = new Image();
            img[7].onload = function(){
              ctx.drawImage(img[7],move_x[1]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[7].src = url2+pngTile[7];

            img[14] = new Image();
            img[14].onload = function(){
              ctx.drawImage(img[14],move_x[2]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[14].src = url2+pngTile[14];

            img[21] = new Image();
            img[21].onload = function(){
              ctx.drawImage(img[21],move_x[3]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[21].src = url2+pngTile[21];
            img[28] = new Image();
            img[28].onload = function(){
              ctx.drawImage(img[28],move_x[4]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[28].src = url2+pngTile[28];

            img[35] = new Image();
            img[35].onload = function(){
              ctx.drawImage(img[35],move_x[5]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[35].src = url2+pngTile[35];

            img[13] = new Image();
            img[13].onload = function(){
              ctx.drawImage(img[13],move_x[1]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[13].src = url2+pngTile[13];

            img[20] = new Image();
            img[20].onload = function(){
              ctx.drawImage(img[20],move_x[2]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[20].src = url2+pngTile[20];

            img[27] = new Image();
            img[27].onload = function(){
              ctx.drawImage(img[27],move_x[3]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[27].src = url2+pngTile[27];
            img[34] = new Image();
            img[34].onload = function(){
              ctx.drawImage(img[34],move_x[4]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[34].src = url2+pngTile[34];

            img[41] = new Image();
            img[41].onload = function(){
              ctx.drawImage(img[41],move_x[5]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[41].src = url2+pngTile[41];     
        }
        if(selectImageFlag==1){
          //OSMTile

          //一环瓦片
            img[16] = new Image();
            img[16].onload = function(){
              ctx.drawImage(img[16],move_x[2]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[16].src = imageURL+OSMTile[16];

            img[17] = new Image();
            img[17].onload = function(){
              ctx.drawImage(img[17],move_x[2]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[17].src = imageURL+OSMTile[17];

            img[18] = new Image();
            img[18].onload = function(){
              ctx.drawImage(img[18],move_x[2]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[18].src = imageURL+OSMTile[18];

            img[23] = new Image();
            img[23].onload = function(){
              ctx.drawImage(img[23],move_x[3]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[23].src = imageURL+OSMTile[23];

            img[24] = new Image();
            img[24].onload = function(){
              ctx.drawImage(img[24],move_x[3]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[24].src = imageURL+OSMTile[24];

            img[25] = new Image();
            img[25].onload = function(){
              ctx.drawImage(img[25],move_x[3]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[25].src = imageURL+OSMTile[25];

            img[30] = new Image();
            img[30].onload = function(){
              ctx.drawImage(img[30],move_x[4]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[30].src = imageURL+OSMTile[30];

            img[31] = new Image();
            img[31].onload = function(){
              ctx.drawImage(img[31],move_x[4]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[31].src = imageURL+OSMTile[31];

            img[32] = new Image();
            img[32].onload = function(){
              ctx.drawImage(img[32],move_x[4]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[32].src = imageURL+OSMTile[32];
  //二环瓦片
            img[15] = new Image();
            img[15].onload = function(){
              ctx.drawImage(img[15],move_x[2]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[15].src = imageURL+OSMTile[15];

            img[22] = new Image();
            img[22].onload = function(){
              ctx.drawImage(img[22],move_x[3]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[22].src = imageURL+OSMTile[22];

            img[29] = new Image();
            img[29].onload = function(){
              ctx.drawImage(img[29],move_x[4]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[29].src = imageURL+OSMTile[29];



            img[19] = new Image();
            img[19].onload = function(){
              ctx.drawImage(img[19],move_x[2]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[19].src = imageURL+OSMTile[19];

            img[26] = new Image();
            img[26].onload = function(){
              ctx.drawImage(img[26],move_x[3]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[26].src = imageURL+OSMTile[26];

            img[33] = new Image();
            img[33].onload = function(){
              ctx.drawImage(img[33],move_x[4]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[33].src = imageURL+OSMTile[33];

            img[8] = new Image();
            img[8].onload = function(){
              ctx.drawImage(img[8],move_x[1]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[8].src = imageURL+OSMTile[8];

            img[9] = new Image();
            img[9].onload = function(){
              ctx.drawImage(img[9],move_x[1]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[9].src = imageURL+OSMTile[9];

            img[10] = new Image();
            img[10].onload = function(){
              ctx.drawImage(img[10],move_x[1]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[10].src = imageURL+OSMTile[10];
            img[11] = new Image();
            img[11].onload = function(){
              ctx.drawImage(img[11],move_x[1]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[11].src = imageURL+OSMTile[11];

            img[12] = new Image();
            img[12].onload = function(){
              ctx.drawImage(img[12],move_x[1]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[12].src = imageURL+OSMTile[12];



            img[36] = new Image();
            img[36].onload = function(){
              ctx.drawImage(img[36],move_x[5]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[36].src = imageURL+OSMTile[36];

            img[37] = new Image();
            img[37].onload = function(){
              ctx.drawImage(img[37],move_x[5]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[37].src = imageURL+OSMTile[37];

            img[38] = new Image();
            img[38].onload = function(){
              ctx.drawImage(img[38],move_x[5]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[38].src = imageURL+OSMTile[38];
            img[39] = new Image();
            img[39].onload = function(){
              ctx.drawImage(img[39],move_x[5]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[39].src = imageURL+OSMTile[39];

            img[40] = new Image();
            img[40].onload = function(){
              ctx.drawImage(img[40],move_x[5]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[40].src = imageURL+OSMTile[40];         
  //三环瓦片
            img[0] = new Image();
            img[0].onload = function(){
              ctx.drawImage(img[0],move_x[0]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[0].src = imageURL+OSMTile[0];

            img[1] = new Image();
            img[1].onload = function(){
              ctx.drawImage(img[1],move_x[0]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[1].src = imageURL+OSMTile[1];

            img[2] = new Image();
            img[2].onload = function(){
              ctx.drawImage(img[2],move_x[0]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[2].src = imageURL+OSMTile[2];

            img[3] = new Image();
            img[3].onload = function(){
              ctx.drawImage(img[3],move_x[0]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[3].src = imageURL+OSMTile[3];
            img[4] = new Image();
            img[4].onload = function(){
              ctx.drawImage(img[4],move_x[0]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[4].src = imageURL+OSMTile[4];

            img[5] = new Image();
            img[5].onload = function(){
              ctx.drawImage(img[5],move_x[0]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[5].src = imageURL+OSMTile[5];

            img[6] = new Image();
            img[6].onload = function(){
              ctx.drawImage(img[6],move_x[0]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[6].src = imageURL+OSMTile[6];

            img[42] = new Image();
            img[42].onload = function(){
              ctx.drawImage(img[42],move_x[6]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[42].src = imageURL+OSMTile[42];

            img[43] = new Image();
            img[43].onload = function(){
              ctx.drawImage(img[43],move_x[6]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[43].src = imageURL+OSMTile[43];

            img[44] = new Image();
            img[44].onload = function(){
              ctx.drawImage(img[44],move_x[6]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[44].src = imageURL+OSMTile[44];

            img[45] = new Image();
            img[45].onload = function(){
              ctx.drawImage(img[45],move_x[6]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[45].src = imageURL+OSMTile[45];
            img[46] = new Image();
            img[46].onload = function(){
              ctx.drawImage(img[46],move_x[6]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[46].src = imageURL+OSMTile[46];

            img[47] = new Image();
            img[47].onload = function(){
              ctx.drawImage(img[47],move_x[6]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[47].src = imageURL+OSMTile[47];

            img[48] = new Image();
            img[48].onload = function(){
              ctx.drawImage(img[48],move_x[6]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[48].src = imageURL+OSMTile[48];

            img[7] = new Image();
            img[7].onload = function(){
              ctx.drawImage(img[7],move_x[1]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[7].src = imageURL+OSMTile[7];

            img[14] = new Image();
            img[14].onload = function(){
              ctx.drawImage(img[14],move_x[2]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[14].src = imageURL+OSMTile[14];

            img[21] = new Image();
            img[21].onload = function(){
              ctx.drawImage(img[21],move_x[3]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[21].src = imageURL+OSMTile[21];
            img[28] = new Image();
            img[28].onload = function(){
              ctx.drawImage(img[28],move_x[4]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[28].src = imageURL+OSMTile[28];

            img[35] = new Image();
            img[35].onload = function(){
              ctx.drawImage(img[35],move_x[5]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[35].src = imageURL+OSMTile[35];

            img[13] = new Image();
            img[13].onload = function(){
              ctx.drawImage(img[13],move_x[1]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[13].src = imageURL+OSMTile[13];

            img[20] = new Image();
            img[20].onload = function(){
              ctx.drawImage(img[20],move_x[2]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[20].src = imageURL+OSMTile[20];

            img[27] = new Image();
            img[27].onload = function(){
              ctx.drawImage(img[27],move_x[3]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[27].src = imageURL+OSMTile[27];
            img[34] = new Image();
            img[34].onload = function(){
              ctx.drawImage(img[34],move_x[4]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[34].src = imageURL+OSMTile[34];

            img[41] = new Image();
            img[41].onload = function(){
              ctx.drawImage(img[41],move_x[5]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[41].src = imageURL+OSMTile[41];     
        }
        if(selectImageFlag==2){
          //TencentTile

          //一环瓦片
            img[16] = new Image();
            img[16].onload = function(){
              ctx.drawImage(img[16],move_x[2]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[16].src = imageURL+TencentTile[16];

            img[17] = new Image();
            img[17].onload = function(){
              ctx.drawImage(img[17],move_x[2]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[17].src = imageURL+TencentTile[17];

            img[18] = new Image();
            img[18].onload = function(){
              ctx.drawImage(img[18],move_x[2]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[18].src = imageURL+TencentTile[18];

            img[23] = new Image();
            img[23].onload = function(){
              ctx.drawImage(img[23],move_x[3]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[23].src = imageURL+TencentTile[23];

            img[24] = new Image();
            img[24].onload = function(){
              ctx.drawImage(img[24],move_x[3]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[24].src = imageURL+TencentTile[24];

            img[25] = new Image();
            img[25].onload = function(){
              ctx.drawImage(img[25],move_x[3]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[25].src = imageURL+TencentTile[25];

            img[30] = new Image();
            img[30].onload = function(){
              ctx.drawImage(img[30],move_x[4]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[30].src = imageURL+TencentTile[30];

            img[31] = new Image();
            img[31].onload = function(){
              ctx.drawImage(img[31],move_x[4]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[31].src = imageURL+TencentTile[31];

            img[32] = new Image();
            img[32].onload = function(){
              ctx.drawImage(img[32],move_x[4]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[32].src = imageURL+TencentTile[32];
  //二环瓦片
            img[15] = new Image();
            img[15].onload = function(){
              ctx.drawImage(img[15],move_x[2]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[15].src = imageURL+TencentTile[15];

            img[22] = new Image();
            img[22].onload = function(){
              ctx.drawImage(img[22],move_x[3]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[22].src = imageURL+TencentTile[22];

            img[29] = new Image();
            img[29].onload = function(){
              ctx.drawImage(img[29],move_x[4]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[29].src = imageURL+TencentTile[29];



            img[19] = new Image();
            img[19].onload = function(){
              ctx.drawImage(img[19],move_x[2]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[19].src = imageURL+TencentTile[19];

            img[26] = new Image();
            img[26].onload = function(){
              ctx.drawImage(img[26],move_x[3]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[26].src = imageURL+TencentTile[26];

            img[33] = new Image();
            img[33].onload = function(){
              ctx.drawImage(img[33],move_x[4]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[33].src = imageURL+TencentTile[33];

            img[8] = new Image();
            img[8].onload = function(){
              ctx.drawImage(img[8],move_x[1]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[8].src = imageURL+TencentTile[8];

            img[9] = new Image();
            img[9].onload = function(){
              ctx.drawImage(img[9],move_x[1]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[9].src = imageURL+TencentTile[9];

            img[10] = new Image();
            img[10].onload = function(){
              ctx.drawImage(img[10],move_x[1]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[10].src = imageURL+TencentTile[10];
            img[11] = new Image();
            img[11].onload = function(){
              ctx.drawImage(img[11],move_x[1]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[11].src = imageURL+TencentTile[11];

            img[12] = new Image();
            img[12].onload = function(){
              ctx.drawImage(img[12],move_x[1]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[12].src = imageURL+TencentTile[12];



            img[36] = new Image();
            img[36].onload = function(){
              ctx.drawImage(img[36],move_x[5]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[36].src = imageURL+TencentTile[36];

            img[37] = new Image();
            img[37].onload = function(){
              ctx.drawImage(img[37],move_x[5]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[37].src = imageURL+TencentTile[37];

            img[38] = new Image();
            img[38].onload = function(){
              ctx.drawImage(img[38],move_x[5]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[38].src = imageURL+TencentTile[38];
            img[39] = new Image();
            img[39].onload = function(){
              ctx.drawImage(img[39],move_x[5]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[39].src = imageURL+TencentTile[39];

            img[40] = new Image();
            img[40].onload = function(){
              ctx.drawImage(img[40],move_x[5]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[40].src = imageURL+TencentTile[40];         
  //三环瓦片
            img[0] = new Image();
            img[0].onload = function(){
              ctx.drawImage(img[0],move_x[0]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[0].src = imageURL+TencentTile[0];

            img[1] = new Image();
            img[1].onload = function(){
              ctx.drawImage(img[1],move_x[0]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[1].src = imageURL+TencentTile[1];

            img[2] = new Image();
            img[2].onload = function(){
              ctx.drawImage(img[2],move_x[0]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[2].src = imageURL+TencentTile[2];

            img[3] = new Image();
            img[3].onload = function(){
              ctx.drawImage(img[3],move_x[0]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[3].src = imageURL+TencentTile[3];
            img[4] = new Image();
            img[4].onload = function(){
              ctx.drawImage(img[4],move_x[0]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[4].src = imageURL+TencentTile[4];

            img[5] = new Image();
            img[5].onload = function(){
              ctx.drawImage(img[5],move_x[0]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[5].src = imageURL+TencentTile[5];

            img[6] = new Image();
            img[6].onload = function(){
              ctx.drawImage(img[6],move_x[0]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[6].src = imageURL+TencentTile[6];

            img[42] = new Image();
            img[42].onload = function(){
              ctx.drawImage(img[42],move_x[6]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[42].src = imageURL+TencentTile[42];

            img[43] = new Image();
            img[43].onload = function(){
              ctx.drawImage(img[43],move_x[6]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[43].src = imageURL+TencentTile[43];

            img[44] = new Image();
            img[44].onload = function(){
              ctx.drawImage(img[44],move_x[6]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[44].src = imageURL+TencentTile[44];

            img[45] = new Image();
            img[45].onload = function(){
              ctx.drawImage(img[45],move_x[6]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[45].src = imageURL+TencentTile[45];
            img[46] = new Image();
            img[46].onload = function(){
              ctx.drawImage(img[46],move_x[6]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[46].src = imageURL+TencentTile[46];

            img[47] = new Image();
            img[47].onload = function(){
              ctx.drawImage(img[47],move_x[6]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[47].src = imageURL+TencentTile[47];

            img[48] = new Image();
            img[48].onload = function(){
              ctx.drawImage(img[48],move_x[6]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[48].src = imageURL+TencentTile[48];

            img[7] = new Image();
            img[7].onload = function(){
              ctx.drawImage(img[7],move_x[1]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[7].src = imageURL+TencentTile[7];

            img[14] = new Image();
            img[14].onload = function(){
              ctx.drawImage(img[14],move_x[2]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[14].src = imageURL+TencentTile[14];

            img[21] = new Image();
            img[21].onload = function(){
              ctx.drawImage(img[21],move_x[3]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[21].src = imageURL+TencentTile[21];
            img[28] = new Image();
            img[28].onload = function(){
              ctx.drawImage(img[28],move_x[4]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[28].src = imageURL+TencentTile[28];

            img[35] = new Image();
            img[35].onload = function(){
              ctx.drawImage(img[35],move_x[5]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[35].src = imageURL+TencentTile[35];

            img[13] = new Image();
            img[13].onload = function(){
              ctx.drawImage(img[13],move_x[1]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[13].src = imageURL+TencentTile[13];

            img[20] = new Image();
            img[20].onload = function(){
              ctx.drawImage(img[20],move_x[2]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[20].src = imageURL+TencentTile[20];

            img[27] = new Image();
            img[27].onload = function(){
              ctx.drawImage(img[27],move_x[3]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[27].src = imageURL+TencentTile[27];
            img[34] = new Image();
            img[34].onload = function(){
              ctx.drawImage(img[34],move_x[4]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[34].src = imageURL+TencentTile[34];

            img[41] = new Image();
            img[41].onload = function(){
              ctx.drawImage(img[41],move_x[5]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[41].src = imageURL+TencentTile[41];     
        }

        if(selectImageFlag==3)
        {

          //一环瓦片
            img[16] = new Image();
            img[16].onload = function(){
              ctx.drawImage(img[16],move_x[2]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[16].src = imageURL+GTile[16];

            img[17] = new Image();
            img[17].onload = function(){
              ctx.drawImage(img[17],move_x[2]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[17].src = imageURL+GTile[17];

            img[18] = new Image();
            img[18].onload = function(){
              ctx.drawImage(img[18],move_x[2]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[18].src = imageURL+GTile[18];

            img[23] = new Image();
            img[23].onload = function(){
              ctx.drawImage(img[23],move_x[3]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[23].src = imageURL+GTile[23];

            img[24] = new Image();
            img[24].onload = function(){
              ctx.drawImage(img[24],move_x[3]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[24].src = imageURL+GTile[24];

            img[25] = new Image();
            img[25].onload = function(){
              ctx.drawImage(img[25],move_x[3]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[25].src = imageURL+GTile[25];

            img[30] = new Image();
            img[30].onload = function(){
              ctx.drawImage(img[30],move_x[4]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[30].src = imageURL+GTile[30];

            img[31] = new Image();
            img[31].onload = function(){
              ctx.drawImage(img[31],move_x[4]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[31].src = imageURL+GTile[31];

            img[32] = new Image();
            img[32].onload = function(){
              ctx.drawImage(img[32],move_x[4]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[32].src = imageURL+GTile[32];
  //二环瓦片
            img[15] = new Image();
            img[15].onload = function(){
              ctx.drawImage(img[15],move_x[2]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[15].src = imageURL+GTile[15];

            img[22] = new Image();
            img[22].onload = function(){
              ctx.drawImage(img[22],move_x[3]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[22].src = imageURL+GTile[22];

            img[29] = new Image();
            img[29].onload = function(){
              ctx.drawImage(img[29],move_x[4]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[29].src = imageURL+GTile[29];



            img[19] = new Image();
            img[19].onload = function(){
              ctx.drawImage(img[19],move_x[2]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[19].src = imageURL+GTile[19];

            img[26] = new Image();
            img[26].onload = function(){
              ctx.drawImage(img[26],move_x[3]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[26].src = imageURL+GTile[26];

            img[33] = new Image();
            img[33].onload = function(){
              ctx.drawImage(img[33],move_x[4]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[33].src = imageURL+GTile[33];

            img[8] = new Image();
            img[8].onload = function(){
              ctx.drawImage(img[8],move_x[1]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[8].src = imageURL+GTile[8];

            img[9] = new Image();
            img[9].onload = function(){
              ctx.drawImage(img[9],move_x[1]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[9].src = imageURL+GTile[9];

            img[10] = new Image();
            img[10].onload = function(){
              ctx.drawImage(img[10],move_x[1]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[10].src = imageURL+GTile[10];
            img[11] = new Image();
            img[11].onload = function(){
              ctx.drawImage(img[11],move_x[1]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[11].src = imageURL+GTile[11];

            img[12] = new Image();
            img[12].onload = function(){
              ctx.drawImage(img[12],move_x[1]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[12].src = imageURL+GTile[12];



            img[36] = new Image();
            img[36].onload = function(){
              ctx.drawImage(img[36],move_x[5]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[36].src = imageURL+GTile[36];

            img[37] = new Image();
            img[37].onload = function(){
              ctx.drawImage(img[37],move_x[5]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[37].src = imageURL+GTile[37];

            img[38] = new Image();
            img[38].onload = function(){
              ctx.drawImage(img[38],move_x[5]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[38].src = imageURL+GTile[38];
            img[39] = new Image();
            img[39].onload = function(){
              ctx.drawImage(img[39],move_x[5]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[39].src = imageURL+GTile[39];

            img[40] = new Image();
            img[40].onload = function(){
              ctx.drawImage(img[40],move_x[5]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[40].src = imageURL+GTile[40];         
  //三环瓦片
            img[0] = new Image();
            img[0].onload = function(){
              ctx.drawImage(img[0],move_x[0]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[0].src = imageURL+GTile[0];

            img[1] = new Image();
            img[1].onload = function(){
              ctx.drawImage(img[1],move_x[0]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[1].src = imageURL+GTile[1];

            img[2] = new Image();
            img[2].onload = function(){
              ctx.drawImage(img[2],move_x[0]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[2].src = imageURL+GTile[2];

            img[3] = new Image();
            img[3].onload = function(){
              ctx.drawImage(img[3],move_x[0]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[3].src = imageURL+GTile[3];
            img[4] = new Image();
            img[4].onload = function(){
              ctx.drawImage(img[4],move_x[0]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[4].src = imageURL+GTile[4];

            img[5] = new Image();
            img[5].onload = function(){
              ctx.drawImage(img[5],move_x[0]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[5].src = imageURL+GTile[5];

            img[6] = new Image();
            img[6].onload = function(){
              ctx.drawImage(img[6],move_x[0]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[6].src = imageURL+GTile[6];

            img[42] = new Image();
            img[42].onload = function(){
              ctx.drawImage(img[42],move_x[6]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[42].src = imageURL+GTile[42];

            img[43] = new Image();
            img[43].onload = function(){
              ctx.drawImage(img[43],move_x[6]+eventX,move_y[1]+eventY,_this.scale,_this.scale); 
            };
            img[43].src = imageURL+GTile[43];

            img[44] = new Image();
            img[44].onload = function(){
              ctx.drawImage(img[44],move_x[6]+eventX,move_y[2]+eventY,_this.scale,_this.scale); 
            };
            img[44].src = imageURL+GTile[44];

            img[45] = new Image();
            img[45].onload = function(){
              ctx.drawImage(img[45],move_x[6]+eventX,move_y[3]+eventY,_this.scale,_this.scale); 
            };
            img[45].src = imageURL+GTile[45];
            img[46] = new Image();
            img[46].onload = function(){
              ctx.drawImage(img[46],move_x[6]+eventX,move_y[4]+eventY,_this.scale,_this.scale); 
            };
            img[46].src = imageURL+GTile[46];

            img[47] = new Image();
            img[47].onload = function(){
              ctx.drawImage(img[47],move_x[6]+eventX,move_y[5]+eventY,_this.scale,_this.scale); 
            };
            img[47].src = imageURL+GTile[47];

            img[48] = new Image();
            img[48].onload = function(){
              ctx.drawImage(img[48],move_x[6]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[48].src = imageURL+GTile[48];

            img[7] = new Image();
            img[7].onload = function(){
              ctx.drawImage(img[7],move_x[1]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[7].src = imageURL+GTile[7];

            img[14] = new Image();
            img[14].onload = function(){
              ctx.drawImage(img[14],move_x[2]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[14].src = imageURL+GTile[14];

            img[21] = new Image();
            img[21].onload = function(){
              ctx.drawImage(img[21],move_x[3]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[21].src = imageURL+GTile[21];
            img[28] = new Image();
            img[28].onload = function(){
              ctx.drawImage(img[28],move_x[4]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[28].src = imageURL+GTile[28];

            img[35] = new Image();
            img[35].onload = function(){
              ctx.drawImage(img[35],move_x[5]+eventX,move_y[0]+eventY,_this.scale,_this.scale); 
            };
            img[35].src = imageURL+GTile[35];

            img[13] = new Image();
            img[13].onload = function(){
              ctx.drawImage(img[13],move_x[1]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[13].src = imageURL+GTile[13];

            img[20] = new Image();
            img[20].onload = function(){
              ctx.drawImage(img[20],move_x[2]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[20].src = imageURL+GTile[20];

            img[27] = new Image();
            img[27].onload = function(){
              ctx.drawImage(img[27],move_x[3]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[27].src = imageURL+GTile[27];
            img[34] = new Image();
            img[34].onload = function(){
              ctx.drawImage(img[34],move_x[4]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[34].src = imageURL+GTile[34];

            img[41] = new Image();
            img[41].onload = function(){
              ctx.drawImage(img[41],move_x[5]+eventX,move_y[6]+eventY,_this.scale,_this.scale); 
            };
            img[41].src = imageURL+GTile[41];               
        }


      }
      function preloadImage() {
        if (document.images) {
          var arr = new Array();
          var asgus = preloadImage.arguments;
          for (var i = 0; i < asgus.length; i++) {
            var image = new Image();
            image.src = asgus[i];
            arr[i] = image;
          }
          
          for(var i = 0,j = arr.length; i < j; i++){
            document.body.appendChild(arr[i]);
          }
        }
      }
      if(flag ==0) {
        if(roadCondition_flag==0) {
          imageMap();
        }
        if(roadCondition_flag==1) {
          var countTile=0;
          //var png=new Array(49);
          for (var i = 0; i < 7; i++) {
            for(var j = 0; j < 7; j++){
              Tilefunction0(countTile);
              if(selectImageFlag==0){
                preImage(url2+pngTile[countTile],function(){  
                      ctx.globalAlpha = 0.9; 
                      ctx.drawImage(this,move_x[i]+eventX,move_y[j]+eventY,_this.scale,_this.scale);  
                  });                 
              }
              if(selectImageFlag==1){
                preImage(imageURL+OSMTile[countTile],function(){  
                      ctx.globalAlpha = 0.9; 
                      ctx.drawImage(this,move_x[i]+eventX,move_y[j]+eventY,_this.scale,_this.scale);  
                  });                 
              }
              if(selectImageFlag==2){
                preImage(imageURL+TencentTile[countTile],function(){  
                      ctx.globalAlpha = 0.6; 
                      ctx.drawImage(this,move_x[i]+eventX,move_y[j]+eventY,_this.scale,_this.scale);  
                  });                 
              }
              if(selectImageFlag==3){
                preImage(imageURL+GTile[countTile],function(){  
                      ctx.globalAlpha = 0.6; 
                      ctx.drawImage(this,move_x[i]+eventX,move_y[j]+eventY,_this.scale,_this.scale);  
                  });                 
              }


              Tilefunction2(countTile++,zoom,x-3+i,y-3+j,move_x[i],move_y[j]);
            }       
          };    
          
        };
        
        //imageMap();
        
      }

      if(changeCenter==0&&flag ==1){ //混合地图
        var countTile=0;
        //imageMap();
        for (var i = 0; i < 7; i++) {
          for(var j = 0; j < 7; j++){
            Tilefunction1(countTile++,zoom,x-3+i,y-3+j,move_x[i],move_y[j]);
            
            //Tilefunction0(24,zoom,x,y,move_x[3],move_y[3]);
          }       
        };        
      }
      if(flag==1&&roadCondition_flag==1){ //混合地图
        var countTile=0;
        //imageMap();
        for (var i = 0; i < 7; i++) {
          for(var j = 0; j < 7; j++){
            Tilefunction2(countTile++,zoom,x-3+i,y-3+j,move_x[i],move_y[j]);
            
            //Tilefunction0(24,zoom,x,y,move_x[3],move_y[3]);
          }       
        };        
      }     

      //way_name=[];
      //num=0;


      //测试渲染时间
/*          var img16 = new Image();
          img16.src=url1+'i/'+pngTile[countTile-1]; 
          //img16.src=url2+pngTile[TileNum]+'.png'; 
          ctx.drawImage(img16,-_this.scale,0);
*/      //test end

    }//draw_Image

/*
Map主函数的原型方法-切片z/x/y转bbox（1,2,3,4）边框经纬度
参数：[zoom] [,x] [,y]zoom/x/y 切片块位置（命名：缩放等级/x/y）
*/
    Map.prototype.tile2bbox = function(zoom,x,y) {

    function tile2lon(zoom, x) {
      return (x / Math.pow(2, zoom) * 360 - 180);
    }

    function tile2lat(zoom, y) {
      var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
      return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
    }

    var bbox = new Array;
    bbox[0]= tile2lon(zoom, x);
    bbox[3]= tile2lat(zoom, y);
    bbox[2]= tile2lon(zoom, x+1);
    bbox[1]= tile2lat(zoom, y+1);

    } 