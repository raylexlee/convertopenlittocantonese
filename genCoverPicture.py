#!/usr/bin/python3
import os, sys
from sys import argv
import argparse
from wand.color import Color
from wand.compat import nested
from wand.drawing import Drawing
from wand.image import Image
import glob

dimensions = {'width': 1280,
              'height': 720}

def __MakeFrontCover():
   if len(sys.argv) != 7 :
       print("There should be 7 parameters but recieves ", len(sys.argv))
       return 1
   pCode, pName, pOrigNotUsed, pChapter, pTitle1, pTitle2 = sys.argv[1:]     
   MakeFrontCover(pCode, pName, pChapter, pTitle1, pTitle2)
   return 0

def MakeFrontCover(pCode, pName, pChapter, pTitle1, pTitle2):
  with Image(filename='../empty_youtube_cover.png') as converted:
        converted.format = 'jpg'
        dimensions['width']=converted.width
        dimensions['height']=converted.height
        with nested(converted.clone(),
            Image(background=Color('transparent'), **dimensions)) as (bg, shadow):
            # Draw the drop shadow
            with Drawing() as ctx:
                ctx.fill_color = Color('rgba(3, 3, 3, 0.6)')
                ctx.font = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
                ctx.font_size = 100
                ctx.text(240, 160, pName)
                ctx.text(280, 320, pChapter)
                ctx.text(280, 480, pTitle1)
                ctx.text(280, 640, pTitle2)
                ctx(shadow)
                # Apply filter
                shadow.gaussian_blur(4, 2)
                # Draw text
                with Drawing() as ctx:
                    ctx.fill_color = Color('rgb(76, 175, 80)')
                    ctx.font = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
                    ctx.font_size = 100
                    ctx.text(240-4, 160-4, pName)
                    ctx.text(280-4, 320-4, pChapter)
                    ctx.text(280-4, 480-4, pTitle1)
                    ctx.text(280-4, 640-4, pTitle2)
                    ctx(shadow)
                bg.composite(shadow, 0, 0)
                bg.save(filename='cover/'+pCode+'.jpg')
  return

if __name__ == '__main__':
    sys.exit(__MakeFrontCover())
