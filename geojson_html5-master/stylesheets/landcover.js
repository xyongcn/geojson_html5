function landcoverCss(type,tags,zoom) {
// ___ Parks, woods, other green things ___	
var grass = '#cdebb0'; // also meadow, common, garden, village_green
var golf_course = '#b5e3b5';
var scrub = '#b5e3b5';
var forest = '#add19e';       // Lch(80,30,135)
var forest_text = '#46673b';  // Lch(40,30,135)
var park = '#c8facc';         // Lch(94,30,145) also recreation_ground
var orchard = '#aedfa3';

// ___ sports ___

var stadium = '#3c9'; // also sports_centre
var track = '#74dcba';
var pitch = '#8ad3af';

// ___ "base" landuses ___

var residential = '#e0dfdf';      // Lch(89,0,0)
var residential_line = '#B9B9B9'; // Lch(75,0,0)
var retail = '#FFD6D1';           // Lch(89,16,30)
var retail_line = '#D99C95';      // Lch(70,25,30)
var commercial = '#F2DAD9';       // Lch(89,8.5,25)
var commercial_line = '#D1B2B0';  // Lch(75,12,25)
var industrial = '#EBDBE8';       // Lch(89,9,330)
var industrial_line = '#C6B3C3';  // Lch(75,11,330)
var railway = industrial;
var railway_line = industrial_line;
var farmland = '#fbecd7';         // Lch(94,12,80) (Also used for farm)
var farmland_line = '#d6c4ab';    // Lch(80,15,80)

var farmyard = '#EFD6B5';         // Lch(87,20,80)
var farmyard_line = '#D1B48C';    // Lch(75,25,80)

// ___ Other ____

var aerodrome = '#e9e7e2';
var allotments = '#e5c7ab';
var apron = '#e9d1ff';
var bare_ground = '#eee5dc';
var campsite = '#def6c0'; // also caravan_site, picnic_site
var cemetery = '#aacbaf'; // also grave_yard
var construction = '#b6b592';
var danger_area = 'pink';
var garages = '#dfddce';
var heath = '#d6d99f';
//var mud = rgba(203,177,154,0.3)'; // produces '#e6dcd1 over var land
var parking = '#f7efb7';
var place_of_worship = '#cdccc9';
var place_of_worship_outline = '#111';
var playground = '#ccfff1';
var power = industrial;
var power_line = industrial_line;
var rest_area = '#efc8c8'; // also services
var sand = '#f5e9c6';
var educational_areas_and_hospital = '#f0f0d8';
var station = '#d4aaaa';
var tourism = '#734a08';
var quarry = '#c5c3c3';
var military = '#f55';
var beach = '#fff1ba';
var water_color ='#b5d0d0';


var style = new Array;

	//style[0] = playground;//stroke_color
    //style[1] = playground;//fill_color
	//style[2] = 0.3;//stroke_width
	//type_11 :  'leisure' 'wetland' 'tourism' 'landuse' 'amenity' 'military' 'natural' 'power' 'aeroway'=='apron'||'aerodrome' 'highway'=='services'||'rest_area' 'railway'=='station'

	if(type == 'leisure'){
		if ((tags[type] == 'park') && zoom >= 13) {
			style[0] = park;
			style[1] = park;
			style[2] = 0.3;
		}
		if(tags[type] == 'swimming_pool' && zoom >= 14) {
			style[1] = water_color;
			style[0] = water_color;
			style[2] = 0.5;
		}

		if(tags[type] == 'playground' && zoom >= 13) {
			style[1] = playground;
			style[0] = playground;
			style[2] = 0.3;
		}

		if(tags[type] == 'park' || tags[type] == 'recreation_ground') {
			if(zoom >= 10) {
				style[1] = park;
			}
		}

		if((tags[type] == 'golf_course' && zoom >= 10) || (tags[type] == 'miniature_golf' && zoom >= 15)) {
			style[1] = golf_course;
		}

		if(tags[type] == 'sports_centre' || tags[type] == 'stadium') {
			if(zoom >= 10) {
				style[1] = stadium;
			}
		}

		if(tags[type] == 'track' && zoom >= 10) {
			style[1] = track;
			if(zoom >= 15) {
				style[2] = 0.5;
				style[0] = track;
			}
		}

		if(tags[type] == 'pitch' && zoom >= 10) {
			style[1] = pitch;
			if(zoom >= 15) {
				style[2] = 0.5;
				style[0] = pitch;
			}
		}
	}

	if(type == 'wetland'){
		if(tags[type] == 'mud' || tags[type] == 'tidalflat') {
			if(zoom >= 9) {
				style[1] = mud;
			}
		}

		if(tags[type] == 'swamp' && zoom >= 8) {
			style[1] = forest;
		}

		if(tags[type] == 'bog' || tags[type] == 'string_bog') {
			if(zoom >= 10) {
				style[1] = heath;
			}
		}

		if(tags[type] == 'wet_meadow' || tags[type] == 'marsh') {
			if(zoom >= 10) {
				style[1] = grass;
			}
		}

	}

	if(type == 'tourism'){
		if(tags[type] == 'camp_site' || tags[type] == 'caravan_site' || tags[type] == 'picnic_site') {
			if(zoom >= 10) {
				style[1] = campsite;
				style[0] = campsite;
				style[2] = 0.3;
			}
		}
		if(tags[type] == 'camp_site' || tags[type] == 'caravan_site' || tags[type] == 'picnic_site') {
			if(zoom >= 10) {
				style[1] = campsite;
				style[0] = campsite;
				style[2] = 0.3;
			}
		}
	}

	if(type == 'landuse'){ 

		if(tags[type] == 'allotments') {
			if(zoom >= 10 && zoom < 14) {
				style[1] = allotments;
			}
			if(zoom >= 14) {
				  //polygon_pattern_file: url('symbols/allotments.png');
				  //polygon_pattern_alignment: global;
				  style[1] = allotments;
				}
			}

			if(tags[type] == 'forest') {
				if(zoom >= 8) {
					style[1] = forest;
				}
			}

			if(tags[type] == 'farmyard' && zoom >= 10) {
				style[1] = farmyard;
				if(zoom >= 16) {
					style[2] = 0.5;
					style[0] = farmyard_line;
				}
			}

			if(tags[type] == 'farm' || tags[type] == 'farmland' || tags[type] == 'greenhouse_horticulture') {
				if(zoom >= 10) {
					style[1] = farmland;
					if(zoom >= 16) {
						style[2] = .5;
						style[0] = farmland_line;
					}
				}
			}

			if(tags[type] == 'meadow' || tags[type] == 'grassland' || tags[type] == 'grass' || tags[type] == 'recreation_ground' || tags[type] == 'village_green' || tags[type] == 'common' || tags[type] == 'garden') {
				if(zoom >= 10) {
					style[1] = grass;
				}
			}

			if(tags[type] == 'retail' && zoom >= 10) {
				style[1] = retail;
				if(zoom >= 16) {
					style[2] = 0.5;
					style[0] = retail_line;
				}
			}

			if(tags[type] == 'industrial' && zoom >= 10) {
				style[1] = industrial;
				if(zoom >= 16) {
					style[2] = .5;
					style[0] = industrial_line;
				}
			}

			if(tags[type] == 'railway' && zoom >= 10) {
				style[1] = railway;
				if(zoom >= 16) {
					style[2] = 0.7;
					style[0] = railway_line;
				}
			}


			if(tags[type] == 'commercial' && zoom >= 10) {
				style[1] = commercial;
				if(zoom >= 16) {
					style[2] = 0.5;
					style[0] = commercial_line;
				}
			}

			if(tags[type] == 'brownfield' || tags[type] == 'landfill' || tags[type] == 'construction') {
				if(zoom >= 10) {
					style[1] = construction;
				}
			}

			if(tags[type] == 'quarry' && zoom >= 10) {
				style[1] = quarry;
				//polygon_pattern_file: url('symbols/quarry.png');
				style[2] = 0.5;
				style[0] = 'grey';
			}

		if(tags[type] == 'vineyard') {
			if(zoom >= 10) {
				style[1] = orchard;
			}
			if(zoom >= 14) {
			  //polygon_pattern_file: url('symbols/vineyard.png');
			  //polygon_pattern_alignment: global;
			}
		}

		if(tags[type] == 'orchard') {
			if(zoom >= 10) {
				style[1] = orchard;
			}
			if(zoom >= 14) {
			  //polygon_pattern_file: url('symbols/orchard.png');
			  //polygon_pattern_alignment: global;
			}
		}

		if(tags[type] == 'cemetery'){
			if(zoom >= 10) {
				style[1] = cemetery;
			}
		}

		if(tags[type] == 'residential' && zoom >= 10) {
			style[1] = residential;
			if(zoom >= 16) {
				style[2] = .5;
				style[0] = residential_line;
			}
		}

		if(tags[type] == 'garages' && zoom >= 13) {
			style[1] = garages;
		}

	}

	if(type == 'amenity'){  
		if(tags[type] == 'grave_yard') {
			if(zoom >= 10) {
				style[1] = cemetery;
			}
		}

		if(tags[type] == 'place_of_worship' && zoom >= 13) {
			style[1] = place_of_worship;
		    //polygon_clip: false;
		    if(zoom >= 15) {
		    	style[0] = place_of_worship_outline;
		    	style[2] = 0.3;
		    // line_clip: false;
		}
	}

	if(tags[type] == 'prison' && zoom >= 10) {
		style[0] = '#888';
		style[2] = 3;
		    //line_opacity: 0.329;
		}

		if(tags[type] == 'hospital' || tags[type] == 'university' || tags[type] == 'college' || tags[type] == 'school' || tags[type] == 'kindergarten') {
			if(zoom >= 10) {
				style[1] = residential;
				if(zoom >= 12) {
					style[1] = educational_areas_and_hospital;
					if(zoom >= 13) {
						style[2] = 0.3;
						style[0] = 'brown';
					}
				}
			}
		}

		if(tags[type] == 'parking' && zoom >= 10 || tags[type] == 'bicycle_parking' && zoom >= 10 || tags[type] == 'motorcycle_parking' && zoom >= 10) {
			style[1] = parking;
			if(zoom >= 15) {
				style[2] = 0.3;
				style[0] = parking;
			}
		}

	}

	if(type == 'military'){  
		if(tags[type] == 'danger_area') {
			if(zoom >= 9 && zoom < 11) {
				style[1] = danger_area;
		      //polygon_opacity: 0.3;
		  }
		  if(zoom >= 11) {
		     // polygon_pattern_file: url('symbols/danger.png');
		     style[1] = danger_area;
		 }
		}
	}	



	if(type == 'natural'){ 
		if(tags[type] == 'wood') {
			if(zoom >= 8) {
				style[1] = forest;
			}
		}

		if(tags[type] == 'bare_rock' && zoom >= 9) {
			style[1] = bare_ground;
			if(zoom >= 13) {
		      //polygon_pattern_file: url('symbols/rock_overlay.png');
		  }
		}

		if(tags[type] == 'scree' || tags[type] == 'shingle') {
			if(zoom >= 9) {
				style[1] = bare_ground;
				if(zoom >= 13) {
		       // polygon_pattern_file: url('symbols/scree_overlay.png');
		   }
		}
	}

	if(tags[type] == 'sand' && zoom >= 9) {
		style[1] = sand;
	}

	if(tags[type] == 'heath' && zoom >= 10) {
		style[1] = heath;
	}

	if(tags[type] == 'scrub') {
		if(zoom >= 10) {
			style[1] = scrub;
		}
		if(zoom >= 14) {
		     // polygon_pattern_file: url('symbols/scrub.png');
		 }
		}

		if(tags[type] == 'beach' && zoom >= 10) {
			style[1] = beach;
		   // polygon_pattern_file: url('symbols/beach.png');
		   // polygon_pattern_alignment: global;
		}
	}


	if(type == 'power'){ 

		if(tags[type] == 'station' && zoom >= 10 || tags[type] == 'generator' && zoom >= 10 || tags[type] == 'sub_station' && zoom >= 13 || tags[type] == 'substation' && zoom >= 13) {
			style[1] = industrial;
			if(zoom >= 15) {
				style[1] = power;
			}
			if(zoom >= 16) {
				style[2] = 0.5;
				style[0] = power_line;
			}
		}

	}

	if(type == 'aeroway'){
		if(tags[type] == 'apron' && zoom >= 10) {
			style[1] = apron;
		}

		if(tags[type] == 'aerodrome' && zoom >= 10) {
			style[1] = aerodrome;
			style[2] = 0.2;
			style[0] = aerodrome;
		}
	}  

	if(type == 'highway'){ 
		if(tags[type] == 'services' || tags[type] == 'rest_area') {
			if(zoom >= 10) {
				style[1] = rest_area;
			}
		}
	}

	if(type == 'railway'){ 
		if(tags[type] == 'station' && zoom >= 10) {
			style[1] = station;
		}
	}
return style;
}

