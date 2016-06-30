import { Request, Response } from 'express';

import dbProvider = require('../../db');
import { TandemUtil } from './tandem-util';

import { googleapis } from './tenders';

export class TandemController {

  private db:any = dbProvider.db;

  constructor(private req:Request,
              private res:Response,
              private next:Function) {
  }

  public parserFromOrigin = () => {

    return Promise.resolve()
      .then(() => {

        let tu = new TandemUtil();

        return tu.parserSiteIndex().then(data => {

            this.res.status(200).json({
              success: true,
              data: data
            });
          })
          .catch(error => this.next(error));
      });
  }
  
  public parserItems = () => {

      let tu = new TandemUtil();

      return tu.parserSiteItems().then(data => {

          this.res.status(200).json({
              success: true,
              data: data
          });
          
      }).catch(error => this.next(error));      
  }
  
  public tenders = () => {

console.log('googleapis');

var google = require('googleapis');
var customsearch = google.customsearch('v1');

// You can get a custom search engine id at
// https://www.google.com/cse/create/new
const API_KEY = 'AIzaSyDT7PQZkcz9o3Lf4LNa6VWL3cK77haQ_Sk';
const SEARCH = '6066';
/*let tenders = ['204T','205T','208T','209T','210T','221W','234W','243W','244T','247T',
'250T','671W','736W','746W','773W','1001T','1130T','1060T','1615T','1654W','1862T','1872T','1882T',
'2020W','2046W','2345T','2353T','2354T','2403B','2426W','2466W','2671W','6001','6020W','6026T','6026W','6066T',
'6066W','6403B','6466W','6654W'];
*/

let tenders = ['6466WX'];

tenders.forEach((tender) => {
customsearch.cse.list({ cx: '002586204953238386063:bsjkysauzy0', q: tender, auth: API_KEY }, (err, resp) => {
  if (err) {
    return console.log('An error occured', err);
  }
  // Got the response from custom search
  console.log('Result: ' + resp.searchInformation.formattedTotalResults);
  if (resp.items && resp.items.length > 0) {
    
    resp.items.forEach((r) => {
      
      r.lionel_id = tender;
      
      if(r.pagemap && r.pagemap.cse_image && r.pagemap.cse_image.length > 0){
        r.pagemap_cse_image_src = r.pagemap.cse_image[0].src;
      }
      
      this.db.lionelTenders.save(r);
      
    });
    
    console.log('First result name is ' + resp.items[0]);
  }
});
  
});


    return this.db.lionelItems.all().then(data => {

      this.res.status(200).json({
        success: true,
        data:'vMM'
      });

    });

  }
 /********************************************************* */
 public tendersImagesFromLiveauctioneers = () => {

console.log('googleapis');

var google = require('googleapis');
var customsearch = google.customsearch('v1');

// You can get a custom search engine id at
// https://www.google.com/cse/create/new
const API_KEY = 'AIzaSyDT7PQZkcz9o3Lf4LNa6VWL3cK77haQ_Sk';
const SEARCH = '6066';

this.db.lionelTenders.getLocomotives().then( tenders => {

tenders.forEach((tender) => {
  
  let search = tender.loco_lionel_id + ' ' + tender.lionel_id + ' lionel';
   
   
    new Promise(
        (resolve:(data:any)=>void, reject:(str:string)=>void) => {


          let imgUrl = [];
          let imgDesc = [];

          customsearch.cse.list({ cx: '002586204953238386063:ywgto5sb5-4', q: search, auth: API_KEY }, (err, resp) => {
            if (err) {
              return console.log('An error occured', err);
            }
            // Got the response from custom search
            console.log('Result: ' + resp.searchInformation.formattedTotalResults);
            
            
            
            if (resp.items && resp.items.length > 0) {
              
              resp.items.forEach((r) => {
                
                r.lionel_id = tender;
                
                if(r.pagemap && r.pagemap.cse_image && r.pagemap.cse_image.length > 0){
                  imgUrl.push(r.pagemap.cse_image[0].src);
                  
                  imgDesc.push(r.htmlSnippet);
                }
               
              });
            }
            resolve({imgUrl:imgUrl,imgDesc:imgDesc});
          });

            
    }).then(data => {
      
      this.db.lionelTenders.updateLiveauctioneersImages(tender.id,data.imgUrl.join(),data.imgDesc.join('@'));
    });
      
 
});

  
});

    return this.db.lionelItems.all().then(data => {

      this.res.status(200).json({
        success: true,
        data:'vMM'
      });

    });

  }
}