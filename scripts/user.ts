"use strict";

namespace core {
    export class User {

        private _firstName: string;
        private _lastName: string;
        private _address: string;
        private _contactNumber: string;
        private _emailAddress: string;
        private _username: string;
        private _password: string;

        constructor(firstName = "", lastName = "", address = "",
                    contactNumber = "", emailAddress = "", username = "", password = "") {

            this._firstName = firstName;
            this._lastName = lastName;
            this._address = address;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        public get firstName() {
            return this._firstName;
        }

        public set firstName(value) {
            this._firstName = value;
        }

        public get lastName() {
            return this._lastName;
        }

        public set lastName(value) {
            this._lastName = value;
        }

        public get address() {
            return this._address;
        }

        public set address(value) {
            this._address = value;
        }

        public get contactNumber() {
            return this._contactNumber;
        }

        public set contactNumber(value) {
            this._contactNumber = value;
        }

        public get emailAddress() {
            return this._emailAddress;
        }

        public set emailAddress(value) {
            this._emailAddress = value;
        }

        public get username() {
            return this._username;
        }

        public set username(value) {
            this._username = value;
        }

        public get password():string {
            return this._password;
        }

        public set password(value:string) {
            this._password = value;
        }

        public toString(): string {
            return `First Name: ${this._firstName}\n Last Name: ${this._lastName}\n
            Address: ${this._address}\n Contact Number: ${this._contactNumber}\n
            Email Address: ${this._emailAddress}\n Username: ${this._username}`;
        }

        public toJSON(): {
            FirstName: string; LastName: string; Address: string; ContactNumber: string;
            EmailAddress: string; Username: string; Password: string }{
            return {
                FirstName: this._firstName,
                LastName: this._lastName,
                Address: this._address,
                ContactNumber: this._contactNumber,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            }
        }

        fromJSON(data:User) {
            this._firstName = data.firstName;
            this._lastName = data.lastName;
            this._address = data.address;
            this._contactNumber = data.contactNumber;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }

        /**
         * Serialize for writing to local storage
         */
        public serialize():string|null {

            if (this._firstName !== "" && this._lastName !== "" && this._address !== ""
                && this._contactNumber !== "" && this._emailAddress !== "" && this._username !== "") {

                return `${this._firstName}, ${this._lastName},${this._address},
                ${this._contactNumber},${this._emailAddress}, ${this._username}`;

            }
            console.error("Failed to serialize: One or more user attributed were missing");
            return null;
        }


        /**
         * Deserialize means to read data from localStorage
         */
        deserialize(data:string):void {
            let propertyArray = data.split(",");
            this._firstName = propertyArray[0];
            this._lastName = propertyArray[1];
            this._address = propertyArray[2];
            this._contactNumber = propertyArray[3];
            this._emailAddress = propertyArray[4];
            this._username = propertyArray[5];
        }

    }
}