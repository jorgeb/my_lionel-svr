import * as http from 'http'
import * as request from 'request'
import * as fs from 'fs'
import * as mine from 'mime';
import * as path from 'path'

let exec = require('child_process').exec;
import gm = require('gm');

import { MyLionelUploadedUtils } from '../my_lionel/my_lionel_uploaded.utils';
                                     
let imagic = gm.subClass({ imageMagick: true });


export class ImageTopColorsUtil {


    constructor() { }

    private execute = (command, callback) => {
        exec(command, function(error, stdout, stderr){ callback(stdout); });
    }; 


    public getAllHistogram = () => {
                
         return new Promise(
            (resolve: (str: any) => void, reject: (str: string) => void) => {
                
                MyLionelUploadedUtils.rawImages().forEach(img => {
                    console.log(img);
                    this.getHistogram(img);
                });
                
                resolve('done');
            });
                
    }
    
    public getHistogram = (fileName: string) => {

        let locFilename = fileName.replace('.jpg', '');

        let origUrl = `${__dirname}/../../img/my_lionel/${locFilename}.jpg`;
        let url = `${__dirname}/../../img/histogram_info/${locFilename}-hi.txt`;
        let file = path.basename(url);

        return new Promise(
            (resolve: (str: any) => void, reject: (str: string) => void) => {
                
                  this.execute(
                    'convert ' + origUrl +  
                    ' -gravity center  -crop 55% -dither None -colors 16 -depth 8 -format "%c" histogram:info:- | sort -n -r | head -n 20',
                    (result) => {
                        
                        fs.writeFile(url, result, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            
                            resolve(file);
                        }); 
                    });

            });
    };

}