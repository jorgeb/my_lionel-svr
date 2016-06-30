import * as http from 'http'
import * as request from 'request'
import * as fs from 'fs'
import * as path from 'path'

import gm = require('gm');
let imagic   = gm.subClass({imageMagick: true});

import dbProvider = require('../../db');

export class ImageLionelUtil {

  private db:any = dbProvider.db;

  constructor() {}

  public getSquareImage = (id:number, width:number) => {
    let origUrl = `${__dirname}/../../img/lionel/${id}.gif`;
    let url = `${__dirname}/../../img/lionel/${id}_${width}__.gif`;
    let file = path.basename(url);

    return new Promise(
      (resolve:(str:any)=>void, reject:(str:string)=>void) => {

        fs.exists(url, (exists) => {
          if (exists) {
            resolve(file);
          } else {

          let bufWidth = (width == 0)?null:width;

            fs.exists(origUrl, (exists) => {
              if (exists) {
                imagic(origUrl)
                  .background('#ffffff')
                  .resize(bufWidth, bufWidth)
                  .gravity('Center')
                  .extent(bufWidth, bufWidth, null)
                  .write(url, (err) => {

                      resolve(file);
                    }
                  );
              } else {

                this.db.lionelItems.find(id).then(lionelItem => {
                  // http://tandem-associates.com/lionel/pictures/track022rh_ident.gif
                  
                  if(lionelItem.image_url != null){
                      
                    let imgurl = `http://tandem-associates.com/lionel/${lionelItem.image_url}`;
                    let stream = request(imgurl);
                    var writeStream = fs.createWriteStream(origUrl);
                    stream.pipe(writeStream).on('finish', () => {

                      imagic(origUrl)
                        .background('#ffffff')
                        .resize(bufWidth, bufWidth)
                        .gravity('Center')
                        .extent(bufWidth, bufWidth, null)
                        .write(url, (err) => {

                          resolve(file);
                        }
                        );
                    });
                    
                  } else {
                      resolve('default.png');
                  }
                })
              }
            });

          }
        });
      });
  }


  public getImage = (id:number, width:number, height:number) => {

    let origUrl = `${__dirname}/../../img/lionel/${id}.gif`;
    let url = `${__dirname}/../../img/lionel/${id}_${width}_${height}.gif`;
    let file = path.basename(url);

    return new Promise(
      (resolve:(str:any)=>void, reject:(str:string)=>void) => {

        fs.exists(url, (exists) => {
          if (exists) {
            resolve(file);
          } else {

          let bufWidth = (width == 0)?null:width;
          let bufHeight = (height == 0)?null:height;

            fs.exists(origUrl, (exists) => {
              if (exists) {                
                imagic(origUrl)
                  .resize(bufWidth, bufHeight)
                  .write(url, (err) => {
                      resolve(file);
                    }
                  );

              } else {

                this.db.lionelItems.find(id).then(lionelItem => {
                  // http://tandem-associates.com/lionel/pictures/track022rh_ident.gif
                  
                  if(lionelItem.image_url != null){
                      
                    let imgurl = `http://tandem-associates.com/lionel/${lionelItem.image_url}`;
                    let stream = request(imgurl);
                    var writeStream = fs.createWriteStream(origUrl);
                    stream.pipe(writeStream).on('finish', () => {

                        imagic(origUrl)
                        .resize(bufWidth, bufHeight)
                        .write(url, (err) => {

                            resolve(file);
                           }
                        );
                    });
                  } else {
                      resolve('default.png');
                  }
                })
              }
            });

          }
        });
      });
  };

}