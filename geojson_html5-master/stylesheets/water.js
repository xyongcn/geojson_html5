/*
function waterCss(type,properties,zoom) {
	var style = new Array;
    if(type == 'waterway'){
        if (properties["waterway"] == 'river' && zoom >= 6) {
            
            style[0] = '#0088FF';//stroke-color
            //style[1] = '#0088FF';
            style[2] = 5;
            //style[3] = 7;
        }
    }
    if(type == 'water'){
        if ((properties["natural"] == 'lake' && zoom >= 6) || (properties["natural"] == 'water' && zoom >= 6) || (properties["waterway"] == 'riverbank' && zoom >= 6) || (properties["natural"] == 'bay' && zoom >= 6)) {
            style[0] = '#b5d0d0';
        }

        if(properties["water"] == 'lake' && zoom >=6){
            style[0] = '#b5d0d0';
        }        
    }


    return style;
}
*/

function waterCss(type,tags,zoom) {
    var style = new Array;
    

  var water_text = '#6699cc';
  var glacier = '#ddecec';
  var glacier_line = '#9cf';
  var water_color = '#b5d0d0';

  //style[0] line_color
  //style[1] polygon_fill
  //style[2] line_width
  //style[3] line_dasharray
  //style[4] polygon_gamma
  //style[5] line_cap
  //style[6] line_join
  //style[7] line_clip
  //style[8] line_opacity
  //style[9] flag_fill

  if(type == 'natural'){

  //#water_areas 
    if(tags['natural'] == 'glacier') {
      if(zoom >= 6) {
        style[2] = 0.75;
        style[0] = glacier_line;
        style[1] = glacier;
        if(zoom >= 8) {
          style[2] = 1.0;
        }
        if(zoom >= 10) {
          style[3] = 4,2;
          style[2] = 1.5;
        }
      }
    }

    if(tags['natural'] == 'water'){
      if(zoom >= 6) {
        style[1] = water_color;
      }
    }
  }

  if(type == 'waterway'){

    if(tags['waterway'] == 'dock' || tags['waterway'] == 'canal') {
      if(zoom >= 9){
        style[1] = water_color;
      }
    }

    if(tags['waterway'] == 'riverbank'){
      if(zoom >= 6) {
        style[1] = water_color;
      }
    }
  }

  if(type == 'landuse'){

    if(tags['landuse'] == 'basin' && zoom >= 7) {
      style[1] = water_color;
      /*
      if(way_pixels >= 4) {
        style[4] = 0.75;
      }
      if(way_pixels >= 64) {
        style[4] = 0.6;
      }
      */
    }

    if(tags['landuse'] == 'reservoir'){
      if(zoom >= 6) {
        style[1] = water_color;
      }
    }
  }


  // #water_lines_casing 
    if(tags['waterway'] == 'stream' || tags['waterway'] == 'ditch' || tags['waterway'] == 'drain') {
        if(zoom >= 13) {
          style[2] = 2.5;
          style[0] = 'white';
          if(tags['waterway'] == 'stream' && zoom >= 15) {
            style[2] = 3.5;
          }
          if(tags['intermittent'] == 'yes') {
            style[3] = 4,3;
            style[5] = 'butt';
            style[6] = 'round';
            style[7] = false;
          }
        }
    }

  //#water_lines_low_zoom 

    if(tags['waterway'] == 'river' && zoom >= 8 && zoom < 12) {
      if(tags['intermittent'] == 'yes') {
        style[3] = 8,4;
        style[5] = 'butt';
        style[6] = 'round';
        style[7] = false;
      }
      style[0] = water_color;
      style[2] = 0.7;
      if(zoom >= 9) { style[2] = 1.2; }
      if(zoom >= 10) { style[2] = 1.6; }
    }
    return style;
}

