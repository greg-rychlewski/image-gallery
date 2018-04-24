import React from "react";
import { Preview } from "./entry-preview";
import { Image, Transformation } from "cloudinary-react";
import { makeCompareFunction } from "../../utils/helper";
import { cloudinaryConfig } from "../../utils/config";
import "./entry.css";

export class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: decodeURI(props.match.params.entryId),
            images: [],
            name: "",
            preview: false,
            previewStartIndex: null
        };
    }

    componentDidMount() {
        // Get  entry name + list of images belonging to entry after component mounts
        fetch("https://res.cloudinary.com/"+ cloudinaryConfig.cloudName + "/image/list/" + this.state.id + ".json")
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                images: responseData.resources.map(function(image){
                            return ({
                                width: image.width,
                                height: image.height,
                                aspectRatio: image.width / image.height,
                                publicId: image.public_id,
                                page: this.getPageNum(image.public_id)
                            });
                        }, this).sort((a,b) => a["page"] < b["page"] ? -1 : 1),
                name: this.getEntryName(responseData.resources[0].public_id)
            });
        }).catch((error) => console.log(error));
    }

    getEntryName(publicId) {
        let splitId = publicId.split("/");
        return splitId[1];
    }

    getPageNum(publicId) {
        let splitId = publicId.split("/");
        let [pageString] = splitId.slice(-1);
        let pageNum = pageString.replace(/[^0-9]/g, "");

        return parseInt(pageNum);
    }

    showPreview(image) {
        // Display preview carousel when user clicks on an image
        this.setState({
            preview: true,
            previewStartIndex: image.page - 1
        });
    }

    closePreview() {
        // Close preview carousel when user clicks away from preview image
        this.setState({
            preview: false
        });
    }

    render() {
        return (
            <div id="entry-container">
                <h1> {this.state.name}</h1>
                <div id="entry-image-list">
                    {
                        this.state.images.map(function(image){
                            return (
                                <Image 
                                    key={image.publicId} 
                                    cloudName={cloudinaryConfig.cloudName} 
                                    publicId={image.publicId} 
                                    className="entry-preview-container" 
                                    onClick={() => this.showPreview(image)}>
                                    <Transformation crop="fill" gravity="center" width="250" height="250" />
                                </Image>
                            );
                        }.bind(this))
                    }
                </div>

                {
                    this.state.preview && 
                    <Preview images={this.state.images} startIndex={this.state.previewStartIndex} closePreview={() => this.closePreview()}/>
                }
            </div>
        );
    }
}