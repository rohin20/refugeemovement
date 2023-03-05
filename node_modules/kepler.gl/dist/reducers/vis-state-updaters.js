"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStateWithLayerAndData = updateStateWithLayerAndData;
exports.updateStateOnLayerVisibilityChange = updateStateOnLayerVisibilityChange;
exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTextLabelChangeUpdater = layerTextLabelChangeUpdater;
exports.layerDataIdChangeUpdater = layerDataIdChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.setFilterAnimationTimeUpdater = setFilterAnimationTimeUpdater;
exports.setFilterAnimationWindowUpdater = setFilterAnimationWindowUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.renameDatasetUpdater = renameDatasetUpdater;
exports.closeSpecificMapAtIndex = closeSpecificMapAtIndex;
exports.loadFileStepSuccessUpdater = loadFileStepSuccessUpdater;
exports.loadNextFileUpdater = loadNextFileUpdater;
exports.makeLoadFileTask = makeLoadFileTask;
exports.processFileContentUpdater = processFileContentUpdater;
exports.parseProgress = parseProgress;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.initialFileLoadingProgress = initialFileLoadingProgress;
exports.updateFileLoadingProgressUpdater = updateFileLoadingProgressUpdater;
exports.updateAllLayerDomainData = updateAllLayerDomainData;
exports.updateAnimationDomain = updateAnimationDomain;
exports.setFeaturesUpdater = setFeaturesUpdater;
exports.deleteFeatureUpdater = deleteFeatureUpdater;
exports.setPolygonFilterLayerUpdater = setPolygonFilterLayerUpdater;
exports.sortTableColumnUpdater = sortTableColumnUpdater;
exports.pinTableColumnUpdater = pinTableColumnUpdater;
exports.copyTableColumnUpdater = copyTableColumnUpdater;
exports.toggleEditorVisibilityUpdater = toggleEditorVisibilityUpdater;
exports.setFilterAnimationTimeConfigUpdater = setFilterAnimationTimeConfigUpdater;
exports.setLayerAnimationTimeConfigUpdater = setLayerAnimationTimeConfigUpdater;
exports.setSelectedFeatureUpdater = exports.setEditorModeUpdater = exports.setMapInfoUpdater = exports.applyCPUFilterUpdater = exports.loadFilesErrUpdater = exports.nextFileBatchUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.toggleSplitMapUpdater = exports.mouseMoveUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.duplicateLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.toggleFilterFeatureUpdater = exports.enlargeFilterUpdater = exports.updateLayerAnimationSpeedUpdater = exports.setLayerAnimationTimeUpdater = exports.updateFilterAnimationSpeedUpdater = exports.toggleLayerAnimationControlUpdater = exports.toggleLayerAnimationUpdater = exports.toggleFilterAnimationUpdater = exports.layerColorUIChangeUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = exports.DEFAULT_EDITOR = exports.DEFAULT_ANIMATION_CONFIG = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _window = require("global/window");

var _tasks = require("react-palm/tasks");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _lodash3 = _interopRequireDefault(require("lodash.get"));

var _lodash4 = _interopRequireDefault(require("lodash.xor"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _dataUtils = require("../utils/data-utils");

var _tasks2 = require("../tasks/tasks");

var _visStateActions = require("../actions/vis-state-actions");

var _interactionUtils = require("../utils/interaction-utils");

var _filterUtils = require("../utils/filter-utils");

var _gpuFilterUtils = require("../utils/gpu-filter-utils");

var _datasetUtils = require("../utils/dataset-utils");

var _keplerTable = require("../utils/table-utils/kepler-table");

var _utils = require("../utils/utils");

var _layerUtils = require("../utils/layer-utils");

var _visStateMerger = require("./vis-state-merger");

var _splitMapUtils = require("../utils/split-map-utils");

var _layers = require("../layers");

var _layerFactory = require("../layers/layer-factory");

var _defaultSettings = require("../constants/default-settings");

var _composerHelpers = require("./composer-helpers");

var _schemas = _interopRequireDefault(require("../schemas"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// type imports

/** @typedef {import('./vis-state-updaters').Field} Field */

/** @typedef {import('./vis-state-updaters').Filter} Filter */

/** @typedef {import('./vis-state-updaters').KeplerTable} KeplerTable */

/** @typedef {import('./vis-state-updaters').VisState} VisState */

/** @typedef {import('./vis-state-updaters').Datasets} Datasets */

/** @typedef {import('./vis-state-updaters').AnimationConfig} AnimationConfig */

/** @typedef {import('./vis-state-updaters').Editor} Editor */
// react-palm
// disable capture exception for react-palm call to withTask
(0, _tasks.disableStackCapturing)();
/**
 * Updaters for `visState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 *
 * @public
 * @example
 *
 * import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             visState: visStateUpdaters.enlargeFilterUpdater(
 *               state.keplerGl.foo.visState,
 *               {idx: 0}
 *             )
 *          }
 *        }
 *      };
 *  }
 *  return reducers(state, action);
 * };
 *
 * export default composedReducer;
 */

/* eslint-disable no-unused-vars */
// @ts-ignore

var visStateUpdaters = null;
/* eslint-enable no-unused-vars */

/** @type {AnimationConfig} */

var DEFAULT_ANIMATION_CONFIG = {
  domain: null,
  currentTime: null,
  speed: 1,
  isAnimating: false,
  timeFormat: null,
  timezone: null,
  defaultTimeFormat: null
};
/** @type {Editor} */

exports.DEFAULT_ANIMATION_CONFIG = DEFAULT_ANIMATION_CONFIG;
var DEFAULT_EDITOR = {
  mode: _defaultSettings.EDITOR_MODES.DRAW_POLYGON,
  features: [],
  selectedFeature: null,
  visible: true
};
/**
 * Default initial `visState`
 * @memberof visStateUpdaters
 * @constant
 * @type {VisState}
 * @public
 */

exports.DEFAULT_EDITOR = DEFAULT_EDITOR;
var INITIAL_VIS_STATE = {
  // map info
  mapInfo: {
    title: '',
    description: ''
  },
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],
  // filters
  filters: [],
  filterToBeMerged: [],
  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,
  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,
  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,
  mousePos: {},
  // this is used when user split maps
  splitMaps: [// this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //      layers: {layer_id: true | false}
    //   }
    // ]
  ],
  splitMapsToBeMerged: [],
  // defaults layer classes
  layerClasses: _layers.LayerClasses,
  // default animation
  // time in unix timestamp (milliseconds) (the number of seconds since the Unix Epoch)
  animationConfig: DEFAULT_ANIMATION_CONFIG,
  editor: DEFAULT_EDITOR,
  fileLoading: false,
  fileLoadingProgress: {},
  loaders: [],
  loadOptions: {},
  // visStateMergers
  mergers: _visStateMerger.VIS_STATE_MERGERS,
  // kepler schemas
  schema: _schemas["default"]
};
/**
 * Update state with updated layer and layerData
 * @type {typeof import('./vis-state-updaters').updateStateWithLayerAndData}
 *
 */

exports.INITIAL_VIS_STATE = INITIAL_VIS_STATE;

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;
  return _objectSpread(_objectSpread({}, state), {}, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}

function updateStateOnLayerVisibilityChange(state, layer) {
  var newState = state;

  if (state.splitMaps.length) {
    newState = _objectSpread(_objectSpread({}, state), {}, {
      splitMaps: layer.config.isVisible ? (0, _splitMapUtils.addNewLayersToSplitMap)(state.splitMaps, layer) : (0, _splitMapUtils.removeLayerFromSplitMaps)(state.splitMaps, layer)
    });
  }

  if (layer.config.animation.enabled) {
    newState = updateAnimationDomain(state);
  }

  return newState;
}
/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerConfigChangeUpdater}
 * @returns nextState
 */


function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);

  if (typeof action.newConfig.dataId === 'string') {
    var _action$newConfig = action.newConfig,
        dataId = _action$newConfig.dataId,
        restConfig = (0, _objectWithoutProperties2["default"])(_action$newConfig, ["dataId"]);
    var stateWithDataId = layerDataIdChangeUpdater(state, {
      oldLayer: oldLayer,
      newConfig: {
        dataId: dataId
      }
    });
    var nextLayer = stateWithDataId.layers.find(function (l) {
      return l.id === oldLayer.id;
    });
    return nextLayer && Object.keys(restConfig).length ? layerConfigChangeUpdater(stateWithDataId, {
      oldLayer: nextLayer,
      newConfig: restConfig
    }) : stateWithDataId;
  }

  var newLayer = oldLayer.updateLayerConfig(action.newConfig);
  var layerData; // let newLayer;

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];
    var updateLayerDataResult = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData);
    layerData = updateLayerDataResult.layerData;
    newLayer = updateLayerDataResult.layer;
  }

  var newState = state;

  if ('isVisible' in action.newConfig) {
    newState = updateStateOnLayerVisibilityChange(state, newLayer);
  }

  return updateStateWithLayerAndData(newState, {
    layer: newLayer,
    layerData: layerData,
    idx: idx
  });
}

function addOrRemoveTextLabels(newFields, textLabel) {
  var newTextLabel = textLabel.slice();
  var currentFields = textLabel.map(function (tl) {
    return tl.field && tl.field.name;
  }).filter(function (d) {
    return d;
  });
  var addFields = newFields.filter(function (f) {
    return !currentFields.includes(f.name);
  });
  var deleteFields = currentFields.filter(function (f) {
    return !newFields.find(function (fd) {
      return fd.name === f;
    });
  }); // delete

  newTextLabel = newTextLabel.filter(function (tl) {
    return tl.field && !deleteFields.includes(tl.field.name);
  });
  newTextLabel = !newTextLabel.length ? [_layerFactory.DEFAULT_TEXT_LABEL] : newTextLabel; // add

  newTextLabel = [].concat((0, _toConsumableArray2["default"])(newTextLabel.filter(function (tl) {
    return tl.field;
  })), (0, _toConsumableArray2["default"])(addFields.map(function (af) {
    return _objectSpread(_objectSpread({}, _layerFactory.DEFAULT_TEXT_LABEL), {}, {
      field: af
    });
  })));
  return newTextLabel;
}

function updateTextLabelPropAndValue(idx, prop, value, textLabel) {
  if (!textLabel[idx].hasOwnProperty(prop)) {
    return textLabel;
  }

  var newTextLabel = textLabel.slice();

  if (prop && (value || textLabel.length === 1)) {
    newTextLabel = textLabel.map(function (tl, i) {
      return i === idx ? _objectSpread(_objectSpread({}, tl), {}, (0, _defineProperty2["default"])({}, prop, value)) : tl;
    });
  } else if (prop === 'field' && value === null && textLabel.length > 1) {
    // remove label when field value is set to null
    newTextLabel.splice(idx, 1);
  }

  return newTextLabel;
}
/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerTextLabelChangeUpdater}
 * @returns nextState
 */


function layerTextLabelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      idx = action.idx,
      prop = action.prop,
      value = action.value;
  var textLabel = oldLayer.config.textLabel;
  var newTextLabel = textLabel.slice();

  if (!textLabel[idx] && idx === textLabel.length) {
    // if idx is set to length, add empty text label
    newTextLabel = [].concat((0, _toConsumableArray2["default"])(textLabel), [_layerFactory.DEFAULT_TEXT_LABEL]);
  }

  if (idx === 'all' && prop === 'fields') {
    newTextLabel = addOrRemoveTextLabels(value, textLabel);
  } else {
    newTextLabel = updateTextLabelPropAndValue(idx, prop, value, newTextLabel);
  } // update text label prop and value


  return layerConfigChangeUpdater(state, {
    oldLayer: oldLayer,
    newConfig: {
      textLabel: newTextLabel
    }
  });
}

function validateExistingLayerWithData(dataset, layerClasses, layer) {
  var loadedLayer = (0, _visStateMerger.serializeLayer)(layer);
  return (0, _visStateMerger.validateLayerWithData)(dataset, loadedLayer, layerClasses, {
    allowEmptyColumn: true
  });
}
/**
 * Update layer config dataId
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerDataIdChangeUpdater}
 * @returns nextState
 */


function layerDataIdChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig;
  var dataId = newConfig.dataId;

  if (!oldLayer || !state.datasets[dataId]) {
    return state;
  }

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig({
    dataId: dataId
  }); // this may happen when a layer is new (type: null and no columns) but it's not ready to be saved

  if (newLayer.isValidToSave()) {
    var validated = validateExistingLayerWithData(state.datasets[dataId], state.layerClasses, newLayer); // if cant validate it with data create a new one

    if (!validated) {
      newLayer = new state.layerClasses[oldLayer.type]({
        dataId: dataId,
        id: oldLayer.id
      });
    } else {
      newLayer = validated;
    }
  }

  newLayer = newLayer.updateLayerConfig({
    isVisible: oldLayer.config.isVisible,
    isConfigActive: true
  });
  newLayer.updateLayerDomain(state.datasets);

  var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, undefined),
      layerData = _calculateLayerData.layerData,
      layer = _calculateLayerData.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerTypeChangeUpdater}
 * @public
 */


function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;

  if (!oldLayer) {
    return state;
  }

  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    _window.console.error("".concat(newType, " is not a valid layer type"));

    return state;
  } // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break


  var newLayer = new state.layerClasses[newType]();
  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);
  newLayer.updateLayerDomain(state.datasets);

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });

  if (layer.config.animation.enabled || oldLayer.config.animation.enabled) {
    newState = updateAnimationDomain(newState);
  } // update splitMap layer id


  if (state.splitMaps.length) {
    newState = _objectSpread(_objectSpread({}, newState), {}, {
      splitMaps: newState.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties2["default"])(_settings$layers, [oldId].map(_toPropertyKey));
        return oldId in settings.layers ? _objectSpread(_objectSpread({}, settings), {}, {
          layers: _objectSpread(_objectSpread({}, otherLayers), {}, (0, _defineProperty2["default"])({}, layer.id, oldLayerMap))
        }) : settings;
      })
    });
  }

  return newState;
}
/**
 * Update layer visual channel
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerVisualChannelChangeUpdater}
 * @returns {Object} nextState
 * @public
 */


function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;

  if (!oldLayer.config.dataId) {
    return state;
  }

  var dataset = state.datasets[oldLayer.config.dataId];
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);
  newLayer.updateLayerVisualChannel(dataset, channel);
  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer `visConfig`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerVisConfigChangeUpdater}
 * @public
 */


function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);

  var newVisConfig = _objectSpread(_objectSpread({}, oldLayer.config.visConfig), action.newVisConfig);

  var newLayer = oldLayer.updateLayerConfig({
    visConfig: newVisConfig
  });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  return updateStateWithLayerAndData(state, {
    layer: newLayer,
    idx: idx
  });
}
/**
 * Update filter property
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterAnimationTimeUpdater}
 * @public
 */


function setFilterAnimationTimeUpdater(state, action) {
  return setFilterUpdater(state, action);
}
/**
 * Update filter animation window
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterAnimationWindowUpdater}
 * @public
 */


function setFilterAnimationWindowUpdater(state, _ref2) {
  var id = _ref2.id,
      animationWindow = _ref2.animationWindow;
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f) {
      return f.id === id ? _objectSpread(_objectSpread({}, f), {}, {
        animationWindow: animationWindow
      }) : f;
    })
  });
}
/**
 * Update filter property
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterUpdater}
 * @public
 */


function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value,
      _action$valueIndex = action.valueIndex,
      valueIndex = _action$valueIndex === void 0 ? 0 : _action$valueIndex;
  var oldFilter = state.filters[idx];

  if (!oldFilter) {
    _window.console.error("filters.".concat(idx, " is undefined"));

    return state;
  }

  var newFilter = (0, _utils.set)([prop], value, oldFilter);
  var newState = state;
  var _newFilter = newFilter,
      dataId = _newFilter.dataId; // Ensuring backward compatibility

  var datasetIds = (0, _utils.toArray)(dataId);

  switch (prop) {
    // TODO: Next PR for UI if we update dataId, we need to consider two cases:
    // 1. dataId is empty: create a default filter
    // 2. Add a new dataset id
    case _filterUtils.FILTER_UPDATER_PROPS.dataId:
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.updateFilterDataId)(dataId);
      break;

    case _filterUtils.FILTER_UPDATER_PROPS.name:
      // we are supporting the current functionality
      // TODO: Next PR for UI filter name will only update filter name but it won't have side effects
      // we are gonna use pair of datasets and fieldIdx to update the filter
      var datasetId = newFilter.dataId[valueIndex];

      var _applyFilterFieldName = (0, _filterUtils.applyFilterFieldName)(newFilter, state.datasets[datasetId], value, valueIndex, {
        mergeDomain: false
      }),
          updatedFilter = _applyFilterFieldName.filter,
          newDataset = _applyFilterFieldName.dataset;

      if (!updatedFilter) {
        return state;
      }

      newFilter = updatedFilter;

      if (newFilter.gpu) {
        newFilter = (0, _gpuFilterUtils.setFilterGpuMode)(newFilter, state.filters);
        newFilter = (0, _gpuFilterUtils.assignGpuChannel)(newFilter, state.filters);
      }

      newState = (0, _utils.set)(['datasets', datasetId], newDataset, state); // only filter the current dataset

      break;

    case _filterUtils.FILTER_UPDATER_PROPS.layerId:
      // We need to update only datasetId/s if we have added/removed layers
      // - check for layerId changes (XOR works because of string values)
      // if no differences between layerIds, don't do any filtering
      // @ts-ignore
      var layerIdDifference = (0, _lodash4["default"])(newFilter.layerId, oldFilter.layerId);
      var layerDataIds = (0, _lodash2["default"])(layerIdDifference.map(function (lid) {
        return (0, _lodash3["default"])(state.layers.find(function (l) {
          return l.id === lid;
        }), ['config', 'dataId']);
      }).filter(function (d) {
        return d;
      })); // only filter datasetsIds

      datasetIds = layerDataIds; // Update newFilter dataIds

      var newDataIds = (0, _lodash2["default"])(newFilter.layerId.map(function (lid) {
        return (0, _lodash3["default"])(state.layers.find(function (l) {
          return l.id === lid;
        }), ['config', 'dataId']);
      }).filter(function (d) {
        return d;
      }));
      newFilter = _objectSpread(_objectSpread({}, newFilter), {}, {
        dataId: newDataIds
      });
      break;

    default:
      break;
  }

  var enlargedFilter = state.filters.find(function (f) {
    return f.enlarged;
  });

  if (enlargedFilter && enlargedFilter.id !== newFilter.id) {
    // there should be only one enlarged filter
    newFilter.enlarged = false;
  } // save new filters to newState


  newState = (0, _utils.set)(['filters', idx], newFilter, newState); // if we are currently setting a prop that only requires to filter the current
  // dataset we will pass only the current dataset to applyFiltersToDatasets and
  // updateAllLayerDomainData otherwise we pass the all list of datasets as defined in dataId

  var datasetIdsToFilter = _filterUtils.LIMITED_FILTER_EFFECT_PROPS[prop] ? [datasetIds[valueIndex]] : datasetIds; // filter data

  var filteredDatasets = (0, _filterUtils.applyFiltersToDatasets)(datasetIdsToFilter, newState.datasets, newState.filters, newState.layers);
  newState = (0, _utils.set)(['datasets'], filteredDatasets, newState); // dataId is an array
  // pass only the dataset we need to update

  newState = updateAllLayerDomainData(newState, datasetIdsToFilter, newFilter);
  return newState;
}
/**
 * Set the property of a filter plot
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterPlotUpdater}
 * @public
 */


var setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref3) {
  var idx = _ref3.idx,
      newProp = _ref3.newProp,
      _ref3$valueIndex = _ref3.valueIndex,
      valueIndex = _ref3$valueIndex === void 0 ? 0 : _ref3$valueIndex;

  var newFilter = _objectSpread(_objectSpread({}, state.filters[idx]), newProp);

  var prop = Object.keys(newProp)[0];

  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter); // TODO: plot is not supported in multi dataset filter for now

    if (plotType) {
      newFilter = _objectSpread(_objectSpread(_objectSpread({}, newFilter), (0, _filterUtils.getFilterPlot)(_objectSpread(_objectSpread({}, newFilter), {}, {
        plotType: plotType
      }), state.datasets[newFilter.dataId[valueIndex]])), {}, {
        plotType: plotType
      });
    }
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};
/**
 * Add a new filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').addFilterUpdater}
 * @public
 */


exports.setFilterPlotUpdater = setFilterPlotUpdater;

var addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : _objectSpread(_objectSpread({}, state), {}, {
    filters: [].concat((0, _toConsumableArray2["default"])(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};
/**
 * Set layer color palette ui state
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerColorUIChangeUpdater}
 */


exports.addFilterUpdater = addFilterUpdater;

var layerColorUIChangeUpdater = function layerColorUIChangeUpdater(state, _ref4) {
  var oldLayer = _ref4.oldLayer,
      prop = _ref4.prop,
      newConfig = _ref4.newConfig;
  var oldVixConfig = oldLayer.config.visConfig[prop];
  var newLayer = oldLayer.updateLayerColorUI(prop, newConfig);
  var newVisConfig = newLayer.config.visConfig[prop];

  if (oldVixConfig !== newVisConfig) {
    return layerVisConfigChangeUpdater(state, {
      oldLayer: oldLayer,
      newVisConfig: (0, _defineProperty2["default"])({}, prop, newVisConfig)
    });
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: state.layers.map(function (l) {
      return l.id === oldLayer.id ? newLayer : l;
    })
  });
};
/**
 * Start and end filter animation
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleFilterAnimationUpdater}
 * @public
 */


exports.layerColorUIChangeUpdater = layerColorUIChangeUpdater;

var toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        isAnimating: !f.isAnimating
      }) : f;
    })
  });
};
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerAnimationUpdater}
 * @public
 */


exports.toggleFilterAnimationUpdater = toggleFilterAnimationUpdater;

var toggleLayerAnimationUpdater = function toggleLayerAnimationUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      isAnimating: !state.animationConfig.isAnimating
    })
  });
};
/**
 * Hide and show layer animation control
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerAnimationControlUpdater}
 * @public
 */


exports.toggleLayerAnimationUpdater = toggleLayerAnimationUpdater;

var toggleLayerAnimationControlUpdater = function toggleLayerAnimationControlUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      hideControl: !state.animationConfig.hideControl
    })
  });
};
/**
 * Change filter animation speed
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateFilterAnimationSpeedUpdater}
 * @public
 */


exports.toggleLayerAnimationControlUpdater = toggleLayerAnimationControlUpdater;

var updateFilterAnimationSpeedUpdater = function updateFilterAnimationSpeedUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        speed: action.speed
      }) : f;
    })
  });
};
/**
 * Reset animation config current time to a specified value
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setLayerAnimationTimeUpdater}
 * @public
 *
 */


exports.updateFilterAnimationSpeedUpdater = updateFilterAnimationSpeedUpdater;

var setLayerAnimationTimeUpdater = function setLayerAnimationTimeUpdater(state, _ref5) {
  var value = _ref5.value;
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      currentTime: value
    })
  });
};
/**
 * Update animation speed with the vertical speed slider
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateLayerAnimationSpeedUpdater}
 * @public
 *
 */


exports.setLayerAnimationTimeUpdater = setLayerAnimationTimeUpdater;

var updateLayerAnimationSpeedUpdater = function updateLayerAnimationSpeedUpdater(state, _ref6) {
  var speed = _ref6.speed;
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      speed: speed
    })
  });
};
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').enlargeFilterUpdater}
 * @public
 */


exports.updateLayerAnimationSpeedUpdater = updateLayerAnimationSpeedUpdater;

var enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        enlarged: !f.enlarged
      }) : f;
    })
  });
};
/**
 * Toggles filter feature visibility
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleFilterFeatureUpdater}
 */


exports.enlargeFilterUpdater = enlargeFilterUpdater;

var toggleFilterFeatureUpdater = function toggleFilterFeatureUpdater(state, action) {
  var filter = state.filters[action.idx];
  var isVisible = (0, _lodash3["default"])(filter, ['value', 'properties', 'isVisible']);

  var newFilter = _objectSpread(_objectSpread({}, filter), {}, {
    value: (0, _filterUtils.featureToFilterValue)(filter.value, filter.id, {
      isVisible: !isVisible
    })
  });

  return _objectSpread(_objectSpread({}, state), {}, {
    filters: Object.assign((0, _toConsumableArray2["default"])(state.filters), (0, _defineProperty2["default"])({}, action.idx, newFilter))
  });
};
/**
 * Remove a filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeFilterUpdater}
 * @public
 */


exports.toggleFilterFeatureUpdater = toggleFilterFeatureUpdater;

var removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var _state$filters$idx = state.filters[idx],
      dataId = _state$filters$idx.dataId,
      id = _state$filters$idx.id;
  var newFilters = [].concat((0, _toConsumableArray2["default"])(state.filters.slice(0, idx)), (0, _toConsumableArray2["default"])(state.filters.slice(idx + 1, state.filters.length)));
  var filteredDatasets = (0, _filterUtils.applyFiltersToDatasets)(dataId, state.datasets, newFilters, state.layers);
  var newEditor = (0, _filterUtils.getFilterIdInFeature)(state.editor.selectedFeature) === id ? _objectSpread(_objectSpread({}, state.editor), {}, {
    selectedFeature: null
  }) : state.editor;
  var newState = (0, _utils.set)(['filters'], newFilters, state);
  newState = (0, _utils.set)(['datasets'], filteredDatasets, newState);
  newState = (0, _utils.set)(['editor'], newEditor, newState);
  return updateAllLayerDomainData(newState, dataId, undefined);
};
/**
 * Add a new layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').addLayerUpdater}
 * @public
 */


