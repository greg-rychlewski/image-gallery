import React from "react";
import { Header } from "../Header/header";
import { NewImages } from "./new-images";
import { NewSubmit } from "./new-submit";
import { serverIP } from "../../utils/config"

export class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "images",
            tag: new Date().getTime(),
            imageIds: [],
            info: {
                type: {value: "", error: false, errorMessage: ""},
                name: {value: "", error: false, errorMessage: ""},
                month: {value: "", error: false, errorMessage: ""},
                year: {value: "", error: false, errorMessage: ""},
                authentication: {value: localStorage.getItem("authentication") == null ? "" : localStorage.getItem("authentication"), error: false, errorMessage: ""},
                save: localStorage.getItem("save") == null ? true : localStorage.getItem("save") == "true"
            }
        };
        this.syncRemove = this.syncRemove.bind(this);
    }

    componentDidMount() {
        // Add event listener to remove temporary cloudinary files if component doesn't get a chance to unmount
        window.addEventListener("beforeunload", this.syncRemove);
    }

    componentWillUnmount() {
        // Remove event listener that deletes temporary cloudinary files when page refreshes/closes
        window.removeEventListener("beforeunload", this.syncRemove);

        // Delete the temp files from cloudinary when component unmounts
        this.asyncRemove();
    }

    updateView(newView) {
        // Which page is showing, the image uploader or the information form
        this.setState({
            show: newView
        });
    }

    updateImageIds(newId) {
        // List of image ids uploaded by user but not submitted
        this.setState({
            imageIds: [...this.state.imageIds, newId]
        });
    }

    updateInfo(newInfo) {
        // Current information that has been entered by user in the form
        this.setState({info: newInfo});
    }

    asyncRemove() {
        // Remove temporary cloudinary files if component unmounts before user submits
        if (this.state.imageIds.length == 0){
            return;
        }

        fetch(serverIP + "/remove", {
            method: "post",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({tag: this.state.tag})
        }).catch((error) => console.log(error));
    }

    syncRemove() {
        // Remove temporary cloudinary files if component doesn't get a chance to unmount
        if (this.state.imageIds.length == 0) {
            return;
        }

        let http = new XMLHttpRequest();
        http.open("POST", serverIP + "/remove", false);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify({tag: this.state.tag})); 
    }

    render() {
        {
            if (this.state.show == "images"){
                return (
                    <div>
                        <Header />
                        <NewImages 
                            updateImageIds={(newId) => this.updateImageIds(newId)} 
                            updateView={(newPage) => this.updateView(newPage)} 
                            tag={this.state.tag} 
                            imageIds={this.state.imageIds} 
                        /> 
                    </div>
                );
            }else {
                return (
                    <div>
                        <Header />
                        <NewSubmit 
                            updateInfo={(newInfo) => this.updateInfo(newInfo)} 
                            updateView={(newPage) => this.updateView(newPage)} 
                            tag={this.state.tag} 
                            info={this.state.info}
                        /> 
                    </div>
                );
            }
        }
    }
}