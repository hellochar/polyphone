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
/******/ 	var hotCurrentHash = "5476bd29da617a4c1cc3";
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
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none; }\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none; }\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.7.0\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2018 Daniel Eden\n */\n\n@keyframes bounce {\n  from,\n  20%,\n  53%,\n  80%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0); }\n  40%,\n  43% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    transform: translate3d(0, -4px, 0); } }\n\n.bounce {\n  animation-name: bounce;\n  transform-origin: center bottom; }\n\n@keyframes flash {\n  from,\n  50%,\n  to {\n    opacity: 1; }\n  25%,\n  75% {\n    opacity: 0; } }\n\n.flash {\n  animation-name: flash; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.pulse {\n  animation-name: pulse; }\n\n@keyframes rubberBand {\n  from {\n    transform: scale3d(1, 1, 1); }\n  30% {\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.rubberBand {\n  animation-name: rubberBand; }\n\n@keyframes shake {\n  from,\n  to {\n    transform: translate3d(0, 0, 0); }\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(-10px, 0, 0); }\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(10px, 0, 0); } }\n\n.shake {\n  animation-name: shake; }\n\n@keyframes headShake {\n  0% {\n    transform: translateX(0); }\n  6.5% {\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    transform: translateX(0); } }\n\n.headShake {\n  animation-timing-function: ease-in-out;\n  animation-name: headShake; }\n\n@keyframes swing {\n  20% {\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n.swing {\n  transform-origin: top center;\n  animation-name: swing; }\n\n@keyframes tada {\n  from {\n    transform: scale3d(1, 1, 1); }\n  10%,\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%,\n  60%,\n  80% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.tada {\n  animation-name: tada; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes wobble {\n  from {\n    transform: translate3d(0, 0, 0); }\n  15% {\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.wobble {\n  animation-name: wobble; }\n\n@keyframes jello {\n  from,\n  11.1%,\n  to {\n    transform: translate3d(0, 0, 0); }\n  22.2% {\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n.jello {\n  animation-name: jello;\n  transform-origin: center; }\n\n@keyframes heartBeat {\n  0% {\n    transform: scale(1); }\n  14% {\n    transform: scale(1.3); }\n  28% {\n    transform: scale(1); }\n  42% {\n    transform: scale(1.3); }\n  70% {\n    transform: scale(1); } }\n\n.heartBeat {\n  animation-name: heartBeat;\n  animation-duration: 1.3s;\n  animation-timing-function: ease-in-out; }\n\n@keyframes bounceIn {\n  from,\n  20%,\n  40%,\n  60%,\n  80%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n.bounceIn {\n  animation-duration: 0.75s;\n  animation-name: bounceIn; }\n\n@keyframes bounceInDown {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n@keyframes bounceInLeft {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    transform: translate3d(5px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInLeft {\n  animation-name: bounceInLeft; }\n\n@keyframes bounceInRight {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInRight {\n  animation-name: bounceInRight; }\n\n@keyframes bounceInUp {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    transform: translate3d(0, -5px, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInUp {\n  animation-name: bounceInUp; }\n\n@keyframes bounceOut {\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%,\n  55% {\n    opacity: 1;\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n.bounceOut {\n  animation-duration: 0.75s;\n  animation-name: bounceOut; }\n\n@keyframes bounceOutDown {\n  20% {\n    transform: translate3d(0, 10px, 0); }\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); } }\n\n.bounceOutDown {\n  animation-name: bounceOutDown; }\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); } }\n\n.bounceOutLeft {\n  animation-name: bounceOutLeft; }\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); } }\n\n.bounceOutRight {\n  animation-name: bounceOutRight; }\n\n@keyframes bounceOutUp {\n  20% {\n    transform: translate3d(0, -10px, 0); }\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); } }\n\n.bounceOutUp {\n  animation-name: bounceOutUp; }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.fadeIn {\n  animation-name: fadeIn; }\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInDown {\n  animation-name: fadeInDown; }\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInDownBig {\n  animation-name: fadeInDownBig; }\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInLeft {\n  animation-name: fadeInLeft; }\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInLeftBig {\n  animation-name: fadeInLeftBig; }\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInRight {\n  animation-name: fadeInRight; }\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInRightBig {\n  animation-name: fadeInRightBig; }\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInUp {\n  animation-name: fadeInUp; }\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInUpBig {\n  animation-name: fadeInUpBig; }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.fadeOut {\n  animation-name: fadeOut; }\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0); } }\n\n.fadeOutDown {\n  animation-name: fadeOutDown; }\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); } }\n\n.fadeOutDownBig {\n  animation-name: fadeOutDownBig; }\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0); } }\n\n.fadeOutLeft {\n  animation-name: fadeOutLeft; }\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); } }\n\n.fadeOutLeftBig {\n  animation-name: fadeOutLeftBig; }\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0); } }\n\n.fadeOutRight {\n  animation-name: fadeOutRight; }\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); } }\n\n.fadeOutRightBig {\n  animation-name: fadeOutRightBig; }\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0); } }\n\n.fadeOutUp {\n  animation-name: fadeOutUp; }\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); } }\n\n.fadeOutUpBig {\n  animation-name: fadeOutUpBig; }\n\n@keyframes flip {\n  from {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    animation-timing-function: ease-out; }\n  40% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    animation-timing-function: ease-out; }\n  50% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    animation-timing-function: ease-in; }\n  80% {\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in; }\n  to {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in; } }\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  animation-name: flip; }\n\n@keyframes flipInX {\n  from {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    animation-timing-function: ease-in; }\n  60% {\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    transform: perspective(400px); } }\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipInX; }\n\n@keyframes flipInY {\n  from {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    animation-timing-function: ease-in; }\n  60% {\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    transform: perspective(400px); } }\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipInY; }\n\n@keyframes flipOutX {\n  from {\n    transform: perspective(400px); }\n  30% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutX {\n  animation-duration: 0.75s;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important; }\n\n@keyframes flipOutY {\n  from {\n    transform: perspective(400px); }\n  30% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutY {\n  animation-duration: 0.75s;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipOutY; }\n\n@keyframes lightSpeedIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    transform: skewX(-5deg); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.lightSpeedIn {\n  animation-name: lightSpeedIn;\n  animation-timing-function: ease-out; }\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n.lightSpeedOut {\n  animation-name: lightSpeedOut;\n  animation-timing-function: ease-in; }\n\n@keyframes rotateIn {\n  from {\n    transform-origin: center;\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    transform-origin: center;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateIn {\n  animation-name: rotateIn; }\n\n@keyframes rotateInDownLeft {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    transform-origin: left bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInDownLeft {\n  animation-name: rotateInDownLeft; }\n\n@keyframes rotateInDownRight {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    transform-origin: right bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInDownRight {\n  animation-name: rotateInDownRight; }\n\n@keyframes rotateInUpLeft {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    transform-origin: left bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInUpLeft {\n  animation-name: rotateInUpLeft; }\n\n@keyframes rotateInUpRight {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    transform-origin: right bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInUpRight {\n  animation-name: rotateInUpRight; }\n\n@keyframes rotateOut {\n  from {\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    transform-origin: center;\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n.rotateOut {\n  animation-name: rotateOut; }\n\n@keyframes rotateOutDownLeft {\n  from {\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n.rotateOutDownLeft {\n  animation-name: rotateOutDownLeft; }\n\n@keyframes rotateOutDownRight {\n  from {\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutDownRight {\n  animation-name: rotateOutDownRight; }\n\n@keyframes rotateOutUpLeft {\n  from {\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutUpLeft {\n  animation-name: rotateOutUpLeft; }\n\n@keyframes rotateOutUpRight {\n  from {\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n.rotateOutUpRight {\n  animation-name: rotateOutUpRight; }\n\n@keyframes hinge {\n  0% {\n    transform-origin: top left;\n    animation-timing-function: ease-in-out; }\n  20%,\n  60% {\n    transform: rotate3d(0, 0, 1, 80deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out; }\n  40%,\n  80% {\n    transform: rotate3d(0, 0, 1, 60deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n.hinge {\n  animation-duration: 2s;\n  animation-name: hinge; }\n\n@keyframes jackInTheBox {\n  from {\n    opacity: 0;\n    transform: scale(0.1) rotate(30deg);\n    transform-origin: center bottom; }\n  50% {\n    transform: rotate(-10deg); }\n  70% {\n    transform: rotate(3deg); }\n  to {\n    opacity: 1;\n    transform: scale(1); } }\n\n.jackInTheBox {\n  animation-name: jackInTheBox; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.rollIn {\n  animation-name: rollIn; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n.rollOut {\n  animation-name: rollOut; }\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n.zoomIn {\n  animation-name: zoomIn; }\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInDown {\n  animation-name: zoomInDown; }\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInLeft {\n  animation-name: zoomInLeft; }\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInRight {\n  animation-name: zoomInRight; }\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInUp {\n  animation-name: zoomInUp; }\n\n@keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n.zoomOut {\n  animation-name: zoomOut; }\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutDown {\n  animation-name: zoomOutDown; }\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center; } }\n\n.zoomOutLeft {\n  animation-name: zoomOutLeft; }\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center; } }\n\n.zoomOutRight {\n  animation-name: zoomOutRight; }\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutUp {\n  animation-name: zoomOutUp; }\n\n@keyframes slideInDown {\n  from {\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInDown {\n  animation-name: slideInDown; }\n\n@keyframes slideInLeft {\n  from {\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInLeft {\n  animation-name: slideInLeft; }\n\n@keyframes slideInRight {\n  from {\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInRight {\n  animation-name: slideInRight; }\n\n@keyframes slideInUp {\n  from {\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInUp {\n  animation-name: slideInUp; }\n\n@keyframes slideOutDown {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, 100%, 0); } }\n\n.slideOutDown {\n  animation-name: slideOutDown; }\n\n@keyframes slideOutLeft {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(-100%, 0, 0); } }\n\n.slideOutLeft {\n  animation-name: slideOutLeft; }\n\n@keyframes slideOutRight {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(100%, 0, 0); } }\n\n.slideOutRight {\n  animation-name: slideOutRight; }\n\n@keyframes slideOutUp {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, -100%, 0); } }\n\n.slideOutUp {\n  animation-name: slideOutUp; }\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n\n.animated.infinite {\n  animation-iteration-count: infinite; }\n\n.animated.delay-1s {\n  animation-delay: 1s; }\n\n.animated.delay-2s {\n  animation-delay: 2s; }\n\n.animated.delay-3s {\n  animation-delay: 3s; }\n\n.animated.delay-4s {\n  animation-delay: 4s; }\n\n.animated.delay-5s {\n  animation-delay: 5s; }\n\n.animated.fast {\n  animation-duration: 800ms; }\n\n.animated.faster {\n  animation-duration: 500ms; }\n\n.animated.slow {\n  animation-duration: 2s; }\n\n.animated.slower {\n  animation-duration: 3s; }\n\n@media (prefers-reduced-motion) {\n  .animated {\n    animation: unset !important;\n    transition: none !important; } }\n\n.rvb {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100%;\n  width: 100%;\n  background: linear-gradient(273deg, rgba(255, 0, 0, 0.2), rgba(173, 216, 230, 0.5), rgba(255, 0, 0, 0.2), rgba(173, 216, 230, 0.5), rgba(173, 216, 230, 0.5));\n  background-size: 1000% 1000%;\n  animation: backgroundAnimation 12s ease infinite; }\n\n@keyframes backgroundAnimation {\n  0% {\n    background-position: 0% 19%; }\n  50% {\n    background-position: 100% 82%; }\n  100% {\n    background-position: 0% 19%; } }\n  .rvb .rvb-countdown {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-align: center;\n        align-items: center;\n    margin: auto;\n    width: 100%;\n    animation-duration: 2000ms;\n    animation-fill-mode: both;\n    animation-name: zoomIn; }\n    .rvb .rvb-countdown .rvb-countdown-title {\n      margin-top: 0;\n      font-size: 5em; }\n      .rvb .rvb-countdown .rvb-countdown-title .smaller {\n        font-size: 0.5em;\n        color: #738694; }\n    .rvb .rvb-countdown .rvb-countdown-columns-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n          flex-direction: row;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: auto;\n      width: 100%; }\n    .rvb .rvb-countdown .rvb-countdown-column {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n          flex-direction: column;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: auto 10px; }\n    .rvb .rvb-countdown .rvb-countdown-center-column {\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n    .rvb .rvb-countdown .rvb-countdown-side-column {\n      width: 250px;\n      text-align: center; }\n    .rvb .rvb-countdown .rvb-player-phone {\n      position: relative;\n      animation: movePhone 15s;\n      animation-iteration-count: infinite;\n      animation-direction: alternate-reverse;\n      margin: 10px; }\n  .rvb .rvb-instructions {\n    font-size: 1.5em; }\n  .rvb .rvb-play {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    -ms-flex-align: center;\n        align-items: center;\n    animation-duration: 500ms;\n    animation-fill-mode: both;\n    animation-name: bounceInRight; }\n  .rvb .rvb-team {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    text-align: center;\n    height: 100%;\n    display: -ms-flexbox;\n    display: flex; }\n    .rvb .rvb-team.rvb-red {\n      background: red; }\n    .rvb .rvb-team.rvb-blue {\n      background: lightblue; }\n    .rvb .rvb-team .rvb-score-container {\n      margin: auto; }\n      .rvb .rvb-team .rvb-score-container .rvb-team-name {\n        font-size: 3em; }\n      .rvb .rvb-team .rvb-score-container .rvb-team-points {\n        font-size: 15em;\n        margin: 0.25em;\n        animation-duration: 1s;\n        animation-fill-mode: both; }\n  .rvb .rvb-timer {\n    position: absolute;\n    font-size: 2em;\n    left: 0;\n    right: 0;\n    text-align: center;\n    bottom: 1em; }\n  .rvb .rvb-instructions {\n    position: absolute;\n    left: 0;\n    right: 0;\n    text-align: center;\n    top: 1em; }\n  .rvb .rvb-ended {\n    width: 100%;\n    height: 100%;\n    display: -ms-flexbox;\n    display: flex;\n    animation-duration: 2000ms;\n    animation-fill-mode: both;\n    animation-name: fadeIn; }\n    .rvb .rvb-ended.rvb-win-blue {\n      background: lightblue; }\n    .rvb .rvb-ended.rvb-win-red {\n      background: red; }\n    .rvb .rvb-ended .rvb-tie-indicator {\n      font-size: 5em; }\n    .rvb .rvb-ended .rvb-tie-score {\n      font-size: 2em; }\n      .rvb .rvb-ended .rvb-tie-score .rvb-tie-points {\n        animation-duration: 1s;\n        animation-fill-mode: both;\n        display: inline-block;\n        font-weight: bold; }\n    .rvb .rvb-ended .rvb-tie-incredible {\n      font-size: 2em; }\n    .rvb .rvb-ended .rvb-ended-container {\n      margin: auto;\n      text-align: center; }\n    .rvb .rvb-ended .rvb-winner-score-container {\n      font-size: 6em;\n      font-weight: bold;\n      text-align: center;\n      display: inline-block;\n      position: relative;\n      animation-duration: 1000ms;\n      animation-fill-mode: both; }\n    .rvb .rvb-ended .rvb-loser-score-container {\n      text-align: center;\n      font-size: 2em; }\n    .rvb .rvb-ended .rvb-loser-score {\n      font-weight: bold; }\n    .rvb .rvb-ended .rvb-winner-banner {\n      font-size: 4em;\n      margin-bottom: 0; }\n\n@keyframes movePhone {\n  0% {\n    left: 0;\n    top: 0; }\n  20% {\n    left: 15px;\n    top: 7px; }\n  40% {\n    left: 2px;\n    top: -12px; }\n  60% {\n    left: -15px;\n    top: -7px; }\n  80% {\n    left: -8px;\n    top: 12px; }\n  100% {\n    left: 0;\n    top: 0; } }\n\n.rvb-user {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px;\n  font-size: 1.5em; }\n\n.rvb-user-team-red {\n  background: red; }\n\n.rvb-user-team-blue {\n  background: lightblue; }\n\n.rvb-user-countdown {\n  text-align: center; }\n  .rvb-user-countdown h1 {\n    font-size: 3em; }\n  .rvb-user-countdown p {\n    margin: 3em 0; }\n  .rvb-user-countdown .rvb-user-countdown-indicator {\n    margin-top: 1em;\n    font-weight: bold; }\n\n.rvb-user-tap-collector {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  padding: 20px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  font-size: 0.6666667em;\n  -ms-flex-direction: column;\n      flex-direction: column; }\n  .rvb-user-tap-collector .rvb-user-tap-instructions {\n    margin: 1em; }\n  .rvb-user-tap-collector:active .rvb-user-tap-button {\n    top: 5px;\n    left: 5px;\n    box-shadow: 0 0 0 0 transparent; }\n\n.rvb-user-tap-button {\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-size: 7em;\n  width: 3em;\n  height: 3em;\n  background-color: white;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  border-radius: 3em;\n  box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.5);\n  position: relative;\n  top: 0;\n  left: 0;\n  transition: all 0.1s; }\n\n.rvb-user-ended {\n  margin: auto;\n  text-align: center;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column; }\n  .rvb-user-ended h1 {\n    font-size: 3em;\n    margin-top: -1em; }\n  .rvb-user-ended .rvb-user-ended-contribution-container {\n    margin-top: 20px; }\n  .rvb-user-ended .rvb-user-ended-matchup {\n    font-size: 3em; }\n\n.rvb-points {\n  font-weight: bold;\n  position: relative;\n  animation-duration: 1s;\n  animation-fill-mode: both;\n  display: inline-block; }\n\n* {\n  box-sizing: border-box; }\n\nhtml {\n  overflow: hidden;\n  font-family: Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, serif !important; }\n\n.confetti-container {\n  position: absolute;\n  width: 100%;\n  height: 110%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none; }\n\n.confetti {\n  position: absolute;\n  animation-duration: 15s;\n  animation-name: confettiFloatDown;\n  animation-timing-function: easeIn; }\n\n@keyframes confettiFloatDown {\n  from {\n    top: 0;\n    left: 0; }\n  to {\n    top: 140%;\n    left: 10%; } }\n\n.landing-page-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px;\n  background: #93ece4; }\n  .landing-page-container .landing-page-header {\n    text-align: center;\n    font-size: 3em; }\n  .landing-page-container .landing-page-name-prefix {\n    color: #738694;\n    font-size: 0.75em;\n    font-weight: normal;\n    display: block; }\n  .landing-page-container .landing-page-name {\n    display: block;\n    margin-top: 1em;\n    color: #d9822b; }\n  .landing-page-container .landing-page-player-count-indicator {\n    margin: 1em;\n    font-size: 2em;\n    color: #10161a; }\n    .landing-page-container .landing-page-player-count-indicator .landing-page-player-count {\n      font-size: 1.25em;\n      font-weight: bold; }\n  .landing-page-container .landing-page-join-container {\n    position: fixed;\n    bottom: 20px;\n    left: 20px;\n    right: 20px;\n    z-index: 1; }\n  .landing-page-container .landing-page-join {\n    display: block;\n    padding: 50px;\n    font-size: 2em;\n    border-radius: 2px;\n    background: #ffffff;\n    box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.25);\n    position: relative;\n    top: 0;\n    left: 0;\n    transition: all 0.1s;\n    text-align: center;\n    text-decoration: none;\n    color: #10161a; }\n    .landing-page-container .landing-page-join:active {\n      top: 5px;\n      left: 5px;\n      box-shadow: 0 0 0 0 transparent; }\n\n.event-page-display-container {\n  display: -ms-flexbox;\n  display: flex;\n  height: 100vh; }\n", ""]);

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
        return (React.createElement(React.Fragment, null,
            React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement(Routes, null))));
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

/***/ "./src/common/confetti.ts":
/*!********************************!*\
  !*** ./src/common/confetti.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// https://codepen.io/anon/pen/JMOQzE
const confettis = [];
function addConfetti() {
    let width = Math.random() * 8 * 2;
    let height = width * 0.4;
    let colourIdx = Math.ceil(Math.random() * 4);
    let color = "green";
    switch (colourIdx) {
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "blue";
            break;
        case 3:
            color = "red";
            break;
        default:
            color = "green";
    }
    const container = document.createElement("div");
    container.className = "confetti-container";
    container.style.top = `${Math.random() * -10}%`;
    container.style.left = `${Math.random() * 110 - 10}%`;
    const div = document.createElement("div");
    div.className = "confetti";
    div.style.backgroundColor = color;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(div);
    document.body.appendChild(container);
    confettis.push(container);
    setTimeout(() => {
        document.body.removeChild(container);
    }, 20000);
}
exports.addConfetti = addConfetti;


/***/ }),

/***/ "./src/common/randomAnimate.ts":
/*!*************************************!*\
  !*** ./src/common/randomAnimate.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ANIMATION_NAMES = ["bounce", "tada", "swing", "rubberBand"];
exports.randomAnimate = (ref) => {
    if (ref != null) {
        const id = setInterval(() => {
            if (!document.body.contains(ref)) {
                clearInterval(id);
            }
            else {
                const animName = ANIMATION_NAMES[Math.floor(Math.random() * ANIMATION_NAMES.length)];
                ref.classList.add(animName);
                setTimeout(() => {
                    ref.classList.remove(animName);
                }, 1000);
            }
        }, 3000);
    }
};


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
        gameId: Math.random().toString(16).substr(2),
        bluePoints: 0,
        gameDuration: (1 * 60 + 30) * 1000,
        redPoints: 0,
        timeGameStart: Date.now() + 20 * 1000,
        type: "redvsblue",
    };
}
function createRedVsBlueUsers(userIds, existingUsers) {
    let numRed = 0, numBlue = 0;
    for (const userId in existingUsers) {
        const user = existingUsers[userId];
        user.state.team === "red" ? numRed++ : numBlue++;
    }
    const newUsers = {};
    for (const id of userIds) {
        const team = numRed > numBlue ? "blue" :
            numBlue > numRed ? "red" :
                Math.random() < 0.5 ? "red" : "blue";
        newUsers[id] = {
            state: {
                team: team,
            },
        };
        if (team === "red") {
            numRed++;
        }
        else {
            numBlue++;
        }
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
                return React.createElement(redVsBlue_1.RedVsBlue, { gameState: this.props.gameState, users: this.props.users });
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
const confetti_1 = __webpack_require__(/*! ../common/confetti */ "./src/common/confetti.ts");
const randomAnimate_1 = __webpack_require__(/*! ../common/randomAnimate */ "./src/common/randomAnimate.ts");
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
        const { gameState, users } = this.props;
        // game hasn't started yet, show a countdown timer
        if (this.state.currentTime < gameState.timeGameStart) {
            const playersConnected = Object.keys(users || {}).length;
            const playersElements = [];
            if (users != null) {
                for (const userId in users) {
                    const user = users[userId];
                    const url = user.state.team === "red" ? "/assets/tap_red.png" : "/assets/tap_blue.png";
                    const rand = (userId.charCodeAt(0) * userId.charCodeAt(1) * userId.charCodeAt(2) * 59123021) % 511 / 511;
                    const el = React.createElement("img", { className: "rvb-player-phone", style: { animationDelay: `${-rand * 15}s` }, key: userId, src: url, width: "100px" });
                    playersElements.push(el);
                }
            }
            const playersConnectedElement = playersConnected > 0 ? React.createElement("p", null,
                playersConnected,
                " players connected.") : React.createElement("h1", null,
                "Join by visiting ",
                React.createElement("a", { href: "" }, "polyphone.io"),
                " on your phone!");
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (React.createElement("div", { className: "rvb-countdown" },
                React.createElement("h1", { className: "rvb-countdown-title" },
                    React.createElement("span", { className: "smaller" }, "Next Up:"),
                    " Red vs Blue"),
                React.createElement("div", { className: "rvb-countdown-columns-container" },
                    React.createElement("div", { className: "rvb-countdown-column rvb-countdown-side-column" },
                        React.createElement("img", { className: "qr-small", src: "/assets/qr-code.png", width: "200px" }),
                        React.createElement("p", null,
                            "Join by visiting ",
                            React.createElement("a", { href: "" }, "polyphone.io"),
                            " on your phone!")),
                    React.createElement("div", { className: "rvb-countdown-column rvb-countdown-center-column" },
                        React.createElement("div", null, playersElements),
                        playersConnectedElement,
                        React.createElement("p", { className: "rvb-countdown-instructions" },
                            React.createElement("ul", null,
                                React.createElement("li", null, "Tap your screen to earn points for your team."),
                                React.createElement("li", null, "Rounds last 90 seconds."),
                                React.createElement("li", null, "Most points wins!"))),
                        React.createElement("h1", { className: "rvb-countdown-indicator" },
                            "Starts in ",
                            React.createElement("span", { className: "rvb-countdown-time" }, Math.ceil(millisRemaining / 1000)),
                            "...")),
                    React.createElement("div", { className: "rvb-countdown-column rvb-countdown-side-column" },
                        React.createElement("img", { className: "qr-small", src: "/assets/qr-code.png", width: "200px" }),
                        React.createElement("p", null,
                            "Join by visiting ",
                            React.createElement("a", { href: "" }, "polyphone.io"),
                            " on your phone!")))));
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            const millisRemaining = gameState.timeGameStart + gameState.gameDuration - this.state.currentTime;
            return (React.createElement("div", { className: "rvb-play" },
                React.createElement("p", { className: "rvb-instructions" }, "Tap your screen!"),
                React.createElement("div", { className: "rvb-team rvb-red" },
                    React.createElement("div", { className: "rvb-score-container" },
                        React.createElement("h1", { className: "rvb-team-name" }, "Red"),
                        React.createElement("h2", { className: "rvb-team-points", ref: randomAnimate_1.randomAnimate }, gameState.redPoints))),
                React.createElement("div", { className: "rvb-team rvb-blue" },
                    React.createElement("div", { className: "rvb-score-container" },
                        React.createElement("h1", { className: "rvb-team-name" }, "Blue"),
                        React.createElement("h2", { className: "rvb-team-points", ref: randomAnimate_1.randomAnimate }, gameState.bluePoints))),
                React.createElement("div", { className: "rvb-timer" },
                    (new Date(millisRemaining).toISOString().substring(14, 19)),
                    " remaining")));
        }
        // game ended
        else {
            confetti_1.addConfetti();
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
                    React.createElement("div", { className: "rvb-ended-container" },
                        React.createElement("h1", { className: "rvb-tie-indicator" }, "It's a tie!"),
                        React.createElement("p", { className: "rvb-tie-score" },
                            "Both teams scored ",
                            React.createElement("span", { className: "rvb-tie-points", ref: randomAnimate_1.randomAnimate },
                                result.points,
                                " points"),
                            "! Incredible!"))));
            }
            else {
                const className = classnames_1.default("rvb-ended", {
                    "rvb-win-red": result.winningTeam === "Red",
                    "rvb-win-blue": result.winningTeam === "Blue",
                });
                return (React.createElement("div", { className: className },
                    React.createElement("div", { className: "rvb-ended-container" },
                        React.createElement("h1", { className: "rvb-winner-banner" },
                            result.winningTeam,
                            " team wins!"),
                        React.createElement("h2", { className: "rvb-winner-score-container animated", ref: randomAnimate_1.randomAnimate },
                            React.createElement("span", { className: "rvb-winner-score" }, result.winningPoints),
                            " points!"),
                        React.createElement("div", { className: "rvb-loser-score-container" },
                            React.createElement("span", { className: "rvb-loser" }, result.losingTeam),
                            " team ",
                            React.createElement("span", { className: "rvb-loser-score" }, result.losingPoints),
                            " points! Nice try!"))));
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
const confetti_1 = __webpack_require__(/*! ../common/confetti */ "./src/common/confetti.ts");
const randomAnimate_1 = __webpack_require__(/*! ../common/randomAnimate */ "./src/common/randomAnimate.ts");
class RedvsBlueUser extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: Date.now(),
            numTaps: 0,
        };
        this.buttonRef = null;
        this.handleButtonRef = (ref) => {
            this.buttonRef = ref;
        };
        this.handleTouch = (e) => {
            e.preventDefault();
            // if (this.buttonRef) {
            // addConfetti(this.buttonRef);
            // }
            this.setState({
                numTaps: this.state.numTaps + 1,
            });
            this.myTeamPointsRef.transaction((val) => {
                return val + 1;
            });
            return false;
        };
        const myTeamPointsRefUrl = props.user.state.team === "red" ? "redPoints" : "bluePoints";
        this.myTeamPointsRef = props.gameStateRef.child(myTeamPointsRefUrl);
    }
    componentDidUpdate() {
        const props = this.props;
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
            return (React.createElement("div", { className: "rvb-user-countdown animated bounceIn" },
                React.createElement("h3", null, "Red vs Blue"),
                React.createElement("h1", null,
                    "You are on ",
                    this.props.user.state.team,
                    " team!"),
                React.createElement("p", null, "Tap your screen as fast as possible to earn points for your team. Most points wins!"),
                React.createElement("div", { className: "rvb-user-countdown-indicator" },
                    "Starting in ",
                    Math.ceil(millisRemaining / 1000),
                    "...")));
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            return (React.createElement("div", { className: "rvb-user-tap-collector animated slideInRight", onTouchStart: this.handleTouch },
                React.createElement("h1", { className: "rvb-user-tap-instructions" }, "Tap to earn points!"),
                React.createElement("div", { className: "rvb-user-tap-button", ref: this.handleButtonRef }, this.state.numTaps)));
        }
        // game ended
        else {
            const yourTeamPoints = user.state.team === "red" ? gameState.redPoints : gameState.bluePoints;
            const otherTeamPoints = user.state.team === "red" ? gameState.bluePoints : gameState.redPoints;
            if (yourTeamPoints === otherTeamPoints) {
                return (React.createElement("div", { className: "rvb-user-ended rvb-user-tie animated fadeIn" },
                    React.createElement("h1", null, "It's a tie!"),
                    React.createElement("p", null,
                        "Holy moly! Both teams scored ",
                        React.createElement("span", { className: "rvb-points" },
                            yourTeamPoints,
                            " points!")),
                    React.createElement("div", { className: "rvb-user-ended-contribution-container" },
                        "You contributed ",
                        React.createElement("span", { className: "rvb-points" },
                            this.state.numTaps,
                            " points!"))));
            }
            else {
                const won = yourTeamPoints > otherTeamPoints;
                const result = won ? "won!" : "lost :(";
                if (won && Math.random() < 0.2) { // reduce confetti on mobile
                    confetti_1.addConfetti();
                }
                return (React.createElement("div", { className: "rvb-user-ended animated fadeIn" },
                    React.createElement("h1", null,
                        "Your team ",
                        result),
                    React.createElement("p", { className: "rvb-user-ended-matchup" },
                        React.createElement("span", { className: "rvb-points", ref: randomAnimate_1.randomAnimate }, yourTeamPoints),
                        " to ",
                        React.createElement("span", { className: "rvb-points", ref: randomAnimate_1.randomAnimate }, otherTeamPoints)),
                    React.createElement("div", { className: "rvb-user-ended-contribution-container" },
                        "You contributed ",
                        React.createElement("span", { className: "rvb-points" },
                            this.state.numTaps,
                            " points!"))));
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
            React.createElement("div", { className: "landing-page-join-container" },
                React.createElement(react_router_dom_1.Link, { to: "/event/gais2018/play", className: "landing-page-join" }, "Join"))));
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
        window.addEventListener("beforeunload", () => {
            this.userRef.remove();
        });
        window.addEventListener("blur", () => {
            this.userRef.remove();
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
        return React.createElement(userState_1.UserState, { key: gameState.gameId, gameStateRef: this.gameStateRef, gameState: gameState, user: user });
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
        return React.createElement(gameState_1.GameState, { key: event.gameState.gameId, gameState: event.gameState, users: event.users });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9jb25mZXR0aS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3JhbmRvbUFuaW1hdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9yZXN0L21vbmtleXBhdGNoVGhyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL2dhbWVTdGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZVVzZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5zY3NzPzFjM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZUZpcmViYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRMYW5kaW5nUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ldmVudFBhZ2VDbGllbnQudHN4Iiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRQYWdlRGlzcGxheS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ob21lUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXIvdXNlcklkLnRzIiwid2VicGFjazovLy8uL3NyYy91c2VyL3VzZXJTdGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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c3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNTQ3NmJkMjlkYTYxN2E0YzFjYzNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC50c3hcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuYm9keSB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7IH1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgLyogMSAqL1xcbiAgaGVpZ2h0OiAwO1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAvKiAyICovIH1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlOyB9XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07IH1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07IH1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7IH1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7XFxuICAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIG1hcmdpbjogMDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuYnV0dG9uLFxcbmlucHV0IHtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDsgfVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07IH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICAvKiAxICovIH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBwYWRkaW5nOiAwO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbiAgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxuICAvKiAxICovXFxuICBmb250OiBpbmhlcml0O1xcbiAgLyogMiAqLyB9XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07IH1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4vKiFcXG4gKiBhbmltYXRlLmNzcyAtaHR0cDovL2RhbmVkZW4ubWUvYW5pbWF0ZVxcbiAqIFZlcnNpb24gLSAzLjcuMFxcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcXG4gKlxcbiAqIENvcHlyaWdodCAoYykgMjAxOCBEYW5pZWwgRWRlblxcbiAqL1xcblxcbkBrZXlmcmFtZXMgYm91bmNlIHtcXG4gIGZyb20sXFxuICAyMCUsXFxuICA1MyUsXFxuICA4MCUsXFxuICB0byB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICA0MCUsXFxuICA0MyUge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMzBweCwgMCk7IH1cXG4gIDcwJSB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xNXB4LCAwKTsgfVxcbiAgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtNHB4LCAwKTsgfSB9XFxuXFxuLmJvdW5jZSB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTsgfVxcblxcbkBrZXlmcmFtZXMgZmxhc2gge1xcbiAgZnJvbSxcXG4gIDUwJSxcXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMjUlLFxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmZsYXNoIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmbGFzaDsgfVxcblxcbi8qIG9yaWdpbmFsbHkgYXV0aG9yZWQgYnkgTmljayBQZXR0aXQgLSBodHRwczovL2dpdGh1Yi5jb20vbmlja3BldHRpdC9nbGlkZSAqL1xcblxcbkBrZXlmcmFtZXMgcHVsc2Uge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMDUsIDEuMDUsIDEuMDUpOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfSB9XFxuXFxuLnB1bHNlIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBwdWxzZTsgfVxcblxcbkBrZXlmcmFtZXMgcnViYmVyQmFuZCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9XFxuICAzMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMS4yNSwgMC43NSwgMSk7IH1cXG4gIDQwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjc1LCAxLjI1LCAxKTsgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMTUsIDAuODUsIDEpOyB9XFxuICA2NSUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC45NSwgMS4wNSwgMSk7IH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjA1LCAwLjk1LCAxKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH0gfVxcblxcbi5ydWJiZXJCYW5kIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBydWJiZXJCYW5kOyB9XFxuXFxuQGtleWZyYW1lcyBzaGFrZSB7XFxuICBmcm9tLFxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICAxMCUsXFxuICAzMCUsXFxuICA1MCUsXFxuICA3MCUsXFxuICA5MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTsgfVxcbiAgMjAlLFxcbiAgNDAlLFxcbiAgNjAlLFxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTsgfSB9XFxuXFxuLnNoYWtlIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzaGFrZTsgfVxcblxcbkBrZXlmcmFtZXMgaGVhZFNoYWtlIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9XFxuICA2LjUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC02cHgpIHJvdGF0ZVkoLTlkZWcpOyB9XFxuICAxOC41JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1cHgpIHJvdGF0ZVkoN2RlZyk7IH1cXG4gIDMxLjUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zcHgpIHJvdGF0ZVkoLTVkZWcpOyB9XFxuICA0My41JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgycHgpIHJvdGF0ZVkoM2RlZyk7IH1cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuLmhlYWRTaGFrZSB7XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcXG4gIGFuaW1hdGlvbi1uYW1lOiBoZWFkU2hha2U7IH1cXG5cXG5Aa2V5ZnJhbWVzIHN3aW5nIHtcXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgMTVkZWcpOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC0xMGRlZyk7IH1cXG4gIDYwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgNWRlZyk7IH1cXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgLTVkZWcpOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgMGRlZyk7IH0gfVxcblxcbi5zd2luZyB7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xcbiAgYW5pbWF0aW9uLW5hbWU6IHN3aW5nOyB9XFxuXFxuQGtleWZyYW1lcyB0YWRhIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH1cXG4gIDEwJSxcXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjksIDAuOSwgMC45KSByb3RhdGUzZCgwLCAwLCAxLCAtM2RlZyk7IH1cXG4gIDMwJSxcXG4gIDUwJSxcXG4gIDcwJSxcXG4gIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKSByb3RhdGUzZCgwLCAwLCAxLCAzZGVnKTsgfVxcbiAgNDAlLFxcbiAgNjAlLFxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMSwgMS4xLCAxLjEpIHJvdGF0ZTNkKDAsIDAsIDEsIC0zZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH0gfVxcblxcbi50YWRhIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB0YWRhOyB9XFxuXFxuLyogb3JpZ2luYWxseSBhdXRob3JlZCBieSBOaWNrIFBldHRpdCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWNrcGV0dGl0L2dsaWRlICovXFxuXFxuQGtleWZyYW1lcyB3b2JibGUge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH1cXG4gIDE1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTI1JSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgLTVkZWcpOyB9XFxuICAzMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDIwJSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgM2RlZyk7IH1cXG4gIDQ1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTE1JSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgLTNkZWcpOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwJSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgMmRlZyk7IH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTUlLCAwLCAwKSByb3RhdGUzZCgwLCAwLCAxLCAtMWRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLndvYmJsZSB7XFxuICBhbmltYXRpb24tbmFtZTogd29iYmxlOyB9XFxuXFxuQGtleWZyYW1lcyBqZWxsbyB7XFxuICBmcm9tLFxcbiAgMTEuMSUsXFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH1cXG4gIDIyLjIlIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgtMTIuNWRlZykgc2tld1koLTEyLjVkZWcpOyB9XFxuICAzMy4zJSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goNi4yNWRlZykgc2tld1koNi4yNWRlZyk7IH1cXG4gIDQ0LjQlIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgtMy4xMjVkZWcpIHNrZXdZKC0zLjEyNWRlZyk7IH1cXG4gIDU1LjUlIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgxLjU2MjVkZWcpIHNrZXdZKDEuNTYyNWRlZyk7IH1cXG4gIDY2LjYlIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgtMC43ODEyNWRlZykgc2tld1koLTAuNzgxMjVkZWcpOyB9XFxuICA3Ny43JSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMC4zOTA2M2RlZykgc2tld1koMC4zOTA2M2RlZyk7IH1cXG4gIDg4LjglIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgtMC4xOTUzMWRlZykgc2tld1koLTAuMTk1MzFkZWcpOyB9IH1cXG5cXG4uamVsbG8ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGplbGxvO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyOyB9XFxuXFxuQGtleWZyYW1lcyBoZWFydEJlYXQge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XFxuICAxNCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMyk7IH1cXG4gIDI4JSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cXG4gIDQyJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4zKTsgfVxcbiAgNzAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuLmhlYXJ0QmVhdCB7XFxuICBhbmltYXRpb24tbmFtZTogaGVhcnRCZWF0O1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxLjNzO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcXG4gIGZyb20sXFxuICAyMCUsXFxuICA0MCUsXFxuICA2MCUsXFxuICA4MCUsXFxuICB0byB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpOyB9XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjMsIDAuMywgMC4zKTsgfVxcbiAgMjAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMSwgMS4xLCAxLjEpOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC45LCAwLjksIDAuOSk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjAzLCAxLjAzLCAxLjAzKTsgfVxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuOTcsIDAuOTcsIDAuOTcpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfSB9XFxuXFxuLmJvdW5jZUluIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43NXM7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZUluRG93biB7XFxuICBmcm9tLFxcbiAgNjAlLFxcbiAgNzUlLFxcbiAgOTAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsgfVxcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0zMDAwcHgsIDApOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDI1cHgsIDApOyB9XFxuICA3NSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xMHB4LCAwKTsgfVxcbiAgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA1cHgsIDApOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5ib3VuY2VJbkRvd24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluRG93bjsgfVxcblxcbkBrZXlmcmFtZXMgYm91bmNlSW5MZWZ0IHtcXG4gIGZyb20sXFxuICA2MCUsXFxuICA3NSUsXFxuICA5MCUsXFxuICB0byB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpOyB9XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTMwMDBweCwgMCwgMCk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMjVweCwgMCwgMCk7IH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApOyB9XFxuICA5MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDVweCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmJvdW5jZUluTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlSW5MZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VJblJpZ2h0IHtcXG4gIGZyb20sXFxuICA2MCUsXFxuICA3NSUsXFxuICA5MCUsXFxuICB0byB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpOyB9XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgzMDAwcHgsIDAsIDApOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0yNXB4LCAwLCAwKTsgfVxcbiAgNzUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTsgfVxcbiAgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtNXB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uYm91bmNlSW5SaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlSW5SaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgYm91bmNlSW5VcCB7XFxuICBmcm9tLFxcbiAgNjAlLFxcbiAgNzUlLFxcbiAgOTAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsgfVxcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMzAwMHB4LCAwKTsgfVxcbiAgNjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMjBweCwgMCk7IH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTBweCwgMCk7IH1cXG4gIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTVweCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmJvdW5jZUluVXAge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluVXA7IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZU91dCB7XFxuICAyMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC45LCAwLjksIDAuOSk7IH1cXG4gIDUwJSxcXG4gIDU1JSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4zLCAwLjMsIDAuMyk7IH0gfVxcblxcbi5ib3VuY2VPdXQge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjc1cztcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2VPdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZU91dERvd24ge1xcbiAgMjAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAxMHB4LCAwKTsgfVxcbiAgNDAlLFxcbiAgNDUlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMjBweCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAyMDAwcHgsIDApOyB9IH1cXG5cXG4uYm91bmNlT3V0RG93biB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlT3V0RG93bjsgfVxcblxcbkBrZXlmcmFtZXMgYm91bmNlT3V0TGVmdCB7XFxuICAyMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDIwcHgsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTIwMDBweCwgMCwgMCk7IH0gfVxcblxcbi5ib3VuY2VPdXRMZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2VPdXRMZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VPdXRSaWdodCB7XFxuICAyMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0yMHB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDIwMDBweCwgMCwgMCk7IH0gfVxcblxcbi5ib3VuY2VPdXRSaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlT3V0UmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZU91dFVwIHtcXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTEwcHgsIDApOyB9XFxuICA0MCUsXFxuICA0NSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDIwcHgsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTIwMDBweCwgMCk7IH0gfVxcblxcbi5ib3VuY2VPdXRVcCB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlT3V0VXA7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uZmFkZUluIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVJbkRvd24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTEwMCUsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlSW5Eb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5Eb3duOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW5Eb3duQmlnIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0yMDAwcHgsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlSW5Eb3duQmlnIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5Eb3duQmlnOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW5MZWZ0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMDAlLCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluTGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluTGVmdEJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMjAwMHB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluTGVmdEJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluTGVmdEJpZzsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluUmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVJblJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5SaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluUmlnaHRCaWcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMjAwMHB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluUmlnaHRCaWcge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJblJpZ2h0QmlnOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW5VcCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluVXAge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJblVwOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW5VcEJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAyMDAwcHgsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlSW5VcEJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluVXBCaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmZhZGVPdXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVPdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXREb3duIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7IH0gfVxcblxcbi5mYWRlT3V0RG93biB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dERvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXREb3duQmlnIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMjAwMHB4LCAwKTsgfSB9XFxuXFxuLmZhZGVPdXREb3duQmlnIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0RG93bkJpZzsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZU91dExlZnQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCk7IH0gfVxcblxcbi5mYWRlT3V0TGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dExlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRMZWZ0QmlnIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTIwMDBweCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlT3V0TGVmdEJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dExlZnRCaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRSaWdodCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApOyB9IH1cXG5cXG4uZmFkZU91dFJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0UmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRSaWdodEJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDIwMDBweCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlT3V0UmlnaHRCaWcge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVPdXRSaWdodEJpZzsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZU91dFVwIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTEwMCUsIDApOyB9IH1cXG5cXG4uZmFkZU91dFVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0VXA7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRVcEJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0yMDAwcHgsIDApOyB9IH1cXG5cXG4uZmFkZU91dFVwQmlnIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0VXBCaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXAge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHNjYWxlM2QoMSwgMSwgMSkgdHJhbnNsYXRlM2QoMCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgLTM2MGRlZyk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0OyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSBzY2FsZTNkKDEsIDEsIDEpIHRyYW5zbGF0ZTNkKDAsIDAsIDE1MHB4KSByb3RhdGUzZCgwLCAxLCAwLCAtMTkwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7IH1cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHNjYWxlM2QoMSwgMSwgMSkgdHJhbnNsYXRlM2QoMCwgMCwgMTUwcHgpIHJvdGF0ZTNkKDAsIDEsIDAsIC0xNzBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSBzY2FsZTNkKDAuOTUsIDAuOTUsIDAuOTUpIHRyYW5zbGF0ZTNkKDAsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsIDBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHNjYWxlM2QoMSwgMSwgMSkgdHJhbnNsYXRlM2QoMCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgMGRlZyk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW47IH0gfVxcblxcbi5hbmltYXRlZC5mbGlwIHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICBhbmltYXRpb24tbmFtZTogZmxpcDsgfVxcblxcbkBrZXlmcmFtZXMgZmxpcEluWCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMSwgMCwgMCwgOTBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgxLCAwLCAwLCAtMjBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgxLCAwLCAwLCAxMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDEsIDAsIDAsIC01ZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KTsgfSB9XFxuXFxuLmZsaXBJblgge1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBhbmltYXRpb24tbmFtZTogZmxpcEluWDsgfVxcblxcbkBrZXlmcmFtZXMgZmxpcEluWSB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMSwgMCwgOTBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAxLCAwLCAtMjBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAxLCAwLCAxMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDAsIDEsIDAsIC01ZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KTsgfSB9XFxuXFxuLmZsaXBJblkge1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBhbmltYXRpb24tbmFtZTogZmxpcEluWTsgfVxcblxcbkBrZXlmcmFtZXMgZmxpcE91dFgge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpOyB9XFxuICAzMCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgxLCAwLCAwLCAtMjBkZWcpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDEsIDAsIDAsIDkwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmZsaXBPdXRYIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43NXM7XFxuICBhbmltYXRpb24tbmFtZTogZmxpcE91dFg7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGUgIWltcG9ydGFudDtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGUgIWltcG9ydGFudDsgfVxcblxcbkBrZXlmcmFtZXMgZmxpcE91dFkge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpOyB9XFxuICAzMCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAxLCAwLCAtMTVkZWcpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDAsIDEsIDAsIDkwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmZsaXBPdXRZIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43NXM7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGUgIWltcG9ydGFudDtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGUgIWltcG9ydGFudDtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmbGlwT3V0WTsgfVxcblxcbkBrZXlmcmFtZXMgbGlnaHRTcGVlZEluIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApIHNrZXdYKC0zMGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDYwJSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMjBkZWcpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKC01ZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4ubGlnaHRTcGVlZEluIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBsaWdodFNwZWVkSW47XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDsgfVxcblxcbkBrZXlmcmFtZXMgbGlnaHRTcGVlZE91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApIHNrZXdYKDMwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmxpZ2h0U3BlZWRPdXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGxpZ2h0U3BlZWRPdXQ7XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9XFxuXFxuQGtleWZyYW1lcyByb3RhdGVJbiB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC0yMDBkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnJvdGF0ZUluIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVJbjsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlSW5Eb3duTGVmdCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgLTQ1ZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnJvdGF0ZUluRG93bkxlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZUluRG93bkxlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZUluRG93blJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgNDVkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnJvdGF0ZUluRG93blJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVJbkRvd25SaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlSW5VcExlZnQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDQ1ZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnJvdGF0ZUluVXBMZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVJblVwTGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlSW5VcFJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgLTkwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5yb3RhdGVJblVwUmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZUluVXBSaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDIwMGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5yb3RhdGVPdXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZU91dDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlT3V0RG93bkxlZnQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgYm90dG9tO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDQ1ZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLnJvdGF0ZU91dERvd25MZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVPdXREb3duTGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlT3V0RG93blJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC00NWRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5yb3RhdGVPdXREb3duUmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZU91dERvd25SaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlT3V0VXBMZWZ0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAtNDVkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4ucm90YXRlT3V0VXBMZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVPdXRVcExlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZU91dFVwUmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGJvdHRvbTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgOTBkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4ucm90YXRlT3V0VXBSaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlT3V0VXBSaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgaGluZ2Uge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7IH1cXG4gIDIwJSxcXG4gIDYwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgODBkZWcpO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7IH1cXG4gIDQwJSxcXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgNjBkZWcpO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA3MDBweCwgMCk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5oaW5nZSB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xcbiAgYW5pbWF0aW9uLW5hbWU6IGhpbmdlOyB9XFxuXFxuQGtleWZyYW1lcyBqYWNrSW5UaGVCb3gge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4xKSByb3RhdGUoMzBkZWcpO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tOyB9XFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTBkZWcpOyB9XFxuICA3MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzZGVnKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG4uamFja0luVGhlQm94IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBqYWNrSW5UaGVCb3g7IH1cXG5cXG4vKiBvcmlnaW5hbGx5IGF1dGhvcmVkIGJ5IE5pY2sgUGV0dGl0IC0gaHR0cHM6Ly9naXRodWIuY29tL25pY2twZXR0aXQvZ2xpZGUgKi9cXG5cXG5Aa2V5ZnJhbWVzIHJvbGxJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgLTEyMGRlZyk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLnJvbGxJbiB7XFxuICBhbmltYXRpb24tbmFtZTogcm9sbEluOyB9XFxuXFxuLyogb3JpZ2luYWxseSBhdXRob3JlZCBieSBOaWNrIFBldHRpdCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWNrcGV0dGl0L2dsaWRlICovXFxuXFxuQGtleWZyYW1lcyByb2xsT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgMTIwZGVnKTsgfSB9XFxuXFxuLnJvbGxPdXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvbGxPdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21JbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMywgMC4zLCAwLjMpOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uem9vbUluIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21JbkRvd24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjEsIDAuMSwgMC4xKSB0cmFuc2xhdGUzZCgwLCAtMTAwMHB4LCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNTUsIDAuMDU1LCAwLjY3NSwgMC4xOSk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCgwLCA2MHB4LCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMSk7IH0gfVxcblxcbi56b29tSW5Eb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tSW5Eb3duOyB9XFxuXFxuQGtleWZyYW1lcyB6b29tSW5MZWZ0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4xLCAwLjEsIDAuMSkgdHJhbnNsYXRlM2QoLTEwMDBweCwgMCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLjA1NSwgMC42NzUsIDAuMTkpOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEpOyB9IH1cXG5cXG4uem9vbUluTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbUluTGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgem9vbUluUmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjEsIDAuMSwgMC4xKSB0cmFuc2xhdGUzZCgxMDAwcHgsIDAsIDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5KTsgfVxcbiAgNjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuNDc1LCAwLjQ3NSwgMC40NzUpIHRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMSk7IH0gfVxcblxcbi56b29tSW5SaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbUluUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21JblVwIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4xLCAwLjEsIDAuMSkgdHJhbnNsYXRlM2QoMCwgMTAwMHB4LCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNTUsIDAuMDU1LCAwLjY3NSwgMC4xOSk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCgwLCAtNjBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEpOyB9IH1cXG5cXG4uem9vbUluVXAge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21JblVwOyB9XFxuXFxuQGtleWZyYW1lcyB6b29tT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4zLCAwLjMsIDAuMyk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLnpvb21PdXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21PdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21PdXREb3duIHtcXG4gIDQwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCgwLCAtNjBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLjA1NSwgMC42NzUsIDAuMTkpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjEsIDAuMSwgMC4xKSB0cmFuc2xhdGUzZCgwLCAyMDAwcHgsIDApO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxKTsgfSB9XFxuXFxuLnpvb21PdXREb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tT3V0RG93bjsgfVxcblxcbkBrZXlmcmFtZXMgem9vbU91dExlZnQge1xcbiAgNDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuNDc1LCAwLjQ3NSwgMC40NzUpIHRyYW5zbGF0ZTNkKDQycHgsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4xKSB0cmFuc2xhdGUzZCgtMjAwMHB4LCAwLCAwKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7IH0gfVxcblxcbi56b29tT3V0TGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbU91dExlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21PdXRSaWdodCB7XFxuICA0MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoLTQycHgsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4xKSB0cmFuc2xhdGUzZCgyMDAwcHgsIDAsIDApO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7IH0gfVxcblxcbi56b29tT3V0UmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21PdXRSaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgem9vbU91dFVwIHtcXG4gIDQwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCgwLCA2MHB4LCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNTUsIDAuMDU1LCAwLjY3NSwgMC4xOSk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMSwgMC4xLCAwLjEpIHRyYW5zbGF0ZTNkKDAsIC0yMDAwcHgsIDApO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxKTsgfSB9XFxuXFxuLnpvb21PdXRVcCB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbU91dFVwOyB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZUluRG93biB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTAwJSwgMCk7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLnNsaWRlSW5Eb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZUluRG93bjsgfVxcblxcbkBrZXlmcmFtZXMgc2xpZGVJbkxlZnQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApO1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5zbGlkZUluTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVJbkxlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5SaWdodCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uc2xpZGVJblJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZUluUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5VcCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uc2xpZGVJblVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZUluVXA7IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlT3V0RG93biB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7IH0gfVxcblxcbi5zbGlkZU91dERvd24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlT3V0RG93bjsgfVxcblxcbkBrZXlmcmFtZXMgc2xpZGVPdXRMZWZ0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCk7IH0gfVxcblxcbi5zbGlkZU91dExlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlT3V0TGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgc2xpZGVPdXRSaWdodCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7IH0gfVxcblxcbi5zbGlkZU91dFJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZU91dFJpZ2h0OyB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZU91dFVwIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTAwJSwgMCk7IH0gfVxcblxcbi5zbGlkZU91dFVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZU91dFVwOyB9XFxuXFxuLmFuaW1hdGVkIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyB9XFxuXFxuLmFuaW1hdGVkLmluZmluaXRlIHtcXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlOyB9XFxuXFxuLmFuaW1hdGVkLmRlbGF5LTFzIHtcXG4gIGFuaW1hdGlvbi1kZWxheTogMXM7IH1cXG5cXG4uYW5pbWF0ZWQuZGVsYXktMnMge1xcbiAgYW5pbWF0aW9uLWRlbGF5OiAyczsgfVxcblxcbi5hbmltYXRlZC5kZWxheS0zcyB7XFxuICBhbmltYXRpb24tZGVsYXk6IDNzOyB9XFxuXFxuLmFuaW1hdGVkLmRlbGF5LTRzIHtcXG4gIGFuaW1hdGlvbi1kZWxheTogNHM7IH1cXG5cXG4uYW5pbWF0ZWQuZGVsYXktNXMge1xcbiAgYW5pbWF0aW9uLWRlbGF5OiA1czsgfVxcblxcbi5hbmltYXRlZC5mYXN0IHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogODAwbXM7IH1cXG5cXG4uYW5pbWF0ZWQuZmFzdGVyIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNTAwbXM7IH1cXG5cXG4uYW5pbWF0ZWQuc2xvdyB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDJzOyB9XFxuXFxuLmFuaW1hdGVkLnNsb3dlciB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDNzOyB9XFxuXFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uKSB7XFxuICAuYW5pbWF0ZWQge1xcbiAgICBhbmltYXRpb246IHVuc2V0ICFpbXBvcnRhbnQ7XFxuICAgIHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDsgfSB9XFxuXFxuLnJ2YiB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzNkZWcsIHJnYmEoMjU1LCAwLCAwLCAwLjIpLCByZ2JhKDE3MywgMjE2LCAyMzAsIDAuNSksIHJnYmEoMjU1LCAwLCAwLCAwLjIpLCByZ2JhKDE3MywgMjE2LCAyMzAsIDAuNSksIHJnYmEoMTczLCAyMTYsIDIzMCwgMC41KSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMDAlIDEwMDAlO1xcbiAgYW5pbWF0aW9uOiBiYWNrZ3JvdW5kQW5pbWF0aW9uIDEycyBlYXNlIGluZmluaXRlOyB9XFxuXFxuQGtleWZyYW1lcyBiYWNrZ3JvdW5kQW5pbWF0aW9uIHtcXG4gIDAlIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgMTklOyB9XFxuICA1MCUge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDgyJTsgfVxcbiAgMTAwJSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDE5JTsgfSB9XFxuICAucnZiIC5ydmItY291bnRkb3duIHtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwMG1zO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xcbiAgICBhbmltYXRpb24tbmFtZTogem9vbUluOyB9XFxuICAgIC5ydmIgLnJ2Yi1jb3VudGRvd24gLnJ2Yi1jb3VudGRvd24tdGl0bGUge1xcbiAgICAgIG1hcmdpbi10b3A6IDA7XFxuICAgICAgZm9udC1zaXplOiA1ZW07IH1cXG4gICAgICAucnZiIC5ydmItY291bnRkb3duIC5ydmItY291bnRkb3duLXRpdGxlIC5zbWFsbGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMC41ZW07XFxuICAgICAgICBjb2xvcjogIzczODY5NDsgfVxcbiAgICAucnZiIC5ydmItY291bnRkb3duIC5ydmItY291bnRkb3duLWNvbHVtbnMtY29udGFpbmVyIHtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC5ydmIgLnJ2Yi1jb3VudGRvd24gLnJ2Yi1jb3VudGRvd24tY29sdW1uIHtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgbWFyZ2luOiBhdXRvIDEwcHg7IH1cXG4gICAgLnJ2YiAucnZiLWNvdW50ZG93biAucnZiLWNvdW50ZG93bi1jZW50ZXItY29sdW1uIHtcXG4gICAgICAtbXMtZmxleC1wb3NpdGl2ZTogMTtcXG4gICAgICAgICAgZmxleC1ncm93OiAxOyB9XFxuICAgIC5ydmIgLnJ2Yi1jb3VudGRvd24gLnJ2Yi1jb3VudGRvd24tc2lkZS1jb2x1bW4ge1xcbiAgICAgIHdpZHRoOiAyNTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgLnJ2YiAucnZiLWNvdW50ZG93biAucnZiLXBsYXllci1waG9uZSB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIGFuaW1hdGlvbjogbW92ZVBob25lIDE1cztcXG4gICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gICAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGUtcmV2ZXJzZTtcXG4gICAgICBtYXJnaW46IDEwcHg7IH1cXG4gIC5ydmIgLnJ2Yi1pbnN0cnVjdGlvbnMge1xcbiAgICBmb250LXNpemU6IDEuNWVtOyB9XFxuICAucnZiIC5ydmItcGxheSB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA1MDBtcztcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluUmlnaHQ7IH1cXG4gIC5ydmIgLnJ2Yi10ZWFtIHtcXG4gICAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IDUwJTtcXG4gICAgICAgIGZsZXgtYmFzaXM6IDUwJTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuICAgIC5ydmIgLnJ2Yi10ZWFtLnJ2Yi1yZWQge1xcbiAgICAgIGJhY2tncm91bmQ6IHJlZDsgfVxcbiAgICAucnZiIC5ydmItdGVhbS5ydmItYmx1ZSB7XFxuICAgICAgYmFja2dyb3VuZDogbGlnaHRibHVlOyB9XFxuICAgIC5ydmIgLnJ2Yi10ZWFtIC5ydmItc2NvcmUtY29udGFpbmVyIHtcXG4gICAgICBtYXJnaW46IGF1dG87IH1cXG4gICAgICAucnZiIC5ydmItdGVhbSAucnZiLXNjb3JlLWNvbnRhaW5lciAucnZiLXRlYW0tbmFtZSB7XFxuICAgICAgICBmb250LXNpemU6IDNlbTsgfVxcbiAgICAgIC5ydmIgLnJ2Yi10ZWFtIC5ydmItc2NvcmUtY29udGFpbmVyIC5ydmItdGVhbS1wb2ludHMge1xcbiAgICAgICAgZm9udC1zaXplOiAxNWVtO1xcbiAgICAgICAgbWFyZ2luOiAwLjI1ZW07XFxuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsgfVxcbiAgLnJ2YiAucnZiLXRpbWVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm90dG9tOiAxZW07IH1cXG4gIC5ydmIgLnJ2Yi1pbnN0cnVjdGlvbnMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRvcDogMWVtOyB9XFxuICAucnZiIC5ydmItZW5kZWQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDAwbXM7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW47IH1cXG4gICAgLnJ2YiAucnZiLWVuZGVkLnJ2Yi13aW4tYmx1ZSB7XFxuICAgICAgYmFja2dyb3VuZDogbGlnaHRibHVlOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZC5ydmItd2luLXJlZCB7XFxuICAgICAgYmFja2dyb3VuZDogcmVkOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLXRpZS1pbmRpY2F0b3Ige1xcbiAgICAgIGZvbnQtc2l6ZTogNWVtOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLXRpZS1zY29yZSB7XFxuICAgICAgZm9udC1zaXplOiAyZW07IH1cXG4gICAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi10aWUtc2NvcmUgLnJ2Yi10aWUtcG9pbnRzIHtcXG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gICAgLnJ2YiAucnZiLWVuZGVkIC5ydmItdGllLWluY3JlZGlibGUge1xcbiAgICAgIGZvbnQtc2l6ZTogMmVtOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLWVuZGVkLWNvbnRhaW5lciB7XFxuICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi13aW5uZXItc2NvcmUtY29udGFpbmVyIHtcXG4gICAgICBmb250LXNpemU6IDZlbTtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBhbmltYXRpb24tZHVyYXRpb246IDEwMDBtcztcXG4gICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLWxvc2VyLXNjb3JlLWNvbnRhaW5lciB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMmVtOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLWxvc2VyLXNjb3JlIHtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi13aW5uZXItYmFubmVyIHtcXG4gICAgICBmb250LXNpemU6IDRlbTtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwOyB9XFxuXFxuQGtleWZyYW1lcyBtb3ZlUGhvbmUge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7IH1cXG4gIDIwJSB7XFxuICAgIGxlZnQ6IDE1cHg7XFxuICAgIHRvcDogN3B4OyB9XFxuICA0MCUge1xcbiAgICBsZWZ0OiAycHg7XFxuICAgIHRvcDogLTEycHg7IH1cXG4gIDYwJSB7XFxuICAgIGxlZnQ6IC0xNXB4O1xcbiAgICB0b3A6IC03cHg7IH1cXG4gIDgwJSB7XFxuICAgIGxlZnQ6IC04cHg7XFxuICAgIHRvcDogMTJweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuLnJ2Yi11c2VyIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGZvbnQtc2l6ZTogMS41ZW07IH1cXG5cXG4ucnZiLXVzZXItdGVhbS1yZWQge1xcbiAgYmFja2dyb3VuZDogcmVkOyB9XFxuXFxuLnJ2Yi11c2VyLXRlYW0tYmx1ZSB7XFxuICBiYWNrZ3JvdW5kOiBsaWdodGJsdWU7IH1cXG5cXG4ucnZiLXVzZXItY291bnRkb3duIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgLnJ2Yi11c2VyLWNvdW50ZG93biBoMSB7XFxuICAgIGZvbnQtc2l6ZTogM2VtOyB9XFxuICAucnZiLXVzZXItY291bnRkb3duIHAge1xcbiAgICBtYXJnaW46IDNlbSAwOyB9XFxuICAucnZiLXVzZXItY291bnRkb3duIC5ydmItdXNlci1jb3VudGRvd24taW5kaWNhdG9yIHtcXG4gICAgbWFyZ2luLXRvcDogMWVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbi5ydmItdXNlci10YXAtY29sbGVjdG9yIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDAuNjY2NjY2N2VtO1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxcbiAgLnJ2Yi11c2VyLXRhcC1jb2xsZWN0b3IgLnJ2Yi11c2VyLXRhcC1pbnN0cnVjdGlvbnMge1xcbiAgICBtYXJnaW46IDFlbTsgfVxcbiAgLnJ2Yi11c2VyLXRhcC1jb2xsZWN0b3I6YWN0aXZlIC5ydmItdXNlci10YXAtYnV0dG9uIHtcXG4gICAgdG9wOiA1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMCB0cmFuc3BhcmVudDsgfVxcblxcbi5ydmItdXNlci10YXAtYnV0dG9uIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGZvbnQtc2l6ZTogN2VtO1xcbiAgd2lkdGg6IDNlbTtcXG4gIGhlaWdodDogM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAzZW07XFxuICBib3gtc2hhZG93OiA1cHggNXB4IDJweCAzcHggcmdiYSgxMzgsIDE1NSwgMTY4LCAwLjUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjFzOyB9XFxuXFxuLnJ2Yi11c2VyLWVuZGVkIHtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gIC5ydmItdXNlci1lbmRlZCBoMSB7XFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcbiAgICBtYXJnaW4tdG9wOiAtMWVtOyB9XFxuICAucnZiLXVzZXItZW5kZWQgLnJ2Yi11c2VyLWVuZGVkLWNvbnRyaWJ1dGlvbi1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuICAucnZiLXVzZXItZW5kZWQgLnJ2Yi11c2VyLWVuZGVkLW1hdGNodXAge1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcblxcbi5ydmItcG9pbnRzIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LWZhbWlseTogUGFsYXRpbm8sIFBhbGF0aW5vIExpbm90eXBlLCBQYWxhdGlubyBMVCBTVEQsIEJvb2sgQW50aXF1YSwgc2VyaWYgIWltcG9ydGFudDsgfVxcblxcbi5jb25mZXR0aS1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDExMCU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG5cXG4uY29uZmV0dGkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxNXM7XFxuICBhbmltYXRpb24tbmFtZTogY29uZmV0dGlGbG9hdERvd247XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIGNvbmZldHRpRmxvYXREb3duIHtcXG4gIGZyb20ge1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIHRvIHtcXG4gICAgdG9wOiAxNDAlO1xcbiAgICBsZWZ0OiAxMCU7IH0gfVxcblxcbi5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQ6ICM5M2VjZTQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtaGVhZGVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcbiAgLmxhbmRpbmctcGFnZS1jb250YWluZXIgLmxhbmRpbmctcGFnZS1uYW1lLXByZWZpeCB7XFxuICAgIGNvbG9yOiAjNzM4Njk0O1xcbiAgICBmb250LXNpemU6IDAuNzVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtbmFtZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAxZW07XFxuICAgIGNvbG9yOiAjZDk4MjJiOyB9XFxuICAubGFuZGluZy1wYWdlLWNvbnRhaW5lciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudC1pbmRpY2F0b3Ige1xcbiAgICBtYXJnaW46IDFlbTtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGNvbG9yOiAjMTAxNjFhOyB9XFxuICAgIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtcGxheWVyLWNvdW50LWluZGljYXRvciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudCB7XFxuICAgICAgZm9udC1zaXplOiAxLjI1ZW07XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbi1jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogMjBweDtcXG4gICAgbGVmdDogMjBweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxuICAgIHotaW5kZXg6IDE7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiA1MHB4O1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBib3gtc2hhZG93OiA1cHggNXB4IDJweCAzcHggcmdiYSgxMzgsIDE1NSwgMTY4LCAwLjI1KTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjFzO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6ICMxMDE2MWE7IH1cXG4gICAgLmxhbmRpbmctcGFnZS1jb250YWluZXIgLmxhbmRpbmctcGFnZS1qb2luOmFjdGl2ZSB7XFxuICAgICAgdG9wOiA1cHg7XFxuICAgICAgbGVmdDogNXB4O1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDAgdHJhbnNwYXJlbnQ7IH1cXG5cXG4uZXZlbnQtcGFnZS1kaXNwbGF5LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMHZoOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEhhc2hSb3V0ZXIsIFJvdXRlLCBTd2l0Y2gsIFJlZGlyZWN0IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmltcG9ydCB7IEV2ZW50TGFuZGluZ1BhZ2UgfSBmcm9tIFwiLi9yb3V0ZXMvZXZlbnRMYW5kaW5nUGFnZVwiO1xyXG5pbXBvcnQgeyBFdmVudFBhZ2VEaXNwbGF5IH0gZnJvbSBcIi4vcm91dGVzL2V2ZW50UGFnZURpc3BsYXlcIjtcclxuaW1wb3J0IHsgRXZlbnRQYWdlQ2xpZW50IH0gZnJvbSBcIi4vcm91dGVzL2V2ZW50UGFnZUNsaWVudFwiO1xyXG5pbXBvcnQgeyBIb21lUGFnZSB9IGZyb20gXCIuL3JvdXRlcy9ob21lUGFnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8SGFzaFJvdXRlcj5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cclxuICAgICAgICAgICAgPC9IYXNoUm91dGVyPlxyXG4gICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJqb2luLWluZGljYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1jb2RlXCIgc3JjPVwiL2Fzc2V0cy9xci1jb2RlLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICovfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgUm91dGVzID0gKCkgPT4gKFxyXG4gICAgPFN3aXRjaD5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9ldmVudC86ZXZlbnRJZFwiIGV4YWN0IGNvbXBvbmVudD17RXZlbnRMYW5kaW5nUGFnZX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9ldmVudC86ZXZlbnRJZC9wbGF5XCIgY29tcG9uZW50PXtFdmVudFBhZ2VDbGllbnR9IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvZXZlbnQvOmV2ZW50SWQvZGlzcGxheVwiIGNvbXBvbmVudD17RXZlbnRQYWdlRGlzcGxheX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxyXG4gICAgICAgIDxSZWRpcmVjdCBmcm9tPVwiKlwiIHRvPVwiL1wiIC8+fVxyXG4gICAgPC9Td2l0Y2g+XHJcbikiLCIvLyBodHRwczovL2NvZGVwZW4uaW8vYW5vbi9wZW4vSk1PUXpFXHJcbmNvbnN0IGNvbmZldHRpczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29uZmV0dGkoKSB7XHJcbiAgbGV0IHdpZHRoID0gTWF0aC5yYW5kb20oKSAqIDggKiAyO1xyXG4gIGxldCBoZWlnaHQgPSB3aWR0aCAqIDAuNDtcclxuICBsZXQgY29sb3VySWR4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA0KTtcclxuICBsZXQgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgc3dpdGNoKGNvbG91cklkeCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBjb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBjb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbG9yID0gXCJncmVlblwiO1xyXG4gIH1cclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbmZldHRpLWNvbnRhaW5lclwiO1xyXG4gIGNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtNYXRoLnJhbmRvbSgpICogLTEwfSVgO1xyXG4gIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yYW5kb20oKSAqIDExMCAtIDEwfSVgO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc05hbWUgPSBcImNvbmZldHRpXCI7XHJcbiAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gIGRpdi5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICBkaXYuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcclxuICBkaXYuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke01hdGgucmFuZG9tKCkqMzYwfWRlZylgO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gIGNvbmZldHRpcy5wdXNoKGNvbnRhaW5lcik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcclxuICB9LCAyMDAwMCk7XHJcbn0iLCJjb25zdCBBTklNQVRJT05fTkFNRVMgPSBbXCJib3VuY2VcIiwgXCJ0YWRhXCIsIFwic3dpbmdcIiwgXCJydWJiZXJCYW5kXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRvbUFuaW1hdGUgPSAocmVmOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgIGlmIChyZWYgIT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnMocmVmKSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbmltTmFtZSA9IEFOSU1BVElPTl9OQU1FU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBBTklNQVRJT05fTkFNRVMubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICByZWYuY2xhc3NMaXN0LmFkZChhbmltTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWYuY2xhc3NMaXN0LnJlbW92ZShhbmltTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBEYXRhYmFzZUdhbWVTdGF0ZVJlZFZzQmx1ZSwgRGF0YWJhc2VHYW1lU3RhdGUsIERhdGFiYXNlVXNlcnMsIFVzZXJTdGF0ZVJlZFZzQmx1ZSB9IGZyb20gXCIuL2ZpcmViYXNlU2NoZW1hXCI7XHJcblxyXG4vLyBFdmVudE1hbmFnZXIga2lja3Mgb2ZmIHN0YXJ0aW5nIGFuZCBjeWNsaW5nIHRocm91Z2ggZ2FtZXNcclxuLy8gYW5kIGFzc2lnbnMgaW5pdGlhbCBzdGF0ZXMgdG8gdXNlcnNcclxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGdhbWVTdGF0ZSE6IERhdGFiYXNlR2FtZVN0YXRlO1xyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdXNlcnNSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdXNlcnMhOiBEYXRhYmFzZVVzZXJzPGFueT47XHJcbiAgICBwcml2YXRlIHVzZXJzUGVuZGluZ1JlZjogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWQ/OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlUmVmID0gZXZlbnRSZWYuY2hpbGQoXCJnYW1lU3RhdGVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudXNlcnNSZWYgPSBldmVudFJlZi5jaGlsZChcInVzZXJzXCIpO1xyXG4gICAgICAgIHRoaXMudXNlcnNSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVzZXJzUGVuZGluZ1JlZiA9IGV2ZW50UmVmLmNoaWxkKFwidXNlcnNQZW5kaW5nXCIpO1xyXG4gICAgICAgIHRoaXMudXNlcnNQZW5kaW5nUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VySWRzOiBzdHJpbmdbXSA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJJZHMgPT0gbnVsbCB8fCB1c2VySWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgYWxsIHVzZXJzIGluIHRoZSBxdWV1ZVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdhbWVTdGF0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlZHZzYmx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VycyA9IGNyZWF0ZVJlZFZzQmx1ZVVzZXJzKHVzZXJJZHMsIHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzUmVmLnRyYW5zYWN0aW9uKChleGlzdGluZ1VzZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmV4aXN0aW5nVXNlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubmV3VXNlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vyc1BlbmRpbmdSZWYuc2V0KFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjaGVkdWxlTmV4dEdhbWUoKSB7XHJcbiAgICAgICAgLy8gdG8gc3RhcnQgdGhlIGdhbWVzIGN5Y2xlLCB3ZTpcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIEdhbWVTdGF0ZSB0byBhIG5ldyBnYW1lIGFuZCBzZXQgaXQgaW1tZWRpYXRlbHlcclxuICAgICAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSB0aGlzLnNlbGVjdE5ld0dhbWUoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZVJlZi5zZXQobmV3R2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgZ2FtZSBoYXMgZW5kZWRcclxuICAgICAgICBjb25zdCB0aW1lR2FtZVdpbGxFbmQgPSAobmV3R2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgKyBuZXdHYW1lU3RhdGUuZ2FtZUR1cmF0aW9uKTtcclxuICAgICAgICBjb25zdCByZXN1bHRzU2NyZWVuRHVyYXRpb24gPSAxNSAqIDEwMDA7XHJcbiAgICAgICAgY29uc3Qgd2FpdER1cmF0aW9uID0gdGltZUdhbWVXaWxsRW5kIC0gRGF0ZS5ub3coKSArIHJlc3VsdHNTY3JlZW5EdXJhdGlvbjtcclxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbmQgdGhlbiBkbyBhbm90aGVyIG9uZVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlTmV4dEdhbWUoKTtcclxuICAgICAgICB9LCB3YWl0RHVyYXRpb24pIGFzIHVua25vd24gYXMgbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0TmV3R2FtZSgpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlUmVkVnNCbHVlR2FtZVN0YXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlZFZzQmx1ZUdhbWVTdGF0ZSgpOiBEYXRhYmFzZUdhbWVTdGF0ZVJlZFZzQmx1ZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdhbWVJZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpLFxyXG4gICAgICAgIGJsdWVQb2ludHM6IDAsXHJcbiAgICAgICAgZ2FtZUR1cmF0aW9uOiAoMSAqIDYwICsgMzApICogMTAwMCxcclxuICAgICAgICByZWRQb2ludHM6IDAsXHJcbiAgICAgICAgdGltZUdhbWVTdGFydDogRGF0ZS5ub3coKSArIDIwICogMTAwMCxcclxuICAgICAgICB0eXBlOiBcInJlZHZzYmx1ZVwiLFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmVkVnNCbHVlVXNlcnModXNlcklkczogc3RyaW5nW10sIGV4aXN0aW5nVXNlcnM6IERhdGFiYXNlVXNlcnM8VXNlclN0YXRlUmVkVnNCbHVlPik6IERhdGFiYXNlVXNlcnM8VXNlclN0YXRlUmVkVnNCbHVlPiB7XHJcbiAgICBsZXQgbnVtUmVkID0gMCwgbnVtQmx1ZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHVzZXJJZCBpbiBleGlzdGluZ1VzZXJzKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGV4aXN0aW5nVXNlcnNbdXNlcklkXTtcclxuICAgICAgICB1c2VyLnN0YXRlLnRlYW0gPT09IFwicmVkXCIgPyBudW1SZWQrKyA6IG51bUJsdWUrKztcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1VzZXJzOiBEYXRhYmFzZVVzZXJzPFVzZXJTdGF0ZVJlZFZzQmx1ZT4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgaWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBudW1SZWQgPiBudW1CbHVlID8gXCJibHVlXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICBudW1CbHVlID4gbnVtUmVkID8gXCJyZWRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJlZFwiIDogXCJibHVlXCI7XHJcbiAgICAgICAgbmV3VXNlcnNbaWRdID0ge1xyXG4gICAgICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgICAgICAgdGVhbTogdGVhbSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0ZWFtID09PSBcInJlZFwiKSB7XHJcbiAgICAgICAgICAgIG51bVJlZCsrO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBudW1CbHVlKys7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXdVc2VycztcclxufSIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLy8gSEFDSyBtb25rZXlwYXRjaCB0aGUgb2xkIGZlYXR1cmVzIHRoYXQgcmVxdWlyZXMgVEhSRUUgb24gdGhlIGdsb2JhbCBuYW1lc3BhY2VcclxuKHdpbmRvdyBhcyBhbnkpLlRIUkVFID0gVEhSRUU7XHJcbi8vIHRzbGludDpkaXNhYmxlXHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9sb2FkZXJzL0dMVEZMb2FkZXJcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHNcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvY29udHJvbHMvRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvbGlicy9zdGF0cy5taW5cIjtcclxuLy8gaW1wb3J0ICogYXMgZGF0IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qcy9saWJzL2RhdC5ndWkubWluXCI7XHJcbi8vICh3aW5kb3cgYXMgYW55KS5kYXQgPSBkYXQ7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0Jva2VoU2hhZGVyXCI7XHJcbi8vIGltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvQm9rZWhTaGFkZXIyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0NvcHlTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Eb3RTY3JlZW5TaGFkZXJcIjtcclxuLy8gcmVxdWlyZWQgYnkgU0FPU2hhZGVyXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvRGVwdGhMaW1pdGVkQmx1clNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NBT1NoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NTQU9TaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5SGlnaFBhc3NTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5U2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvVG9uZU1hcFNoYWRlclwiO1xyXG4vLyByZXF1aXJlZCBieSBTQU9TaGFkZXJcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9VbnBhY2tEZXB0aFJHQkFTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU2hhZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0Jva2VoUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9NYXNrUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TU0FBUmVuZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NTQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9BZGFwdGl2ZVRvbmVNYXBwaW5nUGFzc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvb2JqZWN0cy9Ta3lcIjtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhYmFzZUdhbWVTdGF0ZSwgRGF0YWJhc2VVc2VycyB9IGZyb20gXCJzcmMvZmlyZWJhc2VTY2hlbWFcIjtcclxuaW1wb3J0IHsgUmVkVnNCbHVlIH0gZnJvbSBcIi4vcmVkVnNCbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVTdGF0ZVByb3BzIHtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyczogRGF0YWJhc2VVc2Vyczxhbnk+O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8R2FtZVN0YXRlUHJvcHMsIHt9PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmdhbWVTdGF0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyZWR2c2JsdWVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8UmVkVnNCbHVlIGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9IHVzZXJzPXt0aGlzLnByb3BzLnVzZXJzfSAvPjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlLCBEYXRhYmFzZVVzZXJzLCBVc2VyU3RhdGVSZWRWc0JsdWUgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IGFkZENvbmZldHRpIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25mZXR0aVwiO1xyXG5pbXBvcnQgeyByYW5kb21BbmltYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9yYW5kb21BbmltYXRlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlZFZzQmx1ZVByb3BzIHtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWU7XHJcbiAgICB1c2VyczogRGF0YWJhc2VVc2VyczxVc2VyU3RhdGVSZWRWc0JsdWU+O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVkVnNCbHVlU3RhdGUge1xyXG4gICAgY3VycmVudFRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZFZzQmx1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWRWc0JsdWVQcm9wcywgUmVkVnNCbHVlU3RhdGU+IHtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWxJZD86IG51bWJlcjtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IChzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWU6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwKSBhcyBhbnkgYXMgbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCB7IGdhbWVTdGF0ZSwgdXNlcnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgLy8gZ2FtZSBoYXNuJ3Qgc3RhcnRlZCB5ZXQsIHNob3cgYSBjb3VudGRvd24gdGltZXJcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnNDb25uZWN0ZWQgPSBPYmplY3Qua2V5cyh1c2VycyB8fCB7fSkubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJzRWxlbWVudHM6IEpTWC5FbGVtZW50W10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHVzZXJzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdXNlcklkIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHVzZXJzW3VzZXJJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gXCIvYXNzZXRzL3RhcF9yZWQucG5nXCIgOiBcIi9hc3NldHMvdGFwX2JsdWUucG5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZCA9ICh1c2VySWQuY2hhckNvZGVBdCgwKSAqIHVzZXJJZC5jaGFyQ29kZUF0KDEpICogdXNlcklkLmNoYXJDb2RlQXQoMikgKiA1OTEyMzAyMSkgJSA1MTEgLyA1MTE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSA8aW1nIGNsYXNzTmFtZT1cInJ2Yi1wbGF5ZXItcGhvbmVcIiBzdHlsZT17e2FuaW1hdGlvbkRlbGF5OiBgJHstcmFuZCAqIDE1fXNgfX0ga2V5PXt1c2VySWR9IHNyYz17dXJsfSB3aWR0aD1cIjEwMHB4XCIgLz47XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyc0VsZW1lbnRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnNDb25uZWN0ZWRFbGVtZW50ID0gcGxheWVyc0Nvbm5lY3RlZCA+IDAgPyA8cD57cGxheWVyc0Nvbm5lY3RlZH0gcGxheWVycyBjb25uZWN0ZWQuPC9wPiA6IDxoMT5Kb2luIGJ5IHZpc2l0aW5nIDxhIGhyZWY9XCJcIj5wb2x5cGhvbmUuaW88L2E+IG9uIHlvdXIgcGhvbmUhPC9oMT47XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0IC0gdGhpcy5zdGF0ZS5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItY291bnRkb3duLXRpdGxlXCI+PHNwYW4gY2xhc3NOYW1lPVwic21hbGxlclwiPk5leHQgVXA6PC9zcGFuPiBSZWQgdnMgQmx1ZTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItY291bnRkb3duLWNvbHVtbnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1jb2x1bW4gcnZiLWNvdW50ZG93bi1zaWRlLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1zbWFsbFwiIHNyYz1cIi9hc3NldHMvcXItY29kZS5wbmdcIiB3aWR0aD1cIjIwMHB4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1jb3VudGRvd24tY29sdW1uIHJ2Yi1jb3VudGRvd24tY2VudGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57Li4ucGxheWVyc0VsZW1lbnRzfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3BsYXllcnNDb25uZWN0ZWRFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1pbnN0cnVjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5UYXAgeW91ciBzY3JlZW4gdG8gZWFybiBwb2ludHMgZm9yIHlvdXIgdGVhbS48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Um91bmRzIGxhc3QgOTAgc2Vjb25kcy48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+TW9zdCBwb2ludHMgd2lucyE8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1pbmRpY2F0b3JcIj5TdGFydHMgaW4gPHNwYW4gY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi10aW1lXCI+e01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX08L3NwYW4+Li4uPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1jb2x1bW4gcnZiLWNvdW50ZG93bi1zaWRlLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1zbWFsbFwiIHNyYz1cIi9hc3NldHMvcXItY29kZS5wbmdcIiB3aWR0aD1cIjIwMHB4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ2FtZSBpcyBjdXJyZW50bHkgaW4gcGxheVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lID49IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICYmIHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPCBnYW1lU3RhdGUudGltZUdhbWVTdGFydCArIGdhbWVTdGF0ZS5nYW1lRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICsgZ2FtZVN0YXRlLmdhbWVEdXJhdGlvbiAtIHRoaXMuc3RhdGUuY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJ2Yi1pbnN0cnVjdGlvbnNcIj5UYXAgeW91ciBzY3JlZW4hPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRlYW0gcnZiLXJlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1zY29yZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItdGVhbS1uYW1lXCI+UmVkPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJydmItdGVhbS1wb2ludHNcIiByZWY9e3JhbmRvbUFuaW1hdGV9PntnYW1lU3RhdGUucmVkUG9pbnRzfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRlYW0gcnZiLWJsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItc2NvcmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwicnZiLXRlYW0tbmFtZVwiPkJsdWU8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInJ2Yi10ZWFtLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e2dhbWVTdGF0ZS5ibHVlUG9pbnRzfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRpbWVyXCI+eyhuZXcgRGF0ZShtaWxsaXNSZW1haW5pbmcpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDE0LCAxOSkpfSByZW1haW5pbmc8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnYW1lIGVuZGVkXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFkZENvbmZldHRpKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPVxyXG4gICAgICAgICAgICAgICAgZ2FtZVN0YXRlLnJlZFBvaW50cyA+IGdhbWVTdGF0ZS5ibHVlUG9pbnRzID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2luXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lubmluZ1RlYW06IFwiUmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lubmluZ1BvaW50czogZ2FtZVN0YXRlLnJlZFBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdUZWFtOiBcIkJsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdQb2ludHM6IGdhbWVTdGF0ZS5ibHVlUG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgfSA6IGdhbWVTdGF0ZS5ibHVlUG9pbnRzID4gZ2FtZVN0YXRlLnJlZFBvaW50cyA/IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIndpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbm5pbmdUZWFtOiBcIkJsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aW5uaW5nUG9pbnRzOiBnYW1lU3RhdGUuYmx1ZVBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdUZWFtOiBcIlJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvc2luZ1BvaW50czogZ2FtZVN0YXRlLnJlZFBvaW50cyxcclxuICAgICAgICAgICAgICAgIH0gOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0aWVcIixcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IGdhbWVTdGF0ZS5yZWRQb2ludHNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFwidGllXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItZW5kZWQgcnZiLXRpZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1lbmRlZC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItdGllLWluZGljYXRvclwiPkl0J3MgYSB0aWUhPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJ2Yi10aWUtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb3RoIHRlYW1zIHNjb3JlZCA8c3BhbiBjbGFzc05hbWU9XCJydmItdGllLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e3Jlc3VsdC5wb2ludHN9IHBvaW50czwvc3Bhbj4hIEluY3JlZGlibGUhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJydmItZW5kZWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwicnZiLXdpbi1yZWRcIjogcmVzdWx0Lndpbm5pbmdUZWFtID09PSBcIlJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicnZiLXdpbi1ibHVlXCI6IHJlc3VsdC53aW5uaW5nVGVhbSA9PT0gXCJCbHVlXCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWVuZGVkLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInJ2Yi13aW5uZXItYmFubmVyXCI+e3Jlc3VsdC53aW5uaW5nVGVhbX0gdGVhbSB3aW5zITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwicnZiLXdpbm5lci1zY29yZS1jb250YWluZXIgYW5pbWF0ZWRcIiByZWY9e3JhbmRvbUFuaW1hdGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi13aW5uZXItc2NvcmVcIj57cmVzdWx0Lndpbm5pbmdQb2ludHN9PC9zcGFuPiBwb2ludHMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnZiLWxvc2VyXCI+e3Jlc3VsdC5sb3NpbmdUZWFtfTwvc3Bhbj4gdGVhbSA8c3BhbiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmVcIj57cmVzdWx0Lmxvc2luZ1BvaW50c308L3NwYW4+IHBvaW50cyEgTmljZSB0cnkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VVc2VyLCBVc2VyU3RhdGVSZWRWc0JsdWUsIERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlIH0gZnJvbSBcInNyYy9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBhZGRDb25mZXR0aSB9IGZyb20gXCIuLi9jb21tb24vY29uZmV0dGlcIjtcclxuaW1wb3J0IHsgcmFuZG9tQW5pbWF0ZSB9IGZyb20gXCIuLi9jb21tb24vcmFuZG9tQW5pbWF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWRWc0JsdWVVc2VyUHJvcHMge1xyXG4gICAgZ2FtZVN0YXRlUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBnYW1lU3RhdGU6IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlO1xyXG4gICAgdXNlcjogRGF0YWJhc2VVc2VyPFVzZXJTdGF0ZVJlZFZzQmx1ZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVkVnNCbHVlVXNlclN0YXRlIHtcclxuICAgIGN1cnJlbnRUaW1lOiBudW1iZXI7XHJcbiAgICAvLyB0aGlzIGlzIGhlbGQgY2xpZW50IHNpZGVcclxuICAgIG51bVRhcHM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZHZzQmx1ZVVzZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFJlZFZzQmx1ZVVzZXJQcm9wcywge30+IHtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWxJZD86IG51bWJlcjtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgIG51bVRhcHM6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbXlUZWFtUG9pbnRzUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWRWc0JsdWVVc2VyUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgbXlUZWFtUG9pbnRzUmVmVXJsID0gcHJvcHMudXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gXCJyZWRQb2ludHNcIiA6IFwiYmx1ZVBvaW50c1wiO1xyXG4gICAgICAgIHRoaXMubXlUZWFtUG9pbnRzUmVmID0gcHJvcHMuZ2FtZVN0YXRlUmVmLmNoaWxkKG15VGVhbVBvaW50c1JlZlVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBteVRlYW1Qb2ludHNSZWZVcmwgPSBwcm9wcy51c2VyLnN0YXRlLnRlYW0gPT09IFwicmVkXCIgPyBcInJlZFBvaW50c1wiIDogXCJibHVlUG9pbnRzXCI7XHJcbiAgICAgICAgdGhpcy5teVRlYW1Qb2ludHNSZWYgPSBwcm9wcy5nYW1lU3RhdGVSZWYuY2hpbGQobXlUZWFtUG9pbnRzUmVmVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1dHRvblJlZjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgaGFuZGxlQnV0dG9uUmVmID0gKHJlZjogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5idXR0b25SZWYgPSByZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaCA9IChlOiBSZWFjdC5TeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYnV0dG9uUmVmKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZENvbmZldHRpKHRoaXMuYnV0dG9uUmVmKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIG51bVRhcHM6IHRoaXMuc3RhdGUubnVtVGFwcyArIDEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5teVRlYW1Qb2ludHNSZWYudHJhbnNhY3Rpb24oKHZhbDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgKyAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gKHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTApIGFzIGFueSBhcyBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcInJ2Yi11c2VyXCIsIHtcclxuICAgICAgICAgICAgXCJydmItdXNlci10ZWFtLXJlZFwiOiB0aGlzLnByb3BzLnVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIixcclxuICAgICAgICAgICAgXCJydmItdXNlci10ZWFtLWJsdWVcIjogdGhpcy5wcm9wcy51c2VyLnN0YXRlLnRlYW0gPT09IFwiYmx1ZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnYW1lU3RhdGUsIHVzZXIgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgLy8gZ2FtZSBoYXNuJ3Qgc3RhcnRlZCB5ZXQsIHNob3cgaW5zdHJ1Y3Rpb25zIGFuZCB5b3VyIHRlYW1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0IC0gdGhpcy5zdGF0ZS5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItY291bnRkb3duIGFuaW1hdGVkIGJvdW5jZUluXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPlJlZCB2cyBCbHVlPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+WW91IGFyZSBvbiB7dGhpcy5wcm9wcy51c2VyLnN0YXRlLnRlYW19IHRlYW0hPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8cD5UYXAgeW91ciBzY3JlZW4gYXMgZmFzdCBhcyBwb3NzaWJsZSB0byBlYXJuIHBvaW50cyBmb3IgeW91ciB0ZWFtLiBNb3N0IHBvaW50cyB3aW5zITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLWNvdW50ZG93bi1pbmRpY2F0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRpbmcgaW4ge01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX0uLi4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZSBpcyBjdXJyZW50bHkgaW4gcGxheVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPj0gZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgJiYgdGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICsgZ2FtZVN0YXRlLmdhbWVEdXJhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci10YXAtY29sbGVjdG9yIGFuaW1hdGVkIHNsaWRlSW5SaWdodFwiIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInJ2Yi11c2VyLXRhcC1pbnN0cnVjdGlvbnNcIj5UYXAgdG8gZWFybiBwb2ludHMhPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLXRhcC1idXR0b25cIiByZWY9e3RoaXMuaGFuZGxlQnV0dG9uUmVmfT57dGhpcy5zdGF0ZS5udW1UYXBzfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdhbWUgZW5kZWRcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgeW91clRlYW1Qb2ludHMgPSB1c2VyLnN0YXRlLnRlYW0gPT09IFwicmVkXCIgPyBnYW1lU3RhdGUucmVkUG9pbnRzIDogZ2FtZVN0YXRlLmJsdWVQb2ludHM7XHJcbiAgICAgICAgICAgIGNvbnN0IG90aGVyVGVhbVBvaW50cyA9IHVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIiA/IGdhbWVTdGF0ZS5ibHVlUG9pbnRzIDogZ2FtZVN0YXRlLnJlZFBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGlmICh5b3VyVGVhbVBvaW50cyA9PT0gb3RoZXJUZWFtUG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQgcnZiLXVzZXItdGllIGFuaW1hdGVkIGZhZGVJblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+SXQncyBhIHRpZSE8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgSG9seSBtb2x5ISBCb3RoIHRlYW1zIHNjb3JlZCA8c3BhbiBjbGFzc05hbWU9XCJydmItcG9pbnRzXCI+e3lvdXJUZWFtUG9pbnRzfSBwb2ludHMhPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLWVuZGVkLWNvbnRyaWJ1dGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBjb250cmlidXRlZCA8c3BhbiBjbGFzc05hbWU9XCJydmItcG9pbnRzXCI+e3RoaXMuc3RhdGUubnVtVGFwc30gcG9pbnRzITwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29uID0geW91clRlYW1Qb2ludHMgPiBvdGhlclRlYW1Qb2ludHM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB3b24gPyBcIndvbiFcIiA6IFwibG9zdCA6KFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdvbiAmJiBNYXRoLnJhbmRvbSgpIDwgMC4yKSB7IC8vIHJlZHVjZSBjb25mZXR0aSBvbiBtb2JpbGVcclxuICAgICAgICAgICAgICAgICAgICBhZGRDb25mZXR0aSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLWVuZGVkIGFuaW1hdGVkIGZhZGVJblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+WW91ciB0ZWFtIHtyZXN1bHR9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQtbWF0Y2h1cFwiPjxzcGFuIGNsYXNzTmFtZT1cInJ2Yi1wb2ludHNcIiByZWY9e3JhbmRvbUFuaW1hdGV9Pnt5b3VyVGVhbVBvaW50c308L3NwYW4+IHRvIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi1wb2ludHNcIiByZWY9e3JhbmRvbUFuaW1hdGV9PntvdGhlclRlYW1Qb2ludHN9PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZC1jb250cmlidXRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgY29udHJpYnV0ZWQgPHNwYW4gY2xhc3NOYW1lPVwicnZiLXBvaW50c1wiPnt0aGlzLnN0YXRlLm51bVRhcHN9IHBvaW50cyE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtMSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtMSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBcIi4vZm9yZXN0L21vbmtleXBhdGNoVGhyZWVcIjtcclxuaW1wb3J0IFwiLi9pbml0aWFsaXplRmlyZWJhc2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcblxyXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xyXG5cclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbihib2R5LnJlcXVlc3RGdWxsc2NyZWVuICYmIGJvZHkucmVxdWVzdEZ1bGxzY3JlZW4oKSkgfHxcclxuKGJvZHkubW96UmVxdWVzdEZ1bGxTY3JlZW4gJiYgYm9keS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpKSB8fFxyXG4oYm9keS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiAmJiBib2R5LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKCkpO1xyXG5cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcblxyXG50cnkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3QpO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgcm9vdCEuaW5uZXJUZXh0ID0gYEVycm9yOiAke2UubmFtZX0gLSAke2UubWVzc2FnZX0uICR7ZS5zdGFja31gO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5QlQzaFRZUmowdS1BcFpFMV9aMWZ5WGYyWmlWOW1nWHIwXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcInBvbHlwaG9uZS1pby5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vcG9seXBob25lLWlvLmZpcmViYXNlaW8uY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwicG9seXBob25lLWlvXCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcInBvbHlwaG9uZS1pby5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMjU1MjE4MTc4MjU2XCJcclxufTtcclxuXHJcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudExhbmRpbmdQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHBsYXllckNvdW50OiAzLFxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5kaW5nLXBhZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLWhlYWRlclwiPjxzcGFuIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1uYW1lLXByZWZpeFwiPldlbGNvbWUgdG88L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1uYW1lXCI+R3JheSBBcmVhIEluY3ViYXRvciBTaG93Y2FzZSAyMDE4PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJsYW5kaW5nLXBhZ2UtcGxheWVyLWNvdW50LWluZGljYXRvclwiPjxzcGFuIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1wbGF5ZXItY291bnRcIj57dGhpcy5zdGF0ZS5wbGF5ZXJDb3VudH08L3NwYW4+IHBlb3BsZSBwbGF5aW5nLjwvZGl2PiAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLWpvaW4tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89XCIvZXZlbnQvZ2FpczIwMTgvcGxheVwiIGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1qb2luXCI+Sm9pbjwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VHYW1lU3RhdGUsIERhdGFiYXNlVXNlciB9IGZyb20gXCIuLi9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBnZXRNeVVzZXJJZCB9IGZyb20gXCIuLi91c2VyL3VzZXJJZFwiO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGUgfSBmcm9tIFwiLi4vdXNlci91c2VyU3RhdGVcIjtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuXHJcbmludGVyZmFjZSBDbGllbnRSb3V0ZVBhcmFtcyB7XHJcbiAgICBldmVudElkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDbGllbnRQcm9wcyBleHRlbmRzIFJvdXRlQ29tcG9uZW50UHJvcHM8Q2xpZW50Um91dGVQYXJhbXM+IHtcclxufVxyXG5cclxuaW50ZXJmYWNlIENsaWVudFN0YXRlIHtcclxuICAgIGdhbWVTdGF0ZT86IERhdGFiYXNlR2FtZVN0YXRlO1xyXG4gICAgdXNlcj86IERhdGFiYXNlVXNlcjxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRQYWdlQ2xpZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PENsaWVudFByb3BzLCBDbGllbnRTdGF0ZT4ge1xyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGVSZWYhOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBwcml2YXRlIHVzZXJSZWYhOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBzdGF0ZTogQ2xpZW50U3RhdGUgPSB7fTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB1c2VySWQgPSBnZXRNeVVzZXJJZCgpO1xyXG4gICAgICAgIC8vIG9uZS10aW1lIHB1dCBteXNlbGYgb24gdGhlIGxpc3Qgb2YgcGVuZGluZyB1c2Vyc1xyXG4gICAgICAgIGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH0vdXNlcnNQZW5kaW5nYCkudHJhbnNhY3Rpb24oKHBlbmRpbmdVc2VycykgPT4ge1xyXG4gICAgICAgICAgICBwZW5kaW5nVXNlcnMgPSAocGVuZGluZ1VzZXJzIHx8IFtdKTtcclxuICAgICAgICAgICAgcGVuZGluZ1VzZXJzLnB1c2godXNlcklkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBlbmRpbmdVc2VycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYgPSBkYi5yZWYoYGV2ZW50cy8ke3RoaXMucHJvcHMubWF0Y2gucGFyYW1zLmV2ZW50SWR9L2dhbWVTdGF0ZWApO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lU3RhdGU6IERhdGFiYXNlR2FtZVN0YXRlID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lU3RhdGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXNlclJlZiA9IGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH0vdXNlcnMvJHt1c2VySWR9YCk7XHJcbiAgICAgICAgdGhpcy51c2VyUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyOiBEYXRhYmFzZVVzZXI8YW55PiA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJSZWYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlclJlZi5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGllbnQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlclVzZXJTdGF0ZSgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1heWJlUmVuZGVyVXNlclN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2FtZVN0YXRlLCB1c2VyIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChnYW1lU3RhdGUgPT0gbnVsbCB8fCB1c2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8VXNlclN0YXRlIGtleT17Z2FtZVN0YXRlLmdhbWVJZH0gZ2FtZVN0YXRlUmVmPXt0aGlzLmdhbWVTdGF0ZVJlZn0gZ2FtZVN0YXRlPXtnYW1lU3RhdGV9IHVzZXI9e3VzZXJ9IC8+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VFdmVudCB9IGZyb20gXCIuLi9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tIFwiLi4vZXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9nYW1lcy9nYW1lU3RhdGVcIjtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuXHJcbmludGVyZmFjZSBFdmVudFBhZ2VEaXNwbGF5Um91dGVQYXJhbXMge1xyXG4gICAgZXZlbnRJZDogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRXZlbnRQYWdlRGlzcGxheVByb3BzIGV4dGVuZHMgUm91dGVDb21wb25lbnRQcm9wczxFdmVudFBhZ2VEaXNwbGF5Um91dGVQYXJhbXM+IHtcclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50UGFnZURpc3BsYXlTdGF0ZSB7XHJcbiAgICBldmVudD86IERhdGFiYXNlRXZlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFBhZ2VEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEV2ZW50UGFnZURpc3BsYXlQcm9wcywgRXZlbnRQYWdlRGlzcGxheVN0YXRlPiB7XHJcbiAgICBwcml2YXRlIGV2ZW50UmVmITogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgcHJpdmF0ZSBnYW1lc01hbmFnZXIhOiBFdmVudE1hbmFnZXI7XHJcbiAgICBzdGF0ZTogRXZlbnRQYWdlRGlzcGxheVN0YXRlID0ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8gQXMgc29vbiBhcyB0aGlzIHBhZ2UgaXMgdmlzaXRlZCB3ZSdsbCBiZWdpbiBjeWNsaW5nIHRocm91Z2ggZ2FtZXMuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZiA9IGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH1gKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudDogRGF0YWJhc2VFdmVudCA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZXNNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcih0aGlzLmV2ZW50UmVmKTtcclxuICAgICAgICB0aGlzLmdhbWVzTWFuYWdlci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZXNNYW5hZ2VyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckdhbWUoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckdhbWUoKSB7XHJcbiAgICAgICAgY29uc3QgeyBldmVudCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxHYW1lU3RhdGUga2V5PXtldmVudC5nYW1lU3RhdGUuZ2FtZUlkfSBnYW1lU3RhdGU9e2V2ZW50LmdhbWVTdGF0ZX0gdXNlcnM9e2V2ZW50LnVzZXJzfSAvPlxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaGFzR2VvbG9jYXRpb246IHRydWUsXHJcbiAgICAgICAgc2hvdWxkUmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmIChcImdlb2xvY2F0aW9uXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLyBkb19zb21ldGhpbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBoYXNHZW9sb2NhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRSZWRpcmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhc0dlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+U2VsZWN0IHlvdXIgZXZlbnQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2V2ZW50cy9nYWlzMjAxOFwiPkdyYXkgQXJlYSBJbmN1YmF0b3IgU2hvd2Nhc2UgMjAxODwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc2hvdWxkUmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG9tZS1wYWdlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5GaW5kaW5nIHlvdXIgY2xvc2VzdCBldmVudC4uLjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+RmluZCBtYW51YWxseTwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+Rm91bmQhIFJlZGlyZWN0aW5nLi4uPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3QgdG89XCIvZXZlbnQvZ2FpczIwMThcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gcmFuZG9tVXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpO1xyXG59XHJcblxyXG5sZXQgbXlVc2VySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeVVzZXJJZCgpIHtcclxuICAgIGlmIChteVVzZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlVXNlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXlVc2VySWRcIik7XHJcbiAgICAgICAgbXlVc2VySWQgPSBsb2NhbFN0b3JhZ2VVc2VySWQgfHwgcmFuZG9tVXNlcklkKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlVc2VySWRcIiwgbXlVc2VySWQpO1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlLCBEYXRhYmFzZVVzZXIgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IFJlZHZzQmx1ZVVzZXIgfSBmcm9tIFwiLi4vZ2FtZXMvcmVkVnNCbHVlVXNlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lU3RhdGVQcm9wcyB7XHJcbiAgICBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyOiBEYXRhYmFzZVVzZXI8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJTdGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxHYW1lU3RhdGVQcm9wcywge30+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZ2FtZVN0YXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInJlZHZzYmx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxSZWR2c0JsdWVVc2VyIGdhbWVTdGF0ZVJlZj17dGhpcy5wcm9wcy5nYW1lU3RhdGVSZWZ9IGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=