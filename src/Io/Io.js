const fs = require("fs").promises;

class Io {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }
  async write(data) {
    await fs.writeFile(this.#dir, JSON.stringify(data, null, 2));
  }

  async read() {
    const data = await fs.readFile(this.#dir, "utf-8");
    return data.length ? JSON.parse(data) : [];
  }
}

module.exports = Io;
