import * as http from 'http'
import * as request from 'request'
import * as fs from 'fs'
import * as mine from 'mime';
import * as path from 'path'

import gm = require('gm');
let imagic = gm.subClass({ imageMagick: true });


export class ImageMyLionelUtil {


    constructor() { }

    public getImage = (fileName: string, width: number, height: number) => {

        let locFilename = fileName.replace('.jpg', '');

        let origUrl = `${__dirname}/../../img/my_lionel/${locFilename}.jpg`;
        let url = `${__dirname}/../../img/my_lionel_cache/${locFilename}_${width}_${height}.jpg`;
        let file = path.basename(url);

        return new Promise(
            (resolve: (str: any) => void, reject: (str: string) => void) => {

                fs.exists(url, (exists) => {
                    if (exists) {
                        resolve(file);
                    } else {

                        let bufWidth = (width == 0) ? null : width;
                        let bufHeight = (height == 0) ? null : height;

                        imagic(origUrl)
                            .resize(bufWidth, bufHeight)
                            .write(url, (err) => {

                                resolve(file);
                            });
                    }
                });
            });
    };

}