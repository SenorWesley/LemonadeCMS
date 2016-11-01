Lemonade.Inventory = {
    toggle: function () {
        $("#inventory").toggle().draggable({
            containment: "#game",
            handle: ".title"
        });
    }
}