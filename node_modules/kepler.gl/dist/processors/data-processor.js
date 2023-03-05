"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCsvData = processCsvData;
exports.parseRowsByFields = parseRowsByFields;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvRowsByFieldType = parseCsvRowsByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;
exports.processKeplerglJSON = processKeplerglJSON;
exports.processKeplerglDataset = processKeplerglDataset;
exports.Processors = exports.DATASET_HANDLERS = exports.PARSE_FIELD_VALUE_FROM_STRING = exports.CSV_NULLS = exports.ACCEPTED_ANALYZER_TYPES = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Dsv = require("d3-dsv");

var _d3Array = require("d3-array");

var _window = require("global/window");

var _assert = _interopRequireDefault(require("assert"));

var _typeAnalyzer = require("type-analyzer");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("../utils/data-utils");

var _schemas = _interopRequireDefault(require("../schemas"));

var _userGuides = require("../constants/user-guides");

var _utils = require("../utils/utils");

var _PARSE_FIELD_VALUE_FR, _DATASET_HANDLERS;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ACCEPTED_ANALYZER_TYPES = [_typeAnalyzer.DATA_TYPES.DATE, _typeAnalyzer.DATA_TYPES.TIME, _typeAnalyzer.DATA_TYPES.DATETIME, _typeAnalyzer.DATA_TYPES.NUMBER, _typeAnalyzer.DATA_TYPES.INT, _typeAnalyzer.DATA_TYPES.FLOAT, _typeAnalyzer.DATA_TYPES.BOOLEAN, _typeAnalyzer.DATA_TYPES.STRING, _typeAnalyzer.DATA_TYPES.GEOMETRY, _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.ZIPCODE, _typeAnalyzer.DATA_TYPES.ARRAY, _typeAnalyzer.DATA_TYPES.OBJECT]; // if any of these value occurs in csv, parse it to null;
// const CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN', '/N'];
// matches empty string

exports.ACCEPTED_ANALYZER_TYPES = ACCEPTED_ANALYZER_TYPES;
var CSV_NULLS = /^(null|NULL|Null|NaN|\/N||)$/;
exports.CSV_NULLS = CSV_NULLS;
var IGNORE_DATA_TYPES = Object.keys(_typeAnalyzer.DATA_TYPES).filter(function (type) {
  return !ACCEPTED_ANALYZER_TYPES.includes(type);
});
var PARSE_FIELD_VALUE_FROM_STRING = (_PARSE_FIELD_VALUE_FR = {}, (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES["boolean"], {
  valid: function valid(d) {
    return typeof d === 'boolean';
  },
  parse: function parse(d) {
    return d === 'true' || d === 'True' || d === 'TRUE' || d === '1';
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.integer, {
  valid: function valid(d) {
    return parseInt(d, 10) === d;
  },
  parse: function parse(d) {
    return parseInt(d, 10);
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.timestamp, {
  valid: function valid(d, field) {
    return ['x', 'X'].includes(field.format) ? typeof d === 'number' : typeof d === 'string';
  },
  parse: function parse(d, field) {
    return ['x', 'X'].includes(field.format) ? Number(d) : d;
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.real, {
  valid: function valid(d) {
    return parseFloat(d) === d;
  },
  // Note this will result in NaN for some string
  parse: parseFloat
}), _PARSE_FIELD_VALUE_FR);
/**
 * Process csv data, output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param rawData raw csv string
 * @returns  data object `{fields: [], rows: []}` can be passed to addDataToMaps
 * @type {typeof import('./data-processor').processCsvData}
 * @public
 * @example
 * import {processCsvData} from 'kepler.gl/processors';
 *
 * const testData = `gps_data.utc_timestamp,gps_data.lat,gps_data.lng,gps_data.types,epoch,has_result,id,time,begintrip_ts_utc,begintrip_ts_local,date
 * 2016-09-17 00:09:55,29.9900937,31.2590542,driver_analytics,1472688000000,False,1,2016-09-23T00:00:00.000Z,2016-10-01 09:41:39+00:00,2016-10-01 09:41:39+00:00,2016-09-23
 * 2016-09-17 00:10:56,29.9927699,31.2461142,driver_analytics,1472688000000,False,2,2016-09-23T00:00:00.000Z,2016-10-01 09:46:37+00:00,2016-10-01 16:46:37+00:00,2016-09-23
 * 2016-09-17 00:11:56,29.9907261,31.2312742,driver_analytics,1472688000000,False,3,2016-09-23T00:00:00.000Z,,,2016-09-23
 * 2016-09-17 00:12:58,29.9870074,31.2175827,driver_analytics,1472688000000,False,4,2016-09-23T00:00:00.000Z,,,2016-09-23`
 *
 * const dataset = {
 *  info: {id: 'test_data', label: 'My Csv'},
 *  data: processCsvData(testData)
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: [dataset],
 *  options: {centerMap: true, readOnly: true}
 * }));
 */

exports.PARSE_FIELD_VALUE_FROM_STRING = PARSE_FIELD_VALUE_FROM_STRING;

function processCsvData(rawData, header) {
  var rows;
  var headerRow;

  if (typeof rawData === 'string') {
    var _parsedRows = (0, _d3Dsv.csvParseRows)(rawData);

    if (!Array.isArray(_parsedRows) || _parsedRows.length < 2) {
      // looks like an empty file, throw error to be catch
      throw new Error('process Csv Data Failed: CSV is empty');
    }

    headerRow = _parsedRows[0];
    rows = _parsedRows.slice(1);
  } else if (Array.isArray(rawData) && rawData.length) {
    rows = rawData;
    headerRow = header;

    if (!Array.isArray(headerRow)) {
      // if data is passed in as array of rows and missing header
      // assume first row is header
      headerRow = rawData[0];
      rows = rawData.slice(1);
    }
  }

  if (!rows || !headerRow) {
    throw new Error('invalid input passed to processCsvData');
  } // here we assume the csv file that people uploaded will have first row
  // as name of the column


  cleanUpFalsyCsvValue(rows); // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on

  var sample = getSampleForTypeAnalyze({
    fields: headerRow,
    rows: rows
  });
  var fields = getFieldsFromData(sample, headerRow);
  var parsedRows = parseRowsByFields(rows, fields);
  return {
    fields: fields,
    rows: parsedRows
  };
}
/**
 * Parse rows of csv by analyzed field types. So that `'1'` -> `1`, `'True'` -> `true`
 * @param {Array<Array>} rows
 * @param {Array<Object>} fields
 */


function parseRowsByFields(rows, fields) {
  // Edit rows in place
  var geojsonFieldIdx = fields.findIndex(function (f) {
    return f.name === '_geojson';
  });
  fields.forEach(parseCsvRowsByFieldType.bind(null, rows, geojsonFieldIdx));
  return rows;
}
/**
 * Getting sample data for analyzing field type.
 *
 * @type {typeof import('./data-processor').getSampleForTypeAnalyze}
 */


function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      rows = _ref.rows,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === void 0 ? 50 : _ref$sampleCount;
  var total = Math.min(sampleCount, rows.length); // const fieldOrder = fields.map(f => f.name);

  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  }); // collect sample data for each field

  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0; // sample counter

    var j = 0;

    while (j < total) {
      if (i >= rows.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(rows[i][fieldIdx])) {
        var value = rows[i][fieldIdx];
        sample[j][field] = typeof value === 'string' ? value.trim() : value;
        j++;
        i++;
      } else {
        i++;
      }
    }
  });
  return sample;
}
/**
 * Convert falsy value in csv including `'', 'null', 'NULL', 'Null', 'NaN'` to `null`,
 * so that type-analyzer won't detect it as string
 *
 * @param {Array<Array>} rows
 */


function cleanUpFalsyCsvValue(rows) {
  var re = new RegExp(CSV_NULLS, 'g');

  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (typeof rows[i][j] === 'string' && rows[i][j].match(re)) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param rows
 * @param geoFieldIdx field index
 * @param field
 * @param i
 * @type {typeof import('./data-processor').parseCsvRowsByFieldType}
 */


function parseCsvRowsByFieldType(rows, geoFieldIdx, field, i) {
  var parser = PARSE_FIELD_VALUE_FROM_STRING[field.type];

  if (parser) {
    // check first not null value of it's already parsed
    var first = rows.find(function (r) {
      return (0, _dataUtils.notNullorUndefined)(r[i]);
    });

    if (!first || parser.valid(first[i], field)) {
      return;
    }

    rows.forEach(function (row) {
      // parse string value based on field type
      if (row[i] !== null) {
        row[i] = parser.parse(row[i], field);

        if (geoFieldIdx > -1 && row[geoFieldIdx] && row[geoFieldIdx].properties) {
          row[geoFieldIdx].properties[field.name] = row[i];
        }
      }
    });
  }
}
/**
 * Analyze field types from data in `string` format, e.g. uploaded csv.
 * Assign `type`, `fieldIdx` and `format` (timestamp only) to each field
 *
 * @param data array of row object
 * @param fieldOrder array of field names as string
 * @returns formatted fields
 * @type {typeof import('./data-processor').getFieldsFromData}
 * @public
 * @example
 *
 * import {getFieldsFromData} from 'kepler.gl/processors';
 * const data = [{
 *   time: '2016-09-17 00:09:55',
 *   value: '4',
 *   surge: '1.2',
 *   isTrip: 'true',
 *   zeroOnes: '0'
 * }, {
 *   time: '2016-09-17 00:30:08',
 *   value: '3',
 *   surge: null,
 *   isTrip: 'false',
 *   zeroOnes: '1'
 * }, {
 *   time: null,
 *   value: '2',
 *   surge: '1.3',
 *   isTrip: null,
 *   zeroOnes: '1'
 * }];
 *
 * const fieldOrder = ['time', 'value', 'surge', 'isTrip', 'zeroOnes'];
 * const fields = getFieldsFromData(data, fieldOrder);
 * // fields = [
 * // {name: 'time', format: 'YYYY-M-D H:m:s', fieldIdx: 1, type: 'timestamp'},
 * // {name: 'value', format: '', fieldIdx: 4, type: 'integer'},
 * // {name: 'surge', format: '', fieldIdx: 5, type: 'real'},
 * // {name: 'isTrip', format: '', fieldIdx: 6, type: 'boolean'},
 * // {name: 'zeroOnes', format: '', fieldIdx: 7, type: 'integer'}];
 *
 */


function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{
    regex: /.*geojson|all_points/g,
    dataType: 'GEOMETRY'
  }, {
    regex: /.*census/g,
    dataType: 'STRING'
  }], {
    ignoredDataTypes: IGNORE_DATA_TYPES
  });

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  var result = fieldOrder.map(function (field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    return {
      name: name,
      id: name,
      displayName: name,
      format: format,
      fieldIdx: index,
      type: analyzerTypeToFieldType(type),
      analyzerType: type,
      valueAccessor: function valueAccessor(dc) {
        return function (d) {
          return dc.valueAt(d.index, index);
        };
      }
    };
  }); // @ts-ignore

  return result;
}
/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {Array} fieldOrder
 * @returns {Object} new field name by index
 */


function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;
    var fieldName = field; // add a counter to duplicated names

    if (allNames.includes(field)) {
      var counter = 0;

      while (allNames.includes("".concat(field, "-").concat(counter))) {
        counter++;
      }

      fieldName = "".concat(field, "-").concat(counter);
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);
    return accu;
  }, {
    allNames: [],
    fieldByIndex: {}
  });
}
/**
 * Convert type-analyzer output to kepler.gl field types
 *
 * @param aType
 * @returns corresponding type in `ALL_FIELD_TYPES`
 * @type {typeof import('./data-processor').analyzerTypeToFieldType}}
 */

/* eslint-disable complexity */


function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      ARRAY = _typeAnalyzer.DATA_TYPES.ARRAY,
      OBJECT = _typeAnalyzer.DATA_TYPES.OBJECT; // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;

    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;

    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;

    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;

    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES["boolean"];

    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
    case ARRAY:
    case OBJECT:
      // TODO: create a new data type for objects and arrays
      return _defaultSettings.ALL_FIELD_TYPES.geojson;

    case NUMBER:
    case STRING:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;

    default:
      _window.console.warn("Unsupported analyzer type: ".concat(aType));

      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/**
 * Process data where each row is an object, output can be passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * NOTE: This function may mutate input.
 * @param rawData an array of row object, each object should have the same number of keys
 * @returns dataset containing `fields` and `rows`
 * @type {typeof import('./data-processor').processRowObject}
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processRowObject} from 'kepler.gl/processors';
 *
 * const data = [
 *  {lat: 31.27, lng: 127.56, value: 3},
 *  {lat: 31.22, lng: 126.26, value: 1}
 * ];
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {label: 'My Data', id: 'my_data'},
 *    data: processRowObject(data)
 *  }
 * }));
 */


function processRowObject(rawData) {
  if (!Array.isArray(rawData) || !rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  }); // row object an still contain values like `Null` or `N/A`

  cleanUpFalsyCsvValue(rows);
  return processCsvData(rows, keys);
}
/**
 * Process GeoJSON [`FeatureCollection`](http://wiki.geojson.org/GeoJSON_draft_version_6#FeatureCollection),
 * output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * NOTE: This function may mutate input.
 *
 * @param  rawData raw geojson feature collection
 * @returns  dataset containing `fields` and `rows`
 * @type {typeof import('./data-processor').processGeojson}
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processGeojson} from 'kepler.gl/processors';
 *
 * const geojson = {
 * 	"type" : "FeatureCollection",
 * 	"features" : [{
 * 		"type" : "Feature",
 * 		"properties" : {
 * 			"capacity" : "10",
 * 			"type" : "U-Rack"
 * 		},
 * 		"geometry" : {
 * 			"type" : "Point",
 * 			"coordinates" : [ -71.073283, 42.417500 ]
 * 		}
 * 	}]
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {
 *      label: 'Sample Taxi Trips in New York City',
 *      id: 'test_trip_data'
 *    },
 *    data: processGeojson(geojson)
 *  }
 * }));
 */


