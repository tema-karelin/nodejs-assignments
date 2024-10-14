class CLIColors {
  constructor() {
    this.colors = {
      black: {foreground: 30, background: 40, },
      red: {foreground: 31, background: 41, },
      green: {foreground: 32, background: 42, },
      yellow: {foreground: 33, background: 43, },
      blue: {foreground: 34, background: 44, },
      magenta: {foreground: 35, background: 45, },
      cyan: {foreground: 36, background: 46, },
      white: {foreground: 37, background: 47, },
      br_black: {foreground: 90, background: 100, },
      br_red: {foreground: 91, background: 101, },
      br_green: {foreground: 92, background: 102, },
      br_yellow: {foreground: 93, background: 103, },
      br_blue: {foreground: 94, background: 104, },
      br_magenta: {foreground: 95, background: 105, },
      br_cyan: {foreground: 96, background: 106, },
      br_white: {foreground: 97, background: 107, },
    };
    for (const key in this.colors) {
      this[key] = (msg) => '\x1b[' + this.colors[key].foreground + 'm' + msg + '\x1b[0m';
      this['bg_' + key] = (msg) => '\x1b[' + this.colors[key].background + 'm' + msg + '\x1b[0m';
    }
  }
  colorize(color, message) {
    let colorCode;
    if (color.search(/^bg_/) !== 0) {
      colorCode = `\x1b[${this.colors[color].foreground}m`;
    } else {
      colorCode = `\x1b[${this.colors[color.slice(3)].background}m`;
    }
    return colorCode + message + '\x1b[0m';
  }

  // black(msg) { this._colorize('black', msg) }
  // red(msg) { this._colorize('red', msg) }
  // green(msg) { this._colorize('green', msg) }
  // yellow(msg) { this._colorize('yellow', msg) }
  // blue(msg) { this._colorize('blue', msg) }
  // magenta(msg) { this._colorize('magenta', msg) }
  // cyan(msg) { this._colorize('cyan', msg) }
  // white(msg) { this._colorize('white', msg) }
  // br_black(msg) { this._colorize('br_black', msg) }
  // br_red(msg) { this._colorize('br_red', msg) }
  // br_green(msg) { this._colorize('br_green', msg) }
  // br_yellow(msg) { this._colorize('br_yellow', msg) }
  // br_blue(msg) { this._colorize('br_blue', msg) }
  // br_magenta(msg) { this._colorize('br_magenta', msg) }
  // br_cyan(msg) { this._colorize('br_cyan', msg) }
  // br_white(msg) { this._colorize('br_white', msg) }
  
  
}

export const CLI_color = new CLIColors();