namespace core {
    export class Events {
        private _title: string;
        private _date: string;
        private _description: string;

        constructor(title = "", date = "", description = "") {
            this._title = title;
            this._date = date;
            this._description = description;
        }

        get title() {
            return this._title;
        }

        set title(value) {
            this._title = value;
        }

        get date() {
            return this._date;
        }

        set date(value) {
            this._date = value;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            this._description = value;
        }

        toString() {
            return `Title: ${this._title}\n Date: ${this._date}\n Description: ${this._description}`;
        }

        toJSON() {
            return {
                Title: this._title,
                Date: this._date,
                Description: this._description
            }
        }

        fromJSON(data: { Title: string; Date: string; Description: string }) {
            this._title = data.Title;
            this._date = data.Date;
            this._description = data.Description;
        }

        /**
         * Serialize for writing to local storage
         */
        serialize() {
            if (this._title !== "" && this._date !== "" && this._description !== "") {
                return `${this._title}, ${this._date}, ${this._description}`;
            }
            console.error("Failed to serialize: One or more user attributed were missing");
            return null;
        }

        /**
         * Deserialize means to read data from localStorage
         */
        deserialize(data: string) {
            let propertyArray = data.split(",");
            this._title = propertyArray[0];
            this._date = propertyArray[1];
            this._description = propertyArray[2];
        }
    }
}