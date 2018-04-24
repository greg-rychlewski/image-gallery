import React from "react";
import { Redirect } from "react-router-dom";
import { serverIP } from "../../utils/config";
import { intArray, months, years } from "../../utils/helper";
import "./new-submit.css";

export class NewSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.info,
            redirect: false,
            loading: false
        };
    }

    validate() {
        // Set state to loading while validation is taking place
        this.updateLoading();

        // Validate form on the server (secure authentication required)
        fetch(serverIP + "/validate", {
            method: "post",
            headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tag: this.props.tag,
                type: this.state.info.type.value,
                name: this.state.info.name.value.trim(),
                date: (this.state.info.month.value + " " + this.state.info.year.value).trim(),
                authentication: this.state.info.authentication.value.trim()
            })
        }).then((response) => {
            return response.json();
        }).then((responseData) => {
            // Check if validation caught any errors and flag fields if it did
            let fields = ["type", "name", "authentication"];

            fields.forEach(function(field){
                this.props.info[field]["error"] = true;
                this.props.info[field]["errorMessage"] = responseData[field]["message"];
            }, this);

            this.props.updateInfo(this.props.info);

            // Set state to not loading if errors were found
            if (responseData["hasError"]) {
                this.updateLoading()
            }else {
                // If no errors, redirect to view page and save authentication key to local storage if user checked box
                if (this.state.info.save) {
                    localStorage.setItem("authentication", this.state.info.authentication.value.trim());
                }else {
                    localStorage.removeItem("authentication")
                }

                localStorage.setItem("save", this.state.info.save);
                this.setState({redirect: true});
            }
        }).catch((error) => console.log(error));
    }

    updateLoading() {
        // Is the page currently attempting to upload the user's files
        this.setState({loading: !this.state.loading});
    }

    updateField(e) {
        // Update state for form fields
        let field = e.target.id;
        let newValue = e.target.value;
        this.props.info[field]["value"] = newValue;
        this.props.updateInfo(this.props.info);
    }

    updateSave() {
        // Update state for save authentication key checkbox
        this.props.info.save = !this.props.info.save;
        this.props.updateInfo(this.props.info);
    }

    render() {
        // Redirect to gallery if form has been submitted successfully
        if (this.state.redirect) {
            return <Redirect to="/view" push />;
        }

        // Show form if a successful submission has not been made
        return (
            <div id="submit-container">
                <h1>Image Information</h1>

                <div id="submit-form">
                    <div className="form-item">
                        <label htmlFor="type">Type</label>
                        <select 
                            id="type"
                            className={this.state.info.type.error ? "input-error" : "input-valid"} 
                            value={this.state.info.type.value} 
                            onChange={(e) => this.updateField(e)}
                        >
                            <option value="" defaultValue data-default>Select Type</option>
                            <option value="Drawing">Drawing</option>
                            <option value="Story">Story</option>
                        </select>
                        {
                            this.state.info.type.error && <div className="submit-validation">{this.state.info.type.errorMessage}</div>
                        }
                    </div>

                    <div className="form-item">
                        <label htmlFor="name">Name</label>
                        <input  
                            id="name" 
                            className={this.state.info.name.error ? "input-error" : "input-valid"} 
                            type="text"
                            value={this.state.info.name.value}
                            onChange={(e) => this.updateField(e)} 
                        />
                        {
                            this.state.info.name.error && <div className="submit-validation">{this.state.info.name.errorMessage}</div>
                        }
                    </div>

                    <div className="form-item">
                        <label>Date image(s) were created</label>
                        <select id="month" onChange={(e) => this.updateField(e)} value={this.state.info.month.value}>
                            <option value="" defaultValue data-default>Month</option>
                            {
                                months.map((month) => {
                                    return <option key={month} value={month}>{month}</option> 
                                })
                            }
                        </select>
                        <select id="year" onChange={(e) => this.updateField(e)} value={this.state.info.year.value}>
                            <option value="" defaultValue data-default>Year</option>
                            {
                                years.map((year) => {
                                    return <option key={year} value={year}>{year}</option> 
                                })
                            }
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="authentication">Authentication Key</label>
                        <input 
                            id="authentication"  
                            className={this.state.info.authentication.error ? "input-error" : "input-valid"} 
                            type="text"
                            value={this.state.info.authentication.value}
                            onChange={(e) => this.updateField(e)} 
                        />
                        <div className="save-prompt">
                            <input     
                                id="save" name="save"
                                type="checkbox" 
                                checked={this.state.info.save} 
                                onChange={() => this.updateSave()} 
                            />
                            <label htmlFor="save">Remember on this computer</label>
                        </div>
                        {
                            this.state.info.authentication.error && <div className="submit-validation">{this.state.info.authentication.errorMessage}</div>
                        } 
                    </div>
                </div>
                <div id="submit-nav">
                    <div className="form-button" onClick={this.state.loading ? null : () => this.props.updateView("images")}>Prev<span className="long-name">ious</span></div>
                    <div className="form-button" onClick={this.state.loading ? null : () => this.validate()}>
                        Submit
                        <div className={this.state.loading ? "load-box load-box-1" : "load-box"}></div>
                        <div className={this.state.loading ? "load-box load-box-2" : "load-box"}></div>
                    </div>
                </div>
            </div>
        );
    }
}