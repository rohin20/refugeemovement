"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocaleUpdater = exports.showDatasetTableUpdater = exports.toggleSplitMapUpdater = exports.loadFilesErrUpdater = exports.loadFilesSuccessUpdater = exports.loadFilesUpdater = exports.removeNotificationUpdater = exports.addNotificationUpdater = exports.setExportMapHTMLModeUpdater = exports.setExportMapFormatUpdater = exports.setUserMapboxAccessTokenUpdater = exports.setExportDataUpdater = exports.setExportFilteredUpdater = exports.setExportDataTypeUpdater = exports.setExportSelectedDatasetUpdater = exports.startExportingImageUpdater = exports.cleanupExportImageUpdater = exports.setExportImageErrorUpdater = exports.setExportImageDataUriUpdater = exports.setExportImageSettingUpdater = exports.openDeleteModalUpdater = exports.setMapControlVisibilityUpdater = exports.toggleMapControlUpdater = exports.hideExportDropdownUpdater = exports.showExportDropdownUpdater = exports.toggleModalUpdater = exports.toggleSidePanelUpdater = exports.initUiStateUpdater = exports.INITIAL_UI_STATE = exports.DEFAULT_EXPORT_MAP = exports.DEFAULT_EXPORT_JSON = exports.DEFAULT_EXPORT_HTML = exports.DEFAULT_NOTIFICATIONS = exports.DEFAULT_EXPORT_DATA = exports.DEFAULT_LOAD_FILES = exports.DEFAULT_EXPORT_IMAGE = exports.DEFAULT_MAP_CONTROLS = exports.DEFAULT_MODAL = exports.DEFAULT_ACTIVE_SIDE_PANEL = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _defaultSettings = require("../constants/default-settings");

var _locales = require("../localization/locales");

var _notificationsUtils = require("../utils/notifications-utils");

var _exportUtils = require("../utils/export-utils");

var _composerHelpers = require("./composer-helpers");

var _DEFAULT_EXPORT_MAP;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_ACTIVE_SIDE_PANEL = 'layer';
exports.DEFAULT_ACTIVE_SIDE_PANEL = DEFAULT_ACTIVE_SIDE_PANEL;
var DEFAULT_MODAL = _defaultSettings.ADD_DATA_ID;
/**
 * Updaters for `uiState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 *
 * @public
 * @example
 *
 * import keplerGlReducer, {uiStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // click button to close side panel
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             uiState: uiStateUpdaters.toggleSidePanelUpdater(
 *               uiState, {payload: null}
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

exports.DEFAULT_MODAL = DEFAULT_MODAL;
var uiStateUpdaters = null;
/* eslint-enable no-unused-vars */

var DEFAULT_MAP_CONTROLS_FEATURES = {
  show: true,
  active: false,
  disableClose: false,
  // defines which map index users are interacting with (through map controls)
  activeMapIndex: 0
};
/**
 * A list of map control visibility and whether is it active.
 * @memberof uiStateUpdaters
 * @constant
 * @property visibleLayers Default: `{show: true, active: false}`
 * @property mapLegend Default: `{show: true, active: false}`
 * @property toggle3d Default: `{show: true}`
 * @property splitMap Default: `{show: true}`
 * @property mapDraw Default: `{show: true, active: false}`
 * @property mapLocale Default: `{show: false, active: false}`
 * @type {import('./ui-state-updaters').MapControls}
 * @public
 */

var DEFAULT_MAP_CONTROLS = Object.keys(_defaultSettings.MAP_CONTROLS).reduce(function (_final, current) {
  return _objectSpread(_objectSpread({}, _final), {}, (0, _defineProperty2["default"])({}, current, DEFAULT_MAP_CONTROLS_FEATURES));
}, {});
/**
 * Default image export config
 * @memberof uiStateUpdaters
 * @constant
 * @property ratio Default: `'SCREEN'`,
 * @property resolution Default: `'ONE_X'`,
 * @property legend Default: `false`,
 * @property mapH Default: 0,
 * @property mapW Default: 0,
 * @property imageSize Default: {zoomOffset: 0, scale: 1, imageW: 0, imageH: 0},
 * @property imageDataUri Default: `''`,
 * @property exporting Default: `false`
 * @property error Default: `false`
 * @type {import('./ui-state-updaters').ExportImage}
 * @public
 */

exports.DEFAULT_MAP_CONTROLS = DEFAULT_MAP_CONTROLS;
var DEFAULT_EXPORT_IMAGE = {
  // user options
  ratio: _defaultSettings.EXPORT_IMG_RATIOS.SCREEN,
  resolution: _defaultSettings.RESOLUTIONS.ONE_X,
  legend: false,
  mapH: 0,
  mapW: 0,
  imageSize: {
    zoomOffset: 0,
    scale: 1,
    imageW: 0,
    imageH: 0
  },
  // when this is set to true, the mock map viewport will move to the center of data
  center: false,
  // exporting state
  imageDataUri: '',
  // exporting: used to attach plot-container to dom
  exporting: false,
  // processing: used as loading indicator when export image is being produced
  processing: false,
  error: false
};
exports.DEFAULT_EXPORT_IMAGE = DEFAULT_EXPORT_IMAGE;
var DEFAULT_LOAD_FILES = {
  fileLoading: false
};
/**
 * Default initial `exportData` settings
 * @memberof uiStateUpdaters
 * @constant
 * @property selectedDataset Default: `''`,
 * @property dataType Default: `'csv'`,
 * @property filtered Default: `true`,
 * @type {import('./ui-state-updaters').ExportData}
 * @public
 */

exports.DEFAULT_LOAD_FILES = DEFAULT_LOAD_FILES;
var DEFAULT_EXPORT_DATA = {
  selectedDataset: '',
  dataType: _defaultSettings.EXPORT_DATA_TYPE.CSV,
  filtered: true
};
/**
 * @constant
 */

exports.DEFAULT_EXPORT_DATA = DEFAULT_EXPORT_DATA;
var DEFAULT_NOTIFICATIONS = [];
/**
 * @constant
 * @property exportMapboxAccessToken - Default: null, this is used when we provide a default mapbox token for users to take advantage of
 * @property userMapboxToken - Default: '', mapbox token provided by user through input field
 * @property mode - Default: 'READ', read only or editable
 * @type {import('./ui-state-updaters').ExportHtml}
 * @public
 */

exports.DEFAULT_NOTIFICATIONS = DEFAULT_NOTIFICATIONS;
var DEFAULT_EXPORT_HTML = {
  exportMapboxAccessToken: null,
  userMapboxToken: '',
  mode: _defaultSettings.EXPORT_HTML_MAP_MODES.READ
};
/**
 * @constant
 * @property hasData - Default: 'true',
 * @type {import('./ui-state-updaters').ExportJson}
 * @public
 */

exports.DEFAULT_EXPORT_HTML = DEFAULT_EXPORT_HTML;
var DEFAULT_EXPORT_JSON = {
  hasData: true
};
/**
 * Export Map Config
 * @constant
 * @property HTML - Default: 'DEFAULT_EXPORT_HTML',
 * @property JSON - Default: 'DEFAULT_EXPORT_JSON',
 * @property format - Default: 'HTML',
 * @type {import('./ui-state-updaters').ExportMap}
 * @public
 */

exports.DEFAULT_EXPORT_JSON = DEFAULT_EXPORT_JSON;
var DEFAULT_EXPORT_MAP = (_DEFAULT_EXPORT_MAP = {}, (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, _defaultSettings.EXPORT_MAP_FORMATS.HTML, DEFAULT_EXPORT_HTML), (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, _defaultSettings.EXPORT_MAP_FORMATS.JSON, DEFAULT_EXPORT_JSON), (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, "format", _defaultSettings.EXPORT_MAP_FORMATS.HTML), _DEFAULT_EXPORT_MAP);
/**
 * Default initial `uiState`
 * @memberof uiStateUpdaters
 * @constant
 * @property readOnly Default: `false`
 * @property activeSidePanel Default: `'layer'`
 * @property currentModal Default: `'addData'`
 * @property datasetKeyToRemove Default: `null`
 * @property visibleDropdown Default: `null`
 * @property exportImage Default: [`DEFAULT_EXPORT_IMAGE`](#default_export_image)
 * @property exportData Default: [`DEFAULT_EXPORT_DATA`](#default_export_data)
 * @property exportMap Default: [`DEFAULT_EXPORT_MAP`](#default_export_map)
 * @property mapControls Default: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @property notifications Default: `[]`
 * @property notifications Default: `[]`
 * @property loadFiles
 * @type {import('./ui-state-updaters').UiState}
 * @public
 */

