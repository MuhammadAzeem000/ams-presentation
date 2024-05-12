const data = [
    {
        name: "Top Sub",
        number: 'WQ55B0101',
        weight: '18.5',
        src: '01',
        is_drop: false,
    },
    {
        name: "Top Sub Outer O/Ring",
        number: 'F55B0201',
        weight: '0.01',
        src: '02',
        is_drop: false,
    },
    {
        name: "Top Sub Inner O/Ring",
        number: 'F45B0901',
        weight: '0.01',
        src: '03',
        is_drop: false,
    },
    {
        name: "Quad Ring",
        number: 'WQ55B0401',
        weight: '0.01',
        src: '04',
        is_drop: false,
    },
    {
        name: "Check Valve",
        number: 'WQ55B0502',
        weight: '0.3',
        src: '05',
        is_drop: false,
    },
    {
        name: "Check Valve Spring",
        number: 'WQ55B0702',
        weight: '0.02',
        src: '06',
        is_drop: false,
    },
    {
        name: "Check Valve Holder",
        number: 'WQ55B0602',
        weight: '0.4',
        src: '07',
        is_drop: false,
    },
    {
        name: "Dowel Pin",
        number: 'WQ55B0801',
        weight: '0.12',
        src: '08',
        is_drop: false,
    },
    {
        name: "Central Control Tube",
        number: 'WQ55B1002',
        weight: '0.8',
        src: '09',
        is_drop: false,
    },
    {
        name: "Air Plug",
        number: 'WQ55B1201',
        weight: '0.01',
        src: '10',
        is_drop: false,
    },
    {
        name: "Piston",
        number: 'WQ55B1402',
        weight: '15.7',
        src: '11',
        is_drop: false,
    },
    {
        name: "Outer Cylinder",
        number: 'WQ55B0302',
        weight: '24.7',
        src: '12',
        is_drop: false,
    },
    {
        name: "Guide Sleeve",
        number: 'WQ55B1702',
        weight: '3.1',
        src: '13',
        is_drop: false,
    },
    {
        name: "Retaining Ring",
        number: 'WQ55B1904',
        weight: '0.3',
        src: '14',
        is_drop: false,
    },
    {
        name: "Drive Sub",
        number: 'WQ55B2003',
        weight: '5.3',
        src: '15',
        is_drop: false,
    },
    {
        name: "Drill Bit",
        number: 'QL50 Bit',
        weight: '/',
        src: '16',
        is_drop: false,
    },
];

// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/

window.onload = function () {
    const StartButton = document.querySelector("#StartBtn");
    const TabButtons = document.querySelectorAll(".Tab_Btn");

    const AudioDrop = document.querySelector('#drop-audio');
    const AudioPick = document.querySelector('#pick-audio');
    const ErrorPick = document.querySelector('#error-audio');


    const ItemName = document.querySelector('#item-name');
    const ItemNumber = document.querySelector('#item-number');
    const ItemWeight = document.querySelector('#item-weight');
    const ItemImg = document.querySelector('#item-img');

    ItemName.innerText = data[0].name;
    ItemNumber.innerText = data[0].number;
    ItemWeight.innerText = data[0].weight;

    let reveal, currTile, otherTile;
    
    reveal = new Reveal(document.querySelector('.reveal'), {
        controls: false,
        progress: false,
        hash: false,
        width: window.innerWidth,
        height: window.innerHeight,
        touch: false,
    });

    reveal.initialize();

    /* Add one or more listeners to an element
    ** @param {DOMElement} element - DOM element to add listeners to
    ** @param {string} eventNames - space separated list of event names, e.g. 'click change'
    ** @param {Function} listener - function to attach for each event as a listener
    */

    function addListenerMulti(element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
    }

    addListenerMulti(StartButton, 'click touchstart', function (e) {
        reveal.next();
    });

    TabButtons.forEach((TabButton) => {
        addListenerMulti(TabButton, 'click touchstart', function (e) {
            reveal.next();
        });
    });

    for (let r = 0; r < data.length; r++) {
        //<img>
        let tile = document.createElement("img");
        tile.className = "tile";
        tile.src = `./src/board-img/img-${data[r].src}.png`;
        tile.alt = `img-${data[r].src}`;

        tile.setAttribute("data-id", r);
        tile.setAttribute("data-name", data[r].name);
        tile.setAttribute("data-number", data[r].number);
        tile.setAttribute("data-weight", data[r].weight);

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        tile.addEventListener("touchstart", dragStart);
        tile.addEventListener("touchmove", touchMove);
        tile.addEventListener("touchend", dragEnd);

        document.getElementById("board").append(tile);
    }

    for (let r = 0; r < data.length; r++) {
        //<img>
        let tile = document.createElement("img");
        tile.src = `./src/blank-img/img-${data[r].src}.png`;
        tile.alt = `img-${data[r].src}`;

        tile.setAttribute("data-id", r);
        tile.setAttribute("data-name", data[r].name);
        tile.setAttribute("data-number", data[r].number);
        tile.setAttribute("data-weight", data[r].weight);

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        tile.addEventListener("touchstart", dragStart);
        tile.addEventListener("touchmove", touchMove);
        tile.addEventListener("touchend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
    
    function touchMove(event) {
        // Prevent default touch behavior to avoid interference
        event.preventDefault();

        // Get the touch coordinates
        var touch = event.touches[0];
        var x = touch.clientX;
        var y = touch.clientY;

        // Get the element below the touch point
        var elementBelow = document.elementFromPoint(x, y);

        // Now you have the element below the touch point, you can perform any necessary logic
        // For example, you might want to highlight or apply styles to the element

        otherTile = elementBelow; //this refers to image that is being dropped on
    }

    //DRAG TILES
    function dragStart() {
        currTile = this; //this refers to image that was clicked on for dragging
        if (currTile.src.includes("blank")) {
            ErrorPick.play();
            return;
        }
        ItemName.innerText = currTile.getAttribute("data-name");
        ItemNumber.innerText = currTile.getAttribute("data-number");
        ItemWeight.innerText = currTile.getAttribute("data-weight");

        ItemImg.src = currTile.src;
        AudioPick.play();
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {

    }

    function dragDrop() {
        otherTile = this; //this refers to image that is being dropped on
    }

    function dragEnd() {
        if (currTile.src.includes("blank")) {
            ErrorPick.play();
            return;
        }

        if (currTile.alt !== otherTile.alt) {
            ErrorPick.play();
            return;
        }

        data[parseInt(currTile.getAttribute('data-id'))].is_drop = currTile.parentNode.getAttribute('id') === 'board';

        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        AudioDrop.play();

        if(data.every(o => o.is_drop === true)) {
            reveal.next();
        }
    }
}
