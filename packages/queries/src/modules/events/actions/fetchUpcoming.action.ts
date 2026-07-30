import type { ApiResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/events/__meta';
import { Event } from '@repo/entities';

export async function fetchUpcoming(): Promise<ApiResponse<Event[]>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/upcoming`
    });

    return data;
};