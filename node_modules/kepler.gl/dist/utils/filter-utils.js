"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFilter = getDefaultFilter;
exports.shouldApplyFilter = shouldApplyFilter;
exports.validatePolygonFilter = validatePolygonFilter;
exports.validateFilter = validateFilter;
exports.validateFilterWithData = validateFilterWithData;
exports.getFilterProps = getFilterProps;
exports.getFilterFunction = getFilterFunction;
exports.updateFilterDataId = updateFilterDataId;
exports.filterDataByFilterTypes = filterDataByFilterTypes;
exports.getFilterRecord = getFilterRecord;
exports.diffFilters = diffFilters;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getNumericStepSize = getNumericStepSize;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.getHistogram = getHistogram;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.isInPolygon = isInPolygon;
exports.isValidTimeDomain = isValidTimeDomain;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;
exports.applyFiltersToDatasets = applyFiltersToDatasets;
exports.applyFilterFieldName = applyFilterFieldName;
exports.mergeFilterDomainStep = mergeFilterDomainStep;
exports.generatePolygonFilter = generatePolygonFilter;
exports.filterDatasetCPU = filterDatasetCPU;
exports.validateFiltersUpdateDatasets = validateFiltersUpdateDatasets;
exports.getIntervalBins = getIntervalBins;
exports.getFilterIdInFeature = exports.featureToFilterValue = exports.getPolygonFilterFunctor = exports.LAYER_FILTERS = exports.FILTER_ID_LENGTH = exports.DEFAULT_FILTER_STRUCTURE = exports.FILTER_COMPONENTS = exports.LIMITED_FILTER_EFFECT_PROPS = exports.FILTER_UPDATER_PROPS = exports.PLOT_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Array = require("d3-array");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _console = require("global/console");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.isequal"));

var _booleanWithin = _interopRequireDefault(require("@turf/boolean-within"));

var _helpers = require("@turf/helpers");

var _decimal = require("decimal.js");

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var ScaleUtils = _interopRequireWildcard(require("./data-scale-utils"));

var _types = require("../layers/types");

var _utils = require("./utils");

var _h3Utils = require("../layers/h3-hexagon-layer/h3-utils");

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// TYPE

/** @typedef {import('./table-utils/kepler-table').FilterRecord} FilterRecord */

/** @typedef {import('./filter-utils').FilterResult} FilterResult */
var TimestampStepMap = [{
  max: 1,
  step: 0.05
}, {
  max: 10,
  step: 0.1
}, {
  max: 100,
  step: 1
}, {
  max: 500,
  step: 5
}, {
  max: 1000,
  step: 10
}, {
  max: 5000,
  step: 50
}, {
  max: Number.POSITIVE_INFINITY,
  step: 1000
}];
exports.TimestampStepMap = TimestampStepMap;
var histogramBins = 30;
exports.histogramBins = histogramBins;
var enlargedHistogramBins = 100;
exports.enlargedHistogramBins = enlargedHistogramBins;
var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;
var PLOT_TYPES = (0, _keymirror["default"])({
  histogram: null,
  lineChart: null
});
exports.PLOT_TYPES = PLOT_TYPES;
var FILTER_UPDATER_PROPS = (0, _keymirror["default"])({
  dataId: null,
  name: null,
  layerId: null
});
exports.FILTER_UPDATER_PROPS = FILTER_UPDATER_PROPS;
var LIMITED_FILTER_EFFECT_PROPS = (0, _keymirror["default"])((0, _defineProperty2["default"])({}, FILTER_UPDATER_PROPS.name, null));
/**
 * Max number of filter value buffers that deck.gl provides
 */

exports.LIMITED_FILTER_EFFECT_PROPS = LIMITED_FILTER_EFFECT_PROPS;
var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.range, (_FILTER_TYPES$range = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);
var FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.range, 'RangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.polygon, 'PolygonFilter'), _FILTER_COMPONENTS);
exports.FILTER_COMPONENTS = FILTER_COMPONENTS;
var DEFAULT_FILTER_STRUCTURE = {
  dataId: [],
  // [string]
  freeze: false,
  id: null,
  // time range filter specific
  fixedDomain: false,
  enlarged: false,
  isAnimating: false,
  animationWindow: _defaultSettings.ANIMATION_WINDOW.free,
  speed: 1,
  // field specific
  name: [],
  // string
  type: null,
  fieldIdx: [],
  // [integer]
  domain: null,
  value: null,
  // plot
  plotType: PLOT_TYPES.histogram,
  yAxis: null,
  interval: null,
  // mode
  gpu: false
};
exports.DEFAULT_FILTER_STRUCTURE = DEFAULT_FILTER_STRUCTURE;
var FILTER_ID_LENGTH = 4;
exports.FILTER_ID_LENGTH = FILTER_ID_LENGTH;
var LAYER_FILTERS = [_defaultSettings.FILTER_TYPES.polygon];
/**
 * Generates a filter with a dataset id as dataId
 * @type {typeof import('./filter-utils').getDefaultFilter}
 */

exports.LAYER_FILTERS = LAYER_FILTERS;

function getDefaultFilter(dataId) {
  return _objectSpread(_objectSpread({}, DEFAULT_FILTER_STRUCTURE), {}, {
    // store it as dataId and it could be one or many
    dataId: (0, _utils.toArray)(dataId),
    id: (0, _utils.generateHashId)(FILTER_ID_LENGTH)
  });
}
/**
 * Check if a filter is valid based on the given dataId
 * @param  filter to validate
 * @param  datasetId id to validate filter against
 * @return true if a filter is valid, false otherwise
 * @type {typeof import('./filter-utils').shouldApplyFilter}
 */


function shouldApplyFilter(filter, datasetId) {
  var dataIds = (0, _utils.toArray)(filter.dataId);
  return dataIds.includes(datasetId) && filter.value !== null;
}
/**
 * Validates and modifies polygon filter structure
 * @param dataset
 * @param filter
 * @param layers
 * @return - {filter, dataset}
 * @type {typeof import('./filter-utils').validatePolygonFilter}
 */


function validatePolygonFilter(dataset, filter, layers) {
  var failed = {
    dataset: dataset,
    filter: null
  };
  var value = filter.value,
      layerId = filter.layerId,
      type = filter.type,
      dataId = filter.dataId;

  if (!layerId || !isValidFilterValue(type, value)) {
    return failed;
  }

  var isValidDataset = dataId.includes(dataset.id);

  if (!isValidDataset) {
    return failed;
  }

  var layer = layers.find(function (l) {
    return layerId.includes(l.id);
  });

  if (!layer) {
    return failed;
  }

  return {
    filter: _objectSpread(_objectSpread({}, filter), {}, {
      freeze: true,
      fieldIdx: []
    }),
    dataset: dataset
  };
}
/**
 * Custom filter validators
 */


var filterValidators = (0, _defineProperty2["default"])({}, _defaultSettings.FILTER_TYPES.polygon, validatePolygonFilter);
/**
 * Default validate filter function
 * @param dataset
 * @param filter
 * @return - {filter, dataset}
 * @type {typeof import('./filter-utils').validateFilter}
 */

function validateFilter(dataset, filter) {
  // match filter.dataId
  var failed = {
    dataset: dataset,
    filter: null
  };
  var filterDataId = (0, _utils.toArray)(filter.dataId);
  var filterDatasetIndex = filterDataId.indexOf(dataset.id);

  if (filterDatasetIndex < 0) {
    // the current filter is not mapped against the current dataset
    return failed;
  }

  var initializeFilter = _objectSpread(_objectSpread(_objectSpread({}, getDefaultFilter(filter.dataId)), filter), {}, {
    dataId: filterDataId,
    name: (0, _utils.toArray)(filter.name)
  });

  var fieldName = initializeFilter.name[filterDatasetIndex];

  var _applyFilterFieldName = applyFilterFieldName(initializeFilter, dataset, fieldName, filterDatasetIndex, {
    mergeDomain: true
  }),
      updatedFilter = _applyFilterFieldName.filter,
      updatedDataset = _applyFilterFieldName.dataset;

  if (!updatedFilter) {
    return failed;
  }

  updatedFilter.value = adjustValueToFilterDomain(filter.value, updatedFilter);
  updatedFilter.enlarged = typeof filter.enlarged === 'boolean' ? filter.enlarged : updatedFilter.enlarged;

  if (updatedFilter.value === null) {
    // cannot adjust saved value to filter
    return failed;
  }

  return {
    filter: validateFilterYAxis(updatedFilter, updatedDataset),
    dataset: updatedDataset
  };
}
/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param dataset
 * @param filter - filter to be validate
 * @param layers - layers
 * @return validated filter
 * @type {typeof import('./filter-utils').validateFilterWithData}
 */


function validateFilterWithData(dataset, filter, layers) {
  // @ts-ignore
  return filterValidators.hasOwnProperty(filter.type) ? filterValidators[filter.type](dataset, filter, layers) : validateFilter(dataset, filter);
}
/**
 * Validate YAxis
 * @param filter
 * @param dataset
 * @return {*}
 */


function validateFilterYAxis(filter, dataset) {
  // TODO: validate yAxis against other datasets
  var fields = dataset.fields;
  var _filter = filter,
      yAxis = _filter.yAxis; // TODO: validate yAxis against other datasets

  if (yAxis) {
    var matchedAxis = fields.find(function (_ref) {
      var name = _ref.name,
          type = _ref.type;
      return name === yAxis.name && type === yAxis.type;
    });
    filter = matchedAxis ? _objectSpread(_objectSpread({}, filter), {}, {
      yAxis: matchedAxis
    }, getFilterPlot(_objectSpread(_objectSpread({}, filter), {}, {
      yAxis: matchedAxis
    }), dataset)) : filter;
  }

  return filter;
}
/**
 * Get default filter prop based on field type
 *
 * @param field
 * @param fieldDomain
 * @returns default filter
 * @type {typeof import('./filter-utils').getFilterProps}
 */


function getFilterProps(field, fieldDomain) {
  var filterProps = _objectSpread(_objectSpread({}, fieldDomain), {}, {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        value: fieldDomain.domain,
        type: _defaultSettings.FILTER_TYPES.range,
        typeOptions: [_defaultSettings.FILTER_TYPES.range],
        gpu: true
      });

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.select,
        value: true,
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.multiSelect,
        value: [],
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProps.domain,
        gpu: true
      });

    default:
      return {};
  }
}

var getPolygonFilterFunctor = function getPolygonFilterFunctor(layer, filter, dataContainer) {
  var getPosition = layer.getPositionAccessor(dataContainer);

  switch (layer.type) {
    case _types.LAYER_TYPES.point:
    case _types.LAYER_TYPES.icon:
      return function (data) {
        var pos = getPosition(data);
        return pos.every(Number.isFinite) && isInPolygon(pos, filter.value);
      };

    case _types.LAYER_TYPES.arc:
    case _types.LAYER_TYPES.line:
      return function (data) {
        var pos = getPosition(data);
        return pos.every(Number.isFinite) && [[pos[0], pos[1]], [pos[3], pos[4]]].every(function (point) {
          return isInPolygon(point, filter.value);
        });
      };

    case _types.LAYER_TYPES.hexagonId:
      if (layer.dataToFeature && layer.dataToFeature.centroids) {
        return function (data) {
          // null or getCentroid({id})
          var centroid = layer.dataToFeature.centroids[data.index];
          return centroid && isInPolygon(centroid, filter.value);
        };
      }

      return function (data) {
        var id = getPosition(data);

        if (!(0, _h3Utils.h3IsValid)(id)) {
          return false;
        }

        var pos = (0, _h3Utils.getCentroid)({
          id: id
        });
        return pos.every(Number.isFinite) && isInPolygon(pos, filter.value);
      };

    default:
      return function () {
        return true;
      };
  }
};
/**
 * @param field dataset Field
 * @param dataId Dataset id
 * @param filter Filter object
 * @param layers list of layers to filter upon
 * @param dataContainer Data container
 * @return filterFunction
 * @type {typeof import('./filter-utils').getFilterFunction}
 */


exports.getPolygonFilterFunctor = getPolygonFilterFunctor;

