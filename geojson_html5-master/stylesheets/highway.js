function highwayCss(type,tags,zoom) {
    var style = new Array;

    var motorway_width_z12 = 3.5;
    var motorway_link_width_z12 = 1.5;
    var trunk_width_z12 = 3.5;
    var primary_width_z12 = 3.5;
    var secondary_width_z12 = 3;
    var tertiary_width_z12 = 3;

    var motorway_width_z13 = 7;
    var motorway_link_width_z13 = 4.5;
    var trunk_width_z13 = 7;
    var primary_width_z13 = 7;
    var secondary_width_z13 = 7;
    var tertiary_width_z13 = 5;
    var residential_width_z13 = 3;
    var living_street_width_z13 = 2;
    var pedestrian_width_z13 = 2;
    var bridleway_width_z13 = 0.3;
    var footway_width_z13 = 0.7;
    var cycleway_width_z13 = 0.7;
    var path_width_z13 = 0.2;
    var track_width_z13 = 0.5;
    var track_grade1_width_z13 = 0.5;
    var track_grade2_width_z13 = 0.5;
    var steps_width_z13 = 0.7;

    var tertiary_width_z14 = 7.5;
    var residential_width_z14 = 4.5;
    var living_street_width_z14 = 4;
    var pedestrian_width_z14 = 4;
    var service_width_z14 = 2.5;

    var motorway_width_z15 = 12.8;
    var motorway_link_width_z15 = 7.8;
    var trunk_width_z15 = 12.8;
    var primary_width_z15 = 12.8;
    var secondary_width_z15 = 12.8;
    var tertiary_width_z15 = 11.2;
    var residential_width_z15 = 8.3;
    var living_street_width_z15 = 6;
    var pedestrian_width_z15 = 6;
    var bridleway_width_z15 = 1.2;
    var footway_width_z15 = 1;
    var cycleway_width_z15 = 0.9;
    var path_width_z15 = 0.5;
    var track_width_z15 = 1.5;
    var track_grade1_width_z15 = 0.75;
    var track_grade2_width_z15 = 0.75;
    var steps_width_z15 = 3;

    var residential_width_z16 = 11.2;
    var living_street_width_z16 = 9;
    var pedestrian_width_z16 = 9;
    var service_width_z16 = 6;
    var minor_service_width_z16 = 4;
    var footway_width_z16 = 1.3;
    var cycleway_width_z16 = 0.9;

    var motorway_width_z17 = 18;
    var motorway_link_width_z17 = 11.5;
    var trunk_width_z17 = 18;
    var primary_width_z17 = 18;
    var secondary_width_z17 = 18;
    var tertiary_width_z17 = 15.5;
    var residential_width_z17 = 15.5;
    var living_street_width_z17 = 14;
    var pedestrian_width_z17 = 14;
    var service_width_z17 = 7;

    var footway_width_z18 = 1.3;
    var cycleway_width_z18 = 1;

    var footway_width_z19 = 1.6;
    var cycleway_width_z19 = 1.3;

    var casing_width_z12 = 0.5;
    var casing_width_z13 = 0.5;
    var residential_casing_width_z13 = 0.5;
    var casing_width_z14 = 0.5;
    var casing_width_z15 = 0.7;
    var casing_width_z16 = 0.7;
    var casing_width_z17 = 1;

    var bridge_casing_width_z12 = 0.5;
    var bridge_casing_width_z13 = 0.5;
    var bridge_casing_width_z14 = 0.5;
    var bridge_casing_width_z15 = 0.75;
    var bridge_casing_width_z16 = 0.75;
    var bridge_casing_width_z17 = 0.75;

    var paths_background_width = 1;
    var paths_bridge_casing_width = 0.5;
    var paths_tunnel_casing_width = 1;

    if(type == 'highway'){

        if( zoom >=12) {
            style[0] = 'transparent';//stroke-color
            style[1] = '#ddd';//fill-color
            style[2] = 2;//stroke-width
            style[3] = 0;//fill-width
        }
        
        if ( zoom ==12 && (tags =='motorway' || tags =='motorway_link')) {
            style[0] =  '#506077';
            style[1] =  '#89a4cb';
            style[2] =  motorway_width_z12;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=13 && zoom <=14) &&  (tags =='motorway' || tags =='motorway_link')) {
            style[0] =  '#506077';
            style[1] =  '#89a4cb'
            style[2] =  motorway_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=15 && zoom <=16) &&  (tags =='motorway' || tags =='motorway_link')) {
            style[0] =  '#506077';
            style[1] =  '#89a4cb'
            style[2] =  motorway_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom >=17 &&  (tags =='motorway' || tags =='motorway_link')) {
            style[0] =  '#506077';
            style[1] =  '#89a4cb'
            style[2] =  motorway_width_z17;
            style[3] = style[2] - 1 ;
        }

        if ( zoom ==12 && (tags =='trunk' || tags =='trunk_link')) {
            style[0] =  '#477147';
            style[1] =  '#94d494';
            style[2] =  trunk_width_z12;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=13 && zoom <=14) &&  (tags =='trunk' || tags =='trunk_link')) {
            style[0] =  '#477147';
            style[1] =  '#94d494';
            style[2] =  trunk_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=15 && zoom <=16) &&  (tags =='trunk' || tags =='trunk_link')) {
            style[0] =  '#477147';
            style[1] =  '#94d494';
            style[2] =  trunk_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom >=17 &&  (tags =='trunk' || tags =='trunk_link')) {
            style[0] =  '#477147';
            style[1] =  '#94d494';
            style[2] =  trunk_width_z17;
            style[3] = style[2] - 1 ;
        }

        if ( zoom ==12 && tags =='primary' || tags =='primary_link') {
            style[0] =  '#8d4346';
            style[1] =  '#dd9f9f';
            style[2] =  primary_width_z12;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=13 && zoom <=14) &&  tags =='primary' || tags =='primary_link') {
            style[0] =  '#8d4346';
            style[1] =  '#dd9f9f';
            style[2] =  primary_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=15 && zoom <=16) &&  tags =='primary' || tags =='primary_link') {
            style[0] =  '#8d4346';
            style[1] =  '#dd9f9f';
            style[2] =  primary_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom >=17 &&  tags =='primary' || tags =='primary_link') {
            style[0] =  '#8d4346';
            style[1] =  '#dd9f9f';
            style[2] =  primary_width_z17;
            style[3] = style[2] - 1 ;
        }

        if ( zoom ==12 && (tags =='secondary' || tags =='secondary_link')) {
            style[0] =  '#a37b48';
            style[1] =  '#f9d6aa';
            style[2] =  secondary_width_z12;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=13 && zoom <=14) &&  (tags =='secondary' || tags =='secondary_link')) {
            //var style = new Array;
            style[0] =  '#a37b48';
            style[1] =  '#f9d6aa';
            style[2] =  secondary_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( (zoom >=15 && zoom <=16) &&  (tags =='secondary' || tags =='secondary_link')) {
            style[0] =  '#a37b48';
            style[1] =  '#f9d6aa';
            style[2] =  secondary_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom >=17 &&  (tags =='secondary' || tags =='secondary_link')) {
            style[0] =  '#a37b48';
            style[1] =  '#f9d6aa';
            style[2] =  secondary_width_z17;
            style[3] = style[2] - 1;
        }

        if ( zoom ==13 && (tags =='tertiary' || tags =='tertiary_link')) {
            style[0] =  '#999999';
            style[1] =  '#f8f8ba';
            style[2] =  tertiary_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( zoom ==14 && (tags =='tertiary' || tags =='tertiary_link')) {
            style[0] =  '#999999';
            style[1] =  '#f8f8ba';
            style[2] =  tertiary_width_z14;
            style[3] = style[2] - 0.5 ;
        }

        if ( zoom ==13 && (tags =='residential' || tags =='unclassified' || tags =='road')) {
            style[0] =  '#999999';
            style[1] =  '#ffffff';
            style[2] =  residential_width_z13;
            style[3] = style[2] - 0.5 ;
        }

        if ( zoom ==15 && (tags =='residential' || tags =='unclassified' || tags =='road')) {
            style[0] =  '#999999';
            style[1] =  '#ffffff';
            style[2] =  residential_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom ==16 && (tags =='residential' || tags =='unclassified' || tags =='road')) {
            style[0] =  '#999999';
            style[1] =  '#ffffff';
            style[2] =  residential_width_z16;
            style[3] = style[2] - 1 ;
        }

        if ( (zoom >=15 && zoom <=16) &&  (tags =='tertiary' || tags =='tertiary_link')) {
            style[0] =  '#999999';
            style[1] =  '#f8f8ba';
            style[2] =  tertiary_width_z15;
            style[3] = style[2] - 1 ;
        }

        if ( zoom ==14 && (tags =='residential' || tags =='unclassified' || tags =='road')) {
            style[0] =  '#999999';
            style[1] =  '#ffffff';
            style[2] =  residential_width_z14;
            style[3] = style[2] - 0.5 ;
        }

        //注意逻辑关系
        if ( zoom >=17 && ((tags =='tertiary' || tags =='tertiary_link') || (tags =='residential' || tags =='unclassified' || tags =='road'))) {
            style[0] =  '#999999';
            style[1] =  '#f8f8ba';
            style[2] =  tertiary_width_z17;
            style[3] = style[2] - 1 ;
        } 
    }    
    return style;
}
