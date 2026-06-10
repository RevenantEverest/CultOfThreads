import type { HookOptions } from '~/types';
import type { TrafficAnalytics } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/trafficAnalytics/__meta';

export interface CreatePayload {
    landingPageUrl: TrafficAnalytics["landingPageUrl"],
    utmSource: TrafficAnalytics["utmSource"],
    utmMedium?: TrafficAnalytics["utmMedium"],
    utmCampaign?: TrafficAnalytics["utmCampaign"],
    utmTerm?: TrafficAnalytics["utmTerm"],
    utmContent?: TrafficAnalytics["utmContent"],
};

export type CreateOptions = HookOptions<"payload", CreatePayload>;

export async function create({ payload }: CreateOptions) {

    const { data } = await axios({
        method: "POST",
        url: BASE_URL,
        data: payload
    });

    return data;
};