const router = require('express').Router();
const productController = require('../controllers/productController')
router.post('/create',productController.create)
router.get('/listProduct',productController.allProducts)
router.get('/allActiveProduct',productController.allActiveProducts)
router.get('/viewProduct/:id',productController.viewProduct)
router.put('/updateProduct',productController.updateProduct)
router.post('/changeStatus',productController.changeStatus)
router.get('/products/:page',productController.allProducts)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.delete('/deleteProductImage/:id',productController.deleteProductImage)
router.get('/switchTodays',productController.switchTodays)
router.get('/popularItems',productController.popularItems)
router.get('/myTreasureChest',productController.myTreasureChest)
router.post('/addProduct',productController.addProduct)
router.put('/updateUserProduct',productController.updateUserProduct)
router.post('/tepmUpload',productController.tepmUpload)
router.get('/activeProducts',productController.activeProducts)
router.get('/searchresult/:id?/:latitude?/:longitude?',productController.searchresult)
router.get('/searchresult/:id?',productController.searchresult)
router.post('/filterBy',productController.myTreasureChestFilterBy)
router.post('/filterBycategory',productController.filterBycategory)
router.get('/productDetails/:id',productController.productDetails)
router.get('/productImages/:id',productController.productImages)
router.get('/relatedCategoryProduct/:id',productController.relatedCategoryProduct)
router.get('/tradeMatch',productController.tradeMatch)
router.post('/tradeMatchFilterBy',productController.tradeMatchFilterBy)

/*Routes related to user wishlist functionality added on 03 October 2018 */
router.get('/wishlist',productController.wishList)
router.post('/addToWishList',productController.addToWishList)
router.post('/removeFromWishList',productController.removeFromWishList)
router.delete('/clearWishlist',productController.clearWishlist)
router.post('/checkExists',productController.checkExists)
router.get('/getColors',productController.getColors);
router.get('/getAgeList',productController.getAgeList);
module.exports = router;
