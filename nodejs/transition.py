#!/usr/bin/python

import binascii
import sys
import math
import time
import urllib
import os
import subprocess

def num2deg(xtile, ytile, zoom):
  n = 2.0 ** zoom
  lon_deg = xtile / n * 360.0 - 180.0
  lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
  lat_deg = math.degrees(lat_rad)
  return (lat_deg, lon_deg)
  
while True:
   (z,x,y) = map(int,sys.stdin.readline().split());
   jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
   osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
   if os.path.exists(jsonname):
      sys.stdout.write('/vector/' + str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json' + '\n');
      sys.stdout.flush();
      continue;
   else:
      fx=float(x);
      fy=float(y);
      fz=float(z);
      (lat1, long1)=num2deg(fx,fy,fz);
      (lat2, long2)=num2deg(fx+1,fy+1,fz);
      #if (lat1 > 53.4478600000) or (lat2 < 18.2166241180) or (long1 < 73.7090230000) or (long2 > 135.0536590000):
      #   continue;
      if (lat1 < 40.2108419673093) and (lat2 > 39.7203276628608) and (long1 > 116.035690317589) and (long2 < 116.744768659913):
         geourl='http://localhost:8080/geoserver/osm_ubuntu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=osm_ubuntu:osm_beijing&outputFormat=application/json' + '&viewparams=' + 'long1:' + str(long1) +';' + 'lat1:' + str(lat1) + ';' + 'long2:' + str(long2) + ';' + 'lat2:' + str(lat2)+ ';' + 'minzoom:' + str(int(z));
         #print geourl;
         #print 'beijing';
         jsontmp = filename='/home/lchao/tmp/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
         urllib.urlretrieve(geourl, jsontmp);
         os.system('jq -c \'del(.features[].properties | .[]| select(.==null))\' '+ jsontmp + '> ' + jsonname);
         os.system('rm -f /home/lchao/tmp/*' + ' >> /dev/null 2>&1');
         sys.stdout.write('/vector/' + str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json' + '\n');
         sys.stdout.flush();
         continue;
      else:
         sys.stdout.write('/void/void.json' + '\n');
         sys.stdout.flush();
         if int(z) > 14:
          os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
          os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
          os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
          os.system('mv /home/ywli/nodejs/vector/'+ osmname + '.json' + ' /home/lchao/vector/'+ osmname + '.json');
        else:
          print 'z<15'