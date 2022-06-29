"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var dialog = new Dialog();
var bausteinRenderType = {
    bausteinSelector: -1,
    layout: 0,
    table: 1,
    tableRow: 2,
    tableCell: 3,
    plaintext: 4,
    richtext: 5,
    image: 6,
    button: 7,
    isParentType: function (renderType) {
        return renderType === this.layout || renderType === this.table || renderType === this.tableRow;
    }
};
var Position = (function () {
    function Position(parent, sort) {
        this.parent = parent;
        this.sort = sort;
    }
    return Position;
}());
var BausteinStyleProperty = (function () {
    function BausteinStyleProperty(name, title, type, suffix, options, useAsClass, showInBausteinAttributesSidebar) {
        this.name = name;
        this.title = title;
        this.type = type;
        this.suffix = suffix;
        this.options = options;
        this.useAsClass = useAsClass;
        this.showInBausteinAttributesSidebar = showInBausteinAttributesSidebar;
    }
    return BausteinStyleProperty;
}());
var BausteinStyle = (function () {
    function BausteinStyle(property, value) {
        this.property = property;
        this.value = value;
    }
    return BausteinStyle;
}());
var BausteinTemplate = (function () {
    function BausteinTemplate(type, title, icon, tag, renderType, style) {
        this.type = type;
        this.title = title;
        this.icon = icon;
        this.tag = tag;
        this.renderType = renderType;
        this.style = [];
        for (var i = 0; i < style.length; i++) {
            this.style[i] = new BausteinStyle(style[i].property, style[i].value);
        }
        this.columns = 0;
        this.rows = 0;
        this.content = "";
        this.class = "";
    }
    BausteinTemplate.prototype.isParentType = function () {
        return bausteinRenderType.isParentType(this.renderType);
    };
    BausteinTemplate.prototype.getStyle = function (name) {
        for (var i = 0; i < this.style.length; i++) {
            if (this.style[i].property.name === name) {
                return this.style[i];
            }
        }
        return null;
    };
    BausteinTemplate.prototype.getStyleValue = function (name, def) {
        var style = this.getStyle(name);
        if (style) {
            return style.value;
        }
        return def;
    };
    return BausteinTemplate;
}());
var Baustein = (function (_super) {
    __extends(Baustein, _super);
    function Baustein(id, position, type, title, tag, renderType, style) {
        var _this = _super.call(this, type, title, null, tag, renderType, style) || this;
        _this.id = id;
        _this.position = position;
        return _this;
    }
    return Baustein;
}(BausteinTemplate));
var BausteinEditor = (function () {
    function BausteinEditor(dom_id, options) {
        this.baustein_counter = 0;
        this.baustein_id_counter = 0;
        this.cursor_mode = 0;
        this.imageUpload = null;
        this.styleProperties = {
            font_size: { name: "font-size", title: "Schriftgröße", type: "select", suffix: "",
                options: [new Option("Normal", ""), new Option("Kleiner (~10px)", "smaller"), new Option("Klein (~11px)", "small"),
                    new Option("Medium (~14px)", "medium"), new Option("Groß (~17px)", "large"), new Option("Größer (~20px)", "larger")],
                useAsClass: true, showInBausteinAttributesSidebar: true },
            font_weight: { name: "font-weight", title: "Textdicke", type: "select", suffix: "",
                options: [new Option("Normal", ""), new Option("Fett", "bold"), new Option("Fetter", "bolder"), new Option("Leichter", "lighter")], useAsClass: false, showInBausteinAttributesSidebar: true },
            text_decoration: { name: "text-decoration", title: "Textunterschreichung", type: "select", suffix: "",
                options: [new Option("Normal", ""), new Option("underline", "underline"), new Option("dotted", "dotted")], useAsClass: false, showInBausteinAttributesSidebar: true },
            font_style: { name: "font-style", title: "Textkursion", type: "select", suffix: "",
                options: [new Option("Normal", ""), new Option("italic", "italic"), new Option("oblique", "oblique")], useAsClass: false, showInBausteinAttributesSidebar: true },
            text_align: { name: "text-align", title: "Textausrichtung", type: "select", suffix: "",
                options: [new Option("Normal", ""), new Option("left", "left"), new Option("center", "center"), new Option("right", "right")], useAsClass: false, showInBausteinAttributesSidebar: true },
            color: { name: "color", title: "Farbe", type: "color", suffix: "", options: [], useAsClass: false, showInBausteinAttributesSidebar: true },
            background_color: { name: "background-color", title: "Background Color", type: "color", suffix: "", options: [], useAsClass: false, showInBausteinAttributesSidebar: true },
            background_image: { name: "background-image", title: "Background Image", type: "string", suffix: "", options: [], useAsClass: false, showInBausteinAttributesSidebar: true },
            width: { name: "width", title: "Breite", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            height: { name: "height", title: "Höhe", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            max_width: { name: "max-width", title: "Maximale Breite", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: true },
            max_height: { name: "max-height", title: "Maximale Höhe", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: true },
            margin_top: { name: "margin-top", title: "Außenabstand Oben", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            margin_right: { name: "margin-right", title: "Außenabstand Rechts", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            margin_bottom: { name: "margin-bottom", title: "Außenabstand Unten", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            margin_left: { name: "margin-left", title: "Außenabstand Links", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            padding_top: { name: "padding-top", title: "Innenabstand Oben", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            padding_right: { name: "padding-right", title: "Innenabstand Rechts", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            padding_bottom: { name: "padding-bottom", title: "Innenabstand Unten", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
            padding_left: { name: "padding-left", title: "Innenabstand Links", type: "number", suffix: "px", options: [], useAsClass: false, showInBausteinAttributesSidebar: false },
        };
        this.stylePropertiesArray = Object.values(this.styleProperties);
        this.data = {
            page: {
                style: [],
            },
            bausteine: []
        };
        this.types = {
            bausteinSelector: new BausteinTemplate("bausteinSelector", "", '', "", bausteinRenderType.bausteinSelector, []),
            h1: new BausteinTemplate("h1", "Überschrift 1", '<b>H1</b>', "h1", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            h2: new BausteinTemplate("h2", "Überschrift 2", '<b>H2</b>', "h2", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            h3: new BausteinTemplate("h3", "Überschrift 3", '<b>H3</b>', "h3", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            h4: new BausteinTemplate("h4", "Überschrift 4", '<b>H4</b>', "h4", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            h5: new BausteinTemplate("h5", "Überschrift 5", '<b>H5</b>', "h5", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            h6: new BausteinTemplate("h6", "Überschrift 6", '<b>H6</b>', "h6", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "bold" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
            ]),
            text: new BausteinTemplate("text", "Paragraph (Text)", '<i class="fas fa-paragraph"></i>', "p", bausteinRenderType.richtext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
                { property: this.styleProperties.background_image, value: "" },
            ]),
            button: new BausteinTemplate("button", "Button", '<i class="fas fa-exclamation-square"></i>', "a", bausteinRenderType.button, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.font_weight, value: "" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
                { property: this.styleProperties.background_image, value: "" },
            ]),
            html: new BausteinTemplate("html", "HTML", '<i class="fab fa-html5"></i>', "div", bausteinRenderType.plaintext, [
                { property: this.styleProperties.font_size, value: "" },
                { property: this.styleProperties.text_align, value: "" },
                { property: this.styleProperties.text_decoration, value: "" },
                { property: this.styleProperties.font_style, value: "" },
                { property: this.styleProperties.color, value: "" },
            ]),
            script: new BausteinTemplate("script", "Script", '<i class="fas fa-code"></i>', "script", bausteinRenderType.plaintext, []),
            shortcode: new BausteinTemplate("shortcode", "Shortcode", '<b>[..]</b>', "", bausteinRenderType.plaintext, []),
            image: new BausteinTemplate("image", "Bild", '<i class="fas fa-image"></i>', "img", bausteinRenderType.image, []),
            layout: new BausteinTemplate("layout", "Layout", '<i class="fas fa-layer-group" style="transform: rotate(90deg);"></i>', "div", bausteinRenderType.layout, [
                { property: this.styleProperties.max_width, value: "" },
                { property: this.styleProperties.max_height, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
                { property: this.styleProperties.background_image, value: "" },
            ]),
            table: new BausteinTemplate("table", "Tabelle", '<i class="fas fa-table"></i>', "table", bausteinRenderType.table, [
                { property: this.styleProperties.max_width, value: "" },
                { property: this.styleProperties.max_height, value: "" },
                { property: this.styleProperties.color, value: "" },
                { property: this.styleProperties.background_color, value: "" },
                { property: this.styleProperties.background_image, value: "" },
            ]),
            tableRow: new BausteinTemplate("tableRow", "Tabellenreihe", '<i class="fas fa-table"></i>', "tr", bausteinRenderType.tableRow, []),
            th: new BausteinTemplate("th", "Tabellentitelzeile", '<i class="fas fa-table"></i>', "tr", bausteinRenderType.tableCell, []),
            td: new BausteinTemplate("td", "Tabellenzeile", '<i class="fas fa-table"></i>', "tr", bausteinRenderType.tableCell, [])
        };
        this.typesArray = Object.values(this.types);
        this.addBausteinSelectorItems = [
            { type: 1, title: "Überschriften", icon: '<i class="fas fa-heading"></i>', items: [this.types.h1, this.types.h2, this.types.h3, this.types.h4, this.types.h5, this.types.h6] },
            { type: 0, title: this.types.text.title, icon: this.types.text.icon, items: [this.types.text] },
            { type: 0, title: this.types.image.title, icon: this.types.image.icon, items: [this.types.image] },
            { type: 0, title: this.types.layout.title, icon: this.types.layout.icon, items: [this.types.layout] },
            { type: 0, title: this.types.table.title, icon: this.types.table.icon, items: [this.types.table] },
            { type: 1, title: "Sonstiges", icon: '<i class="fas fa-cubes"></i>', items: [this.types.html, this.types.script, this.types.shortcode] }
        ];
        this.assets = {
            baustein_image_placeholder: "/img/baustein-image-placeholder.png"
        };
        this.api_endpoints = {
            image_search: "",
            image_register: "",
        };
        this.dom_id = dom_id;
        this.selected_baustein = null;
        this.selected_baustein_id = null;
        this.open_baustein_attributes__baustein_id = null;
        if (typeof options !== "undefined") {
            if (typeof options.assets !== "undefined")
                this.assets = options.assets;
            if (typeof options.api_endpoints !== "undefined")
                this.api_endpoints = options.api_endpoints;
            if (typeof options.imageUpload !== "undefined")
                this.imageUpload = options.imageUpload;
        }
        this.dom = {};
        this.dom.be = document.getElementById(this.dom_id);
        this.dom.page_styles = this.dom.be.appendChild(this.createElement("style", this.dom_id + '_page_styles', ""));
        this.dom.main = this.dom.be.appendChild(this.createElement("div", this.dom_id + "_main", "be_main"));
        this.dom.sidebar = this.dom.be.appendChild(this.createElement("div", this.dom_id + "_sidebar", "be_sidebar"));
        this.dom.cursormodechanger = this.dom.main.appendChild(this.createElement("div", "", "be_cursormodechanger"));
        this.dom.cursormodechanger_default = this.dom.cursormodechanger.appendChild(this.createElement("div", "", "be_cursormodechanger_item active be_cursormodechanger_default"));
        this.dom.cursormodechanger_default.innerHTML = '<i class="fas fa-mouse-pointer"></i>';
        this.dom.cursormodechanger_drag = this.dom.cursormodechanger.appendChild(this.createElement("div", "", "be_cursormodechanger_item be_cursormodechanger_drag"));
        this.dom.cursormodechanger_drag.innerHTML = '<i class="fas fa-arrows-alt"></i>';
        this.dom.content = this.dom.main.appendChild(this.createElement("div", this.dom_id + "_content", "be_content"));
        this.dom.preview = this.dom.main.appendChild(this.createElement("div", this.dom_id + "_preview", "be_preview"));
        this.dom.preview_button_desktop = this.dom.preview.appendChild(this.createElement("button", this.dom_id + "_preview_button_desktop", "be_preview_button_desktop"));
        this.dom.preview_button_desktop.innerHTML = '<i class="fas fa-desktop"></i> Desktop';
        this.dom.preview_button_desktop.style.display = "none";
        this.dom.preview_button_desktop.type = "button";
        this.dom.preview_button_mobile = this.dom.preview.appendChild(this.createElement("button", this.dom_id + "_preview_button_mobile", "be_preview_button_mobile"));
        this.dom.preview_button_mobile.innerHTML = '<i class="fas fa-mobile-alt"></i> Mobile';
        this.dom.preview_button_mobile.style.display = "none";
        this.dom.preview_button_desktop.type = "button";
        this.dom.preview_button = this.dom.preview.appendChild(this.createElement("button", this.dom_id + "_preview_button", "be_preview_button"));
        this.dom.preview_button.innerHTML = '<i class="fas fa-eye"></i> Vorschau';
        this.dom.preview_close_button = this.dom.preview.appendChild(this.createElement("button", this.dom_id + "_preview_close_button", "be_preview_close_button"));
        this.dom.preview_close_button.innerHTML = '<i class="fas fa-times"></i> Vorschau schließen';
        this.dom.preview_close_button.style.display = "none";
        this.dom.preview_content = this.dom.preview.appendChild(this.createElement("div", this.dom_id + "_preview_content", "be_preview_content"));
        this.dom.preview_content.style.display = "none";
        this.dom.preview_button_desktop.type = "button";
        this.dom.sidebar_header = this.dom.sidebar.appendChild(this.createElement("div", this.dom_id + "_sidebar_header", "be_sidebar_header"));
        this.dom.sidebar_content__site = this.dom.sidebar.appendChild(this.createElement("div", this.dom_id + "_sidebar_content__site", "be_sidebar_content"));
        this.dom.sidebar_content__baustein = this.dom.sidebar.appendChild(this.createElement("div", this.dom_id + "_sidebar_content__baustein", "be_sidebar_content"));
        this.dom.sidebar_content__baustein.style.display = "none";
        this.dom.sidebar_content__baustein_styles = this.dom.sidebar_content__baustein.appendChild(this.createElement("div", this.dom_id + "_sidebar_content__baustein_styles", ""));
        this.dom.sidebar_content__baustein_misc = this.dom.sidebar_content__baustein.appendChild(this.createElement("div", this.dom_id + "_sidebar_content__baustein_misc", ""));
        this.dom.sidebar_header_col__site = this.dom.sidebar_header.appendChild(this.createElement("div", this.dom_id + "_sidebar_header_col__site", "be_sidebar_header_col active"));
        this.dom.sidebar_header_col__site.innerHTML = "Artikel";
        this.dom.sidebar_header_col__baustein = this.dom.sidebar_header.appendChild(this.createElement("div", this.dom_id + "_sidebar_header_col__baustein", "be_sidebar_header_col disabled"));
        this.dom.sidebar_header_col__baustein.innerHTML = "Baustein";
        for (var i = 0; i < this.data.page.style.length; i++) {
            var element = this.data.page.style[i];
            this.dom.sidebar_content__site.appendChild(this.formcontrol("page", element.property.type, element.property.name, element.property.title, element.value, element.property.suffix, element.property.options).content);
        }
        this.be_bausteinSelector_isOpen = false;
        this.apply_styles();
        var self = this;
        this.dom.cursormodechanger_default.addEventListener("click", function () {
            self.cursor_mode = 0;
            self.dom.cursormodechanger_default.classList.add("active");
            self.dom.cursormodechanger_drag.classList.remove("active");
        });
        this.dom.cursormodechanger_drag.addEventListener("click", function () {
            self.cursor_mode = 1;
            self.dom.cursormodechanger_default.classList.remove("active");
            self.dom.cursormodechanger_drag.classList.add("active");
        });
        [this.dom.preview_button, this.dom.preview_close_button].forEach(function (element) {
            element.addEventListener("click", function () {
                if (self.dom.preview_content.style.display === "none") {
                    self.dom.preview_content.style.display = "";
                    self.preview_render();
                    self.dom.preview_content.style.height = "400px";
                    self.dom.content.style.height = "calc(100% - 50px - 46px - " + self.dom.preview_content.style.height + ")";
                    self.dom.preview_button_mobile.style.display = "";
                    self.dom.preview_content.style.width = "";
                    self.dom.preview_content.classList.remove("mobile");
                    self.dom.preview_button.style.display = "none";
                    self.dom.preview_close_button.style.display = "";
                }
                else {
                    self.dom.preview_content.style.display = "none";
                    self.dom.content.style.height = "";
                    self.dom.preview_button_desktop.style.display = "none";
                    self.dom.preview_button_mobile.style.display = "none";
                    self.dom.preview_button.style.display = "";
                    self.dom.preview_close_button.style.display = "none";
                }
            });
        });
        this.dom.preview_button_desktop.addEventListener("click", function () {
            self.dom.preview_button_desktop.style.display = "none";
            self.dom.preview_button_mobile.style.display = "";
            self.dom.preview_content.style.width = "";
            self.dom.preview_content.classList.remove("mobile");
        });
        this.dom.preview_button_mobile.addEventListener("click", function () {
            self.dom.preview_button_desktop.style.display = "";
            self.dom.preview_button_mobile.style.display = "none";
            self.dom.preview_content.style.width = "320px";
            self.dom.preview_content.classList.add("mobile");
        });
        this.dom.sidebar_header_col__site.addEventListener("click", function () {
            self.dom.sidebar_header_col__site.classList.add("active");
            self.dom.sidebar_header_col__baustein.classList.remove("active");
            self.dom.sidebar_content__site.style.display = "";
            self.dom.sidebar_content__baustein.style.display = "none";
        });
        this.dom.sidebar_header_col__baustein.addEventListener("click", function () {
            if (self.dom.sidebar_header_col__baustein.classList.contains("disabled") === false) {
                self.dom.sidebar_header_col__site.classList.remove("active");
                self.dom.sidebar_header_col__baustein.classList.add("active");
                self.dom.sidebar_content__site.style.display = "none";
                self.dom.sidebar_content__baustein.style.display = "";
            }
        });
        this.render();
    }
    BausteinEditor.prototype.getStylePropertyByName = function (name) {
        for (var i = 0; i < this.stylePropertiesArray.length; i++) {
            if (this.stylePropertiesArray[i].name === name) {
                return this.stylePropertiesArray[i];
            }
        }
        return new BausteinStyleProperty(name, "", "", "", [], false, false);
    };
    BausteinEditor.prototype.getBausteinType = function (type) {
        for (var i = 0; i < this.typesArray.length; i++) {
            if (this.typesArray[i].type === type) {
                return this.typesArray[i];
            }
        }
        return this.typesArray[0];
    };
    BausteinEditor.prototype.createElement = function (_type, _id, _class) {
        var element = document.createElement(_type);
        if (_id !== "")
            element.id = _id;
        if (_class !== "")
            element.className = _class;
        return element;
    };
    BausteinEditor.prototype.renderBausteinSelector = function (position, hide, showLayoutItems) {
        console.log("renderBausteinSelector", position, hide, showLayoutItems);
        var self = this;
        var selector_dom_id = this.dom_id + "_" + position.parent + "_" + position.sort;
        var position_parent = position.parent;
        var position_sort = position.sort;
        var clz = "be_bausteinSelector_container";
        if (hide) {
            clz += " hidden";
        }
        var be_bausteinSelector_container = this.createElement("div", "", clz);
        be_bausteinSelector_container.dataset.position_parent = position_parent + "";
        be_bausteinSelector_container.dataset.position_sort = position_sort + "";
        var be_bausteinSelector = be_bausteinSelector_container.appendChild(this.createElement("div", selector_dom_id + '_bausteinSelector', "be_bausteinSelector"));
        be_bausteinSelector.appendChild(this.createElement("i", "", "fas fa-plus-circle"));
        var be_bausteinSelector_layer = be_bausteinSelector_container.appendChild(this.createElement("div", selector_dom_id + '_bausteinSelector_layer', "be_bausteinSelector_layer"));
        be_bausteinSelector_layer.style.display = "none";
        var be_bausteinSelector_layer_title_container = be_bausteinSelector_layer.appendChild(this.createElement("div", "", "be_bausteinSelector_layer_title_container"));
        var be_bausteinSelector_layer_title = be_bausteinSelector_layer_title_container.appendChild(this.createElement("div", "", "be_bausteinSelector_layer_title"));
        be_bausteinSelector_layer_title.innerHTML = "Neuen Baustein hinzufügen";
        var be_bausteinSelector_layer_close = be_bausteinSelector_layer_title_container.appendChild(this.createElement("button", selector_dom_id + 'bausteinSelector_layer_close', "be_bausteinSelector_layer_close"));
        be_bausteinSelector_layer_close.type = "button";
        be_bausteinSelector_layer_close.innerHTML = "&times;";
        var be_bausteinSelector_layer_item_container1 = be_bausteinSelector_layer.appendChild(this.createElement("div", selector_dom_id + '_bausteinSelector_layer_item_container1', "be_bausteinSelector_layer_item_container"));
        var be_bausteinSelector_layer_item_container2 = be_bausteinSelector_layer.appendChild(this.createElement("div", selector_dom_id + '_bausteinSelector_layer_item_container2', "be_bausteinSelector_layer_item_container"));
        var _loop_1 = function () {
            var itemset = this_1.addBausteinSelectorItems[i];
            if (showLayoutItems === false && itemset.type === 0 && (itemset.items[0].renderType === bausteinRenderType.layout || itemset.items[0].renderType === bausteinRenderType.table)) {
                return "continue";
            }
            be_bausteinSelector_layer_item = be_bausteinSelector_layer_item_container1.appendChild(this_1.createElement("button", "", "be_bausteinSelector_layer_item"));
            be_bausteinSelector_layer_item.type = "button";
            be_bausteinSelector_layer_item.dataset.category = i.toString();
            if (itemset.type === 0)
                be_bausteinSelector_layer_item.dataset.type = itemset.items[0].type.toString();
            title1 = be_bausteinSelector_layer_item.appendChild(this_1.createElement("div", "", "be_bausteinSelector_layer_item_title1"));
            title2 = be_bausteinSelector_layer_item.appendChild(this_1.createElement("div", "", "be_bausteinSelector_layer_item_title2"));
            if (itemset.type === 0) {
                if (itemset.items[0].icon !== null)
                    title1.innerHTML = itemset.items[0].icon;
                title2.innerHTML = itemset.items[0].title;
            }
            else {
                if (itemset.icon !== null)
                    title1.innerHTML = itemset.icon;
                title2.innerHTML = itemset.title;
            }
            var category = i;
            be_bausteinSelector_layer_item.addEventListener("click", function () {
                if (self.addBausteinSelectorItems[category].type === 0) {
                    self.addBaustein(self.addBausteinSelectorItems[category].items[0], new Position(position.parent, position.sort));
                    self.bausteinSelector_close(be_bausteinSelector, be_bausteinSelector_layer);
                }
                else {
                    var types_array_1 = self.addBausteinSelectorItems[category].items;
                    be_bausteinSelector_layer_item_container2.innerHTML = "";
                    var _loop_2 = function () {
                        be_bausteinSelector_layer_item = be_bausteinSelector_layer_item_container2.appendChild(self.createElement("button", "", "be_bausteinSelector_layer_item"));
                        be_bausteinSelector_layer_item.type = "button";
                        be_bausteinSelector_layer_item.dataset.type = types_array_1[b].type;
                        be_bausteinSelector_layer_item.innerHTML =
                            '<div class="be_bausteinSelector_layer_item_title1">' + types_array_1[b].icon + '</div>'
                                + '<div class="be_bausteinSelector_layer_item_title2">' + types_array_1[b].title + '</div>';
                        var types_array_row = b;
                        be_bausteinSelector_layer_item.addEventListener("click", function () {
                            self.addBaustein(types_array_1[types_array_row], new Position(position.parent, position.sort));
                            self.bausteinSelector_close(be_bausteinSelector, be_bausteinSelector_layer);
                        });
                    };
                    var be_bausteinSelector_layer_item;
                    for (var b = 0; b < types_array_1.length; b++) {
                        _loop_2();
                    }
                    be_bausteinSelector_layer_item_container1.style.display = "none";
                    be_bausteinSelector_layer_item_container2.style.display = "";
                }
            });
        };
        var this_1 = this, be_bausteinSelector_layer_item, title1, title2;
        for (var i = 0; i < this.addBausteinSelectorItems.length; i++) {
            _loop_1();
        }
        be_bausteinSelector.addEventListener("click", function () { self.bausteinSelector_toggle(be_bausteinSelector, be_bausteinSelector_layer, be_bausteinSelector_layer_item_container1, be_bausteinSelector_layer_item_container2); });
        be_bausteinSelector_layer_close.addEventListener("click", function () { self.bausteinSelector_close(be_bausteinSelector, be_bausteinSelector_layer); });
        return be_bausteinSelector_container;
    };
    BausteinEditor.prototype.rowcol_amount_evaluate = function () {
        for (var i = 0; i < this.data.bausteine.length; i++) {
            var baustein = this.data.bausteine[i];
            if (baustein.renderType === bausteinRenderType.table || baustein.renderType === bausteinRenderType.tableRow || baustein.renderType === bausteinRenderType.layout) {
                var amount, new_baustein_type;
                if (baustein.renderType === bausteinRenderType.tableRow || baustein.renderType === bausteinRenderType.layout) {
                    amount = baustein.columns;
                    new_baustein_type = this.types.bausteinSelector;
                }
                else {
                    amount = baustein.rows;
                    new_baustein_type = this.types.tableRow;
                }
                var children = this.getBausteineArray(baustein.id);
                console.log("rowcol_amount_evaluate()", "amount", amount);
                console.log("rowcol_amount_evaluate()", "child count", children.length);
                console.log("rowcol_amount_evaluate()", "new_baustein_type", new_baustein_type);
                if (children.length < amount) {
                    for (var j = 0; j < children.length; j++) {
                        this.addBaustein(new_baustein_type, new Position(baustein.id, this.getPositionSort(false)));
                    }
                }
                else if (children.length > amount) {
                    var new_bausteine_array = [];
                    for (var j = 0; j < this.data.bausteine.length; j++) {
                        if (this.data.bausteine[j].position.parent !== baustein.id) {
                            new_bausteine_array.push(this.data.bausteine[j]);
                        }
                    }
                    for (var j = 0; j < baustein.columns; j++) {
                        new_bausteine_array.push(children[j]);
                    }
                    this.data.bausteine = new_bausteine_array;
                }
            }
        }
    };
    BausteinEditor.prototype.addBaustein = function (baustein_type, position) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var self, parent_baustein, baustein_id, baustein, actual_addBaustein;
                        return __generator(this, function (_a) {
                            console.log("addBaustein( type:", baustein_type.type, ", position:", position, " )");
                            self = this;
                            parent_baustein = position.parent === null ? null : this.getBaustein(position.parent);
                            if (parent_baustein !== null && baustein_type.type === this.types.text.type) {
                                baustein_type = this.types.td;
                            }
                            baustein_id = this.baustein_id_counter;
                            baustein = new Baustein(baustein_id, position, baustein_type.type, baustein_type.title, baustein_type.tag, baustein_type.renderType, baustein_type.style);
                            actual_addBaustein = function () {
                                self.baustein_id_counter += 1;
                                for (var i = 0; i < baustein.style.length; i++) {
                                    var style = baustein.style[i];
                                    if (style.value === "" && style.property.options.length > 0) {
                                        style.value = style.property.options[0].value;
                                    }
                                }
                                var baustein_type_baustein_selector_index = -1;
                                for (var r = 0; r < self.data.bausteine.length; r++) {
                                    if (self.data.bausteine[r].position.parent === position.parent && self.data.bausteine[r].position.sort === position.sort) {
                                        console.log("--baustein_type_baustein_selector_index", r, "rendertype", self.data.bausteine[r].renderType);
                                        if (self.data.bausteine[r].renderType === bausteinRenderType.bausteinSelector) {
                                            baustein_type_baustein_selector_index = r;
                                        }
                                        break;
                                    }
                                }
                                console.log("baustein_type_baustein_selector_index", baustein_type_baustein_selector_index);
                                if (baustein_type_baustein_selector_index === -1) {
                                    for (var r = 0; r < self.data.bausteine.length; r++) {
                                        if (self.data.bausteine[r].position.sort >= position.sort) {
                                            self.data.bausteine[r].position.sort++;
                                        }
                                    }
                                    self.data.bausteine[self.data.bausteine.length] = baustein;
                                }
                                else {
                                    self.data.bausteine[baustein_type_baustein_selector_index] = baustein;
                                }
                                if (baustein.isParentType()) {
                                    if (baustein.renderType === bausteinRenderType.table) {
                                        var baustein_type_tableRow = self.types.tableRow;
                                        for (var row = 0; row < baustein.rows; row++) {
                                            self.addBaustein(baustein_type_tableRow, new Position(baustein_id, self.getPositionSort(false)));
                                        }
                                    }
                                    else {
                                        for (var column = 0; column < baustein.columns; column++) {
                                            self.addBaustein(self.types.bausteinSelector, new Position(baustein_id, self.getPositionSort(false)));
                                        }
                                    }
                                }
                                self.render();
                                if (baustein.renderType !== bausteinRenderType.bausteinSelector)
                                    self.selectBaustein(baustein_id);
                                resolve(baustein);
                            };
                            if (baustein.renderType === bausteinRenderType.layout || baustein.renderType === bausteinRenderType.table) {
                                this.dialog_rowcol(baustein)
                                    .then(function () { return actual_addBaustein(); })
                                    .catch(function () { return reject(); });
                            }
                            else if (baustein.renderType === bausteinRenderType.image) {
                                this.dialog_media(baustein)
                                    .then(function () { return actual_addBaustein(); })
                                    .catch(function () { return reject(); });
                            }
                            else {
                                if (baustein.renderType === bausteinRenderType.tableRow && parent_baustein !== null) {
                                    baustein.columns = parent_baustein.columns;
                                }
                                actual_addBaustein();
                            }
                            console.log("addBaustein() this.data.bausteine", this.data.bausteine);
                            return [2];
                        });
                    }); })];
            });
        });
    };
    BausteinEditor.prototype.selectBaustein = function (baustein_id) {
        var _a;
        this.dom.content.querySelectorAll(".be_baustein").forEach(function (be_baustein) { be_baustein.classList.remove("selected"); });
        this.selected_baustein = document.getElementById(this.dom_id + '_be_baustein_item' + baustein_id);
        (_a = this.selected_baustein) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
        this.selected_baustein_id = baustein_id;
        this.open_baustein_attributes(baustein_id);
    };
    BausteinEditor.prototype.getBaustein = function (baustein_id) {
        for (var i = 0; i < this.data.bausteine.length; i++) {
            if (this.data.bausteine[i].id === baustein_id) {
                return this.data.bausteine[i];
            }
        }
        throw new Error("getBaustein() can not get Baustein with id: " + baustein_id);
    };
    BausteinEditor.prototype.getBausteinFromPosition = function (position) {
        for (var i = 0; i < this.data.bausteine.length; i++) {
            if (this.data.bausteine[i].position.parent === position.parent && this.data.bausteine[i].position.sort === position.sort) {
                return this.data.bausteine[i];
            }
        }
        throw new Error("getBaustein() can not get Baustein with position: " + position.parent + ", " + position.sort);
    };
    BausteinEditor.prototype.getPositionSort = function (getFirst) {
        var positionSort = 1;
        if (getFirst) {
            for (var i = 0; i < this.data.bausteine.length; i++) {
                if (this.data.bausteine[i].position.sort < positionSort) {
                    positionSort = this.data.bausteine[i].position.sort;
                }
            }
            return positionSort - 1;
        }
        else {
            for (var i = 0; i < this.data.bausteine.length; i++) {
                if (this.data.bausteine[i].position.sort > positionSort) {
                    positionSort = this.data.bausteine[i].position.sort;
                }
            }
            return positionSort + 1;
        }
    };
    BausteinEditor.prototype.getBausteineArray = function (parent) {
        var bausteine = [];
        for (var i = 0; i < this.data.bausteine.length; i++) {
            if (this.data.bausteine[i].position.parent === parent) {
                bausteine[bausteine.length] = this.data.bausteine[i];
            }
        }
        return bausteine.sort(function (a, b) {
            return a.position.sort > b.position.sort ? 1 : 0;
        });
    };
    BausteinEditor.prototype.deleteBaustein = function (baustein_id) {
        console.log("deleteBaustein() baustein_id", baustein_id);
        var bausteine = [];
        for (var row = 0; row < this.data.bausteine.length; row++) {
            if (this.data.bausteine[row].id !== baustein_id) {
                bausteine[bausteine.length] = this.data.bausteine[row];
            }
        }
        this.rowcol_amount_evaluate();
        console.log("this.data.bausteine", this.data.bausteine);
        this.data.bausteine = bausteine;
        this.selected_baustein_id = null;
        this.open_baustein_attributes__baustein_id = null;
        this.render();
        window.focus();
        if (document.activeElement === null) {
            console.error("document.activeElement is null");
        }
        else {
            var activeElement = document.activeElement;
            activeElement.blur();
        }
    };
    BausteinEditor.prototype.moveBaustein = function (baustein_id, position_new) {
        var baustein = this.getBaustein(baustein_id);
        console.log("moveBaustein old position.sort", baustein.position.sort);
        console.log("moveBaustein new position.sort", position_new.sort);
        var targetIsTable = false;
        if (position_new.parent !== null) {
            var target_parent_baustein = this.getBaustein(position_new.parent);
            targetIsTable = target_parent_baustein.renderType === bausteinRenderType.table;
        }
        if (targetIsTable) {
            console.info("moveBaustein() target is table");
        }
        else {
            var test_position_new_parent = position_new.parent;
            var parentIsInChild = false;
            while (test_position_new_parent !== null) {
                if (baustein_id === test_position_new_parent) {
                    parentIsInChild = true;
                    break;
                }
                test_position_new_parent = this.getBaustein(test_position_new_parent).position.parent;
            }
            if (parentIsInChild) {
                console.info("moveBaustein() can not move parent Baustein into child");
            }
            else if (baustein.position.parent === position_new.parent || baustein.position.sort === position_new.sort) {
                console.info("moveBaustein() can not move Baustein into same position");
            }
            else {
                if (position_new.sort - baustein.position.sort === 1) {
                    position_new.sort += 1;
                }
                baustein.position.parent = position_new.parent;
                baustein.position.sort = position_new.sort;
                for (var r = 0; r < this.data.bausteine.length; r++) {
                    if (this.data.bausteine[r].id !== baustein_id && this.data.bausteine[r].position.sort >= baustein.position.sort) {
                        this.data.bausteine[r].position.sort++;
                    }
                }
                this.rowcol_amount_evaluate();
                this.render();
            }
        }
    };
    BausteinEditor.prototype.changeBaustein = function (baustein_id, type) {
        var baustein = this.getBaustein(baustein_id);
        var new_baustein = this.getBausteinType(type);
        baustein.renderType = new_baustein.renderType;
        baustein.tag = new_baustein.tag;
        baustein.title = new_baustein.title;
        baustein.type = new_baustein.type;
        this.render();
    };
    BausteinEditor.prototype.getChangeBausteinOptions = function (current_renderType, current_type) {
        var options = [];
        for (var i = 0; i < this.typesArray.length; i++) {
            var element = this.typesArray[i];
            if (element.renderType === current_renderType && element.type !== current_type) {
                var b = options.length;
                options[b] = this.createElement("option", "", "");
                options[b].value = element.type;
                options[b].innerHTML = element.icon + " " + element.title;
            }
        }
        return options;
    };
    BausteinEditor.prototype.renderBaustein = function (baustein, position) {
        var _this = this;
        var self = this;
        var baustein_id = baustein.id;
        var position_parent = position.parent;
        var position_sort = position.sort;
        var baustein_dom_id = this.dom_id + '_be_baustein_item' + baustein_id;
        var baustein_editor_id = baustein_dom_id + '_editor';
        var baustein_type_object = this.getBausteinType(baustein.type);
        var elements_drag_not_allowed = [];
        if (baustein.renderType === bausteinRenderType.bausteinSelector) {
            console.log("position_parent position_parent ", position_parent);
            var baustein_dom = this.renderBausteinSelector(new Position(position_parent, position_sort), false, false);
        }
        else {
            var baustein_dom = this.createElement("div", baustein_dom_id, "be_baustein");
            baustein_dom.dataset.type = baustein.type;
            baustein_dom.dataset.position_parent = position_parent + "";
            baustein_dom.dataset.position_sort = position_sort + "";
            if (this.selected_baustein_id !== null && this.selected_baustein_id === baustein_id) {
                baustein_dom.classList.add("selected");
            }
            for (var a = 0; a < baustein.style.length; a++) {
                var element = baustein.style[a];
                if (element.value !== "") {
                    var property_name = element.property.name;
                    baustein_dom.style[property_name] = element.value;
                }
            }
            var baustein_indicator = baustein_dom.appendChild(this.createElement("label", baustein_dom_id + "_indicator", "baustein_indicator"));
            baustein_indicator.addEventListener("click", function () {
                self.selectBaustein(baustein_id);
            }, false);
            if (position_parent === null) {
                var baustein_indicator_position = baustein_indicator.appendChild(this.createElement("span", "", "baustein_indicator_position"));
                baustein_indicator_position.innerHTML = self.baustein_counter.toString();
                self.baustein_counter++;
            }
            var changeBausteinOptions = this.getChangeBausteinOptions(baustein.renderType, baustein.type);
            if (changeBausteinOptions.length === 0) {
                var baustein_indicator_title = baustein_indicator.appendChild(this.createElement("span", "", "baustein_indicator_title"));
                baustein_indicator_title.innerHTML = baustein_type_object.icon + " " + baustein.title;
            }
            else {
                var baustein_indicator_changer = baustein_indicator.appendChild(this.createElement("select", "", "baustein_indicator_changer"));
                baustein_indicator_changer.tabIndex = -1;
                baustein_indicator_changer.addEventListener("change", function () {
                    self.changeBaustein(baustein_id, this.value);
                });
                var baustein_indicator_option = baustein_indicator_changer.appendChild(this.createElement("option", "", ""));
                baustein_indicator_option.value = baustein.type;
                baustein_indicator_option.innerHTML = baustein_type_object.icon + " " + baustein.title;
                baustein_indicator_option.selected = true;
                baustein_indicator_option.style.display = "none";
                for (var i = 0; i < changeBausteinOptions.length; i++) {
                    baustein_indicator_changer.appendChild(changeBausteinOptions[i]);
                }
            }
            switch (baustein.renderType) {
                case bausteinRenderType.layout:
                case bausteinRenderType.table:
                case bausteinRenderType.tableRow:
                    var bausteine_inner = this.getBausteineArray(baustein.id);
                    for (var row = 0; row < bausteine_inner.length; row++) {
                        var baustein_inner = bausteine_inner[row];
                        baustein_dom.appendChild(this.renderBaustein(baustein_inner, new Position(baustein_id, baustein_inner.position.sort)));
                    }
                    break;
                case bausteinRenderType.image:
                    var image = baustein_dom.appendChild(this.createElement("img", baustein_editor_id, "be_baustein_item"));
                    image.dataset.src = baustein.content;
                    if (baustein.content === "") {
                        image.src = this.assets.baustein_image_placeholder;
                    }
                    else {
                        image.src = baustein.content;
                    }
                    image.style.maxWidth = "100%";
                    image.addEventListener("click", function () {
                        self.selectBaustein(baustein_id);
                    });
                    image.addEventListener("dragstart", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                    break;
                default:
                    var editor;
                    switch (baustein.renderType) {
                        case bausteinRenderType.button:
                        case bausteinRenderType.tableCell:
                        case bausteinRenderType.richtext:
                            editor = baustein_dom.appendChild(this.createElement("div", baustein_editor_id, "be_baustein_item"));
                            editor.innerHTML = baustein.content;
                            editor.style.minHeight = "100px";
                            new TinyEditor(editor, {
                                bold: true,
                                italic: true,
                                underline: true,
                                textcolor: true,
                                textleft: true,
                                textcenter: true,
                                textright: true,
                                insertorderedlist: true,
                                insertunorderedlist: true,
                                indent: true,
                                outdent: true,
                                hyperlink: true,
                                removeFormat: true,
                                onchange: function () {
                                    baustein.content = editor.innerHTML;
                                    self.preview_render();
                                }
                            });
                            editor.addEventListener("input", function () {
                                editor.style.height = '1px';
                                editor.style.height = editor.scrollHeight + 'px';
                            });
                            break;
                        default:
                            editor = baustein_dom.appendChild(this.createElement("textarea", baustein_editor_id, "be_baustein_item"));
                            editor.innerHTML = baustein.content;
                            editor.focus();
                            baustein_dom.addEventListener("input", function () {
                                editor.style.height = '1px';
                                editor.style.height = editor.scrollHeight + 'px';
                                baustein.content = editor.value.split("<").join("&lt;").split(">").join("&gt;");
                            });
                            break;
                    }
                    editor.draggable = false;
                    editor.addEventListener("focusin", function () {
                        self.selectBaustein(baustein_id);
                    });
                    elements_drag_not_allowed.push(editor);
                    break;
            }
            baustein_dom.addEventListener("click", function (e) {
                if (e.target.id === baustein_dom_id) {
                    self.selectBaustein(baustein_id);
                }
                else {
                    return false;
                }
            }, false);
            if (baustein.renderType !== bausteinRenderType.tableRow) {
                new LuxDragDrop(baustein_dom, {
                    mousedown: function () {
                        if (_this.cursor_mode === 0) {
                            var document_activeElement = document.activeElement;
                            return document_activeElement === null || elements_drag_not_allowed.includes(document_activeElement);
                        }
                    },
                    mousemove: null,
                    mouseup: function (e, reciever_element) {
                        for (var tries = 0; tries < 4; tries++) {
                            if (typeof reciever_element.dataset.position_parent === "string") {
                                break;
                            }
                            else {
                                if (reciever_element.parentElement === null) {
                                    console.error("[BausteinEditor]", "reciever_element.parentElement is null");
                                    break;
                                }
                                else {
                                    reciever_element = reciever_element.parentElement;
                                }
                            }
                        }
                        if (typeof reciever_element.dataset.position_parent !== "string") {
                            console.error("[BausteinEditor]", "reciever_element.dataset.position_parent is not a string");
                        }
                        else if (typeof reciever_element.dataset.position_sort !== "string") {
                            console.error("[BausteinEditor]", "reciever_element.dataset.position_sort is not a string");
                        }
                        else {
                            var old_baustein_id = baustein_id;
                            var new_position = {
                                parent: reciever_element.dataset.position_parent === "0" ? 0 : (parseInt(reciever_element.dataset.position_parent) || null),
                                sort: reciever_element.dataset.position_sort === "0" ? 0 : (parseInt(reciever_element.dataset.position_sort) || null)
                            };
                            console.log("drop on addBausteinSelector: old_baustein_id", old_baustein_id);
                            console.log("drop on addBausteinSelector: new position", new_position);
                            if (new_position.sort === null) {
                                console.error("[BausteinEditor] LuxClickHoldDrag.callback_mouseup: new_position.sort is null");
                            }
                            else {
                                self.moveBaustein(old_baustein_id, new Position(new_position.parent, new_position.sort));
                            }
                        }
                    }
                });
                baustein_dom.addEventListener("dragend", function () {
                    baustein_dom.draggable = false;
                });
            }
        }
        return baustein_dom;
    };
    BausteinEditor.prototype.render = function () {
        this.dom.content.innerHTML = "";
        this.baustein_counter = 0;
        var bausteine = this.getBausteineArray(null);
        for (var row = 0; row < bausteine.length; row++) {
            var baustein = bausteine[row];
            this.dom.content.appendChild(this.renderBausteinSelector(new Position(null, baustein.position.sort), true, true));
            this.dom.content.appendChild(this.renderBaustein(baustein, new Position(null, baustein.position.sort)));
        }
        this.dom.content.appendChild(this.renderBausteinSelector(new Position(null, this.getPositionSort(false)), false, true));
        this.preview_render();
    };
    BausteinEditor.prototype.bausteinSelector_open = function (be_bausteinSelector, be_bausteinSelector_layer, be_bausteinSelector_layer_item_container1, be_bausteinSelector_layer_item_container2) {
        be_bausteinSelector.style.display = "none";
        be_bausteinSelector_layer_item_container1.style.display = "";
        be_bausteinSelector_layer_item_container2.style.display = "none";
        be_bausteinSelector_layer.style.display = "";
        this.be_bausteinSelector_isOpen = true;
    };
    BausteinEditor.prototype.bausteinSelector_close = function (be_bausteinSelector, be_bausteinSelector_layer) {
        be_bausteinSelector.style.display = "";
        be_bausteinSelector_layer.style.display = "none";
        this.be_bausteinSelector_isOpen = false;
    };
    BausteinEditor.prototype.bausteinSelector_toggle = function (be_bausteinSelector, be_bausteinSelector_layer, be_bausteinSelector_layer_item_container1, be_bausteinSelector_layer_item_container2) {
        if (this.be_bausteinSelector_isOpen) {
            this.bausteinSelector_close(be_bausteinSelector, be_bausteinSelector_layer);
        }
        else {
            this.bausteinSelector_open(be_bausteinSelector, be_bausteinSelector_layer, be_bausteinSelector_layer_item_container1, be_bausteinSelector_layer_item_container2);
        }
    };
    BausteinEditor.prototype.apply_styles = function () {
        if (this.selected_baustein !== null && this.selected_baustein_id !== null) {
            var baustein = this.getBaustein(this.selected_baustein_id);
            var selected_baustein_editor = this.selected_baustein.lastChild;
            var nodes = this.dom.sidebar_content__baustein_styles.querySelectorAll(".be_formrow .form-control");
            for (var i = 0; i < nodes.length; i++) {
                var property_name = nodes[i].name;
                var value = typeof nodes[i].dataset.value === "undefined" ? nodes[i].value : nodes[i].dataset.value;
                var baustein_style_index = baustein.style.length;
                for (var b = 0; b < baustein.style.length; b++) {
                    if (baustein.style[b].property.name === property_name) {
                        baustein_style_index = b;
                        break;
                    }
                }
                if (baustein_style_index === baustein.style.length) {
                    if (value === "" || value === "0" || value === "auto")
                        continue;
                    var new_style = new BausteinStyle(this.getStylePropertyByName(property_name), "");
                    if (new_style.property.options.length > 0 && new_style.property.options[0] === value)
                        continue;
                    baustein.style[baustein_style_index] = new_style;
                }
                baustein.style[baustein_style_index].value = value;
                var target;
                if (baustein.renderType === bausteinRenderType.layout) {
                    target = this.selected_baustein;
                }
                else {
                    target = selected_baustein_editor;
                }
                if (baustein.style[baustein_style_index].property.useAsClass) {
                    for (var h = 0; h < baustein.style[baustein_style_index].property.options.length; h++) {
                        var class_value = baustein.style[baustein_style_index].property.options[h].value;
                        if (target.classList.contains(class_value))
                            target.classList.remove(baustein.style[baustein_style_index].property.options[h].value);
                    }
                    if (baustein.style[baustein_style_index].value !== "")
                        target.classList.add(baustein.style[baustein_style_index].value);
                }
                else {
                    target.style.setProperty(baustein.style[baustein_style_index].property.name, baustein.style[baustein_style_index].value);
                }
            }
        }
        this.preview_render();
    };
    BausteinEditor.prototype.formcontrol = function (domArk, type, name, title, value, suffix, options) {
        var self = this;
        var fc_dom_id = (this.dom_id + '_' + domArk + '_fc_' + name);
        var useDataValue = false;
        var be_formrow = this.createElement("div", "", "be_formrow");
        if (title !== null) {
            var label = be_formrow.appendChild(this.createElement("label", "", ""));
            label.htmlFor = fc_dom_id;
            label.innerHTML = title;
        }
        var form_control_container = be_formrow.appendChild(this.createElement("div", "", "form-control-container"));
        if (type === "number") {
            form_control_container.classList.add("number");
        }
        var form_control;
        if (type === "select") {
            form_control = form_control_container.appendChild(this.createElement("select", fc_dom_id, "form-control"));
            form_control.name = name;
            for (var i = 0; i < options.length; i++) {
                var option_element = form_control.appendChild(this.createElement("option", "", ""));
                option_element.value = options[i].value;
                option_element.innerHTML = options[i].text;
                if (options[i].value == value) {
                    option_element.classList.add("selected");
                }
            }
        }
        else {
            form_control = form_control_container.appendChild(this.createElement("input", fc_dom_id, "form-control"));
            form_control.name = name;
            form_control.value = value;
            if (type === "color") {
                form_control.type = "color";
                useDataValue = true;
            }
            else if (type === "number") {
                form_control.type = "text";
                form_control.dataset.suffix = suffix;
                var form_control_container_up = form_control_container.appendChild(this.createElement("div", "", "form-control-container_up"));
                form_control_container_up.innerHTML = '⮝';
                var form_control_container_down = form_control_container.appendChild(this.createElement("div", "", "form-control-container_down"));
                form_control_container_down.innerHTML = '⮟';
                var suffix_const_1 = suffix;
                var formcontrol_number_1 = function (add) {
                    var num = parseFloat(form_control.value.replace(suffix_const_1, ""));
                    if (!num) {
                        num = 0;
                    }
                    var countDecimals = num % 1 ? num.toString().split(".")[1].length : 0;
                    if (countDecimals === 0) {
                        num = num + add;
                    }
                    else {
                        var mltp = Math.pow(10, countDecimals);
                        num = Math.floor((num * mltp) + (add * mltp)) / mltp;
                    }
                    form_control.value = num.toString() + suffix_const_1;
                };
                form_control.addEventListener("change", function () {
                    formcontrol_number_1(0);
                    self.apply_styles();
                });
                form_control.addEventListener("keydown", function (e) {
                    var steps = e.shiftKey ? 10 : (e.ctrlKey ? 0.1 : 1);
                    var keyCode = e.which | e.keyCode;
                    if (keyCode === 38) {
                        formcontrol_number_1(steps);
                        self.apply_styles();
                        return false;
                    }
                    else if (keyCode === 40) {
                        formcontrol_number_1(-steps);
                        self.apply_styles();
                        return false;
                    }
                });
                form_control_container_up.addEventListener("click", function () { formcontrol_number_1(+1); self.apply_styles(); });
                form_control_container_down.addEventListener("click", function () { formcontrol_number_1(-1); self.apply_styles(); });
            }
            else {
                form_control.type = "text";
            }
        }
        if (type !== "number") {
            var _useDataValue_1 = useDataValue;
            if (_useDataValue_1) {
                form_control.dataset.value = value;
            }
            form_control.addEventListener("change", function () {
                if (_useDataValue_1) {
                    form_control.dataset.value = form_control.value;
                }
                self.apply_styles();
            });
        }
        form_control.autocomplete = "off";
        return { content: be_formrow, input: form_control };
    };
    BausteinEditor.prototype.layout_fc = function (name, value, top, right, bottom, left) {
        var be_layout_fc__margin_top = this.formcontrol("baustein", "number", name, null, value, "px", [new Option("0"), new Option("auto")]).content;
        be_layout_fc__margin_top.style.width = "34px";
        be_layout_fc__margin_top.style.height = "30px";
        if (top !== null)
            be_layout_fc__margin_top.style.top = top === "" ? "calc(50% - (" + be_layout_fc__margin_top.style.height + " / 2))" : top;
        if (bottom !== null)
            be_layout_fc__margin_top.style.bottom = bottom === "" ? "calc(50% - (" + be_layout_fc__margin_top.style.height + " / 2))" : bottom;
        if (left !== null)
            be_layout_fc__margin_top.style.left = left === "" ? "calc(50% - (" + be_layout_fc__margin_top.style.width + " / 2))" : left;
        if (right !== null)
            be_layout_fc__margin_top.style.right = right === "" ? "calc(50% - (" + be_layout_fc__margin_top.style.width + " / 2))" : right;
        return be_layout_fc__margin_top;
    };
    BausteinEditor.prototype.open_baustein_attributes = function (baustein_id) {
        if (this.open_baustein_attributes__baustein_id === null || this.open_baustein_attributes__baustein_id !== baustein_id) {
            var current_baustein_1 = this.getBaustein(baustein_id);
            this.open_baustein_attributes__baustein_id = baustein_id;
            var self_1 = this;
            console.log("open_baustein_attributes baustein_id", baustein_id);
            this.dom.sidebar_content__baustein_styles.innerHTML = "";
            this.dom.sidebar_content__baustein_misc.innerHTML = "";
            var be_layout_view = this.dom.sidebar_content__baustein_styles.appendChild(this.createElement("div", "", "be_layout_view"));
            var be_layout_view_margin = be_layout_view.appendChild(this.createElement("div", "", "be_layout_view_margin"));
            var be_layout_view_margin_indicator = be_layout_view_margin.appendChild(this.createElement("div", "", "be_layout_view_indicator"));
            be_layout_view_margin_indicator.innerHTML = "margin";
            be_layout_view_margin.appendChild(this.layout_fc("margin-top", current_baustein_1.getStyleValue("margin-top", "0"), "-6px", null, null, ""));
            be_layout_view_margin.appendChild(this.layout_fc("margin-bottom", current_baustein_1.getStyleValue("margin-bottom", "0"), null, null, "-6px", ""));
            be_layout_view_margin.appendChild(this.layout_fc("margin-left", current_baustein_1.getStyleValue("margin-left", "0"), "", null, null, "-6px"));
            be_layout_view_margin.appendChild(this.layout_fc("margin-right", current_baustein_1.getStyleValue("margin-right", "0"), "", "-6px", null, null));
            var be_layout_view_border = be_layout_view_margin.appendChild(this.createElement("div", "", "be_layout_view_border"));
            var be_layout_view_border_indicator = be_layout_view_border.appendChild(this.createElement("div", "", "be_layout_view_indicator"));
            be_layout_view_border_indicator.innerHTML = "border";
            be_layout_view_border.appendChild(this.layout_fc("border-top", current_baustein_1.getStyleValue("border-top", "0"), "-13px", null, null, ""));
            be_layout_view_border.appendChild(this.layout_fc("border-bottom", current_baustein_1.getStyleValue("border-bottom", "0"), null, null, "-13px", ""));
            be_layout_view_border.appendChild(this.layout_fc("border-left", current_baustein_1.getStyleValue("border-left", "0"), "", null, null, "-14px"));
            be_layout_view_border.appendChild(this.layout_fc("border-right", current_baustein_1.getStyleValue("border-right", "0"), "", "-14px", null, null));
            var be_layout_view_padding = be_layout_view_border.appendChild(this.createElement("div", "", "be_layout_view_padding"));
            var be_layout_view_padding_indicator = be_layout_view_padding.appendChild(this.createElement("div", "", "be_layout_view_indicator"));
            be_layout_view_padding_indicator.innerHTML = "padding";
            be_layout_view_padding.appendChild(this.layout_fc("padding-top", current_baustein_1.getStyleValue("padding-top", "0"), "0px", null, null, ""));
            be_layout_view_padding.appendChild(this.layout_fc("padding-bottom", current_baustein_1.getStyleValue("padding-bottom", "0"), null, null, "0px", ""));
            be_layout_view_padding.appendChild(this.layout_fc("padding-left", current_baustein_1.getStyleValue("padding-left", "0"), "", null, null, "8px"));
            be_layout_view_padding.appendChild(this.layout_fc("padding-right", current_baustein_1.getStyleValue("padding-right", "0"), "", "8px", null, null));
            var be_layout_view_inner = be_layout_view_padding.appendChild(this.createElement("div", "", "be_layout_view_inner"));
            be_layout_view_inner.appendChild(this.layout_fc("width", current_baustein_1.getStyleValue("width", "auto"), null, null, null, null));
            be_layout_view_inner.appendChild(this.createElement("span", "", "be_layout_wh_delimiter")).innerHTML = " &times; ";
            be_layout_view_inner.appendChild(this.layout_fc("height", current_baustein_1.getStyleValue("height", "auto"), null, null, null, null));
            if (current_baustein_1.renderType === bausteinRenderType.image) {
                var formcontrol_result = this.formcontrol("baustein_image", "text", "image", 'Bildquelle', current_baustein_1.content, "", []);
                this.dom.sidebar_content__baustein_styles.appendChild(formcontrol_result.content);
                var start_image_selector = formcontrol_result.content.appendChild(self_1.createElement("button", "start_image_selector", "form-control"));
                start_image_selector.type = "button";
                start_image_selector.innerHTML = "[>]";
                start_image_selector.style.width = "34px";
                start_image_selector.style.marginLeft = "4px";
                var baustein_image_form_control_1 = formcontrol_result.input;
                baustein_image_form_control_1.addEventListener("change", function () {
                    current_baustein_1.content = baustein_image_form_control_1.value;
                    if (self_1.selected_baustein !== null) {
                        var selected_baustein_item = self_1.selected_baustein.querySelector(".be_baustein_item");
                        selected_baustein_item.src = baustein_image_form_control_1.value;
                    }
                });
                baustein_image_form_control_1.style.width = 'calc(100% - ' + start_image_selector.style.width + ' - ' + start_image_selector.style.marginLeft + ')';
                start_image_selector.addEventListener("click", function () {
                    if (self_1.selected_baustein_id !== null) {
                        self_1.dialog_media(self_1.getBaustein(self_1.selected_baustein_id));
                    }
                });
            }
            for (var i = 0; i < current_baustein_1.style.length; i++) {
                var element = current_baustein_1.style[i];
                if (element.property.showInBausteinAttributesSidebar) {
                    var styleProperty = this.getStylePropertyByName(element.property.name);
                    this.dom.sidebar_content__baustein_styles.appendChild(this.formcontrol("baustein", styleProperty.type, styleProperty.name, styleProperty.title, element.value, styleProperty.suffix, styleProperty.options).content);
                }
            }
            var baustein_class_row = this.dom.sidebar_content__baustein_misc.appendChild(this.formcontrol("baustein_class", "text", "class", 'CSS Klasse <div style="font-size: 11px; margin-bottom: 2px;">(für Fortgeschrittene Nutzer)</div>', current_baustein_1.class, "", []).content);
            var baustein_delete_button = this.dom.sidebar_content__baustein_misc.appendChild(this.createElement("button", this.dom_id + '_deleteBaustein', "form-control bautstein-delete"));
            baustein_delete_button.innerHTML = "Baustein löschen";
            baustein_delete_button.type = "button";
            var baustein_class_form_control = baustein_class_row.getElementsByClassName('form-control')[0];
            baustein_class_form_control.addEventListener("change", function () {
                current_baustein_1.class = this.value;
            });
            baustein_delete_button.addEventListener("click", function () {
                dialog.start("Baustein löschen", "Sind Sie sich sicher, dass Sie diesen Baustein löschen wollen?", null, "Löschen", "Abbrechen", null, function () {
                    self_1.close_baustein_attributes();
                    console.log(self_1.data.bausteine);
                    self_1.deleteBaustein(baustein_id);
                    console.log(self_1.data.bausteine);
                    dialog.close();
                });
            });
            this.dom.sidebar_content__site.style.display = "none";
            this.dom.sidebar_header_col__site.classList.remove("active");
            this.dom.sidebar_content__baustein.style.display = "";
            this.dom.sidebar_header_col__baustein.classList.add("active");
            this.dom.sidebar_header_col__baustein.classList.remove("disabled");
        }
    };
    BausteinEditor.prototype.getItemFromArray = function (array, index, def) {
        if (typeof array[index] === "undefined") {
            return def;
        }
        else {
            return array[index];
        }
    };
    BausteinEditor.prototype.close_baustein_attributes = function () {
        this.dom.sidebar_content__site.style.display = "";
        this.dom.sidebar_header_col__site.classList.add("active");
        this.dom.sidebar_content__baustein.style.display = "none";
        this.dom.sidebar_header_col__baustein.classList.remove("active");
        this.dom.sidebar_header_col__baustein.classList.add("disabled");
    };
    BausteinEditor.prototype.preview_render = function () {
        if (this.dom.preview_content.style.display === "") {
            this.dom.preview_content.innerHTML = this.export().html;
        }
    };
    BausteinEditor.prototype.request = function (type, endpoint, params) {
        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(this);
                    }
                    else {
                        reject(this);
                    }
                }
            };
            if (type === "GET") {
                xhttp.open("GET", endpoint + params, true);
                xhttp.send();
            }
            else {
                xhttp.open("POST", endpoint, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(params);
            }
        });
    };
    BausteinEditor.prototype.dialog_rowcol = function (baustein) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2, new Promise(function (resolve, reject) {
                        var content = self.createElement("div", "", "");
                        var columns_fcr = self.formcontrol("dialog", "number", "columns", "Spalten", "", "", []);
                        columns_fcr.content.style.display = "inline-block";
                        columns_fcr.content.style.verticalAlign = "top";
                        columns_fcr.content.style.width = "100px";
                        columns_fcr.input.value = "1";
                        content.appendChild(columns_fcr.content);
                        if (baustein.renderType === bausteinRenderType.table) {
                            var rows_fcr = self.formcontrol("dialog", "number", "rows", "Reihen", "", "", []);
                            rows_fcr.content.style.display = "inline-block";
                            rows_fcr.content.style.verticalAlign = "top";
                            rows_fcr.content.style.width = "100px";
                            rows_fcr.input.value = "1";
                            content.appendChild(rows_fcr.content);
                        }
                        var error_message = self.createElement("div", "", "error-message");
                        error_message.style.color = "red";
                        dialog.start(baustein.title + " erstellen", content, 'Fertigstellen', null, 'Abbrechen', function () {
                            var columns_number = parseInt(columns_fcr.input.value);
                            if (columns_number < 1) {
                                error_message.innerHTML = '"Spalten Anzahl" muss größer als 0 sein';
                                return false;
                            }
                            else {
                                baustein.columns = columns_number;
                            }
                            if (baustein.renderType === bausteinRenderType.table) {
                                var rows_number = parseInt(rows_fcr.input.value);
                                if (rows_number < 1) {
                                    error_message.innerHTML = '"Reihen Anzahl" muss größer als 0 sein';
                                    return false;
                                }
                                else {
                                    baustein.rows = rows_number;
                                }
                            }
                            resolve(null);
                            dialog.close();
                        }, null, function () {
                            dialog.close();
                            reject();
                        });
                    })];
            });
        });
    };
    BausteinEditor.prototype.dialog_media = function (baustein) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2, new Promise(function (resolve, reject) {
                        var search_endpoint, register_endpoint;
                        if (baustein.renderType === bausteinRenderType.image) {
                            search_endpoint = self.api_endpoints.image_search;
                            register_endpoint = self.api_endpoints.image_register;
                        }
                        else {
                            search_endpoint = "";
                            register_endpoint = "";
                        }
                        var content = self.createElement("div", "", "");
                        var content_search = content.appendChild(self.createElement("div", "", "be-dialog-media-search"));
                        content_search.style.marginBottom = "20px";
                        var content_search_input = content_search.appendChild(self.createElement("input", "", "be-dialog-media-search-input form-control"));
                        content_search_input.type = "text";
                        content_search_input.placeholder = "Suchbegriffe..";
                        content_search_input.style.display = "inline-block";
                        content_search_input.style.verticalAlign = "middle";
                        var content_search_submit = content_search.appendChild(self.createElement("button", "", "be-dialog-media-search-submit __dialog-btn"));
                        content_search_submit.type = "button";
                        content_search_submit.innerHTML = "Suchen";
                        content_search_submit.style.display = "inline-block";
                        content_search_submit.style.verticalAlign = "middle";
                        content_search_submit.style.width = "66px";
                        content_search_submit.style.padding = "6px";
                        content_search_submit.style.marginLeft = "8px";
                        content_search_submit.style.marginRight = "0";
                        content_search_input.style.width = "calc(100% - " + content_search_submit.style.width + " - " + content_search_submit.style.marginLeft + ")";
                        var content_results = content.appendChild(self.createElement("div", "", "be-dialog-media-results"));
                        content_results.style.overflowY = "auto";
                        content_results.style.height = "500px";
                        content_results.style.maxHeight = "90vh";
                        function start_search() {
                            self.request("GET", search_endpoint, "&q=" + content_search_input.value)
                                .then(function (response) {
                                var json = JSON.parse(response.responseText);
                                var media_array = json.media;
                                console.log("response json", json);
                                content_results.innerHTML = '';
                                var _loop_3 = function (i) {
                                    var element = media_array[i];
                                    row = content_results.appendChild(self.createElement("div", "", "row"));
                                    row.style.display = "inline-block";
                                    row.style.verticalAlign = "top";
                                    row.style.width = (content_results.clientWidth / 2 - 18) + "px";
                                    row.style.maxWidth = "100%";
                                    row.style.border = "1px solid #ccc";
                                    row.style.borderRadius = "6px";
                                    row.style.margin = "4px";
                                    row.style.textAlign = "center";
                                    row.style.overflow = "hidden";
                                    image_container = row.appendChild(self.createElement("div", "", "col"));
                                    image_container.style.width = "100%";
                                    image_container.style.height = "200px";
                                    image = image_container.appendChild(self.createElement("img", "", ""));
                                    image.src = element.url;
                                    image.style.maxWidth = "100%";
                                    image.style.maxHeight = "100%";
                                    title = row.appendChild(self.createElement("div", "", "col"));
                                    title.innerText = element.name;
                                    title.style.marginBottom = "8px";
                                    button = row.appendChild(self.createElement("button", "", "__dialog-btn __dialog-btn-green"));
                                    button.type = "button";
                                    button.innerText = "Auswählen";
                                    button.style.marginBottom = "8px";
                                    var bild_id = element.id;
                                    button.addEventListener("click", function () {
                                        self.request("POST", register_endpoint, "&id=" + bild_id)
                                            .then(function (response) {
                                            var json = JSON.parse(response.responseText);
                                            var bild_url = json.url;
                                            baustein.content = bild_url;
                                            if (self.selected_baustein !== null) {
                                                var img = self.selected_baustein.querySelector("img");
                                                if (img !== null) {
                                                    img.src = bild_url;
                                                }
                                            }
                                            resolve(null);
                                            dialog.close();
                                        });
                                    });
                                };
                                var row, image_container, image, title, button;
                                for (var i = 0; i < media_array.length; i++) {
                                    _loop_3(i);
                                }
                            });
                        }
                        content_search_input.addEventListener("change", start_search);
                        content_search_submit.addEventListener("click", start_search);
                        dialog.start("Bild laden", content, '<i class="fas fa-sync"></i> Ansicht aktualisieren', null, 'Abbrechen', function () {
                            start_search();
                        }, null, function () {
                            dialog.close();
                            reject();
                        });
                        if (self.imageUpload !== null) {
                            var __dialog_footer = document.getElementById("__dialog_footer");
                            var upload_button = self.createElement("button", "", "__dialog-btn __dialog-btn-cyan");
                            upload_button.innerHTML = '<i class="fas fa-upload"></i> Bild hochladen';
                            upload_button.addEventListener("click", function () { if (self.imageUpload !== null)
                                self.imageUpload(); });
                            __dialog_footer === null || __dialog_footer === void 0 ? void 0 : __dialog_footer.prepend(upload_button);
                        }
                        start_search();
                    })];
            });
        });
    };
    BausteinEditor.prototype.import = function (data) {
        for (var i = 0; i < data.bausteine.length; i++) {
            if (data.bausteine[i].id >= this.baustein_id_counter) {
                this.baustein_id_counter = data.bausteine[i].id + 1;
            }
            var baustein_type = this.getBausteinType(data.bausteine[i].type);
            data.bausteine[i].icon = baustein_type.icon;
        }
        this.data = data;
        this.render();
    };
    BausteinEditor.prototype.export_createBausteinElement = function (baustein, tag_override) {
        if (tag_override === void 0) { tag_override = null; }
        if (baustein.tag === "") {
            var text_node = document.createTextNode(baustein.content);
            if (tag_override !== null) {
                var bausteinElement = document.createElement(tag_override);
                bausteinElement.appendChild(text_node);
                return bausteinElement;
            }
            return text_node;
        }
        else {
            var tag, id;
            if (tag_override === null) {
                tag = baustein.tag;
                id = baustein.type;
            }
            else {
                tag = tag_override;
                id = tag_override;
            }
            var bausteinElement = document.createElement(tag);
            bausteinElement.className = "baustein baustein--" + id;
            if (baustein.class !== "")
                bausteinElement.className += " " + baustein.class;
            for (var s = 0; s < baustein.style.length; s++) {
                var style = baustein.style[s];
                if (style.value !== "" && style.value !== "0" && style.value !== "auto" && style.value !== "initial" && style.value !== "normal"
                    && (style.property.options.length === 0 || style.value !== style.property.options[0].value)) {
                    var ok = true, test_type = this.getBausteinType(id), test_type_index = -1;
                    console.log("test_type id", id);
                    console.log("test_type", test_type);
                    for (var b = 0; b < test_type.style.length; b++) {
                        var test_style = test_type.style[b];
                        test_type_index = b;
                        if (test_style.property.name === style.property.name) {
                            console.log(test_style.property.name, test_style.value, "|", style.property.name, style.value);
                            if (test_style.value === style.value) {
                                ok = false;
                            }
                            break;
                        }
                    }
                    if (ok) {
                        if (test_type.style[test_type_index].property.useAsClass) {
                            bausteinElement.classList.add(style.value);
                        }
                        else {
                            bausteinElement.style.setProperty(style.property.name, style.value);
                        }
                    }
                }
            }
            if (tag_override === null) {
                console.log('baustein.content', baustein.content);
                if (baustein.renderType === bausteinRenderType.image) {
                    var bausteinElement_img = bausteinElement;
                    bausteinElement_img.src = baustein.content;
                }
                else {
                    bausteinElement.innerHTML = baustein.content;
                }
            }
            var child_bausteine = this.getBausteineArray(baustein.id);
            for (var r = 0; r < child_bausteine.length; r++) {
                var child = child_bausteine[r];
                var child_tag_override = null;
                if (baustein.renderType === bausteinRenderType.tableRow)
                    child_tag_override = "td";
                else if (baustein.renderType === bausteinRenderType.layout)
                    child_tag_override = "div";
                if (child_tag_override === null) {
                    bausteinElement.appendChild(this.export_createBausteinElement(child));
                }
                else {
                    if (child.type === this.types.td.type || child.type === this.types.th.type) {
                        bausteinElement.appendChild(this.export_createBausteinElement(child));
                    }
                    else {
                        var bausteinElement_col = bausteinElement.appendChild(document.createElement(child_tag_override));
                        bausteinElement_col.appendChild(this.export_createBausteinElement(child));
                    }
                }
            }
            return bausteinElement;
        }
    };
    BausteinEditor.prototype.export = function () {
        var export_html_dom = this.createElement("div", "", "be-article");
        for (var s = 0; s < this.data.page.style.length; s++) {
            var style = this.data.page.style[s];
            if (style.value !== "" && style.value !== "0" && style.value !== "auto" && (style.property.options.length === 0 && style.value !== style.property.options[0])) {
                export_html_dom.style.setProperty(style.property.name, style.value);
            }
        }
        var bausteine = this.getBausteineArray(null);
        for (var row = 0; row < bausteine.length; row++) {
            var baustein = bausteine[row];
            if (baustein.renderType !== bausteinRenderType.bausteinSelector) {
                export_html_dom.appendChild(this.export_createBausteinElement(baustein, null));
            }
        }
        return {
            data: this.data,
            html: export_html_dom.outerHTML
        };
    };
    return BausteinEditor;
}());
var LuxDragDrop = (function () {
    function LuxDragDrop(target, options) {
        var _this = this;
        this.isHeld = false;
        this.timeoutId = 0;
        this.drag_element = null;
        this.offset_x = 0;
        this.offset_y = 0;
        this.callback_mousedown = null;
        this.callback_mousemove = null;
        this.callback_mouseup = null;
        this.mousedown = function (e) {
            if (!_this.isHeld) {
                _this.timeoutId = setTimeout(function () {
                    console.log("document.activeElement ", document.activeElement);
                    if (_this.callback_mousedown !== null) {
                        if (_this.callback_mousedown(e) === false)
                            return false;
                    }
                    _this.isHeld = true;
                    _this.target.classList.add("disabled");
                    _this.drag_element = document.createElement(_this.target.tagName);
                    _this.drag_element.className = _this.target.className;
                    _this.drag_element.innerHTML = _this.target.innerHTML;
                    _this.drag_element.style.width = _this.target.clientWidth + "px";
                    _this.drag_element.style.height = _this.target.offsetHeight + "px";
                    document.body.appendChild(_this.drag_element);
                    console.log("this.drag_element", _this.drag_element);
                    document.body.classList.add("grabbing");
                    if (_this.drag_element === null) {
                        console.error("[LuxClickHoldDrag] drag_element is null. Well bad.");
                    }
                    else {
                        _this.drag_element.classList.add("ondrag");
                        _this.drag_element.style.position = "fixed";
                        _this.drag_element.style.display = "none";
                        setTimeout(function () {
                            if (_this.drag_element !== null) {
                                _this.drag_element.style.display = "block";
                            }
                        }, 100);
                    }
                    ["mousemove", "touchmove"].forEach(function (type) {
                        document.body.addEventListener(type, _this.mousemove);
                    });
                    _this.offset_x = _this.target.offsetWidth / 2;
                    _this.offset_y = _this.target.offsetHeight / 2;
                }, 200);
            }
            ["mouseup", "touchend", "touchcancel"].forEach(function (type) {
                document.body.addEventListener(type, _this.mouseup);
            });
        };
        this.mousemove = function (e) {
            if (_this.drag_element !== null) {
                _this.drag_element.style.left = (e.clientX - _this.offset_x) + "px";
                _this.drag_element.style.top = (e.clientY - _this.offset_y) + "px";
                if (_this.callback_mousemove !== null)
                    _this.callback_mousemove(e);
            }
        };
        this.mouseup = function (e) {
            clearTimeout(_this.timeoutId);
            if (_this.isHeld) {
                _this.isHeld = false;
                _this.target.classList.remove("disabled");
                if (_this.drag_element !== null) {
                    _this.drag_element.remove();
                    _this.drag_element = null;
                }
                document.querySelectorAll(".ondrag").forEach(function (elem) { elem.remove(); });
                document.body.classList.remove("grabbing");
                var elementTarget = _this.elementFromPoint(e.clientX, e.clientY);
                if (elementTarget === null) {
                    console.error("[LuxClickHoldDrag] Oh well bad, elementTarget is null. Uff.");
                }
                else {
                    if (_this.callback_mouseup !== null)
                        _this.callback_mouseup(e, elementTarget);
                }
            }
            ["mousemove", "touchmove"].forEach(function (type) {
                document.body.removeEventListener(type, _this.mousemove);
            });
            ["mouseup", "touchend", "touchcancel"].forEach(function (type) {
                document.body.removeEventListener(type, _this.mouseup);
            });
        };
        this.target = target;
        this.callback_mousedown = options.mousedown || null;
        this.callback_mousemove = options.mousemove || null;
        this.callback_mouseup = options.mouseup || null;
        ["mousedown", "mousestart"].forEach(function (type) {
            _this.target.addEventListener(type, _this.mousedown);
        });
    }
    LuxDragDrop.prototype.elementFromPoint = function (x, y) {
        var elem = document.elementFromPoint(x, y);
        return elem;
    };
    return LuxDragDrop;
}());
//# sourceMappingURL=baustein_editor.js.map