function waterlineCss(type,tags,zoom) {
//water_lines 
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

    if(type == 'waterway'){

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

      if((tags['waterway'] == 'canal' && zoom >= 12) || (tags['waterway'] == 'river' && zoom >= 12) || (tags['waterway'] == 'wadi' && zoom >= 13)) {
        if(tags['bridge'] == 'yes') {
          if(zoom >= 14) {
            style[0] = 'black';
            style[6] = 'round';
            style[2] = 6;
            if(zoom >= 15) { style[2] = 7; }
            if(zoom >= 17) { style[2] = 11; }
            if(zoom >= 18) { style[2] = 13; }
          }
        }
        if(tags['intermittent'] == 'yes' || tags['waterway'] == 'wadi') {
          if(tags['bridge'] == 'yes' && zoom >= 14) {
            style[0] = 'white';
            style[6] = 'round';
            style[2] = 4;
            if(zoom >= 15) { style[2] = 5; }
            if(zoom >= 17) { style[2] = 9; }
            if(zoom >= 18) { style[2] = 11; }
          }
          style[3] = 4,3;
          style[5] = 'butt';
          style[6] = 'round';
          style[7] = false;
        }
        
        style[0] = water_color;
        style[2] = 2;
        if(zoom >= 13) { style[2] = 3; }
        if(zoom >= 14) { style[2] = 5; }
        if(zoom >= 15) { style[2] = 6; }
        if(zoom >= 17) { style[2] = 10; }
        if(zoom >= 18) { style[2] = 12; }
        style[5] = 'round';
        style[6] = 'round';
        if(tags['tunnel'] == 'yes') {
          style[3] = 4,2;
          style[5] = 'butt';
          style[6] = 'miter';
          style[0] = '#f3f7f7';
          style[2] = 1;
          if(zoom >= 14) { style[2] = 2; }
          if(zoom >= 15) { style[2] = 3; }
          if(zoom >= 17) { style[2] = 7; }
          if(zoom >= 18) { style[2] = 8; }
        }
      }

      if((tags['waterway'] == 'stream') || (tags['waterway'] == 'ditch') || (tags['waterway'] == 'drain')) {
        if(zoom >= 13) {
          if(tags['bridge'] == 'yes') {
            if(zoom >= 14) {
              style[0] = 'black';
              style[6] = 'round';
              style[2] = 4;
              if(tags['waterway'] == 'stream' && zoom >= 15) { style[2] = 4; }
              if(tags['waterway'] == 'stream' && zoom >= 15) { style[2] = 3; }
            }
          }
          if(tags['intermittent'] == 'yes') {
            style[3] = 4 || 3;
            style[5] = 'butt';
            style[6] = 'round';
            style[7] = false;
          }
          style[2] = 2;
          style[0] = water_color;
          if(tags['waterway'] == 'stream' && zoom >= 15) {
            style[2] = 3;
          }
          if(tags['tunnel'] == 'yes' && zoom >= 15) {
            style[2] = 3.5;
            if(tags['waterway'] == 'stream') { style[2] = 4.5; }
            style[3] = 4,2;
            style[2] = 1;
            if(tags['waterway'] == 'stream') { style[2] = 2; }
            style[0] = '#f3f7f7';
          }
        }
      }

      if(tags['waterway'] == 'derelict_canal' && zoom >= 12) {
        style[2] = 1.5;
        style[0] = '#b5e4d0';
        style[3] = 4,4;
        style[8] = 0.5;
        style[6] = 'round';
        style[5] = 'round';
        if(zoom >= 13) {
          style[2] = 2.5;
          style[3] = 4,6;
        }
        if(zoom >= 14) {
          style[2] = 4.5;
          style[3] = 4,8;
        }
      }
    }
      return style;
}

/*
#water_lines_text {
  if(lock != 'yes') {
    if(tags['waterway'] == 'river' && zoom >= 13) {
      text_name: "if(name)";
      text_face_name: oblique_fonts;
      text_placement: line;
      text_fill: water_text;
      text_spacing: 400;
      text_size: 10;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      if(zoom >= 14) { text_size: 12; }
      if(tags['tunnel'] == 'yes') { text_min_distance: 200; }
    }

    if(tags['waterway'] == 'canal' && zoom >= 13 && zoom < 14) {
      text_name: "if(name)";
      text_face_name: oblique_fonts;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      text_size: 10;
      text_placement: line;
      text_fill: water_text;
    }

    if(tags['waterway'] == 'stream' && zoom >= 15) {
      text_name: "if(name)";
      text_size: 10;
      text_face_name: oblique_fonts;
      text_fill: water_text;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      text_spacing: 600;
      text_placement: line;
      text_vertical_alignment: middle;
      text_dy: 8;
    }

    if(tags['waterway'] == 'drain') || 
    if(tags['waterway'] == 'ditch') {
      if(zoom >= 15) {
        text_name: "if(name)";
        text_face_name: oblique_fonts;
        text_size: 10;
        text_fill: water_text;
        text_spacing: 600;
        text_placement: line;
        text_halo_radius: 1;
        text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      }
    }

    if(tags['waterway'] == 'canal' && zoom >= 14) {
      text_name: "if(name)";
      text_size: 10;
      text_fill: water_text;
      text_placement: line;
      text_face_name: oblique_fonts;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
    }

    if(tags['waterway'] == 'derelict_canal' && zoom >= 13) {
      text_name: "if(name)";
      text_size: 10;
      text_fill: #80d1ae;
      text_face_name: oblique_fonts;
      text_placement: line;
      text_spacing: 600;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      if(zoom >= 14) {
        text_size: 12;
      }
    }
  }
}

.textif(zoom >= 10) {
  if(feature = 'natural_water') || 
  if(feature = 'landuse_reservoir') || 
  if(feature = 'landuse_basin') {
    if(zoom >= 10 && way_pixels > 3000) || 
    if(zoom >= 17) {
      text_name: "if(name)";
      text_size: 12;
      text_fill: water_text;
      text_face_name: oblique_fonts;
      text_halo_radius: 1;
      text_halo_fill: rgba(255 || 255 || 255 || 0.6);
      text_wrap_width: standard_wrap_width;
      text_placement: interior;
    }
  }
}
*/