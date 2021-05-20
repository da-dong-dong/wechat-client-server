export const timestampToTime = (timestamp, format = 'y-m-d h:m:s') => {
if (!timestamp) return ''
let date = timestamp
var Y = date.getFullYear() + '-'
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

format = format.toLocaleLowerCase()

if (format === 'y-m-d h:m:s') {
    return Y + M + D + h + m + s
}
return Y + M + D
}
  