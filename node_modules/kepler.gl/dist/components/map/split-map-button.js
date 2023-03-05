"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = require("../common/styled-components");

var _icons = require("../common/icons");

var _mapControlTooltip = _interopRequireDefault(require("./map-control-tooltip"));

var _mapControlPanel = _interopRequireDefault(require("./map-control-panel"));

// Copyright (c) 2021 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
SplitMapButtonFactory.deps = [_mapControlTooltip["default"], _mapControlPanel["default"]];

function SplitMapButtonFactory(MapControlTooltip) {
  var defaultActionIcons = {
    "delete": _icons.Delete,
    split: _icons.Split
  };
  /** @type {import('./split-map-button').SplitMapButtonComponent} */

  var SplitMapButton = function SplitMapButton(_ref) {
    var isSplit = _ref.isSplit,
        mapIndex = _ref.mapIndex,
        onToggleSplitMap = _ref.onToggleSplitMap,
        _ref$actionIcons = _ref.actionIcons,
        actionIcons = _ref$actionIcons === void 0 ? defaultActionIcons : _ref$actionIcons,
        mapControls = _ref.mapControls,
        readOnly = _ref.readOnly;
    var splitMap = (mapControls === null || mapControls === void 0 ? void 0 : mapControls.splitMap) || {};
    var onClick = (0, _react.useCallback)(function (event) {
      event.preventDefault();
      onToggleSplitMap(isSplit ? mapIndex : undefined);
    }, [isSplit, mapIndex, onToggleSplitMap]);
    var isVisible = (0, _react.useMemo)(function () {
      return splitMap.show && readOnly !== true;
    }, [splitMap.show, readOnly]);

    if (!splitMap.show) {
      return null;
    }

    return isVisible ? /*#__PURE__*/_react["default"].createElement(_styledComponents.MapControlButton, {
      active: isSplit,
      onClick: onClick,
      key: "split-".concat(isSplit),
      className: (0, _classnames["default"])('map-control-button', 'split-map', {
        'close-map': isSplit
      }),
      "data-tip": true,
      "data-for": "action-toggle"
    }, isSplit ? /*#__PURE__*/_react["default"].createElement(actionIcons["delete"], {
      height: "18px"
    }) : /*#__PURE__*/_react["default"].createElement(actionIcons.split, {
      height: "18px"
    }), /*#__PURE__*/_react["default"].createElement(MapControlTooltip, {
      id: "action-toggle",
      message: isSplit ? 'tooltip.closePanel' : 'tooltip.switchToDualView'
    })) : null;
  };

  SplitMapButton.displayName = 'SplitMapButton';
  return /*#__PURE__*/_react["default"].memo(SplitMapButton);
}

