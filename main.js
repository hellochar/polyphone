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
/******/ 	var hotCurrentHash = "21a9e271c235fa398adf";
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
/******/ 	deferredModules.push(["./src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/lib!./node_modules/sass-loader/lib/loader.js!./src/index.scss ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none; }\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none; }\n\n* {\n  box-sizing: border-box; }\n\nhtml {\n  overflow: hidden;\n  font-family: Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, serif !important; }\n\n.landing-page-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px;\n  background: #93ece4; }\n  .landing-page-container .landing-page-header {\n    text-align: center;\n    font-size: 3em; }\n  .landing-page-container .landing-page-name-prefix {\n    color: #738694;\n    font-size: 0.75em;\n    font-weight: normal;\n    display: block; }\n  .landing-page-container .landing-page-name {\n    display: block;\n    margin-top: 1em;\n    color: #d9822b; }\n  .landing-page-container .landing-page-player-count-indicator {\n    margin: 1em;\n    font-size: 2em;\n    color: #10161a; }\n    .landing-page-container .landing-page-player-count-indicator .landing-page-player-count {\n      font-size: 1.25em;\n      font-weight: bold; }\n  .landing-page-container .landing-page-join {\n    margin-top: 1em;\n    padding: 50px;\n    width: 100%;\n    font-size: 2em;\n    border-radius: 2px;\n    background: none;\n    border: none;\n    background: #ffffff;\n    box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.25);\n    position: relative;\n    top: 0;\n    left: 0;\n    transition: all 0.1s;\n    text-align: center;\n    text-decoration: none;\n    color: #10161a; }\n    .landing-page-container .landing-page-join:active {\n      top: 5px;\n      left: 5px;\n      box-shadow: 0 0 0 0 transparent; }\n\n.event-page-display-container {\n  display: -ms-flexbox;\n  display: flex;\n  height: 100vh;\n  padding: 20px; }\n  .event-page-display-container .rvb {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    height: 100%;\n    width: 100%;\n    padding: 20px; }\n    .event-page-display-container .rvb .rvb-red, .event-page-display-container .rvb .rvb-blue {\n      -ms-flex-preferred-size: 50%;\n          flex-basis: 50%; }\n      .event-page-display-container .rvb .rvb-red h1, .event-page-display-container .rvb .rvb-blue h1 {\n        size: 2em; }\n      .event-page-display-container .rvb .rvb-red h2, .event-page-display-container .rvb .rvb-blue h2 {\n        size: 3em; }\n    .event-page-display-container .rvb .rvb-red {\n      background: red; }\n    .event-page-display-container .rvb .rvb-blue {\n      background: lightblue; }\n\n.client-container .rvb-user {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px; }\n\n.client-container .rvb-user-team-red {\n  background: red; }\n\n.client-container .rvb-user-team-blue {\n  background: lightblue; }\n\n.client-container .rvb-user-tap-collector {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  padding: 20px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center; }\n  .client-container .rvb-user-tap-collector:active .rvb-user-tap-button {\n    top: 5px;\n    left: 5px;\n    box-shadow: 0 0 0 0 transparent; }\n\n.client-container .rvb-user-tap-button {\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-size: 7em;\n  width: 3em;\n  height: 3em;\n  background-color: white;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  border-radius: 3em;\n  box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.5);\n  position: relative;\n  top: 0;\n  left: 0;\n  transition: all 0.1s; }\n", ""]);

// exports


/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
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
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
const eventLandingPage_1 = __webpack_require__(/*! ./routes/eventLandingPage */ "./src/routes/eventLandingPage.tsx");
const eventPageDisplay_1 = __webpack_require__(/*! ./routes/eventPageDisplay */ "./src/routes/eventPageDisplay.tsx");
const eventPageClient_1 = __webpack_require__(/*! ./routes/eventPageClient */ "./src/routes/eventPageClient.tsx");
const homePage_1 = __webpack_require__(/*! ./routes/homePage */ "./src/routes/homePage.tsx");
class App extends React.Component {
    render() {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(Routes, null)));
    }
}
exports.App = App;
;
const Routes = () => (React.createElement(react_router_dom_1.Switch, null,
    React.createElement(react_router_dom_1.Route, { path: "/event/:eventId", exact: true, component: eventLandingPage_1.EventLandingPage }),
    React.createElement(react_router_dom_1.Route, { path: "/event/:eventId/play", component: eventPageClient_1.EventPageClient }),
    React.createElement(react_router_dom_1.Route, { path: "/event/:eventId/display", component: eventPageDisplay_1.EventPageDisplay }),
    React.createElement(react_router_dom_1.Route, { path: "/", component: homePage_1.HomePage }),
    React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" }),
    "}"));


/***/ }),

/***/ "./src/eventManager.ts":
/*!*****************************!*\
  !*** ./src/eventManager.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// EventManager kicks off starting and cycling through games
// and assigns initial states to users
class EventManager {
    constructor(eventRef) {
        this.eventRef = eventRef;
        this.gameStateRef = eventRef.child("gameState");
        this.gameStateRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.gameState = snapshot.val();
            }
        });
        this.usersRef = eventRef.child("users");
        this.usersRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.users = snapshot.val();
            }
        });
        this.usersPendingRef = eventRef.child("usersPending");
        this.usersPendingRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const userIds = snapshot.val();
                if (userIds == null || userIds.length === 0) {
                    return;
                }
                // process all users in the queue
                switch (this.gameState.type) {
                    case "redvsblue":
                        const newUsers = createRedVsBlueUsers(userIds, this.users);
                        this.usersRef.transaction((existingUsers) => {
                            return Object.assign({}, existingUsers, newUsers);
                        });
                        this.usersPendingRef.set([]);
                        break;
                }
            }
        });
    }
    start() {
        this.scheduleNextGame();
    }
    stop() {
        clearTimeout(this.timeoutId);
    }
    scheduleNextGame() {
        // to start the games cycle, we:
        // update the GameState to a new game and set it immediately
        const newGameState = this.selectNewGame();
        this.gameStateRef.set(newGameState);
        // wait until the game has ended
        const timeGameWillEnd = (newGameState.timeGameStart + newGameState.gameDuration);
        const resultsScreenDuration = 15 * 1000;
        const waitDuration = timeGameWillEnd - Date.now() + resultsScreenDuration;
        this.timeoutId = setTimeout(() => {
            // and then do another one
            this.scheduleNextGame();
        }, waitDuration);
    }
    selectNewGame() {
        return createRedVsBlueGameState();
    }
}
exports.EventManager = EventManager;
function createRedVsBlueGameState() {
    return {
        bluePoints: 0,
        gameDuration: 30 * 1000,
        redPoints: 0,
        timeGameStart: Date.now() + 1 * 1000,
        type: "redvsblue",
    };
}
function createRedVsBlueUsers(userIds, existingUsers) {
    // let numRed = 0, numBlue = 0;
    // for (const userId in existingUsers) {
    //     const user = existingUsers[userId];
    //     user.state.team === "red" ? numRed++ : numBlue++;
    // }
    // return {
    //     team
    // }
    const newUsers = {};
    for (const id of userIds) {
        newUsers[id] = {
            state: {
                team: Math.random() < 0.5 ? "red" : "blue",
            },
        };
    }
    return newUsers;
}


/***/ }),