exports.removeFilterUpdater = removeFilterUpdater;

var addLayerUpdater = function addLayerUpdater(state, action) {
  var newLayer;
  var newLayerData;

  if (action.config) {
    newLayer = (0, _visStateMerger.createLayerFromConfig)(state, action.config);

    if (!newLayer) {
      _window.console.warn('Failed to create layer from config, it usually means the config is not be in correct format', action.config);

      return state;
    }

    var result = (0, _layerUtils.calculateLayerData)(newLayer, state);
    newLayer = result.layer;
    newLayerData = result.layerData;
  } else {
    // create an empty layer with the first available dataset
    var defaultDataset = Object.keys(state.datasets)[0];
    newLayer = new _layers.Layer({
      isVisible: true,
      isConfigActive: true,
      dataId: defaultDataset
    });
    newLayerData = {};
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: [].concat((0, _toConsumableArray2["default"])(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray2["default"])(state.layerData), [newLayerData]),
    layerOrder: [].concat((0, _toConsumableArray2["default"])(state.layerOrder), [state.layerOrder.length]),
    splitMaps: (0, _splitMapUtils.addNewLayersToSplitMap)(state.splitMaps, newLayer)
  });
};
/**
 * remove layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeLayerUpdater}
 * @public
 */


exports.addLayerUpdater = addLayerUpdater;

var removeLayerUpdater = function removeLayerUpdater(state, _ref7) {
  var idx = _ref7.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;
  var layerToRemove = state.layers[idx];
  var newMaps = (0, _splitMapUtils.removeLayerFromSplitMaps)(state.splitMaps, layerToRemove);

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    layers: [].concat((0, _toConsumableArray2["default"])(layers.slice(0, idx)), (0, _toConsumableArray2["default"])(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray2["default"])(layerData.slice(0, idx)), (0, _toConsumableArray2["default"])(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps // TODO: update filters, create helper to remove layer form filter (remove layerid and dataid) if mapped

  });

  return updateAnimationDomain(newState);
};
/**
 * duplicate layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').duplicateLayerUpdater}
 * @public
 */


exports.removeLayerUpdater = removeLayerUpdater;

var duplicateLayerUpdater = function duplicateLayerUpdater(state, _ref8) {
  var idx = _ref8.idx;
  var layers = state.layers;
  var original = state.layers[idx];
  var originalLayerOrderIdx = state.layerOrder.findIndex(function (i) {
    return i === idx;
  });

  if (!original) {
    _window.console.warn("layer.".concat(idx, " is undefined"));

    return state;
  }

  var newLabel = "Copy of ".concat(original.config.label);
  var postfix = 0; // eslint-disable-next-line no-loop-func

  while (layers.find(function (l) {
    return l.config.label === newLabel;
  })) {
    newLabel = "Copy of ".concat(original.config.label, " ").concat(++postfix);
  } // collect layer config from original


  var loadedLayer = (0, _visStateMerger.serializeLayer)(original); // assign new id and label to copied layer

  if (!loadedLayer.config) {
    return state;
  }

  loadedLayer.config.label = newLabel;
  loadedLayer.id = (0, _utils.generateHashId)(_layers.LAYER_ID_LENGTH); // add layer to state

  var nextState = addLayerUpdater(state, {
    config: loadedLayer
  }); // new added layer are at the end, move it to be on top of original layer

  var newLayerOrderIdx = nextState.layerOrder.length - 1;
  var newLayerOrder = (0, _utils.arrayInsert)(nextState.layerOrder.slice(0, newLayerOrderIdx), originalLayerOrderIdx, newLayerOrderIdx);
  nextState = _objectSpread(_objectSpread({}, nextState), {}, {
    layerOrder: newLayerOrder
  });
  return updateAnimationDomain(nextState);
};
/**
 * Reorder layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').reorderLayerUpdater}
 * @public
 */


exports.duplicateLayerUpdater = duplicateLayerUpdater;

var reorderLayerUpdater = function reorderLayerUpdater(state, _ref9) {
  var order = _ref9.order;
  return _objectSpread(_objectSpread({}, state), {}, {
    layerOrder: order
  });
};
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeDatasetUpdater}
 * @public
 */


exports.reorderLayerUpdater = reorderLayerUpdater;

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.dataId;
  var datasets = state.datasets; // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }
  /* eslint-disable no-unused-vars */


  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties2["default"])(_state$datasets, [datasetKey].map(_toPropertyKey));
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      // @ts-ignore
      listOfIndexes.push(index);
    }

    return listOfIndexes;
  }, []); // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref10, idx) {
    var currentState = _ref10.newState,
        indexCounter = _ref10.indexCounter;
    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, {
      idx: currentIndex
    });
    indexCounter++;
    return {
      newState: currentState,
      indexCounter: indexCounter
    };
  }, {
    newState: _objectSpread(_objectSpread({}, state), {}, {
      datasets: newDatasets
    }),
    indexCounter: 0
  }),
      newState = _indexes$reduce.newState; // remove filters


  var filters = state.filters.filter(function (filter) {
    return !filter.dataId.includes(datasetKey);
  }); // update interactionConfig

  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties2["default"])(_config$fieldsToShow, [datasetKey].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    interactionConfig = _objectSpread(_objectSpread({}, interactionConfig), {}, {
      tooltip: _objectSpread(_objectSpread({}, tooltip), {}, {
        config: _objectSpread(_objectSpread({}, config), {}, {
          fieldsToShow: fieldsToShow
        })
      })
    });
  }

  return _objectSpread(_objectSpread({}, newState), {}, {
    filters: filters,
    interactionConfig: interactionConfig
  });
};
/**
 * update layer blending mode
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateLayerBlendingUpdater}
 * @public
 */


exports.removeDatasetUpdater = removeDatasetUpdater;

var updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    layerBlending: action.mode
  });
};
/**
 * Display dataset table in a modal
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').showDatasetTableUpdater}
 * @public
 */


exports.updateLayerBlendingUpdater = updateLayerBlendingUpdater;

var showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    editingDataset: action.dataId
  });
};
/**
 * reset visState to initial State
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').resetMapConfigUpdater}
 * @public
 */


exports.showDatasetTableUpdater = showDatasetTableUpdater;

var resetMapConfigUpdater = function resetMapConfigUpdater(state) {
  return _objectSpread(_objectSpread(_objectSpread({}, INITIAL_VIS_STATE), state.initialState), {}, {
    initialState: state.initialState
  });
};
/**
 * Propagate `visState` reducer with a new configuration. Current config will be override.
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').receiveMapConfigUpdater}
 * @public
 */


exports.resetMapConfigUpdater = resetMapConfigUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref11) {
  var _ref11$payload = _ref11.payload,
      _ref11$payload$config = _ref11$payload.config,
      config = _ref11$payload$config === void 0 ? {} : _ref11$payload$config,
      _ref11$payload$option = _ref11$payload.options,
      options = _ref11$payload$option === void 0 ? {} : _ref11$payload$option;

  if (!config.visState) {
    return state;
  }

  var keepExistingConfig = options.keepExistingConfig; // reset config if keepExistingConfig is falsy

  var mergedState = !keepExistingConfig ? resetMapConfigUpdater(state) : state;

  var _iterator = _createForOfIteratorHelper(state.mergers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var merger = _step.value;

      if ((0, _visStateMerger.isValidMerger)(merger) && config.visState[merger.prop]) {
        mergedState = merger.merge(mergedState, config.visState[merger.prop], true);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return mergedState;
};
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerHoverUpdater}
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var layerHoverUpdater = function layerHoverUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    hoverInfo: action.info
  });
};
/* eslint-enable max-statements */

/**
 * Update `interactionConfig`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').interactionConfigChangeUpdater}
 * @public
 */


exports.layerHoverUpdater = layerHoverUpdater;

function interactionConfigChangeUpdater(state, action) {
  var config = action.config;

  var interactionConfig = _objectSpread(_objectSpread({}, state.interactionConfig), (0, _defineProperty2["default"])({}, config.id, config)); // Don't enable tooltip and brush at the same time
  // but coordinates can be shown at all time


  var contradict = ['brush', 'tooltip'];

  if (contradict.includes(config.id) && config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    contradict.forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = _objectSpread(_objectSpread({}, interactionConfig[k]), {}, {
          enabled: false
        });
      }
    });
  }

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    interactionConfig: interactionConfig
  });

  if (config.id === 'geocoder' && !config.enabled) {
    return removeDatasetUpdater(newState, {
      dataId: 'geocoder_dataset'
    });
  }

  return newState;
}
/**
 * Trigger layer click event with clicked object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerClickUpdater}
 * @public
 */


var layerClickUpdater = function layerClickUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    mousePos: state.interactionConfig.coordinate.enabled ? _objectSpread(_objectSpread({}, state.mousePos), {}, {
      pinned: state.mousePos.pinned ? null : (0, _lodash["default"])(state.mousePos)
    }) : state.mousePos,
    clicked: action.info && action.info.picked ? action.info : null
  });
};
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').mapClickUpdater}
 * @public
 */


exports.layerClickUpdater = layerClickUpdater;

var mapClickUpdater = function mapClickUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    clicked: null
  });
};
/**
 * Trigger map move event
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').mouseMoveUpdater}
 * @public
 */


exports.mapClickUpdater = mapClickUpdater;

var mouseMoveUpdater = function mouseMoveUpdater(state, _ref12) {
  var evt = _ref12.evt;

  if (Object.values(state.interactionConfig).some(function (config) {
    return config.enabled;
  })) {
    return _objectSpread(_objectSpread({}, state), {}, {
      mousePos: _objectSpread(_objectSpread({}, state.mousePos), {}, {
        mousePosition: (0, _toConsumableArray2["default"])(evt.point),
        coordinate: (0, _toConsumableArray2["default"])(evt.lngLat)
      })
    });
  }

  return state;
};
/**
 * Toggle visibility of a layer for a split map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleSplitMapUpdater}
 * @public
 */


exports.mouseMoveUpdater = mouseMoveUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? _objectSpread(_objectSpread({}, state), {}, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: (0, _splitMapUtils.computeSplitMapLayers)(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerForMapUpdater}
 * @public
 */


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

var toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, _ref13) {
  var mapIndex = _ref13.mapIndex,
      layerId = _ref13.layerId;
  var splitMaps = state.splitMaps;
  return _objectSpread(_objectSpread({}, state), {}, {
    splitMaps: splitMaps.map(function (sm, i) {
      return i === mapIndex ? _objectSpread(_objectSpread({}, splitMaps[i]), {}, {
        layers: _objectSpread(_objectSpread({}, splitMaps[i].layers), {}, (0, _defineProperty2["default"])({}, layerId, !splitMaps[i].layers[layerId]))
      }) : sm;
    })
  });
};
/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateVisDataUpdater}
 * @public
 */

/* eslint-disable max-statements */
// eslint-disable-next-line complexity


exports.toggleLayerForMapUpdater = toggleLayerForMapUpdater;

var updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // datasets can be a single data entries or an array of multiple data entries
  var config = action.config,
      options = action.options;
  var datasets = (0, _utils.toArray)(action.datasets);
  var newDataEntries = datasets.reduce(function (accu) {
    var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref14$info = _ref14.info,
        info = _ref14$info === void 0 ? {} : _ref14$info,
        rest = (0, _objectWithoutProperties2["default"])(_ref14, ["info"]);

    return _objectSpread(_objectSpread({}, accu), (0, _datasetUtils.createNewDataEntry)(_objectSpread({
      info: info
    }, rest), state.datasets) || {});
  }, {});
  var dataEmpty = Object.keys(newDataEntries).length < 1; // apply config if passed from action

  var previousState = config ? receiveMapConfigUpdater(state, {
    payload: {
      config: config,
      options: options
    }
  }) : state;

  var mergedState = _objectSpread(_objectSpread({}, previousState), {}, {
    datasets: _objectSpread(_objectSpread({}, previousState.datasets), newDataEntries)
  }); // merge state with config to be merged


  var _iterator2 = _createForOfIteratorHelper(mergedState.mergers),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var merger = _step2.value;

      if ((0, _visStateMerger.isValidMerger)(merger) && merger.toMergeProp && mergedState[merger.toMergeProp]) {
        var toMerge = mergedState[merger.toMergeProp];
        mergedState[merger.toMergeProp] = INITIAL_VIS_STATE[merger.toMergeProp];
        mergedState = merger.merge(mergedState, toMerge);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var newLayers = !dataEmpty ? mergedState.layers.filter(function (l) {
    return l.config.dataId && l.config.dataId in newDataEntries;
  }) : [];

  if (!newLayers.length && (options || {}).autoCreateLayers !== false) {
    // no layer merged, find defaults
    var result = addDefaultLayers(mergedState, newDataEntries);
    mergedState = result.state;
    newLayers = result.newLayers;
  }

  if (mergedState.splitMaps.length) {
    // if map is split, add new layers to splitMaps
    newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId && l.config.dataId in newDataEntries;
    });
    mergedState = _objectSpread(_objectSpread({}, mergedState), {}, {
      splitMaps: (0, _splitMapUtils.addNewLayersToSplitMap)(mergedState.splitMaps, newLayers)
    });
  } // if no tooltips merged add default tooltips


  Object.keys(newDataEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];

    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDataEntries[dataId]);
    }
  });
  var updatedState = updateAllLayerDomainData(mergedState, dataEmpty ? Object.keys(mergedState.datasets) : Object.keys(newDataEntries), undefined); // register layer animation domain,
  // need to be called after layer data is calculated

  updatedState = updateAnimationDomain(updatedState);
  return updatedState;
};
/* eslint-enable max-statements */

/**
 * Rename an existing dataset in `visState`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').renameDatasetUpdater}
 * @public
 */


exports.updateVisDataUpdater = updateVisDataUpdater;

function renameDatasetUpdater(state, action) {
  var dataId = action.dataId,
      label = action.label;
  var datasets = state.datasets;
  var existing = datasets[dataId]; // @ts-ignore

  return existing ? _objectSpread(_objectSpread({}, state), {}, {
    datasets: _objectSpread(_objectSpread({}, datasets), {}, (0, _defineProperty2["default"])({}, dataId, _objectSpread(_objectSpread({}, existing), {}, {
      label: label
    })))
  }) : // No-op if the dataset doesn't exist
  state;
}
/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param {Object} state `visState`
 * @param {Object} action action
 * @returns {Object} nextState
 */


function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;
  var mapLayers = state.splitMaps[indexToRetrieve].layers;
  var layers = state.layers; // update layer visibility

  var newLayers = layers.map(function (layer) {
    return !mapLayers[layer.id] && layer.config.isVisible ? layer.updateLayerConfig({
      // if layer.id is not in mapLayers, it should be inVisible
      isVisible: false
    }) : layer;
  }); // delete map

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: newLayers,
    splitMaps: []
  });
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFilesUpdater}
 * @public
 */


var loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files,
      _action$onFinish = action.onFinish,
      onFinish = _action$onFinish === void 0 ? _visStateActions.loadFilesSuccess : _action$onFinish;

  if (!files.length) {
    return state;
  }

  var fileLoadingProgress = Array.from(files).reduce(function (accu, f, i) {
    return (0, _composerHelpers.merge_)(initialFileLoadingProgress(f, i))(accu);
  }, {});
  var fileLoading = {
    fileCache: [],
    filesToLoad: files,
    onFinish: onFinish
  };
  var nextState = (0, _composerHelpers.merge_)({
    fileLoadingProgress: fileLoadingProgress,
    fileLoading: fileLoading
  })(state);
  return loadNextFileUpdater(nextState);
};
/**
 * Sucessfully loaded one file, move on to the next one
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFileStepSuccessUpdater}
 * @public
 */


exports.loadFilesUpdater = loadFilesUpdater;

function loadFileStepSuccessUpdater(state, action) {
  if (!state.fileLoading) {
    return state;
  }

  var fileName = action.fileName,
      fileCache = action.fileCache;
  var _state$fileLoading = state.fileLoading,
      filesToLoad = _state$fileLoading.filesToLoad,
      onFinish = _state$fileLoading.onFinish;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: {
      percent: 1,
      message: 'Done'
    }
  }); // save processed file to fileCache

  var stateWithCache = (0, _composerHelpers.pick_)('fileLoading')((0, _composerHelpers.merge_)({
    fileCache: fileCache
  }))(stateWithProgress);
  return (0, _tasks.withTask)(stateWithCache, (0, _tasks2.DELAY_TASK)(200).map(filesToLoad.length ? _visStateActions.loadNextFile : function () {
    return onFinish(fileCache);
  }));
} // withTask<T>(state: T, task: any): T

/**
 *
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadNextFileUpdater}
 * @public
 */


function loadNextFileUpdater(state) {
  if (!state.fileLoading) {
    return state;
  }

  var filesToLoad = state.fileLoading.filesToLoad;

  var _filesToLoad = (0, _toArray2["default"])(filesToLoad),
      file = _filesToLoad[0],
      remainingFilesToLoad = _filesToLoad.slice(1); // save filesToLoad to state


  var nextState = (0, _composerHelpers.pick_)('fileLoading')((0, _composerHelpers.merge_)({
    filesToLoad: remainingFilesToLoad
  }))(state);
  var stateWithProgress = updateFileLoadingProgressUpdater(nextState, {
    fileName: file.name,
    progress: {
      percent: 0,
      message: 'loading...'
    }
  });
  var loaders = state.loaders,
      loadOptions = state.loadOptions;
  return (0, _tasks.withTask)(stateWithProgress, makeLoadFileTask(file, nextState.fileLoading.fileCache, loaders, loadOptions));
}

function makeLoadFileTask(file, fileCache) {
  var loaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var loadOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return (0, _tasks2.LOAD_FILE_TASK)({
    file: file,
    fileCache: fileCache,
    loaders: loaders,
    loadOptions: loadOptions
  }).bimap( // prettier ignore
  // success
  function (gen) {
    return (0, _visStateActions.nextFileBatch)({
      gen: gen,
      fileName: file.name,
      onFinish: function onFinish(result) {
        return (0, _visStateActions.processFileContent)({
          content: result,
          fileCache: fileCache
        });
      }
    });
  }, // error
  function (err) {
    return (0, _visStateActions.loadFilesErr)(file.name, err);
  });
}
/**
 *
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').processFileContentUpdater}
 * @public
 */


function processFileContentUpdater(state, action) {
  var _action$payload = action.payload,
      content = _action$payload.content,
      fileCache = _action$payload.fileCache;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: content.fileName,
    progress: {
      percent: 1,
      message: 'processing...'
    }
  });
  return (0, _tasks.withTask)(stateWithProgress, (0, _tasks2.PROCESS_FILE_DATA)({
    content: content,
    fileCache: fileCache
  }).bimap(function (result) {
    return (0, _visStateActions.loadFileStepSuccess)({
      fileName: content.fileName,
      fileCache: result
    });
  }, function (err) {
    return (0, _visStateActions.loadFilesErr)(content.fileName, err);
  }));
}

function parseProgress() {
  var prevProgress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var progress = arguments.length > 1 ? arguments[1] : undefined;

  // This happens when receiving query metadata or other cases we don't
  // have an update for the user.
  if (!progress || !progress.percent) {
    return {};
  }

  return {
    percent: progress.percent
  };
}
/**
 * gets called with payload = AsyncGenerator<???>
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').nextFileBatchUpdater}
 * @public
 */


var nextFileBatchUpdater = function nextFileBatchUpdater(state, _ref15) {
  var _ref15$payload = _ref15.payload,
      gen = _ref15$payload.gen,
      fileName = _ref15$payload.fileName,
      progress = _ref15$payload.progress,
      accumulated = _ref15$payload.accumulated,
      onFinish = _ref15$payload.onFinish;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: parseProgress(state.fileLoadingProgress[fileName], progress)
  });
  return (0, _tasks.withTask)(stateWithProgress, (0, _tasks2.UNWRAP_TASK)(gen.next()).bimap(function (_ref16) {
    var value = _ref16.value,
        done = _ref16.done;
    return done ? onFinish(accumulated) : (0, _visStateActions.nextFileBatch)({
      gen: gen,
      fileName: fileName,
      progress: value.progress,
      accumulated: value,
      onFinish: onFinish
    });
  }, function (err) {
    return (0, _visStateActions.loadFilesErr)(fileName, err);
  }));
};
/**
 * Trigger loading file error
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFilesErrUpdater}
 * @public
 */


exports.nextFileBatchUpdater = nextFileBatchUpdater;

var loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref17) {
  var error = _ref17.error,
      fileName = _ref17.fileName;

  // update ui with error message
  _window.console.warn(error);

  if (!state.fileLoading) {
    return state;
  }

  var _state$fileLoading2 = state.fileLoading,
      filesToLoad = _state$fileLoading2.filesToLoad,
      onFinish = _state$fileLoading2.onFinish,
      fileCache = _state$fileLoading2.fileCache;
  var nextState = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: {
      error: error
    }
  }); // kick off next file or finish

  return (0, _tasks.withTask)(nextState, (0, _tasks2.DELAY_TASK)(200).map(filesToLoad.length ? _visStateActions.loadNextFile : function () {
    return onFinish(fileCache);
  }));
};
/**
 * When select dataset for export, apply cpu filter to selected dataset
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').applyCPUFilterUpdater}
 * @public
 */


exports.loadFilesErrUpdater = loadFilesErrUpdater;

var applyCPUFilterUpdater = function applyCPUFilterUpdater(state, _ref18) {
  var dataId = _ref18.dataId;
  // apply cpuFilter
  var dataIds = (0, _utils.toArray)(dataId);
  return dataIds.reduce(function (accu, id) {
    return (0, _filterUtils.filterDatasetCPU)(accu, id);
  }, state);
};
/**
 * User input to update the info of the map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setMapInfoUpdater}
 * @public
 */


exports.applyCPUFilterUpdater = applyCPUFilterUpdater;

var setMapInfoUpdater = function setMapInfoUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    mapInfo: _objectSpread(_objectSpread({}, state.mapInfo), action.info)
  });
};
/**
 * Helper function to update All layer domain and layer data of state
 * @type {typeof import('./vis-state-updaters').addDefaultLayers}
 */


exports.setMapInfoUpdater = setMapInfoUpdater;

function addDefaultLayers(state, datasets) {
  /** @type {Layer[]} */
  var empty = [];
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    var foundLayers = (0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses);
    return foundLayers && foundLayers.length ? accu.concat(foundLayers) : accu;
  }, empty);
  return {
    state: _objectSpread(_objectSpread({}, state), {}, {
      layers: [].concat((0, _toConsumableArray2["default"])(state.layers), (0, _toConsumableArray2["default"])(defaultLayers)),
      layerOrder: [].concat((0, _toConsumableArray2["default"])(defaultLayers.map(function (_, i) {
        return state.layers.length + i;
      })), (0, _toConsumableArray2["default"])(state.layerOrder))
    }),
    newLayers: defaultLayers
  };
}
/**
 * helper function to find default tooltips
 * @param {Object} state
 * @param {Object} dataset
 * @returns {Object} nextState
 */


function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);

  var merged = _objectSpread(_objectSpread({}, state.interactionConfig.tooltip.config.fieldsToShow), tooltipFields);

  return (0, _utils.set)(['interactionConfig', 'tooltip', 'config', 'fieldsToShow'], merged, state);
}

function initialFileLoadingProgress(file, index) {
  var fileName = file.name || "Untitled File ".concat(index);
  return (0, _defineProperty2["default"])({}, fileName, {
    // percent of current file
    percent: 0,
    message: '',
    fileName: fileName,
    error: null
  });
}

function updateFileLoadingProgressUpdater(state, _ref20) {
  var fileName = _ref20.fileName,
      progress = _ref20.progress;
  return (0, _composerHelpers.pick_)('fileLoadingProgress')((0, _composerHelpers.pick_)(fileName)((0, _composerHelpers.merge_)(progress)))(state);
}
/**
 * Helper function to update layer domains for an array of datasets
 * @type {typeof import('./vis-state-updaters').updateAllLayerDomainData}
 */


function updateAllLayerDomainData(state, dataId, updatedFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerData = [];
  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = updatedFilter && updatedFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets, updatedFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerData.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerData.push(state.layerData[i]);
    }
  });

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    layers: newLayers,
    layerData: newLayerData
  });

  return newState;
}

function updateAnimationDomain(state) {
  // merge all animatable layer domain and update global config
  var animatableLayers = state.layers.filter(function (l) {
    return l.config.isVisible && l.config.animation && l.config.animation.enabled && Array.isArray(l.animationDomain);
  });

  if (!animatableLayers.length) {
    return _objectSpread(_objectSpread({}, state), {}, {
      animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
        domain: null,
        defaultTimeFormat: null
      })
    });
  }

  var mergedDomain = animatableLayers.reduce(function (accu, layer) {
    return [Math.min(accu[0], layer.animationDomain[0]), Math.max(accu[1], layer.animationDomain[1])];
  }, [Number(Infinity), -Infinity]);
  var defaultTimeFormat = (0, _filterUtils.getTimeWidgetTitleFormatter)(mergedDomain);
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      currentTime: (0, _filterUtils.isInRange)(state.animationConfig.currentTime, mergedDomain) ? state.animationConfig.currentTime : mergedDomain[0],
      domain: mergedDomain,
      defaultTimeFormat: defaultTimeFormat
    })
  });
}
/**
 * Update the status of the editor
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setEditorModeUpdater}
 */


