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
            style[1] = '#b5d0d0';
        }

        if(properties["water"] == 'lake' && zoom >=6){
            style[1] = '#b5d0d0';
        }        
    }


    return style;
}