var _default = SplitMapButtonFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9zcGxpdC1tYXAtYnV0dG9uLmpzIl0sIm5hbWVzIjpbIlNwbGl0TWFwQnV0dG9uRmFjdG9yeSIsImRlcHMiLCJNYXBDb250cm9sVG9vbHRpcEZhY3RvcnkiLCJNYXBDb250cm9sUGFuZWxGYWN0b3J5IiwiTWFwQ29udHJvbFRvb2x0aXAiLCJkZWZhdWx0QWN0aW9uSWNvbnMiLCJEZWxldGUiLCJzcGxpdCIsIlNwbGl0IiwiU3BsaXRNYXBCdXR0b24iLCJpc1NwbGl0IiwibWFwSW5kZXgiLCJvblRvZ2dsZVNwbGl0TWFwIiwiYWN0aW9uSWNvbnMiLCJtYXBDb250cm9scyIsInJlYWRPbmx5Iiwic3BsaXRNYXAiLCJvbkNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVuZGVmaW5lZCIsImlzVmlzaWJsZSIsInNob3ciLCJkaXNwbGF5TmFtZSIsIlJlYWN0IiwibWVtbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0FBLHFCQUFxQixDQUFDQyxJQUF0QixHQUE2QixDQUFDQyw2QkFBRCxFQUEyQkMsMkJBQTNCLENBQTdCOztBQUVBLFNBQVNILHFCQUFULENBQStCSSxpQkFBL0IsRUFBa0Q7QUFDaEQsTUFBTUMsa0JBQWtCLEdBQUc7QUFDekIsY0FBUUMsYUFEaUI7QUFFekJDLElBQUFBLEtBQUssRUFBRUM7QUFGa0IsR0FBM0I7QUFLQTs7QUFDQSxNQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLE9BT2pCO0FBQUEsUUFOSkMsT0FNSSxRQU5KQSxPQU1JO0FBQUEsUUFMSkMsUUFLSSxRQUxKQSxRQUtJO0FBQUEsUUFKSkMsZ0JBSUksUUFKSkEsZ0JBSUk7QUFBQSxnQ0FISkMsV0FHSTtBQUFBLFFBSEpBLFdBR0ksaUNBSFVSLGtCQUdWO0FBQUEsUUFGSlMsV0FFSSxRQUZKQSxXQUVJO0FBQUEsUUFESkMsUUFDSSxRQURKQSxRQUNJO0FBQ0osUUFBTUMsUUFBUSxHQUFHLENBQUFGLFdBQVcsU0FBWCxJQUFBQSxXQUFXLFdBQVgsWUFBQUEsV0FBVyxDQUFFRSxRQUFiLEtBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBTyxHQUFHLHdCQUNkLFVBQUFDLEtBQUssRUFBSTtBQUNQQSxNQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQVAsTUFBQUEsZ0JBQWdCLENBQUNGLE9BQU8sR0FBR0MsUUFBSCxHQUFjUyxTQUF0QixDQUFoQjtBQUNELEtBSmEsRUFLZCxDQUFDVixPQUFELEVBQVVDLFFBQVYsRUFBb0JDLGdCQUFwQixDQUxjLENBQWhCO0FBUUEsUUFBTVMsU0FBUyxHQUFHLG9CQUFRO0FBQUEsYUFBTUwsUUFBUSxDQUFDTSxJQUFULElBQWlCUCxRQUFRLEtBQUssSUFBcEM7QUFBQSxLQUFSLEVBQWtELENBQUNDLFFBQVEsQ0FBQ00sSUFBVixFQUFnQlAsUUFBaEIsQ0FBbEQsQ0FBbEI7O0FBRUEsUUFBSSxDQUFDQyxRQUFRLENBQUNNLElBQWQsRUFBb0I7QUFDbEIsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBT0QsU0FBUyxnQkFDYixnQ0FBQyxrQ0FBRDtBQUNDLE1BQUEsTUFBTSxFQUFFWCxPQURUO0FBRUMsTUFBQSxPQUFPLEVBQUVPLE9BRlY7QUFHQyxNQUFBLEdBQUcsa0JBQVdQLE9BQVgsQ0FISjtBQUlDLE1BQUEsU0FBUyxFQUFFLDRCQUFXLG9CQUFYLEVBQWlDLFdBQWpDLEVBQThDO0FBQUMscUJBQWFBO0FBQWQsT0FBOUMsQ0FKWjtBQUtDLHNCQUxEO0FBTUMsa0JBQVM7QUFOVixPQVFFQSxPQUFPLGdCQUFHLGdDQUFDLFdBQUQ7QUFBb0IsTUFBQSxNQUFNLEVBQUM7QUFBM0IsTUFBSCxnQkFBMEMsZ0NBQUMsV0FBRCxDQUFhLEtBQWI7QUFBbUIsTUFBQSxNQUFNLEVBQUM7QUFBMUIsTUFSbkQsZUFTQyxnQ0FBQyxpQkFBRDtBQUNFLE1BQUEsRUFBRSxFQUFDLGVBREw7QUFFRSxNQUFBLE9BQU8sRUFBRUEsT0FBTyxHQUFHLG9CQUFILEdBQTBCO0FBRjVDLE1BVEQsQ0FEYSxHQWVaLElBZko7QUFnQkQsR0F2Q0Q7O0FBeUNBRCxFQUFBQSxjQUFjLENBQUNjLFdBQWYsR0FBNkIsZ0JBQTdCO0FBQ0Esc0JBQU9DLGtCQUFNQyxJQUFOLENBQVdoQixjQUFYLENBQVA7QUFDRDs7ZUFFY1QscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjEgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHt1c2VDYWxsYmFjaywgdXNlTWVtb30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge01hcENvbnRyb2xCdXR0b259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7RGVsZXRlLCBTcGxpdH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IE1hcENvbnRyb2xUb29sdGlwRmFjdG9yeSBmcm9tICcuL21hcC1jb250cm9sLXRvb2x0aXAnO1xuaW1wb3J0IE1hcENvbnRyb2xQYW5lbEZhY3RvcnkgZnJvbSAnLi9tYXAtY29udHJvbC1wYW5lbCc7XG5cblNwbGl0TWFwQnV0dG9uRmFjdG9yeS5kZXBzID0gW01hcENvbnRyb2xUb29sdGlwRmFjdG9yeSwgTWFwQ29udHJvbFBhbmVsRmFjdG9yeV07XG5cbmZ1bmN0aW9uIFNwbGl0TWFwQnV0dG9uRmFjdG9yeShNYXBDb250cm9sVG9vbHRpcCkge1xuICBjb25zdCBkZWZhdWx0QWN0aW9uSWNvbnMgPSB7XG4gICAgZGVsZXRlOiBEZWxldGUsXG4gICAgc3BsaXQ6IFNwbGl0XG4gIH07XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJy4vc3BsaXQtbWFwLWJ1dHRvbicpLlNwbGl0TWFwQnV0dG9uQ29tcG9uZW50fSAqL1xuICBjb25zdCBTcGxpdE1hcEJ1dHRvbiA9ICh7XG4gICAgaXNTcGxpdCxcbiAgICBtYXBJbmRleCxcbiAgICBvblRvZ2dsZVNwbGl0TWFwLFxuICAgIGFjdGlvbkljb25zID0gZGVmYXVsdEFjdGlvbkljb25zLFxuICAgIG1hcENvbnRyb2xzLFxuICAgIHJlYWRPbmx5XG4gIH0pID0+IHtcbiAgICBjb25zdCBzcGxpdE1hcCA9IG1hcENvbnRyb2xzPy5zcGxpdE1hcCB8fCB7fTtcbiAgICBjb25zdCBvbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgICBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uVG9nZ2xlU3BsaXRNYXAoaXNTcGxpdCA/IG1hcEluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgIH0sXG4gICAgICBbaXNTcGxpdCwgbWFwSW5kZXgsIG9uVG9nZ2xlU3BsaXRNYXBdXG4gICAgKTtcblxuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHVzZU1lbW8oKCkgPT4gc3BsaXRNYXAuc2hvdyAmJiByZWFkT25seSAhPT0gdHJ1ZSwgW3NwbGl0TWFwLnNob3csIHJlYWRPbmx5XSk7XG5cbiAgICBpZiAoIXNwbGl0TWFwLnNob3cpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBpc1Zpc2libGUgPyAoXG4gICAgICAoPE1hcENvbnRyb2xCdXR0b25cbiAgICAgICAgYWN0aXZlPXtpc1NwbGl0fVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICBrZXk9e2BzcGxpdC0ke2lzU3BsaXR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdtYXAtY29udHJvbC1idXR0b24nLCAnc3BsaXQtbWFwJywgeydjbG9zZS1tYXAnOiBpc1NwbGl0fSl9XG4gICAgICAgIGRhdGEtdGlwXG4gICAgICAgIGRhdGEtZm9yPVwiYWN0aW9uLXRvZ2dsZVwiXG4gICAgICA+XG4gICAgICAgIHtpc1NwbGl0ID8gPGFjdGlvbkljb25zLmRlbGV0ZSBoZWlnaHQ9XCIxOHB4XCIgLz4gOiA8YWN0aW9uSWNvbnMuc3BsaXQgaGVpZ2h0PVwiMThweFwiIC8+fVxuICAgICAgICA8TWFwQ29udHJvbFRvb2x0aXBcbiAgICAgICAgICBpZD1cImFjdGlvbi10b2dnbGVcIlxuICAgICAgICAgIG1lc3NhZ2U9e2lzU3BsaXQgPyAndG9vbHRpcC5jbG9zZVBhbmVsJyA6ICd0b29sdGlwLnN3aXRjaFRvRHVhbFZpZXcnfVxuICAgICAgICAvPlxuICAgICAgPC9NYXBDb250cm9sQnV0dG9uPilcbiAgICApIDogbnVsbDtcbiAgfTtcblxuICBTcGxpdE1hcEJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdTcGxpdE1hcEJ1dHRvbic7XG4gIHJldHVybiBSZWFjdC5tZW1vKFNwbGl0TWFwQnV0dG9uKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3BsaXRNYXBCdXR0b25GYWN0b3J5O1xuIl19