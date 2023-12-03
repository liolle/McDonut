export class IdGenerator {
  public static USER_ID = 5
  public static HISTORIC_ID = 5

  public static generate(flavour: number): string {
    const crypto = require('crypto')
    return crypto.randomBytes(flavour).toString('hex')
  }
}
