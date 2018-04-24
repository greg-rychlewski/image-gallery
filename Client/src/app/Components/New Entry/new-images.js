import React from "react";
import { ImageUploader } from "./image-uploader";
import "./new-images.css";

export class NewImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numContainers: props.imageIds.length + 1,
        };
    }

    add(newId) {
        // Add new uploaded image to state
        this.setState({numContainers: this.state.numContainers + 1});
        this.props.updateImageIds(newId);
    }

    render() {
        return (
            <div id="new-image-container">
                <h1>Choose Your Images</h1>
                <div id="new-image-list">
                    {
                        [...Array(this.state.numContainers)].map((e, i) => {
                            return <ImageUploader 
                                        key={i} 
                                        id={i} 
                                        tag={this.props.tag}
                                        public_id={this.props.imageIds[i]} 
                                        add={(newId) => this.add(newId)} 
                                    />
                        })
                    }
                </div>
                {   
                    (this.state.numContainers > 1) &&
                    <div className="form-button center" onClick={() => this.props.updateView("submit")}>Next</div>
                }
            </div>
        );
    }
}