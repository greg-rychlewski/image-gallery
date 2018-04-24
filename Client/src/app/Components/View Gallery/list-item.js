import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { cloudinaryConfig } from "../../utils/config";
import "./list-item.css";

export class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            date: props.date,
            type: props.type,
            numPages: props.numPages,
            maxLength: this.getMaxLength(),
            truncate: props.name.length > this.getMaxLength()
        }
    }

    getMaxLength() {
        return 30;
    }

    displayName(name) {
        if (name.length <= this.state.maxLength) {
            return name;
        }

        let spaceIndex = name.substring(0, this.state.maxLength).lastIndexOf(" ");
        if (spaceIndex >= 0) {
            return name.substring(0, spaceIndex);
        }

        return name.substring(0, this.state.maxLength);
    }

    imageLabel(numPages) {
        return numPages > 1 ? "Images" : "Image";
    }

    render () {
        return (
            <Link to={"view/" + this.state.id}>
                <div className="image-holder">
                    <Image cloudName={cloudinaryConfig.cloudName} publicId={[this.state.type, this.state.name, "page1"].join("/")}> 
                        <Transformation crop="fill" gravity="center" width="250" height="250" />
                    </Image>

                    <div className="display">
                        <div className="image-name">
                            <div className={this.state.truncate ? "ellipsis" : ""} id="name-text">{this.displayName(this.state.name)}</div>
                        </div>

                        <div className="image-info">
                            <div className="num-images">{this.state.type + " (" + this.state.numPages + " " + this.imageLabel(this.state.numPages) + ")"}</div>
                            <div className="image-date">{this.state.date}</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}