/***/ "./src/forest/monkeypatchThree.ts":
/*!****************************************!*\
  !*** ./src/forest/monkeypatchThree.ts ***!
  \****************************************/
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

/***/ "./src/games/gameState.tsx":
/*!*********************************!*\
  !*** ./src/games/gameState.tsx ***!
  \*********************************/
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
const redVsBlue_1 = __webpack_require__(/*! ./redVsBlue */ "./src/games/redVsBlue.tsx");
class GameState extends React.Component {
    render() {
        switch (this.props.gameState.type) {
            case "redvsblue":
                return React.createElement(redVsBlue_1.RedVsBlue, { gameState: this.props.gameState });
        }
    }
}
exports.GameState = GameState;


/***/ }),

/***/ "./src/games/redVsBlue.tsx":
/*!*********************************!*\
  !*** ./src/games/redVsBlue.tsx ***!
  \*********************************/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));
class RedVsBlue extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentTime: Date.now(),
        };
    }
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: Date.now(),
            });
        }, 50);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    render() {
        return (React.createElement("div", { className: "rvb" }, this.renderContent()));
    }
    renderContent() {
        const { gameState } = this.props;
        // game hasn't started yet, show a countdown timer
        if (this.state.currentTime < gameState.timeGameStart) {
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (React.createElement("div", { className: "rvb-countdown" },
                React.createElement("h2", null, "Game starts in"),
                React.createElement("h1", null, Math.ceil(millisRemaining / 1000))));
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            const millisRemaining = gameState.timeGameStart + gameState.gameDuration - this.state.currentTime;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "rvb-red" },
                    React.createElement("h1", null, "Red"),
                    React.createElement("h2", null, gameState.redPoints)),
                React.createElement("div", { className: "rvb-blue" },
                    React.createElement("h1", null, "Blue"),
                    React.createElement("h2", null, gameState.bluePoints)),
                React.createElement("div", { className: "rvb-timer" }, Math.ceil(millisRemaining / 1000))));
        }
        // game ended
        else {
            const result = gameState.redPoints > gameState.bluePoints ? {
                type: "win",
                winningTeam: "Red",
                winningPoints: gameState.redPoints,
                losingTeam: "Blue",
                losingPoints: gameState.bluePoints,
            } : gameState.bluePoints > gameState.redPoints ? {
                type: "win",
                winningTeam: "Blue",
                winningPoints: gameState.bluePoints,
                losingTeam: "Red",
                losingPoints: gameState.redPoints,
            } : {
                type: "tie",
                points: gameState.redPoints
            };
            if (result.type === "tie") {
                return (React.createElement("div", { className: "rvb-ended rvb-tie" },
                    React.createElement("h1", null, "It's a tie!"),
                    "Both teams scored ",
                    result.points,
                    "! Incredible!"));
            }
            else {
                const className = classnames_1.default("rvb-ended", {
                    "rvb-win-red": result.winningTeam === "Red",
                    "rvb-win-blue": result.winningTeam === "Blue",
                });
                return (React.createElement("div", { className: className },
                    React.createElement("h1", null,
                        result.winningTeam,
                        " team wins!"),
                    React.createElement("div", { className: "rvb-winner-score-container" },
                        React.createElement("span", { className: "rvb-winner-score" }, result.winningPoints),
                        " taps!"),
                    React.createElement("div", { className: "rvb-loser-score-container" },
                        React.createElement("span", { className: "rvb-loser" }, result.losingTeam),
                        " ",
                        React.createElement("span", { className: "rvb-loser-score" }, result.losingPoints),
                        " taps! Nice try!")));
            }
        }
    }
}
exports.RedVsBlue = RedVsBlue;


/***/ }),

/***/ "./src/games/redVsBlueUser.tsx":
/*!*************************************!*\
  !*** ./src/games/redVsBlueUser.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
class RedvsBlueUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: Date.now(),
            numTaps: 0,
        };
        this.handleTouch = () => {
            this.setState({
                numTaps: this.state.numTaps + 1,
            });
            this.myTeamPointsRef.transaction((val) => {
                return val + 1;
            });
        };
        const myTeamPointsRefUrl = props.user.state.team === "red" ? "redPoints" : "bluePoints";
        this.myTeamPointsRef = props.gameStateRef.child(myTeamPointsRefUrl);
    }
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: Date.now(),
            });
        }, 50);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    render() {
        const className = classnames_1.default("rvb-user", {
            "rvb-user-team-red": this.props.user.state.team === "red",
            "rvb-user-team-blue": this.props.user.state.team === "blue",
        });
        return (React.createElement("div", { className: className }, this.renderContent()));
    }
    renderContent() {
        const { gameState, user } = this.props;
        // game hasn't started yet, show instructions and your team
        if (this.state.currentTime < gameState.timeGameStart) {
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (React.createElement(React.Fragment, null,
                React.createElement("h3", null, "Red vs Blue"),
                React.createElement("h1", null,
                    "You are on ",
                    this.props.user.state.team,
                    " team!"),
                React.createElement("p", null, "Tap your screen as fast as possible to earn points for your team. Most points wins!"),
                React.createElement("div", { className: "rvb-user-countdown" },
                    "Starting in ",
                    Math.ceil(millisRemaining / 1000),
                    "...")));
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            return (React.createElement("div", { className: "rvb-user-tap-collector", onTouchStart: this.handleTouch, onMouseDown: this.handleTouch },
                React.createElement("div", { className: "rvb-user-tap-button" }, this.state.numTaps)));
        }
        // game ended
        else {
            const yourTeamPoints = user.state.team === "red" ? gameState.redPoints : gameState.bluePoints;
            const otherTeamPoints = user.state.team === "red" ? gameState.bluePoints : gameState.redPoints;
            if (yourTeamPoints === otherTeamPoints) {
                return (React.createElement("div", { className: "rvb-user-ended rvb-user-tie" },
                    React.createElement("h1", null, "It's a tie!"),
                    "Holy moly it's a tie! Both teams scored ",
                    yourTeamPoints,
                    "!",
                    React.createElement("div", { className: "rvb-user-ended-contribution-container" },
                        "Your contribution: ",
                        React.createElement("span", { className: "rvb-user-ended-contribution" }, this.state.numTaps),
                        " taps!")));
            }
            else {
                const result = yourTeamPoints > otherTeamPoints ? "won!" : "lost :(";
                return (React.createElement("div", { className: "rvb-user-ended" },
                    React.createElement("h1", null,
                        "Your team ",
                        result),
                    React.createElement("div", { className: "rvb-user-ended-contribution-container" },
                        "Your contribution: ",
                        React.createElement("span", { className: "rvb-user-ended-contribution" }, this.state.numTaps),
                        " taps!")));
            }
        }
    }
}
exports.RedvsBlueUser = RedvsBlueUser;


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader??ref--5-1!../node_modules/postcss-loader/lib!../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader??ref--5-1!../node_modules/postcss-loader/lib!../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader??ref--5-1!../node_modules/postcss-loader/lib!../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss");

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

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
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
__webpack_require__(/*! ./forest/monkeypatchThree */ "./src/forest/monkeypatchThree.ts");
__webpack_require__(/*! ./initializeFirebase */ "./src/initializeFirebase.ts");
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const app_1 = __webpack_require__(/*! ./app */ "./src/app.tsx");
__webpack_require__(/*! ./index.scss */ "./src/index.scss");
const body = document.body;
(body.requestFullscreen && body.requestFullscreen()) ||
    (body.mozRequestFullScreen && body.mozRequestFullScreen()) ||
    (body.webkitRequestFullScreen && body.webkitRequestFullScreen());
