const allcouponResponse = {
  'content': [{'id': 1, 'name': 'coupon1', 'couponCode': '9vo3J4ydXO3k3i5yJhSEeCHhOWPfp0', 'amount': 127, 'status': 'ACTIVE'}, {
    'id': 2,
    'name': 'coupon2',
    'couponCode': 'i81P2fVlHcA3hQAIJM6e1DhWDWto0G',
    'amount': 164,
    'status': 'ACTIVE'
  }, {'id': 3, 'name': 'coupon3', 'couponCode': 'AtNMBBhlXLjw2P9r4azZQqRa6d4ocP', 'amount': 329, 'status': 'ACTIVE'}, {
    'id': 4,
    'name': 'coupon4',
    'couponCode': 'L3DupBTYGOowTfoZYvck3d7uYbset7',
    'amount': 278,
    'status': 'ACTIVE'
  }, {'id': 5, 'name': 'coupon5', 'couponCode': 'q2wxuaqazrG8TwINuyu7pIgvCTKuAU', 'amount': 505, 'status': 'ACTIVE'}, {
    'id': 6,
    'name': 'coupon6',
    'couponCode': 'z3RpqWPnEAysdEbTAPMk7CmioW7Ipq',
    'amount': 284,
    'status': 'ACTIVE'
  }, {'id': 7, 'name': 'coupon7', 'couponCode': '9frGwCzI0oMojqROe4sSmsQ7KUdXOC', 'amount': 169, 'status': 'ACTIVE'}, {
    'id': 8,
    'name': 'coupon8',
    'couponCode': 'pgy8t2hhiDdP5zrqo3Qimv40uGuMfS',
    'amount': 594,
    'status': 'ACTIVE'
  }, {'id': 9, 'name': 'coupon9', 'couponCode': 'G9awxinjZm5qoNx5Fq9i2gsichPNev', 'amount': 671, 'status': 'ACTIVE'}, {
    'id': 10,
    'name': 'coupon10',
    'couponCode': 't0ImJ7CkIqnSe8s36mt5lwtlQFIGSS',
    'amount': 270,
    'status': 'ACTIVE'
  }],
  'pageable': {
    'sort': {'sorted': false, 'unsorted': true, 'empty': true},
    'offset': 0,
    'pageSize': 10,
    'pageNumber': 0,
    'unpaged': false,
    'paged': true
  },
  'totalElements': 20,
  'last': false,
  'totalPages': 2,
  'size': 10,
  'number': 0,
  'sort': {'sorted': false, 'unsorted': true, 'empty': true},
  'numberOfElements': 10,
  'first': true,
  'empty': false
};


export function getMockedAllCouponResponse() {

  return allcouponResponse;
}

export function getMockedAddCouponResponse(name, amt) {

  const coupon = allcouponResponse.content[0];
  coupon.amount = amt;
  coupon.name = name;
  return coupon;
}
