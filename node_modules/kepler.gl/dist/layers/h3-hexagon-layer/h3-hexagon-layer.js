"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HexagonIdVisConfigs = exports.defaultCoverage = exports.defaultElevation = exports.hexIdAccessor = exports.hexIdRequiredColumns = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _datasetUtils = require("../../utils/dataset-utils");

var _layers = require("@deck.gl/layers");

var _geoLayers = require("@deck.gl/geo-layers");

var _enhancedColumnLayer = _interopRequireDefault(require("../../deckgl-layers/column-layer/enhanced-column-layer"));

var _h3Utils = require("./h3-utils");

var _h3HexagonLayerIcon = _interopRequireDefault(require("./h3-hexagon-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _tableUtils = require("../../utils/table-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_LINE_SCALE_VALUE = 8;
var hexIdRequiredColumns = ['hex_id'];
exports.hexIdRequiredColumns = hexIdRequiredColumns;

var hexIdAccessor = function hexIdAccessor(_ref) {
  var hex_id = _ref.hex_id;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, hex_id.fieldIdx);
    };
  };
};

exports.hexIdAccessor = hexIdAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultCoverage = 1;
exports.defaultCoverage = defaultCoverage;
var HexagonIdVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  coverage: 'coverage',
  enable3d: 'enable3d',
  sizeRange: 'elevationRange',
  coverageRange: 'coverageRange',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor'
};
exports.HexagonIdVisConfigs = HexagonIdVisConfigs;

var HexagonIdLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(HexagonIdLayer, _Layer);

  var _super = _createSuper(HexagonIdLayer);

  function HexagonIdLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HexagonIdLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(HexagonIdVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return hexIdAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(HexagonIdLayer, [{
    key: "type",
    get: function get() {
      return 'hexagonId';
    }
  }, {
    key: "name",
    get: function get() {
      return 'H3';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return hexIdRequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      // use hexagon layer icon for now
      return _h3HexagonLayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor'
        }),
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'height',
          accessor: 'getElevation',
          nullValue: 0,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultValue: defaultElevation
        }),
        coverage: {
          property: 'coverage',
          field: 'coverageField',
          scale: 'coverageScale',
          domain: 'coverageDomain',
          range: 'coverageRange',
          key: 'coverage',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.radius,
          accessor: 'getCoverage',
          nullValue: 0,
          defaultValue: defaultCoverage
        }
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
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        coverageField: null,
        coverageDomain: [0, 1],
        coverageScale: 'linear'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getHexId) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var id = getHexId({
          index: index
        });
        var centroid = this.dataToFeature.centroids[index];

        if (centroid) {
          data.push({
            index: index,
            id: id,
            centroid: centroid
          });
        }
      }

      return data;
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getHexId = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getHexId: getHexId,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getHexId) {
      var centroids = dataContainer.map(function (d, index) {
        var id = getHexId({
          index: index
        });

        if (!(0, _h3Utils.h3IsValid)(id)) {
          return null;
        } // save a reference of centroids to dataToFeature
        // so we don't have to re calculate it again


        return (0, _h3Utils.getCentroid)({
          id: id
        });
      }, true);
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
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var config = this.config;
      var visConfig = config.visConfig;
      var updateTriggers = this.getVisualChannelUpdateTriggers();
      var h3HexagonLayerTriggers = {
        getHexagon: this.config.columns,
        getFillColor: updateTriggers.getFillColor,
        getElevation: updateTriggers.getElevation,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      };
      var columnLayerTriggers = {
        getCoverage: updateTriggers.getCoverage
      };
      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _geoLayers.H3HexagonLayer(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), data), {}, {
        wrapLongitude: false,
        getHexagon: function getHexagon(x) {
          return x.id;
        },
        // coverage
        coverage: config.coverageField ? 1 : visConfig.coverage,
        // highlight
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        // render
        updateTriggers: h3HexagonLayerTriggers,
        _subLayerProps: {
          'hexagon-cell': {
            type: _enhancedColumnLayer["default"],
            getCoverage: data.getCoverage,
            updateTriggers: columnLayerTriggers
          }
        }
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !config.sizeField ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        data: [(0, _h3Utils.idToPolygonGeo)(hoveredObject)],
        getLineColor: config.highlightColor,
        lineWidthScale: DEFAULT_LINE_SCALE_VALUE * zoomFactor,
        wrapLongitude: false
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fields = _ref3.fields,
          fields = _ref3$fields === void 0 ? [] : _ref3$fields,
          dataContainer = _ref3.dataContainer;
      var hexFields = (0, _h3Utils.getHexFields)(fields, dataContainer);

      if (!hexFields.length) {
        return {
          props: []
        };
      }

      return {
        props: hexFields.map(function (f) {
          return {
            isVisible: true,
            label: f.displayName || f.name,
            columns: {
              hex_id: {
                value: f.name,
                fieldIdx: fields.findIndex(function (fid) {
                  return fid.name === f.name;
                })
              }
            }
          };
        })
      };
    }
  }]);
  return HexagonIdLayer;
}(_baseLayer["default"]);