exports.DEFAULT_EXPORT_MAP = DEFAULT_EXPORT_MAP;
var INITIAL_UI_STATE = {
  readOnly: false,
  activeSidePanel: DEFAULT_ACTIVE_SIDE_PANEL,
  currentModal: DEFAULT_MODAL,
  datasetKeyToRemove: null,
  visibleDropdown: null,
  // export image modal ui
  exportImage: DEFAULT_EXPORT_IMAGE,
  // export data modal ui
  exportData: DEFAULT_EXPORT_DATA,
  // html export
  exportMap: DEFAULT_EXPORT_MAP,
  // map control panels
  mapControls: DEFAULT_MAP_CONTROLS,
  // ui notifications
  notifications: DEFAULT_NOTIFICATIONS,
  // load files
  loadFiles: DEFAULT_LOAD_FILES,
  // Locale of the UI
  locale: _locales.LOCALE_CODES.en
};
/* Updaters */

/**
 * @memberof uiStateUpdaters

 */

exports.INITIAL_UI_STATE = INITIAL_UI_STATE;

var initUiStateUpdater = function initUiStateUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), (action.payload || {}).initialUiState);
};
/**
 * Toggle active side panel
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload id of side panel to be shown, one of `layer`, `filter`, `interaction`, `map`. close side panel if `null`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').toggleSidePanelUpdater}
 * @public
 */


exports.initUiStateUpdater = initUiStateUpdater;

var toggleSidePanelUpdater = function toggleSidePanelUpdater(state, _ref) {
  var id = _ref.payload;
  return id === state.activeSidePanel ? state : _objectSpread(_objectSpread({}, state), {}, {
    activeSidePanel: id
  });
};
/**
 * Show and hide modal dialog
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @paramaction.payload id of modal to be shown, null to hide modals. One of:
 *  - [`DATA_TABLE_ID`](../constants/default-settings.md#data_table_id)
 *  - [`DELETE_DATA_ID`](../constants/default-settings.md#delete_data_id)
 *  - [`ADD_DATA_ID`](../constants/default-settings.md#add_data_id)
 *  - [`EXPORT_IMAGE_ID`](../constants/default-settings.md#export_image_id)
 *  - [`EXPORT_DATA_ID`](../constants/default-settings.md#export_data_id)
 *  - [`ADD_MAP_STYLE_ID`](../constants/default-settings.md#add_map_style_id)
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').toggleModalUpdater}
 * @public
 */


exports.toggleSidePanelUpdater = toggleSidePanelUpdater;

var toggleModalUpdater = function toggleModalUpdater(state, _ref2) {
  var id = _ref2.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    currentModal: id
  });
};
/**
 * Hide and show side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateUpdaters
 * @type {typeof import('./ui-state-updaters').showExportDropdownUpdater}
 * @public
 */


exports.toggleModalUpdater = toggleModalUpdater;

var showExportDropdownUpdater = function showExportDropdownUpdater(state, _ref3) {
  var id = _ref3.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    visibleDropdown: id
  });
};
/**
 * Hide side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateUpdaters
 * @type {typeof import('./ui-state-updaters').hideExportDropdownUpdater}
 * @public
 */


exports.showExportDropdownUpdater = showExportDropdownUpdater;

var hideExportDropdownUpdater = function hideExportDropdownUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    visibleDropdown: null
  });
};
/**
 * Toggle active map control panel
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action action
 * @param action.payload map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').toggleMapControlUpdater}
 * @public
 */


exports.hideExportDropdownUpdater = hideExportDropdownUpdater;

var toggleMapControlUpdater = function toggleMapControlUpdater(state, _ref4) {
  var _ref4$payload = _ref4.payload,
      panelId = _ref4$payload.panelId,
      _ref4$payload$index = _ref4$payload.index,
      index = _ref4$payload$index === void 0 ? 0 : _ref4$payload$index;
  return _objectSpread(_objectSpread({}, state), {}, {
    mapControls: _objectSpread(_objectSpread({}, state.mapControls), {}, (0, _defineProperty2["default"])({}, panelId, _objectSpread(_objectSpread({}, state.mapControls[panelId]), {}, {
      // this handles split map interaction
      // Toggling from within the same map will simply toggle the active property
      // Toggling from within different maps we set the active property to true
      active: index === state.mapControls[panelId].activeMapIndex ? !state.mapControls[panelId].active : true,
      activeMapIndex: index
    })))
  });
};
/**
 * Toggle map control visibility
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action action
 * @param action.payload map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setMapControlVisibilityUpdater}
 * @public
 */


exports.toggleMapControlUpdater = toggleMapControlUpdater;

var setMapControlVisibilityUpdater = function setMapControlVisibilityUpdater(state, _ref5) {
  var _state$mapControls;

  var _ref5$payload = _ref5.payload,
      panelId = _ref5$payload.panelId,
      show = _ref5$payload.show;

  if (!((_state$mapControls = state.mapControls) !== null && _state$mapControls !== void 0 && _state$mapControls[panelId])) {
    return state;
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    mapControls: _objectSpread(_objectSpread({}, state.mapControls), {}, (0, _defineProperty2["default"])({}, panelId, _objectSpread(_objectSpread({}, state.mapControls[panelId]), {}, {
      show: Boolean(show)
    })))
  });
};
/**
 * Toggle active map control panel
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload dataset id
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').openDeleteModalUpdater}
 * @public
 */


exports.setMapControlVisibilityUpdater = setMapControlVisibilityUpdater;

var openDeleteModalUpdater = function openDeleteModalUpdater(state, _ref6) {
  var datasetKeyToRemove = _ref6.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    currentModal: _defaultSettings.DELETE_DATA_ID,
    datasetKeyToRemove: datasetKeyToRemove
  });
};
/**
 * Set `exportImage.legend` to `true` or `false`
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportImageSettingUpdater}
 * @public
 */


exports.openDeleteModalUpdater = openDeleteModalUpdater;

var setExportImageSettingUpdater = function setExportImageSettingUpdater(state, _ref7) {
  var newSetting = _ref7.payload;

  var updated = _objectSpread(_objectSpread({}, state.exportImage), newSetting);

  var imageSize = (0, _exportUtils.calculateExportImageSize)(updated) || state.exportImage.imageSize;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportImage: _objectSpread(_objectSpread({}, updated), {}, {
      imageSize: imageSize
    })
  });
};
/**
 * Set `exportImage.setExportImageDataUri` to a image dataUri
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload export image data uri
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportImageDataUriUpdater}
 * @public
 */


exports.setExportImageSettingUpdater = setExportImageSettingUpdater;

var setExportImageDataUriUpdater = function setExportImageDataUriUpdater(state, _ref8) {
  var dataUri = _ref8.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportImage: _objectSpread(_objectSpread({}, state.exportImage), {}, {
      processing: false,
      imageDataUri: dataUri
    })
  });
};
/**
 * @memberof uiStateUpdaters
 * @type {typeof import('./ui-state-updaters').setExportImageErrorUpdater}
 * @public
 */


exports.setExportImageDataUriUpdater = setExportImageDataUriUpdater;

var setExportImageErrorUpdater = function setExportImageErrorUpdater(state, _ref9) {
  var error = _ref9.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportImage: _objectSpread(_objectSpread({}, state.exportImage), {}, {
      processing: false,
      error: error
    })
  });
};
/**
 * Delete cached export image
 * @memberof uiStateUpdaters
 * @type {typeof import('./ui-state-updaters').cleanupExportImageUpdater}
 * @public
 */


exports.setExportImageErrorUpdater = setExportImageErrorUpdater;

var cleanupExportImageUpdater = function cleanupExportImageUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    exportImage: _objectSpread(_objectSpread({}, state.exportImage), {}, {
      exporting: false,
      imageDataUri: '',
      error: false,
      processing: false,
      center: false
    })
  });
};
/**
 * Start image exporting flow
 * @memberof uiStateUpdaters
 * @param state
 * @param options
 * @returns {UiState}
 * @type {typeof import('./ui-state-updaters').startExportingImage}
 * @public
 */


exports.cleanupExportImageUpdater = cleanupExportImageUpdater;

var startExportingImageUpdater = function startExportingImageUpdater(state, _ref10) {
  var _ref10$payload = _ref10.payload,
      options = _ref10$payload === void 0 ? {} : _ref10$payload;

  var imageSettings = _objectSpread(_objectSpread({}, options), {}, {
    exporting: true
  });

  return (0, _composerHelpers.compose_)([cleanupExportImageUpdater, (0, _composerHelpers.apply_)(setExportImageSettingUpdater, (0, _composerHelpers.payload_)(imageSettings))])(state);
};
/**
 * Set selected dataset for export
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload dataset id
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportSelectedDatasetUpdater}
 * @public
 */


exports.startExportingImageUpdater = startExportingImageUpdater;

var setExportSelectedDatasetUpdater = function setExportSelectedDatasetUpdater(state, _ref11) {
  var dataset = _ref11.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportData: _objectSpread(_objectSpread({}, state.exportData), {}, {
      selectedDataset: dataset
    })
  });
};
/**
 * Set data format for exporting data
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload one of `'text/csv'`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportDataTypeUpdater}
 * @public
 */


exports.setExportSelectedDatasetUpdater = setExportSelectedDatasetUpdater;

