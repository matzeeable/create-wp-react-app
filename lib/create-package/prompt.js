"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var _1 = require("./");
var utils_1 = require("../utils");
var path_1 = require("path");
var slugify_1 = __importDefault(require("slugify"));
var misc_1 = require("../misc");
/**
 * Prompt for CLI arguments which are not passed.
 *
 * @param opts
 */
function createPackagePrompt(_a) {
    var cwd = _a.cwd, packageName = _a.packageName, packageDesc = _a.packageDesc, author = _a.author, packageUri = _a.packageUri, namespace = _a.namespace, abbreviation = _a.abbreviation;
    return __awaiter(this, void 0, void 0, function () {
        var createWorkspaceCwd, root, gitName, mockData, answers, _b, parsed, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    createWorkspaceCwd = cwd ? path_1.resolve(cwd) : process.cwd();
                    root = utils_1.checkValidWorkspace(createWorkspaceCwd, _1.createPackageCommand);
                    gitName = utils_1.getGitConfig("user.name");
                    mockData = utils_1.getInternalExampleArgs("package");
                    _b = mockData;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.prompt([
                            !packageName && {
                                name: "packageName",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--package-name"),
                                type: "input",
                                validate: function (value) {
                                    return /^[A-Za-z0-9-_]+$/.test(value) ? true : "Your package slug should only contain [A-Za-z0-9-_].";
                                }
                            },
                            !packageDesc && {
                                name: "packageDesc",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--package-desc"),
                                type: "input"
                            },
                            !author && {
                                name: "author",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--author"),
                                type: "input",
                                validate: utils_1.inquirerRequiredValidate,
                                default: gitName
                            },
                            !packageUri && {
                                name: "packageUri",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--package-uri"),
                                type: "input",
                                validate: function (value) { return (value ? utils_1.isValidUrl(value, true) : true); }
                            },
                            !namespace && {
                                name: "namespace",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--namespace"),
                                type: "input",
                                validate: function (value) {
                                    var required = utils_1.inquirerRequiredValidate(value);
                                    if (required !== true) {
                                        return required;
                                    }
                                    return utils_1.isValidPhpNamespace(value) ? true : "This is not a valid PHP namespace.";
                                },
                                default: function (dAnswers) {
                                    var useThis = (dAnswers.author || author);
                                    var useSlug = (dAnswers.packageName || packageName);
                                    return useThis && useSlug
                                        ? utils_1.slugCamelCase(slugify_1.default(useThis, {
                                            lower: true
                                        }), true) +
                                            "\\" +
                                            utils_1.slugCamelCase(useSlug, true)
                                        : undefined;
                                }
                            },
                            !abbreviation && {
                                name: "abbreviation",
                                message: utils_1.getCommandDescriptionForPrompt(_1.createPackageCommand, "--abbreviation"),
                                type: "input",
                                validate: function (value) {
                                    var required = utils_1.inquirerRequiredValidate(value);
                                    if (required !== true) {
                                        return required;
                                    }
                                    return /^[A-Za-z_]+$/.test(value)
                                        ? true
                                        : "This is not a valid abbreviation (allowed: [A-Za-z_]).";
                                },
                                default: function (dAnswers) {
                                    var result = (dAnswers.packageName || packageName).replace(/-/g, "_");
                                    var availableFirstLetters = result.match(/_(.)/g);
                                    if (availableFirstLetters && availableFirstLetters.length > 1) {
                                        return result.charAt(0) + availableFirstLetters.map(function (o) { return o.slice(1); }).join("");
                                    }
                                    return result;
                                }
                            }
                        ].filter(Boolean))];
                case 1:
                    _b = (_c.sent());
                    _c.label = 2;
                case 2:
                    answers = _b;
                    // If there is no package name given via CLI also ask for email marketing
                    return [4 /*yield*/, misc_1.newsletterPrompt(!mockData && !packageName)];
                case 3:
                    // If there is no package name given via CLI also ask for email marketing
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    parsed = __assign({ cwd: cwd,
                        packageName: packageName,
                        packageDesc: packageDesc,
                        author: author,
                        packageUri: packageUri,
                        namespace: namespace,
                        abbreviation: abbreviation }, answers);
                    parsed.namespace = parsed.namespace.replace(/\\\\/g, "\\");
                    parsed = utils_1.caseAll(parsed, [], ["abbreviation", "packageName", "packageUri"]);
                    return [4 /*yield*/, _1.createPackageExecute(root, parsed)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _c.sent();
                    utils_1.logError(e_1.toString());
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createPackagePrompt = createPackagePrompt;
