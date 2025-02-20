export const convertDegreesToDirection = function(deg:number):string {
    let val = Math.floor( (deg/22.5) + 0.5 );
    let arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[ (val % 16) ]
}