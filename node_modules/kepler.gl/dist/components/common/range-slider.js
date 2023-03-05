"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RangeSliderFactory;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _reselect = require("reselect");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rangePlot = _interopRequireDefault(require("./range-plot"));

var _slider = _interopRequireDefault(require("./slider/slider"));

var _styledComponents2 = require("./styled-components");

var _dataUtils = require("../../utils/data-utils");

var _observeDimensions = require("../../utils/observe-dimensions");

var _templateObject, _templateObject2, _templateObject3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SliderInput = (0, _styledComponents["default"])(_styledComponents2.Input)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  width: ", "px;\n  margin-left: ", "px;\n  font-size: ", "; // 10px // 12px;\n  padding: ", "; // 4px 6px; // 6px 12px;\n"])), function (props) {
  return props.theme.sliderInputWidth;
}, function (props) {
  return props.flush ? 0 : props.size === 'tiny' ? 12 : 18;
}, function (props) {
  return props.theme.sliderInputFontSize;
}, function (props) {
  return props.theme.sliderInputPadding;
});

var SliderWrapper = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  position: relative;\n  align-items: ", ";\n"])), function (props) {
  return !props.isRanged && props.showInput ? 'center' : 'flex-start';
});

var RangeInputWrapper = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n"])));

RangeSliderFactory.deps = [_rangePlot["default"]];

