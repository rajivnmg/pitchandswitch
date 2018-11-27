module.exports = {

  'PUBLIC_URL':'http://localhost:3006/',
  'PUBLIC_URL_WEB':'http://localhost:3002/',
  'PER_PAGE_RECORD': 10,
  'DATABASE':'mongodb://localhost:27017/pitch-and-switch',
  //'DATABASE':'mongodb://pitchnswitch:pitchnswitch123456@10.0.0.24:27017/pitch-switch-demo',
  'SMTP_HOST':'smtp.sendgrid.net',
  'SMTP_PORT': 587,   
  'SMTP_USERNAME': '#####',
  'SMTP_PASSWORD': '######',
  'SMTP_FROM_EMAIL': 'rajiv.kumar@nmgtechnologies.com',
  'StripeKeyPublic' : 'pk_test_hd6ILRIbYiaz8udjz91j4orh',
  'StripeKeySecret' : 'sk_test_8IgE3GaQ3C6jBSP5ZUBpdXhy',
  'EasyPostApiKey' : 'EZTKe017f7faebb44d02b0baaf080d466f16VuUOauRv6VcyWmkr8BzIWA',
  'profileimage_path':'/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/ProfilePic/',
  'cmsimage_path':'/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/cmsPageImage/',
  'donationimage_path':'/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/donationImage/',
  'product_path': '/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/Products/',
  'tepmUpload_path': '/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/tepmUpload/',
  'advertisementimage_path': '/var/www/html/pitchandswitch/pitchandswitch/admin/public/assets/uploads/AdvertisementImage/',
  'notification_type':[{'id':'1','name':'New User Created'},{'id':'2','name':'New Trade Requested'},{'id':'3','name':'Trade Rejected'},{'id':'4','name':'New Message Received'}],
  'donation_conditions':[{'id':'1','name':'New'},{'id':'2','name':'old'},{'id':'3','name':'Excellent'},{'id':'4','name':'Very Old'}],
  'donation_status':[{'id':'0','name':'Pending'},{'id':'1','name':'Accepted'},{'id':'2','name':'Rejected'}],
  'shippingStatus':[{'id':'0','name':'Picked up'},{'id':'1','name':'Shipped'},{'id':'2','name':'Delivered'}],
  'returnReason':[
    {'id':'0','name':'Item Defective'},
    {'id':'1','name':'Bought By Mistake'},
    {'id':'2','name':'No longer needed'},
    {'id':'3','name':'Too small'},
    {'id':'4','name':'Ordered In wrong size'},
    {"id":"5","name":"Product not as expected"}
  ], 
  'tradeStatus': [
    { id: "1", name: "Switched" },
    { id: "2", name: "Completed" },
    { id: "3", name: "Return" },
    { id: "4", name: "Returned" }
  ],
  'selectedAges': [
    { 'id': "1", 'name': "0 month - 6 month" },
    { 'id': "2", 'name': "6 month - 1 year" },
    { 'id': "3", 'name': "1 year - 2 year" },
    { 'id': "4", 'name': "2 year - 5 year" },
    { 'id': "5", 'name': "5 year - 10 year" },
    { 'id': "6", 'name': "above 10 year" },
  ],
  colors: [
    {
      id: "1",
      name: "A",
      color: "1",
      disabled: false
    },
    {
      id: "2",
      name: "B",
      color: "2",
      disabled: false
    },
    {
      id: "3",
      name: "C",
      color: "3",
      disabled: false
    },
    {
      id: "4",
      name: "D",
      color: "4",
      disabled: false
    },
    {
      id: "5",
      name: "E",
      color: "5",
      disabled: false
    },
    {
      id: "6",
      name: "F",
      color: "6",
      disabled: false
    },
    {
      id: "7",
      name: "G",
      color: "7",
      disabled: false
    },
    {
      id: "8",
      name: "H",
      color: "8",
      disabled: false
    },
    {
      id: "9",
      name: "I",
      color: "9",
      disabled: false
    },
    {
      id: "10",
      name: "J",
      color: "10",
      disabled: false
    },
    {
      id: "11",
      name: "K",
      color: "11",
      disabled: false
    },
    {
      id: "12",
      name: "L",
      color: "12",
      disabled: false
    },
    {
      id: "13",
      name: "M",
      color: "13",
      disabled: false
    },
    {
      id: "14",
      name: "N",
      color: "14",
      disabled: false
    },
    {
      id: "15",
      name: "O",
      color: "15",
      disabled: false
    },
    {
      id: "16",
      name: "P",
      color: "16",
      disabled: false
    }
  ]
};
