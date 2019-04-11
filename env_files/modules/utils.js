class Utils {
  constructor() {
    this.shellColors = {
      reset: '\u001b[0m',
      msg: '\u001b[36m',
    };
  }

  emShellMsg(st) {
    return `${this.shellColors.msg}(^0^)/ ${st} !!${this.shellColors.reset}`;
  }
}

export default Utils;
