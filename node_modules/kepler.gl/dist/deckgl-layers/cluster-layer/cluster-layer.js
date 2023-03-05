"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.clusterAggregation = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _layers = require("@deck.gl/layers");

var _aggregationLayers = require("@deck.gl/aggregation-layers");

var _geoViewport = _interopRequireDefault(require("@mapbox/geo-viewport"));

var _cpuAggregator = _interopRequireWildcard(require("../layer-utils/cpu-aggregator"));

var _viewportMercatorProject = require("viewport-mercator-project");

var _d3Array = require("d3-array");

var _layerFactory = require("../../layers/layer-factory");

var _defaultSettings = require("../../constants/default-settings");

var _colorRanges = require("../../constants/color-ranges");

var _clusterUtils = _interopRequireWildcard(require("../layer-utils/cluster-utils"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultRadius = _layerFactory.LAYER_VIS_CONFIGS.clusterRadius.defaultValue;
var defaultRadiusRange = _layerFactory.LAYER_VIS_CONFIGS.clusterRadiusRange.defaultValue;

var defaultGetColorValue = function defaultGetColorValue(points) {
  return points.length;
};

var defaultGetRadiusValue = function defaultGetRadiusValue(cell) {
  return cell.filteredPoints ? cell.filteredPoints.length : cell.points.length;
};

function processGeoJSON(step, props, aggregation, _ref) {
  var viewport = _ref.viewport;
  var data = props.data,
      getPosition = props.getPosition,
      filterData = props.filterData;
  var geoJSON = (0, _clusterUtils.getGeoJSON)(data, getPosition, filterData);
  var clusterBuilder = new _clusterUtils["default"]();
  this.setState({
    geoJSON: geoJSON,
    clusterBuilder: clusterBuilder
  });
}

function getClusters(step, props, aggregation, _ref2) {
  var viewport = _ref2.viewport;
  var _this$state = this.state,
      geoJSON = _this$state.geoJSON,
      clusterBuilder = _this$state.clusterBuilder;
  var clusterRadius = props.clusterRadius,
      zoom = props.zoom,
      width = props.width,
      height = props.height;
  var longitude = viewport.longitude,
      latitude = viewport.latitude; // zoom needs to be an integer for the different map utils. Also helps with cache key.

  var bbox = _geoViewport["default"].bounds([longitude, latitude], zoom, [width, height]);

  var clusters = clusterBuilder.clustersAtZoom({
    bbox: bbox,
    clusterRadius: clusterRadius,
    geoJSON: geoJSON,
    zoom: zoom
  });
  this.setState({
    layerData: {
      data: clusters
    }
  });
}

function getSubLayerRadius(dimensionState, dimension, layerProps) {
  return function (cell) {
    var getRadiusValue = layerProps.getRadiusValue;
    var scaleFunc = dimensionState.scaleFunc;
    return scaleFunc(getRadiusValue(cell));
  };
}

var clusterAggregation = {
  key: 'position',
  updateSteps: [{
    key: 'geojson',
    triggers: {
      position: {
        prop: 'getPosition',
        updateTrigger: 'getPosition'
      },
      filterData: {
        prop: 'filterData',
        updateTrigger: 'filterData'
      }
    },
    updater: processGeoJSON
  }, {
    key: 'clustering',
    triggers: {
      clusterRadius: {
        prop: 'clusterRadius'
      },
      zoom: {
        prop: 'zoom'
      },
      width: {
        prop: 'width'
      },
      height: {
        prop: 'height'
      }
    },
    updater: getClusters
  }]
};
exports.clusterAggregation = clusterAggregation;

function getRadiusValueDomain(step, props, dimensionUpdater) {
  var key = dimensionUpdater.key;
  var getRadiusValue = props.getRadiusValue;
  var layerData = this.state.layerData;
  var valueDomain = [0, (0, _d3Array.max)(layerData.data, getRadiusValue)];

  this._setDimensionState(key, {
    valueDomain: valueDomain
  });
}

var clusterLayerDimensions = [_cpuAggregator.defaultColorDimension, {
  key: 'radius',
  accessor: 'getRadius',
  nullValue: 0,
  updateSteps: [{
    key: 'getDomain',
    triggers: {
      value: {
        prop: 'getRadiusValue',
        updateTrigger: 'getRadiusValue'
      }
    },
    updater: getRadiusValueDomain
  }, {
    key: 'getScaleFunc',
    triggers: {
      domain: {
        prop: 'radiusDomain'
      },
      range: {
        prop: 'radiusRange'
      },
      scaleType: {
        prop: 'radiusScaleType'
      }
    },
    updater: _cpuAggregator.getDimensionScale
  }],
  getSubLayerAccessor: getSubLayerRadius,
  getPickingInfo: function getPickingInfo(dimensionState, cell, layerProps) {
    var radiusValue = layerProps.getRadiusValue(cell);
    return {
      radiusValue: radiusValue
    };
  }
}];
var defaultProps = {
  clusterRadius: defaultRadius,
  colorDomain: null,
  colorRange: _colorRanges.DEFAULT_COLOR_RANGE,
  colorScaleType: _defaultSettings.SCALE_TYPES.quantize,
  radiusScaleType: _defaultSettings.SCALE_TYPES.sqrt,
  radiusRange: defaultRadiusRange,
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getColorValue: {
    type: 'accessor',
    value: defaultGetColorValue
  },
  getRadiusValue: {
    type: 'accessor',
    value: defaultGetRadiusValue
  }
};

var ClusterLayer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(ClusterLayer, _AggregationLayer);

  var _super = _createSuper(ClusterLayer);

  function ClusterLayer() {
    (0, _classCallCheck2["default"])(this, ClusterLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ClusterLayer, [{
    key: "initializeState",
    value: function initializeState() {
      var cpuAggregator = new _cpuAggregator["default"]({
        aggregation: clusterAggregation,
        dimensions: clusterLayerDimensions
      });
      this.state = {
        cpuAggregator: cpuAggregator,
        aggregatorState: cpuAggregator.state
      };
      var attributeManager = this.getAttributeManager();
      attributeManager.add({
        positions: {
          size: 3,
          accessor: 'getPosition'
        }
      });
    }
  }, {
    key: "updateState",
    value: function updateState(_ref3) {
      var oldProps = _ref3.oldProps,
          props = _ref3.props,
          changeFlags = _ref3.changeFlags;
      this.setState({
        // make a copy of the internal state of cpuAggregator for testing
        aggregatorState: this.state.cpuAggregator.updateState({
          oldProps: oldProps,
          props: props,
          changeFlags: changeFlags
        }, {
          viewport: this.context.viewport,
          attributes: this.getAttributes(),
          numInstances: this.getNumInstances(props)
        })
      });
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(_ref4) {
      var info = _ref4.info;
      return this.state.cpuAggregator.getPickingInfo({
        info: info
      }, this.props);
    }
  }, {
    key: "_getSublayerUpdateTriggers",
    value: function _getSublayerUpdateTriggers() {
      return this.state.cpuAggregator.getUpdateTriggers(this.props);
    }
  }, {
    key: "_getSubLayerAccessors",
    value: function _getSubLayerAccessors() {
      return {
        getRadius: this.state.cpuAggregator.getAccessor('radius', this.props),
        getFillColor: this.state.cpuAggregator.getAccessor('fillColor', this.props)
      };
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      // for subclassing, override this method to return
      // customized sub layer props
      var _this$props = this.props,
          id = _this$props.id,
          radiusScale = _this$props.radiusScale;
      var cpuAggregator = this.state.cpuAggregator; // base layer props

      var _this$props2 = this.props,
          visible = _this$props2.visible,
          opacity = _this$props2.opacity,
          pickable = _this$props2.pickable,
          autoHighlight = _this$props2.autoHighlight,
          highlightColor = _this$props2.highlightColor;

      var updateTriggers = this._getSublayerUpdateTriggers();

      var accessors = this._getSubLayerAccessors();

      var distanceScale = (0, _viewportMercatorProject.getDistanceScales)(this.context.viewport);
      var metersPerPixel = distanceScale.metersPerPixel[0]; // return props to the sublayer constructor

      return new _layers.ScatterplotLayer(_objectSpread({
        id: "".concat(id, "-cluster"),
        data: cpuAggregator.state.layerData.data,
        radiusScale: metersPerPixel * radiusScale,
        visible: visible,
        opacity: opacity,
        pickable: pickable,
        autoHighlight: autoHighlight,
        highlightColor: highlightColor,
        updateTriggers: updateTriggers
      }, accessors));
    }
  }]);
  return ClusterLayer;
}(_aggregationLayers._AggregationLayer);

exports["default"] = ClusterLayer;
ClusterLayer.layerName = 'ClusterLayer';
ClusterLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2NsdXN0ZXItbGF5ZXIvY2x1c3Rlci1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UmFkaXVzIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJjbHVzdGVyUmFkaXVzIiwiZGVmYXVsdFZhbHVlIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwiY2x1c3RlclJhZGl1c1JhbmdlIiwiZGVmYXVsdEdldENvbG9yVmFsdWUiLCJwb2ludHMiLCJsZW5ndGgiLCJkZWZhdWx0R2V0UmFkaXVzVmFsdWUiLCJjZWxsIiwiZmlsdGVyZWRQb2ludHMiLCJwcm9jZXNzR2VvSlNPTiIsInN0ZXAiLCJwcm9wcyIsImFnZ3JlZ2F0aW9uIiwidmlld3BvcnQiLCJkYXRhIiwiZ2V0UG9zaXRpb24iLCJmaWx0ZXJEYXRhIiwiZ2VvSlNPTiIsImNsdXN0ZXJCdWlsZGVyIiwiQ2x1c3RlckJ1aWxkZXIiLCJzZXRTdGF0ZSIsImdldENsdXN0ZXJzIiwic3RhdGUiLCJ6b29tIiwid2lkdGgiLCJoZWlnaHQiLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsImJib3giLCJnZW9WaWV3cG9ydCIsImJvdW5kcyIsImNsdXN0ZXJzIiwiY2x1c3RlcnNBdFpvb20iLCJsYXllckRhdGEiLCJnZXRTdWJMYXllclJhZGl1cyIsImRpbWVuc2lvblN0YXRlIiwiZGltZW5zaW9uIiwibGF5ZXJQcm9wcyIsImdldFJhZGl1c1ZhbHVlIiwic2NhbGVGdW5jIiwiY2x1c3RlckFnZ3JlZ2F0aW9uIiwia2V5IiwidXBkYXRlU3RlcHMiLCJ0cmlnZ2VycyIsInBvc2l0aW9uIiwicHJvcCIsInVwZGF0ZVRyaWdnZXIiLCJ1cGRhdGVyIiwiZ2V0UmFkaXVzVmFsdWVEb21haW4iLCJkaW1lbnNpb25VcGRhdGVyIiwidmFsdWVEb21haW4iLCJfc2V0RGltZW5zaW9uU3RhdGUiLCJjbHVzdGVyTGF5ZXJEaW1lbnNpb25zIiwiZGVmYXVsdENvbG9yRGltZW5zaW9uIiwiYWNjZXNzb3IiLCJudWxsVmFsdWUiLCJ2YWx1ZSIsImRvbWFpbiIsInJhbmdlIiwic2NhbGVUeXBlIiwiZ2V0RGltZW5zaW9uU2NhbGUiLCJnZXRTdWJMYXllckFjY2Vzc29yIiwiZ2V0UGlja2luZ0luZm8iLCJyYWRpdXNWYWx1ZSIsImRlZmF1bHRQcm9wcyIsImNvbG9yRG9tYWluIiwiY29sb3JSYW5nZSIsIkRFRkFVTFRfQ09MT1JfUkFOR0UiLCJjb2xvclNjYWxlVHlwZSIsIlNDQUxFX1RZUEVTIiwicXVhbnRpemUiLCJyYWRpdXNTY2FsZVR5cGUiLCJzcXJ0IiwicmFkaXVzUmFuZ2UiLCJ0eXBlIiwieCIsImdldENvbG9yVmFsdWUiLCJDbHVzdGVyTGF5ZXIiLCJjcHVBZ2dyZWdhdG9yIiwiQ1BVQWdncmVnYXRvciIsImRpbWVuc2lvbnMiLCJhZ2dyZWdhdG9yU3RhdGUiLCJhdHRyaWJ1dGVNYW5hZ2VyIiwiZ2V0QXR0cmlidXRlTWFuYWdlciIsImFkZCIsInBvc2l0aW9ucyIsInNpemUiLCJvbGRQcm9wcyIsImNoYW5nZUZsYWdzIiwidXBkYXRlU3RhdGUiLCJjb250ZXh0IiwiYXR0cmlidXRlcyIsImdldEF0dHJpYnV0ZXMiLCJudW1JbnN0YW5jZXMiLCJnZXROdW1JbnN0YW5jZXMiLCJpbmZvIiwiZ2V0VXBkYXRlVHJpZ2dlcnMiLCJnZXRSYWRpdXMiLCJnZXRBY2Nlc3NvciIsImdldEZpbGxDb2xvciIsImlkIiwicmFkaXVzU2NhbGUiLCJ2aXNpYmxlIiwib3BhY2l0eSIsInBpY2thYmxlIiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwidXBkYXRlVHJpZ2dlcnMiLCJfZ2V0U3VibGF5ZXJVcGRhdGVUcmlnZ2VycyIsImFjY2Vzc29ycyIsIl9nZXRTdWJMYXllckFjY2Vzc29ycyIsImRpc3RhbmNlU2NhbGUiLCJtZXRlcnNQZXJQaXhlbCIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJBZ2dyZWdhdGlvbkxheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUEsV0FBVyxFQUFFVyxjQUFjLEdBQUdYLFdBSHpCO0FBSUxDLFFBQUFBLE9BQU8sRUFBUEEsT0FKSztBQUtMQyxRQUFBQSxPQUFPLEVBQVBBLE9BTEs7QUFNTEMsUUFBQUEsUUFBUSxFQUFSQSxRQU5LO0FBT0xDLFFBQUFBLGFBQWEsRUFBYkEsYUFQSztBQVFMQyxRQUFBQSxjQUFjLEVBQWRBLGNBUks7QUFTTEMsUUFBQUEsY0FBYyxFQUFkQTtBQVRLLFNBVUZFLFNBVkUsRUFBUDtBQVlEOzs7RUF6RXVDSyxvQzs7O0FBNEUxQ3JDLFlBQVksQ0FBQ3NDLFNBQWIsR0FBeUIsY0FBekI7QUFDQXRDLFlBQVksQ0FBQ2IsWUFBYixHQUE0QkEsWUFBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5pbXBvcnQge19BZ2dyZWdhdGlvbkxheWVyIGFzIEFnZ3JlZ2F0aW9uTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2FnZ3JlZ2F0aW9uLWxheWVycyc7XG5cbmltcG9ydCBnZW9WaWV3cG9ydCBmcm9tICdAbWFwYm94L2dlby12aWV3cG9ydCc7XG5pbXBvcnQgQ1BVQWdncmVnYXRvciwge1xuICBkZWZhdWx0Q29sb3JEaW1lbnNpb24sXG4gIGdldERpbWVuc2lvblNjYWxlXG59IGZyb20gJy4uL2xheWVyLXV0aWxzL2NwdS1hZ2dyZWdhdG9yJztcbmltcG9ydCB7Z2V0RGlzdGFuY2VTY2FsZXN9IGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuaW1wb3J0IHttYXh9IGZyb20gJ2QzLWFycmF5JztcblxuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuaW1wb3J0IHtTQ0FMRV9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtERUZBVUxUX0NPTE9SX1JBTkdFfSBmcm9tICdjb25zdGFudHMvY29sb3ItcmFuZ2VzJztcbmltcG9ydCBDbHVzdGVyQnVpbGRlciwge2dldEdlb0pTT059IGZyb20gJy4uL2xheWVyLXV0aWxzL2NsdXN0ZXItdXRpbHMnO1xuXG5jb25zdCBkZWZhdWx0UmFkaXVzID0gTEFZRVJfVklTX0NPTkZJR1MuY2x1c3RlclJhZGl1cy5kZWZhdWx0VmFsdWU7XG5jb25zdCBkZWZhdWx0UmFkaXVzUmFuZ2UgPSBMQVlFUl9WSVNfQ09ORklHUy5jbHVzdGVyUmFkaXVzUmFuZ2UuZGVmYXVsdFZhbHVlO1xuXG5jb25zdCBkZWZhdWx0R2V0Q29sb3JWYWx1ZSA9IHBvaW50cyA9PiBwb2ludHMubGVuZ3RoO1xuY29uc3QgZGVmYXVsdEdldFJhZGl1c1ZhbHVlID0gY2VsbCA9PlxuICBjZWxsLmZpbHRlcmVkUG9pbnRzID8gY2VsbC5maWx0ZXJlZFBvaW50cy5sZW5ndGggOiBjZWxsLnBvaW50cy5sZW5ndGg7XG5cbmZ1bmN0aW9uIHByb2Nlc3NHZW9KU09OKHN0ZXAsIHByb3BzLCBhZ2dyZWdhdGlvbiwge3ZpZXdwb3J0fSkge1xuICBjb25zdCB7ZGF0YSwgZ2V0UG9zaXRpb24sIGZpbHRlckRhdGF9ID0gcHJvcHM7XG4gIGNvbnN0IGdlb0pTT04gPSBnZXRHZW9KU09OKGRhdGEsIGdldFBvc2l0aW9uLCBmaWx0ZXJEYXRhKTtcbiAgY29uc3QgY2x1c3RlckJ1aWxkZXIgPSBuZXcgQ2x1c3RlckJ1aWxkZXIoKTtcblxuICB0aGlzLnNldFN0YXRlKHtnZW9KU09OLCBjbHVzdGVyQnVpbGRlcn0pO1xufVxuXG5mdW5jdGlvbiBnZXRDbHVzdGVycyhzdGVwLCBwcm9wcywgYWdncmVnYXRpb24sIHt2aWV3cG9ydH0pIHtcbiAgY29uc3Qge2dlb0pTT04sIGNsdXN0ZXJCdWlsZGVyfSA9IHRoaXMuc3RhdGU7XG4gIGNvbnN0IHtjbHVzdGVyUmFkaXVzLCB6b29tLCB3aWR0aCwgaGVpZ2h0fSA9IHByb3BzO1xuICBjb25zdCB7bG9uZ2l0dWRlLCBsYXRpdHVkZX0gPSB2aWV3cG9ydDtcblxuICAvLyB6b29tIG5lZWRzIHRvIGJlIGFuIGludGVnZXIgZm9yIHRoZSBkaWZmZXJlbnQgbWFwIHV0aWxzLiBBbHNvIGhlbHBzIHdpdGggY2FjaGUga2V5LlxuICBjb25zdCBiYm94ID0gZ2VvVmlld3BvcnQuYm91bmRzKFtsb25naXR1ZGUsIGxhdGl0dWRlXSwgem9vbSwgW3dpZHRoLCBoZWlnaHRdKTtcbiAgY29uc3QgY2x1c3RlcnMgPSBjbHVzdGVyQnVpbGRlci5jbHVzdGVyc0F0Wm9vbSh7YmJveCwgY2x1c3RlclJhZGl1cywgZ2VvSlNPTiwgem9vbX0pO1xuXG4gIHRoaXMuc2V0U3RhdGUoe1xuICAgIGxheWVyRGF0YToge2RhdGE6IGNsdXN0ZXJzfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U3ViTGF5ZXJSYWRpdXMoZGltZW5zaW9uU3RhdGUsIGRpbWVuc2lvbiwgbGF5ZXJQcm9wcykge1xuICByZXR1cm4gY2VsbCA9PiB7XG4gICAgY29uc3Qge2dldFJhZGl1c1ZhbHVlfSA9IGxheWVyUHJvcHM7XG4gICAgY29uc3Qge3NjYWxlRnVuY30gPSBkaW1lbnNpb25TdGF0ZTtcbiAgICByZXR1cm4gc2NhbGVGdW5jKGdldFJhZGl1c1ZhbHVlKGNlbGwpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsdXN0ZXJBZ2dyZWdhdGlvbiA9IHtcbiAga2V5OiAncG9zaXRpb24nLFxuICB1cGRhdGVTdGVwczogW1xuICAgIHtcbiAgICAgIGtleTogJ2dlb2pzb24nLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICBwcm9wOiAnZ2V0UG9zaXRpb24nLFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXI6ICdnZXRQb3NpdGlvbidcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyRGF0YToge1xuICAgICAgICAgIHByb3A6ICdmaWx0ZXJEYXRhJyxcbiAgICAgICAgICB1cGRhdGVUcmlnZ2VyOiAnZmlsdGVyRGF0YSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IHByb2Nlc3NHZW9KU09OXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjbHVzdGVyaW5nJyxcbiAgICAgIHRyaWdnZXJzOiB7XG4gICAgICAgIGNsdXN0ZXJSYWRpdXM6IHtcbiAgICAgICAgICBwcm9wOiAnY2x1c3RlclJhZGl1cydcbiAgICAgICAgfSxcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIHByb3A6ICd6b29tJ1xuICAgICAgICB9LFxuICAgICAgICB3aWR0aDoge1xuICAgICAgICAgIHByb3A6ICd3aWR0aCdcbiAgICAgICAgfSxcbiAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgcHJvcDogJ2hlaWdodCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IGdldENsdXN0ZXJzXG4gICAgfVxuICBdXG59O1xuXG5mdW5jdGlvbiBnZXRSYWRpdXNWYWx1ZURvbWFpbihzdGVwLCBwcm9wcywgZGltZW5zaW9uVXBkYXRlcikge1xuICBjb25zdCB7a2V5fSA9IGRpbWVuc2lvblVwZGF0ZXI7XG4gIGNvbnN0IHtnZXRSYWRpdXNWYWx1ZX0gPSBwcm9wcztcbiAgY29uc3Qge2xheWVyRGF0YX0gPSB0aGlzLnN0YXRlO1xuXG4gIGNvbnN0IHZhbHVlRG9tYWluID0gWzAsIG1heChsYXllckRhdGEuZGF0YSwgZ2V0UmFkaXVzVmFsdWUpXTtcbiAgdGhpcy5fc2V0RGltZW5zaW9uU3RhdGUoa2V5LCB7dmFsdWVEb21haW59KTtcbn1cblxuY29uc3QgY2x1c3RlckxheWVyRGltZW5zaW9ucyA9IFtcbiAgZGVmYXVsdENvbG9yRGltZW5zaW9uLFxuICB7XG4gICAga2V5OiAncmFkaXVzJyxcbiAgICBhY2Nlc3NvcjogJ2dldFJhZGl1cycsXG4gICAgbnVsbFZhbHVlOiAwLFxuICAgIHVwZGF0ZVN0ZXBzOiBbXG4gICAgICB7XG4gICAgICAgIGtleTogJ2dldERvbWFpbicsXG4gICAgICAgIHRyaWdnZXJzOiB7XG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHByb3A6ICdnZXRSYWRpdXNWYWx1ZScsXG4gICAgICAgICAgICB1cGRhdGVUcmlnZ2VyOiAnZ2V0UmFkaXVzVmFsdWUnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVyOiBnZXRSYWRpdXNWYWx1ZURvbWFpblxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnZ2V0U2NhbGVGdW5jJyxcbiAgICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgICBkb21haW46IHtwcm9wOiAncmFkaXVzRG9tYWluJ30sXG4gICAgICAgICAgcmFuZ2U6IHtwcm9wOiAncmFkaXVzUmFuZ2UnfSxcbiAgICAgICAgICBzY2FsZVR5cGU6IHtwcm9wOiAncmFkaXVzU2NhbGVUeXBlJ31cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlcjogZ2V0RGltZW5zaW9uU2NhbGVcbiAgICAgIH1cbiAgICBdLFxuICAgIGdldFN1YkxheWVyQWNjZXNzb3I6IGdldFN1YkxheWVyUmFkaXVzLFxuICAgIGdldFBpY2tpbmdJbmZvOiAoZGltZW5zaW9uU3RhdGUsIGNlbGwsIGxheWVyUHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHJhZGl1c1ZhbHVlID0gbGF5ZXJQcm9wcy5nZXRSYWRpdXNWYWx1ZShjZWxsKTtcbiAgICAgIHJldHVybiB7cmFkaXVzVmFsdWV9O1xuICAgIH1cbiAgfVxuXTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBjbHVzdGVyUmFkaXVzOiBkZWZhdWx0UmFkaXVzLFxuICBjb2xvckRvbWFpbjogbnVsbCxcbiAgY29sb3JSYW5nZTogREVGQVVMVF9DT0xPUl9SQU5HRSxcbiAgY29sb3JTY2FsZVR5cGU6IFNDQUxFX1RZUEVTLnF1YW50aXplLFxuICByYWRpdXNTY2FsZVR5cGU6IFNDQUxFX1RZUEVTLnNxcnQsXG4gIHJhZGl1c1JhbmdlOiBkZWZhdWx0UmFkaXVzUmFuZ2UsXG4gIGdldFBvc2l0aW9uOiB7dHlwZTogJ2FjY2Vzc29yJywgdmFsdWU6IHggPT4geC5wb3NpdGlvbn0sXG4gIGdldENvbG9yVmFsdWU6IHt0eXBlOiAnYWNjZXNzb3InLCB2YWx1ZTogZGVmYXVsdEdldENvbG9yVmFsdWV9LFxuICBnZXRSYWRpdXNWYWx1ZToge3R5cGU6ICdhY2Nlc3NvcicsIHZhbHVlOiBkZWZhdWx0R2V0UmFkaXVzVmFsdWV9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbHVzdGVyTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgaW5pdGlhbGl6ZVN0YXRlKCkge1xuICAgIGNvbnN0IGNwdUFnZ3JlZ2F0b3IgPSBuZXcgQ1BVQWdncmVnYXRvcih7XG4gICAgICBhZ2dyZWdhdGlvbjogY2x1c3RlckFnZ3JlZ2F0aW9uLFxuICAgICAgZGltZW5zaW9uczogY2x1c3RlckxheWVyRGltZW5zaW9uc1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNwdUFnZ3JlZ2F0b3IsXG4gICAgICBhZ2dyZWdhdG9yU3RhdGU6IGNwdUFnZ3JlZ2F0b3Iuc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IGF0dHJpYnV0ZU1hbmFnZXIgPSB0aGlzLmdldEF0dHJpYnV0ZU1hbmFnZXIoKTtcbiAgICBhdHRyaWJ1dGVNYW5hZ2VyLmFkZCh7XG4gICAgICBwb3NpdGlvbnM6IHtzaXplOiAzLCBhY2Nlc3NvcjogJ2dldFBvc2l0aW9uJ31cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHtvbGRQcm9wcywgcHJvcHMsIGNoYW5nZUZsYWdzfSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gbWFrZSBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlIG9mIGNwdUFnZ3JlZ2F0b3IgZm9yIHRlc3RpbmdcbiAgICAgIGFnZ3JlZ2F0b3JTdGF0ZTogdGhpcy5zdGF0ZS5jcHVBZ2dyZWdhdG9yLnVwZGF0ZVN0YXRlKFxuICAgICAgICB7b2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFnc30sXG4gICAgICAgIHtcbiAgICAgICAgICB2aWV3cG9ydDogdGhpcy5jb250ZXh0LnZpZXdwb3J0LFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZ2V0QXR0cmlidXRlcygpLFxuICAgICAgICAgIG51bUluc3RhbmNlczogdGhpcy5nZXROdW1JbnN0YW5jZXMocHJvcHMpXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBpY2tpbmdJbmZvKHtpbmZvfSkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmNwdUFnZ3JlZ2F0b3IuZ2V0UGlja2luZ0luZm8oe2luZm99LCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIF9nZXRTdWJsYXllclVwZGF0ZVRyaWdnZXJzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmNwdUFnZ3JlZ2F0b3IuZ2V0VXBkYXRlVHJpZ2dlcnModGhpcy5wcm9wcyk7XG4gIH1cblxuICBfZ2V0U3ViTGF5ZXJBY2Nlc3NvcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFJhZGl1czogdGhpcy5zdGF0ZS5jcHVBZ2dyZWdhdG9yLmdldEFjY2Vzc29yKCdyYWRpdXMnLCB0aGlzLnByb3BzKSxcbiAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5zdGF0ZS5jcHVBZ2dyZWdhdG9yLmdldEFjY2Vzc29yKCdmaWxsQ29sb3InLCB0aGlzLnByb3BzKVxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcnMoKSB7XG4gICAgLy8gZm9yIHN1YmNsYXNzaW5nLCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm5cbiAgICAvLyBjdXN0b21pemVkIHN1YiBsYXllciBwcm9wc1xuICAgIGNvbnN0IHtpZCwgcmFkaXVzU2NhbGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y3B1QWdncmVnYXRvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgLy8gYmFzZSBsYXllciBwcm9wc1xuICAgIGNvbnN0IHt2aXNpYmxlLCBvcGFjaXR5LCBwaWNrYWJsZSwgYXV0b0hpZ2hsaWdodCwgaGlnaGxpZ2h0Q29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHRoaXMuX2dldFN1YmxheWVyVXBkYXRlVHJpZ2dlcnMoKTtcbiAgICBjb25zdCBhY2Nlc3NvcnMgPSB0aGlzLl9nZXRTdWJMYXllckFjY2Vzc29ycygpO1xuXG4gICAgY29uc3QgZGlzdGFuY2VTY2FsZSA9IGdldERpc3RhbmNlU2NhbGVzKHRoaXMuY29udGV4dC52aWV3cG9ydCk7XG4gICAgY29uc3QgbWV0ZXJzUGVyUGl4ZWwgPSBkaXN0YW5jZVNjYWxlLm1ldGVyc1BlclBpeGVsWzBdO1xuXG4gICAgLy8gcmV0dXJuIHByb3BzIHRvIHRoZSBzdWJsYXllciBjb25zdHJ1Y3RvclxuICAgIHJldHVybiBuZXcgU2NhdHRlcnBsb3RMYXllcih7XG4gICAgICBpZDogYCR7aWR9LWNsdXN0ZXJgLFxuICAgICAgZGF0YTogY3B1QWdncmVnYXRvci5zdGF0ZS5sYXllckRhdGEuZGF0YSxcbiAgICAgIHJhZGl1c1NjYWxlOiBtZXRlcnNQZXJQaXhlbCAqIHJhZGl1c1NjYWxlLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIG9wYWNpdHksXG4gICAgICBwaWNrYWJsZSxcbiAgICAgIGF1dG9IaWdobGlnaHQsXG4gICAgICBoaWdobGlnaHRDb2xvcixcbiAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfSk7XG4gIH1cbn1cblxuQ2x1c3RlckxheWVyLmxheWVyTmFtZSA9ICdDbHVzdGVyTGF5ZXInO1xuQ2x1c3RlckxheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==