const root = document.getElementById("root");
try {
    ReactDOM.render(React.createElement(app_1.App, null), root);
}
catch (e) {
    if (e instanceof Error) {
        root.innerText = `Error: ${e.name} - ${e.message}. ${e.stack}`;
    }
}


/***/ }),

/***/ "./src/initializeFirebase.ts":
/*!***********************************!*\
  !*** ./src/initializeFirebase.ts ***!
  \***********************************/
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
const firebase = __importStar(__webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js"));
const config = {
    apiKey: "AIzaSyBT3hTYRj0u-ApZE1_Z1fyXf2ZiV9mgXr0",
    authDomain: "polyphone-io.firebaseapp.com",
    databaseURL: "https://polyphone-io.firebaseio.com",
    projectId: "polyphone-io",
    storageBucket: "polyphone-io.appspot.com",
    messagingSenderId: "255218178256"
};
firebase.initializeApp(config);


/***/ }),

/***/ "./src/routes/eventLandingPage.tsx":
/*!*****************************************!*\
  !*** ./src/routes/eventLandingPage.tsx ***!
  \*****************************************/
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
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
class EventLandingPage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            playerCount: 3,
        };
    }
    render() {
        return (React.createElement("div", { className: "landing-page-container" },
            React.createElement("h1", { className: "landing-page-header" },
                React.createElement("span", { className: "landing-page-name-prefix" }, "Welcome to"),
                " ",
                React.createElement("span", { className: "landing-page-name" }, "Gray Area Incubator Showcase 2018")),
            React.createElement("div", { className: "landing-page-player-count-indicator" },
                React.createElement("span", { className: "landing-page-player-count" }, this.state.playerCount),
                " people playing."),
            React.createElement(react_router_dom_1.Link, { to: "/event/gais2018/play", className: "landing-page-join" }, "Join")));
    }
}
exports.EventLandingPage = EventLandingPage;


/***/ }),

/***/ "./src/routes/eventPageClient.tsx":
/*!****************************************!*\
  !*** ./src/routes/eventPageClient.tsx ***!
  \****************************************/
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
const firebase = __importStar(__webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js"));
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const userId_1 = __webpack_require__(/*! ../user/userId */ "./src/user/userId.ts");
const userState_1 = __webpack_require__(/*! ../user/userState */ "./src/user/userState.tsx");
const db = firebase.database();
class EventPageClient extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    componentDidMount() {
        const userId = userId_1.getMyUserId();
        // one-time put myself on the list of pending users
        db.ref(`events/${this.props.match.params.eventId}/usersPending`).transaction((pendingUsers) => {
            pendingUsers = (pendingUsers || []);
            pendingUsers.push(userId);
            return pendingUsers;
        });
        this.gameStateRef = db.ref(`events/${this.props.match.params.eventId}/gameState`);
        this.gameStateRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const gameState = snapshot.val();
                this.setState({
                    gameState,
                });
            }
        });
        this.userRef = db.ref(`events/${this.props.match.params.eventId}/users/${userId}`);
        this.userRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const user = snapshot.val();
                this.setState({
                    user,
                });
            }
        });
    }
    render() {
        return (React.createElement("div", { className: "client-container" }, this.maybeRenderUserState()));
    }
    ;
    maybeRenderUserState() {
        const { gameState, user } = this.state;
        if (gameState == null || user == null) {
            return null;
        }
        return React.createElement(userState_1.UserState, { gameStateRef: this.gameStateRef, gameState: gameState, user: user });
    }
}
exports.EventPageClient = EventPageClient;


/***/ }),

/***/ "./src/routes/eventPageDisplay.tsx":
/*!*****************************************!*\
  !*** ./src/routes/eventPageDisplay.tsx ***!
  \*****************************************/
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
const firebase = __importStar(__webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js"));
const eventManager_1 = __webpack_require__(/*! ../eventManager */ "./src/eventManager.ts");
const gameState_1 = __webpack_require__(/*! ../games/gameState */ "./src/games/gameState.tsx");
const db = firebase.database();
class EventPageDisplay extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    componentDidMount() {
        // As soon as this page is visited we'll begin cycling through games.
        this.eventRef = db.ref(`events/${this.props.match.params.eventId}`);
        this.eventRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const event = snapshot.val();
                this.setState({
                    event,
                });
            }
        });
        this.gamesManager = new eventManager_1.EventManager(this.eventRef);
        this.gamesManager.start();
    }
    componentWillUnmount() {
        this.gamesManager.stop();
    }
    render() {
        return (React.createElement("div", { className: "event-page-display-container" }, this.maybeRenderGame()));
    }
    ;
    maybeRenderGame() {
        const { event } = this.state;
        if (event == null) {
            return null;
        }
        return React.createElement(gameState_1.GameState, { gameState: event.gameState });
    }
}
exports.EventPageDisplay = EventPageDisplay;


/***/ }),

/***/ "./src/routes/homePage.tsx":
/*!*********************************!*\
  !*** ./src/routes/homePage.tsx ***!
  \*********************************/
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
const react_router_1 = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
class HomePage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasGeolocation: true,
            shouldRedirect: false,
        };
    }
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                // do_something(position.coords.latitude, position.coords.longitude);
            });
        }
        else {
            this.setState({
                hasGeolocation: false,
            });
        }
        setTimeout(() => {
            this.setState({
                shouldRedirect: true,
            });
        }, 3000);
    }
    render() {
        if (!this.state.hasGeolocation) {
            return (React.createElement("div", { className: "home-page-container" },
                React.createElement("h1", null, "Select your event"),
                React.createElement(react_router_dom_1.Link, { to: "/events/gais2018" }, "Gray Area Incubator Showcase 2018")));
        }
        if (!this.state.shouldRedirect) {
            return (React.createElement("div", { className: "home-page-container" },
                React.createElement("h1", null, "Finding your closest event..."),
                React.createElement("a", null, "Find manually")));
        }
        else {
            return (React.createElement("div", { className: "home-page-container" },
                React.createElement("h1", null, "Found! Redirecting..."),
                React.createElement(react_router_1.Redirect, { to: "/event/gais2018" })));
        }
    }
}
exports.HomePage = HomePage;


/***/ }),

/***/ "./src/user/userId.ts":
/*!****************************!*\
  !*** ./src/user/userId.ts ***!
  \****************************/
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

