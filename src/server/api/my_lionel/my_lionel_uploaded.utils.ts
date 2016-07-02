import dbProvider = require('../../db');
import fs = require('fs');

export class MyLionelUploadedUtils {

  private db:any = dbProvider.db;

  constructor() {}

  public static rawImages = ():Array<string> => {     
        
        let dir = __dirname + '/../../img/my_lionel/';
        
        return fs.readdirSync(dir)
              .map(function(v) { 
                  return { name:v,
                           time:fs.statSync(dir + v).mtime.getTime()
                         }; 
               })
               .sort(function(a, b) { return a.time - b.time; })
               .map(function(v) { return v.name; });
               
  }
}