function getFilterFunction(field, dataId, filter, layers, dataContainer) {
  // field could be null in polygon filter
  var valueAccessor = field ? field.valueAccessor : function (data) {
    return null;
  };

  var defaultFunc = function defaultFunc(d) {
    return true;
  };

  switch (filter.type) {
    case _defaultSettings.FILTER_TYPES.range:
      return function (data) {
        return isInRange(valueAccessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return function (data) {
        return filter.value.includes(valueAccessor(data));
      };

    case _defaultSettings.FILTER_TYPES.select:
      return function (data) {
        return valueAccessor(data) === filter.value;
      };

    case _defaultSettings.FILTER_TYPES.timeRange:
      if (!field) {
        return defaultFunc;
      }

      var mappedValue = (0, _lodash["default"])(field, ['filterProps', 'mappedValue']);
      var accessor = Array.isArray(mappedValue) ? function (data) {
        return mappedValue[data.index];
      } : function (data) {
        return (0, _dataUtils.timeToUnixMilli)(valueAccessor(data), field.format);
      };
      return function (data) {
        return isInRange(accessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.polygon:
      if (!layers || !layers.length) {
        return defaultFunc;
      } // @ts-ignore


      var layerFilterFunctions = filter.layerId.map(function (id) {
        return layers.find(function (l) {
          return l.id === id;
        });
      }).filter(function (l) {
        return l && l.config.dataId === dataId;
      }).map(function (layer) {
        return getPolygonFilterFunctor(layer, filter, dataContainer);
      });
      return function (data) {
        return layerFilterFunctions.every(function (filterFunc) {
          return filterFunc(data);
        });
      };

    default:
      return defaultFunc;
  }
}

function updateFilterDataId(dataId) {
  return getDefaultFilter(dataId);
}
/**
 * @type {typeof import('./filter-utils').filterDataByFilterTypes}
 */


function filterDataByFilterTypes(_ref2, dataContainer) {
  var dynamicDomainFilters = _ref2.dynamicDomainFilters,
      cpuFilters = _ref2.cpuFilters,
      filterFuncs = _ref2.filterFuncs;

  var result = _objectSpread(_objectSpread({}, dynamicDomainFilters ? {
    filteredIndexForDomain: []
  } : {}), cpuFilters ? {
    filteredIndex: []
  } : {});

  var filterContext = {
    index: -1,
    dataContainer: dataContainer
  };

  var filterFuncCaller = function filterFuncCaller(filter) {
    return filterFuncs[filter.id](filterContext);
  };

  var numRows = dataContainer.numRows();

  for (var i = 0; i < numRows; ++i) {
    filterContext.index = i;
    var matchForDomain = dynamicDomainFilters && dynamicDomainFilters.every(filterFuncCaller);

    if (matchForDomain) {
      // @ts-ignore
      result.filteredIndexForDomain.push(filterContext.index);
    }

    var matchForRender = cpuFilters && cpuFilters.every(filterFuncCaller);

    if (matchForRender) {
      // @ts-ignore
      result.filteredIndex.push(filterContext.index);
    }
  }

  return result;
}
/**
 * Get a record of filters based on domain type and gpu / cpu
 * @type {typeof import('./filter-utils').getFilterRecord}
 */


function getFilterRecord(dataId, filters) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  /**
   * @type {FilterRecord}
   */
  var filterRecord = {
    dynamicDomain: [],
    fixedDomain: [],
    cpu: [],
    gpu: []
  };
  filters.forEach(function (f) {
    if (isValidFilterValue(f.type, f.value) && (0, _utils.toArray)(f.dataId).includes(dataId)) {
      (f.fixedDomain || opt.ignoreDomain ? filterRecord.fixedDomain : filterRecord.dynamicDomain).push(f);
      (f.gpu && !opt.cpuOnly ? filterRecord.gpu : filterRecord.cpu).push(f);
    }
  });
  return filterRecord;
}
/**
 * Compare filter records to get what has changed
 * @type {typeof import('./filter-utils').diffFilters}
 */


function diffFilters(filterRecord) {
  var oldFilterRecord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filterChanged = {};
  Object.entries(filterRecord).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        record = _ref4[0],
        items = _ref4[1];

    items.forEach(function (filter) {
      var oldFilter = (oldFilterRecord[record] || []).find(function (f) {
        return f.id === filter.id;
      });

      if (!oldFilter) {
        // added
        filterChanged = (0, _utils.set)([record, filter.id], 'added', filterChanged);
      } else {
        // check  what has changed
        ['name', 'value', 'dataId'].forEach(function (prop) {
          if (filter[prop] !== oldFilter[prop]) {
            filterChanged = (0, _utils.set)([record, filter.id], "".concat(prop, "_changed"), filterChanged);
          }
        });
      }
    });
    (oldFilterRecord[record] || []).forEach(function (oldFilter) {
      // deleted
      if (!items.find(function (f) {
        return f.id === oldFilter.id;
      })) {
        filterChanged = (0, _utils.set)([record, oldFilter.id], 'deleted', filterChanged);
      }
    });

    if (!filterChanged[record]) {
      filterChanged[record] = null;
    }
  }); // @ts-ignore

  return filterChanged;
}
/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @type {typeof import('./filter-utils').adjustValueToFilterDomain}
 * @returns value - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */


function adjustValueToFilterDomain(value, _ref5) {
  var domain = _ref5.domain,
      type = _ref5.type;

  if (!domain || !type) {
    return false;
  }

  switch (type) {
    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }

      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case _defaultSettings.FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @type {typeof import('./filter-utils').getNumericFieldDomain}
 */


function getNumericFieldDomain(dataContainer, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;
  var mappedValue = dataContainer.mapIndex(valueAccessor);

  if (dataContainer.numRows() > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0]; // in case equal domain, [96, 96], which will break quantize scale

    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  } // @ts-ignore


  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * Calculate step size for range and timerange filter
 *
 * @type {typeof import('./filter-utils').getNumericStepSize}
 */


function getNumericStepSize(diff) {
  diff = Math.abs(diff);

  if (diff > 100) {
    return 1;
  } else if (diff > 3) {
    return 0.01;
  } else if (diff > 1) {
    return 0.001;
  } // Try to get at least 1000 steps - and keep the step size below that of
  // the (diff > 1) case.


  var x = diff / 1000; // Find the exponent and truncate to 10 to the power of that exponent

  var exponentialForm = x.toExponential();
  var exponent = parseFloat(exponentialForm.split('e')[1]); // Getting ready for node 12
  // this is why we need decimal.js
  // Math.pow(10, -5) = 0.000009999999999999999
  // the above result shows in browser and node 10
  // node 12 behaves correctly

  return new _decimal.Decimal(10).pow(exponent).toNumber();
}
/**
 * Calculate timestamp domain and suitable step
 * @type {typeof import('./filter-utils').getTimestampFieldDomain}
 */


function getTimestampFieldDomain(dataContainer, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain
  var mappedValue = dataContainer.mapIndex(valueAccessor);
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var defaultTimeFormat = getTimeWidgetTitleFormatter(domain);
  var step = 0.01;
  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });

  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    mappedValue: mappedValue,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram,
    defaultTimeFormat: defaultTimeFormat
  };
}
/**
 *
 * @type {typeof import('./filter-utils').histogramConstruct}
 */


function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @type {typeof import('./filter-utils').getHistogram}
 */


function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);
  return {
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * round number based on step
 *
 * @param {Number} val
 * @param {Number} step
 * @param {string} bound
 * @returns {Number} rounded number
 */


function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}
/**
 *
 * @type {typeof import('./filter-utils').isInRange}
 */


function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}
/**
 * Determines whether a point is within the provided polygon
 *
 * @param point as input search [lat, lng]
 * @param polygon Points must be within these (Multi)Polygon(s)
 * @return {boolean}
 */


function isInPolygon(point, polygon) {
  return (0, _booleanWithin["default"])((0, _helpers.point)(point), polygon);
}

function isValidTimeDomain(domain) {
  return Array.isArray(domain) && domain.every(Number.isFinite);
}

function getTimeWidgetTitleFormatter(domain) {
  if (!isValidTimeDomain(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0]; // Local aware formats
  // https://momentjs.com/docs/#/parsing/string-format

  return diff > durationYear ? 'L' : diff > durationDay ? 'L LT' : 'L LTS';
}

function getTimeWidgetHintFormatter(domain) {
  if (!isValidTimeDomain(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationWeek ? 'L' : diff > durationDay ? 'L LT' : diff > durationHour ? 'LT' : 'LTS';
}
/**
 * Sanity check on filters to prepare for save
 * @type {typeof import('./filter-utils').isValidFilterValue}
 */

/* eslint-disable complexity */


function isValidFilterValue(type, value) {
  if (!type) {
    return false;
  }

  switch (type) {
    case _defaultSettings.FILTER_TYPES.select:
      return value === true || value === false;

    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.input:
      return Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.polygon:
      var coordinates = (0, _lodash["default"])(value, ['geometry', 'coordinates']);
      return Boolean(value && value.id && coordinates);

    default:
      return true;
  }
}
/**
 *
 * @type {typeof import('./filter-utils').getFilterPlot}
 */


function getFilterPlot(filter, dataset) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var _filter$mappedValue = filter.mappedValue,
      mappedValue = _filter$mappedValue === void 0 ? [] : _filter$mappedValue;
  var yAxis = filter.yAxis;
  var fieldIdx = dataset.getColumnFieldIdx(yAxis.name);

  if (fieldIdx < 0) {
    _console.console.warn("yAxis ".concat(yAxis.name, " does not exist in dataset"));

    return {
      lineChart: {},
      yAxis: yAxis
    };
  } // return lineChart


  var series = dataset.dataContainer.map(function (row, rowIndex) {
    return {
      x: mappedValue[rowIndex],
      y: row.valueAt(fieldIdx)
    };
  }, true).filter(function (_ref6) {
    var x = _ref6.x,
        y = _ref6.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });
  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];
  return {
    lineChart: {
      series: series,
      yDomain: yDomain,
      xDomain: xDomain
    },
    yAxis: yAxis
  };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];

  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes["default"];
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
/**
 *
 * @param datasetIds list of dataset ids to be filtered
 * @param datasets all datasets
 * @param filters all filters to be applied to datasets
 * @return datasets - new updated datasets
 * @type {typeof import('./filter-utils').applyFiltersToDatasets}
 */


function applyFiltersToDatasets(datasetIds, datasets, filters, layers) {
  var dataIds = (0, _utils.toArray)(datasetIds);
  return dataIds.reduce(function (acc, dataId) {
    var layersToFilter = (layers || []).filter(function (l) {
      return l.config.dataId === dataId;
    });
    var appliedFilters = filters.filter(function (d) {
      return shouldApplyFilter(d, dataId);
    });
    var table = datasets[dataId];
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, dataId, table.filterTable(appliedFilters, layersToFilter, {})));
  }, datasets);
}
/**
 * Applies a new field name value to fielter and update both filter and dataset
 * @param filter - to be applied the new field name on
 * @param dataset - dataset the field belongs to
 * @param fieldName - field.name
 * @param filterDatasetIndex - field.name
 * @param option
 * @return - {filter, datasets}
 * @type {typeof import('./filter-utils').applyFilterFieldName}
 */


function applyFilterFieldName(filter, dataset, fieldName) {
  var filterDatasetIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var option = arguments.length > 4 ? arguments[4] : undefined;
  // using filterDatasetIndex we can filter only the specified dataset
  var mergeDomain = option && option.hasOwnProperty('mergeDomain') ? option.mergeDomain : false;
  var fieldIndex = dataset.getColumnFieldIdx(fieldName); // if no field with same name is found, move to the next datasets

  if (fieldIndex === -1) {
    // throw new Error(`fieldIndex not found. Dataset must contain a property with name: ${fieldName}`);
    return {
      filter: null,
      dataset: dataset
    };
  } // TODO: validate field type


  var filterProps = dataset.getColumnFilterProps(fieldName);

  var newFilter = _objectSpread(_objectSpread({}, mergeDomain ? mergeFilterDomainStep(filter, filterProps) : _objectSpread(_objectSpread({}, filter), filterProps)), {}, {
    name: Object.assign((0, _toConsumableArray2["default"])((0, _utils.toArray)(filter.name)), (0, _defineProperty2["default"])({}, filterDatasetIndex, fieldName)),
    fieldIdx: Object.assign((0, _toConsumableArray2["default"])((0, _utils.toArray)(filter.fieldIdx)), (0, _defineProperty2["default"])({}, filterDatasetIndex, fieldIndex)),
    // TODO, since we allow to add multiple fields to a filter we can no longer freeze the filter
    freeze: true
  });

  return {
    filter: newFilter,
    dataset: dataset
  };
}
/**
 * Merge one filter with other filter prop domain
 * @type {typeof import('./filter-utils').mergeFilterDomainStep}
 */

/* eslint-disable complexity */


