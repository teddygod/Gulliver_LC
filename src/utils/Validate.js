export default
class Validate {
  static notEmpty(value) {
    return (value != null && value != '');
  }

  static equals(value1, value2) {
    return (value1 == value2);
  }

  static email(value) {
    return (value.includes('@') && value.includes('.'));
  }

  static length(value) {
    return value.length > 0;
  }

  static className(target, prop) {
    return target.state.valid[prop] === 0 ? 'invalid' : '';
  }


  static props(target, props) {
    return new Validate(target, props);
  }

  constructor(target, props) {
    this.target = target;
    this.props = props;
  }

  action(request) {
    const valid = this.group(request, this.props);
    const status = this.noErrors(valid);

    this.target.setState({ valid: valid });
    return status;
  }

  group(obj, program) {
    let result = {};

    for (let i in program) {
      switch (i) {
        case 'presence':
          for (let f of program[i]) {
            if (result[f] == null) { result[f] = 1; }
            result[f] = result[f] & Validate.notEmpty(obj[f]);

            if (Validate.notEmpty(obj[f]) == 0) {
              console.log(f);
            }
          }
          break;

        case 'equals':
          const f1 = program[i][0];
          const f2 = program[i][1];
          const ev = Validate.equals(obj[f1], obj[f2]);

          if (result[f1] == null) { result[f1] = 1; }
          if (result[f2] == null) { result[f2] = 1; }

          result[f1] = result[f1] & ev;
          result[f2] = result[f2] & ev;

          break;

        case 'email':
          for (let f of program[i]) {
            if (result[f] == null) { result[f] = 1; }
            result[f] = result[f] & Validate.email(obj[f]);
          }

          break;

        case 'length':
          for (let f of program[i]) {
            if (result[f] == null) { result[f] = 1; }
            result[f] = result[f] & Validate.length(obj[f]);
          }

          break;
      }
    }

    return result;
  }

  noErrors(items) {
    var result = 1;

    for (let i in items) {
      result = result & items[i];
    }

    return result == 1;
  }
};
