import * as http from 'http'
import * as request from 'request'
import * as fs from 'fs'
import * as mine from 'mime';
import * as path from 'path'

import gm = require('gm');
let imagic = gm.subClass({ imageMagick: true });


export class ImageLiveauctioneerUtil {


    constructor() { }

    public getImage = (fileName: string, width: number, height: number) => {

        let locFilename = fileName.replace('.jpg', '');

        let origUrl = `${__dirname}/../../img/liveauctioneer/${locFilename}.jpg`;
        let url = `${__dirname}/../../img/liveauctioneer_cache/${locFilename}_${width}_${height}.jpg`;
        let file = path.basename(url);

        return new Promise(
            (resolve: (str: any) => void, reject: (str: string) => void) => {

                fs.exists(url, (exists) => {
                    if (exists) {
                        resolve(file);
                    } else {

                        let bufWidth = (width == 0) ? null : width;
                        let bufHeight = (height == 0) ? null : height;

                        fs.exists(origUrl, (exists) => {
                            if (exists) {
                                imagic(origUrl)
                                    .resize(bufWidth, bufHeight )
                                    .write(url, (err) => {

                                        resolve(file);
                                    }
                                    );

                            } else {
//https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png/v1/img/227/27475/10412494_2_x.jpg
                                let cloudinaryUrl = 
                                    `https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png/v1/img/${fileName.split('-').join('/')}`
                                    
                                let stream = request(cloudinaryUrl);
                                var writeStream = fs.createWriteStream(origUrl);
                                stream.pipe(writeStream).on('finish', () => {

                                    imagic(origUrl)
                                        .resize(bufWidth, bufHeight)
                                        .write(url, (err) => {

                                            resolve(file);
                                        }
                                        );
                                });

                            }
                        });

                    }
                });
            });
    };

}