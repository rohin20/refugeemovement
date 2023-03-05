"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayerLegendHeaderFactory = LayerLegendHeaderFactory;
exports.LayerLegendContentFactory = LayerLegendContentFactory;
exports["default"] = exports.LayerColorLegend = exports.SingleColorLegend = exports.LayerSizeLegend = exports.VisualChannelMetric = exports.StyledMapControlLegend = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _d3Color = require("d3-color");

var _colorLegend = _interopRequireDefault(require("../common/color-legend"));

var _defaultSettings = require("../../constants/default-settings");

var _localization = require("../../localization");

var _templateObject;

var StyledMapControlLegend = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 10px ", "px 10px\n    ", "px;\n  font-size: 11px;\n  border-bottom-color: ", ";\n  border-bottom-style: solid;\n  border-bottom-width: ", ";\n  width: ", "px;\n\n  .legend--layer_name {\n    font-size: 12px;\n    padding-right: ", "px;\n    color: ", ";\n    font-weight: 500;\n  }\n  .legend--layer_type {\n    color: ", ";\n    font-weight: 500;\n    font-size: 11px;\n    padding-right: ", "px;\n  }\n\n  .legend--layer__title {\n    padding-right: ", "px;\n  }\n\n  .legend--layer_by {\n    color: ", ";\n  }\n\n  .legend--layer_color_field {\n    color: ", ";\n    font-weight: 500;\n  }\n\n  .legend--layer_color-legend {\n    margin-top: 6px;\n  }\n"])), function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.panelBorderColor;
}, function (props) {
  return props.last ? 0 : '1px';
}, function (props) {
  return props.width;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.textColorHl;
});

exports.StyledMapControlLegend = StyledMapControlLegend;

var VisualChannelMetric = function VisualChannelMetric(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "legend--layer__title"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "legend--layer_color_field"
  }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: name
  })));
};
/** @type {typeof import('./map-legend').LayerSizeLegend} */


exports.VisualChannelMetric = VisualChannelMetric;

var LayerSizeLegend = function LayerSizeLegend(_ref2) {
  var label = _ref2.label,
      name = _ref2.name;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "legend--layer_size-schema"
  }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "legend--layer_by"
  }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: label
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "legend--layer_by"
  }, " by ")), /*#__PURE__*/_react["default"].createElement(VisualChannelMetric, {
    name: name
  }));
};

exports.LayerSizeLegend = LayerSizeLegend;
var SINGLE_COLOR_DOMAIN = [''];
/** @type {typeof import('./map-legend').SingleColorLegend} */

var SingleColorLegend = /*#__PURE__*/_react["default"].memo(function (_ref3) {
  var width = _ref3.width,
      color = _ref3.color;
  return /*#__PURE__*/_react["default"].createElement(_colorLegend["default"], {
    scaleType: "ordinal",
    displayLabel: false,
    domain: SINGLE_COLOR_DOMAIN,
    fieldType: null,
    range: {
      colors: [_d3Color.rgb.apply(void 0, (0, _toConsumableArray2["default"])(color)).toString()]
    },
    width: width
  });
});

exports.SingleColorLegend = SingleColorLegend;
SingleColorLegend.displayName = 'SingleColorLegend';
/** @type {typeof import('./map-legend').LayerColorLegend} */

var LayerColorLegend = /*#__PURE__*/_react["default"].memo(function (_ref4) {
  var description = _ref4.description,
      config = _ref4.config,
      width = _ref4.width,
      colorChannel = _ref4.colorChannel;
  var enableColorBy = description.measure;
  var scale = colorChannel.scale,
      field = colorChannel.field,
      domain = colorChannel.domain,
      range = colorChannel.range,
      property = colorChannel.property;

  var _map = [scale, field, domain].map(function (k) {
    return config[k];
  }),
      _map2 = (0, _slicedToArray2["default"])(_map, 3),
      colorScale = _map2[0],
      colorField = _map2[1],
      colorDomain = _map2[2];

  var colorRange = config.visConfig[range];
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "legend--layer_color-schema"
  }, /*#__PURE__*/_react["default"].createElement("div", null, enableColorBy ? /*#__PURE__*/_react["default"].createElement(VisualChannelMetric, {
    name: enableColorBy
  }) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "legend--layer_color-legend"
  }, enableColorBy ? /*#__PURE__*/_react["default"].createElement(_colorLegend["default"], {
    scaleType: colorScale,
    displayLabel: true,
    domain: colorDomain,
    fieldType: colorField && colorField.type || 'real',
    range: colorRange,
    width: width
  }) : /*#__PURE__*/_react["default"].createElement(SingleColorLegend, {
    color: config.visConfig[property] || config[property] || config.color,
    width: width
  })))));
});

