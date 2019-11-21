"use strict";
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function(resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function() {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function(v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var program_1 = require("./program");
var utils_1 = require("../utils");
var chalk_1 = __importDefault(require("chalk"));
var path_1 = require("path");
var execute_1 = require("./execute");
var fs_1 = require("fs");
/**
 * Prompt for CLI arguments which are not passed.
 */
function createPluginPrompt(_a) {
    var _this = this;
    var cwd = _a.cwd,
        pluginName = _a.pluginName,
        slug = _a.slug,
        pluginUri = _a.pluginUri,
        pluginDesc = _a.pluginDesc,
        author = _a.author,
        authorUri = _a.authorUri,
        pluginVersion = _a.pluginVersion,
        minPhp = _a.minPhp,
        minWp = _a.minWp,
        namespace = _a.namespace,
        optPrefix = _a.optPrefix,
        dbPrefix = _a.dbPrefix,
        constantPrefix = _a.constantPrefix;
    var createWorkspaceCwd = cwd ? path_1.resolve(cwd) : process.cwd();
    // Get the root package
    var root;
    try {
        root = getValidWorkspace(createWorkspaceCwd);
        if (!fs_1.existsSync(path_1.resolve(createWorkspaceCwd, utils_1.FOLDER_CWRA, "template"))) {
            throw new Error("The template folder in common/create-wp-react-app could not be found!");
        }
    } catch (e) {
        utils_1.logError(e.toString());
        utils_1.logError(
            "You are not using the command inside a folder which was created with " +
                chalk_1.default.underline("create-wp-react-app create-workspace") +
                ". Navigate to that folder or use the " +
                chalk_1.default.underline("--cwd") +
                " argument."
        );
        program_1.createPluginCommand.help();
    }
    inquirer_1
        .prompt(
            [
                !pluginName && {
                    name: "pluginName",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--plugin-name"),
                    type: "input",
                    validate: utils_1.inquirerRequiredValidate
                },
                !slug && {
                    name: "slug",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--slug"),
                    type: "input",
                    default: function(answers) {
                        var useThis = answers.pluginName || pluginName;
                        if (useThis) {
                            return useThis.toLowerCase().replace(/ /g, "-");
                        }
                        return undefined;
                    },
                    validate: function(value) {
                        if (/^[A-Za-z0-9-_]+$/.test(value)) {
                            return true;
                        }
                        return "Your plugin slug should only contain [A-Za-z0-9-_]";
                    }
                },
                !pluginUri && {
                    name: "pluginUri",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--plugin-uri"),
                    type: "input"
                },
                !pluginDesc && {
                    name: "pluginDesc",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--plugin-desc"),
                    type: "input"
                },
                !author && {
                    name: "author",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--author"),
                    type: "input",
                    validate: utils_1.inquirerRequiredValidate
                },
                !authorUri && {
                    name: "authorUri",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--author-uri"),
                    type: "input"
                },
                !pluginVersion && {
                    name: "pluginVersion",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--plugin-version"),
                    type: "input",
                    default: "1.0.0"
                },
                !minPhp && {
                    name: "minPhp",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--min-php"),
                    type: "input",
                    default: "7.0"
                },
                !minWp && {
                    name: "minWp",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--min-wp"),
                    type: "input",
                    default: "5.2"
                },
                !namespace && {
                    name: "namespace",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--namespace"),
                    type: "input",
                    validate: utils_1.inquirerRequiredValidate
                },
                !optPrefix && {
                    name: "optPrefix",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--opt-prefix"),
                    type: "input",
                    validate: utils_1.inquirerRequiredValidate
                },
                !dbPrefix && {
                    name: "dbPrefix",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--db-prefix"),
                    type: "input",
                    default: function(answers) {
                        var useThis = answers.optPrefix || optPrefix;
                        return useThis ? useThis : undefined;
                    },
                    validate: utils_1.inquirerRequiredValidate
                },
                !constantPrefix && {
                    name: "constantPrefix",
                    message: utils_1.getCommandDescriptionForPrompt(program_1.createPluginCommand, "--constant-prefix"),
                    type: "input",
                    default: function(answers) {
                        var useThis = answers.optPrefix || optPrefix;
                        return useThis ? useThis.toUpperCase() : undefined;
                    },
                    validate: utils_1.inquirerRequiredValidate
                }
            ].filter(Boolean)
        )
        .then(function(answers) {
            return __awaiter(_this, void 0, void 0, function() {
                var parsed, e_1;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            parsed = __assign(
                                {
                                    cwd: cwd,
                                    pluginName: pluginName,
                                    slug: slug,
                                    pluginUri: pluginUri,
                                    pluginDesc: pluginDesc,
                                    author: author,
                                    authorUri: authorUri,
                                    pluginVersion: pluginVersion,
                                    minPhp: minPhp,
                                    minWp: minWp,
                                    namespace: namespace,
                                    optPrefix: optPrefix,
                                    dbPrefix: dbPrefix,
                                    constantPrefix: constantPrefix
                                },
                                answers
                            );
                            parsed.namespace = parsed.namespace.replace(/\\\\/g, "\\");
                            parsed = utils_1.caseAll(
                                parsed,
                                ["constantPrefix"],
                                ["slug", "pluginUri", "authorUri", "optPrefix", "dbPrefix"]
                            );
                            return [4 /*yield*/, execute_1.createPluginExecute(root, parsed)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            utils_1.logError(e_1.toString());
                            return [3 /*break*/, 3];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        });
}
exports.createPluginPrompt = createPluginPrompt;
/**
 * Get a valid workspace package.json content.
 *
 * @param cwd
 * @returns package.json content of the root
 * @throws
 */
function getValidWorkspace(cwd) {
    var json = require(path_1.join(cwd, "package.json"));
    utils_1.logSuccess("Successfully found " + chalk_1.default.underline(json.name) + " as root project!");
    if (!json.private) {
        throw new Error("This project is not private. Yarn root workspaces must be private!");
    }
    if (!json.workspaces) {
        throw new Error("This project has no workspaces defined.");
    }
    if (JSON.stringify(json.workspaces).indexOf("plugins/*") === -1) {
        throw new Error("This project has no plugins/* workspaces defined.");
    }
    return json;
}