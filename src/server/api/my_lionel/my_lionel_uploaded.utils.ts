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
               //.sort(function(a, b) { return a.time - b.time; })
               .sort((a,b) => {
                  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
               })
               .map(function(v) { return v.name; });
               
  }
}