/*
#text_line {
  if(tags[type] == 'cliff' && zoom >= 15 ||
  if(tags[type] == 'man_made_embankment' && zoom >= 15) {
    text_name: "[name)";
    text_halo_radius: 1;
    text_halo_fill: rgba(255,255,255,0.6);
    text_fill: #999;
    text_size: 10;
    text_face_name: book_fonts;
    text_placement: line;
    text_dy: 8;
    text_vertical_alignment: middle;
    text_spacing: 400;
  }
}
*/
/*
	var style = new Array;

	       style[0] = playground;
           style[1] = playground;
           style[2] = 0.3;
	if(type == 'leisure'){
		if ((tags[type] == 'park') && zoom >= 13) {
           style[0] = park;//stroke_color
           style[1] = park;//fill_color
           style[2] = 0.3;//stroke_width
        }
		
		if ((tags[type]== 'playground') && zoom >= 13) {
           style[0] = playground;
           style[1] = playground;
           style[2] = 0.3;
        }
		
	}
		
	//landuse
	    if(type == 'landuse'){

		if ((tags[type]== 'quarry') && zoom >= 10) {
           style[0] = 'grey';
           style[1] = quarry;
           style[2] = 0.5;
        }
	
		if ((tags[type]== 'vineyard' || tags[type] == 'orchard') && zoom >= 10) {
           style[0] = orchard;
           style[1] = orchard;
           style[2] = 0.5;
        }
		
		if ((tags[type]== 'cemetery') && zoom >= 10) {
           style[0] = cemetery;
           style[1] = cemetery;
           style[2] = 0.5;
        }
    }
    return style;
}
*/