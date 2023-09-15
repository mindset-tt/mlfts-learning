$(document).ready( () => {
    const drag_item = $('.drag-item');
    const drag_list = $('.drag-item-list');
    
    let selectItem;

    drag_item.on('dragstart', onDragStart);

    drag_list.on('dragover', onDragOver);
    drag_list.on('dragenter', onDragEnter);
    drag_list.on('drop', onDrop);

    function onDrop() {
        $(this).append(selectItem);
        selectItem = null;
    }

    function onDragStart() {
        selectItem = $(this);
        console.log(selectItem);
    }

    function onDragEnter(e) {
        e.preventDefault();
    }

    function onDragOver(e) {
        e.preventDefault();
    }
});