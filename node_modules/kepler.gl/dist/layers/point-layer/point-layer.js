"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pointVisConfigs = exports.pointOptionalColumns = exports.pointRequiredColumns = exports.pointPosAccessor = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _extensions = require("@deck.gl/extensions");

var _layers = require("@deck.gl/layers");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _colorUtils = require("../../utils/color-utils");

var _datasetUtils = require("../../utils/dataset-utils");

var _pointLayerIcon = _interopRequireDefault(require("./point-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _layerTextLabel = require("../layer-text-label");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx), altitude && altitude.fieldIdx > -1 ? dc.valueAt(d.index, altitude.fieldIdx) : 0];
    };
  };
};

exports.pointPosAccessor = pointPosAccessor;
var pointRequiredColumns = ['lat', 'lng'];
exports.pointRequiredColumns = pointRequiredColumns;
var pointOptionalColumns = ['altitude'];
exports.pointOptionalColumns = pointOptionalColumns;
var brushingExtension = new _extensions.BrushingExtension();
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  outline: 'outline',
  thickness: 'thickness',
  strokeColor: 'strokeColor',
  colorRange: 'colorRange',
  strokeColorRange: 'strokeColorRange',
  radiusRange: 'radiusRange',
  filled: {
    type: 'boolean',
    label: 'layer.fillColor',
    defaultValue: true,
    property: 'filled'
  }
};
exports.pointVisConfigs = pointVisConfigs;

var PointLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(PointLayer, _Layer);

  var _super = _createSuper(PointLayer);

  function PointLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PointLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(pointVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return pointPosAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(PointLayer, [{
    key: "type",
    get: function get() {
      return 'point';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _pointLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return pointRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return pointOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "noneLayerDataAffectingProps", this)), ['radius']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).color), {}, {
          accessor: 'getFillColor',
          condition: function condition(config) {
            return config.visConfig.filled;
          },
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        strokeColor: {
          property: 'strokeColor',
          key: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          accessor: 'getLineColor',
          condition: function condition(config) {
            return config.visConfig.outline;
          },
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
        size: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).size), {}, {
          property: 'radius',
          range: 'radiusRange',
          fixed: 'fixedRadius',
          channelScaleType: 'radius',
          accessor: 'getRadius',
          defaultValue: 1
        })
      };
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(dataset) {
      var defaultColorField = (0, _datasetUtils.findDefaultColorField)(dataset);

      if (defaultColorField) {
        this.updateLayerConfig({
          colorField: defaultColorField
        });
        this.updateLayerVisualChannel(dataset, 'color');
      }

      return this;
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getPosition) {
      var filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var pos = getPosition({
          index: index
        }); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite)) {
          data.push({
            position: pos,
            index: index
          });
        }
      }

      return data;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var textLabel = this.config.textLabel;
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data,
          triggerChanged = _this$updateData.triggerChanged;

      var getPosition = this.getPositionAccessor(dataContainer); // get all distinct characters in the text labels

      var textLabels = (0, _layerTextLabel.formatTextLabelData)({
        textLabel: textLabel,
        triggerChanged: triggerChanged,
        oldLayerData: oldLayerData,
        data: data,
        dataContainer: dataContainer
      });
      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getPosition: getPosition,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(),
        textLabels: textLabels
      }, accessors);
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      var getPosition = this.getPositionAccessor(dataContainer);
      var bounds = this.getPointsBounds(dataContainer, getPosition);
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var _this$config$columns$;

      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState,
          interactionConfig = opts.interactionConfig; // if no field size is defined we need to pass fixed radius = false

      var fixedRadius = this.config.visConfig.fixedRadius && Boolean(this.config.sizeField);
      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);

      var layerProps = _objectSpread({
        stroked: this.config.visConfig.outline,
        filled: this.config.visConfig.filled,
        lineWidthScale: this.config.visConfig.thickness,
        radiusScale: radiusScale
      }, this.config.visConfig.fixedRadius ? {} : {
        radiusMaxPixels: 500
      });

      var updateTriggers = _objectSpread({
        getPosition: this.config.columns,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      }, this.getVisualChannelUpdateTriggers());

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var brushingProps = this.getBrushingExtensionProps(interactionConfig);
      var getPixelOffset = (0, _layerTextLabel.getTextOffsetByRadius)(radiusScale, data.getRadius, mapState);
      var extensions = [].concat((0, _toConsumableArray2["default"])(defaultLayerProps.extensions), [brushingExtension]);

      var sharedProps = _objectSpread({
        getFilterValue: data.getFilterValue,
        extensions: extensions,
        filterRange: defaultLayerProps.filterRange,
        visible: defaultLayerProps.visible
      }, brushingProps);

      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _layers.ScatterplotLayer(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), brushingProps), layerProps), data), {}, {
        parameters: {
          // circles will be flat on the map when the altitude column is not used
          depthTest: ((_this$config$columns$ = this.config.columns.altitude) === null || _this$config$columns$ === void 0 ? void 0 : _this$config$columns$.fieldIdx) > -1
        },
        lineWidthUnits: 'pixels',
        updateTriggers: updateTriggers,
        extensions: extensions
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject ? [new _layers.ScatterplotLayer(_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        data: [hoveredObject],
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        getRadius: data.getRadius,
        getPosition: data.getPosition
      }))] : []), (0, _toConsumableArray2["default"])(this.renderTextLabelLayer({
        getPosition: data.getPosition,
        sharedProps: sharedProps,
        getPixelOffset: getPixelOffset,
        updateTriggers: updateTriggers
      }, opts)));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fieldPairs = _ref3.fieldPairs,
          fieldPairs = _ref3$fieldPairs === void 0 ? [] : _ref3$fieldPairs;
      var props = []; // Make layer for each pair

      fieldPairs.forEach(function (pair) {
        var latField = pair.pair.lat;
        var lngField = pair.pair.lng;
        var layerName = pair.defaultName;
        var prop = {
          label: layerName.length ? layerName : 'Point'
        }; // default layer color for begintrip and dropoff point

        if (latField.value in _defaultSettings.DEFAULT_LAYER_COLOR) {
          prop.color = (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR[latField.value]);
        } // set the first layer to be visible


        if (props.length === 0) {
          prop.isVisible = true;
        }

        prop.columns = {
          lat: latField,
          lng: lngField,
          altitude: {
            value: null,
            fieldIdx: -1,
            optional: true
          }
        };
        props.push(prop);
      });
      return {
        props: props
      };
    }
  }]);
  return PointLayer;
}(_baseLayer["default"]);

