export default class Util {
  static isNull(value) {
    return value === null
  }

  static isNullOrUndefined(value) {
    return this.isNull(value) || value === undefined
  }

  static isNullOrUndefinedOrEmpty(value) {
    return this.isNullOrUndefined(value) || value === ''
  }
}