var setExportDataTypeUpdater = function setExportDataTypeUpdater(state, _ref12) {
  var dataType = _ref12.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportData: _objectSpread(_objectSpread({}, state.exportData), {}, {
      dataType: dataType
    })
  });
};
/**
 * Whether to export filtered data, `true` or `false`
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportFilteredUpdater}
 * @public
 */


exports.setExportDataTypeUpdater = setExportDataTypeUpdater;

var setExportFilteredUpdater = function setExportFilteredUpdater(state, _ref13) {
  var filtered = _ref13.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportData: _objectSpread(_objectSpread({}, state.exportData), {}, {
      filtered: filtered
    })
  });
};
/**
 * Whether to including data in map config, toggle between `true` or `false`
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setExportDataUpdater}
 * @public
 */


exports.setExportFilteredUpdater = setExportFilteredUpdater;

var setExportDataUpdater = function setExportDataUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    exportMap: _objectSpread(_objectSpread({}, state.exportMap), {}, (0, _defineProperty2["default"])({}, _defaultSettings.EXPORT_MAP_FORMATS.JSON, _objectSpread(_objectSpread({}, state.exportMap[_defaultSettings.EXPORT_MAP_FORMATS.JSON]), {}, {
      hasData: !state.exportMap[_defaultSettings.EXPORT_MAP_FORMATS.JSON].hasData
    })))
  });
};
/**
 * whether to export a mapbox access to HTML single page
 * @param state - `uiState`
 * @param action
 * @param action.payload
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setUserMapboxAccessTokenUpdater}
 * @public
 */


exports.setExportDataUpdater = setExportDataUpdater;

var setUserMapboxAccessTokenUpdater = function setUserMapboxAccessTokenUpdater(state, _ref14) {
  var userMapboxToken = _ref14.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportMap: _objectSpread(_objectSpread({}, state.exportMap), {}, (0, _defineProperty2["default"])({}, _defaultSettings.EXPORT_MAP_FORMATS.HTML, _objectSpread(_objectSpread({}, state.exportMap[_defaultSettings.EXPORT_MAP_FORMATS.HTML]), {}, {
      userMapboxToken: userMapboxToken
    })))
  });
};
/**
 * Sets the export map format
 * @param state - `uiState`
 * @param action
 * @param action.payload format to use to export the map into
 * @return nextState
 * @type {typeof import('./ui-state-updaters').setExportMapFormatUpdater}
 */


exports.setUserMapboxAccessTokenUpdater = setUserMapboxAccessTokenUpdater;

var setExportMapFormatUpdater = function setExportMapFormatUpdater(state, _ref15) {
  var format = _ref15.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportMap: _objectSpread(_objectSpread({}, state.exportMap), {}, {
      format: format
    })
  });
};
/**
 * Set the export html map mode
 * @param state - `uiState`
 * @param action
 * @param action.payload to be set (available modes: EXPORT_HTML_MAP_MODES)
 * @return nextState
 * @type {typeof import('./ui-state-updaters').setExportMapHTMLModeUpdater}
 */


exports.setExportMapFormatUpdater = setExportMapFormatUpdater;

var setExportMapHTMLModeUpdater = function setExportMapHTMLModeUpdater(state, _ref16) {
  var mode = _ref16.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    exportMap: _objectSpread(_objectSpread({}, state.exportMap), {}, (0, _defineProperty2["default"])({}, _defaultSettings.EXPORT_MAP_FORMATS.HTML, _objectSpread(_objectSpread({}, state.exportMap[_defaultSettings.EXPORT_MAP_FORMATS.HTML]), {}, {
      mode: mode
    })))
  });
};
/**
 * Adds a new notification.
 * Updates a notification in case of matching ids.
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload Params of a notification
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').addNotificationUpdater}
 * @public
 */


exports.setExportMapHTMLModeUpdater = setExportMapHTMLModeUpdater;

var addNotificationUpdater = function addNotificationUpdater(state, _ref17) {
  var payload = _ref17.payload;
  var notifications;
  var payloadId = payload === null || payload === void 0 ? void 0 : payload.id;
  var notificationToUpdate = payloadId ? state.notifications.find(function (n) {
    return n.id === payloadId;
  }) : null;

  if (notificationToUpdate) {
    notifications = state.notifications.map(function (n) {
      return n.id === payloadId ? (0, _notificationsUtils.createNotification)(payload) : n;
    });
  } else {
    notifications = [].concat((0, _toConsumableArray2["default"])(state.notifications || []), [(0, _notificationsUtils.createNotification)(payload)]);
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    notifications: notifications
  });
};
/**
 * Remove a notification
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload id of the notification to be removed
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').removeNotificationUpdater}
 * @public
 */


exports.addNotificationUpdater = addNotificationUpdater;

var removeNotificationUpdater = function removeNotificationUpdater(state, _ref18) {
  var id = _ref18.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    notifications: state.notifications.filter(function (n) {
      return n.id !== id;
    })
  });
};
/**
 * Fired when file loading begin
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').loadFilesUpdater}
 * @public
 */


exports.removeNotificationUpdater = removeNotificationUpdater;

var loadFilesUpdater = function loadFilesUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    loadFiles: _objectSpread(_objectSpread({}, state.loadFiles), {}, {
      fileLoading: true
    })
  });
};
/**
 * Handles loading file success and set fileLoading property to false
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').loadFilesSuccessUpdater}
 */


exports.loadFilesUpdater = loadFilesUpdater;

var loadFilesSuccessUpdater = function loadFilesSuccessUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    loadFiles: _objectSpread(_objectSpread({}, state.loadFiles), {}, {
      fileLoading: false
    })
  });
};
/**
 * Handles load file error and set fileLoading property to false
 * @memberof uiStateUpdaters
 * @param state
 * @param action
 * @param action.error
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').loadFilesErrUpdater}
 * @public
 */


exports.loadFilesSuccessUpdater = loadFilesSuccessUpdater;

var loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref19) {
  var error = _ref19.error;
  return addNotificationUpdater(_objectSpread(_objectSpread({}, state), {}, {
    loadFiles: _objectSpread(_objectSpread({}, state.loadFiles), {}, {
      fileLoading: false
    })
  }), {
    payload: (0, _notificationsUtils.errorNotification)({
      message: (error || {}).message || 'Failed to upload files',
      topic: _defaultSettings.DEFAULT_NOTIFICATION_TOPICS.global
    })
  });
};
/**
 * Handles toggle map split and reset all map control index to 0
 * @memberof uiStateUpdaters
 * @param state
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').toggleSplitMapUpdater}
 * @public
 */


exports.loadFilesErrUpdater = loadFilesErrUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    mapControls: Object.entries(state.mapControls).reduce(function (acc, entry) {
      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, entry[0], _objectSpread(_objectSpread({}, entry[1]), {}, {
        activeMapIndex: 0
      })));
    }, {})
  });
};
/**
 * Toggle modal data
 * @memberof uiStateUpdaters
 * @param state
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').showDatasetTableUpdater}
 * @public
 */


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

var showDatasetTableUpdater = function showDatasetTableUpdater(state) {
  return toggleModalUpdater(state, {
    payload: _defaultSettings.DATA_TABLE_ID
  });
};
/**
 * Set the locale of the UI
 * @memberof uiStateUpdaters
 * @param state `uiState`
 * @param action
 * @param action.payload
 * @param action.payload.locale locale
 * @returns nextState
 * @type {typeof import('./ui-state-updaters').setLocaleUpdater}
 * @public
 */


exports.showDatasetTableUpdater = showDatasetTableUpdater;

var setLocaleUpdater = function setLocaleUpdater(state, _ref20) {
  var locale = _ref20.payload.locale;
  return _objectSpread(_objectSpread({}, state), {}, {
    locale: locale
  });
};

