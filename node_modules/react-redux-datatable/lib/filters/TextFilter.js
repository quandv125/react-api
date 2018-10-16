'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ColumnFilter2 = require('./ColumnFilter');

var _ColumnFilter3 = _interopRequireDefault(_ColumnFilter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Text Filter
 *
 * A class providing supporting operations to a text
 * filter, extending the column filter base class.
 */
var TextFilter = function (_ColumnFilter) {
  _inherits(TextFilter, _ColumnFilter);

  function TextFilter() {
    _classCallCheck(this, TextFilter);

    return _possibleConstructorReturn(this, (TextFilter.__proto__ || Object.getPrototypeOf(TextFilter)).apply(this, arguments));
  }

  return TextFilter;
}(_ColumnFilter3.default);

exports.default = TextFilter;