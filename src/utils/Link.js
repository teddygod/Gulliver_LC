export default
class Link {
  static to(source, path) {
    return new Link(source, path);
  }

  constructor(source, path) {
    this.source = source;
    this.path = path;
  }

  value() {
    const elems = this.path.split('.');
    const state = elems[0];
    const ref = elems[1];

    return this.source[state][ref];
  }

  action(value) {
    const elems = this.path.split('.');
    const state = elems[0];
    const ref = elems[1];

    this.source[state][ref] = value;
  }
}