exports["default"] = HexagonIdLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy1oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSIsImhleElkUmVxdWlyZWRDb2x1bW5zIiwiaGV4SWRBY2Nlc3NvciIsImhleF9pZCIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwiZGVmYXVsdEVsZXZhdGlvbiIsImRlZmF1bHRDb3ZlcmFnZSIsIkhleGFnb25JZFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwiZW5hYmxlM2QiLCJzaXplUmFuZ2UiLCJjb3ZlcmFnZVJhbmdlIiwiZWxldmF0aW9uU2NhbGUiLCJlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yIiwiSGV4YWdvbklkTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiSDNIZXhhZ29uTGF5ZXJJY29uIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsImFjY2Vzc29yIiwic2l6ZSIsInByb3BlcnR5IiwibnVsbFZhbHVlIiwiY29uZGl0aW9uIiwidmlzQ29uZmlnIiwiZGVmYXVsdFZhbHVlIiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwia2V5IiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwicmFkaXVzIiwiZGF0YXNldCIsImRlZmF1bHRDb2xvckZpZWxkIiwidXBkYXRlTGF5ZXJDb25maWciLCJjb2xvckZpZWxkIiwidXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsIiwiY292ZXJhZ2VGaWVsZCIsImNvdmVyYWdlRG9tYWluIiwiY292ZXJhZ2VTY2FsZSIsImdldEhleElkIiwiZmlsdGVyZWRJbmRleCIsImRhdGEiLCJpIiwibGVuZ3RoIiwiaWQiLCJjZW50cm9pZCIsImRhdGFUb0ZlYXR1cmUiLCJjZW50cm9pZHMiLCJwdXNoIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwibWFwIiwiY2VudHJvaWRzRGF0YUNvbnRhaW5lciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInVwZGF0ZU1ldGEiLCJvcHRzIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiem9vbUZhY3RvciIsImdldFpvb21GYWN0b3IiLCJlbGVab29tRmFjdG9yIiwiZ2V0RWxldmF0aW9uWm9vbUZhY3RvciIsInVwZGF0ZVRyaWdnZXJzIiwiZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzIiwiaDNIZXhhZ29uTGF5ZXJUcmlnZ2VycyIsImdldEhleGFnb24iLCJnZXRGaWxsQ29sb3IiLCJnZXRFbGV2YXRpb24iLCJmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzIiwiY29sdW1uTGF5ZXJUcmlnZ2VycyIsImdldENvdmVyYWdlIiwiZGVmYXVsdExheWVyUHJvcHMiLCJnZXREZWZhdWx0RGVja0xheWVyUHJvcHMiLCJob3ZlcmVkT2JqZWN0IiwiaGFzSG92ZXJlZE9iamVjdCIsIkgzSGV4YWdvbkxheWVyIiwid3JhcExvbmdpdHVkZSIsIngiLCJhdXRvSGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q29sb3IiLCJISUdITElHSF9DT0xPUl8zRCIsImV4dHJ1ZGVkIiwiX3N1YkxheWVyUHJvcHMiLCJ0eXBlIiwiRW5oYW5jZWRDb2x1bW5MYXllciIsInNpemVGaWVsZCIsIkdlb0pzb25MYXllciIsImdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMiLCJnZXRMaW5lQ29sb3IiLCJsaW5lV2lkdGhTY2FsZSIsImZpZWxkcyIsImhleEZpZWxkcyIsImYiLCJpc1Zpc2libGUiLCJsYWJlbCIsImRpc3BsYXlO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QUV5RyxNQUFNLENBQUNRLFNBQVAsQ0FBaUIsVUFBQUMsR0FBRztBQUFBLHlCQUFJQSxHQUFHLENBQUNILElBQUosS0FBYUosQ0FBQyxDQUFDSSxJQUFuQjtBQUFBLGlCQUFwQjtBQUZKO0FBREQ7QUFIZ0IsV0FBTDtBQUFBLFNBQWY7QUFERixPQUFQO0FBWUQ7OztFQXJGeUNJLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtmaW5kRGVmYXVsdENvbG9yRmllbGR9IGZyb20gJ3V0aWxzL2RhdGFzZXQtdXRpbHMnO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5pbXBvcnQge0gzSGV4YWdvbkxheWVyfSBmcm9tICdAZGVjay5nbC9nZW8tbGF5ZXJzJztcbmltcG9ydCBFbmhhbmNlZENvbHVtbkxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvY29sdW1uLWxheWVyL2VuaGFuY2VkLWNvbHVtbi1sYXllcic7XG5pbXBvcnQge2dldENlbnRyb2lkLCBpZFRvUG9seWdvbkdlbywgaDNJc1ZhbGlkLCBnZXRIZXhGaWVsZHN9IGZyb20gJy4vaDMtdXRpbHMnO1xuaW1wb3J0IEgzSGV4YWdvbkxheWVySWNvbiBmcm9tICcuL2gzLWhleGFnb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTLCBISUdITElHSF9DT0xPUl8zRH0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge2NyZWF0ZURhdGFDb250YWluZXJ9IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzJztcblxuY29uc3QgREVGQVVMVF9MSU5FX1NDQUxFX1ZBTFVFID0gODtcblxuZXhwb3J0IGNvbnN0IGhleElkUmVxdWlyZWRDb2x1bW5zID0gWydoZXhfaWQnXTtcbmV4cG9ydCBjb25zdCBoZXhJZEFjY2Vzc29yID0gKHtoZXhfaWR9KSA9PiBkYyA9PiBkID0+IGRjLnZhbHVlQXQoZC5pbmRleCwgaGV4X2lkLmZpZWxkSWR4KTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRFbGV2YXRpb24gPSA1MDA7XG5leHBvcnQgY29uc3QgZGVmYXVsdENvdmVyYWdlID0gMTtcblxuZXhwb3J0IGNvbnN0IEhleGFnb25JZFZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCcsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgY292ZXJhZ2VSYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcjogJ2VuYWJsZUVsZXZhdGlvblpvb21GYWN0b3InXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXhhZ29uSWRMYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhIZXhhZ29uSWRWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+IGhleElkQWNjZXNzb3IodGhpcy5jb25maWcuY29sdW1ucykoZGF0YUNvbnRhaW5lcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2hleGFnb25JZCc7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ0gzJztcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gaGV4SWRSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIC8vIHVzZSBoZXhhZ29uIGxheWVyIGljb24gZm9yIG5vd1xuICAgIHJldHVybiBIM0hleGFnb25MYXllckljb247XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbHMgPSBzdXBlci52aXN1YWxDaGFubmVscztcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RmlsbENvbG9yJ1xuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldEVsZXZhdGlvbicsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0RWxldmF0aW9uXG4gICAgICB9LFxuICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgcHJvcGVydHk6ICdjb3ZlcmFnZScsXG4gICAgICAgIGZpZWxkOiAnY292ZXJhZ2VGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnY292ZXJhZ2VTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2NvdmVyYWdlRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdjb3ZlcmFnZVJhbmdlJyxcbiAgICAgICAga2V5OiAnY292ZXJhZ2UnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5yYWRpdXMsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0Q292ZXJhZ2UnLFxuICAgICAgICBudWxsVmFsdWU6IDAsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdENvdmVyYWdlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldEluaXRpYWxMYXllckNvbmZpZyhkYXRhc2V0KSB7XG4gICAgY29uc3QgZGVmYXVsdENvbG9yRmllbGQgPSBmaW5kRGVmYXVsdENvbG9yRmllbGQoZGF0YXNldCk7XG5cbiAgICBpZiAoZGVmYXVsdENvbG9yRmllbGQpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgICAgICBjb2xvckZpZWxkOiBkZWZhdWx0Q29sb3JGaWVsZFxuICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCAnY29sb3InKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkcyA9IFtdLCBkYXRhQ29udGFpbmVyfSkge1xuICAgIGNvbnN0IGhleEZpZWxkcyA9IGdldEhleEZpZWxkcyhmaWVsZHMsIGRhdGFDb250YWluZXIpO1xuICAgIGlmICghaGV4RmllbGRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtwcm9wczogW119O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczogaGV4RmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgbGFiZWw6IGYuZGlzcGxheU5hbWUgfHwgZi5uYW1lLFxuICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgaGV4X2lkOiB7XG4gICAgICAgICAgICB2YWx1ZTogZi5uYW1lLFxuICAgICAgICAgICAgZmllbGRJZHg6IGZpZWxkcy5maW5kSW5kZXgoZmlkID0+IGZpZC5uYW1lID09PSBmLm5hbWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcblxuICAgICAgLy8gYWRkIGhlaWdodCB2aXN1YWwgY2hhbm5lbFxuICAgICAgY292ZXJhZ2VGaWVsZDogbnVsbCxcbiAgICAgIGNvdmVyYWdlRG9tYWluOiBbMCwgMV0sXG4gICAgICBjb3ZlcmFnZVNjYWxlOiAnbGluZWFyJ1xuICAgIH07XG4gIH1cblxuICBjYWxjdWxhdGVEYXRhQXR0cmlidXRlKHtkYXRhQ29udGFpbmVyLCBmaWx0ZXJlZEluZGV4fSwgZ2V0SGV4SWQpIHtcbiAgICBjb25zdCBkYXRhID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICAgIGNvbnN0IGlkID0gZ2V0SGV4SWQoe2luZGV4fSk7XG4gICAgICBjb25zdCBjZW50cm9pZCA9IHRoaXMuZGF0YVRvRmVhdHVyZS5jZW50cm9pZHNbaW5kZXhdO1xuXG4gICAgICBpZiAoY2VudHJvaWQpIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBjZW50cm9pZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvLyBUT0RPOiBmaXggY29tcGxleGl0eVxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCBnZXRIZXhJZCA9IHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKTtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnVwZGF0ZURhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSk7XG4gICAgY29uc3QgYWNjZXNzb3JzID0gdGhpcy5nZXRBdHRyaWJ1dGVBY2Nlc3NvcnMoe2RhdGFDb250YWluZXJ9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgZ2V0SGV4SWQsXG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZ3B1RmlsdGVyLmZpbHRlclZhbHVlQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikoKSxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIsIGdldEhleElkKSB7XG4gICAgY29uc3QgY2VudHJvaWRzID0gZGF0YUNvbnRhaW5lci5tYXAoKGQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGdldEhleElkKHtpbmRleH0pO1xuICAgICAgaWYgKCFoM0lzVmFsaWQoaWQpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSBvZiBjZW50cm9pZHMgdG8gZGF0YVRvRmVhdHVyZVxuICAgICAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byByZSBjYWxjdWxhdGUgaXQgYWdhaW5cbiAgICAgIHJldHVybiBnZXRDZW50cm9pZCh7aWR9KTtcbiAgICB9LCB0cnVlKTtcblxuICAgIGNvbnN0IGNlbnRyb2lkc0RhdGFDb250YWluZXIgPSBjcmVhdGVEYXRhQ29udGFpbmVyKGNlbnRyb2lkcyk7XG5cbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhjZW50cm9pZHNEYXRhQ29udGFpbmVyLCAoZCwgZGMpID0+IHtcbiAgICAgIHJldHVybiBbZGMudmFsdWVBdChkLmluZGV4LCAwKSwgZGMudmFsdWVBdChkLmluZGV4LCAxKV07XG4gICAgfSk7XG4gICAgdGhpcy5kYXRhVG9GZWF0dXJlID0ge2NlbnRyb2lkc307XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKG9wdHMpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ3B1RmlsdGVyLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZX0gPSBvcHRzO1xuXG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gY29uZmlnO1xuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0gdGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKTtcblxuICAgIGNvbnN0IGgzSGV4YWdvbkxheWVyVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRIZXhhZ29uOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgZ2V0RmlsbENvbG9yOiB1cGRhdGVUcmlnZ2Vycy5nZXRGaWxsQ29sb3IsXG4gICAgICBnZXRFbGV2YXRpb246IHVwZGF0ZVRyaWdnZXJzLmdldEVsZXZhdGlvbixcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2Vyc1xuICAgIH07XG5cbiAgICBjb25zdCBjb2x1bW5MYXllclRyaWdnZXJzID0ge1xuICAgICAgZ2V0Q292ZXJhZ2U6IHVwZGF0ZVRyaWdnZXJzLmdldENvdmVyYWdlXG4gICAgfTtcblxuICAgIGNvbnN0IGRlZmF1bHRMYXllclByb3BzID0gdGhpcy5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgY29uc3QgaG92ZXJlZE9iamVjdCA9IHRoaXMuaGFzSG92ZXJlZE9iamVjdChvYmplY3RIb3ZlcmVkKTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgSDNIZXhhZ29uTGF5ZXIoe1xuICAgICAgICAuLi5kZWZhdWx0TGF5ZXJQcm9wcyxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG5cbiAgICAgICAgZ2V0SGV4YWdvbjogeCA9PiB4LmlkLFxuXG4gICAgICAgIC8vIGNvdmVyYWdlXG4gICAgICAgIGNvdmVyYWdlOiBjb25maWcuY292ZXJhZ2VGaWVsZCA/IDEgOiB2aXNDb25maWcuY292ZXJhZ2UsXG5cbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuXG4gICAgICAgIC8vIGVsZXZhdGlvblxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IGgzSGV4YWdvbkxheWVyVHJpZ2dlcnMsXG4gICAgICAgIF9zdWJMYXllclByb3BzOiB7XG4gICAgICAgICAgJ2hleGFnb24tY2VsbCc6IHtcbiAgICAgICAgICAgIHR5cGU6IEVuaGFuY2VkQ29sdW1uTGF5ZXIsXG4gICAgICAgICAgICBnZXRDb3ZlcmFnZTogZGF0YS5nZXRDb3ZlcmFnZSxcbiAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzOiBjb2x1bW5MYXllclRyaWdnZXJzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC4uLihob3ZlcmVkT2JqZWN0ICYmICFjb25maWcuc2l6ZUZpZWxkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICBkYXRhOiBbaWRUb1BvbHlnb25HZW8oaG92ZXJlZE9iamVjdCldLFxuICAgICAgICAgICAgICBnZXRMaW5lQ29sb3I6IGNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IERFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSAqIHpvb21GYWN0b3IsXG4gICAgICAgICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=