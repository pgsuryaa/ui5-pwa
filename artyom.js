/**
 * Artyom.js requires webkitSpeechRecognition and speechSynthesis APIs
 *
 * @license MIT
 * @version 1.0.5
 * @copyright 2017 Our Code World All Rights Reserved.
 * @author Carlos Delgado - www.ourcodeworld.com
 * @param {Object} window
 * @see https://sdkcarlos.github.io/sites/artyom.html
 * @see http://docs.ourcodeworld.com/projects/artyom-js
 * @returns {Object} artyom
 */
! function(a) {
	"use strict";

	function j() {
		this.getVoice = function(a) {
			var b = [];
			switch (a) {
				case "de-DE":
					b = f.german;
					break;
				case "en-GB":
					b = f.englishGB;
					break;
				case "pt-BR":
				case "pt-PT":
					b = f.brasilian;
					break;
				case "ru-RU":
					b = f.russia;
					break;
				case "nl-NL":
					b = f.holand;
					break;
				case "es-ES":
					b = f.spanish;
					break;
				case "en-US":
					b = f.englishUSA;
					break;
				case "fr-FR":
					b = f.france;
					break;
				case "it-IT":
					b = f.italian;
					break;
				case "ja-JP":
					b = f.japanese;
					break;
				case "id-ID":
					b = f.indonesia;
					break;
				case "hi-IN":
					b = f.hindi;
					break;
				case "pl-PL":
					b = f.polski;
					break;
				case "zh-CN":
					b = f.mandarinChinese;
					break;
				case "zh-HK":
					b = f.cantoneseChinese;
					break;
				case "native":
					b = f.native;
					break;
				default:
					console.warn("The given language '" + a + "' for artyom is not supported yet. Using native voice instead")
			}
			for (var c = void 0, d = speechSynthesis.getVoices(), e = b.length, g = 0; g < e; g++) {
				var h = d.filter(function(a) {
					return a.name == b[g] || a.lang == b[g]
				})[0];
				if (h) {
					c = h;
					break
				}
			}
			return c
		}, this.soundex = function(a) {
			var b = a.toLowerCase().split(""),
				c = b.shift(),
				d = "",
				e = {
					a: "",
					e: "",
					i: "",
					o: "",
					u: "",
					b: 1,
					f: 1,
					p: 1,
					v: 1,
					c: 2,
					g: 2,
					j: 2,
					k: 2,
					q: 2,
					s: 2,
					x: 2,
					z: 2,
					d: 3,
					t: 3,
					l: 4,
					m: 5,
					n: 5,
					r: 6
				};
			return d = c + b.map(function(a, b, c) {
				return e[a]
			}).filter(function(a, b, d) {
				return 0 === b ? a !== e[c] : a !== d[b - 1]
			}).join(""), (d + "000").slice(0, 4).toUpperCase()
		}
	}

	function k() {
		var f = {},
			k = [],
			l = new j;
		f.device = i, f.getVoices = function() {
			return a.speechSynthesis.getVoices()
		}, f.getAvailableCommands = function() {
			return k
		}, f.initialize = function(a) {
			return "object" != typeof a ? Promise.reject("You must give the configuration for start artyom properly.") : (a.hasOwnProperty("lang") &&
				(h = l.getVoice(a.lang), c.lang = a.lang), a.hasOwnProperty("continuous") && (a.continuous ? (c.continuous = !0, e.restartRecognition = !
					0) : (c.continuous = !1, e.restartRecognition = !1)), a.hasOwnProperty("speed") && (c.speed = a.speed), a.hasOwnProperty("soundex") &&
				(c.soundex = a.soundex), a.hasOwnProperty("executionKeyword") && (c.executionKeyword = a.executionKeyword), a.hasOwnProperty(
					"obeyKeyword") && (c.obeyKeyword = a.obeyKeyword), a.hasOwnProperty("volume") && (c.volume = a.volume), a.hasOwnProperty("listen") &&
				(c.listen = a.listen), a.hasOwnProperty("debug") ? c.debug = a.debug : console.warn(
					"The initialization doesn't provide how the debug mode should be handled. Is recommendable to set this value either to true or false."
				), a.mode && (c.mode = a.mode), c.listen === !0 ? new Promise(function(a, b) {
					p(a, b)
				}) : Promise.resolve())
		}, f.fatality = function() {
			try {
				return e.restartRecognition = !1, b.stop(), !0
			} catch (a) {
				return console.log(a), !1
			}
		}, f.addCommands = function(a) {
			var b = function(a) {
				a.hasOwnProperty("indexes") ? k.push(a) : (console.error("The following command doesn't provide any index to execute :"), console.dir(
					a))
			};
			if (a instanceof Array)
				for (var c = 0; c < a.length; c++) b(a[c]);
			else b(a);
			return !0
		}, f.removeCommands = function(a) {
			if ("string" == typeof a) {
				for (var b = [], c = 0; c < k.length; c++) {
					var d = k[c];
					d.indexes.indexOf(a) && b.push(c)
				}
				for (var e = 0; e < b.length; e++) k.splice(e, 1)
			}
			return b
		}, f.emptyCommands = function() {
			return k = []
		}, f.shutUp = function() {
			if ("speechSynthesis" in a)
				do a.speechSynthesis.cancel(); while (a.speechSynthesis.pending === !0);
			c.speaking = !1, f.clearGarbageCollection()
		}, f.getProperties = function() {
			return c
		};
		var m = function(a, b) {
			var c = new CustomEvent(a, {
				detail: b
			});
			return document.dispatchEvent(c), c
		};
		f.when = function(a, b) {
			return document.addEventListener(a, function(a) {
				b(a.detail)
			}, !1)
		}, f.getLanguage = function() {
			return c.lang
		};
		var n = function(b, e, i, j) {
				var k = new SpeechSynthesisUtterance;
				if (k.text = b, k.volume = c.volume, k.rate = c.speed, h) {
					var n = void 0;
					n = j && j.hasOwnProperty("lang") ? l.getVoice(j.lang) : l.getVoice(c.lang), f.device.isMobile ? n && (k.lang = n.lang) : k.voice = n
				} else console.warn(
					"No voice was selected during the initialization probably because there were no voices available. Initialize artyom after the onload event of the window."
				);
				1 == e && k.addEventListener("start", function() {
					c.speaking = !0, f.debug("Event reached : " + g.SPEECH_SYNTHESIS_START), m(g.SPEECH_SYNTHESIS_START), j && "function" == typeof j.onStart &&
						j.onStart.call(k)
				}), e >= i && k.addEventListener("end", function() {
					c.speaking = !1, f.debug("Event reached : " + g.SPEECH_SYNTHESIS_END), m(g.SPEECH_SYNTHESIS_END), j && "function" == typeof j.onEnd &&
						j.onEnd.call(k)
				}), f.debug(e + " text chunk processed succesfully out of " + i), d.push(k), a.speechSynthesis.speak(k)
			},
			o = function(a, b) {
				a = a || "", b = b || 100;
				for (var c = b, d = 0, e = []; a[c];) " " == a[c++] && (e.push(a.substring(d, c)), d = c, c += b);
				return e.push(a.substr(d)), e
			};
		f.say = function(a, b) {
			var d = 115;
			if (f.speechSupported())
				if ("string" == typeof a)
					if (a.length > 0) {
						var e = [];
						if (a.length > d) {
							var g = a.split(/,|:|\.|;/);
							g.forEach(function(a, b) {
								if (a.length > d) {
									var c = o(a, d);
									e.push.apply(e, c)
								} else e.push(a)
							})
						} else e.push(a);
						e = e.filter(function(a) {
							return a
						}), e.forEach(function(a, c) {
							var d = c + 1;
							a && n(a, d, e.length, b)
						}), c.helpers.lastSay = {
							text: a,
							date: new Date
						}
					} else console.warn("Artyom expects a string to say ... none given.");
			else console.warn("Artyom expects a string to say ... " + typeof a + " given.")
		}, f.repeatLastSay = function(a) {
			var b = c.helpers.lastSay;
			return a ? b : void(null != b && f.say(b.text))
		}, f.speechSupported = function() {
			return "speechSynthesis" in a
		}, f.recognizingSupported = function() {
			return "webkitSpeechRecognition" in a
		};
		var p = function(a, d) {
			var h, i;
			f.device.isMobile ? (b.continuous = !1, b.interimResults = !1, b.maxAlternatives = 1) : (b.continuous = !0, b.interimResults = !0), b.lang =
				c.lang, b.onstart = function() {
					f.debug("Event reached : " + g.COMMAND_RECOGNITION_START), m(g.COMMAND_RECOGNITION_START), c.recognizing = !0, i = !0, a()
				}, b.onerror = function(a) {
					d(a.error), m(g.ERROR, {
						code: a.error
					}), "audio-capture" == a.error && (i = !1), "not-allowed" == a.error && (i = !1, a.timeStamp - h < 100 ? m(g.ERROR, {
						code: "info-blocked",
						message: "Artyom needs the permision of the microphone, is blocked."
					}) : m(g.ERROR, {
						code: "info-denied",
						message: "Artyom needs the permision of the microphone, is denied"
					}))
				}, b.onend = function() {
					e.restartRecognition === !0 ? (i === !0 ? (b.start(), f.debug("Continuous mode enabled, restarting", "info")) : console.error(
						"Verify the microphone and check for the table of errors in sdkcarlos.github.io/sites/artyom.html to solve your problem. If you want to give your user a message when an error appears add an artyom listener"
					), m(g.COMMAND_RECOGNITION_END, {
						code: "continuous_mode_enabled",
						message: "OnEnd event reached with continuous mode"
					})) : m(g.COMMAND_RECOGNITION_END, {
						code: "continuous_mode_disabled",
						message: "OnEnd event reached without continuous mode"
					}), c.recognizing = !1
				};
			var j;
			if ("normal" == c.mode && (j = function(a) {
					if (!k.length) return void f.debug("No commands to process in normal mode.");
					var d = a.results.length;
					m(g.TEXT_RECOGNIZED);
					for (var e = a.resultIndex; e < d; ++e) {
						var h = a.results[e][0].transcript;
						if (a.results[e].isFinal) {
							var i = q(h.trim());
							if ("function" == typeof c.helpers.redirectRecognizedTextOutput && c.helpers.redirectRecognizedTextOutput(h, !0), i !== !1 && 1 ==
								c.recognizing) {
								f.debug("<< Executing Matching Recognition in normal mode >>", "info"), b.stop(), c.recognizing = !1, i.wildcard ? i.objeto.action(
									i.indice, i.wildcard.item, i.wildcard.full) : i.objeto.action(i.indice);
								break
							}
						} else {
							if ("function" == typeof c.helpers.redirectRecognizedTextOutput && c.helpers.redirectRecognizedTextOutput(h, !1), "string" ==
								typeof c.executionKeyword && h.indexOf(c.executionKeyword) != -1) {
								var i = q(h.replace(c.executionKeyword, "").trim());
								if (i !== !1 && 1 == c.recognizing) {
									f.debug("<< Executing command ordered by ExecutionKeyword >>", "info"), b.stop(), c.recognizing = !1, i.wildcard ? i.objeto.action(
										i.indice, i.wildcard.item, i.wildcard.full) : i.objeto.action(i.indice);
									break
								}
							}
							f.debug("Normal mode : " + h)
						}
					}
				}), "quick" == c.mode && (j = function(a) {
					if (!k.length) return void f.debug("No commands to process.");
					var d = a.results.length;
					m(g.TEXT_RECOGNIZED);
					for (var e = a.resultIndex; e < d; ++e) {
						var h = a.results[e][0].transcript;
						if (a.results[e].isFinal) {
							var i = q(h.trim());
							if ("function" == typeof c.helpers.redirectRecognizedTextOutput && c.helpers.redirectRecognizedTextOutput(h, !1), i !== !1 && 1 ==
								c.recognizing) {
								f.debug("<< Executing Matching Recognition in quick mode >>", "info"), b.stop(), c.recognizing = !1, i.wildcard ? i.objeto.action(
									i.indice, i.wildcard.item) : i.objeto.action(i.indice);
								break
							}
						} else {
							var i = q(h.trim());
							if ("function" == typeof c.helpers.redirectRecognizedTextOutput && c.helpers.redirectRecognizedTextOutput(h, !0), i !== !1 && 1 ==
								c.recognizing) {
								f.debug("<< Executing Matching Recognition in quick mode >>", "info"), b.stop(), c.recognizing = !1, i.wildcard ? i.objeto.action(
									i.indice, i.wildcard.item) : i.objeto.action(i.indice);
								break
							}
						}
						f.debug("Quick mode : " + h)
					}
				}), "remote" == c.mode && (j = function(a) {
					var b = a.results.length;
					if (m(g.TEXT_RECOGNIZED), "function" != typeof c.helpers.remoteProcessorHandler) return f.debug(
						"The remoteProcessorService is undefined.", "warn");
					for (var d = a.resultIndex; d < b; ++d) {
						var e = a.results[d][0].transcript;
						c.helpers.remoteProcessorHandler({
							text: e,
							isFinal: a.results[d].isFinal
						})
					}
				}), b.onresult = function(a) {
					if (c.obeying) j(a);
					else {
						if (!c.obeyKeyword) return;
						for (var b = "", d = "", e = 0; e < a.results.length; ++e) a.results[e].final ? b += a.results[e][0].transcript : d += a.results[e][
							0
						].transcript;
						f.debug("Artyom is not obeying", "warn"), (d.indexOf(c.obeyKeyword) > -1 || b.indexOf(c.obeyKeyword) > -1) && (c.obeying = !0)
					}
				}, c.recognizing) b.stop(), f.debug("Event reached : " + g.COMMAND_RECOGNITION_END), m(g.COMMAND_RECOGNITION_END);
			else try {
				b.start()
			} catch (a) {
				m(g.ERROR, {
					code: "recognition_overlap",
					message: "A webkitSpeechRecognition instance has been started while there's already running. Is recommendable to restart the Browser"
				})
			}
		};
		f.simulateInstruction = function(a) {
			if (!a || "string" != typeof a) return console.warn("Cannot execute a non string command"), !1;
			var b = q(a);
			return "object" != typeof b ? (console.warn("No command founded trying with " + a), !1) : b.objeto ? (b.objeto.smart ? (f.debug(
				"Smart command matches with simulation, executing", "info"), b.objeto.action(b.indice, b.wildcard.item, b.wildcard.full)) : (f.debug(
				"Command matches with simulation, executing", "info"), b.objeto.action(b.indice)), !0) : void 0
		};
		var q = function(a) {
			if (!a) return console.warn("Internal error: Execution of empty command"), !1;
			f.debug(">> " + a);
			for (var b = 0; b < k.length; b++) {
				for (var d = k[b], e = d.indexes, h = -1, i = 0; i < e.length; i++) {
					var j = e[i];
					if (d.smart) {
						if (j instanceof RegExp) j.test(a) && (f.debug(">> REGEX " + j.toString() + " MATCHED AGAINST " + a + " WITH INDEX " + i +
							" IN COMMAND ", "info"), h = parseInt(i));
						else if (j.indexOf("*") != -1) {
							var n = j.split("*");
							if (n.length > 2) {
								console.warn("Artyom found a smart command with " + (n.length - 1) +
									" wildcards. Artyom only support 1 wildcard for each command. Sorry");
								continue
							}
							var o = n[0],
								p = n[1];
							if ("" == p || " " == p) {
								if (a.indexOf(o) != -1 || a.toLowerCase().indexOf(o.toLowerCase()) != -1) {
									var q = a.replace(o, "");
									q = q.toLowerCase().replace(o.toLowerCase(), ""), h = parseInt(i)
								}
							} else if (!(a.indexOf(o) == -1 && a.toLowerCase().indexOf(o.toLowerCase()) == -1 || a.indexOf(p) == -1 && a.toLowerCase().indexOf(
									p.toLowerCase()) == -1)) {
								var q = a.replace(o, "").replace(p, "");
								q = q.toLowerCase().replace(o.toLowerCase(), "").replace(p.toLowerCase(), ""), q = q.toLowerCase().replace(p.toLowerCase(), ""), h =
									parseInt(i)
							}
						} else console.warn(
							"Founded command marked as SMART but have no wildcard in the indexes, remove the SMART for prevent extensive memory consuming or add the wildcard *"
						);
						if (h >= 0) {
							h = parseInt(i);
							break
						}
					}
				}
				if (h >= 0) return m(g.COMMAND_MATCHED), {
					indice: h,
					objeto: d,
					wildcard: {
						item: q,
						full: a
					}
				}
			}
			for (var b = 0; b < k.length; b++) {
				for (var d = k[b], e = d.indexes, h = -1, i = 0; i < e.length; i++) {
					var j = e[i];
					if (!d.smart) {
						if (a === j) {
							f.debug(">> MATCHED FULL EXACT OPTION " + j + " AGAINST " + a + " WITH INDEX " + i + " IN COMMAND ", "info"), h = parseInt(i);
							break
						}
						if (a.toLowerCase() === j.toLowerCase()) {
							f.debug(">> MATCHED OPTION CHANGING ALL TO LOWERCASE " + j + " AGAINST " + a + " WITH INDEX " + i + " IN COMMAND ", "info"), h =
								parseInt(i);
							break
						}
					}
				}
				if (h >= 0) return m(g.COMMAND_MATCHED), {
					indice: h,
					objeto: d
				}
			}
			for (var b = 0; b < k.length; b++) {
				for (var d = k[b], e = d.indexes, h = -1, i = 0; i < e.length; i++)
					if (!d.smart) {
						var j = e[i];
						if (a.indexOf(j) >= 0) {
							f.debug(">> MATCHED INDEX EXACT OPTION " + j + " AGAINST " + a + " WITH INDEX " + i + " IN COMMAND ", "info"), h = parseInt(i);
							break
						}
						if (a.toLowerCase().indexOf(j.toLowerCase()) >= 0) {
							f.debug(">> MATCHED INDEX OPTION CHANGING ALL TO LOWERCASE " + j + " AGAINST " + a + " WITH INDEX " + i + " IN COMMAND ", "info"),
								h = parseInt(i);
							break
						}
					}
				if (h >= 0) return m(g.COMMAND_MATCHED), {
					indice: h,
					objeto: d
				}
			}
			if (c.soundex)
				for (var b = 0; b < k.length; b++)
					for (var d = k[b], e = d.indexes, h = -1, i = 0; i < e.length; i++) {
						var j = e[i];
						if (!d.smart && l.soundex(a) == l.soundex(j)) return f.debug(">> Matched Soundex command '" + j + "' AGAINST '" + a +
							"' with index " + i, "info"), h = parseInt(i), m(g.COMMAND_MATCHED), {
							indice: h,
							objeto: d
						}
					}
			return f.debug("Event reached : " + g.NOT_COMMAND_MATCHED), m(g.NOT_COMMAND_MATCHED), !1
		};
		return f.debug = function(a, b) {
			if (c.debug === !0) switch (b) {
				case "error":
					console.log(" %cArtyom.js  " + a, "background: #C12127; color: #FFFFFF");
					break;
				case "warn":
					console.warn(a);
					break;
				case "info":
					console.log(" %cArtyom.js:  " + a, "background: #4285F4; color: #FFFFFF");
					break;
				default:
					console.log(" %cArtyom.js %c  " + a, "background: #005454; color: #BFF8F8", "color:black;")
			}
		}, f.detectErrors = function() {
			if ("file:" == a.location.protocol) {
				var b =
					"Fatal Error Detected : It seems you're running the artyom demo from a local file ! The SpeechRecognitionAPI Needs to be hosted someway (server as http or https). Artyom will NOT work here, Sorry.";
				return console.error(b), {
					code: "artyom_error_localfile",
					message: b
				}
			}
			if (!f.device.isChrome) {
				var b =
					"Fatal Error Detected: You are not running Google Chrome ! SpeechRecognitionAPI and SpeechSynthesisAPI is only available in google chrome ! ";
				return console.error(b), {
					code: "artyom_error_browser_unsupported",
					message: b
				}
			}
			return "https:" != a.location.protocol && console.warn("Artyom is not running in HTTPS protocol,running in protocol : " + a.location.protocol +
				" that means the browser will ask the permission of microphone too often. You need a HTTPS Connection if you want artyom in continuous mode !"
			), !1
		}, f.redirectRecognizedTextOutput = function(a) {
			return "function" != typeof a ? (console.warn("Expected function to handle the recognized text ..."), !1) : (c.helpers.redirectRecognizedTextOutput =
				a, !0)
		}, f.sayRandom = function(a) {
			if (a instanceof Array) {
				var b = Math.floor(Math.random() * a.length);
				return f.say(a[b]), {
					text: a[b],
					index: b
				}
			}
			return console.error("Random quotes must be in an array !"), null
		}, f.newDictation = function(a) {
			if (!f.recognizingSupported()) return console.error("SpeechRecognition is not supported in this browser"), !1;
			var b = new webkitSpeechRecognition;
			return b.continuous = !0, b.interimResults = !0, b.lang = c.lang, b.onresult = function(b) {
				for (var c = "", d = "", e = 0; e < b.results.length; ++e) b.results[e].final ? c += b.results[e][0].transcript : d += b.results[e][0]
					.transcript;
				a.onResult && a.onResult(d, c)
			}, new function() {
				var c = b,
					d = !0,
					e = !1;
				this.onError = null, this.start = function() {
					a.continuous === !0 && (e = !0), c.onstart = function() {
						"function" == typeof a.onStart && d === !0 && a.onStart()
					}, c.onend = function() {
						e === !0 ? (d = !1, c.start()) : (d = !0, "function" == typeof a.onEnd && a.onEnd())
					}, c.start()
				}, this.stop = function() {
					e = !1, c.stop()
				}, "function" == typeof a.onError && (c.onerror = a.onError)
			}
		}, f.newPrompt = function(a) {
			"object" != typeof a && console.error("Expected the prompt configuration.");
			var b = Object.assign([], k);
			f.emptyCommands();
			var c = {
				description: "Setting the artyom commands only for the prompt. The commands will be restored after the prompt finishes",
				indexes: a.options,
				action: function(c, d) {
					k = b;
					var e = a.onMatch(c, d);
					return "function" != typeof e ? void console.error("onMatch function expects a returning function to be executed") : void e()
				}
			};
			a.smart && (c.smart = !0), f.addCommands(c), "undefined" != typeof a.beforePrompt && a.beforePrompt(), f.say(a.question, {
				onStart: function() {
					"undefined" != typeof a.onStartPrompt && a.onStartPrompt()
				},
				onEnd: function() {
					"undefined" != typeof a.onEndPrompt && a.onEndPrompt()
				}
			})
		}, f.extensions = function() {
			return {}
		}, f.getNativeApi = function() {
			return b
		}, f.isRecognizing = function() {
			return c.recognizing
		}, f.isSpeaking = function() {
			return c.speaking
		}, f.clearGarbageCollection = function() {
			return d = []
		}, f.getGarbageCollection = function() {
			return d
		}, f.setDebug = function(a) {
			return a ? c.debug = !0 : c.debug = !1
		}, f.dontObey = function() {
			return c.obeying = !1
		}, f.obey = function() {
			return c.obeying = !0
		}, f.isObeying = function() {
			return c.obeying
		}, f.getVersion = function() {
			return "1.0.5"
		}, f.on = function(a, b) {
			return {
				then: function(c) {
					var d = {
						indexes: a,
						action: c
					};
					b && (d.smart = !0), f.addCommands(d)
				}
			}
		}, f.remoteProcessorService = function(a) {
			return c.helpers.remoteProcessorHandler = a, !0
		}, f.voiceAvailable = function(a) {
			return "undefined" != typeof l.getVoice(a)
		}, f
	}
	if (a.hasOwnProperty("speechSynthesis") && speechSynthesis.getVoices(), a.hasOwnProperty("webkitSpeechRecognition")) var b = new webkitSpeechRecognition;
	var c = {
			lang: "en-GB",
			recognizing: !1,
			continuous: !1,
			speed: 1,
			volume: 1,
			listen: !1,
			mode: "normal",
			debug: !1,
			helpers: {
				redirectRecognizedTextOutput: null,
				remoteProcessorHandler: null,
				lastSay: null
			},
			executionKeyword: null,
			obeyKeyword: null,
			speaking: !1,
			obeying: !0,
			soundex: !1
		},
		d = [],
		e = {
			restartRecognition: !1
		},
		f = {
			german: ["Google Deutsch", "de-DE", "de_DE"],
			spanish: ["Google español", "es-ES", "es_ES", "es-MX", "es_MX"],
			italian: ["Google italiano", "it-IT", "it_IT"],
			japanese: ["Google 日本人", "ja-JP", "ja_JP"],
			englishUSA: ["Google US English", "en-US", "en_US"],
			englishGB: ["Google UK English Male", "Google UK English Female", "en-GB", "en_GB"],
			brasilian: ["Google português do Brasil", "pt-PT", "pt-BR", "pt_PT", "pt_BR"],
			russia: ["Google русский", "ru-RU", "ru_RU"],
			holand: ["Google Nederlands", "nl-NL", "nl_NL"],
			france: ["Google français", "fr-FR", "fr_FR"],
			polski: ["Google polski", "pl-PL", "pl_PL"],
			indonesia: ["Google Bahasa Indonesia", "id-ID", "id_ID"],
			hindi: ["Google हिन्दी", "hi-IN", "hi_IN"],
			mandarinChinese: ["Google 普通话（中国大陆）", "zh-CN", "zh_CN"],
			cantoneseChinese: ["Google 粤語（香港）", "zh-HK", "zh_HK"],
			native: ["native"]
		},
		g = {
			ERROR: "ERROR",
			SPEECH_SYNTHESIS_START: "SPEECH_SYNTHESIS_START",
			SPEECH_SYNTHESIS_END: "SPEECH_SYNTHESIS_END",
			TEXT_RECOGNIZED: "TEXT_RECOGNIZED",
			COMMAND_RECOGNITION_START: "COMMAND_RECOGNITION_START",
			COMMAND_RECOGNITION_END: "COMMAND_RECOGNITION_END",
			COMMAND_MATCHED: "COMMAND_MATCHED",
			NOT_COMMAND_MATCHED: "NOT_COMMAND_MATCHED"
		},
		h = {
			default: !1,
			lang: "en-GB",
			localService: !1,
			name: "Google UK English Male",
			voiceURI: "Google UK English Male"
		},
		i = {
			isMobile: !1,
			isChrome: !0
		};
	(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent
		.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(
			/Windows Phone/i)) && (i.isMobile = !0), navigator.userAgent.indexOf("Chrome") == -1 && (i.isChrome = !1), "undefined" == typeof artyom ?
		a.artyom = Object.preventExtensions(new k) : console.info("Artyom has been already defined in the Window")
}(window);