/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "6565e8cc764f72abf8e6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./client/src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/forest/index.tsx":
/*!*************************************!*\
  !*** ./client/src/forest/index.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const sketch_1 = __webpack_require__(/*! ./sketch */ "./client/src/forest/sketch.ts");
class Forest extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCanvasRef = (canvas) => {
            if (canvas == null) {
                if (this.sketch != null) {
                    this.sketch.dispose();
                }
            }
            else {
                this.sketch = new sketch_1.ForestSketch(this.props.db, canvas);
            }
        };
    }
    render() {
        return (React.createElement("div", { className: "forest-container" },
            React.createElement("canvas", { ref: this.handleCanvasRef })));
    }
}
exports.Forest = Forest;


/***/ }),

/***/ "./client/src/forest/monkeypatchThree.ts":
/*!***********************************************!*\
  !*** ./client/src/forest/monkeypatchThree.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(__webpack_require__(/*! three */ "./node_modules/three/build/three.module.js"));
// HACK monkeypatch the old features that requires THREE on the global namespace
window.THREE = THREE;
// tslint:disable
__webpack_require__(/*! three/examples/js/loaders/GLTFLoader */ "./node_modules/three/examples/js/loaders/GLTFLoader.js");
__webpack_require__(/*! three/examples/js/postprocessing/EffectComposer */ "./node_modules/three/examples/js/postprocessing/EffectComposer.js");
__webpack_require__(/*! three/examples/js/controls/OrbitControls */ "./node_modules/three/examples/js/controls/OrbitControls.js");
__webpack_require__(/*! three/examples/js/controls/PointerLockControls */ "./node_modules/three/examples/js/controls/PointerLockControls.js");
__webpack_require__(/*! three/examples/js/controls/DeviceOrientationControls */ "./node_modules/three/examples/js/controls/DeviceOrientationControls.js");
__webpack_require__(/*! three/examples/js/libs/stats.min */ "./node_modules/three/examples/js/libs/stats.min.js");
// import * as dat from "three/examples/js/libs/dat.gui.min";
// (window as any).dat = dat;
__webpack_require__(/*! three/examples/js/shaders/BokehShader */ "./node_modules/three/examples/js/shaders/BokehShader.js");
// import "three/examples/js/shaders/BokehShader2";
__webpack_require__(/*! three/examples/js/shaders/CopyShader */ "./node_modules/three/examples/js/shaders/CopyShader.js");
__webpack_require__(/*! three/examples/js/shaders/DotScreenShader */ "./node_modules/three/examples/js/shaders/DotScreenShader.js");
// required by SAOShader
__webpack_require__(/*! three/examples/js/shaders/DepthLimitedBlurShader */ "./node_modules/three/examples/js/shaders/DepthLimitedBlurShader.js");
__webpack_require__(/*! three/examples/js/shaders/SAOShader */ "./node_modules/three/examples/js/shaders/SAOShader.js");
__webpack_require__(/*! three/examples/js/shaders/SSAOShader */ "./node_modules/three/examples/js/shaders/SSAOShader.js");
__webpack_require__(/*! three/examples/js/shaders/LuminosityHighPassShader */ "./node_modules/three/examples/js/shaders/LuminosityHighPassShader.js");
__webpack_require__(/*! three/examples/js/shaders/LuminosityShader */ "./node_modules/three/examples/js/shaders/LuminosityShader.js");
__webpack_require__(/*! three/examples/js/shaders/ToneMapShader */ "./node_modules/three/examples/js/shaders/ToneMapShader.js");
// required by SAOShader
__webpack_require__(/*! three/examples/js/shaders/UnpackDepthRGBAShader */ "./node_modules/three/examples/js/shaders/UnpackDepthRGBAShader.js");
__webpack_require__(/*! three/examples/js/postprocessing/ShaderPass */ "./node_modules/three/examples/js/postprocessing/ShaderPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/RenderPass */ "./node_modules/three/examples/js/postprocessing/RenderPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/BokehPass */ "./node_modules/three/examples/js/postprocessing/BokehPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/MaskPass */ "./node_modules/three/examples/js/postprocessing/MaskPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/SSAARenderPass */ "./node_modules/three/examples/js/postprocessing/SSAARenderPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/SAOPass */ "./node_modules/three/examples/js/postprocessing/SAOPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/SSAOPass */ "./node_modules/three/examples/js/postprocessing/SSAOPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/js/postprocessing/UnrealBloomPass.js");
__webpack_require__(/*! three/examples/js/postprocessing/AdaptiveToneMappingPass */ "./node_modules/three/examples/js/postprocessing/AdaptiveToneMappingPass.js");
__webpack_require__(/*! three/examples/js/objects/Sky */ "./node_modules/three/examples/js/objects/Sky.js");


/***/ }),

/***/ "./client/src/forest/sketch.ts":
/*!*************************************!*\
  !*** ./client/src/forest/sketch.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(__webpack_require__(/*! three */ "./node_modules/three/build/three.module.js"));
