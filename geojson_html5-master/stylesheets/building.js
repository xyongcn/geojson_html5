function buildingCss(type,tags,zoom) {
	var style = new Array;

    if(type == 'building'){

        if( zoom >= 10) {
            style[0] = '#d1c3be';//stroke-color
            style[1] = '#d3c5c1';//fill-color
            style[2] = 0.3;//stroke-width
            //fill-width            
        }

		if ((tags == 'supermarket') && zoom >= 10) {
           style[0] = 'pink';
           style[1] = 'pink';
           style[2] = 0.5;
        }
        if ((tags == 'station') && zoom >= 10) {
            style[1] = '#d4aaaa';
        }

        if ((tags == 'residential' && zoom >= 12) || (tags == 'house'  && zoom >= 12) || (tags == 'garage' && zoom >= 12) || (tags == 'garages' && zoom >= 12) || (tags == 'detached' && zoom >= 12) || (tags == 'terrace' && zoom >= 12) || (tags == 'apartments' && zoom >= 12)) {
            style[0] = '#bca9a9';
            style[2] = 0.7;
        }

    //    if (tags !== 'residential' && zoom >= 12) {
    //        style[0] = '#bca9a9';
    //        style[2] = 0.9;
    //    }

        if (tags !== 'residential' && tags !== 'house' && tags !== 'garage' && tags !== 'garages' && tags !== 'detached' && tags !== 'terrace' && tags !== 'apartments' && tags !== 'no' && tags !== 'station' && tags !== 'supermarket' && zoom >= 16) {
            style[0] = '#330066';
            style[2] = 0.2;
        }			
    }
    return style;
}