exports["default"] = PointLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZGMiLCJkIiwidmFsdWVBdCIsImluZGV4IiwiZmllbGRJZHgiLCJwb2ludFJlcXVpcmVkQ29sdW1ucyIsInBvaW50T3B0aW9uYWxDb2x1bW5zIiwiYnJ1c2hpbmdFeHRlbnNpb24iLCJCcnVzaGluZ0V4dGVuc2lvbiIsInBvaW50VmlzQ29uZmlncyIsInJhZGl1cyIsImZpeGVkUmFkaXVzIiwib3BhY2l0eSIsIm91dGxpbmUiLCJ0aGlja25lc3MiLCJzdHJva2VDb2xvciIsImNvbG9yUmFuZ2UiLCJzdHJva2VDb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJmaWxsZWQiLCJ0eXBlIiwibGFiZWwiLCJkZWZhdWx0VmFsdWUiLCJwcm9wZXJ0eSIsIlBvaW50TGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiUG9pbnRMYXllckljb24iLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsImNvbG9yIiwiYWNjZXNzb3IiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJrZXkiLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJzaXplIiwiZml4ZWQiLCJkYXRhc2V0IiwiZGVmYXVsdENvbG9yRmllbGQiLCJ1cGRhdGVMYXllckNvbmZpZyIsImNvbG9yRmllbGQiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWwiLCJzdHJva2VDb2xvckZpZWxkIiwic3Ryb2tlQ29sb3JEb21haW4iLCJzdHJva2VDb2xvclNjYWxlIiwiZ2V0UG9zaXRpb24iLCJmaWx0ZXJlZEluZGV4IiwiZGF0YSIsImkiLCJsZW5ndGgiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwicHVzaCIsInBvc2l0aW9uIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJ0ZXh0TGFiZWwiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwidHJpZ2dlckNoYW5nZWQiLCJ0ZXh0TGFiZWxzIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwidXBkYXRlTWV0YSIsIm9wdHMiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIkJvb2xlYW4iLCJzaXplRmllbGQiLCJyYWRpdXNTY2FsZSIsImdldFJhZGl1c1NjYWxlQnlab29tIiwibGF5ZXJQcm9wcyIsInN0cm9rZWQiLCJsaW5lV2lkdGhTY2FsZSIsInJhZGl1c01heFBpeGVscyIsInVwZGF0ZVRyaWdnZXJzIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImRlZmF1bHRMYXllclByb3BzIiwiZ2V0RGVmYXVsdERlY2tMYXllclByb3BzIiwiYnJ1c2hpbmdQcm9wcyIsImdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMiLCJnZXRQaXhlbE9mZnNldCIsImdldFJhZGl1cyIsImV4dGVuc2lvbnMiLCJzaGFyZWRQcm9wcyIsImZpbHRlclJhbmdlIiwidmlzaWJsZSIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwiU2NhdHRlcnBsb3RMYXllciIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJsaW5lV2lkdGhVbml0cyIsImdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMiLCJnZXRMaW5lQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImdldEZpbGxDb2xvciIsInJlbmRlclRleHRMYWJlbExheWVyIiwiZmllbGRQYWlycyIsImZvckVhY2giLCJwYWlyIiwibGF0RmllbGQiLCJsbmdGaWVsZCIsImxheWVyTmFtZSIsImRlZmF1bHROYW1lIiwicHJvcCIsInZhbHVlIiwiREVGQVVMVF9MQVlFUl9DT0xPUiIsImlzVmlzaWJsZSIsIm9wdGlvbmFsIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsTUFBRUMsR0FBRixRQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxRQUFPQSxHQUFQO0FBQUEsTUFBWUMsUUFBWixRQUFZQSxRQUFaO0FBQUEsU0FBMEIsVUFBQUMsRUFBRTtBQUFBLFdBQUksVUFBQUMsQ0FBQztBQUFBLGFBQUksQ0FDbkVELEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JMLEdBQUcsQ0FBQ00sUUFBeEIsQ0FEbUUsRUFFbkVKLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JOLEdBQUcsQ0FBQ08sUUFBeEIsQ0FGbUUsRUFHbkVMLFFBQVEsSUFBSUEsUUFBUSxDQUFDSyxRQUFULEdBQW9CLENBQUMsQ0FBakMsR0FBcUNKLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JKLFFBQVEsQ0FBQ0ssUUFBN0IsQ0FBckMsR0FBOEUsQ0FIWCxDQUFKO0FBQUEsS0FBTDtBQUFBLEdBQTVCO0FBQUEsQ0FBekI7OztBQU1BLElBQU1DLG9CQUFvQixHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FBN0I7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsQ0FBQyxVQUFELENBQTdCOztBQUVQLElBQU1DLGlCQUFpQixHQUFHLElBQUlDLDZCQUFKLEVBQTFCO0FBRU8sSUFBTUMsZUFBZSxHQUFHO0FBQzdCQyxFQUFBQSxNQUFNLEVBQUUsUUFEcUI7QUFFN0JDLEVBQUFBLFdBQVcsRUFBRSxhQUZnQjtBQUc3QkMsRUFBQUEsT0FBTyxFQUFFLFNBSG9CO0FBSTdCQyxFQUFBQSxPQUFPLEVBQUUsU0FKb0I7QUFLN0JDLEVBQUFBLFNBQVMsRUFBRSxXQUxrQjtBQU03QkMsRUFBQUEsV0FBVyxFQUFFLGFBTmdCO0FBTzdCQyxFQUFBQSxVQUFVLEVBQUUsWUFQaUI7QUFRN0JDLEVBQUFBLGdCQUFnQixFQUFFLGtCQVJXO0FBUzdCQyxFQUFBQSxXQUFXLEVBQUUsYUFUZ0I7QUFVN0JDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxJQUFJLEVBQUUsU0FEQTtBQUVOQyxJQUFBQSxLQUFLLEVBQUUsaUJBRkQ7QUFHTkMsSUFBQUEsWUFBWSxFQUFFLElBSFI7QUFJTkMsSUFBQUEsUUFBUSxFQUFFO0FBSko7QUFWcUIsQ0FBeEI7OztJQWtCY0MsVTs7Ozs7QUFDbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiw4QkFBTUEsS0FBTjs7QUFFQSxVQUFLQyxpQkFBTCxDQUF1QmpCLGVBQXZCOztBQUNBLFVBQUtrQixtQkFBTCxHQUEyQixVQUFBQyxhQUFhO0FBQUEsYUFDdENoQyxnQkFBZ0IsQ0FBQyxNQUFLaUMsTUFBTCxDQUFZQyxPQUFiLENBQWhCLENBQXNDRixhQUF0QyxDQURzQztBQUFBLEtBQXhDOztBQUppQjtBQU1sQjs7OztTQUVELGVBQVc7QUFDVCxhQUFPLE9BQVA7QUFDRDs7O1NBRUQsZUFBbUI7QUFDakIsYUFBTyxLQUFQO0FBQ0Q7OztTQUVELGVBQWdCO0FBQ2QsYUFBT0csMEJBQVA7QUFDRDs7O1NBQ0QsZUFBMkI7QUFDekIsYUFBTzFCLG9CQUFQO0FBQ0Q7OztTQUVELGVBQXNCO0FBQ3BCLGFBQU9DLG9CQUFQO0FBQ0Q7OztTQUVELGVBQWtCO0FBQ2hCLGFBQU8sS0FBSzBCLHVCQUFaO0FBQ0Q7OztTQUVELGVBQWtDO0FBQ2hDLGlMQUE4QyxRQUE5QztBQUNEOzs7U0FFRCxlQUFxQjtBQUNuQixhQUFPO0FBQ0xDLFFBQUFBLEtBQUssa0NBQ0Esc0dBQXFCQSxLQURyQjtBQUVIQyxVQUFBQSxRQUFRLEVBQUUsY0FGUDtBQUdIQyxVQUFBQSxTQUFTLEVBQUUsbUJBQUFOLE1BQU07QUFBQSxtQkFBSUEsTUFBTSxDQUFDTyxTQUFQLENBQWlCakIsTUFBckI7QUFBQSxXQUhkO0FBSUhHLFVBQUFBLFlBQVksRUFBRSxzQkFBQU8sTUFBTTtBQUFBLG1CQUFJQSxNQUFNLENBQUNJLEtBQVg7QUFBQTtBQUpqQixVQURBO0FBT0xsQixRQUFBQSxXQUFXLEVBQUU7QUFDWFEsVUFBQUEsUUFBUSxFQUFFLGFBREM7QUFFWGMsVUFBQUEsR0FBRyxFQUFFLGFBRk07QUFHWEMsVUFBQUEsS0FBSyxFQUFFLGtCQUhJO0FBSVhDLFVBQUFBLEtBQUssRUFBRSxrQkFKSTtBQUtYQyxVQUFBQSxNQUFNLEVBQUUsbUJBTEc7QUFNWEMsVUFBQUEsS0FBSyxFQUFFLGtCQU5JO0FBT1hDLFVBQUFBLGdCQUFnQixFQUFFQyxnQ0FBZVYsS0FQdEI7QUFRWEMsVUFBQUEsUUFBUSxFQUFFLGNBUkM7QUFTWEMsVUFBQUEsU0FBUyxFQUFFLG1CQUFBTixNQUFNO0FBQUEsbUJBQUlBLE1BQU0sQ0FBQ08sU0FBUCxDQUFpQnZCLE9BQXJCO0FBQUEsV0FUTjtBQVVYUyxVQUFBQSxZQUFZLEVBQUUsc0JBQUFPLE1BQU07QUFBQSxtQkFBSUEsTUFBTSxDQUFDTyxTQUFQLENBQWlCckIsV0FBakIsSUFBZ0NjLE1BQU0sQ0FBQ0ksS0FBM0M7QUFBQTtBQVZULFNBUFI7QUFtQkxXLFFBQUFBLElBQUksa0NBQ0Msc0dBQXFCQSxJQUR0QjtBQUVGckIsVUFBQUEsUUFBUSxFQUFFLFFBRlI7QUFHRmtCLFVBQUFBLEtBQUssRUFBRSxhQUhMO0FBSUZJLFVBQUFBLEtBQUssRUFBRSxhQUpMO0FBS0ZILFVBQUFBLGdCQUFnQixFQUFFLFFBTGhCO0FBTUZSLFVBQUFBLFFBQVEsRUFBRSxXQU5SO0FBT0ZaLFVBQUFBLFlBQVksRUFBRTtBQVBaO0FBbkJDLE9BQVA7QUE2QkQ7OztXQUVELCtCQUFzQndCLE9BQXRCLEVBQStCO0FBQzdCLFVBQU1DLGlCQUFpQixHQUFHLHlDQUFzQkQsT0FBdEIsQ0FBMUI7O0FBRUEsVUFBSUMsaUJBQUosRUFBdUI7QUFDckIsYUFBS0MsaUJBQUwsQ0FBdUI7QUFDckJDLFVBQUFBLFVBQVUsRUFBRUY7QUFEUyxTQUF2QjtBQUdBLGFBQUtHLHdCQUFMLENBQThCSixPQUE5QixFQUF1QyxPQUF2QztBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7V0FxQ0QsaUNBQWtDO0FBQUEsVUFBWnJCLEtBQVksdUVBQUosRUFBSTtBQUNoQyxxS0FDaUNBLEtBRGpDO0FBR0U7QUFDQTBCLFFBQUFBLGdCQUFnQixFQUFFLElBSnBCO0FBS0VDLFFBQUFBLGlCQUFpQixFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FMckI7QUFNRUMsUUFBQUEsZ0JBQWdCLEVBQUU7QUFOcEI7QUFRRDs7O1dBRUQsdUNBQXdDQyxXQUF4QyxFQUFxRDtBQUFBLFVBQTdCQyxhQUE2QixTQUE3QkEsYUFBNkI7QUFDbkQsVUFBTUMsSUFBSSxHQUFHLEVBQWI7O0FBRUEsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixhQUFhLENBQUNHLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzdDLFlBQU10RCxLQUFLLEdBQUdvRCxhQUFhLENBQUNFLENBQUQsQ0FBM0I7QUFDQSxZQUFNRSxHQUFHLEdBQUdMLFdBQVcsQ0FBQztBQUFDbkQsVUFBQUEsS0FBSyxFQUFMQTtBQUFELFNBQUQsQ0FBdkIsQ0FGNkMsQ0FJN0M7QUFDQTs7QUFDQSxZQUFJd0QsR0FBRyxDQUFDQyxLQUFKLENBQVVDLE1BQU0sQ0FBQ0MsUUFBakIsQ0FBSixFQUFnQztBQUM5Qk4sVUFBQUEsSUFBSSxDQUFDTyxJQUFMLENBQVU7QUFDUkMsWUFBQUEsUUFBUSxFQUFFTCxHQURGO0FBRVJ4RCxZQUFBQSxLQUFLLEVBQUxBO0FBRlEsV0FBVjtBQUlEO0FBQ0Y7O0FBQ0QsYUFBT3FELElBQVA7QUFDRDs7O1dBRUQseUJBQWdCUyxRQUFoQixFQUEwQkMsWUFBMUIsRUFBd0M7QUFBQSxVQUMvQkMsU0FEK0IsR0FDbEIsS0FBS3RDLE1BRGEsQ0FDL0JzQyxTQUQrQjtBQUFBLGtDQUVIRixRQUFRLENBQUMsS0FBS3BDLE1BQUwsQ0FBWXVDLE1BQWIsQ0FGTDtBQUFBLFVBRS9CQyxTQUYrQix5QkFFL0JBLFNBRitCO0FBQUEsVUFFcEJ6QyxhQUZvQix5QkFFcEJBLGFBRm9COztBQUFBLDZCQUdQLEtBQUswQyxVQUFMLENBQWdCTCxRQUFoQixFQUEwQkMsWUFBMUIsQ0FITztBQUFBLFVBRy9CVixJQUgrQixvQkFHL0JBLElBSCtCO0FBQUEsVUFHekJlLGNBSHlCLG9CQUd6QkEsY0FIeUI7O0FBSXRDLFVBQU1qQixXQUFXLEdBQUcsS0FBSzNCLG1CQUFMLENBQXlCQyxhQUF6QixDQUFwQixDQUpzQyxDQU10Qzs7QUFDQSxVQUFNNEMsVUFBVSxHQUFHLHlDQUFvQjtBQUNyQ0wsUUFBQUEsU0FBUyxFQUFUQSxTQURxQztBQUVyQ0ksUUFBQUEsY0FBYyxFQUFkQSxjQUZxQztBQUdyQ0wsUUFBQUEsWUFBWSxFQUFaQSxZQUhxQztBQUlyQ1YsUUFBQUEsSUFBSSxFQUFKQSxJQUpxQztBQUtyQzVCLFFBQUFBLGFBQWEsRUFBYkE7QUFMcUMsT0FBcEIsQ0FBbkI7QUFRQSxVQUFNNkMsU0FBUyxHQUFHLEtBQUtDLHFCQUFMLENBQTJCO0FBQUM5QyxRQUFBQSxhQUFhLEVBQWJBO0FBQUQsT0FBM0IsQ0FBbEI7QUFFQTtBQUNFNEIsUUFBQUEsSUFBSSxFQUFKQSxJQURGO0FBRUVGLFFBQUFBLFdBQVcsRUFBWEEsV0FGRjtBQUdFcUIsUUFBQUEsY0FBYyxFQUFFTixTQUFTLENBQUNPLG1CQUFWLENBQThCaEQsYUFBOUIsR0FIbEI7QUFJRTRDLFFBQUFBLFVBQVUsRUFBVkE7QUFKRixTQUtLQyxTQUxMO0FBT0Q7QUFDRDs7OztXQUVBLHlCQUFnQjdDLGFBQWhCLEVBQStCO0FBQzdCLFVBQU0wQixXQUFXLEdBQUcsS0FBSzNCLG1CQUFMLENBQXlCQyxhQUF6QixDQUFwQjtBQUNBLFVBQU1pRCxNQUFNLEdBQUcsS0FBS0MsZUFBTCxDQUFxQmxELGFBQXJCLEVBQW9DMEIsV0FBcEMsQ0FBZjtBQUNBLFdBQUt5QixVQUFMLENBQWdCO0FBQUNGLFFBQUFBLE1BQU0sRUFBTkE7QUFBRCxPQUFoQjtBQUNEOzs7V0FFRCxxQkFBWUcsSUFBWixFQUFrQjtBQUFBOztBQUFBLFVBQ1R4QixJQURTLEdBQ3NEd0IsSUFEdEQsQ0FDVHhCLElBRFM7QUFBQSxVQUNIYSxTQURHLEdBQ3NEVyxJQUR0RCxDQUNIWCxTQURHO0FBQUEsVUFDUVksYUFEUixHQUNzREQsSUFEdEQsQ0FDUUMsYUFEUjtBQUFBLFVBQ3VCQyxRQUR2QixHQUNzREYsSUFEdEQsQ0FDdUJFLFFBRHZCO0FBQUEsVUFDaUNDLGlCQURqQyxHQUNzREgsSUFEdEQsQ0FDaUNHLGlCQURqQyxFQUdoQjs7QUFDQSxVQUFNeEUsV0FBVyxHQUFHLEtBQUtrQixNQUFMLENBQVlPLFNBQVosQ0FBc0J6QixXQUF0QixJQUFxQ3lFLE9BQU8sQ0FBQyxLQUFLdkQsTUFBTCxDQUFZd0QsU0FBYixDQUFoRTtBQUNBLFVBQU1DLFdBQVcsR0FBRyxLQUFLQyxvQkFBTCxDQUEwQkwsUUFBMUIsRUFBb0N2RSxXQUFwQyxDQUFwQjs7QUFFQSxVQUFNNkUsVUFBVTtBQUNkQyxRQUFBQSxPQUFPLEVBQUUsS0FBSzVELE1BQUwsQ0FBWU8sU0FBWixDQUFzQnZCLE9BRGpCO0FBRWRNLFFBQUFBLE1BQU0sRUFBRSxLQUFLVSxNQUFMLENBQVlPLFNBQVosQ0FBc0JqQixNQUZoQjtBQUdkdUUsUUFBQUEsY0FBYyxFQUFFLEtBQUs3RCxNQUFMLENBQVlPLFNBQVosQ0FBc0J0QixTQUh4QjtBQUlkd0UsUUFBQUEsV0FBVyxFQUFYQTtBQUpjLFNBS1YsS0FBS3pELE1BQUwsQ0FBWU8sU0FBWixDQUFzQnpCLFdBQXRCLEdBQW9DLEVBQXBDLEdBQXlDO0FBQUNnRixRQUFBQSxlQUFlLEVBQUU7QUFBbEIsT0FML0IsQ0FBaEI7O0FBUUEsVUFBTUMsY0FBYztBQUNsQnRDLFFBQUFBLFdBQVcsRUFBRSxLQUFLekIsTUFBTCxDQUFZQyxPQURQO0FBRWxCNkMsUUFBQUEsY0FBYyxFQUFFTixTQUFTLENBQUN3QjtBQUZSLFNBR2YsS0FBS0MsOEJBQUwsRUFIZSxDQUFwQjs7QUFNQSxVQUFNQyxpQkFBaUIsR0FBRyxLQUFLQyx3QkFBTCxDQUE4QmhCLElBQTlCLENBQTFCO0FBQ0EsVUFBTWlCLGFBQWEsR0FBRyxLQUFLQyx5QkFBTCxDQUErQmYsaUJBQS9CLENBQXRCO0FBQ0EsVUFBTWdCLGNBQWMsR0FBRywyQ0FBc0JiLFdBQXRCLEVBQW1DOUIsSUFBSSxDQUFDNEMsU0FBeEMsRUFBbURsQixRQUFuRCxDQUF2QjtBQUNBLFVBQU1tQixVQUFVLGlEQUFPTixpQkFBaUIsQ0FBQ00sVUFBekIsSUFBcUM5RixpQkFBckMsRUFBaEI7O0FBRUEsVUFBTStGLFdBQVc7QUFDZjNCLFFBQUFBLGNBQWMsRUFBRW5CLElBQUksQ0FBQ21CLGNBRE47QUFFZjBCLFFBQUFBLFVBQVUsRUFBVkEsVUFGZTtBQUdmRSxRQUFBQSxXQUFXLEVBQUVSLGlCQUFpQixDQUFDUSxXQUhoQjtBQUlmQyxRQUFBQSxPQUFPLEVBQUVULGlCQUFpQixDQUFDUztBQUpaLFNBS1pQLGFBTFksQ0FBakI7O0FBT0EsVUFBTVEsYUFBYSxHQUFHLEtBQUtDLGdCQUFMLENBQXNCekIsYUFBdEIsQ0FBdEI7QUFFQSxjQUNFLElBQUkwQix3QkFBSiwyRUFDS1osaUJBREwsR0FFS0UsYUFGTCxHQUdLVCxVQUhMLEdBSUtoQyxJQUpMO0FBS0VvRCxRQUFBQSxVQUFVLEVBQUU7QUFDVjtBQUNBQyxVQUFBQSxTQUFTLEVBQUUsK0JBQUtoRixNQUFMLENBQVlDLE9BQVosQ0FBb0IvQixRQUFwQixnRkFBOEJLLFFBQTlCLElBQXlDLENBQUM7QUFGM0MsU0FMZDtBQVNFMEcsUUFBQUEsY0FBYyxFQUFFLFFBVGxCO0FBVUVsQixRQUFBQSxjQUFjLEVBQWRBLGNBVkY7QUFXRVMsUUFBQUEsVUFBVSxFQUFWQTtBQVhGLFNBREYsNkNBZU1JLGFBQWEsR0FDYixDQUNFLElBQUlFLHdCQUFKLCtDQUNLLEtBQUtJLHlCQUFMLEVBREwsR0FFS3ZCLFVBRkw7QUFHRWhDLFFBQUFBLElBQUksRUFBRSxDQUFDaUQsYUFBRCxDQUhSO0FBSUVPLFFBQUFBLFlBQVksRUFBRSxLQUFLbkYsTUFBTCxDQUFZb0YsY0FKNUI7QUFLRUMsUUFBQUEsWUFBWSxFQUFFLEtBQUtyRixNQUFMLENBQVlvRixjQUw1QjtBQU1FYixRQUFBQSxTQUFTLEVBQUU1QyxJQUFJLENBQUM0QyxTQU5sQjtBQU9FOUMsUUFBQUEsV0FBVyxFQUFFRSxJQUFJLENBQUNGO0FBUHBCLFNBREYsQ0FEYSxHQVliLEVBM0JOLHVDQTZCSyxLQUFLNkQsb0JBQUwsQ0FDRDtBQUNFN0QsUUFBQUEsV0FBVyxFQUFFRSxJQUFJLENBQUNGLFdBRHBCO0FBRUVnRCxRQUFBQSxXQUFXLEVBQVhBLFdBRkY7QUFHRUgsUUFBQUEsY0FBYyxFQUFkQSxjQUhGO0FBSUVQLFFBQUFBLGNBQWMsRUFBZEE7QUFKRixPQURDLEVBT0RaLElBUEMsQ0E3Qkw7QUF1Q0Q7OztXQTVLRCxzQ0FBZ0Q7QUFBQSxtQ0FBbEJvQyxVQUFrQjtBQUFBLFVBQWxCQSxVQUFrQixpQ0FBTCxFQUFLO0FBQzlDLFVBQU0zRixLQUFLLEdBQUcsRUFBZCxDQUQ4QyxDQUc5Qzs7QUFDQTJGLE1BQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixVQUFBQyxJQUFJLEVBQUk7QUFDekIsWUFBTUMsUUFBUSxHQUFHRCxJQUFJLENBQUNBLElBQUwsQ0FBVXpILEdBQTNCO0FBQ0EsWUFBTTJILFFBQVEsR0FBR0YsSUFBSSxDQUFDQSxJQUFMLENBQVV4SCxHQUEzQjtBQUNBLFlBQU0ySCxTQUFTLEdBQUdILElBQUksQ0FBQ0ksV0FBdkI7QUFFQSxZQUFNQyxJQUFJLEdBQUc7QUFDWHRHLFVBQUFBLEtBQUssRUFBRW9HLFNBQVMsQ0FBQy9ELE1BQVYsR0FBbUIrRCxTQUFuQixHQUErQjtBQUQzQixTQUFiLENBTHlCLENBU3pCOztBQUNBLFlBQUlGLFFBQVEsQ0FBQ0ssS0FBVCxJQUFrQkMsb0NBQXRCLEVBQTJDO0FBQ3pDRixVQUFBQSxJQUFJLENBQUMxRixLQUFMLEdBQWEsMEJBQVM0RixxQ0FBb0JOLFFBQVEsQ0FBQ0ssS0FBN0IsQ0FBVCxDQUFiO0FBQ0QsU0Fad0IsQ0FjekI7OztBQUNBLFlBQUluRyxLQUFLLENBQUNpQyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCaUUsVUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7O0FBRURILFFBQUFBLElBQUksQ0FBQzdGLE9BQUwsR0FBZTtBQUNiakMsVUFBQUEsR0FBRyxFQUFFMEgsUUFEUTtBQUViekgsVUFBQUEsR0FBRyxFQUFFMEgsUUFGUTtBQUdiekgsVUFBQUEsUUFBUSxFQUFFO0FBQUM2SCxZQUFBQSxLQUFLLEVBQUUsSUFBUjtBQUFjeEgsWUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBekI7QUFBNEIySCxZQUFBQSxRQUFRLEVBQUU7QUFBdEM7QUFIRyxTQUFmO0FBTUF0RyxRQUFBQSxLQUFLLENBQUNzQyxJQUFOLENBQVc0RCxJQUFYO0FBQ0QsT0ExQkQ7QUE0QkEsYUFBTztBQUFDbEcsUUFBQUEsS0FBSyxFQUFMQTtBQUFELE9BQVA7QUFDRDs7O0VBbEhxQ3VHLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtCcnVzaGluZ0V4dGVuc2lvbn0gZnJvbSAnQGRlY2suZ2wvZXh0ZW5zaW9ucyc7XG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCB7ZmluZERlZmF1bHRDb2xvckZpZWxkfSBmcm9tICd1dGlscy9kYXRhc2V0LXV0aWxzJztcbmltcG9ydCBQb2ludExheWVySWNvbiBmcm9tICcuL3BvaW50LWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SLCBDSEFOTkVMX1NDQUxFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge2dldFRleHRPZmZzZXRCeVJhZGl1cywgZm9ybWF0VGV4dExhYmVsRGF0YX0gZnJvbSAnLi4vbGF5ZXItdGV4dC1sYWJlbCc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PiBkYyA9PiBkID0+IFtcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsbmcuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdC5maWVsZElkeCksXG4gIGFsdGl0dWRlICYmIGFsdGl0dWRlLmZpZWxkSWR4ID4gLTEgPyBkYy52YWx1ZUF0KGQuaW5kZXgsIGFsdGl0dWRlLmZpZWxkSWR4KSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludFJlcXVpcmVkQ29sdW1ucyA9IFsnbGF0JywgJ2xuZyddO1xuZXhwb3J0IGNvbnN0IHBvaW50T3B0aW9uYWxDb2x1bW5zID0gWydhbHRpdHVkZSddO1xuXG5jb25zdCBicnVzaGluZ0V4dGVuc2lvbiA9IG5ldyBCcnVzaGluZ0V4dGVuc2lvbigpO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICByYWRpdXM6ICdyYWRpdXMnLFxuICBmaXhlZFJhZGl1czogJ2ZpeGVkUmFkaXVzJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvdXRsaW5lOiAnb3V0bGluZScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIHN0cm9rZUNvbG9yOiAnc3Ryb2tlQ29sb3InLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHN0cm9rZUNvbG9yUmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gIGZpbGxlZDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBsYWJlbDogJ2xheWVyLmZpbGxDb2xvcicsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIHByb3BlcnR5OiAnZmlsbGVkJ1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludExheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcocG9pbnRWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+XG4gICAgICBwb2ludFBvc0FjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdwb2ludCc7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIFBvaW50TGF5ZXJJY29uO1xuICB9XG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gcG9pbnRSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBwb2ludE9wdGlvbmFsQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UG9pbnRDb2x1bW5QYWlycztcbiAgfVxuXG4gIGdldCBub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMoKSB7XG4gICAgcmV0dXJuIFsuLi5zdXBlci5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMsICdyYWRpdXMnXTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RmlsbENvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5maWxsZWQsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnID0+IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBrZXk6ICdzdHJva2VDb2xvcicsXG4gICAgICAgIGZpZWxkOiAnc3Ryb2tlQ29sb3JGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc3Ryb2tlQ29sb3JTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ3N0cm9rZUNvbG9yRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0TGluZUNvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5vdXRsaW5lLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdyYWRpdXMnLFxuICAgICAgICByYW5nZTogJ3JhZGl1c1JhbmdlJyxcbiAgICAgICAgZml4ZWQ6ICdmaXhlZFJhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldFJhZGl1cycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzZXRJbml0aWFsTGF5ZXJDb25maWcoZGF0YXNldCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb2xvckZpZWxkID0gZmluZERlZmF1bHRDb2xvckZpZWxkKGRhdGFzZXQpO1xuXG4gICAgaWYgKGRlZmF1bHRDb2xvckZpZWxkKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgICAgY29sb3JGaWVsZDogZGVmYXVsdENvbG9yRmllbGRcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgJ2NvbG9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZFBhaXJzID0gW119KSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXTtcblxuICAgIC8vIE1ha2UgbGF5ZXIgZm9yIGVhY2ggcGFpclxuICAgIGZpZWxkUGFpcnMuZm9yRWFjaChwYWlyID0+IHtcbiAgICAgIGNvbnN0IGxhdEZpZWxkID0gcGFpci5wYWlyLmxhdDtcbiAgICAgIGNvbnN0IGxuZ0ZpZWxkID0gcGFpci5wYWlyLmxuZztcbiAgICAgIGNvbnN0IGxheWVyTmFtZSA9IHBhaXIuZGVmYXVsdE5hbWU7XG5cbiAgICAgIGNvbnN0IHByb3AgPSB7XG4gICAgICAgIGxhYmVsOiBsYXllck5hbWUubGVuZ3RoID8gbGF5ZXJOYW1lIDogJ1BvaW50J1xuICAgICAgfTtcblxuICAgICAgLy8gZGVmYXVsdCBsYXllciBjb2xvciBmb3IgYmVnaW50cmlwIGFuZCBkcm9wb2ZmIHBvaW50XG4gICAgICBpZiAobGF0RmllbGQudmFsdWUgaW4gREVGQVVMVF9MQVlFUl9DT0xPUikge1xuICAgICAgICBwcm9wLmNvbG9yID0gaGV4VG9SZ2IoREVGQVVMVF9MQVlFUl9DT0xPUltsYXRGaWVsZC52YWx1ZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIGZpcnN0IGxheWVyIHRvIGJlIHZpc2libGVcbiAgICAgIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHJvcC5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wLmNvbHVtbnMgPSB7XG4gICAgICAgIGxhdDogbGF0RmllbGQsXG4gICAgICAgIGxuZzogbG5nRmllbGQsXG4gICAgICAgIGFsdGl0dWRlOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMSwgb3B0aW9uYWw6IHRydWV9XG4gICAgICB9O1xuXG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtwcm9wc307XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgc3Ryb2tlIGNvbG9yIHZpc3VhbCBjaGFubmVsXG4gICAgICBzdHJva2VDb2xvckZpZWxkOiBudWxsLFxuICAgICAgc3Ryb2tlQ29sb3JEb21haW46IFswLCAxXSxcbiAgICAgIHN0cm9rZUNvbG9yU2NhbGU6ICdxdWFudGlsZSdcbiAgICB9O1xuICB9XG5cbiAgY2FsY3VsYXRlRGF0YUF0dHJpYnV0ZSh7ZmlsdGVyZWRJbmRleH0sIGdldFBvc2l0aW9uKSB7XG4gICAgY29uc3QgZGF0YSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGZpbHRlcmVkSW5kZXhbaV07XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7aW5kZXh9KTtcblxuICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIHBvaW50XG4gICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9IG51bGxcbiAgICAgIGlmIChwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICAgICAgaW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBjb25zdCB7dGV4dExhYmVsfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCB7ZGF0YSwgdHJpZ2dlckNoYW5nZWR9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gICAgLy8gZ2V0IGFsbCBkaXN0aW5jdCBjaGFyYWN0ZXJzIGluIHRoZSB0ZXh0IGxhYmVsc1xuICAgIGNvbnN0IHRleHRMYWJlbHMgPSBmb3JtYXRUZXh0TGFiZWxEYXRhKHtcbiAgICAgIHRleHRMYWJlbCxcbiAgICAgIHRyaWdnZXJDaGFuZ2VkLFxuICAgICAgb2xkTGF5ZXJEYXRhLFxuICAgICAgZGF0YSxcbiAgICAgIGRhdGFDb250YWluZXJcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldFBvc2l0aW9uLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZUFjY2Vzc29yKGRhdGFDb250YWluZXIpKCksXG4gICAgICB0ZXh0TGFiZWxzLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXIsIG9iamVjdEhvdmVyZWQsIG1hcFN0YXRlLCBpbnRlcmFjdGlvbkNvbmZpZ30gPSBvcHRzO1xuXG4gICAgLy8gaWYgbm8gZmllbGQgc2l6ZSBpcyBkZWZpbmVkIHdlIG5lZWQgdG8gcGFzcyBmaXhlZCByYWRpdXMgPSBmYWxzZVxuICAgIGNvbnN0IGZpeGVkUmFkaXVzID0gdGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzICYmIEJvb2xlYW4odGhpcy5jb25maWcuc2l6ZUZpZWxkKTtcbiAgICBjb25zdCByYWRpdXNTY2FsZSA9IHRoaXMuZ2V0UmFkaXVzU2NhbGVCeVpvb20obWFwU3RhdGUsIGZpeGVkUmFkaXVzKTtcblxuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICBzdHJva2VkOiB0aGlzLmNvbmZpZy52aXNDb25maWcub3V0bGluZSxcbiAgICAgIGZpbGxlZDogdGhpcy5jb25maWcudmlzQ29uZmlnLmZpbGxlZCxcbiAgICAgIGxpbmVXaWR0aFNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcudGhpY2tuZXNzLFxuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICAuLi4odGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzID8ge30gOiB7cmFkaXVzTWF4UGl4ZWxzOiA1MDB9KVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIGdldFBvc2l0aW9uOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzLFxuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKVxuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuICAgIGNvbnN0IGJydXNoaW5nUHJvcHMgPSB0aGlzLmdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMoaW50ZXJhY3Rpb25Db25maWcpO1xuICAgIGNvbnN0IGdldFBpeGVsT2Zmc2V0ID0gZ2V0VGV4dE9mZnNldEJ5UmFkaXVzKHJhZGl1c1NjYWxlLCBkYXRhLmdldFJhZGl1cywgbWFwU3RhdGUpO1xuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBbLi4uZGVmYXVsdExheWVyUHJvcHMuZXh0ZW5zaW9ucywgYnJ1c2hpbmdFeHRlbnNpb25dO1xuXG4gICAgY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZGF0YS5nZXRGaWx0ZXJWYWx1ZSxcbiAgICAgIGV4dGVuc2lvbnMsXG4gICAgICBmaWx0ZXJSYW5nZTogZGVmYXVsdExheWVyUHJvcHMuZmlsdGVyUmFuZ2UsXG4gICAgICB2aXNpYmxlOiBkZWZhdWx0TGF5ZXJQcm9wcy52aXNpYmxlLFxuICAgICAgLi4uYnJ1c2hpbmdQcm9wc1xuICAgIH07XG4gICAgY29uc3QgaG92ZXJlZE9iamVjdCA9IHRoaXMuaGFzSG92ZXJlZE9iamVjdChvYmplY3RIb3ZlcmVkKTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgU2NhdHRlcnBsb3RMYXllcih7XG4gICAgICAgIC4uLmRlZmF1bHRMYXllclByb3BzLFxuICAgICAgICAuLi5icnVzaGluZ1Byb3BzLFxuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgLy8gY2lyY2xlcyB3aWxsIGJlIGZsYXQgb24gdGhlIG1hcCB3aGVuIHRoZSBhbHRpdHVkZSBjb2x1bW4gaXMgbm90IHVzZWRcbiAgICAgICAgICBkZXB0aFRlc3Q6IHRoaXMuY29uZmlnLmNvbHVtbnMuYWx0aXR1ZGU/LmZpZWxkSWR4ID4gLTFcbiAgICAgICAgfSxcbiAgICAgICAgbGluZVdpZHRoVW5pdHM6ICdwaXhlbHMnLFxuICAgICAgICB1cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgZXh0ZW5zaW9uc1xuICAgICAgfSksXG4gICAgICAvLyBob3ZlciBsYXllclxuICAgICAgLi4uKGhvdmVyZWRPYmplY3RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgU2NhdHRlcnBsb3RMYXllcih7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAgICAgICBkYXRhOiBbaG92ZXJlZE9iamVjdF0sXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgIGdldFBvc2l0aW9uOiBkYXRhLmdldFBvc2l0aW9uXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSksXG4gICAgICAvLyB0ZXh0IGxhYmVsIGxheWVyXG4gICAgICAuLi50aGlzLnJlbmRlclRleHRMYWJlbExheWVyKFxuICAgICAgICB7XG4gICAgICAgICAgZ2V0UG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb24sXG4gICAgICAgICAgc2hhcmVkUHJvcHMsXG4gICAgICAgICAgZ2V0UGl4ZWxPZmZzZXQsXG4gICAgICAgICAgdXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgfSxcbiAgICAgICAgb3B0c1xuICAgICAgKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==