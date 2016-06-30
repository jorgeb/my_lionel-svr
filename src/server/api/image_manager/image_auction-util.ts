import * as http from 'http'
import * as request from 'request'
import * as fs from 'fs'
import * as mine from 'mime';
import * as path from 'path'

import gm = require('gm');
let imagic   = gm.subClass({imageMagick: true});

import dbProvider = require('../../db');

export class ImageAuctionUtil {

  private db:any = dbProvider.db;

  constructor() {}

  public getSquareImage = (auctionItemId:number, width:number) => {
    let origUrl = `${__dirname}/../../img/auctions/${auctionItemId}.jpg`;
    let url = `${__dirname}/../../img/auctions/${auctionItemId}_${width}__.jpg`;
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
                  .resize(bufWidth, bufWidth + '^')
                  .gravity('Center')
                  .extent(bufWidth, bufWidth, null)
                  .write(url, (err) => {

                      resolve(file);
                    }
                  );

              } else {

                this.db.auctionItems.find(auctionItemId).then(auctionItem => {

                  let stream = request(auctionItem.image_url);
                  var writeStream = fs.createWriteStream(origUrl);
                  stream.pipe(writeStream).on('finish', () => {

                    imagic(origUrl)
                    .resize(bufWidth, bufWidth + '^')
                    .gravity('Center')
                    .extent(bufWidth, bufWidth, null)
                    .write(url, (err) => {

                        resolve(file);
                      }
                    );
                  });
                })
              }
            });

          }
        });
      });
  }

  public getImage = (auctionItemId:number, width:number, height:number) => {

    let origUrl = `${__dirname}/../../img/auctions/${auctionItemId}.jpg`;
    let url = `${__dirname}/../../img/auctions/${auctionItemId}_${width}_${height}.jpg`;
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

                this.db.auctionItems.find(auctionItemId).then(auctionItem => {

                  let stream = request(auctionItem.image_url);
                  var writeStream = fs.createWriteStream(origUrl);
                  stream.pipe(writeStream).on('finish', () => {

                    imagic(origUrl)
                      .resize(bufWidth, bufHeight)
                      .write(url, (err) => {

                          resolve(file);
                        }
                      );
                  });
                })
              }
            });

          }
        });
      });
  };

}

/*

 var file = __dirname + '/../../public/assets/data/demo.png';
 var filename = path.basename(file);

 var mimetype = mime.lookup(file);

 res.setHeader('Content-disposition', 'attachment; filename=' + filename);
 console.log('mimetype', mimetype);
 res.setHeader('Content-type', mimetype);

 var filestream = fs.createReadStream(file);


 id: 37,
 auction_id: 1,
 title: 'Lionel #ZW Transformer',
 info: 'This is the  Type-ZW Transformer that Lionel made in the middle 1950s.\r\nNo Box.  \r\nExamine very, very closely; what is pictured is what you will receive. \r\nPlease add $25.00 for US-48 Shipping and Insurance.        Gail',
 url: null,
 image_url: 'http://ambrosebauer.com/auction251/2TAAA028.jpg',
 extra_images_url: 'http://ambrosebauer.com/auction251/2TAAA028.jpg,http://ambrosebauer.com/auction251/2TAAA029.jpg,http://ambrosebauer.com/auction251/2TAAA030.jpg,http://ambrosebauer.com/auction251/2TAAA031.jpg,http://ambrosebauer.com/auction251/2TAAA032.jpg,http://ambrosebauer.com/auction251/2TAAA033.jpg,http://ambrosebauer.com/auction251/2TAAA034.jpg,http://ambrosebauer.com/auction251/2TAAA035.jpg,http://ambrosebauer.com/auction251/2TAAA036.jpg,http://ambrosebauer.com/auction251/2TAAA037.jpg,http://ambrosebauer.com/auction251/2TAAA038.jpg',
 to_watch: null,
 my_max_bid: null,
 end_bid: null,
 current_bid: null,
 current_max_bidder: '',
 my_wish: 0,
 sort_order: 0,
 external_id: null,
 auction_name: 'Post-War Potluck',
 auction_external_id: '251',
 auctioneer_name: 'Ambrosebauer' }


// */
