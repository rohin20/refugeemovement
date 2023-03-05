"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.S2VisConfigs = exports.defaultLineWidth = exports.defaultElevation = exports.S2TokenAccessor = exports.s2RequiredColumns = exports.S2_TOKEN_FIELDS = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _geoLayers = require("@deck.gl/geo-layers");

var _defaultSettings = require("../../constants/default-settings");

var _layerFactory = require("../layer-factory");

var _tableUtils = require("../../utils/table-utils");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _s2LayerIcon = _interopRequireDefault(require("./s2-layer-icon"));

var _s2Utils = require("./s2-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var zoomFactorValue = 8;
var S2_TOKEN_FIELDS = {
  token: ['s2', 's2_token']
};
exports.S2_TOKEN_FIELDS = S2_TOKEN_FIELDS;
var s2RequiredColumns = ['token'];
exports.s2RequiredColumns = s2RequiredColumns;

var S2TokenAccessor = function S2TokenAccessor(_ref) {
  var token = _ref.token;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, token.fieldIdx);
    };
  };
};

exports.S2TokenAccessor = S2TokenAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultLineWidth = 1;
exports.defaultLineWidth = defaultLineWidth;
var S2VisConfigs = {
  // Filled color
  opacity: 'opacity',
  colorRange: 'colorRange',
  filled: {
    type: 'boolean',
    label: 'Fill Color',
    defaultValue: true,
    property: 'filled'
  },
  // stroke
  thickness: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.thickness), {}, {
    defaultValue: 0.5
  }),
  strokeColor: 'strokeColor',
  strokeColorRange: 'strokeColorRange',
  sizeRange: 'strokeWidthRange',
  stroked: 'stroked',
  // height
  enable3d: 'enable3d',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  heightRange: 'elevationRange',
  // wireframe
  wireframe: 'wireframe'
};
exports.S2VisConfigs = S2VisConfigs;

var S2GeometryLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(S2GeometryLayer, _Layer);

  var _super = _createSuper(S2GeometryLayer);

  function S2GeometryLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, S2GeometryLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(S2VisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return S2TokenAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(S2GeometryLayer, [{
    key: "type",
    get: function get() {
      return 's2';
    }
  }, {
    key: "name",
    get: function get() {
      return 'S2';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return s2RequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _s2LayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(S2GeometryLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor'
        }),
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'stroke',
          accessor: 'getLineWidth',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          defaultValue: defaultLineWidth
        }),
        strokeColor: {
          property: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          key: 'strokeColor',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          accessor: 'getLineColor',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          nullValue: visualChannels.color.nullValue,
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size,
          accessor: 'getElevation',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          nullValue: 0,
          defaultValue: defaultElevation
        }
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(S2GeometryLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getS2Token) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var token = getS2Token({
          index: index
        });

        if (token) {
          data.push({
            index: index,
            token: token
          });
        }
      }

      return data;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getS2Token) {
      // add safe row flag
      var centroids = dataContainer.reduce(function (acc, entry, index) {
        var s2Token = getS2Token({
          index: index
        });

        if (s2Token) {
          acc.push((0, _s2Utils.getS2Center)(s2Token));
        }

        return acc;
      }, [], true);
      var centroidsDataContainer = (0, _tableUtils.createDataContainer)(centroids);
      var bounds = this.getPointsBounds(centroidsDataContainer, function (d, dc) {
        return [dc.valueAt(d.index, 0), dc.valueAt(d.index, 1)];
      });
      this.dataToFeature = {
        centroids: centroids
      };
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getS2Token = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getS2Token: getS2Token,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          interactionConfig = opts.interactionConfig,
          mapState = opts.mapState;
      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var zoomFactor = this.getZoomFactor(mapState);
      var config = this.config;
      var visConfig = config.visConfig;

      var updateTriggers = _objectSpread(_objectSpread({}, this.getVisualChannelUpdateTriggers()), {}, {
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      });

      return [new _geoLayers.S2Layer(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), interactionConfig), data), {}, {
        getS2Token: function getS2Token(d) {
          return d.token;
        },
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // stroke
        lineWidthScale: visConfig.thickness * zoomFactor * zoomFactorValue,
        stroked: visConfig.stroked,
        lineMiterLimit: 2,
        // Filled color
        filled: visConfig.filled,
        opacity: visConfig.opacity,
        wrapLongitude: false,
        // Elevation
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        pickable: true,
        updateTriggers: updateTriggers
      }))];
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fields = _ref3.fields,
          fields = _ref3$fields === void 0 ? [] : _ref3$fields;
      var foundColumns = this.findDefaultColumnField(S2_TOKEN_FIELDS, fields);

      if (!foundColumns || !foundColumns.length) {
        return {
          props: []
        };
      }

      return {
        props: foundColumns.map(function (columns) {
          return {
            isVisible: true,
            label: 'S2',
            columns: columns
          };
        })
      };
    }
  }]);
  return S2GeometryLayer;
}(_baseLayer["default"]);

