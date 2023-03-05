"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeDimensions = observeDimensions;
exports.unobserveDimensions = unobserveDimensions;
exports["default"] = useDimensions;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _react = require("react");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DEFAULT_THROTTLE_DELAY = 100; // Using a single ResizeObserver for all elements can be 10x
// more performant than using a separate ResizeObserver per element
// https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ

var _observerRegistry;

function getObserverRegistry() {
  if (_observerRegistry === undefined) {
    var callbacks = new Map();
    var resizeObserver = new _resizeObserverPolyfill["default"](function (entries, observer) {
      var _iterator = _createForOfIteratorHelper(entries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _callbacks$get;

          var entry = _step.value;
          (_callbacks$get = callbacks.get(entry.target)) === null || _callbacks$get === void 0 ? void 0 : _callbacks$get(entry, observer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    _observerRegistry = {
      subscribe: function subscribe(target, callback) {
        resizeObserver.observe(target);
        callbacks.set(target, callback);
      },
      unsubscribe: function unsubscribe(target) {
        resizeObserver.unobserve(target);
        callbacks["delete"](target);
      }
    };
  }

  return _observerRegistry;
}

function observeDimensions(target, handleResize) {
  var throttleDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_THROTTLE_DELAY;
  var registry = getObserverRegistry();
  var handler = throttleDelay > 0 ? (0, _lodash["default"])(handleResize, throttleDelay) : handleResize;
  registry.subscribe(target, function (entry) {
    return handler(getSize(target, entry));
  });
}

function unobserveDimensions(target) {
  var registry = getObserverRegistry();
  registry.unsubscribe(target);
}

function getSize(node, entry) {
  if (entry.contentRect) {
    var _entry$contentRect = entry.contentRect,
        width = _entry$contentRect.width,
        height = _entry$contentRect.height;
    return {
      width: width,
      height: height
    };
  }

  if (node.getBoundingClientRect) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        _width = _node$getBoundingClie.width,
        _height = _node$getBoundingClie.height;

    return {
      width: _width,
      height: _height
    };
  }

  return null;
}
/**
 * Usage example:
 * const [ref, dimensions] = useDimensions<HTMLDivElement>();
 *
 * @param throttleDelay
 * @returns {[React.RefObject<Element>, {width: number, height: number} | null]}
 */


function useDimensions() {
  var throttleDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_THROTTLE_DELAY;
  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  (0, _react.useEffect)(function () {
    var current = ref.current;

    if (!current) {
      return;
    }

    var didUnobserve = false;
    observeDimensions(current, function (entry) {
      if (didUnobserve) return;
      var newSize = getSize(current, entry);

      if (newSize) {
        // @ts-ignore
        setSize(newSize);
      }
    }, throttleDelay);
    return function () {
      didUnobserve = true;
      unobserveDimensions(current);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttleDelay]);
  return [ref, size];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9vYnNlcnZlLWRpbWVuc2lvbnMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9USFJPVFRMRV9ERUxBWSIsIl9vYnNlcnZlclJlZ2lzdHJ5IiwiZ2V0T2JzZXJ2ZXJSZWdpc3RyeSIsInVuZGVmaW5lZCIsImNhbGxiYWNrcyIsIk1hcCIsInJlc2l6ZU9ic2VydmVyIiwiUmVzaXplT2JzZXJ2ZXIiLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJlbnRyeSIsImdldCIsInRhcmdldCIsInN1YnNjcmliZSIsImNhbGxiYWNrIiwib2JzZXJ2ZSIsInNldCIsInVuc3Vic2NyaWJlIiwidW5vYnNlcnZlIiwib2JzZXJ2ZURpbWVuc2lvbnMiLCJoYW5kbGVSZXNpemUiLCJ0aHJvdHRsZURlbGF5IiwicmVnaXN0cnkiLCJoYW5kbGVyIiwiZ2V0U2l6ZSIsInVub2JzZXJ2ZURpbWVuc2lvbnMiLCJub2RlIiwiY29udGVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInVzZURpbWVuc2lvbnMiLCJyZWYiLCJzaXplIiwic2V0U2l6ZSIsImN1cnJlbnQiLCJkaWRVbm9ic2VydmUiLCJuZXdTaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLHNCQUFzQixHQUFHLEdBQS9CLEMsQ0FFQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsaUJBQUo7O0FBRUEsU0FBU0MsbUJBQVQsR0FBK0I7QUFDN0IsTUFBSUQsaUJBQWlCLEtBQUtFLFNBQTFCLEVBQXFDO0FBQ25DLFFBQU1DLFNBQVMsR0FBRyxJQUFJQyxHQUFKLEVBQWxCO0FBQ0EsUUFBTUMsY0FBYyxHQUFHLElBQUlDLGtDQUFKLENBQW1CLFVBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUFBLGlEQUMzQ0QsT0FEMkM7QUFBQTs7QUFBQTtBQUMvRCw0REFBNkI7QUFBQTs7QUFBQSxjQUFsQkUsS0FB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QixZQUFKLEVBQWtCO0FBQ2xCLFVBQU1DLE9BQU8sR0FBR2IsT0FBTyxDQUFDVyxPQUFELEVBQVV6QixLQUFWLENBQXZCOztBQUNBLFVBQUkyQixPQUFKLEVBQWE7QUFDWDtBQUNBSCxRQUFBQSxPQUFPLENBQUNHLE9BQUQsQ0FBUDtBQUNEO0FBQ0YsS0FUYyxFQVVmaEIsYUFWZSxDQUFqQjtBQVlBLFdBQU8sWUFBTTtBQUNYZSxNQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBWCxNQUFBQSxtQkFBbUIsQ0FBQ1UsT0FBRCxDQUFuQjtBQUNELEtBSEQsQ0FuQmMsQ0F1QmQ7QUFDRCxHQXhCRCxFQXdCRyxDQUFDZCxhQUFELENBeEJIO0FBMEJBLFNBQU8sQ0FBQ1csR0FBRCxFQUFNQyxJQUFOLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnO1xuaW1wb3J0IHt1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuXG5jb25zdCBERUZBVUxUX1RIUk9UVExFX0RFTEFZID0gMTAwO1xuXG4vLyBVc2luZyBhIHNpbmdsZSBSZXNpemVPYnNlcnZlciBmb3IgYWxsIGVsZW1lbnRzIGNhbiBiZSAxMHhcbi8vIG1vcmUgcGVyZm9ybWFudCB0aGFuIHVzaW5nIGEgc2VwYXJhdGUgUmVzaXplT2JzZXJ2ZXIgcGVyIGVsZW1lbnRcbi8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vYS9jaHJvbWl1bS5vcmcvZm9ydW0vIyFtc2cvYmxpbmstZGV2L3o2aWVuT05VYjVBL0Y1LVZjVVp0QkFBSlxubGV0IF9vYnNlcnZlclJlZ2lzdHJ5O1xuXG5mdW5jdGlvbiBnZXRPYnNlcnZlclJlZ2lzdHJ5KCkge1xuICBpZiAoX29ic2VydmVyUmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBjYWxsYmFja3MuZ2V0KGVudHJ5LnRhcmdldCk/LihlbnRyeSwgb2JzZXJ2ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF9vYnNlcnZlclJlZ2lzdHJ5ID0ge1xuICAgICAgc3Vic2NyaWJlKHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQpO1xuICAgICAgICBjYWxsYmFja3Muc2V0KHRhcmdldCwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHVuc3Vic2NyaWJlKHRhcmdldCkge1xuICAgICAgICByZXNpemVPYnNlcnZlci51bm9ic2VydmUodGFyZ2V0KTtcbiAgICAgICAgY2FsbGJhY2tzLmRlbGV0ZSh0YXJnZXQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIF9vYnNlcnZlclJlZ2lzdHJ5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZURpbWVuc2lvbnModGFyZ2V0LCBoYW5kbGVSZXNpemUsIHRocm90dGxlRGVsYXkgPSBERUZBVUxUX1RIUk9UVExFX0RFTEFZKSB7XG4gIGNvbnN0IHJlZ2lzdHJ5ID0gZ2V0T2JzZXJ2ZXJSZWdpc3RyeSgpO1xuICBjb25zdCBoYW5kbGVyID0gdGhyb3R0bGVEZWxheSA+IDAgPyB0aHJvdHRsZShoYW5kbGVSZXNpemUsIHRocm90dGxlRGVsYXkpIDogaGFuZGxlUmVzaXplO1xuICByZWdpc3RyeS5zdWJzY3JpYmUodGFyZ2V0LCBlbnRyeSA9PiBoYW5kbGVyKGdldFNpemUodGFyZ2V0LCBlbnRyeSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVub2JzZXJ2ZURpbWVuc2lvbnModGFyZ2V0KSB7XG4gIGNvbnN0IHJlZ2lzdHJ5ID0gZ2V0T2JzZXJ2ZXJSZWdpc3RyeSgpO1xuICByZWdpc3RyeS51bnN1YnNjcmliZSh0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBnZXRTaXplKG5vZGUsIGVudHJ5KSB7XG4gIGlmIChlbnRyeS5jb250ZW50UmVjdCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGVudHJ5LmNvbnRlbnRSZWN0O1xuICAgIHJldHVybiB7d2lkdGgsIGhlaWdodH07XG4gIH1cbiAgaWYgKG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHR9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKiBjb25zdCBbcmVmLCBkaW1lbnNpb25zXSA9IHVzZURpbWVuc2lvbnM8SFRNTERpdkVsZW1lbnQ+KCk7XG4gKlxuICogQHBhcmFtIHRocm90dGxlRGVsYXlcbiAqIEByZXR1cm5zIHtbUmVhY3QuUmVmT2JqZWN0PEVsZW1lbnQ+LCB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHwgbnVsbF19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZURpbWVuc2lvbnModGhyb3R0bGVEZWxheSA9IERFRkFVTFRfVEhST1RUTEVfREVMQVkpIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHtjdXJyZW50fSA9IHJlZjtcbiAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGlkVW5vYnNlcnZlID0gZmFsc2U7XG4gICAgb2JzZXJ2ZURpbWVuc2lvbnMoXG4gICAgICBjdXJyZW50LFxuICAgICAgZW50cnkgPT4ge1xuICAgICAgICBpZiAoZGlkVW5vYnNlcnZlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG5ld1NpemUgPSBnZXRTaXplKGN1cnJlbnQsIGVudHJ5KTtcbiAgICAgICAgaWYgKG5ld1NpemUpIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgc2V0U2l6ZShuZXdTaXplKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRocm90dGxlRGVsYXlcbiAgICApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkaWRVbm9ic2VydmUgPSB0cnVlO1xuICAgICAgdW5vYnNlcnZlRGltZW5zaW9ucyhjdXJyZW50KTtcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW3Rocm90dGxlRGVsYXldKTtcblxuICByZXR1cm4gW3JlZiwgc2l6ZV07XG59XG4iXX0=