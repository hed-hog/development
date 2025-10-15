export const includePaymentCoupon: any = {
  payment_coupon_item: {
    select: {
      id: true,
      item_id: true,
      item: {
        select: {
          id: true,
          name: true,
          price: true,
          slug: true,
        },
      },
    },
  },
};
