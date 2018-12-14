module.exports = {
  PUBLIC_URL: "http://localhost:3002/",
  BASE_ADMIN_URL: "http://node.newmediaguru.co:3006/",
  BASE_SERVER_URL: "http://node.newmediaguru.co:5001",
  //BASE_IMAGE_URL: "http://localhost:3006/assets/uploads/",
  BASE_IMAGE_URL: "http://node.newmediaguru.co:3006/assets/uploads/",
  PER_PAGE_RECORD: 10,
  notification_type: [
    { id: "1", name: "New User Created" },
    { id: "2", name: "New Trade Requested" },
    { id: "3", name: "Trade Rejected" },
    { id: "4", name: "New Message Received" }
  ],
  donation_conditions: [
    { id: "1", name: "New" },
    { id: "2", name: "old" },
    { id: "3", name: "Excellent" },
    { id: "4", name: "Very Old" }
  ],
  sortBy: [
    { value: "1", label: "Newly Added" },
    { value: "2", label: "A - Z" },
    { value: "3", label: "Z - A" },
    { value: "4", label: "Nearest" }
  ],
  returnReason: [
    { id: "0", name: "Item Defective" },
    { id: "1", name: "Bought By Mistake" },
    { id: "2", name: "No longer needed" },
    { id: "3", name: "Too small" },
    { id: "4", name: "Ordered In wrong size" },
    { id: "5", name: "Product not as expected" }
  ],
  selectedAges: [
    { id: "1", name: "0 month - 6 month" },
    { id: "2", name: "6 month - 1 year" },
    { id: "3", name: "1 year - 2 year" },
    { id: "4", name: "2 year - 5 year" },
    { id: "5", name: "5 year - 10 year" },
    { id: "6", name: "above 10 year" }
  ]
};
