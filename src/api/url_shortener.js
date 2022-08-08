import request from '@/utils/request'

export function shortenUrl(data) {
  return request({
    url: '/shorten',
    method: 'post',
    data
  })
}

export function retrieveLongUrl(alias) {
  return request({
    url: `/shorten/${alias}`,
    method: 'get'
  })
}
