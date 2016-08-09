import * as http from 'http'
import * as request from 'request'

import * as cheerio from 'cheerio';


import dbProvider = require('../../db');


export class PostwarLionelUtil {

    private db: any = dbProvider.db;

    constructor() { }

    public parserSite = () => {
        return this.parseMenu(); 
    };

    
    private parseMenu = () => {
        
    return new Promise(
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {
           
           this.loadUrl('http://www.postwarlionel.com/').then(body => {
                   
              resolve(this.rootMenu(body)); 
           });
      });

    }

  private rootMenu = (html):Array<string> => {
    
    let $ = cheerio.load(html);

    let ret:Array<string> = [];
        
   $('#DrawerMenu  a.sf-with-ul').map(function (i, el) {
      ret.push($(el).attr('href'));
    });
    
    return ret;
    //Anchor
    /*
    
         $('.page #SideCategoryList.CategoryList ul a:not(.hasSub)').map(function (i,el) {

      let data = $(this).attr('href');
      console.log(data);
      return ' h'; 
      
    })
    
    return $('.SideCategoryListFlyout a:not(.hasSub)').map(function () {

      let data = $(this);
      console.log(data.attr('href'))
      return 'hola';
    });
*/
  };
    
    
 private loadUrl(url:string) {

    return new Promise(
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {

        var extServerOptions = {
          host: 'postwarlionel.com',
          port: '80',
          path: url,
          method: 'GET'
        };

        request({uri: url}, (err: Error, message: http.IncomingMessage, body: string) => {
          if (!err) {

            if (message.statusCode < 400 )
              resolve(body);
          }
          else {

          }
        });

  
      });
  }
  
}