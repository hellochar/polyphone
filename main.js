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
/******/ 	var hotCurrentHash = "9d97e12a95f0c817e749";
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
/******/ 	__webpack_require__.p = "";
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

/***/ "./client/src/audio/audioClip.ts":
/*!***************************************!*\
  !*** ./client/src/audio/audioClip.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_OPTIONS = {
    volume: 1,
    autoplay: false,
    loop: false,
};
class AudioClip {
    constructor(options) {
        const { autoplay, loop, volume, srcs } = Object.assign({}, DEFAULT_OPTIONS, options);
        this.element = document.createElement("audio");
        this.element.autoplay = autoplay;
        this.element.loop = loop;
        this.element.volume = volume;
        this.element.preload = "auto";
        for (const srcUrl of srcs) {
            const extension = srcUrl.split(".").pop();
            const source = document.createElement("source");
            source.src = srcUrl;
            source.type = `audio/${extension}`;
            this.element.appendChild(source);
        }
        this.element.load();
        if (options.context != null) {
            this.node = options.context.createMediaElementSource(this.element);
        }
    }
    get volume() {
        return this.element.volume;
    }
    set volume(v) {
        this.element.volume = v;
    }
    get playbackRate() {
        return this.element.playbackRate;
    }
    set playbackRate(r) {
        this.element.playbackRate = r;
    }
    getNode() {
        return this.node;
    }
    play() {
        return this.element.play();
    }
}
exports.AudioClip = AudioClip;


/***/ }),

/***/ "./client/src/common/noise.ts":
/*!************************************!*\
  !*** ./client/src/common/noise.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// copy-pasted from https://raw.githubusercontent.com/josephg/noisejs/master/perlin.js
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */
class Grad {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    dot2(x, y) {
        return this.x * x + this.y * y;
    }
    dot3(x, y, z) {
        return this.x * x + this.y * y + this.z * z;
    }
}
const grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
    new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
    new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
const p = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
/*
for(const i=0; i<256; i++) {
perm[i] = perm[i + 256] = p[i];
gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
}*/
// Skewing and unskewing factors for 2, 3, and 4 dimensions
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const F3 = 1 / 3;
const G3 = 1 / 6;
class Noise {
    constructor(seed = Math.random() * 2147483647) {
        // To remove the need for index wrapping, double the permutation table length
        this.perm = new Array(512);
        this.gradP = new Array(512);
        this.octaveNum = 6;
        this.octaveFalloff = 0.5;
        // rotate by 1 radians (~57 deg), scale by 2
        this.octaveMatrix2 = [
            Math.cos(1) * 2, -Math.sin(1) * 2,
            Math.sin(1) * 2, Math.cos(1) * 2,
        ];
        this.seed(seed);
    }
    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    seed(seed) {
        if (seed > 0 && seed < 1) {
            // Scale the seed out
            seed *= 65536;
        }
        seed = Math.floor(seed);
        if (seed < 256) {
            seed |= seed << 8;
        }
        for (let i = 0; i < 256; i++) {
            let v;
            if (i & 1) {
                v = p[i] ^ (seed & 255);
            }
            else {
                v = p[i] ^ ((seed >> 8) & 255);
            }
            this.perm[i] = this.perm[i + 256] = v;
            this.gradP[i] = this.gradP[i + 256] = grad3[v % 12];
        }
    }
    ;
    // 2D simplex noise
    simplex2(xin, yin) {
        let n0, n1, n2; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        const s = (xin + yin) * F2; // Hairy factor for 2D
        let i = Math.floor(xin + s);
        let j = Math.floor(yin + s);
        const t = (i + j) * G2;
        let x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        let y0 = yin - j + t;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            i1 = 1;
            j1 = 0;
        }
        else { // upper triangle, YX order: (0,0)->(0,1)->(1,1)
            i1 = 0;
            j1 = 1;
        }
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        i &= 255;
        j &= 255;
        const gi0 = this.gradP[i + this.perm[j]];
        const gi1 = this.gradP[i + i1 + this.perm[j + j1]];
        const gi2 = this.gradP[i + 1 + this.perm[j + 1]];
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) {
            n0 = 0;
        }
        else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) {
            n1 = 0;
        }
        else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot2(x1, y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) {
            n2 = 0;
        }
        else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot2(x2, y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
    }
    ;
    octaveSimplex2(xin, yin, octaveNum = this.octaveNum, octaveFalloff = this.octaveFalloff) {
        let sum = 0;
        let x = xin;
        let y = yin;
        let scalar = 1;
        for (let i = 0; i < octaveNum; i++) {
            sum += this.simplex2(x, y) * scalar;
            const newX = x * this.octaveMatrix2[0] + y * this.octaveMatrix2[1];
            const newY = x * this.octaveMatrix2[2] + y * this.octaveMatrix2[3];
            x = newX;
            y = newY;
            scalar *= octaveFalloff;
        }
        return sum;
    }
    // 3D simplex noise
    simplex3(xin, yin, zin) {
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (xin + yin + zin) * F3; // Hairy factor for 2D
        let i = Math.floor(xin + s);
        let j = Math.floor(yin + s);
        let k = Math.floor(zin + s);
        const t = (i + j + k) * G3;
        const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        const y0 = yin - j + t;
        const z0 = zin - k + t;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            }
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            }
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            }
        }
        else {
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            }
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            }
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            }
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        let x2 = x0 - i2 + 2 * G3; // Offsets for third corner
        let y2 = y0 - j2 + 2 * G3;
        let z2 = z0 - k2 + 2 * G3;
        let x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
        let y3 = y0 - 1 + 3 * G3;
        let z3 = z0 - 1 + 3 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        i &= 255;
        j &= 255;
        k &= 255;
        const { gradP, perm } = this;
        let gi0 = gradP[i + perm[j + perm[k]]];
        let gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
        let gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
        let gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) {
            n0 = 0;
        }
        else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) {
            n1 = 0;
        }
        else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) {
            n2 = 0;
        }
        else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) {
            n3 = 0;
        }
        else {
            t3 *= t3;
            n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 32 * (n0 + n1 + n2 + n3);
    }
    ;
    octaveSimplex3(xin, yin, zin, octaveNum = this.octaveNum, octaveFalloff = this.octaveFalloff) {
        let sum = 0;
        let x = xin;
        let y = yin;
        let z = zin;
        let scalar = 1;
        for (let i = 0; i < octaveNum; i++) {
            sum += this.simplex3(x, y, z) * scalar;
            x *= 2;
            y *= 2;
            z *= 2;
            scalar *= octaveFalloff;
        }
        return sum;
    }
    // ##### Perlin noise stuff
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }
    // 2D Perlin Noise
    perlin2(x, y) {
        // Find unit grid cell containing point
        let X = Math.floor(x), Y = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - X;
        y = y - Y;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        const { gradP, perm } = this;
        // Calculate noise contributions from each of the four corners
        let n00 = gradP[X + perm[Y]].dot2(x, y);
        let n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        let n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        let n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
        // Compute the fade curve value for x
        let u = this.fade(x);
        // Interpolate the four results
        return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));
    }
    ;
    // 3D Perlin Noise
    perlin3(x, y, z) {
        const { gradP, perm } = this;
        // Find unit grid cell containing point
        let X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
        // Get relative xyz coordinates of point within that cell
        x = x - X;
        y = y - Y;
        z = z - Z;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;
        // Calculate noise contributions from each of the eight corners
        let n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        let n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        let n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        let n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        let n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        let n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        let n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        let n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);
        // Compute the fade curve value for x, y, z
        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);
        // Interpolate
        return this.lerp(this.lerp(this.lerp(n000, n100, u), this.lerp(n001, n101, u), w), this.lerp(this.lerp(n010, n110, u), this.lerp(n011, n111, u), w), v);
    }
    ;
}
exports.Noise = Noise;


/***/ }),

/***/ "./client/src/forest/audioManager.ts":
/*!*******************************************!*\
  !*** ./client/src/forest/audioManager.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const audioClip_1 = __webpack_require__(/*! ../audio/audioClip */ "./client/src/audio/audioClip.ts");
class AudioManager {
    constructor(playSound) {
        const contextConstructor = window.AudioContext || window.webkitAudioContext;
        this.context = new contextConstructor();
        this.analyser = this.context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.1;
        // const gain = this.context.createGain();
        // gain.gain.setValueAtTime(0, 0);
        // gain.connect(this.context.destination);
        this.audioClip = new audioClip_1.AudioClip({
            autoplay: false,
            context: this.context,
            srcs: ["june_3rd.mp3", "june_3rd.wav"],
        });
        this.audioClip.node.connect(this.analyser);
        if (playSound) {
            this.audioClip.node.connect(this.context.destination);
        }
        this.analyser.fftSize = 2048;
        this.analyserFrequencyAmplitudes = new Uint8Array(this.analyser.frequencyBinCount);
    }
    update() {
        this.analyser.getByteFrequencyData(this.analyserFrequencyAmplitudes);
    }
    getFrequencyAmplitudes() {
        return this.analyserFrequencyAmplitudes;
    }
    syncAudioClip(playbackBegin) {
        if (playbackBegin < 0) {
            this.audioClip.element.pause();
            this.audioClip.element.currentTime = 0;
        }
        else if (playbackBegin > Date.now()) {
            // schedule it in the future
            // TODO maybe make this more precize
            setTimeout(() => {
                this.audioClip.play();
            }, playbackBegin - Date.now());
        }
        else {
            // we're already playing
            const curPosition = (Date.now() - playbackBegin) / 1000;
            this.audioClip.play();
            this.audioClip.element.currentTime = curPosition;
        }
    }
    isPlaying() {
        return !this.audioClip.element.paused;
    }
}
exports.AudioManager = AudioManager;