const post_1 = __importDefault(__webpack_require__(/*! ../post */ "./client/src/post/index.ts"));
const userId_1 = __webpack_require__(/*! ./userId */ "./client/src/forest/userId.ts");
class ForestSketch {
    constructor(db, canvas) {
        this.db = db;
        this.canvas = canvas;
        this.scene = new ForestScene();
        this.users = new Map();
        this.animate = (millisDt) => {
            if (this.diControls) {
                this.diControls.update();
            }
            if (this.orbitControls) {
                this.orbitControls.update();
            }
            if (this.self != null) {
                this.camera.position.copy(this.self.position);
                this.self.rotation.copy(this.camera.rotation);
                this.self.pushSharedState();
            }
            console.log(this.camera.rotation);
            this.scene.animate();
            this.composer.render();
            requestAnimationFrame(this.animate);
        };
        window.sketch = this;
        this.renderer = this.initRenderer();
        this.updateCanvasSize();
        window.addEventListener("resize", () => {
            this.updateCanvasSize();
        });
        this.camera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
        this.orbitControls = new THREE.OrbitControls(this.camera, this.canvas);
        window.addEventListener("deviceorientation", (evt) => {
            if (evt.alpha && evt.gamma && evt.beta) {
                this.diControls = new THREE.DeviceOrientationControls(this.camera);
                this.orbitControls = undefined;
            }
        }, {
            once: true,
        });
        this.composer = this.initComposer();
        this.initMyUser();
        this.setupUsersListeners();
        requestAnimationFrame(this.animate);
    }
    get aspectRatio() {
        return this.renderer.domElement.height / this.renderer.domElement.width;
    }
    get self() {
        return this.users.get(userId_1.getMyUserId());
    }
    syncUsersWithDatabase(dbUsers) {
        // add new users (they will autosync)
        // delete old users, TODO
        // const oldUserIds = this.users.keys();
        for (const userId in dbUsers) {
            if (!this.users.has(userId)) {
                const ref = this.db.ref(`users/${userId}`);
                const user = new User(ref);
                this.users.set(userId, user);
                this.scene.add(user);
            }
        }
    }
    initMyUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // Add myself to the database
            try {
                const myUserId = userId_1.getMyUserId();
                // const myUserIdRef = this.db.ref(`userIds/${myUserId}`);
                // await myUserIdRef.set(true);
                const myUserRef = this.db.ref(`users/${myUserId}`);
                const newUser = {
                    position: {
                        x: THREE.Math.randFloat(-200, 200),
                        y: THREE.Math.randFloat(-200, 200),
                        z: THREE.Math.randFloat(-200, 200),
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0,
                    }
                };
                yield myUserRef.set(newUser);
            }
            catch (e) {
                throw e;
            }
        });
    }
    setupUsersListeners() {
        const usersRef = this.db.ref("users/");
        usersRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const users = snapshot.val();
                this.syncUsersWithDatabase(users);
            }
        });
    }
    initRenderer() {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        renderer.autoClear = true;
        renderer.setClearColor(0x808080);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.Uncharted2ToneMapping;
        renderer.toneMappingExposure = 0.9;
        renderer.toneMappingWhitePoint = 1.1;
        return renderer;
    }
    initComposer() {
        const composer = new THREE.EffectComposer(this.renderer);
        composer.addPass(new THREE.RenderPass(this.scene, this.camera));
        // const ssaa = new (THREE as any).SSAARenderPass(this.scene, this.camera);
        // ssaa.unbiased = true;
        // ssaa.sampleLevel = 2;
        // composer.addPass(ssaa);
        // const sao = new THREE.SAOPass(this.scene, this.camera, false, true);
        // // sao.params.output = THREE.SAOPass.OUTPUT.SAO;
        // sao.params.saoBias = 0.2;
        // sao.params.saoIntensity = 0.030;
        // sao.params.saoScale = 90;
        // sao.params.saoKernelRadius = 40;
        // sao.params.saoBlur = true;
        // composer.addPass(sao);
        const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(this.canvas.width, this.canvas.height), 0.4, 0.7, 0.85);
        composer.addPass(bloomPass);
        // const adaptiveToneMappingPass = new THREE.AdaptiveToneMappingPass(true, 256);
        // composer.addPass(adaptiveToneMappingPass);
        const post = new post_1.default();
        composer.addPass(post);
        composer.passes[composer.passes.length - 1].renderToScreen = true;
        return composer;
    }
    dispose() {
        this.renderer.dispose();
    }
    updateCanvasSize() {
        const parent = this.canvas.parentElement;
        if (parent != null) {
            this.renderer.setSize(parent.clientWidth, parent.clientHeight);
            console.log(parent.clientWidth, parent.clientHeight);
            if (this.camera != null) {
                this.camera.aspect = 1 / this.aspectRatio;
                this.camera.updateProjectionMatrix();
            }
        }
    }
}
exports.ForestSketch = ForestSketch;
class ForestScene extends THREE.Scene {
    constructor() {
        super();
        this.things = [];
        this.things.push(new Ground());
        this.things.push(new Spheres());
        const lights = new Lights();
        this.things.push(lights);
        const sky = new Sky();
        sky.sky.material.uniforms.sunPosition.value.copy(lights.light1.position);
        this.things.push(sky);
        this.add(...this.things);
    }
    animate() {
        for (const t of this.things) {
            t.animate();
        }
    }
}
class Ground extends THREE.Mesh {
    constructor() {
        const geom = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10);
        geom.rotateX(-Math.PI / 2);
        const material = new THREE.MeshStandardMaterial({
            roughness: 1,
            color: "#202020",
            side: THREE.DoubleSide,
            metalness: 0,
        });
        super(geom, material);
        this.position.y = -500;
        this.castShadow = true;
        this.receiveShadow = true;
    }
    animate() {
    }
}
class Spheres extends THREE.Object3D {
    constructor() {
        super();
        this.meshes = (() => {
            const meshes = [];
            const geom = new THREE.SphereGeometry(50, 35, 35);
            const colorOptions = [
                // "#0f9960",
                "#d9822b",
                // "#db3737",
                // "#00b3a4",
                "#5C7080",
                "#BFCCD6",
            ];
            const materials = colorOptions.map((c) => new THREE.MeshStandardMaterial({
                color: c,
                roughness: 1,
                metalness: 0,
            }));
            for (let i = 0; i < 100; i++) {
                const mesh = new THREE.Mesh(geom, materials[THREE.Math.randInt(0, materials.length - 1)]);
                const spread = 1000;
                mesh.position.x = THREE.Math.randFloat(-spread, spread);
                mesh.position.z = THREE.Math.randFloat(-spread, spread);
                mesh.position.y = THREE.Math.randFloat(0, spread);
                mesh.scale.setScalar(THREE.Math.randFloat(0.5, 1.0));
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                meshes.push(mesh);
            }
            return meshes;
        })();
        this.add(...this.meshes);
    }
    animate() {
        this.rotation.x += 0.002;
        this.rotation.z += 0.0045;
    }
}
class Lights extends THREE.Object3D {
    constructor() {
        super();
        const light1 = this.light1 = new THREE.DirectionalLight("#f5f8fa", 0.8);
        light1.position.set(0.2, 1, 0.3).setLength(1000);
        light1.target = this;
        light1.castShadow = true;
        light1.shadow.mapSize.width = 2048 * 2;
        light1.shadow.mapSize.height = 2048 * 2;
        light1.shadow.bias = 0.000;
        light1.shadow.radius = 1.5; // 1 is normal; 1.5 makes it a bit blurrier
        light1.shadow.camera.near = 100;
        light1.shadow.camera.far = 2000;
        light1.shadow.camera.left = -1000;
        light1.shadow.camera.right = 1000;
        light1.shadow.camera.top = 1000;
        light1.shadow.camera.bottom = -1000;
        light1.shadow.camera.updateProjectionMatrix();
        this.add(light1);
        this.add(new THREE.DirectionalLightHelper(light1));
        this.add(new THREE.CameraHelper(light1.shadow.camera));
        this.add(new THREE.AmbientLight("#182026", 3));
        this.add(new THREE.HemisphereLight("#E3F9F7", "#182026", 0.3));
    }
    animate() { }
}
class Sky extends THREE.Object3D {
    constructor() {
        super();
        this.sky = new THREE.Sky();
        this.sky.scale.setScalar(500000);
        const uniforms = this.sky.material.uniforms;
        uniforms.turbidity.value = 1;
        uniforms.rayleigh.value = 0.8;
        uniforms.mieCoefficient.value = 0.03;
        uniforms.mieDirectionalG.value = 0.87;
        uniforms.luminance.value = 1.01;
        this.add(this.sky);
    }
    animate() {
    }
}
class User extends THREE.Mesh {
    constructor(myRef) {
        super(User.geometry, User.material);
        this.myRef = myRef;
        // this handles updating
        myRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const value = snapshot.val();
                this.updateSharedState(value);
            }
            else {
                // TODO handle null
            }
        });
        this.add(new THREE.AxesHelper(100));
    }
    pushSharedState() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                        z: this.position.z,
                    },
                    rotation: {
                        x: this.rotation.x,
                        y: this.rotation.y,
                        z: this.rotation.z,
                    },
                };
                yield this.myRef.set(newUser);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    updateSharedState(databaseUser) {
        const { position, rotation } = databaseUser;
        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    animate() { }
}
User.geometry = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);
User.material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, });


/***/ }),

