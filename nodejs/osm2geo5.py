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

z=12;
x=3369;
y=1554;  
fx=float(x);
fy=float(y);
fz=float(z);
(lat1, long1)=num2deg(fx,fy,fz);
(lat2, long2)=num2deg(fx+1,fy+1,fz);
jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
if (int(z)>=12):
  #os.system('wget -O '+ osmname +' http://www.openstreetmap.org/api/0.6/map?bbox=116.1377,39.7021,116.1856,39.7347');
  os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
  os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
  os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
  #print 'z>=12'
else :
  print 'z<12';
  
z=13;
x=6738;
y=3108;  
fx=float(x);
fy=float(y);
fz=float(z);
(lat1, long1)=num2deg(fx,fy,fz);
(lat2, long2)=num2deg(fx+1,fy+1,fz);
jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
if (int(z)>=12):
  #os.system('wget -O '+ osmname +' http://www.openstreetmap.org/api/0.6/map?bbox=116.1377,39.7021,116.1856,39.7347');
  os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
  os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
  os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
  #print 'z>=12'
else :
  print 'z<12';
  
z=13;
x=6738;
y=3109;  
fx=float(x);
fy=float(y);
fz=float(z);
(lat1, long1)=num2deg(fx,fy,fz);
(lat2, long2)=num2deg(fx+1,fy+1,fz);
jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
if (int(z)>=12):
  #os.system('wget -O '+ osmname +' http://www.openstreetmap.org/api/0.6/map?bbox=116.1377,39.7021,116.1856,39.7347');
  os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
  os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
  os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
  #print 'z>=12'
else :
  print 'z<12';

z=13;
x=6739;
y=3108;  
fx=float(x);
fy=float(y);
fz=float(z);
(lat1, long1)=num2deg(fx,fy,fz);
(lat2, long2)=num2deg(fx+1,fy+1,fz);
jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
if (int(z)>=12):
  #os.system('wget -O '+ osmname +' http://www.openstreetmap.org/api/0.6/map?bbox=116.1377,39.7021,116.1856,39.7347');
  os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
  os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
  os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
  #print 'z>=12'
else :
  print 'z<12';

z=13;
x=6739;
y=3109;  
fx=float(x);
fy=float(y);
fz=float(z);
(lat1, long1)=num2deg(fx,fy,fz);
(lat2, long2)=num2deg(fx+1,fy+1,fz);
jsonname='/home/lchao/osm/vector/'+ str(int(z)) + '_' + str(int(x)) + '_' + str(int(y)) + '.json';
osmname=str(int(z)) + '_' + str(int(x)) + '_' + str(int(y));
if (int(z)>=12):
  #os.system('wget -O '+ osmname +' http://www.openstreetmap.org/api/0.6/map?bbox=116.1377,39.7021,116.1856,39.7347');
  os.system('wget -O '+ osmname + ' -P /home/ywli/nodejs/vector' +' http://www.openstreetmap.org/api/0.6/map?bbox='+ str(round(long1,4)) + ',' +  str(round(lat2,4)) + ',' + str(round(long2,4)) + ',' + str(round(lat1,4)));
  os.system('mv '+ osmname + ' /home/ywli/nodejs/vector/'+ osmname);
  os.system('nodejs /home/ywli/nodejs/osm2geo.js '+ '/home/ywli/nodejs/vector/'+osmname);
  #print 'z>=12'
else :
  print 'z<12';