function mergeFilterDomainStep(filter, filterProps) {
  if (!filter) {
    return null;
  }

  if (!filterProps) {
    return filter;
  }

  if (filter.fieldType && filter.fieldType !== filterProps.fieldType || !filterProps.domain) {
    return filter;
  }

  var combinedDomain = !filter.domain ? filterProps.domain : [].concat((0, _toConsumableArray2["default"])(filter.domain || []), (0, _toConsumableArray2["default"])(filterProps.domain || [])).sort(function (a, b) {
    return a - b;
  });

  var newFilter = _objectSpread(_objectSpread(_objectSpread({}, filter), filterProps), {}, {
    domain: [combinedDomain[0], combinedDomain[combinedDomain.length - 1]]
  });

  switch (filterProps.fieldType) {
    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread(_objectSpread({}, newFilter), {}, {
        domain: (0, _dataUtils.unique)(combinedDomain).sort()
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      // @ts-ignore
      var step = filter.step < filterProps.step ? filter.step : filterProps.step;
      return _objectSpread(_objectSpread({}, newFilter), {}, {
        step: step
      });

    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
    default:
      return newFilter;
  }
}
/* eslint-enable complexity */

/**
 * Generates polygon filter
 * @type {typeof import('./filter-utils').featureToFilterValue}
 */


var featureToFilterValue = function featureToFilterValue(feature, filterId) {
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread(_objectSpread({}, feature), {}, {
    id: feature.id,
    properties: _objectSpread(_objectSpread(_objectSpread({}, feature.properties), properties), {}, {
      filterId: filterId
    })
  });
};
/**
 * @type {typeof import('./filter-utils').getFilterIdInFeature}
 */


exports.featureToFilterValue = featureToFilterValue;

var getFilterIdInFeature = function getFilterIdInFeature(f) {
  return (0, _lodash["default"])(f, ['properties', 'filterId']);
};
/**
 * Generates polygon filter
 * @type {typeof import('./filter-utils').generatePolygonFilter}
 */


exports.getFilterIdInFeature = getFilterIdInFeature;

function generatePolygonFilter(layers, feature) {
  var dataId = layers.map(function (l) {
    return l.config.dataId;
  }).filter(function (d) {
    return d;
  });
  var layerId = layers.map(function (l) {
    return l.id;
  });
  var name = layers.map(function (l) {
    return l.config.label;
  }); // @ts-ignore

  var filter = getDefaultFilter(dataId);
  return _objectSpread(_objectSpread({}, filter), {}, {
    fixedDomain: true,
    type: _defaultSettings.FILTER_TYPES.polygon,
    name: name,
    layerId: layerId,
    value: featureToFilterValue(feature, filter.id, {
      isVisible: true
    })
  });
}
/**
 * Run filter entirely on CPU
 * @type {typeof import('./filter-utils').filterDatasetCPU}
 */


function filterDatasetCPU(state, dataId) {
  var datasetFilters = state.filters.filter(function (f) {
    return f.dataId.includes(dataId);
  });
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var cpuFilteredDataset = dataset.filterTableCPU(datasetFilters, state.layers);
  return (0, _utils.set)(['datasets', dataId], cpuFilteredDataset, state);
}
/**
 * Validate parsed filters with datasets and add filterProps to field
 * @type {typeof import('./filter-utils').validateFiltersUpdateDatasets}
 */


function validateFiltersUpdateDatasets(state) {
  var filtersToValidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var validated = [];
  var failed = [];
  var datasets = state.datasets;
  var updatedDatasets = datasets; // merge filters

  filtersToValidate.forEach(function (filter) {
    // we can only look for datasets define in the filter dataId
    var datasetIds = (0, _utils.toArray)(filter.dataId); // we can merge a filter only if all datasets in filter.dataId are loaded

    if (datasetIds.every(function (d) {
      return datasets[d];
    })) {
      // all datasetIds in filter must be present the state datasets
      var _datasetIds$reduce = datasetIds.reduce(function (acc, datasetId) {
        var dataset = updatedDatasets[datasetId];
        var layers = state.layers.filter(function (l) {
          return l.config.dataId === dataset.id;
        });

        var _validateFilterWithDa = validateFilterWithData(acc.augmentedDatasets[datasetId] || dataset, filter, layers),
            updatedFilter = _validateFilterWithDa.filter,
            updatedDataset = _validateFilterWithDa.dataset;

        if (updatedFilter) {
          return _objectSpread(_objectSpread({}, acc), {}, {
            // merge filter props
            filter: acc.filter ? _objectSpread(_objectSpread({}, acc.filter), mergeFilterDomainStep(acc, updatedFilter)) : updatedFilter,
            applyToDatasets: [].concat((0, _toConsumableArray2["default"])(acc.applyToDatasets), [datasetId]),
            augmentedDatasets: _objectSpread(_objectSpread({}, acc.augmentedDatasets), {}, (0, _defineProperty2["default"])({}, datasetId, updatedDataset))
          });
        }

        return acc;
      }, {
        filter: null,
        applyToDatasets: [],
        augmentedDatasets: {}
      }),
          validatedFilter = _datasetIds$reduce.filter,
          applyToDatasets = _datasetIds$reduce.applyToDatasets,
          augmentedDatasets = _datasetIds$reduce.augmentedDatasets;

      if (validatedFilter && (0, _lodash2["default"])(datasetIds, applyToDatasets)) {
        validated.push(validatedFilter);
        updatedDatasets = _objectSpread(_objectSpread({}, updatedDatasets), augmentedDatasets);
      }
    } else {
      failed.push(filter);
    }
  });
  return {
    validated: validated,
    failed: failed,
    updatedDatasets: updatedDatasets
  };
}
/**
 * Retrieve interval bins for time filter
 * @type {typeof import('./filter-utils').getIntervalBins}
 */


function getIntervalBins(filter) {
  var _filter$plotType;

  var bins = filter.bins;
  var interval = (_filter$plotType = filter.plotType) === null || _filter$plotType === void 0 ? void 0 : _filter$plotType.interval;

  if (!interval || !bins || Object.keys(bins).length === 0) {
    return null;
  }

  var values = Object.values(bins);
  return values[0] ? values[0][interval] : null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiVGltZXN0YW1wU3RlcE1hcCIsIm1heCIsInN0ZXAiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImhpc3RvZ3JhbUJpbnMiLCJlbmxhcmdlZEhpc3RvZ3JhbUJpbnMiLCJkdXJhdGlvblNlY29uZCIsImR1cmF0aW9uTWludXRlIiwiZHVyYXRpb25Ib3VyIiwiZHVyYXRpb25EYXkiLCJkdXJhdGlvbldlZWsiLCJkdXJhdGlvblllYXIiLCJQTE9UX1RZUEVTIiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwiRklMVEVSX1VQREFURVJfUFJPUFMiLCJkYXRhSWQiLCJuYW1lIiwibGF5ZXJJZCIsIkxJTUlURURfRklMVEVSX0VGRkVDVF9QUk9QUyIsIlN1cHBvcnRlZFBsb3RUeXBlIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwiQUxMX0ZJRUxEX1RZUEVTIiwiaW50ZWdlciIsInJlYWwiLCJyYW5nZSIsIkZJTFRFUl9DT01QT05FTlRTIiwic2VsZWN0IiwibXVsdGlTZWxlY3QiLCJwb2x5Z29uIiwiREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFIiwiZnJlZXplIiwiaWQiLCJmaXhlZERvbWFpbiIsImVubGFyZ2VkIiwiaXNBbmltYXRpbmciLCJhbmltYXRpb25XaW5kb3ciLCJBTklNQVRJT05fV0lORE9XIiwiZnJlZSIsInNwZWVkIiwidHlwZSIsImZpZWxkSWR4IiwiZG9tYWluIiwidmFsdWUiLCJwbG90VHlwZSIsInlBeGlzIiwiaW50ZXJ2YWwiLCJncHUiLCJGSUxURVJfSURfTEVOR1RIIiwiTEFZRVJfRklMVEVSUyIsImdldERlZmF1bHRGaWx0ZXIiLCJzaG91bGRBcHBseUZpbHRlciIsImZpbHRlciIsImRhdGFzZXRJZCIsImRhdGFJZHMiLCJpbmNsdWRlcyIsInZhbGlkYXRlUG9seWdvbkZpbHRlciIsImRhdGFzZXQiLCJsYXllcnMiLCJmYWlsZWQiLCJpc1ZhbGlkRmlsdGVyVmFsdWUiLCJpc1ZhbGlkRGF0YXNldCIsImxheWVyIiwiZmluZCIsImwiLCJmaWx0ZXJWYWxpZGF0b3JzIiwidmFsaWRhdGVGaWx0ZXIiLCJmaWx0ZXJEYXRhSWQiLCJmaWx0ZXJEYXRhc2V0SW5kZXgiLCJpbmRleE9mIiwiaW5pdGlhbGl6ZUZpbHRlciIsImZpZWxkTmFtZSIsImFwcGx5RmlsdGVyRmllbGROYW1lIiwibWVyZ2VEb21haW4iLCJ1cGRhdGVkRmlsdGVyIiwidXBkYXRlZERhdGFzZXQiLCJhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluIiwidmFsaWRhdGVGaWx0ZXJZQXhpcyIsInZhbGlkYXRlRmlsdGVyV2l0aERhdGEiLCJoYXNPd25Qcm9wZXJ0eSIsImZpZWxkcyIsIm1hdGNoZWRBeGlzIiwiZ2V0RmlsdGVyUGxvdCIsImdldEZpbHRlclByb3BzIiwiZmllbGQiLCJmaWVsZERvbWFpbiIsImZpbHRlclByb3BzIiwiZmllbGRUeXBlIiwidHlwZU9wdGlvbnMiLCJzdHJpbmciLCJkYXRlIiwidGltZXN0YW1wIiwiZ2V0UG9seWdvbkZpbHRlckZ1bmN0b3IiLCJkYXRhQ29udGFpbmVyIiwiZ2V0UG9zaXRpb24iLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiTEFZRVJfVFlQRVMiLCJwb2ludCIsImljb24iLCJkYXRhIiwicG9zIiwiZXZlcnkiLCJpc0Zpbml0ZSIsImlzSW5Qb2x5Z29uIiwiYXJjIiwibGluZSIsImhleGFnb25JZCIsImRhdGFUb0ZlYXR1cmUiLCJjZW50cm9pZHMiLCJjZW50cm9pZCIsImluZGV4IiwiZ2V0RmlsdGVyRnVuY3Rpb24iLCJ2YWx1ZUFjY2Vzc29yIiwiZGVmYXVsdEZ1bmMiLCJkIiwiaXNJblJhbmdlIiwibWFwcGVkVmFsdWUiLCJhY2Nlc3NvciIsIkFycmF5IiwiaXNBcnJheSIsImZvcm1hdCIsImxlbmd0aCIsImxheWVyRmlsdGVyRnVuY3Rpb25zIiwibWFwIiwiY29uZmlnIiwiZmlsdGVyRnVuYyIsInVwZGF0ZUZpbHRlckRhdGFJZCIsImZpbHRlckRhdGFCeUZpbHRlclR5cGVzIiwiZHluYW1pY0RvbWFpbkZpbHRlcnMiLCJjcHVGaWx0ZXJzIiwiZmlsdGVyRnVuY3MiLCJyZXN1bHQiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiZmlsdGVyZWRJbmRleCIsImZpbHRlckNvbnRleHQiLCJmaWx0ZXJGdW5jQ2FsbGVyIiwibnVtUm93cyIsImkiLCJtYXRjaEZvckRvbWFpbiIsInB1c2giLCJtYXRjaEZvclJlbmRlciIsImdldEZpbHRlclJlY29yZCIsImZpbHRlcnMiLCJvcHQiLCJmaWx0ZXJSZWNvcmQiLCJkeW5hbWljRG9tYWluIiwiY3B1IiwiZm9yRWFjaCIsImYiLCJpZ25vcmVEb21haW4iLCJjcHVPbmx5IiwiZGlmZkZpbHRlcnMiLCJvbGRGaWx0ZXJSZWNvcmQiLCJmaWx0ZXJDaGFuZ2VkIiwiT2JqZWN0IiwiZW50cmllcyIsInJlY29yZCIsIml0ZW1zIiwib2xkRmlsdGVyIiwicHJvcCIsImZpbHRlcmVkVmFsdWUiLCJnZXROdW1lcmljRmllbGREb21haW4iLCJtYXBJbmRleCIsIlNjYWxlVXRpbHMiLCJnZXRMaW5lYXJEb21haW4iLCJkaWZmIiwiZ2V0TnVtZXJpY1N0ZXBTaXplIiwiZm9ybWF0TnVtYmVyQnlTdGVwIiwiZ2V0SGlzdG9ncmFtIiwiZW5sYXJnZWRIaXN0b2dyYW0iLCJNYXRoIiwiYWJzIiwieCIsImV4cG9uZW50aWFsRm9ybSIsInRvRXhwb25lbnRpYWwiLCJleHBvbmVudCIsInBhcnNlRmxvYXQiLCJzcGxpdCIsIkRlY2ltYWwiLCJwb3ciLCJ0b051bWJlciIsImdldFRpbWVzdGFtcEZpZWxkRG9tYWluIiwiZGVmYXVsdFRpbWVGb3JtYXQiLCJnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIiLCJlbnRyeSIsImhpc3RvZ3JhbUNvbnN0cnVjdCIsImJpbnMiLCJ0aHJlc2hvbGRzIiwiYmluIiwiY291bnQiLCJ4MCIsIngxIiwidmFsIiwiYm91bmQiLCJmbG9vciIsImNlaWwiLCJpc1ZhbGlkVGltZURvbWFpbiIsImdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyIiwidiIsImlzTmFOIiwiQm9vbGVhbiIsImlucHV0IiwiY29vcmRpbmF0ZXMiLCJnZXRDb2x1bW5GaWVsZElkeCIsIkNvbnNvbGUiLCJ3YXJuIiwic2VyaWVzIiwicm93Iiwicm93SW5kZXgiLCJ5IiwidmFsdWVBdCIsInNvcnQiLCJhIiwiYiIsInlEb21haW4iLCJ4RG9tYWluIiwiZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlIiwiZmlsdGVyUGxvdFR5cGVzIiwiYXBwbHlGaWx0ZXJzVG9EYXRhc2V0cyIsImRhdGFzZXRJZHMiLCJkYXRhc2V0cyIsInJlZHVjZSIsImFjYyIsImxheWVyc1RvRmlsdGVyIiwiYXBwbGllZEZpbHRlcnMiLCJ0YWJsZSIsImZpbHRlclRhYmxlIiwib3B0aW9uIiwiZmllbGRJbmRleCIsImdldENvbHVtbkZpbHRlclByb3BzIiwibmV3RmlsdGVyIiwibWVyZ2VGaWx0ZXJEb21haW5TdGVwIiwiYXNzaWduIiwiY29tYmluZWREb21haW4iLCJmZWF0dXJlVG9GaWx0ZXJWYWx1ZSIsImZlYXR1cmUiLCJmaWx0ZXJJZCIsInByb3BlcnRpZXMiLCJnZXRGaWx0ZXJJZEluRmVhdHVyZSIsImdlbmVyYXRlUG9seWdvbkZpbHRlciIsImxhYmVsIiwiaXNWaXNpYmxlIiwiZmlsdGVyRGF0YXNldENQVSIsInN0YXRlIiwiZGF0YXNldEZpbHRlcnMiLCJjcHVGaWx0ZXJlZERhdGFzZXQiLCJmaWx0ZXJUYWJsZUNQVSIsInZhbGlkYXRlRmlsdGVyc1VwZGF0ZURhdGFzZXRzIiwiZmlsdGVyc1RvVmFsaWRhdGUiLCJ2YWxpZGF0ZWQiLCJ1cGRhdGVkRGF0YXNldHMiLCJhdWdtZW50ZWREYXRhc2V0cyIsImFwcGx5VG9EYXRhc2V0cyIsInZhbGlkYXRlZEZpbHRlciIsImdldEludGVydmFsQmlucyIsImtleXMiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JB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QWZBO0FBQXBCLEdBQVA7QUFDRDtBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTSSxlQUFULENBQXlCMU0sTUFBekIsRUFBaUM7QUFBQTs7QUFBQSxNQUMvQnNJLElBRCtCLEdBQ3ZCdEksTUFEdUIsQ0FDL0JzSSxJQUQrQjtBQUV0QyxNQUFNNUksUUFBUSx1QkFBR00sTUFBTSxDQUFDUixRQUFWLHFEQUFHLGlCQUFpQkUsUUFBbEM7O0FBQ0EsTUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQzRJLElBQWQsSUFBc0JoQyxNQUFNLENBQUNxRyxJQUFQLENBQVlyRSxJQUFaLEVBQWtCakUsTUFBbEIsS0FBNkIsQ0FBdkQsRUFBMEQ7QUFDeEQsV0FBTyxJQUFQO0FBQ0Q7O0FBQ0QsTUFBTXVJLE1BQU0sR0FBR3RHLE1BQU0sQ0FBQ3NHLE1BQVAsQ0FBY3RFLElBQWQsQ0FBZjtBQUNBLFNBQU9zRSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVlBLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVWxOLFFBQVYsQ0FBWixHQUFrQyxJQUF6QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHthc2NlbmRpbmcsIGV4dGVudCwgaGlzdG9ncmFtIGFzIGQzSGlzdG9ncmFtLCB0aWNrc30gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IGtleU1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC9jb25zb2xlJztcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoLmdldCc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2guaXNlcXVhbCc7XG5cbmltcG9ydCBib29sZWFuV2l0aGluIGZyb20gJ0B0dXJmL2Jvb2xlYW4td2l0aGluJztcbmltcG9ydCB7cG9pbnQgYXMgdHVyZlBvaW50fSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbmltcG9ydCB7RGVjaW1hbH0gZnJvbSAnZGVjaW1hbC5qcyc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgRklMVEVSX1RZUEVTLCBBTklNQVRJT05fV0lORE9XfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge25vdE51bGxvclVuZGVmaW5lZCwgdW5pcXVlLCB0aW1lVG9Vbml4TWlsbGl9IGZyb20gJy4vZGF0YS11dGlscyc7XG5pbXBvcnQgKiBhcyBTY2FsZVV0aWxzIGZyb20gJy4vZGF0YS1zY2FsZS11dGlscyc7XG5pbXBvcnQge0xBWUVSX1RZUEVTfSBmcm9tICdsYXllcnMvdHlwZXMnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZCwgc2V0LCB0b0FycmF5fSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Z2V0Q2VudHJvaWQsIGgzSXNWYWxpZH0gZnJvbSAnbGF5ZXJzL2gzLWhleGFnb24tbGF5ZXIvaDMtdXRpbHMnO1xuXG4vLyBUWVBFXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi90YWJsZS11dGlscy9rZXBsZXItdGFibGUnKS5GaWx0ZXJSZWNvcmR9IEZpbHRlclJlY29yZCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuRmlsdGVyUmVzdWx0fSBGaWx0ZXJSZXN1bHQgKi9cblxuZXhwb3J0IGNvbnN0IFRpbWVzdGFtcFN0ZXBNYXAgPSBbXG4gIHttYXg6IDEsIHN0ZXA6IDAuMDV9LFxuICB7bWF4OiAxMCwgc3RlcDogMC4xfSxcbiAge21heDogMTAwLCBzdGVwOiAxfSxcbiAge21heDogNTAwLCBzdGVwOiA1fSxcbiAge21heDogMTAwMCwgc3RlcDogMTB9LFxuICB7bWF4OiA1MDAwLCBzdGVwOiA1MH0sXG4gIHttYXg6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgc3RlcDogMTAwMH1cbl07XG5cbmV4cG9ydCBjb25zdCBoaXN0b2dyYW1CaW5zID0gMzA7XG5leHBvcnQgY29uc3QgZW5sYXJnZWRIaXN0b2dyYW1CaW5zID0gMTAwO1xuXG5jb25zdCBkdXJhdGlvblNlY29uZCA9IDEwMDA7XG5jb25zdCBkdXJhdGlvbk1pbnV0ZSA9IGR1cmF0aW9uU2Vjb25kICogNjA7XG5jb25zdCBkdXJhdGlvbkhvdXIgPSBkdXJhdGlvbk1pbnV0ZSAqIDYwO1xuY29uc3QgZHVyYXRpb25EYXkgPSBkdXJhdGlvbkhvdXIgKiAyNDtcbmNvbnN0IGR1cmF0aW9uV2VlayA9IGR1cmF0aW9uRGF5ICogNztcbmNvbnN0IGR1cmF0aW9uWWVhciA9IGR1cmF0aW9uRGF5ICogMzY1O1xuXG5leHBvcnQgY29uc3QgUExPVF9UWVBFUyA9IGtleU1pcnJvcih7XG4gIGhpc3RvZ3JhbTogbnVsbCxcbiAgbGluZUNoYXJ0OiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9VUERBVEVSX1BST1BTID0ga2V5TWlycm9yKHtcbiAgZGF0YUlkOiBudWxsLFxuICBuYW1lOiBudWxsLFxuICBsYXllcklkOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IExJTUlURURfRklMVEVSX0VGRkVDVF9QUk9QUyA9IGtleU1pcnJvcih7XG4gIFtGSUxURVJfVVBEQVRFUl9QUk9QUy5uYW1lXTogbnVsbFxufSk7XG4vKipcbiAqIE1heCBudW1iZXIgb2YgZmlsdGVyIHZhbHVlIGJ1ZmZlcnMgdGhhdCBkZWNrLmdsIHByb3ZpZGVzXG4gKi9cblxuY29uc3QgU3VwcG9ydGVkUGxvdFR5cGUgPSB7XG4gIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXToge1xuICAgIGRlZmF1bHQ6ICdoaXN0b2dyYW0nLFxuICAgIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06ICdsaW5lQ2hhcnQnLFxuICAgIFtBTExfRklFTERfVFlQRVMucmVhbF06ICdsaW5lQ2hhcnQnXG4gIH0sXG4gIFtGSUxURVJfVFlQRVMucmFuZ2VdOiB7XG4gICAgZGVmYXVsdDogJ2hpc3RvZ3JhbScsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXTogJ2xpbmVDaGFydCcsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXTogJ2xpbmVDaGFydCdcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QT05FTlRTID0ge1xuICBbRklMVEVSX1RZUEVTLnNlbGVjdF06ICdTaW5nbGVTZWxlY3RGaWx0ZXInLFxuICBbRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0XTogJ011bHRpU2VsZWN0RmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy50aW1lUmFuZ2VdOiAnVGltZVJhbmdlRmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5yYW5nZV06ICdSYW5nZUZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMucG9seWdvbl06ICdQb2x5Z29uRmlsdGVyJ1xufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRklMVEVSX1NUUlVDVFVSRSA9IHtcbiAgZGF0YUlkOiBbXSwgLy8gW3N0cmluZ11cbiAgZnJlZXplOiBmYWxzZSxcbiAgaWQ6IG51bGwsXG5cbiAgLy8gdGltZSByYW5nZSBmaWx0ZXIgc3BlY2lmaWNcbiAgZml4ZWREb21haW46IGZhbHNlLFxuICBlbmxhcmdlZDogZmFsc2UsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgYW5pbWF0aW9uV2luZG93OiBBTklNQVRJT05fV0lORE9XLmZyZWUsXG4gIHNwZWVkOiAxLFxuXG4gIC8vIGZpZWxkIHNwZWNpZmljXG4gIG5hbWU6IFtdLCAvLyBzdHJpbmdcbiAgdHlwZTogbnVsbCxcbiAgZmllbGRJZHg6IFtdLCAvLyBbaW50ZWdlcl1cbiAgZG9tYWluOiBudWxsLFxuICB2YWx1ZTogbnVsbCxcblxuICAvLyBwbG90XG4gIHBsb3RUeXBlOiBQTE9UX1RZUEVTLmhpc3RvZ3JhbSxcbiAgeUF4aXM6IG51bGwsXG4gIGludGVydmFsOiBudWxsLFxuXG4gIC8vIG1vZGVcbiAgZ3B1OiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9JRF9MRU5HVEggPSA0O1xuXG5leHBvcnQgY29uc3QgTEFZRVJfRklMVEVSUyA9IFtGSUxURVJfVFlQRVMucG9seWdvbl07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZmlsdGVyIHdpdGggYSBkYXRhc2V0IGlkIGFzIGRhdGFJZFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0RGVmYXVsdEZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGaWx0ZXIoZGF0YUlkKSB7XG4gIHJldHVybiB7XG4gICAgLi4uREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFLFxuICAgIC8vIHN0b3JlIGl0IGFzIGRhdGFJZCBhbmQgaXQgY291bGQgYmUgb25lIG9yIG1hbnlcbiAgICBkYXRhSWQ6IHRvQXJyYXkoZGF0YUlkKSxcbiAgICBpZDogZ2VuZXJhdGVIYXNoSWQoRklMVEVSX0lEX0xFTkdUSClcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIGZpbHRlciBpcyB2YWxpZCBiYXNlZCBvbiB0aGUgZ2l2ZW4gZGF0YUlkXG4gKiBAcGFyYW0gIGZpbHRlciB0byB2YWxpZGF0ZVxuICogQHBhcmFtICBkYXRhc2V0SWQgaWQgdG8gdmFsaWRhdGUgZmlsdGVyIGFnYWluc3RcbiAqIEByZXR1cm4gdHJ1ZSBpZiBhIGZpbHRlciBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5zaG91bGRBcHBseUZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZEFwcGx5RmlsdGVyKGZpbHRlciwgZGF0YXNldElkKSB7XG4gIGNvbnN0IGRhdGFJZHMgPSB0b0FycmF5KGZpbHRlci5kYXRhSWQpO1xuICByZXR1cm4gZGF0YUlkcy5pbmNsdWRlcyhkYXRhc2V0SWQpICYmIGZpbHRlci52YWx1ZSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgYW5kIG1vZGlmaWVzIHBvbHlnb24gZmlsdGVyIHN0cnVjdHVyZVxuICogQHBhcmFtIGRhdGFzZXRcbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEBwYXJhbSBsYXllcnNcbiAqIEByZXR1cm4gLSB7ZmlsdGVyLCBkYXRhc2V0fVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykudmFsaWRhdGVQb2x5Z29uRmlsdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb2x5Z29uRmlsdGVyKGRhdGFzZXQsIGZpbHRlciwgbGF5ZXJzKSB7XG4gIGNvbnN0IGZhaWxlZCA9IHtkYXRhc2V0LCBmaWx0ZXI6IG51bGx9O1xuICBjb25zdCB7dmFsdWUsIGxheWVySWQsIHR5cGUsIGRhdGFJZH0gPSBmaWx0ZXI7XG5cbiAgaWYgKCFsYXllcklkIHx8ICFpc1ZhbGlkRmlsdGVyVmFsdWUodHlwZSwgdmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWREYXRhc2V0ID0gZGF0YUlkLmluY2x1ZGVzKGRhdGFzZXQuaWQpO1xuXG4gIGlmICghaXNWYWxpZERhdGFzZXQpIHtcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgY29uc3QgbGF5ZXIgPSBsYXllcnMuZmluZChsID0+IGxheWVySWQuaW5jbHVkZXMobC5pZCkpO1xuXG4gIGlmICghbGF5ZXIpIHtcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHtcbiAgICAgIC4uLmZpbHRlcixcbiAgICAgIGZyZWV6ZTogdHJ1ZSxcbiAgICAgIGZpZWxkSWR4OiBbXVxuICAgIH0sXG4gICAgZGF0YXNldFxuICB9O1xufVxuXG4vKipcbiAqIEN1c3RvbSBmaWx0ZXIgdmFsaWRhdG9yc1xuICovXG5jb25zdCBmaWx0ZXJWYWxpZGF0b3JzID0ge1xuICBbRklMVEVSX1RZUEVTLnBvbHlnb25dOiB2YWxpZGF0ZVBvbHlnb25GaWx0ZXJcbn07XG5cbi8qKlxuICogRGVmYXVsdCB2YWxpZGF0ZSBmaWx0ZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyXG4gKiBAcmV0dXJuIC0ge2ZpbHRlciwgZGF0YXNldH1cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLnZhbGlkYXRlRmlsdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWx0ZXIoZGF0YXNldCwgZmlsdGVyKSB7XG4gIC8vIG1hdGNoIGZpbHRlci5kYXRhSWRcbiAgY29uc3QgZmFpbGVkID0ge2RhdGFzZXQsIGZpbHRlcjogbnVsbH07XG4gIGNvbnN0IGZpbHRlckRhdGFJZCA9IHRvQXJyYXkoZmlsdGVyLmRhdGFJZCk7XG5cbiAgY29uc3QgZmlsdGVyRGF0YXNldEluZGV4ID0gZmlsdGVyRGF0YUlkLmluZGV4T2YoZGF0YXNldC5pZCk7XG4gIGlmIChmaWx0ZXJEYXRhc2V0SW5kZXggPCAwKSB7XG4gICAgLy8gdGhlIGN1cnJlbnQgZmlsdGVyIGlzIG5vdCBtYXBwZWQgYWdhaW5zdCB0aGUgY3VycmVudCBkYXRhc2V0XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIGNvbnN0IGluaXRpYWxpemVGaWx0ZXIgPSB7XG4gICAgLi4uZ2V0RGVmYXVsdEZpbHRlcihmaWx0ZXIuZGF0YUlkKSxcbiAgICAuLi5maWx0ZXIsXG4gICAgZGF0YUlkOiBmaWx0ZXJEYXRhSWQsXG4gICAgbmFtZTogdG9BcnJheShmaWx0ZXIubmFtZSlcbiAgfTtcblxuICBjb25zdCBmaWVsZE5hbWUgPSBpbml0aWFsaXplRmlsdGVyLm5hbWVbZmlsdGVyRGF0YXNldEluZGV4XTtcbiAgY29uc3Qge2ZpbHRlcjogdXBkYXRlZEZpbHRlciwgZGF0YXNldDogdXBkYXRlZERhdGFzZXR9ID0gYXBwbHlGaWx0ZXJGaWVsZE5hbWUoXG4gICAgaW5pdGlhbGl6ZUZpbHRlcixcbiAgICBkYXRhc2V0LFxuICAgIGZpZWxkTmFtZSxcbiAgICBmaWx0ZXJEYXRhc2V0SW5kZXgsXG4gICAge21lcmdlRG9tYWluOiB0cnVlfVxuICApO1xuXG4gIGlmICghdXBkYXRlZEZpbHRlcikge1xuICAgIHJldHVybiBmYWlsZWQ7XG4gIH1cblxuICB1cGRhdGVkRmlsdGVyLnZhbHVlID0gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbihmaWx0ZXIudmFsdWUsIHVwZGF0ZWRGaWx0ZXIpO1xuICB1cGRhdGVkRmlsdGVyLmVubGFyZ2VkID1cbiAgICB0eXBlb2YgZmlsdGVyLmVubGFyZ2VkID09PSAnYm9vbGVhbicgPyBmaWx0ZXIuZW5sYXJnZWQgOiB1cGRhdGVkRmlsdGVyLmVubGFyZ2VkO1xuXG4gIGlmICh1cGRhdGVkRmlsdGVyLnZhbHVlID09PSBudWxsKSB7XG4gICAgLy8gY2Fubm90IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHZhbGlkYXRlRmlsdGVyWUF4aXModXBkYXRlZEZpbHRlciwgdXBkYXRlZERhdGFzZXQpLFxuICAgIGRhdGFzZXQ6IHVwZGF0ZWREYXRhc2V0XG4gIH07XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgZmlsdGVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogY2FsY3VsYXRlIGRvbWFpbiBhbmQgZmllbGRJZHggYmFzZWQgbmV3IGZpZWxkcyBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcGFyYW0gbGF5ZXJzIC0gbGF5ZXJzXG4gKiBAcmV0dXJuIHZhbGlkYXRlZCBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLnZhbGlkYXRlRmlsdGVyV2l0aERhdGF9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhKGRhdGFzZXQsIGZpbHRlciwgbGF5ZXJzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIGZpbHRlclZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkoZmlsdGVyLnR5cGUpXG4gICAgPyBmaWx0ZXJWYWxpZGF0b3JzW2ZpbHRlci50eXBlXShkYXRhc2V0LCBmaWx0ZXIsIGxheWVycylcbiAgICA6IHZhbGlkYXRlRmlsdGVyKGRhdGFzZXQsIGZpbHRlcik7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgWUF4aXNcbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcllBeGlzKGZpbHRlciwgZGF0YXNldCkge1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG5cbiAgY29uc3Qge2ZpZWxkc30gPSBkYXRhc2V0O1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZWRBeGlzID0gZmllbGRzLmZpbmQoKHtuYW1lLCB0eXBlfSkgPT4gbmFtZSA9PT0geUF4aXMubmFtZSAmJiB0eXBlID09PSB5QXhpcy50eXBlKTtcblxuICAgIGZpbHRlciA9IG1hdGNoZWRBeGlzXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5maWx0ZXIsXG4gICAgICAgICAgeUF4aXM6IG1hdGNoZWRBeGlzLFxuICAgICAgICAgIC4uLmdldEZpbHRlclBsb3Qoey4uLmZpbHRlciwgeUF4aXM6IG1hdGNoZWRBeGlzfSwgZGF0YXNldClcbiAgICAgICAgfVxuICAgICAgOiBmaWx0ZXI7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyO1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IGZpbHRlciBwcm9wIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0gZmllbGRcbiAqIEBwYXJhbSBmaWVsZERvbWFpblxuICogQHJldHVybnMgZGVmYXVsdCBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpbHRlclByb3BzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUHJvcHMoZmllbGQsIGZpZWxkRG9tYWluKSB7XG4gIGNvbnN0IGZpbHRlclByb3BzID0ge1xuICAgIC4uLmZpZWxkRG9tYWluLFxuICAgIGZpZWxkVHlwZTogZmllbGQudHlwZVxuICB9O1xuXG4gIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB2YWx1ZTogZmllbGREb21haW4uZG9tYWluLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMucmFuZ2UsXG4gICAgICAgIHR5cGVPcHRpb25zOiBbRklMVEVSX1RZUEVTLnJhbmdlXSxcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMuc2VsZWN0LFxuICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgZ3B1OiBmYWxzZVxuICAgICAgfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdCxcbiAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICBncHU6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UsXG4gICAgICAgIGVubGFyZ2VkOiB0cnVlLFxuICAgICAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZpbHRlclByb3BzLmRvbWFpbixcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0UG9seWdvbkZpbHRlckZ1bmN0b3IgPSAobGF5ZXIsIGZpbHRlciwgZGF0YUNvbnRhaW5lcikgPT4ge1xuICBjb25zdCBnZXRQb3NpdGlvbiA9IGxheWVyLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG5cbiAgc3dpdGNoIChsYXllci50eXBlKSB7XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5wb2ludDpcbiAgICBjYXNlIExBWUVSX1RZUEVTLmljb246XG4gICAgICByZXR1cm4gZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKGRhdGEpO1xuICAgICAgICByZXR1cm4gcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkgJiYgaXNJblBvbHlnb24ocG9zLCBmaWx0ZXIudmFsdWUpO1xuICAgICAgfTtcbiAgICBjYXNlIExBWUVSX1RZUEVTLmFyYzpcbiAgICBjYXNlIExBWUVSX1RZUEVTLmxpbmU6XG4gICAgICByZXR1cm4gZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKGRhdGEpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpICYmXG4gICAgICAgICAgW1xuICAgICAgICAgICAgW3Bvc1swXSwgcG9zWzFdXSxcbiAgICAgICAgICAgIFtwb3NbM10sIHBvc1s0XV1cbiAgICAgICAgICBdLmV2ZXJ5KHBvaW50ID0+IGlzSW5Qb2x5Z29uKHBvaW50LCBmaWx0ZXIudmFsdWUpKVxuICAgICAgICApO1xuICAgICAgfTtcbiAgICBjYXNlIExBWUVSX1RZUEVTLmhleGFnb25JZDpcbiAgICAgIGlmIChsYXllci5kYXRhVG9GZWF0dXJlICYmIGxheWVyLmRhdGFUb0ZlYXR1cmUuY2VudHJvaWRzKSB7XG4gICAgICAgIHJldHVybiBkYXRhID0+IHtcbiAgICAgICAgICAvLyBudWxsIG9yIGdldENlbnRyb2lkKHtpZH0pXG4gICAgICAgICAgY29uc3QgY2VudHJvaWQgPSBsYXllci5kYXRhVG9GZWF0dXJlLmNlbnRyb2lkc1tkYXRhLmluZGV4XTtcbiAgICAgICAgICByZXR1cm4gY2VudHJvaWQgJiYgaXNJblBvbHlnb24oY2VudHJvaWQsIGZpbHRlci52YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZ2V0UG9zaXRpb24oZGF0YSk7XG4gICAgICAgIGlmICghaDNJc1ZhbGlkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwb3MgPSBnZXRDZW50cm9pZCh7aWR9KTtcbiAgICAgICAgcmV0dXJuIHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpICYmIGlzSW5Qb2x5Z29uKHBvcywgZmlsdGVyLnZhbHVlKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSBmaWVsZCBkYXRhc2V0IEZpZWxkXG4gKiBAcGFyYW0gZGF0YUlkIERhdGFzZXQgaWRcbiAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIG9iamVjdFxuICogQHBhcmFtIGxheWVycyBsaXN0IG9mIGxheWVycyB0byBmaWx0ZXIgdXBvblxuICogQHBhcmFtIGRhdGFDb250YWluZXIgRGF0YSBjb250YWluZXJcbiAqIEByZXR1cm4gZmlsdGVyRnVuY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpbHRlckZ1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyRnVuY3Rpb24oZmllbGQsIGRhdGFJZCwgZmlsdGVyLCBsYXllcnMsIGRhdGFDb250YWluZXIpIHtcbiAgLy8gZmllbGQgY291bGQgYmUgbnVsbCBpbiBwb2x5Z29uIGZpbHRlclxuICBjb25zdCB2YWx1ZUFjY2Vzc29yID0gZmllbGQgPyBmaWVsZC52YWx1ZUFjY2Vzc29yIDogZGF0YSA9PiBudWxsO1xuICBjb25zdCBkZWZhdWx0RnVuYyA9IGQgPT4gdHJ1ZTtcblxuICBzd2l0Y2ggKGZpbHRlci50eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgICByZXR1cm4gZGF0YSA9PiBpc0luUmFuZ2UodmFsdWVBY2Nlc3NvcihkYXRhKSwgZmlsdGVyLnZhbHVlKTtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdDpcbiAgICAgIHJldHVybiBkYXRhID0+IGZpbHRlci52YWx1ZS5pbmNsdWRlcyh2YWx1ZUFjY2Vzc29yKGRhdGEpKTtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5zZWxlY3Q6XG4gICAgICByZXR1cm4gZGF0YSA9PiB2YWx1ZUFjY2Vzc29yKGRhdGEpID09PSBmaWx0ZXIudmFsdWU7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgaWYgKCFmaWVsZCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdEZ1bmM7XG4gICAgICB9XG4gICAgICBjb25zdCBtYXBwZWRWYWx1ZSA9IGdldChmaWVsZCwgWydmaWx0ZXJQcm9wcycsICdtYXBwZWRWYWx1ZSddKTtcbiAgICAgIGNvbnN0IGFjY2Vzc29yID0gQXJyYXkuaXNBcnJheShtYXBwZWRWYWx1ZSlcbiAgICAgICAgPyBkYXRhID0+IG1hcHBlZFZhbHVlW2RhdGEuaW5kZXhdXG4gICAgICAgIDogZGF0YSA9PiB0aW1lVG9Vbml4TWlsbGkodmFsdWVBY2Nlc3NvcihkYXRhKSwgZmllbGQuZm9ybWF0KTtcbiAgICAgIHJldHVybiBkYXRhID0+IGlzSW5SYW5nZShhY2Nlc3NvcihkYXRhKSwgZmlsdGVyLnZhbHVlKTtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5wb2x5Z29uOlxuICAgICAgaWYgKCFsYXllcnMgfHwgIWxheWVycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRGdW5jO1xuICAgICAgfVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgbGF5ZXJGaWx0ZXJGdW5jdGlvbnMgPSBmaWx0ZXIubGF5ZXJJZFxuICAgICAgICAubWFwKGlkID0+IGxheWVycy5maW5kKGwgPT4gbC5pZCA9PT0gaWQpKVxuICAgICAgICAuZmlsdGVyKGwgPT4gbCAmJiBsLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFJZClcbiAgICAgICAgLm1hcChsYXllciA9PiBnZXRQb2x5Z29uRmlsdGVyRnVuY3RvcihsYXllciwgZmlsdGVyLCBkYXRhQ29udGFpbmVyKSk7XG5cbiAgICAgIHJldHVybiBkYXRhID0+IGxheWVyRmlsdGVyRnVuY3Rpb25zLmV2ZXJ5KGZpbHRlckZ1bmMgPT4gZmlsdGVyRnVuYyhkYXRhKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBkZWZhdWx0RnVuYztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsdGVyRGF0YUlkKGRhdGFJZCkge1xuICByZXR1cm4gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpO1xufVxuXG4vKipcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmZpbHRlckRhdGFCeUZpbHRlclR5cGVzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRGF0YUJ5RmlsdGVyVHlwZXMoXG4gIHtkeW5hbWljRG9tYWluRmlsdGVycywgY3B1RmlsdGVycywgZmlsdGVyRnVuY3N9LFxuICBkYXRhQ29udGFpbmVyXG4pIHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIC4uLihkeW5hbWljRG9tYWluRmlsdGVycyA/IHtmaWx0ZXJlZEluZGV4Rm9yRG9tYWluOiBbXX0gOiB7fSksXG4gICAgLi4uKGNwdUZpbHRlcnMgPyB7ZmlsdGVyZWRJbmRleDogW119IDoge30pXG4gIH07XG5cbiAgY29uc3QgZmlsdGVyQ29udGV4dCA9IHtpbmRleDogLTEsIGRhdGFDb250YWluZXJ9O1xuICBjb25zdCBmaWx0ZXJGdW5jQ2FsbGVyID0gZmlsdGVyID0+IGZpbHRlckZ1bmNzW2ZpbHRlci5pZF0oZmlsdGVyQ29udGV4dCk7XG5cbiAgY29uc3QgbnVtUm93cyA9IGRhdGFDb250YWluZXIubnVtUm93cygpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvd3M7ICsraSkge1xuICAgIGZpbHRlckNvbnRleHQuaW5kZXggPSBpO1xuXG4gICAgY29uc3QgbWF0Y2hGb3JEb21haW4gPSBkeW5hbWljRG9tYWluRmlsdGVycyAmJiBkeW5hbWljRG9tYWluRmlsdGVycy5ldmVyeShmaWx0ZXJGdW5jQ2FsbGVyKTtcbiAgICBpZiAobWF0Y2hGb3JEb21haW4pIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJlc3VsdC5maWx0ZXJlZEluZGV4Rm9yRG9tYWluLnB1c2goZmlsdGVyQ29udGV4dC5pbmRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hGb3JSZW5kZXIgPSBjcHVGaWx0ZXJzICYmIGNwdUZpbHRlcnMuZXZlcnkoZmlsdGVyRnVuY0NhbGxlcik7XG4gICAgaWYgKG1hdGNoRm9yUmVuZGVyKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXN1bHQuZmlsdGVyZWRJbmRleC5wdXNoKGZpbHRlckNvbnRleHQuaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0IGEgcmVjb3JkIG9mIGZpbHRlcnMgYmFzZWQgb24gZG9tYWluIHR5cGUgYW5kIGdwdSAvIGNwdVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0RmlsdGVyUmVjb3JkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUmVjb3JkKGRhdGFJZCwgZmlsdGVycywgb3B0ID0ge30pIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtGaWx0ZXJSZWNvcmR9XG4gICAqL1xuICBjb25zdCBmaWx0ZXJSZWNvcmQgPSB7XG4gICAgZHluYW1pY0RvbWFpbjogW10sXG4gICAgZml4ZWREb21haW46IFtdLFxuICAgIGNwdTogW10sXG4gICAgZ3B1OiBbXVxuICB9O1xuXG4gIGZpbHRlcnMuZm9yRWFjaChmID0+IHtcbiAgICBpZiAoaXNWYWxpZEZpbHRlclZhbHVlKGYudHlwZSwgZi52YWx1ZSkgJiYgdG9BcnJheShmLmRhdGFJZCkuaW5jbHVkZXMoZGF0YUlkKSkge1xuICAgICAgKGYuZml4ZWREb21haW4gfHwgb3B0Lmlnbm9yZURvbWFpblxuICAgICAgICA/IGZpbHRlclJlY29yZC5maXhlZERvbWFpblxuICAgICAgICA6IGZpbHRlclJlY29yZC5keW5hbWljRG9tYWluXG4gICAgICApLnB1c2goZik7XG5cbiAgICAgIChmLmdwdSAmJiAhb3B0LmNwdU9ubHkgPyBmaWx0ZXJSZWNvcmQuZ3B1IDogZmlsdGVyUmVjb3JkLmNwdSkucHVzaChmKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmaWx0ZXJSZWNvcmQ7XG59XG5cbi8qKlxuICogQ29tcGFyZSBmaWx0ZXIgcmVjb3JkcyB0byBnZXQgd2hhdCBoYXMgY2hhbmdlZFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZGlmZkZpbHRlcnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmRmlsdGVycyhmaWx0ZXJSZWNvcmQsIG9sZEZpbHRlclJlY29yZCA9IHt9KSB7XG4gIGxldCBmaWx0ZXJDaGFuZ2VkID0ge307XG5cbiAgT2JqZWN0LmVudHJpZXMoZmlsdGVyUmVjb3JkKS5mb3JFYWNoKChbcmVjb3JkLCBpdGVtc10pID0+IHtcbiAgICBpdGVtcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICBjb25zdCBvbGRGaWx0ZXIgPSAob2xkRmlsdGVyUmVjb3JkW3JlY29yZF0gfHwgW10pLmZpbmQoZiA9PiBmLmlkID09PSBmaWx0ZXIuaWQpO1xuXG4gICAgICBpZiAoIW9sZEZpbHRlcikge1xuICAgICAgICAvLyBhZGRlZFxuICAgICAgICBmaWx0ZXJDaGFuZ2VkID0gc2V0KFtyZWNvcmQsIGZpbHRlci5pZF0sICdhZGRlZCcsIGZpbHRlckNoYW5nZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgIHdoYXQgaGFzIGNoYW5nZWRcbiAgICAgICAgWyduYW1lJywgJ3ZhbHVlJywgJ2RhdGFJZCddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlcltwcm9wXSAhPT0gb2xkRmlsdGVyW3Byb3BdKSB7XG4gICAgICAgICAgICBmaWx0ZXJDaGFuZ2VkID0gc2V0KFtyZWNvcmQsIGZpbHRlci5pZF0sIGAke3Byb3B9X2NoYW5nZWRgLCBmaWx0ZXJDaGFuZ2VkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgKG9sZEZpbHRlclJlY29yZFtyZWNvcmRdIHx8IFtdKS5mb3JFYWNoKG9sZEZpbHRlciA9PiB7XG4gICAgICAvLyBkZWxldGVkXG4gICAgICBpZiAoIWl0ZW1zLmZpbmQoZiA9PiBmLmlkID09PSBvbGRGaWx0ZXIuaWQpKSB7XG4gICAgICAgIGZpbHRlckNoYW5nZWQgPSBzZXQoW3JlY29yZCwgb2xkRmlsdGVyLmlkXSwgJ2RlbGV0ZWQnLCBmaWx0ZXJDaGFuZ2VkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghZmlsdGVyQ2hhbmdlZFtyZWNvcmRdKSB7XG4gICAgICBmaWx0ZXJDaGFuZ2VkW3JlY29yZF0gPSBudWxsO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gZmlsdGVyQ2hhbmdlZDtcbn1cbi8qKlxuICogQ2FsbCBieSBwYXJzaW5nIGZpbHRlcnMgZnJvbSBVUkxcbiAqIENoZWNrIGlmIHZhbHVlIG9mIGZpbHRlciB3aXRoaW4gZmlsdGVyIGRvbWFpbiwgaWYgbm90IGFkanVzdCBpdCB0byBtYXRjaFxuICogZmlsdGVyIGRvbWFpblxuICpcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmFkanVzdFZhbHVlVG9GaWx0ZXJEb21haW59XG4gKiBAcmV0dXJucyB2YWx1ZSAtIGFkanVzdGVkIHZhbHVlIHRvIG1hdGNoIGZpbHRlciBvciBudWxsIHRvIHJlbW92ZSBmaWx0ZXJcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdFZhbHVlVG9GaWx0ZXJEb21haW4odmFsdWUsIHtkb21haW4sIHR5cGV9KSB7XG4gIGlmICghZG9tYWluIHx8ICF0eXBlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGRvbWFpbi5tYXAoZCA9PiBkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlLm1hcCgoZCwgaSkgPT4gKG5vdE51bGxvclVuZGVmaW5lZChkKSAmJiBpc0luUmFuZ2UoZCwgZG9tYWluKSA/IGQgOiBkb21haW5baV0pKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUuZmlsdGVyKGQgPT4gZG9tYWluLmluY2x1ZGVzKGQpKTtcbiAgICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlLmxlbmd0aCA/IGZpbHRlcmVkVmFsdWUgOiBbXTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBkb21haW4uaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBDYWxjdWxhdGUgbnVtZXJpYyBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXROdW1lcmljRmllbGREb21haW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1lcmljRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcikge1xuICBsZXQgZG9tYWluID0gWzAsIDFdO1xuICBsZXQgc3RlcCA9IDAuMTtcblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IGRhdGFDb250YWluZXIubWFwSW5kZXgodmFsdWVBY2Nlc3Nvcik7XG5cbiAgaWYgKGRhdGFDb250YWluZXIubnVtUm93cygpID4gMSkge1xuICAgIGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0TGluZWFyRG9tYWluKG1hcHBlZFZhbHVlKTtcbiAgICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuXG4gICAgLy8gaW4gY2FzZSBlcXVhbCBkb21haW4sIFs5NiwgOTZdLCB3aGljaCB3aWxsIGJyZWFrIHF1YW50aXplIHNjYWxlXG4gICAgaWYgKCFkaWZmKSB7XG4gICAgICBkb21haW5bMV0gPSBkb21haW5bMF0gKyAxO1xuICAgIH1cblxuICAgIHN0ZXAgPSBnZXROdW1lcmljU3RlcFNpemUoZGlmZikgfHwgc3RlcDtcbiAgICBkb21haW5bMF0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzBdLCBzdGVwLCAnZmxvb3InKTtcbiAgICBkb21haW5bMV0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzFdLCBzdGVwLCAnY2VpbCcpO1xuICB9XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIGhpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBzdGVwIHNpemUgZm9yIHJhbmdlIGFuZCB0aW1lcmFuZ2UgZmlsdGVyXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0TnVtZXJpY1N0ZXBTaXplfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHtcbiAgZGlmZiA9IE1hdGguYWJzKGRpZmYpO1xuXG4gIGlmIChkaWZmID4gMTAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDMpIHtcbiAgICByZXR1cm4gMC4wMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMSkge1xuICAgIHJldHVybiAwLjAwMTtcbiAgfVxuICAvLyBUcnkgdG8gZ2V0IGF0IGxlYXN0IDEwMDAgc3RlcHMgLSBhbmQga2VlcCB0aGUgc3RlcCBzaXplIGJlbG93IHRoYXQgb2ZcbiAgLy8gdGhlIChkaWZmID4gMSkgY2FzZS5cbiAgY29uc3QgeCA9IGRpZmYgLyAxMDAwO1xuICAvLyBGaW5kIHRoZSBleHBvbmVudCBhbmQgdHJ1bmNhdGUgdG8gMTAgdG8gdGhlIHBvd2VyIG9mIHRoYXQgZXhwb25lbnRcblxuICBjb25zdCBleHBvbmVudGlhbEZvcm0gPSB4LnRvRXhwb25lbnRpYWwoKTtcbiAgY29uc3QgZXhwb25lbnQgPSBwYXJzZUZsb2F0KGV4cG9uZW50aWFsRm9ybS5zcGxpdCgnZScpWzFdKTtcblxuICAvLyBHZXR0aW5nIHJlYWR5IGZvciBub2RlIDEyXG4gIC8vIHRoaXMgaXMgd2h5IHdlIG5lZWQgZGVjaW1hbC5qc1xuICAvLyBNYXRoLnBvdygxMCwgLTUpID0gMC4wMDAwMDk5OTk5OTk5OTk5OTk5OTlcbiAgLy8gdGhlIGFib3ZlIHJlc3VsdCBzaG93cyBpbiBicm93c2VyIGFuZCBub2RlIDEwXG4gIC8vIG5vZGUgMTIgYmVoYXZlcyBjb3JyZWN0bHlcbiAgcmV0dXJuIG5ldyBEZWNpbWFsKDEwKS5wb3coZXhwb25lbnQpLnRvTnVtYmVyKCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRpbWVzdGFtcCBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldFRpbWVzdGFtcEZpZWxkRG9tYWlufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXN0YW1wRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcikge1xuICAvLyB0byBhdm9pZCBjb252ZXJ0aW5nIHN0cmluZyBmb3JtYXQgdGltZSB0byBlcG9jaFxuICAvLyBldmVyeSB0aW1lIHdlIGNvbXBhcmUgd2Ugc3RvcmUgYSB2YWx1ZSBtYXBwZWQgdG8gaW50IGluIGZpbHRlciBkb21haW5cblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IGRhdGFDb250YWluZXIubWFwSW5kZXgodmFsdWVBY2Nlc3Nvcik7XG4gIGNvbnN0IGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0TGluZWFyRG9tYWluKG1hcHBlZFZhbHVlKTtcbiAgY29uc3QgZGVmYXVsdFRpbWVGb3JtYXQgPSBnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIoZG9tYWluKTtcblxuICBsZXQgc3RlcCA9IDAuMDE7XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgY29uc3QgZW50cnkgPSBUaW1lc3RhbXBTdGVwTWFwLmZpbmQoZiA9PiBmLm1heCA+PSBkaWZmKTtcbiAgaWYgKGVudHJ5KSB7XG4gICAgc3RlcCA9IGVudHJ5LnN0ZXA7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb21haW4sXG4gICAgc3RlcCxcbiAgICBtYXBwZWRWYWx1ZSxcbiAgICBoaXN0b2dyYW0sXG4gICAgZW5sYXJnZWRIaXN0b2dyYW0sXG4gICAgZGVmYXVsdFRpbWVGb3JtYXRcbiAgfTtcbn1cblxuLyoqXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuaGlzdG9ncmFtQ29uc3RydWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGJpbnMpIHtcbiAgcmV0dXJuIGQzSGlzdG9ncmFtKClcbiAgICAudGhyZXNob2xkcyh0aWNrcyhkb21haW5bMF0sIGRvbWFpblsxXSwgYmlucykpXG4gICAgLmRvbWFpbihkb21haW4pKG1hcHBlZFZhbHVlKVxuICAgIC5tYXAoYmluID0+ICh7XG4gICAgICBjb3VudDogYmluLmxlbmd0aCxcbiAgICAgIHgwOiBiaW4ueDAsXG4gICAgICB4MTogYmluLngxXG4gICAgfSkpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgaGlzdG9ncmFtIGZyb20gZG9tYWluIGFuZCBhcnJheSBvZiB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXRIaXN0b2dyYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSkge1xuICBjb25zdCBoaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgaGlzdG9ncmFtQmlucyk7XG4gIGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtID0gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGVubGFyZ2VkSGlzdG9ncmFtQmlucyk7XG5cbiAgcmV0dXJuIHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuLyoqXG4gKiByb3VuZCBudW1iZXIgYmFzZWQgb24gc3RlcFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXJCeVN0ZXAodmFsLCBzdGVwLCBib3VuZCkge1xuICBpZiAoYm91bmQgPT09ICdmbG9vcicpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiAoMSAvIHN0ZXApKSAvICgxIC8gc3RlcCk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5jZWlsKHZhbCAqICgxIC8gc3RlcCkpIC8gKDEgLyBzdGVwKTtcbn1cblxuLyoqXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuaXNJblJhbmdlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHZhbCwgZG9tYWluKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHZhbCA+PSBkb21haW5bMF0gJiYgdmFsIDw9IGRvbWFpblsxXTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBwb2ludCBpcyB3aXRoaW4gdGhlIHByb3ZpZGVkIHBvbHlnb25cbiAqXG4gKiBAcGFyYW0gcG9pbnQgYXMgaW5wdXQgc2VhcmNoIFtsYXQsIGxuZ11cbiAqIEBwYXJhbSBwb2x5Z29uIFBvaW50cyBtdXN0IGJlIHdpdGhpbiB0aGVzZSAoTXVsdGkpUG9seWdvbihzKVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5Qb2x5Z29uKHBvaW50LCBwb2x5Z29uKSB7XG4gIHJldHVybiBib29sZWFuV2l0aGluKHR1cmZQb2ludChwb2ludCksIHBvbHlnb24pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRUaW1lRG9tYWluKGRvbWFpbikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShkb21haW4pICYmIGRvbWFpbi5ldmVyeShOdW1iZXIuaXNGaW5pdGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFpc1ZhbGlkVGltZURvbWFpbihkb21haW4pKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuXG4gIC8vIExvY2FsIGF3YXJlIGZvcm1hdHNcbiAgLy8gaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL3BhcnNpbmcvc3RyaW5nLWZvcm1hdFxuICByZXR1cm4gZGlmZiA+IGR1cmF0aW9uWWVhciA/ICdMJyA6IGRpZmYgPiBkdXJhdGlvbkRheSA/ICdMIExUJyA6ICdMIExUUyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFpc1ZhbGlkVGltZURvbWFpbihkb21haW4pKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuICByZXR1cm4gZGlmZiA+IGR1cmF0aW9uV2Vla1xuICAgID8gJ0wnXG4gICAgOiBkaWZmID4gZHVyYXRpb25EYXlcbiAgICA/ICdMIExUJ1xuICAgIDogZGlmZiA+IGR1cmF0aW9uSG91clxuICAgID8gJ0xUJ1xuICAgIDogJ0xUUyc7XG59XG5cbi8qKlxuICogU2FuaXR5IGNoZWNrIG9uIGZpbHRlcnMgdG8gcHJlcGFyZSBmb3Igc2F2ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuaXNWYWxpZEZpbHRlclZhbHVlfVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEZpbHRlclZhbHVlKHR5cGUsIHZhbHVlKSB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5zZWxlY3Q6XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdiAhPT0gbnVsbCAmJiAhaXNOYU4odikpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3Q6XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgQm9vbGVhbih2YWx1ZS5sZW5ndGgpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMuaW5wdXQ6XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZS5sZW5ndGgpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMucG9seWdvbjpcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0KHZhbHVlLCBbJ2dlb21ldHJ5JywgJ2Nvb3JkaW5hdGVzJ10pO1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUgJiYgdmFsdWUuaWQgJiYgY29vcmRpbmF0ZXMpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICpcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpbHRlclBsb3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJQbG90KGZpbHRlciwgZGF0YXNldCkge1xuICBpZiAoZmlsdGVyLnBsb3RUeXBlID09PSBQTE9UX1RZUEVTLmhpc3RvZ3JhbSB8fCAhZmlsdGVyLnlBeGlzKSB7XG4gICAgLy8gaGlzdG9ncmFtIHNob3VsZCBiZSBjYWxjdWxhdGVkIHdoZW4gY3JlYXRlIGZpbHRlclxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IHttYXBwZWRWYWx1ZSA9IFtdfSA9IGZpbHRlcjtcbiAgY29uc3Qge3lBeGlzfSA9IGZpbHRlcjtcbiAgY29uc3QgZmllbGRJZHggPSBkYXRhc2V0LmdldENvbHVtbkZpZWxkSWR4KHlBeGlzLm5hbWUpO1xuICBpZiAoZmllbGRJZHggPCAwKSB7XG4gICAgQ29uc29sZS53YXJuKGB5QXhpcyAke3lBeGlzLm5hbWV9IGRvZXMgbm90IGV4aXN0IGluIGRhdGFzZXRgKTtcbiAgICByZXR1cm4ge2xpbmVDaGFydDoge30sIHlBeGlzfTtcbiAgfVxuXG4gIC8vIHJldHVybiBsaW5lQ2hhcnRcbiAgY29uc3Qgc2VyaWVzID0gZGF0YXNldC5kYXRhQ29udGFpbmVyXG4gICAgLm1hcChcbiAgICAgIChyb3csIHJvd0luZGV4KSA9PiAoe1xuICAgICAgICB4OiBtYXBwZWRWYWx1ZVtyb3dJbmRleF0sXG4gICAgICAgIHk6IHJvdy52YWx1ZUF0KGZpZWxkSWR4KVxuICAgICAgfSksXG4gICAgICB0cnVlXG4gICAgKVxuICAgIC5maWx0ZXIoKHt4LCB5fSkgPT4gTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYXNjZW5kaW5nKGEueCwgYi54KSk7XG5cbiAgY29uc3QgeURvbWFpbiA9IGV4dGVudChzZXJpZXMsIGQgPT4gZC55KTtcbiAgY29uc3QgeERvbWFpbiA9IFtzZXJpZXNbMF0ueCwgc2VyaWVzW3Nlcmllcy5sZW5ndGggLSAxXS54XTtcblxuICByZXR1cm4ge2xpbmVDaGFydDoge3NlcmllcywgeURvbWFpbiwgeERvbWFpbn0sIHlBeGlzfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGaWx0ZXJQbG90VHlwZShmaWx0ZXIpIHtcbiAgY29uc3QgZmlsdGVyUGxvdFR5cGVzID0gU3VwcG9ydGVkUGxvdFR5cGVbZmlsdGVyLnR5cGVdO1xuICBpZiAoIWZpbHRlclBsb3RUeXBlcykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKCFmaWx0ZXIueUF4aXMpIHtcbiAgICByZXR1cm4gZmlsdGVyUGxvdFR5cGVzLmRlZmF1bHQ7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyUGxvdFR5cGVzW2ZpbHRlci55QXhpcy50eXBlXSB8fCBudWxsO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZGF0YXNldElkcyBsaXN0IG9mIGRhdGFzZXQgaWRzIHRvIGJlIGZpbHRlcmVkXG4gKiBAcGFyYW0gZGF0YXNldHMgYWxsIGRhdGFzZXRzXG4gKiBAcGFyYW0gZmlsdGVycyBhbGwgZmlsdGVycyB0byBiZSBhcHBsaWVkIHRvIGRhdGFzZXRzXG4gKiBAcmV0dXJuIGRhdGFzZXRzIC0gbmV3IHVwZGF0ZWQgZGF0YXNldHNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmFwcGx5RmlsdGVyc1RvRGF0YXNldHN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUZpbHRlcnNUb0RhdGFzZXRzKGRhdGFzZXRJZHMsIGRhdGFzZXRzLCBmaWx0ZXJzLCBsYXllcnMpIHtcbiAgY29uc3QgZGF0YUlkcyA9IHRvQXJyYXkoZGF0YXNldElkcyk7XG4gIHJldHVybiBkYXRhSWRzLnJlZHVjZSgoYWNjLCBkYXRhSWQpID0+IHtcbiAgICBjb25zdCBsYXllcnNUb0ZpbHRlciA9IChsYXllcnMgfHwgW10pLmZpbHRlcihsID0+IGwuY29uZmlnLmRhdGFJZCA9PT0gZGF0YUlkKTtcbiAgICBjb25zdCBhcHBsaWVkRmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKGQgPT4gc2hvdWxkQXBwbHlGaWx0ZXIoZCwgZGF0YUlkKSk7XG4gICAgY29uc3QgdGFibGUgPSBkYXRhc2V0c1tkYXRhSWRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtkYXRhSWRdOiB0YWJsZS5maWx0ZXJUYWJsZShhcHBsaWVkRmlsdGVycywgbGF5ZXJzVG9GaWx0ZXIsIHt9KVxuICAgIH07XG4gIH0sIGRhdGFzZXRzKTtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIGEgbmV3IGZpZWxkIG5hbWUgdmFsdWUgdG8gZmllbHRlciBhbmQgdXBkYXRlIGJvdGggZmlsdGVyIGFuZCBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyIC0gdG8gYmUgYXBwbGllZCB0aGUgbmV3IGZpZWxkIG5hbWUgb25cbiAqIEBwYXJhbSBkYXRhc2V0IC0gZGF0YXNldCB0aGUgZmllbGQgYmVsb25ncyB0b1xuICogQHBhcmFtIGZpZWxkTmFtZSAtIGZpZWxkLm5hbWVcbiAqIEBwYXJhbSBmaWx0ZXJEYXRhc2V0SW5kZXggLSBmaWVsZC5uYW1lXG4gKiBAcGFyYW0gb3B0aW9uXG4gKiBAcmV0dXJuIC0ge2ZpbHRlciwgZGF0YXNldHN9XG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5hcHBseUZpbHRlckZpZWxkTmFtZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RmlsdGVyRmllbGROYW1lKGZpbHRlciwgZGF0YXNldCwgZmllbGROYW1lLCBmaWx0ZXJEYXRhc2V0SW5kZXggPSAwLCBvcHRpb24pIHtcbiAgLy8gdXNpbmcgZmlsdGVyRGF0YXNldEluZGV4IHdlIGNhbiBmaWx0ZXIgb25seSB0aGUgc3BlY2lmaWVkIGRhdGFzZXRcbiAgY29uc3QgbWVyZ2VEb21haW4gPSBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KCdtZXJnZURvbWFpbicpID8gb3B0aW9uLm1lcmdlRG9tYWluIDogZmFsc2U7XG5cbiAgY29uc3QgZmllbGRJbmRleCA9IGRhdGFzZXQuZ2V0Q29sdW1uRmllbGRJZHgoZmllbGROYW1lKTtcbiAgLy8gaWYgbm8gZmllbGQgd2l0aCBzYW1lIG5hbWUgaXMgZm91bmQsIG1vdmUgdG8gdGhlIG5leHQgZGF0YXNldHNcbiAgaWYgKGZpZWxkSW5kZXggPT09IC0xKSB7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKGBmaWVsZEluZGV4IG5vdCBmb3VuZC4gRGF0YXNldCBtdXN0IGNvbnRhaW4gYSBwcm9wZXJ0eSB3aXRoIG5hbWU6ICR7ZmllbGROYW1lfWApO1xuICAgIHJldHVybiB7ZmlsdGVyOiBudWxsLCBkYXRhc2V0fTtcbiAgfVxuXG4gIC8vIFRPRE86IHZhbGlkYXRlIGZpZWxkIHR5cGVcbiAgY29uc3QgZmlsdGVyUHJvcHMgPSBkYXRhc2V0LmdldENvbHVtbkZpbHRlclByb3BzKGZpZWxkTmFtZSk7XG5cbiAgY29uc3QgbmV3RmlsdGVyID0ge1xuICAgIC4uLihtZXJnZURvbWFpbiA/IG1lcmdlRmlsdGVyRG9tYWluU3RlcChmaWx0ZXIsIGZpbHRlclByb3BzKSA6IHsuLi5maWx0ZXIsIC4uLmZpbHRlclByb3BzfSksXG4gICAgbmFtZTogT2JqZWN0LmFzc2lnbihbLi4udG9BcnJheShmaWx0ZXIubmFtZSldLCB7W2ZpbHRlckRhdGFzZXRJbmRleF06IGZpZWxkTmFtZX0pLFxuICAgIGZpZWxkSWR4OiBPYmplY3QuYXNzaWduKFsuLi50b0FycmF5KGZpbHRlci5maWVsZElkeCldLCB7XG4gICAgICBbZmlsdGVyRGF0YXNldEluZGV4XTogZmllbGRJbmRleFxuICAgIH0pLFxuICAgIC8vIFRPRE8sIHNpbmNlIHdlIGFsbG93IHRvIGFkZCBtdWx0aXBsZSBmaWVsZHMgdG8gYSBmaWx0ZXIgd2UgY2FuIG5vIGxvbmdlciBmcmVlemUgdGhlIGZpbHRlclxuICAgIGZyZWV6ZTogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBuZXdGaWx0ZXIsXG4gICAgZGF0YXNldFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIG9uZSBmaWx0ZXIgd2l0aCBvdGhlciBmaWx0ZXIgcHJvcCBkb21haW5cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLm1lcmdlRmlsdGVyRG9tYWluU3RlcH1cbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRmlsdGVyRG9tYWluU3RlcChmaWx0ZXIsIGZpbHRlclByb3BzKSB7XG4gIGlmICghZmlsdGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoIWZpbHRlclByb3BzKSB7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGlmICgoZmlsdGVyLmZpZWxkVHlwZSAmJiBmaWx0ZXIuZmllbGRUeXBlICE9PSBmaWx0ZXJQcm9wcy5maWVsZFR5cGUpIHx8ICFmaWx0ZXJQcm9wcy5kb21haW4pIHtcbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgY29uc3QgY29tYmluZWREb21haW4gPSAhZmlsdGVyLmRvbWFpblxuICAgID8gZmlsdGVyUHJvcHMuZG9tYWluXG4gICAgOiBbLi4uKGZpbHRlci5kb21haW4gfHwgW10pLCAuLi4oZmlsdGVyUHJvcHMuZG9tYWluIHx8IFtdKV0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuXG4gIGNvbnN0IG5ld0ZpbHRlciA9IHtcbiAgICAuLi5maWx0ZXIsXG4gICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgZG9tYWluOiBbY29tYmluZWREb21haW5bMF0sIGNvbWJpbmVkRG9tYWluW2NvbWJpbmVkRG9tYWluLmxlbmd0aCAtIDFdXVxuICB9O1xuXG4gIHN3aXRjaCAoZmlsdGVyUHJvcHMuZmllbGRUeXBlKSB7XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuc3RyaW5nOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmRhdGU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5uZXdGaWx0ZXIsXG4gICAgICAgIGRvbWFpbjogdW5pcXVlKGNvbWJpbmVkRG9tYWluKS5zb3J0KClcbiAgICAgIH07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA6XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBzdGVwID0gZmlsdGVyLnN0ZXAgPCBmaWx0ZXJQcm9wcy5zdGVwID8gZmlsdGVyLnN0ZXAgOiBmaWx0ZXJQcm9wcy5zdGVwO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5uZXdGaWx0ZXIsXG4gICAgICAgIHN0ZXBcbiAgICAgIH07XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMucmVhbDpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbmV3RmlsdGVyO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBHZW5lcmF0ZXMgcG9seWdvbiBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmZlYXR1cmVUb0ZpbHRlclZhbHVlfVxuICovXG5leHBvcnQgY29uc3QgZmVhdHVyZVRvRmlsdGVyVmFsdWUgPSAoZmVhdHVyZSwgZmlsdGVySWQsIHByb3BlcnRpZXMgPSB7fSkgPT4gKHtcbiAgLi4uZmVhdHVyZSxcbiAgaWQ6IGZlYXR1cmUuaWQsXG4gIHByb3BlcnRpZXM6IHtcbiAgICAuLi5mZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgLi4ucHJvcGVydGllcyxcbiAgICBmaWx0ZXJJZFxuICB9XG59KTtcblxuLyoqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXRGaWx0ZXJJZEluRmVhdHVyZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEZpbHRlcklkSW5GZWF0dXJlID0gZiA9PiBnZXQoZiwgWydwcm9wZXJ0aWVzJywgJ2ZpbHRlcklkJ10pO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBwb2x5Z29uIGZpbHRlclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2VuZXJhdGVQb2x5Z29uRmlsdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQb2x5Z29uRmlsdGVyKGxheWVycywgZmVhdHVyZSkge1xuICBjb25zdCBkYXRhSWQgPSBsYXllcnMubWFwKGwgPT4gbC5jb25maWcuZGF0YUlkKS5maWx0ZXIoZCA9PiBkKTtcbiAgY29uc3QgbGF5ZXJJZCA9IGxheWVycy5tYXAobCA9PiBsLmlkKTtcbiAgY29uc3QgbmFtZSA9IGxheWVycy5tYXAobCA9PiBsLmNvbmZpZy5sYWJlbCk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgZmlsdGVyID0gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpO1xuICByZXR1cm4ge1xuICAgIC4uLmZpbHRlcixcbiAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICB0eXBlOiBGSUxURVJfVFlQRVMucG9seWdvbixcbiAgICBuYW1lLFxuICAgIGxheWVySWQsXG4gICAgdmFsdWU6IGZlYXR1cmVUb0ZpbHRlclZhbHVlKGZlYXR1cmUsIGZpbHRlci5pZCwge2lzVmlzaWJsZTogdHJ1ZX0pXG4gIH07XG59XG5cbi8qKlxuICogUnVuIGZpbHRlciBlbnRpcmVseSBvbiBDUFVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmZpbHRlckRhdGFzZXRDUFV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJEYXRhc2V0Q1BVKHN0YXRlLCBkYXRhSWQpIHtcbiAgY29uc3QgZGF0YXNldEZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmID0+IGYuZGF0YUlkLmluY2x1ZGVzKGRhdGFJZCkpO1xuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcblxuICBpZiAoIWRhdGFzZXQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBjcHVGaWx0ZXJlZERhdGFzZXQgPSBkYXRhc2V0LmZpbHRlclRhYmxlQ1BVKGRhdGFzZXRGaWx0ZXJzLCBzdGF0ZS5sYXllcnMpO1xuXG4gIHJldHVybiBzZXQoWydkYXRhc2V0cycsIGRhdGFJZF0sIGNwdUZpbHRlcmVkRGF0YXNldCwgc3RhdGUpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHBhcnNlZCBmaWx0ZXJzIHdpdGggZGF0YXNldHMgYW5kIGFkZCBmaWx0ZXJQcm9wcyB0byBmaWVsZFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykudmFsaWRhdGVGaWx0ZXJzVXBkYXRlRGF0YXNldHN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcnNVcGRhdGVEYXRhc2V0cyhzdGF0ZSwgZmlsdGVyc1RvVmFsaWRhdGUgPSBbXSkge1xuICBjb25zdCB2YWxpZGF0ZWQgPSBbXTtcbiAgY29uc3QgZmFpbGVkID0gW107XG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcbiAgbGV0IHVwZGF0ZWREYXRhc2V0cyA9IGRhdGFzZXRzO1xuXG4gIC8vIG1lcmdlIGZpbHRlcnNcbiAgZmlsdGVyc1RvVmFsaWRhdGUuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgIC8vIHdlIGNhbiBvbmx5IGxvb2sgZm9yIGRhdGFzZXRzIGRlZmluZSBpbiB0aGUgZmlsdGVyIGRhdGFJZFxuICAgIGNvbnN0IGRhdGFzZXRJZHMgPSB0b0FycmF5KGZpbHRlci5kYXRhSWQpO1xuXG4gICAgLy8gd2UgY2FuIG1lcmdlIGEgZmlsdGVyIG9ubHkgaWYgYWxsIGRhdGFzZXRzIGluIGZpbHRlci5kYXRhSWQgYXJlIGxvYWRlZFxuICAgIGlmIChkYXRhc2V0SWRzLmV2ZXJ5KGQgPT4gZGF0YXNldHNbZF0pKSB7XG4gICAgICAvLyBhbGwgZGF0YXNldElkcyBpbiBmaWx0ZXIgbXVzdCBiZSBwcmVzZW50IHRoZSBzdGF0ZSBkYXRhc2V0c1xuICAgICAgY29uc3Qge2ZpbHRlcjogdmFsaWRhdGVkRmlsdGVyLCBhcHBseVRvRGF0YXNldHMsIGF1Z21lbnRlZERhdGFzZXRzfSA9IGRhdGFzZXRJZHMucmVkdWNlKFxuICAgICAgICAoYWNjLCBkYXRhc2V0SWQpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdXBkYXRlZERhdGFzZXRzW2RhdGFzZXRJZF07XG4gICAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhdGUubGF5ZXJzLmZpbHRlcihsID0+IGwuY29uZmlnLmRhdGFJZCA9PT0gZGF0YXNldC5pZCk7XG4gICAgICAgICAgY29uc3Qge2ZpbHRlcjogdXBkYXRlZEZpbHRlciwgZGF0YXNldDogdXBkYXRlZERhdGFzZXR9ID0gdmFsaWRhdGVGaWx0ZXJXaXRoRGF0YShcbiAgICAgICAgICAgIGFjYy5hdWdtZW50ZWREYXRhc2V0c1tkYXRhc2V0SWRdIHx8IGRhdGFzZXQsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBsYXllcnNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHVwZGF0ZWRGaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgICAgLy8gbWVyZ2UgZmlsdGVyIHByb3BzXG4gICAgICAgICAgICAgIGZpbHRlcjogYWNjLmZpbHRlclxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY2MuZmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICAuLi5tZXJnZUZpbHRlckRvbWFpblN0ZXAoYWNjLCB1cGRhdGVkRmlsdGVyKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogdXBkYXRlZEZpbHRlcixcblxuICAgICAgICAgICAgICBhcHBseVRvRGF0YXNldHM6IFsuLi5hY2MuYXBwbHlUb0RhdGFzZXRzLCBkYXRhc2V0SWRdLFxuXG4gICAgICAgICAgICAgIGF1Z21lbnRlZERhdGFzZXRzOiB7XG4gICAgICAgICAgICAgICAgLi4uYWNjLmF1Z21lbnRlZERhdGFzZXRzLFxuICAgICAgICAgICAgICAgIFtkYXRhc2V0SWRdOiB1cGRhdGVkRGF0YXNldFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWx0ZXI6IG51bGwsXG4gICAgICAgICAgYXBwbHlUb0RhdGFzZXRzOiBbXSxcbiAgICAgICAgICBhdWdtZW50ZWREYXRhc2V0czoge31cbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKHZhbGlkYXRlZEZpbHRlciAmJiBpc0VxdWFsKGRhdGFzZXRJZHMsIGFwcGx5VG9EYXRhc2V0cykpIHtcbiAgICAgICAgdmFsaWRhdGVkLnB1c2godmFsaWRhdGVkRmlsdGVyKTtcbiAgICAgICAgdXBkYXRlZERhdGFzZXRzID0ge1xuICAgICAgICAgIC4uLnVwZGF0ZWREYXRhc2V0cyxcbiAgICAgICAgICAuLi5hdWdtZW50ZWREYXRhc2V0c1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmYWlsZWQucHVzaChmaWx0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHt2YWxpZGF0ZWQsIGZhaWxlZCwgdXBkYXRlZERhdGFzZXRzfTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBpbnRlcnZhbCBiaW5zIGZvciB0aW1lIGZpbHRlclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0SW50ZXJ2YWxCaW5zfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZXJ2YWxCaW5zKGZpbHRlcikge1xuICBjb25zdCB7Ymluc30gPSBmaWx0ZXI7XG4gIGNvbnN0IGludGVydmFsID0gZmlsdGVyLnBsb3RUeXBlPy5pbnRlcnZhbDtcbiAgaWYgKCFpbnRlcnZhbCB8fCAhYmlucyB8fCBPYmplY3Qua2V5cyhiaW5zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKGJpbnMpO1xuICByZXR1cm4gdmFsdWVzWzBdID8gdmFsdWVzWzBdW2ludGVydmFsXSA6IG51bGw7XG59XG4iXX0=