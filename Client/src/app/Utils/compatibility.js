import "./compatibility.css";

(() => {
    // Test whether or not we can translate an SVG rect two pixels to the right
    // This will be our condition to determine whether SVG css animations are supported
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", "test-element");
    rect.setAttribute("width", "2px");
    rect.setAttribute("height", "2px");
    rect.setAttribute("fill", "#fff");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "test-svg");
    
    svg.appendChild(rect);
    document.documentElement.appendChild(svg);

    let testPassed =  document.elementFromPoint(3,0).id == "test-element";

    if (testPassed) {
        document.documentElement.classList.add("svgtransformations");
    }else {
        document.documentElement.classList.add("no-svgtransformations");
    }

    document.documentElement.removeChild(svg);
}) ();