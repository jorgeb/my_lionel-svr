import * as http from 'http'
import * as request from 'request'

import * as cheerio from 'cheerio';

import dbProvider = require('../../db');
             
export class LiveauctioneerUtil {

  private db:any = dbProvider.db;

  constructor() {}

  public parserSite = () => {
    return this.db.lionelSteamTenders.all().then(steamTenders => {

      steamTenders.forEach( steamTender => {
         this.parse(steamTender); 
      });      
    })
  };

  private parse = (steamTender:any) => {
      
    let url = `https://new.liveauctioneers.com/api/mainhost/search/%20?client=web&client_version=5.0.0&keyword=${steamTender.lionel_tender_id}+${steamTender.lionel_id}+lionel&max_facet_values=10&page=1&pageSize=12&pagesize=12&sort=relevance&status=archive`;

    this.loadUrl(url).then( data => {
        let jsonResult = JSON.parse(data);
        console.log(`steamTender.lionel_id`,steamTender.lionel_id)
        
        
        jsonResult.results.forEach(lot => {
            let lotId = lot.lot_id;
            let catId = lot.cat_id;
            let houseId = lot.house_id;
            
            let size:string = (26131 > catId?'l':'x'); 
                         
            lot.photos.forEach(img => {
                
                let saveTo = {
                    steam_tender_id:steamTender.id,
                    image_url:`${houseId}/${catId}/${lotId}_${img}_${size}.jpg`,
                    is_default:false
                };
                
                this.db.lionelSteamTenders.saveImage(saveTo);
              
            });
        });
        /*
        USAR para completar
        https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png/v1/img/
        
        a.generate = function(b, c) {
                var d = angular.extend({}, a.defaults, c)
                  , e = b.seller ? b.seller.sellerId : b.house_id
                  , f = b.catalog ? b.catalog.catalogId : b.cat_id
                  , g = b.itemId ? b.itemId : b.lot_id
                  , h = k()
                  , i = [h, e, f, g].join("/");
                return d.size = "x",
                26131 > f && "x" === d.size && (d.size = "l"),
                i + "_" + d.number + "_" + d.size + ".jpg"
        https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png,f_auto,fl_lossy/v1/img/857/22874/8045814_1_l.jpg
        https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png/v1/img/857/22874/8045814_1_x.jpg
        */
/*https://liveauctioneers-res.cloudinary.com/image/upload/d_awaiting_image.png,f_auto,fl_lossy/v1/img/2058/47695/21908108_7_x.jpg
https://liveauctioneers-res.cloudinary.com/image/upload/c_scale,d_awaiting_image.png,f_auto,fl_lossy,w_300/v1/img/227/35110/14439264_2_x.jpg
{lot_id: 14439264, cat_id: 35110, house_id: 227, lot_num: "0844",…}
    let defAI = Object.assign({},{auction_id:auctionId,external_id:data.auExternalId.toString()},
        this.pasrseHtml(data.body));

    this.db.auctionItems.save(defAI)
    //console.log('html => ',this.pasrseHtml(html));
    
    */
    });
    
  };

  private loadUrl(url:string) {

    return new Promise(
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {

        var extServerOptions = {
          host: 'new.liveauctioneers.com',
          port: '80',
          path: url,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
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

  private pasrseHtml = (html) => {
    //console.log(html.length)
    let $ = cheerio.load(html);

    let ret = {image_url:'',
      extra_images_url:null,
      title:null,
      info:null,
      current_bid:null,
      current_max_bidder:null};

    //Image
    $('img[width="500"]').filter(function () {

      let data = $(this);
      if (data.attr('src'))
        ret.image_url = 'http://ambrosebauer.com' + data.attr('src');
    });

    // Extra Images
    ret.extra_images_url = $('img[height="170"]').map(function(i, el) {
      // this === el
      return 'http://ambrosebauer.com' + $(this).attr('src');
    }).get()
      .filter(function(url){
          return (url.indexOf('/grey.gif') === -1 );
        }
      ).join();

    //Title
    $('table[width="500"] p font[color="#400000"]').filter(function () {
      var data = $(this);
      ret.title = data.text();
    });

    //Desc
    $('table[width="500"] font p[align="justify"]').filter(function () {
      var data = $(this);
      ret.info = (data.text()).trim();
    });

    //current_max_bidder
    $('form[action="/lotdetail.php"] td[width="91"]').filter(function () {
      var data = $(this);
      ret.current_bid = data.text().replace('$', '');
      ret.current_max_bidder = (data.next().text()).trim();
    });

    return ret;
  };

}
