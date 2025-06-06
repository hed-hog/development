import { Prisma } from "@prisma/client";

export const includePaymentCoupon: Prisma.payment_couponInclude = {
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
}