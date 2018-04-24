import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { cloudinaryConfig  } from "../../utils/config";
import "./image-uploader.css";

export class ImageUploader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uploaded: props.public_id !== undefined,
            public_id: props.public_id
        }
    }

    uploadWidget(i) {
        // Cloudinary widget lets user upload/crop image
        window.cloudinary.openUploadWidget({
            cloud_name: cloudinaryConfig.cloudName,
            tags: [this.props.tag],
            upload_preset: cloudinaryConfig.preset,
            cropping: "server",
            public_id: this.props.tag + "_page" + (i + 1)
        }, (error, result) => {
            if (result === undefined) {
                return;
            }

            let newId = result[0].public_id;
            this.setState({
                uploaded: true,
                public_id: newId
            });
            this.props.add(newId);
        });
    }

    render() {
        // If image has been uploaded, show it. If not, show upload widget
        if (!this.state.uploaded) {
            return (
                <div onClick={() => this.uploadWidget(this.props.id)} className="upload-container">
                    <div className="upload-prompt">Click to Upload</div>
                </div>
            );
        }else {
            return (
                <Image cloudName={cloudinaryConfig.cloudName} publicId={this.state.public_id} className="upload-preview-container">
                    <Transformation crop="fill" gravity="center" width="250" height="250" />
                </Image>
            );
        }
    }
}