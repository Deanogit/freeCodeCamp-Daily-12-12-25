// Inventory Update
// Given a 2D array representing the inventory of your store, and another 2D array representing a shipment you have received, return your updated inventory.

// Each element in the arrays will have the format: [quantity, "item"], where quantity is an integer and "item" is a string.
// Update items in the inventory by adding the quantity of any matching items from the shipment.
// If a received item does not exist in the current inventory, add it as a new entry to the end of the inventory.
// Return inventory in the order it was given with new items at the end in the order they appear in the shipment.
// For example, given an inventory of [[2, "apples"], [5, "bananas"]] and a shipment of [[1, "apples"], [3, "bananas"]], return [[3, "apples"], [8, "bananas"]].

function updateInventory(inventory, shipment) {
  // check format!
  if (!isValid2DArray(inventory) || !isValid2DArray(shipment)) {
    console.log('Invalid format!');
    return 'Invalid format!';
  }

  // update items in the inventory by adding the quantity of any matching items from the shipment
  checkMatch(inventory, shipment);

  // the solution uses a map
  const qtyMap = new Map();

  // stores the original order
  const originalOrder = [];

  // run through inventory adding to qtyMap & pushing to originalOrder
  for (const [qty, item] of inventory) {
    qtyMap.set(item, qty);
    originalOrder.push(item);
  }

  // track new items in order of appearance in shipment
  const newItemsOrder = [];

  for (const [item, qty] of shipment) {
    if (qtyMap.has(item)) {
      // existing item: add quantity .get() returns the value!
      qtyMap.set(item, qtyMap.get(item) + qty);
    } else {
      // new item: add to map and remember order
      qtyMap.set(item, qty);
      newItemsOrder.push(item);
    }
  }

  // build the result: existing items in original order, then new items in the shipment order
  const updated = originalOrder.map((item) => [qtyMap.get(item), item]);
  for (const item of newItemsOrder) {
    updated.push([qtyMap.get(item), item]);
  }

  return updated;

  // console.log(inventory, shipment)
  // Each element in the array will have the format: [integer, string]
  // how do i write at test to check?
  // console.log(typeof inventory[0][0], typeof inventory[0][1])
  // put them all together
  // const test = [...inventory, ...shipment]
  // console.log("This is test: ",test)
  // test.forEach((x) => {
  //  console.log(typeof x[0], typeof x[1])
  //  if (typeof x[0] === "number" && typeof x[1] === "string") {
  //  console.log("Continue")
  //  } else {
  //  return "Invalid format!"
  //  }
  //})
  // return inventory;
}

// Check if matches
function checkMatch(arr1, arr2) {
  console.log(arr1, arr2);
}

// Check isValid
function isValid2DArray(arr) {
  for (const pair of arr) {
    if (
      !Array.isArray(pair) ||
      typeof pair[0] !== 'number' ||
      typeof pair[1] !== 'string'
    ) {
      return false;
    }
  }
  return true;
}

// updateInventory([["hello", "hello"]], [["hello", "hello"]])
