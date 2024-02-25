"use strict";

(function (core){
    class User {

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

        get firstName() {
            return this._firstName;
        }

        set firstName(value) {
            this._firstName = value;
        }

        get lastName() {
            return this._lastName;
        }

        set lastName(value) {
            this._lastName = value;
        }

        get address() {
            return this._address;
        }

        set address(value) {
            this._address = value;
        }

        get contactNumber() {
            return this._contactNumber;
        }

        set contactNumber(value) {
            this._contactNumber = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }

        toString(){
            return `First Name: ${this._firstName}\n Last Name: ${this._lastName}\n
            Address: ${this._address}\n Contact Number: ${this._contactNumber}\n
            Email Address: ${this._emailAddress}\n Username: ${this._username}`;
        }

        toJSON(){
            return {
                FirstName : this._firstName,
                LastName : this._lastName,
                Address : this._address,
                ContactNumber : this._contactNumber,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            }
        }

        fromJSON(data){
            this._firstName = data.FirstName;
            this._lastName = data.LastName;
            this._address = data.Address;
            this._contactNumber = data.ContactNumber;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        }

        /**
         * Serialize for writing to local storage
         */
        serialize(){

            if(this._firstName !== "" && this._lastName !== "" && this._address !== ""
                && this._contactNumber !== "" && this._emailAddress !== "" && this._username !== ""){

                return `${this._firstName}, ${this._lastName},${this._address},
                ${this._contactNumber},${this._emailAddress}, ${this._username}`;

            }
            console.error("Failed to serialize: One or more user attributed were missing");
            return null;
        }


        /**
         * Deserialize means to read data from localStorage
         */
        deserialize(data){
            let propertyArray = data.split(",");
            this._firstName = propertyArray[0];
            this._lastName = propertyArray[1];
            this._address = propertyArray[2];
            this._contactNumber = propertyArray[3];
            this._emailAddress = propertyArray[4];
            this._username = propertyArray[5];
        }



    }
    core.User = User;
})(core || (core ={}) );
