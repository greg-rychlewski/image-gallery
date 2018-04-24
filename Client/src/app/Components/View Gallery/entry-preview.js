import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { cloudinaryConfig } from "../../utils/config";
import "./entry-preview.css";

let maxHeight = 600;

export class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicId: props.images[props.startIndex].publicId,
            index: props.startIndex,
            maxHeight: maxHeight,
            maxWidth: maxHeight * props.images[props.startIndex].aspectRatio
        };
    }

    next() {
        let nextIndex = (this.state.index + 1) % this.props.images.length;

        this.setState({
            publicId: this.props.images[nextIndex].publicId,
            index: nextIndex,
            maxWidth: this.state.maxHeight * this.props.images[nextIndex].aspectRatio
        });
    }

    prev() {
        let nextIndex = this.state.index == 0 ? this.props.images.length - 1 : this.state.index - 1;

        this.setState({
            publicId: this.props.images[nextIndex].publicId,
            index: nextIndex,
            maxWidth: this.state.maxHeight * this.props.images[nextIndex].aspectRatio
        });
    }

    render () {
        return (
            <div className="expand-preview-container">
                <div className="overlay" onClick={() => this.props.closePreview()}></div>

                <div className="expand-preview-image" style={{maxWidth: this.state.maxWidth + "px"}}>
                    <Image 
                        cloudName={cloudinaryConfig.cloudName} 
                        publicId={this.state.publicId} 
                        style={{maxHeight: this.state.maxHeight + "px"}}>
                    </Image>

                    {   
                        (this.props.images.length > 1) &&
                        <div>
                            <div className="expand-preview-prev" onClick={() => this.prev()}> 
                                <i className="fa fa-chevron-left"></i>
                            </div>
                            <div className="expand-preview-next" onClick={() => this.next()}>
                                <i className="fa fa-chevron-right"></i>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}