function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize["default"])(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    var error = new Error("Read File Failed: File is not a valid GeoJSON. Read more about [supported file format](".concat(_userGuides.GUIDES_FILE_FORMAT_DOC, ")"));
    throw error; // fail to normalize geojson
  } // getting all feature fields


  var allDataRows = [];

  for (var i = 0; i < normalizedGeojson.features.length; i++) {
    var f = normalizedGeojson.features[i];

    if (f.geometry) {
      allDataRows.push(_objectSpread({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }
  } // get all the field


  var fields = allDataRows.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []); // make sure each feature has exact same fields

  allDataRows.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
        d._geojson.properties[f] = null;
      }
    });
  });
  return processRowObject(allDataRows);
}
/**
 * On export data to csv
 * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} dataContainer
 * @param {Array<Object>} fields `dataset.fields`
 * @returns {string} csv string
 */


function formatCsv(dataContainer, fields) {
  var columns = fields.map(function (f) {
    return f.displayName || f.name;
  });
  var formattedData = [columns]; // parse geojson object as string

  var _iterator = _createForOfIteratorHelper(dataContainer.rows(true)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      formattedData.push(row.map(function (d, i) {
        return (0, _dataUtils.parseFieldValue)(d, fields[i].type);
      }));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return (0, _d3Dsv.csvFormatRows)(formattedData);
}
/**
 * Validate input data, adding missing field types, rename duplicate columns
 * @type {typeof import('./data-processor').validateInputData}
 */


function validateInputData(data) {
  if (!(0, _utils.isPlainObject)(data)) {
    (0, _assert["default"])('addDataToMap Error: dataset.data cannot be null');
    return null;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.fields to be an array');
    return null;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.rows to be an array');
    return null;
  }

  var fields = data.fields,
      rows = data.rows; // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if (!(0, _utils.isPlainObject)(f)) {
      (0, _assert["default"])("fields needs to be an array of object, but find ".concat((0, _typeof2["default"])(f)));
      fields[i] = {};
    }

    if (!f.name) {
      (0, _assert["default"])("field.name is required but missing in ".concat(JSON.stringify(f))); // assign a name

      fields[i].name = "column_".concat(i);
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert["default"])("unknown field type ".concat(f.type));
      return false;
    }

    if (!fields.every(function (field) {
      return field.analyzerType;
    })) {
      (0, _assert["default"])('field missing analyzerType');
      return false;
    } // check time format is correct based on first 10 not empty element


    if (f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
      var sample = findNonEmptyRowsAtField(rows, i, 10).map(function (r) {
        return {
          ts: r[i]
        };
      });

      var analyzedType = _typeAnalyzer.Analyzer.computeColMeta(sample)[0];

      return analyzedType && analyzedType.category === 'TIME' && analyzedType.format === f.format;
    }

    return true;
  });

  if (allValid) {
    return {
      rows: rows,
      fields: fields
    };
  } // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity


  var sampleData = getSampleForTypeAnalyze({
    fields: fields.map(function (f) {
      return f.name;
    }),
    rows: rows
  });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return _objectSpread(_objectSpread({}, f), {}, {
      type: meta[i].type,
      format: meta[i].format,
      analyzerType: meta[i].analyzerType
    });
  });
  return {
    fields: updatedFields,
    rows: rows
  };
}

function findNonEmptyRowsAtField(rows, fieldIdx, total) {
  var sample = [];
  var i = 0;

  while (sample.length < total && i < rows.length) {
    if ((0, _dataUtils.notNullorUndefined)(rows[i][fieldIdx])) {
      sample.push(rows[i]);
    }

    i++;
  }

  return sample;
}
/**
 * Process saved kepler.gl json to be pass to [`addDataToMap`](../actions/actions.md#adddatatomap).
 * The json object should contain `datasets` and `config`.
 * @param {Object} rawData
 * @param {Array} rawData.datasets
 * @param {Object} rawData.config
 * @returns {Object} datasets and config `{datasets: {}, config: {}}`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processKeplerglJSON} from 'kepler.gl/processors';
 *
 * dispatch(addDataToMap(processKeplerglJSON(keplerGlJson)));
 */


function processKeplerglJSON(rawData) {
  return rawData ? _schemas["default"].load(rawData.datasets, rawData.config) : null;
}
/**
 * Parse a single or an array of datasets saved using kepler.gl schema
 * @param {Array | Array<Object>} rawData
 */


function processKeplerglDataset(rawData) {
  if (!rawData) {
    return null;
  }

  var results = _schemas["default"].parseSavedData((0, _utils.toArray)(rawData));

  if (!results) {
    return null;
  }

  return Array.isArray(rawData) ? results : results[0];
}

