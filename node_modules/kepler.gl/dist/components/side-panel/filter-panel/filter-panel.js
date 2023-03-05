"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _defaultSettings = require("../../../constants/default-settings");

var _newFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/new-filter-panel"));

var _timeRangeFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/time-range-filter-panel"));

var _singleSelectFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/single-select-filter-panel"));

var _multiSelectFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/multi-select-filter-panel"));

var _rangeFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/range-filter-panel"));

var _polygonFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/polygon-filter-panel"));

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledFilterPanel = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n"])));

FilterPanelFactory.deps = [_newFilterPanel["default"], _timeRangeFilterPanel["default"], _singleSelectFilterPanel["default"], _multiSelectFilterPanel["default"], _rangeFilterPanel["default"], _polygonFilterPanel["default"]];

function FilterPanelFactory(NewFilterPanel, TimeRangeFilterPanel, SingleSelectFilterPanel, MultiSelectFilterPanel, RangeFilterPanel, PolygonFilterPanel) {
  var _FilterPanelComponent, _class, _temp;

  var FilterPanelComponents = (_FilterPanelComponent = {
    "default": NewFilterPanel
  }, (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.timeRange, TimeRangeFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.select, SingleSelectFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.multiSelect, MultiSelectFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.range, RangeFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.polygon, PolygonFilterPanel), _FilterPanelComponent);
  return _temp = _class = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(FilterPanel, _Component);

    var _super = _createSuper(FilterPanel);

    function FilterPanel() {
      var _this;

      (0, _classCallCheck2["default"])(this, FilterPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldsSelector", function (props) {
        var datasetId = props.filter.dataId[0];

        if (!datasetId) {
          return [];
        }

        return (0, _lodash["default"])(props, ['datasets', datasetId, 'fields'], []);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "nameSelector", function (props) {
        return props.filter.name;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataIdSelector", function (props) {
        return props.filter.dataId[0];
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableFieldsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterSelector, _this.nameSelector, _this.dataIdSelector, function (fields, filters, name, dataId) {
        return fields.filter(function (f) {
          return f.type && f.type !== _defaultSettings.ALL_FIELD_TYPES.geojson && (f.name === name || !filters.find(function (d) {
            return d.name === f.name && d.dataId === dataId;
          }));
        });
      }));
      return _this;
    }

    (0, _createClass2["default"])(FilterPanel, [{
      key: "render",
      value: function render() {
        var filter = this.props.filter;
        var type = filter.type;
        var FilterFilterComponent = type && FilterPanelComponents[type] || FilterPanelComponents["default"];
        var allAvailableFields = this.availableFieldsSelector(this.props);
        return /*#__PURE__*/_react["default"].createElement(StyledFilterPanel, {
          className: "filter-panel"
        }, /*#__PURE__*/_react["default"].createElement(FilterFilterComponent, (0, _extends2["default"])({
          allAvailableFields: allAvailableFields
        }, this.props)));
      }
    }]);
    return FilterPanel;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    idx: _propTypes["default"].number,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filter: _propTypes["default"].object.isRequired,
    setFilter: _propTypes["default"].func.isRequired,
    removeFilter: _propTypes["default"].func.isRequired,
    enlargeFilter: _propTypes["default"].func.isRequired,
    toggleAnimation: _propTypes["default"].func.isRequired,
    toggleFilterFeature: _propTypes["default"].func.isRequired,
    datasets: _propTypes["default"].object,
    showDatasetTable: _propTypes["default"].func,
    isAnyFilterAnimating: _propTypes["default"].bool
  }), _temp;
}

