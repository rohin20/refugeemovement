"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewDatasetColor = getNewDatasetColor;
exports.createNewDataEntry = createNewDataEntry;
exports.findDefaultColorField = findDefaultColorField;
exports.datasetColorMaker = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _colorUtils = require("./color-utils");

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _defaultSettings = require("../constants/default-settings");

var _dataProcessor = require("../processors/data-processor");

var _keplerTable = _interopRequireDefault(require("./table-utils/kepler-table"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(generateColor);

// apply a color for each dataset
// to use as label colors
var datasetColors = ['#8F2FBF', '#005CFF', '#C06C84', '#F8B195', '#547A82', '#3EACA8', '#A2D4AB'].map(_colorUtils.hexToRgb);
/**
 * Random color generator
 * @return {Generator<import('reducers/types').RGBColor>}
 */

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < datasetColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === datasetColors.length) {
            index = 0;
          }

          _context.next = 5;
          return datasetColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var datasetColorMaker = generateColor();
/** @type {typeof import('./dataset-utils').getNewDatasetColor} */

exports.datasetColorMaker = datasetColorMaker;

function getNewDatasetColor(datasets) {
  var presetColors = datasetColors.map(String);
  var usedColors = (0, _lodash["default"])(Object.values(datasets).map(function (d) {
    return String(d.color);
  })).filter(function (c) {
    return presetColors.includes(c);
  });

  if (usedColors.length === presetColors.length) {
    // if we already depleted the pool of color
    return datasetColorMaker.next().value;
  }

  var color = datasetColorMaker.next().value;

  while (usedColors.includes(String(color))) {
    color = datasetColorMaker.next().value;
  }

  return color;
}
/**
 * Take datasets payload from addDataToMap, create datasets entry save to visState
 * @type {typeof import('./dataset-utils').createNewDataEntry}
 */


function createNewDataEntry(_ref) {
  var info = _ref.info,
      data = _ref.data,
      opts = (0, _objectWithoutProperties2["default"])(_ref, ["info", "data"]);
  var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validatedData = (0, _dataProcessor.validateInputData)(data);

  if (!validatedData) {
    return {};
  }

  info = info || {};
  var color = info.color || getNewDatasetColor(datasets);
  var keplerTable = new _keplerTable["default"](_objectSpread({
    info: info,
    data: validatedData,
    color: color
  }, opts));
  return (0, _defineProperty2["default"])({}, keplerTable.id, keplerTable);
}
/**
 * Field name prefixes and suffixes which should not be considered
 * as metrics. Fields will still be included if a 'metric word'
 * is found on the field name, however.
 */


var EXCLUDED_DEFAULT_FIELDS = [// Serial numbers and identification numbers
'_id', 'id', 'index', 'uuid', 'guid', 'uid', 'gid', 'serial', // Geographic IDs are unlikely to be interesting to color
'zip', 'code', 'post', 'region', 'fips', 'cbgs', 'h3', 's2', // Geographic coords (but not z/elevation/altitude
// since that might be a metric)
'lat', 'lon', 'lng', 'latitude', 'longitude', '_x', '_y'];
/**
 * Prefixes and suffixes that indicate a field is a metric.
 *
 * Note that these are in order of preference, first being
 * most preferred.
 */

var METRIC_DEFAULT_FIELDS = ['metric', 'value', 'sum', 'count', 'unique', 'mean', 'mode', 'median', 'max', 'min', 'deviation', 'variance', 'p99', 'p95', 'p75', 'p50', 'p25', 'p05', // Abbreviations are less preferred
'cnt', 'val'];
/**
 * Choose a field to use as the default color field of a layer.
 *
 * The heuristic is:
 *
 * First, exclude fields that are on the exclusion list and don't
 * have names that suggest they contain metrics. Also exclude
 * field names that are blank.
 *
 * Next, look for a field that is of real type and contains one
 * of the preferred names (in order of the preferred names).
 *
 * Next, look for a field that is of integer type and contains
 * one of the preferred names (in order of the preferred names).
 *
 * Next, look for the first field that is of real type (in order
 * of field index).
 *
 * Next, look for the first field that is of integer type (in
 * order of field index).
 *
 * It's possible no field will be chosen (i.e. because all fields
 * are strings.)
 *
 * @param dataset
 */

function findDefaultColorField(_ref3) {
  var fields = _ref3.fields,
      _ref3$fieldPairs = _ref3.fieldPairs,
      fieldPairs = _ref3$fieldPairs === void 0 ? [] : _ref3$fieldPairs;
  var fieldsWithoutExcluded = fields.filter(function (field) {
    if (field.type !== _defaultSettings.ALL_FIELD_TYPES.real && field.type !== _defaultSettings.ALL_FIELD_TYPES.integer) {
      // Only select numeric fields.
      return false;
    }

    if (fieldPairs.find(function (pair) {
      return pair.pair.lat.value === field.name || pair.pair.lng.value === field.name;
    })) {
      // Do not permit lat, lon fields
      return false;
    }

    var normalizedFieldName = field.name.toLowerCase();

    if (normalizedFieldName === '') {
      // Special case excluded name when the name is blank.
      return false;
    }

    var hasExcluded = EXCLUDED_DEFAULT_FIELDS.find(function (f) {
      return normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f);
    });
    var hasInclusion = METRIC_DEFAULT_FIELDS.find(function (f) {
      return normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f);
    });
    return !hasExcluded || hasInclusion;
  });
  var sortedFields = fieldsWithoutExcluded.sort(function (left, right) {
    var normalizedLeft = left.name.toLowerCase();
    var normalizedRight = right.name.toLowerCase();
    var leftHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(function (f) {
      return normalizedLeft.startsWith(f) || normalizedLeft.endsWith(f);
    });
    var rightHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(function (f) {
      return normalizedRight.startsWith(f) || normalizedRight.endsWith(f);
    });

    if (leftHasInclusion !== rightHasInclusion) {
      if (leftHasInclusion === -1) {
        // Elements that do not have the inclusion list should go after those that do.
        return 1;
      } else if (rightHasInclusion === -1) {
        // Elements that do have the inclusion list should go before those that don't.
        return -1;
      } // Compare based on order in the inclusion list


      return leftHasInclusion - rightHasInclusion;
    } // Compare based on type


    if (left.type !== right.type) {
      if (left.type === _defaultSettings.ALL_FIELD_TYPES.real) {
        return -1;
      } // left is an integer and right is not
      // and reals come before integers


      return 1;
    } // Finally, order based on the order in the datasets columns


    return left.index - right.index;
  });

  if (sortedFields.length) {
    // There was a best match
    return sortedFields[0];
  } // No matches


  return null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhc2V0LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlQ29sb3IiLCJkYXRhc2V0Q29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJpbmRleCIsImxlbmd0aCIsImRhdGFzZXRDb2xvck1ha2VyIiwiZ2V0TmV3RGF0YXNldENvbG9yIiwiZGF0YXNldHMiLCJwcmVzZXRDb2xvcnMiLCJTdHJpbmciLCJ1c2VkQ29sb3JzIiwiT2JqZWN0IiwidmFsdWVzIiwiZCIsImNvbG9yIiwiZmlsdGVyIiwiYyIsImluY2x1ZGVzIiwibmV4dCIsInZhbHVlIiwiY3JlYXRlTmV3RGF0YUVudHJ5IiwiaW5mbyIsImRhdGEiLCJvcHRzIiwidmFsaWRhdGVkRGF0YSIsImtlcGxlclRhYmxlIiwiS2VwbGVyVGFibGUiLCJpZCIsIkVYQ0xVREVEX0RFRkFVTFRfRklFTERTIiwiTUVUUklDX0RFRkFVTFRfRklFTERTIiwiZmluZERlZmF1bHRDb2xvckZpZWxkIiwiZmllbGRzIiwiZmllbGRQYWlycyIsImZpZWxkc1dpdGhvdXRFeGNsdWRlZCIsImZpZWxkIiwidHlwZSIsIkFMTF9GSUVMRF9UWVBFUyIsInJlYWwiLCJpbnRlZ2VyIiwiZmluZCIsInBhaXIiLCJsYXQiLCJuYW1lIiwibG5nIiwibm9ybWFsaXplZEZpZWxkTmFtZSIsInRvTG93ZXJDYXNlIiwiaGFzRXhjbHVkZWQiLCJmIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiaGFzSW5jbHVzaW9uIiwic29ydGVkRmllbGRzIiwic29ydCIsImxlZnQiLCJyaWdodCIsIm5vcm1hbGl6ZWRMZWZ0Iiwibm9ybWFsaXplZFJpZ2h0IiwibGVmdEhhc0luY2x1c2lvbiIsImZpbmRJbmRleCIsInJpZ2h0SGFzSW5jbHVzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozt3REFrQlVBLGE7O0FBaEJWO0FBQ0E7QUFDQSxJQUFN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QUFDQSxXQUFPZ0IsSUFBSSxDQUFDbEQsS0FBTCxHQUFhbUQsS0FBSyxDQUFDbkQsS0FBMUI7QUFDRCxHQWpDb0IsQ0FBckI7O0FBbUNBLE1BQUlnRCxZQUFZLENBQUMvQyxNQUFqQixFQUF5QjtBQUN2QjtBQUNBLFdBQU8rQyxZQUFZLENBQUMsQ0FBRCxDQUFuQjtBQUNELEdBbkU4RCxDQW9FL0Q7OztBQUNBLFNBQU8sSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAnLi9jb2xvci11dGlscyc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHt2YWxpZGF0ZUlucHV0RGF0YX0gZnJvbSAncHJvY2Vzc29ycy9kYXRhLXByb2Nlc3Nvcic7XG5pbXBvcnQgS2VwbGVyVGFibGUgZnJvbSAnLi90YWJsZS11dGlscy9rZXBsZXItdGFibGUnO1xuXG4vLyBhcHBseSBhIGNvbG9yIGZvciBlYWNoIGRhdGFzZXRcbi8vIHRvIHVzZSBhcyBsYWJlbCBjb2xvcnNcbmNvbnN0IGRhdGFzZXRDb2xvcnMgPSBbXG4gICcjOEYyRkJGJyxcbiAgJyMwMDVDRkYnLFxuICAnI0MwNkM4NCcsXG4gICcjRjhCMTk1JyxcbiAgJyM1NDdBODInLFxuICAnIzNFQUNBOCcsXG4gICcjQTJENEFCJ1xuXS5tYXAoaGV4VG9SZ2IpO1xuXG4vKipcbiAqIFJhbmRvbSBjb2xvciBnZW5lcmF0b3JcbiAqIEByZXR1cm4ge0dlbmVyYXRvcjxpbXBvcnQoJ3JlZHVjZXJzL3R5cGVzJykuUkdCQ29sb3I+fVxuICovXG5mdW5jdGlvbiogZ2VuZXJhdGVDb2xvcigpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKGluZGV4IDwgZGF0YXNldENvbG9ycy5sZW5ndGggKyAxKSB7XG4gICAgaWYgKGluZGV4ID09PSBkYXRhc2V0Q29sb3JzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB5aWVsZCBkYXRhc2V0Q29sb3JzW2luZGV4KytdO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBkYXRhc2V0Q29sb3JNYWtlciA9IGdlbmVyYXRlQ29sb3IoKTtcblxuLyoqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGFzZXQtdXRpbHMnKS5nZXROZXdEYXRhc2V0Q29sb3J9ICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3RGF0YXNldENvbG9yKGRhdGFzZXRzKSB7XG4gIGNvbnN0IHByZXNldENvbG9ycyA9IGRhdGFzZXRDb2xvcnMubWFwKFN0cmluZyk7XG4gIGNvbnN0IHVzZWRDb2xvcnMgPSB1bmlxKE9iamVjdC52YWx1ZXMoZGF0YXNldHMpLm1hcChkID0+IFN0cmluZyhkLmNvbG9yKSkpLmZpbHRlcihjID0+XG4gICAgcHJlc2V0Q29sb3JzLmluY2x1ZGVzKGMpXG4gICk7XG5cbiAgaWYgKHVzZWRDb2xvcnMubGVuZ3RoID09PSBwcmVzZXRDb2xvcnMubGVuZ3RoKSB7XG4gICAgLy8gaWYgd2UgYWxyZWFkeSBkZXBsZXRlZCB0aGUgcG9vbCBvZiBjb2xvclxuICAgIHJldHVybiBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICBsZXQgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIHdoaWxlICh1c2VkQ29sb3JzLmluY2x1ZGVzKFN0cmluZyhjb2xvcikpKSB7XG4gICAgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICByZXR1cm4gY29sb3I7XG59XG5cbi8qKlxuICogVGFrZSBkYXRhc2V0cyBwYXlsb2FkIGZyb20gYWRkRGF0YVRvTWFwLCBjcmVhdGUgZGF0YXNldHMgZW50cnkgc2F2ZSB0byB2aXNTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YXNldC11dGlscycpLmNyZWF0ZU5ld0RhdGFFbnRyeX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5ld0RhdGFFbnRyeSh7aW5mbywgZGF0YSwgLi4ub3B0c30sIGRhdGFzZXRzID0ge30pIHtcbiAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpO1xuICBpZiAoIXZhbGlkYXRlZERhdGEpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBpbmZvID0gaW5mbyB8fCB7fTtcbiAgY29uc3QgY29sb3IgPSBpbmZvLmNvbG9yIHx8IGdldE5ld0RhdGFzZXRDb2xvcihkYXRhc2V0cyk7XG5cbiAgY29uc3Qga2VwbGVyVGFibGUgPSBuZXcgS2VwbGVyVGFibGUoe2luZm8sIGRhdGE6IHZhbGlkYXRlZERhdGEsIGNvbG9yLCAuLi5vcHRzfSk7XG4gIHJldHVybiB7XG4gICAgW2tlcGxlclRhYmxlLmlkXToga2VwbGVyVGFibGVcbiAgfTtcbn1cblxuLyoqXG4gKiBGaWVsZCBuYW1lIHByZWZpeGVzIGFuZCBzdWZmaXhlcyB3aGljaCBzaG91bGQgbm90IGJlIGNvbnNpZGVyZWRcbiAqIGFzIG1ldHJpY3MuIEZpZWxkcyB3aWxsIHN0aWxsIGJlIGluY2x1ZGVkIGlmIGEgJ21ldHJpYyB3b3JkJ1xuICogaXMgZm91bmQgb24gdGhlIGZpZWxkIG5hbWUsIGhvd2V2ZXIuXG4gKi9cbmNvbnN0IEVYQ0xVREVEX0RFRkFVTFRfRklFTERTID0gW1xuICAvLyBTZXJpYWwgbnVtYmVycyBhbmQgaWRlbnRpZmljYXRpb24gbnVtYmVyc1xuICAnX2lkJyxcbiAgJ2lkJyxcbiAgJ2luZGV4JyxcbiAgJ3V1aWQnLFxuICAnZ3VpZCcsXG4gICd1aWQnLFxuICAnZ2lkJyxcbiAgJ3NlcmlhbCcsXG4gIC8vIEdlb2dyYXBoaWMgSURzIGFyZSB1bmxpa2VseSB0byBiZSBpbnRlcmVzdGluZyB0byBjb2xvclxuICAnemlwJyxcbiAgJ2NvZGUnLFxuICAncG9zdCcsXG4gICdyZWdpb24nLFxuICAnZmlwcycsXG4gICdjYmdzJyxcbiAgJ2gzJyxcbiAgJ3MyJyxcbiAgLy8gR2VvZ3JhcGhpYyBjb29yZHMgKGJ1dCBub3Qgei9lbGV2YXRpb24vYWx0aXR1ZGVcbiAgLy8gc2luY2UgdGhhdCBtaWdodCBiZSBhIG1ldHJpYylcbiAgJ2xhdCcsXG4gICdsb24nLFxuICAnbG5nJyxcbiAgJ2xhdGl0dWRlJyxcbiAgJ2xvbmdpdHVkZScsXG4gICdfeCcsXG4gICdfeSdcbl07XG5cbi8qKlxuICogUHJlZml4ZXMgYW5kIHN1ZmZpeGVzIHRoYXQgaW5kaWNhdGUgYSBmaWVsZCBpcyBhIG1ldHJpYy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlc2UgYXJlIGluIG9yZGVyIG9mIHByZWZlcmVuY2UsIGZpcnN0IGJlaW5nXG4gKiBtb3N0IHByZWZlcnJlZC5cbiAqL1xuY29uc3QgTUVUUklDX0RFRkFVTFRfRklFTERTID0gW1xuICAnbWV0cmljJyxcbiAgJ3ZhbHVlJyxcbiAgJ3N1bScsXG4gICdjb3VudCcsXG4gICd1bmlxdWUnLFxuICAnbWVhbicsXG4gICdtb2RlJyxcbiAgJ21lZGlhbicsXG4gICdtYXgnLFxuICAnbWluJyxcbiAgJ2RldmlhdGlvbicsXG4gICd2YXJpYW5jZScsXG4gICdwOTknLFxuICAncDk1JyxcbiAgJ3A3NScsXG4gICdwNTAnLFxuICAncDI1JyxcbiAgJ3AwNScsXG4gIC8vIEFiYnJldmlhdGlvbnMgYXJlIGxlc3MgcHJlZmVycmVkXG4gICdjbnQnLFxuICAndmFsJ1xuXTtcblxuLyoqXG4gKiBDaG9vc2UgYSBmaWVsZCB0byB1c2UgYXMgdGhlIGRlZmF1bHQgY29sb3IgZmllbGQgb2YgYSBsYXllci5cbiAqXG4gKiBUaGUgaGV1cmlzdGljIGlzOlxuICpcbiAqIEZpcnN0LCBleGNsdWRlIGZpZWxkcyB0aGF0IGFyZSBvbiB0aGUgZXhjbHVzaW9uIGxpc3QgYW5kIGRvbid0XG4gKiBoYXZlIG5hbWVzIHRoYXQgc3VnZ2VzdCB0aGV5IGNvbnRhaW4gbWV0cmljcy4gQWxzbyBleGNsdWRlXG4gKiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBibGFuay5cbiAqXG4gKiBOZXh0LCBsb29rIGZvciBhIGZpZWxkIHRoYXQgaXMgb2YgcmVhbCB0eXBlIGFuZCBjb250YWlucyBvbmVcbiAqIG9mIHRoZSBwcmVmZXJyZWQgbmFtZXMgKGluIG9yZGVyIG9mIHRoZSBwcmVmZXJyZWQgbmFtZXMpLlxuICpcbiAqIE5leHQsIGxvb2sgZm9yIGEgZmllbGQgdGhhdCBpcyBvZiBpbnRlZ2VyIHR5cGUgYW5kIGNvbnRhaW5zXG4gKiBvbmUgb2YgdGhlIHByZWZlcnJlZCBuYW1lcyAoaW4gb3JkZXIgb2YgdGhlIHByZWZlcnJlZCBuYW1lcykuXG4gKlxuICogTmV4dCwgbG9vayBmb3IgdGhlIGZpcnN0IGZpZWxkIHRoYXQgaXMgb2YgcmVhbCB0eXBlIChpbiBvcmRlclxuICogb2YgZmllbGQgaW5kZXgpLlxuICpcbiAqIE5leHQsIGxvb2sgZm9yIHRoZSBmaXJzdCBmaWVsZCB0aGF0IGlzIG9mIGludGVnZXIgdHlwZSAoaW5cbiAqIG9yZGVyIG9mIGZpZWxkIGluZGV4KS5cbiAqXG4gKiBJdCdzIHBvc3NpYmxlIG5vIGZpZWxkIHdpbGwgYmUgY2hvc2VuIChpLmUuIGJlY2F1c2UgYWxsIGZpZWxkc1xuICogYXJlIHN0cmluZ3MuKVxuICpcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRGVmYXVsdENvbG9yRmllbGQoe2ZpZWxkcywgZmllbGRQYWlycyA9IFtdfSkge1xuICBjb25zdCBmaWVsZHNXaXRob3V0RXhjbHVkZWQgPSBmaWVsZHMuZmlsdGVyKGZpZWxkID0+IHtcbiAgICBpZiAoZmllbGQudHlwZSAhPT0gQUxMX0ZJRUxEX1RZUEVTLnJlYWwgJiYgZmllbGQudHlwZSAhPT0gQUxMX0ZJRUxEX1RZUEVTLmludGVnZXIpIHtcbiAgICAgIC8vIE9ubHkgc2VsZWN0IG51bWVyaWMgZmllbGRzLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBmaWVsZFBhaXJzLmZpbmQoXG4gICAgICAgIHBhaXIgPT4gcGFpci5wYWlyLmxhdC52YWx1ZSA9PT0gZmllbGQubmFtZSB8fCBwYWlyLnBhaXIubG5nLnZhbHVlID09PSBmaWVsZC5uYW1lXG4gICAgICApXG4gICAgKSB7XG4gICAgICAvLyBEbyBub3QgcGVybWl0IGxhdCwgbG9uIGZpZWxkc1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWVsZE5hbWUgPSBmaWVsZC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG5vcm1hbGl6ZWRGaWVsZE5hbWUgPT09ICcnKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZXhjbHVkZWQgbmFtZSB3aGVuIHRoZSBuYW1lIGlzIGJsYW5rLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBoYXNFeGNsdWRlZCA9IEVYQ0xVREVEX0RFRkFVTFRfRklFTERTLmZpbmQoXG4gICAgICBmID0+IG5vcm1hbGl6ZWRGaWVsZE5hbWUuc3RhcnRzV2l0aChmKSB8fCBub3JtYWxpemVkRmllbGROYW1lLmVuZHNXaXRoKGYpXG4gICAgKTtcbiAgICBjb25zdCBoYXNJbmNsdXNpb24gPSBNRVRSSUNfREVGQVVMVF9GSUVMRFMuZmluZChcbiAgICAgIGYgPT4gbm9ybWFsaXplZEZpZWxkTmFtZS5zdGFydHNXaXRoKGYpIHx8IG5vcm1hbGl6ZWRGaWVsZE5hbWUuZW5kc1dpdGgoZilcbiAgICApO1xuICAgIHJldHVybiAhaGFzRXhjbHVkZWQgfHwgaGFzSW5jbHVzaW9uO1xuICB9KTtcblxuICBjb25zdCBzb3J0ZWRGaWVsZHMgPSBmaWVsZHNXaXRob3V0RXhjbHVkZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkTGVmdCA9IGxlZnQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IHJpZ2h0Lm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBsZWZ0SGFzSW5jbHVzaW9uID0gTUVUUklDX0RFRkFVTFRfRklFTERTLmZpbmRJbmRleChcbiAgICAgIGYgPT4gbm9ybWFsaXplZExlZnQuc3RhcnRzV2l0aChmKSB8fCBub3JtYWxpemVkTGVmdC5lbmRzV2l0aChmKVxuICAgICk7XG4gICAgY29uc3QgcmlnaHRIYXNJbmNsdXNpb24gPSBNRVRSSUNfREVGQVVMVF9GSUVMRFMuZmluZEluZGV4KFxuICAgICAgZiA9PiBub3JtYWxpemVkUmlnaHQuc3RhcnRzV2l0aChmKSB8fCBub3JtYWxpemVkUmlnaHQuZW5kc1dpdGgoZilcbiAgICApO1xuICAgIGlmIChsZWZ0SGFzSW5jbHVzaW9uICE9PSByaWdodEhhc0luY2x1c2lvbikge1xuICAgICAgaWYgKGxlZnRIYXNJbmNsdXNpb24gPT09IC0xKSB7XG4gICAgICAgIC8vIEVsZW1lbnRzIHRoYXQgZG8gbm90IGhhdmUgdGhlIGluY2x1c2lvbiBsaXN0IHNob3VsZCBnbyBhZnRlciB0aG9zZSB0aGF0IGRvLlxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiAocmlnaHRIYXNJbmNsdXNpb24gPT09IC0xKSB7XG4gICAgICAgIC8vIEVsZW1lbnRzIHRoYXQgZG8gaGF2ZSB0aGUgaW5jbHVzaW9uIGxpc3Qgc2hvdWxkIGdvIGJlZm9yZSB0aG9zZSB0aGF0IGRvbid0LlxuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICAvLyBDb21wYXJlIGJhc2VkIG9uIG9yZGVyIGluIHRoZSBpbmNsdXNpb24gbGlzdFxuICAgICAgcmV0dXJuIGxlZnRIYXNJbmNsdXNpb24gLSByaWdodEhhc0luY2x1c2lvbjtcbiAgICB9XG5cbiAgICAvLyBDb21wYXJlIGJhc2VkIG9uIHR5cGVcbiAgICBpZiAobGVmdC50eXBlICE9PSByaWdodC50eXBlKSB7XG4gICAgICBpZiAobGVmdC50eXBlID09PSBBTExfRklFTERfVFlQRVMucmVhbCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICAvLyBsZWZ0IGlzIGFuIGludGVnZXIgYW5kIHJpZ2h0IGlzIG5vdFxuICAgICAgLy8gYW5kIHJlYWxzIGNvbWUgYmVmb3JlIGludGVnZXJzXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5LCBvcmRlciBiYXNlZCBvbiB0aGUgb3JkZXIgaW4gdGhlIGRhdGFzZXRzIGNvbHVtbnNcbiAgICByZXR1cm4gbGVmdC5pbmRleCAtIHJpZ2h0LmluZGV4O1xuICB9KTtcblxuICBpZiAoc29ydGVkRmllbGRzLmxlbmd0aCkge1xuICAgIC8vIFRoZXJlIHdhcyBhIGJlc3QgbWF0Y2hcbiAgICByZXR1cm4gc29ydGVkRmllbGRzWzBdO1xuICB9XG4gIC8vIE5vIG1hdGNoZXNcbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=