function RangeSliderFactory(RangePlot) {
  var RangeSlider = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(RangeSlider, _Component);

    var _super = _createSuper(RangeSlider);

    function RangeSlider() {
      var _this;

      (0, _classCallCheck2["default"])(this, RangeSlider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        value0: 0,
        value1: 1,
        prevValue0: 0,
        prevValue1: 1,
        width: 288
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "sliderContainer", null);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setSliderContainer", function (element) {
        _this.sliderContainer = element;

        _this._resize();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputValue0", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputValue1", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "value0Selector", function (props) {
        return props.value0;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "value1Selector", function (props) {
        return props.value1;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterValueSelector", (0, _reselect.createSelector)(_this.value0Selector, _this.value1Selector, function (value0, value1) {
        return [value0, value1];
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_roundValToStep", function (val) {
        var _this$props = _this.props,
            range = _this$props.range,
            step = _this$props.step;
        return (0, _dataUtils.roundValToStep)(range[0], step, val);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal1", function (val) {
        var _this$props2 = _this.props,
            value0 = _this$props2.value0,
            range = _this$props2.range,
            onChange = _this$props2.onChange;
        var val1 = Number(val);
        onChange([value0, (0, _dataUtils.clamp)([value0, range[1]], _this._roundValToStep(val1))]);
        return true;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal0", function (val) {
        var _this$props3 = _this.props,
            value1 = _this$props3.value1,
            range = _this$props3.range,
            onChange = _this$props3.onChange;
        var val0 = Number(val);
        onChange([(0, _dataUtils.clamp)([range[0], value1], _this._roundValToStep(val0)), value1]);
        return true;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_resize", function () {
        if (_this.sliderContainer) {
          var width = _this.sliderContainer.offsetWidth;

          if (width !== _this.state.width) {
            _this.setState({
              width: width
            });
          }
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChangeInput", function (key, e) {
        _this.setState((0, _defineProperty2["default"])({}, key, e.target.value));
      });
      return _this;
    }

    (0, _createClass2["default"])(RangeSlider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.sliderContainer instanceof Element) {
          (0, _observeDimensions.observeDimensions)(this.sliderContainer, this._resize);
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this._resize();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.sliderContainer instanceof Element) {
          (0, _observeDimensions.unobserveDimensions)(this.sliderContainer);
        }
      }
    }, {
      key: "_renderInput",
      value: function _renderInput(key) {
        var _this2 = this;

        var setRange = key === 'value0' ? this._setRangeVal0 : this._setRangeVal1;
        var ref = key === 'value0' ? this.inputValue0 : this.inputValue1;

        var update = function update(e) {
          if (!setRange(e.target.value)) {
            _this2.setState((0, _defineProperty2["default"])({}, key, _this2.state[key]));
          }
        };

        var onChange = this._onChangeInput.bind(this, key);

        return /*#__PURE__*/_react["default"].createElement(SliderInput, {
          className: "kg-range-slider__input",
          type: "number",
          ref: ref,
          id: "slider-input-".concat(key),
          key: key,
          value: this.state[key],
          onChange: onChange,
          onKeyPress: function onKeyPress(e) {
            if (e.key === 'Enter') {
              update(e);
              ref.current.blur();
            }
          },
          onBlur: update,
          flush: key === 'value0',
          size: this.props.inputSize,
          secondary: this.props.inputTheme === 'secondary'
        });
      } // eslint-disable-next-line complexity

    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            isRanged = _this$props4.isRanged,
            showInput = _this$props4.showInput,
            histogram = _this$props4.histogram,
            lineChart = _this$props4.lineChart,
            range = _this$props4.range,
            onChange = _this$props4.onChange,
            sliderHandleWidth = _this$props4.sliderHandleWidth,
            step = _this$props4.step,
            timezone = _this$props4.timezone,
            timeFormat = _this$props4.timeFormat,
            playbackControlWidth = _this$props4.playbackControlWidth;
        var width = this.state.width;
        var plotWidth = Math.max(width - sliderHandleWidth, 0);
        var renderPlot = histogram && histogram.length || lineChart;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "kg-range-slider",
          style: {
            width: '100%',
            padding: "0 ".concat(sliderHandleWidth / 2, "px")
          },
          ref: this.setSliderContainer
        }, Array.isArray(range) && range.every(Number.isFinite) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderPlot ? /*#__PURE__*/_react["default"].createElement(RangePlot, {
          histogram: histogram,
          lineChart: this.props.lineChart,
          plotType: this.props.plotType,
          isEnlarged: this.props.isEnlarged,
          onBrush: function onBrush(val0, val1) {
            return onChange([val0, val1]);
          },
          marks: this.props.marks,
          range: range,
          value: this.props.plotValue || this.filterValueSelector(this.props),
          width: plotWidth,
          isRanged: isRanged,
          step: step,
          timezone: timezone,
          timeFormat: timeFormat,
          playbackControlWidth: playbackControlWidth
        }) : null, /*#__PURE__*/_react["default"].createElement(SliderWrapper, {
          className: "kg-range-slider__slider",
          isRanged: isRanged,
          showInput: showInput
        }, this.props.xAxis ? /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            height: '30px'
          }
        }, /*#__PURE__*/_react["default"].createElement(this.props.xAxis, {
          width: plotWidth,
          timezone: timezone,
          domain: range,
          isEnlarged: this.props.isEnlarged
        })) : null, /*#__PURE__*/_react["default"].createElement(_slider["default"], {
          marks: this.props.marks,
          showValues: false,
          isRanged: isRanged,
          minValue: range[0],
          maxValue: range[1],
          value0: this.props.value0,
          value1: this.props.value1,
          step: step,
          handleWidth: sliderHandleWidth,
          onSlider0Change: this._setRangeVal0,
          onSlider1Change: this._setRangeVal1,
          onSliderBarChange: function onSliderBarChange(val0, val1) {
            onChange([val0, val1]);
          },
          enableBarDrag: true
        }), !isRanged && showInput ? this._renderInput('value1') : null), isRanged && showInput ? /*#__PURE__*/_react["default"].createElement(RangeInputWrapper, {
          className: "range-slider__input-group"
        }, this._renderInput('value0'), this._renderInput('value1')) : null));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var update = null;
        var value0 = props.value0,
            value1 = props.value1;

        if (props.value0 !== state.prevValue0 && !isNaN(value0)) {
          update = _objectSpread(_objectSpread({}, update || {}), {}, {
            value0: value0,
            prevValue0: value0
          });
        }

        if (props.value1 !== state.prevValue1 && !isNaN(value1)) {
          update = _objectSpread(_objectSpread({}, update || {}), {}, {
            value1: value1,
            prevValue1: value1
          });
        }

        return update;
      }
    }]);
    return RangeSlider;
  }(_react.Component);

  (0, _defineProperty2["default"])(RangeSlider, "propTypes", {
    range: _propTypes["default"].arrayOf(_propTypes["default"].number),
    value0: _propTypes["default"].number.isRequired,
    value1: _propTypes["default"].number.isRequired,
    onChange: _propTypes["default"].func.isRequired,
    histogram: _propTypes["default"].arrayOf(_propTypes["default"].any),
    isRanged: _propTypes["default"].bool,
    isEnlarged: _propTypes["default"].bool,
    showInput: _propTypes["default"].bool,
    inputTheme: _propTypes["default"].string,
    inputSize: _propTypes["default"].string,
    step: _propTypes["default"].number,
    sliderHandleWidth: _propTypes["default"].number,
    xAxis: _propTypes["default"].elementType
  });
  (0, _defineProperty2["default"])(RangeSlider, "defaultProps", {
    isEnlarged: false,
    isRanged: true,
    showInput: true,
    sliderHandleWidth: 12,
    inputTheme: '',
    inputSize: 'small',
    onChange: function onChange() {}
  });
  (0, _reactLifecyclesCompat.polyfill)(RangeSlider);
  return RangeSlider;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dFdpZHRoIiwiZmx1c2giLCJzaXplIiwic2xpZGVySW5wdXRGb250U2l6ZSIsInNsaWRlcklucHV0UGFkZGluZyIsIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJpc1JhbmdlZCIsInNob3dJbnB1dCIsIlJhbmdlSW5wdXRXcmFwcGVyIiwiUmFuZ2VTbGlkZXJGYWN0b3J5IiwiZGVwcyIsIlJhbmdlUGxvdEZhY3RvcnkiLCJSYW5nZVBsb3QiLCJSYW5nZVNsaWRlciIsInZhbHVlMCIsInZhbHVlMSIsInByZXZWYWx1ZTAiLCJwcmV2VmFsdWUxIiwid2lkdGgiLCJlbGVtZW50Iiwic2xpZGVyQ29udGFpbmVyIiwiX3Jlc2l6ZSIsInZhbHVlMFNlbGVjdG9yIiwidmFsdWUxU2VsZWN0b3IiLCJ2YWwiLCJyYW5nZSIsInN0ZXAiLCJvbkNoYW5nZSIsInZhbDEiLCJOdW1iZXIiLCJfcm91bmRWYWxUb1N0ZXAiLCJ2YWwwIiwib2Zmc2V0V2lkdGgiLCJzdGF0ZSIsInNldFN0YXRlIiwia2V5IiwiZSIsInRhcmdldCIsInZhbHVlIiwiRWxlbWVudCIsInNldFJhbmdlIiwiX3NldFJhbmdlVmFsMCIsIl9zZXRSYW5nZVZhbDEiLCJyZWYiLCJpbnB1dFZhbHVlMCIsImlucHV0VmFsdWUxIiwidXBkYXRlIiwiX29uQ2hhbmdlSW5wdXQiLCJiaW5kIiwiY3VycmVudCIsImJsdXIiLCJpbnB1dFNpemUiLCJpbnB1dFRoZW1lIiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0Iiwic2xpZGVySGFuZGxlV2lkdGgiLCJ0aW1lem9uZSIsInRpbWVGb3JtYXQiLCJwbGF5YmFja0NvbnRyb2xXaWR0aCIsInBsb3RXaWR0aCIsIk1hdGgiLCJtYXgiLCJyZW5kZXJQbG90IiwibGVuZ3RoIiwicGFkZGluZyIsInNldFNsaWRlckNvbnRhaW5lciIsIkFycmF5IiwiaXNBcnJheSIsImV2ZXJ5IiwiaXNGaW5pdGUiLCJwbG90VHlwZSIsImlzRW5sYXJnZWQiLCJtYXJrcyIsInBsb3RWYWx1ZSIsImZpbHRlclZhbHVlU2VsZWN0b3IiLCJ4QXhpcyIsImhlaWdodCIsIl9yZW5kZXJJbnB1dCIsImlzTmFOIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYW55IiwiYm9vbCIsInN0cmluZyIsImVsZW1lbnRUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBRyxrQ0FBT0Msd0JBQVAsQ0FBSCxtTkFDTixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGdCQUFoQjtBQUFBLENBREMsRUFFQSxVQUFBRixLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDRyxLQUFOLEdBQWMsQ0FBZCxHQUFrQkgsS0FBSyxDQUFDSSxJQUFOLEtBQWUsTUFBZixHQUF3QixFQUF4QixHQUE2QixFQUFwRDtBQUFBLENBRkwsRUFHRixVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlJLG1CQUFoQjtBQUFBLENBSEgsRUFJSixVQUFBTCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlLLGtCQUFoQjtBQUFBLENBSkQsQ0FBakI7O0FBT0EsSUFBTUMsYUFBYSxHQUFHQyw2QkFBT0MsR0FBViwwSkFHRixVQUFBVCxLQUFLO0FBQUEsU0FBSyxDQUFDQSxLQUFLLENBQUNVLFFBQVAsSUFBbUJWLEtBQUssQ0FBQ1csU0FBekIsR0FBcUMsUUFBckMsR0FBZ0QsWUFBckQ7QUFBQSxDQUhILENBQW5COztB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QUFFeUIsc0JBQVVFLE1BWlo7QUFhakJQLElBQUFBLEtBQUssRUFBRUssc0JBQVVRO0FBYkEsR0FGK0I7QUFBQSxtQ0FDOUMzRSxXQUQ4QyxrQkFrQjVCO0FBQ3BCMEQsSUFBQUEsVUFBVSxFQUFFLEtBRFE7QUFFcEJqRSxJQUFBQSxRQUFRLEVBQUUsSUFGVTtBQUdwQkMsSUFBQUEsU0FBUyxFQUFFLElBSFM7QUFJcEJnRCxJQUFBQSxpQkFBaUIsRUFBRSxFQUpDO0FBS3BCSCxJQUFBQSxVQUFVLEVBQUUsRUFMUTtBQU1wQkQsSUFBQUEsU0FBUyxFQUFFLE9BTlM7QUFPcEJ4QixJQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRTtBQVBFLEdBbEI0QjtBQThPcEQsdUNBQVNkLFdBQVQ7QUFFQSxTQUFPQSxXQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIGNyZWF0ZVJlZn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtwb2x5ZmlsbH0gZnJvbSAncmVhY3QtbGlmZWN5Y2xlcy1jb21wYXQnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJhbmdlUGxvdEZhY3RvcnkgZnJvbSAnLi9yYW5nZS1wbG90JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0lucHV0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7cm91bmRWYWxUb1N0ZXAsIGNsYW1wfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCB7b2JzZXJ2ZURpbWVuc2lvbnMsIHVub2JzZXJ2ZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL3V0aWxzL29ic2VydmUtZGltZW5zaW9ucyc7XG5cbmNvbnN0IFNsaWRlcklucHV0ID0gc3R5bGVkKElucHV0KWBcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySW5wdXRXaWR0aH1weDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gKHByb3BzLmZsdXNoID8gMCA6IHByb3BzLnNpemUgPT09ICd0aW55JyA/IDEyIDogMTgpfXB4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySW5wdXRGb250U2l6ZX07IC8vIDEwcHggLy8gMTJweDtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJJbnB1dFBhZGRpbmd9OyAvLyA0cHggNnB4OyAvLyA2cHggMTJweDtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGFsaWduLWl0ZW1zOiAke3Byb3BzID0+ICghcHJvcHMuaXNSYW5nZWQgJiYgcHJvcHMuc2hvd0lucHV0ID8gJ2NlbnRlcicgOiAnZmxleC1zdGFydCcpfTtcbmA7XG5cbmNvbnN0IFJhbmdlSW5wdXRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuUmFuZ2VTbGlkZXJGYWN0b3J5LmRlcHMgPSBbUmFuZ2VQbG90RmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJhbmdlU2xpZGVyRmFjdG9yeShSYW5nZVBsb3QpIHtcbiAgY2xhc3MgUmFuZ2VTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICByYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gICAgICB2YWx1ZTA6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIHZhbHVlMTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBoaXN0b2dyYW06IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBzaG93SW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGlucHV0U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBzbGlkZXJIYW5kbGVXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHhBeGlzOiBQcm9wVHlwZXMuZWxlbWVudFR5cGVcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGlzRW5sYXJnZWQ6IGZhbHNlLFxuICAgICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgICBzaG93SW5wdXQ6IHRydWUsXG4gICAgICBzbGlkZXJIYW5kbGVXaWR0aDogMTIsXG4gICAgICBpbnB1dFRoZW1lOiAnJyxcbiAgICAgIGlucHV0U2l6ZTogJ3NtYWxsJyxcbiAgICAgIG9uQ2hhbmdlOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgICAgbGV0IHVwZGF0ZSA9IG51bGw7XG4gICAgICBjb25zdCB7dmFsdWUwLCB2YWx1ZTF9ID0gcHJvcHM7XG4gICAgICBpZiAocHJvcHMudmFsdWUwICE9PSBzdGF0ZS5wcmV2VmFsdWUwICYmICFpc05hTih2YWx1ZTApKSB7XG4gICAgICAgIHVwZGF0ZSA9IHsuLi4odXBkYXRlIHx8IHt9KSwgdmFsdWUwLCBwcmV2VmFsdWUwOiB2YWx1ZTB9O1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzLnZhbHVlMSAhPT0gc3RhdGUucHJldlZhbHVlMSAmJiAhaXNOYU4odmFsdWUxKSkge1xuICAgICAgICB1cGRhdGUgPSB7Li4uKHVwZGF0ZSB8fCB7fSksIHZhbHVlMSwgcHJldlZhbHVlMTogdmFsdWUxfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICB2YWx1ZTA6IDAsXG4gICAgICB2YWx1ZTE6IDEsXG4gICAgICBwcmV2VmFsdWUwOiAwLFxuICAgICAgcHJldlZhbHVlMTogMSxcbiAgICAgIHdpZHRoOiAyODhcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5zbGlkZXJDb250YWluZXIgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVEaW1lbnNpb25zKHRoaXMuc2xpZGVyQ29udGFpbmVyLCB0aGlzLl9yZXNpemUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuc2xpZGVyQ29udGFpbmVyIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICB1bm9ic2VydmVEaW1lbnNpb25zKHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzbGlkZXJDb250YWluZXIgPSBudWxsO1xuICAgIHNldFNsaWRlckNvbnRhaW5lciA9IGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSBlbGVtZW50O1xuICAgICAgdGhpcy5fcmVzaXplKCk7XG4gICAgfTtcbiAgICBpbnB1dFZhbHVlMCA9IGNyZWF0ZVJlZigpO1xuICAgIGlucHV0VmFsdWUxID0gY3JlYXRlUmVmKCk7XG4gICAgdmFsdWUwU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy52YWx1ZTA7XG4gICAgdmFsdWUxU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy52YWx1ZTE7XG4gICAgZmlsdGVyVmFsdWVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy52YWx1ZTBTZWxlY3RvcixcbiAgICAgIHRoaXMudmFsdWUxU2VsZWN0b3IsXG4gICAgICAodmFsdWUwLCB2YWx1ZTEpID0+IFt2YWx1ZTAsIHZhbHVlMV1cbiAgICApO1xuXG4gICAgX3JvdW5kVmFsVG9TdGVwID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHtyYW5nZSwgc3RlcH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gcm91bmRWYWxUb1N0ZXAocmFuZ2VbMF0sIHN0ZXAsIHZhbCk7XG4gICAgfTtcblxuICAgIF9zZXRSYW5nZVZhbDEgPSB2YWwgPT4ge1xuICAgICAgY29uc3Qge3ZhbHVlMCwgcmFuZ2UsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB2YWwxID0gTnVtYmVyKHZhbCk7XG4gICAgICBvbkNoYW5nZShbdmFsdWUwLCBjbGFtcChbdmFsdWUwLCByYW5nZVsxXV0sIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDEpKV0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9zZXRSYW5nZVZhbDAgPSB2YWwgPT4ge1xuICAgICAgY29uc3Qge3ZhbHVlMSwgcmFuZ2UsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB2YWwwID0gTnVtYmVyKHZhbCk7XG4gICAgICBvbkNoYW5nZShbY2xhbXAoW3JhbmdlWzBdLCB2YWx1ZTFdLCB0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwwKSksIHZhbHVlMV0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9yZXNpemUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zbGlkZXJDb250YWluZXIpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLnNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgICAgaWYgKHdpZHRoICE9PSB0aGlzLnN0YXRlLndpZHRoKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGh9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfb25DaGFuZ2VJbnB1dCA9IChrZXksIGUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiBlLnRhcmdldC52YWx1ZX0pO1xuICAgIH07XG5cbiAgICBfcmVuZGVySW5wdXQoa2V5KSB7XG4gICAgICBjb25zdCBzZXRSYW5nZSA9IGtleSA9PT0gJ3ZhbHVlMCcgPyB0aGlzLl9zZXRSYW5nZVZhbDAgOiB0aGlzLl9zZXRSYW5nZVZhbDE7XG4gICAgICBjb25zdCByZWYgPSBrZXkgPT09ICd2YWx1ZTAnID8gdGhpcy5pbnB1dFZhbHVlMCA6IHRoaXMuaW5wdXRWYWx1ZTE7XG4gICAgICBjb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgICAgICAgaWYgKCFzZXRSYW5nZShlLnRhcmdldC52YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtba2V5XTogdGhpcy5zdGF0ZVtrZXldfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ2hhbmdlID0gdGhpcy5fb25DaGFuZ2VJbnB1dC5iaW5kKHRoaXMsIGtleSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faW5wdXRcIlxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGlkPXtgc2xpZGVyLWlucHV0LSR7a2V5fWB9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGVba2V5XX1cbiAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgb25LZXlQcmVzcz17ZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgdXBkYXRlKGUpO1xuICAgICAgICAgICAgICByZWYuY3VycmVudC5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkJsdXI9e3VwZGF0ZX1cbiAgICAgICAgICBmbHVzaD17a2V5ID09PSAndmFsdWUwJ31cbiAgICAgICAgICBzaXplPXt0aGlzLnByb3BzLmlucHV0U2l6ZX1cbiAgICAgICAgICBzZWNvbmRhcnk9e3RoaXMucHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSd9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpc1JhbmdlZCxcbiAgICAgICAgc2hvd0lucHV0LFxuICAgICAgICBoaXN0b2dyYW0sXG4gICAgICAgIGxpbmVDaGFydCxcbiAgICAgICAgcmFuZ2UsXG4gICAgICAgIG9uQ2hhbmdlLFxuICAgICAgICBzbGlkZXJIYW5kbGVXaWR0aCxcbiAgICAgICAgc3RlcCxcbiAgICAgICAgdGltZXpvbmUsXG4gICAgICAgIHRpbWVGb3JtYXQsXG4gICAgICAgIHBsYXliYWNrQ29udHJvbFdpZHRoXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBwbG90V2lkdGggPSBNYXRoLm1heCh3aWR0aCAtIHNsaWRlckhhbmRsZVdpZHRoLCAwKTtcbiAgICAgIGNvbnN0IHJlbmRlclBsb3QgPSAoaGlzdG9ncmFtICYmIGhpc3RvZ3JhbS5sZW5ndGgpIHx8IGxpbmVDaGFydDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIlxuICAgICAgICAgIHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgcGFkZGluZzogYDAgJHtzbGlkZXJIYW5kbGVXaWR0aCAvIDJ9cHhgfX1cbiAgICAgICAgICByZWY9e3RoaXMuc2V0U2xpZGVyQ29udGFpbmVyfVxuICAgICAgICA+XG4gICAgICAgICAge0FycmF5LmlzQXJyYXkocmFuZ2UpICYmIHJhbmdlLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge3JlbmRlclBsb3QgPyAoXG4gICAgICAgICAgICAgICAgPFJhbmdlUGxvdFxuICAgICAgICAgICAgICAgICAgaGlzdG9ncmFtPXtoaXN0b2dyYW19XG4gICAgICAgICAgICAgICAgICBsaW5lQ2hhcnQ9e3RoaXMucHJvcHMubGluZUNoYXJ0fVxuICAgICAgICAgICAgICAgICAgcGxvdFR5cGU9e3RoaXMucHJvcHMucGxvdFR5cGV9XG4gICAgICAgICAgICAgICAgICBpc0VubGFyZ2VkPXt0aGlzLnByb3BzLmlzRW5sYXJnZWR9XG4gICAgICAgICAgICAgICAgICBvbkJydXNoPXsodmFsMCwgdmFsMSkgPT4gb25DaGFuZ2UoW3ZhbDAsIHZhbDFdKX1cbiAgICAgICAgICAgICAgICAgIG1hcmtzPXt0aGlzLnByb3BzLm1hcmtzfVxuICAgICAgICAgICAgICAgICAgcmFuZ2U9e3JhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMucGxvdFZhbHVlIHx8IHRoaXMuZmlsdGVyVmFsdWVTZWxlY3Rvcih0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPXtwbG90V2lkdGh9XG4gICAgICAgICAgICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICAgICAgICAgICAgICBzdGVwPXtzdGVwfVxuICAgICAgICAgICAgICAgICAgdGltZXpvbmU9e3RpbWV6b25lfVxuICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdD17dGltZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgIHBsYXliYWNrQ29udHJvbFdpZHRoPXtwbGF5YmFja0NvbnRyb2xXaWR0aH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPFNsaWRlcldyYXBwZXJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX3NsaWRlclwiXG4gICAgICAgICAgICAgICAgaXNSYW5nZWQ9e2lzUmFuZ2VkfVxuICAgICAgICAgICAgICAgIHNob3dJbnB1dD17c2hvd0lucHV0fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMueEF4aXMgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnMzBweCd9fT5cbiAgICAgICAgICAgICAgICAgICAgPHRoaXMucHJvcHMueEF4aXNcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17cGxvdFdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgIHRpbWV6b25lPXt0aW1lem9uZX1cbiAgICAgICAgICAgICAgICAgICAgICBkb21haW49e3JhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRW5sYXJnZWQ9e3RoaXMucHJvcHMuaXNFbmxhcmdlZH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgICAgICAgIG1hcmtzPXt0aGlzLnByb3BzLm1hcmtzfVxuICAgICAgICAgICAgICAgICAgc2hvd1ZhbHVlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICAgICAgICAgICAgICBtaW5WYWx1ZT17cmFuZ2VbMF19XG4gICAgICAgICAgICAgICAgICBtYXhWYWx1ZT17cmFuZ2VbMV19XG4gICAgICAgICAgICAgICAgICB2YWx1ZTA9e3RoaXMucHJvcHMudmFsdWUwfVxuICAgICAgICAgICAgICAgICAgdmFsdWUxPXt0aGlzLnByb3BzLnZhbHVlMX1cbiAgICAgICAgICAgICAgICAgIHN0ZXA9e3N0ZXB9XG4gICAgICAgICAgICAgICAgICBoYW5kbGVXaWR0aD17c2xpZGVySGFuZGxlV2lkdGh9XG4gICAgICAgICAgICAgICAgICBvblNsaWRlcjBDaGFuZ2U9e3RoaXMuX3NldFJhbmdlVmFsMH1cbiAgICAgICAgICAgICAgICAgIG9uU2xpZGVyMUNoYW5nZT17dGhpcy5fc2V0UmFuZ2VWYWwxfVxuICAgICAgICAgICAgICAgICAgb25TbGlkZXJCYXJDaGFuZ2U9eyh2YWwwLCB2YWwxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFt2YWwwLCB2YWwxXSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgZW5hYmxlQmFyRHJhZ1xuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgeyFpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyB0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJykgOiBudWxsfVxuICAgICAgICAgICAgICA8L1NsaWRlcldyYXBwZXI+XG4gICAgICAgICAgICAgIHtpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyAoXG4gICAgICAgICAgICAgICAgPFJhbmdlSW5wdXRXcmFwcGVyIGNsYXNzTmFtZT1cInJhbmdlLXNsaWRlcl9faW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUwJyl9XG4gICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMScpfVxuICAgICAgICAgICAgICAgIDwvUmFuZ2VJbnB1dFdyYXBwZXI+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBvbHlmaWxsKFJhbmdlU2xpZGVyKTtcblxuICByZXR1cm4gUmFuZ2VTbGlkZXI7XG59XG4iXX0=