exports["default"] = S2GeometryLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvczItZ2VvbWV0cnktbGF5ZXIvczItZ2VvbWV0cnktbGF5ZXIuanMiXSwibmFtZXMiOlsiem9vbUZhY3RvclZhbHVlIiwiUzJfVE9LRU5fRklFTERTIiwidG9rZW4iLCJzMlJlcXVpcmVkQ29sdW1ucyIsIlMyVG9rZW5BY2Nlc3NvciIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwiZGVmYXVsdEVsZXZhdGlvbiIsImRlZmF1bHRMaW5lV2lkdGgiLCJTMlZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsImZpbGxlZCIsInR5cGUiLCJsYWJlbCIsImRlZmF1bHRWYWx1ZSIsInByb3BlcnR5IiwidGhpY2tuZXNzIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJzdHJva2VDb2xvciIsInN0cm9rZUNvbG9yUmFuZ2UiLCJzaXplUmFuZ2UiLCJzdHJva2VkIiwiZW5hYmxlM2QiLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJoZWlnaHRSYW5nZSIsIndpcmVmcmFtZSIsIlMyR2VvbWV0cnlMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiZGF0YUNvbnRhaW5lciIsImNvbmZpZyIsImNvbHVtbnMiLCJTMkxheWVySWNvbiIsInZpc3VhbENoYW5uZWxzIiwiY29sb3IiLCJhY2Nlc3NvciIsInNpemUiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJrZXkiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJudWxsVmFsdWUiLCJoZWlnaHQiLCJoZWlnaHRGaWVsZCIsImhlaWdodERvbWFpbiIsImhlaWdodFNjYWxlIiwic3Ryb2tlQ29sb3JGaWVsZCIsInN0cm9rZUNvbG9yRG9tYWluIiwic3Ryb2tlQ29sb3JTY2FsZSIsImdldFMyVG9rZW4iLCJmaWx0ZXJlZEluZGV4IiwiZGF0YSIsImkiLCJsZW5ndGgiLCJwdXNoIiwiY2VudHJvaWRzIiwicmVkdWNlIiwiYWNjIiwiZW50cnkiLCJzMlRva2VuIiwiY2VudHJvaWRzRGF0YUNvbnRhaW5lciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsImRhdGFUb0ZlYXR1cmUiLCJ1cGRhdGVNZXRhIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwib3B0cyIsImludGVyYWN0aW9uQ29uZmlnIiwibWFwU3RhdGUiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwiem9vbUZhY3RvciIsImdldFpvb21GYWN0b3IiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJTMkxheWVyIiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJsaW5lV2lkdGhTY2FsZSIsImxpbmVNaXRlckxpbWl0Iiwid3JhcExvbmdpdHVkZSIsImV4dHJ1ZGVkIiwicGlja2FibGUiLCJmaWVsZHMiLCJmb3VuZENvbHVtbnMiLCJmaW5kRGVmYXVsdENvbHVtbkZpZWxkIiwibWFwIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsZUFBZSxHQUFHLENBQXhCO0FBRU8sSUFBTUMsZUFBZSxHQUFHO0FBQzdCQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxJQUFELEVBQU8sVUFBUDtBQURzQixDQUF4Qjs7QUFJQSxJQUFNQyxpQkFBaUIsR0FBRyxDQUFDLE9BQUQsQ0FBMUI7OztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFFRixLQUFGLFFBQUVBLEtBQUY7QUFBQSxTQUFhLFVBQUFHLEVBQUU7QUFBQSxXQUFJLFVBQUFDLENBQUM7QUFBQSxhQUFJRCxFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CTixLQUFLLENBQUNPLFFBQTFCLENBQUo7QUFBQSxLQUFMO0FBQUEsR0FBZjtBQUFBLENBQXhCOzs7QUFFQSxJQUFNQyxnQkFBZ0IsR0FBRyxHQUF6Qjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxDQUF6Qjs7QUFFQSxJQUFNQyxZQUFZLEdBQUc7QUFDMUI7QUFDQUMsRUFBQUEsT0FBTyxFQUFFLFNBRmlCO0FBRzFCQyxFQUFBQSxVQUFVLEVBQUUsWUFIYztBQUkxQkMsRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLElBQUksRUFBRSxTQURBO0FBRU5DLElBQUFBLEtBQUssRUFBRSxZQUZEO0FBR05DLElBQUFBLFlBQVksRUFBRSxJQUhSO0FBSU5DLElBQUFBLFFBQVEsRUFBRTtBQUpKLEdBSmtCO0FBVzFCO0FBQ0FDLEVBQUFBLFNBQVMsa0NBQ0pDLGdDQUFrQkQsU0FEZDtBQUVQRixJQUFBQSxZQUFZLEVBQUU7QUFGUCxJQVppQjtBQWdCMUJJLEVBQUFBLFdBQVcsRUFBRSxhQWhCYTtBQWlCMUJDLEVBQUFBLGdCQUFnQixFQUFFLGtCQWpCUTtBQWtCMUJDLEVBQUFBLFNBQVMsRUFBRSxrQkFsQmU7QUFtQjFCQyxFQUFBQSxPQUFPLEVBQUUsU0FuQmlCO0FBcUIxQjtBQUNBQyxFQUFBQSxRQUFRLEVBQUUsVUF0QmdCO0FBdUIxQkMsRUFBQUEsY0FBYyxFQUFFLGdCQXZCVTtBQXdCMUJDLEVBQUFBLHlCQUF5QixFQUFFLDJCQXhCRDtBQXlCMUJDLEVBQUFBLFdBQVcsRUFBRSxnQkF6QmE7QUEyQjFCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRTtBQTVCZSxDQUFyQjs7O0lBK0JjQyxlOzs7OztBQUNuQiwyQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLDhCQUFNQSxLQUFOOztBQUNBLFVBQUtDLGlCQUFMLENBQXVCckIsWUFBdkI7O0FBQ0EsVUFBS3NCLG1CQUFMLEdBQTJCLFVBQUFDLGFBQWE7QUFBQSxhQUFJL0IsZUFBZSxDQUFDLE1BQUtnQyxNQUFMLENBQVlDLE9BQWIsQ0FBZixDQUFxQ0YsYUFBckMsQ0FBSjtBQUFBLEtBQXhDOztBQUhpQjtBQUlsQjs7OztTQUVELGVBQVc7QUFDVCxhQUFPLElBQVA7QUFDRDs7O1NBRUQsZUFBVztBQUNULGFBQU8sSUFBUDtBQUNEOzs7U0FFRCxlQUEyQjtBQUN6QixhQUFPaEMsaUJBQVA7QUFDRDs7O1NBRUQsZUFBZ0I7QUFDZCxhQUFPbUMsdUJBQVA7QUFDRDs7O1NBRUQsZUFBcUI7QUFDbkIsVUFBTUMsY0FBYyw2R0FBcEI7QUFDQSxhQUFPO0FBQ0xDLFFBQUFBLEtBQUssa0NBQ0FELGNBQWMsQ0FBQ0MsS0FEZjtBQUVIQyxVQUFBQSxRQUFRLEVBQUU7QUFGUCxVQURBO0FBS0xDLFFBQUFBLElBQUksa0NBQ0NILGNBQWMsQ0FBQ0csSUFEaEI7QUFFRnZCLFVBQUFBLFFBQVEsRUFBRSxRQUZSO0FBR0ZzQixVQUFBQSxRQUFRLEVBQUUsY0FIUjtBQUlGRSxVQUFBQSxTQUFTLEVBQUUsbUJBQUFQLE1BQU07QUFBQSxtQkFBSUEsTUFBTSxDQUFDUSxTQUFQLENBQWlCbkIsT0FBckI7QUFBQSxXQUpmO0FBS0ZQLFVBQUFBLFlBQVksRUFBRVA7QUFMWixVQUxDO0FBWUxXLFFBQUFBLFdBQVcsRUFBRTtBQUNYSCxVQUFBQSxRQUFRLEVBQUUsYUFEQztBQUVYMEIsVUFBQUEsS0FBSyxFQUFFLGtCQUZJO0FBR1hDLFVBQUFBLEtBQUssRUFBRSxrQkFISTtBQUlYQyxVQUFBQSxNQUFNLEVBQUUsbUJBSkc7QUFLWEMsVUFBQUEsS0FBSyxFQUFFLGtCQUxJO0FBTVhDLFVBQUFBLEdBQUcsRUFBRSxhQU5NO0FBT1hDLFVBQUFBLGdCQUFnQixFQUFFQyxnQ0FBZVgsS0FQdEI7QUFRWEMsVUFBQUEsUUFBUSxFQUFFLGNBUkM7QUFTWEUsVUFBQUEsU0FBUyxFQUFFLG1CQUFBUCxNQUFNO0FBQUEsbUJBQUlBLE1BQU0sQ0FBQ1EsU0FBUCxDQUFpQm5CLE9BQXJCO0FBQUEsV0FUTjtBQVVYMkIsVUFBQUEsU0FBUyxFQUFFYixjQUFjLENBQUNDLEtBQWYsQ0FBcUJZLFNBVnJCO0FBV1hsQyxVQUFBQSxZQUFZLEVBQUUsc0JBQUFrQixNQUFNO0FBQUEsbUJBQUlBLE1BQU0sQ0FBQ1EsU0FBUCxDQUFpQnRCLFdBQWpCLElBQWdDYyxNQUFNLENBQUNJLEtBQTNDO0FBQUE7QUFYVCxTQVpSO0FBeUJMYSxRQUFBQSxNQUFNLEVBQUU7QUFDTmxDLFVBQUFBLFFBQVEsRUFBRSxRQURKO0FBRU4wQixVQUFBQSxLQUFLLEVBQUUsYUFGRDtBQUdOQyxVQUFBQSxLQUFLLEVBQUUsYUFIRDtBQUlOQyxVQUFBQSxNQUFNLEVBQUUsY0FKRjtBQUtOQyxVQUFBQSxLQUFLLEVBQUUsYUFMRDtBQU1OQyxVQUFBQSxHQUFHLEVBQUUsUUFOQztBQU9OQyxVQUFBQSxnQkFBZ0IsRUFBRUMsZ0NBQWVULElBUDNCO0FBUU5ELFVBQUFBLFFBQVEsRUFBRSxjQVJKO0FBU05FLFVBQUFBLFNBQVMsRUFBRSxtQkFBQVAsTUFBTTtBQUFBLG1CQUFJQSxNQUFNLENBQUNRLFNBQVAsQ0FBaUJsQixRQUFyQjtBQUFBLFdBVFg7QUFVTjBCLFVBQUFBLFNBQVMsRUFBRSxDQVZMO0FBV05sQyxVQUFBQSxZQUFZLEVBQUVSO0FBWFI7QUF6QkgsT0FBUDtBQXVDRDs7O1dBRUQsaUNBQWtDO0FBQUEsVUFBWnNCLEtBQVksdUVBQUosRUFBSTtBQUNoQywwS0FDaUNBLEtBRGpDO0FBR0U7QUFDQXNCLFFBQUFBLFdBQVcsRUFBRSxJQUpmO0FBS0VDLFFBQUFBLFlBQVksRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBTGhCO0FBTUVDLFFBQUFBLFdBQVcsRUFBRSxRQU5mO0FBUUU7QUFDQUMsUUFBQUEsZ0JBQWdCLEVBQUUsSUFUcEI7QUFVRUMsUUFBQUEsaUJBQWlCLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQVZyQjtBQVdFQyxRQUFBQSxnQkFBZ0IsRUFBRTtBQVhwQjtBQWFEOzs7V0FpQkQsdUNBQXVEQyxVQUF2RCxFQUFtRTtBQUFBLFVBQTNDekIsYUFBMkMsU0FBM0NBLGFBQTJDO0FBQUEsVUFBNUIwQixhQUE0QixTQUE1QkEsYUFBNEI7QUFDakUsVUFBTUMsSUFBSSxHQUFHLEVBQWI7O0FBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixhQUFhLENBQUNHLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzdDLFlBQU12RCxLQUFLLEdBQUdxRCxhQUFhLENBQUNFLENBQUQsQ0FBM0I7QUFDQSxZQUFNN0QsS0FBSyxHQUFHMEQsVUFBVSxDQUFDO0FBQUNwRCxVQUFBQSxLQUFLLEVBQUxBO0FBQUQsU0FBRCxDQUF4Qjs7QUFFQSxZQUFJTixLQUFKLEVBQVc7QUFDVDRELFVBQUFBLElBQUksQ0FBQ0csSUFBTCxDQUFVO0FBQ1J6RCxZQUFBQSxLQUFLLEVBQUxBLEtBRFE7QUFFUk4sWUFBQUEsS0FBSyxFQUFMQTtBQUZRLFdBQVY7QUFJRDtBQUNGOztBQUNELGFBQU80RCxJQUFQO0FBQ0Q7OztXQUVELHlCQUFnQjNCLGFBQWhCLEVBQStCeUIsVUFBL0IsRUFBMkM7QUFDekM7QUFDQSxVQUFNTSxTQUFTLEdBQUcvQixhQUFhLENBQUNnQyxNQUFkLENBQ2hCLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFhN0QsS0FBYixFQUF1QjtBQUNyQixZQUFNOEQsT0FBTyxHQUFHVixVQUFVLENBQUM7QUFBQ3BELFVBQUFBLEtBQUssRUFBTEE7QUFBRCxTQUFELENBQTFCOztBQUNBLFlBQUk4RCxPQUFKLEVBQWE7QUFDWEYsVUFBQUEsR0FBRyxDQUFDSCxJQUFKLENBQVMsMEJBQVlLLE9BQVosQ0FBVDtBQUNEOztBQUNELGVBQU9GLEdBQVA7QUFDRCxPQVBlLEVBUWhCLEVBUmdCLEVBU2hCLElBVGdCLENBQWxCO0FBWUEsVUFBTUcsc0JBQXNCLEdBQUcscUNBQW9CTCxTQUFwQixDQUEvQjtBQUNBLFVBQU1NLE1BQU0sR0FBRyxLQUFLQyxlQUFMLENBQXFCRixzQkFBckIsRUFBNkMsVUFBQ2pFLENBQUQsRUFBSUQsRUFBSjtBQUFBLGVBQVcsQ0FDckVBLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0IsQ0FBcEIsQ0FEcUUsRUFFckVILEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0IsQ0FBcEIsQ0FGcUUsQ0FBWDtBQUFBLE9BQTdDLENBQWY7QUFJQSxXQUFLa0UsYUFBTCxHQUFxQjtBQUFDUixRQUFBQSxTQUFTLEVBQVRBO0FBQUQsT0FBckI7QUFDQSxXQUFLUyxVQUFMLENBQWdCO0FBQUNILFFBQUFBLE1BQU0sRUFBTkE7QUFBRCxPQUFoQjtBQUNEOzs7V0FFRCx5QkFBZ0JJLFFBQWhCLEVBQTBCQyxZQUExQixFQUFrRDtBQUFBLFVBQVZDLEdBQVUsdUVBQUosRUFBSTtBQUFBLGtDQUNiRixRQUFRLENBQUMsS0FBS3hDLE1BQUwsQ0FBWTJDLE1BQWIsQ0FESztBQUFBLFVBQ3pDQyxTQUR5Qyx5QkFDekNBLFNBRHlDO0FBQUEsVUFDOUI3QyxhQUQ4Qix5QkFDOUJBLGFBRDhCO0FBRWhELFVBQU15QixVQUFVLEdBQUcsS0FBSzFCLG1CQUFMLENBQXlCQyxhQUF6QixDQUFuQjs7QUFGZ0QsNkJBR2pDLEtBQUs4QyxVQUFMLENBQWdCTCxRQUFoQixFQUEwQkMsWUFBMUIsQ0FIaUM7QUFBQSxVQUd6Q2YsSUFIeUMsb0JBR3pDQSxJQUh5Qzs7QUFLaEQsVUFBTW9CLFNBQVMsR0FBRyxLQUFLQyxxQkFBTCxDQUEyQjtBQUFDaEQsUUFBQUEsYUFBYSxFQUFiQTtBQUFELE9BQTNCLENBQWxCO0FBRUE7QUFDRTJCLFFBQUFBLElBQUksRUFBSkEsSUFERjtBQUVFRixRQUFBQSxVQUFVLEVBQVZBLFVBRkY7QUFHRXdCLFFBQUFBLGNBQWMsRUFBRUosU0FBUyxDQUFDSyxtQkFBVixDQUE4QmxELGFBQTlCO0FBSGxCLFNBSUsrQyxTQUpMO0FBTUQ7OztXQUVELHFCQUFZSSxJQUFaLEVBQWtCO0FBQUEsVUFDVHhCLElBRFMsR0FDdUN3QixJQUR2QyxDQUNUeEIsSUFEUztBQUFBLFVBQ0hrQixTQURHLEdBQ3VDTSxJQUR2QyxDQUNITixTQURHO0FBQUEsVUFDUU8saUJBRFIsR0FDdUNELElBRHZDLENBQ1FDLGlCQURSO0FBQUEsVUFDMkJDLFFBRDNCLEdBQ3VDRixJQUR2QyxDQUMyQkUsUUFEM0I7QUFHaEIsVUFBTUMsaUJBQWlCLEdBQUcsS0FBS0Msd0JBQUwsQ0FBOEJKLElBQTlCLENBQTFCO0FBRUEsVUFBTUssYUFBYSxHQUFHLEtBQUtDLHNCQUFMLENBQTRCSixRQUE1QixDQUF0QjtBQUNBLFVBQU1LLFVBQVUsR0FBRyxLQUFLQyxhQUFMLENBQW1CTixRQUFuQixDQUFuQjtBQU5nQixVQU9UcEQsTUFQUyxHQU9DLElBUEQsQ0FPVEEsTUFQUztBQUFBLFVBUVRRLFNBUlMsR0FRSVIsTUFSSixDQVFUUSxTQVJTOztBQVVoQixVQUFNbUQsY0FBYyxtQ0FDZixLQUFLQyw4QkFBTCxFQURlO0FBRWxCWixRQUFBQSxjQUFjLEVBQUVKLFNBQVMsQ0FBQ2lCO0FBRlIsUUFBcEI7O0FBS0EsYUFBTyxDQUNMLElBQUlDLGtCQUFKLDZEQUNLVCxpQkFETCxHQUVLRixpQkFGTCxHQUdLekIsSUFITDtBQUlFRixRQUFBQSxVQUFVLEVBQUUsb0JBQUF0RCxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ0osS0FBTjtBQUFBLFNBSmY7QUFNRWlHLFFBQUFBLGFBQWEsRUFBRXZELFNBQVMsQ0FBQ2xCLFFBTjNCO0FBT0UwRSxRQUFBQSxjQUFjLEVBQUVDLGtDQVBsQjtBQVNFO0FBQ0FDLFFBQUFBLGNBQWMsRUFBRTFELFNBQVMsQ0FBQ3hCLFNBQVYsR0FBc0J5RSxVQUF0QixHQUFtQzdGLGVBVnJEO0FBV0V5QixRQUFBQSxPQUFPLEVBQUVtQixTQUFTLENBQUNuQixPQVhyQjtBQVlFOEUsUUFBQUEsY0FBYyxFQUFFLENBWmxCO0FBY0U7QUFDQXhGLFFBQUFBLE1BQU0sRUFBRTZCLFNBQVMsQ0FBQzdCLE1BZnBCO0FBZ0JFRixRQUFBQSxPQUFPLEVBQUUrQixTQUFTLENBQUMvQixPQWhCckI7QUFpQkUyRixRQUFBQSxhQUFhLEVBQUUsS0FqQmpCO0FBbUJFO0FBQ0E3RSxRQUFBQSxjQUFjLEVBQUVpQixTQUFTLENBQUNqQixjQUFWLEdBQTJCZ0UsYUFwQjdDO0FBcUJFYyxRQUFBQSxRQUFRLEVBQUU3RCxTQUFTLENBQUNsQixRQXJCdEI7QUF1QkVJLFFBQUFBLFNBQVMsRUFBRWMsU0FBUyxDQUFDZCxTQXZCdkI7QUF5QkU0RSxRQUFBQSxRQUFRLEVBQUUsSUF6Qlo7QUEyQkVYLFFBQUFBLGNBQWMsRUFBZEE7QUEzQkYsU0FESyxDQUFQO0FBK0JEOzs7V0FuSEQsc0NBQTRDO0FBQUEsK0JBQWRZLE1BQWM7QUFBQSxVQUFkQSxNQUFjLDZCQUFMLEVBQUs7QUFDMUMsVUFBTUMsWUFBWSxHQUFHLEtBQUtDLHNCQUFMLENBQTRCNUcsZUFBNUIsRUFBNkMwRyxNQUE3QyxDQUFyQjs7QUFDQSxVQUFJLENBQUNDLFlBQUQsSUFBaUIsQ0FBQ0EsWUFBWSxDQUFDNUMsTUFBbkMsRUFBMkM7QUFDekMsZUFBTztBQUFDaEMsVUFBQUEsS0FBSyxFQUFFO0FBQVIsU0FBUDtBQUNEOztBQUVELGFBQU87QUFDTEEsUUFBQUEsS0FBSyxFQUFFNEUsWUFBWSxDQUFDRSxHQUFiLENBQWlCLFVBQUF6RSxPQUFPO0FBQUEsaUJBQUs7QUFDbEMwRSxZQUFBQSxTQUFTLEVBQUUsSUFEdUI7QUFFbEM5RixZQUFBQSxLQUFLLEVBQUUsSUFGMkI7QUFHbENvQixZQUFBQSxPQUFPLEVBQVBBO0FBSGtDLFdBQUw7QUFBQSxTQUF4QjtBQURGLE9BQVA7QUFPRDs7O0VBL0YwQzJFLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtTMkxheWVyfSBmcm9tICdAZGVjay5nbC9nZW8tbGF5ZXJzJztcbmltcG9ydCB7SElHSExJR0hfQ09MT1JfM0QsIENIQU5ORUxfU0NBTEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0xBWUVSX1ZJU19DT05GSUdTfSBmcm9tICdsYXllcnMvbGF5ZXItZmFjdG9yeSc7XG5pbXBvcnQge2NyZWF0ZURhdGFDb250YWluZXJ9IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzJztcbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCBTMkxheWVySWNvbiBmcm9tICcuL3MyLWxheWVyLWljb24nO1xuaW1wb3J0IHtnZXRTMkNlbnRlcn0gZnJvbSAnLi9zMi11dGlscyc7XG5cbmNvbnN0IHpvb21GYWN0b3JWYWx1ZSA9IDg7XG5cbmV4cG9ydCBjb25zdCBTMl9UT0tFTl9GSUVMRFMgPSB7XG4gIHRva2VuOiBbJ3MyJywgJ3MyX3Rva2VuJ11cbn07XG5cbmV4cG9ydCBjb25zdCBzMlJlcXVpcmVkQ29sdW1ucyA9IFsndG9rZW4nXTtcbmV4cG9ydCBjb25zdCBTMlRva2VuQWNjZXNzb3IgPSAoe3Rva2VufSkgPT4gZGMgPT4gZCA9PiBkYy52YWx1ZUF0KGQuaW5kZXgsIHRva2VuLmZpZWxkSWR4KTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRFbGV2YXRpb24gPSA1MDA7XG5leHBvcnQgY29uc3QgZGVmYXVsdExpbmVXaWR0aCA9IDE7XG5cbmV4cG9ydCBjb25zdCBTMlZpc0NvbmZpZ3MgPSB7XG4gIC8vIEZpbGxlZCBjb2xvclxuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgZmlsbGVkOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGxhYmVsOiAnRmlsbCBDb2xvcicsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIHByb3BlcnR5OiAnZmlsbGVkJ1xuICB9LFxuXG4gIC8vIHN0cm9rZVxuICB0aGlja25lc3M6IHtcbiAgICAuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3MsXG4gICAgZGVmYXVsdFZhbHVlOiAwLjVcbiAgfSxcbiAgc3Ryb2tlQ29sb3I6ICdzdHJva2VDb2xvcicsXG4gIHN0cm9rZUNvbG9yUmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgc2l6ZVJhbmdlOiAnc3Ryb2tlV2lkdGhSYW5nZScsXG4gIHN0cm9rZWQ6ICdzdHJva2VkJyxcblxuICAvLyBoZWlnaHRcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCcsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICBlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yOiAnZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcicsXG4gIGhlaWdodFJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuXG4gIC8vIHdpcmVmcmFtZVxuICB3aXJlZnJhbWU6ICd3aXJlZnJhbWUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTMkdlb21ldHJ5TGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoUzJWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+IFMyVG9rZW5BY2Nlc3Nvcih0aGlzLmNvbmZpZy5jb2x1bW5zKShkYXRhQ29udGFpbmVyKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnczInO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdTMic7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHMyUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gUzJMYXllckljb247XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbHMgPSBzdXBlci52aXN1YWxDaGFubmVscztcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RmlsbENvbG9yJ1xuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldExpbmVXaWR0aCcsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0TGluZVdpZHRoXG4gICAgICB9LFxuICAgICAgc3Ryb2tlQ29sb3I6IHtcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2VDb2xvcicsXG4gICAgICAgIGZpZWxkOiAnc3Ryb2tlQ29sb3JGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc3Ryb2tlQ29sb3JTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ3N0cm9rZUNvbG9yRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgICAgICAga2V5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRMaW5lQ29sb3InLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZWQsXG4gICAgICAgIG51bGxWYWx1ZTogdmlzdWFsQ2hhbm5lbHMuY29sb3IubnVsbFZhbHVlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnaGVpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ2hlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnaGVpZ2h0RG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdoZWlnaHRSYW5nZScsXG4gICAgICAgIGtleTogJ2hlaWdodCcsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnNpemUsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RWxldmF0aW9uJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgbnVsbFZhbHVlOiAwLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRFbGV2YXRpb25cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcblxuICAgICAgLy8gYWRkIGhlaWdodCB2aXN1YWwgY2hhbm5lbFxuICAgICAgaGVpZ2h0RmllbGQ6IG51bGwsXG4gICAgICBoZWlnaHREb21haW46IFswLCAxXSxcbiAgICAgIGhlaWdodFNjYWxlOiAnbGluZWFyJyxcblxuICAgICAgLy8gYWRkIHN0cm9rZSBjb2xvciB2aXN1YWwgY2hhbm5lbFxuICAgICAgc3Ryb2tlQ29sb3JGaWVsZDogbnVsbCxcbiAgICAgIHN0cm9rZUNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBzdHJva2VDb2xvclNjYWxlOiAncXVhbnRpbGUnXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkcyA9IFtdfSkge1xuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChTMl9UT0tFTl9GSUVMRFMsIGZpZWxkcyk7XG4gICAgaWYgKCFmb3VuZENvbHVtbnMgfHwgIWZvdW5kQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7cHJvcHM6IFtdfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IGZvdW5kQ29sdW1ucy5tYXAoY29sdW1ucyA9PiAoe1xuICAgICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICAgIGxhYmVsOiAnUzInLFxuICAgICAgICBjb2x1bW5zXG4gICAgICB9KSlcbiAgICB9O1xuICB9XG5cbiAgY2FsY3VsYXRlRGF0YUF0dHJpYnV0ZSh7ZGF0YUNvbnRhaW5lciwgZmlsdGVyZWRJbmRleH0sIGdldFMyVG9rZW4pIHtcbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGZpbHRlcmVkSW5kZXhbaV07XG4gICAgICBjb25zdCB0b2tlbiA9IGdldFMyVG9rZW4oe2luZGV4fSk7XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIHRva2VuXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyTWV0YShkYXRhQ29udGFpbmVyLCBnZXRTMlRva2VuKSB7XG4gICAgLy8gYWRkIHNhZmUgcm93IGZsYWdcbiAgICBjb25zdCBjZW50cm9pZHMgPSBkYXRhQ29udGFpbmVyLnJlZHVjZShcbiAgICAgIChhY2MsIGVudHJ5LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzMlRva2VuID0gZ2V0UzJUb2tlbih7aW5kZXh9KTtcbiAgICAgICAgaWYgKHMyVG9rZW4pIHtcbiAgICAgICAgICBhY2MucHVzaChnZXRTMkNlbnRlcihzMlRva2VuKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICBbXSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3QgY2VudHJvaWRzRGF0YUNvbnRhaW5lciA9IGNyZWF0ZURhdGFDb250YWluZXIoY2VudHJvaWRzKTtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhjZW50cm9pZHNEYXRhQ29udGFpbmVyLCAoZCwgZGMpID0+IFtcbiAgICAgIGRjLnZhbHVlQXQoZC5pbmRleCwgMCksXG4gICAgICBkYy52YWx1ZUF0KGQuaW5kZXgsIDEpXG4gICAgXSk7XG4gICAgdGhpcy5kYXRhVG9GZWF0dXJlID0ge2NlbnRyb2lkc307XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCBnZXRTMlRva2VuID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMudXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldFMyVG9rZW4sXG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZ3B1RmlsdGVyLmZpbHRlclZhbHVlQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikoKSxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcihvcHRzKSB7XG4gICAgY29uc3Qge2RhdGEsIGdwdUZpbHRlciwgaW50ZXJhY3Rpb25Db25maWcsIG1hcFN0YXRlfSA9IG9wdHM7XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuXG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gY29uZmlnO1xuXG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycygpLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzXG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgUzJMYXllcih7XG4gICAgICAgIC4uLmRlZmF1bHRMYXllclByb3BzLFxuICAgICAgICAuLi5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgZ2V0UzJUb2tlbjogZCA9PiBkLnRva2VuLFxuXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuXG4gICAgICAgIC8vIHN0cm9rZVxuICAgICAgICBsaW5lV2lkdGhTY2FsZTogdmlzQ29uZmlnLnRoaWNrbmVzcyAqIHpvb21GYWN0b3IgKiB6b29tRmFjdG9yVmFsdWUsXG4gICAgICAgIHN0cm9rZWQ6IHZpc0NvbmZpZy5zdHJva2VkLFxuICAgICAgICBsaW5lTWl0ZXJMaW1pdDogMixcblxuICAgICAgICAvLyBGaWxsZWQgY29sb3JcbiAgICAgICAgZmlsbGVkOiB2aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBvcGFjaXR5OiB2aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG5cbiAgICAgICAgLy8gRWxldmF0aW9uXG4gICAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUgKiBlbGVab29tRmFjdG9yLFxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuXG4gICAgICAgIHdpcmVmcmFtZTogdmlzQ29uZmlnLndpcmVmcmFtZSxcblxuICAgICAgICBwaWNrYWJsZTogdHJ1ZSxcblxuICAgICAgICB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgfSlcbiAgICBdO1xuICB9XG59XG4iXX0=