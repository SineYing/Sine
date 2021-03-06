/**
 * Created by tiny on 11/20/16.
 */

/**
 * 生成请求参数串
 * @param param
 * @returns {*}
 */
import {hex_md5} from './md5.js'
export function genLinkedParam (param) {
  var linkedParam
  var arrayParam = []
  var i = 0
  for (var e in param) {
    if (typeof param[e] == 'object' || String(param[e]) == "" || String(param[e]) == "null") {
      continue
    }
    arrayParam[i] = e+"="+String(param[e])
    i++
  }
  arrayParam.sort();
  for (var j=0; j < arrayParam.length; j++) {
    if (j ==0) {
      linkedParam = arrayParam[j]
    } else {
      linkedParam = linkedParam + "&" + arrayParam[j]
    }
  }
  return linkedParam
 }

/**
 * 生成加签请求参数
 * @param param
 */
export function genJsonRequest (param) {
  // var token = localStorage.getItem('token')
  // var access_token = localStorage.getItem('access_token')
  var token = "NGfL3uCe5XcTMnd6gqOqrhz"
  var access_token = 'AVMhH2prBB3Q4S5Uh9vRwz'
  var app = localStorage.getItem('app')
  param['time'] = new Date().getTime()
  param['token'] = token
  param['access_token'] = access_token
  delete param.sign
  var linkedParam = genLinkedParam(param)
  var sign = hex_md5(linkedParam)
  delete param.token
  param['sign'] = sign
  return JSON.stringify(param)
}
export function genJsonRequestToken (param) {
  param['time'] = new Date().getTime()
  delete param.sign
  var linkedParam = genLinkedParam(param)
  var sign = hex_md5(linkedParam)
  delete param.token
  param['sign'] = sign
  return JSON.stringify(param)
}