/***/ "./client/src/forest/userId.ts":
/*!*************************************!*\
  !*** ./client/src/forest/userId.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function randomUserId() {
    return Math.random().toString(16).substr(2);
}
let myUserId;
function getMyUserId() {
    if (myUserId) {
        return myUserId;
    }
    else {
        const localStorageUserId = window.localStorage.getItem("myUserId");
        myUserId = localStorageUserId || randomUserId();
        window.localStorage.setItem("myUserId", myUserId);
        return myUserId;
    }
}
exports.getMyUserId = getMyUserId;


/***/ }),

/***/ "./client/src/index.scss":
/*!*******************************!*\
  !*** ./client/src/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--5-1!../../node_modules/postcss-loader/lib!../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./client/src/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader??ref--5-1!../../node_modules/postcss-loader/lib!../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./client/src/index.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader??ref--5-1!../../node_modules/postcss-loader/lib!../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./client/src/index.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./client/src/index.tsx":
/*!******************************!*\
  !*** ./client/src/index.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./forest/monkeypatchThree */ "./client/src/forest/monkeypatchThree.ts");
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const firebase = __importStar(__webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js"));
const forest_1 = __webpack_require__(/*! ./forest */ "./client/src/forest/index.tsx");
__webpack_require__(/*! ./index.scss */ "./client/src/index.scss");
class App extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(forest_1.Forest, { db: db }),
            React.createElement("div", { style: { position: "relative" } },
                React.createElement("h1", null, "Polyphone.io"),
                React.createElement(FooListener, { db: db }))));
    }
}
;
class FooListener extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { val: undefined };
        this.handleClick = () => {
            this.ref.set(this.state.val + 1);
        };
        this.ref = this.props.db.ref("foo");
        this.ref.on("value", (snapshot) => {
            console.log(snapshot);
            if (snapshot != null) {
                this.setState({
                    val: snapshot.val(),
                });
            }
            else {
                this.setState({
                    val: undefined,
                });
            }
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.handleClick }, "+"),
            React.createElement(FooRenderer, { val: this.state.val })));
    }
}
const FooRenderer = ({ val }) => (React.createElement("div", null,
    "Foo is:",
    React.createElement("pre", null, JSON.stringify(val))));
// const server = io();
// server.send("hello");
const config = {
    apiKey: "AIzaSyBT3hTYRj0u-ApZE1_Z1fyXf2ZiV9mgXr0",
    authDomain: "polyphone-io.firebaseapp.com",
    databaseURL: "https://polyphone-io.firebaseio.com",
    projectId: "polyphone-io",
    storageBucket: "polyphone-io.appspot.com",
    messagingSenderId: "255218178256"
};
firebase.initializeApp(config);
const db = firebase.database();
console.log(db);
// const fooRef = db.ref("foo");
// fooRef.on("value", (snapshot) => {
//     if (snapshot != null) {
//         snapshot.val;
//     }
// });
const root = document.getElementById("root");
try {
    ReactDOM.render(React.createElement(App, { db: db }), root);
}
catch (e) {
    root.innerHTML = JSON.stringify(e);
}


/***/ }),

/***/ "./client/src/post/fragment.glsl":
/*!***************************************!*\
  !*** ./client/src/post/fragment.glsl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform float time;\r\nuniform sampler2D tDiffuse;\r\nvarying vec2 vTextureCoord;\r\n\r\n// https://github.com/armory3d/armory/blob/master/Shaders/std/tonemap.glsl\r\n\r\nfloat vignette() {\r\n    // https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson3\r\n    vec2 position = vTextureCoord - vec2(0.5);\r\n\r\n    //determine the vector length of the center position\r\n    float len = length(position);\r\n\r\n    //use smoothstep to create a smooth vignette\r\n    float RADIUS = 0.75;\r\n    float SOFTNESS = 0.45;\r\n    float vignette = smoothstep(RADIUS, RADIUS-SOFTNESS, len);\r\n\r\n    return vignette;\r\n}\r\n\r\nvec2 barrelDistortion(vec2 coord, float amt) {\r\n    vec2 cc = coord - 0.5;\r\n    float dist = dot(cc, cc);\r\n    return coord + cc * dist * amt;\r\n}\r\n\r\nfloat sat( float t )\r\n{\r\n    return clamp( t, 0.0, 1.0 );\r\n}\r\n\r\nfloat linterp( float t ) {\r\n    return sat( 1.0 - abs( 2.0*t - 1.0 ) );\r\n}\r\n\r\nfloat remap( float t, float a, float b ) {\r\n    return sat( (t - a) / (b - a) );\r\n}\r\n\r\nvec4 spectrum_offset( float t ) {\r\n    vec4 ret;\r\n    float lo = step(t,0.5);\r\n    float hi = 1.0-lo;\r\n    float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );\r\n    ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);\r\n\r\n    return pow( ret, vec4(1.0/2.2) );\r\n}\r\n\r\nvec3 chromaticAbberation() {\r\n    const float max_distort = 0.3;\r\n    const int num_iter = 12;\r\n    const float reci_num_iter_f = 1.0 / float(num_iter);\r\n\r\n    vec2 uv=(vTextureCoord*.8)+.10;\r\n    /* vec2 uv = vTextureCoord.xy; */\r\n\r\n    vec4 sumcol = vec4(0.0);\r\n    vec4 sumw = vec4(0.0);\r\n    for ( int i=0; i<num_iter;++i )\r\n    {\r\n        float t = float(i) * reci_num_iter_f;\r\n        vec4 w = spectrum_offset( t );\r\n        sumw += w;\r\n        vec4 tex = texture2D( tDiffuse, barrelDistortion(uv, .6 * max_distort*t ) );\r\n        // move from linear to lightspace\r\n        // tex = vec4(log(1.0 + tex.rgb * 255.), 1.0);\r\n        sumcol += w * tex;\r\n    }\r\n\r\n    return (sumcol / sumw).rgb;\r\n}\r\n\r\nfloat random(vec2 n, float offset ){\r\n    return .5 - fract(sin(dot(n.xy + vec2(offset, 0.), vec2(12.9898, 78.233)))* 43758.5453);\r\n}\r\n\r\nvoid main(void) {\r\n    // chromatic abberation\r\n    vec3 totalColor = chromaticAbberation();\r\n\r\n    // bit of vignetting\r\n    float vignetteAmount = vignette();\r\n    totalColor = mix(totalColor, totalColor * vignetteAmount, 0.5);\r\n\r\n    // noise\r\n    totalColor += 0.025 * random(vTextureCoord, 1. + time * 0.001);\r\n\r\n    // totalColor = pow(totalColor, vec3(0.45));\r\n\r\n    gl_FragColor = vec4(totalColor, 1.0);\r\n}"

/***/ }),

/***/ "./client/src/post/index.ts":
/*!**********************************!*\
  !*** ./client/src/post/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(__webpack_require__(/*! three */ "./node_modules/three/build/three.module.js"));
const shader_1 = __webpack_require__(/*! ./shader */ "./client/src/post/shader.ts");
class PostPass extends THREE.ShaderPass {
    constructor() {
        super(shader_1.PostShader);
    }
}
exports.PostPass = PostPass;
exports.default = PostPass;


/***/ }),

/***/ "./client/src/post/shader.ts":
/*!***********************************!*\
  !*** ./client/src/post/shader.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vertexShader = __webpack_require__(/*! ./vertex.glsl */ "./client/src/post/vertex.glsl");
