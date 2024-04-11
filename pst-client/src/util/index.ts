export const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export function objToQueryParamsStr(params: any) {
  let str = '?'
  Object.keys(params).forEach((key) => {
    if (str.slice(-1) !== '?') {
      str += '&'
    }
    if (!params[key]) return
    if (typeof params[key] === 'object') {
      if (key !== 'sort') {
        if (params[key].title) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          str += `${key}=${params[key].value}`
        } else {
          str += params[key].map((el: string, idx: string) => `${key}[${idx}]=${el}`).join('&')
        }
      } else {
        // BE supports multiple sort values, but UI provides the possibility
        // to sort after one value, that is why we get only the first sort value
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        str += `sort.field=${params[key].field}&sort.dir=${params[key].dir}`
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      str += `${key}=${params[key]}`
    }
  })
  return str
}