var _default = FilterPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRGaWx0ZXJQYW5lbCIsInN0eWxlZCIsImRpdiIsIkZpbHRlclBhbmVsRmFjdG9yeSIsImRlcHMiLCJOZXdGaWx0ZXJQYW5lbEZhY3RvcnkiLCJUaW1lUmFuZ2VGaWx0ZXJQYW5lbEZhY3RvcnkiLCJTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbEZhY3RvcnkiLCJNdWx0aVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSIsIlJhbmdlRmlsdGVyUGFuZWxGYWN0b3J5IiwiUG9seWdvbkZpbHRlclBhbmVsRmFjdG9yeSIsIk5ld0ZpbHRlclBhbmVsIiwiVGltZVJhbmdlRmlsdGVyUGFuZWwiLCJTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbCIsIk11bHRpU2VsZWN0RmlsdGVyUGFuZWwiLCJSYW5nZUZpbHRlclBhbmVsIiwiUG9seWdvbkZpbHRlclBhbmVsIiwiRmlsdGVyUGFuZWxDb21wb25lbnRzIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwic2VsZWN0IiwibXVsdGlTZWxlY3QiLCJyYW5nZSIsInBvbHlnb24iLCJwcm9wcyIsImRhdGFzZXRJZCIsImZpbHRlciIsImRhdGFJZCIsImZpbHRlcnMiLCJuYW1lIiwiZmllbGRzU2VsZWN0b3IiLCJmaWx0ZXJTZWxlY3RvciIsIm5hbWVTZWxlY3RvciIsImRhdGFJZFNlbGVjdG9yIiwiZmllbGRzIiwiZiIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJnZW9qc29uIiwiZmluZCIsImQiLCJGaWx0ZXJGaWx0ZXJDb21wb25lbnQiLCJhbGxBdmFpbGFibGVGaWVsZHMiLCJhdmFpbGFibGVGaWVsZHNTZWxlY3RvciIsIkNvbXBvbmVudCIsImlkeCIsIlByb3BUeXBlcyIsIm51bWJlciIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0Iiwic2V0RmlsdGVyIiwiZnVuYyIsInJlbW92ZUZpbHRlciIsImVubGFyZ2VGaWx0ZXIiLCJ0b2dnbGVBbmltYXRpb24iLCJ0b2dnbGVGaWx0ZXJGZWF0dXJlIiwiZGF0YXNldHMiLCJzaG93RGF0YXNldFRhYmxlIiwiaXNBbnlGaWx0ZXJBbmltYXRpbmciLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsR0FBR0MsNkJBQU9DLEdBQVYsdUlBQXZCOztBQUtBQyxrQkFBa0IsQ0FBQ0MsSUFBbkIsR0FBMEIsQ0FDeEJDLDBCQUR3QixFQUV4QkMsZ0NBRndCLEVBR3hCQyxtQ0FId0IsRUFJeEJDLGtDQUp3QixFQUt4QkMsNEJBTHdCLEVBTXhCQyw4QkFOd0IsQ0FBMUI7O0FBU0EsU0FBU1Asa0JBQVQsQ0FDRVEsY0FERixFQUVFQyxvQkFGRixFQUdFQyx1QkFIRixFQUlFQyxzQkFKRixFQUtFQyxnQkFMRixFQU1FQyxrQkFORixFQU9FO0FBQUE7O0FBQ0EsTUFBTUMscUJBQXFCO0FBQ3pCLGVBQVNOO0FBRGdCLDZEQUV4Qk8sOEJBQWFDLFNBRlcsRUFFQ1Asb0JBRkQsMkRBR3hCTSw4QkFBYUUsTUFIVyxFQUdGUCx1QkFIRSwyREFJeEJLLDhCQUFhRyxXQUpXLEVBSUdQLHNCQUpILDJEQUt4QkksOEJBQWFJLEtBTFcsRUFLSFAsZ0JBTEcsMkRBTXhCRyw4QkFBYUssT0FOVyxFQU1EUCxrQkFOQyx5QkFBM0I7QUFTQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEseUdBZ0JtQixVQUFBUSxLQUFLLEVBQUk7QUFDeEIsWUFBTUMsU0FBUyxHQUFHRCxLQUFLLENBQUNFLE1BQU4sQ0FBYUMsTUFBYixDQUFvQixDQUFwQixDQUFsQjs7QUFDQSxZQUFJLENBQUNGLFNB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bnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEZJTFRFUl9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQgTmV3RmlsdGVyUGFuZWxGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItcGFuZWxzL25ldy1maWx0ZXItcGFuZWwnO1xuaW1wb3J0IFRpbWVSYW5nZUZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy90aW1lLXJhbmdlLWZpbHRlci1wYW5lbCc7XG5pbXBvcnQgU2luZ2xlU2VsZWN0RmlsdGVyUGFuZWxGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItcGFuZWxzL3NpbmdsZS1zZWxlY3QtZmlsdGVyLXBhbmVsJztcbmltcG9ydCBNdWx0aVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy9tdWx0aS1zZWxlY3QtZmlsdGVyLXBhbmVsJztcbmltcG9ydCBSYW5nZUZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy9yYW5nZS1maWx0ZXItcGFuZWwnO1xuaW1wb3J0IFBvbHlnb25GaWx0ZXJQYW5lbEZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1wYW5lbHMvcG9seWdvbi1maWx0ZXItcGFuZWwnO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJQYW5lbCA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbmA7XG5cbkZpbHRlclBhbmVsRmFjdG9yeS5kZXBzID0gW1xuICBOZXdGaWx0ZXJQYW5lbEZhY3RvcnksXG4gIFRpbWVSYW5nZUZpbHRlclBhbmVsRmFjdG9yeSxcbiAgU2luZ2xlU2VsZWN0RmlsdGVyUGFuZWxGYWN0b3J5LFxuICBNdWx0aVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSxcbiAgUmFuZ2VGaWx0ZXJQYW5lbEZhY3RvcnksXG4gIFBvbHlnb25GaWx0ZXJQYW5lbEZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEZpbHRlclBhbmVsRmFjdG9yeShcbiAgTmV3RmlsdGVyUGFuZWwsXG4gIFRpbWVSYW5nZUZpbHRlclBhbmVsLFxuICBTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbCxcbiAgTXVsdGlTZWxlY3RGaWx0ZXJQYW5lbCxcbiAgUmFuZ2VGaWx0ZXJQYW5lbCxcbiAgUG9seWdvbkZpbHRlclBhbmVsXG4pIHtcbiAgY29uc3QgRmlsdGVyUGFuZWxDb21wb25lbnRzID0ge1xuICAgIGRlZmF1bHQ6IE5ld0ZpbHRlclBhbmVsLFxuICAgIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXTogVGltZVJhbmdlRmlsdGVyUGFuZWwsXG4gICAgW0ZJTFRFUl9UWVBFUy5zZWxlY3RdOiBTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbCxcbiAgICBbRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0XTogTXVsdGlTZWxlY3RGaWx0ZXJQYW5lbCxcbiAgICBbRklMVEVSX1RZUEVTLnJhbmdlXTogUmFuZ2VGaWx0ZXJQYW5lbCxcbiAgICBbRklMVEVSX1RZUEVTLnBvbHlnb25dOiBQb2x5Z29uRmlsdGVyUGFuZWxcbiAgfTtcblxuICByZXR1cm4gY2xhc3MgRmlsdGVyUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBpZHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBmaWx0ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBzZXRGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICByZW1vdmVGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBlbmxhcmdlRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdG9nZ2xlQW5pbWF0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdG9nZ2xlRmlsdGVyRmVhdHVyZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgc2hvd0RhdGFzZXRUYWJsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBpc0FueUZpbHRlckFuaW1hdGluZzogUHJvcFR5cGVzLmJvb2xcbiAgICB9O1xuXG4gICAgLyogc2VsZWN0b3JzICovXG4gICAgZmllbGRzU2VsZWN0b3IgPSBwcm9wcyA9PiB7XG4gICAgICBjb25zdCBkYXRhc2V0SWQgPSBwcm9wcy5maWx0ZXIuZGF0YUlkWzBdO1xuICAgICAgaWYgKCFkYXRhc2V0SWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldChwcm9wcywgWydkYXRhc2V0cycsIGRhdGFzZXRJZCwgJ2ZpZWxkcyddLCBbXSk7XG4gICAgfTtcblxuICAgIGZpbHRlclNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVycztcbiAgICBuYW1lU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXIubmFtZTtcbiAgICBkYXRhSWRTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlci5kYXRhSWRbMF07XG5cbiAgICAvLyBvbmx5IHNob3cgY3VycmVudCBmaWVsZCBhbmQgZmllbGQgdGhhdCdzIG5vdCBhbHJlYWR5IGJlZW4gdXNlZCBhcyBhIGZpbHRlclxuICAgIGF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmZpZWxkc1NlbGVjdG9yLFxuICAgICAgdGhpcy5maWx0ZXJTZWxlY3RvcixcbiAgICAgIHRoaXMubmFtZVNlbGVjdG9yLFxuICAgICAgdGhpcy5kYXRhSWRTZWxlY3RvcixcbiAgICAgIChmaWVsZHMsIGZpbHRlcnMsIG5hbWUsIGRhdGFJZCkgPT5cbiAgICAgICAgZmllbGRzLmZpbHRlcihcbiAgICAgICAgICBmID0+XG4gICAgICAgICAgICBmLnR5cGUgJiZcbiAgICAgICAgICAgIGYudHlwZSAhPT0gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb24gJiZcbiAgICAgICAgICAgIChmLm5hbWUgPT09IG5hbWUgfHwgIWZpbHRlcnMuZmluZChkID0+IGQubmFtZSA9PT0gZi5uYW1lICYmIGQuZGF0YUlkID09PSBkYXRhSWQpKVxuICAgICAgICApXG4gICAgKTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtmaWx0ZXJ9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge3R5cGV9ID0gZmlsdGVyO1xuICAgICAgY29uc3QgRmlsdGVyRmlsdGVyQ29tcG9uZW50ID1cbiAgICAgICAgKHR5cGUgJiYgRmlsdGVyUGFuZWxDb21wb25lbnRzW3R5cGVdKSB8fCBGaWx0ZXJQYW5lbENvbXBvbmVudHMuZGVmYXVsdDtcbiAgICAgIGNvbnN0IGFsbEF2YWlsYWJsZUZpZWxkcyA9IHRoaXMuYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRGaWx0ZXJQYW5lbCBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxcIj5cbiAgICAgICAgICA8RmlsdGVyRmlsdGVyQ29tcG9uZW50IGFsbEF2YWlsYWJsZUZpZWxkcz17YWxsQXZhaWxhYmxlRmllbGRzfSB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgPC9TdHlsZWRGaWx0ZXJQYW5lbD5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJQYW5lbEZhY3Rvcnk7XG4iXX0=