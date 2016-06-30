import * as http from 'http'
import * as request from 'request'

import * as cheerio from 'cheerio';

import dbProvider = require('../../db');

export class AmbrosebauerUtil {

  private db:any = dbProvider.db;

  constructor() {}

  public parserSite = (auctionId:number, from:number, to:number) => {
    return this.db.auctions.find(auctionId).then(auction => {

      if(auction.length > 0)
        return this.parse('', auction[0].external_id, from, to, auctionId);
      else
        return null;
    })
  };

  private parse = (urlPattern:string, externalId:string, from:number, to:number, auctionId:number) => {

    return Promise.resolve()
      .then(() => {

        let ret = [];

        for(let i=from; i<=to; i++){

          let url = `http://ambrosebauer.com/lotdetail.php?auction=${externalId}&lot=${i}`;

          this.loadUrl(url, i).then( data => {

            let defAI = Object.assign({},{auction_id:auctionId,external_id:data.auExternalId.toString()},
              this.pasrseHtml(data.body));

            this.db.auctionItems.save(defAI)
            //console.log('html => ',this.pasrseHtml(html));
          });
          ret.push(i);
        }

        return ret;
      });
  };

  private loadUrl(url:string, auExternalId:number) {

    return new Promise(
      (resolve:(data:any)=>void, reject:(str:string)=>void) => {

        var extServerOptions = {
          host: 'ambrosebauer.com',
          port: '80',
          path: url,
          method: 'GET'
        };

        request({uri: url}, (err: Error, message: http.IncomingMessage, body: string) => {
          if (!err) {

            if (message.statusCode < 400 )
              resolve({body:body,auExternalId:auExternalId});
          }
          else {

          }
        });

        /*
        http.request(extServerOptions, (res) => {

          res.setEncoding('utf8');
          res.on('data', (data) => {
          */
/*            console.log('====')
            console.log(res.statusCode)
            console.log(url,data.length)
            console.log('^^^^')*/
            /*resolve(data);
          });
        }).end();
*/
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
