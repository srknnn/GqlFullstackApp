export class DateHelper{

  public static getFullHourString(date:Date):string{
   if(date.toString()== 'Invalid Date'){
       return ""
   }

    const hour:string=date.getHours()==0?"00":date.getHours().toString();
    const minute:string=date.getMinutes()==0?"00":date.getMinutes().toString();
    const second:string=date.getSeconds()==0?"00":date.getSeconds().toString();
    
    return hour+":"+minute+":"+second
  }  

}