exports.setLocaleUpdater = setLocaleUpdater;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91aS1zdGF0ZS11cGRhdGVycy5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMIiwiREVGQVVMVF9NT0RBTCIsIkFERF9EQVRBX0lEIiwidWlTdGF0ZVVwZGF0ZXJzIiwiREVGQVVMVF9NQVBfQ09OVFJPTFNfRkVBVFVSRVMiLCJzaG93IiwiYWN0aXZlIiwiZGlzYWJsZUNsb3NlIiwiYWN0aXZlTWFwSW5kZXgiLCJERUZBVUxUX01BUF9DT05UUk9MUyIsIk9iamVjdCIsImtleXMiLCJNQVBfQ09OVFJPTFMiLCJyZWR1Y2UiLCJmaW5hbCIsImN1cnJlbnQiLCJERUZBVUxUX0VYUE9SVF9JTUFHRSIsInJhdGlvIiwiRVhQT1JUX0lNR19SQVRJT1MiLCJTQ1JFRU4iLCJyZXNvbHV0aW9uIiwiUkVTT0xVVElPTlMiLCJPTkVfWCIsImxlZ2VuZCIsIm1hcEgiLCJtYXBXIiwiaW1hZ2VTaXplIiwiem9vbU9mZnNldCIsInNjYWxlIiwiaW1hZ2VXIiwiaW1hZ2VIIiwiY2VudGVyIiwiaW1hZ2VEYXRhVXJpIiwiZXhwb3J0aW5nIiwicHJvY2Vzc2luZyIsImVycm9yIiwiREVGQVVMVF9MT0FEX0ZJTEVTIiwiZmlsZUxvYWRpbmciLCJERUZBVUxUX0VYUE9SVF9EQVRBIiwic2VsZWN0ZWREYXRhc2V0IiwiZGF0YVR5cGUiLCJFWFBPUlRfREFUQV9UWVBFIiwiQ1NWIiwiZmlsdGVyZWQiLCJERUZBVUxUX05PVElGSUNBVElPTlMiLCJERUZBVUxUX0VYUE9SVF9IVE1MIiwiZXhwb3J0TWFwYm94QWNjZXNzVG9rZW4iLCJ1c2VyTWFwYm94VG9rZW4iLCJtb2RlIiwiRVhQT1JUX0hUTUxfTUFQX01PREVTIiwiUkVBRCIsIkRFRkFVTFRfRVhQT1JUX0pTT04iLCJoYXNEYXRhIiwiREVGQVVMVF9FWFBPUlRfTUFQIiwiRVhQT1JUX01BUF9GT1JNQVRTIiwiSFRNTCIsIkpTT04iLCJJTklUSUFMX1VJX1NUQVRFIiwicmVhZE9ubHkiLCJhY3RpdmVTaWRlUGFuZWwiLCJjdXJyZW50TW9kYWwiLCJkYXRhc2V0S2V5VG9SZW1vdmUiLCJ2aXNpYmxlRHJvcGRvd24iLCJleHBvcnRJbWFnZSIsImV4cG9ydERhdGEiLCJleHBvcnRNYXAiLCJtYXBDb250cm9scyIsIm5vdGlmaWNhdGlvbnMiLCJsb2FkRmlsZXMiLCJsb2NhbGUiLCJMT0NBTEVfQ09ERVMiLCJlbiIsImluaXRVaVN0YXRlVXBkYXRlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImluaXRpYWxVaVN0YXRlIiwidG9nZ2xlU2lkZVBhbmVsVXBkYXRlciIsImlkIiwidG9nZ2xlTW9kYWxVcGRhdGVyIiwic2hvd0V4cG9ydERyb3Bkb3duVXBkYXRlciIsImhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXIiLCJ0b2dnbGVNYXBDb250cm9sVXBkYXRlciIsInBhbmVsSWQiLCJpbmRleCIsInNldE1hcENvbnRyb2xWaXNpYmlsaXR5VXBkYXRlciIsIkJvb2xlYW4iLCJvcGVuRGVsZXRlTW9kYWxVcGRhdGVyIiwiREVMRVRFX0RBVEFfSUQiLCJzZXRFeHBvcnRJbWFnZVNldHRpbmdVcGRhdGVyIiwibmV3U2V0dGluZyIsInVwZGF0ZWQiLCJzZXRFeHBvcnRJbWFnZURhdGFVcmlVcGRhdGVyIiwiZGF0YVVyaSIsInNldEV4cG9ydEltYWdlRXJyb3JVcGRhdGVyIiwiY2xlYW51cEV4cG9ydEltYWdlVXBkYXRlciIsInN0YXJ0RXhwb3J0aW5nSW1hZ2VVcGRhdGVyIiwib3B0aW9ucyIsImltYWdlU2V0dGluZ3MiLCJzZXRFeHBvcnRTZWxlY3RlZERhdGFzZXRVcGRhdGVyIiwiZGF0YXNldCIsInNldEV4cG9ydERhdGFUeXBlVXBkYXRlciIsInNldEV4cG9ydEZpbHRlcmVkVXBkYXRlciIsInNldEV4cG9ydERhdGFVcGRhdGVyIiwic2V0VXNlck1hcGJveEFjY2Vzc1Rva2VuVXBkYXRlciIsInNldEV4cG9ydE1hcEZvcm1hdFVwZGF0ZXIiLCJmb3JtYXQiLCJzZXRFeHBvcnRNYXBIVE1MTW9kZVVwZGF0ZXIiLCJhZGROb3RpZmljYXRpb25VcGRhdGVyIiwicGF5bG9hZElkIiwibm90aWZpY2F0aW9uVG9VcGRhdGUiLCJmaW5kIiwibiIsIm1hcCIsInJlbW92ZU5vdGlmaWNhdGlvblVwZGF0ZXIiLCJmaWx0ZXIiLCJsb2FkRmlsZXNVcGRhdGVyIiwibG9hZEZpbGVzU3VjY2Vzc1VwZGF0ZXIiLCJsb2FkRmlsZXNFcnJVcGRhdGVyIiwibWVzc2FnZSIsInRvcGljIiwiREVGQVVMVF9OT1RJRklDQVRJT05fVE9QSUNTIiwiZ2xvYmFsIiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIiwiZW50cmllcyIsImFjYyIsImVudHJ5Iiwic2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXIiLCJEQVRBX1RBQkxFX0lEIiwic2V0TG9jYWxlVXBkYXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFZQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFTyxJQUFNQSx5QkFBeUIsR0FBRyxPQUFsQzs7QUFDQSxJQUFNQyxhQUFhLEdBQUdDLDRCQUF0QjtBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHLElBQXhCO0FBQ0E7O0FBRUEsSUFBTUMsNkJBQTZCLEdBQUc7QUFDcENDLEVBQUFBLElBQUksRUFBRSxJQUQ4QjtBQUVwQ0MsRUFBQUEsTUFBTSxFQUFFLEtBRjRCO0FBR3BDQyxFQUFBQSxZQUFZLEVBQUUsS0FIc0I7QUFJcEM7QUFDQUMsRUFBQUEsY0FBYyxFQUFFO0FBTG9CLENBQXRDO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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cUQ7QUFBVixHQUFSLENBQXRCO0FBQUEsQ0FBckM7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNPLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ3hELEtBQUQ7QUFBQSxNQUFtQkosTUFBbkIsVUFBU00sT0FBVCxDQUFtQk4sTUFBbkI7QUFBQSx5Q0FDM0JJLEtBRDJCO0FBRTlCSixJQUFBQSxNQUFNLEVBQU5BO0FBRjhCO0FBQUEsQ0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IHtcbiAgQUREX0RBVEFfSUQsXG4gIERBVEFfVEFCTEVfSUQsXG4gIERFRkFVTFRfTk9USUZJQ0FUSU9OX1RPUElDUyxcbiAgREVMRVRFX0RBVEFfSUQsXG4gIEVYUE9SVF9EQVRBX1RZUEUsXG4gIEVYUE9SVF9IVE1MX01BUF9NT0RFUyxcbiAgRVhQT1JUX0lNR19SQVRJT1MsXG4gIEVYUE9SVF9NQVBfRk9STUFUUyxcbiAgUkVTT0xVVElPTlMsXG4gIE1BUF9DT05UUk9MU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0xPQ0FMRV9DT0RFU30gZnJvbSAnbG9jYWxpemF0aW9uL2xvY2FsZXMnO1xuaW1wb3J0IHtjcmVhdGVOb3RpZmljYXRpb24sIGVycm9yTm90aWZpY2F0aW9ufSBmcm9tICd1dGlscy9ub3RpZmljYXRpb25zLXV0aWxzJztcbmltcG9ydCB7Y2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplfSBmcm9tICd1dGlscy9leHBvcnQtdXRpbHMnO1xuaW1wb3J0IHtwYXlsb2FkXywgYXBwbHlfLCBjb21wb3NlX30gZnJvbSAnLi9jb21wb3Nlci1oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQUNUSVZFX1NJREVfUEFORUwgPSAnbGF5ZXInO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTU9EQUwgPSBBRERfREFUQV9JRDtcblxuLyoqXG4gKiBVcGRhdGVycyBmb3IgYHVpU3RhdGVgIHJlZHVjZXIuIENhbiBiZSB1c2VkIGluIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGRpcmVjdGx5IG1vZGlmeSBrZXBsZXIuZ2wncyBzdGF0ZS5cbiAqIFJlYWQgbW9yZSBhYm91dCBbVXNpbmcgdXBkYXRlcnNdKC4uL2FkdmFuY2VkLXVzYWdlL3VzaW5nLXVwZGF0ZXJzLm1kKVxuICpcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IGtlcGxlckdsUmVkdWNlciwge3VpU3RhdGVVcGRhdGVyc30gZnJvbSAna2VwbGVyLmdsL3JlZHVjZXJzJztcbiAqIC8vIFJvb3QgUmVkdWNlclxuICogY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICogIGtlcGxlckdsOiBrZXBsZXJHbFJlZHVjZXIsXG4gKiAgYXBwOiBhcHBSZWR1Y2VyXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBjb21wb3NlZFJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICogIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAqICAgIC8vIGNsaWNrIGJ1dHRvbiB0byBjbG9zZSBzaWRlIHBhbmVsXG4gKiAgICBjYXNlICdDTElDS19CVVRUT04nOlxuICogICAgICByZXR1cm4ge1xuICogICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgIGtlcGxlckdsOiB7XG4gKiAgICAgICAgICAuLi5zdGF0ZS5rZXBsZXJHbCxcbiAqICAgICAgICAgIGZvbzoge1xuICogICAgICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wuZm9vLFxuICogICAgICAgICAgICAgdWlTdGF0ZTogdWlTdGF0ZVVwZGF0ZXJzLnRvZ2dsZVNpZGVQYW5lbFVwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIHVpU3RhdGUsIHtwYXlsb2FkOiBudWxsfVxuICogICAgICAgICAgICAgKVxuICogICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgICAgfTtcbiAqICB9XG4gKiAgcmV0dXJuIHJlZHVjZXJzKHN0YXRlLCBhY3Rpb24pO1xuICogfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBjb21wb3NlZFJlZHVjZXI7XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCB1aVN0YXRlVXBkYXRlcnMgPSBudWxsO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5jb25zdCBERUZBVUxUX01BUF9DT05UUk9MU19GRUFUVVJFUyA9IHtcbiAgc2hvdzogdHJ1ZSxcbiAgYWN0aXZlOiBmYWxzZSxcbiAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgLy8gZGVmaW5lcyB3aGljaCBtYXAgaW5kZXggdXNlcnMgYXJlIGludGVyYWN0aW5nIHdpdGggKHRocm91Z2ggbWFwIGNvbnRyb2xzKVxuICBhY3RpdmVNYXBJbmRleDogMFxufTtcblxuLyoqXG4gKiBBIGxpc3Qgb2YgbWFwIGNvbnRyb2wgdmlzaWJpbGl0eSBhbmQgd2hldGhlciBpcyBpdCBhY3RpdmUuXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSB2aXNpYmxlTGF5ZXJzIERlZmF1bHQ6IGB7c2hvdzogdHJ1ZSwgYWN0aXZlOiBmYWxzZX1gXG4gKiBAcHJvcGVydHkgbWFwTGVnZW5kIERlZmF1bHQ6IGB7c2hvdzogdHJ1ZSwgYWN0aXZlOiBmYWxzZX1gXG4gKiBAcHJvcGVydHkgdG9nZ2xlM2QgRGVmYXVsdDogYHtzaG93OiB0cnVlfWBcbiAqIEBwcm9wZXJ0eSBzcGxpdE1hcCBEZWZhdWx0OiBge3Nob3c6IHRydWV9YFxuICogQHByb3BlcnR5IG1hcERyYXcgRGVmYXVsdDogYHtzaG93OiB0cnVlLCBhY3RpdmU6IGZhbHNlfWBcbiAqIEBwcm9wZXJ0eSBtYXBMb2NhbGUgRGVmYXVsdDogYHtzaG93OiBmYWxzZSwgYWN0aXZlOiBmYWxzZX1gXG4gKiBAdHlwZSB7aW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuTWFwQ29udHJvbHN9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUF9DT05UUk9MUyA9IE9iamVjdC5rZXlzKE1BUF9DT05UUk9MUykucmVkdWNlKFxuICAoZmluYWwsIGN1cnJlbnQpID0+ICh7XG4gICAgLi4uZmluYWwsXG4gICAgW2N1cnJlbnRdOiBERUZBVUxUX01BUF9DT05UUk9MU19GRUFUVVJFU1xuICB9KSxcbiAge31cbik7XG5cbi8qKlxuICogRGVmYXVsdCBpbWFnZSBleHBvcnQgY29uZmlnXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSByYXRpbyBEZWZhdWx0OiBgJ1NDUkVFTidgLFxuICogQHByb3BlcnR5IHJlc29sdXRpb24gRGVmYXVsdDogYCdPTkVfWCdgLFxuICogQHByb3BlcnR5IGxlZ2VuZCBEZWZhdWx0OiBgZmFsc2VgLFxuICogQHByb3BlcnR5IG1hcEggRGVmYXVsdDogMCxcbiAqIEBwcm9wZXJ0eSBtYXBXIERlZmF1bHQ6IDAsXG4gKiBAcHJvcGVydHkgaW1hZ2VTaXplIERlZmF1bHQ6IHt6b29tT2Zmc2V0OiAwLCBzY2FsZTogMSwgaW1hZ2VXOiAwLCBpbWFnZUg6IDB9LFxuICogQHByb3BlcnR5IGltYWdlRGF0YVVyaSBEZWZhdWx0OiBgJydgLFxuICogQHByb3BlcnR5IGV4cG9ydGluZyBEZWZhdWx0OiBgZmFsc2VgXG4gKiBAcHJvcGVydHkgZXJyb3IgRGVmYXVsdDogYGZhbHNlYFxuICogQHR5cGUge2ltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLkV4cG9ydEltYWdlfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSU1BR0UgPSB7XG4gIC8vIHVzZXIgb3B0aW9uc1xuICByYXRpbzogRVhQT1JUX0lNR19SQVRJT1MuU0NSRUVOLFxuICByZXNvbHV0aW9uOiBSRVNPTFVUSU9OUy5PTkVfWCxcbiAgbGVnZW5kOiBmYWxzZSxcbiAgbWFwSDogMCxcbiAgbWFwVzogMCxcbiAgaW1hZ2VTaXplOiB7XG4gICAgem9vbU9mZnNldDogMCxcbiAgICBzY2FsZTogMSxcbiAgICBpbWFnZVc6IDAsXG4gICAgaW1hZ2VIOiAwXG4gIH0sXG4gIC8vIHdoZW4gdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgdGhlIG1vY2sgbWFwIHZpZXdwb3J0IHdpbGwgbW92ZSB0byB0aGUgY2VudGVyIG9mIGRhdGFcbiAgY2VudGVyOiBmYWxzZSxcbiAgLy8gZXhwb3J0aW5nIHN0YXRlXG4gIGltYWdlRGF0YVVyaTogJycsXG4gIC8vIGV4cG9ydGluZzogdXNlZCB0byBhdHRhY2ggcGxvdC1jb250YWluZXIgdG8gZG9tXG4gIGV4cG9ydGluZzogZmFsc2UsXG4gIC8vIHByb2Nlc3Npbmc6IHVzZWQgYXMgbG9hZGluZyBpbmRpY2F0b3Igd2hlbiBleHBvcnQgaW1hZ2UgaXMgYmVpbmcgcHJvZHVjZWRcbiAgcHJvY2Vzc2luZzogZmFsc2UsXG4gIGVycm9yOiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9BRF9GSUxFUyA9IHtcbiAgZmlsZUxvYWRpbmc6IGZhbHNlXG59O1xuXG4vKipcbiAqIERlZmF1bHQgaW5pdGlhbCBgZXhwb3J0RGF0YWAgc2V0dGluZ3NcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IHNlbGVjdGVkRGF0YXNldCBEZWZhdWx0OiBgJydgLFxuICogQHByb3BlcnR5IGRhdGFUeXBlIERlZmF1bHQ6IGAnY3N2J2AsXG4gKiBAcHJvcGVydHkgZmlsdGVyZWQgRGVmYXVsdDogYHRydWVgLFxuICogQHR5cGUge2ltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLkV4cG9ydERhdGF9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VYUE9SVF9EQVRBID0ge1xuICBzZWxlY3RlZERhdGFzZXQ6ICcnLFxuICBkYXRhVHlwZTogRVhQT1JUX0RBVEFfVFlQRS5DU1YsXG4gIGZpbHRlcmVkOiB0cnVlXG59O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9OT1RJRklDQVRJT05TID0gW107XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAcHJvcGVydHkgZXhwb3J0TWFwYm94QWNjZXNzVG9rZW4gLSBEZWZhdWx0OiBudWxsLCB0aGlzIGlzIHVzZWQgd2hlbiB3ZSBwcm92aWRlIGEgZGVmYXVsdCBtYXBib3ggdG9rZW4gZm9yIHVzZXJzIHRvIHRha2UgYWR2YW50YWdlIG9mXG4gKiBAcHJvcGVydHkgdXNlck1hcGJveFRva2VuIC0gRGVmYXVsdDogJycsIG1hcGJveCB0b2tlbiBwcm92aWRlZCBieSB1c2VyIHRocm91Z2ggaW5wdXQgZmllbGRcbiAqIEBwcm9wZXJ0eSBtb2RlIC0gRGVmYXVsdDogJ1JFQUQnLCByZWFkIG9ubHkgb3IgZWRpdGFibGVcbiAqIEB0eXBlIHtpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5FeHBvcnRIdG1sfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSFRNTCA9IHtcbiAgZXhwb3J0TWFwYm94QWNjZXNzVG9rZW46IG51bGwsXG4gIHVzZXJNYXBib3hUb2tlbjogJycsXG4gIG1vZGU6IEVYUE9SVF9IVE1MX01BUF9NT0RFUy5SRUFEXG59O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IGhhc0RhdGEgLSBEZWZhdWx0OiAndHJ1ZScsXG4gKiBAdHlwZSB7aW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuRXhwb3J0SnNvbn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVhQT1JUX0pTT04gPSB7XG4gIGhhc0RhdGE6IHRydWVcbn07XG5cbi8qKlxuICogRXhwb3J0IE1hcCBDb25maWdcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IEhUTUwgLSBEZWZhdWx0OiAnREVGQVVMVF9FWFBPUlRfSFRNTCcsXG4gKiBAcHJvcGVydHkgSlNPTiAtIERlZmF1bHQ6ICdERUZBVUxUX0VYUE9SVF9KU09OJyxcbiAqIEBwcm9wZXJ0eSBmb3JtYXQgLSBEZWZhdWx0OiAnSFRNTCcsXG4gKiBAdHlwZSB7aW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuRXhwb3J0TWFwfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfTUFQID0ge1xuICBbRVhQT1JUX01BUF9GT1JNQVRTLkhUTUxdOiBERUZBVUxUX0VYUE9SVF9IVE1MLFxuICBbRVhQT1JUX01BUF9GT1JNQVRTLkpTT05dOiBERUZBVUxUX0VYUE9SVF9KU09OLFxuICBmb3JtYXQ6IEVYUE9SVF9NQVBfRk9STUFUUy5IVE1MXG59O1xuXG4vKipcbiAqIERlZmF1bHQgaW5pdGlhbCBgdWlTdGF0ZWBcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IHJlYWRPbmx5IERlZmF1bHQ6IGBmYWxzZWBcbiAqIEBwcm9wZXJ0eSBhY3RpdmVTaWRlUGFuZWwgRGVmYXVsdDogYCdsYXllcidgXG4gKiBAcHJvcGVydHkgY3VycmVudE1vZGFsIERlZmF1bHQ6IGAnYWRkRGF0YSdgXG4gKiBAcHJvcGVydHkgZGF0YXNldEtleVRvUmVtb3ZlIERlZmF1bHQ6IGBudWxsYFxuICogQHByb3BlcnR5IHZpc2libGVEcm9wZG93biBEZWZhdWx0OiBgbnVsbGBcbiAqIEBwcm9wZXJ0eSBleHBvcnRJbWFnZSBEZWZhdWx0OiBbYERFRkFVTFRfRVhQT1JUX0lNQUdFYF0oI2RlZmF1bHRfZXhwb3J0X2ltYWdlKVxuICogQHByb3BlcnR5IGV4cG9ydERhdGEgRGVmYXVsdDogW2BERUZBVUxUX0VYUE9SVF9EQVRBYF0oI2RlZmF1bHRfZXhwb3J0X2RhdGEpXG4gKiBAcHJvcGVydHkgZXhwb3J0TWFwIERlZmF1bHQ6IFtgREVGQVVMVF9FWFBPUlRfTUFQYF0oI2RlZmF1bHRfZXhwb3J0X21hcClcbiAqIEBwcm9wZXJ0eSBtYXBDb250cm9scyBEZWZhdWx0OiBbYERFRkFVTFRfTUFQX0NPTlRST0xTYF0oI2RlZmF1bHRfbWFwX2NvbnRyb2xzKVxuICogQHByb3BlcnR5IG5vdGlmaWNhdGlvbnMgRGVmYXVsdDogYFtdYFxuICogQHByb3BlcnR5IG5vdGlmaWNhdGlvbnMgRGVmYXVsdDogYFtdYFxuICogQHByb3BlcnR5IGxvYWRGaWxlc1xuICogQHR5cGUge2ltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLlVpU3RhdGV9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX1VJX1NUQVRFID0ge1xuICByZWFkT25seTogZmFsc2UsXG4gIGFjdGl2ZVNpZGVQYW5lbDogREVGQVVMVF9BQ1RJVkVfU0lERV9QQU5FTCxcbiAgY3VycmVudE1vZGFsOiBERUZBVUxUX01PREFMLFxuICBkYXRhc2V0S2V5VG9SZW1vdmU6IG51bGwsXG4gIHZpc2libGVEcm9wZG93bjogbnVsbCxcbiAgLy8gZXhwb3J0IGltYWdlIG1vZGFsIHVpXG4gIGV4cG9ydEltYWdlOiBERUZBVUxUX0VYUE9SVF9JTUFHRSxcbiAgLy8gZXhwb3J0IGRhdGEgbW9kYWwgdWlcbiAgZXhwb3J0RGF0YTogREVGQVVMVF9FWFBPUlRfREFUQSxcbiAgLy8gaHRtbCBleHBvcnRcbiAgZXhwb3J0TWFwOiBERUZBVUxUX0VYUE9SVF9NQVAsXG4gIC8vIG1hcCBjb250cm9sIHBhbmVsc1xuICBtYXBDb250cm9sczogREVGQVVMVF9NQVBfQ09OVFJPTFMsXG4gIC8vIHVpIG5vdGlmaWNhdGlvbnNcbiAgbm90aWZpY2F0aW9uczogREVGQVVMVF9OT1RJRklDQVRJT05TLFxuICAvLyBsb2FkIGZpbGVzXG4gIGxvYWRGaWxlczogREVGQVVMVF9MT0FEX0ZJTEVTLFxuICAvLyBMb2NhbGUgb2YgdGhlIFVJXG4gIGxvY2FsZTogTE9DQUxFX0NPREVTLmVuXG59O1xuXG4vKiBVcGRhdGVycyAqL1xuLyoqXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRVaVN0YXRlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLi4uKGFjdGlvbi5wYXlsb2FkIHx8IHt9KS5pbml0aWFsVWlTdGF0ZVxufSk7XG5cbi8qKlxuICogVG9nZ2xlIGFjdGl2ZSBzaWRlIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgaWQgb2Ygc2lkZSBwYW5lbCB0byBiZSBzaG93biwgb25lIG9mIGBsYXllcmAsIGBmaWx0ZXJgLCBgaW50ZXJhY3Rpb25gLCBgbWFwYC4gY2xvc2Ugc2lkZSBwYW5lbCBpZiBgbnVsbGBcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVTaWRlUGFuZWxVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlU2lkZVBhbmVsVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlkfSkgPT4ge1xuICByZXR1cm4gaWQgPT09IHN0YXRlLmFjdGl2ZVNpZGVQYW5lbFxuICAgID8gc3RhdGVcbiAgICA6IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFjdGl2ZVNpZGVQYW5lbDogaWRcbiAgICAgIH07XG59O1xuXG4vKipcbiAqIFNob3cgYW5kIGhpZGUgbW9kYWwgZGlhbG9nXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW1hY3Rpb24ucGF5bG9hZCBpZCBvZiBtb2RhbCB0byBiZSBzaG93biwgbnVsbCB0byBoaWRlIG1vZGFscy4gT25lIG9mOlxuICogIC0gW2BEQVRBX1RBQkxFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZGF0YV90YWJsZV9pZClcbiAqICAtIFtgREVMRVRFX0RBVEFfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNkZWxldGVfZGF0YV9pZClcbiAqICAtIFtgQUREX0RBVEFfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNhZGRfZGF0YV9pZClcbiAqICAtIFtgRVhQT1JUX0lNQUdFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZXhwb3J0X2ltYWdlX2lkKVxuICogIC0gW2BFWFBPUlRfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2V4cG9ydF9kYXRhX2lkKVxuICogIC0gW2BBRERfTUFQX1NUWUxFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjYWRkX21hcF9zdHlsZV9pZClcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVNb2RhbFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVNb2RhbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjdXJyZW50TW9kYWw6IGlkXG59KTtcblxuLyoqXG4gKiBIaWRlIGFuZCBzaG93IHNpZGUgcGFuZWwgaGVhZGVyIGRyb3Bkb3duLCBhY3RpdmF0ZWQgYnkgY2xpY2tpbmcgdGhlIHNoYXJlIGxpbmsgb24gdG9wIG9mIHRoZSBzaWRlIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLnNob3dFeHBvcnREcm9wZG93blVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93RXhwb3J0RHJvcGRvd25VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogaWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgdmlzaWJsZURyb3Bkb3duOiBpZFxufSk7XG5cbi8qKlxuICogSGlkZSBzaWRlIHBhbmVsIGhlYWRlciBkcm9wZG93biwgYWN0aXZhdGVkIGJ5IGNsaWNraW5nIHRoZSBzaGFyZSBsaW5rIG9uIHRvcCBvZiB0aGUgc2lkZSBwYW5lbFxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5oaWRlRXhwb3J0RHJvcGRvd25VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgaGlkZUV4cG9ydERyb3Bkb3duVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICB2aXNpYmxlRHJvcGRvd246IG51bGxcbn0pO1xuXG4vKipcbiAqIFRvZ2dsZSBhY3RpdmUgbWFwIGNvbnRyb2wgcGFuZWxcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgbWFwIGNvbnRyb2wgcGFuZWwgaWQsIG9uZSBvZiB0aGUga2V5cyBvZjogW2BERUZBVUxUX01BUF9DT05UUk9MU2BdKCNkZWZhdWx0X21hcF9jb250cm9scylcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVNYXBDb250cm9sVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZU1hcENvbnRyb2xVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge3BhbmVsSWQsIGluZGV4ID0gMH19KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbWFwQ29udHJvbHM6IHtcbiAgICAuLi5zdGF0ZS5tYXBDb250cm9scyxcbiAgICBbcGFuZWxJZF06IHtcbiAgICAgIC4uLnN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLFxuICAgICAgLy8gdGhpcyBoYW5kbGVzIHNwbGl0IG1hcCBpbnRlcmFjdGlvblxuICAgICAgLy8gVG9nZ2xpbmcgZnJvbSB3aXRoaW4gdGhlIHNhbWUgbWFwIHdpbGwgc2ltcGx5IHRvZ2dsZSB0aGUgYWN0aXZlIHByb3BlcnR5XG4gICAgICAvLyBUb2dnbGluZyBmcm9tIHdpdGhpbiBkaWZmZXJlbnQgbWFwcyB3ZSBzZXQgdGhlIGFjdGl2ZSBwcm9wZXJ0eSB0byB0cnVlXG4gICAgICBhY3RpdmU6XG4gICAgICAgIGluZGV4ID09PSBzdGF0ZS5tYXBDb250cm9sc1twYW5lbElkXS5hY3RpdmVNYXBJbmRleFxuICAgICAgICAgID8gIXN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLmFjdGl2ZVxuICAgICAgICAgIDogdHJ1ZSxcbiAgICAgIGFjdGl2ZU1hcEluZGV4OiBpbmRleFxuICAgIH1cbiAgfVxufSk7XG5cbi8qKlxuICogVG9nZ2xlIG1hcCBjb250cm9sIHZpc2liaWxpdHlcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgbWFwIGNvbnRyb2wgcGFuZWwgaWQsIG9uZSBvZiB0aGUga2V5cyBvZjogW2BERUZBVUxUX01BUF9DT05UUk9MU2BdKCNkZWZhdWx0X21hcF9jb250cm9scylcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5zZXRNYXBDb250cm9sVmlzaWJpbGl0eVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRNYXBDb250cm9sVmlzaWJpbGl0eVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiB7cGFuZWxJZCwgc2hvd319KSA9PiB7XG4gIGlmICghc3RhdGUubWFwQ29udHJvbHM/LltwYW5lbElkXSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbWFwQ29udHJvbHM6IHtcbiAgICAgIC4uLnN0YXRlLm1hcENvbnRyb2xzLFxuICAgICAgW3BhbmVsSWRdOiB7XG4gICAgICAgIC4uLnN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLFxuICAgICAgICBzaG93OiBCb29sZWFuKHNob3cpXG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBUb2dnbGUgYWN0aXZlIG1hcCBjb250cm9sIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgZGF0YXNldCBpZFxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLm9wZW5EZWxldGVNb2RhbFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBvcGVuRGVsZXRlTW9kYWxVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogZGF0YXNldEtleVRvUmVtb3ZlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGN1cnJlbnRNb2RhbDogREVMRVRFX0RBVEFfSUQsXG4gIGRhdGFzZXRLZXlUb1JlbW92ZVxufSk7XG5cbi8qKlxuICogU2V0IGBleHBvcnRJbWFnZS5sZWdlbmRgIHRvIGB0cnVlYCBvciBgZmFsc2VgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0RXhwb3J0SW1hZ2VTZXR0aW5nVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlU2V0dGluZ1VwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBuZXdTZXR0aW5nfSkgPT4ge1xuICBjb25zdCB1cGRhdGVkID0gey4uLnN0YXRlLmV4cG9ydEltYWdlLCAuLi5uZXdTZXR0aW5nfTtcbiAgY29uc3QgaW1hZ2VTaXplID0gY2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplKHVwZGF0ZWQpIHx8IHN0YXRlLmV4cG9ydEltYWdlLmltYWdlU2l6ZTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGV4cG9ydEltYWdlOiB7XG4gICAgICAuLi51cGRhdGVkLFxuICAgICAgaW1hZ2VTaXplXG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLnNldEV4cG9ydEltYWdlRGF0YVVyaWAgdG8gYSBpbWFnZSBkYXRhVXJpXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgZXhwb3J0IGltYWdlIGRhdGEgdXJpXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlRGF0YVVyaVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBkYXRhVXJpfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgcHJvY2Vzc2luZzogZmFsc2UsXG4gICAgaW1hZ2VEYXRhVXJpOiBkYXRhVXJpXG4gIH1cbn0pO1xuXG4vKipcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0RXhwb3J0SW1hZ2VFcnJvclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRJbWFnZUVycm9yVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGVycm9yfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgcHJvY2Vzc2luZzogZmFsc2UsXG4gICAgZXJyb3JcbiAgfVxufSk7XG5cbi8qKlxuICogRGVsZXRlIGNhY2hlZCBleHBvcnQgaW1hZ2VcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuY2xlYW51cEV4cG9ydEltYWdlVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGNsZWFudXBFeHBvcnRJbWFnZVVwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICBleHBvcnRpbmc6IGZhbHNlLFxuICAgIGltYWdlRGF0YVVyaTogJycsXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIHByb2Nlc3Npbmc6IGZhbHNlLFxuICAgIGNlbnRlcjogZmFsc2VcbiAgfVxufSk7XG5cbi8qKlxuICogU3RhcnQgaW1hZ2UgZXhwb3J0aW5nIGZsb3dcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtVaVN0YXRlfVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5zdGFydEV4cG9ydGluZ0ltYWdlfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc3RhcnRFeHBvcnRpbmdJbWFnZVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBvcHRpb25zID0ge319KSA9PiB7XG4gIGNvbnN0IGltYWdlU2V0dGluZ3MgPSB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBleHBvcnRpbmc6IHRydWVcbiAgfTtcblxuICByZXR1cm4gY29tcG9zZV8oW1xuICAgIGNsZWFudXBFeHBvcnRJbWFnZVVwZGF0ZXIsXG4gICAgYXBwbHlfKHNldEV4cG9ydEltYWdlU2V0dGluZ1VwZGF0ZXIsIHBheWxvYWRfKGltYWdlU2V0dGluZ3MpKVxuICBdKShzdGF0ZSk7XG59O1xuXG4vKipcbiAqIFNldCBzZWxlY3RlZCBkYXRhc2V0IGZvciBleHBvcnRcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEBwYXJhbSBhY3Rpb24ucGF5bG9hZCBkYXRhc2V0IGlkXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydFNlbGVjdGVkRGF0YXNldFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBkYXRhc2V0fSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydERhdGE6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnREYXRhLFxuICAgIHNlbGVjdGVkRGF0YXNldDogZGF0YXNldFxuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgZGF0YSBmb3JtYXQgZm9yIGV4cG9ydGluZyBkYXRhXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgb25lIG9mIGAndGV4dC9jc3YnYFxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLnNldEV4cG9ydERhdGFUeXBlVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydERhdGFUeXBlVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGRhdGFUeXBlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydERhdGE6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnREYXRhLFxuICAgIGRhdGFUeXBlXG4gIH1cbn0pO1xuXG4vKipcbiAqIFdoZXRoZXIgdG8gZXhwb3J0IGZpbHRlcmVkIGRhdGEsIGB0cnVlYCBvciBgZmFsc2VgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWRcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5zZXRFeHBvcnRGaWx0ZXJlZFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRGaWx0ZXJlZFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBmaWx0ZXJlZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBmaWx0ZXJlZFxuICB9XG59KTtcblxuLyoqXG4gKiBXaGV0aGVyIHRvIGluY2x1ZGluZyBkYXRhIGluIG1hcCBjb25maWcsIHRvZ2dsZSBiZXR3ZWVuIGB0cnVlYCBvciBgZmFsc2VgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0RXhwb3J0RGF0YVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnREYXRhVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRNYXA6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRNYXAsXG4gICAgW0VYUE9SVF9NQVBfRk9STUFUUy5KU09OXToge1xuICAgICAgLi4uc3RhdGUuZXhwb3J0TWFwW0VYUE9SVF9NQVBfRk9STUFUUy5KU09OXSxcbiAgICAgIGhhc0RhdGE6ICFzdGF0ZS5leHBvcnRNYXBbRVhQT1JUX01BUF9GT1JNQVRTLkpTT05dLmhhc0RhdGFcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIHdoZXRoZXIgdG8gZXhwb3J0IGEgbWFwYm94IGFjY2VzcyB0byBIVE1MIHNpbmdsZSBwYWdlXG4gKiBAcGFyYW0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEBwYXJhbSBhY3Rpb24ucGF5bG9hZFxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLnNldFVzZXJNYXBib3hBY2Nlc3NUb2tlblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRVc2VyTWFwYm94QWNjZXNzVG9rZW5VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogdXNlck1hcGJveFRva2VufSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydE1hcDoge1xuICAgIC4uLnN0YXRlLmV4cG9ydE1hcCxcbiAgICBbRVhQT1JUX01BUF9GT1JNQVRTLkhUTUxdOiB7XG4gICAgICAuLi5zdGF0ZS5leHBvcnRNYXBbRVhQT1JUX01BUF9GT1JNQVRTLkhUTUxdLFxuICAgICAgdXNlck1hcGJveFRva2VuXG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBTZXRzIHRoZSBleHBvcnQgbWFwIGZvcm1hdFxuICogQHBhcmFtIHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWQgZm9ybWF0IHRvIHVzZSB0byBleHBvcnQgdGhlIG1hcCBpbnRvXG4gKiBAcmV0dXJuIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5zZXRFeHBvcnRNYXBGb3JtYXRVcGRhdGVyfVxuICovXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0TWFwRm9ybWF0VXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGZvcm1hdH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRNYXA6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRNYXAsXG4gICAgZm9ybWF0XG4gIH1cbn0pO1xuXG4vKipcbiAqIFNldCB0aGUgZXhwb3J0IGh0bWwgbWFwIG1vZGVcbiAqIEBwYXJhbSBzdGF0ZSAtIGB1aVN0YXRlYFxuICogQHBhcmFtIGFjdGlvblxuICogQHBhcmFtIGFjdGlvbi5wYXlsb2FkIHRvIGJlIHNldCAoYXZhaWxhYmxlIG1vZGVzOiBFWFBPUlRfSFRNTF9NQVBfTU9ERVMpXG4gKiBAcmV0dXJuIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5zZXRFeHBvcnRNYXBIVE1MTW9kZVVwZGF0ZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRNYXBIVE1MTW9kZVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBtb2RlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydE1hcDoge1xuICAgIC4uLnN0YXRlLmV4cG9ydE1hcCxcbiAgICBbRVhQT1JUX01BUF9GT1JNQVRTLkhUTUxdOiB7XG4gICAgICAuLi5zdGF0ZS5leHBvcnRNYXBbRVhQT1JUX01BUF9GT1JNQVRTLkhUTUxdLFxuICAgICAgbW9kZVxuICAgIH1cbiAgfVxufSk7XG5cbi8qKlxuICogQWRkcyBhIG5ldyBub3RpZmljYXRpb24uXG4gKiBVcGRhdGVzIGEgbm90aWZpY2F0aW9uIGluIGNhc2Ugb2YgbWF0Y2hpbmcgaWRzLlxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIGFjdGlvblxuICogQHBhcmFtIGFjdGlvbi5wYXlsb2FkIFBhcmFtcyBvZiBhIG5vdGlmaWNhdGlvblxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLmFkZE5vdGlmaWNhdGlvblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhZGROb3RpZmljYXRpb25VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZH0pID0+IHtcbiAgbGV0IG5vdGlmaWNhdGlvbnM7XG5cbiAgY29uc3QgcGF5bG9hZElkID0gcGF5bG9hZD8uaWQ7XG4gIGNvbnN0IG5vdGlmaWNhdGlvblRvVXBkYXRlID0gcGF5bG9hZElkID8gc3RhdGUubm90aWZpY2F0aW9ucy5maW5kKG4gPT4gbi5pZCA9PT0gcGF5bG9hZElkKSA6IG51bGw7XG4gIGlmIChub3RpZmljYXRpb25Ub1VwZGF0ZSkge1xuICAgIG5vdGlmaWNhdGlvbnMgPSBzdGF0ZS5ub3RpZmljYXRpb25zLm1hcChuID0+XG4gICAgICBuLmlkID09PSBwYXlsb2FkSWQgPyBjcmVhdGVOb3RpZmljYXRpb24ocGF5bG9hZCkgOiBuXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBub3RpZmljYXRpb25zID0gWy4uLihzdGF0ZS5ub3RpZmljYXRpb25zIHx8IFtdKSwgY3JlYXRlTm90aWZpY2F0aW9uKHBheWxvYWQpXTtcbiAgfVxuXG4gIHJldHVybiB7Li4uc3RhdGUsIG5vdGlmaWNhdGlvbnN9O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBub3RpZmljYXRpb25cbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEBwYXJhbSBhY3Rpb24ucGF5bG9hZCBpZCBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5yZW1vdmVOb3RpZmljYXRpb25VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTm90aWZpY2F0aW9uVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG5vdGlmaWNhdGlvbnM6IHN0YXRlLm5vdGlmaWNhdGlvbnMuZmlsdGVyKG4gPT4gbi5pZCAhPT0gaWQpXG59KTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuIGZpbGUgbG9hZGluZyBiZWdpblxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHN0YXRlIGB1aVN0YXRlYFxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLmxvYWRGaWxlc1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZXNVcGRhdGVyID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxvYWRGaWxlczoge1xuICAgIC4uLnN0YXRlLmxvYWRGaWxlcyxcbiAgICBmaWxlTG9hZGluZzogdHJ1ZVxuICB9XG59KTtcblxuLyoqXG4gKiBIYW5kbGVzIGxvYWRpbmcgZmlsZSBzdWNjZXNzIGFuZCBzZXQgZmlsZUxvYWRpbmcgcHJvcGVydHkgdG8gZmFsc2VcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdWktc3RhdGUtdXBkYXRlcnMnKS5sb2FkRmlsZXNTdWNjZXNzVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc1N1Y2Nlc3NVcGRhdGVyID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxvYWRGaWxlczoge1xuICAgIC4uLnN0YXRlLmxvYWRGaWxlcyxcbiAgICBmaWxlTG9hZGluZzogZmFsc2VcbiAgfVxufSk7XG5cbi8qKlxuICogSGFuZGxlcyBsb2FkIGZpbGUgZXJyb3IgYW5kIHNldCBmaWxlTG9hZGluZyBwcm9wZXJ0eSB0byBmYWxzZVxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLmVycm9yXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykubG9hZEZpbGVzRXJyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc0VyclVwZGF0ZXIgPSAoc3RhdGUsIHtlcnJvcn0pID0+XG4gIGFkZE5vdGlmaWNhdGlvblVwZGF0ZXIoXG4gICAge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBsb2FkRmlsZXM6IHtcbiAgICAgICAgLi4uc3RhdGUubG9hZEZpbGVzLFxuICAgICAgICBmaWxlTG9hZGluZzogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIHBheWxvYWQ6IGVycm9yTm90aWZpY2F0aW9uKHtcbiAgICAgICAgbWVzc2FnZTogKGVycm9yIHx8IHt9KS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGZpbGVzJyxcbiAgICAgICAgdG9waWM6IERFRkFVTFRfTk9USUZJQ0FUSU9OX1RPUElDUy5nbG9iYWxcbiAgICAgIH0pXG4gICAgfVxuICApO1xuXG4vKipcbiAqIEhhbmRsZXMgdG9nZ2xlIG1hcCBzcGxpdCBhbmQgcmVzZXQgYWxsIG1hcCBjb250cm9sIGluZGV4IHRvIDBcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLnRvZ2dsZVNwbGl0TWFwVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVNwbGl0TWFwVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBtYXBDb250cm9sczogT2JqZWN0LmVudHJpZXMoc3RhdGUubWFwQ29udHJvbHMpLnJlZHVjZShcbiAgICAoYWNjLCBlbnRyeSkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtlbnRyeVswXV06IHtcbiAgICAgICAgLi4uZW50cnlbMV0sXG4gICAgICAgIGFjdGl2ZU1hcEluZGV4OiAwXG4gICAgICB9XG4gICAgfSksXG4gICAge31cbiAgKVxufSk7XG5cbi8qKlxuICogVG9nZ2xlIG1vZGFsIGRhdGFcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi91aS1zdGF0ZS11cGRhdGVycycpLnNob3dEYXRhc2V0VGFibGVVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXIgPSBzdGF0ZSA9PiB0b2dnbGVNb2RhbFVwZGF0ZXIoc3RhdGUsIHtwYXlsb2FkOiBEQVRBX1RBQkxFX0lEfSk7XG5cbi8qKlxuICogU2V0IHRoZSBsb2NhbGUgb2YgdGhlIFVJXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcGFyYW0gYWN0aW9uLnBheWxvYWRcbiAqIEBwYXJhbSBhY3Rpb24ucGF5bG9hZC5sb2NhbGUgbG9jYWxlXG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3VpLXN0YXRlLXVwZGF0ZXJzJykuc2V0TG9jYWxlVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldExvY2FsZVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiB7bG9jYWxlfX0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsb2NhbGVcbn0pO1xuIl19