const fragmentShader = __webpack_require__(/*! ./fragment.glsl */ "./client/src/post/fragment.glsl");
exports.PostShader = {
    uniforms: {
        time: { value: 0 },
        tDiffuse: { value: null },
    },
    vertexShader,
    fragmentShader,
};


/***/ }),

/***/ "./client/src/post/vertex.glsl":
/*!*************************************!*\
  !*** ./client/src/post/vertex.glsl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "varying vec2 vTextureCoord;\r\n\r\nvoid main() {\r\n    vTextureCoord = uv;\r\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n}\r\n"

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./client/src/index.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/lib!./node_modules/sass-loader/lib/loader.js!./client/src/index.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none; }\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none; }\n\n.forest-container {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n* {\n  box-sizing: border-box; }\n\nhtml {\n  overflow: hidden; }\n", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9mb3Jlc3QvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZm9yZXN0L21vbmtleXBhdGNoVGhyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9mb3Jlc3Qvc2tldGNoLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZm9yZXN0L3VzZXJJZC50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LnNjc3M/NGE2ZSIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3Bvc3QvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3Bvc3QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9wb3N0L3NoYWRlci50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3Bvc3QvdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FB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OEZBQThGLDZCQUE2QixFQUFFLDZFQUE2RSxtQkFBbUIsRUFBRSxzSUFBc0ksMkJBQTJCLDBCQUEwQixhQUFhLHNMQUFzTCxpQkFBaUIsRUFBRSxxSUFBcUksa0NBQWtDLG9DQUFvQyxhQUFhLHdIQUF3SCw2QkFBNkIsRUFBRSwyS0FBMkssK0JBQStCLDZCQUE2QixhQUFhLGtMQUFrTCxtQkFBbUIsRUFBRSxtRUFBbUUsdUJBQXVCLEVBQUUsMEpBQTBKLGtCQUFrQixFQUFFLDhEQUE4RCxrQkFBa0IsRUFBRSx1QkFBdUIsdUJBQXVCLFdBQVcsY0FBYyxZQUFZLGFBQWEsRUFBRSxPQUFPLDJCQUEyQixFQUFFLFVBQVUscUJBQXFCLEVBQUU7O0FBRS83TSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHQ7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI2NTY1ZThjYzc2NGY3MmFiZjhlNlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2NsaWVudC9zcmMvaW5kZXgudHN4XCIsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IEZvcmVzdFNrZXRjaCB9IGZyb20gXCIuL3NrZXRjaFwiO1xyXG5pbXBvcnQgeyBkYXRhYmFzZSB9IGZyb20gXCJmaXJlYmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcmVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7ZGI6IGRhdGFiYXNlLkRhdGFiYXNlfSwge30+IHtcclxuICAgIHByaXZhdGUgc2tldGNoPzogRm9yZXN0U2tldGNoO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVDYW52YXNSZWYgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgICAgICBpZiAoY2FudmFzID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tldGNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tldGNoID0gbmV3IEZvcmVzdFNrZXRjaCh0aGlzLnByb3BzLmRiLCBjYW52YXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3Jlc3QtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHJlZj17dGhpcy5oYW5kbGVDYW52YXNSZWZ9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbi8vIEhBQ0sgbW9ua2V5cGF0Y2ggdGhlIG9sZCBmZWF0dXJlcyB0aGF0IHJlcXVpcmVzIFRIUkVFIG9uIHRoZSBnbG9iYWwgbmFtZXNwYWNlXHJcbih3aW5kb3cgYXMgYW55KS5USFJFRSA9IFRIUkVFO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZVxyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvbG9hZGVycy9HTFRGTG9hZGVyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlclwiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9jb250cm9scy9Qb2ludGVyTG9ja0NvbnRyb2xzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2NvbnRyb2xzL0RldmljZU9yaWVudGF0aW9uQ29udHJvbHNcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2xpYnMvc3RhdHMubWluXCI7XHJcbi8vIGltcG9ydCAqIGFzIGRhdCBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanMvbGlicy9kYXQuZ3VpLm1pblwiO1xyXG4vLyAod2luZG93IGFzIGFueSkuZGF0ID0gZGF0O1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Cb2tlaFNoYWRlclwiO1xyXG4vLyBpbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0Jva2VoU2hhZGVyMlwiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Db3B5U2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvRG90U2NyZWVuU2hhZGVyXCI7XHJcbi8vIHJlcXVpcmVkIGJ5IFNBT1NoYWRlclxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0RlcHRoTGltaXRlZEJsdXJTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9TQU9TaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9TU0FPU2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvTHVtaW5vc2l0eUhpZ2hQYXNzU2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvTHVtaW5vc2l0eVNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1RvbmVNYXBTaGFkZXJcIjtcclxuLy8gcmVxdWlyZWQgYnkgU0FPU2hhZGVyXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvVW5wYWNrRGVwdGhSR0JBU2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NoYWRlclBhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9Cb2tlaFBhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvTWFza1Bhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU1NBQVJlbmRlclBhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU0FPUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TU0FPUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9VbnJlYWxCbG9vbVBhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvQWRhcHRpdmVUb25lTWFwcGluZ1Bhc3NcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL29iamVjdHMvU2t5XCI7XHJcbiIsImltcG9ydCB7IGRhdGFiYXNlIH0gZnJvbSBcImZpcmViYXNlXCI7XHJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IFBvc3RQYXNzIGZyb20gXCIuLi9wb3N0XCI7XHJcbmltcG9ydCB7IGdldE15VXNlcklkIH0gZnJvbSBcIi4vdXNlcklkXCI7XHJcblxyXG5pbnRlcmZhY2UgRGF0YWJhc2VTY2hlbWEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb2YgdXNlcnMgaW4gZXhpc3RlbmNlLlxyXG4gICAgICovXHJcbiAgICB1c2VyczogRGF0YWJhc2VVc2VycztcclxufVxyXG5cclxuaW50ZXJmYWNlIERhdGFiYXNlVXNlcnMge1xyXG4gICAgW3VzZXJJZDogc3RyaW5nXTogRGF0YWJhc2VVc2VyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRGF0YWJhc2VVc2VyIHtcclxuICAgIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgfSxcclxuICAgIHJvdGF0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgfSxcclxufVxyXG5cclxuaW50ZXJmYWNlIFRoaW5nIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xyXG4gICAgYW5pbWF0ZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm9yZXN0U2tldGNoIHtcclxuICAgIHB1YmxpYyByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcclxuICAgIHB1YmxpYyBzY2VuZSA9IG5ldyBGb3Jlc3RTY2VuZSgpO1xyXG4gICAgcHVibGljIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XHJcbiAgICBwcml2YXRlIGNvbXBvc2VyOiBUSFJFRS5FZmZlY3RDb21wb3NlcjtcclxuICAgIHByaXZhdGUgZGlDb250cm9scz86IFRIUkVFLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHM7XHJcbiAgICBwcml2YXRlIG9yYml0Q29udHJvbHM/OiBUSFJFRS5PcmJpdENvbnRyb2xzO1xyXG4gICAgcHVibGljIHVzZXJzOiBNYXA8c3RyaW5nLCBVc2VyPiA9IG5ldyBNYXAoKTtcclxuICAgIGdldCBhc3BlY3RSYXRpbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmhlaWdodCAvIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2Vycy5nZXQoZ2V0TXlVc2VySWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRiOiBkYXRhYmFzZS5EYXRhYmFzZSwgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuc2tldGNoID0gdGhpcztcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5pbml0UmVuZGVyZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNTaXplKCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc1NpemUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgMSAvIHRoaXMuYXNwZWN0UmF0aW8sIDEsIDUwMDApO1xyXG5cclxuICAgICAgICB0aGlzLm9yYml0Q29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5jYW52YXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZ0LmFscGhhICYmIGV2dC5nYW1tYSAmJiBldnQuYmV0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaUNvbnRyb2xzID0gbmV3IFRIUkVFLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHModGhpcy5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmJpdENvbnRyb2xzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBvc2VyID0gdGhpcy5pbml0Q29tcG9zZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TXlVc2VyKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFVzZXJzTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3luY1VzZXJzV2l0aERhdGFiYXNlKGRiVXNlcnM6IERhdGFiYXNlVXNlcnMpIHtcclxuICAgICAgICAvLyBhZGQgbmV3IHVzZXJzICh0aGV5IHdpbGwgYXV0b3N5bmMpXHJcbiAgICAgICAgLy8gZGVsZXRlIG9sZCB1c2VycywgVE9ET1xyXG4gICAgICAgIC8vIGNvbnN0IG9sZFVzZXJJZHMgPSB0aGlzLnVzZXJzLmtleXMoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHVzZXJJZCBpbiBkYlVzZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy51c2Vycy5oYXModXNlcklkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmID0gdGhpcy5kYi5yZWYoYHVzZXJzLyR7dXNlcklkfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHJlZik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzLnNldCh1c2VySWQsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodXNlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0TXlVc2VyKCkge1xyXG4gICAgICAgIC8vIEFkZCBteXNlbGYgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbXlVc2VySWQgPSBnZXRNeVVzZXJJZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3QgbXlVc2VySWRSZWYgPSB0aGlzLmRiLnJlZihgdXNlcklkcy8ke215VXNlcklkfWApO1xyXG4gICAgICAgICAgICAvLyBhd2FpdCBteVVzZXJJZFJlZi5zZXQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBteVVzZXJSZWYgPSB0aGlzLmRiLnJlZihgdXNlcnMvJHtteVVzZXJJZH1gKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3VXNlcjogRGF0YWJhc2VVc2VyID0ge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtMjAwLCAyMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IFRIUkVFLk1hdGgucmFuZEZsb2F0KC0yMDAsIDIwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgejogVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTIwMCwgMjAwKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgICAgICB6OiAwLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhd2FpdCBteVVzZXJSZWYuc2V0KG5ld1VzZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cFVzZXJzTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzUmVmID0gdGhpcy5kYi5yZWYoXCJ1c2Vycy9cIik7XHJcbiAgICAgICAgdXNlcnNSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJzOiBEYXRhYmFzZVVzZXJzID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNVc2Vyc1dpdGhEYXRhYmFzZSh1c2Vycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSZW5kZXJlcigpIHtcclxuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcclxuICAgICAgICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgICAgICAgYW50aWFsaWFzOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XHJcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDgwODA4MCk7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnRvbmVNYXBwaW5nID0gVEhSRUUuVW5jaGFydGVkMlRvbmVNYXBwaW5nO1xyXG4gICAgICAgIHJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSAwLjk7XHJcbiAgICAgICAgcmVuZGVyZXIudG9uZU1hcHBpbmdXaGl0ZVBvaW50ID0gMS4xO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVuZGVyZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Q29tcG9zZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSBuZXcgVEhSRUUuRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XHJcblxyXG4gICAgICAgIGNvbXBvc2VyLmFkZFBhc3MobmV3IFRIUkVFLlJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3Qgc3NhYSA9IG5ldyAoVEhSRUUgYXMgYW55KS5TU0FBUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgLy8gc3NhYS51bmJpYXNlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gc3NhYS5zYW1wbGVMZXZlbCA9IDI7XHJcbiAgICAgICAgLy8gY29tcG9zZXIuYWRkUGFzcyhzc2FhKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3Qgc2FvID0gbmV3IFRIUkVFLlNBT1Bhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAvLyAvLyBzYW8ucGFyYW1zLm91dHB1dCA9IFRIUkVFLlNBT1Bhc3MuT1VUUFVULlNBTztcclxuICAgICAgICAvLyBzYW8ucGFyYW1zLnNhb0JpYXMgPSAwLjI7XHJcbiAgICAgICAgLy8gc2FvLnBhcmFtcy5zYW9JbnRlbnNpdHkgPSAwLjAzMDtcclxuICAgICAgICAvLyBzYW8ucGFyYW1zLnNhb1NjYWxlID0gOTA7XHJcbiAgICAgICAgLy8gc2FvLnBhcmFtcy5zYW9LZXJuZWxSYWRpdXMgPSA0MDtcclxuICAgICAgICAvLyBzYW8ucGFyYW1zLnNhb0JsdXIgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNvbXBvc2VyLmFkZFBhc3Moc2FvKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmxvb21QYXNzID0gbmV3IFRIUkVFLlVucmVhbEJsb29tUGFzcyhuZXcgVEhSRUUuVmVjdG9yMih0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KSwgMC40LCAwLjcsIDAuODUpO1xyXG4gICAgICAgIGNvbXBvc2VyLmFkZFBhc3MoYmxvb21QYXNzKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgYWRhcHRpdmVUb25lTWFwcGluZ1Bhc3MgPSBuZXcgVEhSRUUuQWRhcHRpdmVUb25lTWFwcGluZ1Bhc3ModHJ1ZSwgMjU2KTtcclxuICAgICAgICAvLyBjb21wb3Nlci5hZGRQYXNzKGFkYXB0aXZlVG9uZU1hcHBpbmdQYXNzKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdCA9IG5ldyBQb3N0UGFzcygpO1xyXG4gICAgICAgIGNvbXBvc2VyLmFkZFBhc3MocG9zdCk7XHJcblxyXG4gICAgICAgIGNvbXBvc2VyLnBhc3Nlc1tjb21wb3Nlci5wYXNzZXMubGVuZ3RoIC0gMV0ucmVuZGVyVG9TY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBjb21wb3NlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYW5pbWF0ZSA9IChtaWxsaXNEdDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlDb250cm9scykge1xyXG4gICAgICAgICAgICB0aGlzLmRpQ29udHJvbHMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9yYml0Q29udHJvbHMpIHtcclxuICAgICAgICAgICAgdGhpcy5vcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxmICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uY29weSh0aGlzLnNlbGYucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGYucm90YXRpb24uY29weSh0aGlzLmNhbWVyYS5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZi5wdXNoU2hhcmVkU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jYW1lcmEucm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYW5pbWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY29tcG9zZXIucmVuZGVyKCk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDYW52YXNTaXplKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZShwYXJlbnQuY2xpZW50V2lkdGgsIHBhcmVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJlbnQuY2xpZW50V2lkdGgsIHBhcmVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW1lcmEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gMSAvIHRoaXMuYXNwZWN0UmF0aW87XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZvcmVzdFNjZW5lIGV4dGVuZHMgVEhSRUUuU2NlbmUgaW1wbGVtZW50cyBUaGluZyB7XHJcbiAgICB0aGluZ3M6IFRoaW5nW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnRoaW5ncy5wdXNoKG5ldyBHcm91bmQoKSk7XHJcbiAgICAgICAgdGhpcy50aGluZ3MucHVzaChuZXcgU3BoZXJlcygpKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGlnaHRzID0gbmV3IExpZ2h0cygpO1xyXG4gICAgICAgIHRoaXMudGhpbmdzLnB1c2gobGlnaHRzKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2t5ID0gbmV3IFNreSgpO1xyXG4gICAgICAgIHNreS5za3kubWF0ZXJpYWwudW5pZm9ybXMuc3VuUG9zaXRpb24udmFsdWUuY29weShsaWdodHMubGlnaHQxLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnRoaW5ncy5wdXNoKHNreSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkKC4uLnRoaXMudGhpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIGZvcihjb25zdCB0IG9mIHRoaXMudGhpbmdzKSB7XHJcbiAgICAgICAgICAgIHQuYW5pbWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JvdW5kIGV4dGVuZHMgVEhSRUUuTWVzaCBpbXBsZW1lbnRzIFRoaW5nIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdlb20gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwLCAxMDAwLCAxMCwgMTApO1xyXG4gICAgICAgIGdlb20ucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcclxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICBjb2xvcjogXCIjMjAyMDIwXCIsXHJcbiAgICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXHJcbiAgICAgICAgICAgIG1ldGFsbmVzczogMCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlcihnZW9tLCBtYXRlcmlhbCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gLTUwMDtcclxuICAgICAgICB0aGlzLmNhc3RTaGFkb3cgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSgpIHtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3BoZXJlcyBleHRlbmRzIFRIUkVFLk9iamVjdDNEIGltcGxlbWVudHMgVGhpbmcge1xyXG4gICAgcHVibGljIG1lc2hlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzaGVzID0gW107XHJcbiAgICAgICAgY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg1MCwgMzUsIDM1KTtcclxuICAgICAgICBjb25zdCBjb2xvck9wdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIC8vIFwiIzBmOTk2MFwiLFxyXG4gICAgICAgICAgICBcIiNkOTgyMmJcIixcclxuICAgICAgICAgICAgLy8gXCIjZGIzNzM3XCIsXHJcbiAgICAgICAgICAgIC8vIFwiIzAwYjNhNFwiLFxyXG5cIiM1QzcwODBcIixcclxuXCIjQkZDQ0Q2XCIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBjb2xvck9wdGlvbnMubWFwKChjKSA9PiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBjb2xvcjogYyxcclxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb20sIG1hdGVyaWFsc1tUSFJFRS5NYXRoLnJhbmRJbnQoMCwgbWF0ZXJpYWxzLmxlbmd0aCAtIDEpXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcmVhZCA9IDEwMDA7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC1zcHJlYWQsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC1zcHJlYWQsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDAsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2guc2NhbGUuc2V0U2NhbGFyKFRIUkVFLk1hdGgucmFuZEZsb2F0KDAuNSwgMS4wKSk7XHJcbiAgICAgICAgICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKG1lc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzaGVzO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYWRkKC4uLnRoaXMubWVzaGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueCArPSAwLjAwMjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uLnogKz0gMC4wMDQ1O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaWdodHMgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCBpbXBsZW1lbnRzIFRoaW5nIHtcclxuICAgIHB1YmxpYyBsaWdodDE6IFRIUkVFLkxpZ2h0O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBjb25zdCBsaWdodDEgPSB0aGlzLmxpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KFwiI2Y1ZjhmYVwiLCAwLjgpO1xyXG4gICAgICAgIGxpZ2h0MS5wb3NpdGlvbi5zZXQoMC4yLCAxLCAwLjMpLnNldExlbmd0aCgxMDAwKTtcclxuICAgICAgICBsaWdodDEudGFyZ2V0ID0gdGhpcztcclxuICAgICAgICBsaWdodDEuY2FzdFNoYWRvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDggKiAyO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4ICogMjtcclxuXHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5iaWFzID0gMC4wMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5yYWRpdXMgPSAxLjU7IC8vIDEgaXMgbm9ybWFsOyAxLjUgbWFrZXMgaXQgYSBiaXQgYmx1cnJpZXJcclxuICAgICAgICBsaWdodDEuc2hhZG93LmNhbWVyYS5uZWFyID0gMTAwO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMDAwO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTAwMDtcclxuICAgICAgICBsaWdodDEuc2hhZG93LmNhbWVyYS50b3AgPSAxMDAwO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMDAwO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQobGlnaHQxKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHRIZWxwZXIobGlnaHQxKSk7XHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFRIUkVFLkNhbWVyYUhlbHBlcihsaWdodDEuc2hhZG93LmNhbWVyYSkpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KFwiIzE4MjAyNlwiLCAzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkKG5ldyBUSFJFRS5IZW1pc3BoZXJlTGlnaHQoXCIjRTNGOUY3XCIsIFwiIzE4MjAyNlwiLCAwLjMpKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge31cclxufVxyXG5cclxuY2xhc3MgU2t5IGV4dGVuZHMgVEhSRUUuT2JqZWN0M0QgaW1wbGVtZW50cyBUaGluZyB7XHJcbiAgICBwdWJsaWMgc2t5OiBUSFJFRS5Ta3k7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2t5ID0gbmV3IFRIUkVFLlNreSgpO1xyXG4gICAgICAgIHRoaXMuc2t5LnNjYWxlLnNldFNjYWxhcig1MDAwMDApO1xyXG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gdGhpcy5za3kubWF0ZXJpYWwudW5pZm9ybXM7XHJcbiAgICAgICAgdW5pZm9ybXMudHVyYmlkaXR5LnZhbHVlID0gMTtcclxuICAgICAgICB1bmlmb3Jtcy5yYXlsZWlnaC52YWx1ZSA9IDAuODtcclxuICAgICAgICB1bmlmb3Jtcy5taWVDb2VmZmljaWVudC52YWx1ZSA9IDAuMDM7XHJcbiAgICAgICAgdW5pZm9ybXMubWllRGlyZWN0aW9uYWxHLnZhbHVlID0gMC44NztcclxuICAgICAgICB1bmlmb3Jtcy5sdW1pbmFuY2UudmFsdWUgPSAxLjAxO1xyXG5cclxuICAgICAgICB0aGlzLmFkZCh0aGlzLnNreSk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFVzZXIgZXh0ZW5kcyBUSFJFRS5NZXNoIGltcGxlbWVudHMgVGhpbmcge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkoMTAsIDMsIDEwMCwgMTYpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIG1ldGFsbmVzczogMSwgfSk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbXlSZWY6IGRhdGFiYXNlLlJlZmVyZW5jZSkge1xyXG4gICAgICAgIHN1cGVyKFVzZXIuZ2VvbWV0cnksIFVzZXIubWF0ZXJpYWwpO1xyXG4gICAgICAgIC8vIHRoaXMgaGFuZGxlcyB1cGRhdGluZ1xyXG4gICAgICAgIG15UmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogRGF0YWJhc2VVc2VyID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNoYXJlZFN0YXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gaGFuZGxlIG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZChuZXcgVEhSRUUuQXhlc0hlbHBlcigxMDApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcHVzaFNoYXJlZFN0YXRlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1VzZXI6IERhdGFiYXNlVXNlciA9IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgICAgICAgICAgICAgICB6OiB0aGlzLnBvc2l0aW9uLnosXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnJvdGF0aW9uLngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5yb3RhdGlvbi55LFxyXG4gICAgICAgICAgICAgICAgICAgIHo6IHRoaXMucm90YXRpb24ueixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubXlSZWYuc2V0KG5ld1VzZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaGFyZWRTdGF0ZShkYXRhYmFzZVVzZXI6IERhdGFiYXNlVXNlcikge1xyXG4gICAgICAgIGNvbnN0IHsgcG9zaXRpb24sIHJvdGF0aW9uIH0gPSBkYXRhYmFzZVVzZXI7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSgpIHsgfVxyXG59IiwiZnVuY3Rpb24gcmFuZG9tVXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpO1xyXG59XHJcblxyXG5sZXQgbXlVc2VySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeVVzZXJJZCgpIHtcclxuICAgIGlmIChteVVzZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlVXNlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXlVc2VySWRcIik7XHJcbiAgICAgICAgbXlVc2VySWQgPSBsb2NhbFN0b3JhZ2VVc2VySWQgfHwgcmFuZG9tVXNlcklkKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlVc2VySWRcIiwgbXlVc2VySWQpO1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH1cclxufVxyXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgXCIuL2ZvcmVzdC9tb25rZXlwYXRjaFRocmVlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcclxuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcblxyXG5pbXBvcnQgeyBGb3Jlc3QgfSBmcm9tIFwiLi9mb3Jlc3RcIjtcclxuXHJcbmltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtkYjogZmlyZWJhc2UuZGF0YWJhc2UuRGF0YWJhc2V9LCB7fT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8Rm9yZXN0IGRiPXtkYn0gLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogXCJyZWxhdGl2ZVwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPlBvbHlwaG9uZS5pbzwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvb0xpc3RlbmVyIGRiPXtkYn0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jbGFzcyBGb29MaXN0ZW5lciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8e2RiOiBmaXJlYmFzZS5kYXRhYmFzZS5EYXRhYmFzZX0sIHsgdmFsPzogYW55IH0+IHtcclxuICAgIHN0YXRlID0geyB2YWw6IHVuZGVmaW5lZCB9O1xyXG5cclxuICAgIHByaXZhdGUgcmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55LCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMucmVmID0gdGhpcy5wcm9wcy5kYi5yZWYoXCJmb29cIik7XHJcbiAgICAgICAgdGhpcy5yZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QpO1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiBzbmFwc2hvdC52YWwoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT4rPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8Rm9vUmVuZGVyZXIgdmFsPXt0aGlzLnN0YXRlLnZhbH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmLnNldCh0aGlzLnN0YXRlLnZhbCEgKyAxKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgRm9vUmVuZGVyZXI6IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDx7dmFsOiBhbnl9PiA9ICh7IHZhbCB9KSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIEZvbyBpczpcclxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeSh2YWwpfTwvcHJlPlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG4vLyBjb25zdCBzZXJ2ZXIgPSBpbygpO1xyXG4vLyBzZXJ2ZXIuc2VuZChcImhlbGxvXCIpO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUJUM2hUWVJqMHUtQXBaRTFfWjFmeVhmMlppVjltZ1hyMFwiLFxyXG4gICAgYXV0aERvbWFpbjogXCJwb2x5cGhvbmUtaW8uZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL3BvbHlwaG9uZS1pby5maXJlYmFzZWlvLmNvbVwiLFxyXG4gICAgcHJvamVjdElkOiBcInBvbHlwaG9uZS1pb1wiLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJwb2x5cGhvbmUtaW8uYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjI1NTIxODE3ODI1NlwiXHJcbn07XHJcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuY29uc29sZS5sb2coZGIpO1xyXG5cclxuLy8gY29uc3QgZm9vUmVmID0gZGIucmVmKFwiZm9vXCIpO1xyXG4vLyBmb29SZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuLy8gICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbi8vICAgICAgICAgc25hcHNob3QudmFsO1xyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuXHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG50cnkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKDxBcHAgZGI9e2RifSAvPiwgcm9vdCk7XHJcbn0gY2F0Y2ggKGUpIHtcclxuICAgIHJvb3QhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGUpO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBcInVuaWZvcm0gZmxvYXQgdGltZTtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcXHJcXG5cXHJcXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYXJtb3J5M2QvYXJtb3J5L2Jsb2IvbWFzdGVyL1NoYWRlcnMvc3RkL3RvbmVtYXAuZ2xzbFxcclxcblxcclxcbmZsb2F0IHZpZ25ldHRlKCkge1xcclxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0dGRlc2wvbHdqZ2wtYmFzaWNzL3dpa2kvU2hhZGVyTGVzc29uM1xcclxcbiAgICB2ZWMyIHBvc2l0aW9uID0gdlRleHR1cmVDb29yZCAtIHZlYzIoMC41KTtcXHJcXG5cXHJcXG4gICAgLy9kZXRlcm1pbmUgdGhlIHZlY3RvciBsZW5ndGggb2YgdGhlIGNlbnRlciBwb3NpdGlvblxcclxcbiAgICBmbG9hdCBsZW4gPSBsZW5ndGgocG9zaXRpb24pO1xcclxcblxcclxcbiAgICAvL3VzZSBzbW9vdGhzdGVwIHRvIGNyZWF0ZSBhIHNtb290aCB2aWduZXR0ZVxcclxcbiAgICBmbG9hdCBSQURJVVMgPSAwLjc1O1xcclxcbiAgICBmbG9hdCBTT0ZUTkVTUyA9IDAuNDU7XFxyXFxuICAgIGZsb2F0IHZpZ25ldHRlID0gc21vb3Roc3RlcChSQURJVVMsIFJBRElVUy1TT0ZUTkVTUywgbGVuKTtcXHJcXG5cXHJcXG4gICAgcmV0dXJuIHZpZ25ldHRlO1xcclxcbn1cXHJcXG5cXHJcXG52ZWMyIGJhcnJlbERpc3RvcnRpb24odmVjMiBjb29yZCwgZmxvYXQgYW10KSB7XFxyXFxuICAgIHZlYzIgY2MgPSBjb29yZCAtIDAuNTtcXHJcXG4gICAgZmxvYXQgZGlzdCA9IGRvdChjYywgY2MpO1xcclxcbiAgICByZXR1cm4gY29vcmQgKyBjYyAqIGRpc3QgKiBhbXQ7XFxyXFxufVxcclxcblxcclxcbmZsb2F0IHNhdCggZmxvYXQgdCApXFxyXFxue1xcclxcbiAgICByZXR1cm4gY2xhbXAoIHQsIDAuMCwgMS4wICk7XFxyXFxufVxcclxcblxcclxcbmZsb2F0IGxpbnRlcnAoIGZsb2F0IHQgKSB7XFxyXFxuICAgIHJldHVybiBzYXQoIDEuMCAtIGFicyggMi4wKnQgLSAxLjAgKSApO1xcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCByZW1hcCggZmxvYXQgdCwgZmxvYXQgYSwgZmxvYXQgYiApIHtcXHJcXG4gICAgcmV0dXJuIHNhdCggKHQgLSBhKSAvIChiIC0gYSkgKTtcXHJcXG59XFxyXFxuXFxyXFxudmVjNCBzcGVjdHJ1bV9vZmZzZXQoIGZsb2F0IHQgKSB7XFxyXFxuICAgIHZlYzQgcmV0O1xcclxcbiAgICBmbG9hdCBsbyA9IHN0ZXAodCwwLjUpO1xcclxcbiAgICBmbG9hdCBoaSA9IDEuMC1sbztcXHJcXG4gICAgZmxvYXQgdyA9IGxpbnRlcnAoIHJlbWFwKCB0LCAxLjAvNi4wLCA1LjAvNi4wICkgKTtcXHJcXG4gICAgcmV0ID0gdmVjNChsbywxLjAsaGksIDEuKSAqIHZlYzQoMS4wLXcsIHcsIDEuMC13LCAxLik7XFxyXFxuXFxyXFxuICAgIHJldHVybiBwb3coIHJldCwgdmVjNCgxLjAvMi4yKSApO1xcclxcbn1cXHJcXG5cXHJcXG52ZWMzIGNocm9tYXRpY0FiYmVyYXRpb24oKSB7XFxyXFxuICAgIGNvbnN0IGZsb2F0IG1heF9kaXN0b3J0ID0gMC4zO1xcclxcbiAgICBjb25zdCBpbnQgbnVtX2l0ZXIgPSAxMjtcXHJcXG4gICAgY29uc3QgZmxvYXQgcmVjaV9udW1faXRlcl9mID0gMS4wIC8gZmxvYXQobnVtX2l0ZXIpO1xcclxcblxcclxcbiAgICB2ZWMyIHV2PSh2VGV4dHVyZUNvb3JkKi44KSsuMTA7XFxyXFxuICAgIC8qIHZlYzIgdXYgPSB2VGV4dHVyZUNvb3JkLnh5OyAqL1xcclxcblxcclxcbiAgICB2ZWM0IHN1bWNvbCA9IHZlYzQoMC4wKTtcXHJcXG4gICAgdmVjNCBzdW13ID0gdmVjNCgwLjApO1xcclxcbiAgICBmb3IgKCBpbnQgaT0wOyBpPG51bV9pdGVyOysraSApXFxyXFxuICAgIHtcXHJcXG4gICAgICAgIGZsb2F0IHQgPSBmbG9hdChpKSAqIHJlY2lfbnVtX2l0ZXJfZjtcXHJcXG4gICAgICAgIHZlYzQgdyA9IHNwZWN0cnVtX29mZnNldCggdCApO1xcclxcbiAgICAgICAgc3VtdyArPSB3O1xcclxcbiAgICAgICAgdmVjNCB0ZXggPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCBiYXJyZWxEaXN0b3J0aW9uKHV2LCAuNiAqIG1heF9kaXN0b3J0KnQgKSApO1xcclxcbiAgICAgICAgLy8gbW92ZSBmcm9tIGxpbmVhciB0byBsaWdodHNwYWNlXFxyXFxuICAgICAgICAvLyB0ZXggPSB2ZWM0KGxvZygxLjAgKyB0ZXgucmdiICogMjU1LiksIDEuMCk7XFxyXFxuICAgICAgICBzdW1jb2wgKz0gdyAqIHRleDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICByZXR1cm4gKHN1bWNvbCAvIHN1bXcpLnJnYjtcXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgcmFuZG9tKHZlYzIgbiwgZmxvYXQgb2Zmc2V0ICl7XFxyXFxuICAgIHJldHVybiAuNSAtIGZyYWN0KHNpbihkb3Qobi54eSArIHZlYzIob2Zmc2V0LCAwLiksIHZlYzIoMTIuOTg5OCwgNzguMjMzKSkpKiA0Mzc1OC41NDUzKTtcXHJcXG59XFxyXFxuXFxyXFxudm9pZCBtYWluKHZvaWQpIHtcXHJcXG4gICAgLy8gY2hyb21hdGljIGFiYmVyYXRpb25cXHJcXG4gICAgdmVjMyB0b3RhbENvbG9yID0gY2hyb21hdGljQWJiZXJhdGlvbigpO1xcclxcblxcclxcbiAgICAvLyBiaXQgb2YgdmlnbmV0dGluZ1xcclxcbiAgICBmbG9hdCB2aWduZXR0ZUFtb3VudCA9IHZpZ25ldHRlKCk7XFxyXFxuICAgIHRvdGFsQ29sb3IgPSBtaXgodG90YWxDb2xvciwgdG90YWxDb2xvciAqIHZpZ25ldHRlQW1vdW50LCAwLjUpO1xcclxcblxcclxcbiAgICAvLyBub2lzZVxcclxcbiAgICB0b3RhbENvbG9yICs9IDAuMDI1ICogcmFuZG9tKHZUZXh0dXJlQ29vcmQsIDEuICsgdGltZSAqIDAuMDAxKTtcXHJcXG5cXHJcXG4gICAgLy8gdG90YWxDb2xvciA9IHBvdyh0b3RhbENvbG9yLCB2ZWMzKDAuNDUpKTtcXHJcXG5cXHJcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0b3RhbENvbG9yLCAxLjApO1xcclxcbn1cIiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHsgUG9zdFNoYWRlciB9IGZyb20gXCIuL3NoYWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvc3RQYXNzIGV4dGVuZHMgVEhSRUUuU2hhZGVyUGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQb3N0U2hhZGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zdFBhc3M7XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgdmVydGV4U2hhZGVyID0gcmVxdWlyZShcIi4vdmVydGV4Lmdsc2xcIik7XHJcbmNvbnN0IGZyYWdtZW50U2hhZGVyID0gcmVxdWlyZShcIi4vZnJhZ21lbnQuZ2xzbFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBQb3N0U2hhZGVyOiBUSFJFRS5TaGFkZXIgPSB7XHJcbiAgICB1bmlmb3Jtczoge1xyXG4gICAgICAgIHRpbWU6ICAgICAgeyB2YWx1ZTogMCB9LFxyXG4gICAgICAgIHREaWZmdXNlOiAgeyB2YWx1ZTogbnVsbCB9LFxyXG4gICAgfSxcclxuICAgIHZlcnRleFNoYWRlcixcclxuICAgIGZyYWdtZW50U2hhZGVyLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcbiAgICB2VGV4dHVyZUNvb3JkID0gdXY7XFxyXFxuICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXHJcXG59XFxyXFxuXCIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XFxuICAvKiAyICovIH1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmJvZHkge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwOyB9XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gIC8qIDEgKi9cXG4gIGhlaWdodDogMDtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTtcXG4gIC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgLyogMiAqLyB9XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTsgfVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtOyB9XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtOyB9XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lOyB9XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAvKiAxICovXFxuICBtYXJnaW46IDA7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lOyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7XFxuICAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbiAgLyogMSAqLyB9XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bzsgfVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bzsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcXG4gIC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbiAgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtOyB9XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmZvcmVzdC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwOyB9XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuaHRtbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIl0sInNvdXJjZVJvb3QiOiIifQ==