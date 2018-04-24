import React from "react";
import { ListItem } from "./list-item";
import { makeCompareFunction } from "../../utils/helper";
import { serverIP } from "../../utils/config";
import "./view-list.css";

export class ViewList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchText: "",
            sortVar: "",
            numFilteredImages: 0,
            loadNum: 12,
            numTimesLoaded: 1
        };
        
    }

    componentDidMount() {
        // Get list of entries before page renders
        fetch(serverIP + "/entry-list")
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({data: responseData, numFilteredImages: responseData.length});
        })
        .catch((error) => console.log(error));
    }

    updateSearch(e) {
        let numFiltered = 0;

        this.setState({
            searchText: e.target.value,
            data: this.state.data.map(function(entry) {
                        entry.filtered = [entry.name, entry.date.display, entry.type].some(function(value){
                            if (value.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) >= 0) {
                                numFiltered++;
                                return true;
                            }
                            return false;
                        });
                        return entry;
                    }, this),
            numFilteredImages: numFiltered
        });
    }

    sortBy(e) {
        // Define variables to sort by (always sort by name at the second level since they are unique)
        let firstVar = e.target.value;
        let secondVar = "name"

        // Define sort order (0 = ascending, 1 = descending)
        let order = 0

        // Sort data by order and columns specified above
        this.setState({
            data: this.state.data.sort(makeCompareFunction(order, firstVar, secondVar)),
            sortVar: firstVar
        })
    }

    loadImages() {
        this.setState({
            numTimesLoaded: ++this.state.numTimesLoaded
        });
    }

    render() {
        let numImagesShown = 0;

        return (
            <div className="list-container">
                <div id="list-filter">
                    <input type="text" placeholder="Search" value={this.state.searchText} onChange={(e) => this.updateSearch(e)}/>
                    <select value={this.state.sortVar} onChange={(e) => this.sortBy(e)}>
                        <option value="" defaultValue data-default>Sort By</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="type">Type</option>
                    </select>
                </div>
                
                <div id="entry-list">
                    {
                        this.state.data.map(function(item) {
                            if ((!item.filtered && item.filtered !== undefined) || (numImagesShown >= this.state.loadNum * this.state.numTimesLoaded)){
                                return;
                            }

                            numImagesShown++;
                            
                            return (
                                <ListItem 
                                    key={item.name}
                                    id={item.id} 
                                    name={item.name} 
                                    date={item.date.display} 
                                    type={item.type}
                                    numPages={item.numPages}
                                />
                            ) 
                        }, this)
                    }
                    {      
                        (this.state.numFilteredImages > this.state.loadNum * this.state.numTimesLoaded) &&
                        <div className="load-button">
                            <div className="form-button center" onClick={() => this.loadImages()}>Load More</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}