var setEditorModeUpdater = function setEditorModeUpdater(state, _ref21) {
  var mode = _ref21.mode;
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      mode: mode,
      selectedFeature: null
    })
  });
}; // const featureToFilterValue = (feature) => ({...feature, id: feature.id});

/**
 * Update editor features
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFeaturesUpdater}
 */


exports.setEditorModeUpdater = setEditorModeUpdater;

function setFeaturesUpdater(state, _ref22) {
  var _ref22$features = _ref22.features,
      features = _ref22$features === void 0 ? [] : _ref22$features;
  var lastFeature = features.length && features[features.length - 1];

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      // only save none filter features to editor
      features: features.filter(function (f) {
        return !(0, _filterUtils.getFilterIdInFeature)(f);
      }),
      mode: lastFeature && lastFeature.properties.isClosed ? _defaultSettings.EDITOR_MODES.EDIT : state.editor.mode
    })
  }); // Retrieve existing feature


  var selectedFeature = state.editor.selectedFeature; // If no feature is selected we can simply return since no operations

  if (!selectedFeature) {
    return newState;
  } // TODO: check if the feature has changed


  var feature = features.find(function (f) {
    return f.id === selectedFeature.id;
  }); // if feature is part of a filter

  var filterId = feature && (0, _filterUtils.getFilterIdInFeature)(feature);

  if (filterId && feature) {
    var featureValue = (0, _filterUtils.featureToFilterValue)(feature, filterId);
    var filterIdx = state.filters.findIndex(function (fil) {
      return fil.id === filterId;
    });
    return setFilterUpdater(newState, {
      idx: filterIdx,
      prop: 'value',
      value: featureValue
    });
  }

  return newState;
}
/**
 * Set the current selected feature
 * @memberof uiStateUpdaters
 * @type {typeof import('./vis-state-updaters').setSelectedFeatureUpdater}
 */


var setSelectedFeatureUpdater = function setSelectedFeatureUpdater(state, _ref23) {
  var feature = _ref23.feature;
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      selectedFeature: feature
    })
  });
};
/**
 * Delete existing feature from filters
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').deleteFeatureUpdater}
 */


exports.setSelectedFeatureUpdater = setSelectedFeatureUpdater;

function deleteFeatureUpdater(state, _ref24) {
  var feature = _ref24.feature;

  if (!feature) {
    return state;
  }

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      selectedFeature: null
    })
  });

  if ((0, _filterUtils.getFilterIdInFeature)(feature)) {
    var filterIdx = newState.filters.findIndex(function (f) {
      return f.id === (0, _filterUtils.getFilterIdInFeature)(feature);
    });
    return filterIdx > -1 ? removeFilterUpdater(newState, {
      idx: filterIdx
    }) : newState;
  } // modify editor object


  var newEditor = _objectSpread(_objectSpread({}, state.editor), {}, {
    features: state.editor.features.filter(function (f) {
      return f.id !== feature.id;
    }),
    selectedFeature: null
  });

  return _objectSpread(_objectSpread({}, state), {}, {
    editor: newEditor
  });
}
/**
 * Toggle feature as layer filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setPolygonFilterLayerUpdater}
 */


function setPolygonFilterLayerUpdater(state, payload) {
  var layer = payload.layer,
      feature = payload.feature;
  var filterId = (0, _filterUtils.getFilterIdInFeature)(feature); // let newFilter = null;

  var filterIdx;
  var newLayerId = [layer.id];
  var newState = state; // If polygon filter already exists, we need to find out if the current layer is already included

  if (filterId) {
    filterIdx = state.filters.findIndex(function (f) {
      return f.id === filterId;
    });

    if (!state.filters[filterIdx]) {
      // what if filter doesn't exist?... not possible.
      // because features in the editor is passed in from filters and editors.
      // but we will move this feature back to editor just in case
      var noneFilterFeature = _objectSpread(_objectSpread({}, feature), {}, {
        properties: _objectSpread(_objectSpread({}, feature.properties), {}, {
          filterId: null
        })
      });

      return _objectSpread(_objectSpread({}, state), {}, {
        editor: _objectSpread(_objectSpread({}, state.editor), {}, {
          features: [].concat((0, _toConsumableArray2["default"])(state.editor.features), [noneFilterFeature]),
          selectedFeature: noneFilterFeature
        })
      });
    }

    var filter = state.filters[filterIdx];
    var _filter$layerId = filter.layerId,
        layerId = _filter$layerId === void 0 ? [] : _filter$layerId;
    var isLayerIncluded = layerId.includes(layer.id);
    newLayerId = isLayerIncluded ? // if layer is included, remove it
    layerId.filter(function (l) {
      return l !== layer.id;
    }) : [].concat((0, _toConsumableArray2["default"])(layerId), [layer.id]);
  } else {
    // if we haven't create the polygon filter, create it
    var newFilter = (0, _filterUtils.generatePolygonFilter)([], feature);
    filterIdx = state.filters.length; // add feature, remove feature from eidtor

    newState = _objectSpread(_objectSpread({}, state), {}, {
      filters: [].concat((0, _toConsumableArray2["default"])(state.filters), [newFilter]),
      editor: _objectSpread(_objectSpread({}, state.editor), {}, {
        features: state.editor.features.filter(function (f) {
          return f.id !== feature.id;
        }),
        selectedFeature: newFilter.value
      })
    });
  }

  return setFilterUpdater(newState, {
    idx: filterIdx,
    prop: 'layerId',
    value: newLayerId
  });
}
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').sortTableColumnUpdater}
 * @public
 */


function sortTableColumnUpdater(state, _ref25) {
  var dataId = _ref25.dataId,
      column = _ref25.column,
      mode = _ref25.mode;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var sortMode = mode;

  if (!sortMode) {
    var currentMode = (0, _lodash3["default"])(dataset, ['sortColumn', column]); // @ts-ignore - should be fixable in a TS file

    sortMode = currentMode ? Object.keys(_defaultSettings.SORT_ORDER).find(function (m) {
      return m !== currentMode;
    }) : _defaultSettings.SORT_ORDER.ASCENDING;
  }

  var sorted = (0, _keplerTable.sortDatasetByColumn)(dataset, column, sortMode);
  return (0, _utils.set)(['datasets', dataId], sorted, state);
}
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').pinTableColumnUpdater}
 * @public
 */


function pinTableColumnUpdater(state, _ref26) {
  var dataId = _ref26.dataId,
      column = _ref26.column;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var field = dataset.fields.find(function (f) {
    return f.name === column;
  });

  if (!field) {
    return state;
  }

  var pinnedColumns;

  if (Array.isArray(dataset.pinnedColumns) && dataset.pinnedColumns.includes(field.name)) {
    // unpin it
    pinnedColumns = dataset.pinnedColumns.filter(function (co) {
      return co !== field.name;
    });
  } else {
    pinnedColumns = (dataset.pinnedColumns || []).concat(field.name);
  }

  return (0, _utils.set)(['datasets', dataId, 'pinnedColumns'], pinnedColumns, state);
}
/**
 * Copy column content as strings
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').copyTableColumnUpdater}
 * @public
 */


function copyTableColumnUpdater(state, _ref27) {
  var dataId = _ref27.dataId,
      column = _ref27.column;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var fieldIdx = dataset.fields.findIndex(function (f) {
    return f.name === column;
  });

  if (fieldIdx < 0) {
    return state;
  }

  var type = dataset.fields[fieldIdx].type;
  var text = dataset.dataContainer.map(function (row) {
    return (0, _dataUtils.parseFieldValue)(row.valueAt(fieldIdx), type);
  }, true).join('\n');
  (0, _copyToClipboard["default"])(text);
  return state;
}
/**
 * Update editor
 * @type {typeof import('./vis-state-updaters').toggleEditorVisibilityUpdater}
 */


function toggleEditorVisibilityUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      visible: !state.editor.visible
    })
  });
}

function setFilterAnimationTimeConfigUpdater(state, _ref28) {
  var idx = _ref28.idx,
      config = _ref28.config;
  var oldFilter = state.filters[idx];

  if (!oldFilter) {
    _window.console.error("filters.".concat(idx, " is undefined"));

    return state;
  }

  if (oldFilter.type !== _defaultSettings.FILTER_TYPES.timeRange) {
    _window.console.error("setFilterAnimationTimeConfig can only be called to update a time filter. check filter.type === 'timeRange'");

    return state;
  }

  var updates = checkTimeConfigArgs(config);
  return (0, _composerHelpers.pick_)('filters')((0, _composerHelpers.swap_)((0, _composerHelpers.merge_)(updates)(oldFilter)))(state);
}

function checkTimeConfigArgs(config) {
  var allowed = ['timeFormat', 'timezone'];
  return Object.keys(config).reduce(function (accu, prop) {
    if (!allowed.includes(prop)) {
      _window.console.error("setLayerAnimationTimeConfig takes timeFormat and/or timezone as options, found ".concat(prop));

      return accu;
    } // here we are NOT checking if timezone or timeFormat input is valid


    accu[prop] = config[prop];
    return accu;
  }, {});
}
/**
 * Update editor
 * @type {typeof import('./vis-state-updaters').setLayerAnimationTimeConfigUpdater}
 */


