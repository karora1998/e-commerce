import {getAsProduct, Product} from '../products/models/product.models';
import {AuthService} from '../auth/services/auth.service';
import {Observable, of} from 'rxjs';
import {AuthInfo} from '../auth/models/auth.models';
import {getMockedValidAuthInfoForUser} from './user.mocks';
import {ProductService} from '../products/services/product.service';

export const mockCategories = ['Automotive', 'Baby Care', 'Bags  Wallets & Belts', 'Beauty and Personal Care', 'Clothing', 'Food & Nutrition', 'Footwear', 'Furniture', 'Home Decor & Festive Needs', 'Home Furnishing', 'Mobiles & Accessories', 'Pens & Stationery', 'Pet Supplies', 'Sports & Fitness', 'Tools & Hardware', 'Watches'];
export const mockproductResponse = {
  'content': [
    {
      'productId': 15,
      'name': 'FabHomeDecor Fabric Double Sofa Bed',
      'category': 'Furniture',
      'price': 32157,
      'dealPrice': 0,
      'description': 'FabHomeDecor Fabric Double Sofa Bed (Finish Color - Purple Mechanism Type - Pull Out) Price: Rs. 22 646 â€¢ Fine deep seating experience â€¢ Save Space with the all new click clack Sofa Bed â€¢ Easy to fold and vice versa with simple click clack mechanism â€¢ Chrome legs with mango wood frame for  Long term durability â€¢ Double cushioned Sofa Bed to provide you with extra softness to make a fine seating experience â€¢ A double bed that can easily sleep two Specifications of FabHomeDecor Fabric Double Sofa Bed (Finish Color - Purple Mechanism Type - Pull Out) Installation & Demo Installation & Demo Details Installation and demo for this product is done free of cost as part of this purchase. Our service partner will visit your location within 72 business hours from the delivery of the product. In The Box 1 Sofa Bed General Brand FabHomeDecor Mattress Included No Delivery Condition Knock Down Storage Included No Mechanism Type Pull Out Type Sofa Bed Style Contemporary & Modern Filling Material Microfiber Seating Capacity 3 Seater Upholstery Type NA Upholstery Included No Bed Size Double Shape Square Suitable For Living Room Model Number FHD132 Care Instructions Avoid outdoor use and exposure to water or prolonged moisture  Avoid exposure to direct heat or sunlight as this can cause the sofa colour to fade  Keep sharp objects away from your sofa  A little tear on the fabric cover may be hard to repair  Vacuum your sofas periodically with a soft bristled bru...View More Avoid outdoor use and exposure to water or prolonged moisture  Avoid exposure to direct heat or sunlight as this can cause the sofa colour to fade  Keep sharp objects away from your sofa  A little tear on the fabric cover may be hard to repair  Vacuum your sofas periodically with a soft bristled brush attachment or lightly brush them to keep general dirt and dust off the sofa and prevent any embedding between the fibres  Try to avoid food and drink spillage of any kind  If spills occur  do not leave unattended  In case of a stain  a water-free fabric cleaner can be used  However  avoid applying the cleaner directly on the stain as this can cause damage to the fabric and fade colour  Pour the cleaner onto a clean cloth and test its effect on a hidden area of the sofa before cleaning the stain with the cloth  A professional scotchguard treatment is one of the easiest and most effective options to protect against spills or stains and keep pet hair at bay  Getting your sofa professionally cleaned once every 6-8 months will not only take care of the nooks and corners that you can t reach  it will also make it more durable Finish Type Matte Important Note Cancellation NOT allowed for this product after 24 hrs of order booking. Warranty Covered in Warranty Warranty covers all kind of manufacturing defects. Concerned product will either be repaired or replaced based on discretion. Service Type Manufacturer Warranty Warranty Summary 6 Months Domestic Warranty Not Covered in Warranty Warranty does not cover for Improper Handling Dimensions Weight 40 kg Height 838 mm Width 1905 mm Depth 939 mm Disclaimer - The color of the product may vary slightly compared to the picture displayed on your screen. This is due to lighting  pixel quality and color settings - Please check the product s dimensions to ensure the product will fit in the desired location. Also  check if the product will fit through...View More - The color of the product may vary slightly compared to the picture displayed on your screen. This is due to lighting  pixel quality and color settings - Please check the product s dimensions to ensure the product will fit in the desired location. Also  check if the product will fit through the entrance(s) and door(s) of the premises - Please expect an unevenness of up to 5 mm in the product due to differences in surfaces and floor levels - Flipkart  or the Seller delivering the product  will not take up any type of civil work  such as drilling holes in the wall to mount the product. The product will only be assembled in case carpentry assembly is required - In case the product appears to lack shine  wiping the surface with a cloth will help clear the surface of dust particles Material & Color Upholstery Color Purple Primary Color Purple Primary Material Fabric Secondary Material Subtype Mango Wood Secondary Material Foam Finish Color Purple Primary Material Subtype Foam',
      'manufacturer': 'FabHomeDecor',
      'availableItems': 25,
      'overAllRating': 3,
      'imageUrl': 'http://img5a.flixcart.com/image/sofa-bed/r/c/g/fhd132-double-foam-fabhomedecor-purple-purple-1100x1100-imaeh3getyhdnnxn.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 17,
      'name': 'Carrel Printed Women s',
      'category': 'Clothing',
      'price': 2499,
      'dealPrice': 0,
      'description': 'Key Features of Carrel Printed Women s Fabric: SwimLycra Brand Color: DARK BLUE  WHITE Carrel Printed Women s Price: Rs. 999 Max-coverage swimwear collection from CARREL BRAND  Brighten up your swim routine with this best fitting. This swimming costume from the house of Carrel is made of imported swim lycra fabric and comes in Darkblue & White Colour. It has to be washed separately and dry in shade. Attractive & classy caressing the water. This swimwear provides excellent protection and Chlorine resistance. fast drying combined with flatlock stitching gives an unmatched comfort and helps you to that performance you have been striving for. This swimwear with its comfort and style is your perfect companion at any pool  beach or water activity. Time for you to do your own thing and Go With The Flow. This Swimwear Lightly padded  for modesty and support. This Product Support To This Size : L  XL  XXL  3XL 4XL. Specifications of Carrel Printed Women s Top Details Neck Round Neck Swimsuit Details Fabric SwimLycra Type Swim-dress General Details Pattern Printed Ideal For Women s Occasion Sports Fabric Care Wash with Similar Colors  Use Detergent for Colors In the Box 1 Swimware',
      'manufacturer': 'Carrel',
      'availableItems': 25,
      'overAllRating': 3,
      'imageUrl': 'http://img5a.flixcart.com/image/swimsuit/g/z/j/carrel-sw-3091-darkblue-white-carrel-4xl-original-imaehyzmk8hphgua.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 18,
      'name': 'FabHomeDecor Fabric Double Sofa Bed',
      'category': 'Furniture',
      'price': 32157,
      'dealPrice': 0,
      'description': 'FabHomeDecor Fabric Double Sofa Bed (Finish Color - Dark Brown Mechanism Type - Pull Out) Price: Rs. 22 646 â€¢ Fine deep seating experience â€¢ Save Space with the all new click clack Sofa Bed â€¢ Easy to fold and vice versa with simple click clack mechanism â€¢ Chrome legs with mango wood frame for  Long term durability â€¢ Double cushioned Sofa Bed to provide you with extra softness to make a fine seating experience â€¢ A double bed that can easily sleep two Specifications of FabHomeDecor Fabric Double Sofa Bed (Finish Color - Dark Brown Mechanism Type - Pull Out) In The Box 1 Sofa Bed Installation & Demo Installation & Demo Details Installation and demo for this product is done free of cost as part of this purchase. Our service partner will visit your location within 72 business hours from the delivery of the product. Important Note Cancellation NOT allowed for this product after 24 hrs of order booking. General Brand FabHomeDecor Mattress Included No Delivery Condition Knock Down Storage Included No Mechanism Type Pull Out Type Sofa Bed Style Contemporary & Modern Filling Material Microfiber Seating Capacity 3 Seater Upholstery Type NA Upholstery Included No Bed Size Double Shape Square Suitable For Living Room Model Number FHD115 Finish Type Matte Care Instructions Avoid outdoor use and exposure to water or prolonged moisture  Avoid exposure to direct heat or sunlight as this can cause the sofa colour to fade  Keep sharp objects away from your sofa  A little tear on the fabric cover may be hard to repair  Vacuum your sofas periodically with a soft bristled bru...View More Avoid outdoor use and exposure to water or prolonged moisture  Avoid exposure to direct heat or sunlight as this can cause the sofa colour to fade  Keep sharp objects away from your sofa  A little tear on the fabric cover may be hard to repair  Vacuum your sofas periodically with a soft bristled brush attachment or lightly brush them to keep general dirt and dust off the sofa and prevent any embedding between the fibres  Try to avoid food and drink spillage of any kind  If spills occur  do not leave unattended  In case of a stain  a water-free fabric cleaner can be used  However  avoid applying the cleaner directly on the stain as this can cause damage to the fabric and fade colour  Pour the cleaner onto a clean cloth and test its effect on a hidden area of the sofa before cleaning the stain with the cloth  A professional scotchguard treatment is one of the easiest and most effective options to protect against spills or stains and keep pet hair at bay  Getting your sofa professionally cleaned once every 6-8 months will not only take care of the nooks and corners that you can t reach  it will also make it more durable Dimensions Weight 40 kg Height 838.2 mm Width 1905 mm Depth 939.8 mm Warranty Covered in Warranty Warranty covers all kind of manufacturing defects. Concerned product will either be repaired or replaced based on discretion. Warranty Summary 6 Months Domestic Warranty Service Type Manufacturer Warranty Not Covered in Warranty Warranty does not cover for Improper Handling Disclaimer - The color of the product may vary slightly compared to the picture displayed on your screen. This is due to lighting  pixel quality and color settings - Please check the product s dimensions to ensure the product will fit in the desired location. Also  check if the product will fit through...View More - The color of the product may vary slightly compared to the picture displayed on your screen. This is due to lighting  pixel quality and color settings - Please check the product s dimensions to ensure the product will fit in the desired location. Also  check if the product will fit through the entrance(s) and door(s) of the premises - Please expect an unevenness of up to 5 mm in the product due to differences in surfaces and floor levels - Flipkart  or the Seller delivering the product  will not take up any type of civil work  such as drilling holes in the wall to mount the product. The product will only be assembled in case carpentry assembly is required - In case the product appears to lack shine  wiping the surface with a cloth will help clear the surface of dust particles Material & Color Primary Material Fabric Primary Color Brown Upholstery Color Dark Brown Secondary Material Foam Secondary Material Subtype Mango Wood Finish Color Dark Brown Primary Material Subtype Foam',
      'manufacturer': 'FabHomeDecor',
      'availableItems': 25,
      'overAllRating': 2,
      'imageUrl': 'http://img6a.flixcart.com/image/sofa-bed/j/6/q/fhd115-double-foam-fabhomedecor-dark-brown-dark-brown-original-imaeh3gee5zcazvm.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 14,
      'name': 'Alisha Solid Women s Cycling Shorts',
      'category': 'Clothing',
      'price': 999,
      'dealPrice': 0,
      'description': 'Key Features of Alisha Solid Women s Cycling Shorts Cotton Lycra Black  White  White Specifications of Alisha Solid Women s Cycling Shorts Shorts Details Number of Contents in Sales Package Pack of 3 Fabric Cotton Lycra Type Cycling Shorts General Details Pattern Solid Ideal For Women s Fabric Care Gentle Machine Wash in Lukewarm Water  Do Not Bleach Additional Details Style Code ALTHT_3P_2 In the Box 3 shorts',
      'manufacturer': 'Alisha',
      'availableItems': 25,
      'overAllRating': 2,
      'imageUrl': 'http://img5a.flixcart.com/image/short/t/p/b/altht-3p-2-alisha-38-original-imaeh2d53jbrxnam.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 12,
      'name': 'Alisha Solid Women s Cycling Shorts',
      'category': 'Clothing',
      'price': 999,
      'dealPrice': 0,
      'description': 'Key Features of Alisha Solid Women s Cycling Shorts Cotton Lycra Black  White  Black Specifications of Alisha Solid Women s Cycling Shorts Shorts Details Number of Contents in Sales Package Pack of 3 Fabric Cotton Lycra Type Cycling Shorts General Details Pattern Solid Ideal For Women s Fabric Care Gentle Machine Wash in Lukewarm Water  Do Not Bleach Additional Details Style Code ALTHT_3P_17 In the Box 3 shorts',
      'manufacturer': 'Alisha',
      'availableItems': 25,
      'overAllRating': 1,
      'imageUrl': 'http://img6a.flixcart.com/image/short/q/z/v/altht-3p-17-alisha-36-original-imaeh2d5njykvkz6.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 16,
      'name': 'Style Foot Bellies',
      'category': 'Footwear',
      'price': 899,
      'dealPrice': 0,
      'description': 'Key Features of Style Foot Bellies ballerina shoes ballerina flats Style Foot Bellies Price: Rs. 449 ballet shoes that fits perfectly for casual and party wear Specifications of Style Foot Bellies General Occasion Casual Ideal For Women Shoe Details Heel Height 1 inch Outer Material PU Color Black In the Box 1 slipper',
      'manufacturer': 'Style Foot',
      'availableItems': 25,
      'overAllRating': 1,
      'imageUrl': 'http://img5a.flixcart.com/image/shoe/p/f/h/black-sfwf0377-style-foot-44-original-imaeh4cxasyrdtjr.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 13,
      'name': 'Freelance Vacuum Bottles 350 ml Bottle',
      'category': 'Pens & Stationery',
      'price': 699,
      'dealPrice': 0,
      'description': 'Specifications of Freelance Vacuum Bottles 350 ml Bottle (Pack of 1  Green) General Body Material Stainless steel Type Bottle In the Box Number of Contents in Sales Package Pack of 1 Sales Package 1 pcs in one packet',
      'manufacturer': 'Freelance',
      'availableItems': 25,
      'overAllRating': 3,
      'imageUrl': 'http://img5a.flixcart.com/image/bottle/j/m/m/av004bgr-freelance-350-vacuum-bottles-1000x1000-imaegykdk6ytzrzz.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 22,
      'name': 'Kennel Rubber Dumbell With Bell - Small Rubber Rubber Toy For Dog',
      'category': 'Pet Supplies',
      'price': 190,
      'dealPrice': 0,
      'description': 'Buy Kennel Rubber Dumbell With Bell - Small Rubber Rubber Toy For Dog for Rs.190 online. Kennel Rubber Dumbell With Bell - Small Rubber Rubber Toy For Dog at best prices with FREE shipping & cash on delivery. Only Genuine Products. 30 Day Replacement Guarantee.',
      'manufacturer': 'Kennel',
      'availableItems': 25,
      'overAllRating': 5,
      'imageUrl': 'http://img5a.flixcart.com/image/pet-toy/n/a/r/a35-kennel-original-imaea5c3qxyqzrgz.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 20,
      'name': 'dongli Printed Boy s Round Neck T-Shirt',
      'category': 'Clothing',
      'price': 2400,
      'dealPrice': 0,
      'description': 'Specifications of dongli Printed Boy s Round Neck T-Shirt (Pack of 4) T-shirt Details Sleeve Half Sleeve Number of Contents in Sales Package Pack of 4 Fabric Cotton Type Round Neck Fit Regular General Details Pattern Printed Occasion Casual Ideal For Boy s In the Box 4 T Shirt Additional Details Style Code DLHBB445_BEIGE_BLACK_GYELLOW_PURPLE Fabric Care Wash with Similar Colors  Use Detergent for Colors',
      'manufacturer': 'dongli',
      'availableItems': 25,
      'overAllRating': 2,
      'imageUrl': 'http://img5a.flixcart.com/image/t-shirt/w/x/t/dlhbb445-beige-black-gyellow-purple-dongli-10-11-years-original-imaehb54gxhchxcd.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    },
    {
      'productId': 19,
      'name': 'Sicons Conditioning Conditoner Dog Shampoo',
      'category': 'Pet Supplies',
      'price': 110,
      'dealPrice': 0,
      'description': 'Specifications of Sicons Conditioning Conditoner Dog Shampoo (200 ml) General Pet Type Dog Brand Sicons Quantity 200 ml Model Number SH.DF-02 Type Conditioning Fragrance Conditoner Form Factor Gel In the Box Sales Package Shampoo Sicons Dog Fashion Conditioner Aloe Rinse',
      'manufacturer': 'Sicons',
      'availableItems': 25,
      'overAllRating': 1,
      'imageUrl': 'http://img6a.flixcart.com/image/pet-shampoo/v/x/m/sh-df-02-sicons-200-1100x1100-imaeh3kjba4htqfg.jpeg',
      'created': '2020-04-06T17:27:03.419',
      'updated': '2020-04-06T17:27:03.419'
    }
  ],
  'pageable': {
    'sort': {
      'sorted': true,
      'unsorted': false,
      'empty': false
    },
    'offset': 0,
    'pageSize': 10,
    'pageNumber': 0,
    'unpaged': false,
    'paged': true
  },
  'totalPages': 16,
  'totalElements': 154,
  'last': false,
  'size': 10,
  'number': 0,
  'sort': {
    'sorted': true,
    'unsorted': false,
    'empty': false
  },
  'numberOfElements': 10,
  'first': true,
  'empty': false
};

export function getMockProductsResponse() {
  return mockproductResponse;

}


export function getAMockProduct() {

  const rawproduct = mockproductResponse.content[0];


  return getAsProduct(rawproduct);

}

export function getMockProductWithAvailableItemsSetAt(availableItems) {
  const mockProduct = getAMockProduct();
  mockProduct.availableItems = availableItems;
  return mockProduct;
}

export function getMockProductWithDeal() {
  const mockProduct = getAMockProduct();
  mockProduct.dealPrice = mockProduct.price - 50;
  return mockProduct;
}

export function getMockProductWithNoDeal() {
  const mockProduct = getAMockProduct();
  mockProduct.dealPrice = 0;
  return mockProduct;
}

export function getMockedNewProductWithDeal(dealPrice: number) {

  const product = getMockedNewProduct();
  product.dealPrice = dealPrice;
  return product;

}

export function getMockedNewProduct() {
  return new Product({
    name: 'Dragon Sword',
    category: 'sword',
    price: 2560,
    dealPrice: 12,
    description: 'A Sword to fight against WhiteWalkers',
    manufacturer: 'Targaryon',
    imageUrl: 'https://p0.pikrepo.com/preview/529/148/gold-dragon-with-black-handle-knife.jpg',
    availableItems: 5

  });
}
export function getMockedNewProductResponseWithDeal(dealPrice: number) {

  const product = getMockedNewProductResponse();
  product.dealPrice = dealPrice;
  return product;

}
export function getMockedNewProductResponse() {

  return {
    'productId': 19,
    name: 'Dragon Sword',
    category: 'sword',
    price: 2560,
    dealPrice: 12,
    description: 'A Sword to fight against WhiteWalkers',
    manufacturer: 'Targaryon',
    imageUrl: 'https://p0.pikrepo.com/preview/529/148/gold-dragon-with-black-handle-knife.jpg',
    availableItems: 5,
    'created': '2020-04-06T17:27:03.419',
    'updated': '2020-04-06T17:27:03.419'
  };


}

export function getMockedNewDealResponsewithAmount(dealPrice:number) {
  return {
    id: 23,
    dealPrice: dealPrice,
    product: getMockedNewProductResponse()
  };
}


export function getMockedProductService() {

  let mockedProductService: Partial<ProductService>;

  mockedProductService = {

    getCategories: (): (Observable<string[]>) => {

      return of(mockCategories);
    },

  };

  return mockedProductService;

}
