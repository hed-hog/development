export const includeItem: any = {
  payment_coupon_item: {
    select: {
      id: true,
      item_id: true,
      coupon_id: true,
      payment_coupon: {
        select: {
          id: true,
          code: true,
        },
      },
    },
  },
};
