import * as http from 'http'
import * as request from 'request'

import * as cheerio from 'cheerio';

import dbProvider = require('../../db');

export class TandemUtil {

  private db:any = dbProvider.db;

  constructor() {}

  public parserSiteIndex = () => {
     
     return new Promise(
      
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {
         
          let url = `http://www.tandem-associates.com/lionel/lionel_trains_master_index.htm`;

          this.loadUrl(url).then( data => {

            let defLI = Object.assign({}, this.pasrseHtmlIndex(data.body));

            defLI.items.forEach( li => {
                this.db.lionelItems.save(li);
            });
            
            resolve(defLI)
            //this.db.auctionItems.save(defLI)
            
          });
      });
  };
  
  public parserSiteItems = () => {
      
    let urls = [];
    
    return new Promise(
        (resolve:(data:any)=>void, reject:(str:string)=>void) => {

            this.db.lionelItems.all().then(lionelItems => {
            
            lionelItems.forEach(item => {
                
                let url = 'http://www.tandem-associates.com/lionel/' + item.url
                
                console.log(url)
                /*
                if (url) {
                  let splitImg: Array<string> = url.split('_');

                  splitImg.shift();
                  splitImg.shift();
                  splitImg.shift();

                  item.ins_image_url = splitImg.join();
                }
*/
                this.loadUrl(url).then( data => {
                   
                    let defLI = Object.assign({},item, this.pasrseHtmlItem(data.body));
                    this.db.lionelItems.save(defLI);
            
                    urls.push(url);
                                        
                });
                
            });
            
            resolve(urls)
        });

//this.db.auctionItems.save(defLI)

    });
      
      
  }
  
  //body > div > table:nth-child(7) > tbody > tr > td:nth-child(1) > img
  //body > div > table:nth-child(12) > tbody > tr > td > p > img
  //body > div > table:nth-child(7) > tbody > tr > td:nth-child(1) > img
  //body > div > table:nth-child(7) > tbody > tr > td:nth-child(1) > img
  //body > div > table:nth-child(7) > tbody > tr > td:nth-child(1) > img    
  //body > div > table:nth-child(11) > tbody > tr > td:nth-child(1) > img:nth-child(1)
  //body > div > table:nth-child(11) > tbody > tr > td:nth-child(2) > img:nth-child(1)
  
  private loadUrl(url:string) {

    return new Promise(
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {

        request({uri: url}, (err: Error, message: http.IncomingMessage, body: string) => {
          if (!err) {

            if (message.statusCode < 400 )
              resolve({body:body});
          }
          else {

          }
        });

      });
  };

 private pasrseHtmlItem = (html) => {
    
    let $ = cheerio.load(html);

    let ret = {
        fav_type:'',
        image_url:null,
        name:null,
        info:'',
        info_html:html,
        updated: new Date()};

    //table body > div > div > table > tbody > tr > td:nth-child(1)
    // /html/body/div/div/table/tbody/tr/td[1]
    
    $('div  table:nth-child(7)  tr  td:nth-child(1)  img').filter(function () {

      let data = $(this);
      
        ret.fav_type = data.attr('src');
      return null;
    })
    
    //imagen principal
    //div > table:nth-child(11) > tbody > tr > td:nth-child(2) > img:nth-child(1)
    //body > div > table:nth-child(11) > tbody > tr > td:nth-child(2) > img:nth-child(1)
    //body > div > table:nth-child(12) > tbody > tr > td:nth-child(4) > img
     $('div  table:nth-child(11) tr img').filter(function () {

      let src = $(this).attr('src');
      
      if(/^pictures/.test(src) && !ret.image_url )
          ret.image_url = src;
          
      return /^pictures/.test(src);
    });

     if (!ret.image_url) {
       $('div  table:nth-child(12) tr img').filter(function () {

         let src = $(this).attr('src');

         if (/^pictures/.test(src) && !ret.image_url)
           ret.image_url = src;

         return /^pictures/.test(src);
       });
     }
             
    //body > div > table:nth-child(7) > tbody > tr > td:nth-child(2) > b > font
    $('div  table:nth-child(7) tr > td:nth-child(2)').filter(function () {

      let name = $(this).text();
      
      ret.name = name;      
      return name;
    });

    //name body > div > table:nth-child(7) > tbody > tr > td > b > font
    
    if (ret.name == null) {
      $('div  table:nth-child(7) tr > td').filter(function () {

        let name = $(this).text();

        ret.name = name;
        return name;
      });
    }

     //Info body > div > table:nth-child(12) > tbody > tr > td > p
    $('p[align="justify"],p[align="JUSTIFY"]').filter(function () {

      let name = $(this).text();
      
      ret.info = ret.info + ' ' + name;      
      return name;
    });


    return ret;
  };
  
  private pasrseHtmlIndex = (html) => {
    
    let $ = cheerio.load(html);

    let ret:Array<any> = [];

    //table body > div > div > table > tbody > tr > td:nth-child(1)
    // /html/body/div/div/table/tbody/tr/td[1]
    
    $('div div table td a').filter(function () {

      let data = $(this);
      
      let extText = '';
      let nxt = $(data[0].next)[0];
      
      if (nxt && nxt.type === 'text'){
          extText = $(data[0].next).text();
      };
      
      if((data.text() + extText).length > 0) {
        ret.push({
            url:data.attr('href'),
            lionel_id:data.text() + extText});
      }
      
      return null;
    })
    
    return {items:ret};
  };

}