exports.LayerColorLegend = LayerColorLegend;
LayerColorLegend.displayName = 'LayerColorLegend';

var isColorChannel = function isColorChannel(visualChannel) {
  return [_defaultSettings.CHANNEL_SCALES.color, _defaultSettings.CHANNEL_SCALES.colorAggr].includes(visualChannel.channelScaleType);
};

function LayerLegendHeaderFactory() {
  /** @type {typeof import('./map-legend').LayerLegendHeader }> */
  var LayerLegendHeader = function LayerLegendHeader(_ref5) {
    var options = _ref5.options,
        layer = _ref5.layer;
    return (options === null || options === void 0 ? void 0 : options.showLayerName) !== false ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "legend--layer_name"
    }, layer.config.label) : null;
  };

  return LayerLegendHeader;
}

function LayerLegendContentFactory() {
  /** @type {typeof import('./map-legend').LayerLegendContent }> */
  var LayerLegendContent = function LayerLegendContent(_ref6) {
    var layer = _ref6.layer,
        containerW = _ref6.containerW;
    var colorChannels = Object.values(layer.visualChannels).filter(isColorChannel);
    var nonColorChannels = Object.values(layer.visualChannels).filter(function (vc) {
      return !isColorChannel(vc);
    });
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, colorChannels.map(function (colorChannel) {
      return !colorChannel.condition || colorChannel.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(LayerColorLegend, {
        key: colorChannel.key,
        description: layer.getVisualChannelDescription(colorChannel.key),
        config: layer.config,
        width: containerW - 2 * _defaultSettings.DIMENSIONS.mapControl.padding,
        colorChannel: colorChannel
      }) : null;
    }), nonColorChannels.map(function (visualChannel) {
      var matchCondition = !visualChannel.condition || visualChannel.condition(layer.config);
      var enabled = layer.config[visualChannel.field] || visualChannel.defaultMeasure;
      var description = layer.getVisualChannelDescription(visualChannel.key);
      return matchCondition && enabled ? /*#__PURE__*/_react["default"].createElement(LayerSizeLegend, {
        key: visualChannel.key,
        label: description.label,
        name: description.measure
      }) : null;
    }));
  };

  return LayerLegendContent;
}

MapLegendFactory.deps = [LayerLegendHeaderFactory, LayerLegendContentFactory];

function MapLegendFactory(LayerLegendHeader, LayerLegendContent) {
  /** @type {typeof import('./map-legend').MapLegend }> */
  var MapLegend = function MapLegend(_ref7) {
    var _ref7$layers = _ref7.layers,
        layers = _ref7$layers === void 0 ? [] : _ref7$layers,
        width = _ref7.width,
        options = _ref7.options;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "map-legend"
    }, layers.map(function (layer, index) {
      if (!layer.isValidToSave() || layer.config.hidden) {
        return null;
      }

      var containerW = width || _defaultSettings.DIMENSIONS.mapControl.width;
      return /*#__PURE__*/_react["default"].createElement(StyledMapControlLegend, {
        className: "legend--layer",
        last: index === layers.length - 1,
        key: index,
        width: containerW
      }, /*#__PURE__*/_react["default"].createElement(LayerLegendHeader, {
        options: options,
        layer: layer
      }), /*#__PURE__*/_react["default"].createElement(LayerLegendContent, {
        containerW: containerW,
        layer: layer
      }));
    }));
  };

  MapLegend.displayName = 'MapLegend';
  return MapLegend;
}

