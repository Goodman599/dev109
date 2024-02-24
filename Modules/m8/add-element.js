function addItem() {
    // Get and store the name of the item
    var itemName = document.getElementById('itemName').value;

    // Exit if the name is blank
    if (itemName == null || itemName == '') {
        return;
    }

    // Create a new element and store it in a variable.
    var newEl = document.createElement('li');

    // Create a text node and store it in a variable.
    var newText = document.createTextNode(itemName);

    // Attach the new text node to the new element.
    newEl.appendChild(newText);

    // Find the position where the new element should be added.
    var position = document.getElementsByTagName('ul')[0];

    // Insert the new element into its position.
    position.appendChild(newEl);

    // Clear the last item submission
    document.getElementById('itemName').value = null;
}
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault();
    addItem();
});