function setLayerAnimationTimeConfigUpdater(state, _ref29) {
  var config = _ref29.config;

  if (!config) {
    return state;
  }

  var updates = checkTimeConfigArgs(config);
  return (0, _composerHelpers.pick_)('animationConfig')((0, _composerHelpers.merge_)(updates))(state);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsidmlzU3RhdGVVcGRhdGVycyIsIkRFRkFVTFRfQU5JTUFUSU9OX0NPTkZJRyIsImRvbWFpbiIsImN1cnJlbnRUaW1lIiwic3BlZWQiLCJpc0FuaW1hdGluZyIsInRpbWVGb3JtYXQiLCJ0aW1lem9uZSIsImRlZmF1bHRUaW1lRm9ybWF0IiwiREVGQVVMVF9FRElUT1IiLCJtb2RlIiwiRURJVE9SX01PREVTIiwiRFJBV19QT0xZR09OIiwiZmVhdHVyZXMiLCJzZWxlY3RlZEZlYXR1cmUiLCJ2aXNpYmxlIiwiSU5JVElBTF9WSVNfU1RBVEUiLCJtYXBJbmZvIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImxheWVycyIsImxheWVyRGF0YSIsImxheWVyVG9CZU1lcmdlZCIsImxheWVyT3JkZXIiLCJmaWx0ZXJzIiwiZmlsdGVyVG9CZU1lcmdlZCIsImRhdGFzZXRzIiwiZWRpdGluZ0RhdGFzZXQiLCJ1bmRlZmluZWQiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsImxheWVyQmxlbmRpbmciLCJob3ZlckluZm8iLCJjbGlja2VkIiwibW91c2VQb3MiLCJzcGxpdE1hcHMiLCJzcGxpdE1hcHNUb0JlTWVyZ2VkIiwibGF5ZXJDbGFzc2VzIiwiTGF5ZXJDbGFzc2VzIiwiYW5pbWF0aW9uQ29uZmlnIiwiZWRpdG9yIiwiZmlsZUxvYWRpbmciLCJmaWxlTG9hZGluZ1Byb2dyZXNzIiwibG9hZGVycyIsImxvYWRPcHRpb25zIiwibWVyZ2VycyIsIlZJU19TVEFURV9NRVJHRVJTIiwic2NoZW1hIiwiS2VwbGVyR0xTY2hlbWEiLCJ1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEiLCJzdGF0ZSIsImxheWVyIiwiaWR4IiwibWFwIiwibHlyIiwiaSIsImQiLCJ1cGRhdGVTdGF0ZU9uTGF5ZXJWaXNpYmlsaXR5Q2hhbmdlIiwibmV3U3RhdGUiLCJsZW5ndGgiLCJjb25maWciLCJpc1Zpc2libGUiLCJhbmltYXRpb24iLCJlbmFibGVkIiwidXBkYXRlQW5pbWF0aW9uRG9tYWluIiwibGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyIiwiYWN0aW9uIiwib2xkTGF5ZXIiLCJmaW5kSW5kZXgiLCJsIiwiaWQiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJuZXdDb25maWciLCJkYXRhSWQiLCJyZXN0Q29uZmlnIiwic3RhdGVXaXRoRGF0YUlkIiwibGF5ZXJEYXRhSWRDaGFuZ2VVcGRhdGVyIiwibmV4dExheWVyIiwiZmluZCIsIm5ld0xheWVyIiwidXBkYXRlTGF5ZXJDb25maWciLCJzaG91bGRDYWxjdWxhdGVMYXllckRhdGEiLCJvbGRMYXllckRhdGEiLCJ1cGRhdGVMYXllckRhdGFSZXN1bHQiLCJhZGRPclJlbW92ZVRleHRMYWJlbHMiLCJuZXdGaWVsZHMiLCJ0ZXh0TGFiZWwiLCJuZXdUZXh0TGFiZWwiLCJzbGljZSIsImN1cnJlbnRGaWVsZHMiLCJ0bCIsImZpZWxkIiwibmFtZSIsImZpbHRlciIsImFkZEZpZWxkcyIsImYiLCJpbmNsdWRlcyIsImRlbGV0ZUZpZWxkcyIsImZkIiwiREVGQVVMVF9URVhUX0xBQkVMIiwiYWYiLCJ1cGRhdGVUZXh0TGFiZWxQcm9wQW5kVmFsdWUiLCJwcm9wIiwidmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsInNwbGljZSIsImxheWVyVGV4dExhYmVsQ2hhbmdlVXBkYXRlciIsInZhbGlkYXRlRXhpc3RpbmdMYXllcldpdGhEYXRhIiwiZGF0YXNldCIsImxvYWRlZExheWVyIiwiYWxsb3dFbXB0eUNvbHVtbiIsImlzVmFsaWRUb1NhdmUiLCJ2YWxpZGF0ZWQiLCJ0eXBlIiwiaXNDb25maWdBY3RpdmUiLCJ1cGRhdGVMYXllckRvbWFpbiIsImxheWVyVHlwZUNoYW5nZVVwZGF0ZXIiLCJuZXdUeXBlIiwib2xkSWQiLCJDb25zb2xlIiwiZXJyb3IiLCJhc3NpZ25Db25maWdUb0xheWVyIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJzZXR0aW5ncyIsIm9sZExheWVyTWFwIiwib3RoZXJMYXllcnMiLCJsYXllclZpc3VhbENoYW5uZWxDaGFuZ2VVcGRhdGVyIiwiY2hhbm5lbCIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbCIsImxheWVyVmlzQ29uZmlnQ2hhbmdlVXBkYXRlciIsIm5ld1Zpc0NvbmZpZyIsInZpc0NvbmZpZyIsInNldEZpbHRlckFuaW1hdGlvblRpbWVVcGRhdGVyIiwic2V0RmlsdGVyVXBkYXRlciIsInNldEZpbHRlckFuaW1hdGlvbldpbmRvd1VwZGF0ZXIiLCJhbmltYXRpb25XaW5kb3ciLCJ2YWx1ZUluZGV4Iiwib2xkRmlsdGVyIiwibmV3RmlsdGVyIiwiZGF0YXNldElkcyIsIkZJTFRFUl9VUERBVEVSX1BST1BTIiwiZGF0YXNldElkIiwibWVyZ2VEb21haW4iLCJ1cGRhdGVkRmlsdGVyIiwibmV3RGF0YXNldCIsImdwdSIsImxheWVySWQiLCJsYXllcklkRGlmZmVyZW5jZSIsImxheWVyRGF0YUlkcyIsImxpZCIsIm5ld0RhdGFJZHMiLCJlbmxhcmdlZEZpbHRlciIsImVubGFyZ2VkIiwiZGF0YXNldElkc1RvRmlsdGVyIiwiTElNSVRFRF9GSUxURVJfRUZGRUNUX1BST1BTIiwiZmlsdGVyZWREYXRhc2V0cyIsInVwZGF0ZUFsbExheWVyRG9tYWluRGF0YSIsInNldEZpbHRlclBsb3RVcGRhdGVyIiwibmV3UHJvcCIsInBsb3RUeXBlIiwiYWRkRmlsdGVyVXBkYXRlciIsImxheWVyQ29sb3JVSUNoYW5nZVVwZGF0ZXIiLCJvbGRWaXhDb25maWciLCJ1cGRhdGVMYXllckNvbG9yVUkiLCJ0b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyIiwidG9nZ2xlTGF5ZXJBbmltYXRpb25VcGRhdGVyIiwidG9nZ2xlTGF5ZXJBbmltYXRpb25Db250cm9sVXBkYXRlciIsImhpZGVDb250cm9sIiwidXBkYXRlRmlsdGVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyIiwic2V0TGF5ZXJBbmltYXRpb25UaW1lVXBkYXRlciIsInVwZGF0ZUxheWVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyIiwiZW5sYXJnZUZpbHRlclVwZGF0ZXIiLCJ0b2dnbGVGaWx0ZXJGZWF0dXJlVXBkYXRlciIsImFzc2lnbiIsInJlbW92ZUZpbHRlclVwZGF0ZXIiLCJuZXdGaWx0ZXJzIiwibmV3RWRpdG9yIiwiYWRkTGF5ZXJVcGRhdGVyIiwibmV3TGF5ZXJEYXRhIiwid2FybiIsInJlc3VsdCIsImRlZmF1bHREYXRhc2V0IiwiTGF5ZXIiLCJyZW1vdmVMYXllclVwZGF0ZXIiLCJsYXllclRvUmVtb3ZlIiwibmV3TWFwcyIsInBpZCIsImlzTGF5ZXJIb3ZlcmVkIiwiZHVwbGljYXRlTGF5ZXJVcGRhdGVyIiwib3JpZ2luYWwiLCJvcmlnaW5hbExheWVyT3JkZXJJZHgiLCJuZXdMYWJlbCIsImxhYmVsIiwicG9zdGZpeCIsIkxBWUVSX0lEX0xFTkdUSCIsIm5leHRTdGF0ZSIsIm5ld0xheWVyT3JkZXJJZHgiLCJuZXdMYXllck9yZGVyIiwicmVvcmRlckxheWVyVXBkYXRlciIsIm9yZGVyIiwicmVtb3ZlRGF0YXNldFVwZGF0ZXIiLCJkYXRhc2V0S2V5IiwibmV3RGF0YXNldHMiLCJpbmRleGVzIiwicmVkdWNlIiwibGlzdE9mSW5kZXhlcyIsImluZGV4IiwicHVzaCIsImN1cnJlbnRTdGF0ZSIsImluZGV4Q291bnRlciIsImN1cnJlbnRJbmRleCIsInRvb2x0aXAiLCJmaWVsZHNUb1Nob3ciLCJmaWVsZHMiLCJ1cGRhdGVMYXllckJsZW5kaW5nVXBkYXRlciIsInNob3dEYXRhc2V0VGFibGVVcGRhdGVyIiwicmVzZXRNYXBDb25maWdVcGRhdGVyIiwiaW5pdGlhbFN0YXRlIiwicmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIiLCJwYXlsb2FkIiwib3B0aW9ucyIsInZpc1N0YXRlIiwia2VlcEV4aXN0aW5nQ29uZmlnIiwibWVyZ2VkU3RhdGUiLCJtZXJnZXIiLCJtZXJnZSIsImxheWVySG92ZXJVcGRhdGVyIiwiaW5mbyIsImludGVyYWN0aW9uQ29uZmlnQ2hhbmdlVXBkYXRlciIsImNvbnRyYWRpY3QiLCJmb3JFYWNoIiwiayIsImxheWVyQ2xpY2tVcGRhdGVyIiwiY29vcmRpbmF0ZSIsInBpbm5lZCIsInBpY2tlZCIsIm1hcENsaWNrVXBkYXRlciIsIm1vdXNlTW92ZVVwZGF0ZXIiLCJldnQiLCJ2YWx1ZXMiLCJzb21lIiwibW91c2VQb3NpdGlvbiIsInBvaW50IiwibG5nTGF0IiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIiwiY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgiLCJ0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIiLCJtYXBJbmRleCIsInNtIiwidXBkYXRlVmlzRGF0YVVwZGF0ZXIiLCJuZXdEYXRhRW50cmllcyIsImFjY3UiLCJyZXN0IiwiZGF0YUVtcHR5IiwicHJldmlvdXNTdGF0ZSIsInRvTWVyZ2VQcm9wIiwidG9NZXJnZSIsIm5ld0xheWVycyIsImF1dG9DcmVhdGVMYXllcnMiLCJhZGREZWZhdWx0TGF5ZXJzIiwidG9vbHRpcEZpZWxkcyIsIkFycmF5IiwiaXNBcnJheSIsImFkZERlZmF1bHRUb29sdGlwcyIsInVwZGF0ZWRTdGF0ZSIsInJlbmFtZURhdGFzZXRVcGRhdGVyIiwiZXhpc3RpbmciLCJpbmRleFRvUmV0cmlldmUiLCJtYXBMYXllcnMiLCJsb2FkRmlsZXNVcGRhdGVyIiwiZmlsZXMiLCJvbkZpbmlzaCIsImxvYWRGaWxlc1N1Y2Nlc3MiLCJmcm9tIiwiaW5pdGlhbEZpbGVMb2FkaW5nUHJvZ3Jlc3MiLCJmaWxlQ2FjaGUiLCJmaWxlc1RvTG9hZCIsImxvYWROZXh0RmlsZVVwZGF0ZXIiLCJsb2FkRmlsZVN0ZXBTdWNjZXNzVXBkYXRlciIsImZpbGVOYW1lIiwic3RhdGVXaXRoUHJvZ3Jlc3MiLCJ1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlciIsInByb2dyZXNzIiwicGVyY2VudCIsIm1lc3NhZ2UiLCJzdGF0ZVdpdGhDYWNoZSIsImxvYWROZXh0RmlsZSIsImZpbGUiLCJyZW1haW5pbmdGaWxlc1RvTG9hZCIsIm1ha2VMb2FkRmlsZVRhc2siLCJiaW1hcCIsImdlbiIsImNvbnRlbnQiLCJlcnIiLCJwcm9jZXNzRmlsZUNvbnRlbnRVcGRhdGVyIiwicGFyc2VQcm9ncmVzcyIsInByZXZQcm9ncmVzcyIsIm5leHRGaWxlQmF0Y2hVcGRhdGVyIiwiYWNjdW11bGF0ZWQiLCJuZXh0IiwiZG9uZSIsImxvYWRGaWxlc0VyclVwZGF0ZXIiLCJhcHBseUNQVUZpbHRlclVwZGF0ZXIiLCJkYXRhSWRzIiwic2V0TWFwSW5mb1VwZGF0ZXIiLCJlbXB0eSIsImRlZmF1bHRMYXllcnMiLCJmb3VuZExheWVycyIsImNvbmNhdCIsIl8iLCJtZXJnZWQiLCJmaXhlZERvbWFpbiIsImFuaW1hdGFibGVMYXllcnMiLCJhbmltYXRpb25Eb21haW4iLCJtZXJnZWREb21haW4iLCJNYXRoIiwibWluIiwibWF4IiwiTnVtYmVyIiwiSW5maW5pdHkiLCJzZXRFZGl0b3JNb2RlVXBkYXRlciIsInNldEZlYXR1cmVzVXBkYXRlciIsImxhc3RGZWF0dXJlIiwicHJvcGVydGllcyIsImlzQ2xvc2VkIiwiRURJVCIsImZlYXR1cmUiLCJmaWx0ZXJJZCIsImZlYXR1cmVWYWx1ZSIsImZpbHRlcklkeCIsImZpbCIsInNldFNlbGVjdGVkRmVhdHVyZVVwZGF0ZXIiLCJkZWxldGVGZWF0dXJlVXBkYXRlciIsInNldFBvbHlnb25GaWx0ZXJMYXllclVwZGF0ZXIiLCJuZXdMYXllcklkIiwibm9uZUZpbHRlckZlYXR1cmUiLCJpc0xheWVySW5jbHVkZWQiLCJzb3J0VGFibGVDb2x1bW5VcGRhdGVyIiwiY29sdW1uIiwic29ydE1vZGUiLCJjdXJyZW50TW9kZSIsIlNPUlRfT1JERVIiLCJtIiwiQVNDRU5ESU5HIiwic29ydGVkIiwicGluVGFibGVDb2x1bW5VcGRhdGVyIiwicGlubmVkQ29sdW1ucyIsImNvIiwiY29weVRhYmxlQ29sdW1uVXBkYXRlciIsImZpZWxkSWR4IiwidGV4dCIsImRhdGFDb250YWluZXIiLCJyb3ciLCJ2YWx1ZUF0Iiwiam9pbiIsInRvZ2dsZUVkaXRvclZpc2liaWxpdHlVcGRhdGVyIiwic2V0RmlsdGVyQW5pbWF0aW9uVGltZUNvbmZpZ1VwZGF0ZXIiLCJGSUxURVJfVFlQRVMiLCJ0aW1lUmFuZ2UiLCJ1cGRhdGVzIiwiY2hlY2tUaW1lQ29uZmlnQXJncyIsImFsbG93ZWQiLCJzZXRMYXllckFuaW1hdGlvblRpbWVDb25maWdVcGRhdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFRQTs7QUFDQTs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBUUE7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBLElBQU1BLGdCQUFnQixHQUFHLElBQXpCO0FBQ0E7O0FBRUE7O0FBQ08sSUFBTUMsd0JBQXdCLEdBQUc7QUFDdENDLEVBQUFBLE1BQU0sRUFBRSxJQUQ4QjtBQUV0Q0MsRUFBQUEsV0FBVyxFQUFFLElBRnlCO0FBR3RDQyxFQUFBQSxLQUFLLEVBQUUsQ0FIK0I7QUFJdENDLEVBQUFBLFdBQVcsRUFBRSxLQUp5QjtBQUt0Q0MsRUFBQUEsVUFBVSxFQUFFLElBTDBCO0FBTXRDQyxFQUFBQSxRQUFRLEVBQUUsSUFONEI7QUFPdENDLEVBQUFB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Q0FBQzlTLE1BQUQsQ0FBbkM7QUFDQSxTQUFPLDRCQUFNLGlCQUFOLEVBQXlCLDZCQUFPNlMsT0FBUCxDQUF6QixFQUEwQ3ZULEtBQTFDLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7ZGlzYWJsZVN0YWNrQ2FwdHVyaW5nLCB3aXRoVGFza30gZnJvbSAncmVhY3QtcGFsbS90YXNrcyc7XG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcbmltcG9ydCB4b3IgZnJvbSAnbG9kYXNoLnhvcic7XG5pbXBvcnQgY29weSBmcm9tICdjb3B5LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQge3BhcnNlRmllbGRWYWx1ZX0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG4vLyBUYXNrc1xuaW1wb3J0IHtMT0FEX0ZJTEVfVEFTSywgVU5XUkFQX1RBU0ssIFBST0NFU1NfRklMRV9EQVRBLCBERUxBWV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG4vLyBBY3Rpb25zXG5pbXBvcnQge1xuICBsb2FkRmlsZXNFcnIsXG4gIGxvYWRGaWxlc1N1Y2Nlc3MsXG4gIGxvYWRGaWxlU3RlcFN1Y2Nlc3MsXG4gIGxvYWROZXh0RmlsZSxcbiAgbmV4dEZpbGVCYXRjaFxufSBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbi8vIFV0aWxzXG5pbXBvcnQge2ZpbmRGaWVsZHNUb1Nob3csIGdldERlZmF1bHRJbnRlcmFjdGlvbn0gZnJvbSAndXRpbHMvaW50ZXJhY3Rpb24tdXRpbHMnO1xuaW1wb3J0IHtcbiAgYXBwbHlGaWx0ZXJGaWVsZE5hbWUsXG4gIGFwcGx5RmlsdGVyc1RvRGF0YXNldHMsXG4gIGZlYXR1cmVUb0ZpbHRlclZhbHVlLFxuICBGSUxURVJfVVBEQVRFUl9QUk9QUyxcbiAgZmlsdGVyRGF0YXNldENQVSxcbiAgZ2VuZXJhdGVQb2x5Z29uRmlsdGVyLFxuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUsXG4gIGdldEZpbHRlcklkSW5GZWF0dXJlLFxuICBnZXRGaWx0ZXJQbG90LFxuICBnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIsXG4gIGlzSW5SYW5nZSxcbiAgTElNSVRFRF9GSUxURVJfRUZGRUNUX1BST1BTLFxuICB1cGRhdGVGaWx0ZXJEYXRhSWRcbn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7YXNzaWduR3B1Q2hhbm5lbCwgc2V0RmlsdGVyR3B1TW9kZX0gZnJvbSAndXRpbHMvZ3B1LWZpbHRlci11dGlscyc7XG5pbXBvcnQge2NyZWF0ZU5ld0RhdGFFbnRyeX0gZnJvbSAndXRpbHMvZGF0YXNldC11dGlscyc7XG5pbXBvcnQge3NvcnREYXRhc2V0QnlDb2x1bW59IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzL2tlcGxlci10YWJsZSc7XG5pbXBvcnQge3NldCwgdG9BcnJheSwgYXJyYXlJbnNlcnQsIGdlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7Y2FsY3VsYXRlTGF5ZXJEYXRhLCBmaW5kRGVmYXVsdExheWVyfSBmcm9tICd1dGlscy9sYXllci11dGlscyc7XG5cbmltcG9ydCB7XG4gIGlzVmFsaWRNZXJnZXIsXG4gIFZJU19TVEFURV9NRVJHRVJTLFxuICB2YWxpZGF0ZUxheWVyV2l0aERhdGEsXG4gIGNyZWF0ZUxheWVyRnJvbUNvbmZpZyxcbiAgc2VyaWFsaXplTGF5ZXJcbn0gZnJvbSAnLi92aXMtc3RhdGUtbWVyZ2VyJztcblxuaW1wb3J0IHtcbiAgYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcCxcbiAgY29tcHV0ZVNwbGl0TWFwTGF5ZXJzLFxuICByZW1vdmVMYXllckZyb21TcGxpdE1hcHNcbn0gZnJvbSAndXRpbHMvc3BsaXQtbWFwLXV0aWxzJztcblxuaW1wb3J0IHtMYXllciwgTGF5ZXJDbGFzc2VzLCBMQVlFUl9JRF9MRU5HVEh9IGZyb20gJ2xheWVycyc7XG5pbXBvcnQge0RFRkFVTFRfVEVYVF9MQUJFTH0gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuaW1wb3J0IHtFRElUT1JfTU9ERVMsIFNPUlRfT1JERVIsIEZJTFRFUl9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtwaWNrXywgbWVyZ2VfLCBzd2FwX30gZnJvbSAnLi9jb21wb3Nlci1oZWxwZXJzJztcbmltcG9ydCB7cHJvY2Vzc0ZpbGVDb250ZW50fSBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcblxuaW1wb3J0IEtlcGxlckdMU2NoZW1hIGZyb20gJ3NjaGVtYXMnO1xuXG4vLyB0eXBlIGltcG9ydHNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLkZpZWxkfSBGaWVsZCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuRmlsdGVyfSBGaWx0ZXIgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLktlcGxlclRhYmxlfSBLZXBsZXJUYWJsZSAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuVmlzU3RhdGV9IFZpc1N0YXRlICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5EYXRhc2V0c30gRGF0YXNldHMgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLkFuaW1hdGlvbkNvbmZpZ30gQW5pbWF0aW9uQ29uZmlnICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5FZGl0b3J9IEVkaXRvciAqL1xuXG4vLyByZWFjdC1wYWxtXG4vLyBkaXNhYmxlIGNhcHR1cmUgZXhjZXB0aW9uIGZvciByZWFjdC1wYWxtIGNhbGwgdG8gd2l0aFRhc2tcbmRpc2FibGVTdGFja0NhcHR1cmluZygpO1xuXG4vKipcbiAqIFVwZGF0ZXJzIGZvciBgdmlzU3RhdGVgIHJlZHVjZXIuIENhbiBiZSB1c2VkIGluIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGRpcmVjdGx5IG1vZGlmeSBrZXBsZXIuZ2wncyBzdGF0ZS5cbiAqIFJlYWQgbW9yZSBhYm91dCBbVXNpbmcgdXBkYXRlcnNdKC4uL2FkdmFuY2VkLXVzYWdlL3VzaW5nLXVwZGF0ZXJzLm1kKVxuICpcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IGtlcGxlckdsUmVkdWNlciwge3Zpc1N0YXRlVXBkYXRlcnN9IGZyb20gJ2tlcGxlci5nbC9yZWR1Y2Vycyc7XG4gKiAvLyBSb290IFJlZHVjZXJcbiAqIGNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAqICBrZXBsZXJHbDoga2VwbGVyR2xSZWR1Y2VyLFxuICogIGFwcDogYXBwUmVkdWNlclxuICogfSk7XG4gKlxuICogY29uc3QgY29tcG9zZWRSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAqICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgICBjYXNlICdDTElDS19CVVRUT04nOlxuICogICAgICByZXR1cm4ge1xuICogICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgIGtlcGxlckdsOiB7XG4gKiAgICAgICAgICAuLi5zdGF0ZS5rZXBsZXJHbCxcbiAqICAgICAgICAgIGZvbzoge1xuICogICAgICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wuZm9vLFxuICogICAgICAgICAgICAgdmlzU3RhdGU6IHZpc1N0YXRlVXBkYXRlcnMuZW5sYXJnZUZpbHRlclVwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIHN0YXRlLmtlcGxlckdsLmZvby52aXNTdGF0ZSxcbiAqICAgICAgICAgICAgICAge2lkeDogMH1cbiAqICAgICAgICAgICAgIClcbiAqICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICAgIH07XG4gKiAgfVxuICogIHJldHVybiByZWR1Y2VycyhzdGF0ZSwgYWN0aW9uKTtcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29tcG9zZWRSZWR1Y2VyO1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLy8gQHRzLWlnbm9yZVxuY29uc3QgdmlzU3RhdGVVcGRhdGVycyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKiBAdHlwZSB7QW5pbWF0aW9uQ29uZmlnfSAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQU5JTUFUSU9OX0NPTkZJRyA9IHtcbiAgZG9tYWluOiBudWxsLFxuICBjdXJyZW50VGltZTogbnVsbCxcbiAgc3BlZWQ6IDEsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgdGltZUZvcm1hdDogbnVsbCxcbiAgdGltZXpvbmU6IG51bGwsXG4gIGRlZmF1bHRUaW1lRm9ybWF0OiBudWxsXG59O1xuXG4vKiogQHR5cGUge0VkaXRvcn0gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VESVRPUiA9IHtcbiAgbW9kZTogRURJVE9SX01PREVTLkRSQVdfUE9MWUdPTixcbiAgZmVhdHVyZXM6IFtdLFxuICBzZWxlY3RlZEZlYXR1cmU6IG51bGwsXG4gIHZpc2libGU6IHRydWVcbn07XG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGB2aXNTdGF0ZWBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtWaXNTdGF0ZX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfVklTX1NUQVRFID0ge1xuICAvLyBtYXAgaW5mb1xuICBtYXBJbmZvOiB7XG4gICAgdGl0bGU6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJ1xuICB9LFxuICAvLyBsYXllcnNcbiAgbGF5ZXJzOiBbXSxcbiAgbGF5ZXJEYXRhOiBbXSxcbiAgbGF5ZXJUb0JlTWVyZ2VkOiBbXSxcbiAgbGF5ZXJPcmRlcjogW10sXG5cbiAgLy8gZmlsdGVyc1xuICBmaWx0ZXJzOiBbXSxcbiAgZmlsdGVyVG9CZU1lcmdlZDogW10sXG5cbiAgLy8gYSBjb2xsZWN0aW9uIG9mIG11bHRpcGxlIGRhdGFzZXRcbiAgZGF0YXNldHM6IHt9LFxuICBlZGl0aW5nRGF0YXNldDogdW5kZWZpbmVkLFxuXG4gIGludGVyYWN0aW9uQ29uZmlnOiBnZXREZWZhdWx0SW50ZXJhY3Rpb24oKSxcbiAgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkOiB1bmRlZmluZWQsXG5cbiAgbGF5ZXJCbGVuZGluZzogJ25vcm1hbCcsXG4gIGhvdmVySW5mbzogdW5kZWZpbmVkLFxuICBjbGlja2VkOiB1bmRlZmluZWQsXG4gIG1vdXNlUG9zOiB7fSxcblxuICAvLyB0aGlzIGlzIHVzZWQgd2hlbiB1c2VyIHNwbGl0IG1hcHNcbiAgc3BsaXRNYXBzOiBbXG4gICAgLy8gdGhpcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIG9iamVjdHMgdG9cbiAgICAvLyBkZXNjcmliZSB0aGUgc3RhdGUgb2YgbGF5ZXIgYXZhaWxhYmlsaXR5IGFuZCB2aXNpYmlsaXR5IGZvciBlYWNoIG1hcFxuICAgIC8vIFtcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgIGxheWVyczoge2xheWVyX2lkOiB0cnVlIHwgZmFsc2V9XG4gICAgLy8gICB9XG4gICAgLy8gXVxuICBdLFxuICBzcGxpdE1hcHNUb0JlTWVyZ2VkOiBbXSxcblxuICAvLyBkZWZhdWx0cyBsYXllciBjbGFzc2VzXG4gIGxheWVyQ2xhc3NlczogTGF5ZXJDbGFzc2VzLFxuXG4gIC8vIGRlZmF1bHQgYW5pbWF0aW9uXG4gIC8vIHRpbWUgaW4gdW5peCB0aW1lc3RhbXAgKG1pbGxpc2Vjb25kcykgKHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaClcbiAgYW5pbWF0aW9uQ29uZmlnOiBERUZBVUxUX0FOSU1BVElPTl9DT05GSUcsXG5cbiAgZWRpdG9yOiBERUZBVUxUX0VESVRPUixcblxuICBmaWxlTG9hZGluZzogZmFsc2UsXG4gIGZpbGVMb2FkaW5nUHJvZ3Jlc3M6IHt9LFxuXG4gIGxvYWRlcnM6IFtdLFxuICBsb2FkT3B0aW9uczoge30sXG5cbiAgLy8gdmlzU3RhdGVNZXJnZXJzXG4gIG1lcmdlcnM6IFZJU19TVEFURV9NRVJHRVJTLFxuXG4gIC8vIGtlcGxlciBzY2hlbWFzXG4gIHNjaGVtYTogS2VwbGVyR0xTY2hlbWFcbn07XG5cbi8qKlxuICogVXBkYXRlIHN0YXRlIHdpdGggdXBkYXRlZCBsYXllciBhbmQgbGF5ZXJEYXRhXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS51cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGF9XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSkge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogc3RhdGUubGF5ZXJzLm1hcCgobHlyLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXIgOiBseXIpKSxcbiAgICBsYXllckRhdGE6IGxheWVyRGF0YVxuICAgICAgPyBzdGF0ZS5sYXllckRhdGEubWFwKChkLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXJEYXRhIDogZCkpXG4gICAgICA6IHN0YXRlLmxheWVyRGF0YVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGVPbkxheWVyVmlzaWJpbGl0eUNoYW5nZShzdGF0ZSwgbGF5ZXIpIHtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG4gIGlmIChzdGF0ZS5zcGxpdE1hcHMubGVuZ3RoKSB7XG4gICAgbmV3U3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNwbGl0TWFwczogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICAgICAgICA/IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAoc3RhdGUuc3BsaXRNYXBzLCBsYXllcilcbiAgICAgICAgOiByZW1vdmVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUuc3BsaXRNYXBzLCBsYXllcilcbiAgICB9O1xuICB9XG5cbiAgaWYgKGxheWVyLmNvbmZpZy5hbmltYXRpb24uZW5hYmxlZCkge1xuICAgIG5ld1N0YXRlID0gdXBkYXRlQW5pbWF0aW9uRG9tYWluKHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYmFzZSBjb25maWc6IGRhdGFJZCwgbGFiZWwsIGNvbHVtbiwgaXNWaXNpYmxlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyfVxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXJ9ID0gYWN0aW9uO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKGFjdGlvbi5uZXdDb25maWcpO1xuICBpZiAodHlwZW9mIGFjdGlvbi5uZXdDb25maWcuZGF0YUlkID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHtkYXRhSWQsIC4uLnJlc3RDb25maWd9ID0gYWN0aW9uLm5ld0NvbmZpZztcbiAgICBjb25zdCBzdGF0ZVdpdGhEYXRhSWQgPSBsYXllckRhdGFJZENoYW5nZVVwZGF0ZXIoc3RhdGUsIHtcbiAgICAgIG9sZExheWVyLFxuICAgICAgbmV3Q29uZmlnOiB7ZGF0YUlkfVxuICAgIH0pO1xuICAgIGNvbnN0IG5leHRMYXllciA9IHN0YXRlV2l0aERhdGFJZC5sYXllcnMuZmluZChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgICByZXR1cm4gbmV4dExheWVyICYmIE9iamVjdC5rZXlzKHJlc3RDb25maWcpLmxlbmd0aFxuICAgICAgPyBsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGVXaXRoRGF0YUlkLCB7b2xkTGF5ZXI6IG5leHRMYXllciwgbmV3Q29uZmlnOiByZXN0Q29uZmlnfSlcbiAgICAgIDogc3RhdGVXaXRoRGF0YUlkO1xuICB9XG5cbiAgbGV0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoYWN0aW9uLm5ld0NvbmZpZyk7XG5cbiAgbGV0IGxheWVyRGF0YTtcblxuICAvLyBsZXQgbmV3TGF5ZXI7XG4gIGlmIChuZXdMYXllci5zaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gICAgY29uc3QgdXBkYXRlTGF5ZXJEYXRhUmVzdWx0ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSwgb2xkTGF5ZXJEYXRhKTtcblxuICAgIGxheWVyRGF0YSA9IHVwZGF0ZUxheWVyRGF0YVJlc3VsdC5sYXllckRhdGE7XG4gICAgbmV3TGF5ZXIgPSB1cGRhdGVMYXllckRhdGFSZXN1bHQubGF5ZXI7XG4gIH1cblxuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcbiAgaWYgKCdpc1Zpc2libGUnIGluIGFjdGlvbi5uZXdDb25maWcpIHtcbiAgICBuZXdTdGF0ZSA9IHVwZGF0ZVN0YXRlT25MYXllclZpc2liaWxpdHlDaGFuZ2Uoc3RhdGUsIG5ld0xheWVyKTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEobmV3U3RhdGUsIHtcbiAgICBsYXllcjogbmV3TGF5ZXIsXG4gICAgbGF5ZXJEYXRhLFxuICAgIGlkeFxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkT3JSZW1vdmVUZXh0TGFiZWxzKG5ld0ZpZWxkcywgdGV4dExhYmVsKSB7XG4gIGxldCBuZXdUZXh0TGFiZWwgPSB0ZXh0TGFiZWwuc2xpY2UoKTtcblxuICBjb25zdCBjdXJyZW50RmllbGRzID0gdGV4dExhYmVsLm1hcCh0bCA9PiB0bC5maWVsZCAmJiB0bC5maWVsZC5uYW1lKS5maWx0ZXIoZCA9PiBkKTtcblxuICBjb25zdCBhZGRGaWVsZHMgPSBuZXdGaWVsZHMuZmlsdGVyKGYgPT4gIWN1cnJlbnRGaWVsZHMuaW5jbHVkZXMoZi5uYW1lKSk7XG4gIGNvbnN0IGRlbGV0ZUZpZWxkcyA9IGN1cnJlbnRGaWVsZHMuZmlsdGVyKGYgPT4gIW5ld0ZpZWxkcy5maW5kKGZkID0+IGZkLm5hbWUgPT09IGYpKTtcblxuICAvLyBkZWxldGVcbiAgbmV3VGV4dExhYmVsID0gbmV3VGV4dExhYmVsLmZpbHRlcih0bCA9PiB0bC5maWVsZCAmJiAhZGVsZXRlRmllbGRzLmluY2x1ZGVzKHRsLmZpZWxkLm5hbWUpKTtcbiAgbmV3VGV4dExhYmVsID0gIW5ld1RleHRMYWJlbC5sZW5ndGggPyBbREVGQVVMVF9URVhUX0xBQkVMXSA6IG5ld1RleHRMYWJlbDtcblxuICAvLyBhZGRcbiAgbmV3VGV4dExhYmVsID0gW1xuICAgIC4uLm5ld1RleHRMYWJlbC5maWx0ZXIodGwgPT4gdGwuZmllbGQpLFxuICAgIC4uLmFkZEZpZWxkcy5tYXAoYWYgPT4gKHtcbiAgICAgIC4uLkRFRkFVTFRfVEVYVF9MQUJFTCxcbiAgICAgIGZpZWxkOiBhZlxuICAgIH0pKVxuICBdO1xuXG4gIHJldHVybiBuZXdUZXh0TGFiZWw7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRleHRMYWJlbFByb3BBbmRWYWx1ZShpZHgsIHByb3AsIHZhbHVlLCB0ZXh0TGFiZWwpIHtcbiAgaWYgKCF0ZXh0TGFiZWxbaWR4XS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgIHJldHVybiB0ZXh0TGFiZWw7XG4gIH1cblxuICBsZXQgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLnNsaWNlKCk7XG5cbiAgaWYgKHByb3AgJiYgKHZhbHVlIHx8IHRleHRMYWJlbC5sZW5ndGggPT09IDEpKSB7XG4gICAgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLm1hcCgodGwsIGkpID0+IChpID09PSBpZHggPyB7Li4udGwsIFtwcm9wXTogdmFsdWV9IDogdGwpKTtcbiAgfSBlbHNlIGlmIChwcm9wID09PSAnZmllbGQnICYmIHZhbHVlID09PSBudWxsICYmIHRleHRMYWJlbC5sZW5ndGggPiAxKSB7XG4gICAgLy8gcmVtb3ZlIGxhYmVsIHdoZW4gZmllbGQgdmFsdWUgaXMgc2V0IHRvIG51bGxcbiAgICBuZXdUZXh0TGFiZWwuc3BsaWNlKGlkeCwgMSk7XG4gIH1cblxuICByZXR1cm4gbmV3VGV4dExhYmVsO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciBiYXNlIGNvbmZpZzogZGF0YUlkLCBsYWJlbCwgY29sdW1uLCBpc1Zpc2libGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllclRleHRMYWJlbENoYW5nZVVwZGF0ZXJ9XG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVGV4dExhYmVsQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgaWR4LCBwcm9wLCB2YWx1ZX0gPSBhY3Rpb247XG4gIGNvbnN0IHt0ZXh0TGFiZWx9ID0gb2xkTGF5ZXIuY29uZmlnO1xuXG4gIGxldCBuZXdUZXh0TGFiZWwgPSB0ZXh0TGFiZWwuc2xpY2UoKTtcbiAgaWYgKCF0ZXh0TGFiZWxbaWR4XSAmJiBpZHggPT09IHRleHRMYWJlbC5sZW5ndGgpIHtcbiAgICAvLyBpZiBpZHggaXMgc2V0IHRvIGxlbmd0aCwgYWRkIGVtcHR5IHRleHQgbGFiZWxcbiAgICBuZXdUZXh0TGFiZWwgPSBbLi4udGV4dExhYmVsLCBERUZBVUxUX1RFWFRfTEFCRUxdO1xuICB9XG5cbiAgaWYgKGlkeCA9PT0gJ2FsbCcgJiYgcHJvcCA9PT0gJ2ZpZWxkcycpIHtcbiAgICBuZXdUZXh0TGFiZWwgPSBhZGRPclJlbW92ZVRleHRMYWJlbHModmFsdWUsIHRleHRMYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGV4dExhYmVsID0gdXBkYXRlVGV4dExhYmVsUHJvcEFuZFZhbHVlKGlkeCwgcHJvcCwgdmFsdWUsIG5ld1RleHRMYWJlbCk7XG4gIH1cbiAgLy8gdXBkYXRlIHRleHQgbGFiZWwgcHJvcCBhbmQgdmFsdWVcbiAgcmV0dXJuIGxheWVyQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwge1xuICAgIG9sZExheWVyLFxuICAgIG5ld0NvbmZpZzoge3RleHRMYWJlbDogbmV3VGV4dExhYmVsfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFeGlzdGluZ0xheWVyV2l0aERhdGEoZGF0YXNldCwgbGF5ZXJDbGFzc2VzLCBsYXllcikge1xuICBjb25zdCBsb2FkZWRMYXllciA9IHNlcmlhbGl6ZUxheWVyKGxheWVyKTtcbiAgcmV0dXJuIHZhbGlkYXRlTGF5ZXJXaXRoRGF0YShkYXRhc2V0LCBsb2FkZWRMYXllciwgbGF5ZXJDbGFzc2VzLCB7XG4gICAgYWxsb3dFbXB0eUNvbHVtbjogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgY29uZmlnIGRhdGFJZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxheWVyRGF0YUlkQ2hhbmdlVXBkYXRlcn1cbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJEYXRhSWRDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyLCBuZXdDb25maWd9ID0gYWN0aW9uO1xuICBjb25zdCB7ZGF0YUlkfSA9IG5ld0NvbmZpZztcblxuICBpZiAoIW9sZExheWVyIHx8ICFzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG5cbiAgbGV0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe2RhdGFJZH0pO1xuICAvLyB0aGlzIG1heSBoYXBwZW4gd2hlbiBhIGxheWVyIGlzIG5ldyAodHlwZTogbnVsbCBhbmQgbm8gY29sdW1ucykgYnV0IGl0J3Mgbm90IHJlYWR5IHRvIGJlIHNhdmVkXG4gIGlmIChuZXdMYXllci5pc1ZhbGlkVG9TYXZlKCkpIHtcbiAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0ZUV4aXN0aW5nTGF5ZXJXaXRoRGF0YShcbiAgICAgIHN0YXRlLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICBzdGF0ZS5sYXllckNsYXNzZXMsXG4gICAgICBuZXdMYXllclxuICAgICk7XG4gICAgLy8gaWYgY2FudCB2YWxpZGF0ZSBpdCB3aXRoIGRhdGEgY3JlYXRlIGEgbmV3IG9uZVxuICAgIGlmICghdmFsaWRhdGVkKSB7XG4gICAgICBuZXdMYXllciA9IG5ldyBzdGF0ZS5sYXllckNsYXNzZXNbb2xkTGF5ZXIudHlwZV0oe2RhdGFJZCwgaWQ6IG9sZExheWVyLmlkfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0xheWVyID0gdmFsaWRhdGVkO1xuICAgIH1cbiAgfVxuXG4gIG5ld0xheWVyID0gbmV3TGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgIGlzVmlzaWJsZTogb2xkTGF5ZXIuY29uZmlnLmlzVmlzaWJsZSxcbiAgICBpc0NvbmZpZ0FjdGl2ZTogdHJ1ZVxuICB9KTtcblxuICBuZXdMYXllci51cGRhdGVMYXllckRvbWFpbihzdGF0ZS5kYXRhc2V0cyk7XG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB0eXBlLiBQcmV2aWV3cyBsYXllciBjb25maWcgd2lsbCBiZSBjb3BpZWQgaWYgYXBwbGljYWJsZS5cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllclR5cGVDaGFuZ2VVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJUeXBlQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3VHlwZX0gPSBhY3Rpb247XG4gIGlmICghb2xkTGF5ZXIpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qgb2xkSWQgPSBvbGRMYXllci5pZDtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZElkKTtcblxuICBpZiAoIXN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSkge1xuICAgIENvbnNvbGUuZXJyb3IoYCR7bmV3VHlwZX0gaXMgbm90IGEgdmFsaWQgbGF5ZXIgdHlwZWApO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIGdldCBhIG1pbnQgbGF5ZXIsIHdpdGggbmV3IGlkIGFuZCB0eXBlXG4gIC8vIGJlY2F1c2UgZGVjay5nbCB1c2VzIGlkIHRvIG1hdGNoIGJldHdlZW4gbmV3IGFuZCBvbGQgbGF5ZXIuXG4gIC8vIElmIHR5cGUgaGFzIGNoYW5nZWQgYnV0IGlkIGlzIHRoZSBzYW1lLCBpdCB3aWxsIGJyZWFrXG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IHN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSgpO1xuXG4gIG5ld0xheWVyLmFzc2lnbkNvbmZpZ1RvTGF5ZXIob2xkTGF5ZXIuY29uZmlnLCBvbGRMYXllci52aXNDb25maWdTZXR0aW5ncyk7XG5cbiAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oc3RhdGUuZGF0YXNldHMpO1xuICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlKTtcbiAgbGV0IG5ld1N0YXRlID0gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG5cbiAgaWYgKGxheWVyLmNvbmZpZy5hbmltYXRpb24uZW5hYmxlZCB8fCBvbGRMYXllci5jb25maWcuYW5pbWF0aW9uLmVuYWJsZWQpIHtcbiAgICBuZXdTdGF0ZSA9IHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihuZXdTdGF0ZSk7XG4gIH1cblxuICAvLyB1cGRhdGUgc3BsaXRNYXAgbGF5ZXIgaWRcbiAgaWYgKHN0YXRlLnNwbGl0TWFwcy5sZW5ndGgpIHtcbiAgICBuZXdTdGF0ZSA9IHtcbiAgICAgIC4uLm5ld1N0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBuZXdTdGF0ZS5zcGxpdE1hcHMubWFwKHNldHRpbmdzID0+IHtcbiAgICAgICAgY29uc3Qge1tvbGRJZF06IG9sZExheWVyTWFwLCAuLi5vdGhlckxheWVyc30gPSBzZXR0aW5ncy5sYXllcnM7XG4gICAgICAgIHJldHVybiBvbGRJZCBpbiBzZXR0aW5ncy5sYXllcnNcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICAgICAgICAgIGxheWVyczoge1xuICAgICAgICAgICAgICAgIC4uLm90aGVyTGF5ZXJzLFxuICAgICAgICAgICAgICAgIFtsYXllci5pZF06IG9sZExheWVyTWFwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHNldHRpbmdzO1xuICAgICAgfSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB2aXN1YWwgY2hhbm5lbFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXJ9XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXIsIG5ld0NvbmZpZywgY2hhbm5lbH0gPSBhY3Rpb247XG4gIGlmICghb2xkTGF5ZXIuY29uZmlnLmRhdGFJZCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbb2xkTGF5ZXIuY29uZmlnLmRhdGFJZF07XG5cbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgbmV3TGF5ZXIgPSBvbGRMYXllci51cGRhdGVMYXllckNvbmZpZyhuZXdDb25maWcpO1xuXG4gIG5ld0xheWVyLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCBjaGFubmVsKTtcblxuICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSwgb2xkTGF5ZXJEYXRhKTtcblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGB2aXNDb25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3VmlzQ29uZmlnKTtcbiAgY29uc3QgbmV3VmlzQ29uZmlnID0ge1xuICAgIC4uLm9sZExheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgLi4uYWN0aW9uLm5ld1Zpc0NvbmZpZ1xuICB9O1xuXG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe3Zpc0NvbmZpZzogbmV3VmlzQ29uZmlnfSk7XG5cbiAgaWYgKG5ld0xheWVyLnNob3VsZENhbGN1bGF0ZUxheWVyRGF0YShwcm9wcykpIHtcbiAgICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlLCBvbGRMYXllckRhdGEpO1xuICAgIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllcjogbmV3TGF5ZXIsIGlkeH0pO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBmaWx0ZXIgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRGaWx0ZXJBbmltYXRpb25UaW1lVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvblRpbWVVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgcmV0dXJuIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbik7XG59XG5cbi8qKlxuICogVXBkYXRlIGZpbHRlciBhbmltYXRpb24gd2luZG93XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0RmlsdGVyQW5pbWF0aW9uV2luZG93VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvbldpbmRvd1VwZGF0ZXIoc3RhdGUsIHtpZCwgYW5pbWF0aW9uV2luZG93fSkge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKGYgPT5cbiAgICAgIGYuaWQgPT09IGlkXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgIGFuaW1hdGlvbldpbmRvd1xuICAgICAgICAgIH1cbiAgICAgICAgOiBmXG4gICAgKVxuICB9O1xufVxuLyoqXG4gKiBVcGRhdGUgZmlsdGVyIHByb3BlcnR5XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0RmlsdGVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7aWR4LCBwcm9wLCB2YWx1ZSwgdmFsdWVJbmRleCA9IDB9ID0gYWN0aW9uO1xuICBjb25zdCBvbGRGaWx0ZXIgPSBzdGF0ZS5maWx0ZXJzW2lkeF07XG5cbiAgaWYgKCFvbGRGaWx0ZXIpIHtcbiAgICBDb25zb2xlLmVycm9yKGBmaWx0ZXJzLiR7aWR4fSBpcyB1bmRlZmluZWRgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgbGV0IG5ld0ZpbHRlciA9IHNldChbcHJvcF0sIHZhbHVlLCBvbGRGaWx0ZXIpO1xuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcblxuICBjb25zdCB7ZGF0YUlkfSA9IG5ld0ZpbHRlcjtcblxuICAvLyBFbnN1cmluZyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gIGxldCBkYXRhc2V0SWRzID0gdG9BcnJheShkYXRhSWQpO1xuXG4gIHN3aXRjaCAocHJvcCkge1xuICAgIC8vIFRPRE86IE5leHQgUFIgZm9yIFVJIGlmIHdlIHVwZGF0ZSBkYXRhSWQsIHdlIG5lZWQgdG8gY29uc2lkZXIgdHdvIGNhc2VzOlxuICAgIC8vIDEuIGRhdGFJZCBpcyBlbXB0eTogY3JlYXRlIGEgZGVmYXVsdCBmaWx0ZXJcbiAgICAvLyAyLiBBZGQgYSBuZXcgZGF0YXNldCBpZFxuICAgIGNhc2UgRklMVEVSX1VQREFURVJfUFJPUFMuZGF0YUlkOlxuICAgICAgLy8gaWYgdHJ5aW5nIHRvIHVwZGF0ZSBmaWx0ZXIgZGF0YUlkLiBjcmVhdGUgYW4gZW1wdHkgbmV3IGZpbHRlclxuICAgICAgbmV3RmlsdGVyID0gdXBkYXRlRmlsdGVyRGF0YUlkKGRhdGFJZCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgRklMVEVSX1VQREFURVJfUFJPUFMubmFtZTpcbiAgICAgIC8vIHdlIGFyZSBzdXBwb3J0aW5nIHRoZSBjdXJyZW50IGZ1bmN0aW9uYWxpdHlcbiAgICAgIC8vIFRPRE86IE5leHQgUFIgZm9yIFVJIGZpbHRlciBuYW1lIHdpbGwgb25seSB1cGRhdGUgZmlsdGVyIG5hbWUgYnV0IGl0IHdvbid0IGhhdmUgc2lkZSBlZmZlY3RzXG4gICAgICAvLyB3ZSBhcmUgZ29ubmEgdXNlIHBhaXIgb2YgZGF0YXNldHMgYW5kIGZpZWxkSWR4IHRvIHVwZGF0ZSB0aGUgZmlsdGVyXG4gICAgICBjb25zdCBkYXRhc2V0SWQgPSBuZXdGaWx0ZXIuZGF0YUlkW3ZhbHVlSW5kZXhdO1xuICAgICAgY29uc3Qge2ZpbHRlcjogdXBkYXRlZEZpbHRlciwgZGF0YXNldDogbmV3RGF0YXNldH0gPSBhcHBseUZpbHRlckZpZWxkTmFtZShcbiAgICAgICAgbmV3RmlsdGVyLFxuICAgICAgICBzdGF0ZS5kYXRhc2V0c1tkYXRhc2V0SWRdLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmFsdWVJbmRleCxcbiAgICAgICAge21lcmdlRG9tYWluOiBmYWxzZX1cbiAgICAgICk7XG4gICAgICBpZiAoIXVwZGF0ZWRGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuXG4gICAgICBuZXdGaWx0ZXIgPSB1cGRhdGVkRmlsdGVyO1xuXG4gICAgICBpZiAobmV3RmlsdGVyLmdwdSkge1xuICAgICAgICBuZXdGaWx0ZXIgPSBzZXRGaWx0ZXJHcHVNb2RlKG5ld0ZpbHRlciwgc3RhdGUuZmlsdGVycyk7XG4gICAgICAgIG5ld0ZpbHRlciA9IGFzc2lnbkdwdUNoYW5uZWwobmV3RmlsdGVyLCBzdGF0ZS5maWx0ZXJzKTtcbiAgICAgIH1cblxuICAgICAgbmV3U3RhdGUgPSBzZXQoWydkYXRhc2V0cycsIGRhdGFzZXRJZF0sIG5ld0RhdGFzZXQsIHN0YXRlKTtcblxuICAgICAgLy8gb25seSBmaWx0ZXIgdGhlIGN1cnJlbnQgZGF0YXNldFxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGSUxURVJfVVBEQVRFUl9QUk9QUy5sYXllcklkOlxuICAgICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgb25seSBkYXRhc2V0SWQvcyBpZiB3ZSBoYXZlIGFkZGVkL3JlbW92ZWQgbGF5ZXJzXG4gICAgICAvLyAtIGNoZWNrIGZvciBsYXllcklkIGNoYW5nZXMgKFhPUiB3b3JrcyBiZWNhdXNlIG9mIHN0cmluZyB2YWx1ZXMpXG4gICAgICAvLyBpZiBubyBkaWZmZXJlbmNlcyBiZXR3ZWVuIGxheWVySWRzLCBkb24ndCBkbyBhbnkgZmlsdGVyaW5nXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBsYXllcklkRGlmZmVyZW5jZSA9IHhvcihuZXdGaWx0ZXIubGF5ZXJJZCwgb2xkRmlsdGVyLmxheWVySWQpO1xuXG4gICAgICBjb25zdCBsYXllckRhdGFJZHMgPSB1bmlxKFxuICAgICAgICBsYXllcklkRGlmZmVyZW5jZVxuICAgICAgICAgIC5tYXAobGlkID0+XG4gICAgICAgICAgICBnZXQoXG4gICAgICAgICAgICAgIHN0YXRlLmxheWVycy5maW5kKGwgPT4gbC5pZCA9PT0gbGlkKSxcbiAgICAgICAgICAgICAgWydjb25maWcnLCAnZGF0YUlkJ11cbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLmZpbHRlcihkID0+IGQpXG4gICAgICApO1xuXG4gICAgICAvLyBvbmx5IGZpbHRlciBkYXRhc2V0c0lkc1xuICAgICAgZGF0YXNldElkcyA9IGxheWVyRGF0YUlkcztcblxuICAgICAgLy8gVXBkYXRlIG5ld0ZpbHRlciBkYXRhSWRzXG4gICAgICBjb25zdCBuZXdEYXRhSWRzID0gdW5pcShcbiAgICAgICAgbmV3RmlsdGVyLmxheWVySWRcbiAgICAgICAgICAubWFwKGxpZCA9PlxuICAgICAgICAgICAgZ2V0KFxuICAgICAgICAgICAgICBzdGF0ZS5sYXllcnMuZmluZChsID0+IGwuaWQgPT09IGxpZCksXG4gICAgICAgICAgICAgIFsnY29uZmlnJywgJ2RhdGFJZCddXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5maWx0ZXIoZCA9PiBkKVxuICAgICAgKTtcblxuICAgICAgbmV3RmlsdGVyID0ge1xuICAgICAgICAuLi5uZXdGaWx0ZXIsXG4gICAgICAgIGRhdGFJZDogbmV3RGF0YUlkc1xuICAgICAgfTtcblxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc3QgZW5sYXJnZWRGaWx0ZXIgPSBzdGF0ZS5maWx0ZXJzLmZpbmQoZiA9PiBmLmVubGFyZ2VkKTtcblxuICBpZiAoZW5sYXJnZWRGaWx0ZXIgJiYgZW5sYXJnZWRGaWx0ZXIuaWQgIT09IG5ld0ZpbHRlci5pZCkge1xuICAgIC8vIHRoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBlbmxhcmdlZCBmaWx0ZXJcbiAgICBuZXdGaWx0ZXIuZW5sYXJnZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIHNhdmUgbmV3IGZpbHRlcnMgdG8gbmV3U3RhdGVcbiAgbmV3U3RhdGUgPSBzZXQoWydmaWx0ZXJzJywgaWR4XSwgbmV3RmlsdGVyLCBuZXdTdGF0ZSk7XG5cbiAgLy8gaWYgd2UgYXJlIGN1cnJlbnRseSBzZXR0aW5nIGEgcHJvcCB0aGF0IG9ubHkgcmVxdWlyZXMgdG8gZmlsdGVyIHRoZSBjdXJyZW50XG4gIC8vIGRhdGFzZXQgd2Ugd2lsbCBwYXNzIG9ubHkgdGhlIGN1cnJlbnQgZGF0YXNldCB0byBhcHBseUZpbHRlcnNUb0RhdGFzZXRzIGFuZFxuICAvLyB1cGRhdGVBbGxMYXllckRvbWFpbkRhdGEgb3RoZXJ3aXNlIHdlIHBhc3MgdGhlIGFsbCBsaXN0IG9mIGRhdGFzZXRzIGFzIGRlZmluZWQgaW4gZGF0YUlkXG4gIGNvbnN0IGRhdGFzZXRJZHNUb0ZpbHRlciA9IExJTUlURURfRklMVEVSX0VGRkVDVF9QUk9QU1twcm9wXVxuICAgID8gW2RhdGFzZXRJZHNbdmFsdWVJbmRleF1dXG4gICAgOiBkYXRhc2V0SWRzO1xuXG4gIC8vIGZpbHRlciBkYXRhXG4gIGNvbnN0IGZpbHRlcmVkRGF0YXNldHMgPSBhcHBseUZpbHRlcnNUb0RhdGFzZXRzKFxuICAgIGRhdGFzZXRJZHNUb0ZpbHRlcixcbiAgICBuZXdTdGF0ZS5kYXRhc2V0cyxcbiAgICBuZXdTdGF0ZS5maWx0ZXJzLFxuICAgIG5ld1N0YXRlLmxheWVyc1xuICApO1xuXG4gIG5ld1N0YXRlID0gc2V0KFsnZGF0YXNldHMnXSwgZmlsdGVyZWREYXRhc2V0cywgbmV3U3RhdGUpO1xuICAvLyBkYXRhSWQgaXMgYW4gYXJyYXlcbiAgLy8gcGFzcyBvbmx5IHRoZSBkYXRhc2V0IHdlIG5lZWQgdG8gdXBkYXRlXG4gIG5ld1N0YXRlID0gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhc2V0SWRzVG9GaWx0ZXIsIG5ld0ZpbHRlcik7XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvcGVydHkgb2YgYSBmaWx0ZXIgcGxvdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnNldEZpbHRlclBsb3RVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RmlsdGVyUGxvdFVwZGF0ZXIgPSAoc3RhdGUsIHtpZHgsIG5ld1Byb3AsIHZhbHVlSW5kZXggPSAwfSkgPT4ge1xuICBsZXQgbmV3RmlsdGVyID0gey4uLnN0YXRlLmZpbHRlcnNbaWR4XSwgLi4ubmV3UHJvcH07XG4gIGNvbnN0IHByb3AgPSBPYmplY3Qua2V5cyhuZXdQcm9wKVswXTtcbiAgaWYgKHByb3AgPT09ICd5QXhpcycpIHtcbiAgICBjb25zdCBwbG90VHlwZSA9IGdldERlZmF1bHRGaWx0ZXJQbG90VHlwZShuZXdGaWx0ZXIpO1xuICAgIC8vIFRPRE86IHBsb3QgaXMgbm90IHN1cHBvcnRlZCBpbiBtdWx0aSBkYXRhc2V0IGZpbHRlciBmb3Igbm93XG4gICAgaWYgKHBsb3RUeXBlKSB7XG4gICAgICBuZXdGaWx0ZXIgPSB7XG4gICAgICAgIC4uLm5ld0ZpbHRlcixcbiAgICAgICAgLi4uZ2V0RmlsdGVyUGxvdCh7Li4ubmV3RmlsdGVyLCBwbG90VHlwZX0sIHN0YXRlLmRhdGFzZXRzW25ld0ZpbHRlci5kYXRhSWRbdmFsdWVJbmRleF1dKSxcbiAgICAgICAgcGxvdFR5cGVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGlkeCA/IG5ld0ZpbHRlciA6IGYpKVxuICB9O1xufTtcblxuLyoqXG4gKiBBZGQgYSBuZXcgZmlsdGVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuYWRkRmlsdGVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZEZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgIWFjdGlvbi5kYXRhSWRcbiAgICA/IHN0YXRlXG4gICAgOiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBmaWx0ZXJzOiBbLi4uc3RhdGUuZmlsdGVycywgZ2V0RGVmYXVsdEZpbHRlcihhY3Rpb24uZGF0YUlkKV1cbiAgICAgIH07XG5cbi8qKlxuICogU2V0IGxheWVyIGNvbG9yIHBhbGV0dGUgdWkgc3RhdGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllckNvbG9yVUlDaGFuZ2VVcGRhdGVyfVxuICovXG5leHBvcnQgY29uc3QgbGF5ZXJDb2xvclVJQ2hhbmdlVXBkYXRlciA9IChzdGF0ZSwge29sZExheWVyLCBwcm9wLCBuZXdDb25maWd9KSA9PiB7XG4gIGNvbnN0IG9sZFZpeENvbmZpZyA9IG9sZExheWVyLmNvbmZpZy52aXNDb25maWdbcHJvcF07XG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb2xvclVJKHByb3AsIG5ld0NvbmZpZyk7XG4gIGNvbnN0IG5ld1Zpc0NvbmZpZyA9IG5ld0xheWVyLmNvbmZpZy52aXNDb25maWdbcHJvcF07XG4gIGlmIChvbGRWaXhDb25maWcgIT09IG5ld1Zpc0NvbmZpZykge1xuICAgIHJldHVybiBsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIHtcbiAgICAgIG9sZExheWVyLFxuICAgICAgbmV3VmlzQ29uZmlnOiB7XG4gICAgICAgIFtwcm9wXTogbmV3VmlzQ29uZmlnXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IHN0YXRlLmxheWVycy5tYXAobCA9PiAobC5pZCA9PT0gb2xkTGF5ZXIuaWQgPyBuZXdMYXllciA6IGwpKVxuICB9O1xufTtcblxuLyoqXG4gKiBTdGFydCBhbmQgZW5kIGZpbHRlciBhbmltYXRpb25cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyQW5pbWF0aW9uVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+IChpID09PSBhY3Rpb24uaWR4ID8gey4uLmYsIGlzQW5pbWF0aW5nOiAhZi5pc0FuaW1hdGluZ30gOiBmKSlcbn0pO1xuXG4vKipcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVMYXllckFuaW1hdGlvblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVMYXllckFuaW1hdGlvblVwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgLi4uc3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICAgIGlzQW5pbWF0aW5nOiAhc3RhdGUuYW5pbWF0aW9uQ29uZmlnLmlzQW5pbWF0aW5nXG4gIH1cbn0pO1xuXG4vKipcbiAqIEhpZGUgYW5kIHNob3cgbGF5ZXIgYW5pbWF0aW9uIGNvbnRyb2xcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVMYXllckFuaW1hdGlvbkNvbnRyb2xVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTGF5ZXJBbmltYXRpb25Db250cm9sVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBhbmltYXRpb25Db25maWc6IHtcbiAgICAuLi5zdGF0ZS5hbmltYXRpb25Db25maWcsXG4gICAgaGlkZUNvbnRyb2w6ICFzdGF0ZS5hbmltYXRpb25Db25maWcuaGlkZUNvbnRyb2xcbiAgfVxufSk7XG5cbi8qKlxuICogQ2hhbmdlIGZpbHRlciBhbmltYXRpb24gc3BlZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS51cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiAoaSA9PT0gYWN0aW9uLmlkeCA/IHsuLi5mLCBzcGVlZDogYWN0aW9uLnNwZWVkfSA6IGYpKVxufSk7XG5cbi8qKlxuICogUmVzZXQgYW5pbWF0aW9uIGNvbmZpZyBjdXJyZW50IHRpbWUgdG8gYSBzcGVjaWZpZWQgdmFsdWVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRMYXllckFuaW1hdGlvblRpbWVVcGRhdGVyfVxuICogQHB1YmxpY1xuICpcbiAqL1xuZXhwb3J0IGNvbnN0IHNldExheWVyQW5pbWF0aW9uVGltZVVwZGF0ZXIgPSAoc3RhdGUsIHt2YWx1ZX0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBhbmltYXRpb25Db25maWc6IHtcbiAgICAuLi5zdGF0ZS5hbmltYXRpb25Db25maWcsXG4gICAgY3VycmVudFRpbWU6IHZhbHVlXG4gIH1cbn0pO1xuXG4vKipcbiAqIFVwZGF0ZSBhbmltYXRpb24gc3BlZWQgd2l0aCB0aGUgdmVydGljYWwgc3BlZWQgc2xpZGVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudXBkYXRlTGF5ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKlxuICovXG5leHBvcnQgY29uc3QgdXBkYXRlTGF5ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXIgPSAoc3RhdGUsIHtzcGVlZH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBhbmltYXRpb25Db25maWc6IHtcbiAgICAgIC4uLnN0YXRlLmFuaW1hdGlvbkNvbmZpZyxcbiAgICAgIHNwZWVkXG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBTaG93IGxhcmdlciB0aW1lIGZpbHRlciBhdCBib3R0b20gZm9yIHRpbWUgcGxheWJhY2sgKGFwcGx5IHRvIHRpbWUgZmlsdGVyIG9ubHkpXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuZW5sYXJnZUZpbHRlclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBlbmxhcmdlRmlsdGVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+XG4gICAgICBpID09PSBhY3Rpb24uaWR4XG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgIGVubGFyZ2VkOiAhZi5lbmxhcmdlZFxuICAgICAgICAgIH1cbiAgICAgICAgOiBmXG4gICAgKVxuICB9O1xufTtcblxuLyoqXG4gKiBUb2dnbGVzIGZpbHRlciBmZWF0dXJlIHZpc2liaWxpdHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVGaWx0ZXJGZWF0dXJlVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlckZlYXR1cmVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgZmlsdGVyID0gc3RhdGUuZmlsdGVyc1thY3Rpb24uaWR4XTtcbiAgY29uc3QgaXNWaXNpYmxlID0gZ2V0KGZpbHRlciwgWyd2YWx1ZScsICdwcm9wZXJ0aWVzJywgJ2lzVmlzaWJsZSddKTtcbiAgY29uc3QgbmV3RmlsdGVyID0ge1xuICAgIC4uLmZpbHRlcixcbiAgICB2YWx1ZTogZmVhdHVyZVRvRmlsdGVyVmFsdWUoZmlsdGVyLnZhbHVlLCBmaWx0ZXIuaWQsIHtcbiAgICAgIGlzVmlzaWJsZTogIWlzVmlzaWJsZVxuICAgIH0pXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5maWx0ZXJzXSwge1thY3Rpb24uaWR4XTogbmV3RmlsdGVyfSlcbiAgfTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgZmlsdGVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykucmVtb3ZlRmlsdGVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7aWR4fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFJZCwgaWR9ID0gc3RhdGUuZmlsdGVyc1tpZHhdO1xuXG4gIGNvbnN0IG5ld0ZpbHRlcnMgPSBbXG4gICAgLi4uc3RhdGUuZmlsdGVycy5zbGljZSgwLCBpZHgpLFxuICAgIC4uLnN0YXRlLmZpbHRlcnMuc2xpY2UoaWR4ICsgMSwgc3RhdGUuZmlsdGVycy5sZW5ndGgpXG4gIF07XG5cbiAgY29uc3QgZmlsdGVyZWREYXRhc2V0cyA9IGFwcGx5RmlsdGVyc1RvRGF0YXNldHMoZGF0YUlkLCBzdGF0ZS5kYXRhc2V0cywgbmV3RmlsdGVycywgc3RhdGUubGF5ZXJzKTtcbiAgY29uc3QgbmV3RWRpdG9yID1cbiAgICBnZXRGaWx0ZXJJZEluRmVhdHVyZShzdGF0ZS5lZGl0b3Iuc2VsZWN0ZWRGZWF0dXJlKSA9PT0gaWRcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGxcbiAgICAgICAgfVxuICAgICAgOiBzdGF0ZS5lZGl0b3I7XG5cbiAgbGV0IG5ld1N0YXRlID0gc2V0KFsnZmlsdGVycyddLCBuZXdGaWx0ZXJzLCBzdGF0ZSk7XG4gIG5ld1N0YXRlID0gc2V0KFsnZGF0YXNldHMnXSwgZmlsdGVyZWREYXRhc2V0cywgbmV3U3RhdGUpO1xuICBuZXdTdGF0ZSA9IHNldChbJ2VkaXRvciddLCBuZXdFZGl0b3IsIG5ld1N0YXRlKTtcblxuICByZXR1cm4gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhSWQsIHVuZGVmaW5lZCk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG5ldyBsYXllclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmFkZExheWVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZExheWVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGxldCBuZXdMYXllcjtcbiAgbGV0IG5ld0xheWVyRGF0YTtcbiAgaWYgKGFjdGlvbi5jb25maWcpIHtcbiAgICBuZXdMYXllciA9IGNyZWF0ZUxheWVyRnJvbUNvbmZpZyhzdGF0ZSwgYWN0aW9uLmNvbmZpZyk7XG4gICAgaWYgKCFuZXdMYXllcikge1xuICAgICAgQ29uc29sZS53YXJuKFxuICAgICAgICAnRmFpbGVkIHRvIGNyZWF0ZSBsYXllciBmcm9tIGNvbmZpZywgaXQgdXN1YWxseSBtZWFucyB0aGUgY29uZmlnIGlzIG5vdCBiZSBpbiBjb3JyZWN0IGZvcm1hdCcsXG4gICAgICAgIGFjdGlvbi5jb25maWdcbiAgICAgICk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSk7XG4gICAgbmV3TGF5ZXIgPSByZXN1bHQubGF5ZXI7XG4gICAgbmV3TGF5ZXJEYXRhID0gcmVzdWx0LmxheWVyRGF0YTtcbiAgfSBlbHNlIHtcbiAgICAvLyBjcmVhdGUgYW4gZW1wdHkgbGF5ZXIgd2l0aCB0aGUgZmlyc3QgYXZhaWxhYmxlIGRhdGFzZXRcbiAgICBjb25zdCBkZWZhdWx0RGF0YXNldCA9IE9iamVjdC5rZXlzKHN0YXRlLmRhdGFzZXRzKVswXTtcbiAgICBuZXdMYXllciA9IG5ldyBMYXllcih7XG4gICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICBpc0NvbmZpZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgIGRhdGFJZDogZGVmYXVsdERhdGFzZXRcbiAgICB9KTtcbiAgICBuZXdMYXllckRhdGEgPSB7fTtcbiAgfVxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogWy4uLnN0YXRlLmxheWVycywgbmV3TGF5ZXJdLFxuICAgIGxheWVyRGF0YTogWy4uLnN0YXRlLmxheWVyRGF0YSwgbmV3TGF5ZXJEYXRhXSxcbiAgICBsYXllck9yZGVyOiBbLi4uc3RhdGUubGF5ZXJPcmRlciwgc3RhdGUubGF5ZXJPcmRlci5sZW5ndGhdLFxuICAgIHNwbGl0TWFwczogYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcChzdGF0ZS5zcGxpdE1hcHMsIG5ld0xheWVyKVxuICB9O1xufTtcblxuLyoqXG4gKiByZW1vdmUgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZW1vdmVMYXllclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtpZHh9KSA9PiB7XG4gIGNvbnN0IHtsYXllcnMsIGxheWVyRGF0YSwgY2xpY2tlZCwgaG92ZXJJbmZvfSA9IHN0YXRlO1xuICBjb25zdCBsYXllclRvUmVtb3ZlID0gc3RhdGUubGF5ZXJzW2lkeF07XG4gIGNvbnN0IG5ld01hcHMgPSByZW1vdmVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUuc3BsaXRNYXBzLCBsYXllclRvUmVtb3ZlKTtcblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5sYXllcnMuc2xpY2UoMCwgaWR4KSwgLi4ubGF5ZXJzLnNsaWNlKGlkeCArIDEsIGxheWVycy5sZW5ndGgpXSxcbiAgICBsYXllckRhdGE6IFsuLi5sYXllckRhdGEuc2xpY2UoMCwgaWR4KSwgLi4ubGF5ZXJEYXRhLnNsaWNlKGlkeCArIDEsIGxheWVyRGF0YS5sZW5ndGgpXSxcbiAgICBsYXllck9yZGVyOiBzdGF0ZS5sYXllck9yZGVyLmZpbHRlcihpID0+IGkgIT09IGlkeCkubWFwKHBpZCA9PiAocGlkID4gaWR4ID8gcGlkIC0gMSA6IHBpZCkpLFxuICAgIGNsaWNrZWQ6IGxheWVyVG9SZW1vdmUuaXNMYXllckhvdmVyZWQoY2xpY2tlZCkgPyB1bmRlZmluZWQgOiBjbGlja2VkLFxuICAgIGhvdmVySW5mbzogbGF5ZXJUb1JlbW92ZS5pc0xheWVySG92ZXJlZChob3ZlckluZm8pID8gdW5kZWZpbmVkIDogaG92ZXJJbmZvLFxuICAgIHNwbGl0TWFwczogbmV3TWFwc1xuICAgIC8vIFRPRE86IHVwZGF0ZSBmaWx0ZXJzLCBjcmVhdGUgaGVscGVyIHRvIHJlbW92ZSBsYXllciBmb3JtIGZpbHRlciAocmVtb3ZlIGxheWVyaWQgYW5kIGRhdGFpZCkgaWYgbWFwcGVkXG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihuZXdTdGF0ZSk7XG59O1xuXG4vKipcbiAqIGR1cGxpY2F0ZSBsYXllclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmR1cGxpY2F0ZUxheWVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGR1cGxpY2F0ZUxheWVyVXBkYXRlciA9IChzdGF0ZSwge2lkeH0pID0+IHtcbiAgY29uc3Qge2xheWVyc30gPSBzdGF0ZTtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZS5sYXllcnNbaWR4XTtcbiAgY29uc3Qgb3JpZ2luYWxMYXllck9yZGVySWR4ID0gc3RhdGUubGF5ZXJPcmRlci5maW5kSW5kZXgoaSA9PiBpID09PSBpZHgpO1xuXG4gIGlmICghb3JpZ2luYWwpIHtcbiAgICBDb25zb2xlLndhcm4oYGxheWVyLiR7aWR4fSBpcyB1bmRlZmluZWRgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgbGV0IG5ld0xhYmVsID0gYENvcHkgb2YgJHtvcmlnaW5hbC5jb25maWcubGFiZWx9YDtcbiAgbGV0IHBvc3RmaXggPSAwO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gIHdoaWxlIChsYXllcnMuZmluZChsID0+IGwuY29uZmlnLmxhYmVsID09PSBuZXdMYWJlbCkpIHtcbiAgICBuZXdMYWJlbCA9IGBDb3B5IG9mICR7b3JpZ2luYWwuY29uZmlnLmxhYmVsfSAkeysrcG9zdGZpeH1gO1xuICB9XG5cbiAgLy8gY29sbGVjdCBsYXllciBjb25maWcgZnJvbSBvcmlnaW5hbFxuICBjb25zdCBsb2FkZWRMYXllciA9IHNlcmlhbGl6ZUxheWVyKG9yaWdpbmFsKTtcblxuICAvLyBhc3NpZ24gbmV3IGlkIGFuZCBsYWJlbCB0byBjb3BpZWQgbGF5ZXJcbiAgaWYgKCFsb2FkZWRMYXllci5jb25maWcpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgbG9hZGVkTGF5ZXIuY29uZmlnLmxhYmVsID0gbmV3TGFiZWw7XG4gIGxvYWRlZExheWVyLmlkID0gZ2VuZXJhdGVIYXNoSWQoTEFZRVJfSURfTEVOR1RIKTtcblxuICAvLyBhZGQgbGF5ZXIgdG8gc3RhdGVcbiAgbGV0IG5leHRTdGF0ZSA9IGFkZExheWVyVXBkYXRlcihzdGF0ZSwge2NvbmZpZzogbG9hZGVkTGF5ZXJ9KTtcblxuICAvLyBuZXcgYWRkZWQgbGF5ZXIgYXJlIGF0IHRoZSBlbmQsIG1vdmUgaXQgdG8gYmUgb24gdG9wIG9mIG9yaWdpbmFsIGxheWVyXG4gIGNvbnN0IG5ld0xheWVyT3JkZXJJZHggPSBuZXh0U3RhdGUubGF5ZXJPcmRlci5sZW5ndGggLSAxO1xuICBjb25zdCBuZXdMYXllck9yZGVyID0gYXJyYXlJbnNlcnQoXG4gICAgbmV4dFN0YXRlLmxheWVyT3JkZXIuc2xpY2UoMCwgbmV3TGF5ZXJPcmRlcklkeCksXG4gICAgb3JpZ2luYWxMYXllck9yZGVySWR4LFxuICAgIG5ld0xheWVyT3JkZXJJZHhcbiAgKTtcblxuICBuZXh0U3RhdGUgPSB7XG4gICAgLi4ubmV4dFN0YXRlLFxuICAgIGxheWVyT3JkZXI6IG5ld0xheWVyT3JkZXJcbiAgfTtcblxuICByZXR1cm4gdXBkYXRlQW5pbWF0aW9uRG9tYWluKG5leHRTdGF0ZSk7XG59O1xuXG4vKipcbiAqIFJlb3JkZXIgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZW9yZGVyTGF5ZXJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVvcmRlckxheWVyVXBkYXRlciA9IChzdGF0ZSwge29yZGVyfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxheWVyT3JkZXI6IG9yZGVyXG59KTtcblxuLyoqXG4gKiBSZW1vdmUgYSBkYXRhc2V0IGFuZCBhbGwgbGF5ZXJzLCBmaWx0ZXJzLCB0b29sdGlwIGNvbmZpZ3MgdGhhdCBiYXNlZCBvbiBpdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnJlbW92ZURhdGFzZXRVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlRGF0YXNldFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAvLyBleHRyYWN0IGRhdGFzZXQga2V5XG4gIGNvbnN0IHtkYXRhSWQ6IGRhdGFzZXRLZXl9ID0gYWN0aW9uO1xuICBjb25zdCB7ZGF0YXNldHN9ID0gc3RhdGU7XG5cbiAgLy8gY2hlY2sgaWYgZGF0YXNldCBpcyBwcmVzZW50XG4gIGlmICghZGF0YXNldHNbZGF0YXNldEtleV0pIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICBjb25zdCB7XG4gICAgbGF5ZXJzLFxuICAgIGRhdGFzZXRzOiB7W2RhdGFzZXRLZXldOiBkYXRhc2V0LCAuLi5uZXdEYXRhc2V0c31cbiAgfSA9IHN0YXRlO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbiAgY29uc3QgaW5kZXhlcyA9IGxheWVycy5yZWR1Y2UoKGxpc3RPZkluZGV4ZXMsIGxheWVyLCBpbmRleCkgPT4ge1xuICAgIGlmIChsYXllci5jb25maWcuZGF0YUlkID09PSBkYXRhc2V0S2V5KSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsaXN0T2ZJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdE9mSW5kZXhlcztcbiAgfSwgW10pO1xuXG4gIC8vIHJlbW92ZSBsYXllcnMgYW5kIGRhdGFzZXRzXG4gIGNvbnN0IHtuZXdTdGF0ZX0gPSBpbmRleGVzLnJlZHVjZShcbiAgICAoe25ld1N0YXRlOiBjdXJyZW50U3RhdGUsIGluZGV4Q291bnRlcn0sIGlkeCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gaWR4IC0gaW5kZXhDb3VudGVyO1xuICAgICAgY3VycmVudFN0YXRlID0gcmVtb3ZlTGF5ZXJVcGRhdGVyKGN1cnJlbnRTdGF0ZSwge2lkeDogY3VycmVudEluZGV4fSk7XG4gICAgICBpbmRleENvdW50ZXIrKztcbiAgICAgIHJldHVybiB7bmV3U3RhdGU6IGN1cnJlbnRTdGF0ZSwgaW5kZXhDb3VudGVyfTtcbiAgICB9LFxuICAgIHtuZXdTdGF0ZTogey4uLnN0YXRlLCBkYXRhc2V0czogbmV3RGF0YXNldHN9LCBpbmRleENvdW50ZXI6IDB9XG4gICk7XG5cbiAgLy8gcmVtb3ZlIGZpbHRlcnNcbiAgY29uc3QgZmlsdGVycyA9IHN0YXRlLmZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiAhZmlsdGVyLmRhdGFJZC5pbmNsdWRlcyhkYXRhc2V0S2V5KSk7XG5cbiAgLy8gdXBkYXRlIGludGVyYWN0aW9uQ29uZmlnXG4gIGxldCB7aW50ZXJhY3Rpb25Db25maWd9ID0gc3RhdGU7XG4gIGNvbnN0IHt0b29sdGlwfSA9IGludGVyYWN0aW9uQ29uZmlnO1xuICBpZiAodG9vbHRpcCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdG9vbHRpcDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbZGF0YXNldEtleV06IGZpZWxkcywgLi4uZmllbGRzVG9TaG93fSA9IGNvbmZpZy5maWVsZHNUb1Nob3c7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGludGVyYWN0aW9uQ29uZmlnID0ge1xuICAgICAgLi4uaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICB0b29sdGlwOiB7Li4udG9vbHRpcCwgY29uZmlnOiB7Li4uY29uZmlnLCBmaWVsZHNUb1Nob3d9fVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gey4uLm5ld1N0YXRlLCBmaWx0ZXJzLCBpbnRlcmFjdGlvbkNvbmZpZ307XG59O1xuXG4vKipcbiAqIHVwZGF0ZSBsYXllciBibGVuZGluZyBtb2RlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVMYXllckJsZW5kaW5nVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbGF5ZXJCbGVuZGluZzogYWN0aW9uLm1vZGVcbn0pO1xuXG4vKipcbiAqIERpc3BsYXkgZGF0YXNldCB0YWJsZSBpbiBhIG1vZGFsXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93RGF0YXNldFRhYmxlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdGluZ0RhdGFzZXQ6IGFjdGlvbi5kYXRhSWRcbiAgfTtcbn07XG5cbi8qKlxuICogcmVzZXQgdmlzU3RhdGUgdG8gaW5pdGlhbCBTdGF0ZVxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnJlc2V0TWFwQ29uZmlnVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLklOSVRJQUxfVklTX1NUQVRFLFxuICAuLi5zdGF0ZS5pbml0aWFsU3RhdGUsXG4gIGluaXRpYWxTdGF0ZTogc3RhdGUuaW5pdGlhbFN0YXRlXG59KTtcblxuLyoqXG4gKiBQcm9wYWdhdGUgYHZpc1N0YXRlYCByZWR1Y2VyIHdpdGggYSBuZXcgY29uZmlndXJhdGlvbi4gQ3VycmVudCBjb25maWcgd2lsbCBiZSBvdmVycmlkZS5cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZWNlaXZlTWFwQ29uZmlnVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge2NvbmZpZyA9IHt9LCBvcHRpb25zID0ge319fSkgPT4ge1xuICBpZiAoIWNvbmZpZy52aXNTdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtrZWVwRXhpc3RpbmdDb25maWd9ID0gb3B0aW9ucztcblxuICAvLyByZXNldCBjb25maWcgaWYga2VlcEV4aXN0aW5nQ29uZmlnIGlzIGZhbHN5XG4gIGxldCBtZXJnZWRTdGF0ZSA9ICFrZWVwRXhpc3RpbmdDb25maWcgPyByZXNldE1hcENvbmZpZ1VwZGF0ZXIoc3RhdGUpIDogc3RhdGU7XG4gIGZvciAoY29uc3QgbWVyZ2VyIG9mIHN0YXRlLm1lcmdlcnMpIHtcbiAgICBpZiAoaXNWYWxpZE1lcmdlcihtZXJnZXIpICYmIGNvbmZpZy52aXNTdGF0ZVttZXJnZXIucHJvcF0pIHtcbiAgICAgIG1lcmdlZFN0YXRlID0gbWVyZ2VyLm1lcmdlKG1lcmdlZFN0YXRlLCBjb25maWcudmlzU3RhdGVbbWVyZ2VyLnByb3BdLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkU3RhdGU7XG59O1xuXG4vKipcbiAqIFRyaWdnZXIgbGF5ZXIgaG92ZXIgZXZlbnQgd2l0aCBob3ZlcmVkIG9iamVjdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxheWVySG92ZXJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbGF5ZXJIb3ZlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGhvdmVySW5mbzogYWN0aW9uLmluZm9cbn0pO1xuXG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbi8qKlxuICogVXBkYXRlIGBpbnRlcmFjdGlvbkNvbmZpZ2BcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5pbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7Y29uZmlnfSA9IGFjdGlvbjtcblxuICBjb25zdCBpbnRlcmFjdGlvbkNvbmZpZyA9IHtcbiAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAuLi57W2NvbmZpZy5pZF06IGNvbmZpZ31cbiAgfTtcblxuICAvLyBEb24ndCBlbmFibGUgdG9vbHRpcCBhbmQgYnJ1c2ggYXQgdGhlIHNhbWUgdGltZVxuICAvLyBidXQgY29vcmRpbmF0ZXMgY2FuIGJlIHNob3duIGF0IGFsbCB0aW1lXG4gIGNvbnN0IGNvbnRyYWRpY3QgPSBbJ2JydXNoJywgJ3Rvb2x0aXAnXTtcblxuICBpZiAoXG4gICAgY29udHJhZGljdC5pbmNsdWRlcyhjb25maWcuaWQpICYmXG4gICAgY29uZmlnLmVuYWJsZWQgJiZcbiAgICAhc3RhdGUuaW50ZXJhY3Rpb25Db25maWdbY29uZmlnLmlkXS5lbmFibGVkXG4gICkge1xuICAgIC8vIG9ubHkgZW5hYmxlIG9uZSBpbnRlcmFjdGlvbiBhdCBhIHRpbWVcbiAgICBjb250cmFkaWN0LmZvckVhY2goayA9PiB7XG4gICAgICBpZiAoayAhPT0gY29uZmlnLmlkKSB7XG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnW2tdID0gey4uLmludGVyYWN0aW9uQ29uZmlnW2tdLCBlbmFibGVkOiBmYWxzZX07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICB9O1xuXG4gIGlmIChjb25maWcuaWQgPT09ICdnZW9jb2RlcicgJiYgIWNvbmZpZy5lbmFibGVkKSB7XG4gICAgcmV0dXJuIHJlbW92ZURhdGFzZXRVcGRhdGVyKG5ld1N0YXRlLCB7ZGF0YUlkOiAnZ2VvY29kZXJfZGF0YXNldCd9KTtcbiAgfVxuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGxheWVyIGNsaWNrIGV2ZW50IHdpdGggY2xpY2tlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllckNsaWNrVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxheWVyQ2xpY2tVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBtb3VzZVBvczogc3RhdGUuaW50ZXJhY3Rpb25Db25maWcuY29vcmRpbmF0ZS5lbmFibGVkXG4gICAgPyB7XG4gICAgICAgIC4uLnN0YXRlLm1vdXNlUG9zLFxuICAgICAgICBwaW5uZWQ6IHN0YXRlLm1vdXNlUG9zLnBpbm5lZCA/IG51bGwgOiBjbG9uZURlZXAoc3RhdGUubW91c2VQb3MpXG4gICAgICB9XG4gICAgOiBzdGF0ZS5tb3VzZVBvcyxcbiAgY2xpY2tlZDogYWN0aW9uLmluZm8gJiYgYWN0aW9uLmluZm8ucGlja2VkID8gYWN0aW9uLmluZm8gOiBudWxsXG59KTtcblxuLyoqXG4gKiBUcmlnZ2VyIG1hcCBjbGljayBldmVudCwgdW5zZWxlY3QgY2xpY2tlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5tYXBDbGlja1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBDbGlja1VwZGF0ZXIgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgY2xpY2tlZDogbnVsbFxuICB9O1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIG1hcCBtb3ZlIGV2ZW50XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubW91c2VNb3ZlVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IG1vdXNlTW92ZVVwZGF0ZXIgPSAoc3RhdGUsIHtldnR9KSA9PiB7XG4gIGlmIChPYmplY3QudmFsdWVzKHN0YXRlLmludGVyYWN0aW9uQ29uZmlnKS5zb21lKGNvbmZpZyA9PiBjb25maWcuZW5hYmxlZCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBtb3VzZVBvczoge1xuICAgICAgICAuLi5zdGF0ZS5tb3VzZVBvcyxcbiAgICAgICAgbW91c2VQb3NpdGlvbjogWy4uLmV2dC5wb2ludF0sXG4gICAgICAgIGNvb3JkaW5hdGU6IFsuLi5ldnQubG5nTGF0XVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuLyoqXG4gKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBhIGxheWVyIGZvciBhIHNwbGl0IG1hcFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnRvZ2dsZVNwbGl0TWFwVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVNwbGl0TWFwVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICBzdGF0ZS5zcGxpdE1hcHMgJiYgc3RhdGUuc3BsaXRNYXBzLmxlbmd0aCA9PT0gMFxuICAgID8ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLy8gbWF5YmUgd2Ugc2hvdWxkIHVzZSBhbiBhcnJheSB0byBzdG9yZSBzdGF0ZSBmb3IgYSBzaW5nbGUgbWFwIGFzIHdlbGxcbiAgICAgICAgLy8gaWYgY3VycmVudCBtYXBzIGxlbmd0aCBpcyBlcXVhbCB0byAwIGl0IG1lYW5zIHRoYXQgd2UgYXJlIGFib3V0IHRvIHNwbGl0IHRoZSB2aWV3XG4gICAgICAgIHNwbGl0TWFwczogY29tcHV0ZVNwbGl0TWFwTGF5ZXJzKHN0YXRlLmxheWVycylcbiAgICAgIH1cbiAgICA6IGNsb3NlU3BlY2lmaWNNYXBBdEluZGV4KHN0YXRlLCBhY3Rpb24pO1xuXG4vKipcbiAqIFRvZ2dsZSB2aXNpYmlsaXR5IG9mIGEgbGF5ZXIgaW4gYSBzcGxpdCBtYXBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVMYXllckZvck1hcFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIHttYXBJbmRleCwgbGF5ZXJJZH0pID0+IHtcbiAgY29uc3Qge3NwbGl0TWFwc30gPSBzdGF0ZTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIHNwbGl0TWFwczogc3BsaXRNYXBzLm1hcCgoc20sIGkpID0+XG4gICAgICBpID09PSBtYXBJbmRleFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLnNwbGl0TWFwc1tpXSxcbiAgICAgICAgICAgIGxheWVyczoge1xuICAgICAgICAgICAgICAuLi5zcGxpdE1hcHNbaV0ubGF5ZXJzLFxuICAgICAgICAgICAgICAvLyBpZiBsYXllcklkIG5vdCBpbiBsYXllcnMsIHNldCBpdCB0byB2aXNpYmxlXG4gICAgICAgICAgICAgIFtsYXllcklkXTogIXNwbGl0TWFwc1tpXS5sYXllcnNbbGF5ZXJJZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIDogc21cbiAgICApXG4gIH07XG59O1xuXG4vKipcbiAqIEFkZCBuZXcgZGF0YXNldCB0byBgdmlzU3RhdGVgLCB3aXRoIG9wdGlvbiB0byBsb2FkIGEgbWFwIGNvbmZpZyBhbG9uZyB3aXRoIHRoZSBkYXRhc2V0c1xuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnVwZGF0ZVZpc0RhdGFVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmV4cG9ydCBjb25zdCB1cGRhdGVWaXNEYXRhVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIC8vIGRhdGFzZXRzIGNhbiBiZSBhIHNpbmdsZSBkYXRhIGVudHJpZXMgb3IgYW4gYXJyYXkgb2YgbXVsdGlwbGUgZGF0YSBlbnRyaWVzXG4gIGNvbnN0IHtjb25maWcsIG9wdGlvbnN9ID0gYWN0aW9uO1xuICBjb25zdCBkYXRhc2V0cyA9IHRvQXJyYXkoYWN0aW9uLmRhdGFzZXRzKTtcblxuICBjb25zdCBuZXdEYXRhRW50cmllcyA9IGRhdGFzZXRzLnJlZHVjZShcbiAgICAoYWNjdSwge2luZm8gPSB7fSwgLi4ucmVzdH0gPSB7fSkgPT4gKHtcbiAgICAgIC4uLmFjY3UsXG4gICAgICAuLi4oY3JlYXRlTmV3RGF0YUVudHJ5KHtpbmZvLCAuLi5yZXN0fSwgc3RhdGUuZGF0YXNldHMpIHx8IHt9KVxuICAgIH0pLFxuICAgIHt9XG4gICk7XG5cbiAgY29uc3QgZGF0YUVtcHR5ID0gT2JqZWN0LmtleXMobmV3RGF0YUVudHJpZXMpLmxlbmd0aCA8IDE7XG5cbiAgLy8gYXBwbHkgY29uZmlnIGlmIHBhc3NlZCBmcm9tIGFjdGlvblxuICBjb25zdCBwcmV2aW91c1N0YXRlID0gY29uZmlnXG4gICAgPyByZWNlaXZlTWFwQ29uZmlnVXBkYXRlcihzdGF0ZSwge1xuICAgICAgICBwYXlsb2FkOiB7Y29uZmlnLCBvcHRpb25zfVxuICAgICAgfSlcbiAgICA6IHN0YXRlO1xuXG4gIGxldCBtZXJnZWRTdGF0ZSA9IHtcbiAgICAuLi5wcmV2aW91c1N0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5wcmV2aW91c1N0YXRlLmRhdGFzZXRzLFxuICAgICAgLi4ubmV3RGF0YUVudHJpZXNcbiAgICB9XG4gIH07XG5cbiAgLy8gbWVyZ2Ugc3RhdGUgd2l0aCBjb25maWcgdG8gYmUgbWVyZ2VkXG4gIGZvciAoY29uc3QgbWVyZ2VyIG9mIG1lcmdlZFN0YXRlLm1lcmdlcnMpIHtcbiAgICBpZiAoaXNWYWxpZE1lcmdlcihtZXJnZXIpICYmIG1lcmdlci50b01lcmdlUHJvcCAmJiBtZXJnZWRTdGF0ZVttZXJnZXIudG9NZXJnZVByb3BdKSB7XG4gICAgICBjb25zdCB0b01lcmdlID0gbWVyZ2VkU3RhdGVbbWVyZ2VyLnRvTWVyZ2VQcm9wXTtcbiAgICAgIG1lcmdlZFN0YXRlW21lcmdlci50b01lcmdlUHJvcF0gPSBJTklUSUFMX1ZJU19TVEFURVttZXJnZXIudG9NZXJnZVByb3BdO1xuICAgICAgbWVyZ2VkU3RhdGUgPSBtZXJnZXIubWVyZ2UobWVyZ2VkU3RhdGUsIHRvTWVyZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBuZXdMYXllcnMgPSAhZGF0YUVtcHR5XG4gICAgPyBtZXJnZWRTdGF0ZS5sYXllcnMuZmlsdGVyKGwgPT4gbC5jb25maWcuZGF0YUlkICYmIGwuY29uZmlnLmRhdGFJZCBpbiBuZXdEYXRhRW50cmllcylcbiAgICA6IFtdO1xuXG4gIGlmICghbmV3TGF5ZXJzLmxlbmd0aCAmJiAob3B0aW9ucyB8fCB7fSkuYXV0b0NyZWF0ZUxheWVycyAhPT0gZmFsc2UpIHtcbiAgICAvLyBubyBsYXllciBtZXJnZWQsIGZpbmQgZGVmYXVsdHNcbiAgICBjb25zdCByZXN1bHQgPSBhZGREZWZhdWx0TGF5ZXJzKG1lcmdlZFN0YXRlLCBuZXdEYXRhRW50cmllcyk7XG4gICAgbWVyZ2VkU3RhdGUgPSByZXN1bHQuc3RhdGU7XG4gICAgbmV3TGF5ZXJzID0gcmVzdWx0Lm5ld0xheWVycztcbiAgfVxuXG4gIGlmIChtZXJnZWRTdGF0ZS5zcGxpdE1hcHMubGVuZ3RoKSB7XG4gICAgLy8gaWYgbWFwIGlzIHNwbGl0LCBhZGQgbmV3IGxheWVycyB0byBzcGxpdE1hcHNcbiAgICBuZXdMYXllcnMgPSBtZXJnZWRTdGF0ZS5sYXllcnMuZmlsdGVyKFxuICAgICAgbCA9PiBsLmNvbmZpZy5kYXRhSWQgJiYgbC5jb25maWcuZGF0YUlkIGluIG5ld0RhdGFFbnRyaWVzXG4gICAgKTtcbiAgICBtZXJnZWRTdGF0ZSA9IHtcbiAgICAgIC4uLm1lcmdlZFN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKG1lcmdlZFN0YXRlLnNwbGl0TWFwcywgbmV3TGF5ZXJzKVxuICAgIH07XG4gIH1cblxuICAvLyBpZiBubyB0b29sdGlwcyBtZXJnZWQgYWRkIGRlZmF1bHQgdG9vbHRpcHNcbiAgT2JqZWN0LmtleXMobmV3RGF0YUVudHJpZXMpLmZvckVhY2goZGF0YUlkID0+IHtcbiAgICBjb25zdCB0b29sdGlwRmllbGRzID0gbWVyZ2VkU3RhdGUuaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRvb2x0aXBGaWVsZHMpIHx8ICF0b29sdGlwRmllbGRzLmxlbmd0aCkge1xuICAgICAgbWVyZ2VkU3RhdGUgPSBhZGREZWZhdWx0VG9vbHRpcHMobWVyZ2VkU3RhdGUsIG5ld0RhdGFFbnRyaWVzW2RhdGFJZF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHVwZGF0ZWRTdGF0ZSA9IHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShcbiAgICBtZXJnZWRTdGF0ZSxcbiAgICBkYXRhRW1wdHkgPyBPYmplY3Qua2V5cyhtZXJnZWRTdGF0ZS5kYXRhc2V0cykgOiBPYmplY3Qua2V5cyhuZXdEYXRhRW50cmllcyksXG4gICAgdW5kZWZpbmVkXG4gICk7XG5cbiAgLy8gcmVnaXN0ZXIgbGF5ZXIgYW5pbWF0aW9uIGRvbWFpbixcbiAgLy8gbmVlZCB0byBiZSBjYWxsZWQgYWZ0ZXIgbGF5ZXIgZGF0YSBpcyBjYWxjdWxhdGVkXG4gIHVwZGF0ZWRTdGF0ZSA9IHVwZGF0ZUFuaW1hdGlvbkRvbWFpbih1cGRhdGVkU3RhdGUpO1xuXG4gIHJldHVybiB1cGRhdGVkU3RhdGU7XG59O1xuLyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuXG4vKipcbiAqIFJlbmFtZSBhbiBleGlzdGluZyBkYXRhc2V0IGluIGB2aXNTdGF0ZWBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZW5hbWVEYXRhc2V0VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZURhdGFzZXRVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge2RhdGFJZCwgbGFiZWx9ID0gYWN0aW9uO1xuICBjb25zdCB7ZGF0YXNldHN9ID0gc3RhdGU7XG4gIGNvbnN0IGV4aXN0aW5nID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gZXhpc3RpbmdcbiAgICA/IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGFzZXRzOiB7XG4gICAgICAgICAgLi4uZGF0YXNldHMsXG4gICAgICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgICAgIC4uLmV4aXN0aW5nLFxuICAgICAgICAgICAgbGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA6IC8vIE5vLW9wIGlmIHRoZSBkYXRhc2V0IGRvZXNuJ3QgZXhpc3RcbiAgICAgIHN0YXRlO1xufVxuXG4vKipcbiAqIFdoZW4gYSB1c2VyIGNsaWNrcyBvbiB0aGUgc3BlY2lmaWMgbWFwIGNsb3NpbmcgaWNvblxuICogdGhlIGFwcGxpY2F0aW9uIHdpbGwgY2xvc2UgdGhlIHNlbGVjdGVkIG1hcFxuICogYW5kIHdpbGwgbWVyZ2UgdGhlIHJlbWFpbmluZyBvbmUgd2l0aCB0aGUgZ2xvYmFsIHN0YXRlXG4gKiBUT0RPOiBpIHRoaW5rIGluIHRoZSBmdXR1cmUgdGhpcyBhY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBtZXJnZSBtYXAgbGF5ZXJzIHdpdGggZ2xvYmFsIHNldHRpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgoc3RhdGUsIGFjdGlvbikge1xuICAvLyByZXRyaWV2ZSBsYXllcnMgbWV0YSBkYXRhIGZyb20gdGhlIHJlbWFpbmluZyBtYXAgdGhhdCB3ZSBuZWVkIHRvIGtlZXBcbiAgY29uc3QgaW5kZXhUb1JldHJpZXZlID0gMSAtIGFjdGlvbi5wYXlsb2FkO1xuICBjb25zdCBtYXBMYXllcnMgPSBzdGF0ZS5zcGxpdE1hcHNbaW5kZXhUb1JldHJpZXZlXS5sYXllcnM7XG4gIGNvbnN0IHtsYXllcnN9ID0gc3RhdGU7XG5cbiAgLy8gdXBkYXRlIGxheWVyIHZpc2liaWxpdHlcbiAgY29uc3QgbmV3TGF5ZXJzID0gbGF5ZXJzLm1hcChsYXllciA9PlxuICAgICFtYXBMYXllcnNbbGF5ZXIuaWRdICYmIGxheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgICAgID8gbGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgICAgICAgIC8vIGlmIGxheWVyLmlkIGlzIG5vdCBpbiBtYXBMYXllcnMsIGl0IHNob3VsZCBiZSBpblZpc2libGVcbiAgICAgICAgICBpc1Zpc2libGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICA6IGxheWVyXG4gICk7XG5cbiAgLy8gZGVsZXRlIG1hcFxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogbmV3TGF5ZXJzLFxuICAgIHNwbGl0TWFwczogW11cbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGZpbGUgbG9hZGluZyBkaXNwYXRjaCBgYWRkRGF0YVRvTWFwYCBpZiBzdWNjZWVkLCBvciBgbG9hZEZpbGVzRXJyYCBpZiBmYWlsZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sb2FkRmlsZXNVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGVzVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHtmaWxlcywgb25GaW5pc2ggPSBsb2FkRmlsZXNTdWNjZXNzfSA9IGFjdGlvbjtcbiAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBmaWxlTG9hZGluZ1Byb2dyZXNzID0gQXJyYXkuZnJvbShmaWxlcykucmVkdWNlKFxuICAgIChhY2N1LCBmLCBpKSA9PiBtZXJnZV8oaW5pdGlhbEZpbGVMb2FkaW5nUHJvZ3Jlc3MoZiwgaSkpKGFjY3UpLFxuICAgIHt9XG4gICk7XG5cbiAgY29uc3QgZmlsZUxvYWRpbmcgPSB7XG4gICAgZmlsZUNhY2hlOiBbXSxcbiAgICBmaWxlc1RvTG9hZDogZmlsZXMsXG4gICAgb25GaW5pc2hcbiAgfTtcblxuICBjb25zdCBuZXh0U3RhdGUgPSBtZXJnZV8oe2ZpbGVMb2FkaW5nUHJvZ3Jlc3MsIGZpbGVMb2FkaW5nfSkoc3RhdGUpO1xuXG4gIHJldHVybiBsb2FkTmV4dEZpbGVVcGRhdGVyKG5leHRTdGF0ZSk7XG59O1xuXG4vKipcbiAqIFN1Y2Vzc2Z1bGx5IGxvYWRlZCBvbmUgZmlsZSwgbW92ZSBvbiB0byB0aGUgbmV4dCBvbmVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sb2FkRmlsZVN0ZXBTdWNjZXNzVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlU3RlcFN1Y2Nlc3NVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgaWYgKCFzdGF0ZS5maWxlTG9hZGluZykge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCB7ZmlsZU5hbWUsIGZpbGVDYWNoZX0gPSBhY3Rpb247XG4gIGNvbnN0IHtmaWxlc1RvTG9hZCwgb25GaW5pc2h9ID0gc3RhdGUuZmlsZUxvYWRpbmc7XG4gIGNvbnN0IHN0YXRlV2l0aFByb2dyZXNzID0gdXBkYXRlRmlsZUxvYWRpbmdQcm9ncmVzc1VwZGF0ZXIoc3RhdGUsIHtcbiAgICBmaWxlTmFtZSxcbiAgICBwcm9ncmVzczoge3BlcmNlbnQ6IDEsIG1lc3NhZ2U6ICdEb25lJ31cbiAgfSk7XG5cbiAgLy8gc2F2ZSBwcm9jZXNzZWQgZmlsZSB0byBmaWxlQ2FjaGVcbiAgY29uc3Qgc3RhdGVXaXRoQ2FjaGUgPSBwaWNrXygnZmlsZUxvYWRpbmcnKShtZXJnZV8oe2ZpbGVDYWNoZX0pKShzdGF0ZVdpdGhQcm9ncmVzcyk7XG5cbiAgcmV0dXJuIHdpdGhUYXNrKFxuICAgIHN0YXRlV2l0aENhY2hlLFxuICAgIERFTEFZX1RBU0soMjAwKS5tYXAoZmlsZXNUb0xvYWQubGVuZ3RoID8gbG9hZE5leHRGaWxlIDogKCkgPT4gb25GaW5pc2goZmlsZUNhY2hlKSlcbiAgKTtcbn1cblxuLy8gd2l0aFRhc2s8VD4oc3RhdGU6IFQsIHRhc2s6IGFueSk6IFRcblxuLyoqXG4gKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxvYWROZXh0RmlsZVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkTmV4dEZpbGVVcGRhdGVyKHN0YXRlKSB7XG4gIGlmICghc3RhdGUuZmlsZUxvYWRpbmcpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2ZpbGVzVG9Mb2FkfSA9IHN0YXRlLmZpbGVMb2FkaW5nO1xuICBjb25zdCBbZmlsZSwgLi4ucmVtYWluaW5nRmlsZXNUb0xvYWRdID0gZmlsZXNUb0xvYWQ7XG5cbiAgLy8gc2F2ZSBmaWxlc1RvTG9hZCB0byBzdGF0ZVxuICBjb25zdCBuZXh0U3RhdGUgPSBwaWNrXygnZmlsZUxvYWRpbmcnKShtZXJnZV8oe2ZpbGVzVG9Mb2FkOiByZW1haW5pbmdGaWxlc1RvTG9hZH0pKShzdGF0ZSk7XG5cbiAgY29uc3Qgc3RhdGVXaXRoUHJvZ3Jlc3MgPSB1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlcihuZXh0U3RhdGUsIHtcbiAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgIHByb2dyZXNzOiB7cGVyY2VudDogMCwgbWVzc2FnZTogJ2xvYWRpbmcuLi4nfVxuICB9KTtcblxuICBjb25zdCB7bG9hZGVycywgbG9hZE9wdGlvbnN9ID0gc3RhdGU7XG4gIHJldHVybiB3aXRoVGFzayhcbiAgICBzdGF0ZVdpdGhQcm9ncmVzcyxcbiAgICBtYWtlTG9hZEZpbGVUYXNrKGZpbGUsIG5leHRTdGF0ZS5maWxlTG9hZGluZy5maWxlQ2FjaGUsIGxvYWRlcnMsIGxvYWRPcHRpb25zKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUxvYWRGaWxlVGFzayhmaWxlLCBmaWxlQ2FjaGUsIGxvYWRlcnMgPSBbXSwgbG9hZE9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gTE9BRF9GSUxFX1RBU0soe2ZpbGUsIGZpbGVDYWNoZSwgbG9hZGVycywgbG9hZE9wdGlvbnN9KS5iaW1hcChcbiAgICAvLyBwcmV0dGllciBpZ25vcmVcbiAgICAvLyBzdWNjZXNzXG4gICAgZ2VuID0+XG4gICAgICBuZXh0RmlsZUJhdGNoKHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgICAgICBvbkZpbmlzaDogcmVzdWx0ID0+XG4gICAgICAgICAgcHJvY2Vzc0ZpbGVDb250ZW50KHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCxcbiAgICAgICAgICAgIGZpbGVDYWNoZVxuICAgICAgICAgIH0pXG4gICAgICB9KSxcblxuICAgIC8vIGVycm9yXG4gICAgZXJyID0+IGxvYWRGaWxlc0VycihmaWxlLm5hbWUsIGVycilcbiAgKTtcbn1cblxuLyoqXG4gKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnByb2Nlc3NGaWxlQ29udGVudFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzRmlsZUNvbnRlbnRVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge2NvbnRlbnQsIGZpbGVDYWNoZX0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICBjb25zdCBzdGF0ZVdpdGhQcm9ncmVzcyA9IHVwZGF0ZUZpbGVMb2FkaW5nUHJvZ3Jlc3NVcGRhdGVyKHN0YXRlLCB7XG4gICAgZmlsZU5hbWU6IGNvbnRlbnQuZmlsZU5hbWUsXG4gICAgcHJvZ3Jlc3M6IHtwZXJjZW50OiAxLCBtZXNzYWdlOiAncHJvY2Vzc2luZy4uLid9XG4gIH0pO1xuXG4gIHJldHVybiB3aXRoVGFzayhcbiAgICBzdGF0ZVdpdGhQcm9ncmVzcyxcbiAgICBQUk9DRVNTX0ZJTEVfREFUQSh7Y29udGVudCwgZmlsZUNhY2hlfSkuYmltYXAoXG4gICAgICByZXN1bHQgPT4gbG9hZEZpbGVTdGVwU3VjY2Vzcyh7ZmlsZU5hbWU6IGNvbnRlbnQuZmlsZU5hbWUsIGZpbGVDYWNoZTogcmVzdWx0fSksXG4gICAgICBlcnIgPT4gbG9hZEZpbGVzRXJyKGNvbnRlbnQuZmlsZU5hbWUsIGVycilcbiAgICApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVByb2dyZXNzKHByZXZQcm9ncmVzcyA9IHt9LCBwcm9ncmVzcykge1xuICAvLyBUaGlzIGhhcHBlbnMgd2hlbiByZWNlaXZpbmcgcXVlcnkgbWV0YWRhdGEgb3Igb3RoZXIgY2FzZXMgd2UgZG9uJ3RcbiAgLy8gaGF2ZSBhbiB1cGRhdGUgZm9yIHRoZSB1c2VyLlxuICBpZiAoIXByb2dyZXNzIHx8ICFwcm9ncmVzcy5wZXJjZW50KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwZXJjZW50OiBwcm9ncmVzcy5wZXJjZW50XG4gIH07XG59XG5cbi8qKlxuICogZ2V0cyBjYWxsZWQgd2l0aCBwYXlsb2FkID0gQXN5bmNHZW5lcmF0b3I8Pz8/PlxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLm5leHRGaWxlQmF0Y2hVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbmV4dEZpbGVCYXRjaFVwZGF0ZXIgPSAoXG4gIHN0YXRlLFxuICB7cGF5bG9hZDoge2dlbiwgZmlsZU5hbWUsIHByb2dyZXNzLCBhY2N1bXVsYXRlZCwgb25GaW5pc2h9fVxuKSA9PiB7XG4gIGNvbnN0IHN0YXRlV2l0aFByb2dyZXNzID0gdXBkYXRlRmlsZUxvYWRpbmdQcm9ncmVzc1VwZGF0ZXIoc3RhdGUsIHtcbiAgICBmaWxlTmFtZSxcbiAgICBwcm9ncmVzczogcGFyc2VQcm9ncmVzcyhzdGF0ZS5maWxlTG9hZGluZ1Byb2dyZXNzW2ZpbGVOYW1lXSwgcHJvZ3Jlc3MpXG4gIH0pO1xuICByZXR1cm4gd2l0aFRhc2soXG4gICAgc3RhdGVXaXRoUHJvZ3Jlc3MsXG4gICAgVU5XUkFQX1RBU0soZ2VuLm5leHQoKSkuYmltYXAoXG4gICAgICAoe3ZhbHVlLCBkb25lfSkgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZVxuICAgICAgICAgID8gb25GaW5pc2goYWNjdW11bGF0ZWQpXG4gICAgICAgICAgOiBuZXh0RmlsZUJhdGNoKHtcbiAgICAgICAgICAgICAgZ2VuLFxuICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHZhbHVlLnByb2dyZXNzLFxuICAgICAgICAgICAgICBhY2N1bXVsYXRlZDogdmFsdWUsXG4gICAgICAgICAgICAgIG9uRmluaXNoXG4gICAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlcnIgPT4gbG9hZEZpbGVzRXJyKGZpbGVOYW1lLCBlcnIpXG4gICAgKVxuICApO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGxvYWRpbmcgZmlsZSBlcnJvclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxvYWRGaWxlc0VyclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZXNFcnJVcGRhdGVyID0gKHN0YXRlLCB7ZXJyb3IsIGZpbGVOYW1lfSkgPT4ge1xuICAvLyB1cGRhdGUgdWkgd2l0aCBlcnJvciBtZXNzYWdlXG4gIENvbnNvbGUud2FybihlcnJvcik7XG4gIGlmICghc3RhdGUuZmlsZUxvYWRpbmcpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2ZpbGVzVG9Mb2FkLCBvbkZpbmlzaCwgZmlsZUNhY2hlfSA9IHN0YXRlLmZpbGVMb2FkaW5nO1xuXG4gIGNvbnN0IG5leHRTdGF0ZSA9IHVwZGF0ZUZpbGVMb2FkaW5nUHJvZ3Jlc3NVcGRhdGVyKHN0YXRlLCB7XG4gICAgZmlsZU5hbWUsXG4gICAgcHJvZ3Jlc3M6IHtlcnJvcn1cbiAgfSk7XG5cbiAgLy8ga2ljayBvZmYgbmV4dCBmaWxlIG9yIGZpbmlzaFxuICByZXR1cm4gd2l0aFRhc2soXG4gICAgbmV4dFN0YXRlLFxuICAgIERFTEFZX1RBU0soMjAwKS5tYXAoZmlsZXNUb0xvYWQubGVuZ3RoID8gbG9hZE5leHRGaWxlIDogKCkgPT4gb25GaW5pc2goZmlsZUNhY2hlKSlcbiAgKTtcbn07XG5cbi8qKlxuICogV2hlbiBzZWxlY3QgZGF0YXNldCBmb3IgZXhwb3J0LCBhcHBseSBjcHUgZmlsdGVyIHRvIHNlbGVjdGVkIGRhdGFzZXRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5hcHBseUNQVUZpbHRlclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseUNQVUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIHtkYXRhSWR9KSA9PiB7XG4gIC8vIGFwcGx5IGNwdUZpbHRlclxuICBjb25zdCBkYXRhSWRzID0gdG9BcnJheShkYXRhSWQpO1xuXG4gIHJldHVybiBkYXRhSWRzLnJlZHVjZSgoYWNjdSwgaWQpID0+IGZpbHRlckRhdGFzZXRDUFUoYWNjdSwgaWQpLCBzdGF0ZSk7XG59O1xuXG4vKipcbiAqIFVzZXIgaW5wdXQgdG8gdXBkYXRlIHRoZSBpbmZvIG9mIHRoZSBtYXBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRNYXBJbmZvVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldE1hcEluZm9VcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBtYXBJbmZvOiB7XG4gICAgLi4uc3RhdGUubWFwSW5mbyxcbiAgICAuLi5hY3Rpb24uaW5mb1xuICB9XG59KTtcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBBbGwgbGF5ZXIgZG9tYWluIGFuZCBsYXllciBkYXRhIG9mIHN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5hZGREZWZhdWx0TGF5ZXJzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdExheWVycyhzdGF0ZSwgZGF0YXNldHMpIHtcbiAgLyoqIEB0eXBlIHtMYXllcltdfSAqL1xuICBjb25zdCBlbXB0eSA9IFtdO1xuICBjb25zdCBkZWZhdWx0TGF5ZXJzID0gT2JqZWN0LnZhbHVlcyhkYXRhc2V0cykucmVkdWNlKChhY2N1LCBkYXRhc2V0KSA9PiB7XG4gICAgY29uc3QgZm91bmRMYXllcnMgPSBmaW5kRGVmYXVsdExheWVyKGRhdGFzZXQsIHN0YXRlLmxheWVyQ2xhc3Nlcyk7XG4gICAgcmV0dXJuIGZvdW5kTGF5ZXJzICYmIGZvdW5kTGF5ZXJzLmxlbmd0aCA/IGFjY3UuY29uY2F0KGZvdW5kTGF5ZXJzKSA6IGFjY3U7XG4gIH0sIGVtcHR5KTtcblxuICByZXR1cm4ge1xuICAgIHN0YXRlOiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGxheWVyczogWy4uLnN0YXRlLmxheWVycywgLi4uZGVmYXVsdExheWVyc10sXG4gICAgICBsYXllck9yZGVyOiBbXG4gICAgICAgIC8vIHB1dCBuZXcgbGF5ZXJzIG9uIHRvcCBvZiBvbGQgb25lc1xuICAgICAgICAuLi5kZWZhdWx0TGF5ZXJzLm1hcCgoXywgaSkgPT4gc3RhdGUubGF5ZXJzLmxlbmd0aCArIGkpLFxuICAgICAgICAuLi5zdGF0ZS5sYXllck9yZGVyXG4gICAgICBdXG4gICAgfSxcbiAgICBuZXdMYXllcnM6IGRlZmF1bHRMYXllcnNcbiAgfTtcbn1cblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gZmluZCBkZWZhdWx0IHRvb2x0aXBzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERlZmF1bHRUb29sdGlwcyhzdGF0ZSwgZGF0YXNldCkge1xuICBjb25zdCB0b29sdGlwRmllbGRzID0gZmluZEZpZWxkc1RvU2hvdyhkYXRhc2V0KTtcbiAgY29uc3QgbWVyZ2VkID0ge1xuICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAuY29uZmlnLmZpZWxkc1RvU2hvdyxcbiAgICAuLi50b29sdGlwRmllbGRzXG4gIH07XG5cbiAgcmV0dXJuIHNldChbJ2ludGVyYWN0aW9uQ29uZmlnJywgJ3Rvb2x0aXAnLCAnY29uZmlnJywgJ2ZpZWxkc1RvU2hvdyddLCBtZXJnZWQsIHN0YXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxGaWxlTG9hZGluZ1Byb2dyZXNzKGZpbGUsIGluZGV4KSB7XG4gIGNvbnN0IGZpbGVOYW1lID0gZmlsZS5uYW1lIHx8IGBVbnRpdGxlZCBGaWxlICR7aW5kZXh9YDtcbiAgcmV0dXJuIHtcbiAgICBbZmlsZU5hbWVdOiB7XG4gICAgICAvLyBwZXJjZW50IG9mIGN1cnJlbnQgZmlsZVxuICAgICAgcGVyY2VudDogMCxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgZmlsZU5hbWUsXG4gICAgICBlcnJvcjogbnVsbFxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVMb2FkaW5nUHJvZ3Jlc3NVcGRhdGVyKHN0YXRlLCB7ZmlsZU5hbWUsIHByb2dyZXNzfSkge1xuICByZXR1cm4gcGlja18oJ2ZpbGVMb2FkaW5nUHJvZ3Jlc3MnKShwaWNrXyhmaWxlTmFtZSkobWVyZ2VfKHByb2dyZXNzKSkpKHN0YXRlKTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBsYXllciBkb21haW5zIGZvciBhbiBhcnJheSBvZiBkYXRhc2V0c1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKHN0YXRlLCBkYXRhSWQsIHVwZGF0ZWRGaWx0ZXIpIHtcbiAgY29uc3QgZGF0YUlkcyA9IHR5cGVvZiBkYXRhSWQgPT09ICdzdHJpbmcnID8gW2RhdGFJZF0gOiBkYXRhSWQ7XG4gIGNvbnN0IG5ld0xheWVycyA9IFtdO1xuICBjb25zdCBuZXdMYXllckRhdGEgPSBbXTtcblxuICBzdGF0ZS5sYXllcnMuZm9yRWFjaCgob2xkTGF5ZXIsIGkpID0+IHtcbiAgICBpZiAob2xkTGF5ZXIuY29uZmlnLmRhdGFJZCAmJiBkYXRhSWRzLmluY2x1ZGVzKG9sZExheWVyLmNvbmZpZy5kYXRhSWQpKSB7XG4gICAgICAvLyBObyBuZWVkIHRvIHJlY2FsY3VsYXRlIGxheWVyIGRvbWFpbiBpZiBmaWx0ZXIgaGFzIGZpeGVkIGRvbWFpblxuICAgICAgY29uc3QgbmV3TGF5ZXIgPVxuICAgICAgICB1cGRhdGVkRmlsdGVyICYmIHVwZGF0ZWRGaWx0ZXIuZml4ZWREb21haW5cbiAgICAgICAgICA/IG9sZExheWVyXG4gICAgICAgICAgOiBvbGRMYXllci51cGRhdGVMYXllckRvbWFpbihzdGF0ZS5kYXRhc2V0cywgdXBkYXRlZEZpbHRlcik7XG5cbiAgICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIHN0YXRlLmxheWVyRGF0YVtpXSk7XG5cbiAgICAgIG5ld0xheWVycy5wdXNoKGxheWVyKTtcbiAgICAgIG5ld0xheWVyRGF0YS5wdXNoKGxheWVyRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0xheWVycy5wdXNoKG9sZExheWVyKTtcbiAgICAgIG5ld0xheWVyRGF0YS5wdXNoKHN0YXRlLmxheWVyRGF0YVtpXSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IG5ld0xheWVycyxcbiAgICBsYXllckRhdGE6IG5ld0xheWVyRGF0YVxuICB9O1xuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihzdGF0ZSkge1xuICAvLyBtZXJnZSBhbGwgYW5pbWF0YWJsZSBsYXllciBkb21haW4gYW5kIHVwZGF0ZSBnbG9iYWwgY29uZmlnXG4gIGNvbnN0IGFuaW1hdGFibGVMYXllcnMgPSBzdGF0ZS5sYXllcnMuZmlsdGVyKFxuICAgIGwgPT5cbiAgICAgIGwuY29uZmlnLmlzVmlzaWJsZSAmJlxuICAgICAgbC5jb25maWcuYW5pbWF0aW9uICYmXG4gICAgICBsLmNvbmZpZy5hbmltYXRpb24uZW5hYmxlZCAmJlxuICAgICAgQXJyYXkuaXNBcnJheShsLmFuaW1hdGlvbkRvbWFpbilcbiAgKTtcblxuICBpZiAoIWFuaW1hdGFibGVMYXllcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgICAgIC4uLnN0YXRlLmFuaW1hdGlvbkNvbmZpZyxcbiAgICAgICAgZG9tYWluOiBudWxsLFxuICAgICAgICBkZWZhdWx0VGltZUZvcm1hdDogbnVsbFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdCBtZXJnZWREb21haW4gPSBhbmltYXRhYmxlTGF5ZXJzLnJlZHVjZShcbiAgICAoYWNjdSwgbGF5ZXIpID0+IFtcbiAgICAgIE1hdGgubWluKGFjY3VbMF0sIGxheWVyLmFuaW1hdGlvbkRvbWFpblswXSksXG4gICAgICBNYXRoLm1heChhY2N1WzFdLCBsYXllci5hbmltYXRpb25Eb21haW5bMV0pXG4gICAgXSxcbiAgICBbTnVtYmVyKEluZmluaXR5KSwgLUluZmluaXR5XVxuICApO1xuICBjb25zdCBkZWZhdWx0VGltZUZvcm1hdCA9IGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihtZXJnZWREb21haW4pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgICAuLi5zdGF0ZS5hbmltYXRpb25Db25maWcsXG4gICAgICBjdXJyZW50VGltZTogaXNJblJhbmdlKHN0YXRlLmFuaW1hdGlvbkNvbmZpZy5jdXJyZW50VGltZSwgbWVyZ2VkRG9tYWluKVxuICAgICAgICA/IHN0YXRlLmFuaW1hdGlvbkNvbmZpZy5jdXJyZW50VGltZVxuICAgICAgICA6IG1lcmdlZERvbWFpblswXSxcbiAgICAgIGRvbWFpbjogbWVyZ2VkRG9tYWluLFxuICAgICAgZGVmYXVsdFRpbWVGb3JtYXRcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzdGF0dXMgb2YgdGhlIGVkaXRvclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnNldEVkaXRvck1vZGVVcGRhdGVyfVxuICovXG5leHBvcnQgY29uc3Qgc2V0RWRpdG9yTW9kZVVwZGF0ZXIgPSAoc3RhdGUsIHttb2RlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGVkaXRvcjoge1xuICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICBtb2RlLFxuICAgIHNlbGVjdGVkRmVhdHVyZTogbnVsbFxuICB9XG59KTtcblxuLy8gY29uc3QgZmVhdHVyZVRvRmlsdGVyVmFsdWUgPSAoZmVhdHVyZSkgPT4gKHsuLi5mZWF0dXJlLCBpZDogZmVhdHVyZS5pZH0pO1xuLyoqXG4gKiBVcGRhdGUgZWRpdG9yIGZlYXR1cmVzXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0RmVhdHVyZXNVcGRhdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmVhdHVyZXNVcGRhdGVyKHN0YXRlLCB7ZmVhdHVyZXMgPSBbXX0pIHtcbiAgY29uc3QgbGFzdEZlYXR1cmUgPSBmZWF0dXJlcy5sZW5ndGggJiYgZmVhdHVyZXNbZmVhdHVyZXMubGVuZ3RoIC0gMV07XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdG9yOiB7XG4gICAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgICAvLyBvbmx5IHNhdmUgbm9uZSBmaWx0ZXIgZmVhdHVyZXMgdG8gZWRpdG9yXG4gICAgICBmZWF0dXJlczogZmVhdHVyZXMuZmlsdGVyKGYgPT4gIWdldEZpbHRlcklkSW5GZWF0dXJlKGYpKSxcbiAgICAgIG1vZGU6IGxhc3RGZWF0dXJlICYmIGxhc3RGZWF0dXJlLnByb3BlcnRpZXMuaXNDbG9zZWQgPyBFRElUT1JfTU9ERVMuRURJVCA6IHN0YXRlLmVkaXRvci5tb2RlXG4gICAgfVxuICB9O1xuXG4gIC8vIFJldHJpZXZlIGV4aXN0aW5nIGZlYXR1cmVcbiAgY29uc3Qge3NlbGVjdGVkRmVhdHVyZX0gPSBzdGF0ZS5lZGl0b3I7XG5cbiAgLy8gSWYgbm8gZmVhdHVyZSBpcyBzZWxlY3RlZCB3ZSBjYW4gc2ltcGx5IHJldHVybiBzaW5jZSBubyBvcGVyYXRpb25zXG4gIGlmICghc2VsZWN0ZWRGZWF0dXJlKSB7XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xuICB9XG5cbiAgLy8gVE9ETzogY2hlY2sgaWYgdGhlIGZlYXR1cmUgaGFzIGNoYW5nZWRcbiAgY29uc3QgZmVhdHVyZSA9IGZlYXR1cmVzLmZpbmQoZiA9PiBmLmlkID09PSBzZWxlY3RlZEZlYXR1cmUuaWQpO1xuXG4gIC8vIGlmIGZlYXR1cmUgaXMgcGFydCBvZiBhIGZpbHRlclxuICBjb25zdCBmaWx0ZXJJZCA9IGZlYXR1cmUgJiYgZ2V0RmlsdGVySWRJbkZlYXR1cmUoZmVhdHVyZSk7XG4gIGlmIChmaWx0ZXJJZCAmJiBmZWF0dXJlKSB7XG4gICAgY29uc3QgZmVhdHVyZVZhbHVlID0gZmVhdHVyZVRvRmlsdGVyVmFsdWUoZmVhdHVyZSwgZmlsdGVySWQpO1xuICAgIGNvbnN0IGZpbHRlcklkeCA9IHN0YXRlLmZpbHRlcnMuZmluZEluZGV4KGZpbCA9PiBmaWwuaWQgPT09IGZpbHRlcklkKTtcbiAgICByZXR1cm4gc2V0RmlsdGVyVXBkYXRlcihuZXdTdGF0ZSwge1xuICAgICAgaWR4OiBmaWx0ZXJJZHgsXG4gICAgICBwcm9wOiAndmFsdWUnLFxuICAgICAgdmFsdWU6IGZlYXR1cmVWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY3VycmVudCBzZWxlY3RlZCBmZWF0dXJlXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRTZWxlY3RlZEZlYXR1cmVVcGRhdGVyfVxuICovXG5leHBvcnQgY29uc3Qgc2V0U2VsZWN0ZWRGZWF0dXJlVXBkYXRlciA9IChzdGF0ZSwge2ZlYXR1cmV9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZWRpdG9yOiB7XG4gICAgLi4uc3RhdGUuZWRpdG9yLFxuICAgIHNlbGVjdGVkRmVhdHVyZTogZmVhdHVyZVxuICB9XG59KTtcblxuLyoqXG4gKiBEZWxldGUgZXhpc3RpbmcgZmVhdHVyZSBmcm9tIGZpbHRlcnNcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5kZWxldGVGZWF0dXJlVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUZlYXR1cmVVcGRhdGVyKHN0YXRlLCB7ZmVhdHVyZX0pIHtcbiAgaWYgKCFmZWF0dXJlKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdG9yOiB7XG4gICAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGxcbiAgICB9XG4gIH07XG5cbiAgaWYgKGdldEZpbHRlcklkSW5GZWF0dXJlKGZlYXR1cmUpKSB7XG4gICAgY29uc3QgZmlsdGVySWR4ID0gbmV3U3RhdGUuZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmlkID09PSBnZXRGaWx0ZXJJZEluRmVhdHVyZShmZWF0dXJlKSk7XG5cbiAgICByZXR1cm4gZmlsdGVySWR4ID4gLTEgPyByZW1vdmVGaWx0ZXJVcGRhdGVyKG5ld1N0YXRlLCB7aWR4OiBmaWx0ZXJJZHh9KSA6IG5ld1N0YXRlO1xuICB9XG5cbiAgLy8gbW9kaWZ5IGVkaXRvciBvYmplY3RcbiAgY29uc3QgbmV3RWRpdG9yID0ge1xuICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICBmZWF0dXJlczogc3RhdGUuZWRpdG9yLmZlYXR1cmVzLmZpbHRlcihmID0+IGYuaWQgIT09IGZlYXR1cmUuaWQpLFxuICAgIHNlbGVjdGVkRmVhdHVyZTogbnVsbFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdG9yOiBuZXdFZGl0b3JcbiAgfTtcbn1cblxuLyoqXG4gKiBUb2dnbGUgZmVhdHVyZSBhcyBsYXllciBmaWx0ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRQb2x5Z29uRmlsdGVyTGF5ZXJVcGRhdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UG9seWdvbkZpbHRlckxheWVyVXBkYXRlcihzdGF0ZSwgcGF5bG9hZCkge1xuICBjb25zdCB7bGF5ZXIsIGZlYXR1cmV9ID0gcGF5bG9hZDtcbiAgY29uc3QgZmlsdGVySWQgPSBnZXRGaWx0ZXJJZEluRmVhdHVyZShmZWF0dXJlKTtcblxuICAvLyBsZXQgbmV3RmlsdGVyID0gbnVsbDtcbiAgbGV0IGZpbHRlcklkeDtcbiAgbGV0IG5ld0xheWVySWQgPSBbbGF5ZXIuaWRdO1xuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcbiAgLy8gSWYgcG9seWdvbiBmaWx0ZXIgYWxyZWFkeSBleGlzdHMsIHdlIG5lZWQgdG8gZmluZCBvdXQgaWYgdGhlIGN1cnJlbnQgbGF5ZXIgaXMgYWxyZWFkeSBpbmNsdWRlZFxuICBpZiAoZmlsdGVySWQpIHtcbiAgICBmaWx0ZXJJZHggPSBzdGF0ZS5maWx0ZXJzLmZpbmRJbmRleChmID0+IGYuaWQgPT09IGZpbHRlcklkKTtcblxuICAgIGlmICghc3RhdGUuZmlsdGVyc1tmaWx0ZXJJZHhdKSB7XG4gICAgICAvLyB3aGF0IGlmIGZpbHRlciBkb2Vzbid0IGV4aXN0Py4uLiBub3QgcG9zc2libGUuXG4gICAgICAvLyBiZWNhdXNlIGZlYXR1cmVzIGluIHRoZSBlZGl0b3IgaXMgcGFzc2VkIGluIGZyb20gZmlsdGVycyBhbmQgZWRpdG9ycy5cbiAgICAgIC8vIGJ1dCB3ZSB3aWxsIG1vdmUgdGhpcyBmZWF0dXJlIGJhY2sgdG8gZWRpdG9yIGp1c3QgaW4gY2FzZVxuICAgICAgY29uc3Qgbm9uZUZpbHRlckZlYXR1cmUgPSB7XG4gICAgICAgIC4uLmZlYXR1cmUsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAuLi5mZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsdGVySWQ6IG51bGxcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVkaXRvcjoge1xuICAgICAgICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICAgICAgICBmZWF0dXJlczogWy4uLnN0YXRlLmVkaXRvci5mZWF0dXJlcywgbm9uZUZpbHRlckZlYXR1cmVdLFxuICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZTogbm9uZUZpbHRlckZlYXR1cmVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgZmlsdGVyID0gc3RhdGUuZmlsdGVyc1tmaWx0ZXJJZHhdO1xuICAgIGNvbnN0IHtsYXllcklkID0gW119ID0gZmlsdGVyO1xuICAgIGNvbnN0IGlzTGF5ZXJJbmNsdWRlZCA9IGxheWVySWQuaW5jbHVkZXMobGF5ZXIuaWQpO1xuXG4gICAgbmV3TGF5ZXJJZCA9IGlzTGF5ZXJJbmNsdWRlZFxuICAgICAgPyAvLyBpZiBsYXllciBpcyBpbmNsdWRlZCwgcmVtb3ZlIGl0XG4gICAgICAgIGxheWVySWQuZmlsdGVyKGwgPT4gbCAhPT0gbGF5ZXIuaWQpXG4gICAgICA6IFsuLi5sYXllcklkLCBsYXllci5pZF07XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgd2UgaGF2ZW4ndCBjcmVhdGUgdGhlIHBvbHlnb24gZmlsdGVyLCBjcmVhdGUgaXRcbiAgICBjb25zdCBuZXdGaWx0ZXIgPSBnZW5lcmF0ZVBvbHlnb25GaWx0ZXIoW10sIGZlYXR1cmUpO1xuICAgIGZpbHRlcklkeCA9IHN0YXRlLmZpbHRlcnMubGVuZ3RoO1xuXG4gICAgLy8gYWRkIGZlYXR1cmUsIHJlbW92ZSBmZWF0dXJlIGZyb20gZWlkdG9yXG4gICAgbmV3U3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGZpbHRlcnM6IFsuLi5zdGF0ZS5maWx0ZXJzLCBuZXdGaWx0ZXJdLFxuICAgICAgZWRpdG9yOiB7XG4gICAgICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICAgICAgZmVhdHVyZXM6IHN0YXRlLmVkaXRvci5mZWF0dXJlcy5maWx0ZXIoZiA9PiBmLmlkICE9PSBmZWF0dXJlLmlkKSxcbiAgICAgICAgc2VsZWN0ZWRGZWF0dXJlOiBuZXdGaWx0ZXIudmFsdWVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHNldEZpbHRlclVwZGF0ZXIobmV3U3RhdGUsIHtcbiAgICBpZHg6IGZpbHRlcklkeCxcbiAgICBwcm9wOiAnbGF5ZXJJZCcsXG4gICAgdmFsdWU6IG5ld0xheWVySWRcbiAgfSk7XG59XG5cbi8qKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnNvcnRUYWJsZUNvbHVtblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0VGFibGVDb2x1bW5VcGRhdGVyKHN0YXRlLCB7ZGF0YUlkLCBjb2x1bW4sIG1vZGV9KSB7XG4gIGNvbnN0IGRhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuICBpZiAoIWRhdGFzZXQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgbGV0IHNvcnRNb2RlID0gbW9kZTtcbiAgaWYgKCFzb3J0TW9kZSkge1xuICAgIGNvbnN0IGN1cnJlbnRNb2RlID0gZ2V0KGRhdGFzZXQsIFsnc29ydENvbHVtbicsIGNvbHVtbl0pO1xuICAgIC8vIEB0cy1pZ25vcmUgLSBzaG91bGQgYmUgZml4YWJsZSBpbiBhIFRTIGZpbGVcbiAgICBzb3J0TW9kZSA9IGN1cnJlbnRNb2RlXG4gICAgICA/IE9iamVjdC5rZXlzKFNPUlRfT1JERVIpLmZpbmQobSA9PiBtICE9PSBjdXJyZW50TW9kZSlcbiAgICAgIDogU09SVF9PUkRFUi5BU0NFTkRJTkc7XG4gIH1cblxuICBjb25zdCBzb3J0ZWQgPSBzb3J0RGF0YXNldEJ5Q29sdW1uKGRhdGFzZXQsIGNvbHVtbiwgc29ydE1vZGUpO1xuICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBzb3J0ZWQsIHN0YXRlKTtcbn1cblxuLyoqXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykucGluVGFibGVDb2x1bW5VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGluVGFibGVDb2x1bW5VcGRhdGVyKHN0YXRlLCB7ZGF0YUlkLCBjb2x1bW59KSB7XG4gIGNvbnN0IGRhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuICBpZiAoIWRhdGFzZXQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3QgZmllbGQgPSBkYXRhc2V0LmZpZWxkcy5maW5kKGYgPT4gZi5uYW1lID09PSBjb2x1bW4pO1xuICBpZiAoIWZpZWxkKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgbGV0IHBpbm5lZENvbHVtbnM7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGFzZXQucGlubmVkQ29sdW1ucykgJiYgZGF0YXNldC5waW5uZWRDb2x1bW5zLmluY2x1ZGVzKGZpZWxkLm5hbWUpKSB7XG4gICAgLy8gdW5waW4gaXRcbiAgICBwaW5uZWRDb2x1bW5zID0gZGF0YXNldC5waW5uZWRDb2x1bW5zLmZpbHRlcihjbyA9PiBjbyAhPT0gZmllbGQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcGlubmVkQ29sdW1ucyA9IChkYXRhc2V0LnBpbm5lZENvbHVtbnMgfHwgW10pLmNvbmNhdChmaWVsZC5uYW1lKTtcbiAgfVxuXG4gIHJldHVybiBzZXQoWydkYXRhc2V0cycsIGRhdGFJZCwgJ3Bpbm5lZENvbHVtbnMnXSwgcGlubmVkQ29sdW1ucywgc3RhdGUpO1xufVxuXG4vKipcbiAqIENvcHkgY29sdW1uIGNvbnRlbnQgYXMgc3RyaW5nc1xuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmNvcHlUYWJsZUNvbHVtblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VGFibGVDb2x1bW5VcGRhdGVyKHN0YXRlLCB7ZGF0YUlkLCBjb2x1bW59KSB7XG4gIGNvbnN0IGRhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuICBpZiAoIWRhdGFzZXQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3QgZmllbGRJZHggPSBkYXRhc2V0LmZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGNvbHVtbik7XG4gIGlmIChmaWVsZElkeCA8IDApIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge3R5cGV9ID0gZGF0YXNldC5maWVsZHNbZmllbGRJZHhdO1xuICBjb25zdCB0ZXh0ID0gZGF0YXNldC5kYXRhQ29udGFpbmVyXG4gICAgLm1hcChyb3cgPT4gcGFyc2VGaWVsZFZhbHVlKHJvdy52YWx1ZUF0KGZpZWxkSWR4KSwgdHlwZSksIHRydWUpXG4gICAgLmpvaW4oJ1xcbicpO1xuXG4gIGNvcHkodGV4dCk7XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBlZGl0b3JcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnRvZ2dsZUVkaXRvclZpc2liaWxpdHlVcGRhdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWRpdG9yVmlzaWJpbGl0eVVwZGF0ZXIoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBlZGl0b3I6IHtcbiAgICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICAgIHZpc2libGU6ICFzdGF0ZS5lZGl0b3IudmlzaWJsZVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvblRpbWVDb25maWdVcGRhdGVyKHN0YXRlLCB7aWR4LCBjb25maWd9KSB7XG4gIGNvbnN0IG9sZEZpbHRlciA9IHN0YXRlLmZpbHRlcnNbaWR4XTtcbiAgaWYgKCFvbGRGaWx0ZXIpIHtcbiAgICBDb25zb2xlLmVycm9yKGBmaWx0ZXJzLiR7aWR4fSBpcyB1bmRlZmluZWRgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgaWYgKG9sZEZpbHRlci50eXBlICE9PSBGSUxURVJfVFlQRVMudGltZVJhbmdlKSB7XG4gICAgQ29uc29sZS5lcnJvcihcbiAgICAgIGBzZXRGaWx0ZXJBbmltYXRpb25UaW1lQ29uZmlnIGNhbiBvbmx5IGJlIGNhbGxlZCB0byB1cGRhdGUgYSB0aW1lIGZpbHRlci4gY2hlY2sgZmlsdGVyLnR5cGUgPT09ICd0aW1lUmFuZ2UnYFxuICAgICk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgdXBkYXRlcyA9IGNoZWNrVGltZUNvbmZpZ0FyZ3MoY29uZmlnKTtcblxuICByZXR1cm4gcGlja18oJ2ZpbHRlcnMnKShzd2FwXyhtZXJnZV8odXBkYXRlcykob2xkRmlsdGVyKSkpKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUaW1lQ29uZmlnQXJncyhjb25maWcpIHtcbiAgY29uc3QgYWxsb3dlZCA9IFsndGltZUZvcm1hdCcsICd0aW1lem9uZSddO1xuICByZXR1cm4gT2JqZWN0LmtleXMoY29uZmlnKS5yZWR1Y2UoKGFjY3UsIHByb3ApID0+IHtcbiAgICBpZiAoIWFsbG93ZWQuaW5jbHVkZXMocHJvcCkpIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoXG4gICAgICAgIGBzZXRMYXllckFuaW1hdGlvblRpbWVDb25maWcgdGFrZXMgdGltZUZvcm1hdCBhbmQvb3IgdGltZXpvbmUgYXMgb3B0aW9ucywgZm91bmQgJHtwcm9wfWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9XG5cbiAgICAvLyBoZXJlIHdlIGFyZSBOT1QgY2hlY2tpbmcgaWYgdGltZXpvbmUgb3IgdGltZUZvcm1hdCBpbnB1dCBpcyB2YWxpZFxuICAgIGFjY3VbcHJvcF0gPSBjb25maWdbcHJvcF07XG4gICAgcmV0dXJuIGFjY3U7XG4gIH0sIHt9KTtcbn1cbi8qKlxuICogVXBkYXRlIGVkaXRvclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0TGF5ZXJBbmltYXRpb25UaW1lQ29uZmlnVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExheWVyQW5pbWF0aW9uVGltZUNvbmZpZ1VwZGF0ZXIoc3RhdGUsIHtjb25maWd9KSB7XG4gIGlmICghY29uZmlnKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHVwZGF0ZXMgPSBjaGVja1RpbWVDb25maWdBcmdzKGNvbmZpZyk7XG4gIHJldHVybiBwaWNrXygnYW5pbWF0aW9uQ29uZmlnJykobWVyZ2VfKHVwZGF0ZXMpKShzdGF0ZSk7XG59XG4iXX0=