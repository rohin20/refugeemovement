"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

var _localization = require("../../localization");

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
function MapControlTooltipFactory() {
  /** @type {import('./map-control-tooltip').MapControlTooltipComponent} */
  var MapControlTooltip = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var id = _ref.id,
        message = _ref.message;
    return /*#__PURE__*/_react["default"].createElement(_.Tooltip, {
      id: id,
      place: "left",
      effect: "solid"
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: message
    })));
  });

  MapControlTooltip.displayName = 'MapControlTooltip';
  return MapControlTooltip;
}

var _default = MapControlTooltipFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtY29udHJvbC10b29sdGlwLmpzIl0sIm5hbWVzIjpbIk1hcENvbnRyb2xUb29sdGlwRmFjdG9yeSIsIk1hcENvbnRyb2xUb29sdGlwIiwiUmVhY3QiLCJtZW1vIiwiaWQiLCJtZXNzYWdlIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxTQUFTQSx3QkFBVCxHQUFvQztBQUNsQztBQUNBLE1BQU1DLGlCQUFpQixnQkFBR0Msa0JBQU1DLElBQU4sQ0FBVztBQUFBLFFBQUVDLEVBQUYsUUFBRUEsRUFBRjtBQUFBLFFBQU1DLE9BQU4sUUFBTUEsT0FBTjtBQUFBLHdCQUNuQyxnQ0FBQyxTQUFEO0FBQVMsTUFBQSxFQUFFLEVBQUVELEVBQWI7QUFBaUIsTUFBQSxLQUFLLEVBQUMsTUFBdkI7QUFBOEIsTUFBQSxNQUFNLEVBQUM7QUFBckMsb0JBQ0UsMkRBQ0UsZ0NBQUMsOEJBQUQ7QUFBa0IsTUFBQSxFQUFFLEVBQUVDO0FBQXRCLE1BREYsQ0FERixDQURtQztBQUFBLEdBQVgsQ0FBMUI7O0FBUUFKLEVBQUFBLGlCQUFpQixDQUFDSyxXQUFsQixHQUFnQyxtQkFBaEM7QUFFQSxTQUFPTCxpQkFBUDtBQUNEOztlQUVjRCx3QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gJy4uJztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnbG9jYWxpemF0aW9uJztcblxuZnVuY3Rpb24gTWFwQ29udHJvbFRvb2x0aXBGYWN0b3J5KCkge1xuICAvKiogQHR5cGUge2ltcG9ydCgnLi9tYXAtY29udHJvbC10b29sdGlwJykuTWFwQ29udHJvbFRvb2x0aXBDb21wb25lbnR9ICovXG4gIGNvbnN0IE1hcENvbnRyb2xUb29sdGlwID0gUmVhY3QubWVtbygoe2lkLCBtZXNzYWdlfSkgPT4gKFxuICAgIDxUb29sdGlwIGlkPXtpZH0gcGxhY2U9XCJsZWZ0XCIgZWZmZWN0PVwic29saWRcIj5cbiAgICAgIDxzcGFuPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bWVzc2FnZX0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L1Rvb2x0aXA+XG4gICkpO1xuXG4gIE1hcENvbnRyb2xUb29sdGlwLmRpc3BsYXlOYW1lID0gJ01hcENvbnRyb2xUb29sdGlwJztcblxuICByZXR1cm4gTWFwQ29udHJvbFRvb2x0aXA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcENvbnRyb2xUb29sdGlwRmFjdG9yeTtcbiJdfQ==