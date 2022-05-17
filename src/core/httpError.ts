class HttpError extends Error {
  msg: string
  code: number
  errorCode: number
  constructor(msg: string, code: number, errorCode: number) {
    super()
    this.msg = msg
    this.code = code
    this.errorCode = errorCode
  }
}

export default HttpError