module.exports = {
	'PUBLIC_URL':'http://localhost:3002/',
	'BASE_ADMIN_URL':'http://localhost:3006/',
	'BASE_SERVER_URL':'http://localhost:5001',
	//'BASE_IMAGE_URL':'http://localhost:3006/assets/uploads/',
	'BASE_IMAGE_URL':'http://node.newmediaguru.co:3006/assets/uploads/',
    'PER_PAGE_RECORD': 10,
    'SMTP_HOST':'smtp.sendgrid.net',
    'SMTP_PORT': 587,
    'SMTP_USERNAME': 'XXXXX',
    'SMTP_PASSWORD': 'XXXXX',
    'SMTP_FROM_EMAIL': 'rajiv.kumar@newmediaguru.net',
    'profileimage_path':'/var/www/html/Node_ReactProject/admin/public/assets/uploads/ProfilePic/',
    'cmsimage_path':'/var/www/html/Node_ReactProject/admin/public/assets/uploads/cmsPageImage/',
    'donationimage_path':'/var/www/html/Node_ReactProject/admin/public/assets/uploads/donationImage/',
    'product_path': '/var/www/html/Node_ReactProject/admin/public/assets/uploads/Products/',
    'advertisementimage_path': '/var/www/html/Node_ReactProject/admin/public/assets/uploads/AdvertisementImage/',
    'notification_type':[{'id':'1','name':'New User Created'},{'id':'2','name':'New Trade Requested'},{'id':'3','name':'Trade Rejected'},{'id':'4','name':'New Message Received'}],
    'donation_conditions':[{'id':'1','name':'New'},{'id':'2','name':'old'},{'id':'3','name':'Excellent'},{'id':'4','name':'Very Old'}],
    'sortBy':[{'value':'1','label':'Newly Added'},{'value':'2','label':'A - Z'},{'value':'3','label':'Z - A'},{'value':'4','label':'Nearest'}],
		'returnReason':[
			{'id':'0','name':'Item Defective'},
			{'id':'1','name':'Bought By Mistake'},
			{'id':'2','name':'No longer needed'},
			{'id':'3','name':'Too small'},
			{'id':'4','name':'Ordered In wrong size'},
			{"id":"5","name":"Product not as expected"}	]

};
