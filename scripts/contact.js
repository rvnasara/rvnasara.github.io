"use strict";
var core;
(function (core) {
    var Contact = (function () {
        function Contact(fullName, contactNumber, emailAddress) {
            if (fullName === void 0) { fullName = ""; }
            if (contactNumber === void 0) { contactNumber = ""; }
            if (emailAddress === void 0) { emailAddress = ""; }
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }
        Object.defineProperty(Contact.prototype, "fullName", {
            get: function () {
                return this._fullName;
            },
            set: function (value) {
                this._fullName = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactNumber", {
            get: function () {
                return this._contactNumber;
            },
            set: function (value) {
                this._contactNumber = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "emailAddress", {
            get: function () {
                return this._emailAddress;
            },
            set: function (value) {
                this._emailAddress = value;
            },
            enumerable: false,
            configurable: true
        });
        Contact.prototype.toString = function () {
            return "FullName ".concat(this._fullName, "\n \n        ContactNumber ").concat(this._contactNumber, "\n \n        EmailAddress ").concat(this._emailAddress);
        };
        Contact.prototype.serialize = function () {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return "".concat(this._fullName, ", ").concat(this._contactNumber, ", ").concat(this._emailAddress);
            }
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        };
        Contact.prototype.deserialize = function (data) {
            var propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        };
        return Contact;
    }());
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map