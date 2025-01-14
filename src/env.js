export const API_KEY = `AIzaSyAq5JWXFoyd20YjaW67EWpd8kRcngrqMyY`
 
export const  valueConverter = (a) => {
    if(a>1000000000){
        return  Math.floor(a/1000000000) +"B"
    }
    else if (a > 1000000) {
      return Math.floor(a / 1000000) + "M";
    } else if (a > 1000) {
      return Math.floor(a / 1000) + "k";
    }
    return a; 
  };
  

const myPromise = new ProgressEvent((resolve,reject)=>{
    const food = true ;
    if(food){
        return "yay! my food is here"
    }else{
        return "Sorry we are out of bread "
    }
})