var _default = MapLegendFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtbGVnZW5kLmpzIl0sIm5hbWVzIjpbIlN0eWxlZE1hcENvbnRyb2xMZWdlbmQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwibWFwQ29udHJvbCIsInBhZGRpbmciLCJwYW5lbEJvcmRlckNvbG9yIiwibGFzdCIsIndpZHRoIiwidGV4dENvbG9yIiwic3VidGV4dENvbG9yIiwidGV4dENvbG9ySGwiLCJWaXN1YWxDaGFubmVsTWV0cmljIiwibmFtZSIsIkxheWVyU2l6ZUxlZ2VuZCIsImxhYmVsIiwiU0lOR0xFX0NPTE9SX0RPTUFJTiIsIlNpbmdsZUNvbG9yTGVnZW5kIiwiUmVhY3QiLCJtZW1vIiwiY29sb3IiLCJjb2xvcnMiLCJyZ2IiLCJ0b1N0cmluZyIsImRpc3BsYXlOYW1lIiwiTGF5ZXJDb2xvckxlZ2VuZCIsImRlc2NyaXB0aW9uIiwiY29uZmlnIiwiY29sb3JDaGFubmVsIiwiZW5hYmxlQ29sb3JCeSIsIm1lYXN1cmUiLCJzY2FsZSIsImZpZWxkIiwiZG9tYWluIiwicmFuZ2UiLCJwcm9wZXJ0eSIsIm1hcCIsImsiLCJjb2xvclNjYWxlIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JSYW5nZSIsInZpc0NvbmZpZyIsInR5cGUiLCJpc0NvbG9yQ2hhbm5lbCIsInZpc3VhbENoYW5uZWwiLCJDSEFOTkVMX1NDQUxFUyIsImNvbG9yQWdnciIsImluY2x1ZGVzIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkxheWVyTGVnZW5kSGVhZGVyRmFjdG9yeSIsIkxheWVyTGVnZW5kSGVhZGVyIiwib3B0aW9ucyIsImxheWVyIiwic2hvd0xheWVyTmFtZSIsIkxheWVyTGVnZW5kQ29udGVudEZhY3RvcnkiLCJMYXllckxlZ2VuZENvbnRlbnQiLCJjb250YWluZXJXIiwiY29sb3JDaGFubmVscyIsIk9iamVjdCIsInZhbHVlcyIsInZpc3VhbENoYW5uZWxzIiwiZmlsdGVyIiwibm9uQ29sb3JDaGFubmVscyIsInZjIiwiY29uZGl0aW9uIiwia2V5IiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwiRElNRU5TSU9OUyIsIm1hdGNoQ29uZGl0aW9uIiwiZW5hYmxlZCIsImRlZmF1bHRNZWFzdXJlIiwiTWFwTGVnZW5kRmFjdG9yeSIsImRlcHMiLCJNYXBMZWdlbmQiLCJsYXllcnMiLCJpbmRleCIsImlzVmFsaWRUb1NhdmUiLCJoaWRkZW4iLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sSUFBTUEsc0JBQXNCLEdBQUdDLDZCQUFPQyxHQUFWLG92QkFDakIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFaLENBQXVCQyxPQUEzQjtBQUFBLENBRFksRUFFN0IsVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFaLENBQXVCQyxPQUEzQjtBQUFBLENBRndCLEVBSVYsVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRyxnQkFBaEI7QUFBQSxDQUpLLEVBTVYsVUFBQUosS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ0ssSUFBTixHQUFhLENBQWIsR0FBaUIsS0FBdEI7QUFBQSxDQU5LLEVBT3hCLFVBQUFMLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNNLEtBQVY7QUFBQSxDQVBtQixFQVdkLFVBQUFOLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsT0FBM0I7QUFBQSxDQVhTLEVBWXRCLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWU0sU0FBaEI7QUFBQSxDQVppQixFQWdCdEIsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTyxZQUFoQjtBQUFBLENBaEJpQixFQW1CZCxVQUFBUixL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aWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7cmdifSBmcm9tICdkMy1jb2xvcic7XG5pbXBvcnQgQ29sb3JMZWdlbmQgZnJvbSAnY29tcG9uZW50cy9jb21tb24vY29sb3ItbGVnZW5kJztcbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRVMsIERJTUVOU0lPTlN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnbG9jYWxpemF0aW9uJztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1hcENvbnRyb2xMZWdlbmQgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiAxMHB4ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwQ29udHJvbC5wYWRkaW5nfXB4IDEwcHhcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyQ29sb3J9O1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogJHtwcm9wcyA9PiAocHJvcHMubGFzdCA/IDAgOiAnMXB4Jyl9O1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aH1weDtcblxuICAubGVnZW5kLS1sYXllcl9uYW1lIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG4gIC5sZWdlbmQtLWxheWVyX3R5cGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gIH1cblxuICAubGVnZW5kLS1sYXllcl9fdGl0bGUge1xuICAgIHBhZGRpbmctcmlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwQ29udHJvbC5wYWRkaW5nfXB4O1xuICB9XG5cbiAgLmxlZ2VuZC0tbGF5ZXJfYnkge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gIH1cblxuICAubGVnZW5kLS1sYXllcl9jb2xvcl9maWVsZCB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICAubGVnZW5kLS1sYXllcl9jb2xvci1sZWdlbmQge1xuICAgIG1hcmdpbi10b3A6IDZweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFZpc3VhbENoYW5uZWxNZXRyaWMgPSAoe25hbWV9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX190aXRsZVwiPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9jb2xvcl9maWVsZFwiPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bmFtZX0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9tYXAtbGVnZW5kJykuTGF5ZXJTaXplTGVnZW5kfSAqL1xuZXhwb3J0IGNvbnN0IExheWVyU2l6ZUxlZ2VuZCA9ICh7bGFiZWwsIG5hbWV9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9zaXplLXNjaGVtYVwiPlxuICAgIDxwPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9ieVwiPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bGFiZWx9IC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2J5XCI+IGJ5IDwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPFZpc3VhbENoYW5uZWxNZXRyaWMgbmFtZT17bmFtZX0gLz5cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCBTSU5HTEVfQ09MT1JfRE9NQUlOID0gWycnXTtcblxuLyoqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL21hcC1sZWdlbmQnKS5TaW5nbGVDb2xvckxlZ2VuZH0gKi9cbmV4cG9ydCBjb25zdCBTaW5nbGVDb2xvckxlZ2VuZCA9IFJlYWN0Lm1lbW8oKHt3aWR0aCwgY29sb3J9KSA9PiAoXG4gIDxDb2xvckxlZ2VuZFxuICAgIHNjYWxlVHlwZT1cIm9yZGluYWxcIlxuICAgIGRpc3BsYXlMYWJlbD17ZmFsc2V9XG4gICAgZG9tYWluPXtTSU5HTEVfQ09MT1JfRE9NQUlOfVxuICAgIGZpZWxkVHlwZT17bnVsbH1cbiAgICByYW5nZT17e2NvbG9yczogW3JnYiguLi5jb2xvcikudG9TdHJpbmcoKV19fVxuICAgIHdpZHRoPXt3aWR0aH1cbiAgLz5cbikpO1xuXG5TaW5nbGVDb2xvckxlZ2VuZC5kaXNwbGF5TmFtZSA9ICdTaW5nbGVDb2xvckxlZ2VuZCc7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9tYXAtbGVnZW5kJykuTGF5ZXJDb2xvckxlZ2VuZH0gKi9cbmV4cG9ydCBjb25zdCBMYXllckNvbG9yTGVnZW5kID0gUmVhY3QubWVtbygoe2Rlc2NyaXB0aW9uLCBjb25maWcsIHdpZHRoLCBjb2xvckNoYW5uZWx9KSA9PiB7XG4gIGNvbnN0IGVuYWJsZUNvbG9yQnkgPSBkZXNjcmlwdGlvbi5tZWFzdXJlO1xuICBjb25zdCB7c2NhbGUsIGZpZWxkLCBkb21haW4sIHJhbmdlLCBwcm9wZXJ0eX0gPSBjb2xvckNoYW5uZWw7XG4gIGNvbnN0IFtjb2xvclNjYWxlLCBjb2xvckZpZWxkLCBjb2xvckRvbWFpbl0gPSBbc2NhbGUsIGZpZWxkLCBkb21haW5dLm1hcChrID0+IGNvbmZpZ1trXSk7XG4gIGNvbnN0IGNvbG9yUmFuZ2UgPSBjb25maWcudmlzQ29uZmlnW3JhbmdlXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfY29sb3Itc2NoZW1hXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2VuYWJsZUNvbG9yQnkgPyA8VmlzdWFsQ2hhbm5lbE1ldHJpYyBuYW1lPXtlbmFibGVDb2xvckJ5fSAvPiA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2NvbG9yLWxlZ2VuZFwiPlxuICAgICAgICAgICAge2VuYWJsZUNvbG9yQnkgPyAoXG4gICAgICAgICAgICAgIDxDb2xvckxlZ2VuZFxuICAgICAgICAgICAgICAgIHNjYWxlVHlwZT17Y29sb3JTY2FsZX1cbiAgICAgICAgICAgICAgICBkaXNwbGF5TGFiZWxcbiAgICAgICAgICAgICAgICBkb21haW49e2NvbG9yRG9tYWlufVxuICAgICAgICAgICAgICAgIGZpZWxkVHlwZT17KGNvbG9yRmllbGQgJiYgY29sb3JGaWVsZC50eXBlKSB8fCAncmVhbCd9XG4gICAgICAgICAgICAgICAgcmFuZ2U9e2NvbG9yUmFuZ2V9XG4gICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFNpbmdsZUNvbG9yTGVnZW5kXG4gICAgICAgICAgICAgICAgY29sb3I9e2NvbmZpZy52aXNDb25maWdbcHJvcGVydHldIHx8IGNvbmZpZ1twcm9wZXJ0eV0gfHwgY29uZmlnLmNvbG9yfVxuICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59KTtcblxuTGF5ZXJDb2xvckxlZ2VuZC5kaXNwbGF5TmFtZSA9ICdMYXllckNvbG9yTGVnZW5kJztcblxuY29uc3QgaXNDb2xvckNoYW5uZWwgPSB2aXN1YWxDaGFubmVsID0+XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvciwgQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyXS5pbmNsdWRlcyh2aXN1YWxDaGFubmVsLmNoYW5uZWxTY2FsZVR5cGUpO1xuXG5leHBvcnQgZnVuY3Rpb24gTGF5ZXJMZWdlbmRIZWFkZXJGYWN0b3J5KCkge1xuICAvKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vbWFwLWxlZ2VuZCcpLkxheWVyTGVnZW5kSGVhZGVyIH0+ICovXG4gIGNvbnN0IExheWVyTGVnZW5kSGVhZGVyID0gKHtvcHRpb25zLCBsYXllcn0pID0+IHtcbiAgICByZXR1cm4gb3B0aW9ucz8uc2hvd0xheWVyTmFtZSAhPT0gZmFsc2UgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfbmFtZVwiPntsYXllci5jb25maWcubGFiZWx9PC9kaXY+XG4gICAgKSA6IG51bGw7XG4gIH07XG4gIHJldHVybiBMYXllckxlZ2VuZEhlYWRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExheWVyTGVnZW5kQ29udGVudEZhY3RvcnkoKSB7XG4gIC8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9tYXAtbGVnZW5kJykuTGF5ZXJMZWdlbmRDb250ZW50IH0+ICovXG4gIGNvbnN0IExheWVyTGVnZW5kQ29udGVudCA9ICh7bGF5ZXIsIGNvbnRhaW5lcld9KSA9PiB7XG4gICAgY29uc3QgY29sb3JDaGFubmVscyA9IE9iamVjdC52YWx1ZXMobGF5ZXIudmlzdWFsQ2hhbm5lbHMpLmZpbHRlcihpc0NvbG9yQ2hhbm5lbCk7XG4gICAgY29uc3Qgbm9uQ29sb3JDaGFubmVscyA9IE9iamVjdC52YWx1ZXMobGF5ZXIudmlzdWFsQ2hhbm5lbHMpLmZpbHRlcih2YyA9PiAhaXNDb2xvckNoYW5uZWwodmMpKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICB7Y29sb3JDaGFubmVscy5tYXAoY29sb3JDaGFubmVsID0+XG4gICAgICAgICAgIWNvbG9yQ2hhbm5lbC5jb25kaXRpb24gfHwgY29sb3JDaGFubmVsLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgPExheWVyQ29sb3JMZWdlbmRcbiAgICAgICAgICAgICAga2V5PXtjb2xvckNoYW5uZWwua2V5fVxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGNvbG9yQ2hhbm5lbC5rZXkpfVxuICAgICAgICAgICAgICBjb25maWc9e2xheWVyLmNvbmZpZ31cbiAgICAgICAgICAgICAgd2lkdGg9e2NvbnRhaW5lclcgLSAyICogRElNRU5TSU9OUy5tYXBDb250cm9sLnBhZGRpbmd9XG4gICAgICAgICAgICAgIGNvbG9yQ2hhbm5lbD17Y29sb3JDaGFubmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbFxuICAgICAgICApfVxuICAgICAgICB7bm9uQ29sb3JDaGFubmVscy5tYXAodmlzdWFsQ2hhbm5lbCA9PiB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hDb25kaXRpb24gPSAhdmlzdWFsQ2hhbm5lbC5jb25kaXRpb24gfHwgdmlzdWFsQ2hhbm5lbC5jb25kaXRpb24obGF5ZXIuY29uZmlnKTtcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gbGF5ZXIuY29uZmlnW3Zpc3VhbENoYW5uZWwuZmllbGRdIHx8IHZpc3VhbENoYW5uZWwuZGVmYXVsdE1lYXN1cmU7XG5cbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGxheWVyLmdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbih2aXN1YWxDaGFubmVsLmtleSk7XG5cbiAgICAgICAgICByZXR1cm4gbWF0Y2hDb25kaXRpb24gJiYgZW5hYmxlZCA/IChcbiAgICAgICAgICAgIDxMYXllclNpemVMZWdlbmRcbiAgICAgICAgICAgICAga2V5PXt2aXN1YWxDaGFubmVsLmtleX1cbiAgICAgICAgICAgICAgbGFiZWw9e2Rlc2NyaXB0aW9uLmxhYmVsfVxuICAgICAgICAgICAgICBuYW1lPXtkZXNjcmlwdGlvbi5tZWFzdXJlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgfSl9XG4gICAgICA8Lz5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiBMYXllckxlZ2VuZENvbnRlbnQ7XG59XG5cbk1hcExlZ2VuZEZhY3RvcnkuZGVwcyA9IFtMYXllckxlZ2VuZEhlYWRlckZhY3RvcnksIExheWVyTGVnZW5kQ29udGVudEZhY3RvcnldO1xuZnVuY3Rpb24gTWFwTGVnZW5kRmFjdG9yeShMYXllckxlZ2VuZEhlYWRlciwgTGF5ZXJMZWdlbmRDb250ZW50KSB7XG4gIC8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9tYXAtbGVnZW5kJykuTWFwTGVnZW5kIH0+ICovXG4gIGNvbnN0IE1hcExlZ2VuZCA9ICh7bGF5ZXJzID0gW10sIHdpZHRoLCBvcHRpb25zfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLWxlZ2VuZFwiPlxuICAgICAge2xheWVycy5tYXAoKGxheWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIWxheWVyLmlzVmFsaWRUb1NhdmUoKSB8fCBsYXllci5jb25maWcuaGlkZGVuKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGFpbmVyVyA9IHdpZHRoIHx8IERJTUVOU0lPTlMubWFwQ29udHJvbC53aWR0aDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxTdHlsZWRNYXBDb250cm9sTGVnZW5kXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyXCJcbiAgICAgICAgICAgIGxhc3Q9e2luZGV4ID09PSBsYXllcnMubGVuZ3RoIC0gMX1cbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICB3aWR0aD17Y29udGFpbmVyV31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGF5ZXJMZWdlbmRIZWFkZXIgb3B0aW9ucz17b3B0aW9uc30gbGF5ZXI9e2xheWVyfSAvPlxuICAgICAgICAgICAgPExheWVyTGVnZW5kQ29udGVudCBjb250YWluZXJXPXtjb250YWluZXJXfSBsYXllcj17bGF5ZXJ9IC8+XG4gICAgICAgICAgPC9TdHlsZWRNYXBDb250cm9sTGVnZW5kPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgTWFwTGVnZW5kLmRpc3BsYXlOYW1lID0gJ01hcExlZ2VuZCc7XG5cbiAgcmV0dXJuIE1hcExlZ2VuZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwTGVnZW5kRmFjdG9yeTtcbiJdfQ==