/***/ }),

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
const audioManager_1 = __webpack_require__(/*! ./audioManager */ "./client/src/forest/audioManager.ts");
class Forest extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            now: Date.now(),
            audioPlaybackBegin: -1,
        };
        this.handleCanvasRef = (canvas) => {
            if (canvas == null) {
                if (this.sketch != null) {
                    this.sketch.dispose();
                }
            }
            else {
                this.sketch = new sketch_1.ForestSketch(this.props.db, this.audioManager, canvas);
            }
        };
        this.handleBeginPlaybackClick = () => {
            // starts in 5 seconds
            const playbackTime = Date.now() + 5000;
            this.playbackBeginRef.set(playbackTime);
        };
        this.handleCancelPlayback = () => {
            this.playbackBeginRef.set(-1);
        };
        this.audioManager = new audioManager_1.AudioManager(!!this.props.isAdmin);
        this.playbackBeginRef = this.props.db.ref("audioPlaybackBegin");
        this.playbackBeginRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.setState({ audioPlaybackBegin: snapshot.val() });
                this.audioManager.syncAudioClip(snapshot.val());
            }
        });
    }
    componentDidUpdate() {
        setTimeout(() => {
            this.setState({
                now: Date.now(),
            });
        }, 100);
    }
    render() {
        return (React.createElement("div", { className: "forest-container" },
            React.createElement("canvas", { ref: this.handleCanvasRef }),
            this.maybeRenderAdminControls()));
    }
    maybeRenderAdminControls() {
        if (this.props.isAdmin) {
            return (React.createElement("div", { className: "admin" },
                React.createElement("h2", null, "polyphone.io admin"),
                React.createElement("p", null, "23 people connected. Song 1 of 6."),
                this.renderPlaybackState()));
        }
    }
    renderPlaybackState() {
        if (this.state.audioPlaybackBegin < 0) {
            return (React.createElement("div", null,
                "Not playing.",
                React.createElement("button", { onClick: this.handleBeginPlaybackClick }, "Begin playback")));
        }
        const dt = this.state.audioPlaybackBegin - Date.now();
        if (dt > 0) {
            return (React.createElement("div", null,
                "Starting in ",
                (dt / 1000).toFixed(1),
                " seconds...",
                React.createElement("button", { onClick: this.handleCancelPlayback }, "Cancel")));
        }
        else {
            return (React.createElement("div", null,
                "Playing... ",
                -Math.floor(dt / 1000),
                React.createElement("button", { onClick: this.handleCancelPlayback }, "Stop")));
        }
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
const noise_1 = __webpack_require__(/*! ../common/noise */ "./client/src/common/noise.ts");
let frequencyAmplitudes;
class ForestSketch {
    constructor(db, audioManager, canvas) {
        this.db = db;
        this.audioManager = audioManager;
        this.canvas = canvas;
        this.users = new Map();
        // public audio: AudioPlayer;
        this.dummyCamera = new THREE.PerspectiveCamera();
        this.keys = new Set();
        this.touches = 0;
        this.animate = (millisDt) => {
            try {
                this.audioManager.update();
                if (this.diControls) {
                    this.diControls.update();
                }
                if (this.orbitControls) {
                    this.orbitControls.update();
                }
                // console.log(this.camera.rotation);
                this.scene.animate();
                for (const user of this.users.values()) {
                    user.animate();
                }
                if (this.self != null) {
                    if (this.camera.parent == null) {
                        this.self.add(this.camera);
                        this.camera.position.set(0, 50, 50);
                        this.camera.position.setLength(200);
                        this.camera.lookAt(this.self.position.x, this.self.position.y + 25, this.self.position.z);
                    }
                    this.self.quaternion.copy(this.dummyCamera.quaternion);
                    if (this.touches > 0) {
                        this.self.move(0, 0, -2);
                    }
                    console.log(this.keys);
                    if (this.keys.has(37)) { // left
                        this.self.move(-2, 0, 0);
                    }
                    if (this.keys.has(38)) { // up
                        this.self.move(0, 0, -2);
                    }
                    if (this.keys.has(39)) { // right
                        this.self.move(2, 0, 0);
                    }
                    if (this.keys.has(40)) { // down
                        this.self.move(0, 0, 2);
                    }
                    this.self.pushSharedState();
                }
                this.composer.render();
                requestAnimationFrame(this.animate);
            }
            catch (e) {
                document.body.innerText = `Error: ${e.name} - ${e.message}. ${e.stack}`;
            }
        };
        frequencyAmplitudes = this.audioManager.getFrequencyAmplitudes();
        window.sketch = this;
        this.renderer = this.initRenderer();
        this.scene = new ForestScene(this);
        this.updateCanvasSize();
        window.addEventListener("resize", () => {
            this.updateCanvasSize();
        });
        this.camera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
        // this.scene.add(this.camera);
        // this.dummyCamera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
        // this.scene.add(this.dummyCamera);
        this.orbitControls = new THREE.OrbitControls(this.dummyCamera, this.canvas);
        window.addEventListener("deviceorientation", (evt) => {
            if (evt.alpha && evt.gamma && evt.beta) {
                this.diControls = new THREE.DeviceOrientationControls(this.dummyCamera);
                this.orbitControls = undefined;
            }
        }, {
            once: true,
        });
        this.composer = this.initComposer();
        this.initMyUser();
        this.setupUsersListeners();
        requestAnimationFrame(this.animate);
        this.setupEvents();
        // this.audio.prepare();
    }
    get aspectRatio() {
        return this.renderer.domElement.height / this.renderer.domElement.width;
    }
    get self() {
        return this.users.get(userId_1.getMyUserId());
    }
    setupEvents() {
        this.canvas.addEventListener("touchstart", () => {
            this.touches++;
        });
        this.canvas.addEventListener("touchend", () => {
            this.touches--;
        });
        document.addEventListener("keydown", (evt) => {
            this.keys.add(evt.keyCode);
        });
        document.addEventListener("keyup", (evt) => {
            this.keys.delete(evt.keyCode);
        });
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
                        y: THREE.Math.randFloat(0, 20),
                        z: THREE.Math.randFloat(-200, 200),
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    color: (new THREE.Color(Math.random(), Math.random(), Math.random())).getHex(),
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
            // console.log(parent.clientWidth, parent.clientHeight);
            if (this.camera != null) {
                this.camera.aspect = 1 / this.aspectRatio;
                this.camera.updateProjectionMatrix();
            }
        }
    }
}
exports.ForestSketch = ForestSketch;
class ForestScene extends THREE.Scene {
    constructor(sketch) {
        super();
        this.sketch = sketch;
        this.things = [];
        this.things.push(new Ground());
        this.things.push(new Spheres());
        const lights = new Lights();
        this.things.push(lights);
        this.sky = new Sky();
        this.sky.sky.material.uniforms.sunPosition.value.copy(lights.light1.position);
        this.things.push(this.sky);
        this.add(...this.things);
    }
    animate() {
        if (this.sketch.audioManager.isPlaying()) {
            this.sky.setNightTime();
        }
        else {
            this.sky.setDayTime();
        }
        for (const t of this.things) {
            t.animate();
        }
    }
}
class Ground extends THREE.Mesh {
    constructor() {
        const geom = new THREE.PlaneGeometry(1000, 1000, 50, 50);
        geom.rotateX(-Math.PI / 2);
        const material = new THREE.MeshStandardMaterial({
            roughness: 1,
            color: "#202020",
            side: THREE.DoubleSide,
            metalness: 0,
        });
        super(geom, material);
        this.noise = new noise_1.Noise(0);
        this.t = 0;
        this.position.y = -200;
        this.castShadow = true;
        this.receiveShadow = true;
    }
    animate() {
        this.t += frequencyAmplitudes[0] / 255 / 100;
        for (const vertex of this.geometry.vertices) {
            vertex.y = this.noise.simplex3(vertex.x / 250, vertex.z / 250, this.t) * 250 * (frequencyAmplitudes[0] / 255);
        }
        this.geometry.verticesNeedUpdate = true;
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
        const scale = THREE.Math.mapLinear(frequencyAmplitudes[5], 0, 255, 0.1, 10);
        this.scale.setScalar(scale);
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
        this.setDayTime();
        this.add(this.sky);
    }
    setDayTime() {
        const uniforms = this.sky.material.uniforms;
        uniforms.turbidity.value = 1;
        uniforms.rayleigh.value = 0.8;
        uniforms.mieCoefficient.value = 0.03;
        uniforms.mieDirectionalG.value = 0.87;
        uniforms.luminance.value = 1.01;
    }
    setNightTime() {
        const uniforms = this.sky.material.uniforms;
        // turbidity affects how brightly the sun/moon shines. You want turbidity ~8 for nighttime.
        uniforms.turbidity.value = 5;
        // rayleigh is the big thing that affects "daytime" or "nighttime". rayleigh 0 = full night, rayleigh 1 = full day
        uniforms.rayleigh.value = 0.0;
        uniforms.mieCoefficient.value = 0.012;
        uniforms.mieDirectionalG.value = 0.70;
    }
    animate() {
    }
}
class User extends THREE.Mesh {
    constructor(myRef) {
        super(User.geometry, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }));
        this.myRef = myRef;
        this.castShadow = true;
        this.receiveShadow = true;
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
                    color: this.material.color.getHex(),
                };
                yield this.myRef.set(newUser);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    move(dx, dy, dz) {
        const newPosition = this.localToWorld(new THREE.Vector3(dx, dy, dz));
        this.position.copy(newPosition);
    }
    updateSharedState(databaseUser) {
        const { position, rotation, color } = databaseUser;
        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);
        if (this.material.color.getHex() !==
            color) {
            this.material.color.setHex(color);
            this.material.needsUpdate = true;
        }
    }
    animate() {
        // const scale = THREE.Math.mapLinear(frequencyAmplitudes[8], 0, 255, 0.5, 2);
        // this.scale.setScalar(scale);
    }
}
User.geometry = new THREE.TorusKnotBufferGeometry(20, 3, 100, 16);


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
const isAdmin = location.search.indexOf("admin") !== -1;
class App extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(forest_1.Forest, { isAdmin: isAdmin, db: db })));
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
const root = document.getElementById("root");
try {
    ReactDOM.render(React.createElement(App, { db: db }), root);
}
catch (e) {
    if (e instanceof Error) {
        root.innerText = `Error: ${e.name} - ${e.message}. ${e.stack}`;
    }
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
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none; }\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none; }\n\n.forest-container {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n.admin {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.8);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  width: 100%;\n  padding-left: 20px;\n  padding-bottom: 20px; }\n\n* {\n  box-sizing: border-box; }\n\nhtml {\n  overflow: hidden; }\n\n.forest-container canvas {\n  position: absolute; }\n", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9hdWRpby9hdWRpb0NsaXAudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21tb24vbm9pc2UudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9mb3Jlc3QvYXVkaW9NYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZm9yZXN0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2ZvcmVzdC9tb25rZXlwYXRjaFRocmVlLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZm9yZXN0L3NrZXRjaC50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2ZvcmVzdC91c2VySWQudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5zY3NzPzRhNmUiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9wb3N0L2ZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9wb3N0L2luZGV4LnRzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvcG9zdC9zaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9wb3N0L3ZlcnRleC5nbHNsIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWhGLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ2hDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ2pHLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDL0YsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHO0lBQzlGLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztJQUMvRixHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDNUYsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDN0YsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNoRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMzRixHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztJQUM1RixHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFF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LEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUV4QixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQywyQkFBMkI7UUFDdEQsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUUxQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyw0QkFBNEI7UUFDdEQsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV6QixtRUFBbUU7UUFDbkUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENB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LEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQseURBQXlEO1FBQ3pELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxnRkFBZ0Y7UUFDaEYsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXRDLCtEQUErRDtRQUMvRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU5RSwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JC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QUFzTCxpQkFBaUIsRUFBRSxxSUFBcUksa0NBQWtDLG9DQUFvQyxhQUFhLHdIQUF3SCw2QkFBNkIsRUFBRSwyS0FBMkssK0JBQStCLDZCQUE2QixhQUFhLGtMQUFrTCxtQkFBbUIsRUFBRSxtRUFBbUUsdUJBQXVCLEVBQUUsMEpBQTBKLGtCQUFrQixFQUFFLDhEQUE4RCxrQkFBa0IsRUFBRSx1QkFBdUIsdUJBQXVCLFdBQVcsY0FBYyxZQUFZLGFBQWEsRUFBRSxZQUFZLHVCQUF1Qix5Q0FBeUMseUJBQXlCLGtCQUFrQiwrQkFBK0IsK0JBQStCLGdCQUFnQix1QkFBdUIseUJBQXlCLEVBQUUsT0FBTywyQkFBMkIsRUFBRSxVQUFVLHFCQUFxQixFQUFFLDhCQUE4Qix1QkFBdUIsRUFBRTs7QUFFN3VOIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjlkOTdlMTJhOTVmMGM4MTdlNzQ5XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9jbGllbnQvc3JjL2luZGV4LnRzeFwiLFwidmVuZG9yc35tYWluXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBBdWRpb0NsaXBPcHRpb25zIHtcclxuICAgIGNvbnRleHQ/OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBzcmNzOiBzdHJpbmdbXTtcclxuICAgIGF1dG9wbGF5PzogYm9vbGVhbjtcclxuICAgIGxvb3A/OiBib29sZWFuO1xyXG4gICAgdm9sdW1lPzogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICB2b2x1bWU6IDEsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBsb29wOiBmYWxzZSxcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0NsaXAge1xyXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxNZWRpYUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgbm9kZT86IE1lZGlhRWxlbWVudEF1ZGlvU291cmNlTm9kZTtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7IGF1dG9wbGF5LCBsb29wLCB2b2x1bWUsIHNyY3MgfSA9IHsgLi4uREVGQVVMVF9PUFRJT05TLCAuLi5vcHRpb25zIH07XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hdXRvcGxheSA9IGF1dG9wbGF5O1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5sb29wID0gbG9vcDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQudm9sdW1lID0gdm9sdW1lO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVsb2FkID0gXCJhdXRvXCI7XHJcbiAgICAgICAgZm9yIChjb25zdCBzcmNVcmwgb2Ygc3Jjcykge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBzcmNVcmwuc3BsaXQoXCIuXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gc3JjVXJsO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGBhdWRpby8ke2V4dGVuc2lvbn1gO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmxvYWQoKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG9wdGlvbnMuY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UodGhpcy5lbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZvbHVtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LnZvbHVtZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdm9sdW1lKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC52b2x1bWUgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5YmFja1JhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5wbGF5YmFja1JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBsYXliYWNrUmF0ZShyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucGxheWJhY2tSYXRlID0gcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LnBsYXkoKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBjb3B5LXBhc3RlZCBmcm9tIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qb3NlcGhnL25vaXNlanMvbWFzdGVyL3Blcmxpbi5qc1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZVxyXG5cclxuLypcclxuICogQSBzcGVlZC1pbXByb3ZlZCBwZXJsaW4gYW5kIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtcyBmb3IgMkQuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIGV4YW1wbGUgY29kZSBieSBTdGVmYW4gR3VzdGF2c29uIChzdGVndUBpdG4ubGl1LnNlKS5cclxuICogT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXHJcbiAqIEJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXHJcbiAqIENvbnZlcnRlZCB0byBKYXZhc2NyaXB0IGJ5IEpvc2VwaCBHZW50bGUuXHJcbiAqXHJcbiAqIFZlcnNpb24gMjAxMi0wMy0wOVxyXG4gKlxyXG4gKiBUaGlzIGNvZGUgd2FzIHBsYWNlZCBpbiB0aGUgcHVibGljIGRvbWFpbiBieSBpdHMgb3JpZ2luYWwgYXV0aG9yLFxyXG4gKiBTdGVmYW4gR3VzdGF2c29uLiBZb3UgbWF5IHVzZSBpdCBhcyB5b3Ugc2VlIGZpdCwgYnV0XHJcbiAqIGF0dHJpYnV0aW9uIGlzIGFwcHJlY2lhdGVkLlxyXG4gKlxyXG4gKi9cclxuXHJcbmNsYXNzIEdyYWQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlciwgcHVibGljIHo6IG51bWJlcikge31cclxuXHJcbiAgICBkb3QyKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5O1xyXG4gICAgfVxyXG5cclxuICAgIGRvdDMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHo7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGdyYWQzID0gW25ldyBHcmFkKDEsIDEsIDApLCBuZXcgR3JhZCgtMSwgMSwgMCksIG5ldyBHcmFkKDEsIC0xLCAwKSwgbmV3IEdyYWQoLTEsIC0xLCAwKSxcclxubmV3IEdyYWQoMSwgMCwgMSksIG5ldyBHcmFkKC0xLCAwLCAxKSwgbmV3IEdyYWQoMSwgMCwgLTEpLCBuZXcgR3JhZCgtMSwgMCwgLTEpLFxyXG5uZXcgR3JhZCgwLCAxLCAxKSwgbmV3IEdyYWQoMCwgLTEsIDEpLCBuZXcgR3JhZCgwLCAxLCAtMSksIG5ldyBHcmFkKDAsIC0xLCAtMSldO1xyXG5cclxuY29uc3QgcCA9IFsxNTEsIDE2MCwgMTM3LCA5MSwgOTAsIDE1LFxyXG4gICAgMTMxLCAxMywgMjAxLCA5NSwgOTYsIDUzLCAxOTQsIDIzMywgNywgMjI1LCAxNDAsIDM2LCAxMDMsIDMwLCA2OSwgMTQyLCA4LCA5OSwgMzcsIDI0MCwgMjEsIDEwLCAyMyxcclxuICAgIDE5MCwgNiwgMTQ4LCAyNDcsIDEyMCwgMjM0LCA3NSwgMCwgMjYsIDE5NywgNjIsIDk0LCAyNTIsIDIxOSwgMjAzLCAxMTcsIDM1LCAxMSwgMzIsIDU3LCAxNzcsIDMzLFxyXG4gICAgODgsIDIzNywgMTQ5LCA1NiwgODcsIDE3NCwgMjAsIDEyNSwgMTM2LCAxNzEsIDE2OCwgNjgsIDE3NSwgNzQsIDE2NSwgNzEsIDEzNCwgMTM5LCA0OCwgMjcsIDE2NixcclxuICAgIDc3LCAxNDYsIDE1OCwgMjMxLCA4MywgMTExLCAyMjksIDEyMiwgNjAsIDIxMSwgMTMzLCAyMzAsIDIyMCwgMTA1LCA5MiwgNDEsIDU1LCA0NiwgMjQ1LCA0MCwgMjQ0LFxyXG4gICAgMTAyLCAxNDMsIDU0LCA2NSwgMjUsIDYzLCAxNjEsIDEsIDIxNiwgODAsIDczLCAyMDksIDc2LCAxMzIsIDE4NywgMjA4LCA4OSwgMTgsIDE2OSwgMjAwLCAxOTYsXHJcbiAgICAxMzUsIDEzMCwgMTE2LCAxODgsIDE1OSwgODYsIDE2NCwgMTAwLCAxMDksIDE5OCwgMTczLCAxODYsIDMsIDY0LCA1MiwgMjE3LCAyMjYsIDI1MCwgMTI0LCAxMjMsXHJcbiAgICA1LCAyMDIsIDM4LCAxNDcsIDExOCwgMTI2LCAyNTUsIDgyLCA4NSwgMjEyLCAyMDcsIDIwNiwgNTksIDIyNywgNDcsIDE2LCA1OCwgMTcsIDE4MiwgMTg5LCAyOCwgNDIsXHJcbiAgICAyMjMsIDE4MywgMTcwLCAyMTMsIDExOSwgMjQ4LCAxNTIsIDIsIDQ0LCAxNTQsIDE2MywgNzAsIDIyMSwgMTUzLCAxMDEsIDE1NSwgMTY3LCA0MywgMTcyLCA5LFxyXG4gICAgMTI5LCAyMiwgMzksIDI1MywgMTksIDk4LCAxMDgsIDExMCwgNzksIDExMywgMjI0LCAyMzIsIDE3OCwgMTg1LCAxMTIsIDEwNCwgMjE4LCAyNDYsIDk3LCAyMjgsXHJcbiAgICAyNTEsIDM0LCAyNDIsIDE5MywgMjM4LCAyMTAsIDE0NCwgMTIsIDE5MSwgMTc5LCAxNjIsIDI0MSwgODEsIDUxLCAxNDUsIDIzNSwgMjQ5LCAxNCwgMjM5LCAxMDcsXHJcbiAgICA0OSwgMTkyLCAyMTQsIDMxLCAxODEsIDE5OSwgMTA2LCAxNTcsIDE4NCwgODQsIDIwNCwgMTc2LCAxMTUsIDEyMSwgNTAsIDQ1LCAxMjcsIDQsIDE1MCwgMjU0LFxyXG4gICAgMTM4LCAyMzYsIDIwNSwgOTMsIDIyMiwgMTE0LCA2NywgMjksIDI0LCA3MiwgMjQzLCAxNDEsIDEyOCwgMTk1LCA3OCwgNjYsIDIxNSwgNjEsIDE1NiwgMTgwXTtcclxuXHJcbi8qXHJcbmZvcihjb25zdCBpPTA7IGk8MjU2OyBpKyspIHtcclxucGVybVtpXSA9IHBlcm1baSArIDI1Nl0gPSBwW2ldO1xyXG5ncmFkUFtpXSA9IGdyYWRQW2kgKyAyNTZdID0gZ3JhZDNbcGVybVtpXSAlIDEyXTtcclxufSovXHJcblxyXG4vLyBTa2V3aW5nIGFuZCB1bnNrZXdpbmcgZmFjdG9ycyBmb3IgMiwgMywgYW5kIDQgZGltZW5zaW9uc1xyXG5jb25zdCBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKTtcclxuY29uc3QgRzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2O1xyXG5cclxuY29uc3QgRjMgPSAxIC8gMztcclxuY29uc3QgRzMgPSAxIC8gNjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2lzZSB7XHJcbiAgICAvLyBUbyByZW1vdmUgdGhlIG5lZWQgZm9yIGluZGV4IHdyYXBwaW5nLCBkb3VibGUgdGhlIHBlcm11dGF0aW9uIHRhYmxlIGxlbmd0aFxyXG4gICAgcHVibGljIHBlcm0gPSBuZXcgQXJyYXkoNTEyKTtcclxuICAgIHB1YmxpYyBncmFkUCA9IG5ldyBBcnJheSg1MTIpO1xyXG5cclxuICAgIHB1YmxpYyBvY3RhdmVOdW0gPSA2O1xyXG4gICAgcHVibGljIG9jdGF2ZUZhbGxvZmYgPSAwLjU7XHJcbiAgICAvLyByb3RhdGUgYnkgMSByYWRpYW5zICh+NTcgZGVnKSwgc2NhbGUgYnkgMlxyXG4gICAgcHVibGljIG9jdGF2ZU1hdHJpeDIgPSBbXHJcbiAgICAgICAgTWF0aC5jb3MoMSkgKiAyLCAtTWF0aC5zaW4oMSkgKiAyLFxyXG4gICAgICAgIE1hdGguc2luKDEpICogMiwgIE1hdGguY29zKDEpICogMixcclxuICAgIF07XHJcblxyXG4gICAgLy8gVGhpcyBpc24ndCBhIHZlcnkgZ29vZCBzZWVkaW5nIGZ1bmN0aW9uLCBidXQgaXQgd29ya3Mgb2suIEl0IHN1cHBvcnRzIDJeMTZcclxuICAgIC8vIGRpZmZlcmVudCBzZWVkIHZhbHVlcy4gV3JpdGUgc29tZXRoaW5nIGJldHRlciBpZiB5b3UgbmVlZCBtb3JlIHNlZWRzLlxyXG4gICAgcHVibGljIHNlZWQoc2VlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHNlZWQgPiAwICYmIHNlZWQgPCAxKSB7XHJcbiAgICAgICAgICAgIC8vIFNjYWxlIHRoZSBzZWVkIG91dFxyXG4gICAgICAgICAgICBzZWVkICo9IDY1NTM2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VlZCA9IE1hdGguZmxvb3Ioc2VlZCk7XHJcbiAgICAgICAgaWYgKHNlZWQgPCAyNTYpIHtcclxuICAgICAgICAgICAgc2VlZCB8PSBzZWVkIDw8IDg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2O1xyXG4gICAgICAgICAgICBpZiAoaSAmIDEpIHtcclxuICAgICAgICAgICAgICAgIHYgPSBwW2ldIF4gKHNlZWQgJiAyNTUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdiA9IHBbaV0gXiAoKHNlZWQgPj4gOCkgJiAyNTUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBlcm1baV0gPSB0aGlzLnBlcm1baSArIDI1Nl0gPSB2O1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRQW2ldID0gdGhpcy5ncmFkUFtpICsgMjU2XSA9IGdyYWQzW3YgJSAxMl07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZWVkOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMjE0NzQ4MzY0Nykge1xyXG4gICAgICAgIHRoaXMuc2VlZChzZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyRCBzaW1wbGV4IG5vaXNlXHJcbiAgICBwdWJsaWMgc2ltcGxleDIoeGluOiBudW1iZXIsIHlpbjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG4wLCBuMSwgbjI7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xyXG4gICAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cclxuICAgICAgICBjb25zdCBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxyXG4gICAgICAgIGxldCBpID0gTWF0aC5mbG9vcih4aW4gKyBzKTtcclxuICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XHJcbiAgICAgICAgY29uc3QgdCA9IChpICsgaikgKiBHMjtcclxuICAgICAgICBsZXQgeDAgPSB4aW4gLSBpICsgdDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW4sIHVuc2tld2VkLlxyXG4gICAgICAgIGxldCB5MCA9IHlpbiAtIGogKyB0O1xyXG4gICAgICAgIC8vIEZvciB0aGUgMkQgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYW4gZXF1aWxhdGVyYWwgdHJpYW5nbGUuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxyXG4gICAgICAgIGxldCBpMSwgajE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCAobWlkZGxlKSBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqKSBjb29yZHNcclxuICAgICAgICBpZiAoeDAgPiB5MCkgeyAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcclxuICAgICAgICAgICAgaTEgPSAxOyBqMSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgLy8gdXBwZXIgdHJpYW5nbGUsIFlYIG9yZGVyOiAoMCwwKS0+KDAsMSktPigxLDEpXHJcbiAgICAgICAgICAgIGkxID0gMDsgajEgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcclxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMpIGluICh4LHkpLCB3aGVyZVxyXG4gICAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XHJcbiAgICAgICAgY29uc3QgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXHJcbiAgICAgICAgY29uc3QgeTEgPSB5MCAtIGoxICsgRzI7XHJcbiAgICAgICAgY29uc3QgeDIgPSB4MCAtIDEgKyAyICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xyXG4gICAgICAgIGNvbnN0IHkyID0geTAgLSAxICsgMiAqIEcyO1xyXG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXHJcbiAgICAgICAgaSAmPSAyNTU7XHJcbiAgICAgICAgaiAmPSAyNTU7XHJcbiAgICAgICAgY29uc3QgZ2kwID0gdGhpcy5ncmFkUFtpICsgdGhpcy5wZXJtW2pdXTtcclxuICAgICAgICBjb25zdCBnaTEgPSB0aGlzLmdyYWRQW2kgKyBpMSArIHRoaXMucGVybVtqICsgajFdXTtcclxuICAgICAgICBjb25zdCBnaTIgPSB0aGlzLmdyYWRQW2kgKyAxICsgdGhpcy5wZXJtW2ogKyAxXV07XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xyXG4gICAgICAgIGxldCB0MCA9IDAuNSAtIHgwICogeDAgLSB5MCAqIHkwO1xyXG4gICAgICAgIGlmICh0MCA8IDApIHtcclxuICAgICAgICAgICAgbjAgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHQwICo9IHQwO1xyXG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiBnaTAuZG90Mih4MCwgeTApOyAgLy8gKHgseSkgb2YgZ3JhZDMgdXNlZCBmb3IgMkQgZ3JhZGllbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XHJcbiAgICAgICAgaWYgKHQxIDwgMCkge1xyXG4gICAgICAgICAgICBuMSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdDEgKj0gdDE7XHJcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIGdpMS5kb3QyKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xyXG4gICAgICAgIGlmICh0MiA8IDApIHtcclxuICAgICAgICAgICAgbjIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHQyICo9IHQyO1xyXG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiBnaTIuZG90Mih4MiwgeTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXHJcbiAgICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxyXG4gICAgICAgIHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgb2N0YXZlU2ltcGxleDIoeGluOiBudW1iZXIsIHlpbjogbnVtYmVyLCBvY3RhdmVOdW0gPSB0aGlzLm9jdGF2ZU51bSwgb2N0YXZlRmFsbG9mZiA9IHRoaXMub2N0YXZlRmFsbG9mZikge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIGxldCB4ID0geGluO1xyXG4gICAgICAgIGxldCB5ID0geWluO1xyXG4gICAgICAgIGxldCBzY2FsYXIgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2N0YXZlTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IHRoaXMuc2ltcGxleDIoeCwgeSkgKiBzY2FsYXI7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSB4ICogdGhpcy5vY3RhdmVNYXRyaXgyWzBdICsgeSAqIHRoaXMub2N0YXZlTWF0cml4MlsxXTtcclxuICAgICAgICAgICAgY29uc3QgbmV3WSA9IHggKiB0aGlzLm9jdGF2ZU1hdHJpeDJbMl0gKyB5ICogdGhpcy5vY3RhdmVNYXRyaXgyWzNdO1xyXG4gICAgICAgICAgICB4ID0gbmV3WDtcclxuICAgICAgICAgICAgeSA9IG5ld1k7XHJcbiAgICAgICAgICAgIHNjYWxhciAqPSBvY3RhdmVGYWxsb2ZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDNEIHNpbXBsZXggbm9pc2VcclxuICAgIHB1YmxpYyBzaW1wbGV4Myh4aW46IG51bWJlciwgeWluOiBudW1iZXIsIHppbjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG4wLCBuMSwgbjIsIG4zOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZvdXIgY29ybmVyc1xyXG5cclxuICAgICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXHJcbiAgICAgICAgY29uc3QgcyA9ICh4aW4gKyB5aW4gKyB6aW4pICogRjM7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcclxuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XHJcbiAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xyXG4gICAgICAgIGxldCBrID0gTWF0aC5mbG9vcih6aW4gKyBzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdCA9IChpICsgaiArIGspICogRzM7XHJcbiAgICAgICAgY29uc3QgeDAgPSB4aW4gLSBpICsgdDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW4sIHVuc2tld2VkLlxyXG4gICAgICAgIGNvbnN0IHkwID0geWluIC0gaiArIHQ7XHJcbiAgICAgICAgY29uc3QgejAgPSB6aW4gLSBrICsgdDtcclxuXHJcbiAgICAgICAgLy8gRm9yIHRoZSAzRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhIHNsaWdodGx5IGlycmVndWxhciB0ZXRyYWhlZHJvbi5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXHJcbiAgICAgICAgbGV0IGkxLCBqMSwgazE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgIGxldCBpMiwgajIsIGsyOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgIGlmICh4MCA+PSB5MCkge1xyXG4gICAgICAgICAgICBpZiAoeTAgPj0gejApIHsgaTEgPSAxOyBqMSA9IDA7IGsxID0gMDsgaTIgPSAxOyBqMiA9IDE7IGsyID0gMDsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh4MCA+PSB6MCkgeyBpMSA9IDE7IGoxID0gMDsgazEgPSAwOyBpMiA9IDE7IGoyID0gMDsgazIgPSAxOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBpMSA9IDA7IGoxID0gMDsgazEgPSAxOyBpMiA9IDE7IGoyID0gMDsgazIgPSAxOyB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHkwIDwgejApIHsgaTEgPSAwOyBqMSA9IDA7IGsxID0gMTsgaTIgPSAwOyBqMiA9IDE7IGsyID0gMTsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh4MCA8IHowKSB7IGkxID0gMDsgajEgPSAxOyBrMSA9IDA7IGkyID0gMDsgajIgPSAxOyBrMiA9IDE7IH1cclxuICAgICAgICAgICAgZWxzZSB7IGkxID0gMDsgajEgPSAxOyBrMSA9IDA7IGkyID0gMTsgajIgPSAxOyBrMiA9IDA7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQSBzdGVwIG9mICgxLDAsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYywtYykgaW4gKHgseSx6KSxcclxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcclxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMCwxKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsLWMsMS1jKSBpbiAoeCx5LHopLCB3aGVyZVxyXG4gICAgICAgIC8vIGMgPSAxLzYuXHJcbiAgICAgICAgY29uc3QgeDEgPSB4MCAtIGkxICsgRzM7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXJcclxuICAgICAgICBjb25zdCB5MSA9IHkwIC0gajEgKyBHMztcclxuICAgICAgICBjb25zdCB6MSA9IHowIC0gazEgKyBHMztcclxuXHJcbiAgICAgICAgbGV0IHgyID0geDAgLSBpMiArIDIgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyXHJcbiAgICAgICAgbGV0IHkyID0geTAgLSBqMiArIDIgKiBHMztcclxuICAgICAgICBsZXQgejIgPSB6MCAtIGsyICsgMiAqIEczO1xyXG5cclxuICAgICAgICBsZXQgeDMgPSB4MCAtIDEgKyAzICogRzM7IC8vIE9mZnNldHMgZm9yIGZvdXJ0aCBjb3JuZXJcclxuICAgICAgICBsZXQgeTMgPSB5MCAtIDEgKyAzICogRzM7XHJcbiAgICAgICAgbGV0IHozID0gejAgLSAxICsgMyAqIEczO1xyXG5cclxuICAgICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZvdXIgc2ltcGxleCBjb3JuZXJzXHJcbiAgICAgICAgaSAmPSAyNTU7XHJcbiAgICAgICAgaiAmPSAyNTU7XHJcbiAgICAgICAgayAmPSAyNTU7XHJcbiAgICAgICAgY29uc3QgeyBncmFkUCwgcGVybSB9ID0gdGhpcztcclxuICAgICAgICBsZXQgZ2kwID0gZ3JhZFBbaSArIHBlcm1baiArIHBlcm1ba11dXTtcclxuICAgICAgICBsZXQgZ2kxID0gZ3JhZFBbaSArIGkxICsgcGVybVtqICsgajEgKyBwZXJtW2sgKyBrMV1dXTtcclxuICAgICAgICBsZXQgZ2kyID0gZ3JhZFBbaSArIGkyICsgcGVybVtqICsgajIgKyBwZXJtW2sgKyBrMl1dXTtcclxuICAgICAgICBsZXQgZ2kzID0gZ3JhZFBbaSArIDEgKyBwZXJtW2ogKyAxICsgcGVybVtrICsgMV1dXTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZm91ciBjb3JuZXJzXHJcbiAgICAgICAgbGV0IHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowO1xyXG4gICAgICAgIGlmICh0MCA8IDApIHtcclxuICAgICAgICAgICAgbjAgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHQwICo9IHQwO1xyXG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiBnaTAuZG90Myh4MCwgeTAsIHowKTsgIC8vICh4LHkpIG9mIGdyYWQzIHVzZWQgZm9yIDJEIGdyYWRpZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MTtcclxuICAgICAgICBpZiAodDEgPCAwKSB7XHJcbiAgICAgICAgICAgIG4xID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0MSAqPSB0MTtcclxuICAgICAgICAgICAgbjEgPSB0MSAqIHQxICogZ2kxLmRvdDMoeDEsIHkxLCB6MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MiA9IDAuNiAtIHgyICogeDIgLSB5MiAqIHkyIC0gejIgKiB6MjtcclxuICAgICAgICBpZiAodDIgPCAwKSB7XHJcbiAgICAgICAgICAgIG4yID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0MiAqPSB0MjtcclxuICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogZ2kyLmRvdDMoeDIsIHkyLCB6Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MyA9IDAuNiAtIHgzICogeDMgLSB5MyAqIHkzIC0gejMgKiB6MztcclxuICAgICAgICBpZiAodDMgPCAwKSB7XHJcbiAgICAgICAgICAgIG4zID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0MyAqPSB0MztcclxuICAgICAgICAgICAgbjMgPSB0MyAqIHQzICogZ2kzLmRvdDMoeDMsIHkzLCB6Myk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cclxuICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXHJcbiAgICAgICAgcmV0dXJuIDMyICogKG4wICsgbjEgKyBuMiArIG4zKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBvY3RhdmVTaW1wbGV4Myh4aW46IG51bWJlciwgeWluOiBudW1iZXIsIHppbjogbnVtYmVyLCBvY3RhdmVOdW0gPSB0aGlzLm9jdGF2ZU51bSwgb2N0YXZlRmFsbG9mZiA9IHRoaXMub2N0YXZlRmFsbG9mZikge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIGxldCB4ID0geGluO1xyXG4gICAgICAgIGxldCB5ID0geWluO1xyXG4gICAgICAgIGxldCB6ID0gemluO1xyXG4gICAgICAgIGxldCBzY2FsYXIgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2N0YXZlTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgc3VtICs9IHRoaXMuc2ltcGxleDMoeCwgeSwgeikgKiBzY2FsYXI7XHJcbiAgICAgICAgICAgIHggKj0gMjtcclxuICAgICAgICAgICAgeSAqPSAyO1xyXG4gICAgICAgICAgICB6ICo9IDI7XHJcbiAgICAgICAgICAgIHNjYWxhciAqPSBvY3RhdmVGYWxsb2ZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyAjIyMjIyBQZXJsaW4gbm9pc2Ugc3R1ZmZcclxuXHJcbiAgICBwdWJsaWMgZmFkZSh0OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogKHQgKiAodCAqIDYgLSAxNSkgKyAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlcnAoYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiAoMSAtIHQpICogYSArIHQgKiBiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDJEIFBlcmxpbiBOb2lzZVxyXG4gICAgcHVibGljIHBlcmxpbjIoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAvLyBGaW5kIHVuaXQgZ3JpZCBjZWxsIGNvbnRhaW5pbmcgcG9pbnRcclxuICAgICAgICBsZXQgWCA9IE1hdGguZmxvb3IoeCksIFkgPSBNYXRoLmZsb29yKHkpO1xyXG4gICAgICAgIC8vIEdldCByZWxhdGl2ZSB4eSBjb29yZGluYXRlcyBvZiBwb2ludCB3aXRoaW4gdGhhdCBjZWxsXHJcbiAgICAgICAgeCA9IHggLSBYOyB5ID0geSAtIFk7XHJcbiAgICAgICAgLy8gV3JhcCB0aGUgaW50ZWdlciBjZWxscyBhdCAyNTUgKHNtYWxsZXIgaW50ZWdlciBwZXJpb2QgY2FuIGJlIGludHJvZHVjZWQgaGVyZSlcclxuICAgICAgICBYID0gWCAmIDI1NTsgWSA9IFkgJiAyNTU7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgZ3JhZFAsIHBlcm0gfSA9IHRoaXM7XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIG9mIHRoZSBmb3VyIGNvcm5lcnNcclxuICAgICAgICBsZXQgbjAwID0gZ3JhZFBbWCArIHBlcm1bWV1dLmRvdDIoeCwgeSk7XHJcbiAgICAgICAgbGV0IG4wMSA9IGdyYWRQW1ggKyBwZXJtW1kgKyAxXV0uZG90Mih4LCB5IC0gMSk7XHJcbiAgICAgICAgbGV0IG4xMCA9IGdyYWRQW1ggKyAxICsgcGVybVtZXV0uZG90Mih4IC0gMSwgeSk7XHJcbiAgICAgICAgbGV0IG4xMSA9IGdyYWRQW1ggKyAxICsgcGVybVtZICsgMV1dLmRvdDIoeCAtIDEsIHkgLSAxKTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgZmFkZSBjdXJ2ZSB2YWx1ZSBmb3IgeFxyXG4gICAgICAgIGxldCB1ID0gdGhpcy5mYWRlKHgpO1xyXG5cclxuICAgICAgICAvLyBJbnRlcnBvbGF0ZSB0aGUgZm91ciByZXN1bHRzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVycChcclxuICAgICAgICAgICAgdGhpcy5sZXJwKG4wMCwgbjEwLCB1KSxcclxuICAgICAgICAgICAgdGhpcy5sZXJwKG4wMSwgbjExLCB1KSxcclxuICAgICAgICAgICAgdGhpcy5mYWRlKHkpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gM0QgUGVybGluIE5vaXNlXHJcbiAgICBwdWJsaWMgcGVybGluMyh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgeyBncmFkUCwgcGVybSB9ID0gdGhpcztcclxuICAgICAgICAvLyBGaW5kIHVuaXQgZ3JpZCBjZWxsIGNvbnRhaW5pbmcgcG9pbnRcclxuICAgICAgICBsZXQgWCA9IE1hdGguZmxvb3IoeCksIFkgPSBNYXRoLmZsb29yKHkpLCBaID0gTWF0aC5mbG9vcih6KTtcclxuICAgICAgICAvLyBHZXQgcmVsYXRpdmUgeHl6IGNvb3JkaW5hdGVzIG9mIHBvaW50IHdpdGhpbiB0aGF0IGNlbGxcclxuICAgICAgICB4ID0geCAtIFg7IHkgPSB5IC0gWTsgeiA9IHogLSBaO1xyXG4gICAgICAgIC8vIFdyYXAgdGhlIGludGVnZXIgY2VsbHMgYXQgMjU1IChzbWFsbGVyIGludGVnZXIgcGVyaW9kIGNhbiBiZSBpbnRyb2R1Y2VkIGhlcmUpXHJcbiAgICAgICAgWCA9IFggJiAyNTU7IFkgPSBZICYgMjU1OyBaID0gWiAmIDI1NTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIG9mIHRoZSBlaWdodCBjb3JuZXJzXHJcbiAgICAgICAgbGV0IG4wMDAgPSBncmFkUFtYICsgcGVybVtZICsgcGVybVtaXV1dLmRvdDMoeCwgeSwgeik7XHJcbiAgICAgICAgbGV0IG4wMDEgPSBncmFkUFtYICsgcGVybVtZICsgcGVybVtaICsgMV1dXS5kb3QzKHgsIHksIHogLSAxKTtcclxuICAgICAgICBsZXQgbjAxMCA9IGdyYWRQW1ggKyBwZXJtW1kgKyAxICsgcGVybVtaXV1dLmRvdDMoeCwgeSAtIDEsIHopO1xyXG4gICAgICAgIGxldCBuMDExID0gZ3JhZFBbWCArIHBlcm1bWSArIDEgKyBwZXJtW1ogKyAxXV1dLmRvdDMoeCwgeSAtIDEsIHogLSAxKTtcclxuICAgICAgICBsZXQgbjEwMCA9IGdyYWRQW1ggKyAxICsgcGVybVtZICsgcGVybVtaXV1dLmRvdDMoeCAtIDEsIHksIHopO1xyXG4gICAgICAgIGxldCBuMTAxID0gZ3JhZFBbWCArIDEgKyBwZXJtW1kgKyBwZXJtW1ogKyAxXV1dLmRvdDMoeCAtIDEsIHksIHogLSAxKTtcclxuICAgICAgICBsZXQgbjExMCA9IGdyYWRQW1ggKyAxICsgcGVybVtZICsgMSArIHBlcm1bWl1dXS5kb3QzKHggLSAxLCB5IC0gMSwgeik7XHJcbiAgICAgICAgbGV0IG4xMTEgPSBncmFkUFtYICsgMSArIHBlcm1bWSArIDEgKyBwZXJtW1ogKyAxXV1dLmRvdDMoeCAtIDEsIHkgLSAxLCB6IC0gMSk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGZhZGUgY3VydmUgdmFsdWUgZm9yIHgsIHksIHpcclxuICAgICAgICBsZXQgdSA9IHRoaXMuZmFkZSh4KTtcclxuICAgICAgICBsZXQgdiA9IHRoaXMuZmFkZSh5KTtcclxuICAgICAgICBsZXQgdyA9IHRoaXMuZmFkZSh6KTtcclxuXHJcbiAgICAgICAgLy8gSW50ZXJwb2xhdGVcclxuICAgICAgICByZXR1cm4gdGhpcy5sZXJwKFxyXG4gICAgICAgICAgICB0aGlzLmxlcnAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlcnAobjAwMCwgbjEwMCwgdSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlcnAobjAwMSwgbjEwMSwgdSksIHcpLFxyXG4gICAgICAgICAgICB0aGlzLmxlcnAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlcnAobjAxMCwgbjExMCwgdSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlcnAobjAxMSwgbjExMSwgdSksIHcpLFxyXG4gICAgICAgICAgICB2KTtcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQXVkaW9DbGlwIH0gZnJvbSBcIi4uL2F1ZGlvL2F1ZGlvQ2xpcFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGF1ZGlvQ2xpcDogQXVkaW9DbGlwO1xyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwcml2YXRlIGFuYWx5c2VyOiBBbmFseXNlck5vZGU7XHJcbiAgICBwcml2YXRlIGFuYWx5c2VyRnJlcXVlbmN5QW1wbGl0dWRlczogVWludDhBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5U291bmQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0Q29uc3RydWN0b3IgPSAod2luZG93IGFzIGFueSkuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgYW55KS53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IGNvbnRleHRDb25zdHJ1Y3RvcigpO1xyXG5cclxuICAgICAgICB0aGlzLmFuYWx5c2VyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjE7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGdhaW4gPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpO1xyXG4gICAgICAgIC8vIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCAwKTtcclxuICAgICAgICAvLyBnYWluLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdWRpb0NsaXAgPSBuZXcgQXVkaW9DbGlwKHtcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgIHNyY3M6IFtcImp1bmVfM3JkLm1wM1wiLCBcImp1bmVfM3JkLndhdlwiXSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmF1ZGlvQ2xpcC5ub2RlIS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG4gICAgICAgIGlmIChwbGF5U291bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0NsaXAubm9kZSEuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgICAgICB0aGlzLmFuYWx5c2VyRnJlcXVlbmN5QW1wbGl0dWRlcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmFuYWx5c2VyRnJlcXVlbmN5QW1wbGl0dWRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEZyZXF1ZW5jeUFtcGxpdHVkZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5hbHlzZXJGcmVxdWVuY3lBbXBsaXR1ZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzeW5jQXVkaW9DbGlwKHBsYXliYWNrQmVnaW46IG51bWJlcikge1xyXG4gICAgICAgIGlmIChwbGF5YmFja0JlZ2luIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ2xpcC5lbGVtZW50LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9DbGlwLmVsZW1lbnQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWJhY2tCZWdpbiA+IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgLy8gc2NoZWR1bGUgaXQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgICAgICAvLyBUT0RPIG1heWJlIG1ha2UgdGhpcyBtb3JlIHByZWNpemVcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvQ2xpcC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIHBsYXliYWNrQmVnaW4gLSBEYXRlLm5vdygpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB3ZSdyZSBhbHJlYWR5IHBsYXlpbmdcclxuICAgICAgICAgICAgY29uc3QgY3VyUG9zaXRpb24gPSAoRGF0ZS5ub3coKSAtIHBsYXliYWNrQmVnaW4pIC8gMTAwMDtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0NsaXAucGxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ2xpcC5lbGVtZW50LmN1cnJlbnRUaW1lID0gY3VyUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1BsYXlpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmF1ZGlvQ2xpcC5lbGVtZW50LnBhdXNlZDtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgRm9yZXN0U2tldGNoIH0gZnJvbSBcIi4vc2tldGNoXCI7XHJcbmltcG9ydCB7IGRhdGFiYXNlIH0gZnJvbSBcImZpcmViYXNlXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWFuYWdlciB9IGZyb20gXCIuL2F1ZGlvTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcmVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7ZGI6IGRhdGFiYXNlLkRhdGFiYXNlLCBpc0FkbWluPzogYm9vbGVhbn0sIHsgYXVkaW9QbGF5YmFja0JlZ2luOiBudW1iZXIsIG5vdzogbnVtYmVyIH0+IHtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIG5vdzogRGF0ZS5ub3coKSxcclxuICAgICAgICBhdWRpb1BsYXliYWNrQmVnaW46IC0xLFxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgcGxheWJhY2tCZWdpblJlZjogZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgcHJpdmF0ZSBhdWRpb01hbmFnZXI6IEF1ZGlvTWFuYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnksIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIgPSBuZXcgQXVkaW9NYW5hZ2VyKCEhdGhpcy5wcm9wcy5pc0FkbWluKTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5YmFja0JlZ2luUmVmID0gdGhpcy5wcm9wcy5kYi5yZWYoXCJhdWRpb1BsYXliYWNrQmVnaW5cIik7XHJcbiAgICAgICAgdGhpcy5wbGF5YmFja0JlZ2luUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthdWRpb1BsYXliYWNrQmVnaW46IHNuYXBzaG90LnZhbCgpfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci5zeW5jQXVkaW9DbGlwKHNuYXBzaG90LnZhbCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2tldGNoPzogRm9yZXN0U2tldGNoO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVDYW52YXNSZWYgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgICAgICBpZiAoY2FudmFzID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tldGNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tldGNoID0gbmV3IEZvcmVzdFNrZXRjaCh0aGlzLnByb3BzLmRiLCB0aGlzLmF1ZGlvTWFuYWdlciwgY2FudmFzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIG5vdzogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcmVzdC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxjYW52YXMgcmVmPXt0aGlzLmhhbmRsZUNhbnZhc1JlZn0gLz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyQWRtaW5Db250cm9scygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckFkbWluQ29udHJvbHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNBZG1pbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj5wb2x5cGhvbmUuaW8gYWRtaW48L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAyMyBwZW9wbGUgY29ubmVjdGVkLiBTb25nIDEgb2YgNi4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYXliYWNrU3RhdGUoKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclBsYXliYWNrU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYXVkaW9QbGF5YmFja0JlZ2luIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICBOb3QgcGxheWluZy5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQmVnaW5QbGF5YmFja0NsaWNrfT5CZWdpbiBwbGF5YmFjazwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBjb25zdCBkdCA9IHRoaXMuc3RhdGUuYXVkaW9QbGF5YmFja0JlZ2luIC0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAoZHQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0aW5nIGluIHsoZHQgLyAxMDAwKS50b0ZpeGVkKDEpfSBzZWNvbmRzLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbFBsYXliYWNrfT5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIFBsYXlpbmcuLi4gey1NYXRoLmZsb29yKGR0IC8gMTAwMCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbFBsYXliYWNrfT5TdG9wPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVCZWdpblBsYXliYWNrQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gc3RhcnRzIGluIDUgc2Vjb25kc1xyXG4gICAgICAgIGNvbnN0IHBsYXliYWNrVGltZSA9IERhdGUubm93KCkgKyA1MDAwO1xyXG4gICAgICAgIHRoaXMucGxheWJhY2tCZWdpblJlZi5zZXQocGxheWJhY2tUaW1lKTsgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUNhbmNlbFBsYXliYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGxheWJhY2tCZWdpblJlZi5zZXQoLTEpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLy8gSEFDSyBtb25rZXlwYXRjaCB0aGUgb2xkIGZlYXR1cmVzIHRoYXQgcmVxdWlyZXMgVEhSRUUgb24gdGhlIGdsb2JhbCBuYW1lc3BhY2VcclxuKHdpbmRvdyBhcyBhbnkpLlRIUkVFID0gVEhSRUU7XHJcbi8vIHRzbGludDpkaXNhYmxlXHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9sb2FkZXJzL0dMVEZMb2FkZXJcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHNcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvY29udHJvbHMvRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvbGlicy9zdGF0cy5taW5cIjtcclxuLy8gaW1wb3J0ICogYXMgZGF0IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qcy9saWJzL2RhdC5ndWkubWluXCI7XHJcbi8vICh3aW5kb3cgYXMgYW55KS5kYXQgPSBkYXQ7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0Jva2VoU2hhZGVyXCI7XHJcbi8vIGltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvQm9rZWhTaGFkZXIyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0NvcHlTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Eb3RTY3JlZW5TaGFkZXJcIjtcclxuLy8gcmVxdWlyZWQgYnkgU0FPU2hhZGVyXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvRGVwdGhMaW1pdGVkQmx1clNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NBT1NoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NTQU9TaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5SGlnaFBhc3NTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5U2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvVG9uZU1hcFNoYWRlclwiO1xyXG4vLyByZXF1aXJlZCBieSBTQU9TaGFkZXJcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9VbnBhY2tEZXB0aFJHQkFTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU2hhZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0Jva2VoUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9NYXNrUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TU0FBUmVuZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NTQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9BZGFwdGl2ZVRvbmVNYXBwaW5nUGFzc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvb2JqZWN0cy9Ta3lcIjtcclxuIiwiaW1wb3J0IHsgZGF0YWJhc2UgfSBmcm9tIFwiZmlyZWJhc2VcIjtcclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgUG9zdFBhc3MgZnJvbSBcIi4uL3Bvc3RcIjtcclxuaW1wb3J0IHsgZ2V0TXlVc2VySWQgfSBmcm9tIFwiLi91c2VySWRcIjtcclxuaW1wb3J0IHsgQXVkaW9NYW5hZ2VyIH0gZnJvbSBcIi4vYXVkaW9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE5vaXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9ub2lzZVwiO1xyXG5cclxubGV0IGZyZXF1ZW5jeUFtcGxpdHVkZXM6IFVpbnQ4QXJyYXk7XHJcblxyXG5pbnRlcmZhY2UgRGF0YWJhc2VTY2hlbWEge1xyXG4gICAgLy8gdW5peCBtcyB0byBiZWdpbiBwbGF5YmFja1xyXG4gICAgYXVkaW9QbGF5YmFja0JlZ2luOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvZiB1c2VycyBpbiBleGlzdGVuY2UuXHJcbiAgICAgKi9cclxuICAgIHVzZXJzOiBEYXRhYmFzZVVzZXJzO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRGF0YWJhc2VVc2VycyB7XHJcbiAgICBbdXNlcklkOiBzdHJpbmddOiBEYXRhYmFzZVVzZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBEYXRhYmFzZVVzZXIge1xyXG4gICAgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciB9LFxyXG4gICAgcm90YXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciB9LFxyXG4gICAgY29sb3I6IG51bWJlcixcclxufVxyXG5cclxuaW50ZXJmYWNlIFRoaW5nIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xyXG4gICAgYW5pbWF0ZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm9yZXN0U2tldGNoIHtcclxuICAgIHB1YmxpYyByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcclxuICAgIHB1YmxpYyBzY2VuZTogRm9yZXN0U2NlbmU7XHJcbiAgICBwdWJsaWMgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcclxuICAgIHByaXZhdGUgY29tcG9zZXI6IFRIUkVFLkVmZmVjdENvbXBvc2VyO1xyXG4gICAgcHJpdmF0ZSBkaUNvbnRyb2xzPzogVEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9scztcclxuICAgIHByaXZhdGUgb3JiaXRDb250cm9scz86IFRIUkVFLk9yYml0Q29udHJvbHM7XHJcbiAgICBwdWJsaWMgdXNlcnM6IE1hcDxzdHJpbmcsIFVzZXI+ID0gbmV3IE1hcCgpO1xyXG4gICAgLy8gcHVibGljIGF1ZGlvOiBBdWRpb1BsYXllcjtcclxuXHJcbiAgICBwcml2YXRlIGR1bW15Q2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XHJcbiAgICBwcml2YXRlIGtleXM6IFNldDxudW1iZXI+ID0gbmV3IFNldCgpO1xyXG5cclxuICAgIGdldCBhc3BlY3RSYXRpbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmhlaWdodCAvIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2Vycy5nZXQoZ2V0TXlVc2VySWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRiOiBkYXRhYmFzZS5EYXRhYmFzZSwgcHVibGljIGF1ZGlvTWFuYWdlcjogQXVkaW9NYW5hZ2VyLCBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIGZyZXF1ZW5jeUFtcGxpdHVkZXMgPSB0aGlzLmF1ZGlvTWFuYWdlci5nZXRGcmVxdWVuY3lBbXBsaXR1ZGVzKCk7XHJcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNrZXRjaCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHRoaXMuaW5pdFJlbmRlcmVyKCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBGb3Jlc3RTY2VuZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNTaXplKCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc1NpemUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIDEgLyB0aGlzLmFzcGVjdFJhdGlvLCAxLCA1MDAwKTtcclxuICAgICAgICAvLyB0aGlzLnNjZW5lLmFkZCh0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgLy8gdGhpcy5kdW1teUNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgMSAvIHRoaXMuYXNwZWN0UmF0aW8sIDEsIDUwMDApO1xyXG4gICAgICAgIC8vIHRoaXMuc2NlbmUuYWRkKHRoaXMuZHVtbXlDYW1lcmEpO1xyXG5cclxuICAgICAgICB0aGlzLm9yYml0Q29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyh0aGlzLmR1bW15Q2FtZXJhLCB0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VvcmllbnRhdGlvblwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnQuYWxwaGEgJiYgZXZ0LmdhbW1hICYmIGV2dC5iZXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpQ29udHJvbHMgPSBuZXcgVEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9scyh0aGlzLmR1bW15Q2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JiaXRDb250cm9scyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb3NlciA9IHRoaXMuaW5pdENvbXBvc2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE15VXNlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBVc2Vyc0xpc3RlbmVycygpO1xyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmF1ZGlvLnByZXBhcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvdWNoZXMgPSAwO1xyXG4gICAgcHJpdmF0ZSBzZXR1cEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcysrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcy0tO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzLmFkZChldnQua2V5Q29kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzLmRlbGV0ZShldnQua2V5Q29kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzeW5jVXNlcnNXaXRoRGF0YWJhc2UoZGJVc2VyczogRGF0YWJhc2VVc2Vycykge1xyXG4gICAgICAgIC8vIGFkZCBuZXcgdXNlcnMgKHRoZXkgd2lsbCBhdXRvc3luYylcclxuICAgICAgICAvLyBkZWxldGUgb2xkIHVzZXJzLCBUT0RPXHJcbiAgICAgICAgLy8gY29uc3Qgb2xkVXNlcklkcyA9IHRoaXMudXNlcnMua2V5cygpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdXNlcklkIGluIGRiVXNlcnMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZXJzLmhhcyh1c2VySWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWYgPSB0aGlzLmRiLnJlZihgdXNlcnMvJHt1c2VySWR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIocmVmKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnMuc2V0KHVzZXJJZCwgdXNlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXRNeVVzZXIoKSB7XHJcbiAgICAgICAgLy8gQWRkIG15c2VsZiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBteVVzZXJJZCA9IGdldE15VXNlcklkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBteVVzZXJJZFJlZiA9IHRoaXMuZGIucmVmKGB1c2VySWRzLyR7bXlVc2VySWR9YCk7XHJcbiAgICAgICAgICAgIC8vIGF3YWl0IG15VXNlcklkUmVmLnNldCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG15VXNlclJlZiA9IHRoaXMuZGIucmVmKGB1c2Vycy8ke215VXNlcklkfWApO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdVc2VyOiBEYXRhYmFzZVVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IFRIUkVFLk1hdGgucmFuZEZsb2F0KC0yMDAsIDIwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogVEhSRUUuTWF0aC5yYW5kRmxvYXQoMCwgMjApLFxyXG4gICAgICAgICAgICAgICAgICAgIHo6IFRIUkVFLk1hdGgucmFuZEZsb2F0KC0yMDAsIDIwMCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgejogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogKG5ldyBUSFJFRS5Db2xvcihNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKSkuZ2V0SGV4KCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGF3YWl0IG15VXNlclJlZi5zZXQobmV3VXNlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwVXNlcnNMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcnNSZWYgPSB0aGlzLmRiLnJlZihcInVzZXJzL1wiKTtcclxuICAgICAgICB1c2Vyc1JlZi5vbihcInZhbHVlXCIsIChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcnM6IERhdGFiYXNlVXNlcnMgPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY1VzZXJzV2l0aERhdGFiYXNlKHVzZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJlbmRlcmVyKCkge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xyXG4gICAgICAgICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxyXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcclxuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ODA4MDgwKTtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIudG9uZU1hcHBpbmcgPSBUSFJFRS5VbmNoYXJ0ZWQyVG9uZU1hcHBpbmc7XHJcbiAgICAgICAgcmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IDAuOTtcclxuICAgICAgICByZW5kZXJlci50b25lTWFwcGluZ1doaXRlUG9pbnQgPSAxLjE7XHJcblxyXG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRDb21wb3NlcigpIHtcclxuICAgICAgICBjb25zdCBjb21wb3NlciA9IG5ldyBUSFJFRS5FZmZlY3RDb21wb3Nlcih0aGlzLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgY29tcG9zZXIuYWRkUGFzcyhuZXcgVEhSRUUuUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSkpO1xyXG5cclxuICAgICAgICAvLyBjb25zdCBzc2FhID0gbmV3IChUSFJFRSBhcyBhbnkpLlNTQUFSZW5kZXJQYXNzKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcclxuICAgICAgICAvLyBzc2FhLnVuYmlhc2VkID0gdHJ1ZTtcclxuICAgICAgICAvLyBzc2FhLnNhbXBsZUxldmVsID0gMjtcclxuICAgICAgICAvLyBjb21wb3Nlci5hZGRQYXNzKHNzYWEpO1xyXG5cclxuICAgICAgICAvLyBjb25zdCBzYW8gPSBuZXcgVEhSRUUuU0FPUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIC8vIC8vIHNhby5wYXJhbXMub3V0cHV0ID0gVEhSRUUuU0FPUGFzcy5PVVRQVVQuU0FPO1xyXG4gICAgICAgIC8vIHNhby5wYXJhbXMuc2FvQmlhcyA9IDAuMjtcclxuICAgICAgICAvLyBzYW8ucGFyYW1zLnNhb0ludGVuc2l0eSA9IDAuMDMwO1xyXG4gICAgICAgIC8vIHNhby5wYXJhbXMuc2FvU2NhbGUgPSA5MDtcclxuICAgICAgICAvLyBzYW8ucGFyYW1zLnNhb0tlcm5lbFJhZGl1cyA9IDQwO1xyXG4gICAgICAgIC8vIHNhby5wYXJhbXMuc2FvQmx1ciA9IHRydWU7XHJcbiAgICAgICAgLy8gY29tcG9zZXIuYWRkUGFzcyhzYW8pO1xyXG5cclxuICAgICAgICBjb25zdCBibG9vbVBhc3MgPSBuZXcgVEhSRUUuVW5yZWFsQmxvb21QYXNzKG5ldyBUSFJFRS5WZWN0b3IyKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpLCAwLjQsIDAuNywgMC44NSk7XHJcbiAgICAgICAgY29tcG9zZXIuYWRkUGFzcyhibG9vbVBhc3MpO1xyXG5cclxuICAgICAgICAvLyBjb25zdCBhZGFwdGl2ZVRvbmVNYXBwaW5nUGFzcyA9IG5ldyBUSFJFRS5BZGFwdGl2ZVRvbmVNYXBwaW5nUGFzcyh0cnVlLCAyNTYpO1xyXG4gICAgICAgIC8vIGNvbXBvc2VyLmFkZFBhc3MoYWRhcHRpdmVUb25lTWFwcGluZ1Bhc3MpO1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0ID0gbmV3IFBvc3RQYXNzKCk7XHJcbiAgICAgICAgY29tcG9zZXIuYWRkUGFzcyhwb3N0KTtcclxuXHJcbiAgICAgICAgY29tcG9zZXIucGFzc2VzW2NvbXBvc2VyLnBhc3Nlcy5sZW5ndGggLSAxXS5yZW5kZXJUb1NjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbmltYXRlID0gKG1pbGxpc0R0OiBudW1iZXIpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlDb250cm9scykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaUNvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9yYml0Q29udHJvbHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JiaXRDb250cm9scy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNhbWVyYS5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVzZXIgb2YgdGhpcy51c2Vycy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgdXNlci5hbmltYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FtZXJhLnBhcmVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmLmFkZCh0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0TGVuZ3RoKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KHRoaXMuc2VsZi5wb3NpdGlvbi54LCB0aGlzLnNlbGYucG9zaXRpb24ueSArIDI1LCB0aGlzLnNlbGYucG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGYucXVhdGVybmlvbi5jb3B5KHRoaXMuZHVtbXlDYW1lcmEucXVhdGVybmlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b3VjaGVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZi5tb3ZlKDAsIDAsIC0yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMua2V5cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlzLmhhcygzNykpIHsgLy8gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZi5tb3ZlKC0yLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleXMuaGFzKDM4KSkgeyAvLyB1cFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZi5tb3ZlKDAsIDAsIC0yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleXMuaGFzKDM5KSkgeyAvLyByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZi5tb3ZlKDIsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5cy5oYXMoNDApKSB7IC8vIGRvd25cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGYubW92ZSgwLCAwLCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZi5wdXNoU2hhcmVkU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21wb3Nlci5yZW5kZXIoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCA9IGBFcnJvcjogJHtlLm5hbWV9IC0gJHtlLm1lc3NhZ2V9LiAke2Uuc3RhY2t9YDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDYW52YXNTaXplKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZShwYXJlbnQuY2xpZW50V2lkdGgsIHBhcmVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXJlbnQuY2xpZW50V2lkdGgsIHBhcmVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW1lcmEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gMSAvIHRoaXMuYXNwZWN0UmF0aW87XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZvcmVzdFNjZW5lIGV4dGVuZHMgVEhSRUUuU2NlbmUgaW1wbGVtZW50cyBUaGluZyB7XHJcbiAgICB0aGluZ3M6IFRoaW5nW10gPSBbXTtcclxuICAgIHByaXZhdGUgc2t5OiBTa3k7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNrZXRjaDogRm9yZXN0U2tldGNoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy50aGluZ3MucHVzaChuZXcgR3JvdW5kKCkpO1xyXG4gICAgICAgIHRoaXMudGhpbmdzLnB1c2gobmV3IFNwaGVyZXMoKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpZ2h0cyA9IG5ldyBMaWdodHMoKTtcclxuICAgICAgICB0aGlzLnRoaW5ncy5wdXNoKGxpZ2h0cyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2t5ID0gbmV3IFNreSgpO1xyXG4gICAgICAgIHRoaXMuc2t5LnNreS5tYXRlcmlhbC51bmlmb3Jtcy5zdW5Qb3NpdGlvbi52YWx1ZS5jb3B5KGxpZ2h0cy5saWdodDEucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMudGhpbmdzLnB1c2godGhpcy5za3kpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZCguLi50aGlzLnRoaW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5za2V0Y2guYXVkaW9NYW5hZ2VyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2t5LnNldE5pZ2h0VGltZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2t5LnNldERheVRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGNvbnN0IHQgb2YgdGhpcy50aGluZ3MpIHtcclxuICAgICAgICAgICAgdC5hbmltYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHcm91bmQgZXh0ZW5kcyBUSFJFRS5NZXNoIGltcGxlbWVudHMgVGhpbmcge1xyXG4gICAgcHJpdmF0ZSBub2lzZTogTm9pc2U7XHJcbiAgICBwcml2YXRlIHQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdlb20gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxMDAwLCAxMDAwLCA1MCwgNTApO1xyXG4gICAgICAgIGdlb20ucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcclxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICBjb2xvcjogXCIjMjAyMDIwXCIsXHJcbiAgICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXHJcbiAgICAgICAgICAgIG1ldGFsbmVzczogMCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlcihnZW9tLCBtYXRlcmlhbCk7XHJcbiAgICAgICAgdGhpcy5ub2lzZSA9IG5ldyBOb2lzZSgwKTtcclxuICAgICAgICB0aGlzLnQgPSAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IC0yMDA7XHJcbiAgICAgICAgdGhpcy5jYXN0U2hhZG93ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgdGhpcy50ICs9IGZyZXF1ZW5jeUFtcGxpdHVkZXNbMF0gLyAyNTUgLyAxMDA7XHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJ0ZXggb2YgKHRoaXMuZ2VvbWV0cnkgYXMgVEhSRUUuUGxhbmVHZW9tZXRyeSkudmVydGljZXMpIHtcclxuICAgICAgICAgICAgdmVydGV4LnkgPSB0aGlzLm5vaXNlLnNpbXBsZXgzKHZlcnRleC54IC8gMjUwLCB2ZXJ0ZXgueiAvIDI1MCwgdGhpcy50KSAqIDI1MCAqIChmcmVxdWVuY3lBbXBsaXR1ZGVzWzBdIC8gMjU1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKHRoaXMuZ2VvbWV0cnkgYXMgVEhSRUUuUGxhbmVHZW9tZXRyeSkudmVydGljZXNOZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3BoZXJlcyBleHRlbmRzIFRIUkVFLk9iamVjdDNEIGltcGxlbWVudHMgVGhpbmcge1xyXG4gICAgcHVibGljIG1lc2hlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzaGVzID0gW107XHJcbiAgICAgICAgY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg1MCwgMzUsIDM1KTtcclxuICAgICAgICBjb25zdCBjb2xvck9wdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIC8vIFwiIzBmOTk2MFwiLFxyXG4gICAgICAgICAgICBcIiNkOTgyMmJcIixcclxuICAgICAgICAgICAgLy8gXCIjZGIzNzM3XCIsXHJcbiAgICAgICAgICAgIC8vIFwiIzAwYjNhNFwiLFxyXG5cIiM1QzcwODBcIixcclxuXCIjQkZDQ0Q2XCIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBjb2xvck9wdGlvbnMubWFwKChjKSA9PiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBjb2xvcjogYyxcclxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb20sIG1hdGVyaWFsc1tUSFJFRS5NYXRoLnJhbmRJbnQoMCwgbWF0ZXJpYWxzLmxlbmd0aCAtIDEpXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcmVhZCA9IDEwMDA7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC1zcHJlYWQsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC1zcHJlYWQsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDAsIHNwcmVhZCk7XHJcbiAgICAgICAgICAgIG1lc2guc2NhbGUuc2V0U2NhbGFyKFRIUkVFLk1hdGgucmFuZEZsb2F0KDAuNSwgMS4wKSk7XHJcbiAgICAgICAgICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKG1lc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzaGVzO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYWRkKC4uLnRoaXMubWVzaGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gVEhSRUUuTWF0aC5tYXBMaW5lYXIoZnJlcXVlbmN5QW1wbGl0dWRlc1s1XSwgMCwgMjU1LCAwLjEsIDEwKTtcclxuICAgICAgICB0aGlzLnNjYWxlLnNldFNjYWxhcihzY2FsZSk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi54ICs9IDAuMDAyO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueiArPSAwLjAwNDU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExpZ2h0cyBleHRlbmRzIFRIUkVFLk9iamVjdDNEIGltcGxlbWVudHMgVGhpbmcge1xyXG4gICAgcHVibGljIGxpZ2h0MTogVEhSRUUuTGlnaHQ7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGNvbnN0IGxpZ2h0MSA9IHRoaXMubGlnaHQxID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoXCIjZjVmOGZhXCIsIDAuOCk7XHJcbiAgICAgICAgbGlnaHQxLnBvc2l0aW9uLnNldCgwLjIsIDEsIDAuMykuc2V0TGVuZ3RoKDEwMDApO1xyXG4gICAgICAgIGxpZ2h0MS50YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgIGxpZ2h0MS5jYXN0U2hhZG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OCAqIDI7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDggKiAyO1xyXG5cclxuICAgICAgICBsaWdodDEuc2hhZG93LmJpYXMgPSAwLjAwMDtcclxuICAgICAgICBsaWdodDEuc2hhZG93LnJhZGl1cyA9IDEuNTsgLy8gMSBpcyBub3JtYWw7IDEuNSBtYWtlcyBpdCBhIGJpdCBibHVycmllclxyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLm5lYXIgPSAxMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwMDtcclxuICAgICAgICBsaWdodDEuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMDAwO1xyXG4gICAgICAgIGxpZ2h0MS5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTEwMDA7XHJcbiAgICAgICAgbGlnaHQxLnNoYWRvdy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZChsaWdodDEpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZChuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodEhlbHBlcihsaWdodDEpKTtcclxuICAgICAgICB0aGlzLmFkZChuZXcgVEhSRUUuQ2FtZXJhSGVscGVyKGxpZ2h0MS5zaGFkb3cuY2FtZXJhKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoXCIjMTgyMDI2XCIsIDMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodChcIiNFM0Y5RjdcIiwgXCIjMTgyMDI2XCIsIDAuMykpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBTa3kgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCBpbXBsZW1lbnRzIFRoaW5nIHtcclxuICAgIHB1YmxpYyBza3k6IFRIUkVFLlNreTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5za3kgPSBuZXcgVEhSRUUuU2t5KCk7XHJcbiAgICAgICAgdGhpcy5za3kuc2NhbGUuc2V0U2NhbGFyKDUwMDAwMCk7XHJcbiAgICAgICAgdGhpcy5zZXREYXlUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkKHRoaXMuc2t5KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXlUaW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gdGhpcy5za3kubWF0ZXJpYWwudW5pZm9ybXM7XHJcbiAgICAgICAgdW5pZm9ybXMudHVyYmlkaXR5LnZhbHVlID0gMTtcclxuICAgICAgICB1bmlmb3Jtcy5yYXlsZWlnaC52YWx1ZSA9IDAuODtcclxuICAgICAgICB1bmlmb3Jtcy5taWVDb2VmZmljaWVudC52YWx1ZSA9IDAuMDM7XHJcbiAgICAgICAgdW5pZm9ybXMubWllRGlyZWN0aW9uYWxHLnZhbHVlID0gMC44NztcclxuICAgICAgICB1bmlmb3Jtcy5sdW1pbmFuY2UudmFsdWUgPSAxLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5pZ2h0VGltZSgpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IHRoaXMuc2t5Lm1hdGVyaWFsLnVuaWZvcm1zO1xyXG4gICAgICAgIC8vIHR1cmJpZGl0eSBhZmZlY3RzIGhvdyBicmlnaHRseSB0aGUgc3VuL21vb24gc2hpbmVzLiBZb3Ugd2FudCB0dXJiaWRpdHkgfjggZm9yIG5pZ2h0dGltZS5cclxuICAgICAgICB1bmlmb3Jtcy50dXJiaWRpdHkudmFsdWUgPSA1O1xyXG4gICAgICAgIC8vIHJheWxlaWdoIGlzIHRoZSBiaWcgdGhpbmcgdGhhdCBhZmZlY3RzIFwiZGF5dGltZVwiIG9yIFwibmlnaHR0aW1lXCIuIHJheWxlaWdoIDAgPSBmdWxsIG5pZ2h0LCByYXlsZWlnaCAxID0gZnVsbCBkYXlcclxuICAgICAgICB1bmlmb3Jtcy5yYXlsZWlnaC52YWx1ZSA9IDAuMDtcclxuXHJcbiAgICAgICAgdW5pZm9ybXMubWllQ29lZmZpY2llbnQudmFsdWUgPSAwLjAxMjtcclxuICAgICAgICB1bmlmb3Jtcy5taWVEaXJlY3Rpb25hbEcudmFsdWUgPSAwLjcwO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBVc2VyIGV4dGVuZHMgVEhSRUUuTWVzaCBpbXBsZW1lbnRzIFRoaW5nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5KDIwLCAzLCAxMDAsIDE2KTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBteVJlZjogZGF0YWJhc2UuUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgc3VwZXIoVXNlci5nZW9tZXRyeSwgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBtZXRhbG5lc3M6IDAuNSwgcm91Z2huZXNzOiAwLjUgfSkpO1xyXG4gICAgICAgIHRoaXMuY2FzdFNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzIGhhbmRsZXMgdXBkYXRpbmdcclxuICAgICAgICBteVJlZi5vbihcInZhbHVlXCIsIChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWU6IERhdGFiYXNlVXNlciA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTaGFyZWRTdGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGhhbmRsZSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFRIUkVFLkF4ZXNIZWxwZXIoMTAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHB1c2hTaGFyZWRTdGF0ZSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdVc2VyOiBEYXRhYmFzZVVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICAgICAgICAgICAgejogdGhpcy5wb3NpdGlvbi56LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5yb3RhdGlvbi54LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHRoaXMucm90YXRpb24ueSxcclxuICAgICAgICAgICAgICAgICAgICB6OiB0aGlzLnJvdGF0aW9uLnosXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICh0aGlzLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKS5jb2xvci5nZXRIZXgoKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5teVJlZi5zZXQobmV3VXNlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZShkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBkejogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSB0aGlzLmxvY2FsVG9Xb3JsZChuZXcgVEhSRUUuVmVjdG9yMyhkeCwgZHksIGR6KSk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KG5ld1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNoYXJlZFN0YXRlKGRhdGFiYXNlVXNlcjogRGF0YWJhc2VVc2VyKSB7XHJcbiAgICAgICAgY29uc3QgeyBwb3NpdGlvbiwgcm90YXRpb24sIGNvbG9yIH0gPSBkYXRhYmFzZVVzZXI7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XHJcbiAgICAgICAgaWYgKCh0aGlzLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKS5jb2xvci5nZXRIZXgoKSAhPT1cclxuICAgICAgICAgICAgY29sb3IpIHtcclxuICAgICAgICAgICAgKHRoaXMubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwpLmNvbG9yLnNldEhleChjb2xvcik7XHJcbiAgICAgICAgICAgICh0aGlzLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc3Qgc2NhbGUgPSBUSFJFRS5NYXRoLm1hcExpbmVhcihmcmVxdWVuY3lBbXBsaXR1ZGVzWzhdLCAwLCAyNTUsIDAuNSwgMik7XHJcbiAgICAgICAgLy8gdGhpcy5zY2FsZS5zZXRTY2FsYXIoc2NhbGUpO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gcmFuZG9tVXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpO1xyXG59XHJcblxyXG5sZXQgbXlVc2VySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeVVzZXJJZCgpIHtcclxuICAgIGlmIChteVVzZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlVXNlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXlVc2VySWRcIik7XHJcbiAgICAgICAgbXlVc2VySWQgPSBsb2NhbFN0b3JhZ2VVc2VySWQgfHwgcmFuZG9tVXNlcklkKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlVc2VySWRcIiwgbXlVc2VySWQpO1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH1cclxufVxyXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgXCIuL2ZvcmVzdC9tb25rZXlwYXRjaFRocmVlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2VcIjtcclxuXHJcbmltcG9ydCB7IEZvcmVzdCB9IGZyb20gXCIuL2ZvcmVzdFwiO1xyXG5cclxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XHJcblxyXG5jb25zdCBpc0FkbWluID0gbG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJhZG1pblwiKSAhPT0gLTE7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e2RiOiBmaXJlYmFzZS5kYXRhYmFzZS5EYXRhYmFzZX0sIHt9PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxGb3Jlc3QgaXNBZG1pbj17aXNBZG1pbn0gZGI9e2RifSAvPlxyXG4gICAgICAgICAgICAgICAgey8qIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogXCJyZWxhdGl2ZVwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPlBvbHlwaG9uZS5pbzwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvb0xpc3RlbmVyIGRiPXtkYn0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+ICovfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY2xhc3MgRm9vTGlzdGVuZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PHtkYjogZmlyZWJhc2UuZGF0YWJhc2UuRGF0YWJhc2V9LCB7IHZhbD86IGFueSB9PiB7XHJcbiAgICBzdGF0ZSA9IHsgdmFsOiB1bmRlZmluZWQgfTtcclxuXHJcbiAgICBwcml2YXRlIHJlZjogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnJlZiA9IHRoaXMucHJvcHMuZGIucmVmKFwiZm9vXCIpO1xyXG4gICAgICAgIHRoaXMucmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNuYXBzaG90KTtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogc25hcHNob3QudmFsKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEZvb1JlbmRlcmVyIHZhbD17dGhpcy5zdGF0ZS52YWx9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZi5zZXQodGhpcy5zdGF0ZS52YWwhICsgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IEZvb1JlbmRlcmVyOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8e3ZhbDogYW55fT4gPSAoeyB2YWwgfSkgPT4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgICBGb28gaXM6XHJcbiAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkodmFsKX08L3ByZT5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUJUM2hUWVJqMHUtQXBaRTFfWjFmeVhmMlppVjltZ1hyMFwiLFxyXG4gICAgYXV0aERvbWFpbjogXCJwb2x5cGhvbmUtaW8uZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL3BvbHlwaG9uZS1pby5maXJlYmFzZWlvLmNvbVwiLFxyXG4gICAgcHJvamVjdElkOiBcInBvbHlwaG9uZS1pb1wiLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJwb2x5cGhvbmUtaW8uYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjI1NTIxODE3ODI1NlwiXHJcbn07XHJcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuXHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG50cnkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKDxBcHAgZGI9e2RifSAvPiwgcm9vdCk7XHJcbn0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICByb290IS5pbm5lclRleHQgPSBgRXJyb3I6ICR7ZS5uYW1lfSAtICR7ZS5tZXNzYWdlfS4gJHtlLnN0YWNrfWA7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IFwidW5pZm9ybSBmbG9hdCB0aW1lO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xcclxcblxcclxcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hcm1vcnkzZC9hcm1vcnkvYmxvYi9tYXN0ZXIvU2hhZGVycy9zdGQvdG9uZW1hcC5nbHNsXFxyXFxuXFxyXFxuZmxvYXQgdmlnbmV0dGUoKSB7XFxyXFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0ZGVzbC9sd2pnbC1iYXNpY3Mvd2lraS9TaGFkZXJMZXNzb24zXFxyXFxuICAgIHZlYzIgcG9zaXRpb24gPSB2VGV4dHVyZUNvb3JkIC0gdmVjMigwLjUpO1xcclxcblxcclxcbiAgICAvL2RldGVybWluZSB0aGUgdmVjdG9yIGxlbmd0aCBvZiB0aGUgY2VudGVyIHBvc2l0aW9uXFxyXFxuICAgIGZsb2F0IGxlbiA9IGxlbmd0aChwb3NpdGlvbik7XFxyXFxuXFxyXFxuICAgIC8vdXNlIHNtb290aHN0ZXAgdG8gY3JlYXRlIGEgc21vb3RoIHZpZ25ldHRlXFxyXFxuICAgIGZsb2F0IFJBRElVUyA9IDAuNzU7XFxyXFxuICAgIGZsb2F0IFNPRlRORVNTID0gMC40NTtcXHJcXG4gICAgZmxvYXQgdmlnbmV0dGUgPSBzbW9vdGhzdGVwKFJBRElVUywgUkFESVVTLVNPRlRORVNTLCBsZW4pO1xcclxcblxcclxcbiAgICByZXR1cm4gdmlnbmV0dGU7XFxyXFxufVxcclxcblxcclxcbnZlYzIgYmFycmVsRGlzdG9ydGlvbih2ZWMyIGNvb3JkLCBmbG9hdCBhbXQpIHtcXHJcXG4gICAgdmVjMiBjYyA9IGNvb3JkIC0gMC41O1xcclxcbiAgICBmbG9hdCBkaXN0ID0gZG90KGNjLCBjYyk7XFxyXFxuICAgIHJldHVybiBjb29yZCArIGNjICogZGlzdCAqIGFtdDtcXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgc2F0KCBmbG9hdCB0IClcXHJcXG57XFxyXFxuICAgIHJldHVybiBjbGFtcCggdCwgMC4wLCAxLjAgKTtcXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgbGludGVycCggZmxvYXQgdCApIHtcXHJcXG4gICAgcmV0dXJuIHNhdCggMS4wIC0gYWJzKCAyLjAqdCAtIDEuMCApICk7XFxyXFxufVxcclxcblxcclxcbmZsb2F0IHJlbWFwKCBmbG9hdCB0LCBmbG9hdCBhLCBmbG9hdCBiICkge1xcclxcbiAgICByZXR1cm4gc2F0KCAodCAtIGEpIC8gKGIgLSBhKSApO1xcclxcbn1cXHJcXG5cXHJcXG52ZWM0IHNwZWN0cnVtX29mZnNldCggZmxvYXQgdCApIHtcXHJcXG4gICAgdmVjNCByZXQ7XFxyXFxuICAgIGZsb2F0IGxvID0gc3RlcCh0LDAuNSk7XFxyXFxuICAgIGZsb2F0IGhpID0gMS4wLWxvO1xcclxcbiAgICBmbG9hdCB3ID0gbGludGVycCggcmVtYXAoIHQsIDEuMC82LjAsIDUuMC82LjAgKSApO1xcclxcbiAgICByZXQgPSB2ZWM0KGxvLDEuMCxoaSwgMS4pICogdmVjNCgxLjAtdywgdywgMS4wLXcsIDEuKTtcXHJcXG5cXHJcXG4gICAgcmV0dXJuIHBvdyggcmV0LCB2ZWM0KDEuMC8yLjIpICk7XFxyXFxufVxcclxcblxcclxcbnZlYzMgY2hyb21hdGljQWJiZXJhdGlvbigpIHtcXHJcXG4gICAgY29uc3QgZmxvYXQgbWF4X2Rpc3RvcnQgPSAwLjM7XFxyXFxuICAgIGNvbnN0IGludCBudW1faXRlciA9IDEyO1xcclxcbiAgICBjb25zdCBmbG9hdCByZWNpX251bV9pdGVyX2YgPSAxLjAgLyBmbG9hdChudW1faXRlcik7XFxyXFxuXFxyXFxuICAgIHZlYzIgdXY9KHZUZXh0dXJlQ29vcmQqLjgpKy4xMDtcXHJcXG4gICAgLyogdmVjMiB1diA9IHZUZXh0dXJlQ29vcmQueHk7ICovXFxyXFxuXFxyXFxuICAgIHZlYzQgc3VtY29sID0gdmVjNCgwLjApO1xcclxcbiAgICB2ZWM0IHN1bXcgPSB2ZWM0KDAuMCk7XFxyXFxuICAgIGZvciAoIGludCBpPTA7IGk8bnVtX2l0ZXI7KytpIClcXHJcXG4gICAge1xcclxcbiAgICAgICAgZmxvYXQgdCA9IGZsb2F0KGkpICogcmVjaV9udW1faXRlcl9mO1xcclxcbiAgICAgICAgdmVjNCB3ID0gc3BlY3RydW1fb2Zmc2V0KCB0ICk7XFxyXFxuICAgICAgICBzdW13ICs9IHc7XFxyXFxuICAgICAgICB2ZWM0IHRleCA9IHRleHR1cmUyRCggdERpZmZ1c2UsIGJhcnJlbERpc3RvcnRpb24odXYsIC42ICogbWF4X2Rpc3RvcnQqdCApICk7XFxyXFxuICAgICAgICAvLyBtb3ZlIGZyb20gbGluZWFyIHRvIGxpZ2h0c3BhY2VcXHJcXG4gICAgICAgIC8vIHRleCA9IHZlYzQobG9nKDEuMCArIHRleC5yZ2IgKiAyNTUuKSwgMS4wKTtcXHJcXG4gICAgICAgIHN1bWNvbCArPSB3ICogdGV4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIHJldHVybiAoc3VtY29sIC8gc3VtdykucmdiO1xcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCByYW5kb20odmVjMiBuLCBmbG9hdCBvZmZzZXQgKXtcXHJcXG4gICAgcmV0dXJuIC41IC0gZnJhY3Qoc2luKGRvdChuLnh5ICsgdmVjMihvZmZzZXQsIDAuKSwgdmVjMigxMi45ODk4LCA3OC4yMzMpKSkqIDQzNzU4LjU0NTMpO1xcclxcbn1cXHJcXG5cXHJcXG52b2lkIG1haW4odm9pZCkge1xcclxcbiAgICAvLyBjaHJvbWF0aWMgYWJiZXJhdGlvblxcclxcbiAgICB2ZWMzIHRvdGFsQ29sb3IgPSBjaHJvbWF0aWNBYmJlcmF0aW9uKCk7XFxyXFxuXFxyXFxuICAgIC8vIGJpdCBvZiB2aWduZXR0aW5nXFxyXFxuICAgIGZsb2F0IHZpZ25ldHRlQW1vdW50ID0gdmlnbmV0dGUoKTtcXHJcXG4gICAgdG90YWxDb2xvciA9IG1peCh0b3RhbENvbG9yLCB0b3RhbENvbG9yICogdmlnbmV0dGVBbW91bnQsIDAuNSk7XFxyXFxuXFxyXFxuICAgIC8vIG5vaXNlXFxyXFxuICAgIHRvdGFsQ29sb3IgKz0gMC4wMjUgKiByYW5kb20odlRleHR1cmVDb29yZCwgMS4gKyB0aW1lICogMC4wMDEpO1xcclxcblxcclxcbiAgICAvLyB0b3RhbENvbG9yID0gcG93KHRvdGFsQ29sb3IsIHZlYzMoMC40NSkpO1xcclxcblxcclxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRvdGFsQ29sb3IsIDEuMCk7XFxyXFxufVwiIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBQb3N0U2hhZGVyIH0gZnJvbSBcIi4vc2hhZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9zdFBhc3MgZXh0ZW5kcyBUSFJFRS5TaGFkZXJQYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFBvc3RTaGFkZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3N0UGFzcztcclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCB2ZXJ0ZXhTaGFkZXIgPSByZXF1aXJlKFwiLi92ZXJ0ZXguZ2xzbFwiKTtcclxuY29uc3QgZnJhZ21lbnRTaGFkZXIgPSByZXF1aXJlKFwiLi9mcmFnbWVudC5nbHNsXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBvc3RTaGFkZXI6IFRIUkVFLlNoYWRlciA9IHtcclxuICAgIHVuaWZvcm1zOiB7XHJcbiAgICAgICAgdGltZTogICAgICB7IHZhbHVlOiAwIH0sXHJcbiAgICAgICAgdERpZmZ1c2U6ICB7IHZhbHVlOiBudWxsIH0sXHJcbiAgICB9LFxyXG4gICAgdmVydGV4U2hhZGVyLFxyXG4gICAgZnJhZ21lbnRTaGFkZXIsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuICAgIHZUZXh0dXJlQ29vcmQgPSB1djtcXHJcXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xcclxcbn1cXHJcXG5cIiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuYm9keSB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7IH1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgLyogMSAqL1xcbiAgaGVpZ2h0OiAwO1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAvKiAyICovIH1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlOyB9XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07IH1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07IH1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7IH1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7XFxuICAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIG1hcmdpbjogMDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuYnV0dG9uLFxcbmlucHV0IHtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDsgfVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07IH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICAvKiAxICovIH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBwYWRkaW5nOiAwO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbiAgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxuICAvKiAxICovXFxuICBmb250OiBpbmhlcml0O1xcbiAgLyogMiAqLyB9XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07IH1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uZm9yZXN0LWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7IH1cXG5cXG4uYWRtaW4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uZm9yZXN0LWNvbnRhaW5lciBjYW52YXMge1xcbiAgcG9zaXRpb246IGFic29sdXRlOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIl0sInNvdXJjZVJvb3QiOiIifQ==