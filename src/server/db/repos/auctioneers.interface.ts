export interface IAuctioneer {
  id:number,
  name:string,
  info?:string,
  active:boolean,
  url:string,
  item_url_pattern:string,
  auction_url_pattern:string
}