var DATASET_HANDLERS = (_DATASET_HANDLERS = {}, (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.row, processRowObject), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.geojson, processGeojson), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.csv, processCsvData), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.keplergl, processKeplerglDataset), _DATASET_HANDLERS);
exports.DATASET_HANDLERS = DATASET_HANDLERS;
var Processors = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  processKeplerglJSON: processKeplerglJSON,
  processKeplerglDataset: processKeplerglDataset,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvRowsByFieldType: parseCsvRowsByFieldType,
  formatCsv: formatCsv
};
exports.Processors = Processors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkFDQ0VQVEVEX0FOQUxZWkVSX1RZUEVTIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiREFURSIsIlRJTUUiLCJEQVRFVElNRSIsIk5VTUJFUiIsIklOVCIsIkZMT0FUIiwiQk9PTEVBTiIsIlNUUklORyIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HIiwiWklQQ09ERSIsIkFSUkFZIiwiT0JKRUNUIiwiQ1NWX05VTExTIiwiSUdOT1JFX0RBVEFfVFlQRVMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwidHlwZSIsImluY2x1ZGVzIiwiUEFSU0VfRklFTERfVkFMVUVfRlJPTV9TVFJJTkciLCJBTExfRklFTERfVFlQRVMiLCJ2YWxpZCIsImQiLCJwYXJzZSIsImludGVnZXIiLCJwYXJzZUludCIsInRpbWVzdGFtcCIsImZpZWxkIiwiZm9ybWF0IiwiTnVtYmVyIiwicmVhbCIsInBhcnNlRmxvYXQiLCJwcm9jZXNzQ3N2RGF0YSIsInJhd0RhdGEiLCJoZWFkZXIiLCJyb3dzIiwiaGVhZGVyUm93IiwicGFyc2VkUm93cyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIkVycm9yIiwic2xpY2UiLCJjbGVhblVwRmFsc3lDc3ZWYWx1ZSIsInNhbXBsZSIsImdldFNhbXBsZUZvclR5cGVBbmFseXplIiwiZmllbGRzIiwiZ2V0RmllbGRzRnJvbURhdGEiLCJwYXJzZVJvd3NCeUZpZWxkcyIsImdlb2pzb25GaWVsZElkeCIsImZpbmRJbmRleCIsImYiLCJuYW1lIiwiZm9yRWFjaCIsInBhcnNlQ3N2Um93c0J5RmllbGRUeXBlIiwiYmluZCIsInNhbXBsZUNvdW50IiwidG90YWwiLCJNYXRoIiwibWluIiwibWFwIiwiZmllbGRJZHgiLCJpIiwiaiIsInZhbHVlIiwidHJpbSIsInJlIiwiUmVnRXhwIiwibWF0Y2giLCJnZW9GaWVsZElkeCIsInBhcnNlciIsImZpcnN0IiwiZmluZCIsInIiLCJyb3ciLCJwcm9wZXJ0aWVzIiwiZGF0YSIsImZpZWxkT3JkZXIiLCJtZXRhZGF0YSIsIkFuYWx5emVyIiwiY29tcHV0ZUNvbE1ldGEiLCJyZWdleCIsImRhdGFUeXBlIiwiaWdub3JlZERhdGFUeXBlcyIsInJlbmFtZUR1cGxpY2F0ZUZpZWxkcyIsImZpZWxkQnlJbmRleCIsInJlc3VsdCIsImluZGV4IiwiZmllbGRNZXRhIiwibSIsImtleSIsImlkIiwiZGlzcGxheU5hbWUiLCJhbmFseXplclR5cGVUb0ZpZWxkVHlwZSIsImFuYWx5emVyVHlwZSIsInZhbHVlQWNjZXNzb3IiLCJkYyIsInZhbHVlQXQiLCJyZWR1Y2UiLCJhY2N1IiwiYWxsTmFtZXMiLCJmaWVsZE5hbWUiLCJjb3VudGVyIiwicHVzaCIsImFUeXBlIiwiZGF0ZSIsImdlb2pzb24iLCJzdHJpbmciLCJnbG9iYWxDb25zb2xlIiwid2FybiIsInByb2Nlc3NSb3dPYmplY3QiLCJwcm9jZXNzR2VvanNvbiIsIm5vcm1hbGl6ZWRHZW9qc29uIiwiZmVhdHVyZXMiLCJlcnJvciIsIkdVSURFU19GSUxFX0ZPUk1BVF9ET0MiLCJhbGxEYXRhUm93cyIsImdlb21ldHJ5IiwiX2dlb2pzb24iLCJwcmV2IiwiY3VyciIsImZvcm1hdENzdiIsImRhdGFDb250YWluZXIiLCJjb2x1bW5zIiwiZm9ybWF0dGVkRGF0YSIsInZhbGlkYXRlSW5wdXREYXRhIiwiYWxsVmFsaWQiLCJldmVyeSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaW5kTm9uRW1wdHlSb3dzQXRGaWVsZCIsInRzIiwiYW5hbHl6ZWRUeXBlIiwiY2F0ZWdvcnkiLCJzYW1wbGVEYXRhIiwibWV0YSIsInVwZGF0ZWRGaWVsZHMiLCJwcm9jZXNzS2VwbGVyZ2xKU09OIiwiS2VwbGVyR2xTY2hlbWEiLCJsb2FkIiwiZGF0YXNldHMiLCJjb25maWciLCJwcm9jZXNzS2VwbGVyZ2xEYXRhc2V0IiwicmVzdWx0cyIsInBhcnNlU2F2ZWREYXRhIiwiREFUQVNFVF9IQU5ETEVSUyIsIkRBVEFTRVRfRk9STUFUUyIsImNzdiIsImtlcGxlcmdsIiwiUHJvY2Vzc29ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsdUJBQXVCLEdBQUcsQ0FDckNDLHlCQUFtQkMsSUFEa0IsRUFFckNELHlCQUFtQkUsSUFGa0IsRUFHckNGLHlCQUFtQkcsUUFIa0IsRUFJckNILHlCQUFtQkksTUFKa0IsRUFLckNKLHlCQUFtQkssR0FMa0IsRUFNckNMLHlCQUFtQk0sS0FOa0IsRUFPckNOLHlCQUFtQk8sT0FQa0IsRUFRckNQLHlCQUFtQlEsTUFSa0IsRUFTckNSLHlCQUFtQlMsUUFUa0IsRUFVckNULHlCQUFtQlUsb0JBVmtCLEVBV3JDVix5QkFBbUJXLHlCQVhrQixFQVlyQ1gseUJBQW1CWSxPQVprQixFQWFyQ1oseUJBQW1CYSxLQWJrQixFQWNyQ2IseUJBQW1CYyxNQWRrQixDQUFoQyxDLENBaUJQO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTUMsU0FBUyxHQUFHLDhCQUFsQjs7QUFFUCxJQUFNQyxpQkFBaUIsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlsQix3QkFBWixFQUFnQ21CLE1BQWhDLENBQ3hCLFVBQUFDLElBQUk7QUFBQSxTQUFJLENBQUNyQix1QkFBdUIsQ0FBQ3NCLFFBQXhCLENBQWlDRCxJQUFqQyxDQUFMO0FBQUEsQ0FEb0IsQ0FBMUI7QUFJTyxJQUFNRSw2QkFBNkIsd0ZBQ3ZDQywyQ0FEdUMsRUFDYjtBQUN6QkMsRUFBQUEsS0FBSyxFQUFFLGVBQUFDLENBQUM7QUFBQSxXQUFJLE9BQU9BLENBQVAsS0FBYSxTQUFqQjtBQUFBLEdBRGlCO0FBRXpCQyxFQUFBQSxLQUFLLEVBQUUsZUFBQUQsQ0FBQztBQUFBLFdBQUlBLENBQUMsS0FBSyxNQUFOLElBQWdCQSxDQUFDLEtBQUssTUFBdEIsSUFBZ0NBLENBQUMsS0FBSyxNQUF0QyxJQUFnREEsQ0FBQyxLQUFLLEdBQTFEO0FBQUE7QUFGaUIsQ0FEYSwyREFLdkNGLGlDQUFnQkksT0FMdUIsRUFLYjtBQUN6QkgsRUFBQUEsS0FBSyxFQUFFLGVBQUFDLENBQUM7QUFBQSxXQUFJRyxRQUFRLENBQUNILENBQUQsRUFBSSxFQUFKLENBQVIsS0FBb0JBLENBQXhCO0FBQUEsR0FEaUI7QUFFekJDLEVBQUFBLEtBQUssRUFBRSxlQUFBRCxDQUFDO0FBQUEsV0FBSUcsUUFBUSxDQUFDSCxDQUFELEVBQUksRUFBSixDQUFaO0FBQUE7QUFGaUIsQ0FMYSwyREFTdkNGLGlDQUFnQk0sU0FUdUIsRUFTWDtBQUMzQkwsRUFBQUEsS0FBSyxFQUFFLGVBQUNDLENBQUQsRUFBSUssS0FBSjtBQUFBLFdBQ0wsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXVCxRQUFYLENBQW9CUyxLQUFLLENBQUNDLE1BQTFCLElBQW9DLE9BQU9OLENBQVAsS0FBYSxRQUFqRCxHQUE0RCxPQUFPQSxDQUFQLEtBQWEsUUFEcEU7QUFBQSxHQURvQjtBQUczQkMsRUFBQUEsS0FBSyxFQUFFLGVBQUNELENBQUQsRUFBSUssS0FBSjtBQUFBLFdBQWUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXVCxRQUFYLENBQW9CUyxLQUFLLENBQUNDLE1BQTFCLElBQW9DQyxNQUFNLENBQUNQLENBQUQsQ0FBMUMsR0FBZ0RBLENBQS9EO0FBQUE7QUFIb0IsQ0FUVywyREFjdkNGLGlDQUFnQlUsSUFkdUIsRUFjaEI7QUFDdEJULEVBQUFBLEtBQUssRUFBRSxlQUFBQyxDQUFDO0FBQUEsV0FBSVMsVUFBVSxDQUFDVCxDQUFELENBQVYsS0FBa0JBLENBQXRCO0FBQUEsR0FEYztBQUV0QjtBQUNBQyxFQUFBQSxLQUFLLEVBQUVRO0FBSGUsQ0FkZ0IseUJBQW5DO0FBcUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFDTyxTQUFTQyxjQUFULENBQXdCQyxPQUF4QixFQUFpQ0MsTUFBakMsRUFBeUM7QUFDOUMsTUFBSUMsSUFBSjtBQUNBLE1BQUlDLFNBQUo7O0FBRUEsTUFBSSxPQUFPSCxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CLFFBQU1JLFdBQVUsR0FBRyx5QkFBYUosT0FBYixDQUFuQjs7QUFFQSxRQUFJLENBQUNLLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixXQUFkLENBQUQsSUFBOEJBLFdBQVUsQ0FBQ0csTUFBWCxHQUFvQixDQUF0RCxFQUF5RDtBQUN2RDtBQUNBLFlBQU0sSUFBSUMsS0FBSixDQUFVLHVDQUFWLENBQU47QUFDRDs7QUFDREwsSUFBQUEsU0FBUyxHQUFHQyxXQUFVLENBQUMsQ0FBRCxDQUF0QjtBQUNBRixJQUFBQSxJQUFJLEdBQUdFLFdBQVUsQ0FBQ0ssS0FBWCxDQUFpQixDQUFqQixDQUFQO0FBQ0QsR0FURCxNQVNPLElBQUlKLEtBQUssQ0FBQ0MsT0FBTixDQUFjTixPQUFkLEtBQTBCQSxPQUFPLENBQUNPLE1BQXRDLEVBQThDO0FBQ25ETCxJQUFBQSxJQUFJLEdBQUdGLE9BQVA7QUFDQUcsSUFBQUEsU0FBUyxHQUFHRixNQUFaOztBQUVBLFFBQUksQ0FBQ0ksS0FBSyxDQUFDQyxPQUFOLENBQWNILFNBQWQsQ0FBTCxFQUErQjtBQUM3QjtBQUNBO0FBQ0FBLE1BQUFBLFNBQVMsR0FBR0gsT0FBTyxDQUFDLENBQUQsQ0FBbkI7QUFDQUUsTUFBQUEsSUFBSSxHQUFHRixPQUFPLENBQUNTLEtBQVIsQ0FBYyxDQUFkLENBQVA7QUFDRDtBQUNGOztBQUVELE1BQUksQ0FBQ1AsSUFBRCxJQUFTLENBQUNDLFNBQWQsRUFBeUI7QUFDdkIsVUFBTSxJQUFJSyxLQUFKLENBQVUsd0NBQVYsQ0FBTjtBQUNELEdBM0I2QyxDQTZCOUM7QUFDQTs7O0FBRUFFLEVBQUFBLG9CQUFvQixDQUFDUixJQUFELENBQXBCLENBaEM4QyxDQWlDOUM7QUFDQTs7QUFDQSxNQUFNUyxNQUFNLEdBQUdDLHVCQUF1QixDQUFDO0FBQUNDLElBQUFBLE1BQU0sRUFBRVYsU0FBVDtBQUFvQkQsSUFBQUEsSUFBSSxFQUFKQTtBQUFwQixHQUFELENBQXRDO0FBQ0EsTUFBTVcsTUFBTSxHQUFHQyxpQkFBaUIsQ0FBQ0gsTUFBRCxFQUFTUixTQUFULENBQWhDO0FBQ0EsTUFBTUMsVUFBVSxHQUFHVyxpQkFBaUIsQ0FBQ2IsSUFBRCxFQUFPVyxNQUFQLENBQXBDO0FBRUEsU0FBTztBQUFDQSxJQUFBQSxNQUFNLEVBQU5BLE1BQUQ7QUFBU1gsSUFBQUEsSUFBSSxFQUFFRTtBQUFmLEdBQVA7QUFDRDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNXLGlCQUFULENBQTJCYixJQUEzQixFQUFpQ1csTUFBakMsRUFBeUM7QUFDOUM7QUFDQSxNQUFNRyxlQUFlLEdBQUdILE1BQU0sQ0FBQ0ksU0FBUCxDQUFpQixVQUFBQyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDQyxJQUFGLEtBQVcsVUFBZjtBQUFBLEdBQWxCLENBQXhCO0FBQ0FOLEVBQUFBLE1BQU0sQ0FBQ08sT0FBUCxDQUFlQyx1QkFBdUIsQ0FBQ0MsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNwQixJQUFuQyxFQUF5Q2MsZUFBekMsQ0FBZjtBQUVBLFNBQU9kLElBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNVLHVCQUFULE9BQW1FO0FBQUEsTUFBakNDLE1BQWlDLFFBQWpDQSxNQUFpQztBQUFBLE1BQXpCWCxJQUF5QixRQUF6QkEsSUFBeUI7QUFBQSw4QkFBbkJxQixXQUFtQjtBQUFBLE1BQW5CQSxXQUFtQixpQ0FBTCxFQUFLO0FBQ3hFLE1BQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNILFdBQVQsRUFBc0JyQixJQUFJLENBQUNLLE1BQTNCLENBQWQsQ0FEd0UsQ0FFeEU7O0FBQ0EsTUFBTUksTUFBTSxHQUFHLG9CQUFNLENBQU4sRUFBU2EsS0FBVCxFQUFnQixDQUFoQixFQUFtQkcsR0FBbkIsQ0FBdUIsVUFBQXRDLENBQUM7QUFBQSxXQUFLLEVBQUw7QUFBQSxHQUF4QixDQUFmLENBSHdFLENBS3hFOztBQUNBd0IsRUFBQUEsTUFBTSxDQUFDTyxPQUFQLENBQWUsVUFBQzFCLEtBQUQsRUFBUWtDLFFBQVIsRUFBcUI7QUFDbEM7QUFDQSxRQUFJQyxDQUFDLEdBQUcsQ0FBUixDQUZrQyxDQUdsQzs7QUFDQSxRQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFFQSxXQUFPQSxDQUFDLEdBQUdOLEtBQVgsRUFBa0I7QUFDaEIsVUFBSUssQ0FBQyxJQUFJM0IsSUFBSSxDQUFDSyxNQUFkLEVBQXNCO0FBQ3BCO0FBQ0FJLFFBQUFBLE1BQU0sQ0FBQ21CLENBQUQsQ0FBTixDQUFVcEMsS0FBVixJQUFtQixJQUFuQjtBQUNBb0MsUUFBQUEsQ0FBQztBQUNGLE9BSkQsTUFJTyxJQUFJLG1DQUFtQjVCLElBQUksQ0FBQzJCLENBQUQsQ0FBSixDQUFRRCxRQUFSLENBQW5CLENBQUosRUFBMkM7QUFDaEQsWUFBTUcsS0FBSyxHQUFHN0IsSUFBSSxDQUFDMkIsQ0FBRCxDQUFKLENBQVFELFFBQVIsQ0FBZDtBQUNBakIsUUFBQUEsTUFBTSxDQUFDbUIsQ0FBRCxDQUFOLENBQVVwQyxLQUFWLElBQW1CLE9BQU9xQyxLQUFQLEtBQWlCLFFBQWpCLEdBQTRCQSxLQUFLLENBQUNDLElBQU4sRUFBNUIsR0FBMkNELEtBQTlEO0FBQ0FELFFBQUFBLENBQUM7QUFDREQsUUFBQUEsQ0FBQztBQUNGLE9BTE0sTUFLQTtBQUNMQSxRQUFBQSxDQUFDO0FBQ0Y7QUFDRjtBQUNGLEdBcEJEO0FBc0JBLFNBQU9sQixNQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVNELG9CQUFULENBQThCUixJQUE5QixFQUFvQztBQUNsQyxNQUFNK0IsRUFBRSxHQUFHLElBQUlDLE1BQUosQ0FBV3ZELFNBQVgsRUFBc0IsR0FBdEIsQ0FBWDs7QUFDQSxPQUFLLElBQUlrRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHM0IsSUFBSSxDQUFDSyxNQUF6QixFQUFpQ3NCLENBQUMsRUFBbEMsRUFBc0M7QUFDcEMsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNUIsSUFBSSxDQUFDMkIsQ0FBRCxDQUFKLENBQVF0QixNQUE1QixFQUFvQ3VCLENBQUMsRUFBckMsRUFBeUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJLE9BQU81QixJQUFJLENBQUMyQixDQUFELENBQUosQ0FBUUMsQ0FBUixDQUFQLEtBQXNCLFFBQXRCLElBQWtDNUIsSUFBSSxDQUFDMkIsQ0FBRCxDQUFKLENBQVFDLENBQVIsRUFBV0ssS0FBWCxDQUFpQkYsRUFBakIsQ0FBdEMsRUFBNEQ7QUFDMUQvQixRQUFBQSxJQUFJLENBQUMyQixDQUFELENBQUosQ0FBUUMsQ0FBUixJQUFhLElBQWI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU1QsdUJBQVQsQ0FBaUNuQixJQUFqQyxFQUF1Q2tDLFdBQXZDLEVBQW9EMUMsS0FBcEQsRUFBMkRtQyxDQUEzRCxFQUE4RDtBQUNuRSxNQUFNUSxNQUFNLEdBQUduRCw2QkFBNkIsQ0FBQ1EsS0FBSyxDQUFDVixJQUFQLENBQTVDOztBQUNBLE1BQUlxRCxNQUFKLEVBQVk7QUFDVjtBQUNBLFFBQU1DLEtBQUssR0FBR3BDLElBQUksQ0FBQ3FDLElBQUwsQ0FBVSxVQUFBQyxDQUFDO0FBQUEsYUFBSSxtQ0FBbUJBLENBQUMsQ0FBQ1gsQ0FBRCxDQUFwQixDQUFKO0FBQUEsS0FBWCxDQUFkOztBQUNBLFFBQUksQ0FBQ1MsS0FBRCxJQUFVRCxNQUFNLENBQUNqRCxLQUFQLENBQWFrRCxLQUFLLENBQUNULENBQUQsQ0FBbEIsRUFBdUJuQyxLQUF2QixDQUFkLEVBQTZDO0FBQzNDO0FBQ0Q7O0FBQ0RRLElBQUFBLElBQUksQ0FBQ2tCLE9BQUwsQ0FBYSxVQUFBcUIsR0FBRyxFQUFJO0FBQ2xCO0FBQ0EsVUFBSUEsR0FBRyxDQUFDWixDQUFELENBQUgsS0FBVyxJQUFmLEVBQXFCO0FBQ25CWSxRQUFBQSxHQUFHLENBQUNaLENBQUQsQ0FBSCxHQUFTUSxNQUFNLENBQUMvQyxLQUFQLENBQWFtRCxHQUFHLENBQUNaLENBQUQsQ0FBaEIsRUFBcUJuQyxLQUFyQixDQUFUOztBQUNBLFlBQUkwQyxXQUFXLEdBQUcsQ0FBQyxDQUFmLElBQW9CSyxHQUFHLENBQUNMLFdBQUQsQ0FBdkIsSUFBd0NLLEdBQUcsQ0FBQ0wsV0FBRCxDQUFILENBQWlCTSxVQUE3RCxFQUF5RTtBQUN2RUQsVUFBQUEsR0FBRyxDQUFDTCxXQUFELENBQUgsQ0FBaUJNLFVBQWpCLENBQTRCaEQsS0FBSyxDQUFDeUIsSUFBbEMsSUFBMENzQixHQUFHLENBQUNaLENBQUQsQ0FBN0M7QUFDRDtBQUNGO0FBQ0YsS0FSRDtBQVNEO0FBQ0Y7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNmLGlCQUFULENBQTJCNkIsSUFBM0IsRUFBaUNDLFVBQWpDLEVBQTZDO0FBQ2xEO0FBQ0EsTUFBTUMsUUFBUSxHQUFHQyx1QkFBU0MsY0FBVCxDQUNmSixJQURlLEVBRWYsQ0FDRTtBQUFDSyxJQUFBQSxLQUFLLEVBQUUsdUJBQVI7QUFBaUNDLElBQUFBLFFBQVEsRUFBRTtBQUEzQyxHQURGLEVBRUU7QUFBQ0QsSUFBQUEsS0FBSyxFQUFFLFdBQVI7QUFBcUJDLElBQUFBLFFBQVEsRUFBRTtBQUEvQixHQUZGLENBRmUsRUFNZjtBQUFDQyxJQUFBQSxnQkFBZ0IsRUFBRXRFO0FBQW5CLEdBTmUsQ0FBakI7O0FBRmtELDhCQVczQnVFLHFCQUFxQixDQUFDUCxVQUFELENBWE07QUFBQSxNQVczQ1EsWUFYMkMseUJBVzNDQSxZQVgyQzs7QUFhbEQsTUFBTUMsTUFBTSxHQUFHVCxVQUFVLENBQUNqQixHQUFYLENBQWUsVUFBQ2pDLEtBQUQsRUFBUTRELEtBQVIsRUFBa0I7QUFDOUMsUUFBTW5DLElBQUksR0FBR2lDLFlBQVksQ0FBQ0UsS0FBRCxDQUF6QjtBQUVBLFFBQU1DLFNBQVMsR0FBR1YsUUFBUSxDQUFDTixJQUFULENBQWMsVUFBQWlCLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUNDLEdBQUYsS0FBVS9ELEtBQWQ7QUFBQSxLQUFmLENBQWxCOztBQUg4QyxnQkFJdkI2RCxTQUFTLElBQUksRUFKVTtBQUFBLFFBSXZDdkUsSUFKdUMsU0FJdkNBLElBSnVDO0FBQUEsUUFJakNXLE1BSmlDLFNBSWpDQSxNQUppQzs7QUFNOUMsV0FBTztBQUNMd0IsTUFBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUx1QyxNQUFBQSxFQUFFLEVBQUV2QyxJQUZDO0FBR0x3QyxNQUFBQSxXQUFXLEVBQUV4QyxJQUhSO0FBSUx4QixNQUFBQSxNQUFNLEVBQU5BLE1BSks7QUFLTGlDLE1BQUFBLFFBQVEsRUFBRTBCLEtBTEw7QUFNTHRFLE1BQUFBLElBQUksRUFBRTRFLHVCQUF1QixDQUFDNUUsSUFBRCxDQU54QjtBQU9MNkUsTUFBQUEsWUFBWSxFQUFFN0UsSUFQVDtBQVFMOEUsTUFBQUEsYUFBYSxFQUFFLHVCQUFBQyxFQUFFO0FBQUEsZUFBSSxVQUFBMUUsQ0FBQyxFQUFJO0FBQ3hCLGlCQUFPMEUsRUFBRSxDQUFDQyxPQUFILENBQVczRSxDQUFDLENBQUNpRSxLQUFiLEVBQW9CQSxLQUFwQixDQUFQO0FBQ0QsU0FGZ0I7QUFBQTtBQVJaLEtBQVA7QUFZRCxHQWxCYyxDQUFmLENBYmtELENBaUNsRDs7QUFDQSxTQUFPRCxNQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU0YscUJBQVQsQ0FBK0JQLFVBQS9CLEVBQTJDO0FBQ2hELFNBQU9BLFVBQVUsQ0FBQ3FCLE1BQVgsQ0FDTCxVQUFDQyxJQUFELEVBQU94RSxLQUFQLEVBQWNtQyxDQUFkLEVBQW9CO0FBQUEsUUFDWHNDLFFBRFcsR0FDQ0QsSUFERCxDQUNYQyxRQURXO0FBRWxCLFFBQUlDLFNBQVMsR0FBRzFFLEtBQWhCLENBRmtCLENBSWxCOztBQUNBLFFBQUl5RSxRQUFRLENBQUNsRixRQUFULENBQWtCUyxLQUFsQixDQUFKLEVBQThCO0FBQzVCLFVBQUkyRSxPQUFPLEdBQUcsQ0FBZDs7QUFDQSxhQUFPRixRQUFRLENBQUNsRixRQUFULFdBQXFCUyxLQUFyQixjQUE4QjJFLE9BQTlCLEVBQVAsRUFBaUQ7QUFDL0NBLFFBQUFBLE9BQU87QUFDUjs7QUFDREQsTUFBQUEsU0FBUyxhQUFNMUUsS0FBTixjQUFlMkUsT0FBZixDQUFUO0FBQ0Q7O0FBRURILElBQUFBLElBQUksQ0FBQ2QsWUFBTCxDQUFrQnZCLENBQWxCLElBQXVCdUMsU0FBdkI7QUFDQUYsSUFBQUEsSUFBSSxDQUFDQyxRQUFMLENBQWNHLElBQWQsQ0FBbUJGLFNBQW5CO0FBRUEsV0FBT0YsSUFBUDtBQUNELEdBbEJJLEVBbUJMO0FBQUNDLElBQUFBLFFBQVEsRUFBRSxFQUFYO0FBQWVmLElBQUFBLFlBQVksRUFBRTtBQUE3QixHQW5CSyxDQUFQO0FBcUJEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUNPLFNBQVNRLHVCQUFULENBQWlDVyxLQUFqQyxFQUF3QztBQUFBLE1BRTNDMUcsSUFGMkMsR0FnQnpDRCx3QkFoQnlDLENBRTNDQyxJQUYyQztBQUFBLE1BRzNDQyxJQUgyQyxHQWdCekNGLHdCQWhCeUMsQ0FHM0NFLElBSDJDO0FBQUEsTUFJM0NDLFFBSjJDLEdBZ0J6Q0gsd0JBaEJ5QyxDQUkzQ0csUUFKMkM7QUFBQSxNQUszQ0MsTUFMMkMsR0FnQnpDSix3QkFoQnlDLENBSzNDSSxNQUwyQztBQUFBLE1BTTNDQyxHQU4yQyxHQWdCekNMLHdCQWhCeUMsQ0FNM0NLLEdBTjJDO0FBQUEsTUFPM0NDLEtBUDJDLEdBZ0J6Q04sd0JBaEJ5QyxDQU8zQ00sS0FQMkM7QUFBQSxNQVEzQ0MsT0FSMkMsR0FnQnpDUCx3QkFoQnlDLENBUTNDTyxPQVIyQztBQUFBLE1BUzNDQyxNQVQyQyxHQWdCekNSLHdCQWhCeUMsQ0FTM0NRLE1BVDJDO0FBQUEsTUFVM0NDLFFBVjJDLEdBZ0J6Q1Qsd0JBaEJ5QyxDQVUzQ1MsUUFWMkM7QUFBQSxNQVczQ0Msb0JBWDJDLEdBZ0J6Q1Ysd0JBaEJ5QyxDQVczQ1Usb0JBWDJDO0FBQUEsTUFZM0NDLHlCQVoyQyxHQWdCekNYLHdCQWhCeUMsQ0FZM0NXLHlCQVoyQztBQUFBLE1BYTNDQyxPQWIyQyxHQWdCekNaLHdCQWhCeUMsQ0FhM0NZLE9BYjJDO0FBQUEsTUFjM0NDLEtBZDJDLEdBZ0J6Q2Isd0JBaEJ5QyxDQWMzQ2EsS0FkMkM7QUFBQSxNQWUzQ0MsTUFmMkMsR0FnQnpDZCx3QkFoQnlDLENBZTNDYyxNQWYyQyxFQWtCN0M7QUFDQTs7QUFDQSxVQUFRNkYsS0FBUjtBQUNFLFNBQUsxRyxJQUFMO0FBQ0UsYUFBT3NCLGlDQUFnQnFGLElBQXZCOztBQUNGLFNBQUsxRyxJQUFMO0FBQ0EsU0FBS0MsUUFBTDtBQUNFLGFBQU9vQixpQ0FBZ0JNLFNBQXZCOztBQUNGLFNBQUt2QixLQUFMO0FBQ0UsYUFBT2lCLGlDQUFnQlUsSUFBdkI7O0FBQ0YsU0FBSzVCLEdBQUw7QUFDRSxhQUFPa0IsaUNBQWdCSSxPQUF2Qjs7QUFDRixTQUFLcEIsT0FBTDtBQUNFLGFBQU9nQiwyQ0FBUDs7QUFDRixTQUFLZCxRQUFMO0FBQ0EsU0FBS0Msb0JBQUw7QUFDQSxTQUFLQyx5QkFBTDtBQUNBLFNBQUtFLEtBQUw7QUFDQSxTQUFLQyxNQUFMO0FBQ0U7QUFDQSxhQUFPUyxpQ0FBZ0JzRixPQUF2Qjs7QUFDRixTQUFLekcsTUFBTDtBQUNBLFNBQUtJLE1BQUw7QUFDQSxTQUFLSSxPQUFMO0FBQ0UsYUFBT1csaUNBQWdCdUYsTUFBdkI7O0FBQ0Y7QUFDRUMsc0JBQWNDLElBQWQsc0NBQWlETCxLQUFqRDs7QUFDQSxhQUFPcEYsaUNBQWdCdUYsTUFBdkI7QUF6Qko7QUEyQkQ7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTRyxnQkFBVCxDQUEwQjdFLE9BQTFCLEVBQW1DO0FBQ3hDLE1BQUksQ0FBQ0ssS0FBSyxDQUFDQyxPQUFOLENBQWNOLE9BQWQsQ0FBRCxJQUEyQixDQUFDQSxPQUFPLENBQUNPLE1BQXhDLEVBQWdEO0FBQzlDLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU16QixJQUFJLEdBQUdELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZa0IsT0FBTyxDQUFDLENBQUQsQ0FBbkIsQ0FBYjtBQUNBLE1BQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDMkIsR0FBUixDQUFZLFVBQUF0QyxDQUFDO0FBQUEsV0FBSVAsSUFBSSxDQUFDNkMsR0FBTCxDQUFTLFVBQUE4QixHQUFHO0FBQUEsYUFBSXBFLENBQUMsQ0FBQ29FLEdBQUQsQ0FBTDtBQUFBLEtBQVosQ0FBSjtBQUFBLEdBQWIsQ0FBYixDQU53QyxDQVF4Qzs7QUFDQS9DLEVBQUFBLG9CQUFvQixDQUFDUixJQUFELENBQXBCO0FBRUEsU0FBT0gsY0FBYyxDQUFDRyxJQUFELEVBQU9wQixJQUFQLENBQXJCO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNnRyxjQUFULENBQXdCOUUsT0FBeEIsRUFBaUM7QUFDdEMsTUFBTStFLGlCQUFpQixHQUFHLGtDQUFVL0UsT0FBVixDQUExQjs7QUFFQSxNQUFJLENBQUMrRSxpQkFBRCxJQUFzQixDQUFDMUUsS0FBSyxDQUFDQyxPQUFOLENBQWN5RSxpQkFBaUIsQ0FBQ0MsUUFBaEMsQ0FBM0IsRUFBc0U7QUFDcEUsUUFBTUMsS0FBSyxHQUFHLElBQUl6RSxLQUFKLGtHQUM4RTBFLGtDQUQ5RSxPQUFkO0FBR0EsVUFBTUQsS0FBTixDQUpvRSxDQUtwRTtBQUNELEdBVHFDLENBV3RDOzs7QUFDQSxNQUFNRSxXQUFXLEdBQUcsRUFBcEI7O0FBQ0EsT0FBSyxJQUFJdEQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tELGlCQUFpQixDQUFDQyxRQUFsQixDQUEyQnpFLE1BQS9DLEVBQXVEc0IsQ0FBQyxFQUF4RCxFQUE0RDtBQUMxRCxRQUFNWCxDQUFDLEdBQUc2RCxpQkFBaUIsQ0FBQ0MsUUFBbEIsQ0FBMkJuRCxDQUEzQixDQUFWOztBQUNBLFFBQUlYLENBQUMsQ0FBQ2tFLFFBQU4sRUFBZ0I7QUFDZEQsTUFBQUEsV0FBVyxDQUFDYixJQUFaO0FBQ0U7QUFDQWUsUUFBQUEsUUFBUSxFQUFFbkU7QUFGWixTQUdNQSxDQUFDLENBQUN3QixVQUFGLElBQWdCLEVBSHRCO0FBS0Q7QUFDRixHQXRCcUMsQ0F1QnRDOzs7QUFDQSxNQUFNN0IsTUFBTSxHQUFHc0UsV0FBVyxDQUFDbEIsTUFBWixDQUFtQixVQUFDcUIsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQ2hEMUcsSUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVl5RyxJQUFaLEVBQWtCbkUsT0FBbEIsQ0FBMEIsVUFBQXFDLEdBQUcsRUFBSTtBQUMvQixVQUFJLENBQUM2QixJQUFJLENBQUNyRyxRQUFMLENBQWN3RSxHQUFkLENBQUwsRUFBeUI7QUFDdkI2QixRQUFBQSxJQUFJLENBQUNoQixJQUFMLENBQVViLEdBQVY7QUFDRDtBQUNGLEtBSkQ7QUFLQSxXQUFPNkIsSUFBUDtBQUNELEdBUGMsRUFPWixFQVBZLENBQWYsQ0F4QnNDLENBaUN0Qzs7QUFDQUgsRUFBQUEsV0FBVyxDQUFDL0QsT0FBWixDQUFvQixVQUFBL0IsQ0FBQyxFQUFJO0FBQ3ZCd0IsSUFBQUEsTUFBTSxDQUFDTyxPQUFQLENBQWUsVUFBQUYsQ0FBQyxFQUFJO0FBQ2xCLFVBQUksRUFBRUEsQ0FBQyxJQUFJN0IsQ0FBUCxDQUFKLEVBQWU7QUFDYkEsUUFBQUEsQ0FBQyxDQUFDNkIsQ0FBRCxDQUFELEdBQU8sSUFBUDtBQUNBN0IsUUFBQUEsQ0FBQyxDQUFDZ0csUUFBRixDQUFXM0MsVUFBWCxDQUFzQnhCLENBQXRCLElBQTJCLElBQTNCO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FQRDtBQVNBLFNBQU8yRCxnQkFBZ0IsQ0FBQ00sV0FBRCxDQUF2QjtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTSyxTQUFULENBQW1CQyxhQUFuQixFQUFrQzVFLE1BQWxDLEVBQTBDO0FBQy9DLE1BQU02RSxPQUFPLEdBQUc3RSxNQUFNLENBQUNjLEdBQVAsQ0FBVyxVQUFBVCxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDeUMsV0FBRixJQUFpQnpDLENBQUMsQ0FBQ0MsSUFBdkI7QUFBQSxHQUFaLENBQWhCO0FBQ0EsTUFBTXdFLGFBQWEsR0FBRyxDQUFDRCxPQUFELENBQXRCLENBRitDLENBSS9DOztBQUorQyw2Q0FLN0JELGFBQWEsQ0FBQ3ZGLElBQWQsQ0FBbUIsSUFBbkIsQ0FMNkI7QUFBQTs7QUFBQTtBQUsvQyx3REFBNEM7QUFBQSxVQUFqQ3VDLEdBQWlDO0FBQzFDa0QsTUFBQUEsYUFBYSxDQUFDckIsSUFBZCxDQUFtQjdCLEdBQUcsQ0FBQ2QsR0FBSixDQUFRLFVBQUN0QyxDQUFELEVBQUl3QyxDQUFKO0FBQUEsZUFBVSxnQ0FBZ0J4QyxDQUFoQixFQUFtQndCLE1BQU0sQ0FBQ2dCLENBQUQsQ0FBTixDQUFVN0MsSUFBN0IsQ0FBVjtBQUFBLE9BQVIsQ0FBbkI7QUFDRDtBQVA4QztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVMvQyxTQUFPLDBCQUFjMkcsYUFBZCxDQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU0MsaUJBQVQsQ0FBMkJqRCxJQUEzQixFQUFpQztBQUN0QyxNQUFJLENBQUMsMEJBQWNBLElBQWQsQ0FBTCxFQUEwQjtBQUN4Qiw0QkFBTyxpREFBUDtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQsTUFHTyxJQUFJLENBQUN0QyxLQUFLLENBQUNDLE9BQU4sQ0FBY3FDLElBQUksQ0FBQzlCLE1BQW5CLENBQUwsRUFBaUM7QUFDdEMsNEJBQU8sK0RBQVA7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhNLE1BR0EsSUFBSSxDQUFDUixLQUFLLENBQUNDLE9BQU4sQ0FBY3FDLElBQUksQ0FBQ3pDLElBQW5CLENBQUwsRUFBK0I7QUFDcEMsNEJBQU8sNkRBQVA7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFWcUMsTUFZL0JXLE1BWitCLEdBWWY4QixJQVplLENBWS9COUIsTUFaK0I7QUFBQSxNQVl2QlgsSUFadUIsR0FZZnlDLElBWmUsQ0FZdkJ6QyxJQVp1QixFQWN0Qzs7QUFDQSxNQUFNMkYsUUFBUSxHQUFHaEYsTUFBTSxDQUFDaUYsS0FBUCxDQUFhLFVBQUM1RSxDQUFELEVBQUlXLENBQUosRUFBVTtBQUN0QyxRQUFJLENBQUMsMEJBQWNYLENBQWQsQ0FBTCxFQUF1QjtBQUNyQixpSEFBaUVBLENBQWpFO0FBQ0FMLE1BQUFBLE1BQU0sQ0FBQ2dCLENBQUQsQ0FBTixHQUFZLEVBQVo7QUFDRDs7QUFFRCxRQUFJLENBQUNYLENBQUMsQ0FBQ0MsSUFBUCxFQUFhO0FBQ1gsOEVBQWdENEUsSUFBSSxDQUFDQyxTQUFMLENBQWU5RSxDQUFmLENBQWhELEdBRFcsQ0FFWDs7QUFDQUwsTUFBQUEsTUFBTSxDQUFDZ0IsQ0FBRCxDQUFOLENBQVVWLElBQVYsb0JBQTJCVSxDQUEzQjtBQUNEOztBQUVELFFBQUksQ0FBQzFDLGlDQUFnQitCLENBQUMsQ0FBQ2xDLElBQWxCLENBQUwsRUFBOEI7QUFDNUIsMkRBQTZCa0MsQ0FBQyxDQUFDbEMsSUFBL0I7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUM2QixNQUFNLENBQUNpRixLQUFQLENBQWEsVUFBQXBHLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNtRSxZQUFWO0FBQUEsS0FBbEIsQ0FBTCxFQUFnRDtBQUM5Qyw4QkFBTyw0QkFBUDtBQUNBLGFBQU8sS0FBUDtBQUNELEtBcEJxQyxDQXNCdEM7OztBQUNBLFFBQUkzQyxDQUFDLENBQUNsQyxJQUFGLEtBQVdHLGlDQUFnQk0sU0FBL0IsRUFBMEM7QUFDeEMsVUFBTWtCLE1BQU0sR0FBR3NGLHVCQUF1QixDQUFDL0YsSUFBRCxFQUFPMkIsQ0FBUCxFQUFVLEVBQVYsQ0FBdkIsQ0FBcUNGLEdBQXJDLENBQXlDLFVBQUFhLENBQUM7QUFBQSxlQUFLO0FBQUMwRCxVQUFBQSxFQUFFLEVBQUUxRCxDQUFDLENBQUNYLENBQUQ7QUFBTixTQUFMO0FBQUEsT0FBMUMsQ0FBZjs7QUFDQSxVQUFNc0UsWUFBWSxHQUFHckQsdUJBQVNDLGNBQVQsQ0FBd0JwQyxNQUF4QixFQUFnQyxDQUFoQyxDQUFyQjs7QUFDQSxhQUFPd0YsWUFBWSxJQUFJQSxZQUFZLENBQUNDLFFBQWIsS0FBMEIsTUFBMUMsSUFBb0RELFlBQVksQ0FBQ3hHLE1BQWIsS0FBd0J1QixDQUFDLENBQUN2QixNQUFyRjtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNELEdBOUJnQixDQUFqQjs7QUFnQ0EsTUFBSWtHLFFBQUosRUFBYztBQUNaLFdBQU87QUFBQzNGLE1BQUFBLElBQUksRUFBSkEsSUFBRDtBQUFPVyxNQUFBQSxNQUFNLEVBQU5BO0FBQVAsS0FBUDtBQUNELEdBakRxQyxDQW1EdEM7QUFDQTs7O0FBQ0EsTUFBTXdGLFVBQVUsR0FBR3pGLHVCQUF1QixDQUFDO0FBQ3pDQyxJQUFBQSxNQUFNLEVBQUVBLE1BQU0sQ0FBQ2MsR0FBUCxDQUFXLFVBQUFULENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUNDLElBQU47QUFBQSxLQUFaLENBRGlDO0FBRXpDakIsSUFBQUEsSUFBSSxFQUFKQTtBQUZ5QyxHQUFELENBQTFDO0FBSUEsTUFBTTBDLFVBQVUsR0FBRy9CLE1BQU0sQ0FBQ2MsR0FBUCxDQUFXLFVBQUFULENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUNDLElBQU47QUFBQSxHQUFaLENBQW5CO0FBQ0EsTUFBTW1GLElBQUksR0FBR3hGLGlCQUFpQixDQUFDdUYsVUFBRCxFQUFhekQsVUFBYixDQUE5QjtBQUNBLE1BQU0yRCxhQUFhLEdBQUcxRixNQUFNLENBQUNjLEdBQVAsQ0FBVyxVQUFDVCxDQUFELEVBQUlXLENBQUo7QUFBQSwyQ0FDNUJYLENBRDRCO0FBRS9CbEMsTUFBQUEsSUFBSSxFQUFFc0gsSUFBSSxDQUFDekUsQ0FBRCxDQUFKLENBQVE3QyxJQUZpQjtBQUcvQlcsTUFBQUEsTUFBTSxFQUFFMkcsSUFBSSxDQUFDekUsQ0FBRCxDQUFKLENBQVFsQyxNQUhlO0FBSS9Ca0UsTUFBQUEsWUFBWSxFQUFFeUMsSUFBSSxDQUFDekUsQ0FBRCxDQUFKLENBQVFnQztBQUpTO0FBQUEsR0FBWCxDQUF0QjtBQU9BLFNBQU87QUFBQ2hELElBQUFBLE1BQU0sRUFBRTBGLGFBQVQ7QUFBd0JyRyxJQUFBQSxJQUFJLEVBQUpBO0FBQXhCLEdBQVA7QUFDRDs7QUFFRCxTQUFTK0YsdUJBQVQsQ0FBaUMvRixJQUFqQyxFQUF1QzBCLFFBQXZDLEVBQWlESixLQUFqRCxFQUF3RDtBQUN0RCxNQUFNYixNQUFNLEdBQUcsRUFBZjtBQUNBLE1BQUlrQixDQUFDLEdBQUcsQ0FBUjs7QUFDQSxTQUFPbEIsTUFBTSxDQUFDSixNQUFQLEdBQWdCaUIsS0FBaEIsSUFBeUJLLENBQUMsR0FBRzNCLElBQUksQ0FBQ0ssTUFBekMsRUFBaUQ7QUFDL0MsUUFBSSxtQ0FBbUJMLElBQUksQ0FBQzJCLENBQUQsQ0FBSixDQUFRRCxRQUFSLENBQW5CLENBQUosRUFBMkM7QUFDekNqQixNQUFBQSxNQUFNLENBQUMyRCxJQUFQLENBQVlwRSxJQUFJLENBQUMyQixDQUFELENBQWhCO0FBQ0Q7O0FBQ0RBLElBQUFBLENBQUM7QUFDRjs7QUFDRCxTQUFPbEIsTUFBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBUzZGLG1CQUFULENBQTZCeEcsT0FBN0IsRUFBc0M7QUFDM0MsU0FBT0EsT0FBTyxHQUFHeUcsb0JBQWVDLElBQWYsQ0FBb0IxRyxPQUFPLENBQUMyRyxRQUE1QixFQUFzQzNHLE9BQU8sQ0FBQzRHLE1BQTlDLENBQUgsR0FBMkQsSUFBekU7QUFDRDtBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTQyxzQkFBVCxDQUFnQzdHLE9BQWhDLEVBQXlDO0FBQzlDLE1BQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1osV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBTThHLE9BQU8sR0FBR0wsb0JBQWVNLGNBQWYsQ0FBOEIsb0JBQVEvRyxPQUFSLENBQTlCLENBQWhCOztBQUNBLE1BQUksQ0FBQzhHLE9BQUwsRUFBYztBQUNaLFdBQU8sSUFBUDtBQUNEOztBQUNELFNBQU96RyxLQUFLLENBQUNDLE9BQU4sQ0FBY04sT0FBZCxJQUF5QjhHLE9BQXpCLEdBQW1DQSxPQUFPLENBQUMsQ0FBRCxDQUFqRDtBQUNEOztBQUVNLElBQU1FLGdCQUFnQixnRkFDMUJDLGlDQUFnQnhFLEdBRFUsRUFDSm9DLGdCQURJLHVEQUUxQm9DLGlDQUFnQnhDLE9BRlUsRUFFQUssY0FGQSx1REFHMUJtQyxpQ0FBZ0JDLEdBSFUsRUFHSm5ILGNBSEksdURBSTFCa0gsaUNBQWdCRSxRQUpVLEVBSUNOLHNCQUpELHFCQUF0Qjs7QUFPQSxJQUFNTyxVQUFVLEdBQUc7QUFDeEJ0QyxFQUFBQSxjQUFjLEVBQWRBLGNBRHdCO0FBRXhCL0UsRUFBQUEsY0FBYyxFQUFkQSxjQUZ3QjtBQUd4QjhFLEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBSHdCO0FBSXhCMkIsRUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFKd0I7QUFLeEJLLEVBQUFBLHNCQUFzQixFQUF0QkEsc0JBTHdCO0FBTXhCakQsRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFOd0I7QUFPeEI5QyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQVB3QjtBQVF4Qk8sRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFSd0I7QUFTeEJtRSxFQUFBQSxTQUFTLEVBQVRBO0FBVHdCLENBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjc3ZQYXJzZVJvd3MsIGNzdkZvcm1hdFJvd3N9IGZyb20gJ2QzLWRzdic7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge2NvbnNvbGUgYXMgZ2xvYmFsQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge0FuYWx5emVyLCBEQVRBX1RZUEVTIGFzIEFuYWx5emVyREFUQV9UWVBFU30gZnJvbSAndHlwZS1hbmFseXplcic7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJ0BtYXBib3gvZ2VvanNvbi1ub3JtYWxpemUnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIERBVEFTRVRfRk9STUFUU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtub3ROdWxsb3JVbmRlZmluZWQsIHBhcnNlRmllbGRWYWx1ZX0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQgS2VwbGVyR2xTY2hlbWEgZnJvbSAnc2NoZW1hcyc7XG5pbXBvcnQge0dVSURFU19GSUxFX0ZPUk1BVF9ET0N9IGZyb20gJ2NvbnN0YW50cy91c2VyLWd1aWRlcyc7XG5pbXBvcnQge2lzUGxhaW5PYmplY3QsIHRvQXJyYXl9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IEFDQ0VQVEVEX0FOQUxZWkVSX1RZUEVTID0gW1xuICBBbmFseXplckRBVEFfVFlQRVMuREFURSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLlRJTUUsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5EQVRFVElNRSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLk5VTUJFUixcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLklOVCxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkZMT0FULFxuICBBbmFseXplckRBVEFfVFlQRVMuQk9PTEVBTixcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLlNUUklORyxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkdFT01FVFJZLFxuICBBbmFseXplckRBVEFfVFlQRVMuR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5QQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HLFxuICBBbmFseXplckRBVEFfVFlQRVMuWklQQ09ERSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkFSUkFZLFxuICBBbmFseXplckRBVEFfVFlQRVMuT0JKRUNUXG5dO1xuXG4vLyBpZiBhbnkgb2YgdGhlc2UgdmFsdWUgb2NjdXJzIGluIGNzdiwgcGFyc2UgaXQgdG8gbnVsbDtcbi8vIGNvbnN0IENTVl9OVUxMUyA9IFsnJywgJ251bGwnLCAnTlVMTCcsICdOdWxsJywgJ05hTicsICcvTiddO1xuLy8gbWF0Y2hlcyBlbXB0eSBzdHJpbmdcbmV4cG9ydCBjb25zdCBDU1ZfTlVMTFMgPSAvXihudWxsfE5VTEx8TnVsbHxOYU58XFwvTnx8KSQvO1xuXG5jb25zdCBJR05PUkVfREFUQV9UWVBFUyA9IE9iamVjdC5rZXlzKEFuYWx5emVyREFUQV9UWVBFUykuZmlsdGVyKFxuICB0eXBlID0+ICFBQ0NFUFRFRF9BTkFMWVpFUl9UWVBFUy5pbmNsdWRlcyh0eXBlKVxuKTtcblxuZXhwb3J0IGNvbnN0IFBBUlNFX0ZJRUxEX1ZBTFVFX0ZST01fU1RSSU5HID0ge1xuICBbQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW5dOiB7XG4gICAgdmFsaWQ6IGQgPT4gdHlwZW9mIGQgPT09ICdib29sZWFuJyxcbiAgICBwYXJzZTogZCA9PiBkID09PSAndHJ1ZScgfHwgZCA9PT0gJ1RydWUnIHx8IGQgPT09ICdUUlVFJyB8fCBkID09PSAnMSdcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlSW50KGQsIDEwKSA9PT0gZCxcbiAgICBwYXJzZTogZCA9PiBwYXJzZUludChkLCAxMClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOiB7XG4gICAgdmFsaWQ6IChkLCBmaWVsZCkgPT5cbiAgICAgIFsneCcsICdYJ10uaW5jbHVkZXMoZmllbGQuZm9ybWF0KSA/IHR5cGVvZiBkID09PSAnbnVtYmVyJyA6IHR5cGVvZiBkID09PSAnc3RyaW5nJyxcbiAgICBwYXJzZTogKGQsIGZpZWxkKSA9PiAoWyd4JywgJ1gnXS5pbmNsdWRlcyhmaWVsZC5mb3JtYXQpID8gTnVtYmVyKGQpIDogZClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlRmxvYXQoZCkgPT09IGQsXG4gICAgLy8gTm90ZSB0aGlzIHdpbGwgcmVzdWx0IGluIE5hTiBmb3Igc29tZSBzdHJpbmdcbiAgICBwYXJzZTogcGFyc2VGbG9hdFxuICB9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgY3N2IGRhdGEsIG91dHB1dCBhIGRhdGEgb2JqZWN0IHdpdGggYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gLlxuICogVGhlIGRhdGEgb2JqZWN0IGNhbiBiZSB3cmFwcGVkIGluIGEgYGRhdGFzZXRgIGFuZCBwYXNzIHRvIFtgYWRkRGF0YVRvTWFwYF0oLi4vYWN0aW9ucy9hY3Rpb25zLm1kI2FkZGRhdGF0b21hcClcbiAqIEBwYXJhbSByYXdEYXRhIHJhdyBjc3Ygc3RyaW5nXG4gKiBAcmV0dXJucyAgZGF0YSBvYmplY3QgYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gIGNhbiBiZSBwYXNzZWQgdG8gYWRkRGF0YVRvTWFwc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5wcm9jZXNzQ3N2RGF0YX1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge3Byb2Nlc3NDc3ZEYXRhfSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgdGVzdERhdGEgPSBgZ3BzX2RhdGEudXRjX3RpbWVzdGFtcCxncHNfZGF0YS5sYXQsZ3BzX2RhdGEubG5nLGdwc19kYXRhLnR5cGVzLGVwb2NoLGhhc19yZXN1bHQsaWQsdGltZSxiZWdpbnRyaXBfdHNfdXRjLGJlZ2ludHJpcF90c19sb2NhbCxkYXRlXG4gKiAyMDE2LTA5LTE3IDAwOjA5OjU1LDI5Ljk5MDA5MzcsMzEuMjU5MDU0Mixkcml2ZXJfYW5hbHl0aWNzLDE0NzI2ODgwMDAwMDAsRmFsc2UsMSwyMDE2LTA5LTIzVDAwOjAwOjAwLjAwMFosMjAxNi0xMC0wMSAwOTo0MTozOSswMDowMCwyMDE2LTEwLTAxIDA5OjQxOjM5KzAwOjAwLDIwMTYtMDktMjNcbiAqIDIwMTYtMDktMTcgMDA6MTA6NTYsMjkuOTkyNzY5OSwzMS4yNDYxMTQyLGRyaXZlcl9hbmFseXRpY3MsMTQ3MjY4ODAwMDAwMCxGYWxzZSwyLDIwMTYtMDktMjNUMDA6MDA6MDAuMDAwWiwyMDE2LTEwLTAxIDA5OjQ2OjM3KzAwOjAwLDIwMTYtMTAtMDEgMTY6NDY6MzcrMDA6MDAsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMTo1NiwyOS45OTA3MjYxLDMxLjIzMTI3NDIsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDMsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMjo1OCwyOS45ODcwMDc0LDMxLjIxNzU4MjcsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDQsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM2BcbiAqXG4gKiBjb25zdCBkYXRhc2V0ID0ge1xuICogIGluZm86IHtpZDogJ3Rlc3RfZGF0YScsIGxhYmVsOiAnTXkgQ3N2J30sXG4gKiAgZGF0YTogcHJvY2Vzc0NzdkRhdGEodGVzdERhdGEpXG4gKiB9O1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IFtkYXRhc2V0XSxcbiAqICBvcHRpb25zOiB7Y2VudGVyTWFwOiB0cnVlLCByZWFkT25seTogdHJ1ZX1cbiAqIH0pKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NDc3ZEYXRhKHJhd0RhdGEsIGhlYWRlcikge1xuICBsZXQgcm93cztcbiAgbGV0IGhlYWRlclJvdztcblxuICBpZiAodHlwZW9mIHJhd0RhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgcGFyc2VkUm93cyA9IGNzdlBhcnNlUm93cyhyYXdEYXRhKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJzZWRSb3dzKSB8fCBwYXJzZWRSb3dzLmxlbmd0aCA8IDIpIHtcbiAgICAgIC8vIGxvb2tzIGxpa2UgYW4gZW1wdHkgZmlsZSwgdGhyb3cgZXJyb3IgdG8gYmUgY2F0Y2hcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJvY2VzcyBDc3YgRGF0YSBGYWlsZWQ6IENTViBpcyBlbXB0eScpO1xuICAgIH1cbiAgICBoZWFkZXJSb3cgPSBwYXJzZWRSb3dzWzBdO1xuICAgIHJvd3MgPSBwYXJzZWRSb3dzLnNsaWNlKDEpO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmF3RGF0YSkgJiYgcmF3RGF0YS5sZW5ndGgpIHtcbiAgICByb3dzID0gcmF3RGF0YTtcbiAgICBoZWFkZXJSb3cgPSBoZWFkZXI7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGVhZGVyUm93KSkge1xuICAgICAgLy8gaWYgZGF0YSBpcyBwYXNzZWQgaW4gYXMgYXJyYXkgb2Ygcm93cyBhbmQgbWlzc2luZyBoZWFkZXJcbiAgICAgIC8vIGFzc3VtZSBmaXJzdCByb3cgaXMgaGVhZGVyXG4gICAgICBoZWFkZXJSb3cgPSByYXdEYXRhWzBdO1xuICAgICAgcm93cyA9IHJhd0RhdGEuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFyb3dzIHx8ICFoZWFkZXJSb3cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5wdXQgcGFzc2VkIHRvIHByb2Nlc3NDc3ZEYXRhJyk7XG4gIH1cblxuICAvLyBoZXJlIHdlIGFzc3VtZSB0aGUgY3N2IGZpbGUgdGhhdCBwZW9wbGUgdXBsb2FkZWQgd2lsbCBoYXZlIGZpcnN0IHJvd1xuICAvLyBhcyBuYW1lIG9mIHRoZSBjb2x1bW5cblxuICBjbGVhblVwRmFsc3lDc3ZWYWx1ZShyb3dzKTtcbiAgLy8gTm8gbmVlZCB0byBydW4gdHlwZSBkZXRlY3Rpb24gb24gZXZlcnkgZGF0YSBwb2ludFxuICAvLyBoZXJlIHdlIGdldCBhIGxpc3Qgb2Ygbm9uZSBudWxsIHZhbHVlcyB0byBydW4gYW5hbHl6ZSBvblxuICBjb25zdCBzYW1wbGUgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzOiBoZWFkZXJSb3csIHJvd3N9KTtcbiAgY29uc3QgZmllbGRzID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlLCBoZWFkZXJSb3cpO1xuICBjb25zdCBwYXJzZWRSb3dzID0gcGFyc2VSb3dzQnlGaWVsZHMocm93cywgZmllbGRzKTtcblxuICByZXR1cm4ge2ZpZWxkcywgcm93czogcGFyc2VkUm93c307XG59XG5cbi8qKlxuICogUGFyc2Ugcm93cyBvZiBjc3YgYnkgYW5hbHl6ZWQgZmllbGQgdHlwZXMuIFNvIHRoYXQgYCcxJ2AgLT4gYDFgLCBgJ1RydWUnYCAtPiBgdHJ1ZWBcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSb3dzQnlGaWVsZHMocm93cywgZmllbGRzKSB7XG4gIC8vIEVkaXQgcm93cyBpbiBwbGFjZVxuICBjb25zdCBnZW9qc29uRmllbGRJZHggPSBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSAnX2dlb2pzb24nKTtcbiAgZmllbGRzLmZvckVhY2gocGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUuYmluZChudWxsLCByb3dzLCBnZW9qc29uRmllbGRJZHgpKTtcblxuICByZXR1cm4gcm93cztcbn1cbi8qKlxuICogR2V0dGluZyBzYW1wbGUgZGF0YSBmb3IgYW5hbHl6aW5nIGZpZWxkIHR5cGUuXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5nZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHMsIHJvd3MsIHNhbXBsZUNvdW50ID0gNTB9KSB7XG4gIGNvbnN0IHRvdGFsID0gTWF0aC5taW4oc2FtcGxlQ291bnQsIHJvd3MubGVuZ3RoKTtcbiAgLy8gY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBzYW1wbGUgPSByYW5nZSgwLCB0b3RhbCwgMSkubWFwKGQgPT4gKHt9KSk7XG5cbiAgLy8gY29sbGVjdCBzYW1wbGUgZGF0YSBmb3IgZWFjaCBmaWVsZFxuICBmaWVsZHMuZm9yRWFjaCgoZmllbGQsIGZpZWxkSWR4KSA9PiB7XG4gICAgLy8gZGF0YSBjb3VudGVyXG4gICAgbGV0IGkgPSAwO1xuICAgIC8vIHNhbXBsZSBjb3VudGVyXG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGogPCB0b3RhbCkge1xuICAgICAgaWYgKGkgPj0gcm93cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgZGVwbGV0ZWQgZGF0YSBwb29sXG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBudWxsO1xuICAgICAgICBqKys7XG4gICAgICB9IGVsc2UgaWYgKG5vdE51bGxvclVuZGVmaW5lZChyb3dzW2ldW2ZpZWxkSWR4XSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSByb3dzW2ldW2ZpZWxkSWR4XTtcbiAgICAgICAgc2FtcGxlW2pdW2ZpZWxkXSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS50cmltKCkgOiB2YWx1ZTtcbiAgICAgICAgaisrO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2FtcGxlO1xufVxuXG4vKipcbiAqIENvbnZlcnQgZmFsc3kgdmFsdWUgaW4gY3N2IGluY2x1ZGluZyBgJycsICdudWxsJywgJ05VTEwnLCAnTnVsbCcsICdOYU4nYCB0byBgbnVsbGAsXG4gKiBzbyB0aGF0IHR5cGUtYW5hbHl6ZXIgd29uJ3QgZGV0ZWN0IGl0IGFzIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpIHtcbiAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKENTVl9OVUxMUywgJ2cnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBhbmFseXplciB3aWxsIHNldCBhbnkgZmllbGRzIHRvICdzdHJpbmcnIGlmIHRoZXJlIGFyZSBlbXB0eSB2YWx1ZXNcbiAgICAgIC8vIHdoaWNoIHdpbGwgYmUgcGFyc2VkIGFzICcnIGJ5IGQzLmNzdlxuICAgICAgLy8gaGVyZSB3ZSBwYXJzZSBlbXB0eSBkYXRhIGFzIG51bGxcbiAgICAgIC8vIFRPRE86IGNyZWF0ZSB3YXJuaW5nIHdoZW4gZGVsdGVjdCBgQ1NWX05VTExTYCBpbiB0aGUgZGF0YVxuICAgICAgaWYgKHR5cGVvZiByb3dzW2ldW2pdID09PSAnc3RyaW5nJyAmJiByb3dzW2ldW2pdLm1hdGNoKHJlKSkge1xuICAgICAgICByb3dzW2ldW2pdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBQcm9jZXNzIHVwbG9hZGVkIGNzdiBmaWxlIHRvIHBhcnNlIHZhbHVlIGJ5IGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0gcm93c1xuICogQHBhcmFtIGdlb0ZpZWxkSWR4IGZpZWxkIGluZGV4XG4gKiBAcGFyYW0gZmllbGRcbiAqIEBwYXJhbSBpXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9kYXRhLXByb2Nlc3NvcicpLnBhcnNlQ3N2Um93c0J5RmllbGRUeXBlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUocm93cywgZ2VvRmllbGRJZHgsIGZpZWxkLCBpKSB7XG4gIGNvbnN0IHBhcnNlciA9IFBBUlNFX0ZJRUxEX1ZBTFVFX0ZST01fU1RSSU5HW2ZpZWxkLnR5cGVdO1xuICBpZiAocGFyc2VyKSB7XG4gICAgLy8gY2hlY2sgZmlyc3Qgbm90IG51bGwgdmFsdWUgb2YgaXQncyBhbHJlYWR5IHBhcnNlZFxuICAgIGNvbnN0IGZpcnN0ID0gcm93cy5maW5kKHIgPT4gbm90TnVsbG9yVW5kZWZpbmVkKHJbaV0pKTtcbiAgICBpZiAoIWZpcnN0IHx8IHBhcnNlci52YWxpZChmaXJzdFtpXSwgZmllbGQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgLy8gcGFyc2Ugc3RyaW5nIHZhbHVlIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAgICAgIGlmIChyb3dbaV0gIT09IG51bGwpIHtcbiAgICAgICAgcm93W2ldID0gcGFyc2VyLnBhcnNlKHJvd1tpXSwgZmllbGQpO1xuICAgICAgICBpZiAoZ2VvRmllbGRJZHggPiAtMSAmJiByb3dbZ2VvRmllbGRJZHhdICYmIHJvd1tnZW9GaWVsZElkeF0ucHJvcGVydGllcykge1xuICAgICAgICAgIHJvd1tnZW9GaWVsZElkeF0ucHJvcGVydGllc1tmaWVsZC5uYW1lXSA9IHJvd1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQW5hbHl6ZSBmaWVsZCB0eXBlcyBmcm9tIGRhdGEgaW4gYHN0cmluZ2AgZm9ybWF0LCBlLmcuIHVwbG9hZGVkIGNzdi5cbiAqIEFzc2lnbiBgdHlwZWAsIGBmaWVsZElkeGAgYW5kIGBmb3JtYXRgICh0aW1lc3RhbXAgb25seSkgdG8gZWFjaCBmaWVsZFxuICpcbiAqIEBwYXJhbSBkYXRhIGFycmF5IG9mIHJvdyBvYmplY3RcbiAqIEBwYXJhbSBmaWVsZE9yZGVyIGFycmF5IG9mIGZpZWxkIG5hbWVzIGFzIHN0cmluZ1xuICogQHJldHVybnMgZm9ybWF0dGVkIGZpZWxkc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5nZXRGaWVsZHNGcm9tRGF0YX1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IHtnZXRGaWVsZHNGcm9tRGF0YX0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICogY29uc3QgZGF0YSA9IFt7XG4gKiAgIHRpbWU6ICcyMDE2LTA5LTE3IDAwOjA5OjU1JyxcbiAqICAgdmFsdWU6ICc0JyxcbiAqICAgc3VyZ2U6ICcxLjInLFxuICogICBpc1RyaXA6ICd0cnVlJyxcbiAqICAgemVyb09uZXM6ICcwJ1xuICogfSwge1xuICogICB0aW1lOiAnMjAxNi0wOS0xNyAwMDozMDowOCcsXG4gKiAgIHZhbHVlOiAnMycsXG4gKiAgIHN1cmdlOiBudWxsLFxuICogICBpc1RyaXA6ICdmYWxzZScsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH0sIHtcbiAqICAgdGltZTogbnVsbCxcbiAqICAgdmFsdWU6ICcyJyxcbiAqICAgc3VyZ2U6ICcxLjMnLFxuICogICBpc1RyaXA6IG51bGwsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH1dO1xuICpcbiAqIGNvbnN0IGZpZWxkT3JkZXIgPSBbJ3RpbWUnLCAndmFsdWUnLCAnc3VyZ2UnLCAnaXNUcmlwJywgJ3plcm9PbmVzJ107XG4gKiBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShkYXRhLCBmaWVsZE9yZGVyKTtcbiAqIC8vIGZpZWxkcyA9IFtcbiAqIC8vIHtuYW1lOiAndGltZScsIGZvcm1hdDogJ1lZWVktTS1EIEg6bTpzJywgZmllbGRJZHg6IDEsIHR5cGU6ICd0aW1lc3RhbXAnfSxcbiAqIC8vIHtuYW1lOiAndmFsdWUnLCBmb3JtYXQ6ICcnLCBmaWVsZElkeDogNCwgdHlwZTogJ2ludGVnZXInfSxcbiAqIC8vIHtuYW1lOiAnc3VyZ2UnLCBmb3JtYXQ6ICcnLCBmaWVsZElkeDogNSwgdHlwZTogJ3JlYWwnfSxcbiAqIC8vIHtuYW1lOiAnaXNUcmlwJywgZm9ybWF0OiAnJywgZmllbGRJZHg6IDYsIHR5cGU6ICdib29sZWFuJ30sXG4gKiAvLyB7bmFtZTogJ3plcm9PbmVzJywgZm9ybWF0OiAnJywgZmllbGRJZHg6IDcsIHR5cGU6ICdpbnRlZ2VyJ31dO1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkc0Zyb21EYXRhKGRhdGEsIGZpZWxkT3JkZXIpIHtcbiAgLy8gYWRkIGEgY2hlY2sgZm9yIGVwb2NoIHRpbWVzdGFtcFxuICBjb25zdCBtZXRhZGF0YSA9IEFuYWx5emVyLmNvbXB1dGVDb2xNZXRhKFxuICAgIGRhdGEsXG4gICAgW1xuICAgICAge3JlZ2V4OiAvLipnZW9qc29ufGFsbF9wb2ludHMvZywgZGF0YVR5cGU6ICdHRU9NRVRSWSd9LFxuICAgICAge3JlZ2V4OiAvLipjZW5zdXMvZywgZGF0YVR5cGU6ICdTVFJJTkcnfVxuICAgIF0sXG4gICAge2lnbm9yZWREYXRhVHlwZXM6IElHTk9SRV9EQVRBX1RZUEVTfVxuICApO1xuXG4gIGNvbnN0IHtmaWVsZEJ5SW5kZXh9ID0gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGZpZWxkT3JkZXIubWFwKChmaWVsZCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZmllbGRCeUluZGV4W2luZGV4XTtcblxuICAgIGNvbnN0IGZpZWxkTWV0YSA9IG1ldGFkYXRhLmZpbmQobSA9PiBtLmtleSA9PT0gZmllbGQpO1xuICAgIGNvbnN0IHt0eXBlLCBmb3JtYXR9ID0gZmllbGRNZXRhIHx8IHt9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBpZDogbmFtZSxcbiAgICAgIGRpc3BsYXlOYW1lOiBuYW1lLFxuICAgICAgZm9ybWF0LFxuICAgICAgZmllbGRJZHg6IGluZGV4LFxuICAgICAgdHlwZTogYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUodHlwZSksXG4gICAgICBhbmFseXplclR5cGU6IHR5cGUsXG4gICAgICB2YWx1ZUFjY2Vzc29yOiBkYyA9PiBkID0+IHtcbiAgICAgICAgcmV0dXJuIGRjLnZhbHVlQXQoZC5pbmRleCwgaW5kZXgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBwYXNzIGluIGFuIGFycmF5IG9mIGZpZWxkIG5hbWVzLCByZW5hbWUgZHVwbGljYXRlZCBvbmVcbiAqIGFuZCByZXR1cm4gYSBtYXAgZnJvbSBvbGQgZmllbGQgaW5kZXggdG8gbmV3IG5hbWVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZE9yZGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXcgZmllbGQgbmFtZSBieSBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpIHtcbiAgcmV0dXJuIGZpZWxkT3JkZXIucmVkdWNlKFxuICAgIChhY2N1LCBmaWVsZCwgaSkgPT4ge1xuICAgICAgY29uc3Qge2FsbE5hbWVzfSA9IGFjY3U7XG4gICAgICBsZXQgZmllbGROYW1lID0gZmllbGQ7XG5cbiAgICAgIC8vIGFkZCBhIGNvdW50ZXIgdG8gZHVwbGljYXRlZCBuYW1lc1xuICAgICAgaWYgKGFsbE5hbWVzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChhbGxOYW1lcy5pbmNsdWRlcyhgJHtmaWVsZH0tJHtjb3VudGVyfWApKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkTmFtZSA9IGAke2ZpZWxkfS0ke2NvdW50ZXJ9YDtcbiAgICAgIH1cblxuICAgICAgYWNjdS5maWVsZEJ5SW5kZXhbaV0gPSBmaWVsZE5hbWU7XG4gICAgICBhY2N1LmFsbE5hbWVzLnB1c2goZmllbGROYW1lKTtcblxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICB7YWxsTmFtZXM6IFtdLCBmaWVsZEJ5SW5kZXg6IHt9fVxuICApO1xufVxuXG4vKipcbiAqIENvbnZlcnQgdHlwZS1hbmFseXplciBvdXRwdXQgdG8ga2VwbGVyLmdsIGZpZWxkIHR5cGVzXG4gKlxuICogQHBhcmFtIGFUeXBlXG4gKiBAcmV0dXJucyBjb3JyZXNwb25kaW5nIHR5cGUgaW4gYEFMTF9GSUVMRF9UWVBFU2BcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGEtcHJvY2Vzc29yJykuYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGV9fVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUoYVR5cGUpIHtcbiAgY29uc3Qge1xuICAgIERBVEUsXG4gICAgVElNRSxcbiAgICBEQVRFVElNRSxcbiAgICBOVU1CRVIsXG4gICAgSU5ULFxuICAgIEZMT0FULFxuICAgIEJPT0xFQU4sXG4gICAgU1RSSU5HLFxuICAgIEdFT01FVFJZLFxuICAgIEdFT01FVFJZX0ZST01fU1RSSU5HLFxuICAgIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gICAgWklQQ09ERSxcbiAgICBBUlJBWSxcbiAgICBPQkpFQ1RcbiAgfSA9IEFuYWx5emVyREFUQV9UWVBFUztcblxuICAvLyBUT0RPOiB1biByZWNvZ25pemVkIHR5cGVzXG4gIC8vIENVUlJFTkNZIFBFUkNFTlQgTk9ORVxuICBzd2l0Y2ggKGFUeXBlKSB7XG4gICAgY2FzZSBEQVRFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5kYXRlO1xuICAgIGNhc2UgVElNRTpcbiAgICBjYXNlIERBVEVUSU1FOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gICAgY2FzZSBGTE9BVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMucmVhbDtcbiAgICBjYXNlIElOVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuaW50ZWdlcjtcbiAgICBjYXNlIEJPT0xFQU46XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW47XG4gICAgY2FzZSBHRU9NRVRSWTpcbiAgICBjYXNlIEdFT01FVFJZX0ZST01fU1RSSU5HOlxuICAgIGNhc2UgUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICBjYXNlIEFSUkFZOlxuICAgIGNhc2UgT0JKRUNUOlxuICAgICAgLy8gVE9ETzogY3JlYXRlIGEgbmV3IGRhdGEgdHlwZSBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzXG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb247XG4gICAgY2FzZSBOVU1CRVI6XG4gICAgY2FzZSBTVFJJTkc6XG4gICAgY2FzZSBaSVBDT0RFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGdsb2JhbENvbnNvbGUud2FybihgVW5zdXBwb3J0ZWQgYW5hbHl6ZXIgdHlwZTogJHthVHlwZX1gKTtcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBQcm9jZXNzIGRhdGEgd2hlcmUgZWFjaCByb3cgaXMgYW4gb2JqZWN0LCBvdXRwdXQgY2FuIGJlIHBhc3NlZCB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKiBOT1RFOiBUaGlzIGZ1bmN0aW9uIG1heSBtdXRhdGUgaW5wdXQuXG4gKiBAcGFyYW0gcmF3RGF0YSBhbiBhcnJheSBvZiByb3cgb2JqZWN0LCBlYWNoIG9iamVjdCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Yga2V5c1xuICogQHJldHVybnMgZGF0YXNldCBjb250YWluaW5nIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGEtcHJvY2Vzc29yJykucHJvY2Vzc1Jvd09iamVjdH1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge2FkZERhdGFUb01hcH0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogaW1wb3J0IHtwcm9jZXNzUm93T2JqZWN0fSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgZGF0YSA9IFtcbiAqICB7bGF0OiAzMS4yNywgbG5nOiAxMjcuNTYsIHZhbHVlOiAzfSxcbiAqICB7bGF0OiAzMS4yMiwgbG5nOiAxMjYuMjYsIHZhbHVlOiAxfVxuICogXTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiB7XG4gKiAgICBpbmZvOiB7bGFiZWw6ICdNeSBEYXRhJywgaWQ6ICdteV9kYXRhJ30sXG4gKiAgICBkYXRhOiBwcm9jZXNzUm93T2JqZWN0KGRhdGEpXG4gKiAgfVxuICogfSkpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1Jvd09iamVjdChyYXdEYXRhKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShyYXdEYXRhKSB8fCAhcmF3RGF0YS5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyYXdEYXRhWzBdKTtcbiAgY29uc3Qgcm93cyA9IHJhd0RhdGEubWFwKGQgPT4ga2V5cy5tYXAoa2V5ID0+IGRba2V5XSkpO1xuXG4gIC8vIHJvdyBvYmplY3QgYW4gc3RpbGwgY29udGFpbiB2YWx1ZXMgbGlrZSBgTnVsbGAgb3IgYE4vQWBcbiAgY2xlYW5VcEZhbHN5Q3N2VmFsdWUocm93cyk7XG5cbiAgcmV0dXJuIHByb2Nlc3NDc3ZEYXRhKHJvd3MsIGtleXMpO1xufVxuXG4vKipcbiAqIFByb2Nlc3MgR2VvSlNPTiBbYEZlYXR1cmVDb2xsZWN0aW9uYF0oaHR0cDovL3dpa2kuZ2VvanNvbi5vcmcvR2VvSlNPTl9kcmFmdF92ZXJzaW9uXzYjRmVhdHVyZUNvbGxlY3Rpb24pLFxuICogb3V0cHV0IGEgZGF0YSBvYmplY3Qgd2l0aCBge2ZpZWxkczogW10sIHJvd3M6IFtdfWAuXG4gKiBUaGUgZGF0YSBvYmplY3QgY2FuIGJlIHdyYXBwZWQgaW4gYSBgZGF0YXNldGAgYW5kIHBhc3NlZCB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKiBOT1RFOiBUaGlzIGZ1bmN0aW9uIG1heSBtdXRhdGUgaW5wdXQuXG4gKlxuICogQHBhcmFtICByYXdEYXRhIHJhdyBnZW9qc29uIGZlYXR1cmUgY29sbGVjdGlvblxuICogQHJldHVybnMgIGRhdGFzZXQgY29udGFpbmluZyBgZmllbGRzYCBhbmQgYHJvd3NgXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9kYXRhLXByb2Nlc3NvcicpLnByb2Nlc3NHZW9qc29ufVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NHZW9qc29ufSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgZ2VvanNvbiA9IHtcbiAqIFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gKiBcdFwiZmVhdHVyZXNcIiA6IFt7XG4gKiBcdFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVcIixcbiAqIFx0XHRcInByb3BlcnRpZXNcIiA6IHtcbiAqIFx0XHRcdFwiY2FwYWNpdHlcIiA6IFwiMTBcIixcbiAqIFx0XHRcdFwidHlwZVwiIDogXCJVLVJhY2tcIlxuICogXHRcdH0sXG4gKiBcdFx0XCJnZW9tZXRyeVwiIDoge1xuICogXHRcdFx0XCJ0eXBlXCIgOiBcIlBvaW50XCIsXG4gKiBcdFx0XHRcImNvb3JkaW5hdGVzXCIgOiBbIC03MS4wNzMyODMsIDQyLjQxNzUwMCBdXG4gKiBcdFx0fVxuICogXHR9XVxuICogfTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiB7XG4gKiAgICBpbmZvOiB7XG4gKiAgICAgIGxhYmVsOiAnU2FtcGxlIFRheGkgVHJpcHMgaW4gTmV3IFlvcmsgQ2l0eScsXG4gKiAgICAgIGlkOiAndGVzdF90cmlwX2RhdGEnXG4gKiAgICB9LFxuICogICAgZGF0YTogcHJvY2Vzc0dlb2pzb24oZ2VvanNvbilcbiAqICB9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzR2VvanNvbihyYXdEYXRhKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRHZW9qc29uID0gbm9ybWFsaXplKHJhd0RhdGEpO1xuXG4gIGlmICghbm9ybWFsaXplZEdlb2pzb24gfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMpKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICBgUmVhZCBGaWxlIEZhaWxlZDogRmlsZSBpcyBub3QgYSB2YWxpZCBHZW9KU09OLiBSZWFkIG1vcmUgYWJvdXQgW3N1cHBvcnRlZCBmaWxlIGZvcm1hdF0oJHtHVUlERVNfRklMRV9GT1JNQVRfRE9DfSlgXG4gICAgKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgICAvLyBmYWlsIHRvIG5vcm1hbGl6ZSBnZW9qc29uXG4gIH1cblxuICAvLyBnZXR0aW5nIGFsbCBmZWF0dXJlIGZpZWxkc1xuICBjb25zdCBhbGxEYXRhUm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vcm1hbGl6ZWRHZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZiA9IG5vcm1hbGl6ZWRHZW9qc29uLmZlYXR1cmVzW2ldO1xuICAgIGlmIChmLmdlb21ldHJ5KSB7XG4gICAgICBhbGxEYXRhUm93cy5wdXNoKHtcbiAgICAgICAgLy8gYWRkIGZlYXR1cmUgdG8gX2dlb2pzb24gZmllbGRcbiAgICAgICAgX2dlb2pzb246IGYsXG4gICAgICAgIC4uLihmLnByb3BlcnRpZXMgfHwge30pXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gZ2V0IGFsbCB0aGUgZmllbGRcbiAgY29uc3QgZmllbGRzID0gYWxsRGF0YVJvd3MucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoY3VycikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCFwcmV2LmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgcHJldi5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIFtdKTtcblxuICAvLyBtYWtlIHN1cmUgZWFjaCBmZWF0dXJlIGhhcyBleGFjdCBzYW1lIGZpZWxkc1xuICBhbGxEYXRhUm93cy5mb3JFYWNoKGQgPT4ge1xuICAgIGZpZWxkcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgaWYgKCEoZiBpbiBkKSkge1xuICAgICAgICBkW2ZdID0gbnVsbDtcbiAgICAgICAgZC5fZ2VvanNvbi5wcm9wZXJ0aWVzW2ZdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb2Nlc3NSb3dPYmplY3QoYWxsRGF0YVJvd3MpO1xufVxuXG4vKipcbiAqIE9uIGV4cG9ydCBkYXRhIHRvIGNzdlxuICogQHBhcmFtIHtpbXBvcnQoJ3V0aWxzL3RhYmxlLXV0aWxzL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IGRhdGFDb250YWluZXJcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzIGBkYXRhc2V0LmZpZWxkc2BcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNzdiBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdENzdihkYXRhQ29udGFpbmVyLCBmaWVsZHMpIHtcbiAgY29uc3QgY29sdW1ucyA9IGZpZWxkcy5tYXAoZiA9PiBmLmRpc3BsYXlOYW1lIHx8IGYubmFtZSk7XG4gIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBbY29sdW1uc107XG5cbiAgLy8gcGFyc2UgZ2VvanNvbiBvYmplY3QgYXMgc3RyaW5nXG4gIGZvciAoY29uc3Qgcm93IG9mIGRhdGFDb250YWluZXIucm93cyh0cnVlKSkge1xuICAgIGZvcm1hdHRlZERhdGEucHVzaChyb3cubWFwKChkLCBpKSA9PiBwYXJzZUZpZWxkVmFsdWUoZCwgZmllbGRzW2ldLnR5cGUpKSk7XG4gIH1cblxuICByZXR1cm4gY3N2Rm9ybWF0Um93cyhmb3JtYXR0ZWREYXRhKTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBpbnB1dCBkYXRhLCBhZGRpbmcgbWlzc2luZyBmaWVsZCB0eXBlcywgcmVuYW1lIGR1cGxpY2F0ZSBjb2x1bW5zXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9kYXRhLXByb2Nlc3NvcicpLnZhbGlkYXRlSW5wdXREYXRhfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJbnB1dERhdGEoZGF0YSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICBhc3NlcnQoJ2FkZERhdGFUb01hcCBFcnJvcjogZGF0YXNldC5kYXRhIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5maWVsZHMpKSB7XG4gICAgYXNzZXJ0KCdhZGREYXRhVG9NYXAgRXJyb3I6IGV4cGVjdCBkYXRhc2V0LmRhdGEuZmllbGRzIHRvIGJlIGFuIGFycmF5Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5yb3dzKSkge1xuICAgIGFzc2VydCgnYWRkRGF0YVRvTWFwIEVycm9yOiBleHBlY3QgZGF0YXNldC5kYXRhLnJvd3MgdG8gYmUgYW4gYXJyYXknKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHtmaWVsZHMsIHJvd3N9ID0gZGF0YTtcblxuICAvLyBjaGVjayBpZiBhbGwgZmllbGRzIGhhcyBuYW1lLCBmb3JtYXQgYW5kIHR5cGVcbiAgY29uc3QgYWxsVmFsaWQgPSBmaWVsZHMuZXZlcnkoKGYsIGkpID0+IHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoZikpIHtcbiAgICAgIGFzc2VydChgZmllbGRzIG5lZWRzIHRvIGJlIGFuIGFycmF5IG9mIG9iamVjdCwgYnV0IGZpbmQgJHt0eXBlb2YgZn1gKTtcbiAgICAgIGZpZWxkc1tpXSA9IHt9O1xuICAgIH1cblxuICAgIGlmICghZi5uYW1lKSB7XG4gICAgICBhc3NlcnQoYGZpZWxkLm5hbWUgaXMgcmVxdWlyZWQgYnV0IG1pc3NpbmcgaW4gJHtKU09OLnN0cmluZ2lmeShmKX1gKTtcbiAgICAgIC8vIGFzc2lnbiBhIG5hbWVcbiAgICAgIGZpZWxkc1tpXS5uYW1lID0gYGNvbHVtbl8ke2l9YDtcbiAgICB9XG5cbiAgICBpZiAoIUFMTF9GSUVMRF9UWVBFU1tmLnR5cGVdKSB7XG4gICAgICBhc3NlcnQoYHVua25vd24gZmllbGQgdHlwZSAke2YudHlwZX1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWZpZWxkcy5ldmVyeShmaWVsZCA9PiBmaWVsZC5hbmFseXplclR5cGUpKSB7XG4gICAgICBhc3NlcnQoJ2ZpZWxkIG1pc3NpbmcgYW5hbHl6ZXJUeXBlJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGltZSBmb3JtYXQgaXMgY29ycmVjdCBiYXNlZCBvbiBmaXJzdCAxMCBub3QgZW1wdHkgZWxlbWVudFxuICAgIGlmIChmLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHNhbXBsZSA9IGZpbmROb25FbXB0eVJvd3NBdEZpZWxkKHJvd3MsIGksIDEwKS5tYXAociA9PiAoe3RzOiByW2ldfSkpO1xuICAgICAgY29uc3QgYW5hbHl6ZWRUeXBlID0gQW5hbHl6ZXIuY29tcHV0ZUNvbE1ldGEoc2FtcGxlKVswXTtcbiAgICAgIHJldHVybiBhbmFseXplZFR5cGUgJiYgYW5hbHl6ZWRUeXBlLmNhdGVnb3J5ID09PSAnVElNRScgJiYgYW5hbHl6ZWRUeXBlLmZvcm1hdCA9PT0gZi5mb3JtYXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIGlmIChhbGxWYWxpZCkge1xuICAgIHJldHVybiB7cm93cywgZmllbGRzfTtcbiAgfVxuXG4gIC8vIGlmIGFueSBmaWVsZCBoYXMgbWlzc2luZyB0eXBlLCByZWNhbGN1bGF0ZSBpdCBmb3IgZXZlcnlvbmVcbiAgLy8gYmVjYXVzZSB3ZSBzaW1wbHkgbG9zdCBmYWl0aCBpbiBodW1hbml0eVxuICBjb25zdCBzYW1wbGVEYXRhID0gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe1xuICAgIGZpZWxkczogZmllbGRzLm1hcChmID0+IGYubmFtZSksXG4gICAgcm93c1xuICB9KTtcbiAgY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG4gIGNvbnN0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgIC4uLmYsXG4gICAgdHlwZTogbWV0YVtpXS50eXBlLFxuICAgIGZvcm1hdDogbWV0YVtpXS5mb3JtYXQsXG4gICAgYW5hbHl6ZXJUeXBlOiBtZXRhW2ldLmFuYWx5emVyVHlwZVxuICB9KSk7XG5cbiAgcmV0dXJuIHtmaWVsZHM6IHVwZGF0ZWRGaWVsZHMsIHJvd3N9O1xufVxuXG5mdW5jdGlvbiBmaW5kTm9uRW1wdHlSb3dzQXRGaWVsZChyb3dzLCBmaWVsZElkeCwgdG90YWwpIHtcbiAgY29uc3Qgc2FtcGxlID0gW107XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKHNhbXBsZS5sZW5ndGggPCB0b3RhbCAmJiBpIDwgcm93cy5sZW5ndGgpIHtcbiAgICBpZiAobm90TnVsbG9yVW5kZWZpbmVkKHJvd3NbaV1bZmllbGRJZHhdKSkge1xuICAgICAgc2FtcGxlLnB1c2gocm93c1tpXSk7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gc2FtcGxlO1xufVxuXG4vKipcbiAqIFByb2Nlc3Mgc2F2ZWQga2VwbGVyLmdsIGpzb24gdG8gYmUgcGFzcyB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApLlxuICogVGhlIGpzb24gb2JqZWN0IHNob3VsZCBjb250YWluIGBkYXRhc2V0c2AgYW5kIGBjb25maWdgLlxuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGFcbiAqIEBwYXJhbSB7QXJyYXl9IHJhd0RhdGEuZGF0YXNldHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByYXdEYXRhLmNvbmZpZ1xuICogQHJldHVybnMge09iamVjdH0gZGF0YXNldHMgYW5kIGNvbmZpZyBge2RhdGFzZXRzOiB7fSwgY29uZmlnOiB7fX1gXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHthZGREYXRhVG9NYXB9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7cHJvY2Vzc0tlcGxlcmdsSlNPTn0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcChwcm9jZXNzS2VwbGVyZ2xKU09OKGtlcGxlckdsSnNvbikpKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NLZXBsZXJnbEpTT04ocmF3RGF0YSkge1xuICByZXR1cm4gcmF3RGF0YSA/IEtlcGxlckdsU2NoZW1hLmxvYWQocmF3RGF0YS5kYXRhc2V0cywgcmF3RGF0YS5jb25maWcpIDogbnVsbDtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIHNpbmdsZSBvciBhbiBhcnJheSBvZiBkYXRhc2V0cyBzYXZlZCB1c2luZyBrZXBsZXIuZ2wgc2NoZW1hXG4gKiBAcGFyYW0ge0FycmF5IHwgQXJyYXk8T2JqZWN0Pn0gcmF3RGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0tlcGxlcmdsRGF0YXNldChyYXdEYXRhKSB7XG4gIGlmICghcmF3RGF0YSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0cyA9IEtlcGxlckdsU2NoZW1hLnBhcnNlU2F2ZWREYXRhKHRvQXJyYXkocmF3RGF0YSkpO1xuICBpZiAoIXJlc3VsdHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gQXJyYXkuaXNBcnJheShyYXdEYXRhKSA/IHJlc3VsdHMgOiByZXN1bHRzWzBdO1xufVxuXG5leHBvcnQgY29uc3QgREFUQVNFVF9IQU5ETEVSUyA9IHtcbiAgW0RBVEFTRVRfRk9STUFUUy5yb3ddOiBwcm9jZXNzUm93T2JqZWN0LFxuICBbREFUQVNFVF9GT1JNQVRTLmdlb2pzb25dOiBwcm9jZXNzR2VvanNvbixcbiAgW0RBVEFTRVRfRk9STUFUUy5jc3ZdOiBwcm9jZXNzQ3N2RGF0YSxcbiAgW0RBVEFTRVRfRk9STUFUUy5rZXBsZXJnbF06IHByb2Nlc3NLZXBsZXJnbERhdGFzZXRcbn07XG5cbmV4cG9ydCBjb25zdCBQcm9jZXNzb3JzID0ge1xuICBwcm9jZXNzR2VvanNvbixcbiAgcHJvY2Vzc0NzdkRhdGEsXG4gIHByb2Nlc3NSb3dPYmplY3QsXG4gIHByb2Nlc3NLZXBsZXJnbEpTT04sXG4gIHByb2Nlc3NLZXBsZXJnbERhdGFzZXQsXG4gIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlLFxuICBnZXRGaWVsZHNGcm9tRGF0YSxcbiAgcGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUsXG4gIGZvcm1hdENzdlxufTtcbiJdfQ==