/***/ "./src/user/userState.tsx":
/*!********************************!*\
  !*** ./src/user/userState.tsx ***!
  \********************************/
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
const redVsBlueUser_1 = __webpack_require__(/*! ../games/redVsBlueUser */ "./src/games/redVsBlueUser.tsx");
class UserState extends React.Component {
    render() {
        switch (this.props.gameState.type) {
            case "redvsblue":
                return React.createElement(redVsBlueUser_1.RedvsBlueUser, { gameStateRef: this.props.gameStateRef, gameState: this.props.gameState, user: this.props.user });
        }
    }
}
exports.UserState = UserState;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9yZXN0L21vbmtleXBhdGNoVGhyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL2dhbWVTdGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZVVzZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5zY3NzPzFjM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZUZpcmViYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRMYW5kaW5nUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ldmVudFBhZ2VDbGllbnQudHN4Iiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRQYWdlRGlzcGxheS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ob21lUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXIvdXNlcklkLnRzIiwid2VicGFjazovLy8uL3NyYy91c2VyL3VzZXJTdGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7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QUNKO0FBaERELDRCQWdEQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkRELFNBQVMsWUFBWTtJQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxJQUFJLFFBQTRCLENBQUM7QUFFakMsU0FBZ0IsV0FBVztJQUN2QixJQUFJLFFBQVEsRUFBRTtRQUNWLE9BQU8sUUFBUSxDQUFDO0tBQ25CO1NBQU07UUFDSCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLFFBQVEsR0FBRyxrQkFBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEQsT0FBTyxRQUFRLENBQUM7S0FDbkI7QUFDTCxDQUFDO0FBVEQsa0NBU0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmRCw4RkFBK0I7QUFHL0IsMkdBQXVEO0FBUXZELE1BQWEsU0FBVSxTQUFRLEtBQUssQ0FBQyxTQUE2QjtJQUM5RCxNQUFNO1FBQ0YsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsS0FBSyxXQUFXO2dCQUNaLE9BQU8sb0JBQUMsNkJBQWEsSUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBSSxDQUFDO1NBQy9IO0lBQ0wsQ0FBQztDQUNKO0FBUEQsOEJBT0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjFhOWUyNzFjMjM1ZmEzOThhZGZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC50c3hcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuYm9keSB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7IH1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgLyogMSAqL1xcbiAgaGVpZ2h0OiAwO1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAvKiAyICovIH1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlOyB9XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07IH1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07IH1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7IH1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7XFxuICAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIG1hcmdpbjogMDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuYnV0dG9uLFxcbmlucHV0IHtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDsgfVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07IH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICAvKiAxICovIH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBwYWRkaW5nOiAwO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbiAgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxuICAvKiAxICovXFxuICBmb250OiBpbmhlcml0O1xcbiAgLyogMiAqLyB9XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07IH1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LWZhbWlseTogUGFsYXRpbm8sIFBhbGF0aW5vIExpbm90eXBlLCBQYWxhdGlubyBMVCBTVEQsIEJvb2sgQW50aXF1YSwgc2VyaWYgIWltcG9ydGFudDsgfVxcblxcbi5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQ6ICM5M2VjZTQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtaGVhZGVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcbiAgLmxhbmRpbmctcGFnZS1jb250YWluZXIgLmxhbmRpbmctcGFnZS1uYW1lLXByZWZpeCB7XFxuICAgIGNvbG9yOiAjNzM4Njk0O1xcbiAgICBmb250LXNpemU6IDAuNzVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtbmFtZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAxZW07XFxuICAgIGNvbG9yOiAjZDk4MjJiOyB9XFxuICAubGFuZGluZy1wYWdlLWNvbnRhaW5lciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudC1pbmRpY2F0b3Ige1xcbiAgICBtYXJnaW46IDFlbTtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGNvbG9yOiAjMTAxNjFhOyB9XFxuICAgIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtcGxheWVyLWNvdW50LWluZGljYXRvciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudCB7XFxuICAgICAgZm9udC1zaXplOiAxLjI1ZW07XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbiB7XFxuICAgIG1hcmdpbi10b3A6IDFlbTtcXG4gICAgcGFkZGluZzogNTBweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcXG4gICAgYm94LXNoYWRvdzogNXB4IDVweCAycHggM3B4IHJnYmEoMTM4LCAxNTUsIDE2OCwgMC4yNSk7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4xcztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiAjMTAxNjFhOyB9XFxuICAgIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbjphY3RpdmUge1xcbiAgICAgIHRvcDogNXB4O1xcbiAgICAgIGxlZnQ6IDVweDtcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAwIHRyYW5zcGFyZW50OyB9XFxuXFxuLmV2ZW50LXBhZ2UtZGlzcGxheS1jb250YWluZXIge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDIwcHg7IH1cXG4gIC5ldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyIC5ydmIge1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDIwcHg7IH1cXG4gICAgLmV2ZW50LXBhZ2UtZGlzcGxheS1jb250YWluZXIgLnJ2YiAucnZiLXJlZCwgLmV2ZW50LXBhZ2UtZGlzcGxheS1jb250YWluZXIgLnJ2YiAucnZiLWJsdWUge1xcbiAgICAgIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiA1MCU7XFxuICAgICAgICAgIGZsZXgtYmFzaXM6IDUwJTsgfVxcbiAgICAgIC5ldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyIC5ydmIgLnJ2Yi1yZWQgaDEsIC5ldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyIC5ydmIgLnJ2Yi1ibHVlIGgxIHtcXG4gICAgICAgIHNpemU6IDJlbTsgfVxcbiAgICAgIC5ldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyIC5ydmIgLnJ2Yi1yZWQgaDIsIC5ldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyIC5ydmIgLnJ2Yi1ibHVlIGgyIHtcXG4gICAgICAgIHNpemU6IDNlbTsgfVxcbiAgICAuZXZlbnQtcGFnZS1kaXNwbGF5LWNvbnRhaW5lciAucnZiIC5ydmItcmVkIHtcXG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7IH1cXG4gICAgLmV2ZW50LXBhZ2UtZGlzcGxheS1jb250YWluZXIgLnJ2YiAucnZiLWJsdWUge1xcbiAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Ymx1ZTsgfVxcblxcbi5jbGllbnQtY29udGFpbmVyIC5ydmItdXNlciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDIwcHg7IH1cXG5cXG4uY2xpZW50LWNvbnRhaW5lciAucnZiLXVzZXItdGVhbS1yZWQge1xcbiAgYmFja2dyb3VuZDogcmVkOyB9XFxuXFxuLmNsaWVudC1jb250YWluZXIgLnJ2Yi11c2VyLXRlYW0tYmx1ZSB7XFxuICBiYWNrZ3JvdW5kOiBsaWdodGJsdWU7IH1cXG5cXG4uY2xpZW50LWNvbnRhaW5lciAucnZiLXVzZXItdGFwLWNvbGxlY3RvciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuY2xpZW50LWNvbnRhaW5lciAucnZiLXVzZXItdGFwLWNvbGxlY3RvcjphY3RpdmUgLnJ2Yi11c2VyLXRhcC1idXR0b24ge1xcbiAgICB0b3A6IDVweDtcXG4gICAgbGVmdDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAwIHRyYW5zcGFyZW50OyB9XFxuXFxuLmNsaWVudC1jb250YWluZXIgLnJ2Yi11c2VyLXRhcC1idXR0b24ge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgZm9udC1zaXplOiA3ZW07XFxuICB3aWR0aDogM2VtO1xcbiAgaGVpZ2h0OiAzZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNlbTtcXG4gIGJveC1zaGFkb3c6IDVweCA1cHggMnB4IDNweCByZ2JhKDEzOCwgMTU1LCAxNjgsIDAuNSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMXM7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgSGFzaFJvdXRlciwgUm91dGUsIFN3aXRjaCwgUmVkaXJlY3QgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRMYW5kaW5nUGFnZSB9IGZyb20gXCIuL3JvdXRlcy9ldmVudExhbmRpbmdQYWdlXCI7XHJcbmltcG9ydCB7IEV2ZW50UGFnZURpc3BsYXkgfSBmcm9tIFwiLi9yb3V0ZXMvZXZlbnRQYWdlRGlzcGxheVwiO1xyXG5pbXBvcnQgeyBFdmVudFBhZ2VDbGllbnQgfSBmcm9tIFwiLi9yb3V0ZXMvZXZlbnRQYWdlQ2xpZW50XCI7XHJcbmltcG9ydCB7IEhvbWVQYWdlIH0gZnJvbSBcIi4vcm91dGVzL2hvbWVQYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxIYXNoUm91dGVyPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlcyAvPlxyXG4gICAgICAgICAgICA8L0hhc2hSb3V0ZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IFJvdXRlcyA9ICgpID0+IChcclxuICAgIDxTd2l0Y2g+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvZXZlbnQvOmV2ZW50SWRcIiBleGFjdCBjb21wb25lbnQ9e0V2ZW50TGFuZGluZ1BhZ2V9IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvZXZlbnQvOmV2ZW50SWQvcGxheVwiIGNvbXBvbmVudD17RXZlbnRQYWdlQ2xpZW50fSAvPlxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2V2ZW50LzpldmVudElkL2Rpc3BsYXlcIiBjb21wb25lbnQ9e0V2ZW50UGFnZURpc3BsYXl9IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cclxuICAgICAgICA8UmVkaXJlY3QgZnJvbT1cIipcIiB0bz1cIi9cIiAvPn1cclxuICAgIDwvU3dpdGNoPlxyXG4pIiwiaW1wb3J0IHsgRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWUsIERhdGFiYXNlR2FtZVN0YXRlLCBEYXRhYmFzZVVzZXJzLCBVc2VyU3RhdGVSZWRWc0JsdWUgfSBmcm9tIFwiLi9maXJlYmFzZVNjaGVtYVwiO1xyXG5cclxuLy8gRXZlbnRNYW5hZ2VyIGtpY2tzIG9mZiBzdGFydGluZyBhbmQgY3ljbGluZyB0aHJvdWdoIGdhbWVzXHJcbi8vIGFuZCBhc3NpZ25zIGluaXRpYWwgc3RhdGVzIHRvIHVzZXJzXHJcbmV4cG9ydCBjbGFzcyBFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGUhOiBEYXRhYmFzZUdhbWVTdGF0ZTtcclxuICAgIHByaXZhdGUgZ2FtZVN0YXRlUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBwcml2YXRlIHVzZXJzUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBwcml2YXRlIHVzZXJzITogRGF0YWJhc2VVc2Vyczxhbnk+O1xyXG4gICAgcHJpdmF0ZSB1c2Vyc1BlbmRpbmdSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdGltZW91dElkPzogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGV2ZW50UmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2UpIHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZVJlZiA9IGV2ZW50UmVmLmNoaWxkKFwiZ2FtZVN0YXRlXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnVzZXJzUmVmID0gZXZlbnRSZWYuY2hpbGQoXCJ1c2Vyc1wiKTtcclxuICAgICAgICB0aGlzLnVzZXJzUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51c2Vyc1BlbmRpbmdSZWYgPSBldmVudFJlZi5jaGlsZChcInVzZXJzUGVuZGluZ1wiKTtcclxuICAgICAgICB0aGlzLnVzZXJzUGVuZGluZ1JlZi5vbihcInZhbHVlXCIsIChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcklkczogc3RyaW5nW10gPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VySWRzID09IG51bGwgfHwgdXNlcklkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIGFsbCB1c2VycyBpbiB0aGUgcXVldWVcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nYW1lU3RhdGUudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZWR2c2JsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VXNlcnMgPSBjcmVhdGVSZWRWc0JsdWVVc2Vycyh1c2VySWRzLCB0aGlzLnVzZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vyc1JlZi50cmFuc2FjdGlvbigoZXhpc3RpbmdVc2VycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5leGlzdGluZ1VzZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLm5ld1VzZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcnNQZW5kaW5nUmVmLnNldChbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVOZXh0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzY2hlZHVsZU5leHRHYW1lKCkge1xyXG4gICAgICAgIC8vIHRvIHN0YXJ0IHRoZSBnYW1lcyBjeWNsZSwgd2U6XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBHYW1lU3RhdGUgdG8gYSBuZXcgZ2FtZSBhbmQgc2V0IGl0IGltbWVkaWF0ZWx5XHJcbiAgICAgICAgY29uc3QgbmV3R2FtZVN0YXRlID0gdGhpcy5zZWxlY3ROZXdHYW1lKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYuc2V0KG5ld0dhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIGdhbWUgaGFzIGVuZGVkXHJcbiAgICAgICAgY29uc3QgdGltZUdhbWVXaWxsRW5kID0gKG5ld0dhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICsgbmV3R2FtZVN0YXRlLmdhbWVEdXJhdGlvbik7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0c1NjcmVlbkR1cmF0aW9uID0gMTUgKiAxMDAwO1xyXG4gICAgICAgIGNvbnN0IHdhaXREdXJhdGlvbiA9IHRpbWVHYW1lV2lsbEVuZCAtIERhdGUubm93KCkgKyByZXN1bHRzU2NyZWVuRHVyYXRpb247XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gZG8gYW5vdGhlciBvbmVcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRHYW1lKCk7XHJcbiAgICAgICAgfSwgd2FpdER1cmF0aW9uKSBhcyB1bmtub3duIGFzIG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdE5ld0dhbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlZFZzQmx1ZUdhbWVTdGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSZWRWc0JsdWVHYW1lU3RhdGUoKTogRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBibHVlUG9pbnRzOiAwLFxyXG4gICAgICAgIGdhbWVEdXJhdGlvbjogMzAgKiAxMDAwLFxyXG4gICAgICAgIHJlZFBvaW50czogMCxcclxuICAgICAgICB0aW1lR2FtZVN0YXJ0OiBEYXRlLm5vdygpICsgMSAqIDEwMDAsXHJcbiAgICAgICAgdHlwZTogXCJyZWR2c2JsdWVcIixcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlZFZzQmx1ZVVzZXJzKHVzZXJJZHM6IHN0cmluZ1tdLCBleGlzdGluZ1VzZXJzOiBEYXRhYmFzZVVzZXJzPFVzZXJTdGF0ZVJlZFZzQmx1ZT4pOiBEYXRhYmFzZVVzZXJzPFVzZXJTdGF0ZVJlZFZzQmx1ZT4ge1xyXG4gICAgLy8gbGV0IG51bVJlZCA9IDAsIG51bUJsdWUgPSAwO1xyXG4gICAgLy8gZm9yIChjb25zdCB1c2VySWQgaW4gZXhpc3RpbmdVc2Vycykge1xyXG4gICAgLy8gICAgIGNvbnN0IHVzZXIgPSBleGlzdGluZ1VzZXJzW3VzZXJJZF07XHJcbiAgICAvLyAgICAgdXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gbnVtUmVkKysgOiBudW1CbHVlKys7XHJcbiAgICAvLyB9XHJcbiAgICAvLyByZXR1cm4ge1xyXG4gICAgLy8gICAgIHRlYW1cclxuICAgIC8vIH1cclxuICAgIGNvbnN0IG5ld1VzZXJzOiBEYXRhYmFzZVVzZXJzPFVzZXJTdGF0ZVJlZFZzQmx1ZT4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgaWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIG5ld1VzZXJzW2lkXSA9IHtcclxuICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgIHRlYW06IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJlZFwiIDogXCJibHVlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1VzZXJzO1xyXG59IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcblxyXG4vLyBIQUNLIG1vbmtleXBhdGNoIHRoZSBvbGQgZmVhdHVyZXMgdGhhdCByZXF1aXJlcyBUSFJFRSBvbiB0aGUgZ2xvYmFsIG5hbWVzcGFjZVxyXG4od2luZG93IGFzIGFueSkuVEhSRUUgPSBUSFJFRTtcclxuLy8gdHNsaW50OmRpc2FibGVcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2xvYWRlcnMvR0xURkxvYWRlclwiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvRWZmZWN0Q29tcG9zZXJcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvY29udHJvbHMvUG9pbnRlckxvY2tDb250cm9sc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9jb250cm9scy9EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9saWJzL3N0YXRzLm1pblwiO1xyXG4vLyBpbXBvcnQgKiBhcyBkYXQgZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzL2xpYnMvZGF0Lmd1aS5taW5cIjtcclxuLy8gKHdpbmRvdyBhcyBhbnkpLmRhdCA9IGRhdDtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvQm9rZWhTaGFkZXJcIjtcclxuLy8gaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Cb2tlaFNoYWRlcjJcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvQ29weVNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0RvdFNjcmVlblNoYWRlclwiO1xyXG4vLyByZXF1aXJlZCBieSBTQU9TaGFkZXJcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9EZXB0aExpbWl0ZWRCbHVyU2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvU0FPU2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvU1NBT1NoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0x1bWlub3NpdHlIaWdoUGFzc1NoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0x1bWlub3NpdHlTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Ub25lTWFwU2hhZGVyXCI7XHJcbi8vIHJlcXVpcmVkIGJ5IFNBT1NoYWRlclxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1VucGFja0RlcHRoUkdCQVNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1JlbmRlclBhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvQm9rZWhQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL01hc2tQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NTQUFSZW5kZXJQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NBT1Bhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU1NBT1Bhc3NcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvVW5yZWFsQmxvb21QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0FkYXB0aXZlVG9uZU1hcHBpbmdQYXNzXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9vYmplY3RzL1NreVwiO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlIH0gZnJvbSBcInNyYy9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBSZWRWc0JsdWUgfSBmcm9tIFwiLi9yZWRWc0JsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2FtZVN0YXRlUHJvcHMge1xyXG4gICAgZ2FtZVN0YXRlOiBEYXRhYmFzZUdhbWVTdGF0ZTtcclxufVxyXG5leHBvcnQgY2xhc3MgR2FtZVN0YXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEdhbWVTdGF0ZVByb3BzLCB7fT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5nYW1lU3RhdGUudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwicmVkdnNibHVlXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPFJlZFZzQmx1ZSBnYW1lU3RhdGU9e3RoaXMucHJvcHMuZ2FtZVN0YXRlfSAvPjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlIH0gZnJvbSBcInNyYy9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWRWc0JsdWVQcm9wcyB7XHJcbiAgICBnYW1lU3RhdGU6IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVkVnNCbHVlU3RhdGUge1xyXG4gICAgY3VycmVudFRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZFZzQmx1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWRWc0JsdWVQcm9wcywgUmVkVnNCbHVlU3RhdGU+IHtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWxJZD86IG51bWJlcjtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IChzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWU6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwKSBhcyBhbnkgYXMgbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCB7IGdhbWVTdGF0ZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyBnYW1lIGhhc24ndCBzdGFydGVkIHlldCwgc2hvdyBhIGNvdW50ZG93biB0aW1lclxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lIDwgZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbWlsbGlzUmVtYWluaW5nID0gZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgLSB0aGlzLnN0YXRlLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItY291bnRkb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPkdhbWUgc3RhcnRzIGluPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+e01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX08L2gxPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdhbWUgaXMgY3VycmVudGx5IGluIHBsYXlcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lID49IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICYmIHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPCBnYW1lU3RhdGUudGltZUdhbWVTdGFydCArIGdhbWVTdGF0ZS5nYW1lRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgbWlsbGlzUmVtYWluaW5nID0gZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgKyBnYW1lU3RhdGUuZ2FtZUR1cmF0aW9uIC0gdGhpcy5zdGF0ZS5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItcmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5SZWQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+e2dhbWVTdGF0ZS5yZWRQb2ludHN9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1ibHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5CbHVlPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntnYW1lU3RhdGUuYmx1ZVBvaW50c308L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRpbWVyXCI+e01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnYW1lIGVuZGVkXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9XHJcbiAgICAgICAgICAgICAgICBnYW1lU3RhdGUucmVkUG9pbnRzID4gZ2FtZVN0YXRlLmJsdWVQb2ludHMgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3aW5cIixcclxuICAgICAgICAgICAgICAgICAgICB3aW5uaW5nVGVhbTogXCJSZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aW5uaW5nUG9pbnRzOiBnYW1lU3RhdGUucmVkUG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvc2luZ1RlYW06IFwiQmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvc2luZ1BvaW50czogZ2FtZVN0YXRlLmJsdWVQb2ludHMsXHJcbiAgICAgICAgICAgICAgICB9IDogZ2FtZVN0YXRlLmJsdWVQb2ludHMgPiBnYW1lU3RhdGUucmVkUG9pbnRzID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2luXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lubmluZ1RlYW06IFwiQmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbm5pbmdQb2ludHM6IGdhbWVTdGF0ZS5ibHVlUG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvc2luZ1RlYW06IFwiUmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9zaW5nUG9pbnRzOiBnYW1lU3RhdGUucmVkUG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgfSA6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRpZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czogZ2FtZVN0YXRlLnJlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gXCJ0aWVcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1lbmRlZCBydmItdGllXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5JdCdzIGEgdGllITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJvdGggdGVhbXMgc2NvcmVkIHtyZXN1bHQucG9pbnRzfSEgSW5jcmVkaWJsZSFcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFwicnZiLWVuZGVkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBcInJ2Yi13aW4tcmVkXCI6IHJlc3VsdC53aW5uaW5nVGVhbSA9PT0gXCJSZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJ2Yi13aW4tYmx1ZVwiOiByZXN1bHQud2lubmluZ1RlYW0gPT09IFwiQmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+e3Jlc3VsdC53aW5uaW5nVGVhbX0gdGVhbSB3aW5zITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXdpbm5lci1zY29yZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi13aW5uZXItc2NvcmVcIj57cmVzdWx0Lndpbm5pbmdQb2ludHN9PC9zcGFuPiB0YXBzIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJydmItbG9zZXJcIj57cmVzdWx0Lmxvc2luZ1RlYW19PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmVcIj57cmVzdWx0Lmxvc2luZ1BvaW50c308L3NwYW4+IHRhcHMhIE5pY2UgdHJ5IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhYmFzZVVzZXIsIFVzZXJTdGF0ZVJlZFZzQmx1ZSwgRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWUgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlZFZzQmx1ZVVzZXJQcm9wcyB7XHJcbiAgICBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWU7XHJcbiAgICB1c2VyOiBEYXRhYmFzZVVzZXI8VXNlclN0YXRlUmVkVnNCbHVlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWRWc0JsdWVVc2VyU3RhdGUge1xyXG4gICAgY3VycmVudFRpbWU6IG51bWJlcjtcclxuICAgIC8vIHRoaXMgaXMgaGVsZCBjbGllbnQgc2lkZVxyXG4gICAgbnVtVGFwczogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVkdnNCbHVlVXNlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWRWc0JsdWVVc2VyUHJvcHMsIHt9PiB7XHJcbiAgICBwcml2YXRlIGludGVydmFsSWQ/OiBudW1iZXI7XHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBjdXJyZW50VGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICBudW1UYXBzOiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG15VGVhbVBvaW50c1JlZjogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUmVkVnNCbHVlVXNlclByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IG15VGVhbVBvaW50c1JlZlVybCA9IHByb3BzLnVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIiA/IFwicmVkUG9pbnRzXCIgOiBcImJsdWVQb2ludHNcIjtcclxuICAgICAgICB0aGlzLm15VGVhbVBvaW50c1JlZiA9IHByb3BzLmdhbWVTdGF0ZVJlZi5jaGlsZChteVRlYW1Qb2ludHNSZWZVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2ggPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIG51bVRhcHM6IHRoaXMuc3RhdGUubnVtVGFwcyArIDEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5teVRlYW1Qb2ludHNSZWYudHJhbnNhY3Rpb24oKHZhbDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgKyAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmludGVydmFsSWQgPSAoc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MCkgYXMgYW55IGFzIG51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKFwicnZiLXVzZXJcIiwge1xyXG4gICAgICAgICAgICBcInJ2Yi11c2VyLXRlYW0tcmVkXCI6IHRoaXMucHJvcHMudXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiLFxyXG4gICAgICAgICAgICBcInJ2Yi11c2VyLXRlYW0tYmx1ZVwiOiB0aGlzLnByb3BzLnVzZXIuc3RhdGUudGVhbSA9PT0gXCJibHVlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCB7IGdhbWVTdGF0ZSwgdXNlciB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyBnYW1lIGhhc24ndCBzdGFydGVkIHlldCwgc2hvdyBpbnN0cnVjdGlvbnMgYW5kIHlvdXIgdGVhbVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lIDwgZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbWlsbGlzUmVtYWluaW5nID0gZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgLSB0aGlzLnN0YXRlLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+UmVkIHZzIEJsdWU8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5Zb3UgYXJlIG9uIHt0aGlzLnByb3BzLnVzZXIuc3RhdGUudGVhbX0gdGVhbSE8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlRhcCB5b3VyIHNjcmVlbiBhcyBmYXN0IGFzIHBvc3NpYmxlIHRvIGVhcm4gcG9pbnRzIGZvciB5b3VyIHRlYW0uIE1vc3QgcG9pbnRzIHdpbnMhPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItY291bnRkb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0YXJ0aW5nIGluIHtNYXRoLmNlaWwobWlsbGlzUmVtYWluaW5nIC8gMTAwMCl9Li4uIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdhbWUgaXMgY3VycmVudGx5IGluIHBsYXlcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lID49IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICYmIHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPCBnYW1lU3RhdGUudGltZUdhbWVTdGFydCArIGdhbWVTdGF0ZS5nYW1lRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItdGFwLWNvbGxlY3RvclwiIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaH0gb25Nb3VzZURvd249e3RoaXMuaGFuZGxlVG91Y2h9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItdGFwLWJ1dHRvblwiPnt0aGlzLnN0YXRlLm51bVRhcHN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZSBlbmRlZFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB5b3VyVGVhbVBvaW50cyA9IHVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIiA/IGdhbWVTdGF0ZS5yZWRQb2ludHMgOiBnYW1lU3RhdGUuYmx1ZVBvaW50cztcclxuICAgICAgICAgICAgY29uc3Qgb3RoZXJUZWFtUG9pbnRzID0gdXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gZ2FtZVN0YXRlLmJsdWVQb2ludHMgOiBnYW1lU3RhdGUucmVkUG9pbnRzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh5b3VyVGVhbVBvaW50cyA9PT0gb3RoZXJUZWFtUG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQgcnZiLXVzZXItdGllXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5JdCdzIGEgdGllITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbHkgbW9seSBpdCdzIGEgdGllISBCb3RoIHRlYW1zIHNjb3JlZCB7eW91clRlYW1Qb2ludHN9IVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZC1jb250cmlidXRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VyIGNvbnRyaWJ1dGlvbjogPHNwYW4gY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQtY29udHJpYnV0aW9uXCI+e3RoaXMuc3RhdGUubnVtVGFwc308L3NwYW4+IHRhcHMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlvdXJUZWFtUG9pbnRzID4gb3RoZXJUZWFtUG9pbnRzID8gXCJ3b24hXCIgOiBcImxvc3QgOihcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+WW91ciB0ZWFtIHtyZXN1bHR9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZC1jb250cmlidXRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VyIGNvbnRyaWJ1dGlvbjogPHNwYW4gY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQtY29udHJpYnV0aW9uXCI+e3RoaXMuc3RhdGUubnVtVGFwc308L3NwYW4+IHRhcHMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtMSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtMSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBcIi4vZm9yZXN0L21vbmtleXBhdGNoVGhyZWVcIjtcclxuaW1wb3J0IFwiLi9pbml0aWFsaXplRmlyZWJhc2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcblxyXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xyXG5cclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbihib2R5LnJlcXVlc3RGdWxsc2NyZWVuICYmIGJvZHkucmVxdWVzdEZ1bGxzY3JlZW4oKSkgfHxcclxuKGJvZHkubW96UmVxdWVzdEZ1bGxTY3JlZW4gJiYgYm9keS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpKSB8fFxyXG4oYm9keS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiAmJiBib2R5LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCkpO1xyXG5cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcblxyXG50cnkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3QpO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgcm9vdCEuaW5uZXJUZXh0ID0gYEVycm9yOiAke2UubmFtZX0gLSAke2UubWVzc2FnZX0uICR7ZS5zdGFja31gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5QlQzaFRZUmowdS1BcFpFMV9aMWZ5WGYyWmlWOW1nWHIwXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcInBvbHlwaG9uZS1pby5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vcG9seXBob25lLWlvLmZpcmViYXNlaW8uY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwicG9seXBob25lLWlvXCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcInBvbHlwaG9uZS1pby5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMjU1MjE4MTc4MjU2XCJcclxufTtcclxuXHJcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudExhbmRpbmdQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHBsYXllckNvdW50OiAzLFxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5kaW5nLXBhZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLWhlYWRlclwiPjxzcGFuIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1uYW1lLXByZWZpeFwiPldlbGNvbWUgdG88L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1uYW1lXCI+R3JheSBBcmVhIEluY3ViYXRvciBTaG93Y2FzZSAyMDE4PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1wbGF5ZXItY291bnQtaW5kaWNhdG9yXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLXBsYXllci1jb3VudFwiPnt0aGlzLnN0YXRlLnBsYXllckNvdW50fTwvc3Bhbj4gcGVvcGxlIHBsYXlpbmcuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9ldmVudC9nYWlzMjAxOC9wbGF5XCIgY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLWpvaW5cIj5Kb2luPC9MaW5rPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VHYW1lU3RhdGUsIERhdGFiYXNlVXNlciB9IGZyb20gXCIuLi9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBnZXRNeVVzZXJJZCB9IGZyb20gXCIuLi91c2VyL3VzZXJJZFwiO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGUgfSBmcm9tIFwiLi4vdXNlci91c2VyU3RhdGVcIjtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuXHJcbmludGVyZmFjZSBDbGllbnRSb3V0ZVBhcmFtcyB7XHJcbiAgICBldmVudElkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDbGllbnRQcm9wcyBleHRlbmRzIFJvdXRlQ29tcG9uZW50UHJvcHM8Q2xpZW50Um91dGVQYXJhbXM+IHtcclxufVxyXG5cclxuaW50ZXJmYWNlIENsaWVudFN0YXRlIHtcclxuICAgIGdhbWVTdGF0ZT86IERhdGFiYXNlR2FtZVN0YXRlO1xyXG4gICAgdXNlcj86IERhdGFiYXNlVXNlcjxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRQYWdlQ2xpZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PENsaWVudFByb3BzLCBDbGllbnRTdGF0ZT4ge1xyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGVSZWYhOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBwcml2YXRlIHVzZXJSZWYhOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBzdGF0ZTogQ2xpZW50U3RhdGUgPSB7fTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB1c2VySWQgPSBnZXRNeVVzZXJJZCgpO1xyXG4gICAgICAgIC8vIG9uZS10aW1lIHB1dCBteXNlbGYgb24gdGhlIGxpc3Qgb2YgcGVuZGluZyB1c2Vyc1xyXG4gICAgICAgIGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH0vdXNlcnNQZW5kaW5nYCkudHJhbnNhY3Rpb24oKHBlbmRpbmdVc2VycykgPT4ge1xyXG4gICAgICAgICAgICBwZW5kaW5nVXNlcnMgPSAocGVuZGluZ1VzZXJzIHx8IFtdKTtcclxuICAgICAgICAgICAgcGVuZGluZ1VzZXJzLnB1c2godXNlcklkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBlbmRpbmdVc2VycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYgPSBkYi5yZWYoYGV2ZW50cy8ke3RoaXMucHJvcHMubWF0Y2gucGFyYW1zLmV2ZW50SWR9L2dhbWVTdGF0ZWApO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lU3RhdGU6IERhdGFiYXNlR2FtZVN0YXRlID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lU3RhdGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXNlclJlZiA9IGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH0vdXNlcnMvJHt1c2VySWR9YCk7XHJcbiAgICAgICAgdGhpcy51c2VyUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyOiBEYXRhYmFzZVVzZXI8YW55PiA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGllbnQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlclVzZXJTdGF0ZSgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1heWJlUmVuZGVyVXNlclN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2FtZVN0YXRlLCB1c2VyIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChnYW1lU3RhdGUgPT0gbnVsbCB8fCB1c2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8VXNlclN0YXRlIGdhbWVTdGF0ZVJlZj17dGhpcy5nYW1lU3RhdGVSZWZ9IGdhbWVTdGF0ZT17Z2FtZVN0YXRlfSB1c2VyPXt1c2VyfSAvPlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2VcIjtcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlRXZlbnQgfSBmcm9tIFwiLi4vZmlyZWJhc2VTY2hlbWFcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL2V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vZ2FtZXMvZ2FtZVN0YXRlXCI7XHJcblxyXG5jb25zdCBkYiA9IGZpcmViYXNlLmRhdGFiYXNlKCk7XHJcblxyXG5pbnRlcmZhY2UgRXZlbnRQYWdlRGlzcGxheVJvdXRlUGFyYW1zIHtcclxuICAgIGV2ZW50SWQ6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50UGFnZURpc3BsYXlQcm9wcyBleHRlbmRzIFJvdXRlQ29tcG9uZW50UHJvcHM8RXZlbnRQYWdlRGlzcGxheVJvdXRlUGFyYW1zPiB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudFBhZ2VEaXNwbGF5U3RhdGUge1xyXG4gICAgZXZlbnQ/OiBEYXRhYmFzZUV2ZW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRQYWdlRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxFdmVudFBhZ2VEaXNwbGF5UHJvcHMsIEV2ZW50UGFnZURpc3BsYXlTdGF0ZT4ge1xyXG4gICAgcHJpdmF0ZSBldmVudFJlZiE6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgZ2FtZXNNYW5hZ2VyITogRXZlbnRNYW5hZ2VyO1xyXG4gICAgc3RhdGU6IEV2ZW50UGFnZURpc3BsYXlTdGF0ZSA9IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIEFzIHNvb24gYXMgdGhpcyBwYWdlIGlzIHZpc2l0ZWQgd2UnbGwgYmVnaW4gY3ljbGluZyB0aHJvdWdoIGdhbWVzLlxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWYgPSBkYi5yZWYoYGV2ZW50cy8ke3RoaXMucHJvcHMubWF0Y2gucGFyYW1zLmV2ZW50SWR9YCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZi5vbihcInZhbHVlXCIsIChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnQ6IERhdGFiYXNlRXZlbnQgPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbWVzTWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIodGhpcy5ldmVudFJlZik7XHJcbiAgICAgICAgdGhpcy5nYW1lc01hbmFnZXIuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVzTWFuYWdlci5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXZlbnQtcGFnZS1kaXNwbGF5LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJHYW1lKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJHYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZXZlbnQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8R2FtZVN0YXRlIGdhbWVTdGF0ZT17ZXZlbnQuZ2FtZVN0YXRlfSAvPlxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaGFzR2VvbG9jYXRpb246IHRydWUsXHJcbiAgICAgICAgc2hvdWxkUmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmIChcImdlb2xvY2F0aW9uXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLyBkb19zb21ldGhpbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBoYXNHZW9sb2NhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRSZWRpcmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhc0dlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+U2VsZWN0IHlvdXIgZXZlbnQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2V2ZW50cy9nYWlzMjAxOFwiPkdyYXkgQXJlYSBJbmN1YmF0b3IgU2hvd2Nhc2UgMjAxODwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc2hvdWxkUmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG9tZS1wYWdlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5GaW5kaW5nIHlvdXIgY2xvc2VzdCBldmVudC4uLjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+RmluZCBtYW51YWxseTwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+Rm91bmQhIFJlZGlyZWN0aW5nLi4uPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3QgdG89XCIvZXZlbnQvZ2FpczIwMThcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gcmFuZG9tVXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpO1xyXG59XHJcblxyXG5sZXQgbXlVc2VySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeVVzZXJJZCgpIHtcclxuICAgIGlmIChteVVzZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlVXNlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXlVc2VySWRcIik7XHJcbiAgICAgICAgbXlVc2VySWQgPSBsb2NhbFN0b3JhZ2VVc2VySWQgfHwgcmFuZG9tVXNlcklkKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlVc2VySWRcIiwgbXlVc2VySWQpO1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlLCBEYXRhYmFzZVVzZXIgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IFJlZHZzQmx1ZVVzZXIgfSBmcm9tIFwiLi4vZ2FtZXMvcmVkVnNCbHVlVXNlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lU3RhdGVQcm9wcyB7XHJcbiAgICBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyOiBEYXRhYmFzZVVzZXI8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJTdGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxHYW1lU3RhdGVQcm9wcywge30+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZ2FtZVN0YXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInJlZHZzYmx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxSZWR2c0JsdWVVc2VyIGdhbWVTdGF0ZVJlZj17dGhpcy5wcm9wcy5nYW1lU3RhdGVSZWZ9IGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=