"use strict";
var core;
(function (core) {
    var Events = (function () {
        function Events(title, date, description) {
            if (title === void 0) { title = ""; }
            if (date === void 0) { date = ""; }
            if (description === void 0) { description = ""; }
            this._title = title;
            this._date = date;
            this._description = description;
        }
        Object.defineProperty(Events.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Events.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (value) {
                this._date = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Events.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: false,
            configurable: true
        });
        Events.prototype.toString = function () {
            return "Title: ".concat(this._title, "\n Date: ").concat(this._date, "\n Description: ").concat(this._description);
        };
        Events.prototype.toJSON = function () {
            return {
                Title: this._title,
                Date: this._date,
                Description: this._description
            };
        };
        Events.prototype.fromJSON = function (data) {
            this._title = data.Title;
            this._date = data.Date;
            this._description = data.Description;
        };
        Events.prototype.serialize = function () {
            if (this._title !== "" && this._date !== "" && this._description !== "") {
                return "".concat(this._title, ", ").concat(this._date, ", ").concat(this._description);
            }
            console.error("Failed to serialize: One or more user attributed were missing");
            return null;
        };
        Events.prototype.deserialize = function (data) {
            var propertyArray = data.split(",");
            this._title = propertyArray[0];
            this._date = propertyArray[1];
            this._description = propertyArray[2];
        };
        return Events;
    }());
    core.Events = Events;
})(core || (core = {}));
//# sourceMappingURL=events.js.map