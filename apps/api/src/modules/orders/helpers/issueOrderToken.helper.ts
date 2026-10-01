import type { Order } from '@repo/entities';

import jwt, { type SignOptions } from 'jsonwebtoken';
import { ENV } from '~/constants';

interface IssueOrderTokenParams {
    order: Order,
    expiresIn?: SignOptions["expiresIn"]
};

export default function issueOrderToken({ order, expiresIn="90d" }: IssueOrderTokenParams) {

    const token = jwt.sign(
        { orderId: order.id },
        ENV.ORDER_TOKEN_SECRET,
        { expiresIn }
    )

    return token;
};