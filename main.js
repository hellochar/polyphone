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
/******/ 	var hotCurrentHash = "456dffa0eaf590c26e0d";
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
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none; }\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none; }\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.7.0\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2018 Daniel Eden\n */\n\n@keyframes bounce {\n  from,\n  20%,\n  53%,\n  80%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0); }\n  40%,\n  43% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    transform: translate3d(0, -4px, 0); } }\n\n.bounce {\n  animation-name: bounce;\n  transform-origin: center bottom; }\n\n@keyframes flash {\n  from,\n  50%,\n  to {\n    opacity: 1; }\n  25%,\n  75% {\n    opacity: 0; } }\n\n.flash {\n  animation-name: flash; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.pulse {\n  animation-name: pulse; }\n\n@keyframes rubberBand {\n  from {\n    transform: scale3d(1, 1, 1); }\n  30% {\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.rubberBand {\n  animation-name: rubberBand; }\n\n@keyframes shake {\n  from,\n  to {\n    transform: translate3d(0, 0, 0); }\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(-10px, 0, 0); }\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(10px, 0, 0); } }\n\n.shake {\n  animation-name: shake; }\n\n@keyframes headShake {\n  0% {\n    transform: translateX(0); }\n  6.5% {\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    transform: translateX(0); } }\n\n.headShake {\n  animation-timing-function: ease-in-out;\n  animation-name: headShake; }\n\n@keyframes swing {\n  20% {\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n.swing {\n  transform-origin: top center;\n  animation-name: swing; }\n\n@keyframes tada {\n  from {\n    transform: scale3d(1, 1, 1); }\n  10%,\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%,\n  60%,\n  80% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n.tada {\n  animation-name: tada; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes wobble {\n  from {\n    transform: translate3d(0, 0, 0); }\n  15% {\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.wobble {\n  animation-name: wobble; }\n\n@keyframes jello {\n  from,\n  11.1%,\n  to {\n    transform: translate3d(0, 0, 0); }\n  22.2% {\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n.jello {\n  animation-name: jello;\n  transform-origin: center; }\n\n@keyframes heartBeat {\n  0% {\n    transform: scale(1); }\n  14% {\n    transform: scale(1.3); }\n  28% {\n    transform: scale(1); }\n  42% {\n    transform: scale(1.3); }\n  70% {\n    transform: scale(1); } }\n\n.heartBeat {\n  animation-name: heartBeat;\n  animation-duration: 1.3s;\n  animation-timing-function: ease-in-out; }\n\n@keyframes bounceIn {\n  from,\n  20%,\n  40%,\n  60%,\n  80%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n.bounceIn {\n  animation-duration: 0.75s;\n  animation-name: bounceIn; }\n\n@keyframes bounceInDown {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n@keyframes bounceInLeft {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    transform: translate3d(5px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInLeft {\n  animation-name: bounceInLeft; }\n\n@keyframes bounceInRight {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInRight {\n  animation-name: bounceInRight; }\n\n@keyframes bounceInUp {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    transform: translate3d(0, -5px, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInUp {\n  animation-name: bounceInUp; }\n\n@keyframes bounceOut {\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%,\n  55% {\n    opacity: 1;\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n.bounceOut {\n  animation-duration: 0.75s;\n  animation-name: bounceOut; }\n\n@keyframes bounceOutDown {\n  20% {\n    transform: translate3d(0, 10px, 0); }\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); } }\n\n.bounceOutDown {\n  animation-name: bounceOutDown; }\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); } }\n\n.bounceOutLeft {\n  animation-name: bounceOutLeft; }\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); } }\n\n.bounceOutRight {\n  animation-name: bounceOutRight; }\n\n@keyframes bounceOutUp {\n  20% {\n    transform: translate3d(0, -10px, 0); }\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); } }\n\n.bounceOutUp {\n  animation-name: bounceOutUp; }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.fadeIn {\n  animation-name: fadeIn; }\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInDown {\n  animation-name: fadeInDown; }\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInDownBig {\n  animation-name: fadeInDownBig; }\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInLeft {\n  animation-name: fadeInLeft; }\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInLeftBig {\n  animation-name: fadeInLeftBig; }\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInRight {\n  animation-name: fadeInRight; }\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInRightBig {\n  animation-name: fadeInRightBig; }\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInUp {\n  animation-name: fadeInUp; }\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.fadeInUpBig {\n  animation-name: fadeInUpBig; }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.fadeOut {\n  animation-name: fadeOut; }\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0); } }\n\n.fadeOutDown {\n  animation-name: fadeOutDown; }\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0); } }\n\n.fadeOutDownBig {\n  animation-name: fadeOutDownBig; }\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0); } }\n\n.fadeOutLeft {\n  animation-name: fadeOutLeft; }\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0); } }\n\n.fadeOutLeftBig {\n  animation-name: fadeOutLeftBig; }\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0); } }\n\n.fadeOutRight {\n  animation-name: fadeOutRight; }\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0); } }\n\n.fadeOutRightBig {\n  animation-name: fadeOutRightBig; }\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0); } }\n\n.fadeOutUp {\n  animation-name: fadeOutUp; }\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0); } }\n\n.fadeOutUpBig {\n  animation-name: fadeOutUpBig; }\n\n@keyframes flip {\n  from {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    animation-timing-function: ease-out; }\n  40% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    animation-timing-function: ease-out; }\n  50% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    animation-timing-function: ease-in; }\n  80% {\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in; }\n  to {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in; } }\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  animation-name: flip; }\n\n@keyframes flipInX {\n  from {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    animation-timing-function: ease-in; }\n  60% {\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    transform: perspective(400px); } }\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipInX; }\n\n@keyframes flipInY {\n  from {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    animation-timing-function: ease-in; }\n  60% {\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    transform: perspective(400px); } }\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipInY; }\n\n@keyframes flipOutX {\n  from {\n    transform: perspective(400px); }\n  30% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutX {\n  animation-duration: 0.75s;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important; }\n\n@keyframes flipOutY {\n  from {\n    transform: perspective(400px); }\n  30% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutY {\n  animation-duration: 0.75s;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  animation-name: flipOutY; }\n\n@keyframes lightSpeedIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    transform: skewX(-5deg); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.lightSpeedIn {\n  animation-name: lightSpeedIn;\n  animation-timing-function: ease-out; }\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n.lightSpeedOut {\n  animation-name: lightSpeedOut;\n  animation-timing-function: ease-in; }\n\n@keyframes rotateIn {\n  from {\n    transform-origin: center;\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    transform-origin: center;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateIn {\n  animation-name: rotateIn; }\n\n@keyframes rotateInDownLeft {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    transform-origin: left bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInDownLeft {\n  animation-name: rotateInDownLeft; }\n\n@keyframes rotateInDownRight {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    transform-origin: right bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInDownRight {\n  animation-name: rotateInDownRight; }\n\n@keyframes rotateInUpLeft {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    transform-origin: left bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInUpLeft {\n  animation-name: rotateInUpLeft; }\n\n@keyframes rotateInUpRight {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    transform-origin: right bottom;\n    transform: translate3d(0, 0, 0);\n    opacity: 1; } }\n\n.rotateInUpRight {\n  animation-name: rotateInUpRight; }\n\n@keyframes rotateOut {\n  from {\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    transform-origin: center;\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n.rotateOut {\n  animation-name: rotateOut; }\n\n@keyframes rotateOutDownLeft {\n  from {\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n.rotateOutDownLeft {\n  animation-name: rotateOutDownLeft; }\n\n@keyframes rotateOutDownRight {\n  from {\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutDownRight {\n  animation-name: rotateOutDownRight; }\n\n@keyframes rotateOutUpLeft {\n  from {\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutUpLeft {\n  animation-name: rotateOutUpLeft; }\n\n@keyframes rotateOutUpRight {\n  from {\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n.rotateOutUpRight {\n  animation-name: rotateOutUpRight; }\n\n@keyframes hinge {\n  0% {\n    transform-origin: top left;\n    animation-timing-function: ease-in-out; }\n  20%,\n  60% {\n    transform: rotate3d(0, 0, 1, 80deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out; }\n  40%,\n  80% {\n    transform: rotate3d(0, 0, 1, 60deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n.hinge {\n  animation-duration: 2s;\n  animation-name: hinge; }\n\n@keyframes jackInTheBox {\n  from {\n    opacity: 0;\n    transform: scale(0.1) rotate(30deg);\n    transform-origin: center bottom; }\n  50% {\n    transform: rotate(-10deg); }\n  70% {\n    transform: rotate(3deg); }\n  to {\n    opacity: 1;\n    transform: scale(1); } }\n\n.jackInTheBox {\n  animation-name: jackInTheBox; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0); } }\n\n.rollIn {\n  animation-name: rollIn; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n.rollOut {\n  animation-name: rollOut; }\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n.zoomIn {\n  animation-name: zoomIn; }\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInDown {\n  animation-name: zoomInDown; }\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInLeft {\n  animation-name: zoomInLeft; }\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInRight {\n  animation-name: zoomInRight; }\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInUp {\n  animation-name: zoomInUp; }\n\n@keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n.zoomOut {\n  animation-name: zoomOut; }\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutDown {\n  animation-name: zoomOutDown; }\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center; } }\n\n.zoomOutLeft {\n  animation-name: zoomOutLeft; }\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center; } }\n\n.zoomOutRight {\n  animation-name: zoomOutRight; }\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutUp {\n  animation-name: zoomOutUp; }\n\n@keyframes slideInDown {\n  from {\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInDown {\n  animation-name: slideInDown; }\n\n@keyframes slideInLeft {\n  from {\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInLeft {\n  animation-name: slideInLeft; }\n\n@keyframes slideInRight {\n  from {\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInRight {\n  animation-name: slideInRight; }\n\n@keyframes slideInUp {\n  from {\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.slideInUp {\n  animation-name: slideInUp; }\n\n@keyframes slideOutDown {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, 100%, 0); } }\n\n.slideOutDown {\n  animation-name: slideOutDown; }\n\n@keyframes slideOutLeft {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(-100%, 0, 0); } }\n\n.slideOutLeft {\n  animation-name: slideOutLeft; }\n\n@keyframes slideOutRight {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(100%, 0, 0); } }\n\n.slideOutRight {\n  animation-name: slideOutRight; }\n\n@keyframes slideOutUp {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, -100%, 0); } }\n\n.slideOutUp {\n  animation-name: slideOutUp; }\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n\n.animated.infinite {\n  animation-iteration-count: infinite; }\n\n.animated.delay-1s {\n  animation-delay: 1s; }\n\n.animated.delay-2s {\n  animation-delay: 2s; }\n\n.animated.delay-3s {\n  animation-delay: 3s; }\n\n.animated.delay-4s {\n  animation-delay: 4s; }\n\n.animated.delay-5s {\n  animation-delay: 5s; }\n\n.animated.fast {\n  animation-duration: 800ms; }\n\n.animated.faster {\n  animation-duration: 500ms; }\n\n.animated.slow {\n  animation-duration: 2s; }\n\n.animated.slower {\n  animation-duration: 3s; }\n\n@media (prefers-reduced-motion) {\n  .animated {\n    animation: unset !important;\n    transition: none !important; } }\n\n.rvb {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100%;\n  width: 100%;\n  background: linear-gradient(273deg, rgba(255, 0, 0, 0.2), rgba(173, 216, 230, 0.5), rgba(255, 0, 0, 0.2), rgba(173, 216, 230, 0.5), rgba(173, 216, 230, 0.5));\n  background-size: 1000% 1000%;\n  animation: backgroundAnimation 12s ease infinite; }\n\n@keyframes backgroundAnimation {\n  0% {\n    background-position: 0% 19%; }\n  50% {\n    background-position: 100% 82%; }\n  100% {\n    background-position: 0% 19%; } }\n  .rvb .rvb-countdown {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-align: center;\n        align-items: center;\n    margin: auto;\n    width: 100%;\n    animation-duration: 2000ms;\n    animation-fill-mode: both;\n    animation-name: zoomIn; }\n    .rvb .rvb-countdown .rvb-countdown-title {\n      margin-top: 0;\n      font-size: 5em; }\n      .rvb .rvb-countdown .rvb-countdown-title .smaller {\n        font-size: 0.5em;\n        color: #738694; }\n    .rvb .rvb-countdown .rvb-countdown-columns-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n          flex-direction: row;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: auto;\n      width: 100%; }\n    .rvb .rvb-countdown .rvb-countdown-column {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n          flex-direction: column;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: auto 10px; }\n    .rvb .rvb-countdown .rvb-countdown-center-column {\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n    .rvb .rvb-countdown .rvb-countdown-side-column {\n      width: 250px;\n      text-align: center; }\n    .rvb .rvb-countdown .rvb-player-phone {\n      position: relative;\n      animation: movePhone 15s;\n      animation-iteration-count: infinite;\n      animation-direction: alternate-reverse;\n      margin: 10px; }\n  .rvb .rvb-instructions {\n    font-size: 1.5em; }\n  .rvb .rvb-play {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    -ms-flex-align: center;\n        align-items: center;\n    animation-duration: 500ms;\n    animation-fill-mode: both;\n    animation-name: bounceInRight; }\n  .rvb .rvb-team {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    text-align: center;\n    height: 100%;\n    display: -ms-flexbox;\n    display: flex; }\n    .rvb .rvb-team.rvb-red {\n      background: red; }\n    .rvb .rvb-team.rvb-blue {\n      background: lightblue; }\n    .rvb .rvb-team .rvb-score-container {\n      margin: auto; }\n      .rvb .rvb-team .rvb-score-container .rvb-team-name {\n        font-size: 3em; }\n      .rvb .rvb-team .rvb-score-container .rvb-team-points {\n        font-size: 15em;\n        margin: 0.25em;\n        animation-duration: 1s;\n        animation-fill-mode: both; }\n  .rvb .rvb-timer {\n    position: absolute;\n    font-size: 2em;\n    left: 0;\n    right: 0;\n    text-align: center;\n    bottom: 1em; }\n  .rvb .rvb-instructions {\n    position: absolute;\n    left: 0;\n    right: 0;\n    text-align: center;\n    top: 1em; }\n  .rvb .rvb-ended {\n    width: 100%;\n    height: 100%;\n    display: -ms-flexbox;\n    display: flex;\n    animation-duration: 2000ms;\n    animation-fill-mode: both;\n    animation-name: fadeIn; }\n    .rvb .rvb-ended.rvb-win-blue {\n      background: lightblue; }\n    .rvb .rvb-ended.rvb-win-red {\n      background: red; }\n    .rvb .rvb-ended .rvb-tie-indicator {\n      font-size: 5em; }\n    .rvb .rvb-ended .rvb-tie-score {\n      font-size: 2em; }\n      .rvb .rvb-ended .rvb-tie-score .rvb-tie-points {\n        animation-duration: 1s;\n        animation-fill-mode: both;\n        display: inline-block;\n        font-weight: bold; }\n    .rvb .rvb-ended .rvb-tie-incredible {\n      font-size: 2em; }\n    .rvb .rvb-ended .rvb-ended-container {\n      margin: auto;\n      text-align: center; }\n    .rvb .rvb-ended .rvb-winner-score-container {\n      font-size: 6em;\n      font-weight: bold;\n      text-align: center;\n      display: inline-block;\n      position: relative;\n      animation-duration: 1000ms;\n      animation-fill-mode: both; }\n    .rvb .rvb-ended .rvb-loser-score-container {\n      text-align: center;\n      font-size: 2em; }\n    .rvb .rvb-ended .rvb-loser-score {\n      font-weight: bold; }\n    .rvb .rvb-ended .rvb-winner-banner {\n      font-size: 4em;\n      margin-bottom: 0; }\n\n@keyframes movePhone {\n  0% {\n    left: 0;\n    top: 0; }\n  20% {\n    left: 15px;\n    top: 7px; }\n  40% {\n    left: 2px;\n    top: -12px; }\n  60% {\n    left: -15px;\n    top: -7px; }\n  80% {\n    left: -8px;\n    top: 12px; }\n  100% {\n    left: 0;\n    top: 0; } }\n\n.rvb-user {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px;\n  font-size: 1.5em; }\n\n.rvb-user-team-red {\n  background: red; }\n\n.rvb-user-team-blue {\n  background: lightblue; }\n\n.rvb-user-countdown {\n  text-align: center; }\n  .rvb-user-countdown h1 {\n    font-size: 3em; }\n  .rvb-user-countdown p {\n    margin: 3em 0; }\n  .rvb-user-countdown .rvb-user-countdown-indicator {\n    margin-top: 1em;\n    font-weight: bold; }\n\n.rvb-user-tap-collector {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  padding: 20px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  font-size: 0.6666667em; }\n  .rvb-user-tap-collector:active .rvb-user-tap-button {\n    top: 5px;\n    left: 5px;\n    box-shadow: 0 0 0 0 transparent; }\n\n.rvb-user-tap-button {\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-size: 7em;\n  width: 3em;\n  height: 3em;\n  background-color: white;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  border-radius: 3em;\n  box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.5);\n  position: relative;\n  top: 0;\n  left: 0;\n  transition: all 0.1s; }\n\n.rvb-user-ended {\n  margin: auto;\n  text-align: center;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column; }\n  .rvb-user-ended h1 {\n    font-size: 3em;\n    margin-top: -1em; }\n  .rvb-user-ended .rvb-user-ended-contribution-container {\n    margin-top: 20px; }\n  .rvb-user-ended .rvb-user-ended-matchup {\n    font-size: 3em; }\n\n.rvb-points {\n  font-weight: bold;\n  position: relative;\n  animation-duration: 1s;\n  animation-fill-mode: both;\n  display: inline-block; }\n\n* {\n  box-sizing: border-box; }\n\nhtml {\n  overflow: hidden;\n  font-family: Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, serif !important; }\n\n.confetti-container {\n  position: absolute;\n  width: 100%;\n  height: 110%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none; }\n\n.confetti {\n  position: absolute;\n  animation-duration: 15s;\n  animation-name: confettiFloatDown;\n  animation-timing-function: easeIn; }\n\n@keyframes confettiFloatDown {\n  from {\n    top: 0;\n    left: 0; }\n  to {\n    top: 140%;\n    left: 10%; } }\n\n.landing-page-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  height: 100vh;\n  padding: 20px;\n  background: #93ece4; }\n  .landing-page-container .landing-page-header {\n    text-align: center;\n    font-size: 3em; }\n  .landing-page-container .landing-page-name-prefix {\n    color: #738694;\n    font-size: 0.75em;\n    font-weight: normal;\n    display: block; }\n  .landing-page-container .landing-page-name {\n    display: block;\n    margin-top: 1em;\n    color: #d9822b; }\n  .landing-page-container .landing-page-player-count-indicator {\n    margin: 1em;\n    font-size: 2em;\n    color: #10161a; }\n    .landing-page-container .landing-page-player-count-indicator .landing-page-player-count {\n      font-size: 1.25em;\n      font-weight: bold; }\n  .landing-page-container .landing-page-join-container {\n    position: fixed;\n    bottom: 20px;\n    left: 20px;\n    right: 20px;\n    z-index: 1; }\n  .landing-page-container .landing-page-join {\n    display: block;\n    padding: 50px;\n    font-size: 2em;\n    border-radius: 2px;\n    background: #ffffff;\n    box-shadow: 5px 5px 2px 3px rgba(138, 155, 168, 0.25);\n    position: relative;\n    top: 0;\n    left: 0;\n    transition: all 0.1s;\n    text-align: center;\n    text-decoration: none;\n    color: #10161a; }\n    .landing-page-container .landing-page-join:active {\n      top: 5px;\n      left: 5px;\n      box-shadow: 0 0 0 0 transparent; }\n\n.event-page-display-container {\n  display: -ms-flexbox;\n  display: flex;\n  height: 100vh; }\n", ""]);

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
            return (React.createElement("div", { className: "rvb-user-tap-collector animated slideInRight", onClick: this.handleTouch },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9jb25mZXR0aS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3JhbmRvbUFuaW1hdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9yZXN0L21vbmtleXBhdGNoVGhyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL2dhbWVTdGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVzL3JlZFZzQmx1ZVVzZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5zY3NzPzFjM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZUZpcmViYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRMYW5kaW5nUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ldmVudFBhZ2VDbGllbnQudHN4Iiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXZlbnRQYWdlRGlzcGxheS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ob21lUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXIvdXNlcklkLnRzIiwid2VicGFjazovLy8uL3NyYy91c2VyL3VzZXJTdGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsSUFBSSxRQUE0QixDQUFDO0FBRWpDLFNBQWdCLFdBQVc7SUFDdkIsSUFBSSxRQUFRLEVBQUU7UUFDVixPQUFPLFFBQVEsQ0FBQztLQUNuQjtTQUFNO1FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRSxRQUFRLEdBQUcsa0JBQWtCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sUUFBUSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQztBQVRELGtDQVNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkQsOEZBQStCO0FBRy9CLDJHQUF1RDtBQVF2RCxNQUFhLFNBQVUsU0FBUSxLQUFLLENBQUMsU0FBNkI7SUFDOUQsTUFBTTtRQUNGLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQy9CLEtBQUssV0FBVztnQkFDWixPQUFPLG9CQUFDLDZCQUFhLElBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUksQ0FBQztTQUMvSDtJQUNMLENBQUM7Q0FDSjtBQVBELDhCQU9DIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjQ1NmRmZmEwZWFmNTkwYzI2ZTBkXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXgudHN4XCIsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XFxuICAvKiAyICovIH1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmJvZHkge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwOyB9XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gIC8qIDEgKi9cXG4gIGhlaWdodDogMDtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTtcXG4gIC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgLyogMiAqLyB9XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTsgfVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtOyB9XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtOyB9XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lOyB9XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAvKiAxICovXFxuICBtYXJnaW46IDA7XFxuICAvKiAyICovIH1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lOyB9XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgfVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7IH1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtOyB9XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7XFxuICAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbiAgLyogMSAqLyB9XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bzsgfVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bzsgfVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcXG4gIC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbiAgLyogMiAqLyB9XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IH1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbiAgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIC8qIDIgKi8gfVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtOyB9XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLyohXFxuICogYW5pbWF0ZS5jc3MgLWh0dHA6Ly9kYW5lZGVuLm1lL2FuaW1hdGVcXG4gKiBWZXJzaW9uIC0gMy43LjBcXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXFxuICpcXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggRGFuaWVsIEVkZW5cXG4gKi9cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZSB7XFxuICBmcm9tLFxcbiAgMjAlLFxcbiAgNTMlLFxcbiAgODAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgNDAlLFxcbiAgNDMlIHtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNzU1LCAwLjA1LCAwLjg1NSwgMC4wNik7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTMwcHgsIDApOyB9XFxuICA3MCUge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTVweCwgMCk7IH1cXG4gIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTRweCwgMCk7IH0gfVxcblxcbi5ib3VuY2Uge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsYXNoIHtcXG4gIGZyb20sXFxuICA1MCUsXFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSxcXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5mbGFzaCB7XFxuICBhbmltYXRpb24tbmFtZTogZmxhc2g7IH1cXG5cXG4vKiBvcmlnaW5hbGx5IGF1dGhvcmVkIGJ5IE5pY2sgUGV0dGl0IC0gaHR0cHM6Ly9naXRodWIuY29tL25pY2twZXR0aXQvZ2xpZGUgKi9cXG5cXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH1cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjA1LCAxLjA1LCAxLjA1KTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH0gfVxcblxcbi5wdWxzZSB7XFxuICBhbmltYXRpb24tbmFtZTogcHVsc2U7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJ1YmJlckJhbmQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxcbiAgMzAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMjUsIDAuNzUsIDEpOyB9XFxuICA0MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC43NSwgMS4yNSwgMSk7IH1cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjE1LCAwLjg1LCAxKTsgfVxcbiAgNjUlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuOTUsIDEuMDUsIDEpOyB9XFxuICA3NSUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMS4wNSwgMC45NSwgMSk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9IH1cXG5cXG4ucnViYmVyQmFuZCB7XFxuICBhbmltYXRpb24tbmFtZTogcnViYmVyQmFuZDsgfVxcblxcbkBrZXlmcmFtZXMgc2hha2Uge1xcbiAgZnJvbSxcXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgMTAlLFxcbiAgMzAlLFxcbiAgNTAlLFxcbiAgNzAlLFxcbiAgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCk7IH1cXG4gIDIwJSxcXG4gIDQwJSxcXG4gIDYwJSxcXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7IH0gfVxcblxcbi5zaGFrZSB7XFxuICBhbmltYXRpb24tbmFtZTogc2hha2U7IH1cXG5cXG5Aa2V5ZnJhbWVzIGhlYWRTaGFrZSB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfVxcbiAgNi41JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNnB4KSByb3RhdGVZKC05ZGVnKTsgfVxcbiAgMTguNSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNXB4KSByb3RhdGVZKDdkZWcpOyB9XFxuICAzMS41JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtM3B4KSByb3RhdGVZKC01ZGVnKTsgfVxcbiAgNDMuNSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMnB4KSByb3RhdGVZKDNkZWcpOyB9XFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbi5oZWFkU2hha2Uge1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XFxuICBhbmltYXRpb24tbmFtZTogaGVhZFNoYWtlOyB9XFxuXFxuQGtleWZyYW1lcyBzd2luZyB7XFxuICAyMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDE1ZGVnKTsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAtMTBkZWcpOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDVkZWcpOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC01ZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDBkZWcpOyB9IH1cXG5cXG4uc3dpbmcge1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGNlbnRlcjtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzd2luZzsgfVxcblxcbkBrZXlmcmFtZXMgdGFkYSB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9XFxuICAxMCUsXFxuICAyMCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC45LCAwLjksIDAuOSkgcm90YXRlM2QoMCwgMCwgMSwgLTNkZWcpOyB9XFxuICAzMCUsXFxuICA1MCUsXFxuICA3MCUsXFxuICA5MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMS4xLCAxLjEsIDEuMSkgcm90YXRlM2QoMCwgMCwgMSwgM2RlZyk7IH1cXG4gIDQwJSxcXG4gIDYwJSxcXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKSByb3RhdGUzZCgwLCAwLCAxLCAtM2RlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9IH1cXG5cXG4udGFkYSB7XFxuICBhbmltYXRpb24tbmFtZTogdGFkYTsgfVxcblxcbi8qIG9yaWdpbmFsbHkgYXV0aG9yZWQgYnkgTmljayBQZXR0aXQgLSBodHRwczovL2dpdGh1Yi5jb20vbmlja3BldHRpdC9nbGlkZSAqL1xcblxcbkBrZXlmcmFtZXMgd29iYmxlIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICAxNSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0yNSUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIC01ZGVnKTsgfVxcbiAgMzAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgyMCUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIDNkZWcpOyB9XFxuICA0NSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xNSUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIC0zZGVnKTsgfVxcbiAgNjAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMCUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIDJkZWcpOyB9XFxuICA3NSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC01JSwgMCwgMCkgcm90YXRlM2QoMCwgMCwgMSwgLTFkZWcpOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi53b2JibGUge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHdvYmJsZTsgfVxcblxcbkBrZXlmcmFtZXMgamVsbG8ge1xcbiAgZnJvbSxcXG4gIDExLjElLFxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9XFxuICAyMi4yJSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goLTEyLjVkZWcpIHNrZXdZKC0xMi41ZGVnKTsgfVxcbiAgMzMuMyUge1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDYuMjVkZWcpIHNrZXdZKDYuMjVkZWcpOyB9XFxuICA0NC40JSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goLTMuMTI1ZGVnKSBza2V3WSgtMy4xMjVkZWcpOyB9XFxuICA1NS41JSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMS41NjI1ZGVnKSBza2V3WSgxLjU2MjVkZWcpOyB9XFxuICA2Ni42JSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goLTAuNzgxMjVkZWcpIHNrZXdZKC0wLjc4MTI1ZGVnKTsgfVxcbiAgNzcuNyUge1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDAuMzkwNjNkZWcpIHNrZXdZKDAuMzkwNjNkZWcpOyB9XFxuICA4OC44JSB7XFxuICAgIHRyYW5zZm9ybTogc2tld1goLTAuMTk1MzFkZWcpIHNrZXdZKC0wLjE5NTMxZGVnKTsgfSB9XFxuXFxuLmplbGxvIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBqZWxsbztcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjsgfVxcblxcbkBrZXlmcmFtZXMgaGVhcnRCZWF0IHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxcbiAgMTQlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpOyB9XFxuICAyOCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XFxuICA0MiUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMyk7IH1cXG4gIDcwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7IH0gfVxcblxcbi5oZWFydEJlYXQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGhlYXJ0QmVhdDtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS4zcztcXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0OyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VJbiB7XFxuICBmcm9tLFxcbiAgMjAlLFxcbiAgNDAlLFxcbiAgNjAlLFxcbiAgODAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsgfVxcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4zLCAwLjMsIDAuMyk7IH1cXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKTsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuOSwgMC45LCAwLjkpOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7IH1cXG4gIDgwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjk3LCAwLjk3LCAwLjk3KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH0gfVxcblxcbi5ib3VuY2VJbiB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDAuNzVzO1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluOyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VJbkRvd24ge1xcbiAgZnJvbSxcXG4gIDYwJSxcXG4gIDc1JSxcXG4gIDkwJSxcXG4gIHRvIHtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSk7IH1cXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMzAwMHB4LCAwKTsgfVxcbiAgNjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAyNXB4LCAwKTsgfVxcbiAgNzUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTBweCwgMCk7IH1cXG4gIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgNXB4LCAwKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uYm91bmNlSW5Eb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJbkRvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZUluTGVmdCB7XFxuICBmcm9tLFxcbiAgNjAlLFxcbiAgNzUlLFxcbiAgOTAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsgfVxcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0zMDAwcHgsIDAsIDApOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDI1cHgsIDAsIDApOyB9XFxuICA3NSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTsgfVxcbiAgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg1cHgsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5ib3VuY2VJbkxlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluTGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgYm91bmNlSW5SaWdodCB7XFxuICBmcm9tLFxcbiAgNjAlLFxcbiAgNzUlLFxcbiAgOTAlLFxcbiAgdG8ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsgfVxcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMzAwMHB4LCAwLCAwKTsgfVxcbiAgNjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMjVweCwgMCwgMCk7IH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7IH1cXG4gIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTVweCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmJvdW5jZUluUmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZUluVXAge1xcbiAgZnJvbSxcXG4gIDYwJSxcXG4gIDc1JSxcXG4gIDkwJSxcXG4gIHRvIHtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSk7IH1cXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDMwMDBweCwgMCk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTIwcHgsIDApOyB9XFxuICA3NSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDEwcHgsIDApOyB9XFxuICA5MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC01cHgsIDApOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5ib3VuY2VJblVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJblVwOyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VPdXQge1xcbiAgMjAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuOSwgMC45LCAwLjkpOyB9XFxuICA1MCUsXFxuICA1NSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMS4xLCAxLjEsIDEuMSk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMywgMC4zLCAwLjMpOyB9IH1cXG5cXG4uYm91bmNlT3V0IHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43NXM7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlT3V0OyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VPdXREb3duIHtcXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTBweCwgMCk7IH1cXG4gIDQwJSxcXG4gIDQ1JSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTIwcHgsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMjAwMHB4LCAwKTsgfSB9XFxuXFxuLmJvdW5jZU91dERvd24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZU91dERvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdW5jZU91dExlZnQge1xcbiAgMjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgyMHB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0yMDAwcHgsIDAsIDApOyB9IH1cXG5cXG4uYm91bmNlT3V0TGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogYm91bmNlT3V0TGVmdDsgfVxcblxcbkBrZXlmcmFtZXMgYm91bmNlT3V0UmlnaHQge1xcbiAgMjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMjBweCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgyMDAwcHgsIDAsIDApOyB9IH1cXG5cXG4uYm91bmNlT3V0UmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZU91dFJpZ2h0OyB9XFxuXFxuQGtleWZyYW1lcyBib3VuY2VPdXRVcCB7XFxuICAyMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xMHB4LCAwKTsgfVxcbiAgNDAlLFxcbiAgNDUlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAyMHB4LCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0yMDAwcHgsIDApOyB9IH1cXG5cXG4uYm91bmNlT3V0VXAge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZU91dFVwOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLmZhZGVJbiB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlSW5Eb3duIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xMDAlLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluRG93biB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluRG93bjsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluRG93bkJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMjAwMHB4LCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluRG93bkJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluRG93bkJpZzsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluTGVmdCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVJbkxlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVJbkxlZnRCaWcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTIwMDBweCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVJbkxlZnRCaWcge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJbkxlZnRCaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVJblJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5mYWRlSW5SaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZUluUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVJblJpZ2h0QmlnIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDIwMDBweCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVJblJpZ2h0QmlnIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5SaWdodEJpZzsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluVXAge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVJblVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlSW5VcDsgfVxcblxcbkBrZXlmcmFtZXMgZmFkZUluVXBCaWcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMjAwMHB4LCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uZmFkZUluVXBCaWcge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVJblVwQmlnOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5mYWRlT3V0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0OyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0RG93biB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDEwMCUsIDApOyB9IH1cXG5cXG4uZmFkZU91dERvd24ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVPdXREb3duOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0RG93bkJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDIwMDBweCwgMCk7IH0gfVxcblxcbi5mYWRlT3V0RG93bkJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dERvd25CaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRMZWZ0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApOyB9IH1cXG5cXG4uZmFkZU91dExlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVPdXRMZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0TGVmdEJpZyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0yMDAwcHgsIDAsIDApOyB9IH1cXG5cXG4uZmFkZU91dExlZnRCaWcge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZhZGVPdXRMZWZ0QmlnOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0UmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKTsgfSB9XFxuXFxuLmZhZGVPdXRSaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dFJpZ2h0OyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0UmlnaHRCaWcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgyMDAwcHgsIDAsIDApOyB9IH1cXG5cXG4uZmFkZU91dFJpZ2h0QmlnIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBmYWRlT3V0UmlnaHRCaWc7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVPdXRVcCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xMDAlLCAwKTsgfSB9XFxuXFxuLmZhZGVPdXRVcCB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dFVwOyB9XFxuXFxuQGtleWZyYW1lcyBmYWRlT3V0VXBCaWcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMjAwMHB4LCAwKTsgfSB9XFxuXFxuLmZhZGVPdXRVcEJpZyB7XFxuICBhbmltYXRpb24tbmFtZTogZmFkZU91dFVwQmlnOyB9XFxuXFxuQGtleWZyYW1lcyBmbGlwIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSBzY2FsZTNkKDEsIDEsIDEpIHRyYW5zbGF0ZTNkKDAsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsIC0zNjBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgc2NhbGUzZCgxLCAxLCAxKSB0cmFuc2xhdGUzZCgwLCAwLCAxNTBweCkgcm90YXRlM2QoMCwgMSwgMCwgLTE5MGRlZyk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0OyB9XFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSBzY2FsZTNkKDEsIDEsIDEpIHRyYW5zbGF0ZTNkKDAsIDAsIDE1MHB4KSByb3RhdGUzZCgwLCAxLCAwLCAtMTcwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjsgfVxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgc2NhbGUzZCgwLjk1LCAwLjk1LCAwLjk1KSB0cmFuc2xhdGUzZCgwLCAwLCAwKSByb3RhdGUzZCgwLCAxLCAwLCAwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSBzY2FsZTNkKDEsIDEsIDEpIHRyYW5zbGF0ZTNkKDAsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsIDBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluOyB9IH1cXG5cXG4uYW5pbWF0ZWQuZmxpcCB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZsaXA7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXBJblgge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDEsIDAsIDAsIDkwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMSwgMCwgMCwgLTIwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjsgfVxcbiAgNjAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMSwgMCwgMCwgMTBkZWcpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgxLCAwLCAwLCAtNWRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCk7IH0gfVxcblxcbi5mbGlwSW5YIHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZsaXBJblg7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXBJblkge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDAsIDEsIDAsIDkwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgNDAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMSwgMCwgLTIwZGVnKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjsgfVxcbiAgNjAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMSwgMCwgMTBkZWcpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAxLCAwLCAtNWRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCk7IH0gfVxcblxcbi5mbGlwSW5ZIHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZsaXBJblk7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXBPdXRYIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KTsgfVxcbiAgMzAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMSwgMCwgMCwgLTIwZGVnKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgxLCAwLCAwLCA5MGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5mbGlwT3V0WCB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDAuNzVzO1xcbiAgYW5pbWF0aW9uLW5hbWU6IGZsaXBPdXRYO1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXBPdXRZIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KTsgfVxcbiAgMzAlIHtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMSwgMCwgLTE1ZGVnKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAxLCAwLCA5MGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5mbGlwT3V0WSB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDAuNzVzO1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XFxuICBhbmltYXRpb24tbmFtZTogZmxpcE91dFk7IH1cXG5cXG5Aa2V5ZnJhbWVzIGxpZ2h0U3BlZWRJbiB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKSBza2V3WCgtMzBkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDIwZGVnKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgtNWRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLmxpZ2h0U3BlZWRJbiB7XFxuICBhbmltYXRpb24tbmFtZTogbGlnaHRTcGVlZEluO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGxpZ2h0U3BlZWRPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKSBza2V3WCgzMGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5saWdodFNwZWVkT3V0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBsaWdodFNwZWVkT3V0O1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjsgfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAtMjAwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5yb3RhdGVJbiB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZUluRG93bkxlZnQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC00NWRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5yb3RhdGVJbkRvd25MZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVJbkRvd25MZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyByb3RhdGVJbkRvd25SaWdodCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDQ1ZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5yb3RhdGVJbkRvd25SaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlSW5Eb3duUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZUluVXBMZWZ0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCA0NWRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5yb3RhdGVJblVwTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlSW5VcExlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZUluVXBSaWdodCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIC05MGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ucm90YXRlSW5VcFJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVJblVwUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZU91dCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAyMDBkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4ucm90YXRlT3V0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVPdXQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZU91dERvd25MZWZ0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCA0NWRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi5yb3RhdGVPdXREb3duTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlT3V0RG93bkxlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZU91dERvd25SaWdodCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAtNDVkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4ucm90YXRlT3V0RG93blJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGVPdXREb3duUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZU91dFVwTGVmdCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBib3R0b207XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBib3R0b207XFxuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgLTQ1ZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLnJvdGF0ZU91dFVwTGVmdCB7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlT3V0VXBMZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyByb3RhdGVPdXRVcFJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBib3R0b207XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDkwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLnJvdGF0ZU91dFVwUmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZU91dFVwUmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIGhpbmdlIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0OyB9XFxuICAyMCUsXFxuICA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDgwZGVnKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0OyB9XFxuICA0MCUsXFxuICA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDYwZGVnKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0O1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgNzAwcHgsIDApO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uaGluZ2Uge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcXG4gIGFuaW1hdGlvbi1uYW1lOiBoaW5nZTsgfVxcblxcbkBrZXlmcmFtZXMgamFja0luVGhlQm94IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMSkgcm90YXRlKDMwZGVnKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTsgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTEwZGVnKTsgfVxcbiAgNzAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoM2RlZyk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuLmphY2tJblRoZUJveCB7XFxuICBhbmltYXRpb24tbmFtZTogamFja0luVGhlQm94OyB9XFxuXFxuLyogb3JpZ2luYWxseSBhdXRob3JlZCBieSBOaWNrIFBldHRpdCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWNrcGV0dGl0L2dsaWRlICovXFxuXFxuQGtleWZyYW1lcyByb2xsSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIC0xMjBkZWcpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5yb2xsSW4ge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvbGxJbjsgfVxcblxcbi8qIG9yaWdpbmFsbHkgYXV0aG9yZWQgYnkgTmljayBQZXR0aXQgLSBodHRwczovL2dpdGh1Yi5jb20vbmlja3BldHRpdC9nbGlkZSAqL1xcblxcbkBrZXlmcmFtZXMgcm9sbE91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApIHJvdGF0ZTNkKDAsIDAsIDEsIDEyMGRlZyk7IH0gfVxcblxcbi5yb2xsT3V0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb2xsT3V0OyB9XFxuXFxuQGtleWZyYW1lcyB6b29tSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjMsIDAuMywgMC4zKTsgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnpvb21JbiB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbUluOyB9XFxuXFxuQGtleWZyYW1lcyB6b29tSW5Eb3duIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4xLCAwLjEsIDAuMSkgdHJhbnNsYXRlM2QoMCwgLTEwMDBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLjA1NSwgMC42NzUsIDAuMTkpOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoMCwgNjBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEpOyB9IH1cXG5cXG4uem9vbUluRG93biB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbUluRG93bjsgfVxcblxcbkBrZXlmcmFtZXMgem9vbUluTGVmdCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMSwgMC4xLCAwLjEpIHRyYW5zbGF0ZTNkKC0xMDAwcHgsIDAsIDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5KTsgfVxcbiAgNjAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuNDc1LCAwLjQ3NSwgMC40NzUpIHRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxKTsgfSB9XFxuXFxuLnpvb21JbkxlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21JbkxlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21JblJpZ2h0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4xLCAwLjEsIDAuMSkgdHJhbnNsYXRlM2QoMTAwMHB4LCAwLCAwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNTUsIDAuMDU1LCAwLjY3NSwgMC4xOSk7IH1cXG4gIDYwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEpOyB9IH1cXG5cXG4uem9vbUluUmlnaHQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21JblJpZ2h0OyB9XFxuXFxuQGtleWZyYW1lcyB6b29tSW5VcCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMSwgMC4xLCAwLjEpIHRyYW5zbGF0ZTNkKDAsIDEwMDBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLjA1NSwgMC42NzUsIDAuMTkpOyB9XFxuICA2MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoMCwgLTYwcHgsIDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxKTsgfSB9XFxuXFxuLnpvb21JblVwIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tSW5VcDsgfVxcblxcbkBrZXlmcmFtZXMgem9vbU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuMywgMC4zLCAwLjMpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi56b29tT3V0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tT3V0OyB9XFxuXFxuQGtleWZyYW1lcyB6b29tT3V0RG93biB7XFxuICA0MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoMCwgLTYwcHgsIDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC4xLCAwLjEsIDAuMSkgdHJhbnNsYXRlM2QoMCwgMjAwMHB4LCAwKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMSk7IH0gfVxcblxcbi56b29tT3V0RG93biB7XFxuICBhbmltYXRpb24tbmFtZTogem9vbU91dERvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21PdXRMZWZ0IHtcXG4gIDQwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjQ3NSwgMC40NzUsIDAuNDc1KSB0cmFuc2xhdGUzZCg0MnB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMSkgdHJhbnNsYXRlM2QoLTIwMDBweCwgMCwgMCk7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyOyB9IH1cXG5cXG4uem9vbU91dExlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21PdXRMZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyB6b29tT3V0UmlnaHQge1xcbiAgNDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZTNkKDAuNDc1LCAwLjQ3NSwgMC40NzUpIHRyYW5zbGF0ZTNkKC00MnB4LCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMSkgdHJhbnNsYXRlM2QoMjAwMHB4LCAwLCAwKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyOyB9IH1cXG5cXG4uem9vbU91dFJpZ2h0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiB6b29tT3V0UmlnaHQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHpvb21PdXRVcCB7XFxuICA0MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC40NzUsIDAuNDc1LCAwLjQ3NSkgdHJhbnNsYXRlM2QoMCwgNjBweCwgMCk7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLjA1NSwgMC42NzUsIDAuMTkpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjEsIDAuMSwgMC4xKSB0cmFuc2xhdGUzZCgwLCAtMjAwMHB4LCAwKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMSk7IH0gfVxcblxcbi56b29tT3V0VXAge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21PdXRVcDsgfVxcblxcbkBrZXlmcmFtZXMgc2xpZGVJbkRvd24ge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTEwMCUsIDApO1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH0gfVxcblxcbi5zbGlkZUluRG93biB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVJbkRvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5MZWZ0IHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMDAlLCAwLCAwKTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOyB9IH1cXG5cXG4uc2xpZGVJbkxlZnQge1xcbiAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlSW5MZWZ0OyB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZUluUmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLnNsaWRlSW5SaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVJblJpZ2h0OyB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZUluVXAge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfSB9XFxuXFxuLnNsaWRlSW5VcCB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVJblVwOyB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZU91dERvd24ge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDEwMCUsIDApOyB9IH1cXG5cXG4uc2xpZGVPdXREb3duIHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZU91dERvd247IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlT3V0TGVmdCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApOyB9IH1cXG5cXG4uc2xpZGVPdXRMZWZ0IHtcXG4gIGFuaW1hdGlvbi1uYW1lOiBzbGlkZU91dExlZnQ7IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlT3V0UmlnaHQge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDEwMCUsIDAsIDApOyB9IH1cXG5cXG4uc2xpZGVPdXRSaWdodCB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVPdXRSaWdodDsgfVxcblxcbkBrZXlmcmFtZXMgc2xpZGVPdXRVcCB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTEwMCUsIDApOyB9IH1cXG5cXG4uc2xpZGVPdXRVcCB7XFxuICBhbmltYXRpb24tbmFtZTogc2xpZGVPdXRVcDsgfVxcblxcbi5hbmltYXRlZCB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsgfVxcblxcbi5hbmltYXRlZC5pbmZpbml0ZSB7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTsgfVxcblxcbi5hbmltYXRlZC5kZWxheS0xcyB7XFxuICBhbmltYXRpb24tZGVsYXk6IDFzOyB9XFxuXFxuLmFuaW1hdGVkLmRlbGF5LTJzIHtcXG4gIGFuaW1hdGlvbi1kZWxheTogMnM7IH1cXG5cXG4uYW5pbWF0ZWQuZGVsYXktM3Mge1xcbiAgYW5pbWF0aW9uLWRlbGF5OiAzczsgfVxcblxcbi5hbmltYXRlZC5kZWxheS00cyB7XFxuICBhbmltYXRpb24tZGVsYXk6IDRzOyB9XFxuXFxuLmFuaW1hdGVkLmRlbGF5LTVzIHtcXG4gIGFuaW1hdGlvbi1kZWxheTogNXM7IH1cXG5cXG4uYW5pbWF0ZWQuZmFzdCB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDgwMG1zOyB9XFxuXFxuLmFuaW1hdGVkLmZhc3RlciB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDUwMG1zOyB9XFxuXFxuLmFuaW1hdGVkLnNsb3cge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyczsgfVxcblxcbi5hbmltYXRlZC5zbG93ZXIge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAzczsgfVxcblxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbikge1xcbiAgLmFuaW1hdGVkIHtcXG4gICAgYW5pbWF0aW9uOiB1bnNldCAhaW1wb3J0YW50O1xcbiAgICB0cmFuc2l0aW9uOiBub25lICFpbXBvcnRhbnQ7IH0gfVxcblxcbi5ydmIge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjczZGVnLCByZ2JhKDI1NSwgMCwgMCwgMC4yKSwgcmdiYSgxNzMsIDIxNiwgMjMwLCAwLjUpLCByZ2JhKDI1NSwgMCwgMCwgMC4yKSwgcmdiYSgxNzMsIDIxNiwgMjMwLCAwLjUpLCByZ2JhKDE3MywgMjE2LCAyMzAsIDAuNSkpO1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAwJSAxMDAwJTtcXG4gIGFuaW1hdGlvbjogYmFja2dyb3VuZEFuaW1hdGlvbiAxMnMgZWFzZSBpbmZpbml0ZTsgfVxcblxcbkBrZXlmcmFtZXMgYmFja2dyb3VuZEFuaW1hdGlvbiB7XFxuICAwJSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDE5JTsgfVxcbiAgNTAlIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA4MiU7IH1cXG4gIDEwMCUge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSAxOSU7IH0gfVxcbiAgLnJ2YiAucnZiLWNvdW50ZG93biB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMDBtcztcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHpvb21JbjsgfVxcbiAgICAucnZiIC5ydmItY291bnRkb3duIC5ydmItY291bnRkb3duLXRpdGxlIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICAgIGZvbnQtc2l6ZTogNWVtOyB9XFxuICAgICAgLnJ2YiAucnZiLWNvdW50ZG93biAucnZiLWNvdW50ZG93bi10aXRsZSAuc21hbGxlciB7XFxuICAgICAgICBmb250LXNpemU6IDAuNWVtO1xcbiAgICAgICAgY29sb3I6ICM3Mzg2OTQ7IH1cXG4gICAgLnJ2YiAucnZiLWNvdW50ZG93biAucnZiLWNvdW50ZG93bi1jb2x1bW5zLWNvbnRhaW5lciB7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICB3aWR0aDogMTAwJTsgfVxcbiAgICAucnZiIC5ydmItY291bnRkb3duIC5ydmItY291bnRkb3duLWNvbHVtbiB7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIG1hcmdpbjogYXV0byAxMHB4OyB9XFxuICAgIC5ydmIgLnJ2Yi1jb3VudGRvd24gLnJ2Yi1jb3VudGRvd24tY2VudGVyLWNvbHVtbiB7XFxuICAgICAgLW1zLWZsZXgtcG9zaXRpdmU6IDE7XFxuICAgICAgICAgIGZsZXgtZ3JvdzogMTsgfVxcbiAgICAucnZiIC5ydmItY291bnRkb3duIC5ydmItY291bnRkb3duLXNpZGUtY29sdW1uIHtcXG4gICAgICB3aWR0aDogMjUwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5ydmIgLnJ2Yi1jb3VudGRvd24gLnJ2Yi1wbGF5ZXItcGhvbmUge1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBhbmltYXRpb246IG1vdmVQaG9uZSAxNXM7XFxuICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlLXJldmVyc2U7XFxuICAgICAgbWFyZ2luOiAxMHB4OyB9XFxuICAucnZiIC5ydmItaW5zdHJ1Y3Rpb25zIHtcXG4gICAgZm9udC1zaXplOiAxLjVlbTsgfVxcbiAgLnJ2YiAucnZiLXBsYXkge1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNTAwbXM7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XFxuICAgIGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJblJpZ2h0OyB9XFxuICAucnZiIC5ydmItdGVhbSB7XFxuICAgIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiA1MCU7XFxuICAgICAgICBmbGV4LWJhc2lzOiA1MCU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgICAucnZiIC5ydmItdGVhbS5ydmItcmVkIHtcXG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7IH1cXG4gICAgLnJ2YiAucnZiLXRlYW0ucnZiLWJsdWUge1xcbiAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Ymx1ZTsgfVxcbiAgICAucnZiIC5ydmItdGVhbSAucnZiLXNjb3JlLWNvbnRhaW5lciB7XFxuICAgICAgbWFyZ2luOiBhdXRvOyB9XFxuICAgICAgLnJ2YiAucnZiLXRlYW0gLnJ2Yi1zY29yZS1jb250YWluZXIgLnJ2Yi10ZWFtLW5hbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAzZW07IH1cXG4gICAgICAucnZiIC5ydmItdGVhbSAucnZiLXNjb3JlLWNvbnRhaW5lciAucnZiLXRlYW0tcG9pbnRzIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTVlbTtcXG4gICAgICAgIG1hcmdpbjogMC4yNWVtO1xcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7IH1cXG4gIC5ydmIgLnJ2Yi10aW1lciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvdHRvbTogMWVtOyB9XFxuICAucnZiIC5ydmItaW5zdHJ1Y3Rpb25zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0b3A6IDFlbTsgfVxcbiAgLnJ2YiAucnZiLWVuZGVkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwMG1zO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xcbiAgICBhbmltYXRpb24tbmFtZTogZmFkZUluOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZC5ydmItd2luLWJsdWUge1xcbiAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Ymx1ZTsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQucnZiLXdpbi1yZWQge1xcbiAgICAgIGJhY2tncm91bmQ6IHJlZDsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi10aWUtaW5kaWNhdG9yIHtcXG4gICAgICBmb250LXNpemU6IDVlbTsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi10aWUtc2NvcmUge1xcbiAgICAgIGZvbnQtc2l6ZTogMmVtOyB9XFxuICAgICAgLnJ2YiAucnZiLWVuZGVkIC5ydmItdGllLXNjb3JlIC5ydmItdGllLXBvaW50cyB7XFxuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAgIC5ydmIgLnJ2Yi1lbmRlZCAucnZiLXRpZS1pbmNyZWRpYmxlIHtcXG4gICAgICBmb250LXNpemU6IDJlbTsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi1lbmRlZC1jb250YWluZXIge1xcbiAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgLnJ2YiAucnZiLWVuZGVkIC5ydmItd2lubmVyLXNjb3JlLWNvbnRhaW5lciB7XFxuICAgICAgZm9udC1zaXplOiA2ZW07XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxMDAwbXM7XFxuICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi1sb3Nlci1zY29yZS1jb250YWluZXIge1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LXNpemU6IDJlbTsgfVxcbiAgICAucnZiIC5ydmItZW5kZWQgLnJ2Yi1sb3Nlci1zY29yZSB7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gICAgLnJ2YiAucnZiLWVuZGVkIC5ydmItd2lubmVyLWJhbm5lciB7XFxuICAgICAgZm9udC1zaXplOiA0ZW07XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcblxcbkBrZXlmcmFtZXMgbW92ZVBob25lIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwOyB9XFxuICAyMCUge1xcbiAgICBsZWZ0OiAxNXB4O1xcbiAgICB0b3A6IDdweDsgfVxcbiAgNDAlIHtcXG4gICAgbGVmdDogMnB4O1xcbiAgICB0b3A6IC0xMnB4OyB9XFxuICA2MCUge1xcbiAgICBsZWZ0OiAtMTVweDtcXG4gICAgdG9wOiAtN3B4OyB9XFxuICA4MCUge1xcbiAgICBsZWZ0OiAtOHB4O1xcbiAgICB0b3A6IDEycHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7IH0gfVxcblxcbi5ydmItdXNlciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBmb250LXNpemU6IDEuNWVtOyB9XFxuXFxuLnJ2Yi11c2VyLXRlYW0tcmVkIHtcXG4gIGJhY2tncm91bmQ6IHJlZDsgfVxcblxcbi5ydmItdXNlci10ZWFtLWJsdWUge1xcbiAgYmFja2dyb3VuZDogbGlnaHRibHVlOyB9XFxuXFxuLnJ2Yi11c2VyLWNvdW50ZG93biB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC5ydmItdXNlci1jb3VudGRvd24gaDEge1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcbiAgLnJ2Yi11c2VyLWNvdW50ZG93biBwIHtcXG4gICAgbWFyZ2luOiAzZW0gMDsgfVxcbiAgLnJ2Yi11c2VyLWNvdW50ZG93biAucnZiLXVzZXItY291bnRkb3duLWluZGljYXRvciB7XFxuICAgIG1hcmdpbi10b3A6IDFlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4ucnZiLXVzZXItdGFwLWNvbGxlY3RvciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAwLjY2NjY2NjdlbTsgfVxcbiAgLnJ2Yi11c2VyLXRhcC1jb2xsZWN0b3I6YWN0aXZlIC5ydmItdXNlci10YXAtYnV0dG9uIHtcXG4gICAgdG9wOiA1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMCB0cmFuc3BhcmVudDsgfVxcblxcbi5ydmItdXNlci10YXAtYnV0dG9uIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGZvbnQtc2l6ZTogN2VtO1xcbiAgd2lkdGg6IDNlbTtcXG4gIGhlaWdodDogM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAzZW07XFxuICBib3gtc2hhZG93OiA1cHggNXB4IDJweCAzcHggcmdiYSgxMzgsIDE1NSwgMTY4LCAwLjUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjFzOyB9XFxuXFxuLnJ2Yi11c2VyLWVuZGVkIHtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gIC5ydmItdXNlci1lbmRlZCBoMSB7XFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcbiAgICBtYXJnaW4tdG9wOiAtMWVtOyB9XFxuICAucnZiLXVzZXItZW5kZWQgLnJ2Yi11c2VyLWVuZGVkLWNvbnRyaWJ1dGlvbi1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuICAucnZiLXVzZXItZW5kZWQgLnJ2Yi11c2VyLWVuZGVkLW1hdGNodXAge1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcblxcbi5ydmItcG9pbnRzIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG5odG1sIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LWZhbWlseTogUGFsYXRpbm8sIFBhbGF0aW5vIExpbm90eXBlLCBQYWxhdGlubyBMVCBTVEQsIEJvb2sgQW50aXF1YSwgc2VyaWYgIWltcG9ydGFudDsgfVxcblxcbi5jb25mZXR0aS1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDExMCU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG5cXG4uY29uZmV0dGkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxNXM7XFxuICBhbmltYXRpb24tbmFtZTogY29uZmV0dGlGbG9hdERvd247XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlSW47IH1cXG5cXG5Aa2V5ZnJhbWVzIGNvbmZldHRpRmxvYXREb3duIHtcXG4gIGZyb20ge1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIHRvIHtcXG4gICAgdG9wOiAxNDAlO1xcbiAgICBsZWZ0OiAxMCU7IH0gfVxcblxcbi5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQ6ICM5M2VjZTQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtaGVhZGVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDNlbTsgfVxcbiAgLmxhbmRpbmctcGFnZS1jb250YWluZXIgLmxhbmRpbmctcGFnZS1uYW1lLXByZWZpeCB7XFxuICAgIGNvbG9yOiAjNzM4Njk0O1xcbiAgICBmb250LXNpemU6IDAuNzVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtbmFtZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAxZW07XFxuICAgIGNvbG9yOiAjZDk4MjJiOyB9XFxuICAubGFuZGluZy1wYWdlLWNvbnRhaW5lciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudC1pbmRpY2F0b3Ige1xcbiAgICBtYXJnaW46IDFlbTtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGNvbG9yOiAjMTAxNjFhOyB9XFxuICAgIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2UtcGxheWVyLWNvdW50LWluZGljYXRvciAubGFuZGluZy1wYWdlLXBsYXllci1jb3VudCB7XFxuICAgICAgZm9udC1zaXplOiAxLjI1ZW07XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbi1jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogMjBweDtcXG4gICAgbGVmdDogMjBweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxuICAgIHotaW5kZXg6IDE7IH1cXG4gIC5sYW5kaW5nLXBhZ2UtY29udGFpbmVyIC5sYW5kaW5nLXBhZ2Utam9pbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiA1MHB4O1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBib3gtc2hhZG93OiA1cHggNXB4IDJweCAzcHggcmdiYSgxMzgsIDE1NSwgMTY4LCAwLjI1KTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjFzO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6ICMxMDE2MWE7IH1cXG4gICAgLmxhbmRpbmctcGFnZS1jb250YWluZXIgLmxhbmRpbmctcGFnZS1qb2luOmFjdGl2ZSB7XFxuICAgICAgdG9wOiA1cHg7XFxuICAgICAgbGVmdDogNXB4O1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDAgdHJhbnNwYXJlbnQ7IH1cXG5cXG4uZXZlbnQtcGFnZS1kaXNwbGF5LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMHZoOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEhhc2hSb3V0ZXIsIFJvdXRlLCBTd2l0Y2gsIFJlZGlyZWN0IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmltcG9ydCB7IEV2ZW50TGFuZGluZ1BhZ2UgfSBmcm9tIFwiLi9yb3V0ZXMvZXZlbnRMYW5kaW5nUGFnZVwiO1xyXG5pbXBvcnQgeyBFdmVudFBhZ2VEaXNwbGF5IH0gZnJvbSBcIi4vcm91dGVzL2V2ZW50UGFnZURpc3BsYXlcIjtcclxuaW1wb3J0IHsgRXZlbnRQYWdlQ2xpZW50IH0gZnJvbSBcIi4vcm91dGVzL2V2ZW50UGFnZUNsaWVudFwiO1xyXG5pbXBvcnQgeyBIb21lUGFnZSB9IGZyb20gXCIuL3JvdXRlcy9ob21lUGFnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8SGFzaFJvdXRlcj5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZXMgLz5cclxuICAgICAgICAgICAgPC9IYXNoUm91dGVyPlxyXG4gICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJqb2luLWluZGljYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1jb2RlXCIgc3JjPVwiL2Fzc2V0cy9xci1jb2RlLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICovfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgUm91dGVzID0gKCkgPT4gKFxyXG4gICAgPFN3aXRjaD5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9ldmVudC86ZXZlbnRJZFwiIGV4YWN0IGNvbXBvbmVudD17RXZlbnRMYW5kaW5nUGFnZX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9ldmVudC86ZXZlbnRJZC9wbGF5XCIgY29tcG9uZW50PXtFdmVudFBhZ2VDbGllbnR9IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvZXZlbnQvOmV2ZW50SWQvZGlzcGxheVwiIGNvbXBvbmVudD17RXZlbnRQYWdlRGlzcGxheX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxyXG4gICAgICAgIDxSZWRpcmVjdCBmcm9tPVwiKlwiIHRvPVwiL1wiIC8+fVxyXG4gICAgPC9Td2l0Y2g+XHJcbikiLCIvLyBodHRwczovL2NvZGVwZW4uaW8vYW5vbi9wZW4vSk1PUXpFXHJcbmNvbnN0IGNvbmZldHRpczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29uZmV0dGkoKSB7XHJcbiAgbGV0IHdpZHRoID0gTWF0aC5yYW5kb20oKSAqIDggKiAyO1xyXG4gIGxldCBoZWlnaHQgPSB3aWR0aCAqIDAuNDtcclxuICBsZXQgY29sb3VySWR4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA0KTtcclxuICBsZXQgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgc3dpdGNoKGNvbG91cklkeCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBjb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBjb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbG9yID0gXCJncmVlblwiO1xyXG4gIH1cclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbmZldHRpLWNvbnRhaW5lclwiO1xyXG4gIGNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtNYXRoLnJhbmRvbSgpICogLTEwfSVgO1xyXG4gIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yYW5kb20oKSAqIDExMCAtIDEwfSVgO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc05hbWUgPSBcImNvbmZldHRpXCI7XHJcbiAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gIGRpdi5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICBkaXYuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcclxuICBkaXYuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke01hdGgucmFuZG9tKCkqMzYwfWRlZylgO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gIGNvbmZldHRpcy5wdXNoKGNvbnRhaW5lcik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcclxuICB9LCAyMDAwMCk7XHJcbn0iLCJjb25zdCBBTklNQVRJT05fTkFNRVMgPSBbXCJib3VuY2VcIiwgXCJ0YWRhXCIsIFwic3dpbmdcIiwgXCJydWJiZXJCYW5kXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRvbUFuaW1hdGUgPSAocmVmOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgIGlmIChyZWYgIT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnMocmVmKSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbmltTmFtZSA9IEFOSU1BVElPTl9OQU1FU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBBTklNQVRJT05fTkFNRVMubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICByZWYuY2xhc3NMaXN0LmFkZChhbmltTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWYuY2xhc3NMaXN0LnJlbW92ZShhbmltTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBEYXRhYmFzZUdhbWVTdGF0ZVJlZFZzQmx1ZSwgRGF0YWJhc2VHYW1lU3RhdGUsIERhdGFiYXNlVXNlcnMsIFVzZXJTdGF0ZVJlZFZzQmx1ZSB9IGZyb20gXCIuL2ZpcmViYXNlU2NoZW1hXCI7XHJcblxyXG4vLyBFdmVudE1hbmFnZXIga2lja3Mgb2ZmIHN0YXJ0aW5nIGFuZCBjeWNsaW5nIHRocm91Z2ggZ2FtZXNcclxuLy8gYW5kIGFzc2lnbnMgaW5pdGlhbCBzdGF0ZXMgdG8gdXNlcnNcclxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGdhbWVTdGF0ZSE6IERhdGFiYXNlR2FtZVN0YXRlO1xyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdXNlcnNSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdXNlcnMhOiBEYXRhYmFzZVVzZXJzPGFueT47XHJcbiAgICBwcml2YXRlIHVzZXJzUGVuZGluZ1JlZjogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWQ/OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlUmVmID0gZXZlbnRSZWYuY2hpbGQoXCJnYW1lU3RhdGVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudXNlcnNSZWYgPSBldmVudFJlZi5jaGlsZChcInVzZXJzXCIpO1xyXG4gICAgICAgIHRoaXMudXNlcnNSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVzZXJzUGVuZGluZ1JlZiA9IGV2ZW50UmVmLmNoaWxkKFwidXNlcnNQZW5kaW5nXCIpO1xyXG4gICAgICAgIHRoaXMudXNlcnNQZW5kaW5nUmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VySWRzOiBzdHJpbmdbXSA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJJZHMgPT0gbnVsbCB8fCB1c2VySWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgYWxsIHVzZXJzIGluIHRoZSBxdWV1ZVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdhbWVTdGF0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlZHZzYmx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VycyA9IGNyZWF0ZVJlZFZzQmx1ZVVzZXJzKHVzZXJJZHMsIHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzUmVmLnRyYW5zYWN0aW9uKChleGlzdGluZ1VzZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmV4aXN0aW5nVXNlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubmV3VXNlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vyc1BlbmRpbmdSZWYuc2V0KFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjaGVkdWxlTmV4dEdhbWUoKSB7XHJcbiAgICAgICAgLy8gdG8gc3RhcnQgdGhlIGdhbWVzIGN5Y2xlLCB3ZTpcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIEdhbWVTdGF0ZSB0byBhIG5ldyBnYW1lIGFuZCBzZXQgaXQgaW1tZWRpYXRlbHlcclxuICAgICAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSB0aGlzLnNlbGVjdE5ld0dhbWUoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZVJlZi5zZXQobmV3R2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgZ2FtZSBoYXMgZW5kZWRcclxuICAgICAgICBjb25zdCB0aW1lR2FtZVdpbGxFbmQgPSAobmV3R2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgKyBuZXdHYW1lU3RhdGUuZ2FtZUR1cmF0aW9uKTtcclxuICAgICAgICBjb25zdCByZXN1bHRzU2NyZWVuRHVyYXRpb24gPSAxNSAqIDEwMDA7XHJcbiAgICAgICAgY29uc3Qgd2FpdER1cmF0aW9uID0gdGltZUdhbWVXaWxsRW5kIC0gRGF0ZS5ub3coKSArIHJlc3VsdHNTY3JlZW5EdXJhdGlvbjtcclxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhbmQgdGhlbiBkbyBhbm90aGVyIG9uZVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlTmV4dEdhbWUoKTtcclxuICAgICAgICB9LCB3YWl0RHVyYXRpb24pIGFzIHVua25vd24gYXMgbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0TmV3R2FtZSgpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlUmVkVnNCbHVlR2FtZVN0YXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlZFZzQmx1ZUdhbWVTdGF0ZSgpOiBEYXRhYmFzZUdhbWVTdGF0ZVJlZFZzQmx1ZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdhbWVJZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpLFxyXG4gICAgICAgIGJsdWVQb2ludHM6IDAsXHJcbiAgICAgICAgZ2FtZUR1cmF0aW9uOiAoMSAqIDYwICsgMzApICogMTAwMCxcclxuICAgICAgICByZWRQb2ludHM6IDAsXHJcbiAgICAgICAgdGltZUdhbWVTdGFydDogRGF0ZS5ub3coKSArIDIwICogMTAwMCxcclxuICAgICAgICB0eXBlOiBcInJlZHZzYmx1ZVwiLFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmVkVnNCbHVlVXNlcnModXNlcklkczogc3RyaW5nW10sIGV4aXN0aW5nVXNlcnM6IERhdGFiYXNlVXNlcnM8VXNlclN0YXRlUmVkVnNCbHVlPik6IERhdGFiYXNlVXNlcnM8VXNlclN0YXRlUmVkVnNCbHVlPiB7XHJcbiAgICBsZXQgbnVtUmVkID0gMCwgbnVtQmx1ZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHVzZXJJZCBpbiBleGlzdGluZ1VzZXJzKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGV4aXN0aW5nVXNlcnNbdXNlcklkXTtcclxuICAgICAgICB1c2VyLnN0YXRlLnRlYW0gPT09IFwicmVkXCIgPyBudW1SZWQrKyA6IG51bUJsdWUrKztcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1VzZXJzOiBEYXRhYmFzZVVzZXJzPFVzZXJTdGF0ZVJlZFZzQmx1ZT4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgaWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBudW1SZWQgPiBudW1CbHVlID8gXCJibHVlXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICBudW1CbHVlID4gbnVtUmVkID8gXCJyZWRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJlZFwiIDogXCJibHVlXCI7XHJcbiAgICAgICAgbmV3VXNlcnNbaWRdID0ge1xyXG4gICAgICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgICAgICAgdGVhbTogdGVhbSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0ZWFtID09PSBcInJlZFwiKSB7XHJcbiAgICAgICAgICAgIG51bVJlZCsrO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBudW1CbHVlKys7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXdVc2VycztcclxufSIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLy8gSEFDSyBtb25rZXlwYXRjaCB0aGUgb2xkIGZlYXR1cmVzIHRoYXQgcmVxdWlyZXMgVEhSRUUgb24gdGhlIGdsb2JhbCBuYW1lc3BhY2VcclxuKHdpbmRvdyBhcyBhbnkpLlRIUkVFID0gVEhSRUU7XHJcbi8vIHRzbGludDpkaXNhYmxlXHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9sb2FkZXJzL0dMVEZMb2FkZXJcIjtcclxuXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHNcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvY29udHJvbHMvRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvbGlicy9zdGF0cy5taW5cIjtcclxuLy8gaW1wb3J0ICogYXMgZGF0IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qcy9saWJzL2RhdC5ndWkubWluXCI7XHJcbi8vICh3aW5kb3cgYXMgYW55KS5kYXQgPSBkYXQ7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0Jva2VoU2hhZGVyXCI7XHJcbi8vIGltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvQm9rZWhTaGFkZXIyXCI7XHJcblxyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL0NvcHlTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9Eb3RTY3JlZW5TaGFkZXJcIjtcclxuLy8gcmVxdWlyZWQgYnkgU0FPU2hhZGVyXHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvRGVwdGhMaW1pdGVkQmx1clNoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NBT1NoYWRlclwiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9zaGFkZXJzL1NTQU9TaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5SGlnaFBhc3NTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9MdW1pbm9zaXR5U2hhZGVyXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3NoYWRlcnMvVG9uZU1hcFNoYWRlclwiO1xyXG4vLyByZXF1aXJlZCBieSBTQU9TaGFkZXJcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvc2hhZGVycy9VbnBhY2tEZXB0aFJHQkFTaGFkZXJcIjtcclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvcG9zdHByb2Nlc3NpbmcvU2hhZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL0Jva2VoUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9NYXNrUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TU0FBUmVuZGVyUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9TQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1NTQU9QYXNzXCI7XHJcbmltcG9ydCBcInRocmVlL2V4YW1wbGVzL2pzL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzc1wiO1xyXG5pbXBvcnQgXCJ0aHJlZS9leGFtcGxlcy9qcy9wb3N0cHJvY2Vzc2luZy9BZGFwdGl2ZVRvbmVNYXBwaW5nUGFzc1wiO1xyXG5cclxuaW1wb3J0IFwidGhyZWUvZXhhbXBsZXMvanMvb2JqZWN0cy9Ta3lcIjtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhYmFzZUdhbWVTdGF0ZSwgRGF0YWJhc2VVc2VycyB9IGZyb20gXCJzcmMvZmlyZWJhc2VTY2hlbWFcIjtcclxuaW1wb3J0IHsgUmVkVnNCbHVlIH0gZnJvbSBcIi4vcmVkVnNCbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVTdGF0ZVByb3BzIHtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyczogRGF0YWJhc2VVc2Vyczxhbnk+O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8R2FtZVN0YXRlUHJvcHMsIHt9PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmdhbWVTdGF0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyZWR2c2JsdWVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8UmVkVnNCbHVlIGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9IHVzZXJzPXt0aGlzLnByb3BzLnVzZXJzfSAvPjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlLCBEYXRhYmFzZVVzZXJzLCBVc2VyU3RhdGVSZWRWc0JsdWUgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IGFkZENvbmZldHRpIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25mZXR0aVwiO1xyXG5pbXBvcnQgeyByYW5kb21BbmltYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9yYW5kb21BbmltYXRlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlZFZzQmx1ZVByb3BzIHtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGVSZWRWc0JsdWU7XHJcbiAgICB1c2VyczogRGF0YWJhc2VVc2VyczxVc2VyU3RhdGVSZWRWc0JsdWU+O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVkVnNCbHVlU3RhdGUge1xyXG4gICAgY3VycmVudFRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZFZzQmx1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWRWc0JsdWVQcm9wcywgUmVkVnNCbHVlU3RhdGU+IHtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWxJZD86IG51bWJlcjtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IChzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWU6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwKSBhcyBhbnkgYXMgbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCB7IGdhbWVTdGF0ZSwgdXNlcnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgLy8gZ2FtZSBoYXNuJ3Qgc3RhcnRlZCB5ZXQsIHNob3cgYSBjb3VudGRvd24gdGltZXJcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnNDb25uZWN0ZWQgPSBPYmplY3Qua2V5cyh1c2VycyB8fCB7fSkubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJzRWxlbWVudHM6IEpTWC5FbGVtZW50W10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHVzZXJzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdXNlcklkIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHVzZXJzW3VzZXJJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gXCIvYXNzZXRzL3RhcF9yZWQucG5nXCIgOiBcIi9hc3NldHMvdGFwX2JsdWUucG5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZCA9ICh1c2VySWQuY2hhckNvZGVBdCgwKSAqIHVzZXJJZC5jaGFyQ29kZUF0KDEpICogdXNlcklkLmNoYXJDb2RlQXQoMikgKiA1OTEyMzAyMSkgJSA1MTEgLyA1MTE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSA8aW1nIGNsYXNzTmFtZT1cInJ2Yi1wbGF5ZXItcGhvbmVcIiBzdHlsZT17e2FuaW1hdGlvbkRlbGF5OiBgJHstcmFuZCAqIDE1fXNgfX0ga2V5PXt1c2VySWR9IHNyYz17dXJsfSB3aWR0aD1cIjEwMHB4XCIgLz47XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyc0VsZW1lbnRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnNDb25uZWN0ZWRFbGVtZW50ID0gcGxheWVyc0Nvbm5lY3RlZCA+IDAgPyA8cD57cGxheWVyc0Nvbm5lY3RlZH0gcGxheWVycyBjb25uZWN0ZWQuPC9wPiA6IDxoMT5Kb2luIGJ5IHZpc2l0aW5nIDxhIGhyZWY9XCJcIj5wb2x5cGhvbmUuaW88L2E+IG9uIHlvdXIgcGhvbmUhPC9oMT47XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0IC0gdGhpcy5zdGF0ZS5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItY291bnRkb3duLXRpdGxlXCI+PHNwYW4gY2xhc3NOYW1lPVwic21hbGxlclwiPk5leHQgVXA6PC9zcGFuPiBSZWQgdnMgQmx1ZTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItY291bnRkb3duLWNvbHVtbnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1jb2x1bW4gcnZiLWNvdW50ZG93bi1zaWRlLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1zbWFsbFwiIHNyYz1cIi9hc3NldHMvcXItY29kZS5wbmdcIiB3aWR0aD1cIjIwMHB4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1jb3VudGRvd24tY29sdW1uIHJ2Yi1jb3VudGRvd24tY2VudGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57Li4ucGxheWVyc0VsZW1lbnRzfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3BsYXllcnNDb25uZWN0ZWRFbGVtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1pbnN0cnVjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5UYXAgeW91ciBzY3JlZW4gdG8gZWFybiBwb2ludHMgZm9yIHlvdXIgdGVhbS48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Um91bmRzIGxhc3QgOTAgc2Vjb25kcy48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+TW9zdCBwb2ludHMgd2lucyE8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1pbmRpY2F0b3JcIj5TdGFydHMgaW4gPHNwYW4gY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi10aW1lXCI+e01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX08L3NwYW4+Li4uPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWNvdW50ZG93bi1jb2x1bW4gcnZiLWNvdW50ZG93bi1zaWRlLWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxci1zbWFsbFwiIHNyYz1cIi9hc3NldHMvcXItY29kZS5wbmdcIiB3aWR0aD1cIjIwMHB4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkpvaW4gYnkgdmlzaXRpbmcgPGEgaHJlZj1cIlwiPnBvbHlwaG9uZS5pbzwvYT4gb24geW91ciBwaG9uZSE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ2FtZSBpcyBjdXJyZW50bHkgaW4gcGxheVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRUaW1lID49IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICYmIHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPCBnYW1lU3RhdGUudGltZUdhbWVTdGFydCArIGdhbWVTdGF0ZS5nYW1lRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICsgZ2FtZVN0YXRlLmdhbWVEdXJhdGlvbiAtIHRoaXMuc3RhdGUuY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJ2Yi1pbnN0cnVjdGlvbnNcIj5UYXAgeW91ciBzY3JlZW4hPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRlYW0gcnZiLXJlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1zY29yZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItdGVhbS1uYW1lXCI+UmVkPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJydmItdGVhbS1wb2ludHNcIiByZWY9e3JhbmRvbUFuaW1hdGV9PntnYW1lU3RhdGUucmVkUG9pbnRzfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRlYW0gcnZiLWJsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItc2NvcmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwicnZiLXRlYW0tbmFtZVwiPkJsdWU8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInJ2Yi10ZWFtLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e2dhbWVTdGF0ZS5ibHVlUG9pbnRzfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXRpbWVyXCI+eyhuZXcgRGF0ZShtaWxsaXNSZW1haW5pbmcpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDE0LCAxOSkpfSByZW1haW5pbmc8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnYW1lIGVuZGVkXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFkZENvbmZldHRpKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPVxyXG4gICAgICAgICAgICAgICAgZ2FtZVN0YXRlLnJlZFBvaW50cyA+IGdhbWVTdGF0ZS5ibHVlUG9pbnRzID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2luXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lubmluZ1RlYW06IFwiUmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lubmluZ1BvaW50czogZ2FtZVN0YXRlLnJlZFBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdUZWFtOiBcIkJsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdQb2ludHM6IGdhbWVTdGF0ZS5ibHVlUG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgfSA6IGdhbWVTdGF0ZS5ibHVlUG9pbnRzID4gZ2FtZVN0YXRlLnJlZFBvaW50cyA/IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIndpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbm5pbmdUZWFtOiBcIkJsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aW5uaW5nUG9pbnRzOiBnYW1lU3RhdGUuYmx1ZVBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBsb3NpbmdUZWFtOiBcIlJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvc2luZ1BvaW50czogZ2FtZVN0YXRlLnJlZFBvaW50cyxcclxuICAgICAgICAgICAgICAgIH0gOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0aWVcIixcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IGdhbWVTdGF0ZS5yZWRQb2ludHNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFwidGllXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItZW5kZWQgcnZiLXRpZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi1lbmRlZC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJydmItdGllLWluZGljYXRvclwiPkl0J3MgYSB0aWUhPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJ2Yi10aWUtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb3RoIHRlYW1zIHNjb3JlZCA8c3BhbiBjbGFzc05hbWU9XCJydmItdGllLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e3Jlc3VsdC5wb2ludHN9IHBvaW50czwvc3Bhbj4hIEluY3JlZGlibGUhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJydmItZW5kZWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwicnZiLXdpbi1yZWRcIjogcmVzdWx0Lndpbm5pbmdUZWFtID09PSBcIlJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicnZiLXdpbi1ibHVlXCI6IHJlc3VsdC53aW5uaW5nVGVhbSA9PT0gXCJCbHVlXCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLWVuZGVkLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInJ2Yi13aW5uZXItYmFubmVyXCI+e3Jlc3VsdC53aW5uaW5nVGVhbX0gdGVhbSB3aW5zITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwicnZiLXdpbm5lci1zY29yZS1jb250YWluZXIgYW5pbWF0ZWRcIiByZWY9e3JhbmRvbUFuaW1hdGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi13aW5uZXItc2NvcmVcIj57cmVzdWx0Lndpbm5pbmdQb2ludHN9PC9zcGFuPiBwb2ludHMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnZiLWxvc2VyXCI+e3Jlc3VsdC5sb3NpbmdUZWFtfTwvc3Bhbj4gdGVhbSA8c3BhbiBjbGFzc05hbWU9XCJydmItbG9zZXItc2NvcmVcIj57cmVzdWx0Lmxvc2luZ1BvaW50c308L3NwYW4+IHBvaW50cyEgTmljZSB0cnkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VVc2VyLCBVc2VyU3RhdGVSZWRWc0JsdWUsIERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlIH0gZnJvbSBcInNyYy9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBhZGRDb25mZXR0aSB9IGZyb20gXCIuLi9jb21tb24vY29uZmV0dGlcIjtcclxuaW1wb3J0IHsgcmFuZG9tQW5pbWF0ZSB9IGZyb20gXCIuLi9jb21tb24vcmFuZG9tQW5pbWF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWRWc0JsdWVVc2VyUHJvcHMge1xyXG4gICAgZ2FtZVN0YXRlUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBnYW1lU3RhdGU6IERhdGFiYXNlR2FtZVN0YXRlUmVkVnNCbHVlO1xyXG4gICAgdXNlcjogRGF0YWJhc2VVc2VyPFVzZXJTdGF0ZVJlZFZzQmx1ZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVkVnNCbHVlVXNlclN0YXRlIHtcclxuICAgIGN1cnJlbnRUaW1lOiBudW1iZXI7XHJcbiAgICAvLyB0aGlzIGlzIGhlbGQgY2xpZW50IHNpZGVcclxuICAgIG51bVRhcHM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZHZzQmx1ZVVzZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFJlZFZzQmx1ZVVzZXJQcm9wcywge30+IHtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWxJZD86IG51bWJlcjtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgIG51bVRhcHM6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbXlUZWFtUG9pbnRzUmVmOiBmaXJlYmFzZS5kYXRhYmFzZS5SZWZlcmVuY2U7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWRWc0JsdWVVc2VyUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgbXlUZWFtUG9pbnRzUmVmVXJsID0gcHJvcHMudXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gXCJyZWRQb2ludHNcIiA6IFwiYmx1ZVBvaW50c1wiO1xyXG4gICAgICAgIHRoaXMubXlUZWFtUG9pbnRzUmVmID0gcHJvcHMuZ2FtZVN0YXRlUmVmLmNoaWxkKG15VGVhbVBvaW50c1JlZlVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBteVRlYW1Qb2ludHNSZWZVcmwgPSBwcm9wcy51c2VyLnN0YXRlLnRlYW0gPT09IFwicmVkXCIgPyBcInJlZFBvaW50c1wiIDogXCJibHVlUG9pbnRzXCI7XHJcbiAgICAgICAgdGhpcy5teVRlYW1Qb2ludHNSZWYgPSBwcm9wcy5nYW1lU3RhdGVSZWYuY2hpbGQobXlUZWFtUG9pbnRzUmVmVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1dHRvblJlZjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgaGFuZGxlQnV0dG9uUmVmID0gKHJlZjogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5idXR0b25SZWYgPSByZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaCA9IChlOiBSZWFjdC5TeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYnV0dG9uUmVmKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZENvbmZldHRpKHRoaXMuYnV0dG9uUmVmKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIG51bVRhcHM6IHRoaXMuc3RhdGUubnVtVGFwcyArIDEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5teVRlYW1Qb2ludHNSZWYudHJhbnNhY3Rpb24oKHZhbDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgKyAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gKHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTApIGFzIGFueSBhcyBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcInJ2Yi11c2VyXCIsIHtcclxuICAgICAgICAgICAgXCJydmItdXNlci10ZWFtLXJlZFwiOiB0aGlzLnByb3BzLnVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIixcclxuICAgICAgICAgICAgXCJydmItdXNlci10ZWFtLWJsdWVcIjogdGhpcy5wcm9wcy51c2VyLnN0YXRlLnRlYW0gPT09IFwiYmx1ZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnYW1lU3RhdGUsIHVzZXIgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgLy8gZ2FtZSBoYXNuJ3Qgc3RhcnRlZCB5ZXQsIHNob3cgaW5zdHJ1Y3Rpb25zIGFuZCB5b3VyIHRlYW1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbGxpc1JlbWFpbmluZyA9IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0IC0gdGhpcy5zdGF0ZS5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItY291bnRkb3duIGFuaW1hdGVkIGJvdW5jZUluXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPlJlZCB2cyBCbHVlPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+WW91IGFyZSBvbiB7dGhpcy5wcm9wcy51c2VyLnN0YXRlLnRlYW19IHRlYW0hPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8cD5UYXAgeW91ciBzY3JlZW4gYXMgZmFzdCBhcyBwb3NzaWJsZSB0byBlYXJuIHBvaW50cyBmb3IgeW91ciB0ZWFtLiBNb3N0IHBvaW50cyB3aW5zITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLWNvdW50ZG93bi1pbmRpY2F0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRpbmcgaW4ge01hdGguY2VpbChtaWxsaXNSZW1haW5pbmcgLyAxMDAwKX0uLi4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZSBpcyBjdXJyZW50bHkgaW4gcGxheVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFRpbWUgPj0gZ2FtZVN0YXRlLnRpbWVHYW1lU3RhcnQgJiYgdGhpcy5zdGF0ZS5jdXJyZW50VGltZSA8IGdhbWVTdGF0ZS50aW1lR2FtZVN0YXJ0ICsgZ2FtZVN0YXRlLmdhbWVEdXJhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci10YXAtY29sbGVjdG9yIGFuaW1hdGVkIHNsaWRlSW5SaWdodFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG91Y2h9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItdGFwLWJ1dHRvblwiIHJlZj17dGhpcy5oYW5kbGVCdXR0b25SZWZ9Pnt0aGlzLnN0YXRlLm51bVRhcHN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZSBlbmRlZFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB5b3VyVGVhbVBvaW50cyA9IHVzZXIuc3RhdGUudGVhbSA9PT0gXCJyZWRcIiA/IGdhbWVTdGF0ZS5yZWRQb2ludHMgOiBnYW1lU3RhdGUuYmx1ZVBvaW50cztcclxuICAgICAgICAgICAgY29uc3Qgb3RoZXJUZWFtUG9pbnRzID0gdXNlci5zdGF0ZS50ZWFtID09PSBcInJlZFwiID8gZ2FtZVN0YXRlLmJsdWVQb2ludHMgOiBnYW1lU3RhdGUucmVkUG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHlvdXJUZWFtUG9pbnRzID09PSBvdGhlclRlYW1Qb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZCBydmItdXNlci10aWUgYW5pbWF0ZWQgZmFkZUluXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5JdCdzIGEgdGllITwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBIb2x5IG1vbHkhIEJvdGggdGVhbXMgc2NvcmVkIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi1wb2ludHNcIj57eW91clRlYW1Qb2ludHN9IHBvaW50cyE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQtY29udHJpYnV0aW9uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGNvbnRyaWJ1dGVkIDxzcGFuIGNsYXNzTmFtZT1cInJ2Yi1wb2ludHNcIj57dGhpcy5zdGF0ZS5udW1UYXBzfSBwb2ludHMhPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b24gPSB5b3VyVGVhbVBvaW50cyA+IG90aGVyVGVhbVBvaW50cztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHdvbiA/IFwid29uIVwiIDogXCJsb3N0IDooXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAod29uICYmIE1hdGgucmFuZG9tKCkgPCAwLjIpIHsgLy8gcmVkdWNlIGNvbmZldHRpIG9uIG1vYmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGFkZENvbmZldHRpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnZiLXVzZXItZW5kZWQgYW5pbWF0ZWQgZmFkZUluXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMT5Zb3VyIHRlYW0ge3Jlc3VsdH08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJydmItdXNlci1lbmRlZC1tYXRjaHVwXCI+PHNwYW4gY2xhc3NOYW1lPVwicnZiLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e3lvdXJUZWFtUG9pbnRzfTwvc3Bhbj4gdG8gPHNwYW4gY2xhc3NOYW1lPVwicnZiLXBvaW50c1wiIHJlZj17cmFuZG9tQW5pbWF0ZX0+e290aGVyVGVhbVBvaW50c308L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ2Yi11c2VyLWVuZGVkLWNvbnRyaWJ1dGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBjb250cmlidXRlZCA8c3BhbiBjbGFzc05hbWU9XCJydmItcG9pbnRzXCI+e3RoaXMuc3RhdGUubnVtVGFwc30gcG9pbnRzITwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtMSEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS0xIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS0xIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFwiLi9mb3Jlc3QvbW9ua2V5cGF0Y2hUaHJlZVwiO1xyXG5pbXBvcnQgXCIuL2luaXRpYWxpemVGaXJlYmFzZVwiO1xyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuXHJcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2FwcFwiO1xyXG5cclxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XHJcblxyXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuKGJvZHkucmVxdWVzdEZ1bGxzY3JlZW4gJiYgYm9keS5yZXF1ZXN0RnVsbHNjcmVlbigpKSB8fFxyXG4oYm9keS5tb3pSZXF1ZXN0RnVsbFNjcmVlbiAmJiBib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKCkpIHx8XHJcbihib2R5LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuICYmIGJvZHkud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKSk7XHJcblxyXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuXHJcbnRyeSB7XHJcbiAgICBSZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdCk7XHJcbn0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICByb290IS5pbm5lclRleHQgPSBgRXJyb3I6ICR7ZS5uYW1lfSAtICR7ZS5tZXNzYWdlfS4gJHtlLnN0YWNrfWA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2VcIjtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogXCJBSXphU3lCVDNoVFlSajB1LUFwWkUxX1oxZnlYZjJaaVY5bWdYcjBcIixcclxuICAgIGF1dGhEb21haW46IFwicG9seXBob25lLWlvLmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9wb2x5cGhvbmUtaW8uZmlyZWJhc2Vpby5jb21cIixcclxuICAgIHByb2plY3RJZDogXCJwb2x5cGhvbmUtaW9cIixcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwicG9seXBob25lLWlvLmFwcHNwb3QuY29tXCIsXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIyNTUyMTgxNzgyNTZcIlxyXG59O1xyXG5cclxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50TGFuZGluZ1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgcGxheWVyQ291bnQ6IDMsXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJsYW5kaW5nLXBhZ2UtaGVhZGVyXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLW5hbWUtcHJlZml4XCI+V2VsY29tZSB0bzwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLW5hbWVcIj5HcmF5IEFyZWEgSW5jdWJhdG9yIFNob3djYXNlIDIwMTg8L3NwYW4+PC9oMT5cclxuICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImxhbmRpbmctcGFnZS1wbGF5ZXItY291bnQtaW5kaWNhdG9yXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLXBsYXllci1jb3VudFwiPnt0aGlzLnN0YXRlLnBsYXllckNvdW50fTwvc3Bhbj4gcGVvcGxlIHBsYXlpbmcuPC9kaXY+ICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5kaW5nLXBhZ2Utam9pbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9ldmVudC9nYWlzMjAxOC9wbGF5XCIgY2xhc3NOYW1lPVwibGFuZGluZy1wYWdlLWpvaW5cIj5Kb2luPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwiZmlyZWJhc2VcIjtcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhYmFzZUdhbWVTdGF0ZSwgRGF0YWJhc2VVc2VyIH0gZnJvbSBcIi4uL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IGdldE15VXNlcklkIH0gZnJvbSBcIi4uL3VzZXIvdXNlcklkXCI7XHJcbmltcG9ydCB7IFVzZXJTdGF0ZSB9IGZyb20gXCIuLi91c2VyL3VzZXJTdGF0ZVwiO1xyXG5cclxuY29uc3QgZGIgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xyXG5cclxuaW50ZXJmYWNlIENsaWVudFJvdXRlUGFyYW1zIHtcclxuICAgIGV2ZW50SWQ6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIENsaWVudFByb3BzIGV4dGVuZHMgUm91dGVDb21wb25lbnRQcm9wczxDbGllbnRSb3V0ZVBhcmFtcz4ge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ2xpZW50U3RhdGUge1xyXG4gICAgZ2FtZVN0YXRlPzogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyPzogRGF0YWJhc2VVc2VyPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFBhZ2VDbGllbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Q2xpZW50UHJvcHMsIENsaWVudFN0YXRlPiB7XHJcbiAgICBwcml2YXRlIGdhbWVTdGF0ZVJlZiE6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHByaXZhdGUgdXNlclJlZiE6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIHN0YXRlOiBDbGllbnRTdGF0ZSA9IHt9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IGdldE15VXNlcklkKCk7XHJcbiAgICAgICAgLy8gb25lLXRpbWUgcHV0IG15c2VsZiBvbiB0aGUgbGlzdCBvZiBwZW5kaW5nIHVzZXJzXHJcbiAgICAgICAgZGIucmVmKGBldmVudHMvJHt0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5ldmVudElkfS91c2Vyc1BlbmRpbmdgKS50cmFuc2FjdGlvbigocGVuZGluZ1VzZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIHBlbmRpbmdVc2VycyA9IChwZW5kaW5nVXNlcnMgfHwgW10pO1xyXG4gICAgICAgICAgICBwZW5kaW5nVXNlcnMucHVzaCh1c2VySWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGVuZGluZ1VzZXJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZVJlZiA9IGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH0vZ2FtZVN0YXRlYCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGUgPSBzbmFwc2hvdC52YWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVTdGF0ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51c2VyUmVmID0gZGIucmVmKGBldmVudHMvJHt0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5ldmVudElkfS91c2Vycy8ke3VzZXJJZH1gKTtcclxuICAgICAgICB0aGlzLnVzZXJSZWYub24oXCJ2YWx1ZVwiLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXI6IERhdGFiYXNlVXNlcjxhbnk+ID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlclJlZi5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGllbnQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlclVzZXJTdGF0ZSgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1heWJlUmVuZGVyVXNlclN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2FtZVN0YXRlLCB1c2VyIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChnYW1lU3RhdGUgPT0gbnVsbCB8fCB1c2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8VXNlclN0YXRlIGtleT17Z2FtZVN0YXRlLmdhbWVJZH0gZ2FtZVN0YXRlUmVmPXt0aGlzLmdhbWVTdGF0ZVJlZn0gZ2FtZVN0YXRlPXtnYW1lU3RhdGV9IHVzZXI9e3VzZXJ9IC8+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YWJhc2VFdmVudCB9IGZyb20gXCIuLi9maXJlYmFzZVNjaGVtYVwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tIFwiLi4vZXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9nYW1lcy9nYW1lU3RhdGVcIjtcclxuXHJcbmNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxuXHJcbmludGVyZmFjZSBFdmVudFBhZ2VEaXNwbGF5Um91dGVQYXJhbXMge1xyXG4gICAgZXZlbnRJZDogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRXZlbnRQYWdlRGlzcGxheVByb3BzIGV4dGVuZHMgUm91dGVDb21wb25lbnRQcm9wczxFdmVudFBhZ2VEaXNwbGF5Um91dGVQYXJhbXM+IHtcclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50UGFnZURpc3BsYXlTdGF0ZSB7XHJcbiAgICBldmVudD86IERhdGFiYXNlRXZlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFBhZ2VEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEV2ZW50UGFnZURpc3BsYXlQcm9wcywgRXZlbnRQYWdlRGlzcGxheVN0YXRlPiB7XHJcbiAgICBwcml2YXRlIGV2ZW50UmVmITogZmlyZWJhc2UuZGF0YWJhc2UuUmVmZXJlbmNlO1xyXG4gICAgcHJpdmF0ZSBnYW1lc01hbmFnZXIhOiBFdmVudE1hbmFnZXI7XHJcbiAgICBzdGF0ZTogRXZlbnRQYWdlRGlzcGxheVN0YXRlID0ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8gQXMgc29vbiBhcyB0aGlzIHBhZ2UgaXMgdmlzaXRlZCB3ZSdsbCBiZWdpbiBjeWNsaW5nIHRocm91Z2ggZ2FtZXMuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZiA9IGRiLnJlZihgZXZlbnRzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuZXZlbnRJZH1gKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVmLm9uKFwidmFsdWVcIiwgKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudDogRGF0YWJhc2VFdmVudCA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZXNNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcih0aGlzLmV2ZW50UmVmKTtcclxuICAgICAgICB0aGlzLmdhbWVzTWFuYWdlci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZXNNYW5hZ2VyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJldmVudC1wYWdlLWRpc3BsYXktY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckdhbWUoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckdhbWUoKSB7XHJcbiAgICAgICAgY29uc3QgeyBldmVudCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxHYW1lU3RhdGUga2V5PXtldmVudC5nYW1lU3RhdGUuZ2FtZUlkfSBnYW1lU3RhdGU9e2V2ZW50LmdhbWVTdGF0ZX0gdXNlcnM9e2V2ZW50LnVzZXJzfSAvPlxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaGFzR2VvbG9jYXRpb246IHRydWUsXHJcbiAgICAgICAgc2hvdWxkUmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmIChcImdlb2xvY2F0aW9uXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLyBkb19zb21ldGhpbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBoYXNHZW9sb2NhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRSZWRpcmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhc0dlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+U2VsZWN0IHlvdXIgZXZlbnQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2V2ZW50cy9nYWlzMjAxOFwiPkdyYXkgQXJlYSBJbmN1YmF0b3IgU2hvd2Nhc2UgMjAxODwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc2hvdWxkUmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG9tZS1wYWdlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5GaW5kaW5nIHlvdXIgY2xvc2VzdCBldmVudC4uLjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+RmluZCBtYW51YWxseTwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWUtcGFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+Rm91bmQhIFJlZGlyZWN0aW5nLi4uPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3QgdG89XCIvZXZlbnQvZ2FpczIwMThcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gcmFuZG9tVXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIpO1xyXG59XHJcblxyXG5sZXQgbXlVc2VySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeVVzZXJJZCgpIHtcclxuICAgIGlmIChteVVzZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlVXNlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXlVc2VySWRcIik7XHJcbiAgICAgICAgbXlVc2VySWQgPSBsb2NhbFN0b3JhZ2VVc2VySWQgfHwgcmFuZG9tVXNlcklkKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibXlVc2VySWRcIiwgbXlVc2VySWQpO1xyXG4gICAgICAgIHJldHVybiBteVVzZXJJZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IERhdGFiYXNlR2FtZVN0YXRlLCBEYXRhYmFzZVVzZXIgfSBmcm9tIFwic3JjL2ZpcmViYXNlU2NoZW1hXCI7XHJcbmltcG9ydCB7IFJlZHZzQmx1ZVVzZXIgfSBmcm9tIFwiLi4vZ2FtZXMvcmVkVnNCbHVlVXNlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lU3RhdGVQcm9wcyB7XHJcbiAgICBnYW1lU3RhdGVSZWY6IGZpcmViYXNlLmRhdGFiYXNlLlJlZmVyZW5jZTtcclxuICAgIGdhbWVTdGF0ZTogRGF0YWJhc2VHYW1lU3RhdGU7XHJcbiAgICB1c2VyOiBEYXRhYmFzZVVzZXI8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJTdGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxHYW1lU3RhdGVQcm9wcywge30+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZ2FtZVN0YXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInJlZHZzYmx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxSZWR2c0JsdWVVc2VyIGdhbWVTdGF0ZVJlZj17dGhpcy5wcm9wcy5nYW1lU3RhdGVSZWZ9IGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=