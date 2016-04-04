function waysCss(type,tags,zoom) {
    var style = new Array;
           // style[0] = 'transparent';//stroke-color
           // style[1] = '#ddd';//fill-color
           // style[2] = 2;//stroke-width
           // style[3] = 0;//fill-width
           // style[4] = "round";//lineCap
           // style[5] = "round";//lineJoin  
           // style[6] = "text-size";
           // style[7] = "text-fill: black";  
           // style[8] = "text_halo_fill";     

    var motorway_fill = '#e892a2';  // Lch(70 // darken35 // darken10) // darken error 0.5
    var trunk_fill = '#f9b29c';  // Lch(79 // darken33 // darken42) // darken error 0.7
    var primary_fill = '#fcd6a4';  // Lch(88 // darken31 // darken74) // darken error 1.7
    var secondary_fill = '#f7fabf';  // Lch(97 // darken29 // darken106) // darken error 1.7
    var tertiary_fill = '#ffffff';
    var residential_fill = '#ffffff';
    var service_fill = residential_fill;
    var living_street_fill = '#ededed';
    var pedestrian_fill = '#dddde8';
    var raceway_fill = 'pink';
    var road_fill = '#ddd';
    var footway_fill = 'salmon';
    var steps_fill = footway_fill;
    var cycleway_fill = 'blue';
    var bridleway_fill = 'green';
    var track_fill = '#996600';
    var aeroway_fill = '#bbc';
    var runway_fill = aeroway_fill;
    var taxiway_fill = aeroway_fill;
    var helipad_fill = aeroway_fill;

    var motorway_low_zoom = '#e66e89';  // Lch(62 // darken50 // darken10) // darken error 0.7
    var trunk_low_zoom = '#fa9476';  // Lch(72 // darken50 // darken42) // darken error 0.8
    var primary_low_zoom = '#f8c171';  // Lch(82 // darken50 // darken74) // darken error 2.1
    var secondary_low_zoom = '#e6ef89';  // Lch(92 // darken50 // darken106) // darken error 2.2

    var default_casing = 'white';
    var motorway_casing = '#dc2a67';  // Lch(50 // darken70 // darken10) // darken error 1.1
    var trunk_casing = '#c84e2f';  // Lch(50 // darken65 // darken42) // darken error 0.7
    var primary_casing = '#a06b00';  // Lch(50 // darken60 // darken74) // darken error 1.6
    var secondary_casing = '#707d05';  // Lch(50 // darken55 // darken106) // darken error 1.9
    var tertiary_casing = '#8f8f8f';
    var residential_casing = '#bbb';

    var road_casing =residential_casing;
    var service_casing =residential_casing;
    var living_street_casing =residential_casing;
    var pedestrian_casing = '#999';
    var path_casing =default_casing;
    var footway_casing =default_casing;
    var steps_casing =default_casing;
    var cycleway_casing =default_casing;
    var bridleway_casing =default_casing;
    var track_casing =default_casing;

    var motorway_low_zoom_casing = '#c24e6b';  // Lch(50 // darken50 // darken10) // darken error 0.8
    var trunk_low_zoom_casing = '#cf6649';  // Lch(56 // darken55 // darken42) // darken error 0.9
    var primary_low_zoom_casing = '#c38a27';  // Lch(62 // darken60 // darken74) // darken error 2.1
    var secondary_low_zoom_casing = '#9eae23';  // Lch(68 // darken65 // darken106) // darken error 2.3

    var unimportant_road =residential_casing;

    var residential_construction = '#aaa';
    var service_construction = '#aaa';

    var destination_marking = '#c2e0ff';
    var private_marking = '#efa9a9';
    var private_marking_for_red = '#C26363';

    var tunnel_casing = 'grey';
    var bridge_casing = 'black';

    var motorway_tunnel_fill = motorway_fill;
    var trunk_tunnel_fill = trunk_fill;
    var primary_tunnel_fill = primary_fill;
    var secondary_tunnel_fill = secondary_fill;
    var tertiary_tunnel_fill = tertiary_fill;
    var residential_tunnel_fill = residential_fill;
    var living_street_tunnel_fill = living_street_fill;

    var motorway_width_z5 =               0.5;
    var trunk_width_z5 =                  0.4;

    var motorway_width_z7 =               0.8;
    var trunk_width_z7 =                  0.6;

    var motorway_width_z8 =               1;
    var trunk_width_z8 =                  1;
    var primary_width_z8 =                1;

    var motorway_width_z9 =               1.4;
    var trunk_width_z9 =                  1.4;
    var primary_width_z9 =                1.4;
    var secondary_width_z9 =              1;

    var motorway_width_z10 =              1.9;
    var trunk_width_z10 =                 1.9;
    var primary_width_z10 =               1.8;
    var secondary_width_z10 =             1;

    var motorway_width_z11 =              2.0;
    var trunk_width_z11 =                 1.9;
    var primary_width_z11 =               1.8;
    var secondary_width_z11 =             1;

    var motorway_width_z12 =              3.5;
    var motorway_link_width_z12 =         1.5;
    var trunk_width_z12 =                 3.5;
    var primary_width_z12 =               3.5;
    var secondary_width_z12 =             3.5;
    var tertiary_width_z12 =              2.5;

    var motorway_width_z13 =              6;
    var motorway_link_width_z13 =         4;
    var trunk_width_z13 =                 6;
    var primary_width_z13 =               5;
    var secondary_width_z13 =             5;
    var tertiary_width_z13 =              4;
    var residential_width_z13 =           2.5;
    var living_street_width_z13 =         2;
    var pedestrian_width_z13 =            2;
    var bridleway_width_z13 =             0.3;
    var footway_width_z13 =               0.7;
    var cycleway_width_z13 =              0.7;
    var path_width_z13 =                  0.2;
    var track_width_z13 =                 0.5;
    var track_grade1_width_z13 =          0.5;
    var track_grade2_width_z13 =          0.5;
    var steps_width_z13 =                 0.7;

    var secondary_width_z14 =             5;
    var tertiary_width_z14 =              5;
    var residential_width_z14 =           3;
    var living_street_width_z14 =         3;
    var pedestrian_width_z14 =            3;
    var road_width_z14 =                  2;
    var service_width_z14 =               2;

    var motorway_width_z15 =             10;
    var motorway_link_width_z15 =         7.8;
    var trunk_width_z15 =                10;
    var primary_width_z15 =              10;
    var secondary_width_z15 =             9;
    var tertiary_width_z15 =              9;
    var residential_width_z15 =           5;
    var living_street_width_z15 =         5;
    var pedestrian_width_z15 =            5;
    var bridleway_width_z15 =             1.2;
    var footway_width_z15 =               1;
    var cycleway_width_z15 =              0.9;
    var path_width_z15 =                  0.5;
    var track_width_z15 =                 1.5;
    var track_grade1_width_z15 =          0.75;
    var track_grade2_width_z15 =          0.75;
    var steps_width_z15 =                 3;

    var secondary_width_z16 =            10;
    var tertiary_width_z16 =             10;
    var residential_width_z16 =           6;
    var living_street_width_z16 =         6;
    var pedestrian_width_z16 =            6;
    var road_width_z16 =                  3.5;
    var service_width_z16 =               3.5;
    var minor_service_width_z16 =         2;
    var footway_width_z16 =               1.3;
    var cycleway_width_z16 =              0.9;

    var motorway_width_z17 =             18;
    var motorway_link_width_z17 =        12;
    var trunk_width_z17 =                18;
    var primary_width_z17 =              18;
    var secondary_width_z17 =            18;
    var tertiary_width_z17 =             18;
    var residential_width_z17 =          12;
    var living_street_width_z17 =        12;
    var pedestrian_width_z17 =           12;
    var road_width_z17 =                  7;
    var service_width_z17 =               7;
    var minor_service_width_z17 =         3.5;

    var motorway_width_z18 =             21;
    var motorway_link_width_z18 =        13;
    var trunk_width_z18 =                21;
    var primary_width_z18 =              21;
    var secondary_width_z18 =            21;
    var tertiary_width_z18 =             21;
    var residential_width_z18 =          13;
    var living_street_width_z18 =        13;
    var pedestrian_width_z18 =           13;
    var road_width_z18 =                  8.5;
    var service_width_z18 =               8.5;
    var minor_service_width_z18 =         4.75;

    var motorway_width_z19 =             27;
    var motorway_link_width_z19 =        16;
    var trunk_width_z19 =                27;
    var primary_width_z19 =              27;
    var secondary_width_z19 =            27;
    var tertiary_width_z19 =             27;
    var residential_width_z19 =          17;
    var living_street_width_z19 =        17;
    var pedestrian_width_z19 =           17;
    var road_width_z19 =                 11;
    var service_width_z19 =              11;
    var minor_service_width_z19 =         5.5;

    var footway_width_z18 =               1.3;
    var cycleway_width_z18 =              1;

    var footway_width_z19 =               1.6;
    var cycleway_width_z19 =              1.3;


    var major_casing_width_z11 =          0.3;

    var casing_width_z12 =                0.1;
    var secondary_casing_width_z12 =      0.3;
    var major_casing_width_z12 =          0.5;

    var casing_width_z13 =                0.5;
    var residential_casing_width_z13 =    0.5;
    var secondary_casing_width_z13 =      0.35;
    var major_casing_width_z13 =          0.5;

    var casing_width_z14 =                0.55;
    var secondary_casing_width_z14 =      0.35;
    var major_casing_width_z14 =          0.6;

    var casing_width_z15 =                0.6;
    var secondary_casing_width_z15 =      0.7;
    var major_casing_width_z15 =          0.7;

    var casing_width_z16 =                0.6;
    var secondary_casing_width_z16 =      0.7;
    var major_casing_width_z16 =          0.7;

    var casing_width_z17 =                0.8;
    var secondary_casing_width_z17 =      1;
    var major_casing_width_z17 =          1;

    var casing_width_z18 =                0.8;
    var secondary_casing_width_z18 =      1;
    var major_casing_width_z18 =          1;

    var casing_width_z19 =                0.8;
    var secondary_casing_width_z19 =      1;
    var major_casing_width_z19 =          1;

    var bridge_casing_width_z12 =         0.1;
    var major_bridge_casing_width_z12 =   0.5;
    var bridge_casing_width_z13 =         0.5;
    var major_bridge_casing_width_z13 =   0.5;
    var bridge_casing_width_z14 =         0.5;
    var major_bridge_casing_width_z14 =   0.6;
    var bridge_casing_width_z15 =         0.75;
    var major_bridge_casing_width_z15 =   0.75;
    var bridge_casing_width_z16 =         0.75;
    var major_bridge_casing_width_z16 =   0.75;
    var bridge_casing_width_z17 =         0.8;
    var major_bridge_casing_width_z17 =   1;
    var bridge_casing_width_z18 =         0.8;
    var major_bridge_casing_width_z18 =   1;
    var bridge_casing_width_z19 =         0.8;
    var major_bridge_casing_width_z19 =   1;

    var paths_background_width =          1;
    var paths_bridge_casing_width =       0.5;
    var paths_tunnel_casing_width =       1;

    var junction_text_color =             '#960000';
    var halo_color_for_minor_road = 'white';

    var motorway_oneway_arrow_color =     motorway_casing // darken 25%
    var trunk_oneway_arrow_color =        trunk_casing // darken 25%
    var primary_oneway_arrow_color =      primary_casing // darken 15%
    var secondary_oneway_arrow_color =    secondary_casing // darken 10%
    var tertiary_oneway_arrow_color =     tertiary_casing // darken 30%
    var residential_oneway_arrow_color =  residential_casing // darken 40%
    var living_street_oneway_arrow_color = residential_casing // darken 30%
    var pedestrian_oneway_arrow_color =   pedestrian_casing // darken 25%
    var raceway_oneway_arrow_color =      raceway_fill // darken 50%
    var footway_oneway_arrow_color =      footway_fill // darken 35%
    var steps_oneway_arrow_color =        steps_fill // darken 35%
    var cycleway_oneway_arrow_color =     cycleway_fill // darken 25%
    var track_oneway_arrow_color =        track_fill // darken 15%
    var bridleway_oneway_arrow_color =    track_fill // darken 10%

    var shield_size = 9;
    var shield_size_z16 = 10;
    var shield_size_z18 = 11;
    var shield_spacing = 760;
    var shield_min_distance = 40;
  //  var shield_font = book_fonts;
  //  var shield_clip = false;

    var shield_motorway_fill = '#620728';  // Lch(20 // darken40 // darken10) // darken error 0.5
    var shield_trunk_fill = '#5d1b0b';  // Lch(21 // darken40 // darken42) // darken error 0.5
    var shield_primary_fill = '#4c2e00';  // Lch(22 // darken40 // darken74) // darken error 2.9
    var shield_secondary_fill = '#323b00';  // Lch(23 // darken40 // darken106) // darken error 3.4
    var shield_tertiary_fill = '#3b3b3b';  // Lch(25 // darken0 // darken0) // darken error 0.1

if(type == 'highway'){
    if( zoom >=12) {
            style[0] = 'transparent';//stroke-color
            style[1] = '#ddd';//fill-color
            style[2] = 2;//stroke-width
            style[3] = 0;//fill-width
    }

    if(tags['highway'] == 'motorway' || tags['highway'] == 'motorway_link') {
      if(zoom >= 5) {
        style[0] = motorway_low_zoom;
        style[3] = motorway_width_z5;
      }
      if(zoom >= 7) { style[3] = motorway_width_z7; }
      if(zoom >= 8) { style[3] = motorway_width_z8; }
      if(zoom >= 9) { style[3] = motorway_width_z9; }
      if(zoom >= 10) { style[3] = motorway_width_z10; }
      if(zoom >= 11) { style[3] = motorway_width_z11; }
      if(zoom >= 12) {
        style[1] = motorway_fill;
        style[3] = motorway_width_z12 - 2 * major_casing_width_z12;
        if(zoom >= 13) { style[2] = motorway_width_z13 - 2 * major_casing_width_z13; }
        if(zoom >= 15) { style[2] = motorway_width_z15 - 2 * major_casing_width_z15; }
        if(zoom >= 17) { style[2] = motorway_width_z17 - 2 * major_casing_width_z17; }
        if(zoom >= 18) { style[2] = motorway_width_z18 - 2 * major_casing_width_z18; }
        if(zoom >= 19) { style[2] = motorway_width_z19 - 2 * major_casing_width_z19; }
        if(tags['highway'] == 'motorway_link') {
          style[3] = motorway_link_width_z12 - 2 * casing_width_z12;
          if(zoom >= 13) { style[2] = motorway_link_width_z13 - 2 * casing_width_z13; }
          if(zoom >= 15) { style[2] = motorway_link_width_z15 - 2 * casing_width_z15; }
          if(zoom >= 17) { style[2] = motorway_link_width_z17 - 2 * casing_width_z17; }
          if(zoom >= 18) { style[2] = motorway_link_width_z18 - 2 * casing_width_z18; }
          if(zoom >= 19) { style[2] = motorway_link_width_z19 - 2 * casing_width_z19; }
        }
        if(tags['tunnel']=='yes') {
          style[1] = motorway_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[3] = motorway_width_z12 - 2 * major_bridge_casing_width_z12;
          if(zoom >= 13) { style[2] = motorway_width_z13 - 2 * major_bridge_casing_width_z13; }
          if(zoom >= 15) { style[2] = motorway_width_z15 - 2 * major_bridge_casing_width_z15; }
          if(zoom >= 17) { style[2] = motorway_width_z17 - 2 * major_bridge_casing_width_z17; }
          if(zoom >= 18) { style[2] = motorway_width_z18 - 2 * major_bridge_casing_width_z18; }
          if(zoom >= 19) { style[2] = motorway_width_z19 - 2 * major_bridge_casing_width_z19; }
          if(tags['highway'] == 'motorway_link') {
            style[3] = motorway_link_width_z12 - 2 * bridge_casing_width_z12;
            if(zoom >= 13) { style[2] = motorway_link_width_z13 - 2 * bridge_casing_width_z13; }
            if(zoom >= 15) { style[2] = motorway_link_width_z15 - 2 * bridge_casing_width_z15; }
            if(zoom >= 17) { style[2] = motorway_link_width_z17 - 2 * bridge_casing_width_z17; }
            if(zoom >= 18) { style[2] = motorway_link_width_z18 - 2 * bridge_casing_width_z18; }
            if(zoom >= 19) { style[2] = motorway_link_width_z19 - 2 * bridge_casing_width_z19; }
          }
        }
        style[4] = "round";
        style[5] = "round";
      }
    }


    if(tags['highway'] == 'trunk') {
      if(zoom >= 5) {
        style[3] = trunk_width_z5;
        style[0] = trunk_low_zoom;
      }
      if(zoom >= 7) { style[3] = trunk_width_z7; }
      if(zoom >= 8) { style[3] = trunk_width_z8; }
      if(zoom >= 9) { style[3] = trunk_width_z9; }
      if(zoom >= 10) { style[3] = trunk_width_z10; }
      if(zoom >= 11) { style[3] = trunk_width_z11; }
      if(zoom >= 12) {
        style[1] = trunk_fill;
        style[2] = trunk_width_z12 - 2 * major_casing_width_z12;
        if(zoom >= 13) { style[2] = trunk_width_z13 - 2 * major_casing_width_z13; }
        if(zoom >= 15) { style[2] = trunk_width_z15 - 2 * major_casing_width_z15; }
        if(zoom >= 17) { style[2] = trunk_width_z17 - 2 * major_casing_width_z17; }
        if(zoom >= 18) { style[2] = trunk_width_z18 - 2 * major_casing_width_z18; }
        if(zoom >= 19) { style[2] = trunk_width_z19 - 2 * major_casing_width_z19; }
        if(tags['tunnel']=='yes') {
          style[1] = trunk_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[2] = trunk_width_z12 - 2 * major_bridge_casing_width_z12;
          if(zoom >= 13) { style[2] = trunk_width_z13 - 2 * major_bridge_casing_width_z13; }
          if(zoom >= 15) { style[2] = trunk_width_z15 - 2 * major_bridge_casing_width_z15; }
          if(zoom >= 17) { style[2] = trunk_width_z17 - 2 * major_bridge_casing_width_z17; }
          if(zoom >= 18) { style[2] = trunk_width_z18 - 2 * major_bridge_casing_width_z18; }
          if(zoom >= 19) { style[2] = trunk_width_z19 - 2 * major_bridge_casing_width_z19; }
        }
        style[4] = "round";
        style[5] = "round";
      }
    }

    if(tags['highway'] == 'primary') {
      if(zoom >= 8) {
        style[3] = primary_width_z8;
        style[0] = primary_low_zoom;
      }
      if(zoom >= 9) { style[3] = primary_width_z9; }
      if(zoom >= 10) { style[3] = primary_width_z10; }
      if(zoom >= 11) { style[3] = primary_width_z11; }
      if(zoom >= 12) {
        style[1] = primary_fill;
        style[2] = primary_width_z12 - 2 * major_casing_width_z12;
        if(zoom >= 13) { style[2] = primary_width_z13 - 2 * major_casing_width_z13; }
        if(zoom >= 15) { style[2] = primary_width_z15 - 2 * major_casing_width_z15; }
        if(zoom >= 17) { style[2] = primary_width_z17 - 2 * major_casing_width_z17; }
        if(zoom >= 18) { style[2] = primary_width_z18 - 2 * major_casing_width_z18; }
        if(zoom >= 19) { style[2] = primary_width_z19 - 2 * major_casing_width_z19; }
        if(tags['tunnel']=='yes') {
          style[1] = primary_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[2] = primary_width_z12 - 2 * major_bridge_casing_width_z12;
          if(zoom >= 13) { style[2] = primary_width_z13 - 2 * major_bridge_casing_width_z13; }
          if(zoom >= 15) { style[2] = primary_width_z15 - 2 * major_bridge_casing_width_z15; }
          if(zoom >= 17) { style[2] = primary_width_z17 - 2 * major_bridge_casing_width_z17; }
          if(zoom >= 18) { style[2] = primary_width_z18 - 2 * major_bridge_casing_width_z18; }
          if(zoom >= 19) { style[2] = primary_width_z19 - 2 * major_bridge_casing_width_z19; }
        }
        style[4] = "round";
        style[5] = "round";
      }
    }

    if(tags['highway'] == 'secondary') {
      if(zoom >= 9) {
        style[0] = unimportant_road;
        style[3] = secondary_width_z9;
      }
      if(zoom >=10) {
        style[0] = unimportant_road;
        style[3] = secondary_width_z10;
      }
      if(zoom >= 11) { style[3] = secondary_width_z11; }
      if(zoom >= 12) { 
        style[1] = secondary_fill;
        style[2] = secondary_width_z12 - 2 * secondary_casing_width_z12;
        style[4] = "round";
        style[5] = "round";
        if(zoom >= 13) {
          if(zoom >= 13) { style[2] = secondary_width_z13 - 2 * secondary_casing_width_z13; }
          if(zoom >= 14) { style[2] = secondary_width_z14 - 2 * secondary_casing_width_z14; }
          if(zoom >= 15) { style[2] = secondary_width_z15 - 2 * secondary_casing_width_z15; }
          if(zoom >= 16) { style[2] = secondary_width_z16 - 2 * secondary_casing_width_z16; }
          if(zoom >= 17) { style[2] = secondary_width_z17 - 2 * secondary_casing_width_z17; }
          if(zoom >= 18) { style[2] = secondary_width_z18 - 2 * secondary_casing_width_z18; }
          if(zoom >= 19) { style[2] = secondary_width_z19 - 2 * secondary_casing_width_z19; }
          if(tags['tunnel']=='yes') {
            style[1] = secondary_tunnel_fill;
          }
          if(tags['bridge']=='yes') {
            style[2] = secondary_width_z12 - 2 * bridge_casing_width_z12;
            if(zoom >= 13) { style[2] = secondary_width_z13 - 2 * major_bridge_casing_width_z13; }
            if(zoom >= 14) { style[2] = secondary_width_z14 - 2 * major_bridge_casing_width_z14; }
            if(zoom >= 15) { style[2] = secondary_width_z15 - 2 * major_bridge_casing_width_z15; }
            if(zoom >= 16) { style[2] = secondary_width_z16 - 2 * major_bridge_casing_width_z16; }
            if(zoom >= 17) { style[2] = secondary_width_z17 - 2 * major_bridge_casing_width_z17; }
            if(zoom >= 18) { style[2] = secondary_width_z18 - 2 * major_bridge_casing_width_z18; }
            if(zoom >= 19) { style[2] = secondary_width_z19 - 2 * major_bridge_casing_width_z19; }
          }
        }
      }
    }

    if(tags['highway'] == 'tertiary') {
      if(zoom >= 10) {
        style[0] = unimportant_road;
        style[3] = 0.55;
      }
      if(zoom >= 12) {
        style[1] = tertiary_fill;
        style[2] = tertiary_width_z12 - 2 * casing_width_z12;
        if(zoom >= 13) { style[2] = tertiary_width_z13 - 2 * casing_width_z13; }
        if(zoom >= 14) { style[2] = tertiary_width_z14 - 2 * casing_width_z14; }
        if(zoom >= 15) { style[2] = tertiary_width_z15 - 2 * casing_width_z15; }
        if(zoom >= 16) { style[2] = tertiary_width_z16 - 2 * casing_width_z16; }
        if(zoom >= 17) { style[2] = tertiary_width_z17 - 2 * casing_width_z17; }
        if(zoom >= 18) { style[2] = tertiary_width_z18 - 2 * casing_width_z18; }
        if(zoom >= 19) { style[2] = tertiary_width_z19 - 2 * casing_width_z19; }
        if(tags['tunnel']=='yes') {
          style[1] = tertiary_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[2] = tertiary_width_z12 - 2 * bridge_casing_width_z12;
          if(zoom >= 13) { style[2] = tertiary_width_z13 - 2 * bridge_casing_width_z13; }
          if(zoom >= 14) { style[2] = tertiary_width_z14 - 2 * bridge_casing_width_z14; }
          if(zoom >= 15) { style[2] = tertiary_width_z15 - 2 * bridge_casing_width_z15; }
          if(zoom >= 16) { style[2] = tertiary_width_z16 - 2 * bridge_casing_width_z16; }
          if(zoom >= 17) { style[2] = tertiary_width_z17 - 2 * bridge_casing_width_z17; }
          if(zoom >= 18) { style[2] = tertiary_width_z18 - 2 * bridge_casing_width_z18; }
          if(zoom >= 19) { style[2] = tertiary_width_z19 - 2 * bridge_casing_width_z19; }
        }
        style[4] = "round";
        style[5] = "round";
      }
    }

    if(tags['highway'] == 'residential' || tags['highway'] == 'unclassified') {
      if(zoom = 12)if(tags['highway'] == 'residential') {
        style[0] = unimportant_road;
        style[3] = 0.4;
      }
      if(zoom = 12)if(tags['highway'] == 'unclassified') {
        style[0] = unimportant_road;
        style[3] = 1;
      }
      if(zoom >= 13) {
        style[2] = residential_width_z13 - 2 * residential_casing_width_z13;
        if(zoom >= 14) { style[2] = residential_width_z14 - 2 * casing_width_z14; }
        if(zoom >= 15) { style[2] = residential_width_z15 - 2 * casing_width_z15; }
        if(zoom >= 16) { style[2] = residential_width_z16 - 2 * casing_width_z16; }
        if(zoom >= 17) { style[2] = residential_width_z17 - 2 * casing_width_z17; }
        if(zoom >= 18) { style[2] = residential_width_z18 - 2 * casing_width_z18; }
        if(zoom >= 19) { style[2] = residential_width_z19 - 2 * casing_width_z19; }
        if(tags['bridge']=='yes') {
          style[1] = residential_fill;
        }
        if(tags['tunnel']=='yes') {
          style[1] = residential_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[2] = residential_width_z13 - 2 * bridge_casing_width_z13;
          if(zoom >= 14) { style[2] = residential_width_z14 - 2 * bridge_casing_width_z14; }
          if(zoom >= 15) { style[2] = residential_width_z15 - 2 * bridge_casing_width_z15; }
          if(zoom >= 16) { style[2] = residential_width_z16 - 2 * bridge_casing_width_z16; }
          if(zoom >= 17) { style[2] = residential_width_z17 - 2 * bridge_casing_width_z17; }
          if(zoom >= 18) { style[2] = residential_width_z18 - 2 * bridge_casing_width_z18; }
          if(zoom >= 19) { style[2] = residential_width_z19 - 2 * bridge_casing_width_z19; }
        }
        style[4] = "round";
        style[5] = "round";
      }
    }

    if(tags['highway'] == 'living_street') {
      if(zoom >= 13) {
        style[3] = living_street_width_z13 - 2 * casing_width_z13;
        if(zoom >= 14) { style[3] = living_street_width_z14 - 2 * casing_width_z14; }
        if(zoom >= 15) { style[3] = living_street_width_z15 - 2 * casing_width_z15; }
        if(zoom >= 16) { style[3] = living_street_width_z16 - 2 * casing_width_z16; }
        if(zoom >= 17) { style[3] = living_street_width_z17 - 2 * casing_width_z17; }
        if(zoom >= 18) { style[3] = living_street_width_z18 - 2 * casing_width_z18; }
        if(zoom >= 19) { style[3] = living_street_width_z19 - 2 * casing_width_z19; }
        if(tags['bridge']=='yes') {
          style[0] = living_street_fill;
        }
        if(tags['tunnel']=='yes') {
          style[0] = living_street_tunnel_fill;
        }
        if(tags['bridge']=='yes') {
          style[3] = living_street_width_z13 - 2 * casing_width_z13;
          if(zoom >= 14) { style[3] = living_street_width_z14 - 2 * bridge_casing_width_z14; }
          if(zoom >= 15) { style[3] = living_street_width_z15 - 2 * bridge_casing_width_z15; }
          if(zoom >= 16) { style[3] = living_street_width_z16 - 2 * bridge_casing_width_z16; }
          if(zoom >= 17) { style[3] = living_street_width_z17 - 2 * bridge_casing_width_z17; }
          if(zoom >= 18) { style[3] = living_street_width_z18 - 2 * bridge_casing_width_z18; }
          if(zoom >= 19) { style[3] = living_street_width_z19 - 2 * bridge_casing_width_z19; }
        }
        style[5] = "round";
        style[4] = "round";
      }
    }

    if(tags['highway'] == 'road') {
      if(zoom >= 10) {
        style[3] = 1;
        style[0] = unimportant_road;
        style[5] = "round";
        style[4] = "round";
      }
      if(zoom >= 14) {
        style[3] = road_width_z14 - 2 * casing_width_z14;
        if(zoom >= 16) { style[3] = road_width_z16 - 2 * casing_width_z16; }
        if(zoom >= 17) { style[3] = road_width_z17 - 2 * casing_width_z17; }
        if(zoom >= 18) { style[3] = road_width_z18 - 2 * casing_width_z18; }
        if(zoom >= 19) { style[3] = road_width_z19 - 2 * casing_width_z19; }
        
         // style[0] = road_fill;
        
        if(tags['bridge']=='yes') {
          style[3] = road_width_z14 - 2 * bridge_casing_width_z14;
          if(zoom >= 16) { style[3] = road_width_z16 - 2 * bridge_casing_width_z16; }
          if(zoom >= 17) { style[3] = road_width_z17 - 2 * bridge_casing_width_z17; }
          if(zoom >= 18) { style[3] = road_width_z18 - 2 * bridge_casing_width_z18; }
          if(zoom >= 19) { style[3] = road_width_z19 - 2 * bridge_casing_width_z19; }
          style[0] = road_fill;
        }
        if(tags['tunnel']=='yes') {
          style[0] = road_fill;
        }
      }
    }

    if(tags['highway'] == 'service') {
      if(zoom >= 13 && tags['service'] == 'INT_normal') {
        style[3] = 1;
        style[0] = unimportant_road;
      }
      if((zoom >= 14 && tags['service'] == 'INT_normal')||(zoom >= 16 && tags['service'] == 'INT_minor')) {
        style[0] = service_fill;
        if(tags['service'] == 'INT_normal') {
          style[3] = service_width_z14 - 2 * casing_width_z14;
          if(zoom >= 16) { style[3] = service_width_z16 - 2 * casing_width_z16; }
          if(zoom >= 17) { style[3] = service_width_z17 - 2 * casing_width_z17; }
          if(zoom >= 18) { style[3] = service_width_z18 - 2 * casing_width_z18; }
          if(zoom >= 19) { style[3] = service_width_z19 - 2 * casing_width_z19; }
        }
        if(tags['service'] == 'INT_minor') {
          style[3] = minor_service_width_z16 - 2 * casing_width_z16;
          if(zoom >= 17) { style[3] = minor_service_width_z17 - 2 * casing_width_z17; }
          if(zoom >= 18) { style[3] = minor_service_width_z18 - 2 * casing_width_z18; }
          if(zoom >= 19) { style[3] = minor_service_width_z19 - 2 * casing_width_z19; }
        }
        style[5] = "round";
        style[4] = "round";
        if(tags['tunnel']=='yes') {
          style[0] = 'white';
        }
        if(tags['bridge']=='yes') {
          if(tags['service'] == 'INT_normal') {
            style[3] = service_width_z14 - 2 * bridge_casing_width_z14;
            if(zoom >= 16) { style[3] = service_width_z16 - 2 * bridge_casing_width_z16; }
            if(zoom >= 17) { style[3] = service_width_z17 - 2 * bridge_casing_width_z17; }
            if(zoom >= 18) { style[3] = service_width_z18 - 2 * bridge_casing_width_z18; }
            if(zoom >= 19) { style[3] = service_width_z19 - 2 * bridge_casing_width_z19; }
          }
          if(tags['service'] == 'INT_minor') {
            style[3] = minor_service_width_z16 - 2 * bridge_casing_width_z16;
            if(zoom >= 17) { style[3] = minor_service_width_z17 - 2 * bridge_casing_width_z17; }
            if(zoom >= 18) { style[3] = minor_service_width_z18 - 2 * bridge_casing_width_z18; }
            if(zoom >= 19) { style[3] = minor_service_width_z19 - 2 * bridge_casing_width_z19; }
          }
        }
      }
    }

    if(tags['highway'] == 'pedestrian') {
      if(zoom >= 13) {
        style[3] = living_street_width_z13 - 2 * casing_width_z13;
        if(zoom >= 14) { style[3] = pedestrian_width_z14 - 2 * casing_width_z14; }
        if(zoom >= 15) { style[3] = pedestrian_width_z15 - 2 * casing_width_z15; }
        if(zoom >= 16) { style[3] = pedestrian_width_z16 - 2 * casing_width_z16; }
        if(zoom >= 17) { style[3] = pedestrian_width_z17 - 2 * casing_width_z17; }
        if(zoom >= 18) { style[3] = pedestrian_width_z18 - 2 * casing_width_z18; }
        if(zoom >= 19) { style[3] = pedestrian_width_z19 - 2 * casing_width_z19; }
        style[0] = pedestrian_fill;
        if(tags['bridge']=='yes') {
          style[3] = pedestrian_width_z13 - 2 * casing_width_z13;
          if(zoom >= 14) { style[3] = pedestrian_width_z14 - 2 * bridge_casing_width_z14; }
          if(zoom >= 15) { style[3] = pedestrian_width_z15 - 2 * bridge_casing_width_z15; }
          if(zoom >= 16) { style[3] = pedestrian_width_z16 - 2 * bridge_casing_width_z16; }
          if(zoom >= 17) { style[3] = pedestrian_width_z17 - 2 * bridge_casing_width_z17; }
          if(zoom >= 18) { style[3] = pedestrian_width_z18 - 2 * bridge_casing_width_z18; }
          if(zoom >= 19) { style[3] = pedestrian_width_z19 - 2 * bridge_casing_width_z19; }
        }
        style[5] = "round";
        style[4] = "round";
      }
    }

    if(tags['highway'] == 'raceway') {
      if(zoom >= 12) {
        style[0] = raceway_fill;
        style[3] = 1.2;
        style[5] = "round";
        style[4] = "round";
      }
      if(zoom >= 13) { style[3] = 2; }
      if(zoom >= 14) { style[3] = 3; }
      if(zoom >= 15) { style[3] = 6; }
      if(zoom >= 18) { style[3] = 8; }
      if(zoom >= 19) { style[3] = 12; }
      if(zoom >= 20) { style[3] = 24; }
    }
/*
    if(tags['highway'] == 'platform') {
      if(zoom >= 16) {
        style[5] = "round";
        style[3] = 6;
        style[0] = grey;
        style[4] = "round";
        b/style[3] = 4;
        b/style[0] = #bbbbbb;
        b/style[4] = "round";
        b/style[5] = "round";
      }
    }


    if(tags['highway'] == 'steps') {
      if(zoom >= 13) && tags[access] != 'no'){

      }
      if(zoom >= 15) {
        .roads_fillif(zoom >= 15) {
          background/style[0] = steps_casing;
          background/style[4] = "round";
          background/style[5] = "round";
          background/style[3] = steps_width_z15 + 2 * paths_background_width;
          background/line_opacity: 0.4;
        }
        line/style[0] = steps_fill;
        line/line_dasharray: 2,1;
        line/style[3] = steps_width_z13;
        if(zoom >= 15) { line/style[3] =  steps_width_z15; }
      }
    }

    if(tags['highway'] == 'bridleway'),
    if(tags['highway'] == 'path')if(horse = 'designated') {
      if(zoom >= 13)if(access != 'no'),
      if(zoom >= 15) {
        .roads_fillif(zoom >= 15) {
          background/style[0] = bridleway_casing;
          background/style[4] = "round";
          background/style[5] = "round";
          background/style[3] = bridleway_width_z15 + 2 * paths_background_width;
          background/line_opacity: 0.4;
        }
        line/style[0] = bridleway_fill;
        line/line_dasharray: 4,2;
        line/style[3] = bridleway_width_z13;
        if(zoom >= 15) { line/style[3] = bridleway_width_z15; }
        if(tags['tunnel']=='yes') {
          line/style[5] = "round";
          line/style[4] = "round";
        }
      }
    }

    if(tags['highway'] == 'footway'),
    if(tags['highway'] == 'path')if(bicycle != 'designated')if(horse != 'designated') {
      if(zoom >= 13)if(access != 'no'),
      if(zoom >= 15) {
        .roads_fillif(zoom >= 15) {
          background/style[0] = footway_casing;
          background/style[4] = "round";
          background/style[5] = "round";
          background/style[3] = footway_width_z15 + 2 * paths_background_width;
          background/line_opacity: 0.4;
          if(zoom >= 16) {
            background/style[3] = footway_width_z16 + 2 * paths_background_width;
          }
          if(zoom >= 18) {
            background/style[3] = footway_width_z18 + 2 * paths_background_width;
          }
          if(zoom >= 19) {
            background/style[3] = footway_width_z19 + 2 * paths_background_width;
          }
        }
        line/style[0] = footway_fill;
        line/line_dasharray: 1,3;
        line/style[5] = "round";
        line/style[4] = "round";
        line/style[3] = footway_width_z13;
        if(zoom >= 15)if(int_surface = 'paved') {
          line/line_dasharray: 2,3.5;
          line/style[3] = footway_width_z15;
          if(zoom >= 16) {
            line/line_dasharray: 3,3.5;
            line/style[3] = footway_width_z16;
          }
          if(zoom >= 17) {
            line/line_dasharray: 3,3;
          }
          if(zoom >= 18) {
            line/style[3] = footway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] = footway_width_z19;
          }
        }
        if(zoom >= 15)if(int_surface = null) {
          line/style[0] = footway_fill;
          line/line_dasharray: 1,3,2,4;
          line/style[5] = "round";
          line/style[4] = "round";
          line/style[3] = footway_width_z15;
          if(zoom >= 16) {
            line/line_dasharray: 1,4,2,3;
            line/style[3] = footway_width_z16;
          }
          if(zoom >= 18) {
            line/style[3] = footway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] = footway_width_z19;
          }
        }
        if(zoom >= 15)if(int_surface = 'unpaved') {
          line/style[0] = footway_fill;
          line/line_dasharray: 1,4;
          line/style[5] = "round";
          line/style[4] = "round";
          line/style[3] = footway_width_z15;
          if(zoom >= 16) {
            line/style[3] = footway_width_z16;
          }
          if(zoom >= 18) {
            line/style[3] = footway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] = footway_width_z19;
          }
        }
      }
    }

    if(tags['highway'] == 'cycleway'),
    if(tags['highway'] == 'path')if(bicycle = 'designated') {
      if(zoom >= 13)if(access != 'no'),
      if(zoom >= 15) {
        .roads_fillif(zoom >= 15) {
          background/style[0] = cycleway_casing;
          background/style[4] = "round";
          background/style[5] = "round";
          background/style[3] = cycleway_width_z15 + 2 * paths_background_width;
          background/line_opacity: 0.4;
          if(zoom >= 16) {
            background/style[3] = cycleway_width_z16 + 2 * paths_background_width;
          }
          if(zoom >= 18) {
            background/style[3] = cycleway_width_z18 + 2 * paths_background_width;
          }
          if(zoom >= 19) {
            background/style[3] = cycleway_width_z19 + 2 * paths_background_width;
          }
        }
        line/style[0] = cycleway_fill;
        line/line_dasharray: 1,3;
        line/style[5] = "round";
        line/style[4] = "round";
        line/style[3] = cycleway_width_z13;
        if(zoom >= 15)if(int_surface = 'paved') {
          line/line_dasharray: 2,3.5;
          line/style[3] = cycleway_width_z15;
          if(zoom >= 16) {
            line/line_dasharray: 3,3.5;
            line/style[3] = cycleway_width_z16;
          }
          if(zoom >= 17) {
            line/line_dasharray: 3,3;
          }
          if(zoom >= 18) {
            line/style[3] = cycleway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] = cycleway_width_z19;
          }
        }
        if(zoom >= 15)if(int_surface = null) {
          line/style[0] = cycleway_fill;
          line/line_dasharray: 1,3,2,4;
          line/style[5] = "round";
          line/style[4] = "round";
          line/style[3] = cycleway_width_z15;
          if(zoom >= 16) {
            line/line_dasharray: 1,4,2,3;
            line/style[3] = cycleway_width_z16;
          }
          if(zoom >= 18) {
            line/style[3] = cycleway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] = cycleway_width_z19;
          }
        }
        if(zoom >= 15)if(int_surface = 'unpaved') {
          line/style[0] = cycleway_fill;
          line/line_dasharray: 1,4;
          line/style[5] = "round";
          line/style[4] = "round";
          line/style[3] =  cycleway_width_z15;
          if(zoom >= 16) {
            line/style[3] =  cycleway_width_z16;
          }
          if(zoom >= 18) {
            line/style[3] = cycleway_width_z18;
          }
          if(zoom >= 19) {
            line/style[3] =  cycleway_width_z19;
          }
        }
      }
    }

    if(tags['highway'] == 'track') {
      if(zoom >= 13)if(access != 'no'),
      if(zoom >= 15) {
        
        .roads_fillif(zoom >= 15) {
          background/line_opacity: 0.4;
          background/style[0] = track_casing;
          background/style[5] = "round";
          background/style[4] = "round";
          background/style[3] = track_width_z15 + 2 * paths_background_width;
         
          if(tracktype = 'grade1') {
            background/style[3] = track_grade1_width_z15 + 2 * paths_background_width;
          }
          if(tracktype = 'grade2') {
            background/style[3] = track_grade2_width_z15 + 2 * paths_background_width;
          }
        }

        
        line/style[0] = track_fill;
        line/line_dasharray: 5,4,2,4;
        line/style[4] = "round";
        line/style[5] = "round";
        line/line_opacity: 0.8;
        line/line_clip:false;

        line/style[3] = track_width_z13;

        if(tracktype = 'grade1') {
          line/line_dasharray: 100,0;
        }
        if(tracktype = 'grade2') {
          line/line_dasharray: 8.8,3.2;
        }
        if(tracktype = 'grade3') {
          line/line_dasharray: 5.6,4.0;
        }
        if(tracktype = 'grade4') {
          line/line_dasharray: 3.2,4.8;
        }
        if(tracktype = 'grade5') {
          line/line_dasharray: 1.6,6.4;
        }

        if(zoom >= 15) {
          line/style[3] = track_width_z15;
          if(tracktype = 'grade1') {
            line/line_dasharray: 100,0;
          }
          if(tracktype = 'grade2') {
            line/line_dasharray: 11,4;
          }
          if(tracktype = 'grade3') {
            line/line_dasharray: 7,5;
          }
          if(tracktype = 'grade4') {
            line/line_dasharray: 4,6;
          }
          if(tracktype = 'grade5') {
            line/line_dasharray: 2,8;
          }
        }
      }
    }
*/  


  if(tags['highway'] == 'motorway' || tags['highway'] == 'trunk' || tags['highway'] == 'primary') {
    if(zoom >= 13) {
      style[6] = 8;
      style[7] = 'black';
      if(tags['tunnel'] =='no') {
        if(tags['highway'] == 'motorway') { style[8] = motorway_fill; }
        if(tags['highway'] == 'trunk') { style[8] = trunk_fill; }
        if(tags['highway'] == 'primary') { style[8] = primary_fill; }
      }
    }
    if(zoom >= 14) {
      style[6] = 9;
    }
    if(zoom >= 15) {
      style[6] = 10;
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
    if(zoom >= 19) {
      style[6] = 12;
    }
  }
  if(tags['highway'] == 'secondary') {
    if(zoom >= 13) {
      style[6] = 8;
      style[7] = 'black';
      style[8] = secondary_fill;
    }
    if(zoom >= 14) {
      style[6] = 9;
    }
    if(zoom >= 15) {
      style[6] = 10;
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
    if(zoom >= 19) {
      style[6] = 12;
    }
  }
  if(tags['highway'] == 'tertiary' || tags['highway'] == 'tertiary_link') {
    if(zoom >= 14) {
      style[6] = 9;
      style[7] = 'black';
      style[8] = tertiary_fill;
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
    if(zoom >= 19) {
      style[6] = 12;
    }
  }
  if(tags['highway'] == 'construction') {
  if(zoom >= 14) {
      style[6] = 9;
      style[7] = 'black';
      //style[8] = rgba(255,255,255,0.6);
      style[8] = '#FFFAFA';
      if(zoom >= 17) {
        style[6] = 11;
      }
      if(zoom >= 19) {
        style[6] = 12;
      }
    }
  }
  if(tags['highway'] == 'residential' || tags['highway'] == 'unclassified' || tags['highway'] == 'road') {
    if(zoom >= 15) {
      style[6] = 8;
      style[7] = 'black';
      style[8] = residential_fill;
    }
    if(zoom >= 16) {
      style[6] = 9;
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
    if(zoom >= 19) {
      style[6] = 12;
    }
  }

  if(tags['highway'] == 'raceway' || tags['highway'] == 'service') {
    if(zoom >= 16) {
      style[6] = 9;
      style[7] = 'black';
      if(tags['highway'] == 'raceway') { style[8] = raceway_fill; }
      if(tags['highway'] == 'service') { style[8] = service_fill; }
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
  }

  if(tags['highway'] == 'living_street' || tags['highway'] == 'pedestrian') {
    if(zoom >= 15) {
      style[6] = 8;
      style[7] = 'black';
      if(tags['highway'] == 'living_street') { style[8] = living_street_fill; }
      if(tags['highway'] == 'pedestrian') { style[8] = pedestrian_fill; }
    }
    if(zoom >= 16) {
      style[6] = 9;
    }
    if(zoom >= 17) {
      style[6] = 11;
    }
    if(zoom >= 19) {
      style[6] = 12;
    }
  }
}
if(type == 'railway'){
           // style[0] = 'transparent';//stroke_color
           // style[1] = '#ddd';//fill_color
           // style[2] = 2;//stroke_width
           // style[3] = 0;//fill_width
    
    if(( tags['railway'] == 'tram') || ( tags['railway'] == 'tram_service' && zoom >= 15)){

        if(zoom >= 13) {
          style[2] = 4;
          if(zoom >= 15) {
            style[2] = 5;
          }
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if( tags['railway'] == 'subway') {

        if(zoom >= 14) {
          style[2] = 5.5;
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if(( tags['railway'] == 'light_rail') || ( tags['railway'] == 'funicular') || ( tags['railway'] == 'narrow_gauge')) {

        if(zoom >= 14) {
          style[2] = 5.5;
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if(( tags['railway'] == 'rail') || ( tags['railway'] == 'preserved') || ( tags['railway'] == 'monorail' && zoom >= 14)) {

        if(zoom >= 13) {
          style[2] = 6.5;
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if( tags['railway'] == 'INT_spur_siding_yard') {

        if(zoom >= 13) {
          style[2] = 5.7;
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if( (tags['railway'] == 'disused' && zoom >= 15) || ( tags['railway'] == 'construction') || ( tags['railway'] == 'miniature' && zoom >= 15) || ( tags['railway'] == 'INT_preserved_ssy' && zoom >= 14)) {

        if(zoom >= 13) {
          style[2] = 6;
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }
} 

if(type == 'aeroway'){
    
    if(tags['aeroway'] == 'runway') {
        if(zoom >= 14) {
         style[2] = 13;
          if(zoom >= 15) {style[2] = 19; }
          if(zoom >= 16) {style[2] = 25; }
          style[0] = bridge_casing;
          style[4] = 'round';
        }
    }

    if(tags['aeroway'] == 'taxiway') {
        if(zoom >= 14) {
         style[2] = 5;
          style[0] = bridge_casing;
          style[4] = 'round';
          if(zoom >= 15) {style[2] = 7; }
        }
    }
}   
    return style;
}