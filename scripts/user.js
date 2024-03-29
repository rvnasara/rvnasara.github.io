"use strict";
var core;
(function (core) {
    var User = (function () {
        function User(firstName, lastName, address, contactNumber, emailAddress, username, password) {
            if (firstName === void 0) { firstName = ""; }
            if (lastName === void 0) { lastName = ""; }
            if (address === void 0) { address = ""; }
            if (contactNumber === void 0) { contactNumber = ""; }
            if (emailAddress === void 0) { emailAddress = ""; }
            if (username === void 0) { username = ""; }
            if (password === void 0) { password = ""; }
            this._firstName = firstName;
            this._lastName = lastName;
            this._address = address;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
        Object.defineProperty(User.prototype, "firstName", {
            get: function () {
                return this._firstName;
            },
            set: function (value) {
                this._firstName = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "lastName", {
            get: function () {
                return this._lastName;
            },
            set: function (value) {
                this._lastName = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "address", {
            get: function () {
                return this._address;
            },
            set: function (value) {
                this._address = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "contactNumber", {
            get: function () {
                return this._contactNumber;
            },
            set: function (value) {
                this._contactNumber = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "emailAddress", {
            get: function () {
                return this._emailAddress;
            },
            set: function (value) {
                this._emailAddress = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "username", {
            get: function () {
                return this._username;
            },
            set: function (value) {
                this._username = value;
            },
            enumerable: false,
            configurable: true
        });
        User.prototype.toString = function () {
            return "First Name: ".concat(this._firstName, "\n Last Name: ").concat(this._lastName, "\n\n            Address: ").concat(this._address, "\n Contact Number: ").concat(this._contactNumber, "\n\n            Email Address: ").concat(this._emailAddress, "\n Username: ").concat(this._username);
        };
        User.prototype.toJSON = function () {
            return {
                FirstName: this._firstName,
                LastName: this._lastName,
                Address: this._address,
                ContactNumber: this._contactNumber,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            };
        };
        User.prototype.fromJSON = function (data) {
            this._firstName = data.FirstName;
            this._lastName = data.LastName;
            this._address = data.Address;
            this._contactNumber = data.ContactNumber;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        };
        User.prototype.serialize = function () {
            if (this._firstName !== "" && this._lastName !== "" && this._address !== ""
                && this._contactNumber !== "" && this._emailAddress !== "" && this._username !== "") {
                return "".concat(this._firstName, ", ").concat(this._lastName, ",").concat(this._address, ",\n                ").concat(this._contactNumber, ",").concat(this._emailAddress, ", ").concat(this._username);
            }
            console.error("Failed to serialize: One or more user attributed were missing");
            return null;
        };
        User.prototype.deserialize = function (data) {
            var propertyArray = data.split(",");
            this._firstName = propertyArray[0];
            this._lastName = propertyArray[1];
            this._address = propertyArray[2];
            this._contactNumber = propertyArray[3];
            this._emailAddress = propertyArray[4];
            this._username = propertyArray[5];
        };
        return User;
    }());
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map