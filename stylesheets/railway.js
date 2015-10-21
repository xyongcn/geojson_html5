function railwayCss(type,properties,zoom) {
	var style = new Array;
    if(type == 'subway'){
        if (properties["railway"] == 'subway' && zoom >= 12 && zoom <=14) {
            
            style[0] = '#999';
            style[1] = 2;
            style[6] = 0;
        }        
        if (properties["railway"] == 'subway' && zoom >= 14) {
            
            style[0] = '#000';
            style[1] = 5.5;
            style[2] = '#fff';
            style[3] = 4;
            style[4] = '#999';
            style[5] = 2;
            style[6] = 0;
        }
        if (properties["railway"] == 'subway' && (properties["tunnel"]=='yes' || properties["tunnel"]=='true') && zoom >= 12) {
            
            style[0] = '#999';
            style[1] = 2;
            style[6] = 1;//<CssParameter name="stroke-dasharray">5,3</CssParameter>
        }
    }

    return style;
}